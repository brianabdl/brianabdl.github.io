'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAndroid, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { dictSocialMedia, SocialMedia } from '@/app/sosmed';

const skills = [
  { name: 'Kotlin', image: 'skills/kotlin.svg' },
  { name: 'Python', image: 'skills/python.svg' },
  { name: 'Laravel', image: 'skills/laravel.svg' },
  { name: 'JavaScript', image: 'skills/javascript.svg' },
  { name: 'Go', image: 'skills/go.svg' },
];

function Skill({ name, image }) {
  return <div className="flex flex-col items-center gap-3"><Image width={44} height={44} src={image} alt={name} /><span className="mono text-xs text-gray-300">{name}</span></div>;
}

function Experience({ title, description }) {
  return <article className="outline-card p-6">
    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="mt-3 text-gray-300">{description}</p>
  </article>;
}

export default function Body() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = document.querySelector('.hero');
    const schematic = document.querySelector('.schematic');
    const scrambleTarget = document.querySelector('.hero-title');
    const profileImage = document.querySelector('.profile-image');
    const heroElements = document.querySelectorAll('.hero-reveal');
    const sections = document.querySelectorAll('.motion-section');
    const cards = document.querySelectorAll('.motion-card');
    const animations = [];

    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
      if (scrambleTarget) scrambleTarget.innerHTML = 'HI, IM <span class="text-cyan-400">BRIAN.</span>';
      return undefined;
    }

    const scrambleCharacters = '!<>-_\\/[]{}=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let scrambleStep = 0;
    const scrambleTimer = window.setInterval(() => {
      if (!scrambleTarget) return;
      const finalText = 'HI, IM BRIAN.';
      scrambleTarget.textContent = finalText.split('').map((character, index) => {
        if (character === ' ') return ' ';
        return index < scrambleStep ? character : scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)];
      }).join('');
      scrambleStep += 1;
      if (scrambleStep > finalText.length) {
        window.clearInterval(scrambleTimer);
        scrambleTarget.innerHTML = 'HI, IM <span class="text-cyan-400">BRIAN.</span>';
      }
    }, 55);

    animations.push(animate(heroElements, {
      opacity: [0, 1],
      y: [24, 0],
      duration: 900,
      delay: stagger(110),
      ease: 'outExpo',
    }));
    animations.push(animate('.schematic-ring', {
      rotate: 360,
      duration: 18000,
      loop: true,
      ease: 'linear',
    }));
    animations.push(animate('.schematic-node', {
      scale: [0.75, 1],
      opacity: [0.45, 1],
      duration: 1400,
      delay: stagger(160),
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    }));
    animations.push(animate('.radar-sweep', {
      rotate: 360,
      duration: 10000,
      loop: true,
      ease: 'linear',
    }));
    animations.push(animate('.schematic-node, .schematic-crosshair', {
      scale: [0.94, 1.04],
      opacity: [0.55, 1],
      duration: 1800,
      delay: stagger(220),
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    }));

    const moveSchematic = (event) => {
      if (!hero || !schematic) return;
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;
      schematic.style.setProperty('--pointer-x', `${x}px`);
      schematic.style.setProperty('--pointer-y', `${y}px`);
    };
    const resetSchematic = () => {
      if (!schematic) return;
      schematic.style.setProperty('--pointer-x', '0px');
      schematic.style.setProperty('--pointer-y', '0px');
    };
    hero?.addEventListener('pointermove', moveSchematic);
    hero?.addEventListener('pointerleave', resetSchematic);

    const tiltProfile = (event) => {
      if (!profileImage) return;
      const bounds = profileImage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      profileImage.style.setProperty('--tilt-x', `${y * -7}deg`);
      profileImage.style.setProperty('--tilt-y', `${x * 7}deg`);
    };
    const resetProfileTilt = () => {
      if (!profileImage) return;
      profileImage.style.setProperty('--tilt-x', '0deg');
      profileImage.style.setProperty('--tilt-y', '0deg');
    };
    profileImage?.addEventListener('pointermove', tiltProfile);
    profileImage?.addEventListener('pointerleave', resetProfileTilt);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        element.classList.add('is-visible');
        animations.push(animate(element, {
          opacity: [0, 1],
          y: [30, 0],
          duration: 850,
          ease: 'outExpo',
        }));
        if (element.id === 'about' && profileImage) {
          animations.push(animate(profileImage, {
            opacity: [0, 1],
            scale: [0.95, 1],
            y: [24, 0],
            duration: 1000,
            ease: 'outExpo',
          }));
        }
        observer.unobserve(element);
      });
    }, { threshold: 0.14 });

    sections.forEach((section) => observer.observe(section));
    animations.push(animate(cards, {
      opacity: [0, 1],
      y: [18, 0],
      delay: stagger(90, { start: 180 }),
      duration: 700,
      ease: 'outCubic',
    }));

    return () => {
      observer.disconnect();
      window.clearInterval(scrambleTimer);
      hero?.removeEventListener('pointermove', moveSchematic);
      hero?.removeEventListener('pointerleave', resetSchematic);
      profileImage?.removeEventListener('pointermove', tiltProfile);
      profileImage?.removeEventListener('pointerleave', resetProfileTilt);
      animations.forEach((animation) => animation.pause());
      document.documentElement.classList.remove('reduced-motion');
    };
  }, []);

  return <main>
    <section className="hero page-wrap min-h-[620px] flex flex-col justify-center">
      <div className="hero-copy">
        <p className="section-kicker hero-reveal">Portfolio / WASD</p>
        <h1 className="display hero-title mt-5 max-w-5xl hero-reveal">HI, IM <span className="text-cyan-400">BRIAN.</span></h1>
        <p className="page-intro mt-7 hero-reveal">Developer, digital creator, and curious builder based in Surabaya. I turn useful ideas into thoughtful software and visual stories.</p>
        <div className="mt-9 flex flex-wrap gap-4 hero-reveal">
          <a href="#about" className="pill-button">Explore profile</a>
          <a href="https://github.com/brianabdl" target="_blank" rel="noopener noreferrer" className="pill-button secondary"><FontAwesomeIcon icon={faGithub} /> View GitHub</a>
        </div>
      </div>
      <div className="schematic" aria-hidden="true">
        <div className="schematic-label mono">SYS / BRIAN-01</div>
        <div className="schematic-grid" />
        <div className="schematic-crosshair"><span /><span /></div>
        <div className="schematic-ring ring-outer" />
        <div className="schematic-ring ring-inner" />
        <div className="schematic-node node-a" />
        <div className="schematic-node node-b" />
        <div className="schematic-node node-c" />
        <div className="radar-sweep" />
        <div className="schematic-readout mono"><span>LAT 07°15&apos;S</span><span>LONG 112°45&apos;E</span><span className="readout-live">● LIVE / BUILDING</span></div>
      </div>
    </section>

    <section id="about" className="section-block page-wrap scroll-mt-8 motion-section">
      <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-center">
        <Image className="profile-image rounded-[20px] border border-white object-cover" width={300} height={300} loading="lazy" src="/me.jpg" alt="Portrait of M. Brian Abdillah" />
        <div>
          <p className="section-kicker">The person behind the work</p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Muhammad Brian Abdillah</h2>
          <p className="mt-3 text-xl text-cyan-400">Surabaya, Indonesia</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">A student pursuing Informatics Management at the State University of Surabaya. Multitalented, well-educated, and always looking for the next useful thing to learn.</p>
        </div>
      </div>
    </section>

    <section className="section-block page-wrap motion-section">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="motion-card">
          <p className="section-kicker">01 / Background</p>
          <h2 className="mt-4 text-4xl font-bold text-white">The long way around.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">Started building a career as a programmer in junior high school, found new creative paths in vocational school, and now I&apos;m pursuing a future as an Android developer.</p>
        </div>
        <div className="motion-card">
          <p className="section-kicker">02 / Toolkit</p>
          <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-5">{skills.map((skill) => <Skill key={skill.name} {...skill} />)}</div>
        </div>
      </div>
    </section>

    <section className="section-block page-wrap motion-section">
      <p className="section-kicker">03 / Experience</p>
      <h2 className="mt-4 text-4xl font-bold text-white">Things I care about.</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="motion-card"><Experience title="Android Development" description="Learning the world of programming with a focus on the Android platform." /></div>
        <div className="motion-card"><Experience title="Web Development" description="Building web applications and tools with a focus on performance and usability." /></div>
        <div className="motion-card"><Experience title="Data Analysis" description="Exploring data to find insights and patterns that can inform decisions." /></div>
        <div className="motion-card"><Experience title="Photography" description="A hobby of capturing the things that are meaningful to me." /></div>
      </div>
    </section>

    <section className="section-block page-wrap motion-section">
      <p className="section-kicker">04 / Elsewhere</p>
      <h2 className="mt-4 text-4xl font-bold text-white">Find me online.</h2>
      <div className="mt-8 flex flex-wrap gap-3">{dictSocialMedia.map((item) => <div className="motion-card" key={item.name}><SocialMedia {...item} /></div>)}</div>
    </section>

    <section className="accent-card mint mx-6 mb-16 md:mx-auto md:max-w-[1200px]">
      <p className="eyebrow">Next stop</p>
      <h2 className="mt-4 text-4xl font-bold md:text-6xl">See what I&apos;ve built.</h2>
      <p className="mt-4 max-w-xl text-lg">A collection of software, experiments, and documented moments.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/creation" className="pill-button secondary !border-black !text-black">Projects</Link>
        <Link href="/documentation" className="pill-button secondary !border-black !text-black">Documentation</Link>
      </div>
    </section>
  </main>;
}
