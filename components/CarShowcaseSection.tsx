'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { cars } from '@/data/cars';

gsap.registerPlugin(ScrollTrigger);

export default function CarShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const prevIndex = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalSlides = cars.length;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalSlides * 100}%`,
        pin: containerRef.current,
        pinSpacing: true,
        scrub: false,
        onUpdate: (self) => {
          const newIndex = Math.min(
            Math.floor(self.progress * totalSlides),
            totalSlides - 1
          );
          if (newIndex !== prevIndex.current) {
            prevIndex.current = newIndex;
            setTransitioning(true);
            setTimeout(() => {
              setActiveIndex(newIndex);
              setTransitioning(false);
            }, 400);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const car = cars[activeIndex];

  return (
    <div ref={sectionRef} id="cars" style={{ height: `${cars.length * 100}vh` }}>
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex items-center"
        style={{ background: 'var(--apex-black)' }}
      >
        {/* Background ambient glow per car */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 60% 50%, ${car.accentColor}10 0%, transparent 70%)`,
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Car image */}
        <div
          className="absolute inset-0 flex items-center justify-end pr-0 md:pr-16"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'scale(0.97) translateX(30px)' : 'scale(1) translateX(0px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div
            className="relative w-full max-w-3xl"
            style={{
              filter: `drop-shadow(0 30px 80px rgba(0,0,0,0.8)) drop-shadow(0 0 40px ${car.accentColor}22)`,
            }}
          >
            <Image
              src={car.image}
              alt={car.name}
              width={1200}
              height={600}
              className="w-full h-auto object-contain"
              priority={activeIndex === 0}
              onError={() => {}}
            />
          </div>
        </div>

        {/* Content overlay - left side */}
        <div
          className="relative z-10 px-8 md:px-16 lg:px-24 max-w-xl"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(20px)' : 'translateY(0)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          {/* Car number */}
          <div
            className="section-label mb-4"
            style={{ color: car.accentColor }}
          >
            {String(activeIndex + 1).padStart(2, '0')} / {String(cars.length).padStart(2, '0')}
          </div>

          {/* Name */}
          <h2
            className="font-display mb-2"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--apex-white)',
              lineHeight: 1,
            }}
          >
            {car.name}
          </h2>

          {/* Tagline */}
          <p
            className="mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
              color: car.accentColor,
              letterSpacing: '0.02em',
              fontWeight: 400,
            }}
          >
            {car.tagline}
          </p>

          {/* Hairline */}
          <div className="w-12 h-px mb-6" style={{ background: car.accentColor }} />

          {/* Description */}
          <p
            className="mb-10 leading-relaxed"
            style={{
              color: 'var(--apex-silver)',
              fontSize: '0.9rem',
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            {car.description}
          </p>

          {/* Key spec pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { label: 'Power', value: `${car.specs.power} hp` },
              { label: '0–100', value: `${car.specs.acceleration}s` },
              { label: 'Top Speed', value: `${car.specs.topSpeed} km/h` },
            ].map((spec) => (
              <div
                key={spec.label}
                className="px-4 py-2"
                style={{
                  border: `0.5px solid ${car.accentColor}40`,
                  background: `${car.accentColor}08`,
                }}
              >
                <div className="section-label mb-0.5" style={{ color: car.accentColor }}>{spec.label}</div>
                <div style={{ color: 'var(--apex-white)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Origin */}
          <div
            className="flex items-center gap-2"
            style={{ color: 'var(--apex-silver)', fontSize: '0.75rem', letterSpacing: '0.12em' }}
          >
            <div className="w-1 h-1 rounded-full" style={{ background: car.accentColor }} />
            {car.origin} · {car.year}
          </div>
        </div>

        {/* Car nav dots */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
          {cars.map((c, i) => (
            <button
              key={c.id}
              aria-label={`View ${c.name}`}
              className="relative flex items-center justify-center"
              style={{ width: 24, height: 24 }}
              onClick={() => {
                const scrollTarget = sectionRef.current;
                if (scrollTarget) {
                  const rect = scrollTarget.getBoundingClientRect();
                  const scrollTop = window.scrollY + rect.top;
                  const sectionHeight = scrollTarget.offsetHeight;
                  const targetScroll = scrollTop + (i / cars.length) * sectionHeight;
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
              }}
            >
              <div
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === activeIndex ? 8 : 4,
                  height: i === activeIndex ? 8 : 4,
                  background: i === activeIndex ? c.accentColor : 'rgba(255,255,255,0.25)',
                  boxShadow: i === activeIndex ? `0 0 12px ${c.accentColor}80` : 'none',
                }}
              />
            </button>
          ))}
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--apex-black), transparent)' }}
        />

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          style={{ color: 'var(--apex-silver)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}
        >
          Scroll to explore
        </div>
      </div>
    </div>
  );
}
