interface HeroProps {
  onScrollToCustomizer: () => void;
  onOpenSampleKit: () => void;
}

export const Hero = ({ onScrollToCustomizer, onOpenSampleKit }: HeroProps) => {
  return (
    <section
      style={{
        position: 'relative',
        padding: '80px 0 100px',
        overflow: 'hidden'
      }}
    >
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="foil-badge">
                ✦ 2026 / 2027 EDITIONS
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Amazing Ads Sivakasi Works
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                lineHeight: '1.02',
                color: '#ffffff',
                fontWeight: 800,
                marginBottom: '20px',
                letterSpacing: '-0.035em'
              }}
            >
              Precision <span className="gold-gradient-text">Calendar & Promo Press</span>.
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                maxWidth: '560px',
                marginBottom: '20px'
              }}
            >
              India’s premier manufacturing atelier for Gold/Silver PET Foil Calendars, Custom 5D Holographic Calendars, Stone Art Calendars, Hand Fans & Special Products.
            </p>

            {/* Product Quick-Tag Highlights */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
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
                    background: 'rgba(207, 168, 78, 0.1)',
                    border: '1px solid rgba(207, 168, 78, 0.3)',
                    color: 'var(--accent-gold-bright)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  ✦ {item}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '44px' }}>
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
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '20px',
                paddingTop: '28px',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold-bright)' }}>
                  1.4M+
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Calendars Pressed
                </p>
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>
                  0.05mm
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Foil Registration
                </p>
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold-bright)' }}>
                  100%
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  FSC Archival Stock
                </p>
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>
                  99.8%
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  On-Time Dispatch
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Tactile Mockup Preview Showcase */}
          <div style={{ position: 'relative' }}>
            <div
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
                  background: '#fcfbfa',
                  color: '#1a1816',
                  padding: '28px 24px',
                  boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  border: '1px solid #e0dacf'
                }}
              >
                {/* Gold Foil Header in the Mockup */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8c7d6e', fontWeight: 600 }}>
                      AMAZING ADS SIVAKASI • MMXXVII
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#161412', marginTop: '4px' }}>
                      JANUARY
                    </h3>
                  </div>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #aa8528 100%)',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em'
                    }}
                  >
                    HOT FOIL 24K
                  </div>
                </div>

                {/* Day of Week Minimal Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    textAlign: 'center',
                    gap: '6px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#8c7d6e',
                    borderBottom: '1px solid #ebe5dc',
                    paddingBottom: '8px',
                    marginBottom: '10px'
                  }}
                >
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span style={{ color: '#c76f50' }}>SAT</span>
                  <span style={{ color: '#c76f50' }}>SUN</span>
                </div>

                {/* Sample Date Matrix */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    textAlign: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#2d2823'
                  }}
                >
                  <span style={{ opacity: 0.3 }}>29</span>
                  <span style={{ opacity: 0.3 }}>30</span>
                  <span style={{ opacity: 0.3 }}>31</span>
                  <span>1</span>
                  <span>2</span>
                  <span style={{ color: '#c76f50', fontWeight: 600 }}>3</span>
                  <span style={{ color: '#c76f50', fontWeight: 600 }}>4</span>

                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span style={{ 
                    background: 'rgba(207, 168, 78, 0.2)', 
                    color: '#806114', 
                    fontWeight: 700, 
                    borderRadius: '4px' 
                  }}>8</span>
                  <span>9</span>
                  <span style={{ color: '#c76f50', fontWeight: 600 }}>10</span>
                  <span style={{ color: '#c76f50', fontWeight: 600 }}>11</span>

                  <span>12</span>
                  <span>13</span>
                  <span>14</span>
                  <span>15</span>
                  <span>16</span>
                  <span style={{ color: '#c76f50', fontWeight: 600 }}>17</span>
                  <span style={{ color: '#c76f50', fontWeight: 600 }}>18</span>
                </div>

                {/* Subtle Corporate Logo Placeholder */}
                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '14px',
                    borderTop: '1px dashed #dcd5ca',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.7rem',
                    color: '#85786a'
                  }}
                >
                  <span>ARCHIVAL COTTON PRESS</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#b38d38', fontWeight: 600 }}>
                    AMAZING ADS BRANDED
                  </span>
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
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
