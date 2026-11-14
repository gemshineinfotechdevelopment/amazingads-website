import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';
import { connectDB } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env or root .env
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware with 50MB payload limit for high-resolution product imagery & mockups
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB if MONGODB_URI is provided
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => {
      console.log('[Database] Connected to MongoDB Atlas successfully.');
    })
    .catch((err) => {
      console.warn('[Database] MongoDB connection notice (using JSON disk persistence):', err.message);
    });
}

// Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Amazing Ads Backend Server API',
    endpoints: {
      health: '/api/health',
      catalog: '/api/catalog',
      quote: '/api/quote (POST)',
      sampleKit: '/api/sample-kit (POST)',
      contact: '/api/contact (POST)'
    }
  });
});

// Connect to MongoDB Atlas and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[Backend] Server is running on port ${PORT} (http://localhost:${PORT})`);
  });
});
