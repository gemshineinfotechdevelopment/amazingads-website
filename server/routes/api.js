import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const leadsFilePath = path.resolve(__dirname, '../data/leads.json');

// Helper to read leads safely
const getLeads = () => {
  try {
    if (!fs.existsSync(leadsFilePath)) {
      return [];
    }
    const data = fs.readFileSync(leadsFilePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading leads file:', err);
    return [];
  }
};

// Helper to save leads safely
const saveLeads = (leads) => {
  try {
    const dir = path.dirname(leadsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing leads file:', err);
    return false;
  }
};

// 1. Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Amazing Ads Backend Server is healthy and running!',
    port: process.env.PORT || 5000,
    timestamp: new Date().toISOString()
  });
});

// 2. Company Stats
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'experience', label: 'Years of Craftsmanship', value: '15+' },
      { id: 'clients', label: 'Satisfied Corporate Clients', value: '4,500+' },
      { id: 'products', label: 'Calendars & Promos Printed', value: '12M+' },
      { id: 'quality', label: 'Quality Satisfaction Rating', value: '99.4%' }
    ]
  });
});

// 3. Products List
const PRODUCTS_DATA = [
  {
    id: 'pet-foil-calendar',
    name: 'Gold / Silver PET Foil Calendar',
    tagline: 'Royal Metallic Sheen & Moisture-Proof Luxury Finish',
    category: 'Luxury Calendars',
    badge: 'Bestseller',
    accentColor: '#EAB308', // gold
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    rating: 4.9,
    minOrder: '100 Pcs',
    description: 'Crafted with imported high-reflective gold and silver PET metallic foil. Water-resistant, anti-scratch, and non-fading print that commands prime wall attention all 365 days of the year.',
    features: [
      'Mirror-finish Gold & Silver hot foil embossing',
      'Premium 350+ GSM rigid board backing',
      'Tear-proof & moisture-resistant PET film',
      'Custom branding space with company logo & contact'
    ],
    idealFor: 'Corporate Diwali Gifts, Jewelers, Real Estate, Premium Executives',
    specs: {
      material: 'Imported PET Metallic Film on Rigid Board',
      sizes: '11" x 18", 15" x 20", 17" x 27"',
      finish: 'Mirror Gold / Silver Hot Stamped Foil'
    }
  },
  {
    id: 'custom-5d-calendar',
    name: 'Custom 5D Calendars',
    tagline: 'Jaw-Dropping Holographic Depth & Dynamic Visual Motion',
    category: '3D / 5D Lenticular',
    badge: 'Trending Tech',
    accentColor: '#3B82F6', // blue
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    rating: 5.0,
    minOrder: '50 Pcs',
    description: 'Next-generation lenticular optical technology creating realistic 3D depth and changing motion visuals without 3D glasses. Makes every customer stop and admire.',
    features: [
      'Ultra-high resolution 5D optical lenticular sheet',
      'Dynamic flip and deep perspective 3D imagery',
      'Devotional, scenic, luxury wildlife & custom themes',
      'Heavy-duty tin-mounting / spiral wiro binding'
    ],
    idealFor: 'VIP Gifting, Festive Campaigns, Temple Trusts, Retail Branding',
    specs: {
      material: 'Optically Pure PET Lenticular Lens',
      sizes: '12" x 18", 14" x 20", 18" x 24"',
      finish: 'Multi-layer 5D Deep Depth Holographic'
    }
  },
  {
    id: 'stone-art-calendar',
    name: 'Stone Art Calendars',
    tagline: 'Artisan Textured Relief with Sculptural Elegance',
    category: 'Artisan Craft',
    badge: 'Exclusive Craft',
    accentColor: '#10B981', // emerald
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    rating: 4.8,
    minOrder: '50 Pcs',
    description: 'Unique handcrafted textured relief simulating sculpted stone carvings, heritage temple motifs, and modern architectural art. A timeless decorative artifact for office cabins and homes.',
    features: [
      'Tactile 3D textured stone-emboss finish',
      'Antique metallic color brushing & stone wash hues',
      'Premium synthetic wood / MDF mounting frame',
      'Custom metal plaque for laser-engraved corporate branding'
    ],
    idealFor: 'Heritage Brands, Architecture Firms, Luxury Builders, High-Net-Worth Clients',
    specs: {
      material: 'Composite Stone Powder & High-Density Resin',
      sizes: '10" x 15", 14" x 20", 16" x 24"',
      finish: 'Hand-brushed Antique Texture'
    }
  },
  {
    id: 'hand-fan',
    name: 'Promotional Hand Fan',
    tagline: 'Mass Visibility Advertising with High Everyday Utility',
    category: 'Promotional Items',
    badge: 'High ROI Promo',
    accentColor: '#EC4899', // pink/rose
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    rating: 4.7,
    minOrder: '500 Pcs',
    description: 'Lightweight, unbreakable PP plastic and laminated duplex advertising hand fans. Unbeatable brand recall at outdoor events, rallies, temple festivals, and summer campaigns.',
    features: [
      'Durable virgin PP plastic / waterproof laminated card',
      'Both side full-color offset & screen printing',
      'Ergonomic sturdy grip handle with child-safe edges',
      'Custom contour die-cut shapes available (Round, Leaf, Mascot)'
    ],
    idealFor: 'Election Campaigns, Spiritual Conclaves, Summer Product Launches, Trade Expos',
    specs: {
      material: 'Virgin Polypropylene (PP) / 350 GSM Duplex',
      sizes: 'Standard 8" x 8" with 5" Ergonomic Handle',
      finish: 'Gloss/Matt Lamination, Water-proof'
    }
  },
  {
    id: 'special-products',
    name: 'Special Products',
    tagline: 'Bespoke Corporate Merchandise & Customized Prestige Gifts',
    category: 'Custom Specials',
    badge: 'Made to Order',
    accentColor: '#8B5CF6', // purple
    gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
    rating: 4.9,
    minOrder: '100 Pcs',
    description: 'Tailor-made promotional creations including acrylic LED desk calendars, bespoke leatherette planner diaries, luxury wooden desktop organizers, and customized multi-utility executive gift boxes.',
    features: [
      '100% custom prototyping as per client brand guidelines',
      'Laser cutting, UV spot varnishing & foil stamping',
      'Combo gift sets with pen, diary, bottle & calendar',
      'Custom rigid box packaging with magnetic closure'
    ],
    idealFor: 'Annual Corporate Events, Employee Welcome Kits, Dealer Meets, Milestone Celebrations',
    specs: {
      material: 'Acrylic, Wood, Leatherette, Rigid Board',
      sizes: 'Custom Tailored Dimensions',
      finish: 'Spot UV, Laser Engraved, Soft Touch'
    }
  }
];

