'use client';

import { useState, useEffect } from 'react';
import { FAVORITE_SONGS } from '@/lib/music';

export default function MusicFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // Show footer when user is within 200px of bottom
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;
      setIsVisible(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gradients = [
    'linear-gradient(135deg, #4a044e, #a855f7)',
    'linear-gradient(135deg, #064e3b, #10b981)',
    'linear-gradient(135deg, #7c2d12, #ea580c)',
    'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    'linear-gradient(135deg, #991b1b, #dc2626)',
    'linear-gradient(135deg, #065f46, #10b981)',
  ];

  return (
    <footer className={`fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-gray-700 z-30 py-2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-white font-sans text-xs mb-2 tracking-wide opacity-70">
          Ebuka&apos;s favorite songs right now
        </h3>
        
        <div className="flex gap-2 overflow-x-auto pb-1 justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {FAVORITE_SONGS.map((song, index) => (
            <div key={index} className="relative flex-shrink-0 group">
              {/* Album Art */}
              <img
                src={song.cover}
                alt={song.title}
                className="w-14 h-14 rounded-sm shadow-md object-cover"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black rounded-sm opacity-0 group-hover:opacity-90 transition-all duration-300 flex flex-col items-center justify-center p-2">
                <p className="text-white text-[9px] font-semibold line-clamp-1 mb-0.5">
                  {song.title}
                </p>
                <p className="text-gray-300 text-[7px] line-clamp-1 mb-1.5">
                  {song.artist}
                </p>
                
                <div className="flex items-center justify-center gap-1.5">
                  <a
                    href={song.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    <SpotifyIcon />
                  </a>
                  <a
                    href={song.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    <AppleMusicIcon />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SpotifyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#1DB954"/>
      <path
        d="M17.5 10.3c-3.1-1.8-8.2-2-11.1-1.1-.5.2-.8.7-.7 1.2.2.5.7.8 1.2.7 2.6-.8 7.1-.6 9.8.9.4.3 1 .1 1.3-.3.3-.5.1-1.1-.5-1.4zm-.1 2.8c-.3.4-.8.5-1.2.3-2.4-1.5-6.1-1.9-9-.9-.4.1-.9-.1-1-.6-.1-.4.1-.9.6-1 3.3-1.1 7.4-.6 10.1 1 .5.2.6.7.5 1.2zm-1.3 2.7c-.2.3-.6.4-1 .2-2.1-1.3-4.8-1.6-7.9-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.4-.8 6.4-.4 8.8 1 .4.2.5.6.5.9z"
        fill="white"
      />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#FA243C"/>
      <path
        d="M16.5 7.5v7.4c0 1.5-1.2 2.6-2.6 2.6-1.5 0-2.6-1.2-2.6-2.6 0-1.5 1.2-2.6 2.6-2.6.4 0 .8.1 1.2.3V9.8l-5.6 1.1v6.5c0 1.5-1.2 2.6-2.6 2.6-1.5 0-2.6-1.2-2.6-2.6 0-1.5 1.2-2.6 2.6-2.6.4 0 .8.1 1.2.3V8.3c0-.4.3-.8.7-.9l6.2-1.2c.4-.1.9.2.9.7v.6z"
        fill="white"
      />
    </svg>
  );
}
