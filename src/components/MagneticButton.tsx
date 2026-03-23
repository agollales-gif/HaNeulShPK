import React, { useRef, useState, ReactNode, useCallback } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', onClick }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = useCallback(() => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = rectRef.current;
    if (!rect) return;
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.3,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.3,
    });
  }, []);

  const reset = useCallback(() => {
    rectRef.current = null;
    setPos({ x: 0, y: 0 });
  }, []);

  return (
    <button
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: pos.x === 0 && pos.y === 0 ? 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)' : 'transform 0.1s linear',
        willChange: 'transform',
      }}
    >
      {children}
    </button>
  );
}
