import { useRouter } from '../context/RouterContext';
import { ProductCatalog } from '../components/ProductCatalog';

export const CollectionsPage = () => {
  const { navigate } = useRouter();

  const handleSelectProduct = (productName: string) => {
    navigate('calculator', { product: productName });
  };

  return (
    <div className="page-view">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <button onClick={() => navigate('home')}>Home</button>
          <span>/</span>
          <span className="current">Master Collections</span>
        </div>

        {/* Page Banner */}
        <div className="page-header-banner">
          <span className="foil-badge" style={{ marginBottom: '10px' }}>
            ✦ 2026 / 2027 EDITIONS
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: '12px' }}>
            The <span className="gold-gradient-text">Collection</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto' }}>
            Five signature editions: Gold/Silver PET Foil Calendar, Special Products, Custom 5D Calendars, Stone Art Calendars, and Hand Fan.
          </p>
        </div>

        {/* The Full Product Catalog Component */}
        <ProductCatalog onSelectProduct={handleSelectProduct} />
      </div>
    </div>
  );
};

