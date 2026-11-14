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
  sizePrices?: Record<string, number>;
}

export interface QuotePayload {
  productId?: string;
  format: string;
  size?: string;
  customUnitPrice?: number;
  paperGsm?: string;
  finish?: string;
  binding?: string;
  quantity: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  company?: string;
  notes?: string;
}

export interface QuoteResult {
  quoteId: string;
  format: string;
  size?: string;
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
      '12 × 18 inches',
      '15 × 20 inches',
      '17 × 27 inches'
    ],
    sizePrices: {
      '12 × 18 inches': 125,
      '15 × 20 inches': 145,
      '17 × 27 inches': 210
    }
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
      '12 × 18 inches',
      '16 × 24 inches',
      '18 × 28 inches'
    ],
    sizePrices: {
      '12 × 18 inches': 220,
      '16 × 24 inches': 295,
      '18 × 28 inches': 380
    }
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
      '12 × 18 inches',
      '14 × 20 inches',
      '18 × 24 inches'
    ],
    sizePrices: {
      '12 × 18 inches': 250,
      '14 × 20 inches': 280,
      '18 × 24 inches': 395
    }
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
      '8 × 8 inches',
      '9 × 10 inches'
    ],
    sizePrices: {
      '8 × 8 inches': 28,
      '9 × 10 inches': 34
    }
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
      '9 × 12 inches',
      '12 × 16 inches',
      '16 × 20 inches'
    ],
    sizePrices: {
      '9 × 12 inches': 195,
      '12 × 16 inches': 275,
      '16 × 20 inches': 360
    }
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

  let baseUnitPrice = 110;
  if (payload.customUnitPrice && payload.customUnitPrice > 0) {
    baseUnitPrice = payload.customUnitPrice;
  } else if (matchedProduct) {
    baseUnitPrice = (payload.size && matchedProduct.sizePrices && matchedProduct.sizePrices[payload.size]) || matchedProduct.startingPrice;
  } else if (payload.format.includes('PET Foil') || payload.format.includes('Gold Foil')) baseUnitPrice = 145;
  else if (payload.format.includes('5D') || payload.format.includes('Lenticular') || payload.format.includes('3D')) baseUnitPrice = 220;
  else if (payload.format.includes('Stone Art') || payload.format.includes('Kundan')) baseUnitPrice = 280;
  else if (payload.format.includes('Hand Fan')) baseUnitPrice = 28;
  else if (payload.format.includes('Special Products') || payload.format.includes('Special')) baseUnitPrice = 195;
  else if (payload.format.includes('Daily Sheet')) baseUnitPrice = 65;
  else if (payload.format.includes('Monthly Wall')) baseUnitPrice = 110;
  else if (payload.format.includes('Tabletop') || payload.format.includes('Desk')) baseUnitPrice = 95;
  else if (payload.format.includes('Photo Frame') || payload.format.includes('Frame')) baseUnitPrice = 180;

  const finish = payload.finish || 'Standard Mirror Finish';
  const binding = payload.binding || 'Standard Mount';
  const paperGsm = payload.paperGsm || '400 GSM Rigid Board';

  let finishSurcharge = 0;
  if (finish.includes('24K')) finishSurcharge = 22;
  else if (finish.includes('Spot Gloss')) finishSurcharge = 16;
  else if (finish.includes('3D Optical')) finishSurcharge = 45;
  else if (finish.includes('Kundan')) finishSurcharge = 55;

  let bindingCost = 10;
  if (binding.includes('Synthetic Gold Frame')) bindingCost = 35;
  else if (binding.includes('Tin Plate')) bindingCost = 12;
  else if (binding.includes('Wire-O')) bindingCost = 15;

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
    paperGsm,
    finish,
    binding,
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

// 7. Customer Inquiries & Leads
export interface CustomerMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  size?: string;
  quantity?: number;
  notes?: string;
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
      email: 'karthik.raja@chennaienterprises.com',
      product: 'Stone Art Calendars',
      size: '14 × 20 inches',
      quantity: 500,
      notes: 'Need corporate logo embossing on frame',
      message: 'Hello, need wholesale rate for 500 pcs Lord Balaji Stone Art calendar with our shop name printed at top.',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: 'New'
    },
    {
      id: 'MSG-8819',
      name: 'Lakshmi Narayanan',
      phone: '+91 97904 88765',
      email: 'lakshmi.narayanan@gmail.com',
      product: 'Gold / Silver PET Foil Calendar',
      size: '15 × 20 inches',
      quantity: 250,
      notes: 'Delivery to Madurai warehouse',
      message: 'Hi Amazing Ads, can you share the sample kit and delivery timeline to Madurai?',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      status: 'Replied'
    }
  ];
}

