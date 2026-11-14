import { useState, useEffect, type CSSProperties } from 'react';
import { useRouter } from '../context/RouterContext';
import { getStoredFactorySettings, type FactorySettings } from '../services/api';

interface FooterProps {
  onOpenSampleKit: () => void;
}

export const Footer = ({ onOpenSampleKit }: FooterProps) => {
  const { navigate } = useRouter();
  const [settings, setSettings] = useState<FactorySettings>(getStoredFactorySettings());

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<FactorySettings>;
      if (custom.detail) {
        setSettings(custom.detail);
      } else {
        setSettings(getStoredFactorySettings());
      }
    };
    window.addEventListener('factory-settings-updated', handleUpdate);
    return () => window.removeEventListener('factory-settings-updated', handleUpdate);
  }, []);

  return (
    <footer
      style={{
        background: '#07080b',
        borderTop: '1px solid var(--border-gold)',
        padding: '70px 0 30px',
        position: 'relative',
        width: '100%',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
            gap: '40px',
            marginBottom: '60px'
          }}
          className="footer-grid"
        >
          {/* Column 1: Atelier Crest & Heritage */}
          <div>
            <div 
              onClick={() => navigate('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', cursor: 'pointer' }}
            >
              {settings.logoUrl && (
                <img
                  src={settings.logoUrl}
                  alt="Logo"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    objectFit: 'contain',
                    background: 'rgba(255, 255, 255, 0.08)',
                    padding: '2px',
                    border: '1px solid var(--accent-gold)'
                  }}
                />
              )}
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.04em', color: '#fff' }}>
                AMAZING ADS
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
              India's premier calendar manufacturing and gold foil press works based in <strong>Sivakasi, Tamil Nadu</strong>. Delivering high-precision daily, monthly, and 3D lenticular calendars across India.
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                Sivakasi Print Hub
              </span>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                Est. 2008
              </span>
              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                BNI Certified
              </span>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '18px' }}>
              Products
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><button onClick={() => navigate('collections')} style={footerLinkStyle}>Gold/Silver PET Foil Calendar</button></li>
              <li><button onClick={() => navigate('collections')} style={footerLinkStyle}>Special Products</button></li>
              <li><button onClick={() => navigate('collections')} style={footerLinkStyle}>Custom 5D Calendars</button></li>
              <li><button onClick={() => navigate('collections')} style={footerLinkStyle}>Stone Art Calendars</button></li>
              <li><button onClick={() => navigate('collections')} style={footerLinkStyle}>Promotional Hand Fan</button></li>
            </ul>
          </div>

          {/* Column 3: Atelier Studio Departments */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '18px' }}>
              Press Studio
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><button onClick={() => navigate('about')} style={footerLinkStyle}>About Amazing Ads</button></li>
              <li><button onClick={() => navigate('proofing')} style={footerLinkStyle}>Virtual Proofing Studio</button></li>
              <li><button onClick={() => navigate('corporate')} style={footerLinkStyle}>Corporate Bulk (B2B)</button></li>
              <li><button onClick={() => navigate('calculator')} style={footerLinkStyle}>Quote Configurator</button></li>
              <li><button onClick={() => navigate('contact')} style={footerLinkStyle}>Contact Sivakasi Works</button></li>
              <li><button onClick={onOpenSampleKit} style={footerLinkStyle}>Request Free Swatch Kit</button></li>
            </ul>
          </div>

          {/* Column 4: Sivakasi Factory & Contact */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '18px' }}>
              Factory & Sales Works
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <div>
                <strong style={{ color: '#fff', display: 'block' }}>Sivakasi Manufacturing Hub:</strong>
                <span>{settings.address || '3/1, Vannakara Street, Chairman P.K.S.A. Arumugam Road, Sivakasi 626189, Tamil Nadu'}</span>
              </div>
              <div>
                <strong style={{ color: '#fff', display: 'block' }}>Branch Offices:</strong>
                <span>Chennai & Madurai Corporate Distribution Hubs</span>
              </div>
              <div style={{ marginTop: '4px' }}>
                <strong style={{ color: 'var(--accent-gold-bright)', display: 'block' }}>Direct Factory Hotline & WhatsApp:</strong>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{settings.phone} {settings.secondaryPhone ? `• ${settings.secondaryPhone}` : ''}</span>
              </div>
              <div>
                <span>{settings.email} • {settings.websiteUrl || 'www.amazingads.in'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="footer-bottom-bar"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div>
            © 2008–2027 Amazing Ads Sivakasi (amazingads.in). All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Sivakasi Printing Works</span>
            <span>All-India Transport Delivery</span>
            <span>GST Invoicing</span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Archival Proof Standards</span>
            <span>FSC Supply Chain Cert</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </footer>
  );
};

const footerLinkStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: 0,
  textAlign: 'left',
  transition: 'color 0.2s ease',
  fontSize: '0.85rem'
};
