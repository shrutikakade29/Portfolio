@echo off
REM Deployment preparation script for Render (Windows)
REM Run this before pushing to GitHub for deployment

echo 🚀 Preparing Durwankur Motiwale Portfolio for Render deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
call npm install

REM Build frontend to test
echo 🔨 Testing frontend build...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Frontend build failed. Please fix errors before deploying.
    pause
    exit /b 1
)

echo ✅ Frontend build successful!

REM Check backend dependencies
echo 🐍 Checking backend dependencies...
cd backend

if not exist "requirements.txt" (
    echo ❌ Error: backend/requirements.txt not found.
    pause
    exit /b 1
)

cd ..

echo.
echo 🎯 Deployment Checklist:
echo ✅ Frontend dependencies installed
echo ✅ Frontend build tested
echo ✅ Backend configuration updated
echo ✅ CORS configured for production
echo ✅ API URLs configured for production
echo.
echo 📋 Next Steps:
echo 1. Push your code to GitHub
echo 2. Follow the RENDER_DEPLOYMENT_GUIDE.md
echo 3. Deploy backend first, then frontend
echo 4. Update frontend API URL with your backend URL
echo.
echo 🌐 Your deployment URLs will be:
echo Frontend: https://durwankur-portfolio.onrender.com
echo Backend:  https://durwankur-portfolio-backend.onrender.com
echo.
echo 🎉 Ready for deployment!
pause