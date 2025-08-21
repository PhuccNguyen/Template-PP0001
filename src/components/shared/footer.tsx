'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { socialLinks, navItems, personalInfo } from '@/data/constants';
import { Mail, Send, Linkedin, MapPin, Phone, Calendar, Users, Award, ExternalLink, ArrowUp, Heart } from 'lucide-react';
import styles from './footer.module.css';

const iconMap = {
  LinkedIn: Linkedin,
  Send: Send,
  Mail: Mail,
};

const footerStats = [
  { icon: Users, label: 'Người tham gia sự kiện', value: '5,000+' },
  { icon: Award, label: 'Năm kinh nghiệm', value: '8+' },
  { icon: Calendar, label: 'Sự kiện tổ chức', value: '20+' },
];

const quickServices = [
  { name: 'Tư vấn Blockchain', href: '/services/blockchain-consulting' },
  { name: 'Đào tạo AI/Blockchain', href: '/services/training' },
  { name: 'Xây dựng cộng đồng', href: '/services/community-building' },
  { name: 'Diễn giả sự kiện', href: '/services/speaking' },
];

const recentPosts = [
  {
    title: 'Tương lai của Blockchain trong Giáo dục',
    date: '15 Nov 2024',
    href: '/blog/blockchain-in-education',
  },
  {
    title: 'AI và Blockchain: Cặp đôi hoàn hảo',
    date: '10 Nov 2024',
    href: '/blog/ai-blockchain-combination',
  },
  {
    title: 'Xây dựng Cộng đồng Tech mạnh mẽ',
    date: '05 Nov 2024',
    href: '/blog/building-tech-community',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {footerStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <Icon className={styles.statIconSvg} />
                  </div>
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          <div className={styles.footerGrid}>
            {/* Brand & About Section */}
            <div className={styles.brandSection}>
              <div className={styles.brandHeader}>
                <div className={styles.avatarContainer}>
                  <div className={styles.avatar}>
                    <Image
                      src="/images/Thomas_01.svg"
                      alt="Thomas Hoàng"
                      fill
                      className={styles.avatarImage}
                      sizes="80px"
                    />
                  </div>
                  <div className={styles.statusIndicator}></div>
                </div>
                <div className={styles.brandInfo}>
                  <h3 className={styles.brandName}>Thomas Hoàng</h3>
                  <p className={styles.brandTitle}>COO UFIN GROUP • Blockchain Expert</p>
                  <div className={styles.brandBadges}>
                    <span className={styles.badge}>Founder JO-i</span>
                    <span className={styles.badge}>Co-Founder TingFoundation</span>
                  </div>
                </div>
              </div>
              
              <p className={styles.brandDescription}>
                {personalInfo.bio}
              </p>
              
              {/* Social Links */}
              <div className={styles.socialSection}>
                <h4 className={styles.socialTitle}>Kết nối với tôi</h4>
                <div className={styles.socialLinks}>
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link.icon as keyof typeof iconMap];
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={link.name}
                      >
                        <Icon className={styles.socialIcon} />
                        <span className={styles.socialLabel}>{link.name}</span>
                        <ExternalLink className={styles.socialExternalIcon} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.linksSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionTitleText}>Liên kết nhanh</span>
                <div className={styles.sectionTitleLine}></div>
              </h3>
              <ul className={styles.linksList}>
                {navItems.map((item) => (
                  <li key={item.href} className={styles.linkItem}>
                    <Link href={item.href} className={styles.link}>
                      <span className={styles.linkText}>{item.name}</span>
                      <div className={styles.linkArrow}>→</div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Quick Services */}
              <div className={styles.servicesSection}>
                <h4 className={styles.servicesTitle}>Dịch vụ nổi bật</h4>
                <ul className={styles.servicesList}>
                  {quickServices.map((service) => (
                    <li key={service.href} className={styles.serviceItem}>
                      <Link href={service.href} className={styles.serviceLink}>
                        <span className={styles.serviceBullet}>•</span>
                        <span>{service.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent Posts */}
            <div className={styles.postsSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionTitleText}>Bài viết mới nhất</span>
                <div className={styles.sectionTitleLine}></div>
              </h3>
              <div className={styles.postsList}>
                {recentPosts.map((post, index) => (
                  <article key={index} className={styles.postCard}>
                    <div className={styles.postDate}>{post.date}</div>
                    <h4 className={styles.postTitle}>
                      <Link href={post.href} className={styles.postLink}>
                        {post.title}
                      </Link>
                    </h4>
                    <Link href={post.href} className={styles.postReadMore}>
                      Đọc thêm
                      <ExternalLink className={styles.postReadMoreIcon} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className={styles.contactSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionTitleText}>Liên hệ</span>
                <div className={styles.sectionTitleLine}></div>
              </h3>
              
              <div className={styles.contactList}>
                <a
                  href="mailto:thomashoang@ufin.org"
                  className={styles.contactItem}
                >
                  <div className={styles.contactIcon}>
                    <Mail className={styles.contactIconSvg} />
                  </div>
                  <div className={styles.contactContent}>
                    <span className={styles.contactLabel}>Email</span>
                    <span className={styles.contactValue}>thomashoang@ufin.org</span>
                  </div>
                </a>
                
                <a
                  href="https://t.me/Thomashoang2023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactItem}
                >
                  <div className={styles.contactIcon}>
                    <Send className={styles.contactIconSvg} />
                  </div>
                  <div className={styles.contactContent}>
                    <span className={styles.contactLabel}>Telegram</span>
                    <span className={styles.contactValue}>@Thomashoang2023</span>
                  </div>
                </a>
                
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <MapPin className={styles.contactIconSvg} />
                  </div>
                  <div className={styles.contactContent}>
                    <span className={styles.contactLabel}>Địa chỉ</span>
                    <span className={styles.contactValue}>TP. Hồ Chí Minh, Việt Nam</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className={styles.ctaSection}>
                <Link href="/contact" className={styles.ctaButton}>
                  <span>Đặt lịch tư vấn</span>
                  <Calendar className={styles.ctaIcon} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <div className={styles.bottomLeft}>
              <p className={styles.copyright}>
                © {currentYear} Thomas Hoàng. Made with 
                <Heart className={styles.heartIcon} />
                in Vietnam.
              </p>
            </div>
            
            <div className={styles.bottomCenter}>
              <div className={styles.bottomLinks}>
                <Link href="/privacy" className={styles.bottomLink}>
                  Chính sách bảo mật
                </Link>
                <span className={styles.bottomSeparator}>•</span>
                <Link href="/terms" className={styles.bottomLink}>
                  Điều khoản sử dụng
                </Link>
                <span className={styles.bottomSeparator}>•</span>
                <Link href="/sitemap" className={styles.bottomLink}>
                  Sitemap
                </Link>
              </div>
            </div>
            
            <div className={styles.bottomRight}>
              <button onClick={scrollToTop} className={styles.scrollToTop}>
                <ArrowUp className={styles.scrollIcon} />
                <span className={styles.scrollText}>Lên đầu trang</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
