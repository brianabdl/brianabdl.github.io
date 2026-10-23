'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const categories = [{ id: 'all', name: 'All' }, { id: 'android', name: 'Android' }, { id: 'web', name: 'Web' }, { id: 'ai', name: 'AI & Data' }];
const projects = [
  { name: 'TugasKu', category: 'android', description: 'A school task-list Android app for tracking assignments and deadlines, built with a modern Jetpack Compose UI.', repo: 'https://github.com/brianabdl/TugasKu', tags: ['Kotlin', 'Jetpack Compose', 'Material 3'] },
  { name: 'Reksadana Radar', category: 'ai', description: 'An AI agent that monitors Indonesian equity mutual funds and tracks portfolio changes month over month.', repo: 'https://github.com/brianabdl/reksadana-radar', tags: ['Python', 'AI Agent', 'Docker'] },
  { name: 'Nutrition Food Analyzer', category: 'web', description: 'A web app that breaks down the nutritional content of foods, deployed and live.', repo: 'https://github.com/brianabdl/nutrition-food-analyzer', demo: 'http://food.brianabdl.my.id/', tags: ['Laravel', 'PHP', 'Blade'] },
  { name: 'Fundora', category: 'web', description: 'A personal finance manager for tracking income and expenses, built with Laravel.', repo: 'https://github.com/brianabdl/Fundora', tags: ['Laravel', 'PHP', 'Blade'] },
  { name: 'SmartRouteID', category: 'ai', description: 'A route-optimization system that finds efficient paths between cities in East Java.', repo: 'https://github.com/brianabdl/SmartRouteID', tags: ['Python', 'Algorithms', 'Pathfinding'] },
  { name: 'Kyklos', category: 'web', description: 'A digital attendance management system for organizations, built with Laravel.', repo: 'https://github.com/brianabdl/Kyklos', tags: ['Laravel', 'PHP', 'Blade'] },
];
const colors = ['mint', 'purple', 'yellow', 'pink', 'orange'];

function ProjectCard({ project, index }) {
  return <article className={`accent-card ${colors[index % colors.length]} flex min-h-[300px] flex-col`}>
    <p className="eyebrow">{project.category} / 0{index + 1}</p>
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
