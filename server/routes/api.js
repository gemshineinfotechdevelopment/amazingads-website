import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Quote } from '../models/Quote.js';
import { SampleKit } from '../models/SampleKit.js';
import { Inquiry } from '../models/Inquiry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Mongoose Schemas for MongoDB Atlas
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  subtitle: String,
  category: String,
  tag: String,
  startingPrice: Number,
  currency: { type: String, default: '₹' },
  minOrder: Number,
  standardGsm: String,
  binding: String,
  dimensions: String,
  leadTime: String,
  accentColor: String,
  coverFinish: String,
  description: String,
  features: [String],
  mockupImg: String,
  sizes: [String],
  sizePrices: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

let ProductModel;
try {
  ProductModel = mongoose.model('CalendarProduct', productSchema);
} catch {
  ProductModel = mongoose.models.CalendarProduct;
}

const messageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  email: String,
  product: String,
  size: String,
  quantity: Number,
  notes: String,
  message: String,
  status: { type: String, default: 'New' },
  createdAt: { type: String }
}, { timestamps: true });

let MessageModel;
try {
  MessageModel = mongoose.model('CustomerMessage', messageSchema);
} catch {
  MessageModel = mongoose.models.CustomerMessage;
}

const settingsSchema = new mongoose.Schema({
  key: { type: String, default: 'factory_settings', unique: true },
  factoryName: { type: String, default: 'Amazing Ads Sivakasi Works' },
  tagline: { type: String, default: "India's Premier Manufacturer of PET Foil, 5D Holographic & Stone Art Devotional Calendars" },
  logoUrl: { type: String, default: '' },
  address: { type: String, default: '3/1, Vannakara Street, Chairman P.K.S.A. Arumuganadar Road, Sivakasi 626189, Tamil Nadu' },
  phone: { type: String, default: '+91 97904 72767' },
  secondaryPhone: { type: String, default: '+91 97904 27670' },
  whatsapp: { type: String, default: '+91 97904 72767' },
  email: { type: String, default: 'aamazingads@gmail.com' },
  supportEmail: { type: String, default: 'sales@amazingads.in' },
  websiteUrl: { type: String, default: 'www.amazingads.in' },
  operatingHours: { type: String, default: 'Mon – Sat: 8:30 AM – 8:30 PM IST' },
  gstNumber: { type: String, default: '33AABCA1234F1Z8' },
  standardLeadTime: { type: String, default: '3–5 Business Days' },
  bulkLeadTime: { type: String, default: '6–8 Business Days (2,000+ units)' },
  carriers: { type: String, default: 'BlueDart Express, VRL Logistics, TCI Freight, ARC Parcel Service' },
  discountTiers: { type: Array, default: [] }
}, { timestamps: true });

let SettingsModel;
try {
  SettingsModel = mongoose.model('FactorySettings', settingsSchema);
} catch {
  SettingsModel = mongoose.models.FactorySettings;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

const router = Router();

// Authentic Amazing Ads Sivakasi Calendar Catalog & Specifications
const DEFAULT_CALENDAR_CATALOG = [
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
    tagline: 'Mass Advertising with High Everyday Utility',
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

function loadProductsFromDisk() {
  ensureDataDir();
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const raw = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Storage] Error reading products.json:', err.message);
  }
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(DEFAULT_CALENDAR_CATALOG, null, 2), 'utf-8');
  } catch {}
  return JSON.parse(JSON.stringify(DEFAULT_CALENDAR_CATALOG));
}

function saveProductsToDisk(products) {
  ensureDataDir();
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage] Error writing products.json:', err.message);
  }
}

function loadMessagesFromDisk() {
  ensureDataDir();
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Storage] Error reading messages.json:', err.message);
  }
  const defaultMessages = [
    {
      id: 'MSG-1001',
      name: 'Karthik Raja',
      phone: '+91 98401 23456',
      message: 'Hello, need wholesale rate for 500 pcs Lord Balaji Stone Art calendar with our company name printed at the top.',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: 'New'
    },
    {
      id: 'MSG-1002',
      name: 'Lakshmi Narayanan',
      phone: '+91 97904 88765',
      message: 'Hi Amazing Ads, can you share the sample kit and delivery timeline to Madurai?',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      status: 'Replied'
    }
  ];
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(defaultMessages, null, 2), 'utf-8');
  } catch {}
  return defaultMessages;
}

function saveMessagesToDisk(messages) {
  ensureDataDir();
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage] Error writing messages.json:', err.message);
  }
}

const DEFAULT_DISCOUNT_TIERS = [
  { id: 'tier-1', minQty: 200, maxQty: '499', discountPercentage: 8, label: 'Tier 1 Standard Wholesale' },
  { id: 'tier-2', minQty: 500, maxQty: '999', discountPercentage: 15, label: 'Tier 2 Volume Wholesale' },
  { id: 'tier-3', minQty: 1000, maxQty: '2,499', discountPercentage: 22, label: 'Tier 3 Corporate Batch' },
  { id: 'tier-4', minQty: 2500, maxQty: '4,999', discountPercentage: 28, label: 'Tier 4 Super Volume' },
  { id: 'tier-5', minQty: 5000, maxQty: '9,999', discountPercentage: 35, label: 'Tier 5 Export Mega Lot' },
  { id: 'tier-6', minQty: 10000, maxQty: '10,000+', discountPercentage: 42, label: 'Tier 6 Master Press Contract' }
];

