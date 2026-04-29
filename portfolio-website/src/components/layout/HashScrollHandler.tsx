'use client';

import { useEffect } from 'react';

export default function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace('#', '');
    // Small delay lets React finish painting the section elements
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
