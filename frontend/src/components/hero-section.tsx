'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Upload } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            New: Advanced blur algorithms available
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
        >
          Transform Your Images with
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {' '}Stunning Blur Effects
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Upload your images and create beautiful blurred backgrounds with customizable text overlays. 
          Professional-grade effects made simple for everyone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/upload"
            className="btn btn-primary text-lg px-8 py-4 group"
          >
            <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Creating
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/gallery"
            className="btn btn-ghost text-lg px-8 py-4"
          >
            View Gallery
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <p className="text-sm text-gray-500 mb-4">Trusted by creative professionals worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {/* Logo placeholders - replace with actual client logos */}
            <div className="text-2xl font-bold text-gray-400">Adobe</div>
            <div className="text-2xl font-bold text-gray-400">Canva</div>
            <div className="text-2xl font-bold text-gray-400">Figma</div>
            <div className="text-2xl font-bold text-gray-400">Sketch</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}