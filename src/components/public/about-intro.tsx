'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { personalInfo } from '@/data/constants';
import { motion } from 'framer-motion';
import { 
  User, Code, Zap, Globe, Mail, Download, Star, Award, Building, Users, 
  Cpu, Database, Network, Shield, Smartphone, Monitor, MessageCircle, 
  Linkedin, ChevronRight, ExternalLink, Play, Target, TrendingUp,
  BookOpen, Briefcase, GraduationCap
} from 'lucide-react';
import styles from './about-intro.module.css';

export default function AboutIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Enhanced mouse tracking for interactive effects (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      }
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isMobile]);

  const achievements = [
    { number: '8+', label: 'Năm kinh nghiệm', subtitle: 'Blockchain & AI', icon: TrendingUp, color: 'blue' },
    { number: '50+', label: 'Dự án thành công', subtitle: 'Tư vấn & Triển khai', icon: Target, color: 'green' },
    { number: '5K+', label: 'Người tham gia', subtitle: 'Sự kiện & Workshop', icon: Users, color: 'purple' },
    { number: '20+', label: 'Sự kiện lớn', subtitle: 'Diễn giả chính', icon: Award, color: 'orange' }
  ];

  const positions = [
    {
      icon: Building,
      title: 'COO UFIN GROUP',
      description: 'Lãnh đạo chiến lược công nghệ & phát triển hệ sinh thái blockchain tại UFIN Group',
      status: 'Hiện tại',
      color: 'blue',
      responsibilities: ['Quản lý vận hành', 'Phát triển sản phẩm', 'Chiến lược công nghệ']
    },
    {
      icon: Star,
      title: 'Co-Founder TingFoundation',
      description: 'Phát triển cộng đồng công nghệ & giáo dục blockchain cho thế hệ mới',
      status: '2024',
      color: 'purple',
      responsibilities: ['Xây dựng cộng đồng', 'Giáo dục blockchain', 'Tư vấn chiến lược']
    },
    {
      icon: Award,
      title: 'Blockchain Expert & Speaker',
      description: 'Chuyên gia tư vấn & triển khai giải pháp blockchain cho doanh nghiệp',
      status: '8+ năm',
      color: 'green',
      responsibilities: ['Tư vấn công nghệ', 'Diễn giả chuyên môn', 'Nghiên cứu & Phát triển']
    }
  ];

  const expertise = [
    { area: 'Blockchain Technology', level: 95, icon: Network },
    { area: 'AI & Machine Learning', level: 88, icon: Cpu },
    { area: 'Business Strategy', level: 92, icon: Briefcase },
    { area: 'Public Speaking', level: 90, icon: MessageCircle }
  ];

  const socialLinks = [
    { 
      platform: 'Telegram', 
      url: 'https://t.me/Thomashoang2023', 
      icon: MessageCircle, 
      color: 'blue',
      description: 'Direct messaging'
    },
    { 
      platform: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/tuyen-hoang-van-thomas-hoang/', 
      icon: Linkedin, 
      color: 'blue',
      description: 'Professional network'
    },
    { 
      platform: 'Email', 
      url: 'mailto:thomashoang@ufin.org', 
      icon: Mail, 
      color: 'green',
      description: 'Business inquiries'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: User },
    { id: 'experience', label: 'Kinh nghiệm', icon: Briefcase },
    { id: 'expertise', label: 'Chuyên môn', icon: GraduationCap },
    { id: 'contact', label: 'Liên hệ', icon: MessageCircle }
  ];

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const handleDownloadCV = () => {
    console.log('Download CV');
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      {/* Enhanced Advanced Tech Background - Simplified for mobile */}
      <div className={styles.heroBackground}>
        <div className={styles.animatedGrid}></div>
        {!isMobile && (
          <>
            <div className={styles.neuralNetwork}></div>
            <div className={styles.circuitPattern1}></div>
            <div className={styles.circuitPattern2}></div>
            <div className={styles.circuitPattern3}></div>
            
            {/* Enhanced Floating Particles */}
            <div className={styles.particles}>
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className={styles.particle}
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 15}s`,
                    animationDuration: `${4 + Math.random() * 6}s`,
                  }}
                />
              ))}
            </div>

            {/* Interactive Gradient Orbs with Mouse Tracking */}
            <div 
              className={styles.interactiveOrb1}
              style={{
                transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px) scale(${1 + mousePosition.x * 0.001})`,
              }}
            ></div>
            <div 
              className={styles.interactiveOrb2}
              style={{
                transform: `translate(${mousePosition.x * -0.08}px, ${mousePosition.y * -0.08}px) scale(${1 + mousePosition.y * 0.001})`,
              }}
            ></div>
            <div 
              className={styles.interactiveOrb3}
              style={{
                transform: `translate(${mousePosition.x * 0.12}px, ${mousePosition.y * -0.12}px)`,
              }}
            ></div>

            {/* Enhanced Data Flow Lines */}
            <div className={styles.dataFlowLines}>
              <div className={styles.dataLine1}></div>
              <div className={styles.dataLine2}></div>
              <div className={styles.dataLine3}></div>
              <div className={styles.dataLine4}></div>
            </div>
          </>
        )}
      </div>

      <div className={styles.heroContainer}>
        <div className={`${styles.heroGrid} ${isVisible ? styles.heroVisible : ''}`}>
          {/* Revolutionary Portrait Section - Mobile Optimized */}
          <div className={styles.portraitContainer}>
            <div className={styles.portraitWrapper}>
              {/* Enhanced Mobile Portrait Glow */}
              <div className={styles.portraitGlow1}></div>
              <div className={styles.portraitGlow2}></div>
              <div className={styles.portraitGlow3}></div>
              {!isMobile && <div className={styles.portraitGlow4}></div>}
              
 {/* Professional Hexagonal Frame */}
              <div className={styles.professionalFrame}>
                <div className={styles.hexagonalBorder}>
                  <div className={styles.portraitBorder}>
                    <div className={styles.portrait}>
                      <div className={styles.portraitImageWrapper}>
                        <Image
                          src="/images/person.svg"
                          alt="Thomas Hoàng - COO UFIN Group, Blockchain Expert & Technology Leader"
                          fill
                          className={styles.portraitImage}
  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 720px"
                          priority
                        />
                      </div>
                      
                      {/* Holographic Tech Overlay */}
                      <div className={styles.holographicOverlay}></div>
                      
                      {/* Advanced Scanning Lines */}
                      <div className={styles.scanningLine1}></div>
                      <div className={styles.scanningLine2}></div>
                      
                      {/* Tech Grid Overlay */}
                      <div className={styles.techGridOverlay}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simplified Orbiting Elements for Mobile */}
              {!isMobile ? (
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
                  <div className={styles.orbitRing4}>
                    <div className={styles.orbitElement4}>
                      <Cpu className={styles.orbitIcon} />
                    </div>
                  </div>
                </div>
              ) : (
                // Simplified mobile elements
                <div className={styles.mobileOrbitElements}>
                  <div className={styles.mobileOrbitRing}>
                    <div className={styles.mobileElement1}>
                      <Code className={styles.mobileOrbitIcon} />
                    </div>
                    <div className={styles.mobileElement2}>
                      <Zap className={styles.mobileOrbitIcon} />
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile-optimized Status Badge */}
              <div className={styles.statusBadge}>
                <div className={styles.statusIndicator}></div>
                <span className={styles.statusText}>
                  {isMobile ? 'Available' : 'Available for Consulting'}
                </span>
                <div className={styles.statusPulse}></div>
              </div>

              {/* Mobile Social Links */}
              <div className={styles.socialLinksFloat}>
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSocialClick(social.url)}
                      className={`${styles.socialLink} ${styles[`${social.color}Link`]}`}
                      title={`${social.platform} - ${social.description}`}
                    >
                      <Icon className={styles.socialIcon} />
                      <span className={styles.socialTooltip}>
                        {social.platform}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Content Section - Mobile Optimized */}
          <div className={styles.heroContent}>
            {/* Compact Mobile Navigation Tabs */}
            <div className={styles.tabNavigation}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className={styles.tabIcon} />
                    <span className={styles.tabLabel}>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Based on Active Tab */}
            <div className={styles.tabContent}>
              {activeTab === 'overview' && (
                <div className={styles.overviewContent}>
                  <div className={styles.heroBadge}>
                    <User className={styles.heroBadgeIcon} />
                    <span className={styles.heroBadgeText}>
                      {isMobile ? 'Thomas' : 'Giới thiệu về Thomas'}
                    </span>
                  </div>

                  {/* Mobile-First Title */}
                  <motion.div
                    className={styles.titleSection}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 80 }}
                  >
                    <h1 className={styles.heroTitle}>
                      <div className={styles.nameWrapper}>
                        <span className={styles.firstName}>THOMAS</span>
                        <span className={styles.lastName}>HOANG</span>
                      </div>
                      <div className={styles.titleAura}></div>
                    </h1>
                    <div className={styles.heroTitleSub}>
                      {isMobile ? 'COO UFIN • Co-Founder Ting • Founder JO-i' : 'COO UFIN GROUP • Co-Founder TingFoundation • Founder JO-i'}
                    </div>
                  </motion.div>

                  {/* Compact Description */}
                  <div className={styles.heroDescription}>
                    <p className={styles.mainDescription}>
                      {isMobile 
                        ? 'Chuyên gia blockchain hàng đầu với 8+ năm kinh nghiệm. COO tại UFIN Group và Co-Founder TingFoundation.'
                        : 'Chuyên gia công nghệ blockchain hàng đầu với 8+ năm kinh nghiệm trong lĩnh vực Fintech, AI và Blockchain. Hiện đang đảm nhận vai trò COO tại UFIN Group và Co-Founder TingFoundation, góp phần xây dựng hệ sinh thái công nghệ tiên tiến.'
                      }
                    </p>
                  </div>

                  {/* Mobile-optimized Info Grid */}
                  <div className={styles.personalInfoGrid}>
                    <div className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <User className={styles.infoIconSvg} />
                      </div>
                      <div className={styles.infoContent}>
                        <div className={styles.infoLabel}>Tên</div>
                        <div className={styles.infoValue}>
                          {isMobile ? 'Thomas Hoàng' : 'Hoàng Văn Tuyên (Thomas Hoàng)'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <Building className={styles.infoIconSvg} />
                      </div>
                      <div className={styles.infoContent}>
                        <div className={styles.infoLabel}>Vị trí</div>
                        <div className={styles.infoValue}>COO - UFIN Group</div>
                      </div>
                    </div>
                    <div className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <Code className={styles.infoIconSvg} />
                      </div>
                      <div className={styles.infoContent}>
                        <div className={styles.infoLabel}>Chuyên môn</div>
                        <div className={styles.infoValue}>
                          {isMobile ? 'Blockchain, AI' : 'Blockchain, AI, Fintech'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <TrendingUp className={styles.infoIconSvg} />
                      </div>
                      <div className={styles.infoContent}>
                        <div className={styles.infoLabel}>Kinh nghiệm</div>
                        <div className={styles.infoValue}>
                          {isMobile ? '8+ năm' : '8+ năm trong công nghệ'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-optimized Achievement Stats */}
                  <div className={styles.achievementsGrid}>
                    {achievements.map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={index} className={`${styles.achievementCard} ${styles[`achievement-${achievement.color}`]}`}>
                          <div className={styles.achievementIcon}>
                            <Icon className={styles.achievementIconSvg} />
                          </div>
                          <div className={styles.achievementNumber}>{achievement.number}</div>
                          <div className={styles.achievementContent}>
                            <div className={styles.achievementLabel}>{achievement.label}</div>
                            <div className={styles.achievementSubtitle}>{achievement.subtitle}</div>
                          </div>
                          <div className={styles.achievementGlow}></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className={styles.experienceContent}>
                  <h2 className={styles.sectionTitle}>
                    {isMobile ? 'Kinh nghiệm' : 'Kinh nghiệm & Vị trí'}
                  </h2>
                  <div className={styles.positionsGrid}>
                    {positions.map((position, index) => {
                      const Icon = position.icon;
                      return (
                        <div key={index} className={`${styles.positionCard} ${styles[`card-${position.color}`]}`}>
                          <div className={styles.positionHeader}>
                            <div className={styles.positionIcon}>
                              <Icon className={styles.positionIconSvg} />
                            </div>
                            <div className={styles.positionMeta}>
                              <h4 className={styles.positionTitle}>{position.title}</h4>
                              <span className={styles.positionStatus}>{position.status}</span>
                            </div>
                          </div>
                          <p className={styles.positionDescription}>
                            {isMobile 
                              ? position.description.substring(0, 80) + '...'
                              : position.description
                            }
                          </p>
                          <div className={styles.responsibilitiesList}>
                            {position.responsibilities.slice(0, isMobile ? 2 : 3).map((resp, idx) => (
                              <div key={idx} className={styles.responsibilityItem}>
                                <ChevronRight className={styles.responsibilityIcon} />
                                <span>{resp}</span>
                              </div>
                            ))}
                          </div>
                          <div className={styles.positionGlow}></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'expertise' && (
                <div className={styles.expertiseContent}>
                  <h2 className={styles.sectionTitle}>
                    {isMobile ? 'Chuyên môn' : 'Chuyên môn & Kỹ năng'}
                  </h2>
                  <div className={styles.expertiseGrid}>
                    {expertise.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <div key={index} className={styles.expertiseCard}>
                          <div className={styles.expertiseHeader}>
                            <div className={styles.expertiseIcon}>
                              <Icon className={styles.expertiseIconSvg} />
                            </div>
                            <div className={styles.expertiseInfo}>
                              <h4 className={styles.expertiseArea}>
                                {isMobile ? skill.area.split(' ')[0] : skill.area}
                              </h4>
                              <span className={styles.expertiseLevel}>{skill.level}%</span>
                            </div>
                          </div>
                          <div className={styles.progressBar}>
                            <div 
                              className={styles.progressFill}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className={styles.contactContent}>
                  <h2 className={styles.sectionTitle}>
                    {isMobile ? 'Liên hệ' : 'Liên hệ & Kết nối'}
                  </h2>
                  <div className={styles.contactGrid}>
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleSocialClick(social.url)}
                          className={`${styles.contactCard} ${styles[`contact-${social.color}`]}`}
                        >
                          <div className={styles.contactIcon}>
                            <Icon className={styles.contactIconSvg} />
                          </div>
                          <div className={styles.contactInfo}>
                            <h4 className={styles.contactPlatform}>{social.platform}</h4>
                            <p className={styles.contactDescription}>
                              {isMobile ? social.platform.toLowerCase() : social.description}
                            </p>
                          </div>
                          <ExternalLink className={styles.contactLinkIcon} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile-First CTA Buttons */}
            <div className={styles.heroActions}>
              <button 
                className={styles.heroPrimaryButton}
                onClick={handleContactClick}
              >
                <Mail className={styles.buttonIcon} />
                <span>{isMobile ? 'Liên hệ' : 'Liên hệ tư vấn'}</span>
                <ChevronRight className={styles.buttonArrow} />
                <div className={styles.buttonGlow}></div>
              </button>
              <button 
                className={styles.heroSecondaryButton}
                onClick={handleDownloadCV}
              >
                <Download className={styles.buttonIcon} />
                <span>{isMobile ? 'Portfolio' : 'Tải Portfolio'}</span>
                <ExternalLink className={styles.buttonExternalIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}