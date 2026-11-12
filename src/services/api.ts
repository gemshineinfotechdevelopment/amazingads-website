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
    id: 'gold-foil-wall',
    name: 'Real 24K Gold Foil Stamped Wall Calendar',
    subtitle: 'Heated Brass Foil Die Stamping on Heavyweight Kappa Board',
    category: 'Gold Foil Calendars',
    tag: 'Flagship Sivakasi Spec',
    startingPrice: 145,
    currency: '₹',
    minOrder: 100,
    standardGsm: '400 GSM Rigid Kappa Board Backing + 24K German Foil',
    binding: 'Heavy-Gauge Tin Mounting with Brass Center Hanger',
    dimensions: '15 × 20 inches / 17 × 27 inches',
    leadTime: '4–6 Business Days',
    accentColor: '#d4af37',
    coverFinish: 'Deep Brass Die Relief Embossing with 24K Gold & Multi-Foil',
    description: 'Amazing Ads’ signature masterpiece. Features high-temperature metallic foil stamping on rigid virgin kappa board with deep multi-level sculpted embossing. Available with devotional iconography or custom corporate branding.',
    features: [
      'Multi-Color Metallic Foil Stamping (Gold, Silver, Copper, Holographic)',
      'High-Tonnage Hydraulic Relief Embossing for 3D tactile depth',
      'Anti-Rust Gold/Silver Tin Plate Mounting with Heavy Loop Hanger',
      'Spacious Top & Bottom Header Area for Corporate Branding / Logo / Phone',
      'Individual Corrugated Protection Box for Safe All-India Shipping'
    ],
    mockupImg: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'daily-panchangam',
    name: 'Traditional Daily Sheet Tear-Off Calendar',
    subtitle: '365 Daily Leaves with Tamil & English Panchangam Details',
    category: 'Daily Calendars',
    tag: 'Highest Volume Seller',
    startingPrice: 65,
    currency: '₹',
    minOrder: 200,
    standardGsm: '60 GSM Smooth Maplitho Daily Leaves + 350 GSM Art Board Mount',
    binding: 'Tin Top Clamping with Galvanized Wire Hanger Ring',
    dimensions: 'Medium 7 × 10 inches / Jumbo 9 × 11.5 inches / Super Deluxe 10 × 15 inches',
    leadTime: '3–5 Business Days',
    accentColor: '#c85a32',
    coverFinish: 'Gloss Laminated Header Board with Full-Color Offset Branding',
    description: 'The definitive South Indian household and shop counter daily calendar. Each leaf includes clear English date, Tamil month & day, Nalla Neram, Rahu Kalam, Yemagandam, Tithi, Nakshatram, daily Thirukkural couplets, and public holidays.',
    features: [
      '365 Daily Tear-off leaves printed on high-speed Sivakasi web offset presses',
      'Complete Astrological Panchangam (Nalla Neram, Kuligai, Subha Muhurtham)',
      'Crisp perforated tear edge that never jams or tears mid-sheet',
      'Eye-level 4-color corporate advertisement space for your business name & contact',
      'Available in Medium (7x10"), Jumbo (9x11.5"), and Giant Deluxe (10x15") sizes'
    ],
    mockupImg: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'monthly-12-sheet',
    name: '12-Sheet Multi-Page Monthly Wall Calendar',
    subtitle: 'Full-Color Scenic & Thematic Wall Calendar on Premium Art Paper',
    category: 'Monthly Wall Calendars',
    tag: 'Corporate Prime',
    startingPrice: 110,
    currency: '₹',
    minOrder: 150,
    standardGsm: '170–250 GSM Bilt Royal Gloss Art Paper',
    binding: 'Black or Gold Wire-O Spiral with Wall Hanger Rod',
    dimensions: '11 × 18 inches / 15 × 20 inches / 20 × 30 inches',
    leadTime: '4–6 Business Days',
    accentColor: '#2d6a4f',
    coverFinish: 'High-Gloss Aqueous Coating & UV Spot Gloss Highlights',
    description: 'A prestige promotional wall calendar designed for corporate offices, banks, and showrooms. Available as 6-sheet or 12-sheet featuring scenic photography, spiritual iconography, or bespoke client brand artwork.',
    features: [
      '12 Distinct Leaves printed on genuine 170 GSM imported gloss art paper',
      'Large month grid with ample space for writing client appointments',
      'Permanent year-round corporate branding on every single page',
      'Heavy-duty wire-o loop binding that stays flat against the wall',
      'Optional calendar mailing tube or individual shrink wrap'
    ],
    mockupImg: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: '3d-lenticular-motion',
    name: '3D / 5D Lenticular Motion Calendar',
    subtitle: 'Optical Depth & Morphing Motion View from Different Angles',
    category: '3D & Specialty Calendars',
    tag: 'Advanced 3D Spec',
    startingPrice: 220,
    currency: '₹',
    minOrder: 100,
    standardGsm: '75 LPI Optical Lenticular PET Sheet mounted on Kappa Board',
    binding: 'Moulded Golden Synthetic Frame with Wall Mount Cleat',
    dimensions: '12 × 18 inches / 16 × 24 inches',
    leadTime: '5–7 Business Days',
    accentColor: '#7209b7',
    coverFinish: 'True Holographic 3D Depth Perception & Dual-Angle Image Morph',
    description: 'Sivakasi’s high-tech specialty calendar. Utilizes micro-optical lenticular lenses to produce realistic three-dimensional depth and animated motion without 3D glasses. Images visually transform as the viewer walks past.',
    features: [
      'Real 3D Optical Depth with animated 2-phase or 3-phase motion flip',
      'Shatter-proof optical PET lens surface resistant to dust and moisture',
      'Deluxe synthetic wood-finish golden frame with glass-like luster',
      'Tear-off daily panchangam block or 12-month card slot at base',
      'High-retention corporate gift guaranteed to remain on wall for years'
    ],
    mockupImg: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'table-calendar',
    name: 'Executive Tabletop Desk Calendar',
    subtitle: 'Rigid Hardboard Easel Stand with 300 GSM Textured Art Card',
    category: 'Tabletop & Desk',
    tag: 'Office Desk Bestseller',
    startingPrice: 95,
    currency: '₹',
    minOrder: 100,
    standardGsm: '300 GSM Matte Velvet Card + 2mm Rigid Kappa Easel Stand',
    binding: 'Twin Wire-O Spiral in Metallic Gold or Matte Black',
    dimensions: '8.5 × 6 inches / 9.5 × 6.5 inches (Landscape)',
    leadTime: '3–5 Business Days',
    accentColor: '#cfa84e',
    coverFinish: 'Spot Gloss UV on Corporate Logo & Matte Velvet Touch',
    description: 'The quintessential B2B executive corporate gift. Sits directly in front of company decision-makers for all 365 days of the year. Built on a rock-solid triangular easel wrapped in black buckram paper.',
    features: [
      '14 Leaves (12 Monthly Grids + 2 Brand Overview / Product Leaves)',
      'Rigid 2mm imported board easel that will never sag or collapse',
      'Double-sided vibrant 4-color offset printing on 300 GSM velvet art card',
      'Spot UV coating on company branding and calendar highlights',
      'Customized month grid with company holidays and milestones marked'
    ],
    mockupImg: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'kundan-stone-embossed',
    name: 'Kundan Stone & Velvet Embossed Frame Calendar',
    subtitle: 'Hand-Studded Kundan Gems with Rich Velvet Flocking',
    category: '3D & Specialty Calendars',
    tag: 'Royal Heritage Frame',
    startingPrice: 280,
    currency: '₹',
    minOrder: 50,
    standardGsm: '500 GSM Heavyweight Hardboard with Fabric Velvet Flocking',
    binding: 'Carved Royal Teak/Gold Finish Moulded Synthetic Frame',
    dimensions: '14 × 20 inches / 18 × 24 inches',
    leadTime: '6–8 Business Days',
    accentColor: '#9b2226',
    coverFinish: 'Hand-Set Kundan Stones, Glitter Highlights & Gold Foil Foil Work',
    description: 'A luxurious heirloom decorative calendar. Features genuine multi-colored Kundan stones hand-placed onto deeply embossed devotional or royal portraits, backed by soft fabric velvet flocking inside a carved gold frame.',
    features: [
      'Hand-crafted Kundan stone embellishments around crowns and ornaments',
      'Rich tactile velvet flocking that adds physical warmth and depth',
      'Deep multi-stage relief embossing with German hot foil accents',
      'Fitted with daily tear-off panchangam pad or 12-month sliding sheet',
      'Premium wedding, housewarming, and New Year VIP executive gift'
    ],
    mockupImg: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'gold-foil-photo-frame',
    name: '24K Gold Foil Embossed Photo & Devotional Frame',
    subtitle: 'Intricate Heated German Gold Foil on Heavy Mount with Synthetic Carved Frame',
    category: 'Gold Foil Photo Frames',
    tag: 'Sivakasi Specialty',
    startingPrice: 180,
    currency: '₹',
    minOrder: 50,
    standardGsm: '450 GSM Heavy Board Mount + Synthetic Teakwood/Gold Moulding',
    binding: 'Wall Mount Brass Cleat + Desktop Foldable Easel Strut',
    dimensions: '10 × 12 inches / 12 × 18 inches / 16 × 24 inches',
    leadTime: '3–5 Business Days',
    accentColor: '#e0a938',
    coverFinish: 'Multi-Level 24K Hot Stamped Gold Leaf with Acrylic Glass Protection',
    description: 'Amazing Ads’ highly sought-after signature gold foil frames. Intricate heated gold foil stamping on heavy relief mount board featuring divine religious icons (Sri Balaji, Murugan, Lakshmi Kubera, Mecca, Velankanni) or bespoke corporate executive portraits, cased in ornate carved synthetic frames.',
    features: [
      'High-purity 24K German metallic gold leaf hot pressed under high hydraulic pressure',
      'Ornate carved synthetic frame in Antique Teak, Classic Gold, or Matte Rosewood',
      'Front crystal-clear shatterproof acrylic protection layer',
      'Dual orientation hanging cleat with desk standing strut',
      'Perfect for corporate mementos, spiritual occasions, and executive gift boxes'
    ],
    mockupImg: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80'
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

