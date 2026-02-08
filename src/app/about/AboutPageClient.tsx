"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './AboutPage.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { calculateAge } from '@/lib/utils';
import Link from 'next/link';
import { useHydrated } from '@/lib/hooks';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const interests = [
  'Web Development',
  'Creative Coding',
  'UI/UX Design',
  'Vibe Code',
  'NTT DATA',
  'Toyota Projects',
  'AI Assistants',
  'Open Source',
  'Functional Workouts',
];

export default function AboutPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const age = calculateAge('2002-01-03'); // Born 01/3/2002

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context((self) => {
      const heroTl = gsap.timeline();
      heroTl.from(self.selector?.(`.${styles.heroTitle}`), {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      })
      .from(self.selector?.(`.${styles.heroSubtitle}`), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

      const profileSection = self.selector?.(`.${styles.profileSection}`);
      if (profileSection) {
        gsap.from(self.selector?.(`.${styles.profileImage}`), {
          scrollTrigger: {
            trigger: profileSection,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          x: -30,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });

        gsap.from(self.selector?.(`.${styles.profileBio} > *`), {
          scrollTrigger: {
            trigger: profileSection,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          x: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        });
      }

      // 3. Current Focus Section - New Animation Strategy
      // Instead of hiding them with from(), we'll use a "Reveal" approach
      const interestsSection = self.selector?.(`.${styles.interestsSection}`);
      if (interestsSection) {
        const interestsTl = gsap.timeline({
          scrollTrigger: {
            trigger: interestsSection,
            start: "top 95%", // Trigger very early
            toggleActions: "play none none none"
          }
        });

        interestsTl.from(self.selector?.(`.${styles.interestsTitle}`), {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        })
        .from(self.selector?.(`.${styles.interestTag}`), {
          opacity: 0,
          scale: 0.9,
          y: 10,
          stagger: {
            each: 0.05,
            from: "start"
          },
          duration: 0.5,
          ease: "power2.out",
          clearProps: "opacity,transform"
        }, "-=0.5");
      }

      const refreshST = () => ScrollTrigger.refresh();
      window.addEventListener('load', refreshST);
      setTimeout(refreshST, 1000);

      return () => window.removeEventListener('load', refreshST);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.page} ref={containerRef}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>About Me</h1>
        <p className={styles.heroSubtitle}>
          Software developer, creative explorer, and builder of digital experiences.
        </p>
      </section>

      <section className={styles.profileSection}>
        <div className={styles.profileImageWrapper}>
          <Image
            src="/images/Owen_Photo.jpeg"
            alt="Owen Bueno - Software Developer"
            fill
            className={styles.profileImage}
            priority
          />
        </div>
        <div className={styles.profileBio}>
          <h2 className={styles.profileName}>Hello, I&apos;m Owen Bueno</h2>
          <p className={styles.profileText}>
            I&apos;m a {hydrated ? age : '...'} -year-old software engineer based in Mexico. I have a deep passion for <strong>vibe code</strong>—creating software that doesn&apos;t just work, but feels right.
          </p>
          <p className={styles.profileText}>
            My professional journey has taken me from working at <strong>Filup RH</strong> to my current roles at <strong>NTT DATA</strong> and <strong>Toyota</strong>, where I tackle complex challenges and build scalable solutions.
          </p>
          <p className={styles.profileText}>
            When I&apos;m not in the office, you&apos;ll find me <Link href="/projects" className={styles.textLink}>working on my personal projects</Link>, enjoying the art of code, and exploring new technologies like AI-powered assistants and creative web design.
          </p>
          <p className={styles.profileText}>
            I believe in the power of continuous learning and sharing. This space is where I document my journey, share my thoughts, and showcase the projects I&apos;m most proud of.
          </p>
        </div>
      </section>

      <section className={styles.interestsSection}>
        <h2 className={styles.interestsTitle}>Current Focus</h2>
        <div className={styles.interestsContainer}>
          <div className={styles.interestsList}>
            {interests.map((interest) => (
              <span key={interest} className={styles.interestTag}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
