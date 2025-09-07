'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  activityEvents, 
  eventImages, 
  eventMediaLinks, 
  type ActivityEvent 
} from '@/data/activityData';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Mic, 
  Building, 
  Award, 
  ExternalLink, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Play, 
  Image as ImageIcon, 
  Newspaper, 
  Eye,
  FileText 
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import styles from './activity-showcase.module.css';

// Constants
const ITEMS_PER_LOAD = 3;
const INITIAL_VISIBLE_COUNT = 3;

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

export default function ActivityShowcase() {
  // State management
  const [selectedEvent, setSelectedEvent] = useState<ActivityEvent | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Computed values
  const displayedEvents = activityEvents.slice(0, visibleCount);
  const hasMore = visibleCount < activityEvents.length;

  // Event handlers
  const openEventDetail = (event: ActivityEvent): void => {
    setSelectedEvent(event);
    setSelectedImageIndex(0);
  };

  const closeEventDetail = (): void => {
    setSelectedEvent(null);
    setSelectedImageIndex(0);
  };

  const loadMore = (): void => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_LOAD, activityEvents.length));
  };

  const showLess = (): void => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const selectImage = (index: number): void => {
    setSelectedImageIndex(index);
  };

  const navigateImage = (direction: 'prev' | 'next'): void => {
    if (!selectedEvent || !eventImages[selectedEvent.id]) return;
    
    const imagesLength = eventImages[selectedEvent.id].length;
    if (direction === 'prev') {
      setSelectedImageIndex(prev => prev > 0 ? prev - 1 : imagesLength - 1);
    } else {
      setSelectedImageIndex(prev => prev < imagesLength - 1 ? prev + 1 : 0);
    }
  };

  // Render helpers
  const renderEventCard = (event: ActivityEvent, index: number) => {
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

        {/* Content Section */}
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

            {/* Description */}
            <p className={styles.eventDescription}>
              {event.description}
            </p>

            {/* CTA Button */}
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
  };

  const renderImageGallery = () => {
    if (!selectedEvent || !eventImages[selectedEvent.id]) return null;

    const images = eventImages[selectedEvent.id];
    const hasMultipleImages = images.length > 1;

    return (
      <div className={styles.modalImageSection}>
        {/* Main Image Display */}
        <div className={styles.mainImageContainer}>
          <Image
            src={images[selectedImageIndex] || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop'} 
            alt={`${selectedEvent.title} - Ảnh ${selectedImageIndex + 1}`}
            fill
            className={styles.modalMainImage}
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
          
          {/* Image Counter */}
          {hasMultipleImages && (
            <div className={styles.imageCounter}>
              <span>{selectedImageIndex + 1} / {images.length}</span>
            </div>
          )}
          
          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button 
                className={`${styles.imageNavButton} ${styles.imageNavPrev}`}
                onClick={() => navigateImage('prev')}
                aria-label="Ảnh trước"
              >
                <ChevronLeft className={styles.navIcon} />
              </button>
              <button 
                className={`${styles.imageNavButton} ${styles.imageNavNext}`}
                onClick={() => navigateImage('next')}
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight className={styles.navIcon} />
              </button>
            </>
          )}
        </div>
        
        {/* Thumbnail Gallery */}
        {hasMultipleImages && (
          <div className={styles.thumbnailSection}>
            <h4 className={styles.thumbnailTitle}>
              <ImageIcon className={styles.thumbnailTitleIcon} />
              Thư viện ảnh ({images.length})
            </h4>
            <div className={styles.thumbnailGallery}>
              {images.map((img: string, index: number) => (
                <div 
                  key={index} 
                  className={`${styles.thumbnail} ${index === selectedImageIndex ? styles.thumbnailActive : ''}`}
                  onClick={() => selectImage(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ảnh ${index + 1}`}
                >
                  <Image 
                    src={img} 
                    alt={`${selectedEvent.title} thumbnail ${index + 1}`}
                    fill
                    className={styles.thumbnailImage}
                    sizes="(max-width: 768px) 60px, 80px"
                  />
                  <div className={styles.thumbnailOverlay}>
                    <span className={styles.thumbnailIndex}>{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEventInfo = () => {
    if (!selectedEvent) return null;

    return (
      <div className={styles.eventInfoBanner}>
        <div className={styles.eventInfoContent}>
          <div className={styles.eventInfoMeta}>
            <div className={styles.eventInfoItem}>
              <Calendar className={styles.eventInfoIcon} />
              <span>{formatDate(selectedEvent.date)}</span>
            </div>
            <div className={styles.eventInfoDivider}></div>
            <div className={styles.eventInfoItem}>
              <MapPin className={styles.eventInfoIcon} />
              <span>{selectedEvent.location}</span>
            </div>
            <div className={styles.eventInfoDivider}></div>
            <div className={styles.eventInfoItem}>
              <Users className={styles.eventInfoIcon} />
              <span>{selectedEvent.school}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDescription = () => {
    if (!selectedEvent) return null;

    return (
      <div className={styles.descriptionSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <FileText className={styles.sectionTitleIcon} />
            Chi tiết sự kiện
          </h3>
        </div>
        <div className={styles.descriptionContent}>
          <p className={styles.modalDescription}>
            {selectedEvent.description}
          </p>
          {selectedEvent.category !== 'mou' && (
            <p className={styles.modalDescriptionExtended}>
              Sự kiện đã tạo nên dấu ấn mạnh mẽ trong cộng đồng sinh viên, thu hút sự quan tâm của nhiều bạn trẻ 
              đam mê công nghệ. Đây là cơ hội quý báu để tiếp cận xu hướng mới và mở rộng mạng lưới kết nối.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderMediaCoverage = () => {
    if (!selectedEvent) return null;

    const mediaLinks = eventMediaLinks[selectedEvent.id];
    
    // Kiểm tra có media links không
    if (!mediaLinks || mediaLinks.length === 0) {
      return (
        <div className={styles.mediaSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <Newspaper className={styles.sectionTitleIcon} />
              Đưa tin & Báo chí
            </h3>
          </div>
          <div className={styles.noMediaContent}>
            <div className={styles.noMediaIcon}>
              <Newspaper className={styles.noMediaIconSvg} />
            </div>
            <p className={styles.noMediaText}>
              Thông tin báo chí đang được cập nhật...
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.mediaSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <Newspaper className={styles.sectionTitleIcon} />
            Đưa tin & Báo chí
          </h3>
          <div className={styles.mediaBadge}>
            {mediaLinks.length} bài viết
          </div>
        </div>
        <div className={styles.mediaGrid}>
          {mediaLinks.map((media, index) => (
            <a 
              key={index} 
              href={media.url} 
              className={styles.mediaCard}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.mediaCardHeader}>
                <div className={styles.mediaCardIcon}>
                  <Newspaper className={styles.mediaCardIconSvg} />
                </div>
                <ExternalLink className={styles.mediaCardLinkIcon} />
              </div>
              <div className={styles.mediaCardContent}>
                <h4 className={styles.mediaCardTitle}>{media.title}</h4>
                <p className={styles.mediaCardDescription}>
                  {media.description.length > 80 
                    ? `${media.description.substring(0, 80)}...` 
                    : media.description
                  }
                </p>
              </div>
              <div className={styles.mediaCardFooter}>
                <span className={styles.mediaCardAction}>Đọc bài viết</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const renderActionButtons = () => {
    if (!selectedEvent) return null;

    const hasMediaLinks = eventMediaLinks[selectedEvent.id] && eventMediaLinks[selectedEvent.id].length > 0;

    return (
      <div className={styles.modalActions}>
        <div className={styles.actionButtonsGrid}>
          <button className={styles.actionButtonPrimary}>
            <ImageIcon className={styles.actionIcon} />
            <div className={styles.actionButtonContent}>
              <span className={styles.actionButtonTitle}>Thư viện ảnh</span>
              <span className={styles.actionButtonSubtitle}>
                {eventImages[selectedEvent.id]?.length || 0} hình ảnh
              </span>
            </div>
          </button>
          
          <button className={styles.actionButtonSecondary}>
            <Play className={styles.actionIcon} />
            <div className={styles.actionButtonContent}>
              <span className={styles.actionButtonTitle}>Video</span>
              <span className={styles.actionButtonSubtitle}>Highlights</span>
            </div>
          </button>
          
          {hasMediaLinks && (
            <button className={styles.actionButtonSecondary}>
              <ExternalLink className={styles.actionIcon} />
              <div className={styles.actionButtonContent}>
                <span className={styles.actionButtonTitle}>Xem thêm</span>
                <span className={styles.actionButtonSubtitle}>Bài viết đầy đủ</span>
              </div>
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderModal = () => {
  if (!selectedEvent) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeEventDetail}>
      <div className={styles.modalContent} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className={styles.closeButton} 
          onClick={closeEventDetail}
          aria-label="Đóng"
        >
          <X className={styles.closeIcon} />
        </button>
        
        {/* Modal Header - Compact */}
        <div className={styles.modalHeader}>
          <div className={`${styles.modalBadge} ${styles[`badge-${selectedEvent.category}`]}`}>
            {React.createElement(categoryIcons[selectedEvent.category], { 
              className: styles.modalBadgeIcon 
            })}
            <span>{categoryLabels[selectedEvent.category]}</span>
          </div>
          <h2 className={styles.modalTitle}>{selectedEvent.title}</h2>
          
          {/* Quick Info - Mobile Optimized */}
          <div className={styles.quickInfo}>
            <div className={styles.quickInfoItem}>
              <Calendar className={styles.quickInfoIcon} />
              <span>{formatDate(selectedEvent.date)}</span>
            </div>
            <div className={styles.quickInfoItem}>
              <MapPin className={styles.quickInfoIcon} />
              <span>{selectedEvent.location}</span>
            </div>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className={styles.modalBody}>
          {/* Image Gallery - Compact */}
          {renderCompactImageGallery()}
          
          {/* Content Tabs - Mobile Friendly */}
          {renderContentTabs()}
        </div>

        {/* Modal Footer - Sticky */}
        <div className={styles.modalFooter}>
          {renderQuickActions()}
        </div>
      </div>
    </div>
  );
};

// Compact Image Gallery
const renderCompactImageGallery = () => {
  if (!selectedEvent || !eventImages[selectedEvent.id]) return null;

  const images = eventImages[selectedEvent.id];
  if (images.length === 0) return null;

  return (
    <div className={styles.compactImageSection}>
      <div className={styles.mainImageContainer}>
        <Image
          src={images[selectedImageIndex]} 
          alt={`${selectedEvent.title}`}
          fill
          className={styles.modalMainImage}
          sizes="100vw"
          priority
        />
        
        {images.length > 1 && (
          <>
            <div className={styles.imageCounter}>
              {selectedImageIndex + 1}/{images.length}
            </div>
            
            <button 
              className={`${styles.navButton} ${styles.navPrev}`}
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft className={styles.navIcon} />
            </button>
            
            <button 
              className={`${styles.navButton} ${styles.navNext}`}
              onClick={() => navigateImage('next')}
            >
              <ChevronRight className={styles.navIcon} />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail Strip - Horizontal Scroll */}
      {images.length > 1 && (
        <div className={styles.thumbnailStrip}>
          {images.map((img: string, index: number) => (
            <div 
              key={index}
              className={`${styles.thumbnailItem} ${index === selectedImageIndex ? styles.active : ''}`}
              onClick={() => selectImage(index)}
            >
              <Image 
                src={img} 
                alt={`Ảnh ${index + 1}`}
                fill
                className={styles.thumbnailImg}
                sizes="60px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Content Tabs
const [activeTab, setActiveTab] = useState<'info' | 'media'>('info');

const renderContentTabs = () => {
  const mediaLinks = eventMediaLinks[selectedEvent?.id || ''];
  const hasMedia = mediaLinks && mediaLinks.length > 0;

  return (
    <div className={styles.contentTabs}>
      {/* Tab Navigation */}
      <div className={styles.tabNav}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'info' ? styles.active : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <FileText className={styles.tabIcon} />
          Chi tiết
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'media' ? styles.active : ''}`}
          onClick={() => setActiveTab('media')}
        >
          <Newspaper className={styles.tabIcon} />
          Báo chí ({hasMedia ? mediaLinks.length : 0})
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'info' && (
          <div className={styles.infoTab}>
            <p className={styles.description}>
              {selectedEvent?.description}
            </p>
            
            <div className={styles.eventDetails}>
              <div className={styles.detailItem}>
                <Users className={styles.detailIcon} />
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>Trường</span>
                  <span className={styles.detailValue}>{selectedEvent?.school}</span>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <Building className={styles.detailIcon} />
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>Loại sự kiện</span>
                  <span className={styles.detailValue}>{categoryLabels[selectedEvent?.category || 'talkshow']}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'media' && (
          <div className={styles.mediaTab}>
            {hasMedia ? (
              <div className={styles.mediaList}>
                {mediaLinks.map((media, index) => (
                  <a 
                    key={index}
                    href={media.url}
                    className={styles.mediaItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.mediaIcon}>
                      <Newspaper className={styles.mediaIconSvg} />
                    </div>
                    <div className={styles.mediaContent}>
                      <h4 className={styles.mediaTitle}>{media.title}</h4>
                      <p className={styles.mediaDesc}>
                        {media.description.length > 60 
                          ? `${media.description.substring(0, 60)}...` 
                          : media.description
                        }
                      </p>
                    </div>
                    <ExternalLink className={styles.mediaLink} />
                  </a>
                ))}
              </div>
            ) : (
              <div className={styles.noMedia}>
                <Newspaper className={styles.noMediaIcon} />
                <p>Chưa có thông tin báo chí</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Quick Actions
const renderQuickActions = () => {
  const hasImages = eventImages[selectedEvent?.id || '']?.length > 0;
  
  return (
    <div className={styles.quickActions}>
      {hasImages && (
        <button className={styles.actionBtn}>
          <ImageIcon className={styles.actionIcon} />
          Thư viện ({eventImages[selectedEvent?.id || '']?.length})
        </button>
      )}
      
      <button className={styles.actionBtn}>
        <Play className={styles.actionIcon} />
        Video
      </button>
      
      <button 
        className={styles.actionBtnPrimary}
        onClick={closeEventDetail}
      >
        Đóng
      </button>
    </div>
  );
};

  const renderSeeMoreSection = () => {
    if (activityEvents.length <= INITIAL_VISIBLE_COUNT) return null;

    return (
      <div className={styles.seeMoreSection}>
        {hasMore ? (
          <button 
            className={styles.seeMoreButton}
            onClick={loadMore}
          >
            <span>
              Xem thêm {Math.min(ITEMS_PER_LOAD, activityEvents.length - visibleCount)} sự kiện
            </span>
            <ChevronDown className={styles.seeMoreIcon} />
          </button>
        ) : visibleCount > INITIAL_VISIBLE_COUNT ? (
          <button 
            className={styles.seeMoreButton}
            onClick={showLess}
          >
            <span>Thu gọn</span>
            <ChevronUp className={styles.seeMoreIcon} />
          </button>
        ) : null}
        
        {hasMore && (
          <div className={styles.seeMorePreview}>
            <span>
              {activityEvents
                .slice(visibleCount, visibleCount + 3)
                .map(e => e.school)
                .join(' • ')} 
              {activityEvents.length > visibleCount + 3 && ' • và nhiều hoạt động khác...'}
            </span>
          </div>
        )}
      </div>
    );
  };

  // Main render
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Header */}
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

          {/* Events Grid */}
          <div className={styles.eventsContainer}>
            {displayedEvents.map(renderEventCard)}
          </div>

          {/* See More/Less Section */}
          {renderSeeMoreSection()}
        </div>
      </section>

      {/* Modal */}
      {renderModal()}
    </>
  );
}
