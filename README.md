# 🌸 MindBloom – Mental Wellness & Stress Relief Platform

> *"Relax, Refresh, and Let Your Mind Bloom."*

MindBloom is a full-stack MERN web application that helps people manage stress through mood tracking, relaxing games, guided breathing, creative drawing, motivational reading, and personalised activity suggestions.

---

## 🚀 Tech Stack

| Layer     | Technology                              |
|-----------|----------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS, Chart.js |
| Backend   | Node.js, Express.js                    |
| Database  | MongoDB (Atlas or local)               |
| Auth      | JWT (JSON Web Tokens) + bcryptjs       |
| Deploy    | Vercel (frontend) / Render (backend)   |

---

## 📁 Project Structure

```
mindbloom/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── moodController.js
│   │   └── activityController.js
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Mood.js
│   │   └── Activity.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── moodRoutes.js
│   │   └── activityRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── MoodSelector.jsx
    │   │   ├── ActivityCard.jsx
    │   │   └── QuoteBox.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── MoodTracker.jsx
    │   │   ├── Games.jsx
    │   │   ├── DrawingBoard.jsx
    │   │   ├── ReadingZone.jsx
    │   │   └── Meditation.jsx
    │   ├── games/
    │   │   ├── BubblePop.jsx
    │   │   ├── MemoryGame.jsx
    │   │   ├── PuzzleGame.jsx
    │   │   └── ColorMatch.jsx
    │   ├── utils/api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## ⚙️ Step-by-Step Setup Guide

### Prerequisites
- Node.js v18+ installed → https://nodejs.org
- MongoDB Atlas account (free) → https://mongodb.com/atlas
- Git installed

---

### Step 1 – Clone / Extract the Project

If you have the zip file:
```bash
unzip mindbloom.zip
cd mindbloom
```

---

### Step 2 – Set Up MongoDB Atlas

1. Go to https://mongodb.com/atlas and sign up (free)
2. Create a new **free cluster** (M0)
3. Under **Database Access** → Add a new database user with username and password
4. Under **Network Access** → Add IP Address → Allow from anywhere (0.0.0.0/0)
5. Click **Connect** → **Drivers** → Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`
   - Replace `<password>` with your actual password

---

### Step 3 – Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
MONGO_URI=mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/mindbloom
JWT_SECRET=any_long_random_string_here
NODE_ENV=development
```

---

### Step 4 – Install Backend Dependencies

```bash
# Inside /backend folder
npm install
```

---

### Step 5 – Start the Backend Server

```bash
npm run dev
```

You should see:
```
🌸 Server running on port 5000
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

---

### Step 6 – Install Frontend Dependencies

Open a **new terminal window**:

```bash
cd ../frontend
npm install
```

---

### Step 7 – Start the Frontend

```bash
npm run dev
```

You should see:
```
  VITE v5.x  ready in 300ms
  ➜  Local:   http://localhost:5173/
```

Open your browser at **http://localhost:5173**

---

### Step 8 – Test the App

1. Go to **http://localhost:5173**
2. Click **Sign Up** and create an account
3. Log your mood on the Mood Tracker page
4. Explore Games, Drawing Board, Reading Zone, and Meditation
5. View your mood chart on the Dashboard

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint            | Description         | Auth |
|--------|---------------------|---------------------|------|
| POST   | /api/auth/register  | Register new user   | No   |
| POST   | /api/auth/login     | Login user          | No   |
| GET    | /api/auth/profile   | Get user profile    | Yes  |

### Mood
| Method | Endpoint            | Description              | Auth |
|--------|---------------------|--------------------------|------|
| POST   | /api/mood           | Log today's mood         | Yes  |
| GET    | /api/mood/history   | Get last 30 mood logs    | Yes  |
| GET    | /api/mood/weekly    | Get last 7 days of moods | Yes  |

### Activities
| Method | Endpoint                  | Description                  | Auth |
|--------|---------------------------|------------------------------|------|
| GET    | /api/activities           | Get all activities           | Yes  |
| GET    | /api/activities/mood/:mood| Get activities for a mood    | Yes  |

---

## 🚢 Deployment

### Deploy Frontend to Vercel
```bash
cd frontend
npm run build
# Upload /dist folder to Vercel, or connect GitHub repo
```
Set environment variable in Vercel:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Deploy Backend to Render
1. Push code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your GitHub repo
4. Set:
   - Build command: `npm install`
   - Start command: `node server.js`
   - Root directory: `backend`
5. Add environment variables (MONGO_URI, JWT_SECRET, PORT)

---

## ✨ Features Summary

- 🔐 User Authentication (JWT)
- 😊 Daily Mood Tracker with 6 moods
- 🤖 Smart Activity Recommendations based on mood
- 🎮 4 Relaxing Games (Bubble Pop, Memory, Puzzle, Color Match)
- 🎨 Canvas Drawing Board (pencil, brush, eraser, color picker)
- 📚 Reading Zone (stories, quotes, mindfulness articles)
- 🧘 3 Breathing/Meditation sessions with animations
- 📊 Weekly Mood Chart (Chart.js)
- 🔥 Login Streak System
- 🏅 Achievement Badges
- 💬 Positive Quote Generator
- 🌙 Dark Mode
- 📱 Mobile Responsive
- 🚨 Emergency Support Links

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

---

*Built with 💚 using the MERN stack*
