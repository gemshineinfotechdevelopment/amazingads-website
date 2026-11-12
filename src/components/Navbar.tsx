import { useState, useEffect } from 'react';
import { getBackendHealth } from '../services/api';
import { useRouter, type PageRoute } from '../context/RouterContext';

interface NavbarProps {
  onOpenSampleKit: () => void;
}

export const Navbar = ({ onOpenSampleKit }: NavbarProps) => {
  const { currentPage, navigate } = useRouter();
  const [backendStatus, setBackendStatus] = useState<{ online: boolean; port?: number | string }>({
    online: false
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check backend connection
    getBackendHealth()
      .then((data) => {
        setBackendStatus({ online: true, port: data.port });
      })
      .catch(() => {
        setBackendStatus({ online: false });
      });

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageRoute; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'collections', label: 'Products' },
    { id: 'proofing', label: 'Virtual Proofing' },
    { id: 'corporate', label: 'Corporate Bulk' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(10, 12, 16, 0.96)' : 'rgba(10, 12, 16, 0.88)',
        backdropFilter: 'blur(18px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-gold)' : 'var(--border-subtle)'}`,
        transition: 'all 0.3s ease',
        padding: scrolled ? '12px 0' : '18px 0',
        width: '100%'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Crest */}
        <div 
          onClick={() => navigate('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2a2210 0%, #151821 100%)',
              border: '1px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(207, 168, 78, 0.25)'
            }}
          >
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--accent-gold-bright)', fontWeight: 800 }}>
              AA
            </span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.04em', color: '#fff' }}>
                AMAZING ADS
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', letterSpacing: '0.08em', fontWeight: 700 }}>
                SIVAKASI
              </span>
            </div>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '1px' }}>
              Gold Foil & Calendar Manufacturing Hub
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

        {/* Action Controls & Backend Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Live Engine Status Indicator */}
          <div
            title={backendStatus.online ? `Press Backend Engine online on port ${backendStatus.port}` : 'Backend offline or connecting'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: backendStatus.online ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${backendStatus.online ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              padding: '5px 12px',
              borderRadius: '20px',
              fontSize: '0.72rem',
              fontWeight: 500
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: backendStatus.online ? '#10b981' : '#ef4444',
                boxShadow: backendStatus.online ? '0 0 8px #10b981' : 'none'
              }}
            />
            <span style={{ color: backendStatus.online ? '#34d399' : '#f87171' }}>
              {backendStatus.online ? `Press Engine :${backendStatus.port}` : 'Press Offline'}
            </span>
          </div>

          {/* Sample Kit Order Button */}
          <button
            onClick={onOpenSampleKit}
            className="btn-outline-gold"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            Free Swatch Kit
          </button>

          {/* Instant Quote CTA */}
          <button
            onClick={() => navigate('calculator')}
            className="btn-gold"
            style={{ padding: '9px 18px', fontSize: '0.82rem' }}
          >
            Instant Quote
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'none',
              padding: '6px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => { navigate(item.id); setMobileMenuOpen(false); }} 
              className={`nav-link-btn ${currentPage === item.id ? 'active' : ''}`}
              style={{ textAlign: 'left', width: '100%' }}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => { onOpenSampleKit(); setMobileMenuOpen(false); }} 
            className="btn-gold" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            Request Master Swatch Kit
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 1040px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};
