import { useState, useEffect } from 'react';
import { useRouter, type PageRoute } from '../context/RouterContext';

interface NavbarProps {
  onOpenSampleKit: () => void;
}

export const Navbar = ({ onOpenSampleKit }: NavbarProps) => {
  const { currentPage, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageRoute; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Products' },
    { id: 'calculator', label: 'Instant Pricing' },
    { id: 'proofing', label: '3D Proofing' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(10, 12, 16, 0.96)' : 'rgba(10, 12, 16, 0.90)',
        backdropFilter: 'blur(18px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-gold)' : 'var(--border-subtle)'}`,
        transition: 'all 0.3s ease',
        padding: scrolled ? '10px 0' : '15px 0',
        width: '100%'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        {/* Brand Crest */}
        <div 
          onClick={() => navigate('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}
        >
          <div
            className="navbar-brand-logo"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2a2210 0%, #151821 100%)',
              border: '1px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(207, 168, 78, 0.25)',
              flexShrink: 0
            }}
          >
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--accent-gold-bright)', fontWeight: 800 }}>
              AA
            </span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap' }}>
              <span className="navbar-brand-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.03em', color: '#fff', whiteSpace: 'nowrap' }}>
                AMAZING ADS
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--accent-gold)', letterSpacing: '0.08em', fontWeight: 700, whiteSpace: 'nowrap' }}>
                SIVAKASI
              </span>
            </div>
            <p className="navbar-brand-sub" style={{ fontSize: '0.64rem', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Gold Foil & Calendar Press Works
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`nav-link-btn ${currentPage === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'none',
              padding: '8px 10px',
              transition: 'background 0.2s'
            }}
            aria-label="Toggle navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-drawer"
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-gold)',
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
            animation: 'slideDownMobile 0.25s ease'
          }}
        >
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => { navigate(item.id); setMobileMenuOpen(false); }} 
              className={`nav-link-btn ${currentPage === item.id ? 'active' : ''}`}
              style={{ textAlign: 'left', width: '100%', padding: '12px 14px', fontSize: '0.92rem' }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
            <a
              href="https://wa.me/919790472767?text=Hello%20Amazing%20Ads%20Sivakasi,%20I%20want%20to%20order%20calendars"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#fff',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              💬 WhatsApp: +91 97904 72767
            </a>
            <button 
              onClick={() => { onOpenSampleKit(); setMobileMenuOpen(false); }} 
              className="btn-gold" 
              style={{ width: '100%', padding: '12px' }}
            >
              Request Free Swatch Kit
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDownMobile {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1040px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (max-width: 480px) {
          .navbar-brand-title {
            font-size: 1rem !important;
          }
          .navbar-brand-sub {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
