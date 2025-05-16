'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';

interface TagPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const TagPill: React.FC<TagPillProps> = ({ children, className = '', ...props }) => {
  const pillRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (pillRef.current) {
      gsap.to(pillRef.current, { scale: 1.08, backgroundColor: '#ede9fe', duration: 0.18, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (pillRef.current) {
      gsap.to(pillRef.current, { scale: 1, backgroundColor: '', duration: 0.18, ease: 'power2.out' });
    }
  };

  return (
    <span
      ref={pillRef}
      className={`inline-block bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium rounded-full transition-colors ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </span>
  );
};

export default TagPill; 