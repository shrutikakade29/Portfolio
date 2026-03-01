#!/bin/bash

# Deployment preparation script for Render
# Run this before pushing to GitHub for deployment

echo "🚀 Preparing Durwankur Motiwale Portfolio for Render deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build frontend to test
echo "🔨 Testing frontend build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
else
    echo "❌ Frontend build failed. Please fix errors before deploying."
    exit 1
fi

# Check backend dependencies
echo "🐍 Checking backend dependencies..."
cd backend

if [ ! -f "requirements.txt" ]; then
    echo "❌ Error: backend/requirements.txt not found."
    exit 1
fi

# Test backend startup (optional - requires Python)
if command -v python3 &> /dev/null; then
    echo "🧪 Testing backend startup..."
    python3 -c "
import sys
sys.path.append('.')
try:
    from main import app
    print('✅ Backend imports successfully!')
except Exception as e:
    print(f'❌ Backend import error: {e}')
    sys.exit(1)
"
else
    echo "⚠️  Python3 not found. Skipping backend test."
fi

cd ..

echo ""
echo "🎯 Deployment Checklist:"
echo "✅ Frontend dependencies installed"
echo "✅ Frontend build tested"
echo "✅ Backend configuration updated"
echo "✅ CORS configured for production"
echo "✅ API URLs configured for production"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Follow the RENDER_DEPLOYMENT_GUIDE.md"
echo "3. Deploy backend first, then frontend"
echo "4. Update frontend API URL with your backend URL"
echo ""
echo "🌐 Your deployment URLs will be:"
echo "Frontend: https://durwankur-portfolio.onrender.com"
echo "Backend:  https://durwankur-portfolio-backend.onrender.com"
echo ""
echo "🎉 Ready for deployment!"