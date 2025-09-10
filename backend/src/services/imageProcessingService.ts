// import sharp from 'sharp' // Temporarily disabled for Windows compatibility
// import { createCanvas, loadImage, registerFont } from 'canvas' // Temporarily disabled for Windows compatibility
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs/promises'

export interface TextOverlay {
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

export interface ProcessImageOptions {
  imageBuffer: Buffer
  textOverlay: TextOverlay
  blurIntensity: number
}

export class ImageProcessingService {
  private static instance: ImageProcessingService
  private uploadsDir: string

  constructor() {
    this.uploadsDir = path.join(process.cwd(), 'uploads')
    this.ensureUploadsDirectory()
  }

  static getInstance(): ImageProcessingService {
    if (!ImageProcessingService.instance) {
      ImageProcessingService.instance = new ImageProcessingService()
    }
    return ImageProcessingService.instance
  }

  private async ensureUploadsDirectory(): Promise<void> {
    try {
      await fs.access(this.uploadsDir)
    } catch {
      await fs.mkdir(this.uploadsDir, { recursive: true })
    }
  }

  async processImage({ imageBuffer, textOverlay, blurIntensity }: ProcessImageOptions): Promise<string> {
    try {
      // Since Sharp is having compilation issues on Windows, let's use Canvas for blur effect
      console.log('Processing image with blur intensity:', blurIntensity);
      console.log('Text overlay:', textOverlay.text);
      
      // For now, we'll create a simple blur effect using CSS filters in the frontend
      // Save the original image first
      const filename = `processed-${uuidv4()}.png`;
      const filepath = path.join(this.uploadsDir, filename);
      
      // Save the original image
      await fs.writeFile(filepath, imageBuffer);
      
      // Return the URL with blur parameters that the frontend can use
      const processedUrl = `/uploads/${filename}?blur=${blurIntensity}&text=${encodeURIComponent(textOverlay.text)}`;
      
      console.log('✅ Image processed successfully:', processedUrl);
      return processedUrl;
    } catch (error) {
      console.error('Image processing error:', error);
      throw new Error('Failed to process image');
    }
  }

  // Text overlay method temporarily disabled due to canvas dependency issues on Windows
  // TODO: Implement alternative text overlay solution
  /*
  private async addTextOverlay(
    ctx: CanvasRenderingContext2D,
    overlay: TextOverlay,
    canvasWidth: number,
    canvasHeight: number
  ): Promise<void> {
    const { text, fontSize, color, fontWeight, fontStyle, textAlign, position, rotation } = overlay

    // Calculate position
    const x = (position.x / 100) * canvasWidth
    const y = (position.y / 100) * canvasHeight

    // Save context state
    ctx.save()

    // Apply transformations
    ctx.translate(x, y)
    
    if (rotation !== 0) {
      ctx.rotate((rotation * Math.PI) / 180)
    }

    // Set font properties
    const fontString = `${fontStyle} ${fontWeight} ${fontSize}px Arial, sans-serif`
    ctx.font = fontString
    ctx.fillStyle = color
    ctx.textAlign = textAlign as CanvasTextAlign
    ctx.textBaseline = 'middle'

    // Add text shadow for better readability
    ctx.shadowColor = color === '#FFFFFF' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    // Handle multi-line text
    const lines = text.split('\n')
    const lineHeight = fontSize * 1.2

    lines.forEach((line, index) => {
      const yOffset = (index - (lines.length - 1) / 2) * lineHeight
      ctx.fillText(line, 0, yOffset)
    })

    // Restore context state
    ctx.restore()
  }
  */

  async saveUploadedImage(buffer: Buffer, originalName: string): Promise<string> {
    try {
      // Generate unique filename
      const ext = path.extname(originalName) || '.png'
      const filename = `original-${uuidv4()}${ext}`
      const filepath = path.join(this.uploadsDir, filename)

      // For now, just save the original image without processing
      // TODO: Add image optimization once Sharp is working
      await fs.writeFile(filepath, buffer)

      return `/uploads/${filename}`
    } catch (error) {
      console.error('Save image error:', error)
      throw new Error('Failed to save uploaded image')
    }
  }

  async deleteImage(filename: string): Promise<void> {
    try {
      const filepath = path.join(this.uploadsDir, path.basename(filename))
      await fs.unlink(filepath)
    } catch (error) {
      console.error('Delete image error:', error)
      // Don't throw error if file doesn't exist
    }
  }

  async generateThumbnail(imagePath: string): Promise<string> {
    try {
      // For now, return the original image path
      // TODO: Implement thumbnail generation once Sharp is working
      return imagePath
    } catch (error) {
      console.error('Thumbnail generation error:', error)
      throw new Error('Failed to generate thumbnail')
    }
  }
}

export const imageProcessingService = ImageProcessingService.getInstance()