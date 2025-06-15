'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    const codeLines = [
        "const developer = {",
        "  name: 'Shohorab Hossain Shawon',",
        "  role: 'Frontend Developer & Ui/Ux Designer & Photographer',",
        "  passion: 'Creating Digital Experiences',",
        "  skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Figma'],",
        "  status: 'Available for hire ✨'",
        "};"
    ];

    useEffect(() => {
        if (currentLine < codeLines.length) {
            const line = codeLines[currentLine];
            let charIndex = 0;
            setDisplayText('');
            
            const typeInterval = setInterval(() => {
                if (charIndex < line.length) {
                    setDisplayText(prev => prev + line[charIndex]);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        setCurrentLine(prev => prev + 1);
                    }, 1000);
                }
            }, 50);

            return () => clearInterval(typeInterval);
        } else {
            setIsTyping(false);
        }
    }, [currentLine]);

    return (
        <section className="min-h-screen bg-white dark:bg-gray-900 text-green-600 dark:text-green-400 font-mono flex items-center justify-center px-4">
            <div className="max-w-4xl w-full">
                {/* Terminal Header */}
                <div className="bg-gray-300 dark:bg-gray-800 rounded-t-lg p-3 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm ml-4">~/portfolio/hero.js</span>
                </div>

                {/* Terminal Body */}
                <div className="bg-gray-200 dark:bg-gray-950 rounded-b-lg p-6 min-h-[400px]">
                    {/* Line Numbers & Code */}
                    <div className="space-y-2">
                        {codeLines.map((line, index) => (
                            <div key={index} className="flex">
                                <span className="text-gray-500 dark:text-gray-600 w-8 text-right mr-4">{index + 1}</span>
                                <span className="text-green-600 dark:text-green-400">
                                    {index < currentLine ? line : 
                                     index === currentLine ? displayText : ''}
                                    {index === currentLine && isTyping && (
                                        <span className="animate-pulse bg-green-600 dark:bg-green-400 w-2 h-5 inline-block ml-1"></span>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Command Line */}
                    <div className="mt-8 flex items-center">
                        <span className="text-blue-600 dark:text-blue-400">$</span>
                        <span className="ml-2 text-gray-900 dark:text-white">npm run dev</span>
                        <span className="animate-pulse bg-gray-900 dark:bg-white w-2 h-5 inline-block ml-1"></span>
                    </div>

                    {/* Output */}
                    {!isTyping && (
                        <div className="mt-4 space-y-2 animate-fade-in">
                            <div className="text-cyan-600 dark:text-cyan-400">✓ Portfolio compiled successfully!</div>
                            <div className="text-gray-600 dark:text-gray-400">Local: http://localhost:3000</div>
                            <div className="text-yellow-600 dark:text-yellow-400">Ready to showcase amazing projects...</div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <Link href="#projects" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block">
                        View Projects
                    </Link>
                    <Link href="/resume.pdf" download className="border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-400 hover:text-white dark:hover:text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-block">
                        Download Resume
                    </Link>
                    <Link href="#contact" className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-block">
                        Get In Touch
                    </Link>
                                </div>

                                {/* Floating Elements */}
                <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce text-gray-400 dark:text-gray-600">{'{'}</div>
                <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-bounce delay-1000 text-gray-400 dark:text-gray-600">{'}'}</div>
                <div className="absolute top-1/2 right-20 text-4xl opacity-20 animate-pulse text-gray-400 dark:text-gray-600">&lt;/&gt;</div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-in-out;
                }
            `}</style>
        </section>
    );
};

export default DevHero;