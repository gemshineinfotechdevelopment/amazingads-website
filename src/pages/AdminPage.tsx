import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from '../context/RouterContext';
import {
  getCalendarProducts,
  updateCalendarProduct,
  createCalendarProduct,
  deleteCalendarProduct,
  resetCalendarProducts,
  fetchCustomerMessages,
  updateMessageStatus,
  getStoredFactoryDiscounts,
  saveStoredFactoryDiscounts,
  getStoredFactorySettings,
  saveStoredFactorySettings,
  fetchFactorySettings,
  saveFactorySettingsToBackend,
  fetchFactoryDiscounts,
  saveFactoryDiscountsToBackend,
  fetchQuotes,
  DEFAULT_DISCOUNT_TIERS,
  DEFAULT_FACTORY_SETTINGS,
  type CalendarProduct,
  type CustomerMessage,
  type DiscountTier,
  type FactorySettings,
  type StoredQuote
} from '../services/api';

type AdminTab = 'messages' | 'catalog' | 'matrix' | 'discounts' | 'quotes' | 'settings';

// Official Authentic WhatsApp Icon
const WhatsAppIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.106 8.106 0 01-1.25-4.29c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39s2.39 3.59 2.39 5.77c0 4.5-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.45-.72-1.68-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.45-.6 1.66-1.17.2-.57.2-1.07.14-1.17-.06-.1-.23-.17-.48-.3z"
    />
  </svg>
);

interface InquiredOrder {
  id: string;
  clientName: string;
  company: string;
  phone: string;
  product: string;
  quantity: number;
  totalPrice: number;
  date: string;
  status: 'New' | 'In Production' | 'Dispatched';
}

const SAMPLE_QUOTES: InquiredOrder[] = [
  {
    id: 'AA-Q-8821',
    clientName: 'Senthil Murugan Traders',
    company: 'Murugan Textiles, Madurai',
    phone: '+91 98421 55670',
    product: 'Gold / Silver PET Foil Calendar',
    quantity: 500,
    totalPrice: 61625,
    date: 'Today, 02:40 PM',
    status: 'New'
  },
  {
    id: 'AA-Q-8819',
    clientName: 'Rajesh Sharma',
    company: 'Apex Logistics Corp, Bangalore',
    phone: '+91 97400 33812',
    product: 'Stone Art Sculptural Calendars (Lord Balaji Edition)',
    quantity: 250,
    totalPrice: 64400,
    date: 'Today, 11:15 AM',
    status: 'New'
  },
  {
    id: 'AA-Q-8805',
    clientName: 'Kavitha Enterprises',
    company: 'Kavitha Jewellers, Coimbatore',
    phone: '+91 94432 10988',
    product: 'Custom 5D Calendars (Lord Murugan Edition)',
    quantity: 1000,
    totalPrice: 171600,
    date: 'Yesterday',
    status: 'In Production'
  }
];

const IMAGE_PRESETS = [
  { label: 'Lord Balaji (Stone Art Photo)', url: '/images/stone-art-calendar-real.jpg' },
  { label: 'Mahalakshmi (Gold PET)', url: '/images/gods/mahalakshmi.jpg' },
  { label: 'Lord Murugan (5D Tech)', url: '/images/gods/murugan.jpg' },
  { label: 'Lord Ganesha (Hand Fan)', url: '/images/gods/ganesha.jpg' },
  { label: 'Lord Ayyappan (Gold Foil)', url: '/images/gods/ayyappan.jpg' },
  { label: 'Executive Desk Calendar', url: '/images/executive-desk-calendar.jpg' },
  { label: 'Promotional Hand Fan', url: '/images/hand-fan-promo-real.jpg' },
  { label: 'Custom 5D Holographic', url: '/images/custom-5d-calendar-real.jpg' }
];

const SIZE_PRESETS = [
  '15 × 20 inches (Standard Wall)',
  '17 × 27 inches (Jumbo Royal Wall)',
  '12 × 18 inches (Compact Office)',
  '14 × 20 inches (Sculpted Relief)',
  '16 × 24 inches (Executive Deluxe)',
  '18 × 28 inches (Grand Temple)',
  '8 × 8 inches (Standard Circle)',
  '9 × 10 inches (Jumbo Leaf)',
  'A4 Executive Desk (8.5 × 11 in)',
  'A5 Compact Desk (6 × 8.5 in)'
];

const INITIAL_FORM_STATE: CalendarProduct = {
  id: '',
  name: '',
  subtitle: '',
  category: 'Gold/Silver PET Foil',
  tag: 'Flagship Luxury Spec',
  startingPrice: 145,
  currency: '₹',
  minOrder: 100,
  standardGsm: '400 GSM Rigid Kappa Board',
  binding: 'Heavy-Gauge Anti-Rust Tin Mounting',
  dimensions: '15 × 20 inches / 17 × 27 inches',
  leadTime: '4–6 Business Days',
  accentColor: '#0284c7',
  coverFinish: 'Mirror-Finish Gold & Silver Hot Stamped Foil',
  description: 'Precision manufactured at Amazing Ads Sivakasi Works.',
  features: [
    'Authentic Sivakasi Direct Factory Finish',
    'High Quality Moisture Resistant Substrate',
    'Full Color HD Print & Hot Stamping'
  ],
  mockupImg: '/images/stone-art-calendar-real.jpg',
  sizes: ['15 × 20 inches (Standard Wall)', '17 × 27 inches (Jumbo Royal Wall)']
};

// Signature Dark Blue to Sky Blue Gradient
const BLUE_GRADIENT = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 55%, #38bdf8 100%)';
const BLUE_GRADIENT_LIGHT = 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #38bdf8 100%)';

// Client-Side Canvas Image Compression Helper (Reduces 5MB photos to ~50KB)
const compressImageFile = (file: File, maxDim = 900, quality = 0.82): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawBase64 = e.target?.result as string;
      if (!rawBase64) return resolve('');
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(rawBase64);
        }
      };
      img.onerror = () => resolve(rawBase64);
      img.src = rawBase64;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

