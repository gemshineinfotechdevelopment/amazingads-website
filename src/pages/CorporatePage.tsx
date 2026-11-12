import { useRouter } from '../context/RouterContext';
import { CorporateInquiry } from '../components/CorporateInquiry';

export const CorporatePage = () => {
  const { navigate } = useRouter();

  return (
    <div className="page-view">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <button onClick={() => navigate('home')}>Home</button>
          <span>/</span>
          <span className="current">Corporate Bulk Procurement</span>
        </div>

        {/* Page Banner */}
        <div className="page-header-banner">
          <span className="foil-badge" style={{ marginBottom: '10px' }}>
            ✦ ENTERPRISE B2B
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: '12px' }}>
            Corporate <span className="gold-gradient-text">Bulk</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            White-glove turnkey management for 500 to 50,000+ units with direct multi-address dispatch.
          </p>
        </div>

        {/* Corporate Inquiry Component */}
        <CorporateInquiry />
      </div>
    </div>
  );
};

