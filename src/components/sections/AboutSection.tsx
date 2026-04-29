import SectionWrapper from '@/components/ui/SectionWrapper';

const skills = [
  { category: 'UX Design', items: ['User Research', 'Information Architecture', 'Wireframing', 'Prototyping', 'Usability Testing'] },
  { category: 'UI Design', items: ['Visual Design', 'Design Systems', 'Figma', 'Typography', 'Interaction Design'] },
  { category: 'Domain', items: ['E-Commerce', 'FinTech / Finance', 'Graphic Design', 'Brand Identity', 'Design Strategy'] },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Left — About text */}
        <div>
          <p className="section-label">About Me</p>
          <div className="divider" />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 500,
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Designing at the intersection of logic and craft
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
            }}
          >
            <p>
              I&apos;m a Senior UX/UI Designer with over 10 years of experience helping 
              companies build digital products that people actually want to use. 
              My career has been shaped by three industries: e-commerce, finance, 
              and graphic design — each teaching me to balance aesthetic sensibility 
              with rigorous systems thinking.
            </p>
            <p>
              I believe great design is invisible. When it works, you don&apos;t notice it — 
              you simply feel clarity, ease, and confidence. That&apos;s the experience 
              I design towards.
            </p>
            <p>
              Currently based in Vancouver, BC. Open to full-time roles, contract 
              work, and select consulting engagements.
            </p>
          </div>

          {/* Current role pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: '12px 18px',
              marginTop: '2rem',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '2px',
                }}
              >
                Current Position
              </p>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                }}
              >
                Senior UX/UI Designer — Your Company
              </p>
            </div>
          </div>
        </div>

        {/* Right — Skills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <p
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  fontWeight: 500,
                  marginBottom: '0.75rem',
                }}
              >
                {skillGroup.category}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '2px',
                      padding: '5px 12px',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}