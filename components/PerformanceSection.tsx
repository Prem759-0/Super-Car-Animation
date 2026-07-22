'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cars } from '@/data/cars';

gsap.registerPlugin(ScrollTrigger);

const statGroups = [
  {
    carIndex: 0,
    stats: [
      { label: '0–100 km/h', value: 3.2, suffix: 's', decimals: 1 },
      { label: 'Horsepower', value: 525, suffix: 'hp', decimals: 0 },
      { label: 'Downforce', value: 860, suffix: 'kg', decimals: 0 },
      { label: 'Top Speed', value: 296, suffix: 'km/h', decimals: 0 },
    ],
  },
];

// Generic stat display for the active car
const statKeys = [
  { key: 'acceleration', label: '0–100 km/h', suffix: 's', decimals: 1 },
  { key: 'power', label: 'Horsepower', suffix: ' hp', decimals: 0 },
  { key: 'torque', label: 'Peak Torque', suffix: ' Nm', decimals: 0 },
  { key: 'weight', label: 'Kerb Weight', suffix: ' kg', decimals: 0 },
  { key: 'downforce', label: 'Downforce', suffix: ' kg', decimals: 0 },
  { key: 'topSpeed', label: 'Top Speed', suffix: ' km/h', decimals: 0 },
];

function AnimatedNumber({ target, decimals, duration = 2 }: { target: number; decimals: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        animated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration,
          ease: 'power3.out',
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = decimals > 0
                ? obj.val.toFixed(decimals)
                : Math.round(obj.val).toLocaleString();
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [target, decimals, duration]);

  return (
    <span ref={ref} className="counter-number">
      {decimals > 0 ? (0).toFixed(decimals) : '0'}
    </span>
  );
}

export default function PerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const car = cars[1]; // McLaren P1 as the performance hero

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="performance"
      className="relative overflow-hidden py-32 md:py-48"
      style={{ background: 'var(--apex-black)' }}
      aria-label="Performance specifications"
    >
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              background: i % 3 === 0 ? 'var(--apex-cyan)' : 'rgba(255,255,255,0.15)',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (Math.random() * 3 + 3) + 's',
            }}
          />
        ))}
      </div>

      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--apex-border-light), transparent)' }}
      />

      <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
        {/* Label */}
        <div className="section-label mb-6">Performance</div>

        {/* Big headline */}
        <div ref={headlineRef} className="opacity-0 mb-4">
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              color: 'var(--apex-white)',
              lineHeight: 0.9,
            }}
          >
            Beyond
          </h2>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.2)',
              lineHeight: 0.9,
            }}
          >
            Physics.
          </h2>
        </div>

        <p
          className="mb-20 max-w-sm"
          style={{
            color: 'var(--apex-silver)',
            fontSize: '0.9rem',
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          Numbers that redefine what a road car can achieve. Every figure the result of obsessive engineering discipline.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ borderTop: '0.5px solid var(--apex-border)' }}>
          {statKeys.map((stat, i) => {
            const rawVal = car.specs[stat.key as keyof typeof car.specs] as number;
            return (
              <div
                key={stat.key}
                className="py-10 px-6 relative group"
                style={{
                  borderBottom: '0.5px solid var(--apex-border)',
                  borderRight: i % 2 !== 1 && i < statKeys.length - 1 ? '0.5px solid var(--apex-border)' : 'none',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.04), transparent)' }}
                />

                <div className="section-label mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {stat.label}
                </div>

                <div
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    color: 'var(--apex-white)',
                    lineHeight: 1,
                  }}
                >
                  <AnimatedNumber target={rawVal} decimals={stat.decimals} />
                  <span
                    style={{
                      fontSize: '40%',
                      color: 'var(--apex-cyan)',
                      marginLeft: '0.15em',
                      fontWeight: 500,
                    }}
                  >
                    {stat.suffix}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Car selector row */}
        <div
          className="mt-16 flex items-center gap-8 flex-wrap"
          style={{ borderTop: '0.5px solid var(--apex-border)', paddingTop: '2rem' }}
        >
          <div style={{ color: 'var(--apex-silver)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Specs shown for:
          </div>
          {cars.map((c, i) => (
            <div
              key={c.id}
              className="flex items-center gap-2"
              style={{ color: i === 1 ? 'var(--apex-white)' : 'var(--apex-silver)', fontSize: '0.75rem', letterSpacing: '0.06em' }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: c.accentColor, opacity: i === 1 ? 1 : 0.3 }}
              />
              {c.name}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--apex-border-light), transparent)' }}
      />
    </section>
  );
}
