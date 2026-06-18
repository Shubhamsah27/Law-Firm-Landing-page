import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, animate, useTransform } from 'framer-motion';
import { 
  Shield, 
  Briefcase, 
  Scale, 
  FileCheck, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  ArrowRight, 
  X, 
  Award, 
  Star, 
  ArrowUpRight, 
  FileText,
  User,
  Users,
  ChevronRight,
  Check
} from 'lucide-react';

// Lightweight, smooth counter animation component with ease-out quintic progress
function AnimatedCounter({ value, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const target = parseFloat(value.replace(/[^0-9.]/g, ''));
      let start = 0;
      const duration = 1800; // 1.8 seconds

      const runCounter = () => {
        const startTime = performance.now();
        const updateCount = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // easeOutQuint (visible deceleration at end)
          const easeProgress = 1 - Math.pow(1 - progress, 5);
          const current = start + (target - start) * easeProgress;

          let formatted = "";
          if (value.includes('.')) {
            formatted = current.toFixed(1);
          } else {
            formatted = Math.round(current).toString();
          }
          if (value.includes('+')) {
            formatted += "+";
          }
          setDisplayValue(formatted);

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        };
        requestAnimationFrame(updateCount);
      };

      if (delay > 0) {
        const timer = setTimeout(runCounter, delay * 1000);
        return () => clearTimeout(timer);
      } else {
        runCounter();
      }
    }
  }, [isInView, value, delay]);

  return <span ref={ref}>{displayValue}</span>;
}

// Case Results Three-Beat Reveal wrapper
function CaseAmountReveal({ value, index }) {
  const isMonetary = value.startsWith('$') && value.endsWith('M');

  if (!isMonetary) {
    return (
      <div className="overflow-hidden mb-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: "easeOut" }}
          className="font-heading text-3xl md:text-4xl text-firmGold font-light tracking-tight"
        >
          {value}
        </motion.div>
      </div>
    );
  }

  const numberPart = value.substring(1, value.length - 1); // e.g. "12.4"
  
  return (
    <div className="font-heading text-3xl md:text-4xl text-firmGold font-light tracking-tight flex items-baseline justify-start select-none mb-4">
      {/* Beat 1: $ symbol fades in */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 + index * 0.1, ease: "easeOut" }}
      >
        $
      </motion.span>

      {/* Beat 2: Number counts up */}
      <span className="mx-0.5">
        <AnimatedCounter value={numberPart} delay={0.3 + index * 0.1} />
      </span>

      {/* Beat 3: M fades in last */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.9 + index * 0.1, ease: "easeOut" }}
      >
        M
      </motion.span>
    </div>
  );
}

// Animation variants for consistency across sections
const fadeUpVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Section Label Utility
function SectionLabel({ text }) {
  return (
    <div className="mb-4">
      <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-firmGold uppercase">
        {text}
      </span>
    </div>
  );
}

// Premium Drawing Divider Line
function Divider() {
  return (
    <div className="w-full relative overflow-hidden my-0 h-[1px] bg-transparent">
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ background: "rgba(201, 168, 76, 0.15)" }}
        className="h-[1px] w-full origin-left"
      />
    </div>
  );
}

// Premium Interactive NavLink with sliding underline
function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a 
      href={href} 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative hover:text-firmGold transition-colors py-2"
    >
      {children}
      {hovered && (
        <motion.div 
          layoutId="navUnderline"
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-firmGold"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </a>
  );
}

// 3D Parallax Hero Logo Component
function HeroBrandLogo() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] md:h-[550px] border border-firmBorder overflow-hidden group cursor-pointer interactive-cursor-target"
      style={{ perspective: 1000 }}
    >
      {/* Logo Brand Image */}
      <motion.img 
        src="/logo.png" 
        alt="Mercer Law Brand" 
        className="w-full h-full object-cover object-center z-10"
        animate={{ 
          rotateY: coords.x * 15,
          rotateX: -coords.y * 15,
          scale: 1.03
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
      {/* Gold Wipe Overlay - Curtain lift */}
      <motion.div 
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-firmGold origin-top z-20 pointer-events-none"
      />
      {/* Subtle vignette on top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/45 via-transparent to-transparent pointer-events-none z-10" />
      
      {/* Fine Gold border accent inside */}
      <div className="absolute inset-3 border border-firmGold/10 pointer-events-none group-hover:border-firmGold/30 transition-colors duration-500 z-20" />
    </div>
  );
}

// 3D Tilt Card wrapper
function InteractiveCard3D({ children, onClick, className = "", drawTopBorder = false, borderDelay = 0 }) {
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
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
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
        className={`relative bg-firmSurface border border-firmBorder p-8 text-left cursor-pointer select-none h-full flex flex-col justify-between interactive-card interactive-cursor-target ${className}`}
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateY: hovered ? coords.x * 20 : 0,
          rotateX: hovered ? -coords.y * 20 : 0,
          z: hovered ? 40 : 0,
          scale: hovered ? 1.04 : 1,
          boxShadow: hovered 
            ? "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 25px 2px rgba(201, 168, 76, 0.15)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        {/* Top border line draw */}
        {drawTopBorder && (
          <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden z-40">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: borderDelay, ease: "easeOut" }}
              className="h-full bg-firmGold origin-left"
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
              stroke="#C9A84C"
              strokeWidth="2"
              initial={{ strokeDashoffset: strokeDasharray }}
              animate={{ strokeDashoffset: hovered ? 0 : strokeDasharray }}
              style={{ strokeDasharray }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        )}
        
        {/* 3D Inner Content Depth effect */}
        <div style={{ transform: hovered ? "translateZ(30px)" : "translateZ(0px)", transformStyle: "preserve-3d", transition: "transform 0.3s ease" }} className="h-full flex flex-col justify-between">
          {typeof children === 'function' ? children({ hovered }) : children}
        </div>
      </motion.div>
    </div>
  );
}

