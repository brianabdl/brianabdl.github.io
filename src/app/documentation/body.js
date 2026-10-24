'use client';

import Image from 'next/image';
import { documentation } from '@/app/documentation/documentation';
import { useEffect, useRef, useState } from 'react';

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

  const [showTop, setShowTop] = useState(false);
  const yearRefs = useRef({});

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('year-visible');
          }
        });
      },
      { threshold: 0.3 }
    );
    sortedYears.forEach((year) => {
      const el = yearRefs.current[year];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sortedYears]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <div 
            ref={(el) => (yearRefs.current[year] = el)}
            className="year-header flex items-center gap-4 mb-10"
          >
            <h2 className="mono text-sm tracking-[2px] text-[color:var(--mint)] px-3 py-1 border border-[color:var(--mint)] rounded-[20px] shadow-[0_0_0_rgba(60,255,208,0)] transition-all duration-700">
              {year}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[color:var(--purple-rule)] to-transparent origin-left scale-x-0 transition-transform duration-700 delay-150" />
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
      
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full border border-[color:var(--mint)] bg-[color:var(--canvas)]/90 backdrop-blur text-[color:var(--mint)] shadow-[0_0_24px_rgba(60,255,208,0.12)] transition-all duration-300 hover:bg-[color:var(--mint)] hover:text-[color:var(--canvas)] hover:shadow-[0_0_32px_rgba(60,255,208,0.28)] ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </main>
  );
}
