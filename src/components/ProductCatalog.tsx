import { useState, useEffect } from 'react';
import { getCalendarProducts, type CalendarProduct } from '../services/api';

interface ProductCatalogProps {
  onSelectProduct: (productName: string) => void;
}

const CATEGORIES = [
  'All',
  'Gold/Silver PET Foil Calendar',
  'Special Products',
  'Custom 5D Calendars',
  'Stone Art Calendars',
  'Hand Fan'
];

export const ProductCatalog = ({ onSelectProduct }: ProductCatalogProps) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<CalendarProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCalendarProducts(activeCategory)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <section id="catalog" style={{ padding: '0 0 40px', position: 'relative' }}>
      <div className="container">
        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '36px'
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                background: activeCategory === cat ? 'var(--accent-gold)' : 'var(--bg-card)',
                color: activeCategory === cat ? '#0b0c0e' : 'var(--text-secondary)',
                border: `1px solid ${activeCategory === cat ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                fontSize: '0.85rem',
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

        {/* Product Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <p>Accessing Press Archive...</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '32px'
            }}
          >
            {products.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-card)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: 'var(--shadow-md)'
                }}
                className="catalog-card"
              >
                {/* Visual Image Header */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={item.mockupImg}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    className="card-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(22, 27, 36, 1) 0%, transparent 60%)'
                    }}
                  />
                  {/* Floating Tag */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'rgba(10, 12, 16, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--accent-gold-bright)',
                      border: '1px solid var(--border-gold)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '4px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 600 }}>{item.name}</h3>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>From</span>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--accent-gold-bright)', fontWeight: 700 }}>
                        {item.currency}{item.startingPrice}
                      </p>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--accent-gold-bright)', marginBottom: '14px', fontWeight: 500 }}>
                    {item.subtitle}
                  </p>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                    {item.description}
                  </p>

                  {/* Specifications Snapshot */}
                  <div
                    style={{
                      background: 'var(--bg-input)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '20px',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Dimensions:</span>
                      <strong style={{ color: '#fff' }}>{item.dimensions}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Paper Grammage:</span>
                      <strong style={{ color: '#fff' }}>{item.standardGsm}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Binding Type:</span>
                      <strong style={{ color: '#fff' }}>{item.binding}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Minimum Run:</span>
                      <strong style={{ color: 'var(--accent-gold-bright)' }}>{item.minOrder} units</strong>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => onSelectProduct(item.name)}
                    className="btn-outline-gold"
                    style={{ width: '100%', padding: '12px' }}
                  >
                    Configure In Calculator →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .catalog-card:hover {
          border-color: var(--border-gold-hover);
          transform: translateY(-4px);
        }
        .catalog-card:hover .card-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};
