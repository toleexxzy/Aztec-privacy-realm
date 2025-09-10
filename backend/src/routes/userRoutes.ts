import { Router } from 'express'
import { Request, Response } from 'express'
import { authenticateToken } from '../middleware/auth'

const router = Router()

// Get user profile
router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params

  // Mock user data
  res.json({
    success: true,
    user: {
      id: userId,
      name: 'Demo User',
      email: 'demo@example.com',
      avatar: '/uploads/demo-avatar.jpg',
      bio: 'Creative professional using BlurCraft',
      imagesCount: 42,
      likesCount: 156,
      followersCount: 89,
      followingCount: 23,
      createdAt: new Date().toISOString()
    }
  })
})

// Update user profile
router.put('/:userId', authenticateToken, async (req: Request, res: Response) => {
  const { userId } = req.params
  const { name, bio } = req.body

  // Mock update
  res.json({
    success: true,
    user: {
      id: userId,
      name: name || 'Demo User',
      bio: bio || 'Updated bio',
      email: 'demo@example.com',
      avatar: '/uploads/demo-avatar.jpg'
    }
  })
})

// Get user's images
router.get('/:userId/images', async (req: Request, res: Response) => {
  const { userId } = req.params
  const { page = 1, limit = 12 } = req.query

  // Mock user images
  const mockImages = Array.from({ length: parseInt(limit as string) }, (_, i) => ({
    id: `img-${userId}-${i + 1}`,
    title: `User Image ${i + 1}`,
    thumbnailUrl: '/uploads/mock-thumb.jpg',
    fullUrl: '/uploads/mock-full.jpg',
    likes: Math.floor(Math.random() * 100),
    downloads: Math.floor(Math.random() * 50),
    createdAt: new Date().toISOString(),
    isPublic: true
  }))

  res.json({
    success: true,
    images: mockImages,
    pagination: {
      currentPage: parseInt(page as string),
      totalPages: 3,
      totalItems: 36,
      hasNextPage: parseInt(page as string) < 3,
      hasPrevPage: parseInt(page as string) > 1
    }
  })
})

export default router