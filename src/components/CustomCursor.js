import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [sparks, setSparks] = useState([]);
  const [isClicking, setIsClicking] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const particleIdRef = useRef(0);
  const sparkIdRef = useRef(0);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create electric particles
      const particleTypes = [
        { color: '#3b82f6', type: 'electric' }, // Blue electric
        { color: '#10b981', type: 'eco' },      // Green eco
        { color: '#f59e0b', type: 'energy' },   // Orange energy
        { color: '#8b5cf6', type: 'power' }     // Purple power
      ];
      
      const randomType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      const newParticle = {
        id: particleIdRef.current++,
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        opacity: 1,
        size: Math.random() * 6 + 3,
        color: randomType.color,
        type: randomType.type,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        createdAt: Date.now()
      };

      setParticles(prev => [...prev, newParticle]);
      
      // Create electric sparks occasionally
      if (Math.random() > 0.8) {
        const newSpark = {
          id: sparkIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          angle: Math.random() * Math.PI * 2,
          length: Math.random() * 15 + 10,
          createdAt: Date.now()
        };
        setSparks(prev => [...prev, newSpark]);
      }
    };

    const handleMouseMove = (e) => {
      // More frequent particle creation for EV effect
      if (Math.random() > 0.6) {
        updateMousePosition(e);
      } else {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Animate battery level
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        const newLevel = prev - 1;
        return newLevel <= 0 ? 100 : newLevel;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Clean up particles and sparks
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            opacity: Math.max(0, particle.opacity - 0.04),
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98
          }))
          .filter(particle => particle.opacity > 0)
      );
      
      setSparks(prev => 
        prev
          .map(spark => ({
            ...spark,
            opacity: Math.max(0, spark.opacity - 0.1)
          }))
          .filter(spark => spark.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* EV Battery Cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-200 ease-out ${
          isClicking ? 'scale-125' : 'scale-100'
        }`}
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 20,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Main EV Battery Cursor */}
        <div className="relative">
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-blue-400 rounded-lg blur-md opacity-30 animate-pulse" />
          
          {/* Battery Body */}
          <div className="relative w-8 h-12 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-2 border-blue-400 shadow-lg">
            {/* Battery Terminal */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-gray-700 rounded-t border border-blue-400" />
            
            {/* Battery Level Indicator */}
            <div className="absolute bottom-1 left-1 right-1 top-2 bg-gray-700 rounded">
              <div 
                className="absolute bottom-0 left-0 right-0 rounded transition-all duration-300"
                style={{
                  height: `${batteryLevel}%`,
                  background: batteryLevel > 60 ? 
                    'linear-gradient(to top, #10b981, #34d399)' : 
                    batteryLevel > 30 ? 
                    'linear-gradient(to top, #f59e0b, #fbbf24)' : 
                    'linear-gradient(to top, #ef4444, #f87171)'
                }}
              />
              
              {/* Electric Bolt Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white" className="opacity-80">
                  <path d="M13 2L4 14h7v7l9-11h-7V2z" />
                </svg>
              </div>
            </div>
            
            {/* Charging Animation */}
            {isClicking && (
              <div className="absolute inset-0 bg-blue-400 opacity-20 rounded-lg animate-ping" />
            )}
          </div>
          
          {/* EV Label */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-400 whitespace-nowrap">
            EV
          </div>
        </div>
      </div>
      
      {/* Electric Sparks */}
      {sparks.map(spark => (
        <div
          key={spark.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: spark.x,
            top: spark.y,
            opacity: spark.opacity,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div
            className="bg-blue-300"
            style={{
              width: '2px',
              height: `${spark.length}px`,
              transform: `rotate(${spark.angle}rad)`,
              boxShadow: '0 0 6px #3b82f6',
              borderRadius: '1px'
            }}
          />
        </div>
      ))}

      {/* Enhanced EV Particle Trail */}
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
          {particle.type === 'electric' && (
            <div
              className="animate-pulse"
              style={{
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, ${particle.color}, transparent)`,
                borderRadius: '50%',
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                filter: 'blur(0.5px)'
              }}
            />
          )}
          
          {particle.type === 'eco' && (
            <div className="relative">
              <div
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  borderRadius: '50%',
                  boxShadow: `0 0 ${particle.size}px ${particle.color}60`
                }}
              />
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs"
                style={{ fontSize: `${particle.size / 3}px` }}
              >
                ⚡
              </div>
            </div>
          )}
          
          {particle.type === 'energy' && (
            <div
              className="animate-spin"
              style={{
                width: particle.size,
                height: particle.size,
                background: `conic-gradient(${particle.color}, transparent, ${particle.color})`,
                borderRadius: '50%',
                boxShadow: `0 0 ${particle.size}px ${particle.color}80`
              }}
            />
          )}
          
          {particle.type === 'power' && (
            <div className="relative">
              <div
                className="animate-pulse"
                style={{
                  width: particle.size,
                  height: particle.size / 4,
                  backgroundColor: particle.color,
                  borderRadius: '50px',
                  boxShadow: `0 0 ${particle.size}px ${particle.color}`,
                  transform: 'rotate(45deg)'
                }}
              />
              <div
                className="absolute top-0 left-0 animate-pulse"
                style={{
                  width: particle.size,
                  height: particle.size / 4,
                  backgroundColor: particle.color,
                  borderRadius: '50px',
                  boxShadow: `0 0 ${particle.size}px ${particle.color}`,
                  transform: 'rotate(-45deg)'
                }}
              />
            </div>
          )}
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
