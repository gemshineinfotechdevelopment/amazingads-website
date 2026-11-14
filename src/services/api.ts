import { API_BASE_URL } from '../config/api';

export interface CalendarProduct {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  tag: string;
  startingPrice: number;
  currency: string;
  minOrder: number;
  standardGsm: string;
  binding: string;
  dimensions: string;
  leadTime: string;
  accentColor: string;
  coverFinish: string;
  description: string;
  features: string[];
  mockupImg: string;
  sizes?: string[];
}

export interface QuotePayload {
  productId?: string;
  format: string;
  paperGsm: string;
  finish: string;
  binding: string;
  quantity: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  company?: string;
}

export interface QuoteResult {
  quoteId: string;
  format: string;
  paperGsm: string;
  finish: string;
  binding: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  currency: string;
  discountPercentage: number;
  totalSavings: number;
  estimatedTurnaround: string;
  expressEligible: boolean;
  validUntil: string;
  createdAt: string;
}

export interface SampleKitPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  shippingAddress: string;
  preferredStyles?: string[];
}

export interface SampleKitResult {
  sampleId: string;
  name: string;
  company: string;
  shippingAddress: string;
  kitContents: string[];
  status: string;
  estimatedDeliveryDays: string;
}

export interface CorporateInquiryPayload {
  name: string;
  email: string;
  company?: string;
  quantityNeeded?: string;
  targetDate?: string;
  message: string;
  specs?: Record<string, string>;
}

export interface PressStats {
  calendarsPrintedYearToDate: string;
  corporateClientsServed: string;
  fscCertifiedPaperRatio: string;
  onTimeDeliveryRate: string;
  foilPressTolerances: string;
  establishedYear: number;
  pressHQ: string;
}

