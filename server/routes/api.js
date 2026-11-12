import { Router } from 'express';

const router = Router();

// Authentic Amazing Ads Sivakasi Calendar Catalog & Specifications
const calendarCatalog = [
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
    mockupImg: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'custom-5d-calendar',
    name: 'Custom 5D Calendars',
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
    mockupImg: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'stone-art-calendar',
    name: 'Stone Art Calendars',
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
    mockupImg: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'hand-fan',
    name: 'Promotional Hand Fan',
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
    mockupImg: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'special-products',
    name: 'Special Products',
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
    mockupImg: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80'
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
    description: 'A prestige promotional wall calendar designed for corporate offices, banks, and showrooms. Available as 6-sheet (two months per leaf) or 12-sheet (one month per leaf) featuring scenic photography, spiritual iconography, or custom brand images.',
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
    description: 'Sivakasi’s high-tech specialty calendar. Utilizes micro-optical lenticular lenses to produce realistic three-dimensional depth and animated motion without 3D glasses. Images visually transform as the viewer walks past the calendar.',
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

let quoteRequests = [];
let sampleKitRequests = [];
let corporateInquiries = [];

// 1. Health & Server Status
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Amazing Ads Sivakasi - Master Printing Press Engine',
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

// 3. Dynamic Quote Calculator Engine for Amazing Ads Sivakasi
router.post('/quote-calculator', (req, res) => {
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

  // Real Sivakasi base pricing per unit
  let baseUnitPrice = 110;
  if (format?.includes('PET Foil') || format?.includes('Gold Foil')) baseUnitPrice = 145;
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
  if (finish === '24K Heated Brass Gold Foil') finishSurcharge = 22;
  else if (finish === 'Spot Gloss UV & Velvet Lamination') finishSurcharge = 16;
  else if (finish === '3D Optical Lenticular Depth') finishSurcharge = 45;
  else if (finish === 'Hand-Set Kundan Stones & Glitter') finishSurcharge = 55;

  // Binding adjustments
  let bindingCost = 10;
  if (binding === 'Deluxe Moulded Synthetic Gold Frame') bindingCost = 35;
  else if (binding === 'Heavy-Gauge Anti-Rust Tin Plate') bindingCost = 12;
  else if (binding === 'Twin Wire-O Gold Spiral') bindingCost = 15;

  // Real Sivakasi Wholesale Volume Tiered Discounts
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

  const quoteSummary = {
    quoteId,
    productId: productId || null,
    format: format || 'Real 24K Gold Foil Wall',
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

  res.status(200).json({
    success: true,
    message: `Official Amazing Ads Sivakasi Quote ${quoteId} generated successfully.`,
    data: quoteSummary
  });
});

// 4. Sample Kit Request Endpoint
router.post('/sample-kit', (req, res) => {
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

  console.log(`[Amazing Ads Sample Kit] Dispatched to ${sampleOrder.name} (${sampleOrder.company}) at ${sampleOrder.shippingAddress}`);

  res.status(201).json({
    success: true,
    message: `Your Amazing Ads Sivakasi Master Sample Box is booked under ID ${sampleOrder.sampleId}. We are dispatching it via priority courier!`,
    data: sampleOrder
  });
});

// 5. Corporate Bespoke Consultation / Contact
router.post('/contact', (req, res) => {
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

  console.log(`[Amazing Ads Sivakasi Inquiry] ${inquiry.company} - ${inquiry.name}: ${inquiry.message}`);

  res.status(201).json({
    success: true,
    message: `Thank you, ${name}. Your order brief (${inquiry.inquiryId}) is assigned to our Sivakasi Works manager. We will contact you via WhatsApp / Call shortly.`,
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
      pressHQ: '3/1, Vannakara Street, Chairman P.K.S.A. Arumuganadar Road, Sivakasi 626189',
      factoryPhone: '+91 97904 72767 / +91 97904 27670',
      hotlinePhone: '+91 98400 55220',
      factoryEmail: 'aamazingads@gmail.com'
    }
  });
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
