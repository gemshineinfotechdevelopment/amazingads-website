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
  deleteCustomerMessage,
  saveStoredFactoryDiscounts,
  getStoredFactorySettings,
  saveStoredFactorySettings,
  fetchFactorySettings,
  saveFactorySettingsToBackend,
  fetchQuotes,
  fetchInquiries,
  fetchSampleKits,
  DEFAULT_DISCOUNT_TIERS,
  DEFAULT_FACTORY_SETTINGS,
  type CalendarProduct,
  type CustomerMessage,
  type FactorySettings,
  type StoredQuote,
  type StoredInquiry,
  type StoredSampleKit
} from '../services/api';

type AdminTab = 'messages' | 'catalog' | 'matrix' | 'quotes' | 'settings';

// Inquiry and Lead Message Icon
const InquiryIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
  const [matrixData, setMatrixData] = useState<Record<string, {
    name: string;
    price: number;
    sizes: string[];
    sizePrices: Record<string, number>;
  }>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Customer Inquiries & Form Messages
  const [messages, setMessages] = useState<CustomerMessage[]>([]);
  // Online Quotes, Corporate Inquiries & Swatch Kits
  const [quotesList, setQuotesList] = useState<StoredQuote[]>([]);
  const [inquiriesList, setInquiriesList] = useState<StoredInquiry[]>([]);
  const [sampleKitsList, setSampleKitsList] = useState<StoredSampleKit[]>([]);
  const [leadsSubTab, setLeadsSubTab] = useState<'quotes' | 'inquiries' | 'sampleKits'>('quotes');

  // Editable Factory Settings State
  const [factorySettings, setFactorySettings] = useState<FactorySettings>(getStoredFactorySettings());

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CalendarProduct>(INITIAL_FORM_STATE);
  const [newSizeInput, setNewSizeInput] = useState('');
  const [newSizePriceInput, setNewSizePriceInput] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Load Products, Messages, Quotes, Inquiries, Kits & Settings
  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, msgs, quotes, settings, inqs, kits] = await Promise.all([
        getCalendarProducts(),
        fetchCustomerMessages(),
        fetchQuotes(),
        fetchFactorySettings(),
        fetchInquiries(),
        fetchSampleKits()
      ]);
      setProducts(prods);
      setMessages(msgs);
      if (quotes && quotes.length > 0) setQuotesList(quotes);
      if (settings) setFactorySettings(settings);
      if (inqs && inqs.length > 0) setInquiriesList(inqs);
      if (kits && kits.length > 0) setSampleKitsList(kits);

      // Initialize matrix data with frame-size-specific pricing
      const matrixInit: Record<string, { name: string; price: number; sizes: string[]; sizePrices: Record<string, number> }> = {};
      prods.forEach(p => {
        const szs = p.sizes && p.sizes.length > 0 ? [...p.sizes] : [p.dimensions || 'Standard Size'];
        const sp: Record<string, number> = {};
        szs.forEach(s => {
          sp[s] = p.sizePrices?.[s] ?? p.startingPrice;
        });
        matrixInit[p.id] = {
          name: p.name,
          price: p.startingPrice,
          sizes: szs,
          sizePrices: sp
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
      fetchQuotes().then((q) => { if (q && q.length > 0) setQuotesList(q); });
      fetchInquiries().then((inq) => { if (inq && inq.length > 0) setInquiriesList(inq); });
      fetchSampleKits().then((kit) => { if (kit && kit.length > 0) setSampleKitsList(kit); });
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
    
    // Build initial sizePrices map
    const existingSizePrices: Record<string, number> = {};
    existingSizes.forEach(s => {
      existingSizePrices[s] = product.sizePrices?.[s] ?? product.startingPrice;
    });

    setFormData({
      ...product,
      sizes: [...existingSizes],
      sizePrices: existingSizePrices
    });
    setNewSizeInput('');
    setNewSizePriceInput('');
    setUploadedFileName(null);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    const defaultSizes = ['12 × 18 in', '15 × 20 in', '17 × 27 in'];
    const defaultSizePrices: Record<string, number> = {
      '12 × 18 in': 125,
      '15 × 20 in': 145,
      '17 × 27 in': 210
    };

    setFormData({
      ...INITIAL_FORM_STATE,
      id: `product-${Date.now()}`,
      sizes: defaultSizes,
      sizePrices: defaultSizePrices,
      startingPrice: 125
    });
    setNewSizeInput('');
    setNewSizePriceInput('');
    setUploadedFileName(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewSizeInput('');
    setNewSizePriceInput('');
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

  const handleAddSize = (sizeToAdd?: string, priceToAdd?: number) => {
    const size = (sizeToAdd || newSizeInput).trim();
    if (!size) return;
    if (formData.sizes && formData.sizes.includes(size)) {
      showToast('This size is already in the list', 'info');
      return;
    }
    const price = priceToAdd || (newSizePriceInput ? Number(newSizePriceInput) : formData.startingPrice);
    const updatedSizes = [...(formData.sizes || []), size];
    const updatedSizePrices = { ...(formData.sizePrices || {}), [size]: Math.max(1, price) };
    setFormData({ ...formData, sizes: updatedSizes, sizePrices: updatedSizePrices });
    if (!sizeToAdd) {
      setNewSizeInput('');
      setNewSizePriceInput('');
    }
  };

  const handleUpdateSizePrice = (sizeName: string, price: number) => {
    const updatedSizePrices = { ...(formData.sizePrices || {}), [sizeName]: Math.max(1, price) };
    setFormData({ ...formData, sizePrices: updatedSizePrices });
  };

  const handleRemoveSize = (indexToRemove: number) => {
    const sizeToRemove = formData.sizes?.[indexToRemove];
    const updatedSizes = (formData.sizes || []).filter((_, i) => i !== indexToRemove);
    const updatedSizePrices = { ...(formData.sizePrices || {}) };
    if (sizeToRemove) {
      delete updatedSizePrices[sizeToRemove];
    }
    setFormData({ ...formData, sizes: updatedSizes, sizePrices: updatedSizePrices });
  };

  const handleSaveProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Product name is required', 'error');
      return;
    }
    if (!formData.sizes || formData.sizes.length === 0) {
      showToast('Please add at least one frame size and price', 'error');
      return;
    }

    const firstSize = formData.sizes[0];
    const computedPrice = (firstSize && formData.sizePrices?.[firstSize]) ? formData.sizePrices[firstSize] : (formData.startingPrice || 125);
    
    const payloadToSave: CalendarProduct = {
      ...formData,
      startingPrice: computedPrice,
      category: formData.category ? formData.category.trim() : 'Devotional Calendars',
      tag: formData.category ? formData.category.trim() : 'Wholesale',
      subtitle: formData.subtitle || `${formData.name} - Sivakasi Direct Factory Works`,
      description: formData.description || `${formData.name} direct wholesale manufacture with custom corporate crest and high-definition embellishments.`,
      features: formData.features && formData.features.length > 0 ? formData.features : ['Direct Sivakasi Factory Pressing', 'High Quality Frame Finish', 'Priority Courier Dispatch'],
      dimensions: firstSize || '15 × 20 in',
      mockupImg: formData.mockupImg || '/images/gods/mahalakshmi.jpg'
    };

    try {
      if (isEditing) {
        await updateCalendarProduct(payloadToSave.id, payloadToSave);
        showToast(`Product "${payloadToSave.name}" updated successfully!`);
      } else {
        await createCalendarProduct(payloadToSave);
        showToast(`New product "${payloadToSave.name}" created successfully!`);
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

  // Matrix Quick Updates with Frame Size-Wise Pricing
  const handleMatrixFieldChange = (productId: string, field: 'name' | 'price', value: string | number) => {
    setMatrixData(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: field === 'price' ? Math.max(1, Number(value)) : value
      }
    }));
  };

  const handleMatrixSizePriceChange = (productId: string, sizeName: string, price: number) => {
    setMatrixData(prev => {
      const current = prev[productId];
      if (!current) return prev;
      const updatedSizePrices = {
        ...current.sizePrices,
        [sizeName]: Math.max(1, Number(price) || 1)
      };
      return {
        ...prev,
        [productId]: {
          ...current,
          sizePrices: updatedSizePrices
        }
      };
    });
  };

  const handleMatrixRemoveSize = (productId: string, sizeIdx: number) => {
    setMatrixData(prev => {
      const current = prev[productId];
      if (!current) return prev;
      const sizeToRemove = current.sizes[sizeIdx];
      const updatedSizes = current.sizes.filter((_, idx) => idx !== sizeIdx);
      const updatedSizePrices = { ...current.sizePrices };
      if (sizeToRemove) {
        delete updatedSizePrices[sizeToRemove];
      }
      return {
        ...prev,
        [productId]: {
          ...current,
          sizes: updatedSizes,
          sizePrices: updatedSizePrices
        }
      };
    });
  };

  const handleMatrixAddSize = (productId: string, newSize: string, price?: number) => {
    const trimmed = newSize.trim();
    if (!trimmed) return;
    setMatrixData(prev => {
      const current = prev[productId];
      if (!current || current.sizes.includes(trimmed)) return prev;
      const sizePrice = price && price > 0 ? price : current.price;
      return {
        ...prev,
        [productId]: {
          ...current,
          sizes: [...current.sizes, trimmed],
          sizePrices: {
            ...current.sizePrices,
            [trimmed]: sizePrice
          }
        }
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
        sizes: row.sizes,
        sizePrices: row.sizePrices
      });
      showToast(`Updated "${row.name}" with Price ₹${row.price} and ${row.sizes.length} frame size rates.`);
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
          sizes: row.sizes,
          sizePrices: row.sizePrices
        });
      }
      showToast('All products, frame size rates, and matrix changes saved successfully!');
      await loadData();
    } catch {
      showToast('Failed to save all matrix rows', 'error');
    }
  };

  // Customer Inquiries Message Actions
  const handleToggleMessageStatus = async (msg: CustomerMessage) => {
    const nextStatus: 'New' | 'Replied' = msg.status === 'New' ? 'Replied' : 'New';
    await updateMessageStatus(msg.id, nextStatus);
    const updated: CustomerMessage[] = messages.map(m => m.id === msg.id ? { ...m, status: nextStatus } : m);
    setMessages(updated);
    showToast(`Inquiry marked as ${nextStatus}`);
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (window.confirm('Are you sure you want to remove this inquiry?')) {
      await deleteCustomerMessage(msgId);
      setMessages(prev => prev.filter(m => m.id !== msgId));
      showToast('Inquiry deleted successfully');
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

  const handleSaveAllSettings = async (e: FormEvent) => {
    e.preventDefault();
    saveStoredFactorySettings(factorySettings);
    try {
      await saveFactorySettingsToBackend(factorySettings);
    } catch {}
    showToast('Company settings, contact details & logo saved successfully!');
  };

  const handleResetFactoryDefaults = () => {
    if (window.confirm('Reset all factory details, logo, contact numbers and discount tiers back to Sivakasi factory defaults?')) {
      saveStoredFactoryDiscounts([...DEFAULT_DISCOUNT_TIERS]);
      setFactorySettings({ ...DEFAULT_FACTORY_SETTINGS });
      saveStoredFactorySettings({ ...DEFAULT_FACTORY_SETTINGS });
      showToast('Factory specifications and company settings restored to defaults.');
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
          fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif"
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
            <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#ffffff', margin: '0 0 6px', letterSpacing: '0.02em', fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif" }}>
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
        fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif",
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
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff', letterSpacing: '0.02em', lineHeight: 1.2, fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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

          {/* 1. CUSTOMER INQUIRIES */}
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
              <InquiryIcon size={18} color={activeTab === 'messages' ? '#ffffff' : '#0284c7'} />
              <span>Customer Inquiries</span>
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
              <span>Quotes & Leads</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: activeTab === 'quotes' ? '#bae6fd' : '#64748b' }}>
              {(quotesList.length > 0 ? quotesList : SAMPLE_QUOTES).length + inquiriesList.length + sampleKitsList.length}
            </span>
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
                Admin Portal / {activeTab === 'messages' ? 'Customer Inquiries' : activeTab === 'catalog' ? 'Products & Catalog' : activeTab === 'matrix' ? 'Price & Size Matrix' : activeTab === 'quotes' ? 'Quotes & Online Estimates' : 'Settings & Contact Details'}
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif" }}>
                {activeTab === 'messages' && 'Customer Inquiries & Form Submissions'}
                {activeTab === 'catalog' && 'Product Specifications & Catalog Management'}
                {activeTab === 'matrix' && 'Quick Price & Size Bulk Matrix'}
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

          {/* TAB 1: CUSTOMER INQUIRIES & FORM SUBMISSIONS */}
          {activeTab === 'messages' && (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(2, 132, 199, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-sans)' }}>
                    <InquiryIcon size={24} color="#0284c7" />
                    <span>Customer Inquiries ({messages.length})</span>
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.84rem', margin: '4px 0 0' }}>
                    Inquiries submitted via Website Contact Form, Customizer Orders, Cart Drawer, and Sample Kit Requests appear here live.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '4px 12px', borderRadius: '14px', fontSize: '0.76rem', fontWeight: 700 }}>
                    {unreadMessagesCount} New Inquiries
                  </span>
                </div>
              </div>

              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
                  No customer inquiries received yet. When visitors submit forms on the public website, they appear here live!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        background: msg.status === 'New' ? '#f0f9ff' : '#ffffff',
                        border: `1px solid ${msg.status === 'New' ? '#7dd3fc' : '#e2e8f0'}`,
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.04rem' }}>
                            {msg.name}
                          </span>
                          <a
                            href={`tel:${msg.phone}`}
                            style={{
                              fontSize: '0.86rem',
                              color: '#0284c7',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            📞 {msg.phone}
                          </a>
                          {msg.email && (
                            <a
                              href={`mailto:${msg.email}`}
                              style={{
                                fontSize: '0.82rem',
                                color: '#0369a1',
                                fontWeight: 600,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              ✉️ {msg.email}
                            </a>
                          )}
                          <span
                            style={{
                              background: msg.status === 'New' ? '#0284c7' : '#94a3b8',
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

                        {/* Order / Product Specifications if provided */}
                        {(msg.product || msg.size || msg.quantity) && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '6px 0 10px' }}>
                            {msg.product && (
                              <span style={{ background: '#e0f2fe', border: '1px solid #bae6fd', color: '#0369a1', borderRadius: '6px', padding: '2px 8px', fontSize: '0.76rem', fontWeight: 700 }}>
                                📦 {msg.product}
                              </span>
                            )}
                            {msg.size && (
                              <span style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', borderRadius: '6px', padding: '2px 8px', fontSize: '0.76rem', fontWeight: 700 }}>
                                📏 Frame Size: {msg.size}
                              </span>
                            )}
                            {msg.quantity && (
                              <span style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', borderRadius: '6px', padding: '2px 8px', fontSize: '0.76rem', fontWeight: 700 }}>
                                🔢 Qty: {Number(msg.quantity).toLocaleString()} units
                              </span>
                            )}
                          </div>
                        )}

                        <div
                          style={{
                            background: '#ffffff',
                            border: '1px solid #bae6fd',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            color: '#1e293b',
                            fontSize: '0.9rem',
                            lineHeight: 1.5,
                            marginBottom: '6px',
                            whiteSpace: 'pre-line'
                          }}
                        >
                          {msg.message}
                        </div>

                        {msg.notes && (
                          <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginBottom: '6px' }}>
                            📝 Additional Details: {msg.notes}
                          </div>
                        )}

                        <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                          Received: {new Date(msg.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {msg.email && (
                          <a
                            href={`mailto:${msg.email}`}
                            style={{
                              background: '#ffffff',
                              border: '1px solid #0284c7',
                              color: '#0284c7',
                              padding: '8px 14px',
                              borderRadius: '10px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>✉️ Email</span>
                          </a>
                        )}

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

                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          style={{
                            background: '#fee2e2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '9px 12px',
                            borderRadius: '10px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                          title="Delete Inquiry"
                        >
                          🗑️
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
                              fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif",
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

          {/* TAB 3: BULK PRICE & FRAME SIZE MATRIX */}
          {activeTab === 'matrix' && (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(126, 34, 206, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Fast Bulk Matrix & Frame Size Pricing
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.84rem', margin: '4px 0 0' }}>
                    Edit product titles, base starting rates, and individual prices for each frame size inline without spinner arrows.
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
                      <th style={{ padding: '10px 12px', minWidth: '180px' }}>Product Title</th>
                      <th style={{ padding: '10px 12px', width: '120px' }}>Base Rate (₹)</th>
                      <th style={{ padding: '10px 12px', minWidth: '380px' }}>Frame Sizes & Size-Wise Prices (₹)</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => {
                      const row = matrixData[p.id] || {
                        name: p.name,
                        price: p.startingPrice,
                        sizes: p.sizes || [],
                        sizePrices: p.sizePrices || {}
                      };

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
                                fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                                fontWeight: 700,
                                color: '#0f172a',
                                WebkitTextFillColor: '#0f172a'
                              }}
                            />
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ position: 'relative' }}>
                              <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#0284c7', fontWeight: 800 }}>₹</span>
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
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                              {row.sizes.map((sz, szIdx) => {
                                const sizePrice = row.sizePrices?.[sz] ?? row.price;
                                return (
                                  <div
                                    key={szIdx}
                                    style={{
                                      background: '#f0f9ff',
                                      border: '1px solid #bae6fd',
                                      borderRadius: '8px',
                                      padding: '4px 8px',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '6px'
                                    }}
                                  >
                                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0369a1' }}>
                                      {sz}:
                                    </span>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', background: '#ffffff', borderRadius: '5px', border: '1px solid #7dd3fc', padding: '1px 4px' }}>
                                      <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 800 }}>₹</span>
                                      <input
                                        type="number"
                                        min={1}
                                        className="no-spinners"
                                        value={sizePrice}
                                        onChange={(e) => handleMatrixSizePriceChange(p.id, sz, Number(e.target.value))}
                                        style={{
                                          width: '52px',
                                          border: 'none',
                                          background: 'transparent',
                                          fontSize: '0.8rem',
                                          fontWeight: 800,
                                          color: '#0f172a',
                                          textAlign: 'center',
                                          padding: '2px 0'
                                        }}
                                      />
                                    </div>
                                    <button
                                      onClick={() => handleMatrixRemoveSize(p.id, szIdx)}
                                      style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', padding: 0, fontWeight: 900, fontSize: '0.9rem' }}
                                      title="Remove size"
                                    >
                                      ×
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                            <button
                              onClick={() => {
                                const customSize = window.prompt(`Enter frame size for "${row.name}" (e.g. 15 × 20 in):`, '15 × 20 in');
                                if (customSize) {
                                  const customPriceStr = window.prompt(`Enter wholesale price (₹) for "${customSize}":`, String(row.price));
                                  const customPrice = customPriceStr ? Number(customPriceStr) : row.price;
                                  handleMatrixAddSize(p.id, customSize, customPrice);
                                }
                              }}
                              style={{
                                background: '#ffffff',
                                border: '1px dashed #0284c7',
                                color: '#0284c7',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <span>+ Add Frame Size & Price</span>
                            </button>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                            <button
                              onClick={() => handleSaveMatrixRow(p.id)}
                              style={{
                                background: BLUE_GRADIENT_LIGHT,
                                border: 'none',
                                color: '#ffffff',
                                padding: '7px 16px',
                                borderRadius: '8px',
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





          {/* TAB 5: QUOTES & LEADS */}
          {activeTab === 'quotes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Sub-navigation Pills */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', background: '#ffffff', padding: '12px 16px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <button
                  type="button"
                  onClick={() => setLeadsSubTab('quotes')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    background: leadsSubTab === 'quotes' ? BLUE_GRADIENT : '#f1f5f9',
                    color: leadsSubTab === 'quotes' ? '#ffffff' : '#475569',
                    boxShadow: leadsSubTab === 'quotes' ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📋 Online Quotes ({(quotesList.length > 0 ? quotesList : SAMPLE_QUOTES).length})
                </button>
                <button
                  type="button"
                  onClick={() => setLeadsSubTab('inquiries')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    background: leadsSubTab === 'inquiries' ? BLUE_GRADIENT : '#f1f5f9',
                    color: leadsSubTab === 'inquiries' ? '#ffffff' : '#475569',
                    boxShadow: leadsSubTab === 'inquiries' ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  🏢 Corporate & Contact Inquiries ({inquiriesList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setLeadsSubTab('sampleKits')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    background: leadsSubTab === 'sampleKits' ? BLUE_GRADIENT : '#f1f5f9',
                    color: leadsSubTab === 'sampleKits' ? '#ffffff' : '#475569',
                    boxShadow: leadsSubTab === 'sampleKits' ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📦 Master Swatch Kits ({sampleKitsList.length})
                </button>
              </div>

              {/* Sub-view 1: Online Quotes */}
              {leadsSubTab === 'quotes' && (
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(2, 132, 199, 0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      Online Quotes & Estimation Requests
                    </h3>
                    <button
                      onClick={() => fetchQuotes().then((q) => { if (q && q.length > 0) setQuotesList(q); showToast('Quotes refreshed from backend'); })}
                      style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      🔄 Refresh
                    </button>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #bae6fd', color: '#0369a1', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                          <th style={{ padding: '10px 12px' }}>Quote ID</th>
                          <th style={{ padding: '10px 12px' }}>Customer / Company</th>
                          <th style={{ padding: '10px 12px' }}>Product</th>
                          <th style={{ padding: '10px 12px' }}>Quantity</th>
                          <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Price</th>
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
                                fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                                fontWeight: 700,
                                fontSize: '0.92rem'
                              }}
                            >
                              {q.product}
                            </td>
                            <td style={{ padding: '10px 12px', fontWeight: 800 }}>{q.quantity} units</td>
                            <td style={{ padding: '10px 12px', fontWeight: 900, color: '#16a34a', textAlign: 'right' }}>₹{q.totalPrice.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sub-view 2: Corporate & Contact Inquiries */}
              {leadsSubTab === 'inquiries' && (
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(2, 132, 199, 0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      Corporate Bulk & Contact Inquiries ({inquiriesList.length})
                    </h3>
                    <button
                      onClick={() => fetchInquiries().then((inq) => { if (inq) setInquiriesList(inq); showToast('Inquiries refreshed from backend'); })}
                      style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      🔄 Refresh
                    </button>
                  </div>

                  {inquiriesList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                      <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>🏢</span>
                      <p style={{ fontWeight: 600 }}>No corporate inquiries received yet.</p>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Corporate leads from /corporate and /contact will appear here automatically.</p>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc', borderBottom: '2px solid #bae6fd', color: '#0369a1', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                            <th style={{ padding: '10px 12px' }}>Inquiry ID</th>
                            <th style={{ padding: '10px 12px' }}>Client / Company</th>
                            <th style={{ padding: '10px 12px' }}>Quantity & Target</th>
                            <th style={{ padding: '10px 12px' }}>Message Details</th>
                            <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiriesList.map((inq) => (
                            <tr key={inq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '10px 12px', fontWeight: 800, color: '#0284c7' }}>
                                {inq.inquiryId}
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                                  {inq.receivedAt ? new Date(inq.receivedAt).toLocaleDateString() : 'Recent'}
                                </div>
                              </td>
                              <td style={{ padding: '10px 12px' }}>
                                <strong style={{ color: '#0f172a' }}>{inq.name}</strong>
                                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                                  {inq.company} • {inq.email}
                                </div>
                                {inq.phone && inq.phone !== 'N/A' && (
                                  <div style={{ fontSize: '0.74rem', color: '#0284c7', fontWeight: 600 }}>
                                    Ph: {inq.phone}
                                  </div>
                                )}
                              </td>
                              <td style={{ padding: '10px 12px' }}>
                                <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                                  {inq.quantityNeeded}
                                </span>
                                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
                                  Target: {inq.targetDate}
                                </div>
                              </td>
                              <td style={{ padding: '10px 12px', maxWidth: '300px' }}>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#334155', lineHeight: '1.4', whiteSpace: 'pre-line' }}>
                                  {inq.message}
                                </p>
                              </td>
                              <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                  {inq.email && (
                                    <a
                                      href={`mailto:${inq.email}?subject=Amazing Ads Quotation - ${inq.inquiryId}`}
                                      style={{
                                        background: '#f1f5f9',
                                        color: '#334155',
                                        padding: '6px 10px',
                                        borderRadius: '8px',
                                        fontSize: '0.76rem',
                                        fontWeight: 600,
                                        textDecoration: 'none'
                                      }}
                                    >
                                      ✉️ Email
                                    </a>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Sub-view 3: Master Swatch Kits */}
              {leadsSubTab === 'sampleKits' && (
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 20px rgba(2, 132, 199, 0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      Master Swatch Kit Dispatches ({sampleKitsList.length})
                    </h3>
                    <button
                      onClick={() => fetchSampleKits().then((kit) => { if (kit) setSampleKitsList(kit); showToast('Sample kits refreshed from backend'); })}
                      style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      🔄 Refresh
                    </button>
                  </div>

                  {sampleKitsList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                      <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>📦</span>
                      <p style={{ fontWeight: 600 }}>No sample kit requests received yet.</p>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Requests from the 'Request Free Swatch Kit' modal will appear here with delivery details.</p>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc', borderBottom: '2px solid #bae6fd', color: '#0369a1', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                            <th style={{ padding: '10px 12px' }}>Tracking ID</th>
                            <th style={{ padding: '10px 12px' }}>Recipient & Organization</th>
                            <th style={{ padding: '10px 12px' }}>Shipping Address</th>
                            <th style={{ padding: '10px 12px' }}>Preferred Styles</th>
                            <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleKitsList.map((kit) => (
                            <tr key={kit.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '10px 12px', fontWeight: 800, color: '#0284c7' }}>
                                {kit.sampleId}
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                                  {kit.requestedAt ? new Date(kit.requestedAt).toLocaleDateString() : 'Recent'}
                                </div>
                              </td>
                              <td style={{ padding: '10px 12px' }}>
                                <strong style={{ color: '#0f172a' }}>{kit.name}</strong>
                                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                                  {kit.company} • {kit.email}
                                </div>
                                {kit.phone && kit.phone !== 'N/A' && (
                                  <div style={{ fontSize: '0.74rem', color: '#0284c7', fontWeight: 600 }}>
                                    Ph: {kit.phone}
                                  </div>
                                )}
                              </td>
                              <td style={{ padding: '10px 12px', maxWidth: '240px', fontSize: '0.78rem', color: '#334155' }}>
                                {kit.shippingAddress}
                              </td>
                              <td style={{ padding: '10px 12px' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                  {kit.preferredStyles.map((style, idx) => (
                                    <span key={idx} style={{ background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600 }}>
                                      {style}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                                <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                                  {kit.status}
                                </span>
                                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
                                  Est: {kit.estimatedDeliveryDays}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
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
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif" }}>
                    Company Settings, Logo & Contact Details
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.86rem', margin: '4px 0 0' }}>
                    Configure official company branding, upload custom logo, update phone numbers, emails, and factory address.
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
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif" }}>
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
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif" }}>
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
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif" }}>
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
                        Factory Helpline / Secondary Phone *
                      </label>
                      <input
                        type="text"
                        required
                        value={factorySettings.secondaryPhone || factorySettings.whatsapp || '+91 97904 27670'}
                        onChange={(e) => setFactorySettings({
                          ...factorySettings,
                          secondaryPhone: e.target.value,
                          whatsapp: e.target.value
                        })}
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
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif" }}>
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
                    fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                    color: '#0f172a',
                    margin: 0
                  }}
                >
                  {isEditing ? `Edit: ${formData.name}` : 'Add New Calendar Edition'}
                </h3>
                <p style={{ color: '#0284c7', fontSize: '0.82rem', margin: '3px 0 0', fontWeight: 600 }}>
                  Enter product name, category, frame size rates, and upload image from your device.
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
              {/* 1. PRODUCT NAME */}
              <div style={{ marginBottom: '16px' }}>
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
                    fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    fontSize: '0.96rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* 2. CATEGORY */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0c4a6e', marginBottom: '6px' }}>
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Devotional Calendars / Premium Foils / 5D Holographic"
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #bae6fd',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#0f172a',
                    WebkitTextFillColor: '#0f172a',
                    fontSize: '0.88rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* 3. FRAME SIZES & SPECIFIC RATES MANAGER * (WITHOUT QUICK PRESETS) */}
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '14px', padding: '16px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0c4a6e', textTransform: 'uppercase' }}>
                    Frame Sizes & Specific Rates Manager *
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#0284c7', fontWeight: 700 }}>
                    Set unique wholesale rate (₹) per frame size
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px', minHeight: '44px', background: '#ffffff', padding: '10px', borderRadius: '10px', border: '1px solid #bae6fd' }}>
                  {formData.sizes && formData.sizes.map((s, idx) => {
                    const currentPrice = formData.sizePrices?.[s] ?? formData.startingPrice ?? 125;
                    return (
                      <div
                        key={idx}
                        style={{
                          background: '#e0f2fe',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          padding: '5px 10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0369a1' }}>
                          📏 {s}
                        </span>
                        <div style={{ display: 'inline-flex', alignItems: 'center', background: '#ffffff', borderRadius: '5px', border: '1px solid #7dd3fc', padding: '1px 5px' }}>
                          <span style={{ fontSize: '0.74rem', color: '#0284c7', fontWeight: 800 }}>₹</span>
                          <input
                            type="number"
                            min={1}
                            className="no-spinners"
                            value={currentPrice}
                            onChange={(e) => handleUpdateSizePrice(s, Number(e.target.value))}
                            style={{
                              width: '54px',
                              border: 'none',
                              background: 'transparent',
                              fontSize: '0.82rem',
                              fontWeight: 800,
                              color: '#0f172a',
                              textAlign: 'center',
                              padding: '2px 0'
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSize(idx)}
                          style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontWeight: 900, fontSize: '1rem', padding: 0 }}
                          title="Remove this size"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Add New Frame Size with Specific Price (NO PRESETS) */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
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
                    placeholder="Size name (e.g. 15 × 20 in)"
                    style={{
                      flex: '1 1 200px',
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
                  <div style={{ position: 'relative', width: '120px' }}>
                    <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#0284c7', fontWeight: 800 }}>₹</span>
                    <input
                      type="number"
                      min={1}
                      className="no-spinners"
                      value={newSizePriceInput}
                      onChange={(e) => setNewSizePriceInput(e.target.value)}
                      placeholder="Rate"
                      style={{
                        width: '100%',
                        background: '#ffffff',
                        border: '1px solid #7dd3fc',
                        borderRadius: '8px',
                        padding: '8px 8px 8px 22px',
                        fontSize: '0.86rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        WebkitTextFillColor: '#0f172a',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddSize()}
                    style={{
                      background: BLUE_GRADIENT,
                      border: 'none',
                      color: '#ffffff',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    + Add Size & Price
                  </button>
                </div>
              </div>

              {/* 4. PRODUCT MOCKUP IMAGE (UPLOAD FROM DEVICE) */}
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '14px', padding: '16px', marginBottom: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0c4a6e' }}>
                    Product Mockup Image (Upload from Device) *
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
                    padding: '20px',
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
                  <div style={{ fontSize: '2rem', marginBottom: '6px' }}>📁</div>
                  <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.94rem' }}>
                    Click to Upload Product Image from Your Computer / Phone
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '3px' }}>
                    Auto-optimized for crisp display and fast loading (Max 8MB)
                  </div>
                </div>

                {/* Preview Thumbnail */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #0284c7', background: '#f8fafc', flexShrink: 0 }}>
                    <img
                      src={formData.mockupImg}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.src = '/images/gods/mahalakshmi.jpg'; }}
                    />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.4 }}>
                    Current image preview. When you upload a file from your device, it will automatically update here and save to the product.
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#475569',
                    padding: '9px 18px',
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
                    padding: '9px 26px',
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
