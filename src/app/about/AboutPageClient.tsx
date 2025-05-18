"use client";
import React, { useEffect, useRef } from 'react';
import styles from './AboutPage.module.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const interests = [
  'Web Development',
  'Creative Coding',
  'UI/UX Design',
  'Sports',
  'Minimalism',
  'Tech Innovation',
  'Video Games',
  'Artificial Intelligence',
  'Open Source',
];

// Define custom interface for Lenis options
interface CustomLenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smooth?: boolean;
  mouseMultiplier?: number;
  touchMultiplier?: number;
}

export default function AboutPageClient() { // Renamed from AboutPage
  const heroRef = useRef<HTMLElement>(null);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const profileBioRef = useRef<HTMLDivElement>(null);
  const interestsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initialize smooth scrolling with Lenis
    const lenisOptions: CustomLenisOptions = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      touchMultiplier: 2,
    };
    
    // Use type assertion to bypass TypeScript checking
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = new Lenis(lenisOptions as any);

    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Animation for hero section
    if (heroRef.current) {
      const heroTitle = heroRef.current.querySelector(`.${styles.heroTitle}`);
      const heroSubtitle = heroRef.current.querySelector(`.${styles.heroSubtitle}`);
      
      if (heroTitle) {
        gsap.to(heroTitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }
      
      if (heroSubtitle) {
        gsap.to(heroSubtitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });
      }
    }

    // Animation for profile section
    if (profileImageRef.current) {
      gsap.to(profileImageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: profileImageRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }

    if (profileBioRef.current) {
      gsap.to(profileBioRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: profileBioRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }

    // Animation for interests section
    if (interestsSectionRef.current) {
      gsap.to(interestsSectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: interestsSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Staggered animation for interest tags
      const interestTags = interestsSectionRef.current.querySelectorAll(`.${styles.interestTag}`);
      if (interestTags.length) {
        gsap.fromTo(
          interestTags,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: interestsSectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }

    // Clean up
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.heroSection} ref={heroRef}>
        <h1 className={styles.heroTitle}>About Me</h1>
        <p className={styles.heroSubtitle}>
          A little bit about who I am, my passions, and what drives my curiosity.
        </p>
      </section>

      <section className={styles.profileSection}>
        <div className={styles.profileImageWrapper} ref={profileImageRef}>
          {/* Replace with your actual image if desired */}
          <div className={styles.profileImagePlaceholder}>
            <span>OB</span>
          </div>
        </div>
        <div className={styles.profileBio} ref={profileBioRef}>
          <h2 className={styles.profileName}>Hello, I&apos;m OwenBueno</h2>
          <p className={styles.profileText}>
          I&apos;m a 23-year-old software engineer from Mexico {new Date().getFullYear() - 2002}, passionate about creating things that enhance user experiences and make the world a little better through technology.
          </p>
          <p className={styles.profileText}>
          I currently work at Filup RH while also building my own projects—like <strong>Laneta Estudio</strong> and a new SaaS platform focused on AI-powered assistants for companies and individuals. I love open source and try to share all my projects publicly whenever possible.
          </p>
          <p className={styles.profileText}>
          Outside of coding, I enjoy playing video games, having deep conversations, and staying active with running and functional workouts. 
          </p>
          <p className={styles.profileText}>
            This blog is my digital playground—a space to share my thoughts, projects, and explorations. Thanks for reading, and I truly hope you enjoy exploring what you find here.
          </p>
        </div>
      </section>

      <section className={styles.interestsSection} ref={interestsSectionRef}>
        <h2 className={styles.interestsTitle}>My Interests</h2>
        <div className={styles.interestsContainer}>
          <div className={styles.interestsList}>
            {interests.map((interest) => (
              <span 
                key={interest} 
                className={styles.interestTag}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 