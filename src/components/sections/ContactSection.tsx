'use client';

import SectionWrapper from '@/components/ui/SectionWrapper';

export default function ContactSection() {
  return (
    <div
      id="contact"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <SectionWrapper id="contact-content">
        <div style={{ maxWidth: '700px' }}>
          <p className="section-label">E.T Phone Home...</p>
          <div className="divider" />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 500,
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            Interested in working together? Catch me online
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.8,
              marginBottom: '3rem',
            }}
          >
            I&apos;m open to new opportunities, collaborations, and conversations. 
            Whether you have a project in mind or just want to connect — 
            my inbox is always open.
          </p>

          {/* Contact options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="mailto:jodecic@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '3px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, background-color 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--bg-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--bg-surface)';
              }}
            >
              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                  Email
                </p>
              </div>
              <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>→</span>
            </a>

            <a
              href="https://www.linkedin.com/in/jodecic/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '3px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--bg-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--bg-surface)';
              }}
            >
              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                  LinkedIn
                </p>
              </div>
              <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>→</span>
            </a>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}