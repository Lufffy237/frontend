'use client';

import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  delay?: number;
}

export function useCountUp({
  end,
  duration = 2500,
  suffix = '',
  prefix = '',
  decimals = 0,
  delay = 300,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Délai pour que l'utilisateur voie le 0 avant le comptage
    const startTimer = setTimeout(() => {
      setHasStarted(true);
      const startTime = performance.now();

      const updateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing easeOutQuart
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        const currentCount = end * easedProgress;

        setCount(currentCount);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };

      animationRef.current = requestAnimationFrame(updateCount);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [end, duration, delay]);

  // Respect prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const displayValue = prefersReducedMotion
    ? end
    : Math.floor(count * Math.pow(10, decimals)) / Math.pow(10, decimals);

  const formattedValue = `${prefix}${displayValue.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;

  return { count: formattedValue, ref: elementRef, hasStarted };
}