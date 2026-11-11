import { Router } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Backend server is healthy and running!',
    port: process.env.PORT || 5000,
    timestamp: new Date().toISOString()
  });
});

// Sample API route for amazingads
router.get('/ads', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, title: 'Summer Digital Campaign', category: 'Digital Ads', status: 'Active' },
      { id: 2, title: 'Brand Awareness Video', category: 'Video Production', status: 'In Review' },
      { id: 3, title: 'Social Media Blast', category: 'Social Media', status: 'Scheduled' }
    ]
  });
});

export default router;