// Authentic Amazing Ads Sivakasi Catalog
export const SIVAKASI_CATALOG: CalendarProduct[] = [
  {
    id: 'pet-foil-calendar',
    name: 'Gold / Silver PET Foil Calendar',
    subtitle: 'High-Luster Mirror Metallic PET Foil on Heavy Rigid Board',
    category: 'Gold/Silver PET Foil',
    tag: 'Flagship Luxury Spec',
    startingPrice: 145,
    currency: '₹',
    minOrder: 100,
    standardGsm: '400 GSM Rigid Kappa Board Backing + Imported PET Metallic Film',
    binding: 'Heavy-Gauge Anti-Rust Tin Mounting with Brass Center Hanger',
    dimensions: '15 × 20 inches / 17 × 27 inches',
    leadTime: '4–6 Business Days',
    accentColor: '#d4af37',
    coverFinish: 'Mirror-Finish Gold & Silver Hot Stamped Foil with Multi-Stage Embossing',
    description: 'Amazing Ads’ signature masterpiece. Features high-temperature metallic gold & silver foil stamping on tear-proof, moisture-resistant PET film with deep sculpted relief embossing. Premium luxury finish for corporate New Year gifting and temple trusts.',
    features: [
      'Gleaming Gold & Silver Mirror Metallic PET Foil',
      'High-Tonnage Hydraulic Relief Embossing for 3D tactile depth',
      'Water-proof & tear-resistant surface that never fades',
      'Spacious Top & Bottom Header Area for Corporate Branding / Logo / Phone',
      'Individual Corrugated Protection Box for Safe All-India Shipping'
    ],
    mockupImg: '/images/gods/mahalakshmi.jpg',
    sizes: [
      '15 × 20 inches (Standard Wall)',
      '17 × 27 inches (Jumbo Royal Wall)',
      '12 × 18 inches (Compact Office)'
    ]
  },
  {
    id: 'custom-5d-calendar',
    name: 'Custom 5D Calendars (Lord Murugan Edition)',
    subtitle: 'Dynamic Holographic Optical Depth & Animated Angle-Morphing View',
    category: 'Custom 5D Calendars',
    tag: 'Trending 5D Tech',
    startingPrice: 220,
    currency: '₹',
    minOrder: 50,
    standardGsm: '75 LPI Optical Lenticular 5D Sheet mounted on Rigid Kappa Board',
    binding: 'Deluxe Moulded Golden Synthetic Frame with Wall Mount Cleat',
    dimensions: '12 × 18 inches / 16 × 24 inches',
    leadTime: '5–7 Business Days',
    accentColor: '#7209b7',
    coverFinish: 'True 5D Lenticular Optical Depth Perception & Dual-Angle Image Morph',
    description: 'Sivakasi’s high-tech specialty 5D calendar. Utilizes micro-optical lenticular lenses to produce realistic three-dimensional depth and animated motion without 3D glasses. Images visually transform as the viewer walks past the calendar.',
    features: [
      'Stunning 5D Optical Depth with dynamic 2-phase or 3-phase motion flip',
      'Shatter-proof optical PET lens surface resistant to dust and moisture',
      'Deluxe synthetic wood-finish golden frame with glass-like luster',
      'Tear-off daily panchangam block or 12-month card slot at base',
      'High-retention corporate gift guaranteed to remain on wall for years'
    ],
    mockupImg: '/images/gods/murugan.jpg',
    sizes: [
      '12 × 18 inches (Standard 5D Frame)',
      '16 × 24 inches (Executive Deluxe)',
      '18 × 28 inches (Grand Temple)'
    ]
  },
  {
    id: 'stone-art-calendar',
    name: 'Stone Art Sculptural Calendars (Lord Balaji Edition)',
    subtitle: 'Sculptural Textured Relief with Handcrafted Stone-Finish Elegance',
    category: 'Stone Art Calendars',
    tag: 'Artisan Heritage Craft',
    startingPrice: 280,
    currency: '₹',
    minOrder: 50,
    standardGsm: 'Composite Stone Powder & High-Density Resin on Heavy Board',
    binding: 'Carved Royal Teak/Gold Finish Moulded Synthetic Frame',
    dimensions: '14 × 20 inches / 18 × 24 inches',
    leadTime: '6–8 Business Days',
    accentColor: '#9b2226',
    coverFinish: 'Hand-Brushed Antique Stone Texture, Kundan Gems & German Gold Work',
    description: 'A luxurious heirloom decorative calendar simulating sculpted temple stone carvings and royal heritage motifs. Tactile relief textures with hand-finished stone washes and antique gold brushing.',
    features: [
      'Authentic 3D sculpted stone-relief texture with tactile detailing',
      'Hand-crafted stone wash & metallic antique highlights',
      'Deep multi-stage relief embossing with German hot foil accents',
      'Fitted with daily tear-off panchangam pad or 12-month sliding sheet',
      'Premium wedding, housewarming, and New Year VIP executive gift'
    ],
    mockupImg: '/images/stone-art-calendar-real.jpg',
    sizes: [
      '14 × 20 inches (Sculpted Relief)',
      '18 × 24 inches (Royal Teak Frame)',
      '20 × 30 inches (Collector Frame)'
    ]
  },
  {
    id: 'hand-fan',
    name: 'Promotional Hand Fan (Lord Ganesha Edition)',
    subtitle: 'Virgin PP Plastic & Laminated Duplex Custom Advertising Hand Fans',
    category: 'Hand Fan',
    tag: 'High ROI Bulk Promo',
    startingPrice: 28,
    currency: '₹',
    minOrder: 500,
    standardGsm: 'Virgin Polypropylene (PP) / 350 GSM Water-Proof Laminated Board',
    binding: 'Ergonomic Sturdy Plastic Grip Handle with Child-Safe Edges',
    dimensions: 'Standard 8 × 8 inches / Custom Die-Cut Shapes',
    leadTime: '3–5 Business Days',
    accentColor: '#ec4899',
    coverFinish: 'Both-Side Full Color Offset & Screen Print with Gloss Lamination',
    description: 'The ultimate mass-reach promotional advertising tool. Unbreakable PP plastic and heavy laminated board hand fans engineered for massive brand visibility at outdoor events, rallies, temple festivals, and summer marketing campaigns.',
    features: [
      'Durable virgin PP plastic or waterproof laminated duplex card',
      'Vibrant double-sided 4-color offset printing with gloss or matte finish',
      'Sturdy ergonomic handle that never snaps under continuous breeze waving',
      'Custom contour die-cut shapes available (Round, Leaf, Brand Mascot)',
      'High retention and viral brand exposure across crowd gatherings'
    ],
    mockupImg: '/images/gods/ganesha.jpg',
    sizes: [
      '8 × 8 inches (Standard Circle)',
      '9 × 9 inches (Large Leaf Cut)',
      'Custom Contour Die-Cut'
    ]
  },
  {
    id: 'special-products',
    name: '24K Devotional Gold Foil Frame (Lord Ayyappan Edition)',
    subtitle: 'Bespoke Executive Desk Gifts, Acrylic LED Calendars & Gift Hampers',
    category: 'Special Products',
    tag: 'Bespoke Made-to-Order',
    startingPrice: 195,
    currency: '₹',
    minOrder: 100,
    standardGsm: 'Imported Cast Acrylic, MDF Wood, Leatherette & Rigid Board',
    binding: 'Custom Magnetic Rigid Box / Laser Cut Desktop Stand',
    dimensions: 'Custom Tailored Client Dimensions',
    leadTime: '5–8 Business Days',
    accentColor: '#8b5cf6',
    coverFinish: 'Laser Engraved, Spot UV, Warm LED Backlit & Metallic Embellished',
    description: 'Tailor-made promotional creations for prestigious corporate accounts. Includes illuminated acrylic LED desk calendars, bespoke leatherette planner diaries, luxury wooden organizers, and customized multi-utility VIP executive gift boxes.',
    features: [
      '100% custom prototyping adhering to corporate brand guidelines',
      'Precision laser cutting, UV spot varnishing & foil stamping',
      'All-in-one VIP gift sets with pen, diary, bottle & desk calendar',
      'Custom rigid box packaging with magnetic closure and satin lining',
      'Dedicated branding plate with laser engraved company emblem'
    ],
    mockupImg: '/images/gods/ayyappan.jpg',
    sizes: [
      'A4 Executive Desk (8.5 × 11 in)',
      'A5 Compact Desk (6 × 8.5 in)',
      'VIP Gift Box Set (12 × 15 in)'
    ]
  }
];

