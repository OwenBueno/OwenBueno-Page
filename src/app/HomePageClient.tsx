'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './HomePage.module.css';
import { Post } from '@/lib/posts';
import { Project } from '@/lib/projects';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HomePageClientProps {
  allPosts: Post[];
  featuredProjects: Project[];
}

export default function HomePageClient({ allPosts, featuredProjects }: HomePageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context((self) => {
      const heroTl = gsap.timeline();
      heroTl.from(self.selector?.(`.${styles.heroGreeting}`), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(self.selector?.(`.${styles.heroTitle}`), {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
      }, '-=0.4')
      .from(self.selector?.(`.${styles.heroDescription}`), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from(self.selector?.(`.${styles.heroButtons}`), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');

      gsap.utils.toArray<HTMLElement>(self.selector?.(`.${styles.sectionTitle}`) || []).forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      gsap.from(self.selector?.(`.${styles.thoughtCard}`), {
        scrollTrigger: {
          trigger: self.selector?.(`.${styles.thoughtsGrid}`),
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      gsap.from(self.selector?.(`.${styles.projectCard}`), {
        scrollTrigger: {
          trigger: self.selector?.(`.${styles.projectsGrid}`),
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.page} ref={containerRef}>
      {/* Hero / About Section */}
      <section className={`${styles.section} ${styles.heroSection}`}>
        <div className={styles.heroContent}>
          <span className={styles.heroGreeting}>Hello, I&apos;m Owen Bueno</span>
          <h1 className={styles.heroTitle}>
            Crafting digital experiences with purpose and code.
          </h1>
          <p className={styles.heroDescription}>
            I&apos;m a software developer and creative thinker exploring the intersection of technology, design, and human experience. 
            Currently building things that matter and sharing my journey along the way.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/projects" className={styles.primaryButton}>
              View My Work <ArrowRight size={20} />
            </Link>
            <Link href="/thoughts" className={styles.secondaryButton}>
              Read Thoughts
            </Link>
          </div>
        </div>
      </section>

      {/* Thoughts Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest Thoughts</h2>
          <Link href="/thoughts" className={styles.viewAll}>
            View all articles <ArrowRight size={16} />
          </Link>
        </div>
        <div className={styles.thoughtsGrid}>
          {allPosts.map((post) => (
            <Link key={post.slug} href={`/thoughts/${post.slug}`} className={styles.thoughtCard}>
              <span className={styles.thoughtDate}>{new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <h3 className={styles.thoughtTitle}>{post.frontmatter.title}</h3>
              <p className={styles.thoughtExcerpt}>{post.frontmatter.excerpt}</p>
              <div className={styles.viewAll} style={{ marginTop: 'auto' }}>
                Read full story <ArrowRight size={16} />
              </div>
            </Link>
          ))}
          {allPosts.length === 0 && (
            <div className={styles.thoughtCard}>
              <h3 className={styles.thoughtTitle}>More coming soon</h3>
              <p className={styles.thoughtExcerpt}>I&apos;m currently drafting some new pieces. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Selected Projects</h2>
          <Link href="/projects" className={styles.viewAll}>
            View all projects <ArrowRight size={16} />
          </Link>
        </div>
        <div className={styles.projectsGrid}>
          {featuredProjects.map((project) => (
            <Link key={project.slug} href={project.links?.[0]?.href || '/projects'} className={styles.projectCard} target="_blank">
              <div className={styles.projectImageContainer}>
                {project.imageUrl ? (
                  <Image 
                    src={project.imageUrl} 
                    alt={project.name} 
                    fill 
                    className={styles.projectImage} 
                  />
                ) : (
                  <div className={styles.projectImagePlaceholder}>
                    {project.name}
                  </div>
                )}
              </div>
              <div className={styles.projectContent}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectFooter}>
                  <div className={styles.projectTech}>
                    {project.techStack?.slice(0, 3).map((tech) => (
                      <span key={tech} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                  <div className={styles.viewAll}>
                    View <ExternalLink size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
