import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}

/**
 * UnicornStudio background component
 * Fixed background layer with interactive visuals
 */
export function UnicornStudioBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script already exists
    if (window.UnicornStudio?.isInitialized) {
      window.UnicornStudio.init();
      return;
    }

    // Create and inject the script
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false, init: () => {} };
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.3/dist/unicornStudio.umd.js';
    script.onload = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };
    (document.head || document.body).appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <div 
        data-us-project="jwbqQKHOhT4Va7TtAqTS" 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
