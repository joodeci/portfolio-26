import RichTextSection from './RichTextSection';

interface ProblemAndGoalsProps {
  contentType?: string | null;
  richText?: any[] | null;
  problem?: string | null;
  constraints?: string[] | null;
  goals?: string[] | null;
}

export default function ProblemAndGoals({
  contentType,
  richText,
  problem,
  constraints,
  goals,
}: ProblemAndGoalsProps) {
  const constraintsList = constraints ?? [];
  const goalsList = goals ?? [];

  if (contentType === 'richText') {
    if (!richText || richText.length === 0) return null;
    return (
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <p className="section-label">The Problem</p>
        <div className="divider" />
        <RichTextSection value={richText} />
      </section>
    );
  }

  if (!problem && constraintsList.length === 0 && goalsList.length === 0) return null;

  const hasGoals = goalsList.length > 0;

  return (
    <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div
        className={hasGoals ? 'cs-two-col' : ''}
        style={!hasGoals ? { maxWidth: '640px' } : undefined}
      >
        {problem && (
          <div>
            <p className="section-label">The Problem</p>
            <div className="divider" />
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: constraintsList.length > 0 ? '2.5rem' : '0',
              }}
            >
              {problem}
            </p>

            {constraintsList.length > 0 && (
              <>
                <p
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    fontWeight: 500,
                    marginBottom: '1rem',
                  }}
                >
                  Constraints
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {constraintsList.map((constraint, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>—</span>
                      {constraint}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {hasGoals && (
          <div>
            <p className="section-label">Project Goals</p>
            <div className="divider" />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {goalsList.map((goal, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    padding: '1rem 1.25rem',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '3px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: 'var(--accent)',
                      flexShrink: 0,
                      width: '20px',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {goal}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
