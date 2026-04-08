'use client';
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const socialLinks = [
        {icon: faGithub, url: 'https://github.com/brianabdl/', label: 'GitHub'},
        {icon: faLinkedin, url: 'https://www.linkedin.com/in/muhammad-brian-abdillah-57b872242/', label: 'LinkedIn'},
        {icon: faInstagram, url: 'https://www.instagram.com/brianabdl/', label: 'Instagram'},
        {icon: faEnvelope, url: 'mailto:mohammadbrianabdillah@gmail.com', label: 'Email'},
    ];

    return (
        <footer className='w-full bg-gray-800'>
            <div className='max-w-6xl mx-auto px-4 py-12'>
                {/* Footer Content */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
                    {/* Brand */}
                    <div className='flex flex-col items-start'>
                        <h3 className='text-white font-bold text-lg mb-2'>Brian</h3>
                        <p className='text-gray-400 text-sm'>Developer & Digital Creator</p>
                    </div>

                    {/* Quick Links */}
                    <div className='flex flex-col items-start'>
                        <h4 className='text-white font-bold mb-4'>Quick Links</h4>
                        <div className='flex flex-col space-y-2'>
                            <Link href='/' className='text-gray-400 hover:text-white transition-colors'>Home</Link>
                            <Link href='/creation' className='text-gray-400 hover:text-white transition-colors'>Karya</Link>
                            <Link href='/documentation' className='text-gray-400 hover:text-white transition-colors'>Dokumentasi</Link>
                            <Link href='/about' className='text-gray-400 hover:text-white transition-colors'>Tentang</Link>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className='flex flex-col items-start'>
                        <h4 className='text-white font-bold mb-4'>Follow Me</h4>
                        <div className='flex flex-row space-x-4'>
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-gray-400 hover:text-cyan-400 transition-colors duration-200'
                                    title={social.label}
                                >
                                    <FontAwesomeIcon icon={social.icon} size='lg'/>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className='border-t border-gray-700 my-8'></div>

                {/* Copyright */}
                <div className='text-center'>
                    <p className='text-gray-400 text-sm'>© {currentYear} M. Brian Abdillah. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
