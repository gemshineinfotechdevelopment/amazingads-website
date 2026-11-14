import { useState, useEffect, type FormEvent } from 'react';
import { sendCustomerMessage, getStoredFactorySettings, type FactorySettings } from '../services/api';

// Official Authentic WhatsApp Icon (Phone handset in chat bubble)
const WhatsAppIcon = ({ size = 28, color = '#ffffff' }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.106 8.106 0 01-1.25-4.29c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39s2.39 3.59 2.39 5.77c0 4.5-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.45-.72-1.68-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.45-.6 1.66-1.17.2-.57.2-1.07.14-1.17-.06-.1-.23-.17-.48-.3z"
    />
  </svg>
);

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const cleanWhatsAppNumber = (settings.whatsapp || '919790472767').replace(/[^0-9]/g, '');
  const targetNumber = cleanWhatsAppNumber.length === 10 ? `91${cleanWhatsAppNumber}` : cleanWhatsAppNumber;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);

    try {
      // 1. Save customer message to backend & localStorage for Admin Dashboard
      await sendCustomerMessage(name, phone, message);

      // 2. Format WhatsApp URL
      const whatsappText = `Hello Amazing Ads Sivakasi,\n\n*Customer Name:* ${name}\n*Phone:* ${phone || 'N/A'}\n*Order / Pricing Inquiry:* ${message}\n\nPlease share official catalog quotation and dispatch timeline.`;
      const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(whatsappText)}`;

      // 3. Open WhatsApp in new tab
      window.open(url, '_blank');

      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setIsOpen(false);
        setName('');
        setPhone('');
        setMessage('');
      }, 3000);
    } catch {
      // Direct WhatsApp fallback
      const fallbackUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(`Hello Amazing Ads Sivakasi, Name: ${name}, Phone: ${phone}, Inquiry: ${message}`)}`;
      window.open(fallbackUrl, '_blank');
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1500,
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* WhatsApp Chat Popover Box */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '72px',
            right: 0,
            width: 'min(360px, calc(100vw - 32px))',
            background: '#ffffff',
            color: '#1e293b',
            borderRadius: '18px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            animation: 'slideUpChat 0.25s ease'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#075e54',
              color: '#ffffff',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              >
                <WhatsAppIcon size={24} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.2 }}>
                  Amazing Ads Sivakasi
                </div>
                <div style={{ fontSize: '0.72rem', color: '#bbf7d0', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                  <span>Direct Factory WhatsApp</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '1.4rem',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '4px'
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Form Content */}
          <div style={{ padding: '18px', background: '#f8fafc' }}>
            {isSent ? (
              <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#16a34a' }}>✓</div>
                <h4 style={{ color: '#0f172a', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 6px' }}>
                  Message Sent to WhatsApp!
                </h4>
                <p style={{ color: '#475569', fontSize: '0.84rem', margin: 0, lineHeight: 1.4 }}>
                  Your inquiry is saved and routed directly to our Sivakasi factory manager on WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Your Name / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar / Sri Amman Stores"
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      fontSize: '0.88rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98400 12345"
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      fontSize: '0.88rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Message / Calendar Requirements *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Hi, I need pricing for 500 pcs Lord Balaji Stone Art calendars..."
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      fontSize: '0.88rem',
                      color: '#0f172a',
                      outline: 'none',
                      resize: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '11px 16px',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <WhatsAppIcon size={20} color="#ffffff" />
                  <span>{loading ? 'Routing Message...' : 'Send & Chat on WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Official WhatsApp Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#25D366',
          border: 'none',
          color: '#ffffff',
          boxShadow: '0 6px 24px rgba(37, 211, 102, 0.5), 0 2px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          position: 'relative'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        aria-label="Contact Amazing Ads on WhatsApp"
        title="Chat with Sivakasi Press on WhatsApp"
      >
        {/* Official WhatsApp Phone Handset Icon */}
        <WhatsAppIcon size={34} color="#ffffff" />

        {/* Pulse ring animation */}
        <span
          style={{
            position: 'absolute',
            inset: '-3px',
            borderRadius: '50%',
            border: '2px solid #25D366',
            opacity: 0.6,
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        />
      </button>
    </div>
  );
};
