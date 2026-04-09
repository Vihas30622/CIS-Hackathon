# 🚀 API Performance Monitor

A full-stack application for testing, monitoring, and analyzing API performance in real-time. Track response times, detect slow APIs, and visualize performance trends with an interactive dashboard.

## 📋 Features

✅ **API Testing**
- Send GET, POST, PUT, PATCH, DELETE requests
- Custom headers and JSON body support
- Real-time response display
- Response time measurement in milliseconds

✅ **Test Result Storage**
- All test results saved to MongoDB
- Full request/response data captured
- Timestamp tracking for historical analysis
- Indexed database queries for fast retrieval

✅ **Test History**
- Browse all previous test results
- Filter by API URL
- Sort by timestamp, response time, or status code
- View detailed response data

✅ **Performance Dashboard**
- Overview statistics (total tests, average response time, slow API count)
- Response time trend visualization
- Daily test summary charts
- API performance ranking table
- 7, 14, 30, 90-day analytics views

✅ **Slow API Detection**
- Configurable threshold (default: 2000ms)
- Visual indicators for slow responses
- Slow API listing and statistics
- Percentage-based slow API tracking

✅ **API Comparison**
- Compare performance across multiple runs
- Min/max/average response time analysis
- Success rate tracking

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object modeling
- **Axios** - HTTP client for API testing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Charting library
- **React-Chartjs-2** - React wrapper for Chart.js
- **Axios** - HTTP client

## 📁 Project Structure

```
api-performance-monitor/
├── backend/
│   ├── server.js                 # Express server setup
│   ├── package.json              # Backend dependencies
│   ├── .env.sample               # Environment variables template
│   ├── models/
│   │   └── TestResult.js        # MongoDB schema
│   ├── controllers/
│   │   └── apiController.js     # Business logic
│   └── routes/
│       └── apiRoutes.js         # API endpoints
│
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── App.jsx              # Main component
│   │   ├── App.css              # Styles
│   │   ├── index.js             # React entry point
│   │   ├── index.css            # Global styles
│   │   └── components/
│   │       ├── ApiTester.jsx    # API testing form
│   │       ├── Dashboard.jsx    # Performance dashboard
│   │       ├── History.jsx      # Test history table
│   │       └── PerformanceCharts.jsx  # Chart visualizations
│   ├── package.json             # Frontend dependencies
│   ├── .env.sample              # Environment variables template
│   └── tailwind.config.js       # Tailwind CSS config
│
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14 or higher
- **MongoDB** (local or Atlas)
- **npm** or **yarn** package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd api-performance-monitor/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.sample .env
   ```

4. **Configure `.env`:**
   ```env
   # MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017/api-performance-monitor
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/api-performance-monitor

   PORT=5000
   NODE_ENV=development
   SLOW_API_THRESHOLD=2000
   ```

5. **Start MongoDB** (if running locally):
   ```bash
   # On Windows
   mongod

   # On macOS (with Homebrew)
   brew services start mongodb-community

   # On Linux
   sudo systemctl start mongod
   ```

6. **Start the backend server:**
   ```bash
   npm start
   # For development with auto-reload:
   npm run dev
   ```

   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd api-performance-monitor/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.sample .env
   ```

4. **Configure `.env`:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the development server:**
   ```bash
   npm start
   ```

   Frontend will open at `http://localhost:3000`

## 📡 API Endpoints

### Test Management

**POST** `/api/test`
- Test an API endpoint
- **Body:**
  ```json
  {
    "apiUrl": "https://api.example.com/endpoint",
    "httpMethod": "GET|POST|PUT|PATCH|DELETE",
    "headers": { "Content-Type": "application/json" },
    "body": { "key": "value" },
    "slowThreshold": 2000
  }
  ```

**GET** `/api/results`
- Fetch all test results
- **Query params:**
  - `apiUrl` - Filter by API URL
  - `sortBy` - Field to sort by (timestamp, responseTime, responseStatus)
  - `order` - desc or asc
  - `limit` - Number of results (default: 100)

**GET** `/api/results/:apiUrl`
- Fetch results for a specific API
- Returns statistics and recent results

**GET** `/api/slow-apis`
- List all slow APIs detected
- Returns APIs sorted by response time descending

**GET** `/api/dashboard/data`
- Get comprehensive dashboard data
- **Query params:**
  - `days` - Time range (7, 14, 30, 90)

