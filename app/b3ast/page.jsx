'use client';
import { useState } from 'react';

const B3ast = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');

  const videos = [
    {
      id: 1,
      title: 'B3ast Valorant Montage | 001', // Valorant is a game name
      youtubeId: 'X_qswmFPFAI?si=KjINBAV209YuFNUJ', // YouTube video ID with tracking parameters
      category: 'valorant',
      type: 'montage',
      thumbnail: `https://img.youtube.com/vi/X_qswmFPFAI/maxresdefault.jpg`,
    },
    {
      id: 2,
      title: 'BIG DAWGS | Valorant montage | B3ast | 002', // DAWGS is stylized spelling
      youtubeId: '/UsBiNH5W75A?si=v6kjBYChvVEK1rOg', // YouTube video ID
      category: 'valorant',
      type: 'montage',
      thumbnail: `https://img.youtube.com/vi//UsBiNH5W75A?si=v6kjBYChvVEK1rOg/maxresdefault.jpg`,
    },
    {
      id: 3,
      title: 'Iris Montage | Valorant | B3ast',
      youtubeId: 'o8RxpSRV0Js', // YouTube video ID
      category: 'valorant',
      type: 'montage',
      thumbnail: `https://img.youtube.com/vi/o8RxpSRV0Js/maxresdefault.jpg`,
    },
    {
      id: 4,
      title: 'Die With A Smile Montage | Valorant | B3ast',
      youtubeId: '08c_SJSMfeY', // YouTube video ID
      category: 'valorant',
      type: 'montage',
      thumbnail: `https://img.youtube.com/vi/08c_SJSMfeY/maxresdefault.jpg`,
    },
    {
      id: 5,
      title: 'Valorant Rank Before Vyse Release | B3ast', // Vyse is a character name
      youtubeId: '/EEciWuScT2U', // YouTube video ID
      category: 'Valorant',
      type: 'live',
      thumbnail: `https://img.youtube.com/vi/EEciWuScT2U/maxresdefault.jpg`,
    },
    {
      id: 6,
      title: 'Dominating the Lobby Until the Opponents Surrendered',
      youtubeId: '/e5oorio_MFA', // YouTube video ID with random characters
      category: 'Valorant',
      type: 'gameplay',
      thumbnail: `https://img.youtube.com/vi/e5oorio_MFA/maxresdefault.jpg`,
    },
    {
      id: 7,
      title: '1 vs 5 Ace | B3ast Valorant Gameplay',
      youtubeId: '2pmLef9EWso', // YouTube video ID
      category: 'Valorant',
      type: 'shorts',
      thumbnail: `https://img.youtube.com/vi/2pmLef9EWso/maxresdefault.jpg`,
    },
  ];

  const categories = ['all', 'valorant', 'apex', 'fortnite', 'minecraft']; // Game names
  const types = ['all', 'gameplay', 'montage', 'live', 'shorts'];

  const filteredVideos = videos.filter((video) => {
    const categoryMatch =
      activeCategory === 'all' || video.category === activeCategory;
    const typeMatch = activeType === 'all' || video.type === activeType;
    return categoryMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Header */}
      <header className="relative text-center py-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-purple-400 rounded-full animate-ping delay-100"></div>
        </div>

        {/* Glowing effect behind title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
            B3AST
          </h1>

          {/* Gaming subtitle with typewriter effect */}
          <div className="mb-6">
            <p className="text-gray-300 text-xl md:text-2xl font-semibold tracking-wide">
              🎮 ELITE GAMING CONTENT 🎮
            </p>
            <p className="text-cyan-400 text-lg mt-2 font-mono">
              &gt;&gt;&gt; Loading Epic Gameplay...
            </p>
          </div>

          {/* Gaming stats display */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2">
              <div className="text-cyan-400 text-sm font-mono">SKILL LEVEL</div>
              <div className="text-white text-lg font-bold">LEGENDARY</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-lg px-4 py-2">
              <div className="text-emerald-400 text-sm font-mono">STATUS</div>
              <div className="text-white text-lg font-bold">ONLINE</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 py-2">
              <div className="text-purple-400 text-sm font-mono">MODE</div>
              <div className="text-white text-lg font-bold">BEAST</div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Game Categories Dropdown */}
          <div className="flex-1">
            <h3 className="text-white text-lg mb-3">Game Categories</h3>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Video Types */}
          <div className="flex-1">
            <h3 className="text-white text-lg mb-3">Video Types</h3>
            <div className="flex flex-wrap gap-3">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                    activeType === type
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/70 border border-gray-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div key={video.id}>
              {video.type === 'shorts' ? (
                // Shorts video card with portrait aspect ratio
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 border border-gray-700/50 w-64 mx-auto">
                  {/* Video Player for shorts */}
                  <div className="relative aspect-[9/16]">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      className="w-full h-full rounded-t-2xl"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>

                  {/* Video Info for shorts */}
                  <div className="p-4">
                    <h3 className="text-white text-lg font-semibold mb-3 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex flex-col gap-2 mb-4">
                      <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium text-center">
                        {video.category}
                      </span>
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium text-center">
                        {video.type}
                      </span>
                    </div>

                    {/* YouTube Link Button for shorts */}
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-red-500/25 text-xs"
                    >
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              ) : (
                // Regular video card with landscape aspect ratio
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 border border-gray-700/50">
                  {/* Video Player for regular videos */}
                  <div className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      className="w-full h-full rounded-t-2xl"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>

                  {/* Video Info for regular videos */}
                  <div className="p-6">
                    <h3 className="text-white text-xl font-semibold mb-3">
                      {video.title}
                    </h3>
                    <div className="flex gap-2 mb-4">
                      <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {video.category}
                      </span>
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {video.type}
                      </span>
                    </div>

                    {/* YouTube Link Button for regular videos */}
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-red-500/25 text-sm"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No videos found */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <p className="text-gray-400 text-xl">
                No videos found for selected filters
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default B3ast;
