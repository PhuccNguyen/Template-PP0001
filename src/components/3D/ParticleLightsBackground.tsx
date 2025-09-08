'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ParticleLightsBackground.module.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  glowIntensity: number;
  pulsePhase: number;
  originalOpacity: number;
}

const ParticleLightsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Màu sắc phù hợp với theme hiện tại - tương thích với CSS gradient
  const colors = [
    '#3b82f6', // Blue
    '#1d4ed8', // Blue dark
    '#1e40af', // Blue darker
    '#8b5cf6', // Purple
    '#7c3aed', // Purple dark
    '#6d28d9', // Purple darker
    '#10b981', // Green
    '#059669', // Green dark
    '#047857', // Green darker
    '#06b6d4', // Cyan
    '#0891b2', // Cyan dark
  ];

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    setDimensions({ width, height });
  }, []);

  const createParticle = useCallback((width: number, height: number): Particle => {
    const baseOpacity = Math.random() * 0.6 + 0.2;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: baseOpacity,
      originalOpacity: baseOpacity,
      color: colors[Math.floor(Math.random() * colors.length)],
      glowIntensity: Math.random() * 15 + 8,
      pulsePhase: Math.random() * Math.PI * 2,
    };
  }, []);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas.width, canvas.height));
    }
  }, [createParticle]);

  const drawParticle = useCallback((
    ctx: CanvasRenderingContext2D, 
    particle: Particle, 
    time: number
  ) => {
    const pulseFactor = Math.sin(time * 0.002 + particle.pulsePhase) * 0.4 + 0.6;
    const currentSize = particle.size * pulseFactor;
    const currentOpacity = particle.opacity * pulseFactor;

    // Enhanced glow effect
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.glowIntensity * 1.5
    );
    
    gradient.addColorStop(0, `${particle.color}${Math.floor(currentOpacity * 180).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(0.4, `${particle.color}${Math.floor(currentOpacity * 100).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(0.7, `${particle.color}${Math.floor(currentOpacity * 40).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${particle.color}00`);

    // Glow layer
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.glowIntensity * 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Core particle with stronger glow
    const coreGradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, currentSize * 3
    );
    coreGradient.addColorStop(0, `${particle.color}${Math.floor(currentOpacity * 255).toString(16).padStart(2, '0')}`);
    coreGradient.addColorStop(0.5, `${particle.color}${Math.floor(currentOpacity * 180).toString(16).padStart(2, '0')}`);
    coreGradient.addColorStop(1, `${particle.color}00`);

    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, currentSize * 2, 0, Math.PI * 2);
    ctx.fill();

    // Inner bright core
    ctx.fillStyle = `${particle.color}${Math.floor(currentOpacity * 255).toString(16).padStart(2, '0')}`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, []);

  const updateParticle = useCallback((particle: Particle, canvas: HTMLCanvasElement) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Enhanced mouse interaction
    const dx = mousePosition.x - particle.x;
    const dy = mousePosition.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 120) {
      const force = (120 - distance) / 120;
      particle.x -= dx * force * 0.008;
      particle.y -= dy * force * 0.008;
      // Brighten particles near mouse
      particle.opacity = particle.originalOpacity * (1 + force * 0.5);
    } else {
      // Fade back to original opacity
      particle.opacity = particle.originalOpacity;
    }

    // Boundary wrapping
    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;
  }, [mousePosition]);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach((particle, i) => {
      particlesRef.current.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const opacity = (120 - distance) / 120 * 0.06;
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.strokeStyle = `#3b82f6${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
          ctx.restore();
        }
      });
    });
  }, []);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach(particle => {
      updateParticle(particle, canvas);
      drawParticle(ctx, particle, time);
    });

    drawConnections(ctx);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticle, drawParticle, drawConnections]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleResize = useCallback(() => {
    resizeCanvas();
    initParticles();
  }, [resizeCanvas, initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    initParticles();
    
    const startTime = Date.now();
    const animateWithDelay = (currentTime: number) => {
      animate(currentTime - startTime);
    };
    
    animationFrameRef.current = requestAnimationFrame(animateWithDelay);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, handleResize, handleMouseMove, resizeCanvas, initParticles]);

  return (
    <div className={styles.particleLightsContainer}>
      <canvas
        ref={canvasRef}
        className={styles.particleCanvas}
      />
    </div>
  );
};

export default ParticleLightsBackground;
