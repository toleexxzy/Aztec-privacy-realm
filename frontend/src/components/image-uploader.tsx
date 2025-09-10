'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, X, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface ImageUploaderProps {
  onImageUpload: (file: File, dataUrl: string) => void
  isProcessing: boolean
}

export function ImageUploader({ onImageUpload, isProcessing }: ImageUploaderProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB')
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setUploadedImage(dataUrl)
        onImageUpload(file, dataUrl)
        toast.success('Image uploaded successfully!')
      }
      reader.readAsDataURL(file)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    disabled: isProcessing,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  })

  const removeImage = () => {
    setUploadedImage(null)
    setDragActive(false)
  }

  return (
    <div className="space-y-4">
      {!uploadedImage ? (
        <motion.div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
            ${isDragActive || dragActive 
              ? 'border-primary bg-primary/5 scale-105' 
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          whileHover={{ scale: isProcessing ? 1 : 1.02 }}
          whileTap={{ scale: isProcessing ? 1 : 0.98 }}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Upload className={`w-8 h-8 text-primary ${isDragActive ? 'animate-bounce' : ''}`} />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isDragActive ? 'Drop your image here!' : 'Upload your image'}
              </h3>
              <p className="text-gray-600 mb-2">
                Drag and drop an image file, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports JPEG, PNG, GIF, BMP, WebP (max 10MB)
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary mx-auto"
              disabled={isProcessing}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Choose File
            </button>
          </div>

          {isDragActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <div className="text-primary font-semibold">Drop it like it's hot! 🔥</div>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gray-100 rounded-lg overflow-hidden"
        >
          <div className="relative aspect-video">
            <Image
              src={uploadedImage}
              alt="Uploaded image"
              fill
              className="object-contain"
            />
            
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              disabled={isProcessing}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4 bg-white">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ImageIcon className="w-4 h-4" />
              <span>Image uploaded successfully</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* File Format Support Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Supported formats:</p>
            <p>JPEG, PNG, GIF, BMP, WebP files up to 10MB. For best results, use high-resolution images.</p>
          </div>
        </div>
      </div>
    </div>
  )
}