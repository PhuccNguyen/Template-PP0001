export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: 'talkshow' | 'workshop' | 'conference' | 'mou';
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  duration: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface ContactInfo {
  email: string;
  telegram: string;
  linkedin: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  reason: string;
  preferredDate: string;
  preferredTime: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}