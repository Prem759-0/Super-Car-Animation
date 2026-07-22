'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cars } from '@/data/cars';

gsap.registerPlugin(ScrollTrigger);

const interiorShots = [
  { src: '/images/interior-1.jpg', label: 'Steering Wheel', detail: 'Carbon fibre and Alcantara', car: 'Porsche GT3 RS' },
  { src: '/images/interior-2.jpg', label: 'Driver Cockpit', detail: 'Full analogue immersion', car: 'McLaren P1' },
  { src: '/images/interior-3.jpg', label: 'Dashboard', detail: 'Machined aluminium switchgear', car: 'Koenigsegg Jesko' },
  { src: '/images/interior-4.jpg', label: 'Centre Console', detail: 'Leather and titanium', car: 'Ferrari SF90' },
];

export default function InteriorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeShot, setActiveShot] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (i: number) => {
    if (!imageRef.current || !textRef.current) return;
    gsap.to([imageRef.current, textRef.current], {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        setActiveShot(i);
        gsap.to([imageRef.current, textRef.current], {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveShot((prev) => {
        const next = (prev + 1) % interiorShots.length;
        if (imageRef.current && textRef.current) {
          gsap.to([imageRef.current, textRef.current], {
            opacity: 0, duration: 0.5,
            onComplete: () => {
              gsap.to([imageRef.current, textRef.current], { opacity: 1, duration: 0.8 });
            },
          });
        }
        return next;
      });
    }, 5000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const shot = interiorShots[activeShot];

  return (
    <section
      ref={sectionRef}
      id="interior"
      className="relative w-full overflow-hidden"
      style={{ background: 'var(--apex-black)', height: '100vh' }}
      aria-label="Interior showcase"
    >
      {/* Full bleed image with Ken Burns pan */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      >
        <Image
          src={shot.src}
          alt={`${shot.car} interior — ${shot.label}`}
          fill
          className="object-cover"
          style={{
            filter: 'brightness(0.45) contrast(1.1)',
            transform: 'scale(1.08)',
            animation: 'kenBurns 10s ease-in-out infinite alternate',
          }}
          sizes="100vw"
          onError={() => {}}
        />
      </div>

      {/* Ken Burns keyframe */}
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1.08) translate(0, 0); }
          100% { transform: scale(1.14) translate(-1%, -1%); }
        }
      `}</style>

      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, var(--apex-black), transparent)' }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, var(--apex-black) 0%, rgba(6,6,6,0.7) 40%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-16 pb-20">
        <div ref={textRef}>
          {/* Label */}
          <div className="section-label mb-3" style={{ color: 'var(--apex-cyan)' }}>Interior</div>

          {/* Title */}
          <h2
            className="font-display mb-2"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--apex-white)',
              lineHeight: 1,
            }}
          >
            {shot.label}
          </h2>

          <p style={{ color: 'var(--apex-silver)', fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.06em' }}>
            {shot.detail} · {shot.car}
          </p>

          {/* Shot navigation */}
          <div className="flex items-center gap-4 mt-8">
            {interiorShots.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); goTo(i); }}
                aria-label={`View interior shot ${i + 1}`}
                className="flex items-center gap-2 group"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <div
                  className="h-px transition-all duration-500"
                  style={{
                    width: i === activeShot ? '48px' : '20px',
                    background: i === activeShot ? 'var(--apex-cyan)' : 'rgba(255,255,255,0.25)',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    color: i === activeShot ? 'var(--apex-white)' : 'var(--apex-silver)',
                    textTransform: 'uppercase',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side accent line */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3"
        style={{ color: 'var(--apex-silver)' }}
      >
        <div
          className="w-px h-16"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--apex-cyan), transparent)' }}
        />
        <div
          style={{
            writingMode: 'vertical-rl',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--apex-silver)',
          }}
        >
          Craftsmanship
        </div>
      </div>
    </section>
  );
}
