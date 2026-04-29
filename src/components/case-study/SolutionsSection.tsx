import type { PortableTextBlock } from '@portabletext/types';
import RichTextSection from './RichTextSection';

interface Metric {
  value: string;
  label: string;
}

interface SolutionsSectionProps {
  contentType?: string | null;
  richText?: PortableTextBlock[] | null;
  solutionDescription?: string | null;
  metrics?: Metric[] | null;
}

export default function SolutionsSection({
  contentType,
  richText,
  solutionDescription,
  metrics,
}: SolutionsSectionProps) {
  const metricsList = metrics ?? [];

  const sectionShell = (content: React.ReactNode) => (
    <section
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '5rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="section-label">Solution</p>
        <div className="divider" />
        {content}
      </div>
    </section>
  );

  if (contentType === 'richText') {
    if (!richText && metricsList.length === 0) return null;
    return sectionShell(
      <div className={metricsList.length > 0 ? 'cs-two-col-wide' : ''}>
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 500,
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            The Solution
          </h2>
          {richText && <RichTextSection value={richText} />}
        </div>
        {metricsList.length > 0 && <MetricCards metrics={metricsList} />}
      </div>
    );
  }

  if (!solutionDescription) return null;

  return sectionShell(
    <div className={metricsList.length > 0 ? 'cs-two-col-wide' : ''}>
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 500,
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}
        >
          The Solution
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          {solutionDescription}
        </p>
      </div>
      {metricsList.length > 0 && <MetricCards metrics={metricsList} />}
    </div>
  );
}

function MetricCards({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <div>
      <p
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          fontWeight: 500,
          marginBottom: '1.5rem',
        }}
      >
        Success Metrics
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {metrics.map((metric, i) => (
          <div
            key={i}
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '3px',
              borderLeft: '3px solid var(--accent)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 500,
                color: 'var(--accent)',
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              {metric.value}
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