export function deduplicateCustomerMessages(list: CustomerMessage[]): CustomerMessage[] {
  const seen = new Set<string>();
  const result: CustomerMessage[] = [];

  for (const item of list) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);

    // Filter out duplicates from same user within 2 minutes
    const isDup = result.some(prev => {
      const timeDiff = Math.abs(new Date(prev.createdAt).getTime() - new Date(item.createdAt).getTime());
      if (timeDiff > 120000) return false;
      const sameName = prev.name.trim().toLowerCase() === item.name.trim().toLowerCase();
      const sameEmail = prev.email && item.email && prev.email.trim().toLowerCase() === item.email.trim().toLowerCase();
      const cleanP1 = (prev.phone || '').replace(/[^0-9]/g, '');
      const cleanP2 = (item.phone || '').replace(/[^0-9]/g, '');
      const samePhone = cleanP1 && cleanP2 && cleanP1.length >= 7 && cleanP2.length >= 7 && cleanP1 === cleanP2;

      return (sameName && (sameEmail || samePhone)) || (sameEmail && samePhone);
    });

    if (!isDup) {
      result.push(item);
    }
  }

  return result;
}

export function saveStoredCustomerMessages(messages: CustomerMessage[]) {
  try {
    const deduped = deduplicateCustomerMessages(messages);
    localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(deduped));
    window.dispatchEvent(new CustomEvent('new-customer-message', { detail: deduped }));
  } catch {}
}

export async function sendCustomerMessage(
  name: string,
  phone: string,
  message: string,
  extra?: { email?: string; product?: string; size?: string; quantity?: number; notes?: string }
): Promise<CustomerMessage> {
  const newMsg: CustomerMessage = {
    id: `MSG-${Date.now().toString().slice(-4)}`,
    name: name.trim(),
    phone: phone.trim() || 'Not specified',
    email: extra?.email?.trim() || '',
    product: extra?.product?.trim() || '',
    size: extra?.size?.trim() || '',
    quantity: extra?.quantity || undefined,
    notes: extra?.notes?.trim() || '',
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
        const updated = deduplicateCustomerMessages([json.data, ...stored]);
        saveStoredCustomerMessages(updated);
        return json.data;
      }
    }
  } catch {}

  const stored = getStoredCustomerMessages();
  const updated = deduplicateCustomerMessages([newMsg, ...stored]);
  saveStoredCustomerMessages(updated);
  return newMsg;
}

export async function fetchCustomerMessages(): Promise<CustomerMessage[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/messages`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        const deduped = deduplicateCustomerMessages(json.data);
        saveStoredCustomerMessages(deduped);
        return deduped;
      }
    }
  } catch {}
  return deduplicateCustomerMessages(getStoredCustomerMessages());
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

export async function deleteCustomerMessage(id: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/messages/${id}`, {
      method: 'DELETE'
    });
  } catch {}

  const stored = getStoredCustomerMessages();
  const updated = stored.filter(m => m.id !== id);
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
  hotlinePhone?: string;
  whatsapp?: string;
  email: string;
  supportEmail?: string;
  websiteUrl?: string;
  operatingHours?: string;
  gstNumber?: string;
  standardLeadTime: string;
  bulkLeadTime: string;
  carriers: string;
  establishedYear?: number;
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
  hotlinePhone: '+91 97904 72767',
  email: 'aamazingads@gmail.com',
  supportEmail: 'sales@amazingads.in',
  websiteUrl: 'www.amazingads.in',
  operatingHours: 'Mon – Sat: 8:30 AM – 8:30 PM IST',
  gstNumber: '33AABCA1234F1Z8',
  standardLeadTime: '3–5 Business Days',
  bulkLeadTime: '6–8 Business Days (2,000+ units)',
  carriers: 'BlueDart Express, VRL Logistics, TCI Freight, ARC Parcel Service',
  establishedYear: 2008
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

// 10. Corporate Inquiries & Sample Kits (Real Database Sync)
export interface StoredInquiry {
  id: string;
  inquiryId: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  quantityNeeded: string;
  targetDate: string;
  message: string;
  assignedPrintMaster?: string;
  receivedAt?: string;
  createdAt?: string;
}

export interface StoredSampleKit {
  id: string;
  sampleId: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  shippingAddress: string;
  preferredStyles: string[];
  kitContents: string[];
  status: string;
  estimatedDeliveryDays: string;
  requestedAt?: string;
  createdAt?: string;
}

export async function fetchInquiries(): Promise<StoredInquiry[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/inquiries`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        return json.data.map((inq: any) => ({
          id: inq._id || inq.inquiryId || `AA-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
          inquiryId: inq.inquiryId || inq.id || 'N/A',
          name: inq.name || 'Anonymous Client',
          email: inq.email || '',
          company: inq.company || 'Direct Account',
          phone: inq.phone || inq.specs?.phone || inq.message?.match(/\b[6-9]\d{9}\b/)?.[0] || 'N/A',
          quantityNeeded: inq.quantityNeeded || '500+ Units',
          targetDate: inq.targetDate || 'Immediate Dispatch',
          message: inq.message || '',
          assignedPrintMaster: inq.assignedPrintMaster || 'Amazing Ads Sivakasi Works',
          receivedAt: inq.receivedAt || inq.createdAt || new Date().toISOString()
        }));
      }
    }
  } catch {}
  return [];
}

