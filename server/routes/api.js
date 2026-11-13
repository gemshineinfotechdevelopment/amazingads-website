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
    mockupImg: '/images/gods/mahalakshmi.jpg'
  },
  {
    id: 'custom-5d-calendar',
    name: 'Custom 5D Calendars (அருள்மிகு முருகன்)',
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
    mockupImg: '/images/gods/murugan.jpg'
  },
  {
    id: 'stone-art-calendar',
    name: 'Stone Art Calendars (சிவபெருமான்)',
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
    mockupImg: '/images/gods/sivan.jpg'
  },
  {
    id: 'hand-fan',
    name: 'Promotional Hand Fan (ஸ்ரீ மகா கணபதி)',
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
    mockupImg: '/images/gods/ganesha.jpg'
  },
  {
    id: 'special-products',
    name: '24K Devotional Gold Foil Frame (சுவாமி ஐயப்பன்)',
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
    mockupImg: '/images/gods/ayyappan.jpg'
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
