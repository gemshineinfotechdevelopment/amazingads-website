import { useRouter } from '../context/RouterContext';

interface AboutPageProps {
  onOpenSampleKit?: () => void;
}

export const AboutPage = ({ onOpenSampleKit }: AboutPageProps) => {
  const { navigate } = useRouter();

  return (
    <div className="page-view">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <button onClick={() => navigate('home')}>Home</button>
          <span>/</span>
          <span className="current">About Amazing Ads</span>
        </div>

        {/* Page Banner */}
        <div className="page-header-banner">
          <span className="foil-badge" style={{ marginBottom: '10px' }}>
            ✦ SIVAKASI PRINT HERITAGE
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: '12px' }}>
            About <span className="gold-gradient-text">Amazing Ads</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7' }}>
            Direct manufacturer based in Sivakasi — the printing capital of India. Producing 24K Gold Foil Calendars, Daily Panchangam, and Luxury Photo Frames since 2008.
          </p>
        </div>

        {/* Story Section */}
        <div
className="about-story-card about-story-box"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '48px',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '40px'
          }}
        >
          <div
            className="about-story-grid"
            style={{
              display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '36px',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="foil-badge" style={{ marginBottom: '14px' }}>
                ✦ WHO WE ARE
              </span>
              <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '16px' }}>
                Direct Wholesale Press from India's Premier Printing Capital
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px', fontSize: '0.95rem' }}>
                Operating from Sivakasi, Tamil Nadu, <strong>Amazing Ads</strong> is an established printing and manufacturing company specializing in Real 24K Gold Foil Stamped Wall Calendars, Traditional Daily Sheet Panchangam (Tamil/English with Nalla Neram, Rahu Kalam, Thirukkural), 12-Sheet Monthly Art Calendars, 3D Lenticular Motion Displays, and Devotional Gold Foil Photo Frames.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '24px', fontSize: '0.95rem' }}>
                Every calendar is pressed, die-stamped, and tin-mounted in-house under stringent quality checks using Heidelberg offset presses, German metallic foils, and virgin kappa board for guaranteed flat hanging throughout the year.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('collections')} className="btn-gold">
                  Explore Calendar Collection →
                </button>
                {onOpenSampleKit && (
                  <button onClick={onOpenSampleKit} className="btn-outline-gold">
                    Request Free Swatch Kit
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div
              className="about-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
              }}
            >
              {[
                { stat: '15+', label: 'Years of Craftsmanship', icon: '🏛️' },
                { stat: '4,500+', label: 'Corporate Clients Across India', icon: '🤝' },
                { stat: '12M+', label: 'Calendars & Promos Pressed', icon: '🖨️' },
                { stat: '99.4%', label: 'On-Time Dispatch Record', icon: '⚡' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px 16px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '6px' }}>{item.icon}</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-gold-bright)' }}>
                    {item.stat}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Pillars / Capabilities */}
        <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '20px' }}>
          <span className="foil-badge" style={{ marginBottom: '10px' }}>
            ✦ OUR CAPABILITIES
          </span>
          <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>
            Why Leading Brands Trust <span className="gold-gradient-text">Amazing Ads</span>
          </h2>
        </div>

        <div
          className="about-capabilities-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          {[
            {
              title: '130°C High-Pressure Foil Stamping',
              desc: 'High-temperature brass foil dies pressed under 5-ton hydraulic pressure ensure gleam and mirror sheen that never flakes.',
              icon: '👑'
            },
            {
              title: '75 LPI Micro-Optical Lenticular',
              desc: 'Specialized 5D lenticular extrusions creating realistic 3D depth and dynamic image morphing without 3D glasses.',
              icon: '🔮'
            },
            {
              title: 'Eco-Certified Substrates',
              desc: 'Rigid virgin kappa boards, composite stone compounds, and 100% recyclable virgin PP plastic substrates.',
              icon: '🌱'
            },
            {
              title: 'Pan-India Logistics & Tracking',
              desc: 'Multi-address direct drop-shipping via BlueDart, VRL, and express road freight with individual corrugated box packaging.',
              icon: '📦'
            }
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 20px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
@media (max-width: 768px) {
          .about-story-card, .about-story-box {
            padding: 24px 16px !important;
          }
          .about-story-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .about-capabilities-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .about-stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

