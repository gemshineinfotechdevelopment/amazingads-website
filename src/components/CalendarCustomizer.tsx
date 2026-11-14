import { useState, useEffect, type FormEvent } from 'react';
import {
  calculateQuote,
  getCalendarProducts,
  sendCustomerMessage,
  SIVAKASI_CATALOG,
  type CalendarProduct,
  type QuotePayload,
  type QuoteResult
} from '../services/api';
import { useRouter } from '../context/RouterContext';

export interface FormatOption {
  id: string;
  productId: string;
  label: string;
  fullName: string;
  size: string;
  icon: string;
  popular: boolean;
  base: number;
  tag: string;
  img: string;
  defaultSizes: { size: string; price: number }[];
  defaultFinish: string;
}

const FORMAT_OPTIONS: FormatOption[] = [
  {
    id: 'Gold / Silver PET Foil Calendar',
    productId: 'pet-foil-calendar',
    label: 'Gold / Silver PET Foil',
    fullName: 'Gold / Silver PET Foil Calendar',
    size: '12 × 18 in / 15 × 20 in / 17 × 27 in',
    icon: '👑',
    popular: true,
    base: 145,
    tag: 'Flagship Luxury Spec',
    img: '/images/pet-foil-calendar-real.jpg',
    defaultSizes: [
      { size: '12 × 18 inches', price: 125 },
      { size: '15 × 20 inches', price: 145 },
      { size: '17 × 27 inches', price: 210 }
    ],
    defaultFinish: 'Mirror 24K Gold & Silver Foil Emboss'
  },
  {
    id: 'Custom 5D Calendars',
    productId: 'custom-5d-calendar',
    label: 'Custom 5D Holographic',
    fullName: 'Custom 5D Holographic Calendars',
    size: '12 × 18 in / 16 × 24 in / 18 × 28 in',
    icon: '🌀',
    popular: true,
    base: 220,
    tag: 'Trending 5D Tech',
    img: '/images/custom-5d-calendar-real.jpg',
    defaultSizes: [
      { size: '12 × 18 inches', price: 220 },
      { size: '16 × 24 inches', price: 295 },
      { size: '18 × 28 inches', price: 380 }
    ],
    defaultFinish: 'Deluxe Moulded Synthetic Gold Frame'
  },
  {
    id: 'Stone Art Calendars',
    productId: 'stone-art-calendar',
    label: 'Stone Art Sculptural',
    fullName: 'Stone Art Sculptural Calendars',
    size: '12 × 18 in / 14 × 20 in / 18 × 24 in',
    icon: '🗿',
    popular: false,
    base: 280,
    tag: 'Artisan Heritage Craft',
    img: '/images/stone-art-calendar-real.jpg',
    defaultSizes: [
      { size: '12 × 18 inches', price: 250 },
      { size: '14 × 20 inches', price: 280 },
      { size: '18 × 24 inches', price: 395 }
    ],
    defaultFinish: 'Antique Stone Wash & Kundan Work'
  },
  {
    id: 'Hand Fan',
    productId: 'hand-fan',
    label: 'Promotional Hand Fan',
    fullName: 'Promotional Advertising Hand Fan',
    size: '8 × 8 in / 9 × 10 in',
    icon: '🪭',
    popular: false,
    base: 28,
    tag: 'High ROI Bulk Promo',
    img: '/images/hand-fan-promo-real.jpg',
    defaultSizes: [
      { size: '8 × 8 inches', price: 28 },
      { size: '9 × 10 inches', price: 34 }
    ],
    defaultFinish: 'Double-Sided UV Gloss Lamination'
  },
  {
    id: 'Special Products',
    productId: 'special-products',
    label: 'Special Products',
    fullName: 'Special Products (LED / Gifts / Sets)',
    size: '9 × 12 in / 12 × 16 in / 16 × 20 in',
    icon: '🎁',
    popular: true,
    base: 195,
    tag: 'Bespoke Made-to-Order',
    img: '/images/special-products-gift-real.jpg',
    defaultSizes: [
      { size: '9 × 12 inches', price: 195 },
      { size: '12 × 16 inches', price: 275 },
      { size: '16 × 20 inches', price: 360 }
    ],
    defaultFinish: 'Spot UV & Laser Engraving'
  }
];

