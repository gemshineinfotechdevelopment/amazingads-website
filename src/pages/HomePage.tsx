import { useState, useEffect, type CSSProperties } from 'react';
import { useRouter } from '../context/RouterContext';
import { Hero } from '../components/Hero';
import { ThreeDViewer } from '../components/ThreeDViewer';
import { getStoredFactorySettings, type FactorySettings } from '../services/api';

interface ProductCategoryItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  description: string;
  startingPrice: string;
  targetProduct: string;
  highlights: string[];
}

const PRODUCT_CATEGORIES: ProductCategoryItem[] = [
  {
    id: 'pet-foil',
    title: 'Gold / Silver PET Foil Calendars',
    tag: '👑 24K Gold & Silver Foil',
    image: '/images/pet-foil-calendar-real.jpg',
    description: 'High-temperature metallic gold & silver foil stamping on tear-proof, moisture-resistant PET film with deep hydraulic relief embossing.',
    startingPrice: '₹125',
    targetProduct: 'Gold / Silver PET Foil Calendar',
    highlights: ['Mirror Metallic PET Foil', 'Hydraulic Relief Embossing', 'Tear-Proof & Water-Proof']
  },
  {
    id: 'custom-5d',
    title: 'Custom 5D Holographic Calendars',
    tag: '🌀 5D Lenticular Motion',
    image: '/images/custom-5d-calendar-real.jpg',
    description: 'Micro-optical lenticular lenses delivering dynamic 3D optical depth perception and animated angle-morphing motion flip with golden frames.',
    startingPrice: '₹220',
    targetProduct: 'Custom 5D Calendars (Lord Murugan Edition)',
    highlights: ['True 5D Optical Depth', 'Dual-Angle Image Morph Flip', 'Deluxe Golden Moulded Frame']
  },
  {
    id: 'stone-art',
    title: 'Stone Art Sculptural Calendars',
    tag: '🗿 Sculpted Stone Relief',
    image: '/images/stone-art-calendar-real.jpg',
    description: 'Heirloom decorative calendars simulating temple stone carvings with tactile relief, hand-finished stone washes, and antique gold brushing.',
    startingPrice: '₹250',
    targetProduct: 'Stone Art Sculptural Calendars (Lord Balaji Edition)',
    highlights: ['Sculpted Stone Relief Texture', 'Hand-Brushed Antique Patina', 'Carved Heritage Frame Finish']
  },
  {
    id: 'hand-fan',
    title: 'Promotional Advertising Hand Fans',
    tag: '🪭 High-Impact Promotion',
    image: '/images/hand-fan-promo-real.jpg',
    description: 'Unbreakable virgin PP plastic and waterproof laminated duplex hand fans engineered for mass-reach corporate and festival advertising.',
    startingPrice: '₹28',
    targetProduct: 'Promotional Hand Fan (Lord Ganesha Edition)',
    highlights: ['Unbreakable Virgin PP Plastic', 'Double-Sided 4-Color Vibrant Print', 'Ergonomic Non-Snap Grip Handle']
  },
  {
    id: 'special-products',
    title: 'Special Products & VIP Gift Sets',
    tag: '🎁 Bespoke Corporate Gifts',
    image: '/images/special-products-gift-real.jpg',
    description: '24K Devotional Gold Foil Frames, illuminated acrylic LED calendars, bespoke luxury gift boxes, and executive hampers for corporate milestones.',
    startingPrice: '₹195',
    targetProduct: '24K Devotional Gold Foil Frame (Lord Ayyappan Edition)',
    highlights: ['Laser Engraved & Spot UV Finishing', 'Illuminated Acrylic LED Options', 'Luxury Magnetic Gift Box Sets']
  }
];

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

      {/* Our Products - 5 Signature Manufacturing Categories */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 42px' }}>
            <span className="foil-badge" style={{ marginBottom: '12px' }}>
              ✦ SIVAKASI PRESS EDITIONS
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: '12px' }}>
              Our <span className="gold-gradient-text">Products</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
              Direct factory wholesale manufacturing. Explore our 5 signature manufacturing lines engineered with 24K gold foil, 5D lenticular lenses, sculpted stone craft, and promotional tools.
            </p>
          </div>

          {/* 5 Product Categories Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              marginBottom: '40px'
            }}
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="product-cat-card"
                style={{
                  background: 'linear-gradient(180deg, #222320 0%, #171816 100%)',
                  border: '1px solid #454545',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
                }}
              >
                {/* Product Category Image Preview */}
                <div
                  style={{
                    position: 'relative',
                    height: '240px',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: '#10110e'
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="product-cat-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '8px',
                      zIndex: 3
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(3, 3, 3, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid #D78600',
                        color: '#FFD72E',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {cat.tag}
                    </span>

                    <span
                      style={{
                        background: 'linear-gradient(135deg, #FFD72E 0%, #D78600 100%)',
                        color: '#030303',
                        fontSize: '0.74rem',
                        fontWeight: 900,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        letterSpacing: '0.02em',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      Starts {cat.startingPrice}
                    </span>
                  </div>

                  {/* Gradient Shade on Bottom of Image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '70px',
                      background: 'linear-gradient(180deg, transparent 0%, rgba(34, 35, 32, 0.95) 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>

                {/* Card Information & Action */}
                <div
                  style={{
                    padding: '22px 24px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        marginBottom: '8px',
                        lineHeight: '1.3'
                      }}
                    >
                      {cat.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.86rem',
                        color: '#cbd5e1',
                        lineHeight: '1.55',
                        marginBottom: '16px'
                      }}
                    >
                      {cat.description}
                    </p>

                    {/* Feature Highlights */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '22px' }}>
                      {cat.highlights.map((h, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.78rem',
                            color: '#e2e8f0'
                          }}
                        >
                          <span style={{ color: '#FFD72E', fontSize: '0.72rem', flexShrink: 0 }}>✦</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <button
                      onClick={() => navigate('calculator', { product: cat.targetProduct })}
                      className="btn-gold"
                      style={{
                        flex: 1,
                        padding: '11px 16px',
                        fontSize: '0.86rem',
                        borderRadius: '8px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Configure & Quote →
                    </button>

                    <button
                      onClick={() => navigate('collections')}
                      className="btn-outline-gold"
                      style={{
                        padding: '11px 16px',
                        fontSize: '0.86rem',
                        borderRadius: '8px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Wholesale Catalog Link Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(215, 134, 0, 0.12) 0%, rgba(34, 35, 32, 0.8) 100%)',
              border: '1px solid #454545',
              borderRadius: '16px',
              padding: '24px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '18px'
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '4px', fontWeight: 800 }}>
                Looking for Detailed Specifications & Tiered Factory Pricing?
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', margin: 0 }}>
                Filter products by minimum order quantities, paper GSM, sizes, and instant tiered volume discounts.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('collections')}
                className="btn-gold"
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                View Full Wholesale Catalog →
              </button>
              <button
                onClick={onOpenSampleKit}
                className="btn-outline-gold"
                style={{ padding: '12px 20px', fontSize: '0.9rem' }}
              >
                Request Swatch Kit
              </button>
            </div>
          </div>
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
              { step: '02', title: 'Send Branding', desc: 'Share your company name, logo, phone, and address via online quote or inquiry form.' },
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
                <div className="gold-gradient-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>
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
                    <span className="gold-gradient-text" style={{ fontSize: '0.82rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                      {study.units}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{study.finish}</span>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '4px' }}>{study.client}</h4>
                  <p className="gold-gradient-text" style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '14px' }}>{study.project}</p>
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
              background: 'linear-gradient(145deg, #2E2F2B 0%, #121310 100%)',
              border: '1px solid #454545',
              borderRadius: 'var(--radius-xl)',
              padding: '48px 40px',
              boxShadow: '0 25px 60px rgba(3,3,3,0.8), 0 0 35px rgba(215, 134, 0, 0.2)'
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
                  <button
                    onClick={() => navigate('calculator')}
                    className="btn-gold"
                    style={{ padding: '12px 24px', fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    ⚡ Instant Factory Customizer
                  </button>
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
                      background: 'linear-gradient(135deg, #FFD72E 0%, #D78600 100%)',
                      color: '#030303',
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
                    <p className="gold-gradient-text" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
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
                    <span className="gold-gradient-text" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
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

                  <div style={{ borderTop: '1px solid #454545', paddingTop: '14px', marginTop: '6px' }}>
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
              background: 'linear-gradient(145deg, #2E2F2B 0%, #121310 100%)',
              border: '1px solid #454545',
              borderRadius: 'var(--radius-xl)',
              padding: '48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '28px',
              boxShadow: '0 20px 45px rgba(3,3,3,0.7), 0 0 30px rgba(215, 134, 0, 0.2)'
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
        .product-cat-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .product-cat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(215, 134, 0, 0.35) !important;
          border-color: #D78600 !important;
        }
        .product-cat-img {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .product-cat-card:hover .product-cat-img {
          transform: scale(1.06);
        }
        .dept-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dept-card:hover {
          border-color: var(--border-gold-hover) !important;
          transform: translateY(-5px);
          box-shadow: 0 16px 35px rgba(3,3,3,0.6), 0 0 25px rgba(215, 134, 0, 0.25);
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
