import { VercelRequest, VercelResponse } from '@vercel/node';

// Simple API handler for Vercel serverless functions
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log('🔍 API Request:', {
      method: req.method,
      url: req.url,
      headers: req.headers
    });

    // Health check endpoint
    if (req.url === '/api/health') {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Aztec Privacy Realm API'
      });
      return;
    }

    // Image upload endpoint - simplified for client-side processing
    if (req.url === '/api/images/upload' && req.method === 'POST') {
      console.log('📸 Processing image upload request...');
      
      // Since we're using client-side processing, just return success
      // The frontend will handle file reading and processing
      res.status(200).json({
        success: true,
        message: 'Upload received - processing on client side',
        fileUrl: 'data:processed-client-side', // Placeholder
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Gallery endpoints (using localStorage on client)
    if (req.url?.startsWith('/api/gallery')) {
      res.status(200).json({
        success: true,
        message: 'Gallery managed client-side',
        items: []
      });
      return;
    }

    // Auth endpoints (placeholder for future)
    if (req.url?.startsWith('/api/auth')) {
      res.status(200).json({
        success: true,
        message: 'Auth not implemented yet'
      });
      return;
    }

    // Default response for unknown routes
    res.status(404).json({
      success: false,
      error: 'Route not found',
      availableRoutes: [
        '/api/health',
        '/api/images/upload',
        '/api/gallery',
        '/api/auth'
      ]
    });
    
  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}