import Image from "next/image";

const Body = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-start flex-1 text-center">
                {/*    Profile picture from me.jpg */}
                <Image src='me.jpg' alt='Picture of the author' width={200} height={200} className='rounded-full'/>
                <h1 className="text-xl font-bold pt-4">
                    Halo, saya Brian
                </h1>
                <p className="mt-3 text-lg">
                    Student at SMK Pawyatan Daha 1 Kediri
                </p>

                {/*    Bio Data name, born, etc*/}
                <div className="flex flex-row justify-center items-center mt-4 space-x-2">
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
                        <p className="mt-2">Jl. Letjen Suprapto Gang 01 No 22</p>
                    </div>
                </div>
                {/*    Social Media */}
                <div className="flex flex-row justify-center items-center mt-4 space-x-8">

                    <div className="flex flex-col justify-center items-center space-y-2">
                        <h2 className='space-y-2 text-lg font-bold'>Instagram</h2>
                        <Image href="https://www.instagram.com/brianabdl/" target="_blank" rel="noreferrer"
                               src='Instagram.svg' alt='Instagram' width={50} height={50}/>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-2">
                        <h2 className='space-y-2 text-lg font-bold'>Twitter</h2>
                        <Image href="https://www.instagram.com/brianabdl/" target="_blank" rel="noreferrer"
                               src='Instagram.svg' alt='Instagram' width={50} height={50}/>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-2">
                        <h2 className='space-y-2 text-lg font-bold'>LinkedIn</h2>
                        <Image href="https://www.instagram.com/brianabdl/" target="_blank" rel="noreferrer"
                               src='Instagram.svg' alt='Instagram' width={50} height={50}/>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-2">
                        <h2 className='space-y-2 text-lg font-bold'>Github</h2>
                        <Image href="https:://github.com/brianabdl" target="_blank" rel="noreferrer"
                               src='github-mark-white.svg' alt='Instagram' width={50} height={50}/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Body;