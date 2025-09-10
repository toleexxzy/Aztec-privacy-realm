import { Router } from 'express'
import {
  processImage,
  uploadImage,
  getUserImages,
  deleteImage,
  toggleImageLike,
  upload,
  validateImageProcessing,
  handleValidationErrors
} from '../controllers/imageController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

// Public routes
router.post('/process', validateImageProcessing, handleValidationErrors, processImage)
router.post('/upload', upload.single('image'), uploadImage)

// Protected routes (require authentication)
router.get('/user/:userId', authenticateToken, getUserImages)
router.get('/user', authenticateToken, getUserImages)
router.delete('/:imageId', authenticateToken, deleteImage)
router.post('/:imageId/like', authenticateToken, toggleImageLike)

export default router