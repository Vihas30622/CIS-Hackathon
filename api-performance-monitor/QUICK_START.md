# 🚀 Quick Start Guide

Get the API Performance Monitor running in 5 minutes!

## Windows Quick Start

### Step 1: Setup Backend

```powershell
# Navigate to backend directory
cd api-performance-monitor\backend

# Install dependencies
npm install

# Create .env file (copy template)
copy .env.sample .env

# Edit .env if needed (default MongoDB local connection should work)
# Keep: MONGODB_URI=mongodb://localhost:27017/api-performance-monitor

# Start backend
npm start
# Server running: http://localhost:5000
```

### Step 2: Setup Frontend (New Terminal)

```powershell
# Navigate to frontend directory
cd api-performance-monitor\frontend

# Install dependencies
npm install

# Create .env file
copy .env.sample .env
# Default .env should work fine

# Start frontend
npm start
# App opens at: http://localhost:3000
```

### Step 3: Setup MongoDB (if not already installed)

**Option A: Local MongoDB**
```powershell
# Installation https://www.mongodb.com/try/download/community
# After installation, MongoDB starts as a service

# Verify it's running:
Get-Process mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in backend\.env:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/api-performance-monitor
   ```

## MacOS Quick Start

```bash
# Backend
cd api-performance-monitor/backend
npm install
cp .env.sample .env
npm start

# Frontend (new terminal)
cd api-performance-monitor/frontend
npm install
cp .env.sample .env
npm start

# Start MongoDB (if local)
brew services start mongodb-community
```

## Linux Quick Start

```bash
# Backend
cd api-performance-monitor/backend
npm install
cp .env.sample .env
npm start

# Frontend (new terminal)
cd api-performance-monitor/frontend
npm install
cp .env.sample .env
npm start

# Start MongoDB (if local)
sudo systemctl start mongod
```

## First Test

Once everything is running:

1. **Open** http://localhost:3000
2. Go to **🧪 API Tester** tab
3. Use default example: `https://api.github.com/users/github`
4. Click **Test API**
5. See response in results!

## Verification Checklist

- [ ] Backend running on http://localhost:5000/health (shows success message)
- [ ] Frontend running on http://localhost:3000
- [ ] MongoDB is running (check connection)
- [ ] No CORS errors in browser console
- [ ] Can send test request and see results
- [ ] Dashboard tab shows data after testing

## Common Quick Fixes

**"Cannot find module"**
```
npm install  # Run in the directory that has error
```

**"MongoDB connection failed"**
```
# Start MongoDB service
# Windows: Services app → MongoDB Server → Start
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**"Port 5000 already in use"**
```
# Backend .env file, change:
PORT=5001  # Use different port
```

**"Port 3000 already in use"**
```bash
# Kill process on Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on Mac/Linux
lsof -ti:3000 | xargs kill -9
```

## Environment Variables Reference

### Backend (.env)
```env
# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/api-performance-monitor

# Server port
PORT=5000

# Environment
NODE_ENV=development

# API slowness threshold (milliseconds)
SLOW_API_THRESHOLD=2000
```

### Frontend (.env)
```env
# Backend API base URL
REACT_APP_API_URL=http://localhost:5000/api
```

## Project Features Explained

🧪 **API Tester**
- Sends requests to any API
- Shows response time, status, and data
- Saves to database automatically

📊 **Dashboard**
- View performance trends
- See API rankings
- Analyze slow API patterns
- Time range selection (7-90 days)

📜 **History**
- Browse all test results
- Filter by URL
- Sort by various fields
- Detailed result information

## Popular Test URLs

Try these to get started:

```
# GitHub API
https://api.github.com/users/github

# JSONPlaceholder (Test API)
https://jsonplaceholder.typicode.com/posts
https://jsonplaceholder.typicode.com/users

# OpenWeather (needs free API key)
https://api.openweathermap.org/data/2.5/weather?q=London

# Random user API
https://randomuser.me/api/
```

## Development Stack

| Component | Technology |
|-----------|-----------|
| Frontend UI | React 18 |
| Styling | Tailwind CSS |
| Charts | Chart.js |
| Backend | Node.js + Express |
| Database | MongoDB |
| HTTP Client | Axios |

## Next Steps

1. ✅ Get it running (above)
2. 📊 Test some APIs
3. 📈 Explore Dashboard
4. 🔧 Customize slow threshold
5. 📋 Review test history
6. 🚀 Deploy to production (see README.md)

## Need Help?

1. Check **README.md** for full documentation
2. Review troubleshooting section
3. Check terminal for error messages
4. Verify all ports are accessible
5. Check browser console (F12)

---

**You're all set! Happy monitoring!** 🎉
