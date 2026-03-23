import { motion } from 'motion/react';
import React, { useRef, useState, ReactNode, useCallback } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  key?: string | number;
}

export default function MagneticButton({ children, className = '', onClick }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Cache rect on enter — avoids getBoundingClientRect on every mousemove (forced reflow)
  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  }, []);

  const handleMouse = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = rectRef.current;
    if (!rect) return;
    const middleX = e.clientX - (rect.left + rect.width / 2);
    const middleY = e.clientY - (rect.top + rect.height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  }, []);

  const reset = useCallback(() => {
    rectRef.current = null;
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
