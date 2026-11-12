import { useState, useRef, type MouseEvent } from 'react';

type ThreeDMode = 'pet-foil' | 'special-products' | 'custom-5d' | 'stone-art' | 'hand-fan';

export const ThreeDViewer = () => {
  const [activeMode, setActiveMode] = useState<ThreeDMode>('pet-foil');
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [lenticularPhase, setLenticularPhase] = useState<'A' | 'B'>('A');

  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse move 3D tilt tracking
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY });

    // In 5D lenticular mode: shift image phase based on horizontal tilt angle
    if (activeMode === 'custom-5d') {
      setLenticularPhase(rotY > 0 ? 'B' : 'A');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
    setLenticularPhase('A');
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* 3D Mode Switcher Tabs for 5 Products */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '28px'
        }}
      >
        {[
          { id: 'pet-foil', label: '✦ Gold/Silver PET Foil Calendar', icon: '👑' },
          { id: 'special-products', label: '🎁 Special Products', icon: '✨' },
          { id: 'custom-5d', label: '🌀 Custom 5D Calendars', icon: '🔮' },
          { id: 'stone-art', label: '🗿 Stone Art Calendars', icon: '🪨' },
          { id: 'hand-fan', label: '🪭 Hand Fan', icon: '🪭' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMode(tab.id as ThreeDMode)}
            style={{
              padding: '9px 18px',
              borderRadius: '24px',
              background: activeMode === tab.id ? 'var(--accent-gold)' : 'var(--bg-input)',
              color: activeMode === tab.id ? '#0b0c0e' : 'var(--text-secondary)',
              border: `1.5px solid ${activeMode === tab.id ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.25s ease'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main 3D Canvas Viewport */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1200px',
          padding: '20px 0 10px',
          minHeight: '520px'
        }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            width: '380px',
            minHeight: '480px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--border-gold)',
            boxShadow: isHovered ? 'var(--shadow-lg), var(--shadow-gold)' : 'var(--shadow-md)',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease',
            position: 'relative',
            cursor: 'grab',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Dynamic Metallic Light Glare / Specular Layer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 235, 160, ${isHovered ? 0.35 : 0.08}) 0%, transparent 60%)`,
              pointerEvents: 'none',
              zIndex: 10,
              mixBlendMode: 'overlay',
              transition: 'background 0.05s ease'
            }}
          />

          {/* Top Hanging Tin Plate / Brass Ring */}
          <div
            style={{
              background: 'linear-gradient(180deg, #d8ba63 0%, #876c24 50%, #574411 100%)',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(0,0,0,0.5)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              zIndex: 5
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#252016' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#161208', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)' }}>
                AMAZING ADS SIVAKASI
              </span>
            </div>
            {/* Center Hanging Loop */}
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '2.5px solid #fff',
                boxShadow: '0 0 4px rgba(0,0,0,0.6)'
              }}
            />
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#161208', fontFamily: 'var(--font-mono)' }}>
              2026–27
            </span>
          </div>

          {/* Main Visual Body based on Active 3D Mode */}
          <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            
            {/* PRODUCT 1: Gold / Silver PET Foil Calendar */}
            {activeMode === 'pet-foil' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      width: '105px',
                      height: '105px',
                      borderRadius: '50%',
                      margin: '10px auto 16px',
                      background: 'radial-gradient(circle, #f7e6a7 0%, #cfa84e 50%, #e2e8f0 80%, #735716 100%)',
                      border: '3px solid #ffea9f',
                      boxShadow: '0 8px 25px rgba(207, 168, 78, 0.5), inset 0 2px 10px rgba(255,255,255,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      color: '#423105',
                      transform: 'translateZ(30px)'
                    }}
                  >
                    👑
                  </div>

                  <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-gold-bright)', fontWeight: 800, textTransform: 'uppercase' }}>
                    GOLD / SILVER PET FOIL
                  </p>
                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: '#fff',
                      margin: '6px 0',
                      textShadow: '0 2px 8px rgba(207, 168, 78, 0.6)'
                    }}
                  >
                    ROYAL METALLIC EDITION
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Heated German Foil • Tear-Proof Water-Resistant PET Film
                  </p>
                </div>

                <div
                  style={{
                    background: 'linear-gradient(135deg, #1b202c 0%, #10141d 100%)',
                    border: '1.5px dashed var(--accent-gold)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginTop: '20px'
                  }}
                >
                  <p style={{ fontSize: '0.68rem', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.1em' }}>
                    YOUR COMPANY / BRAND EMBOSSED HERE
                  </p>
                  <p style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Mirror Gold / Silver Hot Foil Stamped • All-India Express Delivery
                  </p>
                </div>
              </div>
            )}

            {/* PRODUCT 2: Special Products */}
            {activeMode === 'special-products' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #1f1235 0%, #0d0717 100%)',
                    border: '2px solid #8b5cf6',
                    borderRadius: '12px',
                    padding: '24px 16px',
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.8), 0 10px 30px rgba(139, 92, 246, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: '90px',
                      height: '90px',
                      margin: '0 auto 14px',
                      borderRadius: '18px',
                      background: 'radial-gradient(circle, #ddd6fe 0%, #8b5cf6 60%, #4c1d95 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.6rem',
                      boxShadow: '0 6px 20px rgba(139, 92, 246, 0.6)'
                    }}
                  >
                    🎁
                  </div>

                  <h3
                    style={{
                      fontSize: '1.3rem',
                      color: '#fff',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      textShadow: '0 2px 10px rgba(139, 92, 246, 0.7)'
                    }}
                  >
                    SPECIAL PRODUCTS
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#c4b5fd', fontWeight: 600, marginTop: '4px' }}>
                    Acrylic LED Calendars • Laser Engraved Desk Sets • Executive Hampers
                  </p>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Bespoke corporate VIP packaging with magnetic closures
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(139, 92, 246, 0.12)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '8px',
                    padding: '10px',
                    marginTop: '16px'
                  }}
                >
                  <p style={{ fontSize: '0.72rem', color: '#a78bfa', fontWeight: 700 }}>
                    100% BESPOKE MADE-TO-ORDER PROTOTYPES
                  </p>
                  <p style={{ fontSize: '0.64rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Crafted according to company brand manual and custom dimensions
                  </p>
                </div>
              </div>
            )}

            {/* PRODUCT 3: Custom 5D Calendars */}
            {activeMode === 'custom-5d' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      border: '2px solid var(--accent-gold)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                      background: lenticularPhase === 'A'
                        ? 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)'
                        : 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
                      transition: 'background 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      padding: '20px'
                    }}
                  >
                    <span style={{ fontSize: '3rem', marginBottom: '8px' }}>
                      {lenticularPhase === 'A' ? '🛕' : '✨'}
                    </span>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                      {lenticularPhase === 'A' ? '5D HOLOGRAPHIC VIEW A' : 'DYNAMIC 5D MORPH VIEW B'}
                    </h4>
                    <span style={{ fontSize: '0.68rem', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: '4px', marginTop: '6px' }}>
                      Tilt mouse left / right to morph 5D angle
                    </span>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold-bright)', marginTop: '14px', fontWeight: 700 }}>
                    CUSTOM 5D LENTICULAR MOTION
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    75 LPI micro-lens depth • Visually transforms without 3D glasses
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Phase Active: <strong>5D View {lenticularPhase}</strong> (Angle: {Math.round(rotateY)}°)
                </div>
              </div>
            )}

            {/* PRODUCT 4: Stone Art Calendars */}
            {activeMode === 'stone-art' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #2b2622 0%, #171412 100%)',
                    borderRadius: '8px',
                    border: '2px solid #10b981',
                    padding: '20px',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 8px 25px rgba(16, 185, 129, 0.25)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
                    {['🗿', '✨', '🏛️', '✨', '🗿'].map((gem, i) => (
                      <span key={i} style={{ fontSize: '1.2rem' }}>{gem}</span>
                    ))}
                  </div>

                  <h4 style={{ fontSize: '1.25rem', color: '#6ee7b7', fontWeight: 800 }}>
                    STONE ART RELIEF
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#a7f3d0', marginTop: '4px', letterSpacing: '0.08em' }}>
                    SCULPTURAL TEXTURE & ANTIQUE WASH
                  </p>

                  <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '6px', fontSize: '0.72rem', color: '#d1fae5' }}>
                    Real composite stone powder & high-density resin relief with handcrafted antique brushing
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '14px' }}>
                  Luxury heirloom stone frame calendar for prestige corporate gifting
                </div>
              </div>
            )}

            {/* PRODUCT 5: Hand Fan */}
            {activeMode === 'hand-fan' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #371424 0%, #1f0b14 100%)',
                    borderRadius: '50% 50% 12px 12px',
                    border: '2px solid #ec4899',
                    padding: '24px 16px',
                    boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>
                    🪭
                  </div>

                  <h4 style={{ fontSize: '1.25rem', color: '#f472b6', fontWeight: 800 }}>
                    PROMOTIONAL HAND FAN
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#fbcfe8', marginTop: '4px', letterSpacing: '0.05em' }}>
                    VIRGIN PP PLASTIC & WATERPROOF LAMINATED
                  </p>

                  <div style={{ marginTop: '14px', background: 'rgba(0,0,0,0.4)', padding: '8px', borderRadius: '6px', fontSize: '0.7rem', color: '#fff' }}>
                    Ergonomic snap-resistant handle • Both-side offset advertising print
                  </div>
                </div>

                {/* Simulated Fan Handle */}
                <div style={{ width: '22px', height: '50px', background: 'linear-gradient(180deg, #ec4899 0%, #be185d 100%)', margin: '-10px auto 10px', borderRadius: '4px', boxShadow: '0 4px 8px rgba(0,0,0,0.5)' }} />

                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  High ROI viral advertising for political rallies, summer expos, & temples
                </div>
              </div>
            )}

          </div>

          {/* Bottom Footnote on 3D Card */}
          <div
            style={{
              background: 'rgba(0,0,0,0.6)',
              padding: '6px 12px',
              fontSize: '0.62rem',
              color: 'var(--accent-gold-bright)',
              textAlign: 'center',
              borderTop: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            ✦ INTERACTIVE 3D GYRO SIMULATOR • MOVE CURSOR TO TILT
          </div>
        </div>
      </div>
    </div>
  );
};
