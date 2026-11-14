import { useState } from 'react';

const PAPERS = [
  {
    name: 'Rigid Kappa Board & Imported PET Foil',
    weight: '400 to 600 GSM',
    origin: 'Sivakasi Works',
    desc: 'Heavyweight rigid unbending kappa board backing bonded with imported mirror metallic PET film. Engineered for high-temperature foil stamping, tear-proof longevity, and water resistance.',
    idealFor: 'Gold / Silver PET Foil Calendar',
    accentColor: '#d4af37',
    tag: 'PET Foil Core'
  },
  {
    name: '75 LPI Optical Lenticular 5D Sheet',
    weight: '0.45mm Optical Sheet',
    origin: 'High-Precision Micro-Extrusion',
    desc: 'Precision micro-lenticular lens sheet that produces realistic 5D spatial depth and dual-angle image morphing without 3D glasses. Shatter-proof and moisture resistant.',
    idealFor: 'Custom 5D Calendars',
    accentColor: '#3b82f6',
    tag: '5D Optical'
  },
  {
    name: 'Composite Stone Powder & Sculptural Resin',
    weight: 'Hand-Moulded Relief',
    origin: 'Artisan Heritage Studio',
    desc: 'Natural stone powder and high-density polymer compound forming tactile 3D sculptural reliefs. Hand-finished with stone washes and antique gold accents.',
    idealFor: 'Stone Art Calendars',
    accentColor: '#10b981',
    tag: 'Stone Art'
  },
  {
    name: 'Virgin Polypropylene (PP) Flexible Plastic',
    weight: '0.6mm PP / 350 GSM Laminated Card',
    origin: 'High-Speed Precision Die-Cut',
    desc: 'Unbreakable virgin PP polymer with smooth edge finishing. Water-resistant and ultra-lightweight for continuous breeze generation and outdoor durability.',
    idealFor: 'Promotional Advertising Hand Fans',
    accentColor: '#ec4899',
    tag: 'Hand Fan'
  },
  {
    name: 'Cast Acrylic & Velvet MDF Wood',
    weight: 'Bespoke Executive Spec',
    origin: 'Precision CNC & Laser Studio',
    desc: 'Optical grade cast acrylic panels with laser-etched edge lighting, rich leatherette covers, and velvet-lined luxury gift cases.',
    idealFor: 'Special Products & Executive Gift Sets',
    accentColor: '#8b5cf6',
    tag: 'Special Products'
  }
];

const FINISHES = [
  {
    name: 'Mirror Gold & Silver Foil Embossing',
    badge: '130°C Hot Stamping',
    desc: 'Heated to 130°C under 5 tons of hydraulic tonnage, bonding German metallic foil into rigid kappa board for an intense mirror reflection.',
    icon: '✦'
  },
  {
    name: 'Dynamic 5D Holographic Motion',
    badge: 'Dual-Angle Morph',
    desc: 'Micro-optical lenticular lenses refract two distinct visual phases as the viewer moves past the calendar, creating realistic 3D depth.',
    icon: '🌀'
  },
  {
    name: 'Sculpted Antique Stone Wash & Gems',
    badge: 'Handcrafted Relief',
    desc: 'Multi-level artisanal stone texturing with hand-studded Kundan gems and rich velvet accents.',
    icon: '🗿'
  },
  {
    name: 'Double-Sided Offset & Screen Print',
    badge: 'Vibrant CMYK + Spot UV',
    desc: 'Full-bleed high-definition color reproduction on PP hand fans and special corporate gift packaging.',
    icon: '🪭'
  }
];

export const Craftsmanship = () => {
  const [activePaperIdx, setActivePaperIdx] = useState(0);

  return (
    <section id="craft" style={{ padding: '0 0 50px', background: 'transparent', position: 'relative' }}>
      <div className="container">
        {/* Paper Swatches Interactive Exploration */}
        <div
          className="craft-container-card craft-paper-box"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            marginBottom: '48px',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Tactile Paper Substrates</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click a swatch to inspect grammage, origin, and archival characteristics</p>
            </div>
            <span className="gold-gradient-text" style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
              100% ACID-FREE & FSC CERTIFIED
            </span>
          </div>

          {/* Swatch Navigation Tabs */}
          <div className="craft-swatches-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '14px', marginBottom: '28px' }}>
            {PAPERS.map((p, idx) => {
              const active = activePaperIdx === idx;
              return (
                <div
                  key={p.name}
                  onClick={() => setActivePaperIdx(idx)}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: active ? 'rgba(215, 134, 0, 0.18)' : 'var(--bg-input)',
                    border: `1.5px solid ${active ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      background: p.accentColor,
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)',
                      border: '1px solid rgba(0,0,0,0.2)',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <p style={{ fontSize: '0.88rem', fontWeight: 600, color: active ? '#fff' : 'var(--text-primary)' }}>
                      {p.name.split(' ')[0]} {p.name.split(' ')[1]}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {p.weight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Paper Details Panel */}
          {PAPERS[activePaperIdx] && (
            <div
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '30px',
                alignItems: 'center'
              }}
              className="paper-detail-card paper-detail-grid"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span className="foil-badge">{PAPERS[activePaperIdx].tag}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    MILL ORIGIN: {PAPERS[activePaperIdx].origin}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>
                  {PAPERS[activePaperIdx].name} ({PAPERS[activePaperIdx].weight})
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '16px' }}>
                  {PAPERS[activePaperIdx].desc}
                </p>
                <div style={{ fontSize: '0.82rem' }}>
                  <strong className="gold-gradient-text" style={{ fontWeight: 800 }}>Ideal Application:</strong> <span style={{ color: 'var(--text-secondary)' }}>{PAPERS[activePaperIdx].idealFor}</span>
                </div>
              </div>

              {/* Visual Texture Simulation */}
              <div
                style={{
                  background: PAPERS[activePaperIdx].accentColor,
                  color: '#1a1815',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.2)',
                  fontFamily: 'var(--font-serif)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#63584c' }}>
                  TACTILE PRESS PROOF
                </span>
                <p style={{ fontSize: '1.3rem', fontWeight: 700, margin: '12px 0 6px', color: '#252019' }}>
                  KALENDARIUM
                </p>
                <div style={{ width: '40px', height: '1px', background: '#b8923a', margin: '0 auto 10px' }} />
                <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#574c40', maxWidth: '240px', margin: '0 auto' }}>
                  Natural fiber tooth calibrated for high-pigment offset printing.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Master Finishes Showcase */}
        <div>
          <h3 style={{ fontSize: '1.4rem', color: '#fff', textAlign: 'center', marginBottom: '32px' }}>
            Heated Foil Stamping & Embellishment Repertoire
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {FINISHES.map((f) => (
              <div
                key={f.name}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-card)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.3s ease'
                }}
                className="finish-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.8rem', color: 'var(--accent-gold-bright)' }}>{f.icon}</span>
                  <span style={{ fontSize: '0.7rem', color: '#FFD72E', background: 'rgba(215, 134, 0, 0.16)', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    {f.badge}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>{f.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .finish-card:hover {
          border-color: var(--border-gold);
          transform: translateY(-4px);
        }
        @media (max-width: 840px) {
          .paper-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .craft-container-card, .craft-paper-box {
            padding: 22px 16px !important;
          }
          .paper-detail-card {
            padding: 20px 16px !important;
          }
          .craft-swatches-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
};
