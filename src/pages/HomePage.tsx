import { type CSSProperties } from 'react';
import { useRouter } from '../context/RouterContext';
import { Hero } from '../components/Hero';
import { ProductCatalog } from '../components/ProductCatalog';
import { ThreeDViewer } from '../components/ThreeDViewer';

export const HomePage = ({ onOpenSampleKit }: { onOpenSampleKit: () => void }) => {
  const { navigate } = useRouter();

  return (
    <div className="page-view" style={{ padding: '0 0 60px' }}>
      {/* 1. Immersive Editorial Hero */}
      <Hero
        onScrollToCustomizer={() => navigate('calculator')}
        onOpenSampleKit={onOpenSampleKit}
      />

      {/* 2. Signature 2027 Calendar Collection - Our Products (Front & Center) */}
      <section style={{ padding: '40px 0 50px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
            <span className="foil-badge" style={{ marginBottom: '10px' }}>
              ✦ 2027 SIVAKASI PRESS EDITIONS
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
              Our <span className="gold-gradient-text">Products</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
              Direct factory wholesale pricing. Real 24K gold foil stamping, 5D holographic motion, stone art relief, and promotional hand fans.
            </p>
          </div>

          <ProductCatalog onSelectProduct={(productName) => navigate('calculator', { product: productName })} />
        </div>
      </section>

      {/* 3. Interactive 3D Virtual Studio */}
      <section style={{ padding: '50px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
            <span className="foil-badge" style={{ marginBottom: '10px' }}>
              ✦ 3D SIMULATOR
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
              Interactive 3D <span className="gold-gradient-text">Studio</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
              Rotate in real time to experience 24K gold foil reflection glare, 5D lenticular motion, and daily leaf tear-off.
            </p>
          </div>

          <ThreeDViewer />
        </div>
      </section>

      {/* 4. The Sivakasi Manufacturing Advantage (Clean 4-Pillar Grid) */}
      <section style={{ padding: '70px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <span className="foil-badge" style={{ marginBottom: '10px' }}>
              ✦ FACTORY ASSURANCE
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
              Why Order Direct from <span className="gold-gradient-text">Sivakasi Works</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
              Direct factory production with strict Heidelberg quality control and zero middleman markups.
            </p>
          </div>

          <div className="advantages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px' }}>
            <div style={advantageCardStyle}>
              <span style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}>🏭</span>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>Direct Factory Pricing</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Save 30% to 42% by purchasing direct from our Sivakasi manufacturing presses. Transparent volume tier slabs.
              </p>
            </div>

            <div style={advantageCardStyle}>
              <span style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}>👑</span>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>130°C Heated 24K Gold Die</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                German metallic foils and brass die stamping on virgin kappa board for guaranteed flat hanging and mirror shine.
              </p>
            </div>

            <div style={advantageCardStyle}>
              <span style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}>📐</span>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>Free 3D Digital Proofing</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Review a 3D digital color proof with your exact corporate branding and advertisement details before press run.
              </p>
            </div>

            <div style={advantageCardStyle}>
              <span style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}>🚚</span>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>Pan-India Doorstep Dispatch</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Corrugated master box packing with tracked priority delivery via BlueDart, VRL, and express freight across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Minimalist Corporate Trust Strip */}
      <section style={{ padding: '24px 0', background: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '10px' }}>
            ✦ Trusted by Over 4,500+ Corporate Brands, Jewellers & Retail Distributors Pan-India
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)' }}>
            <span>Chennai</span>
            <span>•</span>
            <span>Bengaluru</span>
            <span>•</span>
            <span>Mumbai</span>
            <span>•</span>
            <span>Hyderabad</span>
            <span>•</span>
            <span>Coimbatore</span>
            <span>•</span>
            <span>Madurai</span>
            <span>•</span>
            <span>New Delhi</span>
          </div>
        </div>
      </section>

      {/* 6. Complimentary Swatch Box Callout Banner */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container">
          <div
            className="swatch-banner-card home-swatch-box"
            style={{
              background: 'linear-gradient(145deg, #1b1e24 0%, #0d0f14 100%)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px 48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              boxShadow: '0 20px 45px rgba(0,0,0,0.6), 0 0 30px rgba(215, 134, 0, 0.15)'
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <span className="foil-badge" style={{ marginBottom: '10px' }}>
                COMPLIMENTARY CONCIERGE
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
                Inspect Our 400 GSM Kappa Boards & 24K Metallic Foils In Person
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                We ship a complimentary Master Swatch Box containing tactile paper grammages, metallic foil color chips, and print proofs to corporate brand leaders across India. Free of charge.
              </p>
            </div>
            <button
              onClick={onOpenSampleKit}
              className="btn-gold"
              style={{ padding: '14px 28px', fontSize: '0.95rem' }}
            >
              Request Free Master Swatch Kit →
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .advantages-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .swatch-banner-card, .home-swatch-box {
            padding: 24px 18px !important;
          }
          .swatch-banner-card button, .home-swatch-box button {
            width: 100% !important;
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
  padding: '26px 20px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'var(--shadow-md)',
  transition: 'border-color 0.2s ease'
};
