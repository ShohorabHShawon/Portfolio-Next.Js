'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
    const navItems = [
        { name: 'Home', href: '#home', icon: '🏠' },
        { name: 'About', href: '#about', icon: '👤' },
        { name: 'Skills', href: '#skills', icon: '🛠️' },
        { name: 'Projects', href: '#projects', icon: '💼' },
        { name: 'Contact', href: '#contact', icon: '📧' },
    ];

    return (
        <motion.nav 
            className="fixed top-0 w-full z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-16">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-1 bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-full px-6 py-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-white px-4 py-1 text-sm font-semibold transition-all duration-200 relative group rounded-lg hover:bg-gray-800/50"
                            >
                                {item.name}
                                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-3/4"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu - Icon navigation */}
                    <div className="md:hidden flex space-x-2 bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-full px-4 py-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-white p-2 text-lg transition-all duration-200 hover:bg-gray-800/50 rounded-lg"
                                title={item.name}
                            >
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
