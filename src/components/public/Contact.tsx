'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, Linkedin, Send, MapPin, Phone, Clock, ExternalLink, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import styles from './contact.module.css';

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  link?: string;
  copyable?: boolean;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'thomashoang@ufin.org',
    link: 'mailto:thomashoang@ufin.org',
    copyable: true
  },
  {
    icon: MessageCircle,
    label: 'Telegram',
    value: '@Thomashoang2023',
    link: 'https://t.me/Thomashoang2023',
    copyable: true
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Thomas Hoàng',
    link: 'https://www.linkedin.com/in/tuyen-hoang-van-thomas-hoang/',
    copyable: false
  }
];

const quickStats = [
  { number: '8+', label: 'Năm kinh nghiệm' },
  { number: '10+', label: 'Doanh nghiệp tư vấn' },
  { number: '5000+', label: 'Người kết nối' },
  { number: '24/7', label: 'Sẵn sàng hỗ trợ' }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // Show success message (you can implement toast notification here)
    alert('Tin nhắn đã được gửi thành công! Thomas sẽ phản hồi sớm nhất có thể.');
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Background Elements */}
        <div className={styles.backgroundElements}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gridPattern}></div>
        </div>

        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Send className={styles.badgeIcon} />
            <span className={styles.badgeText}>Kết nối với tôi</span>
          </div>
          <h2 className={styles.title}>
            <span className={styles.gradientText}>Liên Hệ & Hợp Tác</span>
          </h2>
          <p className={styles.description}>
            Sẵn sàng thảo luận về các cơ hội hợp tác, tư vấn blockchain/AI, 
            hoặc chia sẻ kiến thức cùng cộng đồng
          </p>
        </div>

        {/* Quick Stats */}
        {/* <div className={styles.quickStats}>
          {quickStats.map((stat, index) => (
            <div 
              key={index} 
              className={styles.statItem}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div> */}

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <div className={styles.infoHeader}>
              <h3 className={styles.infoTitle}>Thông tin liên hệ</h3>
              <p className={styles.infoSubtitle}>
                Chọn phương thức liên hệ phù hợp với bạn
              </p>
            </div>

            <div className={styles.contactList}>
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div 
                    key={index} 
                    className={styles.contactItem}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className={styles.contactIcon}>
                      <Icon className={styles.contactIconSvg} />
                    </div>
                    
                    <div className={styles.contactDetails}>
                      <span className={styles.contactLabel}>{contact.label}</span>
                      <div className={styles.contactValue}>
                        {contact.link ? (
                          <a 
                            href={contact.link} 
                            className={styles.contactLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {contact.value}
                            <ExternalLink className={styles.externalIcon} />
                          </a>
                        ) : (
                          <span>{contact.value}</span>
                        )}
                      </div>
                    </div>

                    {contact.copyable && (
                      <button 
                        onClick={() => copyToClipboard(contact.value.replace('@', ''), contact.label)}
                        className={styles.copyButton}
                        title="Copy to clipboard"
                      >
                        {copiedItem === contact.label ? (
                          <Check className={styles.copyIcon} />
                        ) : (
                          <Copy className={styles.copyIcon} />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className={styles.additionalInfo}>
              <div className={styles.infoItem}>
                <MapPin className={styles.infoItemIcon} />
                <span>Việt Nam • Remote Available</span>
              </div>
              <div className={styles.infoItem}>
                <Clock className={styles.infoItemIcon} />
                <span>Thời gian phản hồi: 2-4 giờ</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.contactForm}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Gửi tin nhắn</h3>
              <p className={styles.formSubtitle}>
                Mô tả ngắn gọn về dự án hoặc câu hỏi của bạn
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Họ tên *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={styles.formInput}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={styles.formInput}
                    placeholder="example@domain.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Chủ đề</label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={styles.formInput}
                  placeholder="Tư vấn Blockchain, Hợp tác dự án, Invited Speaker..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tin nhắn *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={styles.formTextarea}
                  placeholder="Xin chào Thomas, tôi muốn..."
                  rows={5}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className={styles.spinner}></div>
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <Send className={styles.submitIcon} />
                    <span>Gửi tin nhắn</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className={styles.callToAction}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Sẵn sàng bắt đầu dự án?</h3>
            <p className={styles.ctaDescription}>
              Hãy kết nối ngay để thảo luận về ý tưởng của bạn
            </p>
            <div className={styles.ctaButtons}>
              <a 
                href="https://t.me/Thomashoang2023" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
              >
                <MessageCircle className={styles.ctaIcon} />
                <span>Chat ngay trên Telegram</span>
              </a>
              <a 
                href="mailto:thomashoang@ufin.org" 
                className={styles.ctaSecondary}
              >
                <Mail className={styles.ctaIcon} />
                <span>Gửi email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className={styles.footerNote}>
          <p className={styles.noteText}>
            💡 <strong>Tip:</strong> Để được phản hồi nhanh nhất, hãy liên hệ qua Telegram 
            hoặc mô tả rõ dự án trong email.
          </p>
        </div>
      </div>
    </section>
  );
}