const DEFAULT_FACTORY_SETTINGS = {
  factoryName: 'Amazing Ads Sivakasi Works',
  tagline: "India's Premier Manufacturer of PET Foil, 5D Holographic & Stone Art Devotional Calendars",
  logoUrl: '',
  address: '3/1, Vannakara Street, Chairman P.K.S.A. Arumuganadar Road, Sivakasi 626189, Tamil Nadu',
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
  carriers: 'BlueDart Express, VRL Logistics, TCI Freight, ARC Parcel Service',
  discountTiers: DEFAULT_DISCOUNT_TIERS
};

function loadSettingsFromDisk() {
  ensureDataDir();
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const raw = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return { ...DEFAULT_FACTORY_SETTINGS, ...parsed };
      }
    }
  } catch (err) {
    console.warn('[Storage] Error reading settings.json:', err.message);
  }
  return { ...DEFAULT_FACTORY_SETTINGS };
}

function saveSettingsToDisk(settings) {
  ensureDataDir();
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage] Error writing settings.json:', err.message);
  }
}

let calendarCatalog = loadProductsFromDisk();
let factorySettings = loadSettingsFromDisk();

let quoteRequests = [];
let sampleKitRequests = [];
let corporateInquiries = [];
let customerMessages = loadMessagesFromDisk();

// Initialize MongoDB sync if connected
if (mongoose.connection) {
  mongoose.connection.on('connected', async () => {
    try {
      if (ProductModel) {
        const count = await ProductModel.countDocuments();
        if (count === 0) {
          await ProductModel.insertMany(calendarCatalog);
          console.log('[MongoDB] Seeded products collection from disk cache');
        } else {
          const mongoProducts = await ProductModel.find().lean();
          if (mongoProducts && mongoProducts.length > 0) {
            calendarCatalog = mongoProducts.map(p => {
              const { _id, __v, ...rest } = p;
              return rest;
            });
            saveProductsToDisk(calendarCatalog);
            console.log('[MongoDB] Synced products from MongoDB Atlas to disk cache');
          }
        }
      }
      if (MessageModel) {
        const count = await MessageModel.countDocuments();
        if (count === 0 && customerMessages.length > 0) {
          await MessageModel.insertMany(customerMessages);
        } else {
          const mongoMessages = await MessageModel.find().sort({ createdAt: -1 }).lean();
          if (mongoMessages && mongoMessages.length > 0) {
            customerMessages = mongoMessages.map(m => {
              const { _id, __v, ...rest } = m;
              return rest;
            });
            saveMessagesToDisk(customerMessages);
          }
        }
      }
      if (SettingsModel) {
        const found = await SettingsModel.findOne({ key: 'factory_settings' }).lean();
        if (!found) {
          await SettingsModel.create({ key: 'factory_settings', ...factorySettings });
          console.log('[MongoDB] Seeded factory settings into Atlas database');
        } else {
          const { _id, __v, key: _key, ...rest } = found;
          factorySettings = { ...DEFAULT_FACTORY_SETTINGS, ...rest };
          saveSettingsToDisk(factorySettings);
          console.log('[MongoDB] Synced factory settings from Atlas to disk cache');
        }
      }
    } catch (err) {
      console.warn('[MongoDB] Init sync notice:', err.message);
    }
  });
}

