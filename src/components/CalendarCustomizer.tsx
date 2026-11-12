import { useState, useEffect, type FormEvent } from 'react';
import { calculateQuote, type QuotePayload, type QuoteResult } from '../services/api';
import { useRouter } from '../context/RouterContext';

const FORMAT_OPTIONS = [
  { id: 'Real 24K Gold Foil Wall', label: '24K Gold Foil Stamped Wall', size: '17 × 27 in / 15 × 20 in', icon: '👑', popular: true, base: 145 },
  { id: 'Traditional Daily Sheet', label: 'Daily Sheet Panchangam', size: 'Jumbo 9 × 11.5 in', icon: '🗓️', popular: true, base: 65 },
  { id: '12-Sheet Monthly Wall', label: '12-Sheet Monthly Art Wall', size: '15 × 20 in (Art Paper)', icon: '🖼️', popular: true, base: 110 },
  { id: '3D / 5D Lenticular Motion', label: '3D / 5D Lenticular Motion', size: '12 × 18 in (75 LPI)', icon: '🌀', popular: false, base: 220 },
  { id: 'Executive Tabletop Desk', label: 'Tabletop Desk Easel', size: '8.5 × 6 in (Landscape)', icon: '📐', popular: false, base: 95 },
  { id: '24K Gold Foil Photo Frame', label: '24K Gold Foil Photo Frame', size: '12 × 18 in (Teak/Gold Frame)', icon: '🖼️', popular: true, base: 180 },
  { id: 'Kundan Stone Embossed', label: 'Kundan Stone Luxury Frame', size: '14 × 20 in Frame', icon: '💎', popular: false, base: 280 }
];

const PAPER_OPTIONS = [
  { id: '400 GSM Rigid Board', label: '400 GSM Virgin Kappa Board', desc: 'Heavyweight rigid backing board for gold foil stamping & tin mounting', tag: 'Gold Foil' },
  { id: '60 GSM Maplitho Daily', label: '60 GSM Smooth Maplitho', desc: 'Crisp micro-perforated daily panchangam tear-off leaves', tag: 'Daily Sheet' },
  { id: '210 GSM Bilt Royal Gloss', label: '210 GSM Bilt Royal Art Paper', desc: 'Double-coated high-gloss art paper for multi-sheet wall calendars', tag: 'Monthly Wall' },
  { id: '300 GSM Velvet Card', label: '300 GSM Matte Velvet Card', desc: 'Anti-scratch matte card for executive tabletop wire-o desk calendars', tag: 'Table Desk' },
  { id: '75 LPI Lenticular PET', label: '75 LPI Optical Lenticular Sheet', desc: 'Precision optical micro-lens sheet for 3D depth and angle motion', tag: '3D Specialty' }
];

const FINISH_OPTIONS = [
  { id: '24K Heated Brass Gold Foil', label: '24K Heated Brass Gold Foil', desc: 'Mirror metallic reflection on deities, borders, and corporate logo', surcharge: '₹22/unit' },
  { id: 'Spot Gloss UV & Velvet Lamination', label: 'Spot Gloss UV + Soft Velvet', desc: 'Velvet soft lamination with raised glass-like gloss highlights', surcharge: '₹16/unit' },
  { id: '3D Optical Lenticular Depth', label: '3D Depth & Image Morphing', desc: 'Holographic dimensional effect visible without 3D glasses', surcharge: '₹45/unit' },
  { id: 'Hand-Set Kundan Stones & Glitter', label: 'Kundan Stones & Glitter Flocking', desc: 'Hand-crafted gemstone work with soft fabric velvet flocking', surcharge: '₹55/unit' }
];

const BINDING_OPTIONS = [
  { id: 'Heavy-Gauge Anti-Rust Tin Plate', label: 'Anti-Rust Tin Plate with Loop', desc: 'Traditional Sivakasi tin mounting with heavy-duty galvanized hanger' },
  { id: 'Twin Wire-O Gold Spiral', label: 'Twin Wire-O Metallic Gold Spiral', desc: 'High-tensile wire spiral for tabletop easel or multi-sheet wall calendars' },
  { id: 'Deluxe Moulded Synthetic Gold Frame', label: 'Carved Moulded Gold Frame', desc: 'Ornate synthetic wooden finish frame with wall mounting cleat' },
  { id: 'Rigid Hardboard Easel Stand', label: '2mm Rigid Kappa Triangular Easel', desc: 'Sturdy desktop easel stand wrapped in black buckram paper' }
];

