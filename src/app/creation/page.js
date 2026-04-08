import Header from '@/app/header'
import Footer from "@/app/footer";
import Body from "@/app/creation/body";

export const metadata = {
  title: 'Karya | M. Brian Abdillah',
  description: 'Koleksi karya dan proyek yang telah dikerjakan oleh M. Brian Abdillah termasuk website, video, dan desain grafis.',
}

export default function Home() {
    return (
        <div className="inter w-full">
        <Header/>
        <Body/>
        <Footer/>
        </div>
    )
}
