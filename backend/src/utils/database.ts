import mongoose from 'mongoose'

const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/image-blur-platform'
    
    await mongoose.connect(mongoUri, {
      // These options are now default in Mongoose 6+
      // No need for useNewUrlParser and useUnifiedTopology
    })

    console.log('✅ MongoDB connected successfully')

    // Handle connection events
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected')
    })

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      console.log('📝 MongoDB connection closed through app termination')
      process.exit(0)
    })

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    throw error
  }
}

export { connectDatabase }