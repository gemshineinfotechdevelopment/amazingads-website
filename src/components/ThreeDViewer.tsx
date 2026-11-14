import { useState, useRef, type MouseEvent, type TouchEvent } from 'react';

type ThreeDMode =
  | 'pet-foil'
  | 'murugan-5d'
  | 'ayyappan-frame'
  | 'sivan-stone'
  | 'daily-panchangam'
  | 'hand-fan';

type GodKey = 'mahalakshmi' | 'murugan' | 'ayyappan' | 'sivan' | 'balaji' | 'ganesha';

const GOD_PROFILES: Record<
  GodKey,
  {
    nameTamil: string;
    nameEnglish: string;
    subtitle: string;
    img: string;
    fallback: string;
    accent: string;
    badge: string;
  }
> = {
  mahalakshmi: {
    nameTamil: 'Goddess Sri Gajalakshmi',
    nameEnglish: 'SRI GAJALAKSHMI DEVI',
    subtitle: 'Ashtalakshmi Blessings • Gold Coins & Sacred Elephant Abhishekam',
    img: '/images/gods/mahalakshmi.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gaja_Lakshmi.jpg',
    accent: '#d4af37',
    badge: '✦ 24K GOLD FOIL EMBOSSED'
  },
  murugan: {
    nameTamil: 'Lord Murugan (Karthikeya)',
    nameEnglish: 'LORD MURUGAN (KARTIKEYA)',
    subtitle: 'Golden Vel • Mayil Vahanam • Divine Victory Ornamentation',
    img: '/images/gods/murugan.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Murugan%2C_print_c._1930.jpg',
    accent: '#f59e0b',
    badge: '🌀 5D LENTICULAR MOTION'
  },
  ayyappan: {
    nameTamil: 'Swami Ayyappan (Sabarimala)',
    nameEnglish: 'SWAMI AYYAPPAN (SABARIMALA)',
    subtitle: '18 Sacred Steps • Yoga Chin Mudra • Harivarasanam Glory',
    img: '/images/gods/ayyappan.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Ayyappa_Swamy_bazaar_art%2C_c.1950%27s.jpg',
    accent: '#ec4899',
    badge: '🖼️ 24K DEVOTIONAL FRAME'
  },
  sivan: {
    nameTamil: 'Lord Shiva (Kailasanathar)',
    nameEnglish: 'LORD SHIVA (PARAMESHWARAN)',
    subtitle: 'Ardhanarishvara • Nandi Deva • Sacred Ganga & Trishula',
    img: '/images/gods/sivan.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/An_Oleograph_of_Shiva%2C_Parvati_and_Nandi_by_Raja_Ravi_Varma.jpg',
    accent: '#10b981',
    badge: '🗿 STONE ART RELIEF'
  },
  balaji: {
    nameTamil: 'Lord Sri Venkateswara (Tirupati Balaji)',
    nameEnglish: 'LORD SRI VENKATESWARA SWAMY',
    subtitle: 'Thanjavur 24K Gold Crown • Diamond Garland & Shankha Chakra',
    img: '/images/gods/balaji.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Tanjore_Paintings_Venkateshwara.jpg',
    accent: '#fbbf24',
    badge: '✦ 24K TANJORE GOLD'
  },
  ganesha: {
    nameTamil: 'Lord Sri Maha Ganapati',
    nameEnglish: 'LORD SRI MAHA GANAPATI',
    subtitle: 'First-Worshiped God • Sacred Modak & Victory Blessings',
    img: '/images/gods/ganesha.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Ganapati1.jpg',
    accent: '#ef4444',
    badge: '🪭 TEMPLE HAND FAN'
  }
};

