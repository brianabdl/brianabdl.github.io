import React from 'react';

const Body = () => {
    return (
        <main className='w-full'>
            <div className='h-screen p-8 flex flex-col justify-center -mt-20'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl lg:text-6xl font-bold text-center'>Hi, I&apos;m Brian</h1>
                    <p className='text-xl lg:text-3xl lg:pt-4 text-center'>Student at SMK Pawyatan Daha 1 Kediri.</p>
                </div>
                <div className='flex flex-row justify-center items-center mt-8'>
                    <a href='/contact' className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-md'>Contact Me</a>
                </div>
            </div>
            <div className='flex flex-row p-12 bg-white w-full'>
                <div className='flex flex-col md:flex-row justify-evenly items-center pl-12'>
                    <img className='object-scale-down w-3/6 lg:w-2/6 rounded-md shadow-black shadow-lg' src='https://blogger.googleusercontent.com/img/a/AVvXsEjzHXquRYal5cZTG4PYh3qu7IYEYjRCG3na39jwuHNa1v7DnbzTZrQhPk72Zn59mPH8SRWv3XfkXblQLgD9NuJLT1RoN_xhaTFJ6fFSCdMQU-16RFL7L_d6M0zZqiJDhIz6QWE6030-2utpaErnRXBiKY7TPfrVsDAk5leo-djbqPgEcJutYZm_gGIh8of6' alt='profile' />
                    <div className='pl-12 flex flex-col justify-center items-start pt-4 md:pt-0'>
                        <h1 className='text-2xl lg:text-3xl font-bold text-black'>Muhammad Brian Abdillah</h1>
                        <h2 className='text-xl lg:text-2xl text-gray-500'>Tinggal di Kediri, Jawa Timur</h2>
                        <p className='pt-4 text-lg lg:text-xl text-pretty text-gray-500'>Seorang pelajar yang sedang menempuh pendidikan di SMK Pawyatan Daha 1 Kediri pada jurusan Multimedia. Seperti jurusan yang diambil, ia adalah seorang yang multitalenta, berpendidikan, dan terpelajar.</p>
                        <a href='https://drive.google.com/drive/folders/1Tad9OEC0vh_lmlanVxY0QTXPVC-puVke?usp=sharing' target='_opener' className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-md mt-8'>Download CV</a>
                    </div>
                </div>
            </div>
            {/* Background Story */}
            <div className='flex flex-col lg:flex-row justify-between items-start p-12 pl-24 pr-24 bg-white'>
                <div className='flex flex-col items-start'>
                    <h1 className='text-2xl lg:text-3xl font-bold text-black'>Background Story</h1>
                    <a className='pt-4 text-lg lg:text-xl text-balance max-w-4xl text-gray-600'>Memulai membangung karir programming sejak SMP kemudian salah jurusan ketika SMK sehingga belajar terlalu banyak hal baru yang cukup menyenangkan. Saat ini tetap memperjuangkan karir sebagai Android Developer namun ditambah dengan keahlian mendesign.</a>
                </div>
                <div className='flex flex-col pr-12'>
                    <h1 className='text-2xl lg:text-3xl font-bold text-black pt-4 md:pt-0'>Skills</h1>

                    <div className='flex flex-col justify-start items-start pt-4'>
                        {/* Multimedia contain Adobe Premiere Pro, Adobe Photoshop, Canva */}
                        <h2 className='text-lg lg:text-xl font-bold text-black'>* Multimedia</h2>
                        <div className='flex flex-row justify-evenly items-start pt-4'>
                            <div className='flex flex-col justify-center items-center'>
                                <img className='object-scale-down w-10' src='adobe-premiere.svg' alt='adobe premiere pro' />
                                <p className='pt-4 text-lg lg:text-xl whitespace-nowrap	text-gray-500'>Premiere Pro</p>
                            </div>
                            <div className='flex flex-col justify-center items-center pl-12'>
                                <img className='object-scale-down w-10' src='photoshop.svg' alt='adobe photoshop' />
                                <p className='pt-4 text-lg lg:text-xl text-gray-500'>Photoshop</p>
                            </div>
                            <div className='flex flex-col justify-center items-center pl-12'>
                                <img className='object-scale-down w-10' src='canva.svg' alt='canva' />
                                <p className='pt-4 text-lg lg:text-xl text-gray-500'>Canva</p>
                            </div>
                        </div>
                        {/*  */}
                        <h2 className='text-lg lg:text-xl font-bold text-black pt-4'>* Programming</h2>
                        <div className='flex flex-row justify-evenly items-start pt-4'>
                            <div className='flex flex-col justify-center items-center'>
                                <img className='object-scale-down w-10' src='https://cdn.iconscout.com/icon/free/png-512/java-43-569305.png' alt='java' />
                                <p className='pt-4 text-lg lg:text-xl text-gray-500'>Java</p>
                            </div>
                            <div className='flex flex-col justify-center items-center pl-12'>
                                <img className='object-scale-down w-10' src='https://cdn.iconscout.com/icon/free/png-512/kotlin-2038873-1720086.png' alt='kotlin' />
                                <p className='pt-4 text-lg lg:text-xl text-gray-500'>Kotlin</p>
                            </div>
                            <div className='flex flex-col justify-center items-center pl-12'>
                                <img className='object-scale-down w-10' src='https://cdn.iconscout.com/icon/free/png-512/c-programming-569564.png' alt='c++' />
                                <p className='pt-4 text-lg lg:text-xl text-gray-500'>C++</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Experience */}
            <div className='flex flex-col justify-between items-center p-12 bg-white'>
                <h1 className='w-full text-2xl lg:text-3xl font-bold text-black text-center'>Experience</h1>
                <p className='w-full pt-4 text-lg lg:text-xl text-gray-500 text-center'>Berikut adalah pengalaman yang pernah saya dapatkan</p>
                <div className='flex flex-row space-x-12 p-12 bg-white pt-8'>
                    {/* Create box */}
                    <div className='flex flex-col justify-start items-start p-8 shadow-md max-w-64 hover:outline hover:outline-cyan-300 shadow-md shadow-cyan-400'>
                        {/* Logo */}
                        <img className='object-scale-down w-8' src='https://cdn.iconscout.com/icon/free/png-512/google-203-569257.png' alt='google' />
                        {/* Title */}
                        <h1 className='pt-4 text-md lg:text-lg text-black'>Photography</h1>
                        {/* Description */}
                        <p className='text-sm lg:text-base text-pretty text-gray-500 text-wrap'>Sekedar mempunyai hobi untuk memotret hal yang bermakna bagi saya</p>
                    </div>
                    <div className='flex flex-col justify-start items-start p-8 shadow-md max-w-64 hover:outline hover:outline-rose-300 shadow-md shadow-rose-400'>
                        {/* Logo */}
                        <img className='object-scale-down w-8' src='https://cdn.iconscout.com/icon/free/png-512/google-203-569257.png' alt='google' />
                        {/* Title */}
                        <h1 className='pt-4 text-md lg:text-lg text-black'>Graphic Design</h1>
                        {/* Description */}
                        <p className='text-sm lg:text-base text-pretty text-gray-500 text-wrap'>Mulai mempelajari Graphic Design ketika masuk ke SMK jurusan Multimedia</p>
                    </div>
                    <div className='flex flex-col justify-start items-start p-8 shadow-md max-w-64 hover:outline hover:outline-lime-300 shadow-md shadow-lime-400'>
                        {/* Logo */}
                        <img className='object-scale-down w-8' src='https://cdn.iconscout.com/icon/free/png-512/google-203-569257.png' alt='google' />
                        {/* Title */}
                        <h1 className='pt-4 text-md lg:text-lg text-black'>Video Editing</h1>
                        {/* Description */}
                        <p className='text-sm lg:text-base text-pretty text-gray-500 text-wrap'>Berkesempatan untuk ikut dalam tim @mighty_octagram dan menjuarai beberapa perlombaan</p>                </div>
                    <div className='flex flex-col justify-start items-start p-8 shadow-md max-w-64 hover:outline hover:outline-indigo-300 shadow-md shadow-indigo-400'>
                        {/* Logo */}
                        <img className='object-scale-down w-8' src='https://cdn.iconscout.com/icon/free/png-512/google-203-569257.png' alt='google' />
                        {/* Title */}
                        <h1 className='pt-4 text-md lg:text-lg text-black'>Android Developer</h1>
                        {/* Description */}
                        <p className='text-sm lg:text-base text-pretty text-gray-500 text-wrap'>Saat ini sedang belajar dalam dunia programming khususnya untuk platform Android</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Body;
