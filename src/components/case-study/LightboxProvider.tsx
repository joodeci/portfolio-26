'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface LightboxImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface LightboxCtx {
  openByUrl: (url: string) => void;
}

const LightboxContext = createContext<LightboxCtx>({ openByUrl: () => {} });

export function useLightbox() {
  return useContext(LightboxContext);
}

export default function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openByUrl = useCallback((url: string) => {
    const els = Array.from(document.querySelectorAll('[data-lb-url]'));
    const imgs: LightboxImage[] = els.map((el) => ({
      url: el.getAttribute('data-lb-url')!,
      alt: el.getAttribute('data-lb-alt') || '',
      caption: el.getAttribute('data-lb-caption') || '',
    }));
    const index = imgs.findIndex((img) => img.url === url);
    if (index !== -1) {
      setImages(imgs);
      setCurrentIndex(index);
      setIsOpen(true);
    }
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const next = useCallback(
    () => setCurrentIndex((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setCurrentIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close, next, prev]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const current = images[currentIndex];

  return (
    <LightboxContext.Provider value={{ openByUrl }}>
      {children}

      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(30, 22, 12, 0.93)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 5rem',
          }}
        >
          {/* Close */}
          <button
            aria-label="Close lightbox"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              color: 'rgba(245, 240, 232, 0.5)',
              fontSize: '1.1rem',
              cursor: 'pointer',
              padding: '0.5rem',
              lineHeight: 1,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(245, 240, 232, 0.9)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245, 240, 232, 0.5)')}
          >
            ✕
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              style={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: '1px solid rgba(245, 240, 232, 0.15)',
                borderRadius: '2px',
                color: 'rgba(245, 240, 232, 0.6)',
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                lineHeight: 1,
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245, 240, 232, 0.4)';
                e.currentTarget.style.color = 'rgba(245, 240, 232, 0.95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245, 240, 232, 0.15)';
                e.currentTarget.style.color = 'rgba(245, 240, 232, 0.6)';
              }}
            >
              ←
            </button>
          )}

          {/* Image + caption */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 'calc(100vw - 10rem)',
              maxHeight: 'calc(100vh - 8rem)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.url}
              alt={current.alt || ''}
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 11rem)',
                objectFit: 'contain',
                display: 'block',
                borderRadius: '2px',
              }}
            />
            {current.caption && (
              <p
                style={{
                  color: 'rgba(245, 240, 232, 0.45)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.05em',
                  textAlign: 'center',
                  marginTop: '0.75rem',
                  maxWidth: '60ch',
                }}
              >
                {current.caption}
              </p>
            )}
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              style={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: '1px solid rgba(245, 240, 232, 0.15)',
                borderRadius: '2px',
                color: 'rgba(245, 240, 232, 0.6)',
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                lineHeight: 1,
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245, 240, 232, 0.4)';
                e.currentTarget.style.color = 'rgba(245, 240, 232, 0.95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245, 240, 232, 0.15)';
                e.currentTarget.style.color = 'rgba(245, 240, 232, 0.6)';
              }}
            >
              →
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <p
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(245, 240, 232, 0.28)',
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </LightboxContext.Provider>
  );
}
