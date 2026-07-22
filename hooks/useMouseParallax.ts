'use client';

import { useEffect, useRef } from 'react';

export function useMouseParallax() {
  const mouseRef = useRef({ x: 0, y: 0, normX: 0, normY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        normX: (e.clientX / window.innerWidth) * 2 - 1,
        normY: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouseRef;
}
