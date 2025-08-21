import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'digital-transformation',
    title: 'Tư vấn Chuyển đổi Số Doanh nghiệp',
    description: 'Hỗ trợ doanh nghiệp xây dựng chiến lược chuyển đổi số toàn diện',
    features: [
      'Đánh giá hiện trạng công nghệ',
      'Xây dựng roadmap chuyển đổi số',
      'Tư vấn công nghệ Blockchain',
      'Đào tạo nhân sự',
      'Hỗ trợ triển khai và vận hành'
    ],
    icon: 'Building2',
    duration: '3-6 tháng'
  },
  {
    id: 'community-building',
    title: 'Tư vấn Xây dựng Cộng đồng',
    description: 'Với 2+ năm kinh nghiệm phát triển cộng đồng',
    features: [
      'Chiến lược xây dựng cộng đồng',
      'Quản lý và vận hành cộng đồng',
      'Engagement và retention',
      'Community marketing',
      'Đo lường hiệu quả'
    ],
    icon: 'Users',
    duration: '2-4 tháng'
  },
  {
    id: 'speaking',
    title: 'Diễn giả Hội thảo AI/Blockchain',
    description: 'Chia sẻ kiến thức và kinh nghiệm thực tiễn',
    features: [
      'Keynote Speaker',
      'Workshop facilitator',
      'Panel discussion',
      'Training sessions',
      'Tư vấn nội dung chuyên môn'
    ],
    icon: 'Mic',
    duration: '1-3 ngày'
  }
];