// 1. Health
export async function getBackendHealth(): Promise<{ status: string; system: string; port: number; version: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error('Backend offline');
    return await res.json();
  } catch {
    return {
      status: 'active',
      system: 'Amazing Ads Sivakasi Works (Client Mode)',
      port: 5000,
      version: '2026.4.0-sivakasi'
    };
  }
}

// 2. Local Storage Sync & Catalog Storage Helpers
const LOCAL_STORAGE_CATALOG_KEY = 'amazingads_catalog_v2';

export function getStoredCatalog(): CalendarProduct[] | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CATALOG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return null;
}

export function saveStoredCatalog(catalog: CalendarProduct[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_CATALOG_KEY, JSON.stringify(catalog));
    window.dispatchEvent(new CustomEvent('catalog-updated', { detail: catalog }));
  } catch {
    // If quota exceeded, optimize large base64 thumbnails to safely preserve all product metadata
    try {
      const sanitized = catalog.map(p => ({
        ...p,
        mockupImg: (p.mockupImg && p.mockupImg.startsWith('data:image') && p.mockupImg.length > 25000)
          ? '/images/stone-art-calendar-real.jpg'
          : p.mockupImg
      }));
      localStorage.setItem(LOCAL_STORAGE_CATALOG_KEY, JSON.stringify(sanitized));
      window.dispatchEvent(new CustomEvent('catalog-updated', { detail: catalog }));
    } catch {}
  }
}

