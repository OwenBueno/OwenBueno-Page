'use client';

import React from 'react';
import styles from './TagPill.module.css';

interface TagPillProps {
  children: React.ReactNode;
  className?: string;
}

const TagPill: React.FC<TagPillProps> = ({ children, className = '' }) => {
  return (
    <span className={`${styles.tagPill} ${className}`}>
      {children}
    </span>
  );
};

export default TagPill; 