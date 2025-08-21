'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { events } from '@/data/events';
import { Calendar, MapPin, Users, Mic, Building, Award, ExternalLink, X, ChevronDown, ChevronUp, Play, Image as ImageIcon, Link as LinkIcon, Newspaper, BarChart3, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import styles from './activity-showcase.module.css';

// Type definitions
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: 'talkshow' | 'workshop' | 'conference' | 'mou';
}

const categoryIcons = {
  talkshow: Mic,
  workshop: Users,
  conference: Building,
  mou: Award,
};

const categoryLabels = {
  talkshow: 'Talkshow',
  workshop: 'Workshop',
  conference: 'Hội thảo',
  mou: 'Ký kết MOU',
};

// Mock image data
const eventImages: { [key: string]: string[] } = {
  "1": [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop',
  ],
  "2": [
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
  ],
  "3": [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
  ],
  "4": [
    'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
  ],
};

// Mock media links
const eventMediaLinks: { [key: string]: { title: string; description: string; url: string }[] } = {
  "1": [
    { title: "Báo Thanh Niên", description: "Lương kỹ sư AI có thể lên tới tỷ đồng mỗi năm tại Việt Nam", url: "#" },
    { title: "VnExpress", description: "Sinh viên Huế háo hức tìm hiểu về công nghệ Blockchain", url: "#" },
    { title: "Tuổi Trẻ", description: "Hướng nghiệp AI - Blockchain cho thế hệ Z", url: "#" },
  ],
  "2": [
    { title: "Báo Giáo dục", description: "Workshop Blockchain thu hút đông đảo sinh viên", url: "#" },
    { title: "ICTNews", description: "Xu hướng ứng dụng Blockchain trong giáo dục", url: "#" },
  ],
  "3": [
    { title: "VietnamNet", description: "Hội thảo AI: Cơ hội và thách thức", url: "#" },
    { title: "Dân Trí", description: "Chuyên gia chia sẻ về tương lai AI", url: "#" },
    { title: "24h", description: "Sự kiện công nghệ quy mô lớn tại Huế", url: "#" },
  ],
  "4": [
    { title: "Báo Đầu tư", description: "Ký kết hợp tác phát triển công nghệ", url: "#" },
    { title: "Báo Khoa học", description: "Thúc đẩy nghiên cứu AI trong giáo dục", url: "#" },
  ],
};

