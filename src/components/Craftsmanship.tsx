import { useState } from 'react';

const PAPERS = [
  {
    name: 'Virgin Kappa Board (Rigid Core)',
    weight: '400 to 600 GSM',
    origin: 'Sivakasi Works',
    desc: 'Heavyweight rigid unbending kappa board backing engineered specifically for high-temperature brass foil die stamping and hydraulic relief embossing. Guaranteed zero-curl throughout the full calendar year.',
    idealFor: '24K Gold Foil Wall Calendars & Kundan Stone Luxury Frames',
    accentColor: '#d6c8b2',
    tag: 'Flagship Core'
  },
  {
    name: '75 LPI Optical Lenticular PET',
    weight: '0.45mm Lenticular Sheet',
    origin: 'High-Precision Optical Extrusion',
    desc: 'Precision micro-lenticular lens sheet that produces realistic 3D spatial depth and dual-angle image morphing without 3D glasses. Shatter-proof and moisture resistant.',
    idealFor: '3D & 5D Motion Wall Calendars',
    accentColor: '#c5d3e8',
    tag: '3D Optical'
  },
  {
    name: 'Bilt Royal Gloss & Matte Art Paper',
    weight: '170 to 300 GSM',
    origin: 'Bilt Royal Mills',
    desc: 'Double-blade coated art paper delivering ultra-crisp offset image definition, high dot reproduction, and vibrant color saturation. Paired with thermal gloss or soft-touch matte lamination.',
    idealFor: '12-Sheet Multi-Page Wall & Executive Desk Calendars',
    accentColor: '#f4f1ea',
    tag: 'Corporate Prime'
  },
  {
    name: 'Smooth Maplitho Daily Leaf',
    weight: '60 GSM',
    origin: 'High-Speed Web Offset Mills',
    desc: 'Ultra-smooth natural shade maplitho engineered for high-speed rotary web printing and crisp micro-perforated tear-off action. Crystal clear daily panchangam and Thirukkural printing.',
    idealFor: '365-Day Daily Panchangam Tear-Off Blocks',
    accentColor: '#fbf9f4',
    tag: 'Daily Volume'
  }
];

const FINISHES = [
  {
    name: '24K Heated Brass Die Gold Foil',
    badge: '130°C Hot Stamping',
    desc: 'Heated to 130°C under 5 tons of hydraulic tonnage, bonding German metallic gold foil into rigid kappa board for an intense mirror reflection.',
    icon: '✦'
  },
  {
    name: 'High-Tonnage Hydraulic Relief Emboss',
    badge: '3D Sculpted Depth',
    desc: 'Multi-level hand-tooled brass counter dies produce elevated relief contours on deities, royal architecture, and corporate insignias.',
    icon: '◈'
  },
  {
    name: '3D / 5D Lenticular Optical Motion',
    badge: 'Dual-Angle Morph',
    desc: 'Micro-optical lenticular lenses refract two distinct visual phases as the viewer moves past the calendar, creating realistic 3D depth.',
    icon: '🌀'
  },
  {
    name: 'Anti-Rust Tin Plate Mounting',
    badge: 'Sivakasi Tin Clamping',
    desc: 'Machine-crimped electroplated tin top band with central galvanized wire loop hanger that holds rigid against wall humidity.',
    icon: '❖'
  }
];

export const Craftsmanship = () => {
  const [activePaperIdx, setActivePaperIdx] = useState(0);

  return (
    <section id="craft" style={{ padding: '0 0 50px', background: 'transparent', position: 'relative' }}>
      <div className="container">
        {/* Paper Swatches Interactive Exploration */}
        <div
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
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)' }}>
              100% ACID-FREE & FSC CERTIFIED
            </span>
          </div>

          {/* Swatch Navigation Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {PAPERS.map((p, idx) => {
              const active = activePaperIdx === idx;
              return (
                <div
                  key={p.name}
                  onClick={() => setActivePaperIdx(idx)}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: active ? 'rgba(207, 168, 78, 0.12)' : 'var(--bg-input)',
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
              className="paper-detail-grid"
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
                <div style={{ fontSize: '0.82rem', color: 'var(--accent-gold-bright)' }}>
                  <strong>Ideal Application:</strong> {PAPERS[activePaperIdx].idealFor}
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
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold-bright)', background: 'rgba(207, 168, 78, 0.1)', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
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
      `}</style>
    </section>
  );
};
