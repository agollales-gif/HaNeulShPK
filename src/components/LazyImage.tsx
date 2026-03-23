import { useState, useEffect, ReactNode } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: ReactNode;
}

export default function LazyImage({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  loading = 'lazy',
  placeholder 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');

  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const imgElement = document.getElementById(`lazy-img-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => observer.disconnect();
  }, [src, loading]);

  if (!isInView) {
    return (
      <div 
        id={`lazy-img-${src.replace(/[^a-zA-Z0-9]/g, '')}`}
        className={className}
        style={{ width, height }}
      >
        {placeholder || <div className="bg-gray-200 animate-pulse w-full h-full" />}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
    />
  );
}
