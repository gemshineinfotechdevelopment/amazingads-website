import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    quoteId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    productId: {
      type: String,
      default: null
    },
    format: {
      type: String,
      required: true
    },
    paperGsm: {
      type: String,
      required: true
    },
    finish: {
      type: String,
      required: true
    },
    binding: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: '₹'
    },
    discountPercentage: {
      type: Number,
      default: 0
    },
    totalSavings: {
      type: Number,
      default: 0
    },
    estimatedTurnaround: String,
    expressEligible: {
      type: Boolean,
      default: true
    },
    dispatchHub: {
      type: String,
      default: 'Sivakasi Works Dispatch via BlueDart / VRL Logistics'
    },
    validUntil: String,
    client: {
      name: { type: String, default: 'Guest Estimator' },
      company: { type: String, default: 'Corporate / Trade Account' },
      email: { type: String, default: null },
      phone: { type: String, default: null }
    }
  },
  {
    timestamps: true
  }
);

export const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);
