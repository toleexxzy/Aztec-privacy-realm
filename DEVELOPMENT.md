# 🎨 Image Blur Platform - Development Guide

## 📁 Project Structure

```
image-blur-platform/
├── frontend/                 # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── auth/        # Authentication pages
│   │   │   ├── gallery/     # Gallery page
│   │   │   ├── upload/      # Upload page
│   │   │   └── layout.tsx   # Root layout
│   │   ├── components/      # Reusable components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and API client
│   │   └── types/           # TypeScript types
│   ├── package.json
│   └── tailwind.config.ts
├── backend/                 # Express.js Backend
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utilities
│   │   └── server.ts        # Main server file
│   ├── package.json
│   └── .env.example
├── uploads/                 # File storage
├── setup.bat               # Windows setup script
├── setup.sh                # Unix setup script
└── README.md
```

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
2. **MongoDB** (optional - can use MongoDB Atlas)
3. **Git** (for version control)

### Installation

#### Windows:
```bash
# Run the setup script
setup.bat
```

#### macOS/Linux:
```bash
# Make script executable and run
chmod +x setup.sh
./setup.sh
```

#### Manual Installation:
```bash
# 1. Install root dependencies
npm install

# 2. Install frontend dependencies
cd frontend
npm install
cd ..

# 3. Install backend dependencies
cd backend
npm install
cp .env.example .env
cd ..

# 4. Create uploads directory
mkdir uploads
```

### Environment Configuration

Edit `backend/.env` file:

```env
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database (optional - defaults to local MongoDB)
MONGODB_URI=mongodb://localhost:27017/image-blur-platform

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
```

### Running the Application

```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend  # Frontend only
npm run dev:backend   # Backend only
```

**Access URLs:**
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend API: http://localhost:3001
- 📋 Health Check: http://localhost:3001/health

## 🎯 Features

### ✅ Implemented Features

1. **Modern Homepage**
   - Hero section with animations
   - Feature showcase
   - Testimonials
   - Call-to-action sections

2. **Image Upload & Processing**
   - Drag & drop file upload
   - Multiple format support (JPEG, PNG, GIF, etc.)
   - Real-time preview
   - File validation

3. **Advanced Image Effects**
   - Variable blur intensity (0-50px)
   - Custom text overlays
   - Font customization (size, color, weight, style)
   - Text positioning and rotation
   - Real-time preview

4. **User Authentication**
   - Sign up/Sign in pages
   - Social authentication placeholders
   - JWT token handling
   - Protected routes

5. **Gallery System**
   - Public image gallery
   - Grid and list view modes
   - Search functionality
   - Sorting options (latest, popular, downloads)
   - Like and download features

6. **Responsive Design**
   - Mobile-first approach
   - Tailwind CSS styling
   - Smooth animations with Framer Motion
   - Modern UI components

### 🔄 In Progress

7. **User Profile & Settings**
8. **Advanced Social Features**
9. **Admin Dashboard**
10. **Performance Optimizations**

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **File Upload**: React Dropzone

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Image Processing**: Sharp.js + Canvas
- **Authentication**: JWT
- **Database**: MongoDB with Mongoose
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user

### Images
- `POST /api/images/upload` - Upload image
- `POST /api/images/process` - Process image with effects
- `GET /api/images/user/:userId` - Get user images
- `DELETE /api/images/:id` - Delete image
- `POST /api/images/:id/like` - Like/unlike image

### Gallery
- `GET /api/gallery` - Get public gallery
- `GET /api/gallery/featured` - Get featured images
- `GET /api/gallery/search` - Search images
- `GET /api/gallery/:id` - Get image details

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Railway/Heroku)
```bash
cd backend
npm run build
# Deploy to your preferred platform
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-super-secure-production-secret
FRONTEND_URL=https://your-frontend-domain.com
```

## 🔧 Development Tips

### Adding New Components
```typescript
// 1. Create component in src/components/
// 2. Export from index file
// 3. Import in pages where needed

// Example component structure:
'use client'
import { motion } from 'framer-motion'

export function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  )
}
```

### Adding New API Routes
```typescript
// 1. Create controller in backend/src/controllers/
// 2. Add route in backend/src/routes/
// 3. Import route in server.ts

// Example controller:
export const myController = async (req: Request, res: Response) => {
  try {
    // Handle request
    res.json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}
```

### Database Models
```typescript
// Create models in backend/src/models/
import mongoose from 'mongoose'

const MySchema = new mongoose.Schema({
  name: { type: String, required: true },
  // ... other fields
}, { timestamps: true })

export const MyModel = mongoose.model('MyModel', MySchema)
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in package.json scripts
2. **CORS errors**: Check FRONTEND_URL in backend .env
3. **MongoDB connection**: Ensure MongoDB is running or check connection string
4. **File upload fails**: Check upload directory permissions
5. **Image processing errors**: Ensure Sharp dependencies are installed

### Useful Commands
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json && npm install

# Reset uploads directory
rm -rf uploads && mkdir uploads

# Check API health
curl http://localhost:3001/health

# View logs
npm run dev:backend | grep -i error
```

## 📞 Support

For issues and questions:
1. Check this documentation
2. Review error logs
3. Check console for client-side errors
4. Verify environment configuration

## 🗺 Roadmap

### Phase 1 (Current)
- [x] Core image processing
- [x] Basic authentication
- [x] Gallery system
- [ ] User profiles
- [ ] Settings page

### Phase 2 (Next)
- [ ] Social features (following, sharing)
- [ ] Advanced filters and effects
- [ ] Mobile app
- [ ] Premium features

### Phase 3 (Future)
- [ ] AI-powered suggestions
- [ ] Collaborative editing
- [ ] Marketplace
- [ ] Analytics dashboard

---

**Happy coding! 🎨✨**