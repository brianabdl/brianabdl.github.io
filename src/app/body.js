import React from 'react';
import Image from 'next/image'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faShekelSign, faVideoCamera} from '@fortawesome/free-solid-svg-icons';
import {faAndroid} from "@fortawesome/free-brands-svg-icons";


const Body = () => {
    return (
        <main className='w-full'>
            <div className='h-screen p-8 flex flex-col justify-center -mt-20'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl lg:text-6xl font-bold text-center'>Hi, I&apos;m Brian</h1>
                    <p className='text-xl lg:text-3xl lg:pt-4 text-center'>Student at SMK Pawyatan Daha 1 Kediri.</p>
                </div>
                <div className='flex flex-row justify-center items-center mt-8'>
                    <a href='/about'
                       className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-md'>Contact
                        Me</a>
                </div>
            </div>
            <div className='flex flex-row p-12 bg-white w-full'>
                <div className='flex flex-col md:flex-row justify-evenly items-center pl-12'>
                    <Image className='object-scale-down rounded-md shadow-black shadow-lg' width={300}
                           height={300}
                           src='me.jpg'
                           alt='profile'/>
                    <div className='pl-12 flex flex-col justify-center items-start pt-4 md:pt-0'>
                        <h1 className='text-2xl lg:text-3xl font-bold text-black'>Muhammad Brian Abdillah</h1>
                        <h2 className='text-xl lg:text-2xl text-gray-500'>Tinggal di Kediri, Jawa Timur</h2>
                        <p className='pt-4 text-lg lg:text-xl text-pretty text-gray-500'>Seorang pelajar yang sedang
                            menempuh pendidikan di SMK Pawyatan Daha 1 Kediri pada jurusan Multimedia. Seperti jurusan
                            yang diambil, ia adalah seorang yang multitalenta, berpendidikan, dan terpelajar.</p>
                        <a href='https://drive.google.com/drive/folders/1Tad9OEC0vh_lmlanVxY0QTXPVC-puVke?usp=sharing'
                           target='_opener'
                           className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-md mt-8'>Download
                            CV</a>
                    </div>
                </div>
            </div>
            {/* Background Story */}
            <div className='flex flex-col lg:flex-row items-start p-12 pl-24 pr-24 bg-white space-x-4'>
                <div className='flex flex-col justify-start items-center lg:items-start'>
                    <h1 className='text-2xl lg:text-3xl font-bold text-black'>Background Story</h1>
                    <a className='pt-4 text-lg lg:text-xl text-balance text-center lg:text-start max-w-4xl text-gray-600'>Memulai
                        membangung karir
                        sebagai programmer sejak SMP kemudian salah jurusan ketika SMK sehingga belajar terlalu banyak hal baru
                        yang cukup menyenangkan. Saat ini tetap memperjuangkan karir sebagai Android Developer namun
                        ditambah dengan keahlian mendesign.</a>
                </div>
                <div className='flex flex-col justify-start items-stretch space-y-4'>
                    <h1 className='text-2xl lg:text-3xl font-bold text-black items-center lg:pt-0'>Skills</h1>

                    <div className='flex flex-col justify-evenly items-stretch'>
                        {/* Multimedia contain Adobe Premiere Pro, Adobe Photoshop, Canva */}
                        <h2 className='text-lg lg:text-xl font-bold text-black'>* Multimedia</h2>
                        <div className='flex flex-row justify-between items-start pt-4 space-x-8'>
                            <div className='flex flex-col justify-start items-center'>
                                <Image className='object-scale-down' width={50} height={80} src='adobe-premiere.svg'
                                       alt='adobe premiere pro'/>
                                <p className='pt-4 text-lg lg:text-xl whitespace-nowrap	text-gray-500'>Premiere
                                    Pro</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <Image className='object-scale-down' width={50} height={50} src='photoshop.svg'
                                       alt='adobe photoshop'/>
                                <p className='pt-4 text-lg lg:text-xl text-gray-500'>Photoshop</p>
                            </div>
                            <div className='flex flex-col justify-end items-center'>
                                <Image className='object-scale-down' width={50} height={50} src='canva.svg'
                                       alt='canva'/>
                                <p className='pt-4 text-lg lg:text-xl text-gray-500'>Canva</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-evenly items-stretch'>
                        {/*  */}
                        <h2 className='text-lg lg:text-xl font-bold text-black'>* Programming</h2>
                        <div className='flex flex-row justify-between items-start pt-4 w-full'>
                            <div className='flex flex-col justify-start items-center'>
                                <Image className='object-scale-down' width={50} height={50}
                                       src='https://cdn.iconscout.com/icon/free/png-512/java-43-569305.png' alt='java'/>
                                <p className='pt-4 text-lg lg:text-xl text-gray-500'>Java</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <Image className='object-scale-down' width={50} height={50}
                                       src='https://cdn.iconscout.com/icon/free/png-512/kotlin-2038873-1720086.png'
                                       alt='kotlin'/>
                                <p className='pt-4 text-lg lg:text-xl text-gray-500'>Kotlin</p>
                            </div>
                            <div className='flex flex-col justify-end items-center'>
                                <Image className='object-scale-down' width={50} height={50}
                                       src='https://cdn.iconscout.com/icon/free/png-512/c-programming-569564.png'
                                       alt='c++'/>
                                <p className='pt-4 text-lg lg:text-xl text-gray-500'>C++</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Experience */}
            <div className='flex flex-col justify-between items-center p-12 bg-white'>
                <h1 className='w-full text-2xl lg:text-3xl font-bold text-black text-center'>Experience</h1>
                <p className='w-full pt-4 text-lg lg:text-xl text-gray-500 text-center'>Berikut adalah pengalaman yang
                    pernah saya dapatkan</p>
                <div className='flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0 space-y-8 p-12 bg-white pt-8'>
                    {/* Create box */}
                    <div
                        className='flex flex-col justify-start items-start p-8 max-w-64 hover:outline hover:outline-cyan-300 shadow-md shadow-cyan-400'>
                        {/* Logo */}
                        <div
                            className='rounded-full bg-cyan-200 border border-solid border-cyan-600 border-collapse w-10 p-2.5'>
                            <FontAwesomeIcon icon={faImage} color={"#0891b2"}/>
                        </div>
                        {/* Title */}
                        <h1 className='pt-4 text-md lg:text-lg text-black'>Photography</h1>
                        {/* Description */}
                        <p className='text-sm lg:text-base text-pretty text-gray-500'>Sekedar mempunyai hobi untuk
                            memotret hal yang bermakna bagi saya</p>
                    </div>
                    <div
                        className='flex flex-col justify-start items-start p-8 max-w-64 hover:outline hover:outline-rose-300 shadow-md shadow-rose-400'>
                        {/* Logo */}
                        <div
                            className='rounded-full bg-cyan-200 border border-solid border-cyan-600 border-collapse w-10 p-2.5'>
                            <FontAwesomeIcon icon={faShekelSign} color={"#0891b2"}/>
                        </div>
                        {/* Title */}
                        <h1 className='pt-4 text-md lg:text-lg text-black'>Graphic Design</h1>
                        {/* Description */}
                        <p className='text-sm lg:text-base text-pretty text-gray-500'>Mulai mempelajari Graphic Design
                            ketika masuk ke SMK jurusan Multimedia</p>
                    </div>
                    <div
                        className='flex flex-col justify-start items-start p-8 max-w-64 hover:outline hover:outline-lime-300 shadow-md shadow-lime-400'>
                        {/* Logo */}
                        <div
                            className='rounded-full bg-cyan-200 border border-solid border-cyan-600 border-collapse w-10 p-2.5'>
                            <FontAwesomeIcon icon={faVideoCamera} color={"#0891b2"}/>
                        </div>
                        {/* Title */}
                        <h1 className='pt-4 text-md lg:text-lg text-black'>Video Editing</h1>
                        {/* Description */}
                        <p className='text-sm lg:text-base text-pretty text-gray-500 '>Berkesempatan untuk ikut dalam
                            tim @mighty_octagram dan menjuarai beberapa perlombaan</p></div>
                    <div
                        className='flex flex-col justify-start items-start p-8 max-w-64 hover:outline hover:outline-indigo-300 shadow-md shadow-indigo-400'>
                        {/* Logo */}
                        <div
                            className='rounded-full bg-cyan-200 border border-solid border-cyan-600 border-collapse w-10 p-2.5'>
                            <FontAwesomeIcon icon={faAndroid} color={"#0891b2"}/>
                        </div>
                        {/* Title */}
                        <h1 className='pt-4 text-md lg:text-lg text-black'>Android Developer</h1>
                        {/* Description */}
                        <p className='text-sm lg:text-base text-pretty text-gray-500'>Saat ini sedang belajar dalam
                            dunia programming khususnya untuk platform Android</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-between items-center p-12 bg-white space-y-8'>
                <h1 className='w-full text-2xl lg:text-3xl font-bold text-center text-black'>Cari Tahu Lebih Lanjut</h1>
                {/*  Button navigate to about, karya, kontak  */}
                <div className='flex flex-col justify-between items-center'>
                    <div className='flex flex-row justify-center items-baseline space-x-4'>
                        <a href='/creation'
                           className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out font-bold py-2 px-4 rounded-md'>Karya</a>
                        <a href='/documentation'
                           className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out font-bold py-2 px-4 rounded-md'>Dokumentasi</a>
                    </div>
                    <div className='flex flex-row justify-center items-baseline space-x-4 mt-4'>
                        <a href='/about'
                           className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out font-bold py-2 px-4 rounded-md'>About
                            Me</a>
                        <a href='/about'
                           className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out font-bold py-2 px-4 rounded-md'>Contact
                            Me</a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Body;
