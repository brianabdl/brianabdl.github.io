import Image from 'next/image';
import { documentation } from '@/app/documentation/documentation';

function getYear(item) {
  const match = item.date.match(/\d{4}/);
  return match ? match[0] : 'Other';
}

function getType(item) {
  const name = item.name.toLowerCase();
  if (name.includes('internship')) return 'Internship';
  if (name.includes('competition') || name.includes('place')) return 'Competition';
  if (name.includes('volunteer')) return 'Volunteer';
  if (name.includes('organizing') || name.includes('committee')) return 'Committee';
  if (name.includes('mentor')) return 'Mentor';
  if (name.includes('visit') || name.includes('industry')) return 'Visit';
  if (name.includes('ceo')) return 'Leadership';
  if (name.includes('finalist')) return 'Competition';
  return 'Event';
}

function isUpcoming(item) {
  const currentYear = new Date().getFullYear();
  const year = parseInt(item.date.match(/\d{4}/)?.[0] || '0');
  if (year > currentYear) return true;
  if (item.date.toLowerCase().includes('agustus') && year === currentYear) return true;
  if (item.name.toLowerCase().includes('toshin') && year === 2026) return true;
  return false;
}

export default function Body() {
  const items = documentation.slice();
  const grouped = items
    .sort((a, b) => {
      const yearA = parseInt(a.date.match(/\d{4}/)?.[0] || '0');
      const yearB = parseInt(b.date.match(/\d{4}/)?.[0] || '0');
      if (yearB !== yearA) return yearB - yearA;
      const upcomingA = isUpcoming(a);
      const upcomingB = isUpcoming(b);
      if (upcomingB !== upcomingA) return upcomingB ? 1 : -1;
      return b.id - a.id;
    })
    .reduce((acc, item) => {
      const year = getYear(item);
      acc[year] = acc[year] || [];
      acc[year].push(item);
      return acc;
    }, {});

  const sortedYears = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  
  const stats = {
    total: items.length,
    competitions: items.filter(i => getType(i) === 'Competition').length,
    internships: items.filter(i => getType(i) === 'Internship').length,
    years: sortedYears.length
  };

  return (
    <main className="page-wrap">
      <p className="section-kicker">Archive / Field notes</p>
      <h1 className="page-title display">Documentation.</h1>
      <p className="page-intro">
        A visual record of the activities, competitions, and events I&apos;ve taken part in.
      </p>
      
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
        <div className="outline-card p-4 text-center">
          <p className="text-2xl font-bold text-[color:var(--mint)]">{stats.total}</p>
          <p className="mono text-[10px] tracking-[1.6px] text-[color:var(--muted)] mt-1">TOTAL</p>
        </div>
        <div className="outline-card p-4 text-center">
          <p className="text-2xl font-bold text-white">{stats.competitions}</p>
          <p className="mono text-[10px] tracking-[1.6px] text-[color:var(--muted)] mt-1">AWARDS</p>
        </div>
        <div className="outline-card p-4 text-center">
          <p className="text-2xl font-bold text-white">{stats.internships}</p>
          <p className="mono text-[10px] tracking-[1.6px] text-[color:var(--muted)] mt-1">INTERNSHIPS</p>
        </div>
        <div className="outline-card p-4 text-center">
          <p className="text-2xl font-bold text-white">{stats.years}</p>
          <p className="mono text-[10px] tracking-[1.6px] text-[color:var(--muted)] mt-1">YEARS</p>
        </div>
      </div>
      
      {sortedYears.map((year) => (
        <section key={year} className="mt-16">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="mono text-sm tracking-[2px] text-[color:var(--mint)] px-3 py-1 border border-[color:var(--mint)] rounded-[20px]">
              {year}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[color:var(--purple-rule)] to-transparent" />
          </div>
          <div className="story-stream">
            {grouped[year].map((item, index) => {
              const type = getType(item);
              const upcoming = isUpcoming(item);
              return (
                <article 
                  key={`${item.id ?? item.name}-${index}`} 
                  className={`outline-card group grid overflow-hidden md:grid-cols-[minmax(260px,38%)_1fr] transition-all duration-300 ${upcoming ? 'ring-1 ring-[color:var(--yellow)]/30' : ''}`}
                >
                  <div className="relative overflow-hidden">
                    <Image 
                      className="h-full min-h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={`/${item.image}`} 
                      alt={item.name} 
                      loading="lazy" 
                      width={640} 
                      height={400} 
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="mono text-[10px] tracking-[1.8px] px-2 py-1 bg-black/70 text-[color:var(--mint)] rounded-[12px] border border-[color:var(--mint)]/40 w-fit">
                        {type.toUpperCase()}
                      </span>
                      {upcoming && (
                        <span className="mono text-[10px] tracking-[1.8px] px-2 py-1 bg-[color:var(--yellow)]/90 text-black rounded-[12px] border border-[color:var(--yellow)] w-fit">
                          UPCOMING
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <p className="timestamp">{item.date}</p>
                      <span className="text-[color:var(--muted)] hidden sm:inline">•</span>
                      <p className="timestamp text-[color:var(--muted)] w-full sm:w-auto">{item.place}</p>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-[color:var(--blue)] transition-colors duration-300">
                      {item.name}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