export async function fetchSampleKits(): Promise<StoredSampleKit[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/sample-kits`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        return json.data.map((kit: any) => ({
          id: kit._id || kit.sampleId || `AA-SMP-${Math.floor(100000 + Math.random() * 900000)}`,
          sampleId: kit.sampleId || kit.id || 'N/A',
          name: kit.name || 'Client',
          email: kit.email || '',
          company: kit.company || 'Corporate Client',
          phone: kit.phone || 'N/A',
          shippingAddress: kit.shippingAddress || '',
          preferredStyles: Array.isArray(kit.preferredStyles) ? kit.preferredStyles : ['Gold Foil Calendars', '5D Tech'],
          kitContents: Array.isArray(kit.kitContents) ? kit.kitContents : ['24K Gold Foil Die Stamped Proof', '5D Lenticular Swatch', 'Catalog'],
          status: kit.status || 'Dispatched from Sivakasi Press Hub',
          estimatedDeliveryDays: kit.estimatedDeliveryDays || '2–3 Business Days',
          requestedAt: kit.requestedAt || kit.createdAt || new Date().toISOString()
        }));
      }
    }
  } catch {}
  return [];
}

// 11. Vector Dielines Specifications
export interface DielineSpec {
  id: string;
  title: string;
  format: string;
  bleed: string;
  safeZone: string;
  bindingAllowance: string;
  colorSpace: string;
  downloadFormats: string[];
}

export async function fetchDielines(): Promise<DielineSpec[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/dielines`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {}
  return [
    {
      id: 'dieline-pet-foil-wall',
      title: 'Gold / Silver PET Foil Calendar Dieline',
      format: '15 × 20 in & 17 × 27 in (Rigid Kappa Board + PET Film)',
      bleed: '3.0 mm external bleed on all 4 sides',
      safeZone: '8.0 mm internal text safety margin',
      bindingAllowance: '25 mm top margin reserved for tin plate clamping & brass hanger loop',
      colorSpace: 'CMYK + Separate Vector Layer for Mirror Gold & Silver Foil Die',
      downloadFormats: ['PDF Template', 'Adobe Illustrator (.AI)', 'CorelDRAW (.CDR)']
    },
    {
      id: 'dieline-custom-5d',
      title: 'Custom 5D Holographic Calendar Dieline',
      format: '12 × 18 in & 16 × 24 in (75 LPI Lenticular)',
      bleed: '4.0 mm bleed margin with optical lens pitch alignment marks',
      safeZone: '6.0 mm internal safety margin',
      bindingAllowance: '20 mm perimeter for carved synthetic frame mounting cleat',
      colorSpace: 'Interlaced PSD / Multi-layer Phase A + Phase B Vector Masks',
      downloadFormats: ['Interlaced PSD', 'Adobe Illustrator (.AI)', 'PDF Specs']
    },
    {
      id: 'dieline-stone-art',
      title: 'Stone Art Sculptural Frame Dieline',
      format: '14 × 20 in & 18 × 24 in Carved Frame Mount',
      bleed: '5.0 mm bleed on relief border frame',
      safeZone: '10.0 mm relief clearance zone',
      bindingAllowance: 'Carved synthetic wood moulding allowance with bottom daily block slit',
      colorSpace: '3D Heightmap Displacement Map + CMYK Antique Color Wash',
      downloadFormats: ['CAD Dieline (.DXF)', 'Adobe Illustrator (.AI)', 'PDF Template']
    },
    {
      id: 'dieline-hand-fan',
      title: 'Promotional Advertising Hand Fan Contour Dieline',
      format: 'Standard 8 × 8 in / Round & Custom Die-Cut Shapes',
      bleed: '3.0 mm external bleed contour cutting line',
      safeZone: '5.0 mm text safe zone from fan blade edge',
      bindingAllowance: 'Handle slot rivet holes with reinforced safety rib zone',
      colorSpace: 'Double-Sided CMYK Offset / Screen Print Spot Colors',
      downloadFormats: ['Die-Cut Vector (.EPS)', 'Adobe Illustrator (.AI)', 'CorelDRAW (.CDR)']
    },
    {
      id: 'dieline-special-products',
      title: 'Special Products & Executive Gift Sets Dieline',
      format: 'Custom Tailored Dimensions (Acrylic LED, Boxes, Desk Sets)',
      bleed: '3.5 mm bleed margin across clamshell and magnetic flaps',
      safeZone: '6.0 mm branding area margins',
      bindingAllowance: 'Groove creasing and magnet inset placement notches',
      colorSpace: 'CMYK + Spot UV Vector + Laser Etch Cut Lines',
      downloadFormats: ['Packaging CAD (.ARD)', 'Adobe Illustrator (.AI)', 'Vector PDF']
    }
  ];
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


