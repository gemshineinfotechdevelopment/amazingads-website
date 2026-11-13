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
    id: 'scenic-november-2026',
    category: '2026 Signature Wall Edition',
    badge: 'Santorini & Eiffel Sunset Edition',
    title: 'November 2026 World Heritage Architectural Wall Calendar',
    subtitle: 'Vibrant Mediterranean Santorini domes & Parisian Eiffel Tower at sunset, highlighted with gold foil wave embossing and frosted date matrix.',
    spec: '350 GSM Heavy Board • Gold Foil Wave Trim • Frosted Glass Date Grid • Wire-O',
    image: '/images/luxury-scenic-calendar-2026.jpg',
    productTarget: 'Gold / Silver PET Foil Calendar'
  },
  {
    id: 'pet-foil',
    category: 'Gold & Silver PET Foil',
    badge: '130°C Heated Die Stamped',
    title: 'High-Luster Mirror Metallic PET Foil',
    subtitle: 'High-temperature brass die foil stamping on tear-proof metallic PET film with deep sculptural relief embossing.',
    spec: '400 GSM Rigid Kappa Board • Anti-Rust Tin Mount • 15×20 / 17×27 in',
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1600&q=85',
    productTarget: 'Gold / Silver PET Foil Calendar'
  },
  {
    id: 'custom-5d',
    category: 'Custom 5D Holographic',
    badge: '75 LPI Optical Lenticular Motion',
    title: 'Dynamic 5D Depth & Dual-Angle Morphing',
    subtitle: 'Images visually transform and move as you walk past without 3D glasses. Moisture-proof optical PET lens surface.',
    spec: 'Deluxe Moulded Golden Frame • 12×18 / 16×24 in • 365 Daily Panchangam Slot',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1600&q=85',
    productTarget: 'Custom 5D Calendars'
  },
  {
    id: 'stone-art',
    category: 'Stone Art Heritage Relievo',
    badge: 'Sculpted Relievo & Kundan Gems',
    title: 'Handcrafted Heritage Temple Stone Relief',
    subtitle: 'Simulating sacred temple stone carvings with tactile multi-level embossing, antique stone washes, and 24K gold foil.',
    spec: 'High-Density Resin Board • Carved Teak Synthetic Frame • 14×20 / 18×24 in',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=85',
    productTarget: 'Stone Art Calendars'
  },
  {
    id: 'hand-fan',
    category: 'Promotional Advertising Hand Fans',
    badge: 'Virgin PP Plastic & Duplex Board',
    title: 'High-Visibility Mass Brand Promotion',
    subtitle: 'Unbreakable double-sided offset printed hand fans engineered for mass-reach exposure at outdoor events and festivals.',
    spec: 'Ergonomic Grip Handle • Water-Proof Lamination • Custom Contour Die-Cut',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
    productTarget: 'Promotional Hand Fan'
  },
  {
    id: 'special-products',
    category: 'Special Products & VIP Sets',
    badge: 'Laser Engraved & Spot UV',
    title: 'Bespoke Executive Gift Hampers & LED Easels',
    subtitle: 'Custom tailored corporate gifts including warm LED acrylic desk calendars, leatherette organizer diaries, and rigid magnetic gift boxes.',
    spec: 'Cast Acrylic & MDF Wood • Spot UV Varnish • Custom Client Dimensions',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=85',
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

        {/* Main Cinematic Slideshow Frame */}
        <div 
          className="slideshow-frame"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Layered Slide Backgrounds with Smooth Crossfade */}
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`slide-backdrop ${isActive ? 'active' : ''}`}
                style={{
                  backgroundImage: `url(${slide.image})`
                }}
                aria-hidden={!isActive}
              />
            );
          })}

          {/* Soft Luxury Vignette Overlay - Keeps text calm, clear and legible */}
          <div className="slideshow-vignette" />

          {/* Slide Content Caption */}
          <div className="slideshow-caption">
            <div className="caption-meta">
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

            <h3 className="slide-headline">
              {currentSlide.title}
            </h3>

            <p className="slide-description">
              {currentSlide.subtitle}
            </p>

            <div className="slide-spec-strip">
              <span style={{ color: 'var(--accent-gold-bright)', fontWeight: 600 }}>SPEC:</span> {currentSlide.spec}
            </div>

            {/* Quick Action Button */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '18px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('calculator', currentSlide.productTarget ? { product: currentSlide.productTarget } : undefined)}
                className="btn-gold"
                style={{ padding: '11px 22px', fontSize: '0.85rem' }}
              >
                Instant Pricing & Quote →
              </button>
              <button
                onClick={() => navigate('proofing')}
                className="btn-outline-gold"
                style={{ padding: '11px 18px', fontSize: '0.85rem' }}
              >
                3D Proofing View
              </button>
            </div>
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

          {/* Minimalist Segmented Progress Bar Indicators */}
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
          padding: 30px 0 60px;
          position: relative;
        }

        .slideshow-frame {
          position: relative;
          width: 100%;
          min-height: 480px;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-gold);
          overflow: hidden;
          background: #0d1017;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75), 0 0 30px rgba(207, 168, 78, 0.12);
          display: flex;
          align-items: flex-end;
        }

        /* Slide Backdrop with Smooth Crossfade & Calm Ken Burns Drift */
        .slide-backdrop {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.02);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .slide-backdrop.active {
          opacity: 1;
          transform: scale(1);
          animation: calmKenBurns 18s ease-out infinite alternate;
        }

        @keyframes calmKenBurns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.04) translate(-1%, -1%); }
        }

        /* Soft Vignette Overlay: Darkened base and subtle warm lighting */
        .slideshow-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg, 
            rgba(10, 12, 16, 0.25) 0%, 
            rgba(10, 12, 16, 0.55) 45%, 
            rgba(10, 12, 16, 0.94) 100%
          ),
          radial-gradient(circle at 10% 50%, rgba(207, 168, 78, 0.08) 0%, transparent 60%);
          z-index: 2;
          pointer-events: none;
        }

        /* Caption Container */
        .slideshow-caption {
          position: relative;
          z-index: 3;
          padding: 40px;
          max-width: 820px;
          animation: captionFade 0.5s ease;
        }

        @keyframes captionFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .caption-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .slide-counter {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          color: var(--accent-gold-bright);
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(207, 168, 78, 0.3);
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 700;
        }

        .slide-category-badge {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #fff;
          background: rgba(207, 168, 78, 0.18);
          border: 1px solid var(--accent-gold);
          padding: 3px 10px;
          border-radius: 20px;
        }

        .slide-feature-pill {
          font-size: 0.74rem;
          color: var(--text-secondary);
          background: rgba(0, 0, 0, 0.4);
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid var(--border-subtle);
        }

        .slide-headline {
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          color: #ffffff;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.7);
        }

        .slide-description {
          font-size: 0.95rem;
          color: #d1d5db;
          line-height: 1.6;
          margin-bottom: 14px;
          max-width: 680px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.8);
        }

        .slide-spec-strip {
          font-size: 0.8rem;
          color: var(--text-secondary);
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px 14px;
          border-radius: 8px;
          display: inline-block;
        }

        /* Nav Arrows */
        .slideshow-nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 4;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(10, 12, 16, 0.65);
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
          background: rgba(207, 168, 78, 0.25);
          color: #fff;
          transform: translateY(-50%) scale(1.08);
        }

        .slideshow-nav-arrow.prev {
          left: 18px;
        }

        .slideshow-nav-arrow.next {
          right: 18px;
        }

        /* Segmented Progress Bar Indicators at top/bottom of frame */
        .slideshow-indicators {
          position: absolute;
          top: 20px;
          left: 40px;
          right: 40px;
          z-index: 4;
          display: flex;
          gap: 8px;
        }

        .progress-bar-segment {
          flex: 1;
          height: 16px;
          background: none;
          border: none;
          padding: 6px 0;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .segment-track {
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.18);
          border-radius: 2px;
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
          border-radius: 2px;
        }

        .progress-bar-segment.active .segment-fill {
          animation: progressFill linear forwards;
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        /* Pill Tabs beneath the frame */
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
        @media (max-width: 768px) {
          .slideshow-frame {
            min-height: 400px;
          }
          .slideshow-caption {
            padding: 24px 18px 18px;
          }
          .slideshow-indicators {
            left: 16px;
            right: 16px;
            top: 14px;
          }
          .slideshow-nav-arrow {
            display: none; /* Mobile users swipe naturally */
          }
          .slide-headline {
            font-size: 1.35rem;
          }
          .slide-description {
            font-size: 0.85rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .slide-spec-strip {
            font-size: 0.72rem;
            padding: 6px 10px;
          }
          .slideshow-pills-nav {
            justify-content: flex-start;
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 6px;
            margin-top: 12px;
          }
          .slideshow-pills-nav::-webkit-scrollbar {
            display: none;
          }
          .slide-thumb-pill {
            flex-shrink: 0;
            white-space: nowrap;
          }
        }
      `}</style>
    </section>
  );
};
