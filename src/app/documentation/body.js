import Image from 'next/image';
import {documentation} from '@/app/documentation/documentation';

const Body = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center flex-1 text-center">
                <h1 className="text-4xl font-bold pt-4">Dokumentasi</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4">
                    {documentation.map((el, i) => (
                        <div className="flex flex-col items-center justify-start space-y-2" key={i}>
                            <Image
                                className="rounded-lg shadow-lg object-cover aspect-video w-full"
                                src={el.image}
                                alt={el.name}
                                width={0}
                                height={0}/>
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-lg text-balance font-bold">{el.name}</h2>
                                <p className="text-md">{el.date}</p>
                                <p className="text-md">{el.place}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Body;