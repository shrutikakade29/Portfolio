import { useEffect, useRef, useCallback } from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const blobsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  const PARTICLE_COUNT = 30; // Further reduced for silky smooth performance
  const CONNECTION_DISTANCE = 150;
  const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
  const MOUSE_RADIUS = 150;
  const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

  const initParticles = useCallback((width, height) => {
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Pre-randomize
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.8,
        opacity: Math.random() * 0.4 + 0.15,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2,
        colorType: Math.floor(Math.random() * 3),
      });
    }
    particlesRef.current = particles;

    const blobs = [];
    for (let i = 0; i < 3; i++) {
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 200 + 150,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        hue: [190, 270, 330][i],
        saturation: 80 + Math.random() * 20,
        phaseOffset: Math.random() * Math.PI * 2,
      });
    }
    blobsRef.current = blobs;
  }, []);

  // Pre-compute colors
  const COLORS = [
    [0, 220, 255],   // Cyan
    [112, 0, 255],   // Purple
    [255, 0, 85],    // Magenta
  ];

  const animate = useCallback((ctx, width, height) => {
    const time = timeRef.current++;
    
    // Clear instead of filling rect for better performance
    ctx.clearRect(0, 0, width, height);

    // --- Draw morphing gradient blobs ---
    const blobs = blobsRef.current;
    
    // Draw blobs first, in background
    for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < -blob.radius) blob.x = width + blob.radius;
        if (blob.x > width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = height + blob.radius;
        if (blob.y > height + blob.radius) blob.y = -blob.radius;

        const pulseRadius = blob.radius + Math.sin(time * 0.008 + blob.phaseOffset) * 40;
        const hue = blob.hue + Math.sin(time * 0.003 + blob.phaseOffset) * 15;

        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, pulseRadius);
        gradient.addColorStop(0, `hsla(${hue}, ${blob.saturation}%, 50%, 0.05)`);
        gradient.addColorStop(1, `hsla(${hue}, ${blob.saturation}%, 30%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        // Use rect instead of arc if it gets too heavy, but arc is okay for 3 blobs
        ctx.arc(blob.x, blob.y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    // --- Update and draw particles ---
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    
    ctx.lineWidth = 0.8;

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Mouse repulsion 
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distSqMouse = dxMouse * dxMouse + dyMouse * dyMouse;
        
        if (distSqMouse < MOUSE_RADIUS_SQ && distSqMouse > 0) {
            const dist = Math.sqrt(distSqMouse);
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            p.vx += (dxMouse / dist) * force * 0.08;
            p.vy += (dyMouse / dist) * force * 0.08;
        }

        // Friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Constraints
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Fast pulsing
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
        const currentOpacity = p.opacity * (0.7 + pulse * 0.3);
        const currentRadius = Math.max(0.1, p.radius * (0.85 + pulse * 0.15));

        // Draw particle
        const c = COLORS[p.colorType];
        ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Connections (only check forward to avoid double drawing)
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < CONNECTION_DISTANCE_SQ) {
                const opacity = (1 - Math.sqrt(distSq) / CONNECTION_DISTANCE) * 0.15;
                ctx.strokeStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${opacity})`;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }

    animationRef.current = requestAnimationFrame(() => animate(ctx, width, height));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Remove alpha:true if possible, but keep for blend modes if needed
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    const handleResize = () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        
        // Cap DPR to 1 internally for maximum speed while scaling via CSS
        canvas.width = windowWidth;
        canvas.height = windowHeight;
        
        // Initialize based on actual canvas pixel size
        initParticles(windowWidth, windowHeight);
    };

    let mouseTimeout;
    const handleMouseMove = (e) => {
        // Debounce/Throttle mouse tracking slightly to prevent UI thread lock
        mouseRef.current = { x: e.clientX, y: e.clientY };
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
             mouseRef.current = { x: -1000, y: -1000 };
        }, 2000); 
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    animationRef.current = requestAnimationFrame(() => animate(ctx, windowWidth, windowHeight));

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mouseTimeout);
    };
  }, [animate, initParticles]);

  return <canvas ref={canvasRef} className="particle-background" />;
};

export default ParticleBackground;
