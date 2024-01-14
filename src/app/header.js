'use client';
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faImages, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {faArtstation} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal m-auto p-8">
            <div className="flex items-center flex-no-shrink text-white mr-6">
                <span className="text-2xl font-bold tracking-tight">Brian</span>
            </div>
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
                    onClick={toggleMenu}>
                    <svg className="h-3 w-3 dark:fill-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div
                className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto transition-all duration-500 ease-in-out transform 
                ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden lg:opacity-100 lg:max-h-full lg:block`}>
                <div
                    className="text-sm lg:flex lg:flex-grow lg:justify-end space-y-4 lg:space-y-0 pt-4 lg:pt-0 lg:space-x-6">
                    <div className="flex flex-row items-center space-x-1">
                        <FontAwesomeIcon icon={faHome} className="lg:hidden"/>
                        <Link href="/" className="block lg:inline-block text-sm lg:text-base lg:font-bold text-gray-500 hover:text-gray-600 mr-4">Home</Link>
                    </div>

                    <div className="flex flex-row items-center space-x-1">
                        <FontAwesomeIcon icon={faArtstation} className="lg:hidden"/>
                        <Link href="/creation"
                           className="block lg:inline-block text-sm lg:text-base lg:font-bold text-gray-500 hover:text-gray-600 mr-4">Karya</Link>
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                        <FontAwesomeIcon icon={faImages} className="lg:hidden"/>
                        <Link href="/documentation"
                           className="block lg:inline-block text-sm lg:text-base lg:font-bold text-gray-500 hover:text-gray-600">Dokumentasi</Link>
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                        <FontAwesomeIcon icon={faUserCircle} className="lg:hidden"/>
                        <Link href="/about"
                           className="block lg:inline-block text-sm lg:text-base lg:font-bold text-gray-500 hover:text-gray-600">Tentang</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
