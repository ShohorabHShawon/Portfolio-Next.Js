'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function DevSkills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = {
    'Frontend': {
      color: 'text-cyan-400',
      accentColor: '#22d3ee',
      skills: [
        { src: '/icons/reactjs.png', title: 'React.js', level: 'Expert', years: '3+', proficiency: 90 },
        { src: '/icons/nextjs.png', title: 'Next.js', level: 'Advanced', years: '2+', proficiency: 85 },
        { src: '/icons/ts.png', title: 'TypeScript', level: 'Advanced', years: '2+', proficiency: 80 },
        { src: '/icons/tailwind.png', title: 'Tailwind CSS', level: 'Expert', years: '2+', proficiency: 95 },
        { src: '/icons/js.png', title: 'JavaScript', level: 'Expert', years: '4+', proficiency: 95 },
        { src: '/icons/html.png', title: 'HTML5', level: 'Expert', years: '4+', proficiency: 100 },
        { src: '/icons/css.png', title: 'CSS3', level: 'Expert', years: '4+', proficiency: 90 },
      ]
    },
    'Backend': {
      color: 'text-green-400',
      accentColor: '#4ade80',
      skills: [
        { src: '/icons/nodejs.png', title: 'Node.js', level: 'Advanced', years: '2+', proficiency: 75 },
        { src: '/icons/python.png', title: 'Python', level: 'Intermediate', years: '2+', proficiency: 65 },
        { src: '/icons/java.png', title: 'Java', level: 'Intermediate', years: '1+', proficiency: 60 },
        { src: '/icons/csharp.png', title: 'C#', level: 'Beginner', years: '1+', proficiency: 40 },
      ]
    },
    'Languages': {
      color: 'text-purple-400',
      accentColor: '#a855f7',
      skills: [
        { src: '/icons/js.png', title: 'JavaScript', level: 'Expert', years: '4+', proficiency: 95 },
        { src: '/icons/ts.png', title: 'TypeScript', level: 'Advanced', years: '2+', proficiency: 80 },
        { src: '/icons/python.png', title: 'Python', level: 'Intermediate', years: '2+', proficiency: 65 },
        { src: '/icons/java.png', title: 'Java', level: 'Intermediate', years: '1+', proficiency: 60 },
        { src: '/icons/c.png', title: 'C', level: 'Intermediate', years: '2+', proficiency: 70 },
        { src: '/icons/cpp.png', title: 'C++', level: 'Beginner', years: '1+', proficiency: 45 },
      ]
    },
    'Tools': {
      color: 'text-orange-400',
      accentColor: '#fb923c',
      skills: [
        { src: '/icons/github.png', title: 'Git & GitHub', level: 'Advanced', years: '3+', proficiency: 85 },
        { src: '/icons/figma.png', title: 'Figma', level: 'Advanced', years: '2+', proficiency: 80 },
        { src: '/icons/vitejs.png', title: 'Vite', level: 'Advanced', years: '1+', proficiency: 75 },
        { src: '/icons/notion.png', title: 'Notion', level: 'Expert', years: '2+', proficiency: 90 },
        { src: '/icons/adobePS.png', title: 'Photoshop', level: 'Intermediate', years: '3+', proficiency: 70 },
      ]
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'Advanced': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Beginner': return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getAllSkills = () => {
    return Object.values(skillCategories).flatMap(category => 
      category.skills.map(skill => ({ ...skill, category }))
    );
  };

  const getFilteredSkills = () => {
    if (activeCategory === 'all') return getAllSkills();
    return skillCategories[activeCategory]?.skills.map(skill => ({
      ...skill,
      category: skillCategories[activeCategory]
    })) || [];
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-cyan-400 text-2xl">{'<'}</span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white">
              skills.dev
            </h2>
            <span className="text-cyan-400 text-2xl">{'/>'}</span>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-mono">
            {/* Technologies and tools in my development arsenal */}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-8" />
        </motion.div>

        {/* Terminal-style Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-lg p-1 mb-12 border border-gray-700 max-w-fit mx-auto"
        >
          <div className="flex items-center gap-2 mb-3 px-3 pt-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-400 text-sm font-mono ml-2">developer@skills:~$</span>
          </div>
          <div className="flex flex-wrap gap-1 px-2 pb-2">

            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded font-mono text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? `bg-${skillCategories[category].color.split('-')[1]}-500/20 ${skillCategories[category].color} border border-${skillCategories[category].color.split('-')[1]}-500/30`
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                ./{category.toLowerCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {getFilteredSkills().map((skill, index) => (
            <motion.div
              key={`${skill.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 opacity-60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-60" />
                    <div className="w-2 h-2 rounded-full bg-green-500 opacity-60" />
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{skill.title.toLowerCase()}.exe</span>
                </div>

                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={skill.src}
                      alt={skill.title}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-mono font-semibold text-white">
                      {skill.title}
                    </h3>
                    <span className="text-sm text-gray-400 font-mono">
                      {skill.years} experience
                    </span>
                  </div>
                </div>

                {/* Level Badge */}
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border ${getLevelColor(skill.level)}`}>
                    {skill.level.toUpperCase()}
                  </span>
                </div>

                {/* Proficiency Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-mono">Proficiency</span>
                    <span className="text-xs text-gray-400 font-mono">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full`}
                      style={{ backgroundColor: skill.category.accentColor }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>

                {/* Code-style comment */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="text-xs text-gray-500 font-mono">
                    {/* {skill.level} level developer */}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gray-800 rounded-lg border border-gray-700 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-green-400">$</span>
            <span className="text-white font-mono">cat developer_stats.json</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { key: 'technologies', value: '20+', label: 'Technologies Mastered' },
              { key: 'experience', value: '4+', label: 'Years in Development' },
              { key: 'projects', value: '50+', label: 'Projects Deployed' },
              { key: 'learning', value: '∞', label: 'Always Learning' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-mono font-bold text-cyan-400 mb-2">
                  &quot;{stat.value}&quot;
                </div>
                <div className="text-gray-400 font-mono text-sm">
                  {/* {stat.label} */}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
