import { useState, type FormEvent } from 'react';
import { submitCorporateInquiry } from '../services/api';

export const CorporateInquiry = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [quantityNeeded, setQuantityNeeded] = useState('1,000 to 2,500 Units');
  const [targetDate, setTargetDate] = useState('Diwali / New Year Corporate Gifting');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{ inquiryId: string; message: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please provide your name, corporate email, and your project requirements.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitCorporateInquiry({
        name,
        email,
        company,
        quantityNeeded,
        targetDate,
        message
      });
      setConfirmation(res);
      setSubmitting(false);
    } catch {
      alert('Could not send corporate inquiry to press backend.');
      setSubmitting(false);
    }
  };

  return (
    <section id="corporate" style={{ padding: '0 0 50px', position: 'relative' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(145deg, #161b24 0%, #101319 100%)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-gold)',
            padding: '40px',
            boxShadow: 'var(--shadow-lg), 0 0 35px rgba(207, 168, 78, 0.12)',
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '40px',
            alignItems: 'center'
          }}
          className="corporate-grid"
        >
          {/* Left Column: B2B Enterprise Concierge Info */}
          <div>
            <span className="foil-badge" style={{ marginBottom: '14px' }}>
              ✦ PROCUREMENT SERVICES
            </span>

            <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>
              Turnkey <span className="gold-gradient-text">Management</span>
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
              For enterprise brand teams and agencies ordering 500 to 50,000+ units:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Rigid Clamshell Boxes', desc: 'Individually boxed in debossed magnetic gift cases with satin ribbon pulls.' },
                { title: 'VIP Direct Drop-Shipping', desc: 'Upload a CSV of VIP client addresses; we package, seal, and courier direct.' },
                { title: 'Exact Pantone Matching', desc: 'Certified spectro-densitometer calibration for zero brand color deviation.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(207, 168, 78, 0.15)',
                      border: '1px solid var(--border-gold)',
                      color: 'var(--accent-gold-bright)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#fff' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px'
            }}
          >
            {!confirmation ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>
                  Submit Custom Procurement Brief
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-row">
                  <div>
                    <label>Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suresh Narayanan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Company / Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ashok Leyland Ltd."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-row">
                  <div>
                    <label>Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="suresh@ashokleyland.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Estimated Quantity</label>
                    <select
                      value={quantityNeeded}
                      onChange={(e) => setQuantityNeeded(e.target.value)}
                    >
                      <option>250 to 500 Units</option>
                      <option>500 to 1,000 Units</option>
                      <option>1,000 to 2,500 Units</option>
                      <option>2,500 to 5,000 Units</option>
                      <option>5,000 to 10,000+ Units</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label>Target Delivery Milestone</label>
                  <input
                    type="text"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    placeholder="e.g. November 20th for Global Client Gifting"
                  />
                </div>

                <div>
                  <label>Project Scope & Finishing Requirements *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Specify calendar models of interest, custom page counts, packaging requirements, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold"
                  style={{ width: '100%', padding: '14px', marginTop: '6px' }}
                >
                  {submitting ? 'Connecting to Press Scheduler...' : 'Submit Bespoke Brief to Lead Press Master →'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10b981',
                    color: '#10b981',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px'
                  }}
                >
                  ✓
                </div>

                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
                  Procurement Brief Received!
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {confirmation.message}
                </p>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-gold-bright)', marginBottom: '20px' }}>
                  CASE REF: {confirmation.inquiryId}
                </div>

                <button
                  onClick={() => setConfirmation(null)}
                  className="btn-gold"
                  style={{ padding: '10px 24px', fontSize: '0.85rem' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .corporate-grid {
            grid-template-columns: 1fr !important;
            padding: 30px !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
