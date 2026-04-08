import Header from '@/app/header'
import Body from "./body";
import Footer from "@/app/footer";

export const metadata = {
  title: 'Tentang | M. Brian Abdillah',
  description: 'Profil lengkap M. Brian Abdillah - mahasiswa, developer, dan digital creator dari Kediri, Jawa Timur.',
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
