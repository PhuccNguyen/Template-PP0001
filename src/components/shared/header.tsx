'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/data/constants';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowRight, Shield, Diamond } from 'lucide-react';
import styles from './Header.module.css';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100; // Threshold for full opacity
      
      setIsScrolled(scrollY > 20); // Early trigger for subtle effect
      
      // Calculate scroll progress for smooth transition
      const progress = Math.min(scrollY / threshold, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      style={{
        '--scroll-progress': scrollProgress,
      } as React.CSSProperties}
    >
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          {/* Logo Area */}
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoContainer}>
              <Diamond className={styles.logoIcon} />
              <div className={styles.logoText}>
                <span className={styles.primaryLogo}>THOMAS HOANG</span>
                <span className={styles.secondaryLogo}>Blockchain Expert</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.activeNavLink : ''
                }`}
              >
                <span className={styles.navText}>{item.name}</span>
                <span className={styles.navIndicator}></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className={styles.ctaContainer}>
            <Link href="/booking" className={styles.ctaLink}>
              <button className={styles.ctaButton}>
                <span className={styles.ctaText}>Schedule Consultation</span>
                <ArrowRight className={styles.ctaIcon} />
                <span className={styles.ctaShine}></span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.active : ''}`}
            aria-label="Toggle navigation menu"
          >
            <div className={styles.menuButtonInner}>
              <span className={`${styles.menuBar} ${styles.menuBarTop}`}></span>
              <span className={`${styles.menuBar} ${styles.menuBarMiddle}`}></span>
              <span className={`${styles.menuBar} ${styles.menuBarBottom}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <div className={styles.mobileMenuOverlay} onClick={() => setIsMenuOpen(false)} />
          <div className={styles.mobileMenuContent}>
            <nav className={styles.mobileNav}>
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileNavLink} ${
                    pathname === item.href ? styles.activeMobileNavLink : ''
                  }`}
                  style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className={styles.mobileNavText}>{item.name}</span>
                  <ArrowRight className={styles.mobileNavArrow} />
                </Link>
              ))}
            </nav>
            
            <div className={styles.mobileCta}>
              <Link href="/booking" className={styles.mobileCtaLink}>
                <button 
                  className={styles.mobileCtaButton}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className={styles.mobileCtaText}>Schedule Consultation</span>
                  <ArrowRight className={styles.mobileCtaIcon} />
                </button>
              </Link>
            </div>
            
            <div className={styles.mobileFooter}>
              <div className={styles.verifiedBadge}>
                <Shield className={styles.verifiedIcon} />
                <span className={styles.verifiedText}>Certified Expert</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}