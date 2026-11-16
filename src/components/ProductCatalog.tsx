import { useState, useEffect, useRef } from 'react';
import { getCalendarProducts, SIVAKASI_CATALOG, deduplicateProducts, type CalendarProduct } from '../services/api';
import { useCart } from '../context/CartContext';

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

export const getProductSizePrice = (item: CalendarProduct, sizeString: string): number => {
  if (item.sizePrices && item.sizePrices[sizeString] !== undefined) {
    return Number(item.sizePrices[sizeString]);
  }
  // Try matching prefix before parenthesis e.g. "12 × 18 inches" matching "12 × 18"
  if (item.sizePrices && typeof item.sizePrices === 'object') {
    const cleanSize = sizeString.split('(')[0].replace(/inches|in/gi, '').trim().toLowerCase();
    for (const [key, price] of Object.entries(item.sizePrices)) {
      const cleanKey = key.split('(')[0].replace(/inches|in/gi, '').trim().toLowerCase();
      if (cleanKey && cleanSize && (cleanKey === cleanSize || cleanSize.includes(cleanKey) || cleanKey.includes(cleanSize))) {
        return Number(price);
      }
    }
  }
  // Fallback to distinct progressive tiers per size if item has startingPrice
  const allSizes = (item.sizes && item.sizes.length > 0) ? item.sizes : (PRODUCT_SIZES[item.id] || []);
  const idx = allSizes.indexOf(sizeString);
  if (idx > 0 && item.startingPrice) {
    const tierMultipliers = [1, 1.34, 1.72, 2.15];
    return Math.round(item.startingPrice * (tierMultipliers[idx] || (1 + idx * 0.35)));
  }
  return Number(item.startingPrice) || 125;
};

