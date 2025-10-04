import { useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
  z: number;
}

export function SnakeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Snake properties
    const snake: Position[] = [];
    const segmentCount = 20;
    const segmentSize = 8;
    let time = 0;

    // Initialize snake segments
    for (let i = 0; i < segmentCount; i++) {
      snake.push({
        x: canvas.width / 2 - i * segmentSize,
        y: canvas.height / 2,
        z: 0
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      // Move snake head in 3D space
      const head = snake[0];
      head.x = canvas.width / 2 + Math.sin(time) * 200;
      head.y = canvas.height / 2 + Math.cos(time * 0.7) * 150;
      head.z = Math.sin(time * 0.5) * 50;

      // Follow segments
      for (let i = 1; i < snake.length; i++) {
        const current = snake[i];
        const target = snake[i - 1];
        
        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const dz = target.z - current.z;
        
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance > segmentSize) {
          const ratio = segmentSize / distance;
          current.x = target.x - dx * ratio;
          current.y = target.y - dy * ratio;
          current.z = target.z - dz * ratio;
        }
      }

      // Draw snake with 3D effect and blue-green-purple gradient
      snake.forEach((segment, index) => {
        const scale = 1 + segment.z * 0.01;
        const size = segmentSize * scale;
        const opacity = 0.4 + (segment.z + 50) * 0.01;
        
        // Calculate gradient colors based on segment position
        const progress = index / snake.length;
        let r, g, b;
        
        if (progress < 0.5) {
          // Blue to Green transition
          const t = progress * 2;
          r = Math.floor(0 * (1 - t) + 0 * t);
          g = Math.floor(123 * (1 - t) + 255 * t);
          b = Math.floor(255 * (1 - t) + 100 * t);
        } else {
          // Green to Purple transition
          const t = (progress - 0.5) * 2;
          r = Math.floor(0 * (1 - t) + 138 * t);
          g = Math.floor(255 * (1 - t) + 43 * t);
          b = Math.floor(100 * (1 - t) + 226 * t);
        }
        
        // Draw pixelated segment without blur
        const pixelSize = Math.max(2, size / 4);
        const pixels = Math.floor(size / pixelSize);
        
        for (let px = 0; px < pixels; px++) {
          for (let py = 0; py < pixels; py++) {
            if (Math.random() > 0.05) { // More solid appearance
              // Create brightness variation within each pixel
              const brightness = 0.7 + Math.random() * 0.3;
              ctx.fillStyle = `rgba(${Math.floor(r * brightness)}, ${Math.floor(g * brightness)}, ${Math.floor(b * brightness)}, ${opacity})`;
              
              ctx.fillRect(
                segment.x - size/2 + px * pixelSize,
                segment.y - size/2 + py * pixelSize,
                pixelSize,
                pixelSize
              );
            }
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-25"
      style={{ background: 'linear-gradient(135deg, #000428 0%, #004e92 25%, #009ffd 50%, #00d2ff 75%, #8a2be2 100%)' }}
    />
  );
}