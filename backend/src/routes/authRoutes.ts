import { Router } from 'express'
import { Request, Response } from 'express'

const router = Router()

// Mock authentication routes for development
router.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body

  // Mock authentication - in production, verify against database
  if (email && password) {
    const mockUser = {
      id: '1',
      name: 'Demo User',
      email: email,
      avatar: '/uploads/demo-avatar.jpg'
    }

    const token = 'demo-jwt-token-' + Date.now()

    res.json({
      success: true,
      user: mockUser,
      token: token
    })
  } else {
    res.status(400).json({
      success: false,
      error: 'Email and password are required'
    })
  }
})

router.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  // Mock registration
  if (name && email && password) {
    const mockUser = {
      id: '1',
      name: name,
      email: email,
      avatar: '/uploads/default-avatar.jpg'
    }

    const token = 'demo-jwt-token-' + Date.now()

    res.json({
      success: true,
      user: mockUser,
      token: token
    })
  } else {
    res.status(400).json({
      success: false,
      error: 'Name, email and password are required'
    })
  }
})

router.post('/signout', async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Signed out successfully'
  })
})

router.get('/me', async (req: Request, res: Response) => {
  // Mock user profile
  res.json({
    success: true,
    user: {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      avatar: '/uploads/demo-avatar.jpg',
      createdAt: new Date().toISOString()
    }
  })
})

export default router