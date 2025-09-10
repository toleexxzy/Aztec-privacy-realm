'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Type, 
  Palette, 
  Move, 
  RotateCw, 
  Zap, 
  Sliders,
  Bold,
  Italic,
  AlignCenter,
  AlignLeft,
  AlignRight
} from 'lucide-react'

interface TextOverlay {
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

interface TextOverlayControlsProps {
  textOverlay: TextOverlay
  blurIntensity: number
  onTextChange: (overlay: TextOverlay) => void
  onBlurChange: (intensity: number) => void
  onProcess: () => void
  isProcessing: boolean
}

export function TextOverlayControls({
  textOverlay,
  blurIntensity,
  onTextChange,
  onBlurChange,
  onProcess,
  isProcessing
}: TextOverlayControlsProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'blur'>('text')

  const updateText = (field: keyof TextOverlay, value: any) => {
    if (field === 'position') {
      onTextChange({
        ...textOverlay,
        position: { ...textOverlay.position, ...value }
      })
    } else {
      onTextChange({
        ...textOverlay,
        [field]: value
      })
    }
  }

  const presetTexts = [
    'Your text here',
    'CREATIVE',
    'DESIGN',
    'INSPIRE',
    'DREAM BIG',
    'STAY FOCUSED'
  ]

  const presetColors = [
    '#FFFFFF',
    '#000000',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD'
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
            activeTab === 'text'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Type className="w-4 h-4 mr-2" />
          Text Settings
        </button>
        <button
          onClick={() => setActiveTab('blur')}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
            activeTab === 'blur'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Sliders className="w-4 h-4 mr-2" />
          Blur Effects
        </button>
      </div>

      {/* Text Controls */}
      {activeTab === 'text' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Content
            </label>
            <textarea
              value={textOverlay.text}
              onChange={(e) => updateText('text', e.target.value)}
              placeholder="Enter your text here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              rows={2}
            />
            
            {/* Preset Texts */}
            <div className="mt-2 flex flex-wrap gap-2">
              {presetTexts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => updateText('text', preset)}
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size: {textOverlay.fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="120"
              value={textOverlay.fontSize}
              onChange={(e) => updateText('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Font Style Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Weight
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateText('fontWeight', 'normal')}
                  className={`p-2 rounded border ${
                    textOverlay.fontWeight === 'normal'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => updateText('fontWeight', 'bold')}
                  className={`p-2 rounded border ${
                    textOverlay.fontWeight === 'bold'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Bold className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Style
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateText('fontStyle', 'normal')}
                  className={`p-2 rounded border ${
                    textOverlay.fontStyle === 'normal'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => updateText('fontStyle', 'italic')}
                  className={`p-2 rounded border ${
                    textOverlay.fontStyle === 'italic'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Italic className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Text Alignment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Alignment
            </label>
            <div className="flex space-x-2">
              {[
                { value: 'left', icon: AlignLeft },
                { value: 'center', icon: AlignCenter },
                { value: 'right', icon: AlignRight },
              ].map(({ value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => updateText('textAlign', value)}
                  className={`p-2 rounded border ${
                    textOverlay.textAlign === value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={textOverlay.color}
                onChange={(e) => updateText('color', e.target.value)}
                className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <div className="flex flex-wrap gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateText('color', color)}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Position Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                X Position: {textOverlay.position.x}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={textOverlay.position.x}
                onChange={(e) => updateText('position', { x: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Y Position: {textOverlay.position.y}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={textOverlay.position.y}
                onChange={(e) => updateText('position', { y: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          {/* Rotation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rotation: {textOverlay.rotation}°
            </label>
            <input
              type="range"
              min="-180"
              max="180"
              value={textOverlay.rotation}
              onChange={(e) => updateText('rotation', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </motion.div>
      )}

      {/* Blur Controls */}
      {activeTab === 'blur' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blur Intensity: {blurIntensity}px
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={blurIntensity}
              onChange={(e) => onBlurChange(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>No Blur</span>
              <span>Maximum Blur</span>
            </div>
          </div>

          {/* Preset Blur Values */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Presets
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'None', value: 0 },
                { label: 'Light', value: 5 },
                { label: 'Medium', value: 15 },
                { label: 'Heavy', value: 30 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => onBlurChange(preset.value)}
                  className={`py-2 px-3 text-sm rounded border transition-colors ${
                    blurIntensity === preset.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Process Button */}
      <motion.button
        onClick={onProcess}
        disabled={isProcessing || !textOverlay.text.trim()}
        className="w-full btn btn-primary py-3 text-lg"
        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Zap className="w-5 h-5 mr-2" />
            Apply Effects
          </div>
        )}
      </motion.button>
    </div>
  )
}