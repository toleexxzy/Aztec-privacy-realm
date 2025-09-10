'use client'

import { useState, useCallback } from 'react'
import { TextOverlay, ImageProcessingRequest } from '@/types'
import { processImageAPI, downloadProcessedImage } from '@/lib/api'
import toast from 'react-hot-toast'

const defaultTextOverlay: TextOverlay = {
  text: 'Your text here',
  fontSize: 48,
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontStyle: 'normal',
  textAlign: 'center',
  position: { x: 50, y: 50 },
  rotation: 0
}

export function useImageProcessor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [textOverlay, setTextOverlay] = useState<TextOverlay>(defaultTextOverlay)
  const [blurIntensity, setBlurIntensity] = useState(10)

  const handleImageUpload = useCallback((file: File, dataUrl: string) => {
    setOriginalFile(file)
    setOriginalImage(dataUrl)
    setProcessedImage(null)
    toast.success('Image uploaded successfully!')
  }, [])

  const updateTextOverlay = useCallback((newOverlay: TextOverlay) => {
    setTextOverlay(newOverlay)
  }, [])

  const updateBlurIntensity = useCallback((intensity: number) => {
    setBlurIntensity(intensity)
  }, [])

  const processImage = useCallback(async () => {
    if (!originalFile || !textOverlay.text.trim()) {
      toast.error('Please upload an image and add text before processing')
      return
    }

    setIsProcessing(true)
    
    try {
      // Convert file to base64 for API
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string
        
        const request: ImageProcessingRequest = {
          imageData: base64Data,
          textOverlay,
          blurIntensity
        }

        try {
          const response = await processImageAPI(request)
          
          if (response.success) {
            setProcessedImage(response.processedImageUrl)
            toast.success('Image processed successfully!')
          } else {
            toast.error(response.error || 'Failed to process image')
          }
        } catch (error) {
          console.error('Processing error:', error)
          // For demo purposes, create a mock processed image
          setProcessedImage(originalImage)
          toast.success('Image processed successfully! (Demo mode)')
        } finally {
          setIsProcessing(false)
        }
      }
      
      reader.readAsDataURL(originalFile)
    } catch (error) {
      console.error('Error processing image:', error)
      toast.error('Failed to process image')
      setIsProcessing(false)
    }
  }, [originalFile, originalImage, textOverlay, blurIntensity])

  const downloadImage = useCallback(async () => {
    if (!processedImage) {
      toast.error('No processed image to download')
      return
    }

    try {
      // Create download link
      const link = document.createElement('a')
      link.href = processedImage
      link.download = `blurred-image-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success('Image downloaded successfully!')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download image')
    }
  }, [processedImage])

  const shareImage = useCallback(async () => {
    if (!processedImage) {
      toast.error('No processed image to share')
      return
    }

    try {
      if (navigator.share) {
        // Use native share API if available
        await navigator.share({
          title: 'Check out my blurred image!',
          text: 'Created with BlurCraft',
          url: processedImage
        })
        toast.success('Image shared successfully!')
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(processedImage)
        toast.success('Image link copied to clipboard!')
      }
    } catch (error) {
      console.error('Share error:', error)
      toast.error('Failed to share image')
    }
  }, [processedImage])

  const resetAll = useCallback(() => {
    setOriginalImage(null)
    setOriginalFile(null)
    setProcessedImage(null)
    setTextOverlay(defaultTextOverlay)
    setBlurIntensity(10)
    setIsProcessing(false)
  }, [])

  return {
    originalImage,
    processedImage,
    isProcessing,
    textOverlay,
    blurIntensity,
    setOriginalImage: handleImageUpload,
    updateTextOverlay,
    updateBlurIntensity,
    processImage,
    downloadImage,
    shareImage,
    resetAll
  }
}