import axios from 'axios'
import { ImageProcessingRequest, ImageProcessingResponse, UploadResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for image processing
})

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export async function processImageAPI(request: ImageProcessingRequest): Promise<ImageProcessingResponse> {
  try {
    const response = await api.post('/images/process', request)
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('Failed to process image')
  }
}

export async function uploadImageAPI(file: File): Promise<UploadResponse> {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    return response.data
  } catch (error) {
    console.error('Upload Error:', error)
    throw new Error('Failed to upload image')
  }
}

export async function downloadProcessedImage(imageUrl: string): Promise<Blob> {
  try {
    const response = await api.get(imageUrl, {
      responseType: 'blob',
    })
    return response.data
  } catch (error) {
    console.error('Download Error:', error)
    throw new Error('Failed to download image')
  }
}

export async function getGalleryImages(page = 1, limit = 12) {
  try {
    const response = await api.get(`/gallery?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    console.error('Gallery Error:', error)
    throw new Error('Failed to fetch gallery images')
  }
}

export async function getUserImages(userId: string, page = 1, limit = 12) {
  try {
    const response = await api.get(`/users/${userId}/images?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    console.error('User Images Error:', error)
    throw new Error('Failed to fetch user images')
  }
}

export async function likeImage(imageId: string) {
  try {
    const response = await api.post(`/images/${imageId}/like`)
    return response.data
  } catch (error) {
    console.error('Like Error:', error)
    throw new Error('Failed to like image')
  }
}

export async function deleteImage(imageId: string) {
  try {
    const response = await api.delete(`/images/${imageId}`)
    return response.data
  } catch (error) {
    console.error('Delete Error:', error)
    throw new Error('Failed to delete image')
  }
}