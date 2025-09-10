export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface TextOverlay {
  text: string
  fontSize: number
  color: string
  fontWeight: 'normal' | 'bold'
  fontStyle: 'normal' | 'italic'
  textAlign: 'left' | 'center' | 'right'
  position: {
    x: number
    y: number
  }
  rotation: number
}

export interface ProcessedImage {
  id: string
  userId: string
  originalUrl: string
  processedUrl: string
  textOverlay: TextOverlay
  blurIntensity: number
  createdAt: Date
  isPublic: boolean
  likes: number
  downloads: number
}

export interface ImageProcessingRequest {
  imageData: string
  textOverlay: TextOverlay
  blurIntensity: number
}

export interface ImageProcessingResponse {
  success: boolean
  processedImageUrl: string
  error?: string
}

export interface UploadResponse {
  success: boolean
  fileUrl: string
  fileId: string
  error?: string
}

export interface GalleryImage {
  id: string
  title: string
  thumbnailUrl: string
  fullUrl: string
  user: {
    name: string
    avatar?: string
  }
  likes: number
  downloads: number
  createdAt: Date
}