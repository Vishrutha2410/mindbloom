<div align="center">

<img src="https://img.shields.io/badge/MindBloom-🌸-green?style=for-the-badge" />

# 🌸 MindBloom
### *Mental Wellness & Stress Relief Platform*

> **"Relax, Refresh, and Let Your Mind Bloom."**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-4CAF50?style=for-the-badge)](https://your-app.vercel.app)
[![Backend](https://img.shields.io/badge/🔧_Backend-Render-6C63FF?style=for-the-badge)](https://your-backend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Vishrutha2410-181717?style=for-the-badge&logo=github)](https://github.com/Vishrutha2410/mindbloom)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)

</div>

---

## 📖 About

**MindBloom** is a full-stack mental wellness web application designed to help people of all ages manage stress, track moods, and improve their mental health through interactive activities. The platform personalises content based on the user's age group — Kids, Teens, Young Adults, and Adults.

---

## ✨ Features

### 🔐 Authentication
- JWT-based secure login & registration
- **Google OAuth** — Sign in with Google (one click)
- Persistent sessions with token refresh
- Profile picture upload via **Cloudinary** (permanent cloud storage)

### 😊 Mood Tracking
- Log daily mood from 6 options (Happy, Calm, Sad, Angry, Stressed, Tired)
- Add personal notes to each mood entry
- Weekly mood chart powered by **Chart.js**
- Full mood history with timestamps

### 🎯 Age-Based Personalisation
| Age Group | Range | Content |
|---|---|---|
| 🧒 Kids | 8–12 | Simple games, fun stories, short breathing |
| 🎒 Teens | 13–18 | Reaction games, exam tips, stress relief |
| 🙋 Young Adults | 19–30 | Logic puzzles, productivity tips, deep meditation |
| 🧑 Adults | 30+ | Word games, relaxation, work-life balance |

### 🎮 Games Zone
- 🫧 Bubble Pop — pop bubbles to release tension
- 🃏 Memory Card Game — flip and match pairs
- 🌈 Color Match — match colors and patterns
- 🧩 Puzzle Slider — rearrange tiles
- ⚡ Reaction Speed Test — test your reflexes *(Teens/Young Adults)*
- ⌨️ Typing Speed Challenge — race against the clock *(Teens/Young Adults)*
- 📝 Word Puzzle — unscramble wellness words *(Adults/Young Adults)*

### 🧘 Meditation Zone
- Box Breathing (4-4-4-4)
- 4-7-8 Breathing technique
- Calm Breathing (5-5)
- Animated breathing circle with phase indicators
- Age-specific sessions (1-min kids / 10-min adults)

### 📚 Reading Zone
- Motivational short stories
- Mindfulness tips and techniques
- Age-appropriate content (affirmations for kids, career tips for young adults)
- Expandable accordion-style reading cards

### 🎨 Drawing Board
- Freehand canvas drawing
- Pencil, brush, and eraser tools
- Color picker
- Save drawing as PNG

### 📊 Dashboard
- Personalised greeting with clickable name → Profile
- Day Streak counter 🔥
- Mood Logs count
- Weekly mood line chart
- Recent mood history
- Quick access shortcuts
- Age Zone banner

### 👤 Profile Page
- Edit name, age, bio, phone, location, occupation
- Profile picture upload (stored on Cloudinary)
- Change password
- Stats tab: streak, mood logs, badges
- Account info: member since, age zone, sign-in method

### 🏅 Badge System
| Badge | How to Earn |
|---|---|
| 🌱 First Mood Log | Log your first mood |
| 📅 7 Moods Logged | Log 7 moods total |
| 🌟 30 Moods Logged | Log 30 moods total |
| 💯 100 Moods Logged | Log 100 moods total |
| 🔥 7-Day Streak | Login 7 days in a row |
| 🏆 30-Day Streak | Login 30 days in a row |

### 🌙 UI/UX
- Dark mode toggle
- Fully mobile responsive
- Smooth fade-in animations
- Breathing circle animations
- Emergency mental health support links

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Chart.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose) |
| **Auth** | JWT + bcryptjs + Google OAuth 2.0 |
| **File Storage** | Cloudinary |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure
```
mindbloom/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── moodController.js
│   │   └── activityController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Mood.js
│   │   └── Activity.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── moodRoutes.js
│   │   └── activityRoutes.js
│   ├── seed.js
│   ├── server.js
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── MoodSelector.jsx
    │   │   ├── ActivityCard.jsx
    │   │   ├── QuoteBox.jsx
    │   │   ├── AgeZoneBanner.jsx
    │   │   └── GoogleLoginButton.jsx
    │   ├── games/
    │   │   ├── BubblePop.jsx
    │   │   ├── MemoryGame.jsx
    │   │   ├── PuzzleGame.jsx
    │   │   ├── ColorMatch.jsx
    │   │   ├── ReactionGame.jsx
    │   │   ├── TypingGame.jsx
    │   │   └── WordPuzzle.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── MoodTracker.jsx
    │   │   ├── Games.jsx
    │   │   ├── DrawingBoard.jsx
    │   │   ├── ReadingZone.jsx
    │   │   ├── Meditation.jsx
    │   │   └── Profile.jsx
    │   ├── utils/
    │   │   ├── api.js
    │   │   └── ageGroup.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── vercel.json
    ├── index.html
    └── vite.config.js
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+ → https://nodejs.org
- MongoDB Atlas account (free) → https://mongodb.com/atlas
- Cloudinary account (free) → https://cloudinary.com
- Google Cloud Console project → https://console.cloud.google.com

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Vishrutha2410/mindbloom.git
cd mindbloom
```

### 2️⃣ Backend setup
```bash
cd backend
cp .env.example .env
# Fill in your .env values (see below)
npm install
npm run dev
```

### 3️⃣ Frontend setup
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** 🚀

---

## 🔑 Environment Variables

### `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/mindbloom
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/google` | Google OAuth login | ❌ |
| GET | `/api/auth/profile` | Get user profile | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |
| POST | `/api/auth/avatar` | Upload profile picture | ✅ |

### Mood
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/mood` | Log today's mood | ✅ |
| GET | `/api/mood/history` | Get last 30 mood logs | ✅ |
| GET | `/api/mood/weekly` | Get last 7 days | ✅ |

### Activities
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/activities` | Get all activities | ✅ |
| GET | `/api/activities/mood/:mood` | Get by mood + age group | ✅ |
| GET | `/api/activities/age-group` | Get by age group | ✅ |

---

## 🚀 Deployment

### Frontend → Vercel
```bash
cd frontend && npm run build
```
Set env var in Vercel dashboard:
```
VITE_API_URL = https://your-backend.onrender.com
VITE_GOOGLE_CLIENT_ID = your_google_client_id
```

### Backend → Render
Set env vars in Render dashboard:
```
MONGO_URI, JWT_SECRET, NODE_ENV=production,
FRONTEND_URL, GOOGLE_CLIENT_ID,
CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
```

---

## 🗺️ Roadmap — Coming Soon

- [ ] 🔔 Push notifications for daily mood reminders
- [ ] 📓 Personal journal / diary feature
- [ ] 🎵 Background calm music player
- [ ] 👥 Community support forum
- [ ] 📱 PWA — installable as a mobile app
- [ ] 🤖 AI mood insights and suggestions
- [ ] 📤 Export mood data as PDF report
- [ ] 🌍 Multi-language support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">

Built with 💚 by [Vishrutha](https://github.com/Vishrutha2410) using the MERN stack

⭐ Star this repo if you found it helpful!

</div>