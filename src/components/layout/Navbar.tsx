'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  const isCaseStudy = pathname?.startsWith('/case-study/');
  const displayActiveSection = isCaseStudy ? 'work' : activeSection;

  useEffect(() => {
    setNavVisible(true);
    lastScrollY.current = 0;
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 40);

      if (isCaseStudy) {
        // Only start hiding after 150px; require 12px downward delta to hide,
        // any 5px upward movement to show — prevents jitter on small bumps
        if (currentScrollY > 150) {
          if (currentScrollY > lastScrollY.current + 12) {
            setNavVisible(false);
          } else if (currentScrollY < lastScrollY.current - 5) {
            setNavVisible(true);
          }
        } else {
          setNavVisible(true);
        }
      } else {
        const sections = ['home', 'work', 'about', 'contact'];
        for (const section of [...sections].reverse()) {
          const el = document.getElementById(section);
          if (el && currentScrollY >= el.offsetTop - 120) {
            setActiveSection(section);
            break;
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCaseStudy]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);

    if (isCaseStudy) {
      // Navigate to homepage and let HashScrollHandler scroll to the section
      router.push(`/${href}`, { scroll: false });
      return;
    }

    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease, opacity 0.4s ease',
        backgroundColor: scrolled ? 'rgba(245, 240, 232, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #D4C9B8' : '1px solid transparent',
        opacity: isCaseStudy && !navVisible ? 0 : 1,
        pointerEvents: isCaseStudy && !navVisible ? 'none' : 'auto',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          style={{
            color: 'var(--text-primary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 62.78 30.54"
            height="18"
            fill="currentColor"
          >
            <path d="M2.12,0h8.46a2.12,2.12,0,0,1,1.5.62L29.92,18.47a2.12,2.12,0,0,1,.62,1.5v8.45a2.12,2.12,0,0,1-2.12,2.12H2.12A2.12,2.12,0,0,1,0,28.42V21.21a2.12,2.12,0,0,1,2.12-2.12H9.54a2.12,2.12,0,0,1,2.13,2.12v5.52H22.91L.62,4.44A2.12,2.12,0,0,1,0,2.94V2.12A2.12,2.12,0,0,1,2.12,0Z"/>
            <path d="M43.91,14.44,33.09,3.82H43.48V9.33a2.12,2.12,0,0,0,2.12,2.12H53a2.12,2.12,0,0,0,2.12-2.12V2.12A2.12,2.12,0,0,0,53,0H26.94a2.12,2.12,0,0,0-2.12,2.12V9.73a2.12,2.12,0,0,0,.62,1.5l6.39,6.39a2.12,2.12,0,0,1,.62,1.5v9.3a2.12,2.12,0,0,0,2.12,2.12H60.66a2.12,2.12,0,0,0,2.12-2.12V21.21a2.12,2.12,0,0,0-2.12-2.12H53.24a2.12,2.12,0,0,0-2.12,2.12v5.52H44.54V16A2.13,2.13,0,0,0,43.91,14.44Z"/>
          </svg>
        </button>

        {/* Desktop Nav Links */}
        <ul
          style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            alignItems: 'center',
          }}
          className="nav-desktop-links"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  color: displayActiveSection === link.href.replace('#', '')
                    ? 'var(--accent)'
                    : 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  paddingBottom: '4px',
                  textTransform: 'uppercase',
                }}
              >
                {link.label}
                {displayActiveSection === link.href.replace('#', '') && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'var(--accent)',
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '11px',
            margin: '-11px',
          }}
          className="nav-mobile-btn"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--text-primary)',
                display: 'block',
                transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 1 ? 'opacity: 0'
                  : 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: 'rgba(245, 240, 232, 0.98)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid var(--border)',
            padding: '1.5rem 2rem 2rem',
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border-light)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}