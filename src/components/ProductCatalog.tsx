import { useState, useEffect } from 'react';
import { getCalendarProducts, SIVAKASI_CATALOG, type CalendarProduct } from '../services/api';

interface ProductCatalogProps {
  onSelectProduct?: (productName: string) => void;
}

const CATEGORIES = [
  'All',
  'Gold/Silver PET Foil',
  'Custom 5D Calendars',
  'Stone Art Calendars',
  'Hand Fan',
  'Special Products'
];

// Product size mappings
const PRODUCT_SIZES: Record<string, string[]> = {
  'pet-foil-calendar': [
    '15 × 20 inches (Standard Wall)',
    '17 × 27 inches (Jumbo Royal Wall)',
    '12 × 18 inches (Compact Office)'
  ],
  'custom-5d-calendar': [
    '12 × 18 inches (Standard 5D Frame)',
    '16 × 24 inches (Executive Deluxe)',
    '18 × 28 inches (Grand Temple)'
  ],
  'stone-art-calendar': [
    '14 × 20 inches (Sculpted Relief)',
    '18 × 24 inches (Royal Teak Frame)',
    '20 × 30 inches (Collector Frame)'
  ],
  'hand-fan': [
    '8 × 8 inches (Standard Circle)',
    '9 × 9 inches (Large Leaf Cut)',
    'Custom Contour Die-Cut'
  ],
  'special-products': [
    'A4 Executive Desk (8.5 × 11 in)',
    'A5 Compact Desk (6 × 8.5 in)',
    'VIP Gift Box Set (12 × 15 in)'
  ]
};

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export const ProductCatalog = ({ onSelectProduct }: ProductCatalogProps) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<CalendarProduct[]>(SIVAKASI_CATALOG);
  
  // Selected size per product
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'pet-foil-calendar': '15 × 20 inches (Standard Wall)',
    'custom-5d-calendar': '12 × 18 inches (Standard 5D Frame)',
    'stone-art-calendar': '14 × 20 inches (Sculpted Relief)',
    'hand-fan': '8 × 8 inches (Standard Circle)',
    'special-products': 'A4 Executive Desk (8.5 × 11 in)'
  });

  // Item quantities per product
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    getCalendarProducts(activeCategory)
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        if (activeCategory === 'All') {
          setProducts(SIVAKASI_CATALOG);
        } else {
          setProducts(SIVAKASI_CATALOG.filter(p => p.category === activeCategory));
        }
      });
  }, [activeCategory]);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleQtyChange = (productId: string, delta: number) => {
    setItemQuantities(prev => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleQtyInput = (productId: string, valStr: string) => {
    const val = parseInt(valStr, 10);
    if (isNaN(val) || val < 1) {
      setItemQuantities(prev => ({ ...prev, [productId]: 1 }));
    } else {
      setItemQuantities(prev => ({ ...prev, [productId]: val }));
    }
  };

  const handleAddToCart = (item: CalendarProduct) => {
    const size = selectedSizes[item.id] || (PRODUCT_SIZES[item.id] ? PRODUCT_SIZES[item.id][0] : item.dimensions);
    const qty = Math.max(1, itemQuantities[item.id] || 1);
    const cartItemId = `${item.id}-${size}`;

    setCart(prevCart => {
      const existing = prevCart.find(ci => ci.id === cartItemId);
      if (existing) {
        return prevCart.map(ci => ci.id === cartItemId ? { ...ci, quantity: ci.quantity + qty } : ci);
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            productId: item.id,
            name: item.name,
            size: size,
            price: item.startingPrice,
            quantity: qty,
            image: item.mockupImg
          }
        ];
      }
    });

    // Provide visual feedback
    setRecentlyAddedId(item.id);
    setToastMessage(`Added ${qty} × "${item.name}" (${size}) to Cart!`);

    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1800);

    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => 
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Generate WhatsApp order message
  const generateWhatsAppLink = () => {
    if (cart.length === 0) return '#';
    let text = `Hello Amazing Ads Sivakasi, I would like to order the following items from the catalog:\n\n`;
    cart.forEach((ci, idx) => {
      text += `${idx + 1}. *${ci.name}*\n   • Size: ${ci.size}\n   • Qty: ${ci.quantity}\n   • Est. Rate: ₹${ci.price}/unit (₹${ci.price * ci.quantity})\n\n`;
    });
    text += `*Total Order Items:* ${totalCartCount}\n*Estimated Base Total:* ₹${totalCartAmount}\n\nPlease share the final factory wholesale quotation and delivery timeline.`;
    return `https://wa.me/919790472767?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="catalog" style={{ padding: '0 0 60px', position: 'relative' }}>
      <div className="container">

        {/* Top Controls Bar: Categories & Floating Cart Button */}
        <div className="catalog-controls-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          
          {/* Category Filter Tabs */}
          <div className="catalog-tabs-wrap" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '30px',
                  background: activeCategory === cat ? 'var(--accent-gold)' : 'var(--bg-card)',
                  color: activeCategory === cat ? '#0b0c0e' : 'var(--text-secondary)',
                  border: `1px solid ${activeCategory === cat ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cart Status Pill Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="cart-trigger-pill"
            style={{
              background: totalCartCount > 0 ? 'rgba(207, 168, 78, 0.18)' : 'var(--bg-card)',
              border: `1px solid ${totalCartCount > 0 ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
              color: totalCartCount > 0 ? 'var(--accent-gold-bright)' : 'var(--text-secondary)',
              padding: '10px 20px',
              borderRadius: '30px',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: totalCartCount > 0 ? '0 0 16px rgba(207, 168, 78, 0.25)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>🛒</span>
            <span>Cart</span>
            <span
              style={{
                background: totalCartCount > 0 ? 'var(--accent-gold)' : 'var(--border-subtle)',
                color: totalCartCount > 0 ? '#000' : 'var(--text-muted)',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 800
              }}
            >
              {totalCartCount}
            </span>
            {totalCartCount > 0 && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginLeft: '4px' }}>
                ₹{totalCartAmount.toLocaleString()}
              </span>
            )}
          </button>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="cart-toast-banner">
            <span>✓</span> {toastMessage}
          </div>
        )}

        {/* Clean E-Commerce Product Grid */}
        <div
          className="catalog-product-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '24px'
          }}
        >
          {products.map((item) => {
            const sizes = PRODUCT_SIZES[item.id] || [item.dimensions || 'Standard Size'];
            const currentSize = selectedSizes[item.id] || sizes[0];
            const isAdded = recentlyAddedId === item.id;

            return (
              <div key={item.id} className="clean-product-card">
                
                {/* 1. Large Crisp Product Image */}
                <div className="product-image-container">
                  <img
                    src={item.mockupImg}
                    alt={item.name}
                    className="product-display-img"
                    onError={(e) => {
                      e.currentTarget.src = '/images/gods/mahalakshmi.jpg';
                    }}
                  />
                  {/* Category Pill Tag */}
                  <span className="product-tag-badge">
                    {item.tag || item.category}
                  </span>
                </div>

                {/* 2. Below Image: Name, Size Select, Add to Cart */}
                <div className="product-details-container">
                  
                  {/* Product Name & Starting Price */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, lineHeight: 1.25 }}>
                      {item.name}
                    </h3>
                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '1.15rem', color: 'var(--accent-gold-bright)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                        ₹{item.startingPrice}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>
                        per unit
                      </span>
                    </div>
                  </div>

                  {/* Size Select Dropdown */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
                      Select Size:
                    </label>
                    <select
                      value={currentSize}
                      onChange={(e) => handleSizeChange(item.id, e.target.value)}
                      className="product-size-select"
                    >
                      {sizes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity & Add To Cart Row */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {/* Quantity Stepper */}
                    <div className="card-qty-stepper">
                      <button
                        onClick={() => handleQtyChange(item.id, -1)}
                        className="card-qty-btn"
                        aria-label="Decrease quantity"
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={itemQuantities[item.id] || 1}
                        onChange={(e) => handleQtyInput(item.id, e.target.value)}
                        className="card-qty-input"
                        aria-label="Quantity"
                      />
                      <button
                        onClick={() => handleQtyChange(item.id, 1)}
                        className="card-qty-btn"
                        aria-label="Increase quantity"
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add To Cart Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={isAdded ? 'btn-cart-success' : 'btn-gold'}
                      style={{
                        flex: 1,
                        height: '44px',
                        padding: '0 14px',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 700,
                        transition: 'all 0.25s ease',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span>{isAdded ? '✓' : '🛒'}</span>
                      <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                    </button>
                  </div>

                  {/* Optional Quote Link */}
                  {onSelectProduct && (
                    <button
                      onClick={() => onSelectProduct(item.name)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.76rem',
                        marginTop: '10px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold-bright)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      Or customize specs in quote calculator →
                    </button>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Cart Slide-Over Modal Drawer */}
      {isCartOpen && (
        <div className="cart-modal-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
            
            {/* Drawer Header */}
            <div className="cart-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.4rem' }}>🛒</span>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>Your Order Cart</h3>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {totalCartCount} item(s) selected
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="cart-close-btn"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Drawer Content */}
            <div className="cart-drawer-body">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '14px', opacity: 0.6 }}>🛒</span>
                  <p style={{ fontSize: '1rem', color: '#fff', marginBottom: '6px' }}>Your cart is empty</p>
                  <p style={{ fontSize: '0.82rem' }}>Select a size and click "Add to Cart" on any product.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-subtle)' }} 
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.92rem', color: '#fff', marginBottom: '2px' }}>{item.name}</h4>
                        <p style={{ fontSize: '0.76rem', color: 'var(--accent-gold-bright)', marginBottom: '6px' }}>
                          Size: {item.size}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: '#fff', fontWeight: 700 }}>
                            ₹{item.price} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>× {item.quantity}</span>
                          </span>

                          {/* Quantity Controls */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="qty-btn"
                              title="Decrease quantity"
                            >
                              -
                            </button>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="qty-btn"
                              title="Increase quantity"
                            >
                              +
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="qty-del-btn"
                              title="Remove item"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer with Actions */}
            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Subtotal (Excl. GST & Cargo):</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)' }}>
                      ₹{totalCartAmount.toLocaleString()}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: '20px' }}>
                    Direct Factory Pricing
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold"
                    style={{
                      width: '100%',
                      padding: '13px',
                      fontSize: '0.92rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      textDecoration: 'none'
                    }}
                  >
                    <span>💬</span>
                    <span>Order Cart via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      if (onSelectProduct) onSelectProduct(cart[0].name);
                    }}
                    className="btn-outline-gold"
                    style={{ width: '100%', padding: '11px', fontSize: '0.85rem' }}
                  >
                    Open Bulk Customizer Calculator →
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Scoped Styles for Clean E-Commerce Display */}
      <style>{`
        /* Clean Product Card */
        .clean-product-card {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-md);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .clean-product-card:hover {
          border-color: var(--border-gold-hover);
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.7), 0 0 25px rgba(207, 168, 78, 0.15);
        }

        .product-image-container {
          position: relative;
          width: 100%;
          height: 270px;
          overflow: hidden;
          background: #0f1218;
        }

        .product-display-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .clean-product-card:hover .product-display-img {
          transform: scale(1.04);
        }

        .product-tag-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(10, 12, 16, 0.88);
          border: 1px solid var(--border-gold);
          color: var(--accent-gold-bright);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 4px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .product-details-container {
          padding: 22px 20px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-size-select {
          width: 100%;
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          padding: 11px 14px;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        .product-size-select:focus {
          border-color: var(--accent-gold);
          box-shadow: 0 0 0 2px rgba(207, 168, 78, 0.2);
        }

        .btn-cart-success {
          background: #10b981 !important;
          color: #fff !important;
          border: 1px solid #34d399 !important;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.4) !important;
        }

        /* Quantity Stepper near Add to Cart */
        .card-qty-stepper {
          display: inline-flex;
          align-items: center;
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          height: 44px;
          padding: 2px;
          flex-shrink: 0;
        }

        .card-qty-btn {
          width: 32px;
          height: 100%;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1.15rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s, color 0.2s;
          user-select: none;
        }

        .card-qty-btn:hover {
          background: var(--accent-gold);
          color: #000;
        }

        .card-qty-input {
          width: 44px;
          height: 100%;
          background: transparent;
          border: none;
          color: #fff;
          text-align: center;
          font-size: 0.95rem;
          font-family: var(--font-mono);
          font-weight: 700;
          padding: 0;
          outline: none;
          -moz-appearance: textfield;
        }

        .card-qty-input::-webkit-outer-spin-button,
        .card-qty-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Cart Toast */
        .cart-toast-banner {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(16, 185, 129, 0.95);
          color: #fff;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 0.88rem;
          box-shadow: 0 8px 30px rgba(0,0,0,0.6);
          z-index: 2000;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: slideUpToast 0.3s ease;
        }

        @keyframes slideUpToast {
          from { opacity: 0; transform: translate(-50%, 15px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        /* Cart Modal Drawer */
        .cart-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 2500;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease;
        }

        .cart-drawer-panel {
          width: 100%;
          max-width: 440px;
          height: 100%;
          background: var(--bg-secondary);
          border-left: 1px solid var(--border-gold);
          display: flex;
          flex-direction: column;
          box-shadow: -15px 0 50px rgba(0,0,0,0.8);
          animation: slideLeft 0.25s ease;
        }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .cart-drawer-header {
          padding: 22px 24px;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1.3rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .cart-close-btn:hover {
          color: #fff;
        }

        .cart-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .cart-item-row {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 12px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .qty-btn {
          width: 26px;
          height: 26px;
          border-radius: 4px;
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          color: #fff;
          cursor: pointer;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .qty-btn:hover {
          background: var(--accent-gold);
          color: #000;
        }

        .qty-del-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          margin-left: 4px;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .qty-del-btn:hover {
          opacity: 1;
        }

        .cart-drawer-footer {
          padding: 24px;
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-primary);
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 768px) {
          .catalog-controls-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
            margin-bottom: 24px !important;
          }
          .catalog-tabs-wrap {
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            padding-bottom: 8px !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }
          .catalog-tabs-wrap::-webkit-scrollbar {
            display: none !important;
          }
          .catalog-tabs-wrap button {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            padding: 7px 15px !important;
            font-size: 0.8rem !important;
          }
          .cart-trigger-pill {
            width: 100% !important;
            justify-content: center !important;
          }
          .catalog-product-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .cart-drawer-panel {
            max-width: 100% !important;
          }
          .cart-drawer-body {
            padding: 16px !important;
          }
          .cart-drawer-header, .cart-drawer-footer {
            padding: 16px !important;
          }
          .product-image-container {
            height: 240px !important;
          }
        }
      `}</style>
    </section>
  );
};
