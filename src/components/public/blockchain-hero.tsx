'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { personalInfo } from '@/data/constants';
import {
  Calendar,
  ArrowRight,
  Bitcoin,
  Brain,
  Network,
  Shield,
  Users,
  Award,
  Star,
  Globe,
  Code2,
  Zap,
  Briefcase,
  Play,
  ChevronDown,
  TrendingUp,
  Building,
  Cpu,
  GraduationCap,
  Sparkles,
  Target,
  Layers,
  Hexagon
} from 'lucide-react';
import styles from './blockchain-hero.module.css';

export default function BlockchainHero() {
  // ===== STATE MANAGEMENT =====
  const [typedText, setTypedText] = useState('');
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ===== SCROLL ANIMATIONS =====
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  // ===== ADVANCED MOUSE PARALLAX =====
  const springConfig = { stiffness: 200, damping: 20 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // ===== TYPING ANIMATION PHRASES =====
  const phrases = [
    "COO UFIN GROUP",
    "Blockchain Innovation Leader",
    "Fintech Education Pioneer",
    "Co-Founder TingFoundation",
    "Vietnam Crypto Advisor"
  ];

  // ===== MOUSE TRACKING FOR PARALLAX =====
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      setMousePosition({ x, y });
      mouseX.set(x * 25);
      mouseY.set(y * 25);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // ===== PAGE LOAD ANIMATION =====
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // ===== ENHANCED TYPING EFFECT =====
  useEffect(() => {
    const typePhrase = () => {
      const phrase = phrases[currentPhrase];
      let index = 0;

      const typeTimer = setInterval(() => {
        if (index <= phrase.length) {
          setTypedText(phrase.slice(0, index));
          index++;
        } else {
          clearInterval(typeTimer);
          setTimeout(() => {
            const eraseTimer = setInterval(() => {
              if (index > 0) {
                setTypedText(phrase.slice(0, index - 1));
                index--;
              } else {
                clearInterval(eraseTimer);
                setCurrentPhrase((prev) => (prev + 1) % phrases.length);
              }
            }, 80);
          }, 2500);
        }
      }, 120);
    };

    typePhrase();
  }, [currentPhrase]);

  // ===== COMPONENT DATA =====
  const highlights = [
    {
      icon: Briefcase,
      text: personalInfo.currentPosition,
      color: 'gold',
      delay: 0.6,
      description: "Executive Leadership"
    },
    {
      icon: Users,
      text: personalInfo.coFounder,
      color: 'platinum',
      delay: 0.8,
      description: "Blockchain Innovation"
    },
    {
      icon: GraduationCap,
      text: personalInfo.lecturer,
      color: 'diamond',
      delay: 1.0,
      description: "Education Excellence"
    },
    {
      icon: TrendingUp,
      text: `${personalInfo.experience.blockchain} years • ${personalInfo.experience.consulting} enterprises`,
      color: 'emerald',
      delay: 1.2,
      description: "Proven Experience"
    },
  ];

  const stats = [
    { icon: Bitcoin, value: '8+', label: 'Years Experience', color: 'gold' },
    { icon: Building, value: '10+', label: 'Enterprises', color: 'platinum' },
    { icon: Award, value: 'COO', label: 'Executive', color: 'diamond' },
    { icon: Users, value: 'Co-Founder', label: 'Innovation', color: 'emerald' },
  ];

  // ===== ADVANCED 3D TECH PARTICLES =====
  const techParticles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    icon: [Bitcoin, Brain, Network, Shield, Cpu, Code2, Sparkles, Target, Layers, Globe, Hexagon][i % 11],
    delay: i * 0.4,
    duration: 8 + (i % 5),
    initialX: Math.random() * 100,
    amplitude: 50 + (i % 4) * 25,
    rotateSpeed: 360 + (i % 3) * 180,
  }));

  // ===== CYBER GRID NODES =====
  const gridNodes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (i % 6) * 20,
    y: Math.floor(i / 6) * 25,
    delay: i * 0.1,
    pulseSpeed: 2 + (i % 3),
  }));

  return (
    <motion.section
      ref={containerRef}
      className={styles.heroSection}
    // style={{ opacity, scale }}
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    // transition={{ duration: 1.5 }}
    >
      {/* ===== ADVANCED 3D TECH BACKGROUND ===== */}
      <div className={styles.techBackground}>
        {/* Cyber Grid Matrix */}
        <div className={styles.cyberMatrix}>
          <div className={styles.matrixLines}></div>
          <div className={styles.matrixGrid}></div>
          <div className={styles.matrixOverlay}></div>
        </div>

        {/* Holographic Particles */}
        <div className={styles.holographicField}>
          {Array.from({ length: 60 }, (_, i) => (
            <motion.div
              key={i}
              className={styles.holoParticle}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [120, -window.innerHeight - 120],
                x: [
                  Math.sin(i * 0.3) * 150,
                  Math.sin(i * 0.3 + Math.PI) * 150
                ]
              }}
              transition={{
                duration: 12 + (i % 4),
                repeat: Infinity,
                delay: i * 0.15,
                ease: "linear"
              }}
              style={{ left: `${(i * 1.8) % 100}%` }}
            >
              <div className={styles.particleCore}></div>
              <div className={styles.particleRing}></div>
            </motion.div>
          ))}
        </div>

        {/* 3D Tech Icons Floating */}
        <div className={styles.techIconsLayer}>
          {techParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className={styles.techIcon}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1.3, 0],
                y: [-150, -window.innerHeight - 150],
                x: [
                  particle.initialX + Math.sin(particle.id * 0.5) * particle.amplitude,
                  particle.initialX + Math.sin(particle.id * 0.5 + Math.PI) * particle.amplitude
                ],
                rotate: [0, particle.rotateSpeed],
                rotateY: [0, 180, 360]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear"
              }}
              style={{ left: `${particle.initialX}%` }}
              whileHover={{ scale: 1.5, rotateZ: 45 }}
            >
              <particle.icon className={styles.iconElement} />
              <div className={styles.iconGlow}></div>
              <div className={styles.iconShadow}></div>
            </motion.div>
          ))}
        </div>

        {/* Luxury Gradient Orbs with Mouse Interaction */}
        <motion.div
          className={`${styles.luxuryOrb} ${styles.orb1}`}
          style={{ x: mouseX, y: mouseY }}
        />
        <motion.div
          className={`${styles.luxuryOrb} ${styles.orb2}`}
          style={{
            x: useTransform(mouseX, (x) => x * -0.6),
            y: useTransform(mouseY, (y) => y * -0.4),
          }}
        />
        <motion.div
          className={`${styles.luxuryOrb} ${styles.orb3}`}
          style={{
            x: useTransform(mouseX, (x) => x * 0.4),
            y: useTransform(mouseY, (y) => y * 0.9),
          }}
        />

        {/* Cyber Grid Nodes */}
        <div className={styles.gridNodesLayer}>
          {gridNodes.map((node) => (
            <motion.div
              key={node.id}
              className={styles.gridNode}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: node.pulseSpeed,
                repeat: Infinity,
                delay: node.delay,
              }}
            />
          ))}
        </div>

        {/* Neural Network Connections */}
        <div className={styles.neuralNetwork}>
          <svg className={styles.networkSvg} viewBox="0 0 100 100">
            {Array.from({ length: 15 }, (_, i) => (
              <motion.line
                key={i}
                x1={Math.random() * 100}
                y1={Math.random() * 100}
                x2={Math.random() * 100}
                y2={Math.random() * 100}
                stroke="url(#networkGradient)"
                strokeWidth="0.1"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
            <defs>
              <linearGradient id="networkGradient">
                <stop offset="0%" stopColor="#C9B037" />
                <stop offset="50%" stopColor="#E6E8FA" />
                <stop offset="100%" stopColor="#50C878" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={styles.heroGrid}>
          {/* ===== LEFT COLUMN - CONTENT ===== */}
          <motion.div
            className={styles.contentColumn}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 100 }}
          >
            {/* Premium Status Badge */}
            <motion.div
              className={styles.statusBadge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.badgeShimmer}></div>
              <Sparkles className={styles.badgeIcon} />
              <span>Blockchain Industry Leader</span>
              <div className={styles.statusIndicator}></div>
            </motion.div>

            {/* Main Title Section */}
            <div className={styles.titleSection}>
              <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 80 }}
              >
                <span className={styles.nameWrapper}>
                  <span className={styles.firstName}>THOMAS</span>
                  <span className={styles.lastName}>HOANG</span>
                </span>
                <div className={styles.titleAura}></div>
              </motion.h1>

              <motion.div
                className={styles.positionSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <h2 className={styles.mainRole}>
                  <span className={styles.roleText}>{personalInfo.currentPosition}</span>
                  <div className={styles.roleUnderline}></div>
                </h2>
                <div className={styles.subRoles}>
                  <span>{personalInfo.coFounder}</span>
                  <span className={styles.roleSeparator}>•</span>
                  <span>{personalInfo.founder}</span>
                </div>
              </motion.div>

              {/* Advanced Typing Display - Optimized Compact Version */}
              <motion.div
                className={styles.typingDisplay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className={styles.typingFrame}>
                  <div className={styles.typingContent}>
                    <span className={styles.typingLabel}>Expertise</span>
                    <div className={styles.dynamicTextWrapper}>
                      <span className={styles.dynamicText}>
                        {typedText}
                        <span className={styles.typingCursor}>|</span>
                      </span>
                    </div>
                  </div>
                  <div className={styles.typingGlow}></div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Luxury Highlights Section with Integrated Buttons */}
            <motion.div
              className={styles.highlightsContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {/* Highlights Grid */}
              <div className={styles.highlightsGrid}>
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className={`${styles.highlightCard} ${styles[highlight.color]}`}
                    initial={{ opacity: 0, x: -20, rotateX: -10 }}
                    animate={{ opacity: 1, x: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.2 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.03,
                      x: 8,
                      rotateX: 4,
                      rotateY: 4,
                      z: 50
                    }}
                    style={{ perspective: 800 }}
                  >
                    <div className={styles.cardGlow}></div>
                    <div className={styles.cardIcon}>
                      <highlight.icon />
                      <div className={styles.iconRing}></div>
                    </div>
                    <div className={styles.cardContent}>
                      <span className={styles.cardTitle}>{highlight.text}</span>
                      <span className={styles.cardDescription}>{highlight.description}</span>
                    </div>
                  </motion.div>
                ))}