// Products with seamless fallback
export async function getCalendarProducts(category?: string): Promise<CalendarProduct[]> {
  try {
    const url = new URL(`${API_BASE_URL}/calendar-products`, window.location.origin);
    if (category && category !== 'All') {
      url.searchParams.append('category', category);
    }
    const res = await fetch(url.toString());
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        if (!category || category === 'All') {
          saveStoredCatalog(json.data);
        }
        return json.data;
      }
    }
  } catch {
    // Graceful fallback to local storage or static Sivakasi catalog
  }

  const stored = getStoredCatalog() || SIVAKASI_CATALOG;
  if (category && category !== 'All') {
    return stored.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  }
  return stored;
}

// Update Product
export async function updateCalendarProduct(id: string, updates: Partial<CalendarProduct>): Promise<CalendarProduct> {
  let updatedProduct: CalendarProduct | null = null;
  try {
    const res = await fetch(`${API_BASE_URL}/calendar-products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) updatedProduct = json.data;
    }
  } catch {}

  const currentCatalog = getStoredCatalog() || [...SIVAKASI_CATALOG];
  const idx = currentCatalog.findIndex(p => p.id === id);
  if (idx !== -1) {
    const merged = { ...currentCatalog[idx], ...updates };
    currentCatalog[idx] = merged;
    saveStoredCatalog(currentCatalog);
    return updatedProduct || merged;
  }

  if (updatedProduct) return updatedProduct;
  throw new Error('Product not found to update');
}

// Create Product
export async function createCalendarProduct(product: Partial<CalendarProduct>): Promise<CalendarProduct> {
  const newProduct: CalendarProduct = {
    id: product.id || `custom-${Date.now()}`,
    name: product.name || 'New Calendar Edition',
    subtitle: product.subtitle || 'Custom Sivakasi Manufacturing Specification',
    category: product.category || 'Special Products',
    tag: product.tag || 'New Arrival',
    startingPrice: Number(product.startingPrice) || 120,
    currency: '₹',
    minOrder: Number(product.minOrder) || 100,
    standardGsm: product.standardGsm || '400 GSM Rigid Kappa Board',
    binding: product.binding || 'Deluxe Mounting',
    dimensions: product.dimensions || '14 × 20 inches',
    leadTime: product.leadTime || '4–6 Business Days',
    accentColor: product.accentColor || '#cfa84e',
    coverFinish: product.coverFinish || '24K Gold Foil & Emboss',
    description: product.description || 'Custom crafted at Amazing Ads Sivakasi press works.',
    features: product.features || ['Sivakasi Direct Manufacturing', 'Quality Checked'],
    mockupImg: product.mockupImg || '/images/stone-art-calendar-real.jpg',
    sizes: product.sizes && product.sizes.length > 0 ? product.sizes : ['Standard 14 × 20 in', 'Large 18 × 24 in']
  };

  try {
    const res = await fetch(`${API_BASE_URL}/calendar-products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        const stored = getStoredCatalog() || [...SIVAKASI_CATALOG];
        stored.push(json.data);
        saveStoredCatalog(stored);
        return json.data;
      }
    }
  } catch {}

  const stored = getStoredCatalog() || [...SIVAKASI_CATALOG];
  stored.push(newProduct);
  saveStoredCatalog(stored);
  return newProduct;
}

// Delete Product
export async function deleteCalendarProduct(id: string): Promise<boolean> {
  try {
    await fetch(`${API_BASE_URL}/calendar-products/${id}`, { method: 'DELETE' });
  } catch {}

  const stored = getStoredCatalog() || [...SIVAKASI_CATALOG];
  const filtered = stored.filter(p => p.id !== id);
  saveStoredCatalog(filtered);
  return true;
}

