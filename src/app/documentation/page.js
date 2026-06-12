import Header from '@/app/header'
import Body from "./body";
import Footer from "@/app/footer";

export const metadata = {
  title: 'Documentation | M. Brian Abdillah',
  description: 'Documentation of activities and events attended by M. Brian Abdillah.',
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