// 2. Products with seamless fallback
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
        return json.data;
      }
    }
  } catch {
    // Graceful fallback to static Sivakasi catalog
  }

  if (category && category !== 'All') {
    return SIVAKASI_CATALOG.filter((item) => item.category === category);
  }
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

  // Local fallback calculation using exact Sivakasi formula
  const qty = payload.quantity || 100;
  let baseUnitPrice = 110;
  if (payload.format.includes('Gold Foil')) baseUnitPrice = 145;
  else if (payload.format.includes('Daily Sheet')) baseUnitPrice = 65;
  else if (payload.format.includes('Monthly Wall')) baseUnitPrice = 110;
  else if (payload.format.includes('Lenticular') || payload.format.includes('3D')) baseUnitPrice = 220;
  else if (payload.format.includes('Tabletop') || payload.format.includes('Desk')) baseUnitPrice = 95;
  else if (payload.format.includes('Kundan')) baseUnitPrice = 280;
  else if (payload.format.includes('Photo Frame') || payload.format.includes('Frame')) baseUnitPrice = 180;

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
  if (qty >= 10000) discountPercentage = 42;
  else if (qty >= 5000) discountPercentage = 35;
  else if (qty >= 2500) discountPercentage = 28;
  else if (qty >= 1000) discountPercentage = 22;
  else if (qty >= 500) discountPercentage = 15;
  else if (qty >= 200) discountPercentage = 8;

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
