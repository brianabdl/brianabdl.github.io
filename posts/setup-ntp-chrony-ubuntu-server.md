---
title: "Cara Setup NTP di Server Ubuntu dengan Chrony"
date: "2026-08-31"
description: "Panduan instalasi dan konfigurasi chrony di Ubuntu Server: verifikasi sinkronisasi, hardening firewall, dan troubleshooting."
tags: [ubuntu, ntp, chrony, sysadmin, linux]
cover: "/blog/cover/ntp-chrony-ubuntu.svg"
---

Jam server yang meleset beberapa detik saja bisa bikin TLS handshake gagal, token JWT ditolak sebelum waktunya, atau node di cluster Kafka/etcd saling curiga satu sama lain. Root cause-nya hampir selalu sama: NTP nggak jalan, atau jalan tapi salah konfigurasi.

[Ubuntu](/blog/tags/ubuntu) sudah punya `systemd-timesyncd` bawaan untuk sinkronisasi dasar, tapi begitu server butuh akurasi lebih baik, mode server (untuk melayani host lain di jaringan internal), atau autentikasi lewat Network Time Security (NTS), jawabannya **chrony**. Bahkan, sejak Ubuntu 25.10, chrony sudah jadi default time-sync service ([Ubuntu Server documentation](https://ubuntu.com/server/docs/explanation/networking/about-time-synchronisation/)), termasuk di 26.04 LTS "Resolute Raccoon", LTS yang dirilis 23 April 2026 ([pengumuman resmi Canonical](https://canonical.com/blog/canonical-releases-ubuntu-26-04-lts-resolute-raccoon)) dan paling banyak dipakai saat artikel ini ditulis. Kalau masih pegang instance 22.04 atau 24.04, chrony tetap perlu diinstal manual.

Panduan ini jalan dari nol: install, konfigurasi sumber waktu, verifikasi sinkron, sampai opsional menjadikan server ini NTP server untuk jaringan internal sendiri.

> **What you will get:**
> - Chrony terinstal dan aktif
> - Sinkronisasi terverifikasi lewat `chronyc tracking` dan `chronyc sources`.
> - Pemahaman kapan pakai default pool Ubuntu vs pool custom, dan cara baca offset/stratum di output chrony
> - (Opsional) server ini jadi sumber NTP untuk mesin lain di jaringan internal, lengkap dengan aturan firewall-nya

## NTP, Stratum, dan Kenapa Chrony

NTP (Network Time Protocol) bekerja lewat hierarki sumber waktu yang disebut *stratum*. Stratum 0 adalah jam fisik, atomic clock, atau GPS receiver. Stratum 1 adalah server yang terhubung langsung ke stratum 0. Server publik yang biasa dipakai client (termasuk pool Ubuntu) umumnya stratum 2 atau 3, karena mereka mengambil waktu dari stratum di atasnya lalu diteruskan ke bawah:

```text
Stratum 0: Atomic clock / GPS  (bukan device jaringan)
Stratum 1: Server terhubung langsung ke stratum 0
Stratum 2: Server sinkron ke stratum 1   <- kebanyakan server pool.ntp.org
Stratum 3: Server sinkron ke stratum 2   <- server kamu biasanya di sini
   ...
Stratum 16: Unsynchronized (tidak valid)
```

Semakin rendah angka stratum, semakin dekat ke sumber waktu asli, dan biasanya semakin akurat. Client seperti chrony nggak asal pakai satu server: dia polling beberapa sumber sekaligus, membandingkan offset masing-masing, membuang yang menyimpang (falseticker), lalu menghitung estimasi waktu terbaik dari kombinasi sumber yang tersisa.

Dibanding `systemd-timesyncd`, chrony punya keunggulan konkret yang disebut langsung di dokumentasi Ubuntu: *"chrony will generally keep your time in sync and can be set up as a time server, timesyncd can help with simpler cases"* ([Ubuntu Server: About time synchronization](https://ubuntu.com/server/docs/explanation/networking/about-time-synchronisation/)). Bedanya bukan cuma soal fitur server, soalnya `timesyncd` tidak punya mode server sama sekali, sementara chrony bisa jadi client sekaligus server dalam satu daemon yang sama.

| Aspek | `systemd-timesyncd` | `chrony` |
|---|---|---|
| Mode server (melayani client lain) | Tidak ada | Ada |
| Autentikasi NTS | Tidak didukung | Didukung |
| Koreksi offset besar saat boot | Step langsung, tanpa kontrol halus | Bisa diatur presisi lewat `makestep` |
| Histori/statistik per sumber waktu | Tidak disimpan | Disimpan (`chronyc sourcestats`) |
| Default di Ubuntu | 20.04–25.04 | 25.10 ke atas |
| Cocok untuk | VM cloud dengan NTP provider stabil, use case sederhana | Server produksi, bare-metal, atau jadi NTP server internal |

## Prasyarat

- Server Ubuntu 20.04/22.04/24.04 LTS (atau 25.10+ yang sudah include chrony secara default)
- Akses `sudo`
- Outbound UDP port 123 terbuka ke internet (atau ke NTP server internal, kalau pakai itu)
- Waktu pengerjaan: ~15–20 menit

## Langkah 1: Cek Status Waktu Saat Ini

Sebelum ubah apa pun, lihat dulu kondisi baseline-nya:

```bash
timedatectl status
```

Perhatikan baris `System clock synchronized` dan `NTP service`. Kalau masih `systemd-timesyncd active`, itu artinya daemon bawaan yang sedang jalan, normal untuk instalasi default sebelum 25.10. Catat dulu, karena baris ini yang akan berubah setelah chrony aktif.

## Langkah 2: Install Chrony

```bash
sudo apt update
sudo apt install chrony -y
```

**Poin penting:** paket chrony di Debian/Ubuntu punya *conflict* eksplisit dengan `systemd-timesyncd` di level packaging, jadi begitu instalasi selesai, `systemd-timesyncd` otomatis dihentikan dan dinonaktifkan, tanpa perlu kamu matikan manual. Ini mencegah kondisi dua daemon rebutan mengatur jam sistem yang sama, yang kalau dibiarkan menghasilkan *offset* dan *jitter* yang tidak stabil karena kedua service saling override.

Verifikasi service-nya jalan:

```bash
sudo systemctl status chrony.service
```

Kalau entah kenapa `systemd-timesyncd` masih aktif (misalnya di server yang di-upgrade dari rilis lama, bukan instalasi baru), matikan manual:

```bash
sudo systemctl disable --now systemd-timesyncd
sudo systemctl enable --now chrony
```

## Langkah 3: Konfigurasi Sumber Waktu

File konfigurasi utama ada di `/etc/chrony/chrony.conf`. Di Ubuntu 25.10 ke atas, sumber pool sudah dipisah ke `/etc/chrony/sources.d/ubuntu-ntp-pools.sources` dengan isi default seperti ini ([Ubuntu Server: Synchronize time using chrony](https://ubuntu.com/server/docs/how-to/networking/chrony-client/)):

```conf
pool 1.ntp.ubuntu.com iburst maxsources 1 nts prefer
pool 2.ntp.ubuntu.com iburst maxsources 1 nts prefer
pool 3.ntp.ubuntu.com iburst maxsources 1 nts prefer
pool 4.ntp.ubuntu.com iburst maxsources 1 nts prefer
pool ntp-bootstrap.ubuntu.com iburst maxsources 1 nts certset 1
```

Directive `nts` di sini mengaktifkan **Network Time Security**: autentikasi kriptografis untuk paket NTP, supaya waktu yang diterima tidak bisa dipalsukan lewat man-in-the-middle di jaringan. NTS butuh port tambahan 4460/tcp untuk key exchange, di luar port NTP standar 123/udp.

Untuk rilis LTS lama (22.04/24.04) yang chrony-nya diinstal manual, edit langsung `/etc/chrony/chrony.conf` dan ganti baris `pool`/`server` bawaan dengan pool publik:

```conf
pool ntp.ubuntu.com iburst maxsources 4
```

Atau kalau perusahaanmu punya NTP server internal (umum di jaringan dengan firewall ketat), arahkan ke situ saja: latensi lebih rendah, dan tidak bergantung ke internet:

```conf
server ntp-internal.contoh.internal iburst prefer
```

Setelah edit, reload konfigurasi tanpa restart penuh:

```bash
sudo systemctl restart chrony.service
```

## Langkah 4: Verifikasi Sinkronisasi

Ini langkah yang paling sering di-skip orang: instal lalu dianggap beres. Cek dulu sumber yang sedang dipakai:

```bash
chronyc sources -v
```

Contoh output dan cara bacanya:

```text
MS Name/IP address         Stratum Poll Reach LastRx Last sample
===============================================================================
^* ntp1.contoh.net               2   6   377     42    +120us[ +180us] +/-  8ms
^+ ntp2.contoh.net               3   6   377     45    -310us[ -250us] +/-  12ms
^- 10.20.0.5                     3   6   177     50    +2.1ms[ +2.3ms] +/-  20ms
```

- `^*`: sumber yang sedang dipakai sebagai referensi utama (best source).
- `^+`: kandidat lain yang juga dianggap valid dan dikombinasikan dalam perhitungan.
- `^-`: sumber yang tidak dipakai (biasanya karena dianggap kurang stabil dibanding yang lain).
- `Reach` (oktal): histori 8 polling terakhir; `377` = semua 8 polling terakhir sukses.
- Kolom offset (`+120us`, `-310us`): selisih waktu terukur dari sumber tersebut. Nilai di kisaran mikrodetik–milidetik itu normal untuk jaringan biasa.

Untuk ringkasan status tracking:

```bash
chronyc -N tracking
```

Field yang paling penting untuk dicek: `Reference ID` (server mana yang jadi acuan), `Stratum`, `System time` (offset absolut dari waktu referensi), dan `Leap status` (harus `Normal`, bukan `Not synchronised`).

Cara cepat lainnya, tanpa masuk detail chrony:

```bash
timedatectl status
```

Kalau `System clock synchronized: yes` dan `NTP service: active`, sinkronisasi sudah jalan.

## Langkah 5: Tangani Offset Besar Saat Boot

Server yang baru nyala dari image lama, VM yang lama suspend, atau container yang cold-start bisa punya jam yang meleset jauh, kadang menitan, bukan milidetik. Default chrony menolak melompat (*step*) jam terlalu besar setelah startup untuk menghindari waktu mundur tiba-tiba (yang bisa merusak timestamp file atau bikin cron job dobel-jalan).

Kontrolnya lewat directive `makestep`, ditulis di `chrony.conf`:

```conf
makestep 1.0 3
```

Artinya: kalau offset di atas 1.0 detik, chrony boleh langsung *step* (lompat), tapi hanya untuk 3 update pertama sejak daemon start. Setelah itu, koreksi apa pun dilakukan pelan-pelan lewat *slew* (mempercepat/memperlambat laju jam), bukan lompat, supaya aplikasi yang bergantung pada waktu monoton tidak kaget.

Untuk polling interval, dua directive lain yang relevan kalau server-nya sensitif terhadap beban jaringan atau butuh presisi lebih tinggi ([chrony.conf(5): chrony-project.org](https://chrony-project.org/doc/latest/chrony.conf.html)):

- `minpoll`: interval polling minimum, dalam pangkat 2 detik. Default `6` (64 detik).
- `maxpoll`: interval polling maksimum. Default `10` (1024 detik).

Server produksi yang butuh akurasi tinggi biasanya menurunkan `maxpoll` (misalnya ke `8`, atau 256 detik) supaya chrony lebih sering mengoreksi drift, dengan trade-off sedikit lebih banyak trafik NTP.

## Langkah 6 (Opsional): Jadikan Server Ini NTP Server Internal

Kalau punya beberapa server di jaringan yang sama, tidak semuanya perlu keluar ke internet untuk sinkron waktu: cukup satu server yang jadi *time source* internal. Di server yang dipilih, tambahkan directive `allow` di `chrony.conf` untuk mengizinkan subnet tertentu:

```conf
allow 10.20.0.0/24
```

Buka port UDP 123 di firewall:

```bash
sudo ufw allow from 10.20.0.0/24 to any port 123 proto udp
```

Restart chrony, lalu di sisi client, arahkan `server`/`pool` ke IP server internal ini. Untuk memastikan server benar-benar melayani request dari client lain:

```bash
chronyc sources
chronyc sourcestats
sudo chronyc -N clients -k
```

`chronyc clients` menampilkan daftar client yang sudah pernah request waktu ke server ini, lengkap jumlah paket NTP-nya; kalau kosong setelah beberapa menit padahal client sudah dikonfigurasi, curigai firewall dulu.

## Common Mistake

**1. Lupa buka port UDP 123 di firewall.**
Server sudah terkonfigurasi benar, tapi `chronyc sources` menunjukkan semua sumber dengan tanda `?` (unreachable). Penyebabnya hampir selalu security group/firewall yang memblokir outbound atau inbound UDP 123. Cek dengan `sudo ufw status` atau aturan security group cloud provider.

**2. Menganggap timezone dan NTP itu hal yang sama.**
`timedatectl set-timezone Asia/Jakarta` cuma mengubah *representasi* waktu yang ditampilkan, bukan sinkronisasi jam itu sendiri. Dua hal ini independen: server bisa punya timezone benar tapi jam-nya tetap meleset kalau NTP tidak jalan, atau sebaliknya.

**3. Chrony dan systemd-timesyncd jalan bersamaan.**
Biasanya terjadi di server hasil `dist-upgrade` dari rilis lama, bukan instalasi baru: konflik paket tidak selalu bersih di jalur upgrade. Cek dua-duanya eksplisit: `systemctl is-active chrony systemd-timesyncd`. Kalau dua-duanya `active`, matikan salah satu (lihat Langkah 2).

**4. Tidak sadar VM guest tetap butuh NTP sendiri.**
Hypervisor (VMware, KVM, Hyper-V) punya mekanisme sinkronisasi waktu sendiri lewat guest tools/agent. Tapi kalau agent itu tidak aktif atau host-nya sendiri driftnya besar, guest ikut ngaco. Jangan asumsikan "ini kan VM, pasti waktunya udah bener dari host": tetap jalankan chrony di dalam guest sebagai jalur independen.

**5. Restart daemon setelah tiap perubahan kecil, padahal ada cara lebih ringan.**
`systemctl restart chrony` memutus semua sumber dan mulai polling dari nol lagi; di server yang baru saja stabil sinkron, itu buang-buang waktu re-converge. Untuk sekadar menambah/reload source, `sudo chronyc reload sources` cukup dan tidak mereset statistik tracking yang sudah terkumpul.

## Final Result

Kalau semua langkah di atas beres, `chronyc -N tracking` menunjukkan `Leap status: Normal`, `timedatectl status` menunjukkan `System clock synchronized: yes`, dan `chronyc sources -v` menampilkan minimal satu baris dengan tanda `^*`. Offset seharusnya di kisaran mikrodetik sampai puluhan milidetik untuk sumber di internet, jauh lebih presisi dari yang dibutuhkan aplikasi web/database biasa.

Langkah lanjutan yang masuk akal dari sini: pantau `chronyc tracking` lewat monitoring stack yang sudah ada (Prometheus punya `chrony_exporter`), supaya drift besar kelihatan sebelum jadi masalah produksi, bukan sesudah TLS cert validation mulai gagal.

Tulisan teknis lain seputar Linux dan debugging sistem ada di [arsip blog](/blog) atau tag [#linux](/blog/tags/linux).

## Most Frequently Asked Questions (FAQ)

### Apakah ntpd (paket `ntp`) masih relevan?
Untuk instalasi baru, tidak disarankan. Ubuntu sudah menggantikan `ntpd`/`ntpdate` klasik dengan `systemd-timesyncd` sebagai default sejak 16.04, dan sekarang mendorong chrony sebagai pilihan penuh fitur. `ntpd` masih ada di repository untuk kompatibilitas legacy, tapi tidak menerima fitur baru seperti NTS.

### Berapa lama sampai jam benar-benar sinkron setelah instal?
Biasanya beberapa detik sampai satu menit untuk polling pertama berhasil dan status berubah jadi `Normal`. Kalau offset awal besar (menitan), lihat directive `makestep` di Langkah 5; tanpa itu, koreksi bisa makan waktu jauh lebih lama karena chrony sengaja mengoreksi pelan-pelan.

### Perlu buka port apa saja di firewall?
Minimal UDP 123 dua arah (outbound untuk client, atau inbound+outbound kalau server juga melayani client lain). Kalau pakai NTS, tambahkan TCP 4460 untuk key exchange.

### Bagaimana cara lihat log chrony kalau ada masalah?
```bash
journalctl -u chrony.service -f
```
Chrony juga bisa diminta cek langsung: `chronyc activity` menampilkan berapa sumber yang online, offline, dan belum bisa dijangkau, berguna untuk debugging cepat tanpa baca log panjang.

---

*Diverifikasi dokumentasi resmi Ubuntu Server dan chrony-project.org per Agustus 2026. Nama host dan IP di contoh output bersifat ilustratif.*
