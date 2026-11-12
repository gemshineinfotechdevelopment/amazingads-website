import type { CSSProperties } from 'react';
import { useRouter } from '../context/RouterContext';
import { Hero } from '../components/Hero';
import { ThreeDViewer } from '../components/ThreeDViewer';

export const HomePage = ({ onOpenSampleKit }: { onOpenSampleKit: () => void }) => {
  const { navigate } = useRouter();

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

      {/* Atelier Departments Quick Access Grid */}
      <section style={{ padding: '40px 0 70px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 36px' }}>
            <span className="foil-badge" style={{ marginBottom: '10px' }}>
              ✦ PRESS STUDIO
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
              Press <span className="gold-gradient-text">Departments</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
              Bespoke calendar editions, real-time pricing, and tactile paper swatches.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {/* Department 1: Collections */}
            <div
              onClick={() => navigate('collections')}
              style={deptCardStyle}
              className="dept-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.8rem' }}>🖼️</span>
                <span className="foil-badge">5 PRODUCTS</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '6px' }}>The Collections</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                Gold/Silver PET Foil Calendar, Special Products, Custom 5D Calendars, Stone Art Calendars, and Hand Fan.
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-bright)', fontWeight: 600 }}>
                View Editions →
              </span>
            </div>

            {/* Department 2: Quote Configurator */}
            <div
              onClick={() => navigate('calculator')}
              style={deptCardStyle}
              className="dept-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.8rem' }}>🎛️</span>
                <span className="foil-badge">PRICING ENGINE</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '6px' }}>Quote Calculator</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                Configure size, GSM paper weight, foil stamping, and volume tier discounts.
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-bright)', fontWeight: 600 }}>
                Calculate Price →
              </span>
            </div>

            {/* Department 3: Virtual Proofing */}
            <div
              onClick={() => navigate('proofing')}
              style={deptCardStyle}
              className="dept-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.8rem' }}>🔍</span>
                <span className="foil-badge">DIGITAL PROOF</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '6px' }}>Virtual Proof Studio</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                Flip through 12 months, toggle 24k gold foil sheen, and test your brand watermark.
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-bright)', fontWeight: 600 }}>
                Open Proof Studio →
              </span>
            </div>

            {/* Department 4: Paper & Craft */}
            <div
              onClick={() => navigate('craft')}
              style={deptCardStyle}
              className="dept-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.8rem' }}>📜</span>
                <span className="foil-badge">ARCHIVAL</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '6px' }}>Paper & Foils</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                400 GSM Rigid Kappa Board, 60 GSM Maplitho, 210 GSM Bilt Royal Art Paper, and 24K Hot Foil Swatches.
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-bright)', fontWeight: 600 }}>
                Inspect Swatches →
              </span>
            </div>

            {/* Department 5: Corporate Bulk */}
            <div
              onClick={() => navigate('corporate')}
              style={deptCardStyle}
              className="dept-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.8rem' }}>🏢</span>
                <span className="foil-badge">B2B CONCIERGE</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '6px' }}>Corporate Bulk</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                Turnkey procurement for 500 to 50,000+ units, custom boxes, and multi-address delivery.
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-bright)', fontWeight: 600 }}>
                Enterprise Quotes →
              </span>
            </div>

            {/* Department 6: Dielines */}
            <div
              onClick={() => navigate('dielines')}
              style={deptCardStyle}
              className="dept-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.8rem' }}>📐</span>
                <span className="foil-badge">TEMPLATES</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '6px' }}>Vector Dielines</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                Download Adobe Illustrator, InDesign, and PDF templates with pre-flight guidelines.
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-bright)', fontWeight: 600 }}>
                Download Assets →
              </span>
            </div>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
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
      <section style={{ padding: '80px 0', position: 'relative' }}>
        <div className="container">
          <div
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
                    href="https://wa.me/919790472767?text=Hello%20Amazing%20Ads%20Sivakasi,%20I%20would%20like%20to%20place%20a%20calendar%20and%20frames%20order"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold"
                    style={{ padding: '12px 24px', fontSize: '0.9rem', textDecoration: 'none' }}
                  >
                    💬 Direct WhatsApp Press Desk
                  </a>
                  <a
                    href="tel:+919790472767"
                    className="btn-outline-gold"
                    style={{ padding: '12px 22px', fontSize: '0.9rem', textDecoration: 'none' }}
                  >
                    📞 Call: +91 97904 72767
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
                    <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Amazing Ads Sivakasi</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)' }}>
                      Official Portal: amazingads.in
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '3px' }}>🏭 Manufacturing Hub & Press Works:</strong>
                    <span>3/1, Vannakara Street, Chairman P.K.S.A. Arumuganadar Road, Sivakasi 626189, Virudhunagar District, Tamil Nadu</span>
                  </div>

                  <div>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '3px' }}>📞 Direct Phone Lines:</strong>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold-bright)' }}>
                      +91 97904 72767 / +91 97904 27670
                    </span>
                  </div>

                  <div>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '3px' }}>📱 Corporate Management Hotline:</strong>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>+91 98400 55220</span>
                  </div>

                  <div>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '3px' }}>✉️ Official Communications:</strong>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>aamazingads@gmail.com</span>
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
      <section style={{ padding: '80px 0 0' }}>
        <div className="container">
          <div
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
        @media (max-width: 600px) {
          .cap-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

const deptCardStyle: CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-card)',
  borderRadius: 'var(--radius-lg)',
  padding: '30px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: 'var(--shadow-md)'
};
