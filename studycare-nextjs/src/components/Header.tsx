'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.classList.toggle('menu-open');
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <Link href="/" className={styles.logo}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill="url(#gradient-logo)"/>
            <path d="M18 10L25 14V22L18 26L11 22V14L18 10Z" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="gradient-logo" x1="0" y1="0" x2="36" y2="36">
                <stop offset="0%" stopColor="#ca8a04"/>
                <stop offset="100%" stopColor="#854d0e"/>
              </linearGradient>
            </defs>
          </svg>
          <span>스터디케어</span>
        </Link>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.active : ''}`}>
          <Link href="/" className={styles.navHome}>🏠 홈</Link>
          <Link href="/#features">기능</Link>
          <Link href="/#why-choose">선택 이유</Link>
          <Link href="/#pricing">가격</Link>
          <Link href="/#reviews">후기</Link>
          <Link href="/#contact">문의</Link>
          <Link href="/login" className={styles.navCta}>시작하기</Link>
        </nav>

        <button
          className={`${styles.mobileMenuBtn} ${mobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="메뉴"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
