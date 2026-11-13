import { useState } from 'react';

const MONTHS = [
  { name: 'JANUARY', days: 31, startDay: 3, quote: 'A fresh beginning forged with intentional craftsmanship.' },
  { name: 'FEBRUARY', days: 28, startDay: 6, quote: 'Mastery in printing is the balance of pressure and restraint.' },
  { name: 'MARCH', days: 31, startDay: 6, quote: 'Growth requires deep roots in authentic materials.' },
  { name: 'APRIL', days: 30, startDay: 2, quote: 'Clarity in composition creates timeless architecture.' },
  { name: 'MAY', days: 31, startDay: 4, quote: 'Obsession over minute details reveals true luxury.' },
  { name: 'JUNE', days: 30, startDay: 0, quote: 'Sunlight catches gold foil only where the die strikes true.' },
  { name: 'JULY', days: 31, startDay: 2, quote: 'Summer reflection on archival cotton leaves.' },
  { name: 'AUGUST', days: 31, startDay: 5, quote: 'Patience in drying yields enduring permanence.' },
  { name: 'SEPTEMBER', days: 30, startDay: 1, quote: 'The turn of season, the turn of a crisp heavy page.' },
  { name: 'OCTOBER', days: 31, startDay: 3, quote: 'Rich autumnal tones pressed with soy organic pigments.' },
  { name: 'NOVEMBER', days: 30, startDay: 6, quote: 'Year-end reflections bound in solid American walnut.' },
  { name: 'DECEMBER', days: 31, startDay: 1, quote: 'Celebrating a year of distinction and visionary partnerships.' }
];

export const VirtualProofing = () => {
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(0);
  const [foilEnabled, setFoilEnabled] = useState(true);
  const [paperTexture, setPaperTexture] = useState<'linen' | 'cotton' | 'kraft'>('linen');
  const [brandLogoText, setBrandLogoText] = useState('AMAZING ADS & CO.');

  const currentMonth = MONTHS[selectedMonthIdx];

  // Helper to generate day grid
  const daysArray = Array.from({ length: currentMonth.days }, (_, i) => i + 1);
  const leadingBlanks = Array.from({ length: currentMonth.startDay }, (_, i) => i);

  return (
    <section id="proofing" style={{ padding: '0 0 50px', background: 'transparent', position: 'relative' }}>
      <div className="container">
        {/* Controls & Simulator Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '40px',
            alignItems: 'start'
          }}
          className="proofing-grid"
        >
          {/* Left Column: Proofing Controls */}
          <div
            className="proofing-controls-box"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <div>
              <label>Custom Brand Watermark</label>
              <input
                type="text"
                value={brandLogoText}
                onChange={(e) => setBrandLogoText(e.target.value)}
                placeholder="Enter your corporate brand"
                style={{ fontSize: '0.9rem' }}
              />
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Type to see your brand rendered onto the live page base.
              </p>
            </div>

            {/* Foil Toggle */}
            <div>
              <label>Heated Brass Foil Embellishment</label>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  background: 'var(--bg-input)',
                  padding: '4px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setFoilEnabled(false)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '4px',
                    background: !foilEnabled ? 'rgba(255,255,255,0.1)' : 'transparent',
                    border: 'none',
                    color: !foilEnabled ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Matte Pigment
                </button>
                <button
                  type="button"
                  onClick={() => setFoilEnabled(true)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '4px',
                    background: foilEnabled ? 'linear-gradient(135deg, #cfa84e 0%, #8c6e26 100%)' : 'transparent',
                    border: 'none',
                    color: foilEnabled ? '#000' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ✦ 24K Gold Foil
                </button>
              </div>
            </div>

            {/* Paper Texture Stock */}
            <div>
              <label>Simulated Paper Substrate</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'linen', label: '350 GSM Italian Linen', color: '#fcfaf6' },
                  { id: 'cotton', label: '450 GSM Cotton Letterpress', color: '#f8f5ee' },
                  { id: 'kraft', label: '300 GSM Recycled Earth Kraft', color: '#d9c6aa' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPaperTexture(item.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: paperTexture === item.id ? 'rgba(207, 168, 78, 0.15)' : 'var(--bg-input)',
                      border: `1px solid ${paperTexture === item.id ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                      color: paperTexture === item.id ? '#fff' : 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        background: item.color,
                        border: '1px solid rgba(0,0,0,0.2)'
                      }}
                    />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pre-Flight Checklist */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                Pre-Flight Press Verification:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem', color: '#34d399' }}>
                <li>✓ 300 DPI High-Gamut Optical Calibration</li>
                <li>✓ 3mm Safe Cut Bleed Coordinates</li>
                <li>✓ Heidelberg Micro-Register Alignment</li>
              </ul>
            </div>
          </div>

          {/* Right Column: The Digital Calendar Proof */}
          <div>
            {/* Month Carousel Selector */}
            <div
              className="scroll-pills-row"
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '12px',
                marginBottom: '20px'
              }}
            >
              {MONTHS.map((m, idx) => (
                <button
                  key={m.name}
                  onClick={() => setSelectedMonthIdx(idx)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedMonthIdx === idx ? 'var(--accent-gold)' : 'var(--bg-card)',
                    color: selectedMonthIdx === idx ? '#0b0c0e' : 'var(--text-secondary)',
                    border: `1px solid ${selectedMonthIdx === idx ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.05em'
                  }}
                >
                  {m.name.slice(0, 3)}
                </button>
              ))}
            </div>

            {/* The Actual Calendar Sheet Canvas */}
            <div