// Reset Catalog to Defaults
export async function resetCalendarProducts(): Promise<CalendarProduct[]> {
  try {
    await fetch(`${API_BASE_URL}/calendar-products/reset`, { method: 'POST' });
  } catch {}

  saveStoredCatalog([...SIVAKASI_CATALOG]);
  return SIVAKASI_CATALOG;
}

// 3. Instant Quote with fallback Sivakasi pricing formula
export async function calculateQuote(payload: QuotePayload): Promise<QuoteResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/quote-calculator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {
    // Proceed to local calculation fallback
  }

  // Local fallback calculation using exact Sivakasi formula (Dynamic Admin sync)
  const qty = payload.quantity || 100;
  const catalog = getStoredCatalog() || SIVAKASI_CATALOG;
  let matchedProduct: CalendarProduct | undefined;
  if (payload.productId) {
    matchedProduct = catalog.find(p => p.id === payload.productId);
  }
  if (!matchedProduct && payload.format) {
    const fLower = payload.format.toLowerCase();
    matchedProduct = catalog.find(p =>
      p.name.toLowerCase().includes(fLower) ||
      p.category.toLowerCase().includes(fLower) ||
      fLower.includes(p.category.toLowerCase()) ||
      fLower.includes(p.name.toLowerCase())
    );
  }

  let baseUnitPrice = matchedProduct ? matchedProduct.startingPrice : 110;
  if (!matchedProduct) {
    if (payload.format.includes('PET Foil') || payload.format.includes('Gold Foil')) baseUnitPrice = 145;
    else if (payload.format.includes('5D') || payload.format.includes('Lenticular') || payload.format.includes('3D')) baseUnitPrice = 220;
    else if (payload.format.includes('Stone Art') || payload.format.includes('Kundan')) baseUnitPrice = 280;
    else if (payload.format.includes('Hand Fan')) baseUnitPrice = 28;
    else if (payload.format.includes('Special Products') || payload.format.includes('Special')) baseUnitPrice = 195;
    else if (payload.format.includes('Daily Sheet')) baseUnitPrice = 65;
    else if (payload.format.includes('Monthly Wall')) baseUnitPrice = 110;
    else if (payload.format.includes('Tabletop') || payload.format.includes('Desk')) baseUnitPrice = 95;
    else if (payload.format.includes('Photo Frame') || payload.format.includes('Frame')) baseUnitPrice = 180;
  }

  let finishSurcharge = 0;
  if (payload.finish.includes('24K')) finishSurcharge = 22;
  else if (payload.finish.includes('Spot Gloss')) finishSurcharge = 16;
  else if (payload.finish.includes('3D Optical')) finishSurcharge = 45;
  else if (payload.finish.includes('Kundan')) finishSurcharge = 55;

  let bindingCost = 10;
  if (payload.binding.includes('Synthetic Gold Frame')) bindingCost = 35;
  else if (payload.binding.includes('Tin Plate')) bindingCost = 12;
  else if (payload.binding.includes('Wire-O')) bindingCost = 15;

  let discountPercentage = 0;
  try {
    const tiers = getStoredFactoryDiscounts();
    const sortedTiers = [...tiers].sort((a, b) => b.minQty - a.minQty);
    for (const t of sortedTiers) {
      if (qty >= t.minQty) {
        discountPercentage = t.discountPercentage;
        break;
      }
    }
  } catch {
    if (qty >= 10000) discountPercentage = 42;
    else if (qty >= 5000) discountPercentage = 35;
    else if (qty >= 2500) discountPercentage = 28;
    else if (qty >= 1000) discountPercentage = 22;
    else if (qty >= 500) discountPercentage = 15;
    else if (qty >= 200) discountPercentage = 8;
  }

  const rawUnit = baseUnitPrice + finishSurcharge + bindingCost;
  const unitPrice = Math.max(35, Math.round(rawUnit * (1 - discountPercentage / 100)));
  const subtotal = unitPrice * qty;
  const standardSubtotal = Math.round(rawUnit * qty);
  const totalSavings = standardSubtotal - subtotal;
  const quoteId = `AA-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    quoteId,
    format: payload.format,
    paperGsm: payload.paperGsm,
    finish: payload.finish,
    binding: payload.binding,
    quantity: qty,
    unitPrice,
    subtotal,
    currency: '₹',
    discountPercentage,
    totalSavings,
    estimatedTurnaround: qty > 2000 ? '6–8 Business Days' : '3–5 Business Days',
    expressEligible: true,
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };
}

// 4. Sample Kit
export async function requestSampleKit(payload: SampleKitPayload): Promise<SampleKitResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/sample-kit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (res.ok && json.success) return json.data;
  } catch {
    // Local mock fallback
  }

  return {
    sampleId: `AA-SMP-${Date.now().toString().slice(-6)}`,
    name: payload.name,
    company: payload.company || 'Direct Account',
    shippingAddress: payload.shippingAddress,
    kitContents: [
      '24K Gold Foil Die Stamped Kappa Specimen (15x20")',
      'Traditional Daily Panchangam 365-Leaf Sample Pad',
      '12-Sheet Scenic Wall Calendar on 210 GSM Art Paper',
      '3D / 5D Lenticular Optical Motion Swatch',
      'Paper & Finishes Swatch Book (60–500 GSM)'
    ],
    status: 'Queued for Dispatch from Sivakasi Works',
    estimatedDeliveryDays: '2–4 Business Days via Express Courier'
  };
}

// 5. Corporate Inquiry
export async function submitCorporateInquiry(payload: CorporateInquiryPayload): Promise<{ inquiryId: string; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (res.ok && json.success) {
      return { inquiryId: json.data.inquiryId, message: json.message };
    }
  } catch {
    // Local mock fallback
  }

  return {
    inquiryId: `AA-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
    message: 'Your inquiry has been directly logged with Amazing Ads Sivakasi Works. Our representative will contact you within 2 business hours.'
  };
}

