import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from '../context/RouterContext';

interface Slide {
  id: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  spec: string;
  image: string;
  productTarget?: string;
}

const SLIDES: Slide[] = [
  {
    id: 'executive-desk-calendar',
    category: 'Executive Desk Calendar Edition',
    badge: 'Twin-Loop Wire-O Tent Calendar',
    title: 'Alpine Lake Landscape Executive Desk Calendar',
    subtitle: 'High-definition landscape mountain lake panorama with dynamic curved wave layout, crisp monthly date matrix, and corporate branding footer.',
    spec: '300 GSM Royal Art Card • Twin-Loop Wire-O Binding • Rigid Triangle Tent Stand • Custom Foil Stamping',
    image: '/images/executive-desk-calendar.jpg',
    productTarget: 'Special Products'
  },
  {
    id: 'pet-foil',
    category: 'Gold & Silver PET Foil',
    badge: '130°C Heated Die Stamped',
    title: 'High-Luster Mirror Metallic PET Foil',
    subtitle: 'High-temperature brass die foil stamping on tear-proof metallic PET film with deep sculptural relief embossing.',
    spec: '400 GSM Rigid Kappa Board • Anti-Rust Tin Mount • 15×20 / 17×27 in',
    image: '/images/pet-foil-calendar-real.jpg',
    productTarget: 'Gold / Silver PET Foil Calendar'
  },
  {
    id: 'custom-5d',
    category: 'Custom 5D Holographic',
    badge: '75 LPI Optical Lenticular Motion',
    title: 'Dynamic 5D Depth & Dual-Angle Morphing',
    subtitle: 'Images visually transform and move as you walk past without 3D glasses. Moisture-proof optical PET lens surface.',
    spec: 'Deluxe Moulded Golden Frame • 12×18 / 16×24 in • 365 Daily Panchangam Slot',
    image: '/images/custom-5d-calendar-real.jpg',
    productTarget: 'Custom 5D Calendars'
  },
  {
    id: 'stone-art',
    category: 'Stone Art Heritage Relievo',
    badge: 'Sculpted Relievo & Kundan Gems',
    title: 'Handcrafted Heritage Temple Stone Relief',
    subtitle: 'Simulating sacred temple stone carvings with tactile multi-level embossing, antique stone washes, and 24K gold foil.',
    spec: 'High-Density Resin Board • Carved Teak Synthetic Frame • 14×20 / 18×24 in',
    image: '/images/stone-art-calendar-real.jpg',
    productTarget: 'Stone Art Calendars'
  },
  {
    id: 'hand-fan',
    category: 'Promotional Advertising Hand Fans',
    badge: 'Virgin PP Plastic & Duplex Board',
    title: 'High-Visibility Mass Brand Promotion',
    subtitle: 'Unbreakable double-sided offset printed hand fans engineered for mass-reach exposure at outdoor events and festivals.',
    spec: 'Ergonomic Grip Handle • Water-Proof Lamination • Custom Contour Die-Cut',
    image: '/images/hand-fan-promo-real.jpg',
    productTarget: 'Promotional Hand Fan'
  },
  {
    id: 'special-products',
    category: 'Special Products & VIP Sets',
    badge: 'Laser Engraved & Spot UV',
    title: 'Bespoke Executive Gift Hampers & LED Easels',
    subtitle: 'Custom tailored corporate gifts including warm LED acrylic desk calendars, leatherette organizer diaries, and rigid magnetic gift boxes.',
    spec: 'Cast Acrylic & MDF Wood • Spot UV Varnish • Custom Client Dimensions',
    image: '/images/special-products-gift-real.jpg',
    productTarget: 'Special Products'
  }
];

const AUTOPLAY_INTERVAL = 5500; // 5.5 seconds per slide for a calm, non-pungent experience

