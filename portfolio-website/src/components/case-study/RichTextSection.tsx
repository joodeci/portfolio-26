'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import { useLightbox } from './LightboxProvider';

export default function RichTextSection({ value }: { value: any[] }) {
  const { openByUrl } = useLightbox();

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: '1.25rem',
          }}
        >
          {children}
        </p>
      ),
      h3: ({ children }) => (
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            marginTop: '2.5rem',
            marginBottom: '0.75rem',
          }}
        >
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            marginTop: '1.75rem',
            marginBottom: '0.5rem',
          }}
        >
          {children}
        </h4>
      ),
    },
    types: {
      image: ({ value: img }: any) => {
        if (!img?.asset) return null;
        const src = urlFor(img).width(1600).url();
        return (
          <figure style={{ margin: '2rem 0' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={img.alt ?? ''}
              data-lb-url={src}
              data-lb-alt={img.alt ?? ''}
              data-lb-caption={img.caption ?? ''}
              onClick={() => openByUrl(src)}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '3px',
                display: 'block',
                cursor: 'zoom-in',
              }}
            />
            {img.caption && (
              <figcaption
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  marginTop: '0.5rem',
                  letterSpacing: '0.04em',
                }}
              >
                {img.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
    marks: {
      strong: ({ children }) => (
        <strong style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{children}</strong>
      ),
      em: ({ children }) => (
        <em style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>{children}</em>
      ),
      link: ({ value: link, children }) => (
        <a
          href={link?.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--accent)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          {children}
        </a>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li
          style={{
            display: 'flex',
            gap: '0.75rem',
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            alignItems: 'flex-start',
          }}
        >
          <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '4px' }}>—</span>
          <span>{children}</span>
        </li>
      ),
      number: ({ children }) => (
        <li
          style={{
            display: 'flex',
            gap: '0.75rem',
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              color: 'var(--accent)',
              flexShrink: 0,
              marginTop: '4px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
            }}
          >
            —
          </span>
          <span>{children}</span>
        </li>
      ),
    },
  };

  if (!value || value.length === 0) return null;
  return (
    <div>
      <PortableText value={value} components={components} />
    </div>
  );
}
