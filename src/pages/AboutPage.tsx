import { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import {
  getPressStats,
  getStoredFactorySettings,
  type FactorySettings,
  type PressStats
} from '../services/api';

interface AboutPageProps {
  onOpenSampleKit?: () => void;
}

export const AboutPage = ({ onOpenSampleKit }: AboutPageProps) => {
  const { navigate } = useRouter();
  const [settings, setSettings] = useState<FactorySettings>(getStoredFactorySettings());
  const [stats, setStats] = useState<PressStats>({
    calendarsPrintedYearToDate: '14,205,000+',
    corporateClientsServed: '4,500+',
    fscCertifiedPaperRatio: '100%',
    onTimeDeliveryRate: '99.4%',
    foilPressTolerances: '0.05 mm',
    establishedYear: 2008,
    pressHQ: 'Sivakasi Works'
  });

  useEffect(() => {
    getPressStats().then((data) => {
      if (data) setStats(data);
    });

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

  const estYear = settings.establishedYear || stats.establishedYear || 2008;
  const currentYear = new Date().getFullYear();
  const yearsOfCraftsmanship = `${currentYear - estYear}+`;
  const brandName = settings.factoryName || 'Amazing Ads';

  const statItems = [
    {
      stat: yearsOfCraftsmanship,
      label: 'Years of Press Heritage',
      desc: `Continuous manufacturing excellence in Sivakasi since ${estYear}`,
      icon: '🏛️'
    },
    {
      stat: stats.corporateClientsServed || '4,500+',
      label: 'Corporate & Trade Clients',
      desc: 'National brands, retailers, temples, and agencies across all states',
      icon: '🤝'
    },
    {
      stat: stats.calendarsPrintedYearToDate || '14M+',
      label: 'Annual Print Capacity',
      desc: 'High-speed automated German and Japanese offset press lines',
      icon: '🖨️'
    },
    {
      stat: stats.onTimeDeliveryRate || '99.4%',
      label: 'On-Time Dispatch Metric',
      desc: 'Reliable express freight dispatch with real-time tracking',
      icon: '⚡'
    }
  ];

  const infrastructurePillars = [
    {
      icon: '👑',
      title: '130°C High-Pressure Hot Foil Stamping',
      desc: 'Utilizing custom-etched brass stamping dies pressed under 5-ton hydraulic pressure. Mirror-finish gold, silver, and holographic foils bond molecularly to prevent flaking, peeling, or fading over years.'
    },
    {
      icon: '🔮',
      title: '75 LPI High-Definition 5D Lenticular Lens',
      desc: 'Precision micro-optical extrusion layers creating vivid holographic depth, continuous 3D motion, and devotional animations without requiring 3D viewing glasses.'
    },
    {
      icon: '📐',
      title: 'Rigid Kappa Board & Heavy Tin Mounting',
      desc: 'High-density 400 to 800 GSM moisture-resistant kappa board backing with rust-proof galvanized tin clips and heavy hanging loops. Guaranteed 100% flat hanging with zero seasonal curling.'
    },
    {
      icon: '🚚',
      title: 'Direct Factory Logistics & Multi-City Distribution',
      desc: 'Pan-India road cargo, express courier drop-shipping, and multi-address corporate distribution. Each calendar batch is shrink-wrapped and packed in heavy 5-ply corrugated master cartons.'
    }
  ];

  const qualityStandards = [
    { title: 'Zero Middlemen Markup', desc: 'Direct manufacturing floor pricing from Sivakasi.' },
    { title: 'Pantone Accurate Color', desc: 'Calibrated spectro-densitometers for exact brand fidelity.' },
    { title: '100% Flat Hanging', desc: 'Rigid kappa substrates engineered against tropical humidity.' },
    { title: 'Complimentary Digital Proofing', desc: 'Free layout mockup with company details before pressing.' }
  ];

  return (
    <div className="page-view" style={{ paddingBottom: '90px' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav" style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <button
            onClick={() => navigate('home')}
            style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 0 }}
          >
            Home
          </button>
          <span style={{ color: '#4b5563' }}>/</span>
          <span style={{ color: '#FFD700', fontWeight: 600 }}>About {brandName}</span>
        </div>

        {/* Hero Section Banner */}
        <section style={{ textAlign: 'center', padding: '36px 0 54px', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <span
              className="foil-badge"
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                padding: '6px 16px',
                borderRadius: '30px'
              }}
            >
              ✦ SIVAKASI PRINTING & EMBOSSING WORKS
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              color: '#ffffff',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.02em'
            }}
          >
            Crafting India's Finest <span className="gold-gradient-text">Calendars & Foils</span>
          </h1>

          <p
            style={{
              color: '#d1d5db',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              margin: '0 auto',
              maxWidth: '720px'
            }}
          >
            Based in Sivakasi — the renowned printing hub of India — <strong>{brandName}</strong> engineers 
            authentic 24K Gold Foil Wall Calendars, Daily Sheet Panchangam, and Luxury 5D Lenticular Displays with unmatched craftsmanship.
          </p>
        </section>

        {/* Story & Press Heritage Section */}
        <section
          style={{
            background: 'linear-gradient(180deg, #181917 0%, #121310 100%)',
            border: '1px solid #333333',
            borderRadius: '24px',
            padding: '56px 48px',
            marginBottom: '64px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)'
          }}
          className="about-story-section"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 1fr',
              gap: '56px',
              alignItems: 'center'
            }}
            className="about-story-grid"
          >
            {/* Story Narrative */}
            <div>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#FFD700',
                  display: 'block',
                  marginBottom: '12px'
                }}
              >
                OUR HERITAGE & PRESS PHILOSOPHY
              </span>

              <h2
                style={{
                  fontSize: 'clamp(1.7rem, 2.6vw, 2.2rem)',
                  color: '#ffffff',
                  fontWeight: 800,
                  lineHeight: 1.3,
                  marginBottom: '22px'
                }}
              >
                Precision Manufacturing Direct From Sivakasi
              </h2>

              <p style={{ color: '#d1d5db', fontSize: '0.98rem', lineHeight: 1.85, marginBottom: '18px' }}>
                For over {yearsOfCraftsmanship} years, our manufacturing facility in Sivakasi has combined traditional Tamil craftsmanship with advanced European Heidelberg printing technologies. We specialize in producing Real 24K Gold & Silver Metallic Foil Stamped Wall Calendars, Daily Sheet Panchangam (Tamil/English with Nalla Neram, Rahu Kalam, Gowri Panchangam, and Thirukkural), 12-Sheet Monthly Corporate Desk Planners, and Devotional Framed Artworks.
              </p>

              <p style={{ color: '#d1d5db', fontSize: '0.98rem', lineHeight: 1.85, marginBottom: '32px' }}>
                Every calendar produced at our works undergoes rigorous quality assurance: from virgin kappa substrate inspection and micro-precision foil stamping to high-speed automated tin mounting. Our calendars hang flat throughout the year, resisting seasonal humidity and curling.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('collections')}
                  className="btn-gold"
                  style={{ padding: '14px 28px', fontSize: '0.92rem', fontWeight: 700, borderRadius: '8px', cursor: 'pointer' }}
                >
                  Explore Products & Catalog →
                </button>
                {onOpenSampleKit && (
                  <button
                    onClick={onOpenSampleKit}
                    className="btn-outline-gold"
                    style={{ padding: '14px 24px', fontSize: '0.92rem', fontWeight: 700, borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Request Free Master Swatch Kit
                  </button>
                )}
              </div>
            </div>

            {/* Right: Spacious Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px'
              }}
              className="about-metrics-grid"
            >
              {statItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid #333333',
                    borderRadius: '16px',
                    padding: '28px 20px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  className="metric-box"
                >
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>{item.icon}</span>
                  <div
                    className="gold-gradient-text"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '2rem',
                      fontWeight: 800,
                      lineHeight: 1.1,
                      marginBottom: '8px'
                    }}
                  >
                    {item.stat}
                  </div>
                  <div
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#9ca3af', lineHeight: 1.4 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Manufacturing Pillars & Technical Capabilities */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#FFD700',
                display: 'block',
                marginBottom: '10px'
              }}
            >
              ENGINEERING & INFRASTRUCTURE
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#ffffff', fontWeight: 800 }}>
              Factory Equipment & Capabilities
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '0.98rem', maxWidth: '620px', margin: '12px auto 0', lineHeight: 1.6 }}>
              World-class presses, imported stamping dies, and automated post-press lines designed for high-volume trade orders.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '24px'
            }}
            className="about-capabilities-grid"
          >
            {infrastructurePillars.map((pillar, i) => (
              <div
                key={i}
                style={{
                  background: '#181917',
                  border: '1px solid #333333',
                  borderRadius: '16px',
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                }}
                className="pillar-card"
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: 'rgba(255, 215, 0, 0.12)',
                    border: '1px solid #FFD700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem'
                  }}
                >
                  {pillar.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700, lineHeight: 1.35, margin: 0 }}>
                  {pillar.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Standards & Direct Factory Guarantee */}
        <section
          style={{
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(212, 175, 55, 0.02) 100%)',
            border: '1px solid #FFD700',
            borderRadius: '20px',
            padding: '44px 36px',
            marginBottom: '64px',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.12)'
          }}
          className="about-guarantee-banner"
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#FFD700',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              ✦ THE SIVAKASI DIRECT ASSURANCE
            </span>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 800 }}>
              Why Procurement Leaders Across India Choose Us
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '24px'
            }}
          >
            {qualityStandards.map((std, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(3, 3, 3, 0.65)',
                  border: '1px solid #454545',
                  borderRadius: '12px',
                  padding: '22px 18px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    color: '#FFD700',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    lineHeight: 1
                  }}
                >
                  ✓
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 700, marginBottom: '4px' }}>
                    {std.title}
                  </h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                    {std.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Box */}
        <section
          style={{
            background: '#181917',
            border: '1px solid #454545',
            borderRadius: '20px',
            padding: '48px 36px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px'
          }}
        >
          <h3 style={{ fontSize: '1.7rem', color: '#ffffff', fontWeight: 800, margin: 0 }}>
            Experience the Tactile Luxury of Real Sivakasi Gold Foil
          </h3>
          <p style={{ color: '#9ca3af', fontSize: '0.96rem', maxWidth: '640px', lineHeight: 1.6, margin: 0 }}>
            We dispatch physical Master Swatch Boxes containing genuine PET foil swatches, 5D lenticular specimens, and paper substrates to companies and agencies across India.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '6px' }}>
            {onOpenSampleKit && (
              <button
                onClick={onOpenSampleKit}
                className="btn-gold"
                style={{ padding: '14px 28px', fontSize: '0.94rem', fontWeight: 700, borderRadius: '8px', cursor: 'pointer' }}
              >
                Request Free Sample Box →
              </button>
            )}
            <button
              onClick={() => navigate('contact')}
              className="btn-outline-gold"
              style={{ padding: '14px 24px', fontSize: '0.94rem', fontWeight: 700, borderRadius: '8px', cursor: 'pointer' }}
            >
              Contact Press Desk
            </button>
          </div>
        </section>

      </div>

      <style>{`
        .pillar-card:hover {
          border-color: #FFD700 !important;
          transform: translateY(-4px);
          box-shadow: 0 14px 35px rgba(0,0,0,0.8), 0 0 20px rgba(255, 215, 0, 0.25) !important;
        }
        .metric-box:hover {
          border-color: #FFD700 !important;
          background: rgba(255, 215, 0, 0.05) !important;
        }
        @media (max-width: 960px) {
          .about-story-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-story-section {
            padding: 36px 24px !important;
          }
        }
        @media (max-width: 600px) {
          .about-metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .about-guarantee-banner {
            padding: 28px 18px !important;
          }
        }
      `}</style>
    </div>
  );
};
