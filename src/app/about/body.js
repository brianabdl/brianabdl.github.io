import Image from "next/image";
import {dictSocialMedia, SocialMedia} from "@/app/about/sosmed";

const Body = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-900">
            <main className="flex flex-col items-center justify-center flex-1 text-center">
                <Image loading='lazy' src='me.jpg' alt='Picture of the author' width={200} height={200} className='rounded-full shadow-lg border-4 border-cyan-400'/>
                <h1 className="text-lg lg:text-xl font-bold pt-4 text-white">Hi, I&apos;m Brian</h1>
                <p className="mt-3 text-sm lg:text-lg text-gray-400">Student at State University of Surabaya</p>

                {/* Bio Data */}
                <div className="flex flex-col justify-center items-center mt-12 w-full max-w-4xl px-4">
                    <h1 className="text-lg lg:text-xl font-bold whitespace-nowrap mb-8 text-white">Biodata</h1>
                    <div className="flex flex-col md:flex-row justify-stretch items-center mt-2 space-y-4 md:space-y-0 md:space-x-8 w-full">
                        <div className="flex flex-col justify-begin items-center md:w-1/3 p-6 rounded-lg bg-slate-800 border border-slate-700 shadow-md">
                            <h2 className="text-sm lg:text-lg font-bold whitespace-nowrap text-white">Nama</h2>
                            <p className="mt-2 whitespace-nowrap text-gray-300 font-medium">M. Brian Abdillah</p>
                        </div>
                        <div className="flex flex-col justify-center items-center md:w-1/3 p-6 rounded-lg bg-slate-800 border border-slate-700 shadow-md">
                            <h2 className="text-sm lg:text-lg font-bold whitespace-nowrap text-white">Tempat, Tanggal Lahir</h2>
                            <p className="mt-2 whitespace-nowrap text-gray-300 font-medium">Kediri, 21 Oktober 2005</p>
                        </div>
                        <div className="flex flex-col justify-end items-center md:w-1/3 p-6 rounded-lg bg-slate-800 border border-slate-700 shadow-md">
                            <h2 className="text-sm lg:text-lg font-bold whitespace-nowrap text-white">Alamat</h2>
                            <p className="mt-2 whitespace-nowrap text-gray-300 font-medium">Kediri, Jawa Timur, Indonesia</p>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-center pt-12 pb-4">
                    <h1 className="text-lg lg:text-xl font-bold mb-6 text-white">Media Social</h1>
                    <div className="grid grid-cols-3 md:grid-flow-col-dense gap-8 mt-4">
                        {dictSocialMedia.map((item, index) => (
                            <SocialMedia key={index} name={item.name} link={item.link} icon={item.icon}/>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Body;