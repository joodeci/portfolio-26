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
          style={{
            display: 'grid',
            gridTemplateColumns: images.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(480px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
          }}
        >
          {images.map((image, index) => (
            <figure key={index} style={{ margin: 0 }}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
