'use client'

import { motion } from 'framer-motion'
import { Loader2, Sparkles, Zap } from 'lucide-react'

export function ProcessingLoader() {
  const steps = [
    'Analyzing image...',
    'Applying blur effects...',
    'Rendering text overlay...',
    'Finalizing image...'
  ]

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity }
        }}
        className="relative"
      >
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full" />
        <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
      </motion.div>

      <div className="text-center space-y-2">
        <motion.h3
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg font-semibold text-gray-900"
        >
          Processing Your Image
        </motion.h3>
        <p className="text-sm text-gray-600">
          Please wait while we apply the effects...
        </p>
      </div>

      <div className="w-full max-w-xs space-y-2">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5
            }}
            className="flex items-center space-x-2 text-sm text-gray-600"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.5
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <span>{step}</span>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
        <div className="flex items-center space-x-2 text-blue-800">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Pro Tip</span>
        </div>
        <p className="text-xs text-blue-700 mt-1">
          Processing time depends on image size and complexity. High-resolution images may take a bit longer for the best quality results.
        </p>
      </div>
    </div>
  )
}