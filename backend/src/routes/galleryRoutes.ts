import { Router } from 'express'
import { Request, Response } from 'express'
import { optionalAuth } from '../middleware/auth'

const router = Router()

// Get gallery images (public feed)
router.get('/', optionalAuth, async (req: Request, res: Response) => {
  const { page = 1, limit = 12, sort = 'latest' } = req.query

  // Mock gallery images
  const mockImages = Array.from({ length: parseInt(limit as string) }, (_, i) => ({
    id: `gallery-${i + 1}`,
    title: `Gallery Image ${i + 1}`,
    description: `Beautiful blurred image with custom text overlay ${i + 1}`,
    thumbnailUrl: '/uploads/mock-thumb.jpg',
    fullUrl: '/uploads/mock-full.jpg',
    user: {
      id: `user-${i % 5 + 1}`,
      name: `Creative User ${i % 5 + 1}`,
      avatar: '/uploads/mock-avatar.jpg'
    },
    likes: Math.floor(Math.random() * 200),
    downloads: Math.floor(Math.random() * 100),
    views: Math.floor(Math.random() * 500),
    tags: ['blur', 'creative', 'design', 'art'],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
    isPublic: true
  }))

  // Sort based on query parameter
  const sortedImages = [...mockImages].sort((a, b) => {
    switch (sort) {
      case 'popular':
        return b.likes - a.likes
      case 'downloads':
        return b.downloads - a.downloads
      case 'latest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  res.json({
    success: true,
    images: sortedImages,
    pagination: {
      currentPage: parseInt(page as string),
      totalPages: 8,
      totalItems: 96,
      hasNextPage: parseInt(page as string) < 8,
      hasPrevPage: parseInt(page as string) > 1
    },
    filters: {
      sort: sort,
      availableSorts: ['latest', 'popular', 'downloads']
    }
  })
})

// Get featured images
router.get('/featured', async (req: Request, res: Response) => {
  // Mock featured images
  const mockFeaturedImages = Array.from({ length: 6 }, (_, i) => ({
    id: `featured-${i + 1}`,
    title: `Featured Image ${i + 1}`,
    description: `Award-winning blurred creation ${i + 1}`,
    thumbnailUrl: '/uploads/mock-featured-thumb.jpg',
    fullUrl: '/uploads/mock-featured-full.jpg',
    user: {
      id: `featured-user-${i + 1}`,
      name: `Featured Artist ${i + 1}`,
      avatar: '/uploads/mock-featured-avatar.jpg'
    },
    likes: 500 + Math.floor(Math.random() * 500),
    downloads: 200 + Math.floor(Math.random() * 300),
    views: 1000 + Math.floor(Math.random() * 2000),
    tags: ['featured', 'award-winning', 'premium'],
    createdAt: new Date().toISOString(),
    isFeatured: true
  }))

  res.json({
    success: true,
    images: mockFeaturedImages
  })
})

// Search gallery images
router.get('/search', async (req: Request, res: Response) => {
  const { q, page = 1, limit = 12 } = req.query

  if (!q) {
    return res.status(400).json({
      success: false,
      error: 'Search query is required'
    })
  }

  // Mock search results
  const mockSearchResults = Array.from({ length: Math.min(parseInt(limit as string), 8) }, (_, i) => ({
    id: `search-${i + 1}`,
    title: `Search Result ${i + 1} - ${q}`,
    description: `Image matching "${q}" with creative blur effects`,
    thumbnailUrl: '/uploads/mock-search-thumb.jpg',
    fullUrl: '/uploads/mock-search-full.jpg',
    user: {
      id: `search-user-${i + 1}`,
      name: `Search User ${i + 1}`,
      avatar: '/uploads/mock-search-avatar.jpg'
    },
    likes: Math.floor(Math.random() * 150),
    downloads: Math.floor(Math.random() * 75),
    relevanceScore: 1 - (i * 0.1), // Decreasing relevance
    tags: [q as string, 'blur', 'creative'],
    createdAt: new Date().toISOString()
  }))

  res.json({
    success: true,
    query: q,
    images: mockSearchResults,
    pagination: {
      currentPage: parseInt(page as string),
      totalPages: 2,
      totalItems: 16,
      hasNextPage: parseInt(page as string) < 2,
      hasPrevPage: parseInt(page as string) > 1
    }
  })
})

// Get image details
router.get('/:imageId', async (req: Request, res: Response) => {
  const { imageId } = req.params

  // Mock image details
  res.json({
    success: true,
    image: {
      id: imageId,
      title: `Image ${imageId}`,
      description: 'Beautiful blurred image with custom text overlay',
      fullUrl: '/uploads/mock-full.jpg',
      user: {
        id: 'user-1',
        name: 'Creative User',
        avatar: '/uploads/mock-avatar.jpg',
        bio: 'Digital artist and designer'
      },
      likes: 156,
      downloads: 89,
      views: 432,
      tags: ['blur', 'creative', 'design', 'art', 'typography'],
      metadata: {
        textOverlay: {
          text: 'CREATIVE',
          fontSize: 64,
          color: '#FFFFFF',
          position: { x: 50, y: 50 }
        },
        blurIntensity: 15,
        originalDimensions: { width: 1920, height: 1080 },
        fileSize: '2.4 MB'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  })
})

export default router