'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const categories = [{ id: 'all', name: 'All' }, { id: 'android', name: 'Android' }, { id: 'web', name: 'Web' }, { id: 'ai', name: 'AI & Data' }, { id: 'tools', name: 'Tools' }];
const projects = [
  { name: 'Tumbas', category: 'web', description: 'An IDX screener that tracks prices, broker accumulation, insider filings, and market-wide flow across the Indonesian stock market.', repo: 'https://github.com/brianabdl/Tumbas', tags: ['Laravel', 'TypeScript', 'Rust'] },
  { name: 'Respir', category: 'ai', description: 'A guided voice pre-visit, a cough-based TB screen, and a structured clinician briefing for faster respiratory care.', repo: 'https://github.com/brianabdl/respir', demo: 'https://respir.brianabdl.my.id', tags: ['Laravel', 'Python', 'Machine Learning'] },
  { name: 'Nelayar', category: 'web', description: 'A mobile-first marine GIS platform that uses oceanographic forecasts to recommend productive pelagic fishing zones.', repo: 'https://github.com/brianabdl/nelayar-gis', demo: 'https://nelayar.com', tags: ['TypeScript', 'GIS', 'Ocean Data'] },
  { name: 'CineHub', category: 'web', description: 'A film catalogue and community app for exploring movies, writing reviews, curating watchlists, and managing accounts.', repo: 'https://github.com/brianabdl/CineHub', tags: ['Laravel', 'React', 'PHP'] },
  { name: 'MobilexAI', category: 'android', description: 'A Kotlin mobile app that uses machine learning to predict student graduation success from academic and demographic data.', repo: 'https://github.com/brianabdl/MobilexAI', tags: ['Kotlin', 'Jetpack Compose', 'Machine Learning'] },
  { name: 'Maddo', category: 'tools', description: 'A Rust service for monitoring IDX keterbukaan informasi and surfacing new company disclosures.', repo: 'https://github.com/brianabdl/Maddo', tags: ['Rust', 'IDX', 'Monitoring'] },
  { name: 'OpenBoardView MCP', category: 'tools', description: 'Rust-based MCP tools that let coding agents inspect and work with OpenBoardView boardview files.', repo: 'https://github.com/brianabdl/openboardview-mcp', tags: ['Rust', 'MCP', 'Developer Tools'] },
  { name: 'IDX Announcement Bot', category: 'ai', description: 'A Python bot that monitors new IDX-listed company disclosures and sends timely notifications.', repo: 'https://github.com/brianabdl/idx-announcement-bot', tags: ['Python', 'Telegram', 'Docker'] },
];
const colors = ['mint', 'purple', 'yellow', 'pink', 'orange'];

function ProjectCard({ project, index }) {
  return <article className={`accent-card ${colors[index % colors.length]} flex min-h-[300px] flex-col`}>
    <p className="eyebrow project-eyebrow">{project.category} / 0{index + 1}</p>
    <h2 className="mt-5 text-3xl font-bold">{project.name}</h2>
    <p className="mt-3 flex-grow leading-7">{project.description}</p>
    <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="tag rounded-[2px] border border-black/40 px-2 py-1 text-[10px]">{tag}</span>)}</div>
    <div className="mt-6 flex flex-wrap gap-3">
      <Link href={project.repo} target="_blank" rel="noopener noreferrer" className="pill-button secondary !border-black !text-black"><FontAwesomeIcon icon={faGithub} /> Code</Link>
      {project.demo && <Link href={project.demo} target="_blank" rel="noopener noreferrer" className="pill-button secondary !border-black !text-black"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Demo</Link>}
    </div>
  </article>;
}

export default function Body() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const filtered = projects.filter((project) => selectedCategory === 'all' || project.category === selectedCategory);
  return <main className="page-wrap">
    <p className="section-kicker">Portfolio / Selected work</p>
    <h1 className="page-title display">Projects.</h1>
    <p className="page-intro">Software I&apos;ve built — Android apps, web apps, and data tools.</p>
    <div className="my-12 flex flex-wrap gap-3">{categories.map((category) => <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} className={`pill-button ${selectedCategory === category.id ? '' : 'secondary'}`}>{category.name}</button>)}</div>
    <div className="grid gap-4 md:grid-cols-2">{filtered.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
  </main>;
}
