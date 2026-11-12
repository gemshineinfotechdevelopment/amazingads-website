import { useRouter } from '../context/RouterContext';
import { VirtualProofing } from '../components/VirtualProofing';
import { ThreeDViewer } from '../components/ThreeDViewer';

export const ProofingPage = () => {
  const { navigate } = useRouter();

  return (
    <div className="page-view">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <button onClick={() => navigate('home')}>Home</button>
          <span>/</span>
          <span className="current">Virtual Proof Studio</span>
        </div>

        {/* Page Banner */}
        <div className="page-header-banner">
          <span className="foil-badge" style={{ marginBottom: '10px' }}>
            ✦ 3D SIMULATION ENGINE
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: '12px' }}>
            3D Virtual <span className="gold-gradient-text">Proof Studio</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto' }}>
            Experience real 3D tilt physics, 24K gold foil reflection glare, 3D lenticular image morphing, and interactive daily sheet peeling.
          </p>
        </div>

        {/* 3D Motion & Foil Gyroscope Viewer */}
        <div style={{ marginBottom: '60px' }}>
          <ThreeDViewer />
        </div>

        {/* 12-Month Virtual Proofing Studio */}
        <VirtualProofing />
      </div>
    </div>
  );
};