// Custom Dropdown bounded strictly to parent box width (never extends outside card)
const SizeSelectDropdown = ({
  productId,
  sizes,
  currentSize,
  item,
  onSelectSize
}: {
  productId: string;
  sizes: string[];
  currentSize: string;
  item: CalendarProduct;
  onSelectSize: (productId: string, size: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentPrice = getProductSizePrice(item, currentSize);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: '#161714',
          border: `1px solid ${isOpen ? '#FFD700' : 'rgba(255, 255, 255, 0.18)'}`,
          borderRadius: '8px',
          padding: '10px 12px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 12px rgba(255, 215, 0, 0.35)' : 'none',
          transition: 'all 0.2s ease'
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          style={{
            fontSize: '0.84rem',
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'left',
            flex: 1
          }}
        >
          {currentSize}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              fontWeight: 800,
              color: '#FFD700'
            }}
          >
            ₹{currentPrice}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>

      {/* Strictly Bounded Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            background: '#161714',
            border: '1px solid #FFD700',
            borderRadius: '8px',
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.95), 0 0 20px rgba(255, 215, 0, 0.25)',
            zIndex: 150,
            maxHeight: '220px',
            overflowY: 'auto',
            padding: '4px'
          }}
        >
          {sizes.map((s) => {
            const isSelected = s === currentSize;
            const price = getProductSizePrice(item, s);
            return (
              <div
                key={s}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onSelectSize(productId, s);
                  setIsOpen(false);
                }}
                style={{
                  padding: '9px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
                  color: isSelected ? '#FFD700' : '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flex: 1 }}>
                  {isSelected && <span style={{ color: '#FFD700', fontSize: '0.85rem' }}>✓</span>}
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {s}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    color: isSelected ? '#FFD700' : '#d1d5db',
                    flexShrink: 0
                  }}
                >
                  ₹{price}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ProductCatalog = ({ onSelectProduct }: ProductCatalogProps) => {
  const { addToCart, openCart, totalCount: totalCartCount, totalPrice: totalCartAmount } = useCart();
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
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = () => {
      getCalendarProducts(activeCategory)
        .then((data) => {
          setProducts(deduplicateProducts(data));
        })
        .catch(() => {
          if (activeCategory === 'All') {
            setProducts(deduplicateProducts(SIVAKASI_CATALOG));
          } else {
            setProducts(deduplicateProducts(SIVAKASI_CATALOG.filter(p => p.category === activeCategory)));
          }
        });
    };

    loadProducts();

    const handleCatalogUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<CalendarProduct[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        if (activeCategory === 'All') {
          setProducts(deduplicateProducts(customEvent.detail));
        } else {
          setProducts(deduplicateProducts(customEvent.detail.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase())));
        }
      } else {
        loadProducts();
      }
    };

    window.addEventListener('catalog-updated', handleCatalogUpdated);
    return () => {
      window.removeEventListener('catalog-updated', handleCatalogUpdated);
    };
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
    const itemSizes = (item.sizes && item.sizes.length > 0) ? item.sizes : (PRODUCT_SIZES[item.id] || [item.dimensions || 'Standard Size']);
    const size = selectedSizes[item.id] || itemSizes[0];
    const sizeUnitPrice = getProductSizePrice(item, size);
    const qty = Math.max(1, itemQuantities[item.id] || 1);

    addToCart({
      productId: item.id,
      name: item.name,
      size: size,
      price: sizeUnitPrice,
      quantity: qty,
      image: item.mockupImg
    });

    // Provide visual feedback
    setRecentlyAddedId(item.id);
    setToastMessage(`Added ${qty} × "${item.name}" (${size}) to Cart at ₹${sizeUnitPrice}/unit!`);

    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1800);

    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const categoryList = Array.from(new Set(['All', ...CATEGORIES.filter(c => c !== 'All'), ...products.map(p => p.category).filter(Boolean)]));

  return (
    <section id="catalog" style={{ padding: '0 0 60px', position: 'relative' }}>
      <div className="container">

        {/* Top Controls Bar: Categories & Floating Cart Button */}
        <div className="catalog-top-bar catalog-controls-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          
          {/* Category Filter Tabs */}
          <div className="scroll-pills-row catalog-category-pills catalog-tabs-wrap" style={{ display: 'flex', gap: '8px' }}>
            {categoryList.map((cat) => (
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
                  letterSpacing: '0.02em',
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cart Status Pill Button */}
          <button
            onClick={openCart}
            className="cart-trigger-pill"
            style={{
              background: totalCartCount > 0 ? 'rgba(255, 215, 0, 0.14)' : 'var(--bg-card)',
              border: `1px solid ${totalCartCount > 0 ? '#FFD700' : 'var(--border-subtle)'}`,
              color: totalCartCount > 0 ? '#FFD700' : 'var(--text-secondary)',
              padding: '10px 20px',
              borderRadius: '30px',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: totalCartCount > 0 ? '0 0 16px rgba(255, 215, 0, 0.35)' : 'none',
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
          className="catalog-products-grid catalog-product-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '24px'
          }}
        >
          {products.map((item) => {
            const sizes = (item.sizes && item.sizes.length > 0) ? item.sizes : (PRODUCT_SIZES[item.id] || [item.dimensions || 'Standard Size']);
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
                  
                  {/* Product Name */}
                  <div style={{ marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, lineHeight: 1.25 }}>
                      {item.name}
                    </h3>
                  </div>

                  {/* Size Select Dropdown with Frame Price (Strictly bounded to box) */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
                      Select Frame Size & Rate:
                    </label>
                    <SizeSelectDropdown
                      productId={item.id}
                      sizes={sizes}
                      currentSize={currentSize}
                      item={item}
                      onSelectSize={handleSizeChange}
                    />
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
          box-shadow: 0 16px 36px rgba(3, 3, 3, 0.7), 0 0 25px rgba(215, 134, 0, 0.25);
        }

        .product-image-container {
          position: relative;
          width: 100%;
          height: 270px;
          overflow: hidden;
          background: #030303;
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
          background: rgba(3, 3, 3, 0.88);
          border: 1px solid #FFD700;
          color: #FFD700;
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
          border-color: #FFD700;
          box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.35);
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

        @media (max-width: 768px) {
          .catalog-top-bar, .catalog-controls-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
            margin-bottom: 24px !important;
          }
          .cart-trigger-pill {
            width: 100% !important;
            justify-content: center !important;
          }
          .catalog-products-grid, .catalog-product-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
          .cart-drawer-panel {
            max-width: 100% !important;
            width: 100% !important;
            border-left: none !important;
          }
          .catalog-category-pills, .catalog-tabs-wrap {
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            padding-bottom: 8px !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }
          .catalog-category-pills::-webkit-scrollbar, .catalog-tabs-wrap::-webkit-scrollbar {
            display: none !important;
          }
          .catalog-category-pills button, .catalog-tabs-wrap button {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            padding: 7px 15px !important;
            font-size: 0.8rem !important;
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
        }
      `}</style>
    </section>
  );
};
