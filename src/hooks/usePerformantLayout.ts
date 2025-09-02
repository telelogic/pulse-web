import { useEffect, useRef, useCallback } from 'react';

// Custom hook to batch DOM reads and writes to prevent forced reflows
export const usePerformantLayout = () => {
  const rafId = useRef<number>();
  const pendingReads = useRef<(() => void)[]>([]);
  const pendingWrites = useRef<(() => void)[]>([]);

  const scheduleRead = useCallback((callback: () => void) => {
    pendingReads.current.push(callback);
    
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => {
        // Batch all reads first
        const reads = [...pendingReads.current];
        pendingReads.current = [];
        
        reads.forEach(read => read());
        
        // Then batch all writes
        const writes = [...pendingWrites.current];
        pendingWrites.current = [];
        
        writes.forEach(write => write());
        
        rafId.current = undefined;
      });
    }
  }, []);

  const scheduleWrite = useCallback((callback: () => void) => {
    pendingWrites.current.push(callback);
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { scheduleRead, scheduleWrite };
};

// Hook for optimized element measurements
export const useElementSize = () => {
  const elementRef = useRef<HTMLElement>(null);
  const { scheduleRead } = usePerformantLayout();

  const measureElement = useCallback((callback: (rect: DOMRect) => void) => {
    if (!elementRef.current) return;
    
    scheduleRead(() => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        callback(rect);
      }
    });
  }, [scheduleRead]);

  return { elementRef, measureElement };
};

// Hook for debounced resize events
export const useDebounceResize = (callback: () => void, delay: number = 100) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(callback, delay);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);
};
