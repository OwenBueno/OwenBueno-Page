'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import TagPill from '@/components/ui/TagPill';
import styles from './ProjectsPage.module.css';
import { Project } from '@/lib/projects';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsPageClientProps {
  projects: Project[];
}

const getIcon = (label: string) => {
  if (label.toLowerCase().includes('github')) return <Github size={16} />;
  return <ExternalLink size={16} />;
};

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.heroTitle}`, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.from(`.${styles.heroSubtitle}`, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      // Project cards stagger reveal
      gsap.from(`.${styles.projectCard}`, {
        scrollTrigger: {
          trigger: `.${styles.projectsSection}`,
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.page} ref={containerRef}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>My Projects</h1>
        <p className={styles.heroSubtitle}>
          A selection of projects I&apos;m proud to have worked on. From web applications to open source contributions and personal experiments.
        </p>
      </section>

      <section className={styles.projectsSection}>
        {projects.map((project: Project) => (
          <article key={project.slug} className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <h2 className={styles.projectName}>{project.name}</h2>
            </div>
            <p className={styles.projectDescription}>{project.description}</p>
            
            {project.techStack && project.techStack.length > 0 && (
              <div className={styles.techStack}>
                <h3 className={styles.techStackTitle}>Tech Stack</h3>
                <div className={styles.techList}>
                  {project.techStack.map((tech) => (
                    <TagPill key={tech} className={styles.techTag}>{tech}</TagPill>
                  ))}
                </div>
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className={styles.tagsList}>
                {project.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
            )}

            {project.links && project.links.length > 0 && (
              <div className={styles.projectLinks}>
                {project.links.map((link) => (
                  <Link href={link.href} key={link.href} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                    {getIcon(link.label)}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
