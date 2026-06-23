import React from 'react';
import { TOKENS } from '../tokens';
import { InteractiveCard3D } from '../shared';

const publications = [
  "Forbes",
  "Bloomberg",
  "Wall Street Journal",
  "Reuters",
  "Financial Times",
  "The Economist"
];

export default function MediaPress() {
  // Duplicate the list to create a seamless infinite loop
  const duplicatedList = [...publications, ...publications];

  return (
    <section 
      className="py-16 px-6 md:px-12 select-none border-y overflow-hidden relative"
      style={{ 
        backgroundColor: TOKENS.bg, 
        fontFamily: TOKENS.fontSans,
        borderColor: TOKENS.border 
      }}
    >
      {/* Inline styles for self-contained keyframe animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marquee-horizontal 25s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="w-full max-w-5xl mx-auto text-center">
        <InteractiveCard3D drawTopBorder={true} borderDelay={0.1} className="py-12 px-6">
          <span 
            className="text-[9px] font-bold tracking-[0.3em] uppercase block mb-8 text-center w-full"
            style={{ color: TOKENS.accent }}
          >
            Featured In
          </span>

        {/* Desktop infinite auto-scrolling marquee */}
        <div className="hidden md:block w-full overflow-hidden relative mask-gradient">
          <div className="marquee-container space-x-16">
            {duplicatedList.map((pub, idx) => (
              <span 
                key={idx}
                className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] cursor-default transition-all duration-300 select-none inline-block whitespace-nowrap"
                style={{ color: 'rgba(240, 237, 230, 0.35)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = TOKENS.accent;
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(240, 237, 230, 0.35)';
                }}
              >
                {pub}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile static centered row */}
        <div className="flex md:hidden flex-wrap justify-center items-center gap-x-6 gap-y-4">
          {publications.map((pub, idx) => (
            <span 
              key={idx}
              className="text-[10px] font-semibold uppercase tracking-[0.25em]"
              style={{ color: 'rgba(240, 237, 230, 0.35)' }}
            >
              {pub}
            </span>
          ))}
        </div>

        </InteractiveCard3D>
      </div>
    </section>
  );
}
