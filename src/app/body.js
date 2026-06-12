import React from 'react';
import Image from 'next/image'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {faAndroid, faGithub} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import {dictSocialMedia, SocialMedia} from "@/app/sosmed";


const SkillsItem = (item) => {
    return (<div className='flex flex-col justify-start items-center'>
        <Image className='object-scale-down' width={50} height={50}
               src={item.image} alt={item.name}/>
        <p className='pt-4 text-lg whitespace-nowrap md:text-xl text-gray-400'>{item.name}</p>
    </div>)
}

const Skills = (props) => {
    return (<div className='flex flex-col justify-evenly items-stretch w-full'>
        <h2 className='text-lg md:text-xl font-bold text-center lg:text-start text-white mb-6'>{props.title}</h2>
        <div className='flex flex-row flex-wrap justify-center lg:justify-start items-start pt-4 gap-x-8 gap-y-6'>
            {props.items.map((item, index) => (
                <React.Fragment key={index}>
                    {SkillsItem(item)}
                </React.Fragment>
            ))}
        </div>
    </div>)
}

const ExpBox = ({title, description, image}) => (
    <div
        className='flex flex-col justify-start items-start p-8 max-w-64 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out bg-slate-700 border border-slate-600 hover:border-cyan-400'>
        <div
            className='rounded-full bg-cyan-500 border border-solid border-cyan-400 w-10 h-10 p-3 flex items-center justify-center'>
            <FontAwesomeIcon icon={image} color={"#ffffff"}/>
        </div>
        <h3 className='text-md md:text-lg text-white pt-4 font-semibold'>{title}</h3>
        <p className='text-sm md:text-base text-pretty text-gray-300'>{description}</p>
    </div>
)

const Body = () => {
    return (
        <main className='w-full'>
            <div className='min-h-screen p-8 flex flex-col justify-center -mt-20'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl md:text-6xl font-bold text-center text-white'>Hi, I&apos;m Brian</h1>
                    <p className='text-xl md:text-3xl md:pt-4 text-center text-gray-300'>Student at State University of Surabaya.</p>
                </div>
                <div className='flex flex-row flex-wrap justify-center items-center gap-4 mt-8'>
                    <a href='#about'
                          className='bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-200 ease-in-out text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105'>Contact
                        Me</a>
                    <a href='https://github.com/brianabdl' target='_blank' rel='noopener noreferrer'
                          className='inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-cyan-400 shadow-lg hover:shadow-xl transition duration-200 ease-in-out text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105'>
                        <FontAwesomeIcon icon={faGithub}/> View GitHub
                    </a>
                </div>
            </div>
            <div className='bg-slate-800 w-full p-8 md:p-12 shadow-lg border-b border-slate-700'>
                <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8'>
                    <Image className='object-scale-down rounded-lg shadow-lg border-4 border-cyan-400' width={300}
                           loading='lazy'
                           height={300}
                           src='me.jpg'
                           alt='profile'/>
                    <div className='flex flex-col justify-center items-center md:items-start md:pl-4 pt-4 md:pt-0'>
                        <h2 className='text-2xl md:text-3xl font-bold text-center text-white md:text-start'>Muhammad
                            Brian Abdillah</h2>
                        <h2 className='text-xl md:text-2xl text-cyan-400 font-semibold'>Surabaya, Indonesia</h2>
                        <p className='text-lg md:text-xl pt-4 text-center md:text-start text-pretty text-gray-300'>A
                            student currently pursuing a degree in Informatics Management at the State University of
                            Surabaya. True to his field of study, he is a multitalented, well-educated, and knowledgeable
                            individual.</p>
                    </div>
                </div>
            </div>
            {/* Background Story */}
            <div className='p-8 md:p-12 bg-slate-800 w-full shadow-md border-b border-slate-700'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
                <div className='flex flex-col justify-start items-center lg:items-start'>
                    <h2 className='text-2xl md:text-3xl font-bold text-white'>Background Story</h2>
                    <p className='pt-4 text-lg md:text-xl text-balance text-center lg:text-start max-w-4xl text-gray-300'>Started
                        building a career as a programmer back in junior high school, then took a different path in
                        vocational school, which meant learning plenty of new and genuinely enjoyable things. Today,
                        still pursuing a career as an Android Developer.</p>
                </div>
                <div className='flex flex-col justify-start items-center lg:items-start space-y-4 w-full'>
                    <h2 className='text-2xl md:text-3xl font-bold text-white'>Skills</h2>
                    <Skills title='Programming' items={[
                        {name: 'Kotlin', image: 'skills/kotlin.svg'},
                        {name: 'Python', image: 'skills/python.svg'},
                        {name: 'Laravel', image: 'skills/laravel.svg'},
                        {name: 'JavaScript', image: 'skills/javascript.svg'},
                        {name: 'Go', image: 'skills/go.svg'},
                    ]}/>
                </div>
                </div>
            </div>
            {/* Experience */}
            <div className='flex flex-col items-center p-8 md:p-12 bg-slate-800 space-y-4 shadow-lg border-b border-slate-700'>
                <h2 className='w-full text-2xl md:text-3xl font-bold text-white text-center'>Experience</h2>
                <p className='w-full text-lg md:text-xl text-gray-300 text-center'>
                    Here are the experiences and skills I have gained along the way
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 md:p-12 bg-slate-800 w-full max-w-2xl mx-auto justify-items-center'>
                    <ExpBox
                        title='Android Developer'
                        description='Currently learning the world of programming, with a focus on the Android platform'
                        image={faAndroid}
                    />
                    <ExpBox
                        title='Photography'
                        description='A hobby of capturing the things that are meaningful to me'
                        image={faImage}
                    />
                </div>
            </div>

            {/* Social Media */}
            <div id="about" className="flex flex-col items-center pt-12 pb-4 bg-slate-800 border-b border-slate-700 scroll-mt-20">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Social Media</h2>
                <div className="flex flex-wrap justify-center gap-2 md:gap-8 mt-4 px-4">
                    {dictSocialMedia.map((item, index) => (
                        <SocialMedia key={index} name={item.name} link={item.link} icon={item.icon}/>
                    ))}
                </div>
            </div>

            <div className='flex flex-col justify-between items-center p-8 md:p-12 bg-slate-800 space-y-8 shadow-lg border-b border-slate-700'>
                <h2 className='w-full text-2xl md:text-3xl font-bold text-center text-white'>Learn More</h2>
                <p className='text-gray-300 text-center text-lg'>Discover more about my projects and experience</p>
                {/*  Button navigate to about, projects, contact  */}
                <div className='flex flex-col justify-between items-center'>
                    <div className='flex flex-row flex-wrap justify-center items-center gap-4'>
                        <Link href='/creation'
                              className='bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition duration-200 ease-in-out font-bold py-3 px-6 rounded-lg transform hover:scale-105'>Projects</Link>
                        <Link href='/documentation'
                              className='bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition duration-200 ease-in-out font-bold py-3 px-6 rounded-lg transform hover:scale-105'>Documentation</Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Body;
