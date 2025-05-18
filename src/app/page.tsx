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
            Welcome to My World
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
                Honest takes, random musings, and reflections on life, creativity, and everything in between. This is where I think out loud and explore ideas that matter to me.
              </p>
            </div>
          </Card>
          <Card className={styles.featureCard}>
            <div className={styles.featureCardContent}>
              <h3 className={styles.featureCardTitle}>Tech Explorations</h3>
              <p className={styles.featureCardText}>
              A showcase of what I'm building—code experiments, tools, designs, and side projects. I share the process, not just the results, so you can see how things evolve.
              </p>
            </div>
          </Card>
          <Card className={styles.featureCard}>
            <div className={styles.featureCardContent}>
              <h3 className={styles.featureCardTitle}>Personal Growth</h3>
              <p className={styles.featureCardText}>
              A bit of who I am beyond the screen—my background, what drives me, and the journey that brought me here. Think of it as the human layer behind the content.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