export default function ActivityShowcase() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);

  const INITIAL_DISPLAY_COUNT = 3; // Giảm từ 4 xuống 3 để mobile không quá dài
  const displayedEvents = showMore ? events : events.slice(0, INITIAL_DISPLAY_COUNT);

  const openEventDetail = (event: Event): void => {
    setSelectedEvent(event);
  };

  const closeEventDetail = (): void => {
    setSelectedEvent(null);
  };

  const toggleShowMore = (): void => {
    setShowMore(!showMore);
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Section Header - Giảm padding */}
          <div className={styles.header}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>🎯 Hoạt động nổi bật</span>
            </div>
            <h2 className={styles.title}>
              <span className={styles.gradientText}>Sự kiện & Hoạt động</span>
            </h2>
            <p className={styles.description}>
              Hành trình chia sẻ kiến thức và kết nối cộng đồng
            </p>
          </div>

          {/* Events Grid - Compact Layout */}
          <div className={styles.eventsContainer}>
            {displayedEvents.map((event: Event, index: number) => {
              const Icon = categoryIcons[event.category];
              const isEven = index % 2 === 0;
              const currentImages = eventImages[event.id] || [];
              
              return (
                <div 
                  key={event.id} 
                  className={`${styles.eventRow} ${isEven ? styles.eventRowNormal : styles.eventRowReverse}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Section */}
                  <div 
                    className={styles.imageSection}
                    onClick={() => openEventDetail(event)}
                  >
                    <div className={styles.imageContainer}>
                      {currentImages.length > 0 ? (
                        <>
                          <Image
                            src={currentImages[0]} 
                            alt={event.title}
                            fill
                            className={styles.eventImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index < 2}
                          />
                          <div className={styles.imageOverlay}>
                            <div className={styles.overlayContent}>
                              <Eye className={styles.overlayIcon} />
                              <span className={styles.overlayText}>Xem chi tiết</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <div className={`${styles.categoryIcon} ${styles[`icon-${event.category}`]}`}>
                            <Icon className={styles.icon} />
                          </div>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className={`${styles.imageCategoryBadge} ${styles[`badge-${event.category}`]}`}>
                        <Icon className={styles.badgeIcon} />
                        <span>{categoryLabels[event.category]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section - Compact */}
                  <div className={styles.contentSection}>
                    <div className={styles.eventContent}>
                      {/* Meta Info */}
                      <div className={styles.eventMeta}>
                        <div className={styles.metaItem}>
                          <Calendar className={styles.metaIcon} />
                          <span className={styles.metaText}>{formatDate(event.date)}</span>
                        </div>
                        <div className={styles.metaItem}>
                          <MapPin className={styles.metaIcon} />
                          <span className={styles.metaText}>{event.location}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        className={styles.eventTitle}
                        onClick={() => openEventDetail(event)}
                      >
                        {event.title}
                      </h3>

                      {/* Description - Compact */}
                      <p className={styles.eventDescription}>
                        {event.description}
                      </p>

                      {/* CTA Button - Single Button */}
                      <button 
                        className={`${styles.ctaButton} ${styles[`cta-${event.category}`]}`}
                        onClick={() => openEventDetail(event)}
                      >
                        <span>Xem chi tiết</span>
                        <ExternalLink className={styles.ctaIcon} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* See More/Less Button */}
          {events.length > INITIAL_DISPLAY_COUNT && (
            <div className={styles.seeMoreSection}>
              <button 
                className={styles.seeMoreButton}
                onClick={toggleShowMore}
              >
                <span>
                  {showMore 
                    ? 'Thu gọn' 
                    : `Xem thêm ${events.length - INITIAL_DISPLAY_COUNT} sự kiện khác`
                  }
                </span>
                {showMore ? (
                  <ChevronUp className={styles.seeMoreIcon} />
                ) : (
                  <ChevronDown className={styles.seeMoreIcon} />
                )}
              </button>
              
              {!showMore && (
                <div className={styles.seeMorePreview}>
                  <span>Đại học Huế • BTEC • Greenwich • và nhiều hoạt động khác...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Modal với nhiều thông tin chi tiết */}
      {selectedEvent && (
        <div className={styles.modalOverlay} onClick={closeEventDetail}>
          <div className={styles.modalContent} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeEventDetail}>
              <X className={styles.closeIcon} />
            </button>
            
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={`${styles.modalBadge} ${styles[`badge-${selectedEvent.category}`]}`}>
                {React.createElement(categoryIcons[selectedEvent.category], { className: styles.modalBadgeIcon })}
                <span>{categoryLabels[selectedEvent.category]}</span>
              </div>
              <h2 className={styles.modalTitle}>{selectedEvent.title}</h2>
              <div className={styles.modalSubtitle}>
                <Calendar className={styles.modalSubIcon} />
                <span>{formatDate(selectedEvent.date)}</span>
                <MapPin className={styles.modalSubIcon} />
                <span>{selectedEvent.location}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              {/* Main Image */}
              <div className={styles.modalImageSection}>
                <div className={styles.mainImageContainer}>
                  <Image
                    src={eventImages[selectedEvent.id]?.[0] || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop'} 
                    alt={selectedEvent.title}
                    fill
                    className={styles.modalMainImage}
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                {eventImages[selectedEvent.id] && eventImages[selectedEvent.id].length > 1 && (
                  <div className={styles.thumbnailGallery}>
                    {eventImages[selectedEvent.id].map((img: string, index: number) => (
                      <div key={index} className={styles.thumbnail}>
                        <Image 
                          src={img} 
                          alt={`${selectedEvent.title} ${index + 1}`}
                          fill
                          className={styles.thumbnailImage}
                          sizes="80px"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Event Stats - Compact & Visual */}
              <div className={styles.eventStatsSection}>
                <h3 className={styles.statsTitle}>
                  <BarChart3 className={styles.statsTitleIcon} />
                  Thống kê sự kiện
                </h3>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <Users className={styles.statCardIcon} />
                    <div className={styles.statCardNumber}>1,200+</div>
                    <div className={styles.statCardLabel}>Người tham gia</div>
                  </div>
                  <div className={styles.statCard}>
                    <Newspaper className={styles.statCardIcon} />
                    <div className={styles.statCardNumber}>{eventMediaLinks[selectedEvent.id]?.length || 0}</div>
                    <div className={styles.statCardLabel}>Báo chí đưa tin</div>
                  </div>
                  <div className={styles.statCard}>
                    <ImageIcon className={styles.statCardIcon} />
                    <div className={styles.statCardNumber}>{eventImages[selectedEvent.id]?.length || 0}</div>
                    <div className={styles.statCardLabel}>Hình ảnh</div>
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div className={styles.descriptionSection}>
                <h3 className={styles.sectionTitle}>Thông tin chi tiết</h3>
                <p className={styles.modalDescription}>
                  {selectedEvent.description}
                </p>
                <p className={styles.modalDescriptionExtended}>
                  Sự kiện đã tạo nên dấu ấn mạnh mẽ trong cộng đồng sinh viên và được đánh giá cao 
                  về chất lượng nội dung cũng như tính thực tiễn. Đây là cơ hội tuyệt vời để các bạn trẻ 
                  tiếp cận với những xu hướng công nghệ mới nhất và định hướng nghề nghiệp trong tương lai.
                </p>
              </div>

              {/* Media Coverage - Compact List */}
              <div className={styles.mediaSection}>
                <h3 className={styles.sectionTitle}>
                  <Newspaper className={styles.sectionTitleIcon} />
                  Báo chí & Truyền thông
                </h3>
                <div className={styles.mediaList}>
                  {(eventMediaLinks[selectedEvent.id] || []).map((media, index) => (
                    <a 
                      key={index} 
                      href={media.url} 
                      className={styles.mediaItem}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={styles.mediaIcon}>
                        <LinkIcon className={styles.mediaIconSvg} />
                      </div>
                      <div className={styles.mediaContent}>
                        <div className={styles.mediaTitle}>{media.title}</div>
                        <div className={styles.mediaDescription}>
                          {media.description.length > 60 
                            ? `${media.description.substring(0, 60)}...` 
                            : media.description
                          }
                        </div>
                      </div>
                      <ExternalLink className={styles.mediaLinkIcon} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.modalActions}>
                <button className={styles.actionButton}>
                  <ImageIcon className={styles.actionIcon} />
                  <span>Xem thư viện ảnh</span>
                </button>
                <button className={styles.actionButton}>
                  <Play className={styles.actionIcon} />
                  <span>Video highlights</span>
                </button>
                <button className={styles.actionButton}>
                  <ExternalLink className={styles.actionIcon} />
                  <span>Bài viết đầy đủ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
