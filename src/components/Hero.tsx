interface HeroProps {
  onScrollToCustomizer: () => void;
  onOpenSampleKit: () => void;
}

export const Hero = ({ onScrollToCustomizer, onOpenSampleKit }: HeroProps) => {
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
                Amazing Ads Sivakasi Works
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
              India’s premier manufacturing atelier for Gold/Silver PET Foil Calendars, Custom 5D Holographic Calendars, Stone Art Calendars, Hand Fans & Special Products.
            </p>

            {/* Product Quick-Tag Highlights */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
              {[
                'Gold/Silver PET Foil',
                'Custom 5D Calendars',
                'Stone Art Calendars',
                'Hand Fan',
                'Special Products'
              ].map((item) => (
                <span
                  key={item}
                  style={{
                    background: 'rgba(215, 134, 0, 0.14)',
                    border: '1px solid rgba(215, 134, 0, 0.4)',
                    color: '#FFD72E',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  ✦ {item}
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
              className="hero-stats-grid"
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
                  1.4M+
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
                  99.8%
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
                background: 'linear-gradient(145deg, #2E2F2B 0%, #121310 100%)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid #454545',
                padding: '24px',
                boxShadow: '0 25px 50px -12px rgba(3, 3, 3, 0.8), 0 0 35px rgba(215, 134, 0, 0.2)',
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
                  borderBottom: '1px solid #454545'
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
                        background: 'linear-gradient(180deg, #FFD72E 0%, #D78600 100%)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.4)'
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.72rem', color: '#FFD72E', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
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
                  border: '1px solid #454545',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.65)',
                  background: '#030303'
                }}
              >
                <img
                  src="/images/luxury-scenic-calendar-2026.jpg"
                  alt="November 2026 Luxury Scenic Wall Calendar - Amazing Ads Sivakasi"
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
                    background: 'linear-gradient(135deg, #FFD72E 0%, #D78600 100%)',
                    color: '#030303',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.68rem',
                    fontWeight: 800,
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
                  background: 'rgba(3, 3, 3, 0.95)',
                  border: '1px solid #454545',
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
                    background: 'conic-gradient(#FFD72E, #D78600, #FFD72E)'
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

        @media (max-width: 580px) {
          .hero-section {
            padding: 28px 0 44px;
          }
          .hero-stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
          .hero-cta-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-cta-group button {
            width: 100% !important;
          }
          .hero-preview-box {
            padding: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};