export const CalendarCustomizer = () => {
  const { pageParams } = useRouter();
  const [format, setFormat] = useState('Real 24K Gold Foil Wall');
  const [paperGsm, setPaperGsm] = useState('400 GSM Rigid Board');
  const [finish, setFinish] = useState('24K Heated Brass Gold Foil');
  const [binding, setBinding] = useState('Heavy-Gauge Anti-Rust Tin Plate');
  const [quantity, setQuantity] = useState(250);

  // Auto-sync format if passed via router params
  useEffect(() => {
    if (pageParams?.product) {
      const p = pageParams.product.toLowerCase();
      if (p.includes('gold') || p.includes('foil')) {
        setFormat('Real 24K Gold Foil Wall');
        setPaperGsm('400 GSM Rigid Board');
        setFinish('24K Heated Brass Gold Foil');
      }
      else if (p.includes('daily') || p.includes('panchangam') || p.includes('sheet')) {
        setFormat('Traditional Daily Sheet');
        setPaperGsm('60 GSM Maplitho Daily');
        setBinding('Heavy-Gauge Anti-Rust Tin Plate');
      }
      else if (p.includes('monthly') || p.includes('12-sheet')) {
        setFormat('12-Sheet Monthly Wall');
        setPaperGsm('210 GSM Bilt Royal Gloss');
        setBinding('Twin Wire-O Gold Spiral');
      }
      else if (p.includes('3d') || p.includes('lenticular')) {
        setFormat('3D / 5D Lenticular Motion');
        setPaperGsm('75 LPI Lenticular PET');
        setFinish('3D Optical Lenticular Depth');
        setBinding('Deluxe Moulded Synthetic Gold Frame');
      }
      else if (p.includes('table') || p.includes('desk') || p.includes('easel')) {
        setFormat('Executive Tabletop Desk');
        setPaperGsm('300 GSM Velvet Card');
        setBinding('Twin Wire-O Gold Spiral');
      }
      else if (p.includes('photo') || (p.includes('gold') && p.includes('frame'))) {
        setFormat('24K Gold Foil Photo Frame');
        setPaperGsm('400 GSM Rigid Board');
        setFinish('24K Heated Brass Gold Foil');
        setBinding('Deluxe Moulded Synthetic Gold Frame');
      }
      else if (p.includes('kundan') || p.includes('stone')) {
        setFormat('Kundan Stone Embossed');
        setPaperGsm('400 GSM Rigid Board');
        setFinish('Hand-Set Kundan Stones & Glitter');
        setBinding('Deluxe Moulded Synthetic Gold Frame');
      }
    }
  }, [pageParams]);

  // Quote calculation state
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [calculating, setCalculating] = useState(false);

  // Modal for quote submission
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Calculate whenever selections change
  useEffect(() => {
    let isMounted = true;
    setCalculating(true);

    const payload: QuotePayload = {
      format,
      paperGsm,
      finish,
      binding,
      quantity
    };

    calculateQuote(payload)
      .then((res) => {
        if (isMounted) {
          setQuote(res);
          setCalculating(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCalculating(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [format, paperGsm, finish, binding, quantity]);

  const handleFinalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      alert('Please provide your name and work email.');
      return;
    }

    try {
      setCalculating(true);
      const res = await calculateQuote({
        format,
        paperGsm,
        finish,
        binding,
        quantity,
        clientName,
        company,
        clientEmail,
        clientPhone
      });
      setQuote(res);
      setSubmitSuccess(true);
      setCalculating(false);
    } catch {
      alert('Failed to register official quote with press backend.');
      setCalculating(false);
    }
  };

  return (
    <section id="customizer" style={{ padding: '0 0 50px', position: 'relative' }}>
      <div className="container">
        {/* Main 2-Column Configurator Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '36px',
            alignItems: 'start'
          }}
          className="customizer-grid"
        >
          {/* Left Column: Interactive Step-by-Step Selectors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. Format & Dimensions */}
            <div className="config-card">
              <div className="config-header">
                <span className="step-num">01</span>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem' }}>Calendar Format</h4>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {FORMAT_OPTIONS.map((opt) => {
                  const selected = format === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setFormat(opt.id)}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-sm)',
                        background: selected ? 'rgba(207, 168, 78, 0.12)' : 'var(--bg-input)',
                        border: `1.5px solid ${selected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      {opt.popular && (
                        <span style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          fontSize: '0.65rem',
                          background: 'var(--accent-gold-dark)',
                          color: '#fff',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}>POPULAR</span>
                      )}
                      <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{opt.icon}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: selected ? '#fff' : 'var(--text-primary)' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{opt.size}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Paper Stock & Grammage */}
            <div className="config-card">
              <div className="config-header">
                <span className="step-num">02</span>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem' }}>Paper Stock (GSM)</h4>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                {PAPER_OPTIONS.map((opt) => {
                  const selected = paperGsm === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPaperGsm(opt.id)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: 'var(--radius-sm)',
                        background: selected ? 'rgba(207, 168, 78, 0.12)' : 'var(--bg-input)',
                        border: `1.5px solid ${selected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontWeight: 600, color: selected ? '#fff' : 'var(--text-primary)', fontSize: '0.92rem' }}>
                            {opt.label}
                          </span>
                          <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                            {opt.tag}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          {opt.desc}
                        </p>
                      </div>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: `2px solid ${selected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {selected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)' }} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Luxury Embellishments & Foils */}
            <div className="config-card">
              <div className="config-header">
                <span className="step-num">03</span>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem' }}>Foil Stamping & Finishes</h4>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {FINISH_OPTIONS.map((opt) => {
                  const selected = finish === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setFinish(opt.id)}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-sm)',
                        background: selected ? 'rgba(207, 168, 78, 0.12)' : 'var(--bg-input)',
                        border: `1.5px solid ${selected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.88rem', color: selected ? '#fff' : 'var(--text-primary)' }}>
                          {opt.label}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)' }}>
                          {opt.surcharge}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {opt.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Binding Selection */}
            <div className="config-card">
              <div className="config-header">
                <span className="step-num">04</span>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem' }}>Binding Hardware</h4>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {BINDING_OPTIONS.map((opt) => {
                  const selected = binding === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setBinding(opt.id)}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-sm)',
                        background: selected ? 'rgba(207, 168, 78, 0.12)' : 'var(--bg-input)',
                        border: `1.5px solid ${selected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: selected ? '#fff' : 'var(--text-primary)' }}>
                        {opt.label}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {opt.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Quantity Slider */}
            <div className="config-card">
              <div className="config-header">
                <span className="step-num">05</span>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem' }}>Volume & Bulk Discount</h4>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Selected Quantity:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="number"
                      min={25}
                      max={10000}
                      step={25}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(25, parseInt(e.target.value) || 25))}
                      style={{
                        width: '110px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        textAlign: 'center',
                        color: 'var(--accent-gold-bright)',
                        padding: '6px'
                      }}
                    />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Units</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={50}
                  max={2500}
                  step={25}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    accentColor: 'var(--accent-gold)',
                    cursor: 'pointer'
                  }}
                />

                {/* Quick select pills */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                  {[100, 250, 500, 1000, 2000].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuantity(q)}
                      style={{
                        background: quantity === q ? 'var(--accent-gold)' : 'var(--bg-input)',
                        color: quantity === q ? '#0b0c0e' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        padding: '4px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {q} Units
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary & Real-Time Price Matrix */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div
              style={{
                background: 'linear-gradient(160deg, #181d26 0%, #11141b 100%)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-gold)',
                padding: '28px',
                boxShadow: 'var(--shadow-lg), 0 0 25px rgba(207, 168, 78, 0.12)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span className="foil-badge">LIVE PRESS ESTIMATE</span>
                {quote?.quoteId && (
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    REF: {quote.quoteId}
                  </span>
                )}
              </div>

              {/* Price Highlight */}
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '20px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Unit Press Cost
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-gold-bright)' }}>
                    {quote ? `₹${quote.unitPrice}` : 'Calculating...'}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ calendar</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Order Total ({quantity} Units):
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                    {quote ? `₹${quote.subtotal.toLocaleString()}` : '—'}
                  </span>
                </div>

                {quote && quote.discountPercentage > 0 && (
                  <div
                    style={{
                      marginTop: '12px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.78rem'
                    }}
                  >
                    <span style={{ color: '#34d399', fontWeight: 600 }}>
                      ✓ Bulk Tier Discount ({quote.discountPercentage}% OFF)
                    </span>
                    <span style={{ color: '#34d399', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      Save ₹{quote.totalSavings.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Specifications Snapshot */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Format:</span>
                  <strong style={{ color: '#fff' }}>{format}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Paper Stock:</span>
                  <strong style={{ color: '#fff' }}>{paperGsm}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Finish:</span>
                  <strong style={{ color: 'var(--accent-gold-bright)' }}>{finish}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Binding:</span>
                  <strong style={{ color: '#fff' }}>{binding}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Turnaround:</span>
                  <strong style={{ color: '#34d399' }}>{quote?.estimatedTurnaround || '4–5 Days'}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-gold"
                  style={{ width: '100%', padding: '14px' }}
                >
                  <span>Lock In Quote & Request PDF</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.4' }}>
                  🔒 Official quotation valid for 14 calendar days. Includes complimentary pre-flight digital proofing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Quote Submission Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => !calculating && setIsModalOpen(false)}
        >
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '520px',
              width: '100%',
              padding: '36px',
              boxShadow: 'var(--shadow-lg), 0 0 40px rgba(207, 168, 78, 0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '1.4rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            {!submitSuccess ? (
              <form onSubmit={handleFinalSubmit}>
                <span className="foil-badge" style={{ marginBottom: '12px' }}>OFFICIAL PRESS PROPOSAL</span>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '8px' }}>
                  Register Official Quotation
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Where should our lead press master send your itemized proposal, vector dieline, and proof schedule?
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anandha Krishnan"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Company / Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Zenith Global Ventures"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="anand@company.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Contact Phone (WhatsApp for Instant Proofs)</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                  </div>

                  <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Total Configured: <strong>{quantity} units</strong> of {format} with {finish}.
                    <br />
                    Total Estimated: <strong style={{ color: 'var(--accent-gold-bright)' }}>₹{quote?.subtotal.toLocaleString()}</strong>
                  </div>

                  <button
                    type="submit"
                    disabled={calculating}
                    className="btn-gold"
                    style={{ marginTop: '8px', width: '100%', padding: '14px' }}
                  >
                    {calculating ? 'Generating Press Proposal...' : 'Register Proposal & Send PDF'}
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10b981',
                    color: '#10b981',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}
                >
                  ✓
                </div>

                <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
                  Quotation Confirmed!
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                  Your official quotation reference <strong style={{ color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)' }}>{quote?.quoteId}</strong> has been logged with our press scheduler.
                </p>

                <div
                  style={{
                    background: 'var(--bg-card)',
                    padding: '16px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    fontSize: '0.82rem',
                    marginBottom: '24px',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <p><strong>Client:</strong> {clientName} ({company || 'Individual'})</p>
                  <p><strong>Dispatch Delivery:</strong> {quote?.estimatedTurnaround}</p>
                  <p><strong>Locked Price:</strong> ₹{quote?.subtotal.toLocaleString()} (₹{quote?.unitPrice}/unit)</p>
                  <p><strong>Valid Until:</strong> {quote?.validUntil}</p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-outline-gold"
                    style={{ flex: 1, padding: '12px' }}
                  >
                    🖨️ Print / Save PDF
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSubmitSuccess(false);
                    }}
                    className="btn-gold"
                    style={{ flex: 1, padding: '12px' }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .config-card {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 24px;
          transition: border-color 0.2s ease;
        }
        .config-card:hover {
          border-color: var(--border-gold);
        }
        .config-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .step-num {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-gold-bright);
          background: rgba(207, 168, 78, 0.12);
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid var(--border-gold);
        }
        @media (max-width: 960px) {
          .customizer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
