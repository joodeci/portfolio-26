'use client';

import { useLightbox } from './LightboxProvider';

interface GalleryImage {
  url: string;
  caption?: string;
  alt?: string;
}

export default function CaseStudyGallery({ images }: { images: GalleryImage[] }) {
  const { openByUrl } = useLightbox();

  if (!images || images.length === 0) return null;

  const isMulti = images.length > 1;
  const isOdd = images.length % 2 !== 0;

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '5rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="section-label" style={{ marginBottom: '0.75rem' }}>
          Visual Documentation
        </p>
        <div className="divider" />

        <div
          className={isMulti ? 'cs-gallery-grid' : 'cs-gallery-single'}
          style={{ marginTop: '2rem' }}
        >
          {images.map((image, index) => {
            const isLastOdd = isMulti && isOdd && index === images.length - 1;
            return (
            <figure
              key={index}
              style={{ margin: 0, ...(isLastOdd ? { gridColumn: '1 / -1' } : {}) }}
            >
              <div
                style={{
                  borderRadius: '3px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  cursor: 'zoom-in',
                }}
                onClick={() => openByUrl(image.url)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.alt || `Project image ${index + 1}`}
                  data-lb-url={image.url}
                  data-lb-alt={image.alt || `Project image ${index + 1}`}
                  data-lb-caption={image.caption || ''}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              {image.caption && (
                <figcaption
                  style={{
                    marginTop: '0.75rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    paddingLeft: '0.75rem',
                    borderLeft: '2px solid var(--border)',
                  }}
                >
                  {image.caption}
                </figcaption>
              )}
            </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
