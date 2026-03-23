// Performance monitoring utilities using native browser APIs
export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Use native PerformanceObserver for web vitals
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            onPerfEntry({ name: 'LCP', value: entry.startTime });
          }
          if (entry.entryType === 'first-input') {
            const firstInput = entry as any;
            onPerfEntry({ name: 'FID', value: firstInput.processingStart - firstInput.startTime });
          }
          if (entry.entryType === 'layout-shift') {
            const layoutShift = entry as any;
            if (!layoutShift.hadRecentInput) {
              onPerfEntry({ name: 'CLS', value: layoutShift.value });
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance Observer not available:', error);
    }
  }
};

// Custom performance tracking
export const trackPerformance = () => {
  // Track navigation timing
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const metrics = {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          firstPaint: 0,
          firstContentfulPaint: 0,
        };

        // Get paint timing
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach((entry) => {
          if (entry.name === 'first-paint') {
            metrics.firstPaint = entry.startTime;
          }
          if (entry.name === 'first-contentful-paint') {
            metrics.firstContentfulPaint = entry.startTime;
          }
        });

        console.log('Performance Metrics:', metrics);
      }, 0);
    });
  }
};

// Resource optimization hints
export const addResourceHints = () => {
  const hints = [
    // Preload critical fonts
    { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap', as: 'style' },
    { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap', as: 'style' },
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.assign(link, hint);
    document.head.appendChild(link);
  });
};
