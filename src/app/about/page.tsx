import { Metadata } from 'next';
import React from 'react';
import styles from './AboutPage.module.css';

export const metadata: Metadata = {
  title: 'About Me | My Creative Blog',
  description: 'Learn more about the author of this blog.',
};

const interests = [
  'Web Development',
  'Creative Coding',
  'UI/UX Design',
  'Photography',
  'Minimalism',
  'Tech Innovation',
  'Travel',
  'Coffee Culture',
  'Open Source',
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>About Me</h1>
        <p className={styles.heroSubtitle}>
          A little bit about who I am, my passions, and what drives my curiosity.
        </p>
      </section>

      <section className={styles.profileSection}>
        <div className={styles.profileImageWrapper}>
          {/* Replace with your actual image if desired */}
          <div className={styles.profileImagePlaceholder}>
            <span>OB</span>
          </div>
        </div>
        <div className={styles.profileBio}>
          <h2 className={styles.profileName}>Hello, I&apos;m Owen Bueno</h2>
          <p className={styles.profileText}>
            I&apos;m a passionate software engineer and designer based in Lisbon, Portugal. I love building beautiful, accessible, and performant web experiences. My journey started with curiosity for how things work, and it&apos;s led me to explore everything from creative coding to user experience design.
          </p>
          <p className={styles.profileText}>
            When I&apos;m not coding, you&apos;ll find me capturing moments with my camera, experimenting with new coffee brewing methods, or planning my next travel adventure. I believe in lifelong learning, minimalism, and the power of open source to make the world a better place.
          </p>
          <p className={styles.profileText}>
            This blog is my digital playground—a space to share thoughts, projects, and discoveries. Thanks for stopping by!
          </p>
        </div>
      </section>

      <section className={styles.interestsSection}>
        <h2 className={styles.interestsTitle}>My Interests</h2>
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
      </section>
    </div>
  );
} 