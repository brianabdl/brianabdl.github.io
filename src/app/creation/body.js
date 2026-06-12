'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

const categories = [
    {id: "all", name: "All"},
    {id: "android", name: "Android"},
    {id: "web", name: "Web"},
    {id: "ai", name: "AI & Data"},
];

// To show a real screenshot, drop an image in /public/creation/ and set `image`
// to its path (e.g. "creation/tugasku.png"). Empty `image` falls back to a
// gradient placeholder so the grid always looks finished.
const projects = [
    {
        name: "TugasKu",
        category: "android",
        description: "A school task-list Android app for tracking assignments and deadlines, built with a modern Jetpack Compose UI.",
        image: "",
        repo: "https://github.com/brianabdl/TugasKu",
        demo: "",
        tags: ["Kotlin", "Jetpack Compose", "Material 3"],
    },
    {
        name: "Reksadana Radar",
        category: "ai",
        description: "An AI agent that monitors every Indonesian equity mutual fund, tracking which stocks managers hold most and accumulate or trim month over month.",
        image: "",
        repo: "https://github.com/brianabdl/reksadana-radar",
        demo: "",
        tags: ["Python", "AI Agent", "Docker"],
    },
    {
        name: "Nutrition Food Analyzer",
        category: "web",
        description: "A web app that breaks down the nutritional content of foods, deployed and live.",
        image: "",
        repo: "https://github.com/brianabdl/nutrition-food-analyzer",
        demo: "http://food.brianabdl.my.id/",
        tags: ["Laravel", "PHP", "Blade"],
    },
    {
        name: "Fundora",
        category: "web",
        description: "A personal finance manager for tracking income and expenses, built with Laravel.",
        image: "",
        repo: "https://github.com/brianabdl/Fundora",
        demo: "",
        tags: ["Laravel", "PHP", "Blade"],
    },
    {
        name: "SmartRouteID",
        category: "ai",
        description: "A route-optimization system that finds the most efficient paths between cities in East Java for motorcycle and car travel.",
        image: "",
        repo: "https://github.com/brianabdl/SmartRouteID",
        demo: "",
        tags: ["Python", "Algorithms", "Pathfinding"],
    },
    {
        name: "Kyklos",
        category: "web",
        description: "A digital attendance management system for organizations, built with Laravel.",
        image: "",
        repo: "https://github.com/brianabdl/Kyklos",
        demo: "",
        tags: ["Laravel", "PHP", "Blade"],
    },
];

const ProjectCard = ({project}) => (
    <div className="flex flex-col text-left bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-md hover:border-cyan-400 hover:shadow-xl transition-all duration-300">
        {project.image ? (
            <Image
                src={project.image}
                alt={project.name}
                width={640}
                height={360}
                loading="lazy"
                className="aspect-video w-full object-cover"
            />
        ) : (
            <div className="aspect-video w-full flex items-center justify-center bg-gradient-to-br from-slate-700 via-slate-800 to-cyan-900 px-4">
                <span className="text-2xl md:text-3xl font-bold text-white/90 text-center">{project.name}</span>
            </div>
        )}

        <div className="flex flex-col flex-grow p-5">
            <h3 className="text-lg md:text-xl font-bold text-white">{project.name}</h3>
            <p className="mt-2 text-sm text-gray-400 flex-grow">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-slate-700 text-cyan-300">{tag}</span>
                ))}
            </div>

            <div className="flex items-center gap-3 mt-5">
                <Link href={project.repo} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    <FontAwesomeIcon icon={faGithub}/> Code
                </Link>
                {project.demo && (
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare}/> Live Demo
                    </Link>
                )}
            </div>
        </div>
    </div>
);

const Body = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredProjects = projects.filter(
        (p) => selectedCategory === "all" || p.category === selectedCategory
    );

    return (
        <div className="min-h-screen py-2 bg-slate-900">
            <main className="flex flex-col items-center justify-center flex-1 text-center">

                {/* Title */}
                <h1 id='title-page' className="text-2xl md:text-4xl font-bold pt-4 mb-2 text-white">My Projects</h1>
                <p className="text-gray-400 mb-8 px-4 max-w-2xl">Software I&apos;ve built — Android apps, web apps, and data tools.</p>

                {/* Category filter */}
                <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                    {categories.map((el) =>
                        el.id === selectedCategory ? (
                            <button type="button"
                                    key={el.id}
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm md:text-base font-medium px-5 py-2.5 text-center me-3 mb-3 shadow-md hover:shadow-lg transition-all duration-200">{el.name}</button>
                        ) : (
                            <button type="button"
                                    key={el.id}
                                    onClick={() => setSelectedCategory(el.id)}
                                    className="text-gray-300 border border-slate-600 bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-600 rounded-full text-sm md:text-base font-medium px-5 py-2.5 text-center me-3 mb-3 transition-all duration-200">{el.name}</button>
                        )
                    )}
                </div>

                {/* Project grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 mb-12 max-w-6xl w-full px-4">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.name} project={project}/>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Body;
