import mongoose from 'mongoose';
import dns from 'dns';

// Ensure DNS SRV lookups work reliably on Windows/local networks if using MongoDB Atlas
try {
  if (process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  }
} catch {}

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/amazingads';

  try {
    const isLocal = uri.includes('127.0.0.1') || uri.includes('localhost');
    console.log(`[MongoDB] Connecting to ${isLocal ? 'VPS Local MongoDB' : 'Remote MongoDB Atlas'}...`);
    
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected successfully to database: "${conn.connection.name}" at ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    console.warn('[MongoDB] Running with local JSON disk-cache fallback.');
    return null;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('[MongoDB] Connection lost. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('[MongoDB] Reconnected to database successfully.');
});

