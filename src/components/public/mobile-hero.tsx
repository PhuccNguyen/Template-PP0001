'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { personalInfo } from '@/data/constants';
import { 
  Calendar, 
  ArrowRight, 
  Users, 
  Award, 
  Cpu, 
  Shield, 
  Zap,
  Bitcoin,
  Brain,
  Network
} from 'lucide-react';

export default function MobileHero() {
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const fullText = "Blockchain Expert • AI Innovator • Tech Entrepreneur";
  
  useEffect(() => {
    setIsVisible(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Bitcoin, value: '6+', label: 'Năm Blockchain', color: 'text-amber-400' },
    { icon: Users, value: '10+', label: 'Doanh nghiệp', color: 'text-blue-400' },
    { icon: Brain, value: '50+', label: 'Sự kiện AI', color: 'text-purple-400' },
    { icon: Award, value: '100%', label: 'Thành công', color: 'text-green-400' },
  ];

  const techIcons = [
    { icon: Bitcoin, color: 'text-amber-400', delay: '0s' },
    { icon: Brain, color: 'text-purple-400', delay: '0.5s' },
    { icon: Network, color: 'text-blue-400', delay: '1s' },
    { icon: Shield, color: 'text-green-400', delay: '1.5s' },
    { icon: Cpu, color: 'text-red-400', delay: '2s' },
    { icon: Zap, color: 'text-yellow-400', delay: '2.5s' },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Matrix Background */}
      <div className="absolute inset-0 tech-grid-bg opacity-20"></div>
      
      {/* Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {techIcons.map((tech, index) => (
          <div
            key={index}
            className={`absolute animate-float ${tech.color}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: tech.delay,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <tech.icon className="w-6 h-6 md:w-8 md:h-8 opacity-30" />
          </div>
        ))}
      </div>

      {/* Blockchain Glow Effects */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container-mobile relative z-10 min-h-screen flex flex-col justify-center py-12">
        {/* Main Content */}
        <div className="text-center space-y-8 animate-slide-up">
          {/* Badge */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-crypto-card border border-amber-500/30 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm font-medium text-amber-400">
              🚀 Blockchain Expert & AI Pioneer
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className={`mobile-hero-text gradient-blockchain transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
              {personalInfo.fullName}
            </h1>
            
            <div className="space-y-2">
              <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold text-white transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                {personalInfo.currentPosition}
              </h2>
              
              {/* Typed Animation */}
              <div className={`mobile-subtitle text-blue-300 font-mono transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                {typedText}
                <span className="inline-block w-0.5 h-6 bg-amber-400 ml-1 animate-pulse"></span>
              </div>
            </div>
          </div>

          {/* Avatar Section - Mobile Optimized */}
          <div className={`flex justify-center my-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="relative group">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 via-blue-500 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-1000 animate-glow"></div>
              
              {/* Main Avatar Container */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                {/* Avatar Background */}
                <div className="w-full h-full rounded-full bg-crypto-card border-2 border-amber-500/50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500 animate-float">
                  <div className="text-center p-6">
                    <div className="text-6xl md:text-7xl mb-3">👨‍💻</div>
                    <p className="text-white/80 font-semibold text-sm md:text-base">Thomas Hoàng</p>
                    <p className="text-blue-300 text-xs md:text-sm">Blockchain Expert</p>
                  </div>
                </div>

                {/* Orbiting Icons */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="relative w-full h-full">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                      <Bitcoin className="w-4 h-4 text-slate-900" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Network className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed px-4">
              {personalInfo.bio}
            </p>
          </div>

          {/* CTA Buttons - Mobile Optimized */}
          <div className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto px-4 transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
            <Link href="/booking" className="flex-1">
              <button className="crypto-button w-full flex items-center justify-center gap-2 group">
                <Calendar className="h-5 w-5 transition-transform group-hover:scale-110" />
                Đặt lịch tư vấn
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            
            <Link href="/services" className="flex-1">
              <button className="w-full px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-400 rounded-lg font-semibold hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 flex items-center justify-center gap-2">
                Xem dịch vụ
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          {/* Stats Grid - Mobile Optimized */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-4 mt-12 transition-all duration-1000 delay-1300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="blockchain-card text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${1.5 + index * 0.1}s` }}
              >
                <div className="flex justify-center mb-3">
                  <div className={`p-3 rounded-xl bg-slate-800/50 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-1000 delay-1500 ${isVisible ? 'opacity-60' : 'opacity-0'}`}>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-xs text-slate-400 font-medium">Khám phá thêm</span>
          </div>
        </div>
      </div>
    </section>
  );
}