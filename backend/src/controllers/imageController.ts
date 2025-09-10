import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { body, validationResult } from 'express-validator'
import { imageProcessingService } from '../services/imageProcessingService'

// Configure multer for image uploads
const storage = multer.memoryStorage()

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed'), false)
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
})

// Validation middleware for image processing
export const validateImageProcessing = [
  body('textOverlay.text')
    .isString()
    .isLength({ min: 1, max: 500 })
    .withMessage('Text must be between 1 and 500 characters'),
  
  body('textOverlay.fontSize')
    .isInt({ min: 12, max: 200 })
    .withMessage('Font size must be between 12 and 200'),
  
  body('textOverlay.color')
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Color must be a valid hex code'),
  
  body('blurIntensity')
    .isInt({ min: 0, max: 50 })
    .withMessage('Blur intensity must be between 0 and 50'),
]

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    })
  }
  next()
}

// Process image endpoint
export const processImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imageUrl, blurIntensity, textOverlay } = req.body

    if (!imageUrl && !req.body.imageData) {
      return res.status(400).json({
        success: false,
        error: 'Image URL or image data is required'
      })
    }

    let imageBuffer: Buffer
    
    if (req.body.imageData) {
      // Handle base64 image data (original functionality)
      const base64Data = req.body.imageData.replace(/^data:image\/\w+;base64,/, '')
      imageBuffer = Buffer.from(base64Data, 'base64')
    } else {
      // Handle image URL (new functionality)
      console.log('Processing image from URL:', imageUrl);
      console.log('Blur intensity:', blurIntensity);
      console.log('Text overlay:', textOverlay?.text);
      
      try {
        // For URL processing, we'll use the imageProcessingService
        // First, we need to fetch the image data
        const https = require('https');
        const http = require('http');
        
        const protocol = imageUrl.startsWith('https') ? https : http;
        const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${req.protocol}://${req.get('host')}${imageUrl}`;
        
        // Create a promise to fetch image data
        let imageBuffer: Buffer;
        imageBuffer = await new Promise<Buffer>((resolve, reject) => {
          const request = protocol.get(fullUrl, (response: any) => {
            if (response.statusCode !== 200) {
              reject(new Error(`Failed to fetch image: ${response.statusCode}`));
              return;
            }
            
            const chunks: Buffer[] = [];
            response.on('data', (chunk: any) => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
          });
          
          request.on('error', reject);
          request.setTimeout(10000, () => {
            request.destroy();
            reject(new Error('Request timeout'));
          });
        });
        
        console.log('✅ Image fetched successfully, size:', imageBuffer.length);
      } catch (fetchError) {
        console.error('Error fetching image:', fetchError);
        return res.status(400).json({
          success: false,
          error: 'Failed to fetch image from URL'
        });
      }
    }

    // Process the image buffer (original base64 functionality)
    const processedImageUrl = await imageProcessingService.processImage({
      imageBuffer,
      textOverlay,
      blurIntensity: parseInt(blurIntensity)
    })

    res.json({
      success: true,
      processedImageUrl: `${req.protocol}://${req.get('host')}${processedImageUrl}`
    })
  } catch (error) {
    next(error)
  }
}

// Upload image endpoint
export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      })
    }

    const imageUrl = await imageProcessingService.saveUploadedImage(
      req.file.buffer,
      req.file.originalname
    )

    res.json({
      success: true,
      fileUrl: `${req.protocol}://${req.get('host')}${imageUrl}`,
      fileId: imageUrl.split('/').pop()?.split('.')[0] || '',
    })
  } catch (error) {
    next(error)
  }
}

// Get user's processed images
export const getUserImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 12 } = req.query
    const userId = req.params.userId || (req as any).user?.id

    // This would typically fetch from database
    // For now, return mock data
    const mockImages = Array.from({ length: parseInt(limit as string) }, (_, i) => ({
      id: `img-${i + 1}`,
      title: `Image ${i + 1}`,
      thumbnailUrl: '/uploads/mock-thumb.jpg',
      fullUrl: '/uploads/mock-full.jpg',
      user: {
        name: 'User Name',
        avatar: '/uploads/mock-avatar.jpg'
      },
      likes: Math.floor(Math.random() * 100),
      downloads: Math.floor(Math.random() * 50),
      createdAt: new Date().toISOString()
    }))

    res.json({
      success: true,
      images: mockImages,
      pagination: {
        currentPage: parseInt(page as string),
        totalPages: 5,
        totalItems: 60,
        hasNextPage: parseInt(page as string) < 5,
        hasPrevPage: parseInt(page as string) > 1
      }
    })
  } catch (error) {
    next(error)
  }
}

// Delete image
export const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imageId } = req.params

    // This would typically delete from database and file system
    await imageProcessingService.deleteImage(imageId)

    res.json({
      success: true,
      message: 'Image deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

// Like/unlike image
export const toggleImageLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imageId } = req.params
    const userId = (req as any).user?.id

    // This would typically update the database
    // For now, return mock response
    res.json({
      success: true,
      liked: true,
      totalLikes: 42
    })
  } catch (error) {
    next(error)
  }
}