export const Slideshow = () => {
  const { navigate } = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Autoplay management
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <section 
      className="slideshow-section" 
      aria-label="Atelier Featured Editions Slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        
        {/* Subtle Section Tag */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <span className="foil-badge" style={{ marginBottom: '8px' }}>
            ✦ SIVAKASI PRESS GALLERY
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#fff' }}>
            Featured Master <span className="gold-gradient-text">Editions</span>
          </h2>
        </div>

        {/* Main Cinematic Slideshow Frame with Perfect Screen Size Fit */}
        <div 
          className="slideshow-frame"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Layered Slide Backgrounds with Ambient Glow + Contained Crisp Product Image */}
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`slide-viewport ${isActive ? 'active' : ''}`}
                aria-hidden={!isActive}
              >
                {/* Atmospheric ambient glow matching the slide image */}
                <div 
                  className="slide-ambient-glow" 
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                {/* Main contained image - 100% full view, zero cropping, fits screen size */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="slide-product-img"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}

          {/* Clean Top Meta Status Strip (Counter & Badges) */}
          <div className="slide-top-meta">
            <span className="slide-counter">
              0{currentIndex + 1} / 0{SLIDES.length}
            </span>
            <span className="slide-category-badge">
              {currentSlide.category}
            </span>
            <span className="slide-feature-pill">
              ✦ {currentSlide.badge}
            </span>
          </div>

          {/* Clean Glassmorphic Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="slideshow-nav-arrow prev"
            aria-label="Previous slide"
            title="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="slideshow-nav-arrow next"
            aria-label="Next slide"
            title="Next slide"
          >
            ›
          </button>

          {/* Minimalist Segmented Progress Bar Indicators at top */}
          <div className="slideshow-indicators" role="tablist">
            {SLIDES.map((s, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`progress-bar-segment ${isActive ? 'active' : ''}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${s.category}`}
                  title={s.category}
                >
                  <span className="segment-track">
                    <span 
                      className="segment-fill" 
                      style={{
                        animationDuration: `${AUTOPLAY_INTERVAL}ms`,
                        animationPlayState: isPaused ? 'paused' : 'running'
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Info & Action Panel Positioned Directly Underneath - 100% Unobscured Image */}
        <div className="slideshow-info-card">
          <div className="slideshow-info-left">
            <h3 className="slide-headline">
              {currentSlide.title}
            </h3>
            <p className="slide-description">
              {currentSlide.subtitle}
            </p>
            <div className="slide-spec-strip">
              <span style={{ color: 'var(--accent-gold-bright)', fontWeight: 600 }}>SPEC:</span> {currentSlide.spec}
            </div>
          </div>

          <div className="slideshow-info-right">
            <button
              onClick={() => navigate('calculator', currentSlide.productTarget ? { product: currentSlide.productTarget } : undefined)}
              className="btn-gold"
              style={{ padding: '12px 24px', fontSize: '0.9rem', width: '100%', justifyContent: 'center' }}
            >
              Instant Pricing & Quote →
            </button>
            <button
              onClick={() => navigate('proofing')}
              className="btn-outline-gold"
              style={{ padding: '11px 20px', fontSize: '0.88rem', width: '100%', justifyContent: 'center' }}
            >
              3D Proofing View
            </button>
          </div>
        </div>

        {/* Thumbnail Selector Pills Beneath Frame - Clean & Non-intrusive */}
        <div className="slideshow-pills-nav">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={`slide-thumb-pill ${idx === currentIndex ? 'active' : ''}`}
            >
              <span className="pill-dot" />
              <span>{s.category}</span>
            </button>
          ))}
        </div>

      </div>

      <style>{`
        .slideshow-section {
          padding: 24px 0 50px;
          position: relative;
        }

        /* 16:9 Screen Fit Frame */
        .slideshow-frame {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          aspect-ratio: 16 / 9;
          max-height: 680px;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-gold);
          overflow: hidden;
          background: #080a0f;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75), 0 0 30px rgba(207, 168, 78, 0.12);
        }

        .slide-viewport {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .slide-viewport.active {
          opacity: 1;
          pointer-events: auto;
        }

        /* Ambient Glow behind image */
        .slide-ambient-glow {
          position: absolute;
          inset: -30px;
          background-size: cover;
          background-position: center;
          filter: blur(40px) brightness(0.35);
          opacity: 0.6;
          transform: scale(1.1);
          pointer-events: none;
        }

        /* The Main Image - 100% visible, fully fitted, zero cropping */
        .slide-product-img {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }

        .slide-viewport.active .slide-product-img {
          animation: subtlePop 0.5s ease-out;
        }

        @keyframes subtlePop {
          from {
            opacity: 0.85;
            transform: scale(0.985);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Top Meta floating bar inside frame */
        .slide-top-meta {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          pointer-events: none;
        }

        .slide-counter {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          color: var(--accent-gold-bright);
          background: rgba(8, 10, 15, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(207, 168, 78, 0.4);
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
        }

        .slide-category-badge {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #fff;
          background: rgba(207, 168, 78, 0.22);
          backdrop-filter: blur(8px);
          border: 1px solid var(--accent-gold);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .slide-feature-pill {
          font-size: 0.74rem;
          color: var(--text-secondary);
          background: rgba(8, 10, 15, 0.75);
          backdrop-filter: blur(8px);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid var(--border-subtle);
        }

        /* Info Card Directly Below Frame */
        .slideshow-info-card {
          max-width: 1200px;
          margin: 16px auto 0;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          padding: 24px 30px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 30px;
          align-items: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          animation: infoCardFade 0.4s ease;
        }

        @keyframes infoCardFade {
          from { opacity: 0.6; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .slideshow-info-left {
          min-width: 0;
        }

        .slideshow-info-right {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 230px;
        }

        .slide-headline {
          font-size: clamp(1.3rem, 2.2vw, 1.8rem);
          color: #ffffff;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .slide-description {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .slide-spec-strip {
          font-size: 0.8rem;
          color: var(--text-secondary);
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px 14px;
          border-radius: 8px;
          display: inline-block;
          max-width: 100%;
          white-space: normal;
          word-break: break-word;
        }

        /* Nav Arrows */
        .slideshow-nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 6;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(8, 10, 15, 0.75);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-gold);
          color: var(--accent-gold-bright);
          font-size: 1.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          line-height: 1;
          padding-bottom: 3px;
        }

        .slideshow-nav-arrow:hover {
          background: rgba(207, 168, 78, 0.3);
          color: #fff;
          transform: translateY(-50%) scale(1.08);
        }

        .slideshow-nav-arrow.prev {
          left: 18px;
        }

        .slideshow-nav-arrow.next {
          right: 18px;
        }

        /* Top Progress Bar Indicators */
        .slideshow-indicators {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 6;
          display: flex;
          gap: 4px;
          padding: 0;
        }

        .progress-bar-segment {
          flex: 1;
          height: 4px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .segment-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.14);
          overflow: hidden;
          position: relative;
          transition: background 0.3s ease;
        }

        .progress-bar-segment:hover .segment-track {
          background: rgba(255, 255, 255, 0.35);
        }

        .segment-fill {
          display: block;
          height: 100%;
          width: 0;
          background: var(--accent-gold);
        }

        .progress-bar-segment.active .segment-fill {
          animation: progressFill linear forwards;
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        /* Pill Tabs beneath */
        .slideshow-pills-nav {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .slide-thumb-pill {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .slide-thumb-pill .pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
          transition: background 0.2s ease;
        }

        .slide-thumb-pill:hover {
          color: #fff;
          border-color: var(--accent-gold);
        }

        .slide-thumb-pill.active {
          background: rgba(207, 168, 78, 0.12);
          border-color: var(--accent-gold);
          color: var(--accent-gold-bright);
          font-weight: 600;
        }

        .slide-thumb-pill.active .pill-dot {
          background: var(--accent-gold-bright);
          box-shadow: 0 0 6px var(--accent-gold);
        }

        /* Responsive Breakpoints */
        @media (max-width: 860px) {
          .slideshow-info-card {
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 20px;
          }
          .slideshow-info-right {
            flex-direction: row;
            min-width: 100%;
          }
          .slideshow-info-right button {
            flex: 1;
          }
        }

        @media (max-width: 640px) {
          .slideshow-frame {
aspect-ratio: 16 / 9;
            min-height: 380px;
            border-radius: var(--radius-lg);
          }
          .slide-top-meta {
            top: 12px;
            left: 12px;
            gap: 6px;
          }
          .slide-feature-pill {
            display: none;
          }
          .slideshow-indicators {
            left: 16px;
            right: 16px;
            top: 14px;
          }
          .slideshow-nav-arrow {
            width: 36px;
            height: 36px;
            font-size: 1.3rem;
          }
          .slideshow-nav-arrow.prev { left: 8px; }
          .slideshow-nav-arrow.next { right: 8px; }

          .slideshow-info-card {
            padding: 16px;
            margin-top: 12px;
          }
          .slide-headline {
font-size: 1.25rem;
          }
          .slide-description {
            font-size: 0.82rem;
            margin-bottom: 10px;
          }
          .slide-spec-strip {
            font-size: 0.72rem;
            padding: 6px 10px;
          }
.slideshow-info-right {
            flex-direction: column;
          }
          .slideshow-pills-nav {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 8px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .slideshow-pills-nav::-webkit-scrollbar {
            display: none;
          }
          .slide-thumb-pill {
white-space: nowrap;
            flex-shrink: 0;
            padding: 6px 12px;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};
