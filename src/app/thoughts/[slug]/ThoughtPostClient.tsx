'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './ThoughtPostPage.module.css';

interface ThoughtPostClientProps {
  children: React.ReactNode;
}

export default function ThoughtPostClient({ children }: ThoughtPostClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const header = self.selector?.(`.${styles.header}`);
      const content = self.selector?.(`.${styles.proseContent}`);
      const backLink = self.selector?.(`.${styles.backLinkWrapper}`);

      const tl = gsap.timeline();

      tl.from(header, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
      .from(content, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .from(backLink, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {children}
    </div>
  );
}
