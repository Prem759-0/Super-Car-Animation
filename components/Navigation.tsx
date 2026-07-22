'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: '#cars', label: 'Cars' },
  { href: '#engineering', label: 'Engineering' },
  { href: '#performance', label: 'Performance' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 transition-all duration-700"
        style={{
          backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          backgroundColor: scrolled ? 'rgba(6,6,6,0.75)' : 'transparent',
          borderBottom: scrolled ? '0.5px solid rgba(255,255,255,0.07)' : '0.5px solid transparent',
          boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.6)' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            aria-label="Apex Automotive home"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            {/* Logo mark */}
            <div className="relative w-7 h-7 flex-shrink-0">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <polygon points="14,2 26,26 2,26" fill="none" stroke="var(--apex-cyan)" strokeWidth="1.2" />
                <polygon points="14,8 21,23 7,23" fill="rgba(0,212,255,0.08)" stroke="none" />
              </svg>
            </div>
            <div>
              <span
                className="text-sm font-semibold tracking-[0.2em] uppercase"
                style={{ color: 'var(--apex-white)', fontFamily: 'var(--font-body)', letterSpacing: '0.22em' }}
              >
                Apex
              </span>
              <span
                className="text-sm font-light tracking-[0.2em] uppercase ml-1.5"
                style={{ color: 'var(--apex-silver)', fontFamily: 'var(--font-body)' }}
              >
                Automotive
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="animated-underline text-xs tracking-widest uppercase transition-colors duration-300"
                  style={{ color: 'var(--apex-silver)', fontWeight: 400, letterSpacing: '0.18em' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--apex-white)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--apex-silver)')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <button
              className="text-xs tracking-widest uppercase px-5 py-2 transition-all duration-300 relative overflow-hidden group"
              style={{
                color: 'var(--apex-black)',
                background: 'var(--apex-cyan)',
                fontWeight: 500,
                letterSpacing: '0.18em',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              }}
              aria-label="Begin the Apex experience"
            >
              Experience
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <span
              className="w-5 h-px block transition-all duration-300"
              style={{
                background: 'var(--apex-white)',
                transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none',
              }}
            />
            <span
              className="w-5 h-px block transition-all duration-300"
              style={{
                background: 'var(--apex-white)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="w-5 h-px block transition-all duration-300"
              style={{
                background: 'var(--apex-white)',
                transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          background: 'rgba(6,6,6,0.97)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="transition-all duration-300"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 8vw, 2.5rem)',
                color: 'var(--apex-white)',
                letterSpacing: '0.05em',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