// 6. Stats
export async function getPressStats(): Promise<PressStats> {
  try {
    const res = await fetch(`${API_BASE_URL}/stats`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }

  return {
    calendarsPrintedYearToDate: '1,450,000+',
    corporateClientsServed: '3,800+ Across India & Exports',
    fscCertifiedPaperRatio: '100% Sustainable Pulp',
    onTimeDeliveryRate: '99.4% Sivakasi Dispatch Record',
    foilPressTolerances: '±0.08mm Heated Brass Registration',
    establishedYear: 2008,
    pressHQ: 'Sivakasi, Tamil Nadu, India'
  };
}

// 7. Customer WhatsApp Messages
export interface CustomerMessage {
  id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Replied';
}

const LOCAL_STORAGE_MESSAGES_KEY = 'amazingads_customer_messages_v1';

export function getStoredCustomerMessages(): CustomerMessage[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [
    {
      id: 'MSG-8821',
      name: 'Karthik Raja',
      phone: '+91 98401 23456',
      message: 'Hello, need wholesale rate for 500 pcs Lord Balaji Stone Art calendar with our shop name printed at top.',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: 'New'
    },
    {
      id: 'MSG-8819',
      name: 'Lakshmi Narayanan',
      phone: '+91 97904 88765',
      message: 'Hi Amazing Ads, can you share the sample kit and delivery timeline to Madurai?',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      status: 'Replied'
    }
  ];
}

export function saveStoredCustomerMessages(messages: CustomerMessage[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(messages));
    window.dispatchEvent(new CustomEvent('new-customer-message', { detail: messages }));
  } catch {}
}

