'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageUploader } from '@/components/image-uploader'
import { ImagePreview } from '@/components/image-preview'
import { TextOverlayControls } from '@/components/text-overlay-controls'
import { ProcessingLoader } from '@/components/processing-loader'
import { useImageProcessor } from '@/hooks/use-image-processor'

export default function UploadPage() {
  const {
    originalImage,
    processedImage,
    isProcessing,
    textOverlay,
    blurIntensity,
    setOriginalImage,
    updateTextOverlay,
    updateBlurIntensity,
    processImage,
    downloadImage,
    shareImage,
  } = useImageProcessor()

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Upload & Transform Your Image
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your image, apply blur effects, and add custom text overlays to create stunning visuals
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">1. Upload Image</h2>
            <ImageUploader
              onImageUpload={setOriginalImage}
              isProcessing={isProcessing}
            />
          </div>

          {originalImage && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">2. Customize Effects</h2>
              <TextOverlayControls
                textOverlay={textOverlay}
                blurIntensity={blurIntensity}
                onTextChange={updateTextOverlay}
                onBlurChange={updateBlurIntensity}
                onProcess={processImage}
                isProcessing={isProcessing}
              />
            </div>
          )}
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">3. Preview & Download</h2>
            
            {isProcessing ? (
              <ProcessingLoader />
            ) : (
              <ImagePreview
                originalImage={originalImage}
                processedImage={processedImage}
                onDownload={downloadImage}
                onShare={shareImage}
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Pro Tips</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-blue-800">
          <div>• Use high-resolution images for best results</div>
          <div>• Experiment with different blur intensities</div>
          <div>• Try various text positions and colors</div>
          <div>• Consider image composition when placing text</div>
          <div>• Use contrasting colors for better readability</div>
          <div>• Save different versions to compare effects</div>
        </div>
      </motion.div>
    </div>
  )
}