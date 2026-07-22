'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { cars } from '@/data/cars';

const paintOptions = [
  { name: 'Liquid Metal Silver', hex: '#b8bec7', metallic: true },
  { name: 'GT Arctic Blue', hex: '#1a3a8a', metallic: true },
  { name: 'Volcanic Orange', hex: '#ff4500', metallic: false },
  { name: 'Obsidian Black', hex: '#111111', metallic: true },
  { name: 'Racing Green', hex: '#1a4a2a', metallic: true },
  { name: 'Frozen White', hex: '#f0f0f0', metallic: false },
];

const modes = [
  { id: 'studio', label: 'Studio', icon: '◈' },
  { id: 'track', label: 'Track', icon: '◉' },
  { id: 'night', label: 'Night', icon: '◐' },
  { id: 'xray', label: 'X-Ray', icon: '◫' },
  { id: 'interior', label: 'Interior', icon: '◧' },
];

export default function ConfiguratorSection() {
  const [activeCar, setActiveCar] = useState(0);
  const [activePaint, setActivePaint] = useState(0);
  const [activeMode, setActiveMode] = useState('studio');
  const [lights, setLights] = useState(false);
  const [carbonPack, setCarbonPack] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const paintRef = useRef<HTMLDivElement>(null);

  const car = cars[activeCar];
  const paint = paintOptions[activePaint];

  const switchPaint = (i: number) => {
    if (transitioning) return;
    setTransitioning(true);
    gsap.to(imageRef.current, {
      filter: 'brightness(2) saturate(0)',
      duration: 0.3,
      onComplete: () => {
        setActivePaint(i);
        gsap.to(imageRef.current, {
          filter: 'brightness(1) saturate(1)',
          duration: 0.8,
          ease: 'power2.out',
        });
        setTransitioning(false);
      },
    });
  };

  const switchCar = (i: number) => {
    if (transitioning) return;
    setTransitioning(true);
    gsap.to(imageRef.current, {
      opacity: 0,
      x: -30,
      duration: 0.4,
      onComplete: () => {
        setActiveCar(i);
        gsap.fromTo(imageRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' });
        setTransitioning(false);
      },
    });
  };

  return (
    <section
      id="configurator"
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ background: 'var(--apex-surface)' }}
      aria-label="Interactive car configurator"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${car.accentColor}08 0%, transparent 70%)`,
          transition: 'background 1s ease',
        }}
      />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--apex-border)' }} />

      <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="section-label mb-3">Configure</div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'var(--apex-white)',
              }}
            >
              Make It Yours.
            </h2>
          </div>

          {/* Car selector */}
          <div className="flex gap-3 flex-wrap">
            {cars.map((c, i) => (
              <button
                key={c.id}
                onClick={() => switchCar(i)}
                className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300"
                style={{
                  letterSpacing: '0.15em',
                  border: `0.5px solid ${i === activeCar ? c.accentColor : 'rgba(255,255,255,0.1)'}`,
                  background: i === activeCar ? `${c.accentColor}15` : 'transparent',
                  color: i === activeCar ? c.accentColor : 'var(--apex-silver)',
                  cursor: 'pointer',
                }}
                aria-pressed={i === activeCar}
                aria-label={`Select ${c.name}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main configurator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">
          {/* Car viewer */}
          <div className="relative">
            {/* Mode selector */}
            <div className="flex gap-2 mb-6">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className="flex items-center gap-2 px-3 py-1.5 transition-all duration-300"
                  style={{
                    border: `0.5px solid ${activeMode === mode.id ? 'var(--apex-cyan)' : 'var(--apex-border)'}`,
                    background: activeMode === mode.id ? 'rgba(0,212,255,0.1)' : 'transparent',
                    color: activeMode === mode.id ? 'var(--apex-cyan)' : 'var(--apex-silver)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                  aria-pressed={activeMode === mode.id}
                  aria-label={`${mode.label} view mode`}
                >
                  <span>{mode.icon}</span>
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Car image */}
            <div
              ref={imageRef}
              className="relative w-full flex items-center justify-center py-16"
              style={{
                background: activeMode === 'night'
                  ? '#000'
                  : activeMode === 'track'
                    ? 'linear-gradient(135deg, #0a0a0a, #111)'
                    : activeMode === 'xray'
                      ? 'rgba(0,212,255,0.03)'
                      : 'linear-gradient(135deg, var(--apex-surface), var(--apex-black))',
                borderRadius: '2px',
                minHeight: '380px',
                border: '0.5px solid var(--apex-border)',
                transition: 'background 0.8s ease',
              }}
            >
              {/* Simulated paint overlay */}
              <div
                className="absolute inset-0 rounded"
                style={{
                  background: `radial-gradient(ellipse at 60% 30%, ${paint.hex}18 0%, transparent 60%)`,
                  mixBlendMode: 'overlay',
                  transition: 'background 0.6s ease',
                  pointerEvents: 'none',
                }}
              />

              {/* Lights effect */}
              {lights && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse 60% 30% at 15% 50%, rgba(255,255,220,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 30% at 85% 50%, rgba(255,50,50,0.1) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
              )}

              <Image
                src={car.image}
                alt={`${car.name} - ${paint.name} configuration`}
                width={900}
                height={450}
                className="w-full max-w-2xl h-auto object-contain relative z-10"
                style={{
                  filter: activeMode === 'xray'
                    ? 'hue-rotate(180deg) saturate(0) brightness(0.5) invert(1)'
                    : activeMode === 'night'
                      ? 'brightness(0.4) contrast(1.2)'
                      : `brightness(1) hue-rotate(0deg)`,
                  transition: 'filter 0.8s ease',
                }}
                onError={() => {}}
              />

              {/* Carbon fiber badge */}
              {carbonPack && (
                <div
                  className="absolute top-4 right-4 px-3 py-1.5"
                  style={{
                    background: 'rgba(0,0,0,0.8)',
                    border: '0.5px solid var(--apex-cyan)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: 'var(--apex-cyan)',
                    textTransform: 'uppercase',
                  }}
                >
                  Carbon Pack Active
                </div>
              )}
            </div>

            {/* Car name + paint label */}
            <div
              className="flex items-center justify-between mt-4 px-1"
              style={{ borderTop: '0.5px solid var(--apex-border)', paddingTop: '1rem' }}
            >
              <div>
                <div className="section-label mb-1" style={{ color: car.accentColor }}>{car.name}</div>
                <div style={{ color: 'var(--apex-white)', fontSize: '0.85rem', fontWeight: 500 }}>{paint.name}</div>
              </div>
              <div style={{ color: 'var(--apex-muted)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                {car.origin}
              </div>
            </div>
          </div>

          {/* Controls panel */}
          <div className="flex flex-col gap-8">
            {/* Paint studio */}
            <div>
              <div className="section-label mb-4">Paint Studio</div>
              <div className="grid grid-cols-3 gap-3">
                {paintOptions.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => switchPaint(i)}
                    className="group flex flex-col items-center gap-2"
                    aria-label={`Select ${p.name} paint`}
                    aria-pressed={i === activePaint}
                  >
                    <div
                      className="w-10 h-10 rounded-full transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: p.metallic
                          ? `radial-gradient(circle at 35% 35%, ${lightenHex(p.hex, 40)}, ${p.hex} 60%, ${darkenHex(p.hex, 30)} 100%)`
                          : p.hex,
                        border: `2px solid ${i === activePaint ? 'rgba(255,255,255,0.6)' : 'transparent'}`,
                        boxShadow: i === activePaint ? `0 0 16px ${p.hex}60` : 'none',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.55rem',
                        letterSpacing: '0.08em',
                        textAlign: 'center',
                        color: i === activePaint ? 'var(--apex-white)' : 'var(--apex-silver)',
                        lineHeight: 1.3,
                        textTransform: 'uppercase',
                      }}
                    >
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div>
              <div className="section-label mb-4">Options</div>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Headlights On', key: 'lights', state: lights, setter: setLights },
                  { label: 'Carbon Pack', key: 'carbon', state: carbonPack, setter: setCarbonPack },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => opt.setter(!opt.state)}
                    className="flex items-center justify-between px-4 py-3 transition-all duration-300"
                    style={{
                      border: `0.5px solid ${opt.state ? 'var(--apex-cyan)' : 'var(--apex-border)'}`,
                      background: opt.state ? 'rgba(0,212,255,0.06)' : 'transparent',
                      cursor: 'pointer',
                    }}
                    aria-pressed={opt.state}
                    aria-label={opt.label}
                  >
                    <span
                      style={{
                        color: opt.state ? 'var(--apex-white)' : 'var(--apex-silver)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {opt.label}
                    </span>
                    <div
                      className="w-8 h-4 relative rounded-full transition-all duration-300"
                      style={{
                        background: opt.state ? 'var(--apex-cyan)' : 'rgba(255,255,255,0.1)',
                      }}
                    >
                      <div
                        className="absolute top-0.5 rounded-full transition-all duration-300"
                        style={{
                          width: '12px',
                          height: '12px',
                          background: 'white',
                          left: opt.state ? 'calc(100% - 14px)' : '2px',
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Specs summary */}
            <div style={{ borderTop: '0.5px solid var(--apex-border)', paddingTop: '1.5rem' }}>
              <div className="section-label mb-4">Specifications</div>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Power Output', value: `${car.specs.power} hp` },
                  { label: '0–100 km/h', value: `${car.specs.acceleration}s` },
                  { label: 'Kerb Weight', value: `${car.specs.weight} kg` },
                  { label: 'Top Speed', value: `${car.specs.topSpeed} km/h` },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span style={{ color: 'var(--apex-silver)', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                      {s.label}
                    </span>
                    <span style={{ color: 'var(--apex-white)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function lightenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b = Math.min(255, (num & 0x0000ff) + amount);
  return `rgb(${r},${g},${b})`;
}

function darkenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `rgb(${r},${g},${b})`;
}
