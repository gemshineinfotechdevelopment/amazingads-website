import { useState, useRef, type MouseEvent } from 'react';

type ThreeDMode = 'gold-foil' | 'lenticular-3d' | 'daily-tear' | 'photo-frame' | 'kundan-stone';

export const ThreeDViewer = () => {
  const [activeMode, setActiveMode] = useState<ThreeDMode>('gold-foil');
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [lenticularPhase, setLenticularPhase] = useState<'A' | 'B'>('A');
  const [dailySheetNumber, setDailySheetNumber] = useState(14);
  const [isPeeling, setIsPeeling] = useState(false);

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

    // In lenticular mode: shift image phase based on horizontal tilt angle
    if (activeMode === 'lenticular-3d') {
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

  const handleTearDailySheet = () => {
    if (isPeeling) return;
    setIsPeeling(true);
    setTimeout(() => {
      setDailySheetNumber(prev => (prev < 31 ? prev + 1 : 1));
      setIsPeeling(false);
    }, 600);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* 3D Mode Switcher Tabs */}
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
          { id: 'gold-foil', label: '✦ 24K Real Gold Foil Stamped', icon: '👑' },
          { id: 'photo-frame', label: '🖼️ 24K Gold Foil Photo Frame', icon: '🖼️' },
          { id: 'lenticular-3d', label: '✨ 3D / 5D Lenticular Motion', icon: '🌀' },
          { id: 'daily-tear', label: '📅 Daily Sheet Panchangam Peel', icon: '🗓️' },
          { id: 'kundan-stone', label: '💎 Kundan Stone & Relief', icon: '🪨' }
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
            maxWidth: '92vw',
            minHeight: '480px',
            background: '#12161f',
            borderRadius: '16px',
            border: '2px solid rgba(212, 175, 55, 0.4)',
            boxShadow: isHovered
              ? '0 30px 60px rgba(0, 0, 0, 0.9), 0 0 45px rgba(212, 175, 55, 0.35)'
              : '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 175, 55, 0.15)',
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
            
            {/* MODE 1: 24K Real Gold Foil Stamped Wall */}
            {activeMode === 'gold-foil' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                {/* 3D Embossed Devotional / Royal Icon */}
                <div>
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      margin: '10px auto 16px',
                      background: 'radial-gradient(circle, #f7e6a7 0%, #cfa84e 60%, #735716 100%)',
                      border: '3px solid #ffea9f',
                      boxShadow: '0 8px 25px rgba(207, 168, 78, 0.5), inset 0 2px 10px rgba(255,255,255,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.8rem',
                      color: '#423105',
                      transform: 'translateZ(30px)'
                    }}
                  >
                    👑
                  </div>

                  <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-gold-bright)', fontWeight: 800, textTransform: 'uppercase' }}>
                    SIVAKASI GOLD FOIL PRESS
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
                    SRI LAKSHMI KUBERA
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Heated German Foil • 400 GSM Rigid Virgin Board
                  </p>
                </div>

                {/* Bottom Header Advertisement Slot */}
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
                    YOUR COMPANY NAME HERE
                  </p>
                  <p style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Dealer in All Industrial Goods • Phone: +91 98400 XXXXX
                  </p>
                </div>
              </div>
            )}

            {/* MODE: 24K Gold Foil Photo Frame */}
            {activeMode === 'photo-frame' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #2b1d0c 0%, #170f06 100%)',
                    border: '8px solid #cfa84e',
                    borderRadius: '12px',
                    padding: '24px 16px',
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.8), 0 10px 30px rgba(207, 168, 78, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Subtle glass reflection overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, transparent 40%, rgba(255,255,255,0.06) 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  <div
                    style={{
                      width: '90px',
                      height: '90px',
                      margin: '0 auto 14px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #ffe699 0%, #d4af37 60%, #876211 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      boxShadow: '0 6px 20px rgba(212, 175, 55, 0.6), inset 0 2px 6px #fff'
                    }}
                  >
                    🛕
                  </div>

                  <h3
                    style={{
                      fontSize: '1.3rem',
                      color: '#fff',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      textShadow: '0 2px 10px rgba(212, 175, 55, 0.7)'
                    }}
                  >
                    LORD VENKATESWARA
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#dfb76c', fontWeight: 600, marginTop: '4px' }}>
                    24K German Gold Leaf Stamping • Carved Teakwood Moulding
                  </p>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Shatterproof Crystal Acrylic • Dual Wall Cleat & Desk Strut
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(207, 168, 78, 0.12)',
                    border: '1px solid rgba(207, 168, 78, 0.3)',
                    borderRadius: '8px',
                    padding: '10px',
                    marginTop: '16px'
                  }}
                >
                  <p style={{ fontSize: '0.72rem', color: 'var(--accent-gold-bright)', fontWeight: 700 }}>
                    AMAZING ADS SIVAKASI DEVOTIONAL FRAME SPECIALTY
                  </p>
                  <p style={{ fontSize: '0.64rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Available for Tirupati Balaji, Murugan, Lakshmi, Mecca, and Velankanni
                  </p>
                </div>
              </div>
            )}

            {/* MODE 2: 3D / 5D Lenticular Motion */}
            {activeMode === 'lenticular-3d' && (
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
                      {lenticularPhase === 'A' ? 'TIRUPATI BALAJI DARSHAN' : 'ASHTA LAKSHMI VAIBHAVAM'}
                    </h4>
                    <span style={{ fontSize: '0.68rem', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: '4px', marginTop: '6px' }}>
                      Tilt mouse left/right to morph angle
                    </span>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold-bright)', marginTop: '14px', fontWeight: 700 }}>
                    75 LPI OPTICAL LENTICULAR MOTION
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Image visibly changes as viewer moves past calendar
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
                  Phase Active: <strong>View {lenticularPhase}</strong> (Angle: {Math.round(rotateY)}°)
                </div>
              </div>
            )}

            {/* MODE 3: Daily Sheet Panchangam Peel */}
            {activeMode === 'daily-tear' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div
                  style={{
                    background: '#fcfaf2',
                    color: '#1a140d',
                    borderRadius: '8px',
                    padding: '18px 14px',
                    boxShadow: isPeeling
                      ? '0 20px 40px rgba(0,0,0,0.6), 0 0 15px rgba(207, 168, 78, 0.4)'
                      : '0 8px 20px rgba(0,0,0,0.4)',
                    border: '1px solid #d4c8b2',
                    transition: 'all 0.3s ease',
                    transform: isPeeling ? 'scale(0.96) rotate(-2deg)' : 'scale(1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e0d6c2', paddingBottom: '6px', fontSize: '0.7rem', fontWeight: 700 }}>
                    <span style={{ color: '#8a2b06' }}>தை 1 (THAI 1)</span>
                    <span style={{ color: '#1a140d' }}>WEDNESDAY</span>
                    <span style={{ color: '#8a2b06' }}>PONGAL</span>
                  </div>

                  {/* Gigantic Day Number */}
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '5rem', fontWeight: 900, lineHeight: 1, color: '#1a140d', margin: '10px 0' }}>
                    {dailySheetNumber}
                  </div>

                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d6a4f' }}>
                    JANUARY 2027
                  </p>

                  {/* Micro Panchangam Details */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.62rem', color: '#574838', borderTop: '1px solid #e0d6c2', paddingTop: '8px', marginTop: '10px', textAlign: 'left' }}>
                    <div><strong>நல்ல நேரம்:</strong> 9.15 - 10.15</div>
                    <div><strong>இராகு காலம்:</strong> 12.00 - 1.30</div>
                    <div><strong>திதி:</strong> சுக்ல பக்ஷ துவாதசி</div>
                    <div><strong>நட்சத்திரம்:</strong> ரோகிணி</div>
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <button
                    onClick={handleTearDailySheet}
                    disabled={isPeeling}
                    className="btn-gold"
                    style={{ padding: '8px 18px', fontSize: '0.8rem', width: '100%' }}
                  >
                    {isPeeling ? 'Tearing Sheet...' : '✂️ Tear Off Daily Sheet (Simulate)'}
                  </button>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                    365 micro-perforated sheets with authentic Tamil Panchangam
                  </p>
                </div>
              </div>
            )}

            {/* MODE 4: Kundan Stone & Relief */}
            {activeMode === 'kundan-stone' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #400408 0%, #200204 100%)',
                    borderRadius: '8px',
                    border: '2px solid #e0a938',
                    padding: '20px',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 8px 25px rgba(224, 169, 56, 0.3)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
                    {['💎', '✨', '👑', '✨', '💎'].map((gem, i) => (
                      <span key={i} style={{ fontSize: '1.2rem', animation: 'foilShimmer 2s infinite' }}>{gem}</span>
                    ))}
                  </div>

                  <h4 style={{ fontSize: '1.25rem', color: '#ffd166', fontWeight: 800 }}>
                    KUNDAN GEM EMBELLISHED
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#f7b05b', marginTop: '4px', letterSpacing: '0.08em' }}>
                    HAND-SET STONES ON VELVET FLOCKING
                  </p>

                  <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '6px', fontSize: '0.72rem', color: '#e8d4b0' }}>
                    Deep 3D sculpted relief with multi-color Swarovski & Kundan crystals
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '14px' }}>
                  Luxury heirloom frame calendar for VIP New Year gifting
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
