import { useState, type FormEvent } from 'react';
import { requestSampleKit, type SampleKitResult } from '../services/api';

interface SampleKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleKitModal = ({ isOpen, onClose }: SampleKitModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([
    'Gold/Silver PET Foil Calendar',
    'Custom 5D Calendars'
  ]);
  
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SampleKitResult | null>(null);

  if (!isOpen) return null;

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !shippingAddress) {
      alert('Please fill in your name, email, and shipping address.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await requestSampleKit({
        name,
        email,
        company,
        phone,
        shippingAddress,
        preferredStyles: selectedStyles
      });
      setResult(res);
      setSubmitting(false);
    } catch {
      alert('Could not dispatch sample kit request to press backend.');
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => !submitting && onClose()}
    >
      <div
        className="sample-kit-box"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '560px',
          width: '100%',
          padding: '36px',
          boxShadow: 'var(--shadow-lg), 0 0 45px rgba(207, 168, 78, 0.25)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.4rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {!result ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span className="foil-badge">COMPLIMENTARY CONCIERGE</span>
            </div>

            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '6px' }}>
              Request Master Swatch Box
            </h3>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
              We dispatch our tactile physical sample box to corporate brand leaders, procurement heads, and agencies across India. Free of charge.
            </p>

            {/* Box Contents Callout */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginBottom: '20px'
              }}
            >
              <strong style={{ color: 'var(--accent-gold-bright)', display: 'block', marginBottom: '6px' }}>
                📦 Sivakasi Works Sample Box Contents:
              </strong>
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Gold / Silver PET Foil Calendar Specimen (15 × 20 in)</li>
                <li>Custom 5D Holographic Lenticular Motion Swatch</li>
                <li>Stone Art Sculptural Relief Texture Sample</li>
                <li>Promotional Advertising Hand Fan Specimen with Handle</li>
                <li>Special Products & Bespoke Executive Gift Swatch Book</li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="modal-input-grid">
                <div>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyadharshini"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Company / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Titan Brands Ltd."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="modal-input-grid">
                <div>
                  <label>Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="priya@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label>Courier Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98400 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label>Physical Shipping / Courier Address *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Street Address, Corporate Park / Suite, City, State, PIN Code"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>

              <div>
                <label>Products of Interest</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                  {[
                    'Gold/Silver PET Foil Calendar',
                    'Special Products',
                    'Custom 5D Calendars',
                    'Stone Art Calendars',
                    'Hand Fan'
                  ].map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => toggleStyle(style)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        background: selectedStyles.includes(style) ? 'var(--accent-gold)' : 'var(--bg-input)',
                        color: selectedStyles.includes(style) ? '#0b0c0e' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold"
                style={{ width: '100%', padding: '14px', marginTop: '8px' }}
              >
                {submitting ? 'Dispatching Request to Press...' : 'Ship My Free Master Swatch Box →'}
              </button>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                color: '#10b981',
                fontSize: '2.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              ✓
            </div>

            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
              Master Swatch Box Dispatched!
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
              Thank you, <strong style={{ color: '#fff' }}>{result.name}</strong>. Your sample request is registered under Tracking ID <strong style={{ color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)' }}>{result.sampleId}</strong>.
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
              <p><strong>Shipping To:</strong> {result.shippingAddress}</p>
              <p><strong>Courier Service:</strong> BlueDart Priority Air Courier</p>
              <p><strong>Estimated Arrival:</strong> {result.estimatedDeliveryDays}</p>
              <p><strong>Status:</strong> <span style={{ color: '#34d399' }}>{result.status}</span></p>
            </div>

            <button
              onClick={() => {
                setResult(null);
                onClose();
              }}
              className="btn-gold"
              style={{ width: '100%' }}
            >
              Close Window
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .sample-kit-box {
            padding: 24px 18px !important;
          }
          .modal-input-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
