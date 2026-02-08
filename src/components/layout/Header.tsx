'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import styles from './Header.module.css';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/thoughts', label: 'Thoughts' },
  { href: '/projects', label: 'Projects' },
];

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header 
      className={
        `${styles.header} ${scrolled ? styles.headerScrolled : ''}`
      }
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link
          href="/"
          className={styles.logo}
        >
          <h1 className={styles.logoText}>OwenBueno</h1>
        </Link>

        <div className={styles.navActions}>
          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <div className={styles.desktopNavLinks}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    `${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`
                  }
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span 
                      layoutId="navIndicator"
                      className={styles.navIndicator}
                      transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`${styles.themeToggle} ${styles.desktopThemeToggle}`}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={styles.mobileToggle}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={menuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: menuOpen ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: menuOpen ? 90 : -90 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={styles.mobileMenuWrapper}
          >
            <nav className={styles.mobileMenu}>
              <ul className={styles.mobileMenuList}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={
                        `${styles.mobileNavLink} ${isActive(link.href) ? styles.mobileNavLinkActive : ''}`
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  {/* Theme Toggle Button - Mobile */}
                  <button
                    onClick={() => { toggleTheme(); setMenuOpen(false); }}
                    className={`${styles.mobileNavLink} ${styles.mobileThemeToggle}`}
                    aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                  >
                    {theme === 'light' ? <Moon size={18} className={styles.themeIcon} /> : <Sun size={20} className={styles.themeIcon} />}
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;