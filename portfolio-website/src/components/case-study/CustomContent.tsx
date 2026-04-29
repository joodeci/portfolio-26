import RichTextSection from './RichTextSection';

interface CustomContentProps {
  heading?: string | null;
  richText?: any[] | null;
}

export default function CustomContent({ heading, richText }: CustomContentProps) {
  if (!richText || richText.length === 0) return null;

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border)',
        padding: '5rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {heading && (
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 500,
              marginBottom: '2rem',
            }}
          >
            {heading}
          </h2>
        )}
        <RichTextSection value={richText} />
      </div>
    </section>
  );
}
