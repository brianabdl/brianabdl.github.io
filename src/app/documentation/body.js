const documentation = [
    { id: 1, image: 'https://picsum.photos/200/300', name: 'Dokumentasi 1', date: '2021-10-01', place: 'Bogor' },
    { id: 2, image: 'https://picsum.photos/200/300', name: 'Dokumentasi 2', date: '2021-10-02', place: 'Jakarta' },
    { id: 3, image: 'https://picsum.photos/200/300', name: 'Dokumentasi 3', date: '2021-10-03', place: 'Bandung' },
    { id: 4, image: 'https://picsum.photos/200/300', name: 'Dokumentasi 4', date: '2021-10-04', place: 'Bekasi' },
    { id: 5, image: 'https://picsum.photos/200/300', name: 'Dokumentasi 5', date: '2021-10-05', place: 'Depok' },
    { id: 6, image: 'https://picsum.photos/200/300', name: 'Dokumentasi 6', date: '2021-10-06', place: 'Tangerang' },
    { id: 7, image: 'https://picsum.photos/200/300', name: 'Dokumentasi 7', date: '2021-10-07', place: 'Bogor' },
    { id: 8, image: 'https://picsum.photos/200/300', name: 'Dokumentasi 8', date: '2021-10-08', place: 'Jakarta' },
    { id: 9, image: 'https://picsum.photos/200/300', name: 'Dokumentasi 9', date: '2021-10-09', place: 'Bandung' },
];
const Body = () => {
    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center flex-1 text-center">
                <h1 className="text-4xl font-bold pt-4">Dokumentasi</h1>
                {/* Photo Gallery of my documentation life in with image, name, date, and place */}
            
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4 space-x-4">
                    {documentation.map((el, i) => (
                        <>
                            <div>
                                <img className="h-auto max-w-full rounded-lg" src={el.image} alt={el.name} />
                                <p>{el.name}</p>
                                <p>{el.date}</p>
                                <p>{el.place}</p>
                            </div>
                        </>
                    ))}
                    </div>
            </main>
        </div>
    )
}

export default Body;