import { useState, type FormEvent } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { sendCustomerMessage } from '../services/api';

export const GlobalCartDrawer = () => {
  const {
    cart,
    isCartOpen,
    openCart,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice
  } = useCart();
  const { navigate } = useRouter();

  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutNotes, setCheckoutNotes] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);

  const handlePhoneChange = (val: string) => {
    // Strictly allow only numbers and max 10 digits
    const digits = val.replace(/\D/g, '').slice(0, 10);
    setCheckoutPhone(digits);
    if (digits.length > 0 && digits.length < 10) {
      setPhoneError('Mobile number must be exactly 10 digits.');
    } else if (digits.length === 10 && !/^[6-9]\d{9}$/.test(digits)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number.');
    } else {
      setPhoneError('');
    }
  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const cleanPhone = checkoutPhone.replace(/\D/g, '');
    if (!checkoutName.trim()) {
      alert('Please enter your name or company name.');
      return;
    }

    if (cleanPhone.length !== 10) {
      setPhoneError('Mobile number must be exactly 10 digits.');
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setPhoneError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setCheckoutLoading(true);

    try {
      // Build summary of cart items
      const itemsSummary = cart
        .map(
          (c) =>
            `• ${c.name} [Size: ${c.size}] × ${c.quantity} units @ ₹${c.price}/unit = ₹${(
              c.price * c.quantity
            ).toLocaleString()}`
        )
        .join('\n');

      const fullMessage = `WHOLESALE CART ORDER INQUIRY:\n${itemsSummary}\n\nTotal Items: ${totalCount} units\nTotal Estimated Value: ₹${totalPrice.toLocaleString()}\n\nNotes / Location: ${checkoutNotes || 'Direct Delivery'}`;

      await sendCustomerMessage(
        checkoutName.trim(),
        cleanPhone,
        fullMessage,
        {
          product: `Bulk Cart (${cart.length} item types, ${totalCount} units)`,
          quantity: totalCount,
          notes: `Cart Total: ₹${totalPrice.toLocaleString()} | Delivery: ${checkoutNotes || 'Direct'}`
        }
      );

      setCheckoutSubmitted(true);
      clearCart();
    } catch {
      alert('Failed to send order inquiry. Please contact factory directly.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleBrowseCatalog = () => {
    closeCart();
    navigate('collections');
  };

  return (
    <>
      {/* Global Floating Cart Trigger Pill: visible on all pages whenever cart has items and drawer is closed */}
      {!isCartOpen && totalCount > 0 && (
        <button
          onClick={openCart}
          className="global-floating-cart-pill"
          title="Open Wholesale Order Cart"
          style={{
            position: 'fixed',
            bottom: '26px',
            right: '26px',
            zIndex: 1990,
            background: 'linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)',
            color: '#0b0c0e',
            border: '2px solid rgba(255, 255, 255, 0.9)',
            borderRadius: '50px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 800,
            fontSize: '0.92rem',
            cursor: 'pointer',
            boxShadow: '0 10px 35px rgba(255, 215, 0, 0.45), 0 4px 16px rgba(0,0,0,0.7)',
            transition: 'all 0.2s ease'
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>🛒</span>
          <span style={{ color: '#000000', fontWeight: 800 }}>Cart</span>
          <span
            style={{
              background: '#000000',
              color: '#FFD700',
              borderRadius: '20px',
              padding: '2px 8px',
              fontSize: '0.78rem',
              fontWeight: 800
            }}
          >
            {totalCount}
          </span>
          <span style={{ color: '#000000', fontSize: '0.86rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
            ₹{totalPrice.toLocaleString()}
          </span>
        </button>
      )}

      {/* Cart Modal Backdrop & Slide-Over Drawer */}
      {isCartOpen && (
        <div className="cart-modal-backdrop" onClick={closeCart}>
          <div
            className="cart-drawer-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '460px',
              height: '100%',
              background: '#181917',
              borderLeft: '1px solid #454545',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-15px 0 50px rgba(0,0,0,0.85)',
              animation: 'slideLeft 0.25s ease'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #454545',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#121310'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>🛍️</span>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800, margin: 0 }}>
                Wholesale Order Cart
              </h3>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {cart.length} {cart.length === 1 ? 'item' : 'items'} • {totalCount} total units
              </span>
            </div>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.4rem',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Drawer Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px'
          }}
        >
          {checkoutSubmitted ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10b981',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  margin: '0 auto 18px'
                }}
              >
                ✓
              </div>
              <h4 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '10px', fontWeight: 800 }}>
                Order Inquiry Sent!
              </h4>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                Thank you! Your wholesale order inquiry has been routed to the <strong>Amazing Ads Sivakasi Works</strong> sales desk. Our printing master will contact you on <strong>{checkoutPhone}</strong> via WhatsApp / Call with your official GST proforma invoice and proofing schedule.
              </p>
              <button
                onClick={() => {
                  setCheckoutSubmitted(false);
                  closeCart();
                }}
                className="btn-gold"
                style={{ width: '100%', padding: '12px' }}
              >
                Continue Browsing
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 16px' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '14px', opacity: 0.6 }}>🛒</span>
              <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px', fontWeight: 800 }}>
                Your Cart is Empty
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '24px' }}>
                Select from our Gold/Silver PET Foil, 5D Holographic, Stone Art, or Hand Fan models and add your desired bulk quantity.
              </p>
              <button
                onClick={handleBrowseCatalog}
                className="btn-gold"
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                Explore Product Catalog →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#222320',
                    border: '1px solid #454545',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      border: '1px solid #454545',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: '0 0 3px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item.name}
                    </h5>
                    <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginBottom: '6px' }}>
                      Size: {item.size} • <span style={{ color: '#FFD700', fontWeight: 700 }}>₹{item.price}/unit</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          background: '#121310',
                          border: '1px solid #454545',
                          borderRadius: '6px',
                          overflow: 'hidden'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 50)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ffffff',
                            padding: '3px 8px',
                            cursor: 'pointer',
                            fontWeight: 800,
                            fontSize: '0.9rem'
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            padding: '2px 8px',
                            fontSize: '0.82rem',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 50)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ffffff',
                            padding: '3px 8px',
                            cursor: 'pointer',
                            fontWeight: 800,
                            fontSize: '0.9rem'
                          }}
                        >
                          +
                        </button>
                      </div>

                      <span
                        style={{
                          fontSize: '0.86rem',
                          fontWeight: 800,
                          color: '#FFD700',
                          marginLeft: 'auto'
                        }}
                      >
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          padding: '4px'
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Form */}
        {cart.length > 0 && !checkoutSubmitted && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid #454545',
              background: '#121310'
            }}
          >
            {/* Price Summary */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Wholesale Subtotal:</span>
                <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>✦ Factory Direct Direct GST Invoicing</div>
              </div>
              <span className="gold-gradient-text" style={{ fontSize: '1.45rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Quick 10-Digit Mobile Checkout Form */}
            <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Your Name / Business Name *"
                value={checkoutName}
                onChange={(e) => setCheckoutName(e.target.value)}
                required
                style={{
                  padding: '10px 14px',
                  fontSize: '0.88rem',
                  borderRadius: '8px',
                  background: '#222320',
                  border: '1px solid #454545',
                  color: '#ffffff'
                }}
              />

              <div>
                <input
                  type="tel"
                  placeholder="10-Digit Mobile Number *"
                  value={checkoutPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  maxLength={10}
                  pattern="[6-9][0-9]{9}"
                  required
                  style={{
                    padding: '10px 14px',
                    fontSize: '0.88rem',
                    borderRadius: '8px',
                    background: '#222320',
                    border: `1px solid ${phoneError ? '#ef4444' : '#454545'}`,
                    color: '#ffffff'
                  }}
                />
                {phoneError ? (
                  <span style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: '3px', display: 'block' }}>
                    {phoneError}
                  </span>
                ) : (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
                    Exactly 10 digits required for WhatsApp & Call confirmation
                  </span>
                )}
              </div>

              <input
                type="text"
                placeholder="Delivery City / Special Printing Notes (Optional)"
                value={checkoutNotes}
                onChange={(e) => setCheckoutNotes(e.target.value)}
                style={{
                  padding: '9px 14px',
                  fontSize: '0.84rem',
                  borderRadius: '8px',
                  background: '#222320',
                  border: '1px solid #454545',
                  color: '#ffffff'
                }}
              />

              <button
                type="submit"
                disabled={checkoutLoading || checkoutPhone.length !== 10}
                className="btn-gold"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.92rem',
                  marginTop: '4px',
                  opacity: checkoutPhone.length !== 10 ? 0.6 : 1,
                  cursor: checkoutPhone.length !== 10 ? 'not-allowed' : 'pointer'
                }}
              >
                {checkoutLoading ? 'Routing to Press Desk...' : 'Submit Wholesale Order Inquiry →'}
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
      )}
    </>
  );
};
