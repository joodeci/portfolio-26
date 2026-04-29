'use client';

import { useEffect, useRef, useState } from 'react';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function SectionWrapper({
  id,
  children,
  style,
  className,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        padding: '7rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        ...style,
      }}
      className={className}
    >
      {children}
    </section>
  );
}