**POST** `/api/compare`
- Compare performance of multiple APIs
- **Body:**
  ```json
  {
    "apiUrls": [
      "https://api1.example.com",
      "https://api2.example.com"
    ]
  }
  ```

**POST** `/api/cleanup`
- Delete old test results
- **Body:**
  ```json
  {
    "days": 30
  }
  ```

**GET** `/health`
- Server health check

## 🎯 Usage Guide

### 1. Testing an API

1. Go to **🧪 API Tester** tab
2. Enter API URL (e.g., `https://api.github.com/users/github`)
3. Select HTTP method
4. (Optional) Add headers as JSON
5. (Optional for POST/PUT) Add request body
6. Set slow threshold if needed
7. Click **Test API**
8. View response status, time, and data

### 2. Viewing Dashboard

1. Go to **📊 Dashboard** tab
2. Select time range (7, 14, 30, or 90 days)
3. View:
   - Total tests performed
   - Average response time
   - Number and percentage of slow APIs
   - Response time trends chart
   - Daily test summary
   - API performance ranking

### 3. Reviewing Test History

1. Go to **📜 History** tab
2. (Optional) Filter by API URL
3. Sort by timestamp, response time, or status code
4. View detailed information for each test result
5. Identify fast/slow APIs with visual indicators

## 📊 Database Schema

### TestResult Collection

```javascript
{
  _id: ObjectId,
  apiUrl: String,                    // URL tested
  httpMethod: String,                // GET, POST, PUT, PATCH, DELETE
  requestHeaders: Object,            // Headers sent
  requestBody: Object,               // Request body (if applicable)
  responseStatus: Number,            // HTTP status code
  responseData: Object,              // Response data
  responseTime: Number,              // Time in milliseconds
  isSlowAPI: Boolean,                // Marked as slow?
  slowThreshold: Number,             // Threshold used (ms)
  timestamp: Date,                   // When test was performed
  createdAt: Date,                   // Document creation time
  updatedAt: Date                    // Last update time
}
```

## ⚙️ Configuration

### Environment Variables

**Backend (.env)**
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `SLOW_API_THRESHOLD` - Default slow threshold in ms (default: 2000)

**Frontend (.env)**
- `REACT_APP_API_URL` - Backend API URL

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: MongoDB connection failed
```
**Solution:**
- Ensure MongoDB is running
- Check connection string in `.env`
- For MongoDB Atlas, verify IP whitelist includes your IP

### CORS Error
```
Access to XMLHttpRequest blocked by CORS
```
**Solution:**
- Backend CORS is pre-configured for localhost:3000
- Update server.js if frontend runs on different port

### API Testing Fails
```
Error testing API
```
**Solutions:**
- Verify API URL is correct
- Check API is accessible from your network
- Validate JSON in headers and body
- Check request timeout (30s default)

### Empty Dashboard
```
No data available
```
**Solution:**
- Run some API tests first via API Tester tab
- Wait a moment for data to load
- Check browser console for errors

## 📈 Performance Tips

1. **Index Optimization** - Database queries are indexed on `apiUrl`, `timestamp`, and `responseTime`
2. **Data Cleanup** - Use cleanup endpoint to archive old results
3. **Query Limits** - History defaults to last 100 results
4. **Browser Cache** - Clear cache if data seems stale

## 🔄 Typical Workflow

1. **Morning:** Check Dashboard to review API health overnight
2. **During Day:** Use API Tester to test new endpoints
3. **Issue Tracking:** Review slow APIs in Dashboard
4. **Analysis:** Compare API performance in History
5. **Reporting:** Export dashboard views for stakeholders

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=your-mongodb-uri
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
cd frontend
npm run build
vercel
```

## 📝 Example API Tests

### GitHub Users API
- URL: `https://api.github.com/users/github`
- Method: GET
- Expected: 200 status, fast response

### JSONPlaceholder API
- URL: `https://jsonplaceholder.typicode.com/posts`
- Method: GET
- Expected: 200 status, array of posts

### Create Post
- URL: `https://jsonplaceholder.typicode.com/posts`
- Method: POST
- Body: `{"title": "test", "body": "test", "userId": 1}`

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review API endpoints documentation
3. Check browser console for errors
4. Verify all environment variables are set correctly

---

**Happy API Testing!** 🎉

Made with ❤️ for API developers and DevOps engineers.
