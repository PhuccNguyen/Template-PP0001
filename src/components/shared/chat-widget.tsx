'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement chat functionality
    console.log({ name, message });
    setMessage('');
    setName('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-ai-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 animate-bounce-gentle"
        aria-label="Mở chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat Window */}
          <div className="relative w-full max-w-md mx-4 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-secondary-200">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-ai-600">
                  <span className="text-sm font-bold text-white">T</span>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Thomas Hoàng</h3>
                  <p className="text-sm text-green-600">● Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <X className="h-5 w-5 text-secondary-600" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-4">
              <div className="mb-4">
                <div className="bg-secondary-100 rounded-lg p-3 mb-2">
                  <p className="text-sm text-secondary-700">
                    Xin chào! Tôi là Thomas Hoàng. Bạn có câu hỏi gì về dịch vụ của tôi không?
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-4">
                <p className="text-sm font-medium text-secondary-700 mb-2">Câu hỏi thường gặp:</p>
                <div className="space-y-2">
                  {[
                    'Dịch vụ tư vấn của bạn như thế nào?',
                    'Chi phí tư vấn bao nhiêu?',
                    'Làm thế nào để đặt lịch hẹn?'
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(question)}
                      className="w-full text-left p-2 text-sm text-secondary-600 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  placeholder="Tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Nhập tin nhắn của bạn..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  required
                />
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4" />
                  Gửi tin nhắn
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}