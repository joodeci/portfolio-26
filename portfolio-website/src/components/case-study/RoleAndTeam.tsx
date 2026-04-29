interface RoleAndTeamProps {
  myRole?: string | null;
  team?: string[] | null;
  duration?: string | null;
  tools?: string[] | null;
}

export default function RoleAndTeam({ myRole, team, duration, tools }: RoleAndTeamProps) {
  const teamList = team ?? [];
  const toolsList = tools ?? [];
  if (!myRole && !duration && teamList.length === 0 && toolsList.length === 0) return null;

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        padding: '3.5rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {myRole && (
          <div>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>My Role</p>
            <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 400 }}>
              {myRole}
            </p>
          </div>
        )}

        {teamList.length > 0 && (
          <div>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>Team</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {teamList.map((member, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {member}
                </li>
              ))}
            </ul>
          </div>
        )}

        {duration && (
          <div>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>Duration</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{duration}</p>
          </div>
        )}

        {toolsList.length > 0 && (
          <div>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>Tools Used</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {toolsList.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    padding: '3px 10px',
                    backgroundColor: 'var(--bg-elevated)',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
