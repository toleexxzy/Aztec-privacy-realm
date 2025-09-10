'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

interface ImagePreviewProps {
  originalImage: string | null
  processedImage: string | null
  onDownload: () => void
  onShare: () => void
}

export function ImagePreview({ 
  originalImage, 
  processedImage, 
  onDownload, 
  onShare 
}: ImagePreviewProps) {
  const [showComparison, setShowComparison] = useState(false)

  if (!originalImage) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Upload an image to see preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Image Display */}
      <div className="relative">
        {showComparison && processedImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-2"
          >
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Original</p>
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={originalImage}
                  alt="Original image"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Processed</p>
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={processedImage}
                  alt="Processed image"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-gray-700">
              {processedImage ? 'Processed Image' : 'Original Image'}
            </p>
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={processedImage || originalImage}
                alt={processedImage ? 'Processed image' : 'Original image'}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}

        {/* Comparison Toggle */}
        {processedImage && (
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors"
          >
            {showComparison ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Action Buttons */}
      {processedImage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <button
            onClick={onDownload}
            className="btn btn-primary flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Image
          </button>
          <button
            onClick={onShare}
            className="btn btn-secondary flex-1"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </motion.div>
      )}

      {/* Image Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 Tip: Click the eye icon to compare original and processed images</p>
        {processedImage && (
          <p>✅ Your image has been processed successfully!</p>
        )}
      </div>
    </div>
  )
}