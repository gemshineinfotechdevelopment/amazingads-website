// ==============================================================================
// MongoDB Initialization & Database Seeder Script for VPS
// Target Database: "amazingads" on mongodb://127.0.0.1:27017/amazingads
// Usage: node server/scripts/init-vps-db.js
// ==============================================================================

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/amazingads';

console.log('----------------------------------------------------');
console.log('🚀 Amazing Ads VPS MongoDB Initialization Script');
console.log(`📡 Connecting to: ${MONGODB_URI}`);
console.log('----------------------------------------------------');

// Mongoose Schemas
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
  status: { type: String, default: 'New' }
}, { timestamps: true });

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  factoryName: String,
  tagline: String,
  logoUrl: String,
  address: String,
  phone: String,
  secondaryPhone: String,
  whatsapp: String,
  email: String,
  supportEmail: String,
  websiteUrl: String,
  operatingHours: String,
  gstNumber: String,
  standardLeadTime: String,
  bulkLeadTime: String,
  carriers: String,
  discountTiers: Array
}, { timestamps: true });

const Product = mongoose.model('CalendarProduct', productSchema);
const CustomerMessage = mongoose.model('CustomerMessage', messageSchema);
const FactorySettings = mongoose.model('FactorySetting', settingsSchema);

async function run() {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✓ Connected to MongoDB database: "${conn.connection.name}" at ${conn.connection.host}`);

    // 1. Seed Products
    const productsPath = path.join(DATA_DIR, 'products.json');
    if (fs.existsSync(productsPath)) {
      const rawProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      const count = await Product.countDocuments();
      if (count === 0) {
        await Product.insertMany(rawProducts);
        console.log(`✓ Seeded ${rawProducts.length} Products into "calendarproducts" collection.`);
      } else {
        console.log(`ℹ "calendarproducts" already has ${count} records. Updating/syncing...`);
        for (const item of rawProducts) {
          await Product.findOneAndUpdate({ id: item.id }, item, { upsert: true });
        }
        console.log(`✓ Synchronized ${rawProducts.length} products successfully.`);
      }
    }

    // 2. Seed Settings
    const settingsPath = path.join(DATA_DIR, 'settings.json');
    if (fs.existsSync(settingsPath)) {
      const rawSettings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
      await FactorySettings.findOneAndUpdate(
        { key: 'factory_settings' },
        { key: 'factory_settings', ...rawSettings },
        { upsert: true }
      );
      console.log('✓ Factory settings initialized/updated in "factorysettings" collection.');
    }

    // 3. Seed Messages
    const messagesPath = path.join(DATA_DIR, 'messages.json');
    if (fs.existsSync(messagesPath)) {
      const rawMessages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));
      for (const msg of rawMessages) {
        if (msg && msg.id) {
          await CustomerMessage.findOneAndUpdate({ id: msg.id }, msg, { upsert: true });
        }
      }
      console.log(`✓ Seeded/verified ${rawMessages.length} customer messages.`);
    }

    // 4. Create Indexes
    await Product.collection.createIndex({ id: 1 }, { unique: true });
    await CustomerMessage.collection.createIndex({ id: 1 }, { unique: true });
    await FactorySettings.collection.createIndex({ key: 1 }, { unique: true });
    console.log('✓ Unique database indexes created.');

    console.log('----------------------------------------------------');
    console.log('🎉 VPS MongoDB Database "amazingads" is 100% READY!');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Initialization Failed:', error.message);
    console.log('\nTip: If running on a new VPS, ensure MongoDB service is started:');
    console.log('  sudo systemctl start mongod');
    console.log('  sudo systemctl enable mongod');
    process.exit(1);
  }
}

run();