export const FINISH_OPTIONS = [
  { id: 'Mirror 24K Gold & Silver Foil Emboss', label: 'Mirror 24K Gold & Silver Foil Emboss', surcharge: 22, desc: 'High-gloss mirror metallic reflection on deities and corporate crest' },
  { id: 'Deluxe Moulded Synthetic Gold Frame', label: 'Deluxe Carved Royal Synthetic Frame', surcharge: 35, desc: 'Heavy moulded frame with wood-grain or gold foil border finish' },
  { id: 'Antique Stone Wash & Kundan Work', label: 'Sculpted Stone Wash & Gems Relief', surcharge: 55, desc: 'Hand-crafted stone relief textures with antique metallic highlights' },
  { id: 'Heavy-Gauge Anti-Rust Tin Plate', label: 'Heavy-Gauge Anti-Rust Tin Mounting', surcharge: 0, desc: 'Traditional Sivakasi tin mounting with brass center hanging loop' },
  { id: 'Double-Sided UV Gloss Lamination', label: 'Double-Sided UV Gloss Protection', surcharge: 8, desc: 'Weatherproof high-gloss protective shield for vibrant outdoor durability' }
];

export const CalendarCustomizer = () => {
  const { pageParams } = useRouter();

  // Live products sync from catalog
  const [liveCatalog, setLiveCatalog] = useState<CalendarProduct[]>(SIVAKASI_CATALOG);

  useEffect(() => {
    getCalendarProducts()
      .then((data) => {
        if (data && data.length > 0) setLiveCatalog(data);
      })
      .catch(() => {});

    const handleCatalogUpdate = (e: Event) => {
      const custom = e as CustomEvent<CalendarProduct[]>;
      if (custom.detail && Array.isArray(custom.detail)) {
        setLiveCatalog(custom.detail);
      }
    };
    window.addEventListener('catalog-updated', handleCatalogUpdate);
    return () => window.removeEventListener('catalog-updated', handleCatalogUpdate);
  }, []);

  const getInitialProduct = () => {
    if (pageParams?.product) {
      const p = pageParams.product.toLowerCase();
      const matched = FORMAT_OPTIONS.find(opt => 
        opt.id.toLowerCase().includes(p) || 
        opt.label.toLowerCase().includes(p) ||
        p.includes(opt.id.toLowerCase())
      );
      if (matched) return matched;
    }
    return FORMAT_OPTIONS[0];
  };

  const initialOpt = getInitialProduct();
  const [format, setFormat] = useState(initialOpt.id);
  const [selectedSize, setSelectedSize] = useState(initialOpt.defaultSizes[0].size);
  const [finish, setFinish] = useState(initialOpt.defaultFinish);
  const [quantity, setQuantity] = useState(250);

  // Sync format if pageParams changes subsequently
  useEffect(() => {
    if (pageParams?.product) {
      const p = pageParams.product.toLowerCase();
      const matched = FORMAT_OPTIONS.find(opt => 
        opt.id.toLowerCase().includes(p) || 
        opt.label.toLowerCase().includes(p) ||
        p.includes(opt.id.toLowerCase())
      );
      if (matched && matched.id !== format) {
        setFormat(matched.id);
        setSelectedSize(matched.defaultSizes[0].size);
        setFinish(matched.defaultFinish);
      }
    }
  }, [pageParams?.product, format]);

  // Quote calculation state
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [calculating, setCalculating] = useState(false);

  // Form submission state
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedFormatObj = FORMAT_OPTIONS.find(f => f.id === format) || FORMAT_OPTIONS[0];
  const liveProduct = liveCatalog.find(p => p.id === selectedFormatObj.productId || p.name.toLowerCase().includes(selectedFormatObj.label.toLowerCase()));

  // Frame size list with individual frame-specific pricing
  const sizesList: { size: string; price: number }[] = (liveProduct?.sizes && liveProduct.sizes.length > 0)
    ? liveProduct.sizes.map(s => ({
        size: s,
        price: (liveProduct.sizePrices && liveProduct.sizePrices[s]) || liveProduct.startingPrice || selectedFormatObj.base
      }))
    : selectedFormatObj.defaultSizes;

  // Ensure selectedSize is valid in current sizesList
  const currentSizeObj = sizesList.find(s => s.size === selectedSize) || sizesList[0];
  const frameUnitPrice = currentSizeObj.price;
  const selectedFinishObj = FINISH_OPTIONS.find(f => f.id === finish) || FINISH_OPTIONS[0];

  const handleSelectFormat = (opt: FormatOption) => {
    setFormat(opt.id);
    const prod = liveCatalog.find(p => p.id === opt.productId || p.name.toLowerCase().includes(opt.label.toLowerCase()));
    if (prod && prod.sizes && prod.sizes.length > 0) {
      setSelectedSize(prod.sizes[0]);
    } else {
      setSelectedSize(opt.defaultSizes[0].size);
    }
    setFinish(opt.defaultFinish);
    setSubmitSuccess(false);
  };

  // Calculate whenever selections change
  useEffect(() => {
    let isMounted = true;
    setCalculating(true);

    const payload: QuotePayload = {
      productId: selectedFormatObj.productId,
      format: selectedFormatObj.fullName,
      size: currentSizeObj.size,
      customUnitPrice: frameUnitPrice,
      finish,
      binding: 'Standard Mount',
      paperGsm: '400 GSM Rigid Board',
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
  }, [format, selectedSize, frameUnitPrice, finish, quantity, selectedFormatObj.fullName, selectedFormatObj.productId, currentSizeObj.size]);

  const handleDirectOrderSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    try {
      setSubmitting(true);
      const leadMessage = `Customizer Direct Inquiry:
• Product: ${selectedFormatObj.fullName}
• Frame Size: ${currentSizeObj.size} (Base Rate: ₹${frameUnitPrice}/unit)
• Selected Finish: ${finish}
• Order Volume: ${quantity} units
• Estimated Unit Rate: ₹${quote ? quote.unitPrice : frameUnitPrice}/unit
• Estimated Total: ₹${quote ? quote.subtotal.toLocaleString() : (frameUnitPrice * quantity).toLocaleString()}
• Client: ${clientName} (${company || 'Individual/Trader'})
• Phone: ${clientPhone}
• Email: ${clientEmail || 'N/A'}
• Branding / Notes: ${clientNotes || 'Standard'}`;

      await sendCustomerMessage(
        clientName,
        clientPhone,
        leadMessage,
        {
          email: clientEmail,
          product: selectedFormatObj.fullName,
          size: currentSizeObj.size,
          quantity,
          notes: `Total: ₹${quote?.subtotal || 0}. ${clientNotes}`
        }
      );

      // Register official quote with backend
      const res = await calculateQuote({
        productId: selectedFormatObj.productId,
        format: selectedFormatObj.fullName,
        size: currentSizeObj.size,
        customUnitPrice: frameUnitPrice,
        finish,
        binding: 'Standard Mount',
        paperGsm: '400 GSM Rigid Board',
        quantity,
        clientName,
        company,
        clientEmail,
        clientPhone,
        notes: clientNotes
      });
      setQuote(res);
      setSubmitSuccess(true);
      setSubmitting(false);
    } catch {
      alert('Unable to submit inquiry. Please call our direct helpline.');
      setSubmitting(false);
    }
  };

  const handleFinalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || (!clientEmail.trim() && !clientPhone.trim())) {
      alert('Please provide your name and phone number or email.');
      return;
    }

    try {
      setCalculating(true);
      const leadMessage = `Official Customizer Proposal (${selectedFormatObj.fullName}):
• Frame Size: ${currentSizeObj.size} (Rate: ₹${frameUnitPrice}/unit)
• Finish: ${finish}
• Quantity: ${quantity} units
• Est. Total: ₹${quote ? quote.subtotal.toLocaleString() : 'N/A'}
• Company: ${company || 'N/A'}`;

      await sendCustomerMessage(
        clientName,
        clientPhone || 'Not specified',
        leadMessage,
        {
          email: clientEmail,
          product: selectedFormatObj.fullName,
          size: currentSizeObj.size,
          quantity,
          notes: `Company: ${company || 'N/A'}`
        }
      );

      const res = await calculateQuote({
        productId: selectedFormatObj.productId,
        format: selectedFormatObj.fullName,
        size: currentSizeObj.size,
        customUnitPrice: frameUnitPrice,
        finish,
        binding: 'Standard Mount',
        paperGsm: '400 GSM Rigid Board',
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
    <section id="customizer" style={{ padding: '0 0 60px', position: 'relative' }}>
      <div className="container">

        {/* 1. Format Selection: Clean, Visual Cards */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="step-badge">1</span> Select Product Model
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Choose a model to preview live wholesale rates
            </span>
          </div>

          <div className="format-cards-grid">
            {FORMAT_OPTIONS.map((opt) => {
              const isSelected = format === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectFormat(opt)}
                  className={`format-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="format-card-img-wrap">
                    <img src={opt.img} alt={opt.label} className="format-card-img" />
                    {opt.popular && <span className="format-pill-popular">POPULAR</span>}
                    {isSelected && <span className="format-pill-selected">✓ Selected</span>}
                  </div>
                  <div className="format-card-body">
                    <div className="format-card-title">{opt.label}</div>
                    <div className="format-card-size">{opt.size}</div>
                    <div className="format-card-price">
                      <span>Starts at</span>
                      <strong>₹{opt.base}</strong>
                      <span className="unit">/unit</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Main 2-Column Area: Left Config Panel + Right Price Card */}
        <div className="customizer-layout-grid">
          
          {/* Left Column: Clean Unified Specs & Quantity */}
          <div className="specs-unified-panel">
            <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="step-badge">2</span> Configure Specifications & Quantity
            </h3>

            {/* Selected Product Banner */}
            <div className="active-format-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '2rem' }}>{selectedFormatObj.icon}</span>
                <div>
                  <div style={{ fontSize: '1.08rem', fontWeight: 700, color: '#fff' }}>
                    {selectedFormatObj.fullName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-bright)', marginTop: '2px' }}>
                    {selectedFormatObj.tag} • Base Dimensions: {selectedFormatObj.size}
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Form Grid: Simplified, Frame Size Wise */}
            <div className="specs-form-grid">
              
              {/* 1. FRAME SIZE SELECTION WITH SIZE-SPECIFIC PRICING */}
              <div className="spec-form-group">
                <label className="spec-label">
                  <span>Frame Dimensions & Frame-Specific Rate</span>
                  <span className="spec-tag" style={{ color: 'var(--accent-gold-bright)' }}>Frame Size</span>
                </label>
                <div className="customizer-sizes-grid">
                  {sizesList.map((szObj) => {
                    const isSelected = selectedSize === szObj.size;
                    return (
                      <button
                        key={szObj.size}
                        type="button"
                        onClick={() => setSelectedSize(szObj.size)}
                        className={`customizer-size-btn ${isSelected ? 'active' : ''}`}
                      >
                        <div className="customizer-size-name">{szObj.size}</div>
                        <div className="customizer-size-price">
                          <strong>₹{szObj.price}</strong>
                          <span className="unit">/ unit</span>
                        </div>
                        {isSelected && <span className="customizer-size-badge">✓ Selected</span>}
                      </button>
                    );
                  })}
                </div>
                <p className="spec-hint" style={{ marginTop: '8px' }}>
                  Wholesale rate automatically updates based on selected frame size.
                </p>
              </div>

              {/* 2. FRAME STYLE & DELUXE FINISH */}
              <div className="spec-form-group">
                <label className="spec-label">
                  <span>Frame Border & Deluxe Finish</span>
                  <span className="spec-tag">Embellishment</span>
                </label>
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className="spec-select"
                >
                  {FINISH_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label} {opt.surcharge > 0 ? `(+₹${opt.surcharge}/unit)` : '(Standard Included)'}
                    </option>
                  ))}
                </select>
                <p className="spec-hint">{selectedFinishObj?.desc}</p>
              </div>
            </div>

            {/* Quantity & Bulk Discount Section */}
            <div className="quantity-section-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.94rem', color: '#fff', fontWeight: 600 }}>Order Volume</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Direct factory wholesale price tiers applied</span>
                </div>
                
                {/* Quantity Stepper */}
                <div className="customizer-qty-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.max(25, prev - 25))}
                    className="customizer-qty-btn"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={25}
                    max={50000}
                    step={25}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(25, parseInt(e.target.value, 10) || 25))}
                    className="customizer-qty-input"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => prev + 25)}
                    className="customizer-qty-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quick Preset Volume Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: '4px' }}>Preset Volumes:</span>
                {[100, 250, 500, 1000, 2500, 5000].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className={`qty-preset-pill ${quantity === q ? 'active' : ''}`}
                  >
                    {q.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Discount Callout */}
              {quote && quote.discountPercentage > 0 && (
                <div className="bulk-tier-banner">
                  <span>🎉 <strong>{quote.discountPercentage}% Wholesale Tier Discount Applied!</strong></span>
                  <span className="savings-highlight">You save ₹{quote.totalSavings.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Direct Factory Inquiry Form inside Customizer */}
            <div className="customizer-direct-inquiry-box" style={{ marginTop: '24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 700, margin: 0 }}>
                    Direct Factory Order & Proof Request
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                    Submit your details. This inquiry logs directly into our Sivakasi admin works queue.
                  </p>
                </div>
                <span className="foil-badge" style={{ fontSize: '0.7rem' }}>DIRECT WORKS LEAD</span>
              </div>

              {submitSuccess ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '8px', padding: '18px', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>✅</span>
                  <div style={{ color: '#34d399', fontWeight: 800, fontSize: '1.05rem', marginTop: '6px' }}>
                    Inquiry Submitted to Sivakasi Works Desk!
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '4px' }}>
                    Thank you, {clientName}! Ref: <strong>{quote?.quoteId || 'AA-INQ'}</strong>. Our factory manager will call you at <strong>{clientPhone}</strong> to confirm delivery and corporate branding.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="btn-outline-gold"
                    style={{ marginTop: '10px', padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    Configure Another Specification
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDirectOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', padding: '10px 12px', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', padding: '10px 12px', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Email Address</label>
                      <input
                        type="email"
                        placeholder="corporate@company.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', padding: '10px 12px', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Company / Temple Name (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Sri Krishna Enterprises"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', padding: '10px 12px', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Branding / Crest Header Notes (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Print company logo and branch addresses on header"
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', padding: '10px 12px', fontSize: '0.85rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold"
                    style={{ width: '100%', padding: '13px', fontSize: '0.92rem', marginTop: '4px', cursor: 'pointer' }}
                  >
                    {submitting ? 'Submitting to Factory Desk...' : '⚡ Submit Order Inquiry to Sivakasi Works'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Live Quotation Card */}
          <div className="live-quote-card-sticky">
            <div className="live-quote-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="foil-badge">LIVE WHOLESALE QUOTE</span>
                {quote?.quoteId && (
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    REF: {quote.quoteId}
                  </span>
                )}
              </div>

              {/* Price Header */}
              <div className="quote-price-header">
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Unit Press Rate
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span className="quote-unit-price">
                      {calculating ? '...' : (quote ? `₹${quote.unitPrice}` : `₹${frameUnitPrice}`)}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ unit</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Total for {quantity} Units
                  </span>
                  <div className="quote-total-price">
                    {calculating ? '...' : (quote ? `₹${quote.subtotal.toLocaleString()}` : `₹${(frameUnitPrice * quantity).toLocaleString()}`)}
                  </div>
                </div>
              </div>

              {/* Itemized Snapshot */}
              <div className="quote-spec-summary">
                <div className="quote-spec-row">
                  <span className="spec-k">Product:</span>
                  <span className="spec-v">{selectedFormatObj.label}</span>
                </div>
                <div className="quote-spec-row">
                  <span className="spec-k">Frame Size:</span>
                  <span className="spec-v" style={{ color: 'var(--accent-gold-bright)', fontWeight: 700 }}>{currentSizeObj.size}</span>
                </div>
                <div className="quote-spec-row">
                  <span className="spec-k">Frame Rate:</span>
                  <span className="spec-v">₹{frameUnitPrice} / unit</span>
                </div>
                <div className="quote-spec-row">
                  <span className="spec-k">Finish:</span>
                  <span className="spec-v">{finish}</span>
                </div>
                <div className="quote-spec-row">
                  <span className="spec-k">Turnaround:</span>
                  <span className="spec-v" style={{ color: '#34d399' }}>{quote?.estimatedTurnaround || '4–5 Business Days'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Lock Quote / PDF Modal Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="btn-gold"
                  style={{ width: '100%', padding: '13px', fontSize: '0.92rem', cursor: 'pointer' }}
                >
                  📄 Request Official PDF Proposal & Proof
                </button>
              </div>

              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '14px', lineHeight: 1.4 }}>
                🔒 Direct Sivakasi factory quotation. Free pre-flight digital proof included with your corporate logo.
              </p>
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
              border: '1px solid #454545',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '520px',
              width: '100%',
              padding: '36px',
              boxShadow: 'var(--shadow-lg), 0 0 40px rgba(215, 134, 0, 0.25)',
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
                    <label>Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                  </div>

                  <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Total Configured: <strong>{quantity} units</strong> of {format} ({currentSizeObj.size}) with {finish}.
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

      {/* Scoped CSS for the New Clean Layout */}
      <style>{`
        .step-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(215, 134, 0, 0.18);
          border: 1px solid var(--border-gold);
          color: var(--accent-gold-bright);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
        }

        /* 1. Format Selection Visual Cards Grid */
        .format-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 16px;
        }

        .format-card {
          background: var(--bg-card);
          border: 1.5px solid var(--border-card);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .format-card:hover {
          border-color: var(--accent-gold);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        .format-card.selected {
          border-color: var(--accent-gold);
          background: rgba(215, 134, 0, 0.12);
          box-shadow: 0 0 20px rgba(215, 134, 0, 0.25);
        }

        .format-card-img-wrap {
          position: relative;
          width: 100%;
          height: 120px;
          overflow: hidden;
          background: #08090b;
        }

        .format-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .format-card:hover .format-card-img {
          transform: scale(1.05);
        }

        .format-pill-popular {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid var(--accent-gold);
          color: var(--accent-gold-bright);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }

        .format-pill-selected {
          position: absolute;
          top: 8px;
          right: 8px;
          background: var(--accent-gold);
          color: #000;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .format-card-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .format-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 2px;
        }

        .format-card-size {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 10px;
        }

        .format-card-price {
          margin-top: auto;
          display: flex;
          align-items: baseline;
          gap: 4px;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .format-card-price strong {
          color: var(--accent-gold-bright);
          font-family: var(--font-mono);
          font-size: 1.05rem;
          font-weight: 800;
        }

        .format-card-price .unit {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        /* 2. Main 2-Column Layout */
        .customizer-layout-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 32px;
          align-items: start;
        }

        /* Unified Specs Panel */
        .specs-unified-panel {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          padding: 28px;
        }

        .active-format-banner {
          background: rgba(215, 134, 0, 0.12);
          border: 1px solid var(--border-gold);
          border-radius: var(--radius-md);
          padding: 14px 18px;
          margin-bottom: 24px;
        }

        .specs-form-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 26px;
        }

        .spec-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .spec-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .spec-tag {
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .spec-select {
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          color: #fff;
          padding: 12px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.92rem;
          cursor: pointer;
          transition: border-color 0.2s;
          outline: none;
        }

        .spec-select:focus {
          border-color: var(--accent-gold);
          box-shadow: 0 0 0 2px rgba(215, 134, 0, 0.3);
        }

        .spec-hint {
          font-size: 0.76rem;
          color: var(--text-muted);
          margin-top: 2px;
          line-height: 1.4;
        }

        /* Quantity Box */
        .quantity-section-box {
          border-top: 1px solid var(--border-subtle);
          padding-top: 20px;
        }

        .customizer-qty-stepper {
          display: inline-flex;
          align-items: center;
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          height: 42px;
          padding: 2px;
        }

        .customizer-qty-btn {
          width: 36px;
          height: 100%;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s, color 0.2s;
          user-select: none;
        }

        .customizer-qty-btn:hover {
          background: var(--accent-gold);
          color: #000;
        }

        .customizer-qty-input {
          width: 76px;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--accent-gold-bright);
          text-align: center;
          font-size: 1.05rem;
          font-family: var(--font-mono);
          font-weight: 700;
          padding: 0;
          outline: none;
          -moz-appearance: textfield;
        }

        .customizer-qty-input::-webkit-outer-spin-button,
        .customizer-qty-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .qty-preset-pill {
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .qty-preset-pill:hover {
          border-color: var(--accent-gold);
          color: #fff;
        }

        .qty-preset-pill.active {
          background: var(--accent-gold);
          border-color: var(--accent-gold);
          color: #000;
          font-weight: 700;
        }

        .bulk-tier-banner {
          margin-top: 16px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          color: #34d399;
          flex-wrap: wrap;
          gap: 6px;
        }

        .savings-highlight {
          font-family: var(--font-mono);
          font-weight: 700;
          color: #a7f3d0;
        }

        /* 3. Live Quote Sticky Card */
        .live-quote-card-sticky {
          position: sticky;
          top: 90px;
        }

        .live-quote-card {
          background: linear-gradient(160deg, #2E2F2B 0%, #121310 100%);
          border: 1px solid #454545;
          border-radius: var(--radius-lg);
          padding: 26px;
          box-shadow: var(--shadow-lg), 0 0 25px rgba(215, 134, 0, 0.22);
        }

        .quote-price-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 18px;
          margin-bottom: 18px;
        }

        .quote-unit-price {
          font-family: var(--font-mono);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--accent-gold-bright);
          line-height: 1;
        }

        .quote-total-price {
          font-family: var(--font-mono);
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
        }

        .quote-spec-summary {
          display: flex;
          flex-direction: column;
          gap: 9px;
          font-size: 0.82rem;
          margin-bottom: 22px;
        }

        .quote-spec-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }

        .spec-k {
          color: var(--text-muted);
        }

        .spec-v {
          color: #fff;
          font-weight: 600;
          text-align: right;
        }

        /* Frame Sizes Grid */
        .customizer-sizes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 150px), 1fr));
          gap: 10px;
          margin-top: 6px;
        }

        .customizer-size-btn {
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: all 0.2s ease;
          position: relative;
        }

        .customizer-size-btn:hover {
          border-color: var(--accent-gold);
          background: rgba(215, 134, 0, 0.08);
        }

        .customizer-size-btn.active {
          background: rgba(215, 134, 0, 0.18);
          border: 1.5px solid var(--accent-gold);
          box-shadow: 0 0 16px rgba(215, 134, 0, 0.3);
        }

        .customizer-size-name {
          color: #fff;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .customizer-size-price {
          color: var(--accent-gold-bright);
          font-size: 0.95rem;
          font-family: var(--font-mono);
          font-weight: 800;
        }

        .customizer-size-price .unit {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: normal;
          margin-left: 3px;
        }

        .customizer-size-badge {
          font-size: 0.68rem;
          color: var(--accent-gold-bright);
          font-weight: 700;
          margin-top: 2px;
        }

        @media (max-width: 960px) {
          .customizer-layout-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .live-quote-card-sticky {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .format-cards-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
          .format-card-img-wrap {
            height: 95px !important;
          }
          .format-card-body {
            padding: 10px !important;
          }
          .format-card-title {
            font-size: 0.85rem !important;
          }
          .format-card-size {
            font-size: 0.7rem !important;
            margin-bottom: 6px !important;
          }
          .format-card-price strong {
            font-size: 0.95rem !important;
          }
          .specs-unified-panel {
            padding: 18px 16px !important;
          }
          .active-format-banner {
            padding: 12px 14px !important;
          }
          .live-quote-card {
            padding: 20px 16px !important;
          }
          .quote-unit-price {
            font-size: 1.8rem !important;
          }
          .quote-total-price {
            font-size: 1.15rem !important;
          }
        }
      `}</style>
    </section>
  );
};
