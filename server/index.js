import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';
import { connectDB } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env or root .env
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5029;

// Middleware with 50MB payload limit for high-resolution product imagery & mockups
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static frontend assets if built dist exists
const clientDist = path.resolve(__dirname, '../dist');
if (fs.existsSync && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

// Routes
app.use('/api', apiRoutes);

// SPA fallback for frontend routes when accessed directly
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  if (req.path.startsWith('/api')) return next();

  const indexPath = path.resolve(clientDist, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  res.json({
    message: 'Welcome to Amazing Ads Backend Server API',
    port: PORT,
    status: 'online',
    endpoints: {
      health: '/api/health',
      catalog: '/api/calendar-products',
      quote: '/api/quote-calculator (POST)',
      sampleKit: '/api/sample-kit (POST)',
      contact: '/api/contact (POST)'
    }
  });
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[Backend] Server is running on port ${PORT} (http://localhost:${PORT})`);
  });
});
