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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center flex-1 text-center">

                {/* Title Karya Saya */}
                <h1 id='title-page' className="text-4xl font-bold pt-4">Karya Saya</h1>

                {/* Tags */}
                <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                    {categories.map((el, i) =>
                        el.id === selectedIndex ? (
                            <button type="button"
                                    key={i}
                                    className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">{el.name}</button>
                        ) : (
                            <button type="button"
                                    key={i}
                                    onClick={() => setSelectedIndex(el.id)}
                                    className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">{el.name}</button>
                        )
                    )}
                </div>

                {/* List available image */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4">
                    {filteredItems.map((el) => {
                        return (<div key={el.id} className='flex flex-col items-center justify-start space-y-4'>
                            {el.url.includes("youtube") ? (
                                <iframe className="aspect-video rounded-lg w-full" src={el.url} title={el.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen/>
                            ) : (
                                <Image className="aspect-video rounded-lg w-full" src={el.image}
                                       title={el.name} alt={el.name}
                                       width={0}
                                       height={0}/>
                            )}
                            <h1 className="text-lg font-bold">{el.name}</h1>
                            <div className='pb-4'>
                                <Link href={el.url} target="_blank" rel="noopener noreferrer"
                                      className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">Visit</Link>
                            </div>
                        </div>)
                    })}
                </div>
            </main>
        </div>
    )
}

export default Body;