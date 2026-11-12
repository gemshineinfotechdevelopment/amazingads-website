import { useRouter } from '../context/RouterContext';
import { CalendarCustomizer } from '../components/CalendarCustomizer';

export const CalculatorPage = () => {
  const { navigate } = useRouter();

  return (
    <div className="page-view">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <button onClick={() => navigate('home')}>Home</button>
          <span>/</span>
          <span className="current">Quote Configurator</span>
        </div>

        {/* Page Banner */}
        <div className="page-header-banner">
          <span className="foil-badge" style={{ marginBottom: '10px' }}>
            ✦ REAL-TIME PRICING
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: '12px' }}>
            Instant <span className="gold-gradient-text">Pricing</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            Choose your format, paper stock, foil finish, and volume for tiered pricing.
          </p>
        </div>

        {/* The Full Customizer Component */}
        <CalendarCustomizer />
      </div>
    </div>
  );
};

