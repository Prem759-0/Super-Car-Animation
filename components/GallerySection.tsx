'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryItems } from '@/data/cars';

gsap.registerPlugin(ScrollTrigger);

const heights = ['h-64', 'h-96', 'h-80', 'h-72', 'h-96', 'h-64', 'h-80', 'h-72'];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Staggered gallery items
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: (i % 4) * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax per item
  useEffect(() => {
    const handlers: Array<{ el: HTMLDivElement; handler: (e: MouseEvent) => void }> = [];

    itemRefs.current.forEach((el) => {
      if (!el) return;
      const handler = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        const img = el.querySelector('img');
        if (img) {
          gsap.to(img, { x: dx * 12, y: dy * 8, duration: 0.8, ease: 'power2.out' });
        }
      };
      const leaveHandler = () => {
        const img = el.querySelector('img');
        if (img) gsap.to(img, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
      };
      el.addEventListener('mousemove', handler);
      el.addEventListener('mouseleave', leaveHandler);
      handlers.push({ el, handler });
    });

    return () => {
      handlers.forEach(({ el, handler }) => el.removeEventListener('mousemove', handler));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-32 md:py-48 overflow-hidden"
      style={{ background: 'var(--apex-black)' }}
      aria-label="Photo gallery"
    >
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div ref={titleRef} className="opacity-0 mb-20">
          <div className="section-label mb-5">Gallery</div>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'var(--apex-white)',
                lineHeight: 0.95,
              }}
            >
              Captured<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                in Light.
              </span>
            </h2>
            <p
              style={{
                color: 'var(--apex-silver)',
                fontSize: '0.85rem',
                lineHeight: 1.8,
                maxWidth: '300px',
                fontWeight: 300,
              }}
            >
              Every surface tells a story. Every angle reveals a new dimension of obsessive design.
            </p>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="gallery-item group relative mb-3 break-inside-avoid overflow-hidden opacity-0 cursor-none"
              style={{
                borderRadius: '1px',
              }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '16/9' : '4/5' }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  onError={() => {}}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
                >
                  <div
                    style={{
                      color: 'var(--apex-cyan)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      marginBottom: '2px',
                    }}
                  >
                    {item.sub}
                  </div>
                  <div
                    style={{
                      color: 'var(--apex-white)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.label}
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute top-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    borderTop: '1px solid var(--apex-cyan)',
                    borderRight: '1px solid var(--apex-cyan)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
