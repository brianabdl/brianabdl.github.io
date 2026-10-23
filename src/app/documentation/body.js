import Image from 'next/image';
import { documentation } from '@/app/documentation/documentation';

export default function Body() {
  return <main className="page-wrap">
    <p className="section-kicker">Archive / Field notes</p>
    <h1 className="page-title display">Documentation.</h1>
    <p className="page-intro">A visual record of the activities, competitions, and events I&apos;ve taken part in.</p>
    <div className="story-stream mt-14">
      {documentation.map((item, index) => <article key={`${item.name}-${index}`} className="outline-card grid overflow-hidden md:grid-cols-[minmax(240px,38%)_1fr]">
        <Image className="h-full min-h-[210px] w-full object-cover" src={`/${item.image}`} alt={item.name} loading="lazy" width={640} height={400} />
        <div className="p-6 md:p-8"><p className="timestamp">{item.date}</p><h2 className="mt-4 text-2xl font-bold text-white">{item.name}</h2><p className="mt-3 text-gray-400">{item.place}</p></div>
      </article>)}
    </div>
  </main>;
}
