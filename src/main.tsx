import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Performance monitoring
const trackPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
        const lcp = paint.find(p => p.name === 'largest-contentful-paint')?.startTime || 0;
        
        console.log('Performance Metrics:', {
          fcp: `${fcp.toFixed(0)}ms`,
          lcp: `${lcp.toFixed(0)}ms`,
          domLoad: `${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`,
          load: `${navigation.loadEventEnd - navigation.loadEventStart}ms`
        });
      }, 0);
    });
  }
};

// Initialize performance tracking
trackPerformance();

// Defer non-critical operations
requestIdleCallback(() => {
  console.log('App initialized with deferred operations');
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
