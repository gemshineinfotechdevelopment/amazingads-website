import { useState, useEffect } from 'react';
import { useRouter, type PageRoute } from '../context/RouterContext';
import { getStoredFactorySettings, type FactorySettings } from '../services/api';

interface NavbarProps {
  onOpenSampleKit: () => void;
}

export const Navbar = ({ onOpenSampleKit }: NavbarProps) => {
  const { currentPage, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandSettings, setBrandSettings] = useState<FactorySettings>(getStoredFactorySettings());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleSettingsUpdate = (e: Event) => {
      const custom = e as CustomEvent<FactorySettings>;
      if (custom.detail) {
        setBrandSettings(custom.detail);
      } else {
        setBrandSettings(getStoredFactorySettings());
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('factory-settings-updated', handleSettingsUpdate);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('factory-settings-updated', handleSettingsUpdate);
    };
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
          {brandSettings.logoUrl && (
            <img
              src={brandSettings.logoUrl}
              alt="Brand Logo"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                objectFit: 'contain',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '2px',
                border: '1px solid var(--accent-gold)',
                boxShadow: '0 0 15px rgba(207, 168, 78, 0.25)',
                flexShrink: 0
              }}
            />
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
              <span className="navbar-brand-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.03em', color: '#fff', whiteSpace: 'nowrap' }}>
                {brandSettings.factoryName || 'AMAZING ADS'}
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--accent-gold)', letterSpacing: '0.08em', fontWeight: 700, background: 'rgba(207, 168, 78, 0.1)', padding: '1px 6px', borderRadius: '4px', border: '1px solid rgba(207, 168, 78, 0.3)', whiteSpace: 'nowrap' }}>
                SIVAKASI
              </span>
            </div>
            <p className="navbar-tagline navbar-brand-sub" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {brandSettings.tagline || 'Gold Foil & Calendar Manufacturing Hub'}
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

        {/* Mobile Menu Toggle Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: mobileMenuOpen ? 'rgba(207, 168, 78, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${mobileMenuOpen ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
              borderRadius: '8px',
              color: mobileMenuOpen ? 'var(--accent-gold-bright)' : 'var(--text-primary)',
              cursor: 'pointer',
              display: 'none',
              padding: '8px 10px',
              transition: 'all 0.2s ease'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-drawer"
          style={{
            background: 'rgba(13, 16, 22, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border-gold)',
            padding: '16px 18px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.9)',
            animation: 'slideDownMobile 0.25s ease'
          }}
        >
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => { navigate(item.id); setMobileMenuOpen(false); }} 
              className={`nav-link-btn ${currentPage === item.id ? 'active' : ''}`}
              style={{
                textAlign: 'left',
                width: '100%',
                padding: '12px 16px',
                fontSize: '0.95rem',
                borderRadius: '8px'
              }}
            >
              {item.label}
            </button>
          ))}

          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <a
              href={`tel:${(brandSettings.phone || '+919790472767').replace(/[^0-9+]/g, '')}`}
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: '8px',
                background: 'rgba(207, 168, 78, 0.12)',
                border: '1px solid var(--border-gold)',
                color: 'var(--accent-gold-bright)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              📞 Call Factory
            </a>
            <a
              href={`https://wa.me/${(brandSettings.whatsapp || '919790472767').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Amazing Ads Sivakasi, I would like to get a calendar quote')}`}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: '8px',
                background: '#25D366',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              💬 WhatsApp
            </a>
          </div>

          <button 
            onClick={() => { onOpenSampleKit(); setMobileMenuOpen(false); }} 
            className="btn-gold" 
            style={{ width: '100%', marginTop: '6px', padding: '13px' }}
          >
            Request Master Swatch Kit →
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideDownMobile {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1040px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; align-items: center; justify-content: center; }
        }
        @media (max-width: 480px) {
          .navbar-tagline { display: none; }
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
