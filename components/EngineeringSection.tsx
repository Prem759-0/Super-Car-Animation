'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const parts = [
  { id: 'body', label: 'Carbon Fiber Body', detail: 'Monocoque chassis — 1.2mm thickness', x: 0, y: -40, z: 0 },
  { id: 'door-l', label: 'Driver Door', detail: 'Dihedral active aero', x: -180, y: -10, z: 20 },
  { id: 'door-r', label: 'Passenger Door', detail: 'Dihedral active aero', x: 180, y: -10, z: 20 },
  { id: 'hood', label: 'Active Hood', detail: 'NACA duct integrated', x: -240, y: -60, z: 40 },
  { id: 'wing', label: 'Rear Wing', detail: 'Deployable DRS system', x: 260, y: -80, z: 40 },
  { id: 'engine', label: 'V8 Hybrid Engine', detail: '4.0L twin-turbo + 3 MGUs', x: 0, y: 60, z: 30 },
  { id: 'transmission', label: 'Dual-Clutch Gearbox', detail: '8-speed DCT', x: 100, y: 80, z: 20 },
  { id: 'suspension-fl', label: 'Front Suspension', detail: 'Push-rod geometry', x: -200, y: 60, z: 50 },
  { id: 'suspension-rr', label: 'Rear Suspension', detail: 'Adaptive dampers', x: 220, y: 60, z: 50 },
  { id: 'brake-f', label: 'Front Brakes', detail: 'Carbon-ceramic 400mm', x: -280, y: 40, z: 30 },
  { id: 'brake-r', label: 'Rear Brakes', detail: 'Carbon-ceramic 380mm', x: 300, y: 40, z: 30 },
  { id: 'interior', label: 'Alcantara Cockpit', detail: 'Carbon racing bucket seats', x: 0, y: -20, z: -20 },
];

export default function EngineeringSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        [titleRef.current, subtitleRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Main pinned explode animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: pinRef.current,
          scrub: 1.5,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      partsRef.current.forEach((el, i) => {
        if (!el) return;
        const part = parts[i];
        tl.fromTo(
          el,
          { x: 0, y: 0, z: 0, opacity: 1, scale: 1 },
          {
            x: part.x,
            y: part.y,
            opacity: 1,
            scale: 0.92,
            duration: 1,
            ease: 'power2.inOut',
          },
          i * 0.05
        );
        if (labelRefs.current[i]) {
          tl.fromTo(
            labelRefs.current[i],
            { opacity: 0, x: part.x > 0 ? -10 : 10 },
            { opacity: 1, x: 0, duration: 0.5 },
            i * 0.05 + 0.5
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="engineering" style={{ height: '400vh', position: 'relative' }}>
      {/* Intro text before pin */}
      <div
        className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-24"
        style={{ height: '100vh' }}
      >
        <div className="section-label mb-6">Engineering</div>
        <h2
          ref={titleRef}
          className="font-display opacity-0"
          style={{
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: 'var(--apex-white)',
            maxWidth: '700px',
            lineHeight: 1.05,
          }}
        >
          1,247 Parts.<br />One Purpose.
        </h2>
        <p
          ref={subtitleRef}
          className="mt-6 opacity-0"
          style={{
            color: 'var(--apex-silver)',
            fontSize: '1rem',
            maxWidth: '480px',
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          Scroll to witness every component that defines automotive perfection — separated, examined, and reassembled.
        </p>

        <div
          className="mt-12 flex items-center gap-3"
          style={{ color: 'var(--apex-cyan)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M4 10l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          Continue scrolling
        </div>
      </div>

      {/* Pinned exploded view */}
      <div
        ref={pinRef}
        className="w-full h-screen relative overflow-hidden flex items-center justify-center"
        style={{ background: 'var(--apex-black)' }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.03) 0%, transparent 70%)',
          }}
        />

        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-px z-20"
          style={{ background: 'rgba(255,255,255,0.06)', width: '100%' }}
        >
          <div
            ref={progressRef}
            className="h-full transition-none"
            style={{ background: 'var(--apex-cyan)', width: '0%' }}
          />
        </div>

        {/* Header */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
          <div className="section-label">Exploded View</div>
        </div>

        {/* Parts container */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '800px' }}>
          {/* Central car silhouette */}
          <div className="absolute" style={{ width: '200px', height: '80px' }}>
            <svg viewBox="0 0 200 80" fill="none" className="w-full h-full opacity-10">
              <ellipse cx="100" cy="60" rx="90" ry="10" fill="rgba(0,212,255,0.3)" />
              <path
                d="M20 55 Q30 30 60 20 Q100 10 140 20 Q170 28 180 55 Z"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
              <ellipse cx="50" cy="55" rx="15" ry="8" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <ellipse cx="150" cy="55" rx="15" ry="8" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Floating parts */}
          {parts.map((part, i) => (
            <div
              key={part.id}
              ref={(el) => { partsRef.current[i] = el; }}
              className="absolute flex items-center gap-3"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {/* Part dot */}
              <div
                className="relative"
                style={{
                  width: part.id === 'engine' ? 14 : 8,
                  height: part.id === 'engine' ? 14 : 8,
                  borderRadius: '50%',
                  background: part.id === 'brake-f' || part.id === 'brake-r' ? 'var(--apex-orange)' : 'var(--apex-cyan)',
                  boxShadow: part.id === 'brake-f' || part.id === 'brake-r'
                    ? '0 0 12px var(--apex-orange)'
                    : '0 0 12px var(--apex-cyan)',
                  flexShrink: 0,
                }}
              />

              {/* Label */}
              <div
                ref={(el) => { labelRefs.current[i] = el; }}
                className="opacity-0"
                style={{
                  whiteSpace: 'nowrap',
                  order: part.x > 0 ? -1 : 0,
                }}
              >
                <div
                  style={{
                    color: 'var(--apex-white)',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '1px',
                  }}
                >
                  {part.label}
                </div>
                <div style={{ color: 'var(--apex-silver)', fontSize: '0.55rem', letterSpacing: '0.05em' }}>
                  {part.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom counter */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 z-10"
          style={{ color: 'var(--apex-silver)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          <span style={{ color: 'var(--apex-cyan)' }}>Scroll</span>
          <span>to disassemble</span>
          <span>·</span>
          <span>Reverse</span>
          <span>to reassemble</span>
        </div>
      </div>
    </div>
  );
}
