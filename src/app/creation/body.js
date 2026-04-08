'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import Link from "next/link";


const categories = [
    {id: 1, name: "All Categories"},
    {id: 2, name: "Sekolah"},
    {id: 3, name: "Magang"},
];

const items = [
    {
        category_id: 3,
        name: "Website iLazis Blogger",
        url: "https://ilazis-software-keuangan-lazis.blogspot.com/",
        image: "creation/blogger-ilazis.png",
    },
    {
        category_id: 3,
        name: "Website iLazis Wordpress",
        url: "https://ilazis.wordpress.com/",
        image: "creation/wordpress-ilazis.png",
    },
    {
        category_id: 3,
        name: "Profile Website iLazis",
        url: "https://portofolio-ilazis.blogspot.com/",
        image: "creation/porto-website-ilazis.png",
    },
    {
        category_id: 2,
        name: "Lomba Vlog Cagar Budaya Kota Kediri",
        url: "https://www.youtube.com/embed/KBtVqS3-rUg",
    },
    {
        category_id: 2,
        name: "Lomba Video OPS Keselamatan Semeru 2023",
        url: "https://www.youtube.com/embed/ep0bpnURMp0",
    },
    {
        category_id: 2,
        name: "Lomba Digitalisasi Sejarah Nusantara Dalam Bingkai Nasionalisme 2023",
        url: "https://www.youtube.com/embed/L8svVtCuM6c",
    },
];

const Body = () => {
    const [selectedIndex, setSelectedIndex] = useState(1);

    const filteredItems = items.filter((el) => selectedIndex === 1 || el.category_id === selectedIndex);

    return (
        <div className="min-h-screen py-2 bg-slate-900">
            <main className="flex flex-col items-center justify-center flex-1 text-center">

                {/* Title Karya Saya */}
                <h1 id='title-page' className="text-2xl md:text-4xl font-bold pt-4 mb-2 text-white">Karya Saya</h1>
                <p className="text-gray-400 mb-8 px-4">Koleksi karya yang telah saya buat di berbagai kategori</p>

                {/* Tags */}
                <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                    {categories.map((el, i) =>
                        el.id === selectedIndex ? (
                            <button type="button"
                                    key={i}
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm md:text-base font-medium px-5 py-2.5 text-center me-3 mb-3 shadow-md hover:shadow-lg transition-all duration-200">{el.name}</button>
                        ) : (
                            <button type="button"
                                    key={i}
                                    onClick={() => setSelectedIndex(el.id)}
                                    className="text-gray-300 border border-slate-600 bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-600 rounded-full text-sm md:text-base font-medium px-5 py-2.5 text-center me-3 mb-3 transition-all duration-200">{el.name}</button>
                        )
                    )}
                </div>

                {/* List available image */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4 max-w-6xl">
                    {filteredItems.map((el, index) => {
                        return (<div key={index} className='flex flex-col items-center justify-start space-y-4 p-4 rounded-lg hover:bg-slate-800 transition-colors duration-200'>
                            {el.url.includes("youtube") ? (
                                <iframe className="aspect-video rounded-lg w-full shadow-md hover:shadow-lg transition-shadow duration-300" src={el.url} title={el.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen/>
                            ) : (
                                <Image className="aspect-video rounded-lg w-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300" src={el.image}
                                       loading='lazy'
                                       title={el.name} alt={el.name}
                                       width={0}
                                       height={0}/>
                            )}
                            <h1 className="text-sm md:text-lg font-bold text-white">{el.name}</h1>
                            <div className='pb-4'>
                                <Link href={el.url} target="_blank" rel="noopener noreferrer"
                                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm md:text-base font-medium px-5 py-2.5 text-center transition-all duration-200 shadow-md hover:shadow-lg inline-block">Visit</Link>
                            </div>
                        </div>)
                    })}
                </div>
            </main>
        </div>
    )
}

export default Body;