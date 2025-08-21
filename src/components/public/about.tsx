'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Users, Award, Briefcase, GraduationCap, Building, Trophy } from 'lucide-react';
import styles from './about.module.css';

const backgroundImages = [
    '/images/events/about-image/person-about.jpg',
    '/images/events/about-image/person-about2.png',
    '/images/events/about-image/person-about0.jpg',
    '/images/events/about-image/person-about1.png',
];

// Compact achievements data
const achievements = [
    {
        icon: Briefcase,
        title: 'COO UFIN GROUP',
        highlight: 'Hiện tại',
    },
    {
        icon: Star,
        title: 'Co-Founder TingFoundation',
        highlight: '2024',
    },
    {
        icon: Building,
        title: 'Founder JO-i',
        highlight: '2023',
    },
    {
        icon: Trophy,
        title: '10+ Doanh nghiệp tư vấn',
        highlight: '8 năm',
    },
];

export default function About() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Auto-rotate background images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const element = document.getElementById('about-section');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <section id="about-section" className={styles.section}>
            {/* Background Images Carousel */}
            <div className={styles.backgroundContainer}>
                {backgroundImages.map((image, index) => (
                    <div
                        key={index}
                        className={`${styles.backgroundImage} ${index === currentImageIndex ? styles.backgroundImageActive : ''
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`Event background ${index + 1}`}
                            fill
                            className={styles.bgImage}
                            priority={index === 0}
                            sizes="100vw"
                        />
                    </div>
                ))}
                <div className={styles.backgroundOverlay}></div>
            </div>

            {/* Background Indicators */}
            <div className={styles.backgroundIndicators}>
                {backgroundImages.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentImageIndex ? styles.indicatorActive : ''
                            }`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Switch to background ${index + 1}`}
                    />
                ))}
            </div>

            <div className={styles.container}>
                <div className={`${styles.content} ${isVisible ? styles.contentVisible : ''}`}>
                    {/* Header Section */}
                    <div className={styles.header}>
                        <div className={styles.badge}>
                            <Star className={styles.badgeIcon} />
                            <span className={styles.badgeText}>Về Thomas Hoang</span>
                        </div>

                        <h2 className={styles.title}>
                            <span className={styles.titleLine1}>Blockchain Expert</span>
                            <span className={styles.titleLine2}>& Tech Leader</span>
                        </h2>

                        <p className={styles.description}>
                            8 năm kinh nghiệm trong lĩnh vực blockchain, tư vấn cho hơn 10 doanh nghiệp,
                            và là diễn giả tại nhiều trường đại học hàng đầu Việt Nam.
                        </p>
                    </div>

                    {/* Compact Achievements */}
                    <div className={styles.achievementsSection}>
                        <div className={styles.achievementsGrid}>
                            {achievements.map((achievement, index) => {
                                const Icon = achievement.icon;
                                return (
                                    <div
                                        key={index}
                                        className={styles.achievementItem}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className={styles.achievementIcon}>
                                            <Icon className={styles.icon} />
                                        </div>
                                        <div className={styles.achievementText}>
                                            <h4 className={styles.achievementTitle}>{achievement.title}</h4>
                                            <span className={styles.achievementHighlight}>{achievement.highlight}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className={styles.ctaSection}>
                        <div className={styles.ctaContent}>
                            <h3 className={styles.ctaTitle}>Tìm hiểu thêm về hành trình</h3>
                            <p className={styles.ctaDescription}>
                                Khám phá chi tiết về kinh nghiệm, dự án và tầm nhìn công nghệ
                            </p>

                            <div className={styles.ctaButtons}>
                                <Link href="/about" className={styles.ctaPrimary}>
                                    <span>Xem thêm chi tiết</span>
                                    <ArrowRight className={styles.ctaIcon} />
                                </Link>

                                <a
                                    href="https://www.linkedin.com/in/tuyen-hoang-van-thomas-hoang/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.ctaSecondary}
                                >
                                    <Users className={styles.ctaIcon} />
                                    <span>Kết nối LinkedIn</span>
                                </a>
                            </div>
                        </div>

                        {/* Profile Image */}
                        <div className={styles.profileSection}>
                            <div className={styles.profileImageContainer}>
                                <Image
                                    src="/images/events/about-image/person-02.jpg"
                                    alt="Thomas Hoang Profile"
                                    fill
                                    className={styles.profileImage}
                                    sizes="(max-width: 768px) 200px, 300px"
                                />
                                <div className={styles.profileBadge}>
                                    <Award className={styles.profileBadgeIcon} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
