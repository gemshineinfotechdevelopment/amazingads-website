import mongoose from 'mongoose';

const sampleKitSchema = new mongoose.Schema(
  {
    sampleId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      trim: true,
      default: 'Direct Client'
    },
    phone: {
      type: String,
      trim: true,
      default: 'N/A'
    },
    shippingAddress: {
      type: String,
      required: true,
      trim: true
    },
    preferredStyles: {
      type: [String],
      default: ['Gold Foil Calendars', 'Daily Panchangam', 'Tabletop Desk']
    },
    kitContents: {
      type: [String],
      default: [
        'Real 24K Gold Foil & Embossed Proof Sample on Virgin Kappa Board',
        'Daily Panchangam Leaf Sampler (Tamil & English Astrological Data)',
        '12-Sheet Art Paper Gloss & Matte Lamination Swatches',
        'Tabletop Desk Calendar Mini Proof with Wire-O Spiral',
        'Amazing Ads Sivakasi Official Wholesale Trade Catalog'
      ]
    },
    status: {
      type: String,
      default: 'Dispatched from Sivakasi Press Hub'
    },
    estimatedDeliveryDays: {
      type: String,
      default: '2–3 Business Days (Express Courier)'
    }
  },
  {
    timestamps: true
  }
);

export const SampleKit = mongoose.models.SampleKit || mongoose.model('SampleKit', sampleKitSchema);

