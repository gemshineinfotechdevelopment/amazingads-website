import { useRouter } from '../context/RouterContext';
import { Craftsmanship } from '../components/Craftsmanship';

export const CraftPage = () => {
  const { navigate } = useRouter();

  return (
    <div className="page-view">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <button onClick={() => navigate('home')}>Home</button>
          <span>/</span>
          <span className="current">Paper & Foils Library</span>
        </div>

        {/* Page Banner */}
        <div className="page-header-banner">
          <span className="foil-badge" style={{ marginBottom: '10px' }}>
            ✦ ARCHIVAL MATERIALS
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: '12px' }}>
            Paper & <span className="gold-gradient-text">Foils</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            400–600 GSM Kappa Board, 75 LPI 3D Lenticular PET, and 130°C heated brass foil dies.
          </p>
        </div>

        {/* The Full Craftsmanship Component */}
        <Craftsmanship />
      </div>
    </div>
  );
};

