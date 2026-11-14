import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    inquiryId: {
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
      default: 'Corporate Client'
    },
    phone: {
      type: String,
      trim: true
    },
    quantityNeeded: {
      type: String,
      default: '500+'
    },
    targetDate: {
      type: String,
      default: 'Immediate'
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    specs: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    assignedPrintMaster: {
      type: String,
      default: 'Amazing Ads Sivakasi Press Works Team'
    }
  },
  {
    timestamps: true
  }
);

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

