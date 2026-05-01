'use client';

import Link from 'next/link';
import Image from 'next/image';

interface WorkCardProps {
  title: string;
  description: string;
  category: string;
  year: string;
  coverImage?: string;
  slug: string;
  tags?: string[];
}

export default function WorkCard({
  title,
  description,
  category,
  year,
  coverImage,
  slug,
  tags = [],
}: WorkCardProps) {
  return (
    <Link href={`/case-study/${slug}`}>
      <article
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(44, 36, 22, 0.08)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Cover Image */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            aspectRatio: '16/9',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--bg-elevated) 0%, var(--cream-400) 100%)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  color: 'var(--accent)',
                  opacity: 0.4,
                  fontStyle: 'italic',
                }}
              >
                {title.charAt(0)}
              </span>
            </div>
          )}
          {/* Category pill */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: 'rgba(245, 240, 232, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: '4px 10px',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}
          >
            {category}
          </div>
        </div>

        {/* Card Content */}
        <div
          style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
              }}
            >
              {title}
            </h3>
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              {year}
            </span>
          </div>

          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', paddingTop: '0.5rem' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '2px',
                    padding: '3px 8px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Read more arrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '0.5rem',
              color: 'var(--accent)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            View Case Study
            <span style={{ transition: 'transform 0.2s ease' }}>→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}