"use client";

import { useState, useEffect, useContext } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '@/context/themecontext';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Header must be used within a ThemeProvider");
    }

    const { theme, toggleTheme } = themeContext;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`flex flex-row justify-between items-center p-4 shadow-lg ${theme === 'dark' ? 'dark-mode' : ''}`}>
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
            {isOpen && (
                <div className="flex flex-col items-center w-1/2 md:flex-row md:justify-around">
                    <a href="/" className="border w-full md:w-1/5 text-center py-2 rounded-lg button-shadow to-[#0c8aae] mb-2 sm:mb-0">Home</a>
                    <a href="/news" className="border w-full md:w-1/5 text-center py-2 rounded-lg button-shadow mb-2 sm:mb-0 md:block mt-1">News</a>
                    <a href="/publish" className="border w-full md:w-1/5 text-center py-2 rounded-lg button-shadow mb-2 sm:mb-0">Upload</a>
                    <a href="/account" className="border w-full md:w-1/5 text-center py-2 rounded-lg button-shadow mb-2 sm:mb-0">Account</a>
                </div>
            )}
            <button onClick={toggleTheme} className="transition-colors duration-500 ease-in-out text-2xl">
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
        </div>
    );
}