const DAILY_LEAVES = [
  {
    date: 14,
    tamilMonth: 'Month of Thai - Day 1',
    dayName: 'FRIDAY',
    festival: '★ THAI PONGAL AUSPICIOUS FESTIVAL ★',
    festBg: '#b45309',
    nallaNeram: '09:15 - 10:15 AM',
    rahuKaalam: '10:30 - 12:00 PM',
    yamagandam: '03:00 - 04:30 PM',
    thithi: 'Shukla Paksha Chaturthi',
    star: 'Uttiradam',
    kural: 'True love makes the soul selfless and bound to all humanity.',
    kuralMeaning: 'Love makes the soul selfless and bound to all humanity.'
  },
  {
    date: 15,
    tamilMonth: 'Month of Thai - Day 2',
    dayName: 'SATURDAY',
    festival: '★ MATTU PONGAL HARVEST FESTIVAL ★',
    festBg: '#047857',
    nallaNeram: '07:30 - 08:30 AM',
    rahuKaalam: '09:00 - 10:30 AM',
    yamagandam: '01:30 - 03:00 PM',
    thithi: 'Shukla Paksha Panchami',
    star: 'Tiruvonam',
    kural: 'The wealth gained through wise listening is the crowning treasure.',
    kuralMeaning: 'The wealth gained through wise listening is the crowning treasure.'
  },
  {
    date: 16,
    tamilMonth: 'Month of Thai - Day 3',
    dayName: 'SUNDAY',
    festival: '★ KAANUM PONGAL & FARMERS DAY ★',
    festBg: '#6d28d9',
    nallaNeram: '06:45 - 07:45 AM',
    rahuKaalam: '04:30 - 06:00 PM',
    yamagandam: '12:00 - 01:30 PM',
    thithi: 'Shukla Paksha Sashti',
    star: 'Avittam',
    kural: 'They alone live truly who till the soil; all others follow in homage.',
    kuralMeaning: 'They alone live truly who till the soil; all others follow in homage.'
  }
];

