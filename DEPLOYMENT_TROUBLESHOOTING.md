# 🔧 Deployment Troubleshooting Guide

Quick solutions for common Render deployment issues.

## 🚨 Common Issues

### 1. Backend Build Fails

**Error:** `pip install` fails or dependencies not found

**Solutions:**
```bash
# Check Python version in Render logs
# Ensure requirements.txt is in backend/ directory
# Verify all dependencies are listed

# Common fix - update requirements.txt:
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6
pydantic==2.5.0
```

### 2. Frontend Build Fails

**Error:** `npm run build` fails

**Solutions:**
```bash
# Check Node.js version compatibility
# Clear node_modules and reinstall
npm ci
npm run build

# Check for TypeScript errors
# Verify all imports are correct
```

### 3. CORS Errors

**Error:** `Access to fetch at 'backend-url' from origin 'frontend-url' has been blocked by CORS policy`

**Solution:**
Update `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend-url.onrender.com",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4. API Not Responding

**Error:** Frontend can't connect to backend

**Checklist:**
- [ ] Backend service is running (check Render dashboard)
- [ ] Backend URL is correct in frontend
- [ ] API endpoints return 200 status
- [ ] Check backend logs for errors

### 5. 3D Model Not Loading

**Error:** 3D visualization appears broken

**Solutions:**
- Check browser console for WebGL errors
- Verify Three.js dependencies are installed
- Test on different browsers/devices
- Check if `prefers-reduced-motion` is affecting display

### 6. Slow Cold Starts

**Issue:** First API call takes 30+ seconds

**Explanation:** Render free tier services sleep after 15 minutes of inactivity

**Solutions:**
- This is normal behavior on free tier
- Consider upgrading to paid tier for always-on services
- Implement loading states in frontend

## 🔍 Debugging Steps

### Check Backend Health
```bash
# Test these URLs in browser:
https://your-backend.onrender.com/
https://your-backend.onrender.com/api/health
https://your-backend.onrender.com/docs
```

### Check Frontend Build
```bash
# Local test:
npm run build
npm run preview
```

### Monitor Logs
1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab
4. Look for error messages

## 📞 Getting Help

### Render Support
- Check [Render Documentation](https://render.com/docs)
- Visit [Render Community](https://community.render.com)

### Debug Locally
```bash
# Test full stack locally:
# Terminal 1 - Backend
cd backend
python main.py

# Terminal 2 - Frontend
npm run dev
```

## ⚡ Quick Fixes

### Force Redeploy
1. Go to Render Dashboard
2. Select service
3. Click "Manual Deploy" → "Deploy latest commit"

### Clear Build Cache
1. In service settings
2. Find "Clear build cache" option
3. Trigger new deployment

### Environment Variables
- Double-check all environment variables are set
- Ensure no typos in variable names
- Verify values are correct (URLs, etc.)

## 🎯 Success Indicators

Your deployment is working when:
- [ ] Backend `/docs` endpoint loads
- [ ] Frontend loads without console errors
- [ ] 3D model animates smoothly
- [ ] API calls return data (check Network tab)
- [ ] Mobile version works correctly

## 📱 Testing Checklist

After deployment, test:
- [ ] Desktop Chrome/Firefox/Safari
- [ ] Mobile Chrome/Safari
- [ ] 3D model performance
- [ ] API response times
- [ ] All navigation links
- [ ] Contact form functionality