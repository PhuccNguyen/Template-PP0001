'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause, ImageIcon, Calendar, MapPin, Users, ExternalLink, Maximize2, Grid3X3, X, Info } from 'lucide-react';
import { events } from '@/data/events';
import { formatDate } from '@/lib/utils';
import styles from './image-carousel.module.css';

// Mock multiple images per event
const eventImageGalleries = {
  "1": [
    { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&q=80', caption: 'Khai mạc sự kiện với sự tham gia đông đảo' },
    { url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop&q=80', caption: 'Thuyết trình về công nghệ Blockchain' },
    { url: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=800&fit=crop&q=80', caption: 'Tương tác Q&A với sinh viên' },
    { url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=800&fit=crop&q=80', caption: 'Chụp ảnh lưu niệm cùng ban tổ chức' }
  ],
  "2": [
    { url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=800&fit=crop&q=80', caption: 'Workshop thực hành xây dựng Smart Contract' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80', caption: 'Sinh viên thảo luận nhóm' },
    { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop&q=80', caption: 'Demo ứng dụng blockchain đầu tiên' }
  ],
  "3": [
    { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&q=80', caption: 'Hội thảo AI trong giáo dục' },
    { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop&q=80', caption: 'Panel discussion với các chuyên gia' },
    { url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=800&fit=crop&q=80', caption: 'Networking session' },
    { url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop&q=80', caption: 'Trao giải thưởng cho các ý tưởng xuất sắc' }
  ],
  "4": [
    { url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=800&fit=crop&q=80', caption: 'Lễ ký kết hợp tác chiến lược' },
    { url: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=800&fit=crop&q=80', caption: 'Thảo luận về định hướng phát triển' },
    { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&q=80', caption: 'Chụp ảnh kỷ niệm lễ ký kết' }
  ]
};

// Enhanced carousel data with multiple images
const carouselData = events.map(event => ({
  ...event,
  images: eventImageGalleries[event.id as keyof typeof eventImageGalleries] || [
    { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&q=80', caption: 'Hình ảnh sự kiện' }
  ],
  stats: { participants: Math.floor(Math.random() * 1500) + 200, media: Math.floor(Math.random() * 10) + 3, photos: eventImageGalleries[event.id as keyof typeof eventImageGalleries]?.length || 1 }
}));

export default function ImageCarousel() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [albumViewerOpen, setAlbumViewerOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentEvent = carouselData[currentEventIndex];
  const currentImages = currentEvent.images;
  const currentImage = currentImages[currentImageIndex];
  const AUTOPLAY_INTERVAL = 6000;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    setProgress(0);

    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + (100 / (AUTOPLAY_INTERVAL / 100));
      });
    }, 100);

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(prev => {
        const nextImageIndex = prev + 1;
        if (nextImageIndex >= currentImages.length) {
          setCurrentEventIndex(prevEvent => (prevEvent + 1) % carouselData.length);
          return 0;
        }
        return nextImageIndex;
      });
      setProgress(0);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isAutoPlaying, currentEventIndex, currentImages.length]);

  const goToPrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    } else if (currentEventIndex > 0) {
      setCurrentEventIndex(prev => prev - 1);
      setCurrentImageIndex(carouselData[currentEventIndex - 1].images.length - 1);
    } else {
      setCurrentEventIndex(carouselData.length - 1);
      setCurrentImageIndex(carouselData[carouselData.length - 1].images.length - 1);
    }
    setIsAutoPlaying(false);
    setProgress(0);
  };

  const goToNext = () => {
    if (currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else if (currentEventIndex < carouselData.length - 1) {
      setCurrentEventIndex(prev => prev + 1);
      setCurrentImageIndex(0);
    } else {
      setCurrentEventIndex(0);
      setCurrentImageIndex(0);
    }
    setIsAutoPlaying(false);
    setProgress(0);
  };

  const goToEvent = (eventIndex: number) => {
    setCurrentEventIndex(eventIndex);
    setCurrentImageIndex(0);
    setIsAutoPlaying(false);
    setProgress(0);
  };

  const goToImage = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setIsAutoPlaying(false);
    setProgress(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (!isAutoPlaying) setProgress(0);
  };

  const openImageViewer = () => {
    setImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
  };

  const openAlbumViewer = () => {
    setAlbumViewerOpen(true);
  };

  const closeAlbumViewer = () => {
    setAlbumViewerOpen(false);
  };

  // Get all images for album view
  const allImages = carouselData.flatMap(event => 
    event.images.map(img => ({
      ...img,
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.location
    }))
  );

  // Preload images
  useEffect(() => {
    carouselData.forEach(event => {
      event.images.forEach(img => {
        const imageElement = document.createElement('img');
        imageElement.onload = () => {
          setLoadedImages(prev => new Set([...prev, img.url]));
        };
        imageElement.src = img.url;
      });
    });
  }, []);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Section Header */}
          <div className={styles.header}>
            <div className={styles.badge}>
              <ImageIcon className={styles.badgeIcon} />
              <span className={styles.badgeText}>Thư viện hình ảnh</span>
            </div>
            <h2 className={styles.title}>
              <span className={styles.gradientText}>Khoảnh Khắc Đáng Nhớ</span>
            </h2>
            <p className={styles.description}>
              Những hình ảnh ấn tượng từ các sự kiện và hoạt động chia sẻ kiến thức
            </p>
            
            {/* Stats Overview */}
            <div className={styles.statsOverview}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{carouselData.length}</span>
                <span className={styles.statLabel}>Sự kiện</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{allImages.length}</span>
                <span className={styles.statLabel}>Hình ảnh</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5,000+</span>
                <span className={styles.statLabel}>Người tham gia</span>
              </div>
            </div>
          </div>

          {/* Main Carousel */}
          <div className={styles.carouselContainer}>
            {/* Main Image Display */}
            <div className={styles.mainDisplay}>
              <div className={styles.imageWrapper} onClick={openImageViewer}>
                {loadedImages.has(currentImage.url) ? (
                  <Image
                    src={currentImage.url}
                    alt={currentImage.caption}
                    fill
                    className={styles.mainImage}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <ImageIcon className={styles.placeholderIcon} />
                    <span className={styles.placeholderText}>Đang tải...</span>
                  </div>
                )}
                
                {/* Image Overlay */}
                <div className={styles.imageOverlay} />
                
                {/* Navigation Controls */}
                <div className={styles.navigationControls}>
                  <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className={styles.navButton}>
                    <ChevronLeft className={styles.navIcon} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className={styles.navButton}>
                    <ChevronRight className={styles.navIcon} />
                  </button>
                </div>

                {/* Top Controls */}
                <div className={styles.topControls}>
                  <div className={styles.slideCounter}>
                    <span>{currentImageIndex + 1}</span>
                    <span className={styles.counterSeparator}>/</span>
                    <span>{currentImages.length}</span>
                  </div>
                  
                  <div className={styles.actionButtons}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleAutoPlay(); }} 
                      className={styles.actionButton} 
                      title={isAutoPlaying ? 'Tạm dừng' : 'Phát'}
                    >
                      {isAutoPlaying ? <Pause className={styles.actionIcon} /> : <Play className={styles.actionIcon} />}
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); openImageViewer(); }} 
                      className={styles.actionButton} 
                      title="Xem chi tiết"
                    >
                      <Maximize2 className={styles.actionIcon} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); openAlbumViewer(); }} 
                      className={styles.actionButton} 
                      title="Xem tất cả ảnh"
                    >
                      <Grid3X3 className={styles.actionIcon} />
                    </button>
                  </div>
                </div>

                {/* Content Info */}
                <div className={styles.contentInfo}>
                  <div className={styles.categoryBadge}>
                    <span className={styles[`category-${currentEvent.category}`]}>
                      {currentEvent.category.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className={styles.imageTitle}>{currentEvent.title}</h3>
                  <p className={styles.imageCaption}>{currentImage.caption}</p>
                  
                  <div className={styles.imageMeta}>
                    <div className={styles.metaItem}>
                      <Calendar className={styles.metaIcon} />
                      <span>{formatDate(currentEvent.date)}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <MapPin className={styles.metaIcon} />
                      <span>{currentEvent.location}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Users className={styles.metaIcon} />
                      <span>{currentEvent.stats.participants.toLocaleString()} người</span>
                    </div>
                  </div>

                  {/* Image Navigation Dots for Current Event */}
                  <div className={styles.imageDotsContainer}>
                    {currentImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); goToImage(index); }}
                        className={`${styles.imageDot} ${index === currentImageIndex ? styles.imageDotActive : ''}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                {isAutoPlaying && (
                  <div className={styles.progressBarContainer}>
                    <div 
                      className={styles.progressBar}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Event Thumbnail Navigation */}
            <div className={styles.thumbnailContainer}>
              <div className={styles.thumbnailGrid}>
                {carouselData.map((event, index) => (
                  <button
                    key={event.id}
                    onClick={() => goToEvent(index)}
                    className={`${styles.thumbnail} ${index === currentEventIndex ? styles.thumbnailActive : ''}`}
                  >
                    <div className={styles.thumbnailImageWrapper}>
                      <Image
                        src={event.images[0].url}
                        alt={event.title}
                        fill
                        className={styles.thumbnailImage}
                        sizes="120px"
                      />
                      
                      {/* Multiple Images Indicator */}
                      {event.images.length > 1 && (
                        <div className={styles.multipleImagesIndicator}>
                          <ImageIcon className={styles.multipleImagesIcon} />
                          <span>{event.images.length}</span>
                        </div>
                      )}
                      
                      {/* Active Indicator */}
                      {index === currentEventIndex && (
                        <div className={styles.activeIndicator} />
                      )}
                    </div>
                    
                    {/* Thumbnail Info */}
                    <div className={styles.thumbnailInfo}>
                      <span className={styles.thumbnailTitle}>{event.title}</span>
                      <span className={styles.thumbnailMeta}>
                        {formatDate(event.date)} • {event.images.length} ảnh
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className={styles.bottomActions}>
            <button 
              className={styles.bottomActionButton}
              onClick={openAlbumViewer}
            >
              <Grid3X3 className={styles.bottomActionIcon} />
              <span>Xem tất cả {allImages.length} hình ảnh</span>
            </button>
          </div>
        </div>
      </section>

      {/* Image Viewer Modal */}
      {imageViewerOpen && (
        <div className={styles.imageViewerModal}>
          <div className={styles.imageViewerContent}>
            <button onClick={closeImageViewer} className={styles.imageViewerClose}>
              <X className={styles.closeIcon} />
            </button>
            
            <div className={styles.imageViewerMain}>
              <Image
                src={currentImage.url}
                alt={currentImage.caption}
                fill
                className={styles.viewerImage}
                sizes="100vw"
              />
              
              {/* Navigation in viewer */}
              <button 
                onClick={goToPrevious} 
                className={`${styles.viewerNavButton} ${styles.viewerNavPrev}`}
              >
                <ChevronLeft className={styles.viewerNavIcon} />
              </button>
              <button 
                onClick={goToNext} 
                className={`${styles.viewerNavButton} ${styles.viewerNavNext}`}
              >
                <ChevronRight className={styles.viewerNavIcon} />
              </button>
            </div>
            
            {/* Image Info */}
            <div className={styles.imageViewerInfo}>
              <div className={styles.viewerInfoHeader}>
                <h3 className={styles.viewerInfoTitle}>{currentEvent.title}</h3>
                <div className={styles.viewerInfoMeta}>
                  <Calendar className={styles.viewerMetaIcon} />
                  <span>{formatDate(currentEvent.date)}</span>
                  <MapPin className={styles.viewerMetaIcon} />
                  <span>{currentEvent.location}</span>
                </div>
              </div>
              <p className={styles.viewerInfoCaption}>{currentImage.caption}</p>
              <div className={styles.viewerInfoActions}>
                <span className={styles.viewerCounter}>
                  {currentImageIndex + 1} / {currentImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Album Viewer Modal */}
      {albumViewerOpen && (
        <div className={styles.albumModal}>
          <div className={styles.albumContent}>
            <div className={styles.albumHeader}>
              <h2 className={styles.albumTitle}>
                <ImageIcon className={styles.albumTitleIcon} />
                Tất cả khoảnh khắc đáng nhớ
              </h2>
              <button onClick={closeAlbumViewer} className={styles.albumClose}>
                <X className={styles.closeIcon} />
              </button>
            </div>
            
            <div className={styles.albumGrid}>
              {allImages.map((image, index) => (
                <div key={index} className={styles.albumItem}>
                  <div className={styles.albumImageWrapper}>
                    <Image
                      src={image.url}
                      alt={image.caption}
                      fill
                      className={styles.albumImage}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className={styles.albumItemInfo}>
                    <h4 className={styles.albumItemTitle}>{image.eventTitle}</h4>
                    <p className={styles.albumItemCaption}>{image.caption}</p>
                    <div className={styles.albumItemMeta}>
                      <span>{formatDate(image.eventDate)}</span>
                      <span>•</span>
                      <span>{image.eventLocation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
