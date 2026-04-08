import React from 'react';
import Image from 'next/image'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faShekelSign, faVideoCamera} from '@fortawesome/free-solid-svg-icons';
import {faAndroid} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const SkillsItem = (item) => {
    return (<div className='flex flex-col justify-start items-center'>
        <Image className='object-scale-down' width={50} height={50}
               src={item.image} alt={item.name}/>
        <p className='pt-4 text-lg whitespace-nowrap md:text-xl text-gray-400'>{item.name}</p>
    </div>)
}

const Skills = (props) => {
    return (<div className='flex flex-col justify-evenly items-stretch'>
        <h2 className='text-lg md:text-xl font-bold text-center md:text-start text-white mb-6'>{props.title}</h2>
        <div className='flex flex-row justify-between items-start pt-4 space-x-4'>
            {props.items.map((item, index) => (
                <React.Fragment key={index}>
                    {SkillsItem(item)}
                </React.Fragment>
            ))}
        </div>
    </div>)
}

const ExpBox = ({title, description, image}) => (
    <div
        className='flex flex-col justify-start items-start p-8 max-w-64 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out bg-slate-700 border border-slate-600 hover:border-cyan-400'>
        <div
            className='rounded-full bg-cyan-500 border border-solid border-cyan-400 w-10 h-10 p-3 flex items-center justify-center'>
            <FontAwesomeIcon icon={image} color={"#ffffff"}/>
        </div>
        <h1 className='text-md md:text-lg text-white pt-4 font-semibold'>{title}</h1>
        <p className='text-sm md:text-base text-pretty text-gray-300'>{description}</p>
    </div>
)

