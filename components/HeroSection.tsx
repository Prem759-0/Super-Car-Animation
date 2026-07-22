'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: (mouseRef.current.x - 0.5) * 120,
          y: (mouseRef.current.y - 0.5) * 80,
          duration: 2,
          ease: 'power2.out',
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Fog drifts in
    tl.fromTo(
      fogRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' }
    );

    // Vertical cyan line
    tl.fromTo(
      lineRef.current,
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=1.5'
    );

    // Car fades in with slight upward drift
    tl.fromTo(
      carRef.current,
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 2.2, ease: 'power3.out' },
      '-=0.8'
    );

    // Spotlight brightens
    tl.fromTo(
      spotlightRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.8, ease: 'power2.inOut' },
      '-=1.5'
    );

    // Headline word-by-word
    const words = headlineRef.current?.querySelectorAll('.word') ?? [];
    tl.fromTo(
      words,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out' },
      '-=0.6'
    );

    // Sub
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
      '-=0.4'
    );

    // CTA
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    );

    setLoaded(true);
  }, []);

  const headline = 'Engineering Without Compromise.';
  const words = headline.split(' ');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--apex-black)' }}
      aria-label="Hero section"
    >
      {/* Ambient gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Fog layer */}
      <div
        ref={fogRef}
        className="absolute inset-0 opacity-0"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 60%, rgba(10,10,20,0.8) 0%, var(--apex-black) 100%)',
        }}
      />

      {/* Spotlight beam */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0"
        style={{
          width: '600px',
          height: '700px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Vertical cyan line accent */}
      <div
        ref={lineRef}
        className="absolute left-1/2 opacity-0"
        style={{
          top: '5%',
          height: '30vh',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.6), transparent)',
          transform: 'translateX(-50%) scaleY(0)',
          transformOrigin: 'top',
        }}
      />

      {/* Car image */}
      <div
        ref={carRef}
        className="absolute inset-0 flex items-center justify-center opacity-0"
        style={{ zIndex: 2 }}
      >
        <div
          className="relative w-full max-w-5xl mx-auto px-8"
          style={{
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.9)) drop-shadow(0 0 60px rgba(0,212,255,0.06))',
          }}
        >
          <Image
            src="/images/car-1.jpg"
            alt="Apex Automotive hero vehicle"
            width={1200}
            height={600}
            priority
            className="w-full h-auto object-contain"
            style={{ mixBlendMode: 'luminosity' }}
            onError={() => {}}
          />
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 z-10"
        style={{ background: 'linear-gradient(to top, var(--apex-black) 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Section label */}
        <div
          className="section-label mb-8 opacity-0"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 2.5s' }}
        >
          Apex Automotive — 2024 Collection
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="overflow-hidden mb-6">
          <h1
            className="font-display leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--apex-white)',
            }}
          >
            {words.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em] last:mr-0 opacity-0">
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="opacity-0"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.875rem, 1.5vw, 1.1rem)',
            color: 'var(--apex-silver)',
            letterSpacing: '0.06em',
            fontWeight: 300,
            maxWidth: '500px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}
        >
          Designed for those who understand perfection.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex items-center justify-center gap-6 opacity-0">
          <a
            href="#cars"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#cars')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center gap-3 overflow-hidden px-8 py-3.5 transition-all duration-500"
            style={{
              background: 'var(--apex-cyan)',
              color: 'var(--apex-black)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
            }}
            aria-label="Begin the automotive experience"
          >
            Begin Experience
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div
            className="flex items-center gap-2"
            style={{ color: 'var(--apex-silver)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            <div
              className="animate-bounce"
              style={{ animationDuration: '2s' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M4 10l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            Scroll
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ opacity: loaded ? 0.4 : 0, transition: 'opacity 1s ease 3.5s' }}
      >
        <div
          className="w-px h-12 animate-pulse"
          style={{ background: 'linear-gradient(to bottom, var(--apex-cyan), transparent)' }}
        />
      </div>

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          zIndex: 1,
        }}
      />
    </section>
  );
}
