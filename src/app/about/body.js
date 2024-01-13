import Image from "next/image";
import {dictSocialMedia, SocialMedia} from "@/app/about/sosmed";

const Body = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center flex-1 text-center">
                <Image src='me.jpg' alt='Picture of the author' width={200} height={200} className='rounded-full'/>
                <h1 className="text-xl font-bold pt-4">Halo, saya Brian</h1>
                <p className="mt-3 text-lg">Siswa di SMK Pawyatan Daha 1 Kediri</p>
                <div className="flex flex-col justify-center items-center mt-12">
                    <h1 className="text-xl font-bold">Bio Data</h1>
                    <div className="flex flex-row justify-center items-center mt-2 space-x-2">
                        <div className="flex flex-col justify-center items-center ">
                            <h2 className="text-lg font-bold">Nama</h2>
                            <p className="mt-2">M. Brian Abdillah</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h2 className="text-lg font-bold">Tempat, Tanggal Lahir</h2>
                            <p className="mt-2">Kediri, 21 Oktober 2005</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h2 className="text-lg font-bold">Alamat</h2>
                            <p className="mt-2">Kediri, Jawa Timur, Indonesia</p>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col justify-center items-center mt-12">
                    <h1 className="text-xl font-bold">Media Social</h1>
                    <div className="flex flex-row justify-center items-center mt-4 space-x-8">
                        {dictSocialMedia.map((item, index) => (
                            <>
                                <SocialMedia key={index} name={item.name} link={item.link} icon={item.icon}/>
                            </>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Body;