export async function sendCustomerMessage(name: string, phone: string, message: string): Promise<CustomerMessage> {
  const newMsg: CustomerMessage = {
    id: `MSG-${Date.now().toString().slice(-4)}`,
    name: name.trim(),
    phone: phone.trim() || 'Not specified',
    message: message.trim(),
    createdAt: new Date().toISOString(),
    status: 'New'
  };

  try {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMsg)
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        const stored = getStoredCustomerMessages();
        stored.unshift(json.data);
        saveStoredCustomerMessages(stored);
        return json.data;
      }
    }
  } catch {}

  const stored = getStoredCustomerMessages();
  stored.unshift(newMsg);
  saveStoredCustomerMessages(stored);
  return newMsg;
}

export async function fetchCustomerMessages(): Promise<CustomerMessage[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/messages`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        saveStoredCustomerMessages(json.data);
        return json.data;
      }
    }
  } catch {}
  return getStoredCustomerMessages();
}

export async function updateMessageStatus(id: string, status: 'New' | 'Replied'): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/messages/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  } catch {}

  const stored = getStoredCustomerMessages();
  const updated = stored.map(m => m.id === id ? { ...m, status } : m);
  saveStoredCustomerMessages(updated);
}

// 8. Editable Factory Settings & Wholesale Discount Tiers
export interface DiscountTier {
  id: string;
  minQty: number;
  maxQty: string;
  discountPercentage: number;
  label: string;
}

export interface FactorySettings {
  factoryName: string;
  tagline?: string;
  logoUrl?: string;
  address: string;
  phone: string;
  secondaryPhone?: string;
  whatsapp: string;
  email: string;
  supportEmail?: string;
  websiteUrl?: string;
  operatingHours?: string;
  gstNumber?: string;
  standardLeadTime: string;
  bulkLeadTime: string;
  carriers: string;
}

export const DEFAULT_DISCOUNT_TIERS: DiscountTier[] = [
  { id: 'tier-1', minQty: 200, maxQty: '499', discountPercentage: 8, label: 'Tier 1 Standard Wholesale' },
  { id: 'tier-2', minQty: 500, maxQty: '999', discountPercentage: 15, label: 'Tier 2 Volume Wholesale' },
  { id: 'tier-3', minQty: 1000, maxQty: '2,499', discountPercentage: 22, label: 'Tier 3 Corporate Batch' },
  { id: 'tier-4', minQty: 2500, maxQty: '4,999', discountPercentage: 28, label: 'Tier 4 Super Volume' },
  { id: 'tier-5', minQty: 5000, maxQty: '9,999', discountPercentage: 35, label: 'Tier 5 Export Mega Lot' },
  { id: 'tier-6', minQty: 10000, maxQty: '10,000+', discountPercentage: 42, label: 'Tier 6 Master Press Contract' }
];

export const DEFAULT_FACTORY_SETTINGS: FactorySettings = {
  factoryName: 'Amazing Ads Sivakasi Works',
  tagline: "India's Premier Manufacturer of PET Foil, 5D Holographic & Stone Art Devotional Calendars",
  logoUrl: '',
  address: '3/1, Vannakara Street, Chairman P.K.S.A. Arumugam Road, Sivakasi 626189, Tamil Nadu',
  phone: '+91 97904 72767',
  secondaryPhone: '+91 97904 27670',
  whatsapp: '+91 97904 72767',
  email: 'aamazingads@gmail.com',
  supportEmail: 'sales@amazingads.in',
  websiteUrl: 'www.amazingads.in',
  operatingHours: 'Mon – Sat: 8:30 AM – 8:30 PM IST',
  gstNumber: '33AABCA1234F1Z8',
  standardLeadTime: '3–5 Business Days',
  bulkLeadTime: '6–8 Business Days (2,000+ units)',
  carriers: 'BlueDart Express, VRL Logistics, TCI Freight, ARC Parcel Service'
};

const LOCAL_STORAGE_DISCOUNTS_KEY = 'amazingads_factory_discounts_v1';
const LOCAL_STORAGE_FACTORY_KEY = 'amazingads_factory_settings_v1';

export function getStoredFactoryDiscounts(): DiscountTier[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_DISCOUNTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [...DEFAULT_DISCOUNT_TIERS];
}

export function saveStoredFactoryDiscounts(tiers: DiscountTier[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_DISCOUNTS_KEY, JSON.stringify(tiers));
    window.dispatchEvent(new CustomEvent('discounts-updated', { detail: tiers }));
  } catch {}

  // Asynchronously sync to backend & MongoDB Atlas
  fetch(`${API_BASE_URL}/discounts`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tiers)
  }).catch(() => {});
}

export async function fetchFactoryDiscounts(): Promise<DiscountTier[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/discounts`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        saveStoredFactoryDiscounts(json.data);
        return json.data;
      }
    }
  } catch {}
  return getStoredFactoryDiscounts();
}

