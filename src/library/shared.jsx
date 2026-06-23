import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from './tokens';

// 3D Tilt Card wrapper
export function InteractiveCard3D({ children, onClick, className = "", drawTopBorder = false, borderDelay = 0 }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = () => {
    if (cardRef.current) {
      setDimensions({
        width: cardRef.current.clientWidth,
        height: cardRef.current.clientHeight
      });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const strokeDasharray = dimensions.width && dimensions.height ? 2 * (dimensions.width + dimensions.height) : 0;

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setHovered(true);
          updateDimensions();
        }}
        onMouseLeave={() => {
          setHovered(false);
          setCoords({ x: 0, y: 0 });
        }}
        onClick={onClick}
        className={`relative bg-firmSurface border border-firmBorder p-8 text-left cursor-pointer select-none h-full flex flex-col justify-between interactive-card ${className}`}
        style={{ 
          transformStyle: "preserve-3d",
          backgroundColor: TOKENS.surface,
          borderColor: TOKENS.border
        }}
        animate={{
          rotateY: hovered ? coords.x * 12 : 0,
          rotateX: hovered ? -coords.y * 12 : 0,
          z: hovered ? 30 : 0,
          scale: hovered ? 1.02 : 1,
          boxShadow: hovered 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px 1px rgba(201, 168, 76, 0.1)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top border line draw */}
        {drawTopBorder && (
          <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden z-40">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: borderDelay, ease: "easeOut" }}
              className="h-full origin-left"
              style={{ backgroundColor: TOKENS.accent }}
            />
          </div>
        )}

        {/* Clockwise drawing border SVG overlay on hover */}
        {dimensions.width > 0 && strokeDasharray > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" style={{ transform: "translateZ(1px)" }}>
            <motion.rect
              width={dimensions.width}
              height={dimensions.height}
              fill="none"
              stroke={TOKENS.accent}
              strokeWidth="2"
              initial={{ strokeDashoffset: strokeDasharray }}
              animate={{ strokeDashoffset: hovered ? 0 : strokeDasharray }}
              style={{ strokeDasharray }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        )}
        
        {/* 3D Inner Content Depth effect */}
        <div style={{ transform: hovered ? "translateZ(20px)" : "translateZ(0px)", transformStyle: "preserve-3d", transition: "transform 0.3s ease" }} className="h-full flex flex-col justify-between w-full">
          {typeof children === 'function' ? children({ hovered }) : children}
        </div>
      </motion.div>
    </div>
  );
}

// Sweep Button
export function SweepButton({ href, children, disabled, type, className = "" }) {
  const baseClasses = "relative border font-semibold tracking-widest uppercase overflow-hidden group transition-colors duration-300 flex items-center justify-center";
  
  const content = (
    <>
      <div 
        className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" 
        style={{ backgroundColor: TOKENS.accent }}
      />
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </>
  );

  const style = {
    borderColor: TOKENS.accent,
    color: TOKENS.accent,
    backgroundColor: 'transparent'
  };

  if (href) {
    return (
      <a 
        href={href} 
        className={`${baseClasses} ${className} hover:text-[#0A0A0F]`}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      disabled={disabled} 
      className={`${baseClasses} ${className} hover:text-[#0A0A0F]`}
      style={style}
    >
      {content}
    </button>
  );
}

// Drawing Divider
export function Divider() {
  return (
    <div className="w-full relative overflow-hidden my-0 h-[1px] bg-transparent">
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ background: TOKENS.border }}
        className="h-[1px] w-full origin-left"
      />
    </div>
  );
}

// Input field with bottom border focus draw
export function FocusBorderInput({ ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative w-full">
      <input 
        {...props}
        onFocus={(e) => {
          setFocused(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (props.onBlur) props.onBlur(e);
        }}
        className={`${props.className} border-firmBorder focus:border-firmBorder/40 focus:outline-none`}
        style={{ borderColor: 'rgba(201, 168, 76, 0.15)' }}
      />
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left pointer-events-none z-10"
        style={{ backgroundColor: TOKENS.accent }}
      />
    </div>
  );
}

// Selection list with bottom border focus draw
export function FocusBorderSelect({ children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative w-full">
      <select 
        {...props}
        onFocus={(e) => {
          setFocused(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (props.onBlur) props.onBlur(e);
        }}
        className={`${props.className} border-firmBorder focus:border-firmBorder/40 focus:outline-none`}
        style={{ borderColor: 'rgba(201, 168, 76, 0.15)' }}
      >
        {children}
      </select>
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left pointer-events-none z-10"
        style={{ backgroundColor: TOKENS.accent }}
      />
    </div>
  );
}
