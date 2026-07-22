'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'none',
      });

      gsap.to(ringRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseEnterLink = () => {
      gsap.to(ringRef.current, { scale: 1.8, opacity: 0.5, duration: 0.3 });
      gsap.to(dotRef.current, { scale: 0.5, duration: 0.3 });
    };

    const handleMouseLeaveLink = () => {
      gsap.to(ringRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const links = document.querySelectorAll('a, button');
    links.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterLink);
      el.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          background: 'var(--apex-cyan)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          top: 0,
          left: 0,
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: 28,
          height: 28,
          border: '1px solid rgba(0,212,255,0.4)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}
