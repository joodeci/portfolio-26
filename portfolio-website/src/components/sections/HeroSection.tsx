'use client';

import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background element */}
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
          position: 'absolute',
          bottom: '10%',
          left: '-8%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 115, 85, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Vertical line accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '2rem',
          width: '1px',
          backgroundColor: 'var(--border-light)',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '8rem 2rem 4rem',
          width: '100%',
        }}
      >
        {/* Status badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '2px',
            padding: '6px 14px',
            marginBottom: '3rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#7B9E7B',
              display: 'block',
              animation: 'pulse 2s infinite',
            }}
          />
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}
          >
            Available for new projects
          </span>
        </div>

        {/* Intro label */}
        <p
          className="section-label"
          style={{
            marginBottom: '1rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateX(0)' : 'translateX(-16px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          Hello there!
        </p>

        {/* Name */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
          }}
        >
          I'm Jodeci Correa
          <span style={{ color: 'var(--accent)' }}>.</span>
        </h1>

        {/* Title / Role */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--accent)',
            marginBottom: '2.5rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s',
          }}
        >
          Senior UX/UI Designer &amp; Human Being
        </h2>

        {/* Bio */}
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '620px',
            lineHeight: 1.8,
            marginBottom: '3.5rem',
            fontWeight: 300,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s',
          }}
        >
          I&apos;ve spent the last <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>10 years</strong> designing 
          digital experiences that balance clarity with craft. My work spans e-commerce platforms, 
          financial tools, and brand identity — always rooted in empathy, systems thinking, 
          and a commitment to purposeful simplicity.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s',
          }}
        >
          {[
            { number: '10+', label: 'Years of Experience' },
            { number: '40+', label: 'Projects Shipped' },
            { number: '3', label: 'Industry Specialisms' },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {stat.number}
              </p>
              <p
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.7s ease 0.75s',
          }}
        >
          <button
            onClick={() => {
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              borderRadius: '2px',
              padding: '14px 28px',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--text-primary)';
            }}
          >
            View My Work
          </button>
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: '14px 28px',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
            }}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}