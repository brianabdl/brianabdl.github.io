import Image from "next/image";
import {dictSocialMedia, SocialMedia} from "@/app/about/sosmed";

const Body = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center flex-1 text-center">
                <Image src='me.jpg' alt='Picture of the author' width={200} height={200} className='rounded-full'/>
                <h1 className="text-lg lg:text-xl font-bold pt-4">Halo, saya Brian</h1>
                <p className="mt-3 text-sm lg:text-lg">Siswa di SMK Pawyatan Daha 1 Kediri</p>

                {/* Bio Data */}
                <div className="flex flex-col justify-center items-center mt-12">
                    <h1 className="text-lg lg:text-xl font-bold">Bio Data</h1>
                    <div className="flex flex-col md:flex-row justify-stretch items-center mt-2 space-y-4 md:space-y-0 md:space-x-8">
                        <div className="flex flex-col justify-begin items-center md:w-1/3">
                            <h2 className="text-sm lg:text-lg font-bold whitespace-nowrap">Nama</h2>
                            <p className="mt-2 whitespace-nowrap">M. Brian Abdillah</p>
                        </div>
                        <div className="flex flex-col justify-center items-center md:w-1/3">
                            <h2 className="text-sm lg:text-lg font-bold whitespace-nowrap">Tempat, Tanggal Lahir</h2>
                            <p className="mt-2 whitespace-nowrap">Kediri, 21 Oktober 2005</p>
                        </div>
                        <div className="flex flex-col justify-end items-center md:w-1/3">
                            <h2 className="text-sm lg:text-lg font-bold whitespace-nowrap">Alamat</h2>
                            <p className="mt-2 whitespace-nowrap">Kediri, Jawa Timur, Indonesia</p>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-center pt-12 pb-4">
                    <h1 className="text-lg lg:text-xl font-bold">Media Social</h1>
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