// Cinematic Placeholder Component
function CinematicPlaceholder({ height = "h-[450px] md:h-[600px]", monogram = "M", title = "MERCER" }) {
  return (
    <div className={`relative w-full ${height} bg-[#1A1A28] border border-firmBorder overflow-hidden group`}>
      {/* Abstract Background Accents */}
      <div className="absolute inset-0 bg-radial-gradient from-firmSurface to-firmBg opacity-60" />
      
      {/* Luxury Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20 pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-firmGold/10" />
        ))}
      </div>

      {/* Abstract Architectural Gold Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-1000" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="#C9A84C" strokeWidth="0.5" />
        <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="50%" cy="50%" r="5%" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
      </svg>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-80" />
      
      {/* Centered Institutional Monogram */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-16 h-16 md:w-20 md:h-20 border border-firmGold/40 flex items-center justify-center mb-4 transition-transform duration-700 group-hover:scale-105">
          <span className="font-heading text-3xl md:text-4xl text-firmGold font-light tracking-widest">{monogram}</span>
        </div>
        <div className="font-heading text-lg md:text-xl tracking-[0.3em] text-firmText/80 font-light mb-1">
          {title}
        </div>
        <div className="text-[10px] tracking-[0.2em] text-firmMuted uppercase font-medium">
          Est. 1998
        </div>
      </div>

      {/* Luxury Border Accent */}
      <div className="absolute inset-3 border border-firmGold/10 pointer-events-none group-hover:border-firmGold/30 transition-colors duration-500" />
    </div>
  );
}

// Elegant Preloader Splash Screen
function Preloader({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 bg-[#0A0A0F] z-[9999] flex flex-col items-center justify-center select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0A0A0F_100%)] pointer-events-none" />

      {/* Brand Monogram */}
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-10"
      >
        <div className="w-16 h-16 border border-firmGold/30 flex items-center justify-center mx-auto mb-6">
          <span className="font-heading text-3xl text-firmGold font-light tracking-widest">M</span>
        </div>
        <h1 className="font-heading text-2xl md:text-3xl text-firmText tracking-[0.3em] font-light uppercase">
          Mercer &amp; Associates
        </h1>
        <p className="text-[9px] tracking-[0.25em] text-firmMuted uppercase font-medium mt-2">
          Attorneys &amp; Counselors at Law
        </p>
      </motion.div>

      {/* Subtle Loading Progress Bar */}
      <div className="w-48 h-[1.5px] bg-firmBorder/20 mt-8 relative overflow-hidden z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-firmGold origin-left h-full"
          onAnimationComplete={onComplete}
        />
      </div>
    </motion.div>
  );
}


// Serpentine timeline step component
function ProcessStep({ step, index, nodeRef, activated }) {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (activated) {
      setGlow(true);
      const timer = setTimeout(() => setGlow(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [activated]);

  const isEven = index % 2 === 0;

  return (
    <div 
      className="grid grid-cols-[48px_1fr] md:grid-cols-12 gap-4 md:gap-8 items-center relative py-8 md:py-12 text-left"
    >
      {/* Node Column */}
      <div className="col-start-1 row-start-1 md:col-span-2 md:col-start-6 md:row-start-auto flex justify-center z-20">
        <div 
          ref={nodeRef} 
          className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#0A0A0F] border transition-all duration-700"
          style={{ 
            borderColor: activated ? "#C9A84C" : "rgba(201, 168, 76, 0.2)"
          }}
        >
          <span className="transition-opacity duration-700" style={{ opacity: activated ? 1 : 0.3 }}>
            {step.icon}
          </span>
          {/* Pulsing Glow Shadow on activation */}
          <AnimatePresence>
            {glow && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="absolute inset-0 bg-firmGold/20 blur-md pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content Column */}
      <div className={`col-start-2 row-start-1 md:col-span-5 ${isEven ? 'md:col-start-1 md:text-right' : 'md:col-start-8 md:text-left'} z-10`}>
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={activated ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="font-heading text-lg md:text-xl text-firmText mb-3">
            {step.title}
          </h3>
          <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
            {step.desc}
          </p>
        </motion.div>
      </div>

      {/* Spacer Column (desktop only) */}
      <div className={`hidden md:block md:col-span-5 ${isEven ? 'md:col-start-8' : 'md:col-start-1'}`} />
    </div>
  );
}

// Serpentine timeline section component
function ProcessSection({ steps }) {
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);
  const [points, setPoints] = useState([]);
  const [activeStep, setActiveStep] = useState(-1);

  if (nodeRefs.current.length !== steps.length) {
    nodeRefs.current = Array(steps.length).fill(null);
  }

  const calculatePath = () => {
    if (!containerRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const newPoints = nodeRefs.current.map((node) => {
      if (!node) return { x: 0, y: 0 };
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2
      };
    });
    setPoints(newPoints);
  };

  useEffect(() => {
    calculatePath();
    const timer = setTimeout(calculatePath, 500);
    window.addEventListener('resize', calculatePath);
    return () => {
      window.removeEventListener('resize', calculatePath);
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.95) {
        setActiveStep(3);
      } else if (latest > 0.66) {
        setActiveStep(2);
      } else if (latest > 0.33) {
        setActiveStep(1);
      } else if (latest > 0.05) {
        setActiveStep(0);
      } else {
        setActiveStep(-1);
      }
    });
  }, [scrollYProgress]);

  let d = "";
  if (points.length > 0 && points[0].x !== 0) {
    d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const dy = p1.y - p0.y;
      d += ` C ${p0.x} ${p0.y + dy / 2}, ${p1.x} ${p1.y - dy / 2}, ${p1.x} ${p1.y}`;
    }
  }

  return (
    <section id="process" className="py-20 md:py-32 bg-firmSurface/10 relative overflow-hidden">
      <div className="editorial-container">
        <div className="max-w-2xl text-left mb-16 md:mb-24">
          <SectionLabel text="OUR PROCESS" />
          <h2 className="font-heading text-3xl md:text-5xl font-light text-firmText mt-2">
            A Meticulous Path to Resolution
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* SVG Connector Path */}
          {d && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
              <path 
                d={d} 
                fill="none" 
                stroke="rgba(201, 168, 76, 0.08)" 
                strokeWidth="2" 
              />
              <motion.path 
                d={d} 
                fill="none" 
                stroke="#C9A84C" 
                strokeWidth="2"
                style={{ pathLength }}
              />
            </svg>
          )}

          <div className="space-y-0 relative z-10">
            {steps.map((step, index) => (
              <ProcessStep 
                key={index} 
                step={step} 
                index={index} 
                nodeRef={(el) => (nodeRefs.current[index] = el)} 
                activated={activeStep >= index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Form field with bottom border drawing on focus
function FocusBorderInput({ ...props }) {
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
      />
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-firmGold origin-left pointer-events-none z-10"
      />
    </div>
  );
}

// Form select dropdown with bottom border drawing on focus
function FocusBorderSelect({ children, ...props }) {
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
      >
        {children}
      </select>
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-firmGold origin-left pointer-events-none z-10"
      />
    </div>
  );
}

// Sweep button with left-to-right fill hover effect
function SweepButton({ href, children, disabled, type, className = "" }) {
  const baseClasses = "relative border border-firmGold text-firmGold font-semibold tracking-widest uppercase overflow-hidden group transition-colors duration-300 hover:text-[#0A0A0F] flex items-center justify-center";
  
  const content = (
    <>
      <div className="absolute inset-0 bg-firmGold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" />
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={`${baseClasses} ${className}`}>
      {content}
    </button>
  );
}

// Testimonials Slider / Carousel component
function TestimonialCarousel() {
  const testimonials = [
    {
      text: "The team guided us through a difficult dispute with remarkable clarity and professionalism.",
      author: "Sarah K.",
      case: "Business Litigation"
    },
    {
      text: "We felt supported from our first consultation through the final outcome. Their strategy was unmatched.",
      author: "James R.",
      case: "Family Law"
    },
    {
      text: "Exceptional legal counsel delivered exactly when it mattered most. I highly recommend Jonathan Mercer.",
      author: "Michael T.",
      case: "Criminal Defense"
    }
  ];

  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hovered, testimonials.length]);

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative max-w-3xl mx-auto"
    >
      <div className="min-h-[220px] md:min-h-[180px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full text-center"
          >
            {/* Stars */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-firmGold fill-firmGold" />
                ))}
              </div>
            </div>
            
            <blockquote className="font-heading text-xl md:text-2xl lg:text-3xl text-firmText italic font-light leading-relaxed max-w-2xl mx-auto mb-6">
              "{testimonials[idx].text}"
            </blockquote>
            
            <cite className="not-italic text-xs tracking-widest text-firmMuted uppercase font-medium block">
              — {testimonials[idx].author} <span className="text-firmGold mx-2">·</span> {testimonials[idx].case}
            </cite>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center space-x-2.5 mt-8">
        {testimonials.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setIdx(dotIdx)}
            className="w-2 h-2 transition-colors duration-300 focus:outline-none"
            style={{ 
              backgroundColor: idx === dotIdx ? "#C9A84C" : "rgba(201, 168, 76, 0.3)" 
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null); // 'idle', 'booking', 'success'
  const [bookingForm, setBookingForm] = useState({
    practice: 'Corporate Law',
    date: '2026-06-22',
    time: '10:00 AM',
    name: '',
    email: '',
    phone: '',
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const trustBarRef = useRef(null);
  const { scrollYProgress: trustBarScroll } = useScroll({
    target: trustBarRef,
    offset: ["start end", "end start"]
  });
  const trustBarY = useTransform(trustBarScroll, [0, 1], isMobile ? [0, 0] : [15, -15]);

  // Lock scroll while loader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStatus('booking');
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  const practiceAreas = [
    { 
      title: "Family Law", 
      desc: "Discreet counsel for private wealth protection, high-value asset divisions, and complex child custody structures.",
      detail: "Providing secure representation through matrimonial disputes, trust preservation, prenuptial protections, and cross-jurisdictional family interests."
    },
    { 
      title: "Corporate Law", 
      desc: "Strategic advisory for institutional structures, venture financing, mergers and acquisitions, and governance.",
      detail: "Structuring complex corporate operations, seed/debt financing rounds, vendor infrastructure protocols, and international compliance strategies."
    },
    { 
      title: "Criminal Defense", 
      desc: "Aggressive defense in white-collar crimes, state and federal trial matters, and grand jury investigations.",
      detail: "Protecting liberties and corporate profiles against compliance investigations, financial crimes audits, and trial-level criminal allegations."
    },
    { 
      title: "Estate Planning", 
      desc: "Multi-generational legacy structures, private trusts, tax mitigation, and wealth inheritance planning.",
      detail: "Drafting generational wealth systems, dynastic trusts, estate administration directives, and structures focused on significant tax insulation."
    },
    { 
      title: "Business Litigation", 
      desc: "High-stakes commercial disputes, partnership dissolutions, and intellectual property litigation.",
      detail: "Trial advocacy for major contract breeches, patent protections, unfair trade claims, and high-liability partnership dissolutions."
    },
    { 
      title: "Employment Law", 
      desc: "Executive compensation, employment covenants, class actions, and corporate regulatory defense.",
      detail: "Formulating enterprise employment rules, executive separation structures, non-compete enforcement, and class action defense protocols."
    }
  ];

  const steps = [
    { 
      icon: <Users className="w-5 h-5 text-firmGold" />, 
      title: "01. Intake & Consult", 
      desc: "An exhaustive briefing to define legal vulnerability, clarify stakes, and identify operational timelines." 
    },
    { 
      icon: <Search className="w-5 h-5 text-firmGold" />, 
      title: "02. Discovery Audit", 
      desc: "Deep research into digital trails, expert witness matching, and document indexing." 
    },
    { 
      icon: <Scale className="w-5 h-5 text-firmGold" />, 
      title: "03. Strategy & Formulation", 
      desc: "Designing defensive mock trials, structuring leverage matrices, and outlining initial motions." 
    },
    { 
      icon: <FileCheck className="w-5 h-5 text-firmGold" />, 
      title: "04. Resolution Path", 
      desc: "Precision trials, strategic settlement points, or structured arbitration for finality." 
    }
  ];

  const caseResults = [
    {
      amount: "$12.4M",
      label: "Commercial Litigation Victory",
      type: "Business Litigation",
      challenge: "A corporate partner attempted a hostile intellectual property takeover, claiming breach of non-compete agreements.",
      strategy: "We audited 3 years of digital logs, establishing bad-faith negotiation, and counter-sued for trade secret violations.",
      outcome: "Unanimous jury verdict awarding full ownership preservation and $12.4M in punitive damages."
    },
    {
      amount: "$5.8M",
      label: "Personal Injury Settlement",
      type: "Civil Claims",
      challenge: "A client sustained career-ending injuries in a complex multi-vehicle logistics collision with contested liability.",
      strategy: "Reconstructed the accident using black-box telematics and proved systematic regulatory violations by the transport enterprise.",
      outcome: "Settlement secured prior to jury selection, granting $5.8M to structure life-long medical trusts."
    },
    {
      amount: "Defense Verdict",
      label: "Criminal Defense Case",
      type: "Criminal Defense",
      challenge: "Executive faced federal wire fraud charges carrying up to 20 years imprisonment based on whistleblower claims.",
      strategy: "Demonstrated that the internal ledger modifications were authorized and lacked any criminal intent or personal enrichment.",
      outcome: "Complete acquittal on all counts after a grueling 3-week federal jury trial."
    }
  ];

  const articles = [
    {
      category: "Corporate Law",
      date: "June 2025",
      headline: "What Business Owners Should Know About Contract Disputes",
      excerpt: "Modern commercial agreements require rigorous escape protocols and preemptive arbitration clauses to isolate risk and preserve ongoing operations."
    },
    {
      category: "Family Law",
      date: "May 2025",
      headline: "Understanding Child Custody Decisions in High-Asset Divorces",
      excerpt: "When substantial trusts and overseas estates enter the equations, child custody requires strategic multi-state and international legal frameworks."
    },
    {
      category: "Litigation",
      date: "April 2025",
      headline: "Preparing For A High-Stakes Litigation Matter",
      excerpt: "The first 48 hours of a litigation notice define the trajectory of the dispute. Understanding discovery retention holds is critical."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-[#F5F1EA] selection:bg-firmGold selection:text-[#0A0A0F]">
      {/* Preloader Splash Screen */}
      <AnimatePresence>
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>


      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-firmGold origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Decorative Overlays */}
      <div className="noise-overlay" />
      <div className="vignette-overlay" />

      {/* Header / Navigation */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${scrolled ? 'bg-[#0A0A0F]/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="editorial-container flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="Mercer Law Logo" 
              className="h-12 md:h-14 object-contain transition-opacity duration-300 group-hover:opacity-90"
            />
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium tracking-[0.2em] uppercase text-firmMuted">
            {[
              { href: "#practice-areas", label: "Practice Areas" },
              { href: "#process", label: "Process" },
              { href: "#attorney", label: "Attorney" },
              { href: "#results", label: "Results" },
              { href: "#insights", label: "Insights" },
              { href: "#contact", label: "Contact" },
            ].map((link, idx) => (
              <motion.div
                key={idx}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.05, ease: "easeOut" }}
              >
                <NavLink href={link.href}>{link.label}</NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Consultation Button */}
          <div className="flex items-center">
            <SweepButton href="#contact" className="px-5 py-2.5 text-[10px] md:text-xs tracking-[0.2em]">
              Schedule Consultation
            </SweepButton>
          </div>
        </div>
        {/* Bottom Gold Border draws left-to-right when scrolled */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-firmBorder origin-left"
        />
      </header>

      {/* Content Wrapper */}
      <main className="relative z-10">

        {/* SECTION 01 — HERO */}
        <section id="hero" className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
          {/* Institutional Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
            <span 
              className="font-heading font-bold text-firmGold uppercase whitespace-nowrap tracking-[0.15em]"
              style={{ 
                opacity: 0.045, 
                fontSize: "clamp(300px, 40vw, 600px)",
                lineHeight: 1
              }}
            >
              MERCER LAW
            </span>
          </div>

          <div className="editorial-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Cinematic Brand Portrait */}
              <motion.div 
                className="lg:col-span-5 w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
              >
                <HeroBrandLogo />
              </motion.div>

              {/* Right Column: Hero Typography */}
              <motion.div 
                className="lg:col-span-7 flex flex-col justify-center text-left"
              >
                <div className="mb-4 overflow-hidden">
                  <motion.span 
                    initial={{ letterSpacing: "0.1em", opacity: 0 }}
                    animate={{ letterSpacing: "0.3em", opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-[10px] md:text-xs font-semibold text-firmGold uppercase block tracking-[0.3em]"
                  >
                    Trusted Counsel Since 1998
                  </motion.span>
                </div>
                
                <h1 
                  className="font-heading text-4xl md:text-6xl lg:text-[70px] leading-[1.05] font-light text-firmText tracking-tight mb-8"
                >
                  {["When the outcome matters,", "experience becomes", "strategy."].map((line, idx) => (
                    <div key={idx} className="overflow-hidden">
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
                      >
                        {line}
                      </motion.div>
                    </div>
                  ))}
                </h1>

                <motion.p 
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base md:text-lg text-firmMuted max-w-xl font-light leading-relaxed mb-10"
                >
                  For over two decades, we have represented individuals, families, and businesses through their most important legal challenges. Precision in advice, authority in outcomes.
                </motion.p>

                <motion.div 
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap items-center gap-6"
                >
                  <SweepButton href="#contact" className="px-8 py-4 text-xs tracking-[0.2em] bg-firmGold/5">
                    Schedule Consultation
                  </SweepButton>
                  <a 
                    href="#practice-areas" 
                    className="group flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-firmText hover:text-firmGold transition-colors py-2"
                  >
                    <span>View Practice Areas</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>

                {/* Prestige Strip */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] tracking-[0.3em] font-semibold uppercase select-none text-firmText/30 text-left"
                >
                  {["Chambers", "Best Lawyers", "Super Lawyers", "Martindale-Hubbell"].map((item, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-firmText/20 pointer-events-none">·</span>}
                      <span className="transition-colors duration-200 cursor-default hover:text-firmGold">
                        {item}
                      </span>
                    </React.Fragment>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 02 — TRUST BAR */}
        <section ref={trustBarRef} className="bg-firmSurface/30 py-8 border-y border-firmBorder/20 relative overflow-hidden">
          <div className="editorial-container">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 relative"
            >
              {[
                { count: "2500+", title: "Cases Resolved" },
                { count: "25+", title: "Years Experience" },
                { count: "4.9/5", title: "Client Rating" },
                { count: "15+", title: "Industry Awards" }
              ].map((metric, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center justify-center text-center px-4 relative"
                >
                  <motion.div 
                    style={{ y: trustBarY }}
                    className="flex flex-col items-center"
                  >
                    <span className="font-heading text-2xl md:text-4xl text-firmGold font-light mb-1 select-none">
                      <AnimatedCounter value={metric.count} />
                    </span>
                    <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-firmMuted uppercase font-semibold">{metric.title}</span>
                  </motion.div>

                  {/* Top-to-bottom drawing gold dividers */}
                  {index !== 3 && (
                    <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[1px]">
                      <motion.div 
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                        className="w-full h-full bg-firmBorder/40 origin-top"
                      />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 03 — PRACTICE AREAS */}
        <section id="practice-areas" className="py-20 md:py-32">
          <div className="editorial-container">
            <div className="max-w-2xl text-left mb-16 md:mb-20">
              <SectionLabel text="PRACTICE AREAS" />
              <h2 className="font-heading text-3xl md:text-5xl font-light text-firmText mt-2">
                Focused Expertise Across Complex Matters
              </h2>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {practiceAreas.map((area, index) => (
                <motion.div key={index} variants={fadeUpVariants}>
                  <InteractiveCard3D className="group min-h-[240px] hover:border-firmGold/50">
                    {({ hovered }) => (
                      <>
                        <div>
                          <h3 className="font-heading text-xl md:text-2xl text-firmText group-hover:text-firmGold transition-colors mb-4">
                            {area.title}
                          </h3>
                          <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                            {area.desc}
                          </p>
                        </div>
                        <div className="mt-8 flex justify-end overflow-hidden h-4">
                          <motion.span 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[10px] font-semibold tracking-widest text-firmGold flex items-center gap-1 uppercase"
                          >
                            Overview <ChevronRight className="w-3 h-3" />
                          </motion.span>
                        </div>
                      </>
                    )}
                  </InteractiveCard3D>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 04 — HOW WE WORK */}
        <ProcessSection steps={steps} />

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 05 — ATTORNEY SPOTLIGHT */}
        <section id="attorney" className="py-20 md:py-32">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Portrait */}
              <motion.div 
                className="lg:col-span-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
              >
                <div className="relative w-full h-[450px] md:h-[600px] border border-firmBorder overflow-hidden group">
                  {/* Subtle Vignette on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 via-transparent to-transparent z-10 pointer-events-none" />
                  <img 
                    src="/jonathan-mercer.png" 
                    alt="Jonathan Mercer" 
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-out scale-100 group-hover:scale-105"
                  />
                  {/* Downward Wipe Overlay */}
                  <motion.div 
                    initial={{ scaleY: 1 }}
                    whileInView={{ scaleY: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-firmGold origin-top z-20 pointer-events-none"
                  />
                  {/* Fine Gold border accent inside */}
                  <div className="absolute inset-3 border border-firmGold/10 pointer-events-none group-hover:border-firmGold/30 transition-colors duration-500 z-20" />
                </div>
              </motion.div>

              {/* Right Column: Bio */}
              <motion.div 
                className="lg:col-span-7 text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeUpVariants}>
                  <SectionLabel text="ATTORNEY PROFILE" />
                </motion.div>
                
                <motion.h2 
                  variants={fadeUpVariants}
                  className="font-heading text-3xl md:text-5xl font-light text-firmText mb-1"
                >
                  Meet Jonathan Mercer
                </motion.h2>
                <motion.div 
                  variants={fadeUpVariants}
                  className="text-xs font-semibold tracking-widest text-firmGold uppercase mb-8"
                >
                  Founding Partner
                </motion.div>

                <motion.p 
                  variants={fadeUpVariants}
                  className="text-sm md:text-base text-firmMuted font-light leading-relaxed mb-8 max-w-xl"
                >
                  Known for his strategic thinking and courtroom presence, Jonathan has spent more than twenty years helping clients navigate high-stakes legal matters. He represents companies and individuals in matters where failure is not a viable alternative.
                </motion.p>

                {/* Credentials */}
                <motion.div 
                  variants={fadeUpVariants}
                  className="border-t border-firmBorder/30 pt-8"
                >
                  <span className="text-[10px] font-bold tracking-[0.2em] text-firmText uppercase block mb-4">Credentials &amp; Recognitions</span>
                  <motion.ul variants={staggerContainer} className="space-y-3">
                    {[
                      "Juris Doctor (JD), Harvard Law School",
                      "Top 100 Trial Lawyers (National Trial Association)",
                      "State Bar Board Member (Litigation Division)"
                    ].map((cred, i) => (
                      <motion.li 
                        variants={fadeUpVariants}
                        key={i} 
                        className="flex items-center text-xs md:text-sm text-firmMuted font-light"
                      >
                        <span className="w-1.5 h-1.5 bg-firmGold mr-3"></span>
                        {cred}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 06 — CASE RESULTS */}
        <section id="results" className="py-20 md:py-32 bg-firmSurface/10">
          <div className="editorial-container">
            <div className="max-w-2xl text-left mb-16 md:mb-20">
              <SectionLabel text="CASE RESULTS" />
              <h2 className="font-heading text-3xl md:text-5xl font-light text-firmText mt-2">
                Results That Speak For Themselves
              </h2>
            </div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {caseResults.map((result, index) => (
                <motion.div key={index} variants={fadeUpVariants}>
                  <InteractiveCard3D 
                    onClick={() => setSelectedCase(result)} 
                    className="group min-h-[220px] hover:border-firmGold/50"
                    drawTopBorder={true}
                    borderDelay={0.2 + index * 0.1}
                  >
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-firmGold/60 uppercase block mb-2">
                        {result.type}
                      </span>
                      <CaseAmountReveal value={result.amount} index={index} />
                      <div className="text-xs md:text-sm text-firmText font-medium">
                        {result.label}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-[10px] font-semibold tracking-widest text-firmGold uppercase flex items-center gap-1 group-hover:underline">
                        View Audit Details
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-firmGold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </InteractiveCard3D>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 07 — TESTIMONIALS */}
        <section className="py-20 md:py-32">
          <div className="editorial-container">
            <div className="max-w-3xl mx-auto text-center">
              <SectionLabel text="TESTIMONIALS" />
              <div className="mt-8">
                <TestimonialCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 08 — INSIGHTS */}
        <section id="insights" className="py-20 md:py-32 bg-firmSurface/10">
          <div className="editorial-container">
            <div className="max-w-2xl text-left mb-16 md:mb-20">
              <SectionLabel text="INSIGHTS" />
              <h2 className="font-heading text-3xl md:text-5xl font-light text-firmText mt-2">
                Magazine &amp; Resources
              </h2>
            </div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {articles.map((article, index) => (
                <motion.div key={index} variants={fadeUpVariants}>
                  <InteractiveCard3D className="group hover:border-firmGold/50">
                    {({ hovered }) => (
                      <>
                        <div className="w-full">
                          <div className="flex items-center justify-between text-[10px] tracking-widest text-firmMuted font-semibold mb-6 uppercase overflow-hidden">
                            <motion.span 
                              animate={{ x: hovered ? 8 : 0 }} 
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="text-firmGold"
                            >
                              {article.category}
                            </motion.span>
                            <span>{article.date}</span>
                          </div>
                          <div className="relative pb-2 mb-4">
                            <h3 className="font-heading text-xl md:text-2xl text-firmText group-hover:text-firmGold transition-colors leading-snug">
                              {article.headline}
                            </h3>
                            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden">
                              <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: hovered ? 1 : 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="h-full bg-firmGold origin-left"
                              />
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-firmBorder/10 flex items-center justify-between w-full">
                          <span className="text-[10px] font-semibold tracking-widest text-firmText uppercase group-hover:text-firmGold transition-colors">
                            Read Article
                          </span>
                          <motion.div
                            animate={{ x: hovered ? 4 : 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            <ArrowRight className="w-4 h-4 text-firmMuted group-hover:text-firmGold transition-colors" />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </InteractiveCard3D>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 09 — CONTACT & SCHEDULER */}
        <section id="contact" className="py-20 md:py-32">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left Column: Context Info */}
              <div className="lg:col-span-5 text-left flex flex-col justify-between">
                <div>
                  <SectionLabel text="CONTACT" />
                  <h2 className="font-heading text-3xl md:text-5xl font-light text-firmText mt-2 mb-6">
                    Let's Discuss What Comes Next.
                  </h2>
                  <p className="text-sm md:text-base text-firmMuted font-light leading-relaxed mb-10 max-w-md">
                    Whether you are facing an active dispute, planning for the future, or protecting a business portfolio, our team offers the precision and authority required for resolution.
                  </p>
                </div>

                {/* Contact Channels */}
                <div className="space-y-6 border-t border-firmBorder/30 pt-8 mt-8 lg:mt-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 border border-firmGold/30 flex items-center justify-center mt-1">
                      <Phone className="w-4 h-4 text-firmGold" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block">Telephone</span>
                      <a href="tel:5551234567" className="text-sm md:text-base text-firmText hover:text-firmGold transition-colors">(555) 123-4567</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 border border-firmGold/30 flex items-center justify-center mt-1">
                      <Mail className="w-4 h-4 text-firmGold" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block">Confidential Email</span>
                      <a href="mailto:contact@mercerlaw.com" className="text-sm md:text-base text-firmText hover:text-firmGold transition-colors">contact@mercerlaw.com</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 border border-firmGold/30 flex items-center justify-center mt-1">
                      <MapPin className="w-4 h-4 text-firmGold" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block">Headquarters</span>
                      <span className="text-xs md:text-sm text-firmMuted font-light block">600 Montgomery St, San Francisco, CA 94111</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Consultation Scheduler */}
              <div className="lg:col-span-7 text-left bg-firmSurface border border-firmBorder p-8 md:p-10">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-firmGold uppercase block mb-6">SCHEDULER</span>
                
                {bookingStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-12 h-12 border border-firmGold flex items-center justify-center mb-6">
                      <Check className="w-6 h-6 text-firmGold" />
                    </div>
                    <h3 className="font-heading text-2xl text-firmText mb-2">Consultation Confirmed</h3>
                    <p className="text-xs md:text-sm text-firmMuted max-w-sm font-light leading-relaxed mb-6">
                      We have reserved your consultation for {bookingForm.date} at {bookingForm.time} under {bookingForm.name}. A confirmation email has been dispatched.
                    </p>
                    <button 
                      onClick={() => setBookingStatus(null)}
                      className="px-6 py-2.5 text-[10px] font-semibold tracking-widest uppercase border border-firmGold/30 text-firmGold hover:border-firmGold transition-colors"
                    >
                      Book Another Slot
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    {/* Step 1: Select Practice */}
                    <div>
                      <label className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block mb-2">Practice Matter</label>
                      <FocusBorderSelect 
                        required
                        value={bookingForm.practice}
                        onChange={(e) => setBookingForm({...bookingForm, practice: e.target.value})}
                        className="w-full bg-[#0A0A0F] border px-4 py-3 text-xs md:text-sm text-firmText"
                      >
                        {practiceAreas.map((area, i) => (
                          <option key={i} value={area.title}>{area.title}</option>
                        ))}
                      </FocusBorderSelect>
                    </div>

                    {/* Step 2: Date & Time Picker */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block mb-2">Preferred Date</label>
                        <FocusBorderInput 
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                          className="w-full bg-[#0A0A0F] border px-4 py-3 text-xs md:text-sm text-firmText"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block mb-2">Time Slot</label>
                        <FocusBorderSelect 
                          required
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                          className="w-full bg-[#0A0A0F] border px-4 py-3 text-xs md:text-sm text-firmText"
                        >
                          <option value="09:00 AM">09:00 AM - Eastern</option>
                          <option value="10:00 AM">10:00 AM - Eastern</option>
                          <option value="01:30 PM">01:30 PM - Eastern</option>
                          <option value="03:00 PM">03:00 PM - Eastern</option>
                        </FocusBorderSelect>
                      </div>
                    </div>

                    {/* Step 3: Contact Details */}
                    <div className="space-y-4">
                      <div>
                        <FocusBorderInput 
                          type="text"
                          required
                          placeholder="Your Legal/Firm Name"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                          className="w-full bg-[#0A0A0F] border px-4 py-3 text-xs md:text-sm text-firmText placeholder-firmMuted/40"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FocusBorderInput 
                          type="email"
                          required
                          placeholder="Confidential Email"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                          className="w-full bg-[#0A0A0F] border px-4 py-3 text-xs md:text-sm text-firmText placeholder-firmMuted/40"
                        />
                        <FocusBorderInput 
                          type="tel"
                          required
                          placeholder="Secure Phone"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                          className="w-full bg-[#0A0A0F] border px-4 py-3 text-xs md:text-sm text-firmText placeholder-firmMuted/40"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <SweepButton 
                      type="submit"
                      disabled={bookingStatus === 'booking'}
                    >
                      {bookingStatus === 'booking' ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>Securing Schedule...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Confirm Consult Reservation</span>
                        </>
                      )}
                    </SweepButton>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-firmSurface/20 py-16 md:py-24 relative z-10">
        {/* Draw top border */}
        <div className="absolute top-0 left-0 right-0">
          <Divider />
        </div>
        <div className="editorial-container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-left"
          >
            {/* Brand column */}
            <motion.div variants={fadeUpVariants} className="md:col-span-5">
              <div className="mb-6">
                <img 
                  src="/logo.png" 
                  alt="Mercer Law Logo" 
                  className="h-12 object-contain"
                />
              </div>
              <p className="text-xs text-firmMuted font-light leading-relaxed max-w-sm mb-6">
                Institutional attorneys trusted with high-stakes litigation, private wealth architecture, and transactional strategy across the United States.
              </p>
              <div className="text-[10px] text-firmMuted/60 tracking-wider">
                &copy; {new Date().getFullYear()} Mercer &amp; Associates LLC. All rights reserved.
              </div>
            </motion.div>

            {/* Links column */}
            <motion.div variants={fadeUpVariants} className="md:col-span-4 grid grid-cols-2 gap-8">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-firmGold uppercase block mb-4">Firm</span>
                <ul className="space-y-3 text-xs text-firmMuted font-light">
                  <li><a href="#attorney" className="hover:text-firmText transition-colors">Our Founding Partner</a></li>
                  <li><a href="#process" className="hover:text-firmText transition-colors">Work Methodology</a></li>
                  <li><a href="#results" className="hover:text-firmText transition-colors">Historical Records</a></li>
                  <li><a href="#insights" className="hover:text-firmText transition-colors">Publications</a></li>
                </ul>
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-firmGold uppercase block mb-4">Legals</span>
                <ul className="space-y-3 text-xs text-firmMuted font-light">
                  <li><a href="#" className="hover:text-firmText transition-colors">Confidentiality Protocol</a></li>
                  <li><a href="#" className="hover:text-firmText transition-colors">Disclaimer</a></li>
                  <li><a href="#" className="hover:text-firmText transition-colors">Privacy Charter</a></li>
                  <li><a href="#" className="hover:text-firmText transition-colors">Terms of Representation</a></li>
                </ul>
              </div>
            </motion.div>

            {/* Professional Notice column */}
            <motion.div variants={fadeUpVariants} className="md:col-span-3 text-xs text-firmMuted/60 font-light border-l border-firmBorder/30 pl-6 space-y-4">
              <span className="text-[10px] font-semibold tracking-widest text-firmGold uppercase block">Legal Advertisement</span>
              <p className="leading-relaxed text-[11px]">
                The materials on this website are for informational purposes only and do not constitute legal advice. Prior results do not guarantee a similar outcome.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* Case Details Drawer Component */}
      <AnimatePresence>
        {selectedCase && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="fixed inset-0 bg-[#0A0A0F] z-50 pointer-events-auto"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-firmSurface border-l border-firmBorder z-[60] p-8 md:p-12 overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-semibold tracking-widest text-firmGold uppercase">
                  Case Record Details
                </span>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="w-8 h-8 border border-firmBorder flex items-center justify-center text-firmMuted hover:text-firmGold hover:border-firmGold transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Info */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="text-left space-y-8"
              >
                <motion.div variants={fadeUpVariants}>
                  <span className="text-xs font-semibold text-firmGold uppercase tracking-widest block mb-2">
                    {selectedCase.type}
                  </span>
                  <h3 className="font-heading text-4xl md:text-5xl text-firmText font-light tracking-tight mb-4">
                    {selectedCase.amount}
                  </h3>
                  <p className="text-base text-firmText font-medium">
                    {selectedCase.label}
                  </p>
                </motion.div>

                <motion.hr variants={fadeUpVariants} className="border-t border-firmBorder/30" />

                {/* Case Sections */}
                <motion.div variants={staggerContainer} className="space-y-6">
                  <motion.div variants={fadeUpVariants}>
                    <h4 className="text-[10px] font-bold tracking-widest text-firmGold uppercase mb-2">The Challenge</h4>
                    <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                      {selectedCase.challenge}
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUpVariants}>
                    <h4 className="text-[10px] font-bold tracking-widest text-firmGold uppercase mb-2">Legal Strategy</h4>
                    <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                      {selectedCase.strategy}
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUpVariants}>
                    <h4 className="text-[10px] font-bold tracking-widest text-firmGold uppercase mb-2">Case Outcome</h4>
                    <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                      {selectedCase.outcome}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Action button */}
                <motion.div variants={fadeUpVariants} className="pt-8 border-t border-firmBorder/30">
                  <a 
                    href="#contact" 
                    onClick={() => setSelectedCase(null)}
                    className="w-full inline-flex items-center justify-center px-6 py-4 border border-firmGold text-firmGold text-xs font-semibold tracking-widest uppercase hover:bg-firmGold hover:text-[#0A0A0F] transition-all duration-300"
                  >
                    Discuss a Similar Matter
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
