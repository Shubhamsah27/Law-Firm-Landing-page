import React from 'react';
import { TOKENS } from '../tokens';

const accreditations = [
  "Chambers",
  "Best Lawyers",
  "Super Lawyers",
  "Martindale-Hubbell"
];

export default function TrustStrip() {
  return (
    <section 
      className="py-12 px-6 md:px-12 select-none border-y"
      style={{ 
        backgroundColor: TOKENS.bg, 
        fontFamily: TOKENS.fontSans,
        borderColor: TOKENS.border 
      }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-y-6 gap-x-8">
        {accreditations.map((name, idx) => (
          <div key={idx} className="flex items-center space-x-8">
            {idx > 0 && (
              <span 
                className="hidden md:inline text-xs font-light pointer-events-none select-none"
                style={{ color: 'rgba(240, 237, 230, 0.2)' }}
              >
                ·
              </span>
            )}
            <span 
              className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.35em] cursor-default transition-colors duration-200"
              style={{ color: 'rgba(240, 237, 230, 0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = TOKENS.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(240, 237, 230, 0.3)';
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