export const AdminPage = () => {
  const { navigate } = useRouter();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('amazingads_admin_authenticated') === 'true';
  });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('messages');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Products Data
  const [products, setProducts] = useState<CalendarProduct[]>([]);
  const [matrixData, setMatrixData] = useState<Record<string, { name: string; price: number; sizes: string[] }>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Customer WhatsApp Messages
  const [messages, setMessages] = useState<CustomerMessage[]>([]);
  // Online Quotes & Estimation Requests
  const [quotesList, setQuotesList] = useState<StoredQuote[]>([]);

  // Editable Factory & Discounts State
  const [discountTiers, setDiscountTiers] = useState<DiscountTier[]>(getStoredFactoryDiscounts());
  const [factorySettings, setFactorySettings] = useState<FactorySettings>(getStoredFactorySettings());

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CalendarProduct>(INITIAL_FORM_STATE);
  const [newSizeInput, setNewSizeInput] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Load Products, Messages, Quotes & Settings
  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, msgs, quotes, settings, discounts] = await Promise.all([
        getCalendarProducts(),
        fetchCustomerMessages(),
        fetchQuotes(),
        fetchFactorySettings(),
        fetchFactoryDiscounts()
      ]);
      setProducts(prods);
      setMessages(msgs);
      if (quotes && quotes.length > 0) setQuotesList(quotes);
      if (settings) setFactorySettings(settings);
      if (discounts && discounts.length > 0) setDiscountTiers(discounts);

      // Initialize matrix data
      const matrixInit: Record<string, { name: string; price: number; sizes: string[] }> = {};
      prods.forEach(p => {
        matrixInit[p.id] = {
          name: p.name,
          price: p.startingPrice,
          sizes: p.sizes && p.sizes.length > 0 ? [...p.sizes] : [p.dimensions || 'Standard Size']
        };
      });
      setMatrixData(matrixInit);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }

    const handleNewMessage = (e: Event) => {
      const customEvent = e as CustomEvent<CustomerMessage[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setMessages(customEvent.detail);
      } else {
        fetchCustomerMessages().then(setMessages);
      }
    };

    window.addEventListener('new-customer-message', handleNewMessage);
    return () => {
      window.removeEventListener('new-customer-message', handleNewMessage);
    };
  }, [isAuthenticated]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Login Handler
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const user = loginUsername.trim().toLowerCase();
    const pass = loginPassword.trim();

    if ((user === 'admin' || user === 'amazingads') && (pass === 'admin' || pass === 'amazingads2026')) {
      localStorage.setItem('amazingads_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError(null);
      showToast('Welcome back, Master Administrator!');
    } else {
      setLoginError('Invalid credentials. Default is: admin / admin');
    }
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('amazingads_admin_authenticated');
    setIsAuthenticated(false);
    showToast('Logged out of Admin Portal.', 'info');
  };

  // Product Edit
  const handleOpenEdit = (product: CalendarProduct) => {
    setIsEditing(true);
    const existingSizes = product.sizes && product.sizes.length > 0 
      ? product.sizes 
      : [product.dimensions || 'Standard Size'];
    setFormData({
      ...product,
      sizes: [...existingSizes]
    });
    setNewSizeInput('');
    setUploadedFileName(null);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormData({
      ...INITIAL_FORM_STATE,
      id: `product-${Date.now()}`
    });
    setNewSizeInput('');
    setUploadedFileName(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewSizeInput('');
    setUploadedFileName(null);
  };

  // Device Image File Upload Handler with Auto Canvas Compression
  const handleImageFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      try {
        const compressedBase64 = await compressImageFile(file, 900, 0.82);
        if (compressedBase64) {
          setFormData(prev => ({ ...prev, mockupImg: compressedBase64 }));
          showToast(`Image "${file.name}" optimized and loaded successfully!`);
        }
      } catch {
        showToast('Failed to process image file', 'error');
      }
    }
  };

  const handleAddSize = (sizeToAdd?: string) => {
    const size = (sizeToAdd || newSizeInput).trim();
    if (!size) return;
    if (formData.sizes && formData.sizes.includes(size)) {
      showToast('This size is already in the list', 'info');
      return;
    }
    const updatedSizes = [...(formData.sizes || []), size];
    setFormData({ ...formData, sizes: updatedSizes });
    if (!sizeToAdd) setNewSizeInput('');
  };

  const handleRemoveSize = (indexToRemove: number) => {
    const updatedSizes = (formData.sizes || []).filter((_, i) => i !== indexToRemove);
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleSaveProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Product name is required', 'error');
      return;
    }
    if (formData.startingPrice <= 0) {
      showToast('Starting price must be greater than zero', 'error');
      return;
    }
    if (!formData.sizes || formData.sizes.length === 0) {
      showToast('Please add at least one available size', 'error');
      return;
    }

    try {
      if (isEditing) {
        await updateCalendarProduct(formData.id, formData);
        showToast(`Product "${formData.name}" updated successfully!`);
      } else {
        await createCalendarProduct(formData);
        showToast(`New product "${formData.name}" created successfully!`);
      }
      setIsModalOpen(false);
      await loadData();
    } catch {
      showToast('Failed to save product. Please try again.', 'error');
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the catalog?`)) {
      try {
        await deleteCalendarProduct(id);
        showToast(`Product "${name}" deleted successfully.`);
        await loadData();
      } catch {
        showToast('Failed to delete product', 'error');
      }
    }
  };

  const handleResetCatalog = async () => {
    if (window.confirm('Reset all catalog products and sizes back to Sivakasi master defaults?')) {
      try {
        await resetCalendarProducts();
        showToast('Catalog successfully reset to factory defaults.');
        await loadData();
      } catch {
        showToast('Failed to reset catalog', 'error');
      }
    }
  };

  // Matrix Quick Updates
  const handleMatrixFieldChange = (productId: string, field: 'name' | 'price', value: string | number) => {
    setMatrixData(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: field === 'price' ? Math.max(1, Number(value)) : value
      }
    }));
  };

  const handleMatrixRemoveSize = (productId: string, sizeIdx: number) => {
    setMatrixData(prev => {
      const current = prev[productId];
      if (!current) return prev;
      const updatedSizes = current.sizes.filter((_, idx) => idx !== sizeIdx);
      return {
        ...prev,
        [productId]: { ...current, sizes: updatedSizes }
      };
    });
  };

  const handleMatrixAddSize = (productId: string, newSize: string) => {
    const trimmed = newSize.trim();
    if (!trimmed) return;
    setMatrixData(prev => {
      const current = prev[productId];
      if (!current || current.sizes.includes(trimmed)) return prev;
      return {
        ...prev,
        [productId]: { ...current, sizes: [...current.sizes, trimmed] }
      };
    });
  };

  const handleSaveMatrixRow = async (productId: string) => {
    const row = matrixData[productId];
    if (!row) return;
    try {
      await updateCalendarProduct(productId, {
        name: row.name,
        startingPrice: row.price,
        sizes: row.sizes
      });
      showToast(`Updated "${row.name}" with Price ₹${row.price} and ${row.sizes.length} sizes.`);
      await loadData();
    } catch {
      showToast('Failed to save row changes', 'error');
    }
  };

  const handleSaveAllMatrix = async () => {
    try {
      for (const [id, row] of Object.entries(matrixData)) {
        await updateCalendarProduct(id, {
          name: row.name,
          startingPrice: row.price,
          sizes: row.sizes
        });
      }
      showToast('All products, prices, and sizes saved successfully!');
      await loadData();
    } catch {
      showToast('Failed to save all matrix rows', 'error');
    }
  };

  // Message Actions
  const handleToggleMessageStatus = async (msg: CustomerMessage) => {
    const nextStatus: 'New' | 'Replied' = msg.status === 'New' ? 'Replied' : 'New';
    await updateMessageStatus(msg.id, nextStatus);
    const updated: CustomerMessage[] = messages.map(m => m.id === msg.id ? { ...m, status: nextStatus } : m);
    setMessages(updated);
    showToast(`Message marked as ${nextStatus}`);
  };

  const handleReplyWhatsApp = (msg: CustomerMessage) => {
    const text = `Hello ${msg.name},\nThank you for contacting Amazing Ads Sivakasi regarding:\n"${msg.message}"\n\nOur factory team is ready with direct wholesale rates and sample proofs. Please share your required quantity and delivery location.`;
    const cleanPhone = msg.phone.replace(/[^0-9]/g, '');
    const url = cleanPhone.length >= 10
      ? `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/919790472767?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Editable Discount Tiers Handlers
  const handleUpdateDiscountTier = (tierId: string, field: keyof DiscountTier, value: string | number) => {
    setDiscountTiers(prev => prev.map(t => {
      if (t.id === tierId) {
        return {
          ...t,
          [field]: field === 'minQty' || field === 'discountPercentage' ? Number(value) : value
        };
      }
      return t;
    }));
  };

  const handleAddDiscountTier = () => {
    const newTier: DiscountTier = {
      id: `tier-${Date.now()}`,
      minQty: 1000,
      maxQty: '1,999',
      discountPercentage: 20,
      label: 'Custom Tier'
    };
    setDiscountTiers(prev => [...prev, newTier]);
  };

  const handleDeleteDiscountTier = (tierId: string) => {
    setDiscountTiers(prev => prev.filter(t => t.id !== tierId));
  };

  const handleSaveDiscountTiers = async () => {
    try {
      await saveFactoryDiscountsToBackend(discountTiers);
      showToast('Wholesale discount tiers updated & synced with Quote Calculator!');
    } catch {
      showToast('Error syncing discounts to database, saved locally', 'info');
    }
  };

  // Editable Factory & Brand Settings Handlers
  const handleSaveFactorySettings = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await saveFactorySettingsToBackend(factorySettings);
      showToast('Sivakasi factory and dispatch logistics settings saved to database & website!');
    } catch {
      showToast('Error syncing settings to database, saved locally', 'info');
    }
  };

  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedLogo = await compressImageFile(file, 500, 0.9);
        if (compressedLogo) {
          setFactorySettings(prev => ({ ...prev, logoUrl: compressedLogo }));
          showToast(`Logo "${file.name}" uploaded successfully! Click "Save Settings" to apply.`);
        }
      } catch {
        showToast('Failed to process logo file', 'error');
      }
    }
  };

  const handleClearLogo = () => {
    setFactorySettings(prev => ({ ...prev, logoUrl: '' }));
    showToast('Custom logo removed.');
  };

  const handleSaveAllSettings = (e: FormEvent) => {
    e.preventDefault();
    saveStoredFactorySettings(factorySettings);
    showToast('Company settings, contact details & logo saved successfully!');
  };

  const handleResetFactoryDefaults = () => {
    if (window.confirm('Reset all factory details, logo, contact numbers and discount tiers back to Sivakasi factory defaults?')) {
      setDiscountTiers([...DEFAULT_DISCOUNT_TIERS]);
      saveStoredFactoryDiscounts([...DEFAULT_DISCOUNT_TIERS]);
      setFactorySettings({ ...DEFAULT_FACTORY_SETTINGS });
      saveStoredFactorySettings({ ...DEFAULT_FACTORY_SETTINGS });
      showToast('Factory specifications and discount tiers restored to defaults.');
    }
  };

  // Filtering
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const unreadMessagesCount = messages.filter(m => m.status === 'New').length;

  // ========================================================================
  // RENDER: 1. ADMIN LOGIN (DARK BLUE TO SKY BLUE GRADIENT + WHITE THEME)
  // ========================================================================
  if (!isAuthenticated) {
    return (
      <div
        className="admin-portal-root"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #0369a1 75%, #38bdf8 100%)',
          color: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Outfit', sans-serif"
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '26px',
            width: '100%',
            maxWidth: '450px',
            boxShadow: '0 25px 65px -12px rgba(2, 132, 199, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.4)',
            overflow: 'hidden'
          }}
        >
          {/* Dark Blue to Sky Blue Gradient Header */}
          <div
            style={{
              background: BLUE_GRADIENT,
              padding: '38px 30px',
              textAlign: 'center',
              color: '#ffffff'
            }}
          >
            {factorySettings.logoUrl ? (
              <img
                src={factorySettings.logoUrl}
                alt="Logo"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  objectFit: 'contain',
                  background: '#ffffff',
                  padding: '4px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                  marginBottom: '14px',
                  display: 'inline-block'
                }}
              />
            ) : (
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)',
                  marginBottom: '14px'
                }}
              >
                🛡️
              </div>
            )}
            <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#ffffff', margin: '0 0 6px', letterSpacing: '0.02em', fontFamily: "'Playfair Display', Georgia, serif" }}>
              Admin Portal
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#e0f2fe', margin: 0, fontWeight: 500 }}>
              Amazing Ads Sivakasi Works Management System
            </p>
          </div>

          {/* Form in Crisp White */}
          <div style={{ padding: '32px 30px', background: '#ffffff' }}>
            {loginError && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  marginBottom: '18px',
                  fontWeight: 600
                }}
              >
                ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '6px' }}>
                  Administrator Username
                </label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin"
                  style={{
                    width: '100%',
                    background: '#f8fafc',
                    border: '1px solid #bae6fd',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    WebkitTextFillColor: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '6px' }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    background: '#f8fafc',
                    border: '1px solid #bae6fd',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    WebkitTextFillColor: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: BLUE_GRADIENT,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '13px',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(2, 132, 199, 0.4)',
                  transition: 'all 0.2s ease'
                }}
              >
                Log In to Admin
              </button>
            </form>

            <div style={{ marginTop: '20px', padding: '12px', background: '#f0f9ff', border: '1px dashed #7dd3fc', borderRadius: '10px', fontSize: '0.8rem', color: '#0369a1', textAlign: 'center' }}>
              <span>Default Access — Username: </span>
              <strong style={{ color: '#0c4a6e' }}>admin</strong>
              <span> | Password: </span>
              <strong style={{ color: '#0c4a6e' }}>admin</strong>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={() => navigate('home')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                ← Return to Public Website
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER: 2. ADMIN DASHBOARD (DARK BLUE TO SKY BLUE GRADIENT + WHITE THEME)
  // ========================================================================
  return (
    <div
      className="admin-portal-root"
      style={{
        height: '100vh',
        maxHeight: '100vh',
        background: '#f8fafc',
        color: '#0f172a',
        display: 'flex',
        fontFamily: "'Outfit', sans-serif",
        overflow: 'hidden'
      }}
    >
      
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 99999,
            background: toastMessage.type === 'error' ? '#ef4444' : toastMessage.type === 'info' ? '#0284c7' : '#10b981',
            color: '#fff',
            padding: '12px 22px',
            borderRadius: '12px',
            boxShadow: '0 10px 28px rgba(2, 132, 199, 0.25)',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span>{toastMessage.type === 'error' ? '⚠️' : toastMessage.type === 'info' ? 'ℹ️' : '✓'}</span>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* A. WHITE THEME ADMIN SIDEBAR (PERMANENT FIXED NON-SCROLLING) */}
      <aside
        style={{
          width: '270px',
          background: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          height: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 100,
          boxShadow: '2px 0 16px rgba(2, 132, 199, 0.05)'
        }}
        className={sidebarOpen ? 'admin-sidebar open admin-fixed-sidebar' : 'admin-sidebar admin-fixed-sidebar'}
      >
        {/* Brand Header with Dark Blue to Sky Blue Gradient */}
        <div style={{ padding: '20px 18px', borderBottom: '1px solid #f1f5f9' }}>
          <div
            style={{
              background: BLUE_GRADIENT,
              padding: '16px 18px',
              borderRadius: '16px',
              color: '#ffffff',
              boxShadow: '0 8px 22px rgba(2, 132, 199, 0.3)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {factorySettings.logoUrl ? (
                <img
                  src={factorySettings.logoUrl}
                  alt="Logo"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    objectFit: 'contain',
                    background: '#ffffff',
                    padding: '3px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    flexShrink: 0
                  }}
                />
              ) : null}
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff', letterSpacing: '0.02em', lineHeight: 1.2, fontFamily: "'Playfair Display', Georgia, serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {factorySettings.factoryName || 'AMAZING ADS'}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#e0f2fe', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginTop: '2px' }}>
                  Sivakasi Works Admin
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div style={{ fontSize: '0.7rem', color: '#0369a1', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px 6px' }}>
            Main Navigation
          </div>

          {/* 1. CUSTOMER WHATSAPP INQUIRIES */}
          <button
            onClick={() => setActiveTab('messages')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '11px 14px',
              borderRadius: '12px',
              background: activeTab === 'messages' ? BLUE_GRADIENT : '#ffffff',
              border: `1px solid ${activeTab === 'messages' ? 'transparent' : '#f1f5f9'}`,
              color: activeTab === 'messages' ? '#ffffff' : '#1e293b',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'messages' ? 800 : 600,
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: activeTab === 'messages' ? '0 4px 16px rgba(2, 132, 199, 0.35)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <WhatsAppIcon size={18} color={activeTab === 'messages' ? '#e0f2fe' : '#25D366'} />
              <span>WhatsApp Messages</span>
            </div>
            {unreadMessagesCount > 0 ? (
              <span style={{ fontSize: '0.72rem', background: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontWeight: 800 }}>
                {unreadMessagesCount}
              </span>
            ) : (
              <span style={{ fontSize: '0.72rem', color: activeTab === 'messages' ? '#bae6fd' : '#64748b' }}>{messages.length}</span>
            )}
          </button>

          {/* 2. PRODUCTS & CATALOG */}
          <button
            onClick={() => setActiveTab('catalog')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '11px 14px',
              borderRadius: '12px',
              background: activeTab === 'catalog' ? BLUE_GRADIENT : '#ffffff',
              border: `1px solid ${activeTab === 'catalog' ? 'transparent' : '#f1f5f9'}`,
              color: activeTab === 'catalog' ? '#ffffff' : '#1e293b',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'catalog' ? 800 : 600,
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: activeTab === 'catalog' ? '0 4px 16px rgba(2, 132, 199, 0.35)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📦</span>
              <span>Products & Catalog</span>
            </div>
            <span style={{ fontSize: '0.72rem', background: activeTab === 'catalog' ? 'rgba(255, 255, 255, 0.2)' : '#e0f2fe', color: activeTab === 'catalog' ? '#ffffff' : '#0369a1', padding: '2px 8px', borderRadius: '8px', fontWeight: 700 }}>
              {products.length}
            </span>
          </button>

          {/* 3. BULK PRICE & SIZE MATRIX */}
          <button
            onClick={() => setActiveTab('matrix')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '11px 14px',
              borderRadius: '12px',
              background: activeTab === 'matrix' ? BLUE_GRADIENT : '#ffffff',
              border: `1px solid ${activeTab === 'matrix' ? 'transparent' : '#f1f5f9'}`,
              color: activeTab === 'matrix' ? '#ffffff' : '#1e293b',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'matrix' ? 800 : 600,
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: activeTab === 'matrix' ? '0 4px 16px rgba(2, 132, 199, 0.35)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚡</span>
              <span>Price & Size Matrix</span>
            </div>
            <span style={{ fontSize: '0.68rem', color: activeTab === 'matrix' ? '#bae6fd' : '#0284c7', fontWeight: 800 }}>
              Bulk
            </span>
          </button>

          {/* 4. EDITABLE FACTORY & DISCOUNTS */}
          <button
            onClick={() => setActiveTab('discounts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '11px 14px',
              borderRadius: '12px',
              background: activeTab === 'discounts' ? BLUE_GRADIENT : '#ffffff',
              border: `1px solid ${activeTab === 'discounts' ? 'transparent' : '#f1f5f9'}`,
              color: activeTab === 'discounts' ? '#ffffff' : '#1e293b',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'discounts' ? 800 : 600,
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: activeTab === 'discounts' ? '0 4px 16px rgba(2, 132, 199, 0.35)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <span>🏭</span>
            <span>Factory & Discounts</span>
          </button>

          {/* 5. QUOTES & LEADS */}
          <button
            onClick={() => setActiveTab('quotes')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '11px 14px',
              borderRadius: '12px',
              background: activeTab === 'quotes' ? BLUE_GRADIENT : '#ffffff',
              border: `1px solid ${activeTab === 'quotes' ? 'transparent' : '#f1f5f9'}`,
              color: activeTab === 'quotes' ? '#ffffff' : '#1e293b',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'quotes' ? 800 : 600,
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: activeTab === 'quotes' ? '0 4px 16px rgba(2, 132, 199, 0.35)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📋</span>
              <span>Quotes & Estimates</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: activeTab === 'quotes' ? '#bae6fd' : '#64748b' }}>{(quotesList.length > 0 ? quotesList : SAMPLE_QUOTES).length}</span>
          </button>

          {/* 6. COMPANY SETTINGS & CONTACT */}
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '11px 14px',
              borderRadius: '12px',
              background: activeTab === 'settings' ? BLUE_GRADIENT : '#ffffff',
              border: `1px solid ${activeTab === 'settings' ? 'transparent' : '#f1f5f9'}`,
              color: activeTab === 'settings' ? '#ffffff' : '#1e293b',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'settings' ? 800 : 600,
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: activeTab === 'settings' ? '0 4px 16px rgba(2, 132, 199, 0.35)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚙️</span>
              <span>Settings & Contact</span>
            </div>
            <span style={{ fontSize: '0.68rem', background: activeTab === 'settings' ? 'rgba(255, 255, 255, 0.2)' : '#e0f2fe', color: activeTab === 'settings' ? '#ffffff' : '#0369a1', padding: '2px 8px', borderRadius: '8px', fontWeight: 700 }}>
              Brand
            </span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', color: '#0369a1' }}>
                👤
              </div>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>
                  Super Admin
                </div>
                <div style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: 600 }}>
                  Sivakasi Works
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Log out of Admin"
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => navigate('home')}
            style={{
              width: '100%',
              background: '#ffffff',
              border: '1px solid #bae6fd',
              color: '#0369a1',
              padding: '9px 12px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>🌐</span>
            <span>View Public Storefront</span>
          </button>
        </div>
      </aside>

      {/* B. MAIN CONTENT IN CRISP WHITE WITH BLUE GRADIENTS */}
      <div style={{ flex: 1, minWidth: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header
          style={{
            height: '70px',
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            flexShrink: 0,
            zIndex: 90,
            boxShadow: '0 2px 12px rgba(2, 132, 199, 0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="admin-mobile-toggle"
              style={{
                display: 'none',
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#0284c7'
              }}
              aria-label="Toggle admin sidebar"
            >
              ☰
            </button>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800 }}>
                Admin Portal / {activeTab === 'messages' ? 'Customer WhatsApp Messages' : activeTab === 'catalog' ? 'Products & Catalog' : activeTab === 'matrix' ? 'Price & Size Matrix' : activeTab === 'discounts' ? 'Factory & Wholesale Discounts' : activeTab === 'quotes' ? 'Quotes & Online Estimates' : 'Settings & Contact Details'}
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                {activeTab === 'messages' && 'Customer WhatsApp Inquiries & Messages'}
                {activeTab === 'catalog' && 'Product Specifications & Catalog Management'}
                {activeTab === 'matrix' && 'Quick Price & Size Bulk Matrix'}
                {activeTab === 'discounts' && 'Factory & Wholesale Discounts Configuration'}
                {activeTab === 'quotes' && 'Quotes & Online Estimates'}
                {activeTab === 'settings' && 'Company Settings, Logo & Contact Details'}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleResetCatalog}
              style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '8px 14px',
                borderRadius: '20px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              ↺ Reset Defaults
            </button>

            <button
              onClick={handleOpenCreate}
              style={{
                background: BLUE_GRADIENT,
                border: 'none',
                color: '#ffffff',
                padding: '9px 20px',
                borderRadius: '20px',
                fontSize: '0.84rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
              }}
            >
              + Add Product
            </button>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main style={{ padding: '26px 28px', flex: 1, height: 'calc(100vh - 70px)', overflowY: 'auto', background: '#f8fafc' }}>

          {/* TAB 1: CUSTOMER WHATSAPP MESSAGES */}
          {activeTab === 'messages' && (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(126, 34, 206, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <WhatsAppIcon size={24} color="#25D366" />
                    <span>Customer WhatsApp Messages ({messages.length})</span>
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.84rem', margin: '4px 0 0' }}>
                    Messages submitted through the public website's WhatsApp button are captured here live.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '4px 12px', borderRadius: '14px', fontSize: '0.76rem', fontWeight: 700 }}>
                    {unreadMessagesCount} New Unreplied
                  </span>
                </div>
              </div>

              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
                  No customer messages received yet. Send a test message from the public website's WhatsApp button!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        background: msg.status === 'New' ? '#f8fafc' : '#ffffff',
                        border: `1px solid ${msg.status === 'New' ? '#bae6fd' : '#e2e8f0'}`,
                        borderRadius: '14px',
                        padding: '18px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '14px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                      }}
                    >
                      <div style={{ flex: '1 1 320px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.02rem' }}>
                            {msg.name}
                          </span>
                          <span style={{ fontSize: '0.84rem', color: '#0284c7', fontWeight: 700 }}>
                            📞 {msg.phone}
                          </span>
                          <span
                            style={{
                              background: msg.status === 'New' ? '#25D366' : '#94a3b8',
                              color: '#fff',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '0.7rem',
                              fontWeight: 800
                            }}
                          >
                            {msg.status}
                          </span>
                        </div>

                        <div
                          style={{
                            background: '#ffffff',
                            border: '1px solid #bae6fd',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            color: '#1e293b',
                            fontSize: '0.9rem',
                            lineHeight: 1.5,
                            marginBottom: '6px'
                          }}
                        >
                          "{msg.message}"
                        </div>

                        <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                          Received: {new Date(msg.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => handleReplyWhatsApp(msg)}
                          style={{
                            background: '#25D366',
                            border: 'none',
                            color: '#ffffff',
                            padding: '9px 16px',
                            borderRadius: '10px',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)'
                          }}
                        >
                          <WhatsAppIcon size={16} color="#ffffff" />
                          <span>Reply via WhatsApp</span>
                        </button>

                        <button
                          onClick={() => handleToggleMessageStatus(msg)}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #bae6fd',
                            color: '#0284c7',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {msg.status === 'New' ? 'Mark Replied' : 'Mark New'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRODUCTS & CATALOG MANAGEMENT */}
          {activeTab === 'catalog' && (
            <div>
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '22px',
                  boxShadow: '0 2px 12px rgba(2, 132, 199, 0.04)'
                }}
              >
                <div style={{ flex: '1 1 260px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search products by title or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#f8fafc',
                      border: '1px solid #bae6fd',
                      borderRadius: '20px',
                      padding: '9px 14px 9px 36px',
                      color: '#0f172a',
                      WebkitTextFillColor: '#0f172a',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background: selectedCategory === cat ? BLUE_GRADIENT : '#f0f9ff',
                        color: selectedCategory === cat ? '#ffffff' : '#0369a1',
                        border: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                  Loading catalog products...
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
                  {filteredProducts.map((p) => {
                    const displaySizes = p.sizes && p.sizes.length > 0 ? p.sizes : [p.dimensions || 'Standard'];

                    return (
                      <div
                        key={p.id}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '18px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: '0 4px 18px rgba(2, 132, 199, 0.05)'
                        }}
                      >
                        <div style={{ position: 'relative', height: '210px', background: '#e2e8f0' }}>
                          <img
                            src={p.mockupImg}
                            alt={p.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.currentTarget.src = '/images/gods/mahalakshmi.jpg'; }}
                          />
                          <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#1e3a8a', color: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                            {p.category}
                          </div>
                          <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#ffffff', padding: '4px 12px', borderRadius: '16px', fontWeight: 900, color: '#0284c7', fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            ₹{p.startingPrice} <span style={{ fontSize: '0.7rem', color: '#64748b' }}>/unit</span>
                          </div>
                        </div>

                        <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <h4
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                              fontWeight: 700,
                              fontSize: '1.14rem',
                              color: '#0f172a',
                              margin: '0 0 6px',
                              lineHeight: 1.3
                            }}
                          >
                            {p.name}
                          </h4>
                          <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '0 0 12px' }}>
                            {p.subtitle}
                          </p>

                          <div style={{ marginBottom: '14px', flex: 1 }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                              Available Sizes ({displaySizes.length}):
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                              {displaySizes.map((s, idx) => (
                                <span key={idx} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', color: '#0369a1', padding: '3px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 600 }}>
                                  📏 {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                            <button
                              onClick={() => handleOpenEdit(p)}
                              style={{
                                flex: 1,
                                background: BLUE_GRADIENT,
                                border: 'none',
                                color: '#ffffff',
                                padding: '9px',
                                borderRadius: '8px',
                                fontSize: '0.82rem',
                                fontWeight: 800,
                                cursor: 'pointer'
                              }}
                            >
                              ✏️ Edit Product
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              style={{
                                background: '#fee2e2',
                                border: '1px solid #fecaca',
                                color: '#dc2626',
                                padding: '9px 12px',
                                borderRadius: '8px',
                                fontSize: '0.82rem',
                                cursor: 'pointer'
                              }}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BULK PRICE & SIZE MATRIX (NO SPINNERS) */}
          {activeTab === 'matrix' && (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(126, 34, 206, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Fast Bulk Matrix Editor
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.84rem', margin: '4px 0 0' }}>
                    Edit product names, wholesale base prices, and sizes inline across all catalog items without spinner arrows.
                  </p>
                </div>
                <button
                  onClick={handleSaveAllMatrix}
                  style={{
                    background: BLUE_GRADIENT,
                    border: 'none',
                    color: '#ffffff',
                    padding: '10px 22px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
                  }}
                >
                  💾 Save All Matrix Changes
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #bae6fd', color: '#0369a1', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                      <th style={{ padding: '10px 12px' }}>Photo</th>
                      <th style={{ padding: '10px 12px' }}>Product Title</th>
                      <th style={{ padding: '10px 12px', width: '140px' }}>Price (₹)</th>
                      <th style={{ padding: '10px 12px' }}>Sizes Manager</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => {
                      const row = matrixData[p.id] || { name: p.name, price: p.startingPrice, sizes: p.sizes || [] };

                      return (
                        <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 12px' }}>
                            <img
                              src={p.mockupImg}
                              alt={p.name}
                              style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #bae6fd' }}
                              onError={(e) => { e.currentTarget.src = '/images/gods/mahalakshmi.jpg'; }}
                            />
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <input
                              type="text"
                              value={row.name}
                              onChange={(e) => handleMatrixFieldChange(p.id, 'name', e.target.value)}
                              style={{
                                width: '100%',
                                background: '#ffffff',
                                border: '1px solid #bae6fd',
                                borderRadius: '8px',
                                padding: '7px 10px',
                                fontSize: '0.94rem',
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontWeight: 700,
                                color: '#0f172a',
                                WebkitTextFillColor: '#0f172a'
                              }}
                            />
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ position: 'relative' }}>
                              <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#0284c7', fontWeight: 800 }}>₹</span>
                              {/* NO SPINNER ARROWS */}
                              <input
                                type="number"
                                min={1}
                                className="no-spinners"
                                value={row.price}
                                onChange={(e) => handleMatrixFieldChange(p.id, 'price', e.target.value)}
                                style={{
                                  width: '100%',
                                  background: '#ffffff',
                                  border: '1px solid #bae6fd',
                                  borderRadius: '8px',
                                  padding: '7px 6px 7px 22px',
                                  fontSize: '0.9rem',
                                  fontWeight: 800,
                                  color: '#0f172a',
                                  WebkitTextFillColor: '#0f172a',
                                  appearance: 'none',
                                  MozAppearance: 'textfield'
                                }}
                              />
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '4px' }}>
                              {row.sizes.map((sz, szIdx) => (
                                <span
                                  key={szIdx}
                                  style={{
                                    background: '#f0f9ff',
                                    border: '1px solid #bae6fd',
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    fontSize: '0.74rem',
                                    color: '#0369a1',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  <span>{sz}</span>
                                  <button
                                    onClick={() => handleMatrixRemoveSize(p.id, szIdx)}
                                    style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', padding: 0, fontWeight: 900 }}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={() => {
                                const customSize = window.prompt(`Enter new size for ${row.name}:`, '15 × 20 in');
                                if (customSize) handleMatrixAddSize(p.id, customSize);
                              }}
                              style={{
                                background: '#ffffff',
                                border: '1px dashed #0284c7',
                                color: '#0284c7',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              + Add Size
                            </button>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                            <button
                              onClick={() => handleSaveMatrixRow(p.id)}
                              style={{
                                background: BLUE_GRADIENT_LIGHT,
                                border: 'none',
                                color: '#ffffff',
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                cursor: 'pointer'
                              }}
                            >
                              Save
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: EDITABLE FACTORY & DISCOUNTS CONFIGURATION */}
          {activeTab === 'discounts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* 1. EDITABLE WHOLESALE DISCOUNT TIERS (NO SPINNERS) */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(126, 34, 206, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      Wholesale Volume Discount Tiers (Fully Editable)
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.84rem', margin: '4px 0 0' }}>
                      Changes saved here immediately update the online Quote Calculator for customers.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={handleAddDiscountTier}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #bae6fd',
                        color: '#0284c7',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      + Add Discount Tier
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveDiscountTiers}
                      style={{
                        background: BLUE_GRADIENT,
                        border: 'none',
                        color: '#ffffff',
                        padding: '8px 20px',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
                      }}
                    >
                      💾 Save Discount Tiers
                    </button>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #bae6fd', color: '#0369a1', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                        <th style={{ padding: '10px 12px' }}>Tier Label</th>
                        <th style={{ padding: '10px 12px', width: '160px' }}>Min Qty (Units)</th>
                        <th style={{ padding: '10px 12px', width: '160px' }}>Max Range Text</th>
                        <th style={{ padding: '10px 12px', width: '160px' }}>Discount (%)</th>
                        <th style={{ padding: '10px 12px', textAlign: 'right', width: '80px' }}>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {discountTiers.map((t) => (
                        <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 12px' }}>
                            <input
                              type="text"
                              value={t.label}
                              onChange={(e) => handleUpdateDiscountTier(t.id, 'label', e.target.value)}
                              style={{
                                width: '100%',
                                background: '#f8fafc',
                                border: '1px solid #bae6fd',
                                borderRadius: '8px',
                                padding: '7px 10px',
                                fontSize: '0.86rem',
                                color: '#0f172a'
                              }}
                            />
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <input
                              type="number"
                              min={1}
                              className="no-spinners"
                              value={t.minQty}
                              onChange={(e) => handleUpdateDiscountTier(t.id, 'minQty', e.target.value)}
                              style={{
                                width: '100%',
                                background: '#f8fafc',
                                border: '1px solid #bae6fd',
                                borderRadius: '8px',
                                padding: '7px 10px',
                                fontSize: '0.88rem',
                                fontWeight: 800,
                                color: '#0f172a',
                                appearance: 'none',
                                MozAppearance: 'textfield'
                              }}
                            />
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <input
                              type="text"
                              value={t.maxQty}
                              onChange={(e) => handleUpdateDiscountTier(t.id, 'maxQty', e.target.value)}
                              style={{
                                width: '100%',
                                background: '#f8fafc',
                                border: '1px solid #bae6fd',
                                borderRadius: '8px',
                                padding: '7px 10px',
                                fontSize: '0.86rem',
                                color: '#0f172a'
                              }}
                            />
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ position: 'relative' }}>
                              <input
                                type="number"
                                min={0}
                                max={100}
                                className="no-spinners"
                                value={t.discountPercentage}
                                onChange={(e) => handleUpdateDiscountTier(t.id, 'discountPercentage', e.target.value)}
                                style={{
                                  width: '100%',
                                  background: '#f8fafc',
                                  border: '1px solid #bae6fd',
                                  borderRadius: '8px',
                                  padding: '7px 24px 7px 10px',
                                  fontSize: '0.9rem',
                                  fontWeight: 900,
                                  color: '#0284c7',
                                  appearance: 'none',
                                  MozAppearance: 'textfield'
                                }}
                              />
                              <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 900, color: '#0284c7' }}>%</span>
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                            <button
                              type="button"
                              onClick={() => handleDeleteDiscountTier(t.id)}
                              style={{
                                background: '#fee2e2',
                                border: '1px solid #fecaca',
                                color: '#dc2626',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                              }}
                              title="Delete Tier"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. EDITABLE FACTORY & LOGISTICS SPECIFICATIONS */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(126, 34, 206, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      Sivakasi Works Factory & Logistics Specifications (Editable)
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.84rem', margin: '4px 0 0' }}>
                      Update factory address, hotline numbers, lead times, and freight carriers.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetFactoryDefaults}
                    style={{
                      background: '#fee2e2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ↺ Reset to Default Factory Specs
                  </button>
                </div>

                <form onSubmit={handleSaveFactorySettings}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Factory Name / Title
                      </label>
                      <input
                        type="text"
                        value={factorySettings.factoryName}
                        onChange={(e) => setFactorySettings({ ...factorySettings, factoryName: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Factory Email Address
                      </label>
                      <input
                        type="email"
                        value={factorySettings.email}
                        onChange={(e) => setFactorySettings({ ...factorySettings, email: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                      Sivakasi Works Full Address
                    </label>
                    <textarea
                      rows={2}
                      value={factorySettings.address}
                      onChange={(e) => setFactorySettings({ ...factorySettings, address: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#f8fafc',
                        border: '1px solid #bae6fd',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        fontSize: '0.88rem',
                        color: '#0f172a',
                        resize: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Factory Hotlines / Phones
                      </label>
                      <input
                        type="text"
                        value={factorySettings.phone}
                        onChange={(e) => setFactorySettings({ ...factorySettings, phone: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Standard Orders Turnaround
                      </label>
                      <input
                        type="text"
                        value={factorySettings.standardLeadTime}
                        onChange={(e) => setFactorySettings({ ...factorySettings, standardLeadTime: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Bulk Lots Turnaround (2000+)
                      </label>
                      <input
                        type="text"
                        value={factorySettings.bulkLeadTime}
                        onChange={(e) => setFactorySettings({ ...factorySettings, bulkLeadTime: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                      Contracted Transport Logistics Carriers
                    </label>
                    <input
                      type="text"
                      value={factorySettings.carriers}
                      onChange={(e) => setFactorySettings({ ...factorySettings, carriers: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#f8fafc',
                        border: '1px solid #bae6fd',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        fontSize: '0.88rem',
                        color: '#0f172a',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="submit"
                      style={{
                        background: BLUE_GRADIENT,
                        border: 'none',
                        color: '#ffffff',
                        padding: '10px 26px',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
                      }}
                    >
                      💾 Save Factory & Logistics Settings
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

          {/* TAB 5: QUOTES & INQUIRIES */}
          {activeTab === 'quotes' && (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(2, 132, 199, 0.05)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>
                Online Quotes & Estimation Requests
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #bae6fd', color: '#0369a1', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                      <th style={{ padding: '10px 12px' }}>Quote ID</th>
                      <th style={{ padding: '10px 12px' }}>Customer / Company</th>
                      <th style={{ padding: '10px 12px' }}>Product</th>
                      <th style={{ padding: '10px 12px' }}>Quantity</th>
                      <th style={{ padding: '10px 12px' }}>Total Price</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(quotesList.length > 0 ? quotesList : SAMPLE_QUOTES).map((q) => (
                      <tr key={q.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 12px', fontWeight: 800, color: '#0284c7' }}>{q.id}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <strong style={{ color: '#0f172a' }}>{q.clientName}</strong>
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{q.company} • {q.phone}</div>
                        </td>
                        <td
                          style={{
                            padding: '10px 12px',
                            color: '#0f172a',
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 700,
                            fontSize: '0.92rem'
                          }}
                        >
                          {q.product}
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 800 }}>{q.quantity} units</td>
                        <td style={{ padding: '10px 12px', fontWeight: 900, color: '#16a34a' }}>₹{q.totalPrice.toLocaleString()}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                          <button
                            onClick={() => {
                              const text = `Hello ${q.clientName},\nRegarding your quote for ${q.quantity} units of ${q.product} (₹${q.totalPrice}): our Sivakasi works can dispatch within 4 business days.`;
                              window.open(`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
                            }}
                            style={{
                              background: '#25D366',
                              border: 'none',
                              color: '#fff',
                              padding: '6px 14px',
                              borderRadius: '8px',
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <WhatsAppIcon size={14} color="#ffffff" />
                            <span>WhatsApp</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS, LOGO & CONTACT DETAILS */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Header Action Card */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '18px',
                  padding: '22px 26px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                  boxShadow: '0 4px 20px rgba(2, 132, 199, 0.05)'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Company Settings, Logo & Contact Details
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.86rem', margin: '4px 0 0' }}>
                    Configure official company branding, upload custom logo, update phone numbers, WhatsApp, emails, and factory address.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={handleResetFactoryDefaults}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #bae6fd',
                      color: '#0369a1',
                      padding: '9px 16px',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Reset Defaults
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAllSettings}
                    style={{
                      background: BLUE_GRADIENT,
                      border: 'none',
                      color: '#ffffff',
                      padding: '10px 24px',
                      borderRadius: '10px',
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
                    }}
                  >
                    💾 Save All Settings
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveAllSettings}>
                {/* 1. BRAND LOGO MANAGER */}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '18px',
                    padding: '24px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 20px rgba(2, 132, 199, 0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '1.3rem' }}>🎨</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Company Logo & Visual Identity
                    </h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px', alignItems: 'center' }}>
                    {/* Logo Preview Box */}
                    <div
                      style={{
                        background: '#f8fafc',
                        border: '2px dashed #bae6fd',
                        borderRadius: '16px',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '160px',
                        textAlign: 'center'
                      }}
                    >
                      {factorySettings.logoUrl ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <img
                            src={factorySettings.logoUrl}
                            alt="Brand Logo Preview"
                            style={{ maxWidth: '180px', maxHeight: '90px', objectFit: 'contain' }}
                          />
                          <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 700, background: '#ecfdf5', padding: '2px 8px', borderRadius: '6px' }}>
                            ✓ Custom Logo Active
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div
                            style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '16px',
                              background: '#f0f9ff',
                              border: '1px dashed #7dd3fc',
                              color: '#0284c7',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.6rem',
                              marginBottom: '8px'
                            }}
                          >
                            🖼️
                          </div>
                          <span style={{ fontSize: '0.82rem', color: '#0369a1', fontWeight: 700 }}>
                            No custom logo set
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            Upload an image below to set your official logo
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Direct Device File Uploader & URL Box */}
                    <div>
                      <div
                        onClick={() => document.getElementById('admin-logo-file-input')?.click()}
                        style={{
                          background: '#f8fafc',
                          border: '2px dashed #a855f7',
                          borderRadius: '14px',
                          padding: '18px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          marginBottom: '12px'
                        }}
                      >
                        <input
                          type="file"
                          id="admin-logo-file-input"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleLogoUpload}
                        />
                        <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>📁</div>
                        <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.92rem' }}>
                          Click to Upload Logo from Your Device
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                          Supports PNG, JPG, SVG, WEBP (Max 5MB) • Transparent PNG recommended
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Or paste direct image URL (e.g. /images/logo.png)"
                          value={factorySettings.logoUrl || ''}
                          onChange={(e) => setFactorySettings({ ...factorySettings, logoUrl: e.target.value })}
                          style={{
                            flex: 1,
                            background: '#f8fafc',
                            border: '1px solid #bae6fd',
                            borderRadius: '8px',
                            padding: '9px 12px',
                            fontSize: '0.84rem',
                            outline: 'none',
                            color: '#0f172a'
                          }}
                        />
                        {factorySettings.logoUrl && (
                          <button
                            type="button"
                            onClick={handleClearLogo}
                            style={{
                              background: '#fee2e2',
                              border: '1px solid #fecaca',
                              color: '#dc2626',
                              padding: '9px 12px',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            Clear Logo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. COMPANY PROFILE & BUSINESS DETAILS */}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '18px',
                    padding: '24px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 20px rgba(126, 34, 206, 0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '1.3rem' }}>🏢</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Company Profile & Business Details
                    </h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Company / Factory Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={factorySettings.factoryName}
                        onChange={(e) => setFactorySettings({ ...factorySettings, factoryName: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Official Website URL
                      </label>
                      <input
                        type="text"
                        value={factorySettings.websiteUrl || 'www.amazingads.in'}
                        onChange={(e) => setFactorySettings({ ...factorySettings, websiteUrl: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        GST Identification Number (GSTIN)
                      </label>
                      <input
                        type="text"
                        value={factorySettings.gstNumber || '33AABCA1234F1Z8'}
                        onChange={(e) => setFactorySettings({ ...factorySettings, gstNumber: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Business Operating Hours
                      </label>
                      <input
                        type="text"
                        value={factorySettings.operatingHours || 'Mon – Sat: 8:30 AM – 8:30 PM IST'}
                        onChange={(e) => setFactorySettings({ ...factorySettings, operatingHours: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                      Brand Tagline / Slogan
                    </label>
                    <input
                      type="text"
                      value={factorySettings.tagline || "India's Premier Manufacturer of PET Foil, 5D Holographic & Stone Art Devotional Calendars"}
                      onChange={(e) => setFactorySettings({ ...factorySettings, tagline: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#f8fafc',
                        border: '1px solid #bae6fd',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        fontSize: '0.88rem',
                        color: '#0f172a',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* 3. CONTACT DETAILS & CUSTOMER HOTLINES */}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '18px',
                    padding: '24px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 20px rgba(126, 34, 206, 0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '1.3rem' }}>📞</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Contact Details & Customer Hotlines
                    </h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Primary Factory Hotline Phone *
                      </label>
                      <input
                        type="text"
                        required
                        value={factorySettings.phone}
                        onChange={(e) => setFactorySettings({ ...factorySettings, phone: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Secondary Phone / Office Line
                      </label>
                      <input
                        type="text"
                        value={factorySettings.secondaryPhone || '+91 97904 27670'}
                        onChange={(e) => setFactorySettings({ ...factorySettings, secondaryPhone: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Official WhatsApp Business Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={factorySettings.whatsapp}
                        onChange={(e) => setFactorySettings({ ...factorySettings, whatsapp: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Primary Customer Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={factorySettings.email}
                        onChange={(e) => setFactorySettings({ ...factorySettings, email: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Quotation / Sales Support Email
                      </label>
                      <input
                        type="email"
                        value={factorySettings.supportEmail || 'sales@amazingads.in'}
                        onChange={(e) => setFactorySettings({ ...factorySettings, supportEmail: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                      Factory Hub & Physical Address *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={factorySettings.address}
                      onChange={(e) => setFactorySettings({ ...factorySettings, address: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#f8fafc',
                        border: '1px solid #bae6fd',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        fontSize: '0.88rem',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* 4. TURNAROUND & LOGISTICS */}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '18px',
                    padding: '24px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 20px rgba(126, 34, 206, 0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '1.3rem' }}>🚚</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Production Turnarounds & Freight Logistics
                    </h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Standard Order Turnaround Time
                      </label>
                      <input
                        type="text"
                        value={factorySettings.standardLeadTime}
                        onChange={(e) => setFactorySettings({ ...factorySettings, standardLeadTime: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                        Bulk / Mega Lot Turnaround (2,000+ units)
                      </label>
                      <input
                        type="text"
                        value={factorySettings.bulkLeadTime}
                        onChange={(e) => setFactorySettings({ ...factorySettings, bulkLeadTime: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#f8fafc',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                      Contracted Transport Logistics Carriers
                    </label>
                    <input
                      type="text"
                      value={factorySettings.carriers}
                      onChange={(e) => setFactorySettings({ ...factorySettings, carriers: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#f8fafc',
                        border: '1px solid #bae6fd',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        fontSize: '0.88rem',
                        color: '#0f172a',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Save Button Bar */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingBottom: '30px' }}>
                  <button
                    type="button"
                    onClick={handleResetFactoryDefaults}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #bae6fd',
                      color: '#0369a1',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Reset All Defaults
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: BLUE_GRADIENT,
                      border: 'none',
                      color: '#ffffff',
                      padding: '12px 32px',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4)'
                    }}
                  >
                    💾 Save All Settings & Contact Details
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* C. EDIT / CREATE PRODUCT MODAL (WITH IMAGE UPLOAD & NO SPINNERS) */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflowY: 'auto'
          }}
          onClick={handleCloseModal}
        >
          <div
            className="admin-modal"
            style={{
              background: '#ffffff',
              border: '1px solid #bae6fd',
              borderRadius: '22px',
              width: '100%',
              maxWidth: '740px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px -12px rgba(2, 132, 199, 0.35)',
              padding: '26px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
              <div>
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#0f172a',
                    margin: 0
                  }}
                >
                  {isEditing ? `Edit: ${formData.name}` : 'Add New Calendar Edition'}
                </h3>
                <p style={{ color: '#0284c7', fontSize: '0.82rem', margin: '3px 0 0', fontWeight: 600 }}>
                  Upload image, configure product name, starting price without spinners, sizes, and specs.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.6rem',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              {/* Product Name & Starting Price (NO SPINNERS) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '6px' }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Gold / Silver PET Foil Calendar"
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #bae6fd',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#0f172a',
                      WebkitTextFillColor: '#0f172a',
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: '0.96rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '6px' }}>
                    Starting Price (₹) * (No Spinners)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#0284c7', fontWeight: 900 }}>₹</span>
                    {/* NO INCREASE/DECREASE SPINNERS */}
                    <input
                      type="number"
                      required
                      min={1}
                      className="no-spinners"
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        background: '#ffffff',
                        border: '1px solid #bae6fd',
                        borderRadius: '8px',
                        padding: '10px 10px 10px 24px',
                        color: '#0f172a',
                        WebkitTextFillColor: '#0f172a',
                        fontSize: '0.95rem',
                        fontWeight: 900,
                        outline: 'none',
                        boxSizing: 'border-box',
                        appearance: 'none',
                        MozAppearance: 'textfield'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Category & Tag */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #bae6fd',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      color: '#0f172a',
                      WebkitTextFillColor: '#0f172a',
                      fontSize: '0.86rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #bae6fd',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      color: '#0f172a',
                      WebkitTextFillColor: '#0f172a',
                      fontSize: '0.86rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* SIZES MANAGEMENT */}
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '14px', padding: '16px', marginBottom: '18px' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0c4a6e', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Available Sizes Manager *
                </span>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px', minHeight: '36px', background: '#ffffff', padding: '8px', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                  {formData.sizes && formData.sizes.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#e0f2fe',
                        border: '1px solid #bae6fd',
                        color: '#0369a1',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>📏 {s}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(idx)}
                        style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontWeight: 900, fontSize: '0.9rem', padding: 0 }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={newSizeInput}
                    onChange={(e) => setNewSizeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSize();
                      }
                    }}
                    placeholder="Type custom size (e.g. 15 × 20 inches / Royal Mandir)"
                    style={{
                      flex: 1,
                      background: '#ffffff',
                      border: '1px solid #7dd3fc',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '0.86rem',
                      color: '#0f172a',
                      WebkitTextFillColor: '#0f172a',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSize()}
                    style={{
                      background: BLUE_GRADIENT,
                      border: 'none',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    + Add Size
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {SIZE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddSize(preset)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #bae6fd',
                        color: '#0369a1',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* ADMIN IMAGE UPLOAD FROM DEVICE & PRESETS (Requested Feature) */}
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '14px', padding: '16px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0c4a6e' }}>
                    Product Mockup Image (Upload from Device or Select Preset)
                  </span>
                  {uploadedFileName && (
                    <span style={{ fontSize: '0.74rem', background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                      ✓ Uploaded: {uploadedFileName}
                    </span>
                  )}
                </div>

                {/* Direct File Uploader Box */}
                <div
                  style={{
                    border: '2px dashed #38bdf8',
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '14px',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('admin-file-upload-input')?.click()}
                >
                  <input
                    type="file"
                    id="admin-file-upload-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageFileUpload}
                  />
                  <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>📁</div>
                  <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.9rem' }}>
                    Click to Upload Product Image from Your Computer / Phone
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                    Auto-optimized via canvas compression for fast storage (Max 8MB)
                  </div>
                </div>

                {/* Preview and URL Input */}
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '14px', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #0284c7', background: '#f8fafc' }}>
                    <img
                      src={formData.mockupImg}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.src = '/images/gods/mahalakshmi.jpg'; }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '3px' }}>
                      Or Image File Path / Web URL:
                    </label>
                    <input
                      type="text"
                      value={formData.mockupImg}
                      onChange={(e) => {
                        setFormData({ ...formData, mockupImg: e.target.value });
                        setUploadedFileName(null);
                      }}
                      placeholder="/images/stone-art-calendar-real.jpg"
                      style={{
                        width: '100%',
                        background: '#ffffff',
                        border: '1px solid #bae6fd',
                        borderRadius: '8px',
                        padding: '8px 10px',
                        fontSize: '0.84rem',
                        color: '#0f172a',
                        WebkitTextFillColor: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Artwork Presets */}
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    Quick Select Artwork Presets:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {IMAGE_PRESETS.map((ip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, mockupImg: ip.url });
                          setUploadedFileName(null);
                        }}
                        style={{
                          background: formData.mockupImg === ip.url ? BLUE_GRADIENT : '#ffffff',
                          color: formData.mockupImg === ip.url ? '#ffffff' : '#334155',
                          border: `1px solid ${formData.mockupImg === ip.url ? '#0284c7' : '#bae6fd'}`,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {ip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '4px' }}>
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #bae6fd',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.86rem',
                    color: '#0f172a',
                    WebkitTextFillColor: '#0f172a',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#475569',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: BLUE_GRADIENT,
                    border: 'none',
                    color: '#ffffff',
                    padding: '9px 24px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
                  }}
                >
                  {isEditing ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
