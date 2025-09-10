'use client'

import { motion } from 'framer-motion'
import { Upload, Zap, Palette, Share2, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { HeroSection } from '@/components/hero-section'
import { FeatureCard } from '@/components/feature-card'
import { CTASection } from '@/components/cta-section'

const features = [
  {
    icon: Upload,
    title: 'Easy Upload',
    description: 'Drag and drop or click to upload your images. Supports JPEG, PNG, and more formats.',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description: 'Advanced blur algorithms with real-time preview. See changes instantly.',
  },
  {
    icon: Palette,
    title: 'Custom Text Overlays',
    description: 'Add personalized text with various fonts, colors, and positioning options.',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your creations directly to social media or download for later.',
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Graphic Designer',
    content: 'This platform has revolutionized my workflow. The blur effects are professional-grade!',
    rating: 5,
  },
  {
    name: 'Mike Chen',
    role: 'Content Creator',
    content: 'Love how easy it is to create stunning visuals. The text overlay feature is fantastic.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Social Media Manager',
    content: 'Perfect for creating engaging social media content. Highly recommended!',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to create stunning blurred images with custom text overlays
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white rounded-2xl shadow-sm">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Upload Image', description: 'Choose your image file' },
            { step: '2', title: 'Apply Effects', description: 'Add blur and text overlay' },
            { step: '3', title: 'Download & Share', description: 'Save or share your creation' },
          ].map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < 2 && (
                <ArrowRight className="w-6 h-6 text-gray-400 mx-auto mt-4 hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            What Our Users Say
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}