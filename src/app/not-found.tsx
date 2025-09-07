'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Linkedin, 
  ExternalLink,
  User,
  Building,
  Star,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'thomashoang@ufin.org',
      link: 'mailto:thomashoang@ufin.org',
      description: 'Liên hệ qua email chính thức',
      color: 'blue'
    },
    {
      icon: MessageCircle,
      label: 'Telegram',
      value: '@Thomashoang2023',
      link: 'https://t.me/Thomashoang2023',
      description: 'Chat trực tiếp qua Telegram',
      color: 'cyan'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Thomas Hoàng',
      link: 'https://www.linkedin.com/in/tuyen-hoang-van-thomas-hoang/',
      description: 'Kết nối chuyên nghiệp',
      color: 'indigo'
    }
  ];

  const quickNavigation = [
    { label: 'Trang chủ', href: '/', icon: Home },
    { label: 'Giới thiệu', href: '/about', icon: User },
    { label: 'Dịch vụ', href: '/services', icon: Star },
    { label: 'Liên hệ', href: '/contact', icon: MessageCircle },
  ];

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.background}>
        {/* Floating Particles */}
        <div className={styles.particles}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Interactive Orbs */}
        <div 
          className={styles.orb1}
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          }}
        ></div>
        <div 
          className={styles.orb2}
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`,
          }}
        ></div>

        {/* Grid Pattern */}
        <div className={styles.gridPattern}></div>
      </div>

      <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
        {/* 404 Header */}
        <div className={styles.errorSection}>
          <div className={styles.errorNumber}>
            <span className={styles.digit}>4</span>
            <span className={styles.digit}>0</span>
            <span className={styles.digit}>4</span>
          </div>
          
          <div className={styles.errorIcon}>
            <Search className={styles.searchIcon} />
            <div className={styles.iconGlow}></div>
          </div>

          <h1 className={styles.errorTitle}>Trang không tồn tại</h1>
          <p className={styles.errorDescription}>
            Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. 
            Nhưng đừng lo, bạn có thể liên hệ trực tiếp với Thomas để được hỗ trợ!
          </p>
        </div>

        {/* Thomas Contact Card */}
        <div className={styles.contactCard}>
          <div className={styles.cardHeader}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                <img
                  src="/images/events/about-image/thomas-hoang.jpg"
                  alt="Thomas Hoàng - COO UFIN Group"
                  className={styles.avatar}
                />
                <div className={styles.avatarGlow}></div>
                <div className={styles.statusIndicator}>
                  <div className={styles.statusDot}></div>
                </div>
              </div>
            </div>
            
            <div className={styles.cardInfo}>
              <h2 className={styles.cardTitle}>
                <span className={styles.nameText}>Thomas Hoàng</span>
                <Sparkles className={styles.sparkleIcon} />
              </h2>
              <div className={styles.cardRoles}>
                <div className={styles.role}>
                  <Building className={styles.roleIcon} />
                  <span>COO UFIN Group</span>
                </div>
                <div className={styles.role}>
                  <Star className={styles.roleIcon} />
                  <span>Blockchain Expert</span>
                </div>
              </div>
              <p className={styles.cardDescription}>
                Chuyên gia Blockchain & AI với 8+ năm kinh nghiệm. 
                Sẵn sàng hỗ trợ và tư vấn cho các dự án công nghệ.
              </p>
            </div>
          </div>

          <div className={styles.contactMethods}>
            <h3 className={styles.contactTitle}>Liên hệ trực tiếp với Thomas</h3>
            <div className={styles.contactGrid}>
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.contactMethod} ${styles[`contact-${contact.color}`]}`}
                  >
                    <div className={styles.contactIcon}>
                      <Icon className={styles.contactIconSvg} />
                    </div>
                    <div className={styles.contactContent}>
                      <div className={styles.contactLabel}>{contact.label}</div>
                      <div className={styles.contactValue}>{contact.value}</div>
                      <div className={styles.contactDesc}>{contact.description}</div>
                    </div>
                    <ExternalLink className={styles.contactArrow} />
                    <div className={styles.contactGlow}></div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className={styles.quickStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>8+</span>
              <span className={styles.statLabel}>Năm kinh nghiệm</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Doanh nghiệp tư vấn</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>2-4h</span>
              <span className={styles.statLabel}>Thời gian phản hồi</span>
            </div>
          </div>
        </div>

        {/* Navigation Options */}
        <div className={styles.navigationSection}>
          <h3 className={styles.navTitle}>Hoặc khám phá các trang khác</h3>
          <div className={styles.navGrid}>
            {quickNavigation.map((nav, index) => {
              const Icon = nav.icon;
              return (
                <Link
                  key={index}
                  href={nav.href}
                  className={styles.navItem}
                >
                  <Icon className={styles.navIcon} />
                  <span>{nav.label}</span>
                  <div className={styles.navGlow}></div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Back Button */}
        <div className={styles.backSection}>
          <button 
            onClick={() => window.history.back()}
            className={styles.backButton}
          >
            <ArrowLeft className={styles.backIcon} />
            <span>Quay lại trang trước</span>
          </button>
        </div>

        {/* Footer Message */}
        <div className={styles.footerMessage}>
          <Zap className={styles.footerIcon} />
          <span>
            Cần hỗ trợ gấp? Liên hệ Thomas qua{' '}
            <a 
              href="https://t.me/Thomashoang2023" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              Telegram
            </a>{' '}
            để được phản hồi nhanh nhất!
          </span>
        </div>
      </div>
    </div>
  );
}
