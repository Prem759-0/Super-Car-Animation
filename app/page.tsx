'use client';

import dynamic from 'next/dynamic';
import { useLenis } from '@/hooks/useLenis';

// Dynamic imports to avoid SSR issues with GSAP / Three.js
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const CarShowcaseSection = dynamic(() => import('@/components/CarShowcaseSection'), { ssr: false });
const EngineeringSection = dynamic(() => import('@/components/EngineeringSection'), { ssr: false });
const PerformanceSection = dynamic(() => import('@/components/PerformanceSection'), { ssr: false });
const ConfiguratorSection = dynamic(() => import('@/components/ConfiguratorSection'), { ssr: false });
const GallerySection = dynamic(() => import('@/components/GallerySection'), { ssr: false });
const InteriorSection = dynamic(() => import('@/components/InteriorSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  useLenis();

  return (
    <main
      style={{ background: 'var(--apex-black)', overflowX: 'hidden' }}
      aria-label="Apex Automotive experience"
    >
      {/* Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <HeroSection />
      <CarShowcaseSection />
      <EngineeringSection />
      <PerformanceSection />
      <ConfiguratorSection />
      <GallerySection />
      <InteriorSection />
      <Footer />
    </main>
  );
}
