@echo off
echo 🚀 Setting up Image Blur Platform...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install

REM Copy environment file
if not exist .env (
    echo 📄 Creating environment file...
    copy .env.example .env
    echo ⚠️  Please edit backend/.env file with your configuration
)

cd ..

REM Create uploads directory if it doesn't exist
if not exist uploads mkdir uploads

echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo 1. Edit backend/.env file with your configuration
echo 2. Start MongoDB (if using local database)
echo 3. Run 'npm run dev' to start both frontend and backend
echo.
echo 🌐 Frontend will be available at: http://localhost:3000
echo 🔧 Backend API will be available at: http://localhost:3001

pause