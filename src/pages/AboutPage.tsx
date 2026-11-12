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
            Mastering the Art of <span className="gold-gradient-text">Print & Promotional Craft</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7' }}>
            Rooted in Sivakasi — the printing capital of India — Amazing Ads transforms calendar publishing and corporate advertising into heirloom artistry.
          </p>
        </div>

        {/* Story Section */}
        <div
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
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
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
                Founded with a passion for uncompromising tactile quality, Amazing Ads has grown into one of South India's foremost specialized manufacturing presses. We produce high-impact Gold/Silver PET Foil calendars, custom 5D lenticular visual prints, artisanal stone relief creations, high-durability advertising hand fans, and bespoke corporate promotional merchandise.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '24px', fontSize: '0.95rem' }}>
                Unlike brokers, every calendar and merchandise item is pressed, die-stamped, folded, and bound in-house under stringent quality checks with German foils, FSC-certified boards, and high-precision hydraulic tonnage.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('collections')} className="btn-gold">
                  Explore 5 Signature Products →
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
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
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
                    padding: '24px 20px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '8px' }}>{item.icon}</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-gold-bright)' }}>
                    {item.stat}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
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
                padding: '28px',
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
    </div>
  );
};
