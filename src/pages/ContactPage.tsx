import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from '../context/RouterContext';
import { submitCorporateInquiry, getStoredFactorySettings, type FactorySettings } from '../services/api';

interface ContactPageProps {
  onOpenSampleKit?: () => void;
}

export const ContactPage = ({ onOpenSampleKit }: ContactPageProps) => {
  const { navigate } = useRouter();
  const [settings, setSettings] = useState<FactorySettings>(getStoredFactorySettings());

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<FactorySettings>;
      if (custom.detail) {
        setSettings(custom.detail);
      } else {
        setSettings(getStoredFactorySettings());
      }
    };
    window.addEventListener('factory-settings-updated', handleUpdate);
    return () => window.removeEventListener('factory-settings-updated', handleUpdate);
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('Bulk Order Inquiry');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || (!email && !phone)) {
      alert('Please provide your name and phone number or email.');
      return;
    }

    try {
      setSubmitting(true);
      await submitCorporateInquiry({
        name,
        email: email || `${phone}@amazingads.contact`,
        company: company || 'Trade Customer',
        quantityNeeded: 'Bulk',
        targetDate: 'Immediate',
        message: `Subject: ${subject}\nPhone: ${phone}\nMessage: ${message}`
      });
      setSubmitted(true);
      setSubmitting(false);
    } catch {
      alert('Unable to send inquiry. Please call our direct helpline.');
      setSubmitting(false);
    }
  };

  return (
    <div className="page-view">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <button onClick={() => navigate('home')}>Home</button>
          <span>/</span>
          <span className="current">Contact Us</span>
        </div>

        {/* Page Banner */}
        <div className="page-header-banner">
          <span className="foil-badge" style={{ marginBottom: '10px' }}>
            ✦ SIVAKASI DIRECT HELPLINE
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: '12px' }}>
            Get in <span className="gold-gradient-text">Touch</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto', lineHeight: '1.7' }}>
            Direct factory wholesale pricing, custom sampling, and dedicated corporate trade assistance.
          </p>
        </div>

        {/* Contact Grid */}
        <div
className="contact-main-grid contact-layout-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}
        >
          {/* Left Column: Direct Factory & Hub Info */}
          <div
className="contact-card contact-box"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <span className="foil-badge" style={{ marginBottom: '14px' }}>
                ✦ HEADQUARTERS & PRESS WORKS
              </span>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '20px' }}>
                {settings.factoryName || 'Amazing Ads Sivakasi Works'}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.4rem' }}>📍</span>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>Factory Address:</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {settings.address || '3/1, Vannakara Street, Chairman P.K.S.A. Arumugam Road, Sivakasi 626189, Tamil Nadu, India.'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.4rem' }}>🏢</span>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>Branch & Distribution Hubs:</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Chennai Corporate Office & Madurai Logistics Depot
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.4rem' }}>📞</span>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>Direct Factory Hotline & WhatsApp:</strong>
                    <span style={{ color: 'var(--accent-gold-bright)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {settings.phone} {settings.secondaryPhone ? `/ ${settings.secondaryPhone}` : ''}
                    </span>
                    {settings.whatsapp && (
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        WhatsApp Business: {settings.whatsapp}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.4rem' }}>✉️</span>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>Email Support:</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {settings.email} • {settings.websiteUrl || 'www.amazingads.in'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.4rem' }}>⏰</span>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>Working Hours:</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {settings.operatingHours || 'Monday – Saturday: 8:30 AM – 8:30 PM IST'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {onOpenSampleKit && (
              <div
                style={{
                  marginTop: '32px',
                  padding: '20px',
                  background: 'rgba(207, 168, 78, 0.08)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <h4 style={{ color: 'var(--accent-gold-bright)', fontSize: '0.95rem', marginBottom: '6px' }}>
                  Need physical specimens?
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '14px' }}>
                  We dispatch free sample boxes containing PET foil, 5D lens, stone art & hand fan swatches directly to your office.
                </p>
                <button onClick={onOpenSampleKit} className="btn-gold" style={{ width: '100%', padding: '10px' }}>
                  Request Free Swatch Kit →
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Direct Message / Inquiry Form */}
          <div
className="contact-card contact-box"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <span className="foil-badge" style={{ marginBottom: '14px' }}>
              ✦ INSTANT MESSAGE
            </span>
            <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
              Send an Inquiry
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '24px' }}>
              Our Sivakasi sales and production team will review your specs and contact you within 2 business hours.
            </p>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '36px 24px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✅</div>
                <h3 style={{ color: '#34d399', fontSize: '1.4rem', marginBottom: '8px' }}>
                  Message Received!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '20px' }}>
                  Thank you, {name}. Your inquiry has been forwarded directly to our Sivakasi Works desk. We will reach out shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setMessage(''); }}
                  className="btn-outline-gold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', padding: '12px 14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', padding: '12px 14px' }}
                    />
                  </div>
                </div>

                <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', padding: '12px 14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Brand or Agency Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', padding: '12px 14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Product / Purpose
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', padding: '12px 14px' }}
                  >
                    <option value="Gold / Silver PET Foil Calendar">Gold / Silver PET Foil Calendar</option>
                    <option value="Special Products">Special Products (LED / Acrylic / Hampers)</option>
                    <option value="Custom 5D Calendars">Custom 5D Calendars</option>
                    <option value="Stone Art Calendars">Stone Art Calendars</option>
                    <option value="Promotional Hand Fan">Promotional Hand Fan</option>
                    <option value="General Corporate Bulk Inquiry">General Corporate Bulk Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Your Requirements / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Specify estimated quantity, preferred dimensions, custom logo details, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', padding: '12px 14px', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold"
                  style={{ width: '100%', padding: '14px', fontSize: '0.95rem', marginTop: '6px' }}
                >
                  {submitting ? 'Submitting to Press Works...' : 'Submit Inquiry to Sivakasi Works →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
@media (max-width: 768px) {
          .contact-main-grid, .contact-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .contact-card, .contact-box {
            padding: 22px 16px !important;
          }
        }
        @media (max-width: 540px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

