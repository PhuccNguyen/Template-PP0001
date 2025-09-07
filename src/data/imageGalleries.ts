export interface ImageItem {
  url: string;
  caption: string;
}

export interface ImageGallery {
  [eventId: string]: ImageItem[];
}

export const eventImageGalleries: ImageGallery = {
  // Đại học Công Thương - Talkshow AI & Blockchain
  "cong-thuong-2025": [
    { 
      url: '/images/events/Đại học công thương/Image-02.JPG', 
      caption: 'Khai mạc talkshow AI & Blockchain với sự tham gia đông đảo sinh viên' 
    },
    { 
      url: '/images/events/Đại học công thương/Image-01 (1).JPG', 
      caption: 'Diễn giả chia sẻ về ứng dụng AI trong thương mại và giáo dục' 
    },
    { 
      url: '/images/events/Đại học công thương/Image-03.JPG', 
      caption: 'Phiên thảo luận và tương tác Q&A sôi nổi với sinh viên' 
    },
    { 
      url: '/images/events/Đại học công thương/Image-04.JPG', 
      caption: 'Chụp ảnh lưu niệm cùng ban tổ chức và các đại biểu' 
    }
  ],

  // Đại học Gia Định - Talkshow ứng dụng thông minh
  "gia-dinh-2025": [
    { 
      url: '/images/events/Đại Học Gia Định/Talkshow tại Đại học Gia Định_03.jpg', 
      caption: 'Buổi talkshow về ứng dụng thông minh trong kỷ nguyên số' 
    },
    { 
      url: '/images/events/Đại Học Gia Định/image-01.jpg', 
      caption: 'Ngày hội việc làm kết nối doanh nghiệp 2025' 
    },
    { 
      url: '/images/events/Đại Học Gia Định/Talkshow tại Đại học Gia Định_02.jpg', 
      caption: 'Sinh viên tích cực tham gia và đặt câu hỏi' 
    },
    { 
      url: '/images/events/Đại Học Gia Định/Talkshow tại Đại học Gia Định_03.jpg', 
      caption: 'Khoảnh khắc giao lưu và networking' 
    }
  ],

  // HUTECH - Khám phá cơ hội nghề nghiệp Blockchain
  "hutech-2025": [
    { 
      url: '/images/events/Đại học HUTECH/HUTECH-TALKSHOW-5.webp', 
      caption: 'Sự kiện khám phá cơ hội nghề nghiệp Blockchain tại HUTECH' 
    },
    { 
      url: '/images/events/Đại học HUTECH/HUTECH-TALKSHOW-10.webp', 
      caption: 'Panel discussion với các chuyên gia blockchain hàng đầu' 
    },
    { 
      url: '/images/events/Đại học HUTECH/HUTECH-TALKSHOW-12.webp', 
      caption: 'Workshop thực hành về công nghệ blockchain' 
    },
    { 
      url: '/images/events/Đại học HUTECH/HUTECH-TALKSHOW-15.webp', 
      caption: 'Trao cơ hội việc làm và thực tập cho sinh viên xuất sắc' 
    }
  ],

  // Đại học Công Thương - Ký MOU
  "cong-thuong-mou-2025": [
    { 
      url: '/images/events/Đại học công thương/MOU-01.jpg', 
      caption: 'Lễ ký kết biên bản ghi nhớ hợp tác giữa UFIN Group và Đại học Công Thương' 
    },
    { 
      url: '/images/events/Đại học công thương/MOU-02.jpg', 
      caption: 'Đại diện lãnh đạo hai bên trong buổi ký kết' 
    },
    { 
      url: '/images/events/Đại học công thương/MOU-03.jpg', 
      caption: 'Thảo luận về định hướng hợp tác trong tương lai' 
    },
    { 
      url: '/images/events/Đại học công thương/MOU-04.jpg', 
      caption: 'Chụp ảnh kỷ niệm sau lễ ký kết thành công' 
    }
  ],

  // Đại học Gia Định - Ký MOU
  "gia-dinh-mou-2025": [
    { 
      url: '/images/events/Đại Học Gia Định/MOU-01.jpg', 
      caption: 'Ký kết hợp tác chiến lược giữa UFIN Group và Đại học Gia Định' 
    },
    { 
      url: '/images/events/Đại Học Gia Định/MOU-02.jpg', 
      caption: 'Buổi thảo luận về cơ hội nghề nghiệp cho sinh viên' 
    },
    { 
      url: '/images/events/Đại Học Gia Định/MOU-03.jpg', 
      caption: 'Trao đổi về chương trình đào tạo và thực tập' 
    },
    { 
      url: '/images/events/Đại Học Gia Định/MOU-04.jpg', 
      caption: 'Khoảnh khắc lịch sử trong mối quan hệ hợp tác' 
    }
  ],

  // Đại học Huế - Ứng dụng Blockchain & AI trong giáo dục
  "hue-university-2025": [
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/Hue-01.jpg', 
      caption: 'TingFoundation tham gia phiên thảo luận mở tại Đại học Huế' 
    },
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/Hue-02.jpg', 
      caption: 'Hơn 1.000 sinh viên Huế khám phá tiềm năng Blockchain & AI' 
    },
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/Hue-03.jpg', 
      caption: 'Thảo luận về ứng dụng công nghệ trong giáo dục' 
    },
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/Hue-04.jpg', 
      caption: 'Networking và giao lưu giữa sinh viên và chuyên gia' 
    }
  ],

  // BTEC & Melbourne - Trao học bổng
  "btec-scholarship-2025": [
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/BTEC-01.jpg', 
      caption: 'TING FOUNDATION trao tặng 15 suất học bổng BTEC' 
    },
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/BTEC-02.jpg', 
      caption: 'Các sinh viên xuất sắc nhận học bổng công nghệ' 
    },
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/BTEC-03.jpg', 
      caption: 'Buổi giao lưu và chia sẻ kinh nghiệm học tập' 
    },
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/BTEC-04.jpg', 
      caption: 'Cam kết hỗ trợ phát triển nhân tài công nghệ trẻ' 
    }
  ],

  // Đại học Gia Định - Blockchain 2024
  "gia-dinh-blockchain-2024": [
    { 
      url: '/images/events/Đại Học Gia Định/Blockchain-2024-01.jpg', 
      caption: 'Phiên thảo luận về Blockchain và AI trong học tập năm 2024' 
    },
    { 
      url: '/images/events/Đại Học Gia Định/Blockchain-2024-02.jpg', 
      caption: 'ABAII UNITOUR 18 - Bắt sóng công nghệ tương lai' 
    },
    { 
      url: '/images/events/Đại Học Gia Định/Blockchain-2024-03.jpg', 
      caption: 'Sinh viên tìm hiểu về động lực chuyển mình số' 
    },
    { 
      url: '/images/events/Đại Học Gia Định/Blockchain-2024-04.jpg', 
      caption: 'Cơ hội phát triển nghề nghiệp trong lĩnh vực công nghệ' 
    }
  ],

  // BTEC - Chuyến thăm 2024
  "btec-visit-2024": [
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/BTEC-Visit-01.jpg', 
      caption: 'Ufin thực hiện chuyến thăm và làm việc tại BTEC' 
    },
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/BTEC-Visit-02.jpg', 
      caption: 'Khảo sát cơ hội hợp tác trong lĩnh vực giáo dục công nghệ' 
    },
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/BTEC-Visit-03.jpg', 
      caption: 'Tham quan cơ sở vật chất và phòng thí nghiệm' 
    },
    { 
      url: '/images/events/TingFoundation Ứng dụng Blockchain/BTEC-Visit-04.jpg', 
      caption: 'Thảo luận về chương trình đào tạo chuyên ngành' 
    }
  ],

  // Greenwich - Lễ khai giảng 2024
  "greenwich-opening-2024": [
    { 
      url: '/images/events/Greenwich/Opening-01.jpg', 
      caption: 'Lễ khai giảng năm học mới tại Greenwich University' 
    },
    { 
      url: '/images/events/Greenwich/Opening-02.jpg', 
      caption: 'Sinh viên tham dự lễ khai giảng với tinh thần hào hứng' 
    },
    { 
      url: '/images/events/Greenwich/Opening-03.jpg', 
      caption: 'Các hoạt động ý nghĩa trong ngày đầu năm học' 
    },
    { 
      url: '/images/events/Greenwich/Opening-04.jpg', 
      caption: 'Khoảnh khắc đáng nhớ của các tân sinh viên Greenwich' 
    }
  ],

  // Greenwich - Triển lãm thiết kế 2024
  "greenwich-design-2024": [
    { 
      url: '/images/events/Greenwich/Design-Expo-01.jpg', 
      caption: 'Khai mạc Ngày hội Triển lãm Thiết kế Đồ họa & Kỹ thuật số' 
    },
    { 
      url: '/images/events/Greenwich/Design-Expo-02.jpg', 
      caption: 'Triển lãm các tác phẩm sáng tạo của sinh viên' 
    },
    { 
      url: '/images/events/Greenwich/Design-Expo-03.jpg', 
      caption: 'Workshop thực hành thiết kế và kỹ thuật số' 
    },
    { 
      url: '/images/events/Greenwich/Design-Expo-04.jpg', 
      caption: 'Trao giải cho các tác phẩm xuất sắc nhất' 
    }
  ],

  // Tôn Đức Thắng - Triển lãm 2023
  "ton-duc-thang-2023": [
    { 
      url: '/images/events/Greenwich/TDT-Design-01.jpg', 
      caption: 'Ngày hội Triển lãm Thiết kế tại Đại học Tôn Đức Thắng 2023' 
    },
    { 
      url: '/images/events/Greenwich/TDT-Design-02.jpg', 
      caption: 'Các tác phẩm đồ họa và kỹ thuật số ấn tượng' 
    },
    { 
      url: '/images/events/Greenwich/TDT-Design-03.jpg', 
      caption: 'Sinh viên trình bày và giới thiệu sản phẩm' 
    },
    { 
      url: '/images/events/Greenwich/TDT-Design-04.jpg', 
      caption: 'Không khí sôi động và sáng tạo của triển lãm' 
    }
  ]
};

// Export default cho convenience
export default eventImageGalleries;