const Body = () => {
    return (
        <main className='w-full'>
            <div className='h-screen p-8 flex flex-col justify-center -mt-20'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl md:text-6xl font-bold text-center text-white'>Hi, I&apos;m Brian</h1>
                    <p className='text-xl md:text-3xl md:pt-4 text-center text-gray-300'>Student at State University of Surabaya.</p>
                </div>
                <div className='flex flex-row justify-center items-center mt-8'>
                    <a href='/about'
                          className='bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-200 ease-in-out text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105'>Contact
                        Me</a>
                </div>
            </div>
            <div className='flex flex-row bg-slate-800 w-full p-12 shadow-lg border-b border-slate-700'>
                <div className='flex flex-col md:flex-row justify-stretch items-center gap-8'>
                    <Image className='object-scale-down rounded-lg shadow-lg border-4 border-cyan-400' width={300}
                           loading='eager'
                           height={300}
                           src='me.jpg'
                           alt='profile'/>
                    <div className='flex flex-col justify-center items-center md:items-start md:pl-4 pt-4 md:pt-0'>
                        <h1 className='text-2xl md:text-3xl font-bold text-center text-white md:text-start'>Muhammad
                            Brian Abdillah</h1>
                        <h2 className='text-xl md:text-2xl text-cyan-400 font-semibold'>Tinggal di Kediri, Jawa Timur</h2>
                        <p className='text-lg md:text-xl pt-4 text-center md:text-start text-pretty text-gray-300'>Seorang
                            mahasiswa yang sedang
                            menempuh pendidikan di Universitas Negeri Surabaya pada jurusan Manajemen Informatika. Seperti jurusan
                            yang diambil, ia adalah seorang yang multitalenta, berpendidikan, dan terpelajar.</p>
                    </div>
                </div>
            </div>
            {/* Background Story */}
            <div className='flex flex-col md:flex-row items-start p-8 md:p-12 md:pr-24 bg-slate-800 md:space-x-8 w-full shadow-md border-b border-slate-700'>
                <div className='flex flex-col justify-start items-center md:items-start flex-grow'>
                    <h1 className='text-2xl md:text-3xl font-bold text-white'>Background Story</h1>
                    <p className='pt-4 text-lg md:text-xl text-balance text-center md:text-start max-w-4xl text-gray-300'>Memulai
                        membangung karir
                        sebagai programmer sejak SMP kemudian salah jurusan ketika SMK sehingga belajar terlalu banyak
                        hal baru
                        yang cukup menyenangkan. Saat ini tetap memperjuangkan karir sebagai Android Developer namun
                        ditambah dengan keahlian mendesign.</p>
                </div>
                <div className='flex flex-col justify-evenly items-center md:items-stretch md:flex-1 space-y-4 w-full'>
                    <h1 className='text-2xl md:text-3xl font-bold text-white pt-8 md:pt-0 '>Skills</h1>
                    <Skills title='Multimedia' items={[
                        {
                            name: 'Premiere Pro',
                            image: 'adobe-premiere.svg',
                        },
                        {
                            name: 'Photoshop',
                            image: 'photoshop.svg',
                        },
                        {
                            name: 'Canva',
                            image: 'canva.svg',
                        }
                    ]}/>
                    <Skills title='Programming' items={[
                        {
                            name: 'Java',
                            image: 'https://cdn.iconscout.com/icon/free/png-512/java-43-569305.png'
                        },
                        {
                            name: 'Kotlin',
                            image: 'https://cdn.iconscout.com/icon/free/png-512/kotlin-2038873-1720086.png'
                        },
                        {
                            name: 'C++',
                            image: 'https://cdn.iconscout.com/icon/free/png-512/c-programming-569564.png'
                        }
                    ]}/>
                </div>
            </div>
            {/* Experience */}
            <div className='flex flex-col items-center p-12 bg-slate-800 space-y-4 shadow-lg border-b border-slate-700'>
                <h1 className='w-full text-2xl md:text-3xl font-bold text-white text-center'>Experience</h1>
                <p className='w-full text-lg md:text-xl text-gray-300 text-center'>
                    Berikut adalah pengalaman dan keahlian yang pernah saya dapatkan
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:p-12 bg-slate-800 w-full'>
                    <ExpBox
                        title='Android Developer'
                        description='Saat ini sedang belajar dalam dunia programming khususnya untuk platform Android'
                        image={faAndroid}
                    />
                    <ExpBox
                        title='Photography'
                        description='Sekedar mempunyai hobi untuk memotret hal yang bermakna bagi saya'
                        image={faImage}
                    />
                    <ExpBox
                        title='Graphic Design'
                        description='Mulai mempelajari Graphic Design ketika masuk ke SMK jurusan Multimedia'
                        image={faShekelSign}
                    />
                    <ExpBox
                        title='Video Editing'
                        description='Berkesempatan untuk ikut dalam tim @mighty_octagram dan menjuarai beberapa perlombaan'
                        image={faVideoCamera}
                    />
                </div>
            </div>
            <div className='flex flex-col justify-between items-center p-12 bg-slate-800 space-y-8 shadow-lg border-b border-slate-700'>
                <h1 className='w-full text-2xl md:text-3xl font-bold text-center text-white'>Cari Tahu Lebih Lanjut</h1>
                <p className='text-gray-300 text-center text-lg'>Temukan lebih banyak tentang proyek dan pengalaman saya</p>
                {/*  Button navigate to about, karya, kontak  */}
                <div className='flex flex-col justify-between items-center'>
                    <div className='flex flex-row justify-center items-baseline space-x-4'>
                        <a href='/creation'
                              className='bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-200 ease-in-out font-bold py-3 px-6 rounded-lg transform hover:scale-105'>Karya</a>
                        <a href='/documentation'
                              className='bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-200 ease-in-out font-bold py-3 px-6 rounded-lg transform hover:scale-105'>Dokumentasi</a>
                    </div>
                    <div className='flex flex-row justify-center items-baseline space-x-4 mt-4'>
                        <a href='/about'
                              className='bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-200 ease-in-out font-bold py-3 px-6 rounded-lg transform hover:scale-105'>About
                            Me</a>
                        <a href='/about'
                              className='bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-200 ease-in-out font-bold py-3 px-6 rounded-lg transform hover:scale-105'>Contact
                            Me</a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Body;