router.get('/products', (req, res) => {
  res.json({
    success: true,
    count: PRODUCTS_DATA.length,
    data: PRODUCTS_DATA
  });
});

// Legacy / alias endpoints
router.get('/ads', (req, res) => {
  res.json({ success: true, data: PRODUCTS_DATA });
});
router.get('/campaigns', (req, res) => {
  res.json({ success: true, data: PRODUCTS_DATA });
});

// 4. Leads - Get all inquiries
router.get('/leads', (req, res) => {
  const leads = getLeads();
  res.json({
    success: true,
    count: leads.length,
    data: leads
  });
});

// 5. Leads - Submit new inquiry / quote request
router.post('/leads', (req, res) => {
  const { name, email, phone, product, quantity, message } = req.body;

  if (!name || (!email && !phone)) {
    return res.status(400).json({
      success: false,
      error: 'Name and either Phone or Email are required.'
    });
  }

  const newLead = {
    id: `lead-${Date.now()}`,
    name: name.trim(),
    email: email ? email.trim().toLowerCase() : '',
    phone: phone ? phone.trim() : '',
    product: product || 'Gold / Silver PET Foil Calendar',
    quantity: quantity || '100 - 500 Pcs',
    message: message ? message.trim() : '',
    createdAt: new Date().toISOString()
  };

  const leads = getLeads();
  leads.unshift(newLead);
  saveLeads(leads);

  console.log(`[Quote Request] Received from ${newLead.name} (${newLead.phone || newLead.email}) for ${newLead.product}`);

  return res.status(201).json({
    success: true,
    message: 'Vera level! Unga quote request receive aayiduchu. Enga sales team ungalukku best wholesale price details anupuvanga!',
    data: newLead
  });
});

export default router;
