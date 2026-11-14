import { useState, useEffect } from 'react';
import {
  getStoredFactorySettings,
  getStoredCatalog,
  SIVAKASI_CATALOG,
  getPressStats,
  type FactorySettings,
  type CalendarProduct,
  type PressStats
} from '../services/api';

interface HeroProps {
  onScrollToCustomizer: () => void;
  onOpenSampleKit: () => void;
}

export const Hero = ({ onScrollToCustomizer, onOpenSampleKit }: HeroProps) => {
  const [settings, setSettings] = useState<FactorySettings>(getStoredFactorySettings());
  const [products, setProducts] = useState<CalendarProduct[]>(() => {
    const stored = getStoredCatalog();
    return (stored && stored.length > 0) ? stored : SIVAKASI_CATALOG;
  });
  const [stats, setStats] = useState<PressStats>({
    calendarsPrintedYearToDate: '14,205,000+',
    corporateClientsServed: '4,500+',
    fscCertifiedPaperRatio: '100%',
    onTimeDeliveryRate: '99.8%',
    foilPressTolerances: '0.05 mm',
    establishedYear: 2008,
    pressHQ: 'Sivakasi Works'
  });

  useEffect(() => {
    getPressStats().then((data) => {
      if (data) setStats(data);
    });

    const handleSettingsUpdate = (e: Event) => {
      const custom = e as CustomEvent<FactorySettings>;
      if (custom.detail) setSettings(custom.detail);
      else setSettings(getStoredFactorySettings());
    };

    const handleCatalogUpdate = () => {
      const stored = getStoredCatalog();
      if (stored && stored.length > 0) setProducts(stored);
    };

    window.addEventListener('factory-settings-updated', handleSettingsUpdate);
    window.addEventListener('catalog-updated', handleCatalogUpdate);

    return () => {
      window.removeEventListener('factory-settings-updated', handleSettingsUpdate);
      window.removeEventListener('catalog-updated', handleCatalogUpdate);
    };
  }, []);

  const brandName = settings.factoryName || 'Amazing Ads';

  return (
    <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '60px',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Editorial Headline & Copy */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="foil-badge">
                ✦ 2026 / 2027 EDITIONS
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {brandName} Sivakasi Works
              </span>
            </div>

            <h1
              className="hero-headline"
              style={{
                fontSize: 'clamp(2.1rem, 5.2vw, 4.4rem)',
                lineHeight: '1.05',
                color: '#ffffff',
                fontWeight: 800,
                marginBottom: '18px',
                letterSpacing: '-0.035em'
              }}
            >
              Precision <span className="gold-gradient-text">Calendar & Promo Press</span>.
            </h1>

            <p
              className="hero-subtext"
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                maxWidth: '560px',
                marginBottom: '20px'
              }}
            >
              {settings.tagline || "India’s premier manufacturing atelier for Gold/Silver PET Foil Calendars, Custom 5D Holographic Calendars, Stone Art Calendars, Hand Fans & Special Products."}
            </p>

            {/* Product Quick-Tag Highlights */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
              {products.slice(0, 5).map((p) => (
                <span
                  key={p.id}
                  style={{
                    background: 'rgba(207, 168, 78, 0.1)',
                    border: '1px solid rgba(207, 168, 78, 0.3)',
                    color: 'var(--accent-gold-bright)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  ✦ {p.name}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
              <button
                onClick={onScrollToCustomizer}
                className="btn-gold"
                style={{ padding: '14px 28px', fontSize: '0.95rem' }}
              >
                <span>Instant Quote Calculator</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={onOpenSampleKit}
                className="btn-outline-gold"
                style={{ padding: '14px 26px', fontSize: '0.95rem' }}
              >
                <span>Free Swatch Kit</span>
              </button>
            </div>

            {/* Micro Credential Badges */}
            <div
              className="hero-badges-row hero-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '16px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--accent-gold-bright)' }}>
                  {stats.calendarsPrintedYearToDate || '14M+'}
                </p>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Calendars Pressed
                </p>
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700, color: '#fff' }}>
                  0.05mm
                </p>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Foil Registration
                </p>
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--accent-gold-bright)' }}>
                  100%
                </p>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  FSC Archival Stock
                </p>
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700, color: '#fff' }}>
                  {stats.onTimeDeliveryRate || '99.8%'}
                </p>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  On-Time Dispatch
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Tactile Mockup Preview Showcase */}
          <div style={{ position: 'relative' }}>
            <div
              className="hero-preview-box"
              style={{
                position: 'relative',
                background: 'linear-gradient(145deg, #181c25 0%, #0e1117 100%)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-gold)',
                padding: '24px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(207, 168, 78, 0.15)',
                overflow: 'hidden'
              }}
            >
              {/* Top Bar with Binding Simulation */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: '12px',
                        height: '14px',
                        borderRadius: '3px',
                        background: 'linear-gradient(180deg, #d8ba63 0%, #876c24 100%)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.4)'
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                  SPEC: 350 GSM LINEN • TWIN WIRE-O
                </span>
              </div>

              {/* Main Calendar Card Visual */}
              <div
                style={{
                  marginTop: '16px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid var(--border-gold)',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.65)',
                  background: '#0d1017'
                }}
              >
                <img
                  src="/images/luxury-scenic-calendar-2026.jpg"
                  alt={`November 2026 Luxury Scenic Wall Calendar - ${brandName} Sivakasi`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />

                {/* Floating 24K Hot Foil Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'linear-gradient(135deg, #d4af37 0%, #aa8528 100%)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(6px)'
                  }}
                >
                  NOVEMBER 2026 EDITION
                </div>
              </div>

              {/* Floating Swatch Accent Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: 'rgba(17, 20, 26, 0.95)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.6)'
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'conic-gradient(#f7e199, #b38d38, #f7e199)'
                  }}
                />
                <div>
                  <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#fff' }}>Physical Proofing</p>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Included With Every Order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 80px 0 100px;
        }

        @media (max-width: 960px) {
          .hero-section {
            padding: 40px 0 60px;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 640px) {
          .hero-section {
            padding: 28px 0 44px;
          }
          .hero-cta-group {
            flex-direction: column !important;
            width: 100% !important;
            gap: 12px !important;
          }
          .hero-cta-group button {
            width: 100% !important;
          }
          .hero-badges-row, .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
          .hero-preview-box {
            padding: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};
