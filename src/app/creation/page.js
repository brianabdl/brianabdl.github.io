import Header from '@/app/header'
import Footer from "@/app/footer";
import Body from "@/app/creation/body";

export const metadata = {
  title: 'Projects | M. Brian Abdillah',
  description: 'Software projects built by M. Brian Abdillah — Android apps, web apps, and data tools across Kotlin, Python, and Laravel.',
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
