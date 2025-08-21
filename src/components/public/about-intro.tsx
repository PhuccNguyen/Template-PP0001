'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { personalInfo } from '@/data/constants';
import { User, Code, Zap, Globe, Mail, Download, Star, Award, Building, Users, Cpu, Database, Network, Shield, Smartphone, Monitor } from 'lucide-react';
import styles from './about-intro.module.css';

export default function AboutIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const achievements = [
    { number: '8+', label: 'Năm kinh nghiệm', subtitle: 'Blockchain & AI' },
    { number: '10+', label: 'Doanh nghiệp', subtitle: 'Tư vấn thành công' },
    { number: '5,000+', label: 'Người tham gia', subtitle: 'Sự kiện & Workshop' },
    { number: '20+', label: 'Sự kiện', subtitle: 'Diễn giả chính' }
  ];

  const positions = [
    {
      icon: Building,
      title: 'COO UFIN GROUP',
      description: 'Lãnh đạo chiến lược công nghệ',
      status: 'Hiện tại'
    },
    {
      icon: Star,
      title: 'Co-Founder TingFoundation',
      description: 'Phát triển cộng đồng công nghệ',
      status: '2024'
    },
    {
      icon: Award,
      title: 'Founder JO-i',
      description: 'Khởi nghiệp công nghệ sáng tạo',
      status: '2023'
    }
  ];

  const techIcons = [
    { Icon: Code, delay: 0 },
    { Icon: Zap, delay: 0.5 },
    { Icon: Globe, delay: 1 },
    { Icon: Cpu, delay: 1.5 },
    { Icon: Database, delay: 2 },
    { Icon: Network, delay: 2.5 },
    { Icon: Shield, delay: 3 },
    { Icon: Smartphone, delay: 3.5 },
    { Icon: Monitor, delay: 4 },
  ];

  return (
    <section className={styles.heroSection}>
      {/* Advanced Tech Background */}
      <div className={styles.heroBackground}>
        {/* Animated Grid */}
        <div className={styles.animatedGrid}></div>
        
        {/* Circuit Patterns */}
        <div className={styles.circuitPattern1}></div>
        <div className={styles.circuitPattern2}></div>
        
        {/* Floating Particles */}
        <div className={styles.particles}>
          {Array.from({ length: 50 }).map((_, i) => (
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

        {/* Interactive Gradient Orbs */}
        <div 
          className={styles.interactiveOrb1}
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          }}
        ></div>
        <div 
          className={styles.interactiveOrb2}
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`,
          }}
        ></div>

        {/* Data Flow Lines */}
        <div className={styles.dataFlowLines}>
          <div className={styles.dataLine1}></div>
          <div className={styles.dataLine2}></div>
          <div className={styles.dataLine3}></div>
        </div>

        {/* Floating Tech Icons */}
        <div className={styles.floatingTechIcons}>
          {techIcons.map(({ Icon, delay }, index) => (
            <div
              key={index}
              className={`${styles.floatingTechIcon} ${styles[`techIcon${index + 1}`]}`}
              style={{ animationDelay: `${delay}s` }}
            >
              <Icon className={styles.techIconSvg} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.heroContainer}>
        <div className={`${styles.heroGrid} ${isVisible ? styles.heroVisible : ''}`}>
          {/* Enhanced Portrait Section */}
          <div className={styles.portraitContainer}>
            <div className={styles.portraitWrapper}>
              {/* Multi-layer Glow Effects */}
              <div className={styles.portraitGlow1}></div>
              <div className={styles.portraitGlow2}></div>
              <div className={styles.portraitGlow3}></div>
              
              {/* Hexagonal Frame */}
              <div className={styles.hexagonalFrame}>
                <div className={styles.hexagon}>
                  <div className={styles.portrait}>
                    <div className={styles.portraitImageWrapper}>
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                        alt="Thomas Hoàng - Professional Portrait"
                        fill
                        className={styles.portraitImage}
                        sizes="(max-width: 768px) 280px, 400px"
                        priority
                      />
                    </div>
                    
                    {/* Holographic Overlay */}
                    <div className={styles.holographicOverlay}></div>
                    
                    {/* Scanning Line Effect */}
                    <div className={styles.scanningLine}></div>
                  </div>
                </div>
              </div>

              {/* Orbiting Tech Elements */}
              <div className={styles.orbitingElements}>
                <div className={styles.orbitRing1}>
                  <div className={styles.orbitElement1}>
                    <Code className={styles.orbitIcon} />
                  </div>
                </div>
                <div className={styles.orbitRing2}>
                  <div className={styles.orbitElement2}>
                    <Zap className={styles.orbitIcon} />
                  </div>
                </div>
                <div className={styles.orbitRing3}>
                  <div className={styles.orbitElement3}>
                    <Globe className={styles.orbitIcon} />
                  </div>
                </div>
              </div>

              {/* Status Badge with Animation */}
              <div className={styles.statusBadge}>
                <div className={styles.statusIndicator}></div>
                <span className={styles.statusText}>Available for Consulting</span>
                <div className={styles.statusPulse}></div>
              </div>

              {/* Tech Stats Overlay */}
              <div className={styles.techStatsOverlay}>
                <div className={styles.techStat}>
                  <div className={styles.techStatValue}>99.9%</div>
                  <div className={styles.techStatLabel}>Uptime</div>
                </div>
                <div className={styles.techStat}>
                  <div className={styles.techStatValue}>AI</div>
                  <div className={styles.techStatLabel}>Expert</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <User className={styles.heroBadgeIcon} />
              <span className={styles.heroBadgeText}>Giới thiệu về Thomas</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleMain}>Thomas Hoàng</span>
              <span className={styles.heroTitleSub}>Blockchain Expert & Tech Leader</span>
            </h1>

            {/* Personal Info */}
            <div className={styles.heroInfo}>
              <div className={styles.infoItem}>
                <div className={styles.infoIndicator}></div>
                <span className={styles.infoText}>
                  <strong>Tên thật:</strong> {personalInfo.realName} ({personalInfo.birthYear})
                </span>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIndicator}></div>
                <span className={styles.infoText}>
                  <strong>Chức danh:</strong> {personalInfo.currentPosition}
                </span>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIndicator}></div>
                <span className={styles.infoText}>
                  <strong>Chuyên môn:</strong> {personalInfo.expertise}
                </span>
              </div>
            </div>

            {/* Current Positions */}
            <div className={styles.positionsGrid}>
              {positions.map((position, index) => {
                const Icon = position.icon;
                return (
                  <div key={index} className={styles.positionCard}>
                    <div className={styles.positionIcon}>
                      <Icon className={styles.positionIconSvg} />
                    </div>
                    <div className={styles.positionContent}>
                      <h4 className={styles.positionTitle}>{position.title}</h4>
                      <p className={styles.positionDescription}>{position.description}</p>
                      <span className={styles.positionStatus}>{position.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className={styles.heroActions}>
              <button className={styles.heroPrimaryButton}>
                <Mail className={styles.buttonIcon} />
                <span>Liên hệ tư vấn</span>
                <div className={styles.buttonGlow}></div>
              </button>
              <button className={styles.heroSecondaryButton}>
                <Download className={styles.buttonIcon} />
                <span>Tải Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
