import Header from '@/app/header'
import Body from "./body";
import Footer from "@/app/footer";

export const metadata = {
  title: 'Dokumentasi | M. Brian Abdillah',
  description: 'Dokumentasi kegiatan dan acara yang telah diikuti oleh M. Brian Abdillah.',
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
