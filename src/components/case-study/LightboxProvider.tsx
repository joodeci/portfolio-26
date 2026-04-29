'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

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
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isGesturing, setIsGesturing] = useState(false);

  const imgContainerRef = useRef<HTMLDivElement>(null);

  // Live ref so event handlers always read current values without stale closures
  const live = useRef({ scale: 1, offset: { x: 0, y: 0 } });
  live.current = { scale, offset };

  // All gesture tracking in a single ref — no renders for intermediate gesture state
  const g = useRef({
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartOX: 0,
    dragStartOY: 0,
    dragMoved: false,
    hadPinch: false,   // true if the current touch interaction included a pinch
    isPinching: false,
    pinchStartDist: 0,
    pinchStartScale: 1,
  });

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

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
      resetZoom();
    }
  }, [resetZoom]);

  const close = useCallback(() => {
    setIsOpen(false);
    resetZoom();
  }, [resetZoom]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  // Keyboard: ESC resets zoom first, then closes; arrows only when not zoomed
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (live.current.scale > 1) resetZoom();
        else close();
      }
      if (e.key === 'ArrowRight' && live.current.scale === 1) next();
      if (e.key === 'ArrowLeft' && live.current.scale === 1) prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close, next, prev, resetZoom]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Global mouse move/up so drag works even when cursor leaves the image
  useEffect(() => {
    if (!isOpen) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!g.current.isDragging) return;
      const dx = e.clientX - g.current.dragStartX;
      const dy = e.clientY - g.current.dragStartY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) g.current.dragMoved = true;
      if (live.current.scale > 1) {
        setOffset({ x: g.current.dragStartOX + dx, y: g.current.dragStartOY + dy });
      }
    };

    const onMouseUp = () => {
      if (!g.current.isDragging) return;
      g.current.isDragging = false;
      setIsGesturing(false);
      if (!g.current.dragMoved) {
        if (live.current.scale > 1) resetZoom();
        else setScale(2);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isOpen, resetZoom]);

  // Touch events attached directly so touchmove can call preventDefault (pinch suppression)
  useEffect(() => {
    if (!isOpen) return;
    const el = imgContainerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        g.current.isPinching = true;
        g.current.hadPinch = true;
        g.current.isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        g.current.pinchStartDist = Math.sqrt(dx * dx + dy * dy);
        g.current.pinchStartScale = live.current.scale;
        setIsGesturing(true);
      } else if (e.touches.length === 1) {
        if (!g.current.isPinching) g.current.hadPinch = false;
        g.current.isDragging = true;
        g.current.dragStartX = e.touches[0].clientX;
        g.current.dragStartY = e.touches[0].clientY;
        g.current.dragStartOX = live.current.offset.x;
        g.current.dragStartOY = live.current.offset.y;
        g.current.dragMoved = false;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && g.current.isPinching) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const newScale = Math.min(4, Math.max(1, g.current.pinchStartScale * (dist / g.current.pinchStartDist)));
        setScale(newScale);
        if (newScale <= 1) setOffset({ x: 0, y: 0 });
      } else if (e.touches.length === 1 && g.current.isDragging && live.current.scale > 1) {
        e.preventDefault();
        const dx = e.touches[0].clientX - g.current.dragStartX;
        const dy = e.touches[0].clientY - g.current.dragStartY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) g.current.dragMoved = true;
        setOffset({ x: g.current.dragStartOX + dx, y: g.current.dragStartOY + dy });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 1 && g.current.isPinching) {
        // One finger lifted mid-pinch — transition to pan with remaining finger
        g.current.isPinching = false;
        g.current.isDragging = true;
        g.current.dragStartX = e.touches[0].clientX;
        g.current.dragStartY = e.touches[0].clientY;
        g.current.dragStartOX = live.current.offset.x;
        g.current.dragStartOY = live.current.offset.y;
        g.current.dragMoved = false;
        return;
      }

      if (e.touches.length === 0) {
        const wasDragging = g.current.isDragging;
        const moved = g.current.dragMoved;
        const hadPinch = g.current.hadPinch;
        g.current.isPinching = false;
        g.current.isDragging = false;
        g.current.hadPinch = false;
        setIsGesturing(false);
        // Only treat as a tap if no drag movement and no pinch was involved
        if (wasDragging && !moved && !hadPinch) {
          if (live.current.scale > 1) resetZoom();
          else setScale(2);
        }
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [isOpen, resetZoom]);

  const current = images[currentIndex];
  const cursor = isGesturing ? 'grabbing' : scale > 1 ? 'grab' : 'zoom-in';

  return (
    <LightboxContext.Provider value={{ openByUrl }}>
      {children}

      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => { if (live.current.scale > 1) resetZoom(); else close(); }}
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
            onClick={(e) => { e.stopPropagation(); close(); }}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.5rem',
              zIndex: 1,
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
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
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
            ref={imgContainerRef}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => {
              e.preventDefault();
              g.current.isDragging = true;
              g.current.dragStartX = e.clientX;
              g.current.dragStartY = e.clientY;
              g.current.dragStartOX = live.current.offset.x;
              g.current.dragStartOY = live.current.offset.y;
              g.current.dragMoved = false;
              setIsGesturing(true);
            }}
            onWheel={(e) => {
              const delta = e.deltaY < 0 ? 0.3 : -0.3;
              setScale((prev) => {
                const next = Math.min(4, Math.max(1, prev + delta));
                if (next <= 1) setOffset({ x: 0, y: 0 });
                return next;
              });
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 'calc(100vw - 10rem)',
              maxHeight: 'calc(100vh - 8rem)',
              cursor,
              userSelect: 'none',
              WebkitUserSelect: 'none',
              touchAction: 'none',
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
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                transition: isGesturing ? 'none' : 'transform 0.2s ease',
                willChange: 'transform',
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
                  transition: isGesturing ? 'none' : 'opacity 0.2s',
                  opacity: scale > 1 ? 0 : 1,
                  pointerEvents: 'none',
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
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
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
