import Link from 'next/link';
import Image from 'next/image';

interface CaseStudyHeaderProps {
  title: string;
  shortDescription: string;
  category: string;
  year: string;
  client?: string;
  coverImage?: string;
}

export default function CaseStudyHeader({
  title,
  shortDescription,
  category,
  year,
  client,
  coverImage,
}: CaseStudyHeaderProps) {
  return (
    <header
      style={{
        backgroundColor: 'var(--bg-primary)',
        paddingTop: '7rem',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative radial gradient — matches homepage */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196, 168, 130, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem 4rem',
          position: 'relative',
        }}
      >
        <Link href="/#work" className="cs-back-link">
          ← Back to Work
        </Link>

        {/* Meta pills */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 500,
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: '4px 10px',
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: '4px 10px',
            }}
          >
            {year}
          </span>
          {client && (
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '4px 10px',
              }}
            >
              {client}
            </span>
          )}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 500,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: 'var(--text-primary)',
            maxWidth: '800px',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          {shortDescription}
        </p>
      </div>

      {/* Cover image — top corners rounded, flush into the next section */}
      {coverImage && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div
            style={{
              aspectRatio: '21/9',
              borderRadius: '4px 4px 0 0',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid var(--border)',
              borderBottom: 'none',
            }}
          >
            <Image
              src={coverImage}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      )}
    </header>
  );
}