className="virtual-calendar-sheet proofing-canvas-sheet"
              style={{
                background: paperTexture === 'kraft' ? '#d5c2a5' : paperTexture === 'cotton' ? '#f5f2e9' : '#faf8f2',
                color: '#1a1815',
                borderRadius: 'var(--radius-lg)',
                padding: '48px 40px',
                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), inset 0 0 80px rgba(0,0,0,0.06)',
                border: '1px solid #d4ccbd',
                position: 'relative',
                minHeight: '480px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'background 0.3s ease'
              }}
            >
              {/* Top Punch Hole & Wire Loop Mock */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#25211b', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)' }} />
                <div style={{ width: '40px', height: '4px', background: '#caa24d', borderRadius: '2px' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#25211b', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)' }} />
              </div>

              {/* Calendar Sheet Header */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid rgba(0,0,0,0.08)', paddingBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7a6f62', fontWeight: 600 }}>
                      EDITION MMXXVII • BESPOKE PRESS
                    </span>
                    <h1
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '2.8rem',
                        fontWeight: 700,
                        margin: '6px 0 0',
                        color: foilEnabled ? '#a67c1e' : '#1f1c19',
                        textShadow: foilEnabled ? '0 1px 2px rgba(255,255,255,0.8), 0 0 10px rgba(207, 168, 78, 0.4)' : 'none',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {currentMonth.name}
                    </h1>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: foilEnabled ? '#966d18' : '#332d26' }}>
                      2027
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#7a6f62', fontStyle: 'italic', maxWidth: '240px', marginTop: '4px' }}>
                      "{currentMonth.quote}"
                    </p>
                  </div>
                </div>

                {/* Days of Week Header */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    textAlign: 'center',
                    marginTop: '24px',
                    marginBottom: '14px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: '#6e6254',
                    letterSpacing: '0.08em'
                  }}
                >
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span style={{ color: '#b85d3b' }}>SAT</span>
                  <span style={{ color: '#b85d3b' }}>SUN</span>
                </div>

                {/* Days Matrix */}
                <div
                  className="virtual-calendar-dates"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '12px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    color: '#24201a'
                  }}
                >
                  {leadingBlanks.map((b) => (
                    <div key={`blank-${b}`} style={{ opacity: 0.15 }}>•</div>
                  ))}

                  {daysArray.map((day) => {
                    const isToday = day === 15;
                    const isSunday = (day + currentMonth.startDay) % 7 === 0;
                    return (
                      <div
                        key={day}
                        style={{
                          padding: '8px 0',
                          borderRadius: '6px',
                          background: isToday ? (foilEnabled ? 'rgba(207, 168, 78, 0.3)' : 'rgba(0,0,0,0.08)') : 'transparent',
                          color: isSunday ? '#b85d3b' : (isToday ? '#73510b' : '#24201a'),
                          fontWeight: isToday ? 800 : (isSunday ? 700 : 500),
                          border: isToday ? '1px solid rgba(207, 168, 78, 0.5)' : 'none'
                        }}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Client Corporate Branding Area */}
              <div
                className="virtual-sheet-footer"
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.1)',
                  paddingTop: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.78rem',
                  color: '#695f54'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: foilEnabled ? 'linear-gradient(135deg, #cfa84e 0%, #8c6e26 100%)' : '#332d26',
                      color: foilEnabled ? '#000' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.75rem'
                    }}
                  >
                    ★
                  </div>
                  <strong style={{ letterSpacing: '0.12em', color: foilEnabled ? '#856214' : '#1f1c19' }}>
                    {brandLogoText.toUpperCase()}
                  </strong>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#827668' }}>
                  PRESS MASTER PROOF • CERTIFIED 300 DPI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .proofing-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 640px) {
          .proofing-controls-box {
            padding: 20px 16px !important;
          }
          .proofing-canvas-sheet {
            padding: 24px 16px !important;
            min-height: 400px !important;
          }
        }
        @media (max-width: 640px) {
          .virtual-calendar-sheet {
            padding: 24px 14px 20px !important;
            min-height: auto !important;
          }
          .virtual-calendar-dates {
            gap: 4px !important;
            font-size: 0.82rem !important;
          }
          .virtual-sheet-footer {
            flex-direction: column !important;
            gap: 8px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
};
