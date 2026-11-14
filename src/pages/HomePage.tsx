import { useState, useEffect, type CSSProperties } from 'react';
import { useRouter } from '../context/RouterContext';
import { Hero } from '../components/Hero';
import { ThreeDViewer } from '../components/ThreeDViewer';
import { ProductCatalog } from '../components/ProductCatalog';
import { getStoredFactorySettings, type FactorySettings } from '../services/api';

export const HomePage = ({ onOpenSampleKit }: { onOpenSampleKit: () => void }) => {
  const { navigate } = useRouter();
  const [settings, setSettings] = useState<FactorySettings>(getStoredFactorySettings());

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<FactorySettings>;
      if (custom.detail) setSettings(custom.detail);
      else setSettings(getStoredFactorySettings());
    };
    window.addEventListener('factory-settings-updated', handleUpdate);
    return () => window.removeEventListener('factory-settings-updated', handleUpdate);
  }, []);

  const cleanNumber = (settings.whatsapp || '919790472767').replace(/[^0-9]/g, '');
  const targetWhatsApp = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
  const targetPhone = (settings.phone || '+919790472767').replace(/[^0-9+]/g, '');

  return (
    <div className="page-view" style={{ padding: '0 0 90px' }}>
      {/* Immersive Full-Screen Hero */}
      <Hero
        onScrollToCustomizer={() => navigate('calculator')}
        onOpenSampleKit={onOpenSampleKit}
      />

      {/* 3D Interactive Model Showcase */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
            <span className="foil-badge" style={{ marginBottom: '10px' }}>
              ✦ 3D SIMULATOR
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
              Interactive 3D <span className="gold-gradient-text">Models</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
              Move your mouse to tilt the 3D card. Experience real 24K gold foil reflection glare and 3D lenticular image morphing.
            </p>
          </div>

          <ThreeDViewer />
        </div>
      </section>

      {/* Signature 2027 Calendar Collection */}
      <section style={{ padding: '30px 0 50px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
            <span className="foil-badge" style={{ marginBottom: '10px' }}>
              ✦ 2027 SIVAKASI PRESS EDITIONS
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
              Signature <span className="gold-gradient-text">Calendar Models</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
              Direct factory wholesale pricing. Real 24K gold foil stamping, daily panchangam, and tabletop desk easels.
            </p>
          </div>

          <ProductCatalog onSelectProduct={(productName) => navigate('calculator', { product: productName })} />
        </div>
      </section>

      {/* Why Choose Amazing Ads Sivakasi Works - 4 Key Advantages */}
      <section style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <span className="foil-badge" style={{ marginBottom: '10px' }}>
              ✦ MANUFACTURING ADVANTAGE
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
              Why Order Direct from <span className="gold-gradient-text">Sivakasi Works</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
              Direct factory production with zero intermediaries and complete quality control.
            </p>
          </div>

          <div className="advantages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div style={advantageCardStyle}>
              <span style={{ fontSize: '2.2rem', marginBottom: '14px', display: 'block' }}>🏭</span>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>Wholesale Factory Direct</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Save 30% to 42% by purchasing direct from the Sivakasi manufacturing press. No middleman commissions.
              </p>
            </div>

            <div style={advantageCardStyle}>
              <span style={{ fontSize: '2.2rem', marginBottom: '14px', display: 'block' }}>👑</span>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>24K Hot Foil & 5-Color Offset</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                130°C heated brass foil die stamping and Heidelberg presses ensure razor-sharp registration on virgin board.
              </p>
            </div>

            <div style={advantageCardStyle}>
              <span style={{ fontSize: '2.2rem', marginBottom: '14px', display: 'block' }}>🔍</span>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>Free Digital Proofing</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                We generate a 3D digital proof with your corporate branding and advertisement details before going to press.
              </p>
            </div>

            <div style={advantageCardStyle}>
              <span style={{ fontSize: '2.2rem', marginBottom: '14px', display: 'block' }}>🚚</span>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>Safe All-India Transport</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Corrugated master box packing with direct delivery via VRL, BlueDart, and ST Courier across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple 4-Step Order Workflow */}
      <section style={{ padding: '70px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <span className="foil-badge" style={{ marginBottom: '10px' }}>
              ✦ SIMPLE ORDERING
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
              How It <span className="gold-gradient-text">Works</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
              From model selection to doorstep delivery in 4 simple steps.
            </p>
          </div>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Choose Model', desc: 'Select from 24K Gold Foil Wall, Daily Panchangam, Desk Easel, or Devotional Frame.' },
              { step: '02', title: 'Send Branding', desc: 'Share your company name, logo, phone, and address via WhatsApp or online quote.' },
              { step: '03', title: 'Approve Proof', desc: 'Review the complimentary digital color proof with exact text positioning.' },
              { step: '04', title: 'Fast Dispatch', desc: 'Pressed on high-speed lines in Sivakasi and dispatched safely to your location.' }
            ].map((s, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 24px',
                  position: 'relative'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-gold-bright)', opacity: 0.8, marginBottom: '10px' }}>
                  {s.step}
                </div>
                <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>{s.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Press Work */}
      <section style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <span className="foil-badge" style={{ marginBottom: '10px' }}>
              ✦ CLIENT PORTFOLIO
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
              Client <span className="gold-gradient-text">Work</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
              Corporate editions for Tata, Taj Hotels, and Zoho.
            </p>
          </div>

          <div className="clients-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
            {[
              {
                client: 'Tata Motors & Titan',
                project: '365-Day Tear-off Ingot Edition',
                units: '8,500 Units',
                finish: '24K Triple Edge Gilding',
                quote: 'The foil edge gilding turned our annual calendar into a permanent executive desk piece.',
                reviewer: 'Rohan Mehra, Brand Identity'
              },
              {
                client: 'Taj Hotels & Resorts',
                project: 'Architectural Wall Calendar A3',
                units: '12,000 Units',
                finish: '350 GSM Linen + Gold Monogram',
                quote: 'Zero color variance on our photographic prints. Exceptional Heidelberg press calibration.',
                reviewer: 'Ananya Singhania, Marketing VP'
              },
              {
                client: 'Zoho Corporation',
                project: 'Plantable Wildflower Seed Calendar',
                units: '25,000 Units',
                finish: '100% Recycled Kraft & Seed Paper',
                quote: 'A magnificent sustainable edition. 25,000 clients bloomed wildflowers from each calendar leaf.',
                reviewer: 'Karthik S., Sustainability Lead'
              }
            ].map((study, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-card)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--accent-gold-bright)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {study.units}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{study.finish}</span>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '4px' }}>{study.client}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold-bright)', marginBottom: '14px' }}>{study.project}</p>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '18px' }}>
                    "{study.quote}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  — {study.reviewer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Amazing Ads Sivakasi Works Section */}
      <section style={{ padding: '60px 0', position: 'relative' }}>
        <div className="container">
          <div
            className="about-banner-card home-about-box"
            style={{
              background: 'linear-gradient(145deg, #131720 0%, #0c0f15 100%)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-xl)',
              padding: '48px 40px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(207, 168, 78, 0.12)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }} className="about-grid">
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span className="foil-badge">SIVAKASI PRESS HEADQUARTERS</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    ESTABLISHED 2008
                  </span>
                </div>

                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '16px' }}>
                  About <span className="gold-gradient-text">Amazing Ads</span>
                </h2>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '20px' }}>
                  Operating from the heart of Sivakasi — India’s celebrated printing and calendar manufacturing capital — <strong>Amazing Ads</strong> is an industry leader in precision calendar manufacturing, 24K gold foil die stamping, and luxury devotional photo frames.
                </p>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '28px' }}>
                  With over 18 years of specialized press expertise, we serve corporate enterprises, retail trade distributors, temple devasthanams, and agencies across India with factory-direct pricing, strict registration tolerances, and guaranteed timely delivery.
                </p>

                {/* Sivakasi Press Capabilities Checklist */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '32px' }} className="cap-grid">
                  {[
                    { label: 'Heidelberg Speedmaster Presses', desc: 'Flawless 4 & 5-color offset dot reproduction' },
                    { label: 'High-Tonnage Foil Embossing', desc: '130°C heated brass die stamping on rigid kappa' },
                    { label: '75 LPI Lenticular Micro-Lenses', desc: 'Dual-angle 3D spatial depth & morphing' },
                    { label: '365 Daily Sheet Panchangam', desc: 'Rotary web offset with micro-perforations' }
                  ].map((cap, i) => (
                    <div key={i} style={{ background: 'var(--bg-input)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>✓ {cap.label}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{cap.desc}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/${targetWhatsApp}?text=${encodeURIComponent('Hello Amazing Ads Sivakasi, I would like to place a calendar and frames order')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold"
                    style={{ padding: '12px 24px', fontSize: '0.9rem', textDecoration: 'none' }}
                  >
                    💬 Direct WhatsApp Press Desk
                  </a>
                  <a
                    href={`tel:${targetPhone}`}
                    className="btn-outline-gold"
                    style={{ padding: '12px 22px', fontSize: '0.9rem', textDecoration: 'none' }}
                  >
                    📞 Call: {settings.phone || '+91 97904 72767'}
                  </a>
                </div>
              </div>

              {/* Right Column: Factory Location & Contact Card */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  padding: '32px',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #cfa84e 0%, #8c6e26 100%)',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 800
                    }}
                  >
                    AA
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{settings.factoryName || 'Amazing Ads Sivakasi'}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)' }}>
                      Official Portal: {settings.websiteUrl || 'amazingads.in'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '3px' }}>🏭 Manufacturing Hub & Press Works:</strong>
                    <span>{settings.address || '3/1, Vannakara Street, Chairman P.K.S.A. Arumuganadar Road, Sivakasi 626189, Virudhunagar District, Tamil Nadu'}</span>
                  </div>

                  <div>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '3px' }}>📞 Direct Phone Lines:</strong>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold-bright)' }}>
                      {settings.phone || '+91 97904 72767'}{settings.secondaryPhone ? ` / ${settings.secondaryPhone}` : ''}
                    </span>
                  </div>

                  <div>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '3px' }}>📱 Corporate Management Hotline:</strong>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{settings.secondaryPhone || '+91 98400 55220'}</span>
                  </div>

                  <div>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '3px' }}>✉️ Official Communications:</strong>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{settings.email || 'aamazingads@gmail.com'}</span>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginTop: '6px' }}>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '3px' }}>🚚 Dispatch & Freight Partners:</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Direct daily transport via VRL Logistics, BlueDart, ST Courier, Professional Couriers, and container freight to all Indian states.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Swatch Box Callout Section */}
      <section style={{ padding: '60px 0 0' }}>
        <div className="container">
          <div
            className="swatch-banner-card home-swatch-box"
            style={{
              background: 'linear-gradient(145deg, #1f190e 0%, #12151c 100%)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-xl)',
              padding: '48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '28px',
              boxShadow: '0 20px 45px rgba(0,0,0,0.7), 0 0 30px rgba(207, 168, 78, 0.15)'
            }}
          >
            <div style={{ maxWidth: '650px' }}>
              <span className="foil-badge" style={{ marginBottom: '12px' }}>FREE COURIER DISPATCH</span>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '8px' }}>
                Experience Our Papers & Heated Foils in Person
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                We ship a complimentary Master Swatch Box containing 12 paper grammages, 4 metallic foil color chips, and miniature wire-o proofs to your office.
              </p>
            </div>
            <button
              onClick={onOpenSampleKit}
              className="btn-gold"
              style={{ padding: '16px 32px', fontSize: '1rem' }}
            >
              Order Free Master Swatch Kit →
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .dept-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dept-card:hover {
          border-color: var(--border-gold-hover) !important;
          transform: translateY(-5px);
          box-shadow: 0 16px 35px rgba(0,0,0,0.6), 0 0 25px rgba(207, 168, 78, 0.15);
        }
        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 768px) {
          .advantages-grid, .steps-grid, .clients-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .about-banner-card, .home-about-box, .swatch-banner-card, .home-swatch-box {
            padding: 24px 18px !important;
          }
          .swatch-banner-card button, .home-swatch-box button {
            width: 100% !important;
          }
        }
        @media (max-width: 600px) {
          .cap-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

const advantageCardStyle: CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-card)',
  borderRadius: 'var(--radius-lg)',
  padding: '30px 24px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'var(--shadow-md)'
};