// 1. Health & Server Status
router.get('/health', (req, res) => {
  const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const dbState = dbStates[mongoose.connection.readyState] || 'unknown';
  res.json({
    status: 'online',
    system: 'Amazing Ads Sivakasi - Master Printing Press Engine',
    database: {
      provider: 'MongoDB Atlas',
      state: dbState,
      connected: mongoose.connection.readyState === 1
    },
    port: process.env.PORT || 5000,
    hub: 'Sivakasi, Tamil Nadu (Printing Capital of India)',
    version: '3.0.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Get All Catalog Items
router.get('/calendar-products', (req, res) => {
  const { category } = req.query;
  let items = [...calendarCatalog];

  if (category && category !== 'All') {
    items = items.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  res.json({
    success: true,
    total: items.length,
    data: items
  });
});

// 2b. Update Catalog Product (Admin)
router.put('/calendar-products/:id', async (req, res) => {
  const { id } = req.params;
  const index = calendarCatalog.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID '${id}' not found`
    });
  }

  const current = calendarCatalog[index];
  const updated = {
    ...current,
    ...req.body,
    id: current.id, // preserve ID
    startingPrice: req.body.startingPrice !== undefined ? Number(req.body.startingPrice) : current.startingPrice,
    minOrder: req.body.minOrder !== undefined ? Number(req.body.minOrder) : current.minOrder,
    sizes: Array.isArray(req.body.sizes) ? req.body.sizes : current.sizes,
    sizePrices: req.body.sizePrices && typeof req.body.sizePrices === 'object' ? req.body.sizePrices : (current.sizePrices || {})
  };

  calendarCatalog[index] = updated;
  saveProductsToDisk(calendarCatalog);

  if (mongoose.connection.readyState === 1 && ProductModel) {
    try {
      await ProductModel.findOneAndUpdate({ id: updated.id }, updated, { upsert: true });
    } catch (err) {
      console.warn('[MongoDB] Update product error:', err.message);
    }
  }

  res.json({
    success: true,
    message: 'Product updated successfully',
    data: updated
  });
});

// 2c. Create New Product (Admin)
router.post('/calendar-products', async (req, res) => {
  const newProduct = {
    id: req.body.id || `product-${Date.now()}`,
    name: req.body.name || 'New Calendar Product',
    subtitle: req.body.subtitle || 'Custom Sivakasi Manufacturing Edition',
    category: req.body.category || 'Special Products',
    tag: req.body.tag || 'New Arrival',
    startingPrice: Number(req.body.startingPrice) || 120,
    currency: '₹',
    minOrder: Number(req.body.minOrder) || 100,
    standardGsm: req.body.standardGsm || '400 GSM Rigid Kappa Board',
    binding: req.body.binding || 'Deluxe Frame / Tin Mount',
    dimensions: req.body.dimensions || '14 × 20 inches',
    leadTime: req.body.leadTime || '4–6 Business Days',
    accentColor: req.body.accentColor || '#cfa84e',
    coverFinish: req.body.coverFinish || '24K Heated Gold Foil & Multi-stage Emboss',
    description: req.body.description || 'Precision crafted at Amazing Ads Sivakasi Works.',
    features: Array.isArray(req.body.features) && req.body.features.length > 0 ? req.body.features : [
      'Authentic Sivakasi Direct Factory Finish',
      'High Quality Moisture Resistant Substrate',
      'Full Color HD Print & Hot Stamping'
    ],
    mockupImg: req.body.mockupImg || '/images/stone-art-calendar-real.jpg',
    sizes: Array.isArray(req.body.sizes) && req.body.sizes.length > 0 ? req.body.sizes : [
      '14 × 20 inches (Standard)',
      '18 × 24 inches (Deluxe)'
    ],
    sizePrices: req.body.sizePrices && typeof req.body.sizePrices === 'object' ? req.body.sizePrices : {}
  };

  calendarCatalog.push(newProduct);
  saveProductsToDisk(calendarCatalog);

  if (mongoose.connection.readyState === 1 && ProductModel) {
    try {
      await ProductModel.findOneAndUpdate({ id: newProduct.id }, newProduct, { upsert: true });
    } catch (err) {
      console.warn('[MongoDB] Create product error:', err.message);
    }
  }

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct
  });
});

// 2d. Delete Product (Admin)
router.delete('/calendar-products/:id', async (req, res) => {
  const { id } = req.params;
  const initialLength = calendarCatalog.length;
  calendarCatalog = calendarCatalog.filter(p => p.id !== id);

  if (calendarCatalog.length === initialLength) {
    return res.status(404).json({
      success: false,
      message: `Product with ID '${id}' not found`
    });
  }

  saveProductsToDisk(calendarCatalog);

  if (mongoose.connection.readyState === 1 && ProductModel) {
    try {
      await ProductModel.deleteOne({ id });
    } catch (err) {
      console.warn('[MongoDB] Delete product error:', err.message);
    }
  }

  res.json({
    success: true,
    message: 'Product deleted successfully',
    deletedId: id
  });
});

// 2e. Reset Catalog to Defaults (Admin)
router.post('/calendar-products/reset', async (req, res) => {
  calendarCatalog = JSON.parse(JSON.stringify(DEFAULT_CALENDAR_CATALOG));
  saveProductsToDisk(calendarCatalog);

  if (mongoose.connection.readyState === 1 && ProductModel) {
    try {
      await ProductModel.deleteMany({});
      await ProductModel.insertMany(calendarCatalog);
    } catch (err) {
      console.warn('[MongoDB] Reset products error:', err.message);
    }
  }

  res.json({
    success: true,
    message: 'Catalog reset to original Sivakasi master specifications',
    data: calendarCatalog
  });
});

// 2f. Admin Dashboard Overview & Activity Feed
router.get('/admin/overview', async (req, res) => {
  let quotesCount = quoteRequests.length;
  let sampleKitsCount = sampleKitRequests.length;
  let inquiriesCount = corporateInquiries.length;
  let messagesCount = customerMessages.length;
  let recentQuotes = quoteRequests.slice(-10).reverse();
  let recentSampleKits = sampleKitRequests.slice(-10).reverse();
  let recentInquiries = corporateInquiries.slice(-10).reverse();

  if (mongoose.connection.readyState === 1) {
    try {
      const [qCount, skCount, inqCount, dbQuotes, dbKits, dbInqs] = await Promise.all([
        Quote.countDocuments(),
        SampleKit.countDocuments(),
        Inquiry.countDocuments(),
        Quote.find().sort({ createdAt: -1 }).limit(10).lean(),
        SampleKit.find().sort({ createdAt: -1 }).limit(10).lean(),
        Inquiry.find().sort({ createdAt: -1 }).limit(10).lean()
      ]);
      quotesCount = qCount;
      sampleKitsCount = skCount;
      inquiriesCount = inqCount;
      if (dbQuotes && dbQuotes.length > 0) {
        recentQuotes = dbQuotes.map(q => ({
          id: q.quoteId || q.id,
          clientName: q.client?.name || q.clientName || 'Customer',
          company: q.client?.company || q.company || 'Corporate Client',
          phone: q.client?.phone || q.phone || 'Direct',
          product: q.format || 'Calendar Spec',
          quantity: q.quantity || 100,
          totalPrice: q.subtotal || 0,
          date: q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'Recent',
          status: 'New'
        }));
      }
      if (dbKits && dbKits.length > 0) recentSampleKits = dbKits;
      if (dbInqs && dbInqs.length > 0) recentInquiries = dbInqs;
    } catch (err) {
      console.warn('[MongoDB] Overview fetch warning:', err.message);
    }
  }

  res.json({
    success: true,
    data: {
      totalProducts: calendarCatalog.length,
      totalQuotesGenerated: quotesCount,
      totalSampleKitsRequested: sampleKitsCount,
      totalCorporateInquiries: inquiriesCount,
      totalCustomerMessages: messagesCount,
      recentQuotes,
      recentSampleKits,
      recentInquiries,
      recentMessages: customerMessages.slice(-10).reverse()
    }
  });
});

// 2g. Admin Login Endpoint
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  const validUser = (username === 'admin' || username === 'amazingads') && (password === 'admin' || password === 'amazingads2026');

  if (validUser) {
    return res.json({
      success: true,
      message: 'Login successful',
      token: `token-${Date.now()}`,
      admin: {
        username: 'admin',
        role: 'Master Press Administrator',
        hub: 'Sivakasi Works'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid administrator credentials. Please check your username and password.'
  });
});

// Deduplication Helper for Customer Inquiries
function isDuplicateCustomerMessage(name, phone, email, messageText) {
  const now = Date.now();
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanName = (name || '').trim().toLowerCase();
  const cleanText = (messageText || '').trim().toLowerCase();

  return customerMessages.some(m => {
    const timeDiff = now - new Date(m.createdAt).getTime();
    if (timeDiff > 120000) return false; // older than 2 minutes is not a duplicate

    const mPhone = (m.phone || '').replace(/[^0-9]/g, '');
    const mEmail = (m.email || '').trim().toLowerCase();
    const mName = (m.name || '').trim().toLowerCase();
    const mText = (m.message || '').trim().toLowerCase();

    // Exact message text or phone match within 2 minutes
    if (cleanPhone && mPhone && cleanPhone.length >= 7 && mPhone.length >= 7 && cleanPhone === mPhone) {
      return true;
    }
    if (cleanEmail && mEmail && cleanEmail === mEmail) {
      return true;
    }
    if (cleanName && mName && cleanName === mName && (cleanText === mText || (cleanPhone && mPhone && cleanPhone === mPhone))) {
      return true;
    }
    return false;
  });
}

// 2h. Customer Inquiries (Create, Retrieve, Status & Delete)
router.post('/messages', async (req, res) => {
  const { name, phone, email, product, size, quantity, notes, message } = req.body;
  if (!name || (!message && !product)) {
    return res.status(400).json({
      success: false,
      message: 'Name and inquiry details are required'
    });
  }

  // Prevent duplicate submissions within 2 minutes
  if (isDuplicateCustomerMessage(name, phone, email, message)) {
    const existing = customerMessages.find(m => {
      const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
      const mPhone = (m.phone || '').replace(/[^0-9]/g, '');
      return (cleanPhone && mPhone && cleanPhone === mPhone) || (email && m.email && email.toLowerCase() === m.email.toLowerCase());
    }) || customerMessages[0];

    return res.status(200).json({
      success: true,
      message: 'Inquiry already received and queued for factory manager',
      data: existing
    });
  }

  const newMessage = {
    id: `MSG-${Date.now().toString().slice(-4)}`,
    name: name.trim(),
    phone: phone ? phone.trim() : 'Not provided',
    email: email ? email.trim() : '',
    product: product ? product.trim() : '',
    size: size ? size.trim() : '',
    quantity: quantity ? Number(quantity) : null,
    notes: notes ? notes.trim() : '',
    message: (message || `${product || 'Product'} inquiry - Size: ${size || 'Standard'}, Qty: ${quantity || 100}`).trim(),
    createdAt: new Date().toISOString(),
    status: 'New'
  };

  customerMessages.unshift(newMessage);
  saveMessagesToDisk(customerMessages);

  if (mongoose.connection.readyState === 1 && MessageModel) {
    try {
      await MessageModel.create(newMessage);
    } catch (err) {
      console.warn('[MongoDB] Create message error:', err.message);
    }
  }

  res.status(201).json({
    success: true,
    message: 'Inquiry routed to factory manager successfully',
    data: newMessage
  });
});

router.get('/messages', (req, res) => {
  res.json({
    success: true,
    total: customerMessages.length,
    data: customerMessages
  });
});

router.put('/messages/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const msg = customerMessages.find(m => m.id === id);
  if (msg) {
    msg.status = status || 'Replied';
    saveMessagesToDisk(customerMessages);

    if (mongoose.connection.readyState === 1 && MessageModel) {
      try {
        await MessageModel.updateOne({ id }, { status: msg.status });
      } catch (err) {
        console.warn('[MongoDB] Update message status error:', err.message);
      }
    }

    return res.json({ success: true, data: msg });
  }
  res.status(404).json({ success: false, message: 'Message not found' });
});

router.delete('/messages/:id', async (req, res) => {
  const { id } = req.params;
  const initialLength = customerMessages.length;
  customerMessages = customerMessages.filter(m => m.id !== id);

  if (customerMessages.length === initialLength) {
    return res.status(404).json({
      success: false,
      message: `Inquiry with ID '${id}' not found`
    });
  }

  saveMessagesToDisk(customerMessages);

  if (mongoose.connection.readyState === 1 && MessageModel) {
    try {
      await MessageModel.deleteOne({ id });
    } catch (err) {
      console.warn('[MongoDB] Delete message error:', err.message);
    }
  }

  res.json({
    success: true,
    message: 'Inquiry deleted successfully',
    deletedId: id
  });
});

// 2i. Factory Settings & Contact Info (Admin & Website Sync)
router.get('/settings', (req, res) => {
  res.json({
    success: true,
    data: factorySettings
  });
});

router.put('/settings', async (req, res) => {
  factorySettings = {
    ...factorySettings,
    ...req.body,
    discountTiers: req.body.discountTiers || factorySettings.discountTiers || DEFAULT_DISCOUNT_TIERS
  };
  saveSettingsToDisk(factorySettings);

  if (mongoose.connection.readyState === 1 && SettingsModel) {
    try {
      await SettingsModel.findOneAndUpdate(
        { key: 'factory_settings' },
        { $set: factorySettings },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.warn('[MongoDB] Update settings error:', err.message);
    }
  }

  res.json({
    success: true,
    message: 'Factory settings updated successfully',
    data: factorySettings
  });
});

// 2j. Factory Wholesale Discount Tiers (Admin & Quote Sync)
router.get('/discounts', (req, res) => {
  res.json({
    success: true,
    data: factorySettings.discountTiers || DEFAULT_DISCOUNT_TIERS
  });
});

router.put('/discounts', async (req, res) => {
  const tiers = Array.isArray(req.body) ? req.body : req.body.tiers || DEFAULT_DISCOUNT_TIERS;
  factorySettings.discountTiers = tiers;
  saveSettingsToDisk(factorySettings);

  if (mongoose.connection.readyState === 1 && SettingsModel) {
    try {
      await SettingsModel.findOneAndUpdate(
        { key: 'factory_settings' },
        { $set: { discountTiers: tiers } },
        { upsert: true }
      );
    } catch (err) {
      console.warn('[MongoDB] Update discounts error:', err.message);
    }
  }

  res.json({
    success: true,
    message: 'Wholesale discount tiers updated successfully',
    data: tiers
  });
});

// 3. Dynamic Quote Calculator Engine for Amazing Ads Sivakasi
router.post('/quote-calculator', async (req, res) => {
  const {
    productId,
    format,
    paperGsm,
    finish,
    binding,
    quantity,
    clientName,
    clientEmail,
    clientPhone,
    company
  } = req.body;

  const qty = parseInt(quantity, 10) || 100;

  // Dynamic Sivakasi Base Pricing per Unit (Syncs with Admin catalog updates & allows size-specific base rate)
  let matchedProduct = null;
  if (productId) {
    matchedProduct = calendarCatalog.find(p => p.id === productId);
  }
  if (!matchedProduct && format) {
    const fLower = format.toLowerCase();
    matchedProduct = calendarCatalog.find(p =>
      p.name.toLowerCase().includes(fLower) ||
      p.category.toLowerCase().includes(fLower) ||
      fLower.includes(p.category.toLowerCase()) ||
      fLower.includes(p.name.toLowerCase())
    );
  }

  let baseUnitPrice = 110;
  if (req.body.customUnitPrice && Number(req.body.customUnitPrice) > 0) {
    baseUnitPrice = Number(req.body.customUnitPrice);
  } else if (matchedProduct) {
    baseUnitPrice = (req.body.size && matchedProduct.sizePrices && matchedProduct.sizePrices[req.body.size]) || matchedProduct.startingPrice;
  } else if (format?.includes('PET Foil') || format?.includes('Gold Foil')) baseUnitPrice = 145;
  else if (format?.includes('5D') || format?.includes('3D')) baseUnitPrice = 220;
  else if (format?.includes('Stone Art') || format?.includes('Kundan')) baseUnitPrice = 280;
  else if (format?.includes('Hand Fan')) baseUnitPrice = 28;
  else if (format?.includes('Special Products') || format?.includes('Special')) baseUnitPrice = 195;
  else if (format === 'Traditional Daily Sheet' || format?.includes('Daily Sheet')) baseUnitPrice = 65;
  else if (format === '12-Sheet Monthly Wall' || format?.includes('Monthly Wall')) baseUnitPrice = 110;
  else if (format === 'Executive Tabletop Desk' || format?.includes('Tabletop') || format?.includes('Desk')) baseUnitPrice = 95;
  else if (format === '24K Gold Foil Photo Frame' || format?.includes('Photo Frame') || format?.includes('Frame')) baseUnitPrice = 180;

  // Finish extras
  let finishSurcharge = 0;
  if (finish === '24K Heated Brass Gold Foil' || finish?.includes('Gold Foil')) finishSurcharge = 22;
  else if (finish === 'Spot Gloss UV & Velvet Lamination') finishSurcharge = 16;
  else if (finish === '3D Optical Lenticular Depth' || finish?.includes('5D Optical')) finishSurcharge = 45;
  else if (finish === 'Hand-Set Kundan Stones & Glitter' || finish?.includes('Stone Wash')) finishSurcharge = 55;

  // Binding adjustments
  let bindingCost = 10;
  if (binding === 'Deluxe Moulded Synthetic Gold Frame' || binding?.includes('Moulded')) bindingCost = 35;
  else if (binding === 'Heavy-Gauge Anti-Rust Tin Plate' || binding?.includes('Tin Plate')) bindingCost = 12;
  else if (binding === 'Twin Wire-O Gold Spiral') bindingCost = 15;

  // Dynamic Sivakasi Wholesale Volume Tiered Discounts (from Admin settings)
  let discountPercentage = 0;
  const tiers = (factorySettings.discountTiers && factorySettings.discountTiers.length > 0)
    ? factorySettings.discountTiers
    : DEFAULT_DISCOUNT_TIERS;
  const sortedTiers = [...tiers].sort((a, b) => b.minQty - a.minQty);
  for (const t of sortedTiers) {
    if (qty >= t.minQty) {
      discountPercentage = t.discountPercentage;
      break;
    }
  }

  const rawUnit = baseUnitPrice + finishSurcharge + bindingCost;
  const unitPrice = Math.max(25, Math.round(rawUnit * (1 - discountPercentage / 100)));
  const subtotal = unitPrice * qty;
  const standardSubtotal = Math.round(rawUnit * qty);
  const totalSavings = standardSubtotal - subtotal;

  const quoteId = `AA-${Math.floor(100000 + Math.random() * 900000)}`;

  const quoteSummary = {
    quoteId,
    productId: productId || null,
    format: format || 'Real 24K Gold Foil Wall',
    size: req.body.size || null,
    paperGsm: paperGsm || '400 GSM Rigid Board',
    finish: finish || '24K Heated Brass Gold Foil',
    binding: binding || 'Heavy-Gauge Anti-Rust Tin Plate',
    quantity: qty,
    unitPrice,
    subtotal,
    currency: '₹',
    discountPercentage,
    totalSavings,
    estimatedTurnaround: qty > 2000 ? '6–8 Business Days' : '3–5 Business Days',
    expressEligible: true,
    dispatchHub: 'Sivakasi Works Dispatch via BlueDart / VRL Logistics',
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    client: {
      name: clientName || 'Guest Estimator',
      company: company || 'Corporate / Trade Account',
      email: clientEmail || null,
      phone: clientPhone || null
    },
    createdAt: new Date().toISOString()
  };

  quoteRequests.push(quoteSummary);

  // If customer details were provided, also record as customer inquiry for Admin Tab 1 (if not already queued)
  if (clientName && (clientPhone || clientEmail) && !isDuplicateCustomerMessage(clientName, clientPhone, clientEmail)) {
    const newLead = {
      id: `INQ-${quoteId.slice(-4)}`,
      name: clientName.trim(),
      phone: clientPhone ? clientPhone.trim() : 'Not provided',
      email: clientEmail ? clientEmail.trim() : '',
      product: format || 'Customizer Quotation',
      size: req.body.size || 'Standard Size',
      quantity: qty,
      notes: req.body.notes || '',
      message: `Quotation ${quoteId}: ${format || 'Calendar'} (${req.body.size || 'Standard'}), ${qty} units @ ₹${unitPrice}/unit. Est: ₹${subtotal.toLocaleString()}.${company ? ` Company: ${company}` : ''}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    customerMessages.unshift(newLead);
    saveMessagesToDisk(customerMessages);
    if (mongoose.connection.readyState === 1 && MessageModel) {
      try { MessageModel.create(newLead); } catch {}
    }
  }

  // Persist to MongoDB Atlas
  try {
    if (mongoose.connection.readyState === 1) {
      await Quote.create(quoteSummary);
      console.log(`[MongoDB] Quote ${quoteId} saved to Atlas database.`);
    }
  } catch (err) {
    console.error(`[MongoDB] Failed to persist quote: ${err.message}`);
  }

  res.status(200).json({
    success: true,
    message: `Official Amazing Ads Sivakasi Quote ${quoteId} generated successfully.`,
    data: quoteSummary
  });
});

// 4. Sample Kit Request Endpoint
router.post(['/sample-kit', '/request-sample-kit'], async (req, res) => {
  const { name, email, company, phone, shippingAddress, preferredStyles } = req.body;

  if (!name || !email || !shippingAddress) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and shipping address are mandatory for sample kit dispatch.'
    });
  }

  const sampleOrder = {
    sampleId: `AA-SMP-${Date.now().toString().slice(-6)}`,
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || 'Direct Client',
    phone: phone?.trim() || 'N/A',
    shippingAddress: shippingAddress.trim(),
    preferredStyles: preferredStyles || ['Gold Foil Calendars', 'Daily Panchangam', 'Tabletop Desk'],
    kitContents: [
      'Real 24K Gold Foil & Embossed Proof Sample on Virgin Kappa Board',
      'Daily Panchangam Leaf Sampler (Tamil & English Astrological Data)',
      '12-Sheet Art Paper Gloss & Matte Lamination Swatches',
      'Tabletop Desk Calendar Mini Proof with Wire-O Spiral',
      'Amazing Ads Sivakasi Official Wholesale Trade Catalog'
    ],
    status: 'Dispatched from Sivakasi Press Hub',
    estimatedDeliveryDays: '2–3 Business Days (Express Courier)',
    requestedAt: new Date().toISOString()
  };

  sampleKitRequests.push(sampleOrder);

  // Automatically record to Customer Inquiries for Admin display
  const sampleInquiry = {
    id: `SMP-${sampleOrder.sampleId.slice(-4)}`,
    name: name.trim(),
    phone: phone ? phone.trim() : 'Not provided',
    email: email.trim(),
    product: 'Free Master Swatch Kit',
    size: 'Sample Box Spec',
    quantity: 1,
    notes: shippingAddress.trim(),
    message: `Sample Kit Request (${sampleOrder.sampleId})\nCompany: ${company || 'N/A'}\nShipping: ${shippingAddress}`,
    createdAt: new Date().toISOString(),
    status: 'New'
  };
  customerMessages.unshift(sampleInquiry);
  saveMessagesToDisk(customerMessages);
  if (mongoose.connection.readyState === 1 && MessageModel) {
    try { MessageModel.create(sampleInquiry); } catch {}
  }

  // Persist to MongoDB Atlas
  try {
    if (mongoose.connection.readyState === 1) {
      await SampleKit.create(sampleOrder);
      console.log(`[MongoDB] Sample Kit ${sampleOrder.sampleId} saved to Atlas database.`);
    }
  } catch (err) {
    console.error(`[MongoDB] Failed to persist sample kit: ${err.message}`);
  }

  console.log(`[Amazing Ads Sample Kit] Dispatched to ${sampleOrder.name} (${sampleOrder.company}) at ${sampleOrder.shippingAddress}`);

  res.status(201).json({
    success: true,
    message: `Your Amazing Ads Sivakasi Master Sample Box is booked under ID ${sampleOrder.sampleId}. We are dispatching it via priority courier!`,
    data: sampleOrder
  });
});

// 5. Corporate Bespoke Consultation / Contact
router.post(['/contact', '/corporate-inquiry'], async (req, res) => {
  const { name, email, company, quantityNeeded, targetDate, message, specs } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide your name, corporate email, and your project brief.'
    });
  }

  const inquiry = {
    inquiryId: `AA-INQ-${Date.now().toString().slice(-6)}`,
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || 'Corporate Client',
    quantityNeeded: quantityNeeded || '500+',
    targetDate: targetDate || 'New Year / Pongal / Festival Corporate Gifting',
    message: message.trim(),
    specs: specs || {},
    receivedAt: new Date().toISOString(),
    assignedPrintMaster: 'Amazing Ads Sivakasi Press Works Team'
  };

  corporateInquiries.push(inquiry);

  // Automatically save as Customer Inquiry so Admin sees it in Tab 1 immediately (deduplicating if sent via messages)
  const contactPhone = (specs?.phone || req.body.phone || 'Provided via form').trim();
  if (!isDuplicateCustomerMessage(name, contactPhone, email, message)) {
    const contactMsg = {
      id: `CNT-${inquiry.inquiryId.slice(-4)}`,
      name: name.trim(),
      phone: contactPhone,
      email: email.trim(),
      product: req.body.subject || 'Contact Page Inquiry',
      size: req.body.size || 'Custom',
      quantity: quantityNeeded ? parseInt(quantityNeeded, 10) || null : null,
      notes: req.body.company || '',
      message: `Contact Inquiry (${inquiry.inquiryId}):\n${message}${company ? `\nCompany: ${company}` : ''}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    customerMessages.unshift(contactMsg);
    saveMessagesToDisk(customerMessages);
    if (mongoose.connection.readyState === 1 && MessageModel) {
      try { MessageModel.create(contactMsg); } catch {}
    }
  }

  // Persist to MongoDB Atlas
  try {
    if (mongoose.connection.readyState === 1) {
      await Inquiry.create(inquiry);
      console.log(`[MongoDB] Inquiry ${inquiry.inquiryId} saved to Atlas database.`);
    }
  } catch (err) {
    console.error(`[MongoDB] Failed to persist inquiry: ${err.message}`);
  }

  console.log(`[Amazing Ads Sivakasi Inquiry] ${inquiry.company} - ${inquiry.name}: ${inquiry.message}`);

  res.status(201).json({
    success: true,
    message: `Thank you, ${name}. Your order brief (${inquiry.inquiryId}) is assigned to our Sivakasi Works manager. We will contact you via Phone / Email shortly.`,
    data: inquiry
  });
});

// 6. Atelier Statistics & Proof Metrics for Amazing Ads Sivakasi
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      calendarsPrintedYearToDate: '2,800,000+',
      corporateClientsServed: '1,450+',
      sivakasiPressCapacity: '50,000 Calendars / Day',
      onTimeDeliveryRate: '99.8%',
      foilPressTolerances: '0.05 mm Micro-registration',
      establishedYear: 2008,
      pressHQ: factorySettings.address || '3/1, Vannakara Street, Chairman P.K.S.A. Arumuganadar Road, Sivakasi 626189',
      factoryPhone: `${factorySettings.phone || '+91 97904 72767'}${factorySettings.secondaryPhone ? ` / ${factorySettings.secondaryPhone}` : ''}`,
      hotlinePhone: factorySettings.secondaryPhone || '+91 98400 55220',
      factoryEmail: factorySettings.email || 'aamazingads@gmail.com',
      dispatchPartners: ['BlueDart Express', 'VRL Logistics', 'ST Courier', 'Professional Courier']
    }
  });
});

// 7. Get Recent Inquiries from MongoDB / In-Memory (Admin)
router.get('/inquiries', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(100);
      return res.json({ success: true, count: dbInquiries.length, data: dbInquiries });
    }
    res.json({ success: true, count: corporateInquiries.length, data: corporateInquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Get Recent Sample Kit Requests from MongoDB / In-Memory (Admin)
router.get('/sample-kits', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbKits = await SampleKit.find().sort({ createdAt: -1 }).limit(100);
      return res.json({ success: true, count: dbKits.length, data: dbKits });
    }
    res.json({ success: true, count: sampleKitRequests.length, data: sampleKitRequests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Get Recent Quotes from MongoDB / In-Memory (Admin)
router.get('/quotes', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbQuotes = await Quote.find().sort({ createdAt: -1 }).limit(100);
      return res.json({ success: true, count: dbQuotes.length, data: dbQuotes });
    }
    res.json({ success: true, count: quoteRequests.length, data: quoteRequests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Vector Dielines & Template Archive
router.get('/dielines', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'dieline-gold-foil-17x27',
        title: 'Gold Foil Stamped Wall Calendar Dieline',
        format: '17 × 27 inches / 15 × 20 inches',
        bleed: '3.0 mm external bleed margin',
        safeZone: '5.0 mm text safety margin',
        bindingAllowance: '12 mm top margin for tin plate & hanger punch',
        colorSpace: 'CMYK FOGRA39 + 1 Spot Channel for Gold Foil Die',
        downloadFormats: ['PDF Template', 'Adobe Illustrator (.AI)', 'CorelDraw (.CDR)']
      },
      {
        id: 'dieline-daily-jumbo',
        title: 'Traditional Daily Sheet Calendar Mount Dieline',
        format: '9 × 11.5 inches (Jumbo) / 10 × 15 inches (Super Deluxe)',
        bleed: '3.0 mm external bleed margin',
        safeZone: '4.0 mm internal text safety margin',
        bindingAllowance: '8 mm header tin-mount line',
        colorSpace: 'CMYK Offset Profile',
        downloadFormats: ['PDF Template', 'Adobe Illustrator (.AI)', 'CorelDraw (.CDR)']
      },
      {
        id: 'dieline-table-easel',
        title: 'Executive Tabletop Desk Easel Dieline',
        format: '8.5 × 6 inches (Landscape Stand)',
        bleed: '3.0 mm external bleed margin',
        safeZone: '4.0 mm internal text safety margin',
        bindingAllowance: '10 mm top margin for twin wire-o spiral punches',
        colorSpace: 'CMYK FOGRA39 / ISO Coated v2',
        downloadFormats: ['PDF Template', 'Adobe Illustrator (.AI)', 'CorelDraw (.CDR)']
      },
      {
        id: 'dieline-monthly-wall',
        title: '12-Sheet Art Paper Wall Calendar Dieline',
        format: '15 × 20 inches / 17 × 27 inches',
        bleed: '3.0 mm external bleed margin',
        safeZone: '5.0 mm internal margin',
        bindingAllowance: '12 mm top margin reserved for wire-o loop or tin mounting',
        colorSpace: 'CMYK FOGRA39 / ISO Coated v2',
        downloadFormats: ['PDF Template', 'Adobe Illustrator (.AI)']
      }
    ]
  });
});

export default router;
