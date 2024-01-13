'use client';
const categories = [
    { name: "All categories", color: "blue", isSelected: true },
    { name: "Sekolah", color: "blue", isSelected: false },
    { name: "Magang", color: "blue", isSelected: false },
    { name: "Lainnya", color: "blue", isSelected: false },
];
const items = [
    { tags: "Gaming", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg", name: "Item 1", description: "Item 1" },
    { tags: "2", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg", name: "Item 2", description: "Item 2" },
    { tags: "3", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg", name: "Item 3", description: "Item 3" },
    { tags: "4", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg", name: "Item 4", description: "Item 4" },
    { tags: "5", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg", name: "Item 5", description: "Item 5" },
    { tags: "6", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg", name: "Item 6", description: "Item 6" },
];

const Body = () => {
    const changeThumbnail = async (item) => {
        const mainThumbnail = document.getElementById('main-thumbnail');
        const imageThumbnail = document.getElementById('image-thumbnail');

        if (imageThumbnail.src !== item.url) {
            imageThumbnail.classList.add('animate-pulse');

            // wait for 1 second
            await new Promise(r => setTimeout(r, 1000));
            imageThumbnail.src = item.url;
            mainThumbnail.classList.remove('hidden');

            // remove animation
            imageThumbnail.classList.remove('animate-pulse');
        }

        // scroll to title page
        const titlePage = document.getElementById('title-page');
        titlePage.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center flex-1 text-center">

                {/* Title Karya Saya */}
                <h1 id='title-page' className="text-4xl font-bold pt-4">Karya Saya</h1>

                {/* main default image thumbnail, image ratio 16:9 */}
                <div id='main-thumbnail' role="status" className="mt-8 mr-48 ml-48 hidden">
                    <img id='image-thumbnail' className="h-auto max-w-full rounded-lg" src="" alt="1" />
                </div>
                {/* tags */}
                <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                    {categories.map((el, i) => (
                        el.isSelected ? (
                            <button type="button" className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">{el.name}</button>
                        ) : (
                            <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">{el.name}</button>
                        )
                    ))}
                </div>
                {/* List available image */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4">
                    {items.map((el, i) => (
                        <>
                            <div>
                                <img className="h-auto max-w-full rounded-lg" onClick={() => changeThumbnail(el)} src={el.url} alt={el.tags} />
                            </div>
                        </>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Body;