export const ThreeDViewer = () => {
  const [activeMode, setActiveMode] = useState<ThreeDMode>('pet-foil');
  const [selectedGod, setSelectedGod] = useState<GodKey>('mahalakshmi');
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [lenticularPhase, setLenticularPhase] = useState<'A' | 'B'>('A');
  const [customBrand, setCustomBrand] = useState('SRI MURUGAN JEWELLERY & SILKS');
  const [leafIndex, setLeafIndex] = useState(0);
  const [isPeeling, setIsPeeling] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // When switching modes, auto-select the iconic god matching that calendar type
  const handleModeChange = (mode: ThreeDMode) => {
    setActiveMode(mode);
    if (mode === 'pet-foil') setSelectedGod('mahalakshmi');
    else if (mode === 'murugan-5d') setSelectedGod('murugan');
    else if (mode === 'ayyappan-frame') setSelectedGod('ayyappan');
    else if (mode === 'sivan-stone') setSelectedGod('balaji');
    else if (mode === 'daily-panchangam') setSelectedGod('murugan');
    else if (mode === 'hand-fan') setSelectedGod('ganesha');
  };

  // Mouse move 3D tilt tracking
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 13;
    const rotY = ((x - centerX) / centerX) * 13;

    setRotateX(rotX);
    setRotateY(rotY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY });

    // In 5D lenticular mode: morph phase dynamically based on horizontal tilt
    if (activeMode === 'murugan-5d') {
      setLenticularPhase(rotY > 1 ? 'B' : 'A');
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    const glareX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const glareY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setGlarePos({ x: glareX, y: glareY });

    if (activeMode === 'murugan-5d') {
      setLenticularPhase(rotY > 0 ? 'B' : 'A');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  const handlePeelLeaf = () => {
    setIsPeeling(true);
    setTimeout(() => {
      setLeafIndex((prev) => (prev + 1) % DAILY_LEAVES.length);
      setIsPeeling(false);
    }, 280);
  };

  const currentGodData = GOD_PROFILES[selectedGod];
  const activeLeaf = DAILY_LEAVES[leafIndex];

  return (
    <div style={{ width: '100%', padding: '10px 0 30px' }}>
      {/* 1. Main Calendar Model Category Tabs */}
      <div
        className="threed-tabs-nav"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '16px'
        }}
      >
        {[
          { id: 'pet-foil', label: '✦ 24K Gold Foil (Mahalakshmi)', icon: '🌸' },
          { id: 'murugan-5d', label: '🌀 5D Lenticular (Murugan ↔ Ayyappan)', icon: '🦚' },
          { id: 'ayyappan-frame', label: '🛕 Swami Ayyappan (24K Gold Frame)', icon: '✨' },
          { id: 'sivan-stone', label: '👑 Lord Balaji (Stone Art Sculptural)', icon: '👑' },
          { id: 'daily-panchangam', label: '📅 Daily Calendar (Tear-Off Leaves)', icon: '📜' },
          { id: 'hand-fan', label: '🪭 Temple Promo Hand Fan (Ganesha)', icon: '🪭' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleModeChange(tab.id as ThreeDMode)}
            style={{
              padding: '9px 16px',
              borderRadius: '24px',
              background: activeMode === tab.id ? 'var(--accent-gold)' : 'var(--bg-input)',
              color: activeMode === tab.id ? '#0b0c0e' : 'var(--text-secondary)',
              border: `1.5px solid ${activeMode === tab.id ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: activeMode === tab.id ? '0 0 16px rgba(207, 168, 78, 0.35)' : 'none'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 2. Interactive Deity Quick Switcher (Murugan / Ayyappan / Shiva / Mahalakshmi / Balaji / Ganesha) */}
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto 16px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-gold)',
          borderRadius: '30px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}
      >
        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--accent-gold)', whiteSpace: 'nowrap' }}>
          ✦ Select Divine Artwork:
        </span>
        {[
          { key: 'murugan', label: '🦚 Lord Murugan' },
          { key: 'ayyappan', label: '🛕 Swami Ayyappan' },
          { key: 'sivan', label: '🔱 Lord Shiva' },
          { key: 'mahalakshmi', label: '🌸 Mahalakshmi' },
          { key: 'balaji', label: '👑 Tirupati Balaji' },
          { key: 'ganesha', label: '🐘 Lord Ganesha' }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedGod(item.key as GodKey)}
            style={{
              padding: '5px 12px',
              borderRadius: '20px',
              background: selectedGod === item.key ? 'linear-gradient(135deg, #cfa84e, #8c6e26)' : 'transparent',
              color: selectedGod === item.key ? '#000' : 'var(--text-secondary)',
              border: `1px solid ${selectedGod === item.key ? '#ffd700' : 'rgba(255,255,255,0.1)'}`,
              fontSize: '0.74rem',
              fontWeight: selectedGod === item.key ? 800 : 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 3. Interactive Imprint Customizer Bar */}
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--bg-card)',
          padding: '8px 16px',
          borderRadius: '30px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-gold)', whiteSpace: 'nowrap' }}>
          ✦ Custom Branding Imprint (Live Foil):
        </span>
        <input
          type="text"
          value={customBrand}
          onChange={(e) => setCustomBrand(e.target.value)}
          placeholder="Enter company / shop name"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '0.82rem',
            outline: 'none',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '0.05em'
          }}
        />
      </div>

      {/* 4. Main 3D Canvas Viewport */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1200px',
          padding: '10px 0',
          minHeight: '620px'
        }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={handleMouseLeave}
          className="threed-card-container"
          style={{
            width: '100%',
            maxWidth: '410px',
            minHeight: '580px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '2.5px solid var(--border-gold)',
            boxShadow: isHovered
              ? 'var(--shadow-lg), 0 0 50px rgba(207, 168, 78, 0.45), inset 0 0 30px rgba(0,0,0,0.6)'
              : 'var(--shadow-md), 0 0 20px rgba(0,0,0,0.8)',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.45s ease',
            position: 'relative',
            cursor: 'grab',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            touchAction: 'none'
          }}
        >
          {/* Dynamic Metallic Light Glare / Specular Layer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 240, 180, ${isHovered ? 0.4 : 0.08}) 0%, transparent 60%)`,
              pointerEvents: 'none',
              zIndex: 14,
              mixBlendMode: 'overlay',
              transition: 'background 0.05s ease'
            }}
          />

          {/* Top Hanging Tin Plate / Brass Eyelet Loop (Sivakasi Authentic Mounting) */}
          <div
            style={{
              background: 'linear-gradient(180deg, #d8ba63 0%, #876c24 50%, #574411 100%)',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(0,0,0,0.6)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
              zIndex: 5
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#252016', boxShadow: 'inset 0 1px 2px #fff' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#161208', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)' }}>
                AMAZING ADS SIVAKASI
              </span>
            </div>
            {/* Center Brass Hanging Ring */}
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '2.5px solid #fff',
                boxShadow: '0 0 5px rgba(0,0,0,0.8), inset 0 1px 3px rgba(0,0,0,0.5)',
                background: 'rgba(0,0,0,0.3)'
              }}
            />
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#161208', fontFamily: 'var(--font-mono)' }}>
              2027 PRESS
            </span>
          </div>

          {/* Main Visual Body based on Active 3D Mode */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {/* ========================================================= */}
            {/* 1. 24K GOLD FOIL CALENDAR (Sri Mahalakshmi / Selected God) */}
            {/* ========================================================= */}
            {activeMode === 'pet-foil' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                {/* Deity Frame with Heated Foil Arch */}
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '3px solid #e5c366',
                    boxShadow: '0 8px 24px rgba(229, 195, 102, 0.35), inset 0 0 15px rgba(0,0,0,0.5)',
                    background: '#1a1408'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={currentGodData.img}
                      alt={currentGodData.nameEnglish}
                      onError={(e) => {
                        e.currentTarget.src = currentGodData.fallback;
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                        filter: 'contrast(1.08) brightness(1.04)'
                      }}
                    />

                    {/* Gold Foil Embossed Halo Border */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: '6px',
                        border: '2px solid rgba(255, 235, 160, 0.75)',
                        borderRadius: '8px',
                        pointerEvents: 'none',
                        boxShadow: 'inset 0 0 8px rgba(212, 175, 55, 0.6)'
                      }}
                    />

                    {/* Holographic 24K Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'linear-gradient(135deg, #ffd700, #b8860b)',
                        color: '#1a1003',
                        fontSize: '0.62rem',
                        fontWeight: 900,
                        padding: '3px 8px',
                        borderRadius: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
                        letterSpacing: '0.08em'
                      }}
                    >
                      ✦ 24K REAL FOIL
                    </div>

                    {/* Deity Title Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        background: 'linear-gradient(180deg, transparent 0%, rgba(10, 8, 3, 0.95) 75%)',
                        padding: '16px 12px 6px',
                        textAlign: 'center'
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '0.92rem',
                          color: '#ffe699',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          textShadow: '0 2px 6px rgba(0,0,0,0.9)'
                        }}
                      >
                        {currentGodData.nameTamil}
                      </h4>
                      <p style={{ fontSize: '0.62rem', color: '#e5c366', fontWeight: 600 }}>
                        {currentGodData.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calendar Month Sheet Representation (January 2027) */}
                <div
                  style={{
                    background: '#faf8f2',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    margin: '8px 0 6px',
                    color: '#1c1917',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    border: '1px solid #d4ccbd'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e7e0d3', paddingBottom: '4px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#991b1b', letterSpacing: '0.05em' }}>
                      JANUARY 2027
                    </span>
                    <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#451a03' }}>
                      2027 CALENDAR
                    </span>
                  </div>

                  {/* 7-Col Date Grid Preview */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: '2px', fontSize: '0.62rem', fontWeight: 600 }}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <span key={i} style={{ color: i === 0 ? '#dc2626' : '#57534e', fontSize: '0.6rem', fontWeight: 800 }}>
                        {d}
                      </span>
                    ))}
                    {[...Array(5)].map((_, i) => (
                      <span key={`b-${i}`} style={{ color: '#d6d3d1' }}>•</span>
                    ))}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((day) => (
                      <span
                        key={day}
                        style={{
                          padding: '1.5px 0',
                          borderRadius: '3px',
                          background: day === 14 ? '#ef4444' : 'transparent',
                          color: day === 14 ? '#fff' : (day + 5) % 7 === 1 ? '#dc2626' : '#1c1917',
                          fontWeight: day === 14 ? 800 : 600,
                          fontSize: '0.62rem'
                        }}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '4px', fontSize: '0.58rem', color: '#b45309', fontWeight: 700 }}>
                    ✦ Jan 14: Thai Pongal Harvest Festival • Auspicious Muhurtham
                  </div>
                </div>

                {/* Bottom Custom Gold Hot-Stamping Space */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #1b202c 0%, #10141d 100%)',
                    border: '1.5px dashed var(--accent-gold)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    textAlign: 'center'
                  }}
                >
                  <p style={{ fontSize: '0.72rem', color: 'var(--accent-gold-bright)', fontWeight: 800, letterSpacing: '0.08em' }}>
                    ★ {customBrand || 'YOUR COMPANY BRAND EMBOSSED HERE'} ★
                  </p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Sivakasi Heated Die Hot Stamped • Ph: +91 98421 23456
                  </p>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 2. 5D LENTICULAR CALENDAR (Lord Murugan ↔ Swami Ayyappan) */}
            {/* ========================================================= */}
            {activeMode === 'murugan-5d' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  {/* Lenticular Multi-Lens Visual Canvas */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '250px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '2.5px solid #ffd700',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.8), 0 0 20px rgba(255, 215, 0, 0.3)',
                      background: '#0a0d14'
                    }}
                  >
                    {/* View A: Lord Murugan */}
                    <img
                      src={GOD_PROFILES.murugan.img}
                      alt="Lord Murugan (View A)"
                      onError={(e) => {
                        e.currentTarget.src = GOD_PROFILES.murugan.fallback;
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                        opacity: lenticularPhase === 'A' ? 1 : 0,
                        transition: 'opacity 0.2s ease-in-out',
                        filter: 'contrast(1.08)'
                      }}
                    />

                    {/* View B: Swami Ayyappan */}
                    <img
                      src={GOD_PROFILES.ayyappan.img}
                      alt="Swami Ayyappan (View B)"
                      onError={(e) => {
                        e.currentTarget.src = GOD_PROFILES.ayyappan.fallback;
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 20%',
                        opacity: lenticularPhase === 'B' ? 1 : 0,
                        transition: 'opacity 0.2s ease-in-out',
                        filter: 'contrast(1.08)'
                      }}
                    />

                    {/* 5D Lenticular Vertical Micro-Lens Grating Layer */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1.5px, transparent 1.5px, transparent 3.5px)',
                        pointerEvents: 'none',
                        zIndex: 6,
                        mixBlendMode: 'overlay'
                      }}
                    />

                    {/* Lenticular Phase Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: 'rgba(0,0,0,0.8)',
                        border: '1px solid #ffd700',
                        color: '#ffd700',
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        zIndex: 7
                      }}
                    >
                      {lenticularPhase === 'A' ? '✦ VIEW A: Lord Murugan' : '✦ VIEW B: Swami Ayyappan'}
                    </div>

                    {/* Live Tilt Angle Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        zIndex: 7
                      }}
                    >
                      TILT: {Math.round(rotateY)}°
                    </div>

                    {/* Bottom Lenticular Label */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.92) 80%)',
                        padding: '12px 10px 6px',
                        textAlign: 'center',
                        zIndex: 7
                      }}
                    >
                      <h4 style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 800, letterSpacing: '0.04em' }}>
                        {lenticularPhase === 'A' ? 'Lord Murugan (Palani & Tiruchendur)' : 'Sabarimala Swami Ayyappan (Dharma Sastha)'}
                      </h4>
                      <p style={{ fontSize: '0.6rem', color: '#ffd700', fontWeight: 600 }}>
                        75 LPI Lenticular Optical Sheet • Tilt mouse left / right to morph
                      </p>
                    </div>
                  </div>

                  {/* Manual Morph Switch Buttons */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setLenticularPhase('A')}
                      style={{
                        flex: 1,
                        padding: '7px',
                        borderRadius: '6px',
                        background: lenticularPhase === 'A' ? 'var(--accent-gold)' : 'var(--bg-input)',
                        color: lenticularPhase === 'A' ? '#000' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      View A: Lord Murugan
                    </button>
                    <button
                      type="button"
                      onClick={() => setLenticularPhase('B')}
                      style={{
                        flex: 1,
                        padding: '7px',
                        borderRadius: '6px',
                        background: lenticularPhase === 'B' ? 'var(--accent-gold)' : 'var(--bg-input)',
                        color: lenticularPhase === 'B' ? '#000' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      View B: Swami Ayyappan
                    </button>
                  </div>
                </div>

                {/* Bottom Imprint */}
                <div
                  style={{
                    background: 'rgba(255, 215, 0, 0.08)',
                    border: '1.5px dashed var(--accent-gold)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    textAlign: 'center',
                    marginTop: '10px'
                  }}
                >
                  <p style={{ fontSize: '0.72rem', color: 'var(--accent-gold-bright)', fontWeight: 800 }}>
                    ★ {customBrand || 'SRI MURUGAN TRANSPORTS & TEXTILES'} ★
                  </p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                    Tilt mouse horizontally to see the dynamic lenticular shift
                  </p>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 3. AYYAPPAN FRAME (Swami Ayyappan - 24K Devotional Frame)   */}
            {/* ========================================================= */}
            {activeMode === 'ayyappan-frame' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                {/* Synthetic Teakwood Carved Frame */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #381f0d 0%, #1e0f06 50%, #44240f 100%)',
                    borderRadius: '14px',
                    padding: '12px',
                    border: '6px solid #231207',
                    boxShadow: 'inset 0 0 16px rgba(0,0,0,0.9), 0 12px 32px rgba(0,0,0,0.85)',
                    position: 'relative'
                  }}
                >
                  {/* Golden Inner Fillet Border */}
                  <div
                    style={{
                      background: '#f8f5ee',
                      borderRadius: '8px',
                      padding: '8px',
                      border: '2px solid #d4af37',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)'
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '220px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                      }}
                    >
                      <img
                        src={GOD_PROFILES.ayyappan.img}
                        alt="Swami Ayyappan 24K Frame"
                        onError={(e) => {
                          e.currentTarget.src = GOD_PROFILES.ayyappan.fallback;
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 15%',
                          filter: 'contrast(1.1) brightness(1.05)'
                        }}
                      />

                      {/* Glass Glare Sheen Reflection Bar */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: `linear-gradient(${115 + rotateY}deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)`,
                          pointerEvents: 'none'
                        }}
                      />

                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(180deg, transparent 0%, rgba(20, 10, 5, 0.95) 75%)',
                          padding: '14px 8px 4px',
                          textAlign: 'center'
                        }}
                      >
                        <h4 style={{ fontSize: '0.86rem', color: '#ffe58f', fontWeight: 800 }}>
                          SWAMI AYYAPPAN • 24K DEVOTIONAL FRAME
                        </h4>
                        <p style={{ fontSize: '0.58rem', color: '#e5c366' }}>
                          18 Sacred Steps • Carved Teak Frame • Unbreakable Glass
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Engraved Brass Nameplate at Frame Base */}
                  <div
                    style={{
                      background: 'linear-gradient(180deg, #f5d77f 0%, #b8860b 50%, #7d5a04 100%)',
                      color: '#1a1002',
                      margin: '10px auto 0',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      textAlign: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
                      maxWidth: '300px'
                    }}
                  >
                    <p style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.08em' }}>
                      ✦ SWAMIYE SARANAM AYYAPPA ✦
                    </p>
                    <p style={{ fontSize: '0.52rem', fontWeight: 700 }}>
                      SIVAKASI MASTER PRESS • HEIRLOOM DEVOTIONAL FRAME
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(236, 72, 153, 0.08)',
                    border: '1.5px dashed #f472b6',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    textAlign: 'center',
                    marginTop: '10px'
                  }}
                >
                  <p style={{ fontSize: '0.72rem', color: '#fbcfe8', fontWeight: 800 }}>
                    ★ {customBrand || 'SWAMI AYYAPPA SEVA TRUST'} ★
                  </p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                    Lifetime tarnish-proof gold coating with luxury velvet gift box
                  </p>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 4. SIVAN STONE ART (Lord Shiva - Stone Art Relief)         */}
            {/* ========================================================= */}
            {activeMode === 'sivan-stone' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #231f1c 0%, #151311 100%)',
                    borderRadius: '12px',
                    border: '3px solid #78716c',
                    padding: '12px',
                    boxShadow: 'inset 0 0 24px rgba(0,0,0,0.9), 0 8px 25px rgba(0,0,0,0.8)',
                    position: 'relative'
                  }}
                >
                  {/* Temple Stone Carving Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '230px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)'
                    }}
                  >
                    <img
                      src="/images/stone-art-calendar-real.jpg"
                      alt="Lord Balaji Stone Art Sculptural"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        filter: 'contrast(1.05) brightness(1.02)'
                      }}
                    />

                    {/* Sparkling Kundan Gemstones at Corners */}
                    {[
                      { top: '8px', left: '8px', color: '#ef4444' },
                      { top: '8px', right: '8px', color: '#10b981' },
                      { bottom: '38px', left: '8px', color: '#10b981' },
                      { bottom: '38px', right: '8px', color: '#ef4444' }
                    ].map((gem, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: 'absolute',
                          top: gem.top,
                          bottom: gem.bottom,
                          left: gem.left,
                          right: gem.right,
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: gem.color,
                          border: '2px solid #ffd700',
                          boxShadow: `0 0 8px ${gem.color}`,
                          zIndex: 8
                        }}
                      />
                    ))}

                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(180deg, transparent 0%, rgba(10, 8, 7, 0.96) 75%)',
                        padding: '16px 8px 6px',
                        textAlign: 'center'
                      }}
                    >
                      <h4 style={{ fontSize: '0.88rem', color: '#ffd700', fontWeight: 800, letterSpacing: '0.04em' }}>
                        LORD BALAJI • STONE ART SCULPTURAL
                      </h4>
                      <p style={{ fontSize: '0.6rem', color: '#fef08a' }}>
                        Tirupati Sri Venkateswara • 24K Gold Arch • Daily Panchangam
                      </p>
                    </div>
                  </div>

                  {/* Stone Plaque Details */}
                  <div
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      borderRadius: '6px',
                      padding: '8px 10px',
                      marginTop: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      textAlign: 'center'
                    }}
                  >
                    <p style={{ fontSize: '0.64rem', color: '#e7e5e4', fontWeight: 600 }}>
                      Authentic 3D sculptural elevation with 600 GSM composite stone powder
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(207, 168, 78, 0.1)',
                    border: '1.5px dashed var(--accent-gold)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    textAlign: 'center',
                    marginTop: '10px'
                  }}
                >
                  <p style={{ fontSize: '0.72rem', color: '#ffd700', fontWeight: 800 }}>
                    ★ {customBrand || 'SRI VENKATESWARA TRADERS & JEWELLERS'} ★
                  </p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                    Exclusive prestige edition for stone, marble & builder trusts
                  </p>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 5. DAILY PANCHANGAM CALENDAR (Interactive Tear-Off Leaves)  */}
            {/* ========================================================= */}
            {activeMode === 'daily-panchangam' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                {/* Top Board Mount with Lord Murugan / Ganesha Header */}
                <div
                  style={{
                    borderRadius: '10px 10px 0 0',
                    overflow: 'hidden',
                    border: '2px solid #eab308',
                    background: '#1c1308',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', padding: '6px 10px', gap: '10px' }}>
                    <img
                      src={GOD_PROFILES.murugan.img}
                      alt="Lord Murugan"
                      onError={(e) => {
                        e.currentTarget.src = GOD_PROFILES.murugan.fallback;
                      }}
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ffd700',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.8rem', color: '#fef08a', fontWeight: 800 }}>
                        LORD MURUGAN BLESSINGS • 2027
                      </h4>
                      <p style={{ fontSize: '0.62rem', color: '#ca8a04', fontWeight: 700 }}>
                        SIVAKASI ORIGINAL DAILY CALENDAR • SIVAKASI PRESS
                      </p>
                    </div>
                  </div>

                  {/* Metal Slide Clamp Strip */}
                  <div
                    style={{
                      background: 'linear-gradient(180deg, #9ca3af 0%, #4b5563 50%, #1f2937 100%)',
                      height: '8px',
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#111827' }} />
                    ))}
                  </div>
                </div>

                {/* The Interactive Daily Sheet Leaf */}
                <div
                  style={{
                    background: '#fffdfa',
                    color: '#1a1815',
                    borderRadius: '0 0 8px 8px',
                    padding: '12px 14px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5), inset 0 -4px 8px rgba(0,0,0,0.06)',
                    border: '1px solid #d6cfbf',
                    borderTop: 'none',
                    margin: '0 0 10px',
                    position: 'relative',
                    transition: 'transform 0.28s ease, opacity 0.28s ease',
                    transform: isPeeling ? 'rotate(-6deg) translateY(-25px) scale(0.96)' : 'none',
                    opacity: isPeeling ? 0.3 : 1
                  }}
                >
                  {/* Top Month & English Date Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #e5dec9', paddingBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#7c2d12' }}>
                      {activeLeaf.tamilMonth}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#1f2937' }}>
                      {activeLeaf.dayName}
                    </span>
                  </div>

                  {/* Huge Bold Date */}
                  <div style={{ textAlign: 'center', margin: '4px 0' }}>
                    <span
                      style={{
                        fontSize: '3.6rem',
                        fontWeight: 900,
                        color: activeLeaf.date === 14 ? '#dc2626' : '#111827',
                        lineHeight: 1,
                        fontFamily: 'var(--font-heading)'
                      }}
                    >
                      {activeLeaf.date}
                    </span>
                    <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#475569', marginTop: '2px' }}>
                      JANUARY 2027
                    </p>
                  </div>

                  {/* Festival Banner */}
                  <div
                    style={{
                      background: activeLeaf.festBg,
                      color: '#fff',
                      textAlign: 'center',
                      padding: '3px 6px',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      margin: '4px 0 6px'
                    }}
                  >
                    {activeLeaf.festival}
                  </div>

                  {/* Panchangam 2-Col Timing Table */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '4px',
                      background: '#f8f5ee',
                      padding: '6px',
                      borderRadius: '4px',
                      fontSize: '0.6rem',
                      border: '1px solid #e7e0ce'
                    }}
                  >
                    <div><strong>Auspicious Time:</strong> {activeLeaf.nallaNeram}</div>
                    <div><strong>Rahu Kaalam:</strong> {activeLeaf.rahuKaalam}</div>
                    <div><strong>Yamagandam:</strong> {activeLeaf.yamagandam}</div>
                    <div><strong>Tithi / Star:</strong> {activeLeaf.thithi} • {activeLeaf.star}</div>
                  </div>

                  {/* Thirukkural Daily Quote */}
                  <div style={{ marginTop: '6px', borderTop: '1px dashed #d1c7b7', paddingTop: '4px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.58rem', fontWeight: 700, color: '#78350f', fontStyle: 'italic' }}>
                      "{activeLeaf.kural}"
                    </p>
                    <p style={{ fontSize: '0.52rem', color: '#64748b', marginTop: '2px' }}>
                      {activeLeaf.kuralMeaning}
                    </p>
                  </div>
                </div>

                {/* Peel Leaf Button */}
                <div style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={handlePeelLeaf}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: '#000',
                      border: 'none',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
                    }}
                  >
                    <span>✂️</span>
                    <span>Tear Sheet (Next Day Preview)</span>
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 6. PROMOTIONAL HAND FAN (Lord Ganesha / Temple Fan)       */}
            {/* ========================================================= */}
            {activeMode === 'hand-fan' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Round Die-Cut Fan Leaf */}
                <div
                  style={{
                    width: '270px',
                    height: '270px',
                    borderRadius: '50%',
                    background: '#1b0d18',
                    border: '4px solid #f43f5e',
                    boxShadow: '0 12px 35px rgba(244, 63, 94, 0.35), inset 0 0 20px rgba(0,0,0,0.8)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  <img
                    src={GOD_PROFILES.ganesha.img}
                    alt="Lord Ganesha Hand Fan"
                    onError={(e) => {
                      e.currentTarget.src = GOD_PROFILES.ganesha.fallback;
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 20%',
                      filter: 'contrast(1.1) brightness(1.05)'
                    }}
                  />

                  {/* Scalloped Fan Edge Ring */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: '6px',
                      borderRadius: '50%',
                      border: '2px dashed rgba(255, 235, 160, 0.8)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Top Blessings Arch */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '20px',
                      right: '20px',
                      background: 'rgba(0,0,0,0.7)',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      border: '1px solid #ffd700'
                    }}
                  >
                    <p style={{ fontSize: '0.62rem', fontWeight: 800, color: '#fef08a' }}>
                      LORD GANESHA BLESSINGS • PROMOTIONAL HAND FAN
                    </p>
                  </div>

                  {/* Bottom Advertising Rim */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '20px',
                      right: '20px',
                      background: 'rgba(0,0,0,0.85)',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    <p style={{ fontSize: '0.64rem', fontWeight: 800, color: '#fff' }}>
                      {customBrand || 'ARULMIGU TEMPLE TRUST'}
                    </p>
                    <p style={{ fontSize: '0.52rem', color: '#f43f5e', fontWeight: 700 }}>
                      100% Virgin Polypropylene • Waterproof
                    </p>
                  </div>
                </div>

                {/* Sturdy Molded Plastic Handle with Dual Chrome Rivets */}
                <div
                  style={{
                    width: '32px',
                    height: '80px',
                    background: 'linear-gradient(90deg, #be123c 0%, #e11d48 50%, #881337 100%)',
                    borderRadius: '0 0 8px 8px',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '8px 0',
                    marginTop: '-12px',
                    zIndex: 2
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', boxShadow: 'inset 0 1px 2px #000' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', boxShadow: 'inset 0 1px 2px #000' }} />
                </div>

                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                  Ideal high-visibility giveaway for temple festivals, summer campaigns & rallies
                </p>
              </div>
            )}
          </div>

          {/* Bottom Footnote on 3D Card */}
          <div
            style={{
              background: 'rgba(0,0,0,0.75)',
              padding: '8px 12px',
              fontSize: '0.65rem',
              color: 'var(--accent-gold-bright)',
              textAlign: 'center',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              fontWeight: 700,
              letterSpacing: '0.04em'
            }}
          >
            ✦ INTERACTIVE 3D GYRO SIMULATOR • MOVE CURSOR TO TILT & REFLECT
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .threed-tabs-nav {
            justify-content: flex-start !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            padding-bottom: 8px !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }
          .threed-tabs-nav::-webkit-scrollbar {
            display: none !important;
          }
          .threed-tabs-nav button {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
          }
        }
      `}</style>
    </div>
  );
};