{/* Luxury Action Button - Schedule */}
<motion.div
  className={`${styles.actionCard} ${styles.scheduleCard}`}
  initial={{ opacity: 0, x: -20, rotateX: -10 }}
  animate={{ opacity: 1, x: 0, rotateX: 0 }}
  transition={{
    duration: 0.6,
    delay: 1.2 + highlights.length * 0.15,
    type: "spring",
    stiffness: 100
  }}
  whileHover={{
    scale: 1.03,
    y: -5,
    rotateX: 4,
    boxShadow: "0 15px 30px rgba(201, 176, 55, 0.25)"
  }}
  style={{ perspective: 800 }}
>
  <div className={styles.actionGradient}></div>
  <div className={styles.actionGlow}></div>
  <Link href="/booking" className={styles.actionLink}>
    <div className={styles.actionIcon}>
      <Calendar />
      <div className={styles.actionIconRing}></div>
      <div className={styles.actionIconGlow}></div>
    </div>
    <div className={styles.actionContent}>
      <span className={styles.actionTitle}>Schedule</span>
      <span className={styles.actionHint}>Book a session</span>
    </div>
    <div className={styles.actionArrow}>
      <ArrowRight />
    </div>
  </Link>
  <div className={styles.actionBorder}></div>
</motion.div>

