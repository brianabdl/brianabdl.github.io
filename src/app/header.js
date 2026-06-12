'use client';
import React, {useState} from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faImages, faPenNib} from "@fortawesome/free-solid-svg-icons";
import {faArtstation} from "@fortawesome/free-brands-svg-icons";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-slate-800 m-auto p-6 md:p-8 shadow-lg border-b border-slate-700">
            <div className="flex items-center flex-no-shrink text-white mr-6">
                <span className="text-2xl font-bold bg-clip-text">Brian</span>
            </div>
            <div className="block md:hidden">
                <button
                    className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-300 hover:text-white hover:border-white transition-colors duration-200"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation">
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div
                id="primary-navigation"
                className={`w-full block flex-grow md:flex md:items-center md:w-auto transition-all duration-500 ease-in-out transform
                ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden md:opacity-100 md:max-h-full md:block`}>
                <div
                    className="text-sm md:flex md:flex-grow md:justify-end space-y-4 md:space-y-0 pt-4 md:pt-0 md:space-x-6">
                    <div className="flex flex-row items-center space-x-1">
                        <FontAwesomeIcon icon={faHome} className="md:hidden"/>
                        <Link href="/" className="block md:inline-block text-sm md:text-base md:font-bold text-gray-100 hover:text-white hover:underline transition-colors duration-200 mr-4">Home</Link>
                    </div>

                    <div className="flex flex-row items-center space-x-1">
                        <FontAwesomeIcon icon={faArtstation} className="md:hidden"/>
                        <Link href="/creation"
                           className="block md:inline-block text-sm md:text-base md:font-bold text-gray-100 hover:text-white hover:underline transition-colors duration-200">Projects</Link>
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                        <FontAwesomeIcon icon={faImages} className="md:hidden"/>
                        <Link href="/documentation"
                           className="block md:inline-block text-sm md:text-base md:font-bold text-gray-100 hover:text-white hover:underline transition-colors duration-200">Documentation</Link>
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                        <FontAwesomeIcon icon={faPenNib} className="md:hidden"/>
                        <Link href="/blog"
                           className="block md:inline-block text-sm md:text-base md:font-bold text-gray-100 hover:text-white hover:underline transition-colors duration-200">Blog</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
