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
        <p className='pt-4 text-lg whitespace-nowrap md:text-xl text-gray-500'>{item.name}</p>
    </div>)
}

const Skills = ({title, items}) => {
    return (<div className='flex flex-col justify-evenly items-center md:items-stretch'>
        <h2 className='text-lg md:text-xl font-bold text-black'>{title}</h2>
        <div className='flex flex-row justify-between items-start pt-4 space-x-4'>
            {items.map((item) => (
                SkillsItem(item)
            ))}
        </div>
    </div>)
}

const ExpBox = ({title, description, image}) => (
    <div
        className='flex flex-col justify-start items-start p-8 max-w-64 hover:outline hover:outline-cyan-300 shadow-md shadow-cyan-400'>
        {/* Logo */}
        <div
            className='rounded-full bg-cyan-200 border border-solid border-cyan-600 border-collapse w-10 p-2.5'>
            <FontAwesomeIcon icon={image} color={"#0891b2"}/>
        </div>
        {/* Title */}
        <h1 className='pt-4 text-md md:text-lg text-black'>{title}</h1>
        {/* Description */}
        <p className='text-sm md:text-base text-pretty text-gray-500'>{description}</p>
    </div>
)

const Body = () => {
    return (
        <main className='w-full'>
            <div className='h-screen p-8 flex flex-col justify-center -mt-20'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl md:text-6xl font-bold text-center'>Hi, I&apos;m Brian</h1>
                    <p className='text-xl md:text-3xl md:pt-4 text-center'>Student at SMK Pawyatan Daha 1 Kediri.</p>
                </div>
                <div className='flex flex-row justify-center items-center mt-8'>
                    <Link href='/about'
                       className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-md'>Contact
                        Me</Link>
                </div>
            </div>
            <div className='flex flex-row bg-white w-full p-12'>
                <div className='flex flex-col md:flex-row justify-stretch items-center'>
                    <Image className='object-scale-down rounded-md shadow-black shadow-lg' width={300}
                           height={300}
                           src='me.jpg'
                           alt='profile'/>
                    <div className='flex flex-col justify-center items-center md:items-start md:pl-12 pt-4 md:pt-0'>
                        <h1 className='text-2xl md:text-3xl font-bold text-black'>Muhammad Brian Abdillah</h1>
                        <h2 className='text-xl md:text-2xl text-gray-500'>Tinggal di Kediri, Jawa Timur</h2>
                        <p className='pt-4 text-lg md:text-xl text-center md:text-start text-pretty text-gray-500'>Seorang
                            pelajar yang sedang
                            menempuh pendidikan di SMK Pawyatan Daha 1 Kediri pada jurusan Multimedia. Seperti jurusan
                            yang diambil, ia adalah seorang yang multitalenta, berpendidikan, dan terpelajar.</p>
                        <Link href='https://drive.google.com/drive/folders/1Tad9OEC0vh_lmlanVxY0QTXPVC-puVke?usp=sharing'
                           target='_opener'
                           className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-md mt-8'>Download
                            CV</Link>
                    </div>
                </div>
            </div>
            {/* Background Story */}
            <div className='flex flex-col md:flex-row items-start p-8 md:p-12 md:pr-24 bg-white md:space-x-4 w-full'>
                <div className='flex flex-col justify-start items-center md:items-start flex-grow '>
                    <h1 className='text-2xl md:text-3xl font-bold text-black'>Background Story</h1>
                    <p className='pt-4 text-lg md:text-xl text-balance text-center md:text-start max-w-4xl text-gray-600'>Memulai
                        membangung karir
                        sebagai programmer sejak SMP kemudian salah jurusan ketika SMK sehingga belajar terlalu banyak
                        hal baru
                        yang cukup menyenangkan. Saat ini tetap memperjuangkan karir sebagai Android Developer namun
                        ditambah dengan keahlian mendesign.</p>
                </div>
                <div className='flex flex-col justify-evenly items-start md:items-stretch md:flex-1 space-y-4'>
                    <h1 className='text-2xl md:text-3xl font-bold text-black pt-8 md:pt-0'>Skills</h1>
                    <Skills title='* Multimedia' items={[
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
                    <Skills title='* Programming' items={[
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
            <div className='flex flex-col items-center p-12 bg-white space-y-4'>
                <h1 className='w-full text-2xl md:text-3xl font-bold text-black text-center'>Experience</h1>
                <p className='w-full text-lg md:text-xl text-gray-500 text-center'>
                    Berikut adalah pengalaman yang pernah saya dapatkan
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:p-12 bg-white'>
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
            <div className='flex flex-col justify-between items-center p-12 bg-white space-y-8'>
                <h1 className='w-full text-2xl md:text-3xl font-bold text-center text-black'>Cari Tahu Lebih Lanjut</h1>
                {/*  Button navigate to about, karya, kontak  */}
                <div className='flex flex-col justify-between items-center'>
                    <div className='flex flex-row justify-center items-baseline space-x-4'>
                        <Link href='/creation'
                           className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out font-bold py-2 px-4 rounded-md'>Karya</Link>
                        <Link href='/documentation'
                           className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out font-bold py-2 px-4 rounded-md'>Dokumentasi</Link>
                    </div>
                    <div className='flex flex-row justify-center items-baseline space-x-4 mt-4'>
                        <Link href='/about'
                           className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out font-bold py-2 px-4 rounded-md'>About
                            Me</Link>
                        <Link href={'/about'}
                           className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out font-bold py-2 px-4 rounded-md'>Contact
                            Me</Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Body;
