import { faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Body = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center flex-1 text-center">
                {/*    Profile picture from me.jpg */}
                <Image src='me.jpg' alt='Picture of the author' width={200} height={200} className='rounded-full' />
                <h1 className="text-xl font-bold pt-4">Halo, saya Brian</h1>
                <p className="mt-3 text-lg">Siswa di SMK Pawyatan Daha 1 Kediri</p>

                {/*    Bio Data name, born, etc*/}
                <div className="flex flex-col justify-center items-center mt-4">
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

                {/*    Social Media */}
                <div className="flex flex-col justify-center items-center mt-4">
                    <h1 className="text-xl font-bold">Media Social</h1>
                    <div className="flex flex-row justify-center items-center mt-4 space-x-8">
                        <div className="flex flex-col justify-center items-center space-y-2">
                            <h2 className='space-y-2 text-lg font-bold'>Instagram</h2>
                            <a href="https://www.instagram.com/brianabdl/" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faInstagram} alt='Instagram' width={50} height={50} />
                            </a>
                        </div>

                        <div className="flex flex-col justify-center items-center space-y-2">
                            <h2 className='space-y-2 text-lg font-bold'>Twitter</h2>
                            <a href="https://www.twitter.com/brianabdl/" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faTwitter} alt='Instagram' width={50} height={50} />
                            </a>
                        </div>

                        <div className="flex flex-col justify-center items-center space-y-2">
                            <h2 className='space-y-2 text-lg font-bold'>LinkedIn</h2>
                            <a href="https://www.linkedin.com/in/muhammad-brian-abdillah-57b872242/" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} alt='LinkedIn' width={50} height={50} />
                            </a>
                        </div>

                        <div className="flex flex-col justify-center items-center space-y-2">
                            <h2 className='space-y-2 text-lg font-bold'>Github</h2>
                            <a href="https://github.com/brianabdl/" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faGithub} alt='Github' width={50} height={50} />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Body;