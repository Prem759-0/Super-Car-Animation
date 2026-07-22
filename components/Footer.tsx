'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Vehicles: ['Porsche GT3 RS', 'McLaren P1', 'Koenigsegg Jesko', 'Ferrari SF90 XX'],
  Experience: ['Engineering', 'Performance', 'Configurator', 'Gallery'],
  Brand: ['About Apex', 'Design Philosophy', 'Heritage', 'Press'],
  Contact: ['Enquiries', 'Bespoke', 'Media', 'Legal'],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      id="about"
      className="relative overflow-hidden pt-24 pb-12"
      style={{
        background: 'var(--apex-surface)',
        borderTop: '0.5px solid var(--apex-border)',
      }}
      aria-label="Site footer"
    >
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '200px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
        {/* Logo area */}
        <div ref={logoRef} className="opacity-0 mb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
              <polygon points="20,3 37,37 3,37" fill="none" stroke="var(--apex-cyan)" strokeWidth="1" />
              <polygon points="20,11 31,33 9,33" fill="rgba(0,212,255,0.06)" />
            </svg>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--apex-white)',
                }}
              >
                Apex
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.2rem',
                  fontWeight: 300,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--apex-silver)',
                  marginLeft: '0.5rem',
                }}
              >
                Automotive
              </span>
            </div>
          </div>

          <p
            className="max-w-md mx-auto"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'var(--apex-silver)',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            &ldquo;Engineering is not just a discipline — it is a statement of intent.&rdquo;
          </p>

          {/* Hairline divider */}
          <div
            className="w-24 h-px mx-auto mt-8"
            style={{ background: 'linear-gradient(90deg, transparent, var(--apex-cyan), transparent)' }}
          />
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="section-label mb-5">{category}</div>
              <ul className="flex flex-col gap-3" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="animated-underline transition-colors duration-300"
                      style={{
                        color: 'var(--apex-silver)',
                        fontSize: '0.8rem',
                        fontWeight: 300,
                        letterSpacing: '0.04em',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--apex-white)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--apex-silver)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '0.5px solid var(--apex-border)', paddingTop: '2rem' }}
        >
          <div style={{ color: 'var(--apex-silver)', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
            © {year} Apex Automotive. All rights reserved.
          </div>

          <div
            className="flex items-center gap-2"
            style={{ color: 'var(--apex-silver)', fontSize: '0.7rem', letterSpacing: '0.08em' }}
          >
            <div className="w-1 h-1 rounded-full" style={{ background: 'var(--apex-cyan)' }} />
            Engineered with precision. Designed without compromise.
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            {['Instagram', 'X', 'YouTube'].map((social) => (
              <a
                key={social}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="animated-underline"
                style={{
                  color: 'var(--apex-silver)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
                aria-label={`Apex Automotive on ${social}`}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--apex-white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--apex-silver)')}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
