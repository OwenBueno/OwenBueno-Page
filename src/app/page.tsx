'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div 
          aria-hidden="true"
          className={styles.heroBg}
        >
          <div className={styles.heroGradient}></div>
        </div>

        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Welcome to My Creative Space
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover a collection of my thoughts, projects, and explorations into the world of technology and design. 
            This is a journey of continuous learning and creative expression.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              href="/thoughts"
              className={styles.heroButton}
            >
              Explore My Thoughts
              <ArrowRight className={styles.heroButtonIcon} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>What You&apos;ll Find Here</h2>
        <div className={styles.featuresGrid}>
          <Card className={styles.featureCard}>
            <div className={styles.featureCardContent}>
              <h3 className={styles.featureCardTitle}>Creative Musings</h3>
              <p className={styles.featureCardText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
          </Card>
          <Card className={styles.featureCard}>
            <div className={styles.featureCardContent}>
              <h3 className={styles.featureCardTitle}>Tech Explorations</h3>
              <p className={styles.featureCardText}>
                Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </p>
            </div>
          </Card>
          <Card className={styles.featureCard}>
            <div className={styles.featureCardContent}>
              <h3 className={styles.featureCardTitle}>Personal Growth</h3>
              <p className={styles.featureCardText}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus magna justo, lacinia eget consectetur.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