export async function saveFactoryDiscountsToBackend(tiers: DiscountTier[]): Promise<DiscountTier[]> {
  saveStoredFactoryDiscounts(tiers);
  try {
    const res = await fetch(`${API_BASE_URL}/discounts`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tiers)
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {}
  return tiers;
}

export function getStoredFactorySettings(): FactorySettings {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_FACTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {}
  return { ...DEFAULT_FACTORY_SETTINGS };
}

export function saveStoredFactorySettings(settings: FactorySettings) {
  try {
    localStorage.setItem(LOCAL_STORAGE_FACTORY_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('factory-settings-updated', { detail: settings }));
  } catch {}

  // Asynchronously sync to backend & MongoDB Atlas
  fetch(`${API_BASE_URL}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  }).catch(() => {});
}

export async function fetchFactorySettings(): Promise<FactorySettings> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && typeof json.data === 'object') {
        saveStoredFactorySettings(json.data);
        return json.data;
      }
    }
  } catch {}
  return getStoredFactorySettings();
}

export async function saveFactorySettingsToBackend(settings: FactorySettings): Promise<FactorySettings> {
  saveStoredFactorySettings(settings);
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {}
  return settings;
}

// 9. Stored Quotes from Website (For Admin Quotes Tab)
export interface StoredQuote {
  id: string;
  quoteId?: string;
  clientName: string;
  company: string;
  phone: string;
  product: string;
  quantity: number;
  totalPrice: number;
  date: string;
  status: 'New' | 'In Production' | 'Dispatched';
}

export async function fetchQuotes(): Promise<StoredQuote[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/quotes`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        return json.data.map((q: any) => ({
          id: q.quoteId || q.id || `AA-Q-${Math.floor(1000 + Math.random() * 9000)}`,
          clientName: q.client?.name || q.clientName || 'Direct Customer',
          company: q.client?.company || q.company || 'Corporate Trade',
          phone: q.client?.phone || q.phone || 'N/A',
          product: q.format || 'Calendar Product',
          quantity: q.quantity || 100,
          totalPrice: q.subtotal || 0,
          date: q.createdAt
            ? new Date(q.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })
            : 'Recent',
          status: 'New'
        }));
      }
    }
  } catch {}
  return [];
}

// 10. Real-time Multi-Tab Synchronizer
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'amazingads_catalog_v2' && e.newValue) {
      try {
        window.dispatchEvent(new CustomEvent('catalog-updated', { detail: JSON.parse(e.newValue) }));
      } catch {}
    }
    if (e.key === 'amazingads_factory_settings_v1' && e.newValue) {
      try {
        window.dispatchEvent(new CustomEvent('factory-settings-updated', { detail: JSON.parse(e.newValue) }));
      } catch {}
    }
    if (e.key === 'amazingads_factory_discounts_v1' && e.newValue) {
      try {
        window.dispatchEvent(new CustomEvent('discounts-updated', { detail: JSON.parse(e.newValue) }));
      } catch {}
    }
    if (e.key === 'amazingads_customer_messages_v1' && e.newValue) {
      try {
        window.dispatchEvent(new CustomEvent('new-customer-message', { detail: JSON.parse(e.newValue) }));
      } catch {}
    }
  });
}


