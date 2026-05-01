import type { PortableTextBlock } from '@portabletext/types';
import RichTextSection from './RichTextSection';

interface ProcessStep {
  phase: string;
  description: string;
  activities?: string[] | null;
}

interface ProcessSectionProps {
  contentType?: string | null;
  richText?: PortableTextBlock[] | null;
  steps?: ProcessStep[] | null;
}

export default function ProcessSection({ contentType, richText, steps }: ProcessSectionProps) {
  if (contentType === 'richText') {
    if (!richText || richText.length === 0) return null;
    return (
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <p className="section-label">Work Process</p>
        <div className="divider" />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 500,
            marginBottom: '2rem',
            maxWidth: '600px',
          }}
        >
          How I approached this challenge
        </h2>
        <RichTextSection value={richText} />
      </section>
    );
  }

  if (!steps || steps.length === 0) return null;

  return (
    <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <p className="section-label">Work Process</p>
      <div className="divider" />
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontWeight: 500,
          marginBottom: '3.5rem',
          maxWidth: '600px',
        }}
      >
        How I approached this challenge
      </h2>

      {steps.length === 1 ? (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '3px',
            padding: '1.5rem',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            {steps[0].phase}
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: steps[0].activities && steps[0].activities.length > 0 ? '1rem' : '0',
            }}
          >
            {steps[0].description}
          </p>
          {steps[0].activities && steps[0].activities.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {steps[0].activities.map((activity) => (
                <span
                  key={activity}
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '2px',
                    padding: '3px 8px',
                    backgroundColor: 'var(--bg-elevated)',
                  }}
                >
                  {activity}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
          {/* Vertical timeline line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '19px',
              width: '1px',
              backgroundColor: 'var(--border)',
            }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '1.5rem',
                paddingBottom: i < steps.length - 1 ? '1.5rem' : '0',
                position: 'relative',
              }}
            >
              {/* Numbered dot */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    color: 'var(--accent)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Step card */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '3px',
                  padding: '1.5rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {step.phase}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    marginBottom: step.activities && step.activities.length > 0 ? '1rem' : '0',
                  }}
                >
                  {step.description}
                </p>
                {step.activities && step.activities.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {step.activities.map((activity) => (
                      <span
                        key={activity}
                        style={{
                          fontSize: '0.7rem',
                          letterSpacing: '0.08em',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-light)',
                          borderRadius: '2px',
                          padding: '3px 8px',
                          backgroundColor: 'var(--bg-elevated)',
                        }}
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
