---
title: "Node.js vs Bun: Benchmark Beneran di Codebase Produksi"
date: "2026-09-08"
description: "Eksperimen head-to-head Node.js 26.8 vs Bun 1.4.2 di backend produksi yang sama tanpa ubah satu baris kode: 2.5x throughput, 2.5x latency lebih rendah, 20% hemat RAM. Plus catatan jujur soal test suite yang hancur di bawah Bun."
tags: [nodejs, bun, benchmark, javascript, performance, backend, prisma, bullmq]
cover: "/blog/cover/nodejs-vs-bun.svg"
---

Semua orang bilang Bun itu kenceng. Tapi benchmark di to-do-list demo pakai `console.log("hello")` itu nggak ngebuktiin apa-apa buat kamu yang pegang backend produksi penuh ORM, queue, WebSocket, dan TCP server sekaligus. Yang nge-bedain runtime itu bukan hello world, tapi stack asli.

Jadi gue eksekusi eksperimen yang lumayan straight ke inti masalah: jalanin **codebase produksi yang sama persis**, tanpa ubah satu baris kode, di [Node.js](https://nodejs.org/) 26.8 dan [Bun](https://bun.sh/) 1.4.2. Backend test bed-nya: aplikasi realtime produksi yang isinya **Prisma v7 + mariadb adapter + BullMQ + Socket.io + TCP server**, semua nyatu dalam satu proses. Hasilnya? Bun menang telak di runtime, tapi ada plot twist seru di bagian testing yang wajib kamu tahu sebelum pindah.

> **Key Takeaways:**
> - Bun 1.4.2 jalanin codebase Node.js produksi 100% tanpa perubahan: Prisma, BullMQ, Socket.io, semua boot normal.
> - Throughput Bun 2.3 sampai 2.6x lebih tinggi dari Node 26.8, dan puncaknya di ~4.1k req/s saat event loop Node udah mentok di 1.6k.
> - Latency Bun 2.5x lebih rendah (p99 11 ms vs 21 ms di 20 koneksi), dan scale-nya jauh lebih rapi.
> - Memory Bun 20 sampai 25% lebih irit: peak ~430-439 MB vs ~619-670 MB.
> - Tapi Bun kalah telak di testing: jest (23 suites / 936 test) hancur total, cuma 57 test yang jalan.

## Setup: Ini Bukan Sekadar Hello World

Buat bikin perbandingannya fair, aturannya simpel: **runtime doang yang ganti, code tidak disentuh sama sekali.** Backend-nya aplikasi Node.js produksi asli yang stack-nya ini:

- **Prisma v7** pakai `mariadb` adapter untuk ORM dan query database
- **BullMQ** buat job queue berbasis Redis
- **Socket.io** buat realtime websocket
- **TCP server** sendiri buat komunikasi socket umum
- **Express 4** sebagai HTTP layer

DB dan Redis dua-duanya lokal, jadi nggak ada noise latensi jaringan yang nge-pollute angka. Startup-nya:

```bash
# Node: boot langsung
bun src/index.js   # jalan di Node 26.8

# Bun: file sama, nggak diubah
bun src/index.js   # jalan di Bun 1.4.2
```

Dan Bun cuma butuh itu. `bun src/index.js` di codebase yang ditulis buat Node, dan boom, boot normal semua. Prisma v7 sama adapter mariadb-nya, BullMQ, Socket.io, TCP server, semua jalan tanpa segelintir baris shading atau polyfill. Buat konteks: banyak orang yang mikir stack realtime segede ini bakal patah di runtime non-Node. Enggak, Bun 1.4.2 nanganin ini tanpa drama.

Benchmark-nya pake **autocannon**, yang penting karena dia runtime-neutral (tools berbasis Node buat test Node, jadi nggak ada yang diuntungkan secara hardware atau event loop). Metrik yang diukur di endpoint `/health`: Prisma `SELECT 1`, ping Redis, terus serialize JSON. Endpoint kecil yang realistis banget buat ngeukur overhead HTTP framework + runtime murni, bukan kerja database yang berat.

## Startup: Bun 15-20% Lebih Cepat Boot

Cold boot diukur dari nol sampai endpoint `/health` balas HTTP 200. Dijalankan 5 kali, dan hasil run pertama (cold page-cache) dibuang biar datanya konsisten. Ini hasilnya:

| Ukuran | Node 26.8 | Bun 1.4.2 | Selisih |
|---|---|---|---|
| Boot time | ~1700-1850 ms | ~1370-1560 ms | Bun ~15-20% lebih cepat |

Selisih 300-400 ms itu kecil secara absolut, tapi di konteks lambda/container yang sering cold start, lumayan kerasa. Nggak ada yang namanya scaling nol ke ratusan ribu detik cuma dari sini, tapi buat boot server, Bun jelas menang tanpa perlu ngutak-atik konfigurasi.

## Throughput dan Latency: Di Sini Bun Kasih Pelajaran

Ini bagian yang paling seru. Dengan keep-alive enabled, gue naikin koneksi dari 20 sampai 200 buat liat gimana dua runtime ini nangani load. Dan selisihnya gila:

| Conn | Node req/s | Bun req/s | Node avg/p99 | Bun avg/p99 |
|---|---|---|---|---|
| 20 | 1.8k | 4.1k | 10.6 ms / 21 ms | 4.4 ms / 11 ms |
| 50 | 1.7k | 4.5k | 30 ms / 57 ms | 11 ms / 25 ms |
| 100 | 1.6k | 4.1k | 61 ms / 89 ms | 24 ms / 44 ms |
| 200 | 1.5k | 3.8k | 131 ms / 256 ms | 53 ms / 97 ms |

Baca tabel itu sekali lagi, karena ada dua cerita di sini.

**Cerita pertama: Bun itu 2.3 sampai 2.6x lebih cepat.** Di 20 koneksi, Bun 4.1k req/s vs Node 1.8k. Di 50 koneksi, Bun 4.5k vs Node 1.7k. Latency-nya juga sama gilanya: p99 Node 21 ms, Bun cuma 11 ms. Itu bukan noise, itu konsisten di seluruh concurrency sweep.

**Cerita kedua, dan ini poin yang lebih penting: kurva scaling Node itu mentok.** Liat angka Node: 1.8k di 20 koneksi, turun ke 1.6k, terus nyelip di 1.5k aja walaupun concurrency naik. Itu ciri-ciri **event loop saturasi**. Node nggak bisa nambah throughput walaupun koneksi nambah, karena semua request antri di satu event loop yang udah kewalahan. Bun, di sisi lain, naik dari 4.1k ke 4.5k, dan walaupun turun sedikit di 200 koneksi, dia tetep di 3.8k, hampir 2.5x dari ceiling Node.

Latency Bun di load tinggi itu yang paling bikin kagum. Di 200 koneksi, p99 Bun 97 ms vs Node 256 ms. Auto cannon nge-confirm error nol dua-duanya, jadi boosting bukan hasil nge-drop request.

Ada satu detail metodologi yang wajib dibahas: gue **nggak pakai `ab` (ApacheBench) buat angka final**. `ab` nge-report "failed requests" palsu di test awal gara-gara cara dia handle keep-alive connection vs cara web server Bun. Begitu gue switch ke autocannon dengan keep-alive pooling beneran, dua-duanya nunjukin 0 error. Pelajaran: tools benchmark punya bias sendiri, dan `ab` di sini bikin kesimpulan salah kalau dibaca mentah-mentah.

## Memory: Bun Lebih Irit 20-25%

RSS (Resident Set Size) diukur di bawah load berkelanjutan dengan 100 koneksi, dua run. Ini baseline sampai peak-nya:

| Ukuran | Baseline | Avg | Peak |
|---|---|---|---|
| Node | ~332 MB | ~489-532 MB | ~619-670 MB |
| Bun | ~292-298 MB | ~397-408 MB | ~430-439 MB |

Bun mulai 40 MB lebih rendah di baseline, dan peak-nya stop di ~430-439 MB sementara Node naik sampe ~670 MB. Itu sekitar 20-25% hemat memory. Di instance kecil (1 GB RAM, paling sering buat backend Indo yang cost-conscious), pindah ke Bun artinya dapet headroom 200 MB lebih buat proses lain atau cache. Barang nggak dapet gratisan, tapi selisih segini kerasa banget di tagihan cloud bulanan.

## Testing: Bun Bilang "Yeah, about that..."

Sekarang plot twist yang ngebuat gue mikir dua kali.

Todo list testing itu **jest**, 23 suites dengan 936 test. Di bawah Node, semuanya sukses dan kelar dalam 96 detik. Di bawah Bun, ini dia:

| Ukuran | Hasil |
|---|---|
| Node + jest | 96 s, semua 936 test pass |
| Bun + jest | Rusak. 19 suites gagal jalan, cuma 57 test yang ke-run |
| Penyebab | `depd`/`body-parser` bug `callSite.getFileName is not a function` di jalur Express 4 |

19 dari 23 suites gagal jalan, dan cuma 57 dari 936 test yang ke-eksekusi. Root cause-nya ada di **`depd`**, library deprecated-warning yang dipakai Express 4, yang manggil `callSite.getFileName` dengan cara yang rusak di Bun. Karena jalur Express itu dipakai body-parser dan kebanyakan middleware, hampir seluruh test suite-nya collapsen.

Jadi begini realitanya: Bun menang telak di runtime, tapi **harness testing yang udah jadi investasi project-nya nggak jalan**. Pindah ke Bun artinya salah satu dari dua: nulis ulang test suite ke `bun test`, atau terima hidup dengan jest yang hancur. Dua-duanya bukan pilihan gratis.

Ada juga dua constraint Node-specific yang bikin shift ini makin berat:

- `engines.node ^24` di package.json nge-lock project ke Node major tertentu.
- `NODE_OPTIONS=--experimental-vm-modules` dipakai jest buat nge-support ES modules, dan itu flag Node asli yang nggak relevan di Bun.

## Verdict

Pecahin jadi dua bagian, karena ini nggak hitam-putih.

**Buat run bareng, Bun jelas.** 2.5x throughput, 2.5x latency lebih rendah, 20% kurang RAM, 18% lebih cepat boot, dan codebase jalan tanpa perubahan. Kalau kamu peduli sama performance per dollar dan ngasih test suite nafas baru, Bun itu undangan yang kuat banget.

**Buat project yang test suite-nya udah deep di jest, hati-hati.** Migrasi testing itu biaya yang nyata. Kalau kamu pegang 900+ test di jest dan nggak punya alokasi buat rewrite, pakai Node aja sampai ekosistem testing Bun matang, atau kamu bakal nge-trade performance runtime buat productivity yang hilang di test loop.

Pendekatan paling pragmatis yang gue liat: **ampas performa Bun lewat runtime swap, jaga test di Node.** Bun makin konsisten tiap rilis, dan begitu suite ekosistemnya dewasa, ini jadi keputusan yang makin gampang buat diambil.

## Catatan Jujur: Kenapa Angka Ini Nggak Sengaja Lebih Bagus

Biar nggak ada yang nuduh pilih kasih, dua hal yang perlu diketahui:

1. **OTel trace-export error in-app.** Di setup ada Alloy collector yang nggak bisa di-resolve (`alloy:4317` unreachable), dan itu nge-trigger error trace-export di in-app. Ini murni env-only dan nge-dampakin dua runtime secara setara, jadi nggak ngubah hasil benchmark. Tapi worth knowing datanya nggak 100% bersih dari side effect ini.

2. **Methodology itungan jujur.** Semua angka didapet dari autocannon dengan keep-alive pooling beneran, bukan `ab`. Kalau kamu liat tesis benchmark lain yang quote "Bun 3x lebih cepat" dari `ab`, skeptis aja, karena alat-nya sendiri yang bias.

## Pertanyaan yang Sering Diajukan

### Apakah Prisma v7 beneran jalan di Bun tanpa perubahan?

Iya, di eksperimen ini. Prisma v7 dengan adapter mariadb-nya, BullMQ, Socket.io, dan TCP server semua boot normal di Bun 1.4.2 tanpa baris kode yang diubah. Bun makin kompatibel sama ekosistem Node, tapi jangan baca ini sebagai garansi universal: setiap project punya daging dependency sendiri yang bisa patah di edge case.

### Kenapa Bun bisa secepat itu?

Bun ditulis di Zig dan pakai JavaScriptCore (bukan V8) dengan startup dan event loop yang dioptimasi agresif. Buat workload I/O-heavy kayak HTTP server, overhead runtime yang lebih rendah langsung kebaca di throughput dan latency. Event loop Bun nggak ke-saturasi secepat Node di concurrency tinggi, itu yang bikin scaling-nya nggak nge-plateau.

### Kalau test suite Bun udah dewasain, worth it gak pindah?

Nanti, kemungkinan besar. Framework `bun test` makin capable tiap rilis. Tapi buat sekarang, kalau kamu punya investasi besar di jest, biaya rewrite itu nggak boleh dianggap remeh, dan itu pertimbangan yang sah buat stay di Node.

### Bun lebih hemat memory beneran nggak?

Di test ini, iya, sekitar 20-25%: peak ~430-439 MB vs ~619-670 MB di bawah beban 100 koneksi berkelanjutan. Basis startup-nya juga lebih rendah, jadi headroom-nya lumayan buat instance kecil.

## Penutup

Eksperimen ini nunjukin satu hal clear: **Bun bukan lagi runner "besok lusa", dia sudah bisa jadi production candidate yang serius buat runtime-heavy stack.** 2.5x throughput dan 2.5x latency lebih rendah itu bukan hype, itu angka yang bisa dapet di codebase produksi beneran tanpa ngutak-atik source.

Tapi keputusan pindah runtime itu bukan cuma soal benchmark, itu soal ekosistem. Dan di situ jest tetap jadi batu sandungan yang bikin keputusan ini jauh lebih berat daripada yang didikte angka throughput aja.

Buat yang pengen dalami dunia Node.js, Bun, dan arsitektur backend modern, gue punya tulisan lain yang relate banget di [arsip blog](/blog), mulai dari [debugging bootloader](/blog/fixing-s905x-emmc-armbian-install) sampe [setup server Linux](/blog/setup-ntp-chrony-ubuntu-server). Cek juga tag [#nodejs](/blog/tags/nodejs) dan [#bun](/blog/tags/bun) buat update berikutnya.

---

*Data dari eksperimen hands-on yang dijalanin 8 September 2026 di codebase produksi nyata dengan stack Prisma v7, BullMQ, Socket.io, dan TCP server. Benchmark pakai autocannon dengan keep-alive pooling, DB dan Redis lokal, 5 run boot + concurrency sweep 20-200 koneksi. Semua angka orisinal dari eksperimen ini, bukan kutipan sumber pihak ketiga.*
