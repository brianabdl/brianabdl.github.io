import Image from 'next/image';
import {documentation} from '@/app/documentation/documentation';

const Body = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-900">
            <main className="flex flex-col items-center justify-center flex-1 text-center max-w-6xl">
                <h1 className="text-2xl md:text-4xl font-bold pt-4 mb-2 text-white">Dokumentasi</h1>
                <p className="text-gray-400 mb-8 px-4">Koleksi dokumentasi kegiatan dan acara yang telah saya ikuti</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4 w-full">
                    {documentation.map((el, i) => (
                        <div className="flex flex-col items-center justify-start space-y-2 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-slate-800" key={i}>
                            <Image
                                className="rounded-lg shadow-lg object-cover aspect-video w-full hover:scale-105 transition-transform duration-300"
                                src={el.image}
                                alt={el.name}
                                loading='lazy'
                                width={0}
                                height={0}/>
                            <div className="flex flex-col items-center justify-center p-3 w-full">
                                <h2 className="text-sm md:text-lg text-balance font-bold text-white">{el.name}</h2>
                                <p className="text-xs md:text-sm text-gray-400">{el.date}</p>
                                <p className="text-xs md:text-sm text-gray-500">{el.place}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Body;