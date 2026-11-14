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
            maxWidth: '820px',
            position: 'relative',
            zIndex: 2
          }}
          className="hero-content"
        >
          {/* Editorial Headline & Copy */}
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
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.3rem, 5.2vw, 4.4rem)',
                lineHeight: '1.1',
                color: '#ffffff',
                fontWeight: 800,
                marginBottom: '18px',
                letterSpacing: '-0.025em',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.85)'
              }}
            >
              Precision <span className="gold-gradient-text">Calendar & Promo Press</span>.
            </h1>

            <p
              className="hero-subtext"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.18rem)',
                lineHeight: '1.65',
                color: '#ffffff',
                opacity: 0.94,
                maxWidth: '680px',
                marginBottom: '26px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
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
                    background: 'rgba(215, 134, 0, 0.16)',
                    border: '1px solid rgba(215, 134, 0, 0.45)',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <span className="gold-gradient-text">✦ {p.name}</span>
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
                <p className="gold-gradient-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 800 }}>
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
                <p className="gold-gradient-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 800 }}>
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
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          overflow: hidden;
          padding: 95px 0 115px;
          background-image: 
            linear-gradient(180deg, rgba(3, 3, 3, 0.72) 0%, rgba(20, 22, 24, 0.78) 50%, rgba(46, 47, 43, 0.92) 100%),
            url('/images/Luxurious%202026%20Calendar%20Showcase.png');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-bottom: 1px solid #454545;
        }

        .hero-content {
          max-width: 820px;
        }

        @media (max-width: 960px) {
          .hero-section {
            padding: 50px 0 70px;
          }
          .hero-content {
            max-width: 100%;
          }
        }
        @media (max-width: 640px) {
          .hero-section {
            padding: 36px 0 50px;
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
        }
      `}</style>
    </section>
  );
};
