import { useState } from 'react';
import { useRouter } from '../context/RouterContext';

interface FloatingConciergeProps {
  onOpenSampleKit: () => void;
}

export const FloatingConcierge = ({ onOpenSampleKit }: FloatingConciergeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate } = useRouter();

  return (
    <div
      className="floating-concierge-root floating-concierge-wrap"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1500
      }}
    >
      {/* Expanded Quick Action Popover */}
      {isOpen && (
        <div
          className="floating-concierge-popover"
          style={{
            position: 'absolute',
            bottom: '64px',
            right: '0',
            width: 'min(320px, calc(100vw - 32px))',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            boxShadow: 'var(--shadow-lg), 0 0 35px rgba(207, 168, 78, 0.25)',
            animation: 'pageFadeIn 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span className="foil-badge">PRESS CONCIERGE</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '6px' }}>
            Amazing Ads Sivakasi Direct
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '18px' }}>
            Direct factory wholesale pricing, custom proofing, and pan-India dispatch.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/919790472767?text=Hello%20Amazing%20Ads%20Sivakasi,%20I%20would%20like%20to%20get%20a%20calendar%20quote"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                color: '#34d399',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              <span>💬</span>
              <span>WhatsApp: +91 97904 72767</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href="tel:+919790472767"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(207, 168, 78, 0.12)',
                border: '1px solid rgba(207, 168, 78, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                color: 'var(--accent-gold-bright)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <span>📞</span>
              <span>Call Factory: +91 97904 72767</span>
            </a>

            {/* Quick Quote */}
            <button
              onClick={() => {
                navigate('calculator');
                setIsOpen(false);
              }}
              className="btn-outline-gold"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '0.85rem',
                justifyContent: 'flex-start'
              }}
            >
              <span>🎛️</span>
              <span>Open Quote Configurator</span>
            </button>

            {/* Sample Box */}
            <button
              onClick={() => {
                onOpenSampleKit();
                setIsOpen(false);
              }}
              className="btn-gold"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '0.85rem',
                justifyContent: 'flex-start'
              }}
            >
              <span>📦</span>
              <span>Request Free Swatch Box</span>
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '16px', paddingTop: '12px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            🟢 Press Works Active • Mon–Sat 9AM–8PM IST
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'linear-gradient(135deg, #2b2210 0%, #151821 100%)',
          border: '1.5px solid var(--accent-gold)',
          borderRadius: '30px',
          padding: '12px 20px',
          color: 'var(--accent-gold-bright)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.7), 0 0 20px rgba(207, 168, 78, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.04em'
        }}
        className="floating-btn"
      >
        <span style={{ fontSize: '1.1rem' }}>✦</span>
        <span>Press Concierge</span>
      </button>

      <style>{`
        .floating-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8), 0 0 30px rgba(207, 168, 78, 0.45) !important;
        }
        @media (max-width: 640px) {
          .floating-concierge-root, .floating-concierge-wrap {
            bottom: 16px !important;
            right: 16px !important;
          }
          .floating-concierge-popover {
            width: calc(100vw - 32px) !important;
            right: 0 !important;
            padding: 20px 16px !important;
          }
          .floating-btn {
            padding: 10px 16px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </div>
  );
};

