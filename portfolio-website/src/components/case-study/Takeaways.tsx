import RichTextSection from './RichTextSection';

interface Takeaway {
  title: string;
  description: string;
}

interface TakeawaysProps {
  contentType?: string | null;
  richText?: any[] | null;
  takeaways?: Takeaway[] | null;
}

export default function Takeaways({ contentType, richText, takeaways }: TakeawaysProps) {
  const sectionShell = (content: React.ReactNode) => (
    <section
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border)',
        padding: '5rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="section-label">Reflections</p>
        <div className="divider" />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 500,
            marginBottom: '3rem',
          }}
        >
          Key Takeaways
        </h2>
        {content}
      </div>
    </section>
  );

  if (contentType === 'richText') {
    if (!richText || richText.length === 0) return null;
    return sectionShell(<RichTextSection value={richText} />);
  }

  const takeawaysList = takeaways ?? [];
  if (takeawaysList.length === 0) return null;

  return sectionShell(
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {takeawaysList.map((takeaway, i) => (
        <div
          key={i}
          style={{
            padding: '2rem',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '3px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Large number decoration */}
          <span
            style={{
              position: 'absolute',
              top: '-10px',
              right: '16px',
              fontFamily: 'var(--font-display)',
              fontSize: '5rem',
              fontWeight: 700,
              color: 'var(--border)',
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
              lineHeight: 1.3,
              position: 'relative',
            }}
          >
            {takeaway.title}
          </h3>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              position: 'relative',
            }}
          >
            {takeaway.description}
          </p>
        </div>
      ))}
    </div>
  );
}
