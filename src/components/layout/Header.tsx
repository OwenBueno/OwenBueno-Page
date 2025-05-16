'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/thoughts', label: 'Thoughts' },
];

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
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
          <h1 className={styles.logoText}>My Creative Space</h1>
        </Link>

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
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </nav>

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
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;