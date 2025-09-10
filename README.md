# 🌲 Aztec Privacy Realm

**A mystical web application for protecting your images with privacy blur effects and magical Aztec-themed experiences.**

![Aztec Privacy Realm](https://img.shields.io/badge/Status-Active-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-22.19.0-green) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🔒 Privacy Protection
- **Real-time Image Blur**: Apply privacy-protecting blur effects to your images
- **Text Overlays**: Add "PRIVACY REALM" watermarks to protected images
- **Download Protection**: Download blurred images with overlays
- **Gallery System**: View all your privacy-protected images

### 🎨 Magical Experience
- **Aztec Bubble Effects**: Floating logo bubbles with mystical animations
- **Forest Ambient Sounds**: Immersive nature sounds with bird chirps
- **Interactive Sound System**: Complete audio experience with volume controls
- **Mystical UI**: Beautiful gradient backgrounds and smooth animations

### 🐦 Social Integration
- **Twitter Sharing**: Share protected images directly to Twitter
- **Custom Tweet Messages**: Pre-written privacy-focused messages
- **Username Mentions**: Automatic mentions of @aztecnetwork and @toluinweb3

### 🎵 Audio System
- **4-Layer Sound Design**: Forest ambience, mystical tones, UI feedback, and action sounds
- **Web Audio API**: Programmatically generated sounds for fast loading
- **User Controls**: Toggle sounds on/off with volume slider
- **Cross-Browser Compatible**: Works on all modern browsers

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ (tested on v22.19.0)
- npm package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/toleexxzy/Aztec-privacy-realm.git
   cd Aztec-privacy-realm
   ```

2. **Run setup script**
   ```bash
   # On Windows
   ./setup.bat
   
   # On macOS/Linux
   ./setup.sh
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3005
   - Backend API: http://localhost:3001

## 🏗️ Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Web Audio API
- **Backend**: Node.js, Express.js, TypeScript
- **Image Processing**: Client-side CSS filters (Sharp.js fallback)
- **Storage**: Local file system with localStorage for gallery
- **Development**: Concurrently for multi-server development

### Project Structure
```
aztec-privacy-realm/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Auth & error handling
│   │   └── server.ts       # Entry point
│   └── uploads/            # Image storage
├── frontend/               # Next.js frontend (future)
├── simple-frontend.html    # Current main interface
├── aztec logo.jpg         # Application logo
└── uploads/               # Uploaded images
```

## 🎯 Usage Guide

### 1. Welcome Experience
- Choose "Enter with Sound" for full audio experience
- Or "Enter Silently" for quiet operation

### 2. Image Upload
- Click "Choose File" or drag & drop images
- Supports all common image formats
- Maximum file size: 10MB

### 3. Privacy Protection
- Click "Apply Blur Effect" on uploaded images
- Watch mystical Aztec bubbles animate
- Image gets 15px blur with "PRIVACY REALM" overlay

### 4. Download & Share
- **Download**: Get processed image with blur and text
- **Twitter Share**: Post to Twitter with pre-written message
- **Gallery**: View all processed images in the gallery

### 5. Sound Controls
- **🌲 Forest Toggle**: Control nature sounds
- **🔊 Master Toggle**: Enable/disable all sounds
- **Volume Slider**: Adjust audio levels

## 🔧 Development

### Available Scripts
- `npm run dev` - Start both frontend and backend servers
- `npm run build` - Build the frontend for production
- `npm start` - Start production frontend server
- `npm run setup` - Install all dependencies

### Development Servers
- **Backend**: http://localhost:3001 (Express.js + TypeScript)
- **Frontend**: http://localhost:3005 (HTTP server for development)

### Key Features Implementation
- **Client-side Blur**: CSS `filter: blur()` for instant effects
- **Bubble Animation**: CSS keyframes with JavaScript control
- **Sound Generation**: Web Audio API with procedural synthesis
- **Gallery Persistence**: localStorage for cross-session storage

## 🌟 Sound System

### 4-Layer Audio Architecture
1. **Forest Ambience** - Continuous wind and rustling sounds
2. **Bird Chirps** - Random nature sounds (robin, sparrow, dove)
3. **Mystical Tones** - UI interaction feedback
4. **Action Sounds** - Upload, success, and processing effects

### Audio Features
- **Procedural Generation**: No external audio files needed
- **Cross-browser Support**: Web Audio API with fallbacks
- **User Control**: Complete on/off and volume control
- **Performance Optimized**: Lightweight and memory efficient

## 🐦 Twitter Integration

### Features
- **One-click Sharing**: Direct integration with Twitter Web Intent
- **Custom Messages**: Privacy-focused tweet content
- **Username Mentions**: Automatic @aztecnetwork and @toluinweb3 tags
- **Hashtag Strategy**: #Privacy #AztecRealm #DataProtection

### Tweet Template
```
Welcome to the realm of privacy! 🔒✨ Just protected my image with Aztec Privacy Realm's mystical blur effects. Your privacy is your power! 🌲💫

@aztecnetwork @toluinweb3 #Privacy #AztecRealm #DataProtection
```

## 🔒 Privacy Features

- **No Server Processing**: Images processed client-side for privacy
- **Local Storage**: Gallery stored in browser localStorage
- **No Analytics**: No tracking or user data collection
- **CORS Security**: Proper CORS configuration for API security

## 🎨 Design Philosophy

- **Mystical Theme**: Aztec-inspired design with privacy focus
- **User Experience**: Smooth animations and intuitive interface
- **Accessibility**: Sound controls and clear visual feedback
- **Performance**: Lightweight and fast-loading components

## 📱 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers with Web Audio API support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Toluweb3** - [@toluinweb3](https://twitter.com/toluinweb3)

## 🙏 Acknowledgments

- **@aztecnetwork** - Inspiration for privacy-focused design
- **Web Audio API** - For enabling rich sound experiences
- **CSS Filter Effects** - For client-side image processing

## 🔗 Links

- **GitHub Repository**: https://github.com/toleexxzy/Aztec-privacy-realm
- **Live Demo**: Coming soon
- **Documentation**: This README

---

*Built with ❤️ for privacy and mystical experiences*