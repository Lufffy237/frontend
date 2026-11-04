'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { parseFigure } from '@/lib/parseFigure';

interface CountUpNumberProps {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export function CountUpNumber({ value, className = '', duration = 2500, delay = 300 }: CountUpNumberProps) {
  const { number, suffix, decimals } = parseFigure(value);
  const { count, ref } = useCountUp({
    end: number,
    duration,
    suffix,
    decimals,
    delay,
  });

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`}>
      {count}
    </span>
  );
}