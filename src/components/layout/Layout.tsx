'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis(); 

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP animation for content fade-in
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }

    return () => {
      lenis.destroy(); // Cleanup Lenis instance on component unmount
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main ref={contentRef} className="flex-grow container mx-auto px-4 pt-24 pb-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 