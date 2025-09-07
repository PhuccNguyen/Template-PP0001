'use client';

import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, Linkedin, Send, MapPin, Phone, Clock, ExternalLink, Copy, Check, AlertCircle, CheckCircle, X, User, Sparkles, Heart } from 'lucide-react';
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

interface FormData {
  name: string;
  email: string;
  telegramId: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
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
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    telegramId: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: '' });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<FormData>>({});

  // Auto-focus on first error field
  useEffect(() => {
    if (Object.keys(fieldErrors).length > 0) {
      const firstErrorField = Object.keys(fieldErrors)[0] as keyof FormData;
      const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      element?.focus();
    }
  }, [fieldErrors]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear general status when user starts typing
    if (formStatus.type) {
      setFormStatus({ type: null, message: '' });
    }
  };

  const validateField = (field: keyof FormData, value: string): string | null => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Vui lòng nhập họ tên';
        if (value.trim().length < 2) return 'Họ tên phải có ít nhất 2 ký tự';
        if (value.trim().length > 100) return 'Họ tên không được quá 100 ký tự';
        return null;
      
      case 'email':
        if (!value.trim()) return 'Vui lòng nhập email';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email không đúng định dạng';
        if (value.length > 254) return 'Email quá dài';
        return null;
      
      case 'telegramId':
        // Optional field but validate if provided
        if (value.trim() && !value.startsWith('@')) {
          return 'Telegram ID phải bắt đầu bằng @ (ví dụ: @username)';
        }
        if (value.trim() && value.length < 2) {
          return 'Telegram ID quá ngắn';
        }
        if (value.trim() && value.length > 32) {
          return 'Telegram ID quá dài';
        }
        // Check for invalid characters
        if (value.trim() && !/^@[a-zA-Z0-9_]+$/.test(value)) {
          return 'Telegram ID chỉ được chứa chữ cái, số và dấu gạch dưới';
        }
        return null;
      
      case 'subject':
        if (value.trim() && value.length > 200) return 'Chủ đề không được quá 200 ký tự';
        return null;
      
      case 'message':
        if (!value.trim()) return 'Vui lòng nhập tin nhắn';
        if (value.trim().length < 10) return 'Tin nhắn phải có ít nhất 10 ký tự';
        if (value.length > 2000) return 'Tin nhắn không được quá 2000 ký tự';
        return null;
      
      default:
        return null;
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    let hasError = false;

    // Validate each field
    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
        hasError = true;
      }
    });

    setFieldErrors(errors);

    // Set general error message if there are validation errors
    if (hasError) {
      setFormStatus({ 
        type: 'error', 
        message: 'Vui lòng kiểm tra và sửa các lỗi trong form.' 
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form
        setFormData({ name: '', email: '', telegramId: '', subject: '', message: '' });
        setFieldErrors({});
        
        // Show success dialog
        setShowSuccessDialog(true);
        
      } else {
        setFormStatus({
          type: 'error',
          message: result.error || 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
        });
      }
      
    } catch (error) {
      console.error('Submit error:', error);
      setFormStatus({
        type: 'error',
        message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text.replace('@', ''));
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <>
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
                          onClick={() => copyToClipboard(contact.value, contact.label)}
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

              {/* Form Status Message */}
              {formStatus.type && (
                <div className={`${styles.formStatus} ${styles[`status-${formStatus.type}`]}`}>
                  <div className={styles.statusIcon}>
                    {formStatus.type === 'success' ? (
                      <CheckCircle className={styles.statusIconSvg} />
                    ) : (
                      <AlertCircle className={styles.statusIconSvg} />
                    )}
                  </div>
                  <span className={styles.statusMessage}>{formStatus.message}</span>
                  <button 
                    onClick={() => setFormStatus({ type: null, message: '' })}
                    className={styles.statusClose}
                  >
                    <X className={styles.statusCloseIcon} />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Họ tên *
                      <span className={styles.labelCounter}>
                        {formData.name.length}/100
                      </span>
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`${styles.formInput} ${fieldErrors.name ? styles.inputError : ''}`}
                      placeholder="Nguyễn Văn A"
                      required
                      disabled={isSubmitting}
                      maxLength={100}
                    />
                    {fieldErrors.name && (
                      <span className={styles.fieldError}>{fieldErrors.name}</span>
                    )}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`${styles.formInput} ${fieldErrors.email ? styles.inputError : ''}`}
                      placeholder="example@domain.com"
                      required
                      disabled={isSubmitting}
                      maxLength={254}
                    />
                    {fieldErrors.email && (
                      <span className={styles.fieldError}>{fieldErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Telegram ID
                      <span className={styles.labelOptional}>(không bắt buộc)</span>
                    </label>
                    <Input
                      type="text"
                      name="telegramId"
                      value={formData.telegramId}
                      onChange={(e) => handleInputChange('telegramId', e.target.value)}
                      className={`${styles.formInput} ${fieldErrors.telegramId ? styles.inputError : ''}`}
                      placeholder="@username"
                      disabled={isSubmitting}
                      maxLength={32}
                    />
                    {fieldErrors.telegramId && (
                      <span className={styles.fieldError}>{fieldErrors.telegramId}</span>
                    )}
                    <span className={styles.fieldHint}>
                      Nhập Telegram ID để được phản hồi nhanh hơn
                    </span>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Chủ đề
                      <span className={styles.labelCounter}>
                        {formData.subject.length}/200
                      </span>
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`${styles.formInput} ${fieldErrors.subject ? styles.inputError : ''}`}
                      placeholder="Tư vấn Blockchain, Hợp tác dự án, Invited Speaker..."
                      disabled={isSubmitting}
                      maxLength={200}
                    />
                    {fieldErrors.subject && (
                      <span className={styles.fieldError}>{fieldErrors.subject}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Tin nhắn *
                    <span className={styles.labelCounter}>
                      {formData.message.length}/2000
                    </span>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`${styles.formTextarea} ${fieldErrors.message ? styles.inputError : ''}`}
                    placeholder="Xin chào Thomas, tôi muốn thảo luận về..."
                    rows={5}
                    required
                    disabled={isSubmitting}
                    maxLength={2000}
                  />
                  {fieldErrors.message && (
                    <span className={styles.fieldError}>{fieldErrors.message}</span>
                  )}
                  <span className={styles.fieldHint}>
                    Mô tả chi tiết về dự án hoặc câu hỏi của bạn
                  </span>
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

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogContent}>
            <div className={styles.dialogIcon}>
              <div className={styles.successIconWrapper}>
                <CheckCircle className={styles.successIcon} />
                <Sparkles className={styles.sparkleIcon} />
              </div>
            </div>
            
            <div className={styles.dialogBody}>
              <h3 className={styles.dialogTitle}>Tin nhắn đã được gửi thành công!</h3>
              <p className={styles.dialogMessage}>
                Cảm ơn bạn đã liên hệ với Thomas! Tin nhắn của bạn đã được gửi đi và 
                Thomas sẽ liên hệ lại với bạn trong <strong>2-4 giờ tới</strong>.
              </p>
              
              <div className={styles.dialogInfo}>
                <div className={styles.infoItem}>
                  <User className={styles.infoIcon} />
                  <span>Họ tên: <strong>{formData.name || 'Khách hàng'}</strong></span>
                </div>
                <div className={styles.infoItem}>
                  <Mail className={styles.infoIcon} />
                  <span>Email: <strong>{formData.email || 'Không có'}</strong></span>
                </div>
                {formData.telegramId && (
                  <div className={styles.infoItem}>
                    <MessageCircle className={styles.infoIcon} />
                    <span>Telegram: <strong>{formData.telegramId}</strong></span>
                  </div>
                )}
              </div>
              
              <div className={styles.dialogTip}>
                <Heart className={styles.tipIcon} />
                <span>
                  Trong thời gian chờ, bạn có thể kết nối qua{' '}
                  <a href="https://t.me/Thomashoang2023" target="_blank" rel="noopener noreferrer">
                    Telegram
                  </a>{' '}
                  để được phản hồi nhanh hơn.
                </span>
              </div>
            </div>
            
            <div className={styles.dialogActions}>
              <Button onClick={closeSuccessDialog} className={styles.dialogButton}>
                <span>Đã hiểu</span>
              </Button>
              <a 
                href="https://t.me/Thomashoang2023" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.dialogSecondaryButton}
              >
                <MessageCircle className={styles.buttonIcon} />
                <span>Chat ngay</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
