# 🚀 Render Deployment Guide - Durwankur Motiwale Portfolio

This guide will help you deploy both your React frontend and FastAPI backend to Render.com with easy step-by-step instructions.

## 📋 Prerequisites

- GitHub account
- Render account (free tier available)
- Your portfolio code pushed to a GitHub repository

## 🏗️ Project Structure Overview

```
PortFolio/
├── backend/           # FastAPI backend
│   ├── main.py
│   ├── requirements.txt
│   └── venv/
├── src/              # React frontend
├── package.json      # Frontend dependencies
├── vite.config.js    # Vite configuration
└── index.html
```

---

## 🔧 Step 1: Prepare Your Code for Deployment

### 1.1 Update Backend for Production

First, let's ensure your backend is production-ready:

**Create/Update `backend/requirements.txt`:**
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
pydantic==2.5.0
```

**Update `backend/main.py` for production:**
- Add CORS configuration for your frontend domain
- Set proper host and port configuration

### 1.2 Update Frontend API Configuration

**Update `src/utils/api.js`:**
- Change API base URL to your Render backend URL
- Add fallback for local development

### 1.3 Create Build Scripts

**Add to root `package.json`:**
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🌐 Step 2: Deploy Backend to Render

### 2.1 Create Backend Service

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in with GitHub
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Select your portfolio repository
   - Click "Connect"

3. **Configure Backend Service**
   ```
   Name: durwankur-portfolio-backend
   Environment: Python 3
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: backend
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. **Set Environment Variables**
   - Add any environment variables your backend needs
   - Render automatically provides `PORT` variable

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (usually 2-5 minutes)
   - Note your backend URL: `https://durwankur-portfolio-backend.onrender.com`

### 2.2 Verify Backend Deployment

- Visit `https://your-backend-url.onrender.com/docs`
- You should see FastAPI's automatic documentation
- Test the `/api/status` endpoint

---

## 🎨 Step 3: Deploy Frontend to Render

### 3.1 Update API Configuration

**Update `src/utils/api.js`:**
```javascript
// Replace localhost with your Render backend URL
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://durwankur-portfolio-backend.onrender.com'
  : 'http://localhost:8000'

// Rest of your API code...
```

### 3.2 Create Frontend Service

1. **Create New Static Site**
   - In Render Dashboard: "New +" → "Static Site"
   - Connect same repository

2. **Configure Frontend Service**
   ```
   Name: durwankur-portfolio
   Branch: main
   Root Directory: (leave empty - root of repo)
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Add Environment Variables (if needed)**
   ```
   NODE_ENV: production
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Wait for build and deployment
   - Your site will be available at: `https://durwankur-portfolio.onrender.com`

---

## 🔄 Step 4: Update CORS Configuration

### 4.1 Update Backend CORS

**In `backend/main.py`, add:**
```python
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://durwankur-portfolio.onrender.com",  # Your frontend URL
        "http://localhost:5173",  # Local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4.2 Redeploy Backend

- Push changes to GitHub
- Render will automatically redeploy your backend

---

## ✅ Step 5: Final Verification

### 5.1 Test Your Deployed Site

1. **Visit your frontend URL**
2. **Check 3D model loads correctly**
3. **Verify API integration works**
4. **Test on mobile devices**

### 5.2 Performance Optimization

**Optional improvements:**
- Enable Render's CDN
- Add custom domain
- Set up monitoring

---

## 🚨 Common Issues & Solutions

### Issue 1: Backend Takes Time to Wake Up
**Problem:** Render free tier services sleep after 15 minutes of inactivity
**Solution:** First API call might be slow (cold start) - this is normal

### Issue 2: CORS Errors
**Problem:** Frontend can't connect to backend
**Solution:** Ensure CORS is properly configured with your frontend domain

### Issue 3: Build Failures
**Problem:** Frontend build fails
**Solution:** Check Node.js version compatibility and dependencies

### Issue 4: API Endpoints Not Working
**Problem:** 404 errors on API calls
**Solution:** Verify API base URL is correct in frontend

---

## 📱 Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain to Frontend
1. In Render Dashboard → Your static site
2. Go to "Settings" → "Custom Domains"
3. Add your domain (e.g., `durwankurmotiwale.com`)
4. Update DNS records as instructed

### 6.2 Update Backend CORS
- Add your custom domain to CORS allowed origins
- Redeploy backend

---

## 🔧 Development Workflow

### Local Development
```bash
# Terminal 1 - Backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python main.py

# Terminal 2 - Frontend
npm install
npm run dev
```

### Production Deployment
1. Push changes to GitHub
2. Render automatically deploys both services
3. Monitor deployment logs in Render dashboard

---

## 📊 Monitoring & Maintenance

### Check Service Health
- Monitor Render dashboard for service status
- Set up email notifications for deployment failures
- Check logs for any errors

### Performance Monitoring
- Use Render's built-in metrics
- Monitor API response times
- Check 3D model performance on different devices

---

## 🎯 Final Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] API integration working
- [ ] 3D model loading correctly
- [ ] CORS configured properly
- [ ] Mobile responsiveness verified
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up

---

## 📞 Support

If you encounter issues:
1. Check Render's deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check browser console for errors

**Your Portfolio URLs:**
- Frontend: `https://durwankur-portfolio.onrender.com`
- Backend: `https://durwankur-portfolio-backend.onrender.com`
- API Docs: `https://durwankur-portfolio-backend.onrender.com/docs`

---

**🎉 Congratulations! Your portfolio is now live on the internet!**