import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create elegant trail particles
      if (Math.random() > 0.7) {
        const colors = ['#10b981', '#3b82f6', '#06b6d4', '#8b5cf6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const newParticle = {
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          opacity: 0.8,
          size: Math.random() * 4 + 2,
          color: randomColor,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1 - 0.5,
          createdAt: Date.now()
        };

        setParticles(prev => [...prev, newParticle]);
      }
    };

    const handleMouseMove = (e) => {
      updateMousePosition(e);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseEnter = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a, button')) {
        setIsHovering(true);
      }
    };
    
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  // Clean up particles with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            opacity: Math.max(0, particle.opacity - 0.03),
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vx: particle.vx * 0.99,
            vy: particle.vy * 0.99
          }))
          .filter(particle => particle.opacity > 0.1)
      );
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Beautiful Leaf Cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-300 ease-out ${
          isClicking ? 'scale-110 rotate-12' : isHovering ? 'scale-125 -rotate-6' : 'scale-100'
        }`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Leaf SVG Cursor */}
        <div className="relative">
          {/* Outer Glow Effect */}
          <div 
            className="absolute inset-0 blur-lg opacity-40 transition-all duration-300"
            style={{
              background: `radial-gradient(circle, ${isClicking ? '#f59e0b' : isHovering ? '#3b82f6' : '#10b981'}, transparent)`,
              width: '40px',
              height: '40px',
              left: '-4px',
              top: '-4px'
            }}
          />
          
          {/* Main Leaf Shape */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className="drop-shadow-lg transition-all duration-300"
          >
            {/* Leaf Body */}
            <path
              d="M16 2C16 2 10 8 10 16C10 22 13 26 16 26C19 26 22 22 22 16C22 8 16 2 16 2Z"
              fill={`url(#leafGradient-${isClicking ? 'orange' : isHovering ? 'blue' : 'green'})`}
              stroke={isClicking ? '#f59e0b' : isHovering ? '#3b82f6' : '#059669'}
              strokeWidth="1"
              className="transition-all duration-300"
            />
            
            {/* Main Vein */}
            <path
              d="M16 4L16 24"
              stroke={isClicking ? '#ea580c' : isHovering ? '#1d4ed8' : '#047857'}
              strokeWidth="1.5"
              opacity="0.8"
              className="transition-all duration-300"
            />
            
            {/* Side Veins */}
            <path
              d="M13 10L16 13M19 10L16 13M13 16L16 19M19 16L16 19"
              stroke={isClicking ? '#ea580c' : isHovering ? '#1d4ed8' : '#047857'}
              strokeWidth="0.8"
              opacity="0.6"
              className="transition-all duration-300"
            />
            
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="leafGradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="leafGradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="leafGradient-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Floating Sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className={`absolute w-1 h-1 rounded-full animate-pulse transition-all duration-300 ${
                isHovering ? 'opacity-100' : 'opacity-60'
              }`}
              style={{
                top: '6px',
                left: '8px',
                backgroundColor: isClicking ? '#fbbf24' : isHovering ? '#60a5fa' : '#34d399',
                boxShadow: `0 0 6px ${isClicking ? '#fbbf24' : isHovering ? '#60a5fa' : '#34d399'}`,
                animationDelay: '0s'
              }}
            />
            <div 
              className={`absolute w-1 h-1 rounded-full animate-pulse transition-all duration-300 ${
                isHovering ? 'opacity-100' : 'opacity-60'
              }`}
              style={{
                top: '20px',
                right: '6px',
                backgroundColor: isClicking ? '#fbbf24' : isHovering ? '#60a5fa' : '#34d399',
                boxShadow: `0 0 6px ${isClicking ? '#fbbf24' : isHovering ? '#60a5fa' : '#34d399'}`,
                animationDelay: '0.5s'
              }}
            />
          </div>
          
          {/* Click Ripple Effect */}
          {isClicking && (
            <div className="absolute inset-0 rounded-full border-2 border-orange-300 animate-ping opacity-60" />
          )}
        </div>
      </div>

      {/* Elegant Particle Trail */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div
            className="rounded-full transition-all duration-300"
            style={{
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, ${particle.color}, ${particle.color}80, transparent)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}60`,
              filter: 'blur(0.5px)'
            }}
          />
        </div>
      ))}

      {/* Global cursor style */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        a, button, input, textarea, select {
          cursor: none !important;
        }
        
        a:hover, button:hover {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
