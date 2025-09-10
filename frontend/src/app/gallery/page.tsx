'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, Heart, Download, Eye } from 'lucide-react'
import Image from 'next/image'
import { getGalleryImages } from '@/lib/api'
import { GalleryImage } from '@/types'

type SortOption = 'latest' | 'popular' | 'downloads'
type ViewMode = 'grid' | 'list'

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    loadImages()
  }, [currentPage, sortBy])

  const loadImages = async () => {
    try {
      setLoading(true)
      // Mock data for development
      const mockImages: GalleryImage[] = Array.from({ length: 12 }, (_, i) => ({
        id: `gallery-${currentPage}-${i + 1}`,
        title: `Creative Blur ${i + 1}`,
        thumbnailUrl: '/placeholder-image.jpg',
        fullUrl: '/placeholder-image.jpg',
        user: {
          name: `Artist ${(i % 5) + 1}`,
          avatar: '/placeholder-avatar.jpg'
        },
        likes: Math.floor(Math.random() * 200),
        downloads: Math.floor(Math.random() * 100),
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      }))

      setImages(mockImages)
      setTotalPages(5)
    } catch (error) {
      console.error('Failed to load gallery images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setLoading(true)
    // Implement search functionality
    setTimeout(() => setLoading(false), 1000)
  }

  const handleLike = async (imageId: string) => {
    // Implement like functionality
    console.log('Liked image:', imageId)
  }

  const handleDownload = async (imageId: string) => {
    // Implement download functionality
    console.log('Downloaded image:', imageId)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Gallery
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing blurred images created by our community of artists and designers
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="downloads">Most Downloaded</option>
              </select>
            </div>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg aspect-square animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-6'
          }
        >
          {images.map((image, index) => (
            <GalleryCard
              key={image.id}
              image={image}
              viewMode={viewMode}
              index={index}
              onLike={handleLike}
              onDownload={handleDownload}
            />
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center space-x-2"
        >
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="btn btn-ghost disabled:opacity-50"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-ghost disabled:opacity-50"
          >
            Next
          </button>
        </motion.div>
      )}
    </div>
  )
}

interface GalleryCardProps {
  image: GalleryImage
  viewMode: ViewMode
  index: number
  onLike: (id: string) => void
  onDownload: (id: string) => void
}

function GalleryCard({ image, viewMode, index, onLike, onDownload }: GalleryCardProps) {
  const [liked, setLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    onLike(image.id)
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow"
      >
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
          <p className="text-sm text-gray-600 mb-2">by {image.user.name}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {image.likes}
            </span>
            <span className="flex items-center">
              <Download className="w-4 h-4 mr-1" />
              {image.downloads}
            </span>
            <span>{new Date(image.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleLike}
            className={`p-2 rounded-lg transition-colors ${
              liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onDownload(image.id)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
        
        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-3"
        >
          <button
            onClick={handleLike}
            className={`p-3 rounded-full transition-colors ${
              liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onDownload(image.id)}
            className="p-3 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors"
          >
            <Download className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors">
            <Eye className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 truncate">{image.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>by {image.user.name}</span>
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              {image.likes}
            </span>
            <span className="flex items-center">
              <Download className="w-3 h-3 mr-1" />
              {image.downloads}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}