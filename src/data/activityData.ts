import { eventImages } from './eventImages';
import { eventMediaLinks } from './eventMediaLinks';

export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: 'talkshow' | 'workshop' | 'conference' | 'mou';
  school: string;
}

export const activityEvents: ActivityEvent[] = [
      {
    id: "hue-university-2025",
    title: "ỨNG DỤNG BLOCKCHAIN & AI TRONG GIÁO DỤC",
    description: "TingFoundation tham gia phiên thảo luận mở về ứng dụng Blockchain & AI trong giáo dục với hơn 1.000 sinh viên Huế",
    date: "2025-03-19", 
    location: "Đại học Huế",
    category: "conference",
    school: "Đại học Huế"
  },
  {
    id: "cong-thuong-2025",
    title: "AI & BLOCKCHAIN: ỨNG DỤNG TRONG THƯƠNG MẠI, GIÁO DỤC VÀ ĐỊNH HƯỚNG NGHỀ NGHIỆP",
    description: "Talkshow chuyên sâu về ứng dụng AI và Blockchain trong các lĩnh vực thương mại, giáo dục và định hướng nghề nghiệp cho sinh viên",
    date: "2025-06-19",
    location: "Đại học Công Thương",
    category: "talkshow",
    school: "Đại học Công Thương"
  },
  {
    id: "gia-dinh-2025", 
    title: "ỨNG DỤNG THÔNG MINH TRONG KỶ NGUYÊN SỐ",
    description: "Chương trình ngày hội việc làm kết nối doanh nghiệp 2025 và Talkshow về ứng dụng thông minh trong kỷ nguyên số",
    date: "2025-05-09",
    location: "Đại học Gia Định", 
    category: "talkshow",
    school: "Đại học Gia Định"
  },
  {
    id: "hutech-2025",
    title: "KHÁM PHÁ CƠ HỘI NGHỀ NGHIỆP BLOCKCHAIN",
    description: "Sự kiện khám phá cơ hội nghề nghiệp Blockchain với sự hợp tác của HUTECH x BlockchainWork x VBA x UFIN",
    date: "2025-03-26",
    location: "Đại học HUTECH",
    category: "conference", 
    school: "HUTECH"
  },
  {
    id: "cong-thuong-mou-2025",
    title: "KÝ KẾT BIÊN BẢN GHI NHỚ HỢP TÁC",
    description: "Lễ ký kết biên bản ghi nhớ MOU giữa Đại học Công Thương và UFIN Group về hợp tác giáo dục và phát triển công nghệ",
    date: "2025-03-23",
    location: "Đại học Công Thương",
    category: "mou",
    school: "Đại học Công Thương"
  },
  {
    id: "gia-dinh-mou-2025",
    title: "KÝ KẾT HỢP TÁC CHIẾN LƯỢC",  
    description: "Ký kết biên bản ghi nhớ hợp tác giữa Đại học Gia Định và UFIN Group nhằm mở rộng cơ hội nghề nghiệp cho sinh viên",
    date: "2025-03-20",
    location: "Đại học Gia Định",
    category: "mou",
    school: "Đại học Gia Định"
  },
  {
    id: "btec-scholarship-2025",
    title: "TRAO TẶNG 15 SUẤT HỌC BỔNG BTEC",
    description: "TING FOUNDATION trao tặng 15 suất học bổng BTEC & Melbourne cho các sinh viên xuất sắc trong lĩnh vực công nghệ",
    date: "2025-02-28",
    location: "BTEC & Melbourne",
    category: "workshop",
    school: "BTEC & Melbourne"
  },
  {
    id: "gia-dinh-blockchain-2024",
    title: "ỨNG DỤNG BLOCKCHAIN VÀ AI TRONG HỌC TẬP",
    description: "TingFoundation tham gia phiên thảo luận về ứng dụng Blockchain và AI trong học tập - Động lực chuyển mình và cơ hội phát triển",
    date: "2024-12-05",
    location: "Đại học Gia Định",
    category: "conference", 
    school: "Đại học Gia Định"
  },
  {
    id: "btec-visit-2024",
    title: "CHUYẾN THĂM VÀ LÀM VIỆC TẠI BTEC",
    description: "Ufin thực hiện chuyến thăm và làm việc tại BTEC để tìm hiểu cơ hội hợp tác trong lĩnh vực giáo dục công nghệ",
    date: "2024-11-01", 
    location: "BTEC & Melbourne",
    category: "workshop",
    school: "BTEC & Melbourne"
  },
  {
    id: "greenwich-opening-2024",
    title: "LỄ KHAI GIẢNG GREENWICH",
    description: "Tham gia Lễ khai giảng năm học mới tại Đại học Greenwich Việt Nam với nhiều hoạt động ý nghĩa",
    date: "2024-09-18",
    location: "Greenwich University",
    category: "conference",
    school: "Greenwich"
  },
  {
    id: "greenwich-design-2024", 
    title: "NGÀY HỘI TRIỂN LÃM THIẾT KẾ ĐỒ HỌA & KỸ THUẬT SỐ",
    description: "Khai mạc Ngày hội Triển lãm Thiết kế Đồ họa & Kỹ thuật số tại Greenwich với sự tham gia của nhiều sinh viên",
    date: "2024-08-12",
    location: "Greenwich University", 
    category: "workshop",
    school: "Greenwich"
  },
  {
    id: "ton-duc-thang-2023",
    title: "TRIỂN LÃM THIẾT KẾ ĐỒ HỌA & KỸ THUẬT SỐ",
    description: "Khai mạc Ngày hội Triển lãm Thiết kế Đồ họa & Kỹ thuật số tại Đại học Tôn Đức Thắng năm 2023",
    date: "2023-08-03",
    location: "Đại học Tôn Đức Thắng",
    category: "workshop", 
    school: "Tôn Đức Thắng"
  },
];

export { eventImages, eventMediaLinks };
