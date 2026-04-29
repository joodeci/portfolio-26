export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        padding: '2.5rem 2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: 'var(--accent)',
            marginBottom: '0.5rem',
            fontStyle: 'italic',
          }}
        >
          Built with Next.js, Sanity, and a bit of magic.
        </p>
        <p
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          © {year} Jodeci Correa portfolio
        </p>
      </div>
    </footer>
  );
}