{/* Luxury Action Button - See More */}
<motion.div
  className={`${styles.actionCard} ${styles.exploreCard}`}
  initial={{ opacity: 0, x: -20, rotateX: -10 }}
  animate={{ opacity: 1, x: 0, rotateX: 0 }}
  transition={{
    duration: 0.6,
    delay: 1.2 + (highlights.length + 1) * 0.15,
    type: "spring",
    stiffness: 100
  }}
  whileHover={{
    scale: 1.03,
    y: -5,
    rotateX: 4,
    boxShadow: "0 15px 30px rgba(230, 232, 250, 0.25)"
  }}
  style={{ perspective: 800 }}
>
  <div className={styles.actionGradient}></div>
  <div className={styles.actionGlow}></div>
  <Link href="/services" className={styles.actionLink}>
    <div className={styles.actionIcon}>
      <Play />
      <div className={styles.actionIconRing}></div>
      <div className={styles.actionIconGlow}></div>
    </div>
    <div className={styles.actionContent}>
      <span className={styles.actionTitle}>See More...</span>
      <span className={styles.actionHint}>Explore services</span>
    </div>
    <div className={styles.actionArrow}>
      <ArrowRight />
    </div>
  </Link>
  <div className={styles.actionBorder}></div>
</motion.div>
              </div>
            </motion.div>
          </motion.div>



          {/* ===== RIGHT COLUMN - DESKTOP SVG AVATAR ===== */}
          <motion.div
            className={`${styles.avatarColumn} ${styles.desktopAvatar}`}
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.6, type: "spring", stiffness: 120 }}
          >
            <div className={styles.avatarSection}>
              <motion.div
                className={styles.avatarFrame}
                whileHover={{
                  scale: 1.05,
                  rotateY: 12,
                  rotateX: 8
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ perspective: 2000 }}
              >
                {/* Advanced Holographic Border System */}
                <div className={styles.holographicFrame}>
                  <div className={styles.holoRing1}></div>
                  <div className={styles.holoRing2}></div>
                  <div className={styles.holoRing3}></div>
                  <div className={styles.holoGlow}></div>
                  <div className={styles.cornerEffects}>
                    <div className={styles.corner} data-corner="tl"></div>
                    <div className={styles.corner} data-corner="tr"></div>
                    <div className={styles.corner} data-corner="bl"></div>
                    <div className={styles.corner} data-corner="br"></div>
                  </div>
                </div>

                {/* Main SVG Avatar Container */}
                <div className={styles.svgAvatarContainer}>
                  <div className={styles.svgImageWrapper}>
                    {/* Primary SVG Image */}
                    <motion.div
                      className={styles.svgImageContainer}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.2, delay: 1 }}
                    >
                      <Image
                        src="/images/person.svg"
                        alt="Thomas Hoàng - COO UFIN GROUP & Blockchain Innovation Leader"
                        width={450}
                        height={600}
                        className={styles.svgProfile}
                        priority
                        style={{
                          filter: 'drop-shadow(0 0 30px rgba(201, 176, 55, 0.3))'
                        }}
                      />

                      {/* SVG Enhancement Effects */}
                      <div className={styles.svgGlow}></div>
                      <div className={styles.svgAura}></div>
                      <div className={styles.svgParticles}>
                        {Array.from({ length: 12 }, (_, i) => (
                          <motion.div
                            key={i}
                            className={styles.svgParticle}
                            animate={{
                              y: [0, -30, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 3,
                              delay: i * 0.3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            style={{
                              left: `${10 + (i * 8)}%`,
                              top: `${20 + Math.sin(i) * 60}%`
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Professional Overlay Information */}
                    <div className={styles.overlayInfo}>
                      <motion.div
                        className={styles.nameDisplay}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                      >
                        <h2 className={styles.displayName}>Thomas Hoàng</h2>
                        <p className={styles.displayTitle}>Blockchain Innovation Leader</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Executive Information Panel */}
                  <motion.div
                    className={styles.executivePanel}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                  >
                    <div className={styles.panelContent}>
                      <div className={styles.executiveInfo}>
                        <span className={styles.execName}>Thomas Hoàng</span>
                        <span className={styles.execPosition}>COO UFIN GROUP</span>
                        <div className={styles.execCredentials}>
                          <span>Blockchain Expert</span>
                          <span className={styles.credSeparator}>•</span>
                          <span>Fintech Pioneer</span>
                          <span className={styles.credSeparator}>•</span>
                          <span>Innovation Leader</span>
                        </div>
                      </div>
                      <div className={styles.panelSignature}></div>
                      <div className={styles.panelGlow}></div>
                    </div>
                  </motion.div>
                </div>

                {/* Premium Achievement Badges */}
                <motion.div
                  className={`${styles.achievementBadge} ${styles.badge1}`}
                  animate={{
                    y: [0, -15, 0],
                    rotateZ: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  whileHover={{ scale: 1.2, rotateZ: 10 }}
                >
                  <div className={styles.badgeIcon}>
                    <Bitcoin className="w-6 h-6" />
                  </div>
                  <div className={styles.badgeContent}>
                    <span className={styles.badgeValue}>8+</span>
                    <span className={styles.badgeLabel}>YEARS</span>
                  </div>
                  <div className={styles.badgeShine}></div>
                </motion.div>

                <motion.div
                  className={`${styles.achievementBadge} ${styles.badge2}`}
                  animate={{
                    y: [0, -20, 0],
                    rotateZ: [0, -5, 5, 0],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{ duration: 7, repeat: Infinity, delay: 2 }}
                  whileHover={{ scale: 1.2, rotateZ: -10 }}
                >
                  <div className={styles.badgeIcon}>
                    <Building className="w-6 h-6" />
                  </div>
                  <div className={styles.badgeContent}>
                    <span className={styles.badgeValue}>COO</span>
                    <span className={styles.badgeLabel}>EXECUTIVE</span>
                  </div>
                  <div className={styles.badgeShine}></div>
                </motion.div>

                <motion.div
                  className={`${styles.achievementBadge} ${styles.badge3}`}
                  animate={{
                    y: [0, -12, 0],
                    rotateZ: [0, 3, -3, 0],
                    scale: [1, 1.06, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  whileHover={{ scale: 1.2, rotateZ: 8 }}
                >
                  <div className={styles.badgeIcon}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div className={styles.badgeContent}>
                    <span className={styles.badgeValue}>Co-Founder</span>
                    <span className={styles.badgeLabel}>INNOVATION</span>
                  </div>
                  <div className={styles.badgeShine}></div>
                </motion.div>

                {/* Quantum Field Effect */}
                <div className={styles.quantumField}>
                  {Array.from({ length: 8 }, (_, i) => (
                    <motion.div
                      key={i}
                      className={styles.quantumParticle}
                      animate={{
                        x: [0, Math.sin(i) * 100, 0],
                        y: [0, Math.cos(i) * 100, 0],
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${50 + Math.sin(i) * 30}%`,
                        top: `${50 + Math.cos(i) * 30}%`
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ===== RIGHT COLUMN - MOBILE OPTIMIZED SVG AVATAR ===== */}
          <motion.div
            className={`${styles.avatarColumn} ${styles.mobileAvatar}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <div className={styles.avatarSection}>
              <motion.div
                className={styles.avatarFrame}
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 3
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ perspective: 1500 }}
              >
                {/* Mobile-Optimized Holographic Border */}
                <div className={styles.mobileHolographicFrame}>
                  <div className={styles.mobileHoloRing1}></div>
                  <div className={styles.mobileHoloRing2}></div>
                  <div className={styles.mobileHoloGlow}></div>
                  <div className={styles.mobileCornerEffects}>
                    <div className={styles.mobileCorner} data-corner="tl"></div>
                    <div className={styles.mobileCorner} data-corner="tr"></div>
                    <div className={styles.mobileCorner} data-corner="bl"></div>
                    <div className={styles.mobileCorner} data-corner="br"></div>
                  </div>
                </div>

                {/* Mobile SVG Avatar Container */}
                <div className={styles.mobileSvgContainer}>
                  <div className={styles.mobileImageWrapper}>
                    {/* SVG Image with Mobile Optimization */}
                    <motion.div
                      className={styles.mobileImageContainer}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      <Image
                        src="/images/person.svg"
                        alt="Thomas Hoàng - COO UFIN GROUP & Blockchain Innovation Leader"
                        width={420}  /* Đã tăng từ 320 lên 420 */
                        height={500} /* Đã tăng từ 400 lên 500 */
                        className={styles.mobileSvgProfile}
                        priority
                        style={{
                          filter: 'drop-shadow(0 0 15px rgba(201, 176, 55, 0.4))'
                        }}
                      />

                      {/* Mobile Enhancement Effects */}
                      <div className={styles.mobileSvgGlow}></div>
                      <div className={styles.mobileSvgAura}></div>
                    </motion.div>

                    {/* Mobile Name Display */}
                    <div className={styles.mobileNameOverlay}>
                      <motion.div
                        className={styles.mobileNameDisplay}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                      >
                        <h2 className={styles.mobileDisplayName}>Thomas Hoàng</h2>
                        <p className={styles.mobileDisplayTitle}>Blockchain Innovation Leader</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Mobile Executive Panel */}
                  <motion.div
                    className={styles.mobileExecutivePanel}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                  >
                    <div className={styles.mobilePanelContent}>
                      <div className={styles.mobileExecutiveInfo}>
                        <span className={styles.mobileExecName}>Thomas Hoàng</span>
                        <span className={styles.mobileExecPosition}>COO UFIN GROUP</span>
                        <div className={styles.mobileExecCredentials}>
                          <span>Blockchain Expert</span>
                          <span className={styles.mobileCredSep}>•</span>
                          <span>Fintech Pioneer</span>
                          <span className={styles.mobileCredSep}>•</span>
                          <span>Innovation Leader</span>
                        </div>
                      </div>
                      <div className={styles.mobilePanelSignature}></div>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile Achievement Badges */}
                <motion.div
                  className={`${styles.mobileAchievementBadge} ${styles.mobileBadge1}`}
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  whileTap={{ scale: 0.95 }}
                >

                  <div className={styles.mobileBadgeContent}>
                    <div className={styles.mobileBadgeIcon}>
                      <Bitcoin className="w-4 h-4" />
                    </div>
                    <span className={styles.mobileBadgeValue}>8+</span>
                    <span className={styles.mobileBadgeLabel}>YEARS</span>
                  </div>
                </motion.div>

                <motion.div
                  className={`${styles.mobileAchievementBadge} ${styles.mobileBadge2}`}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.03, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
                  whileTap={{ scale: 0.95 }}
                >

                  <div className={styles.mobileBadgeContent}>
                    <div className={styles.mobileBadgeIcon}>
                      <Building className="w-4 h-4" />
                    </div>
                    <span className={styles.mobileBadgeValue}>COO</span>
                    <span className={styles.mobileBadgeLabel}>EXEC</span>
                  </div>
                </motion.div>

                <motion.div
                  className={`${styles.mobileAchievementBadge} ${styles.mobileBadge3}`}
                  animate={{
                    y: [0, -6, 0],
                    scale: [1, 1.04, 1]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
                  whileTap={{ scale: 0.95 }}
                >

                  <div className={styles.mobileBadgeContent}>
                    <div className={styles.mobileBadgeIcon}>
                      <Award className="w-4 h-4" />
                    </div>
                    <span className={styles.mobileBadgeValue}>Co-Founder</span>
                    <span className={styles.mobileBadgeLabel}>INNOVATION</span>
                  </div>
                </motion.div>

                {/* Simplified Mobile Particle Effects */}
                <div className={styles.mobileQuantumField}>
                  {Array.from({ length: 4 }, (_, i) => (
                    <motion.div
                      key={i}
                      className={styles.mobileQuantumParticle}
                      animate={{
                        x: [0, Math.sin(i * 2) * 30, 0],
                        y: [0, Math.cos(i * 2) * 30, 0],
                        opacity: [0, 0.5, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${50 + Math.sin(i * 2) * 20}%`,
                        top: `${50 + Math.cos(i * 2) * 20}%`
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>


        {/* Luxury Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          <motion.div
            className={styles.scrollButton}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <ChevronDown className={styles.scrollIcon} />
            <div className={styles.scrollGlow}></div>
            <div className={styles.scrollRing}></div>
          </motion.div>
          <span className={styles.scrollLabel}>Discover Excellence</span>
        </motion.div>
        
      </div>
    </motion.section>
  );
}