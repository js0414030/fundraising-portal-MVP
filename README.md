
# 🎯 Fundraising Intern Portal (MVP)

A basic full-stack fundraising dashboard built as part of an internship task. This project demonstrates **authentication (login/signup)**, **donation tracking**, **leaderboard ranking**, and a **dynamic chart to visualize donations**.

## 🚀 Features
- ✅ **Login & Signup** (Dummy user auth with MongoDB)
- ✅ **Dashboard** (Intern name, referral code, total donations)
- ✅ **Add Donations** (Updates dynamically in real-time on chart)
- ✅ **Leaderboard** (Ranks interns based on total donations)
- ✅ **Dark/Light Theme Toggle** (Applies across all pages)
- ✅ **Responsive UI** (Centered layouts with clean card-based design)
- ✅ **MongoDB Integration** (Data stored in MongoDB Atlas or local MongoDB)

## 🛠️ Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Atlas)
- **Charts:** Chart.js + react-chartjs-2

## 📂 Project Structure
```
fundraising-portal/
│
├── backend/             # Express API
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
│
├── frontend/            # React app
│   ├── src/components/  # Reusable UI components
│   ├── src/pages/       # Dashboard, Login, Signup, Leaderboard
│   └── src/context/     # Theme context (Dark/Light)
│
└── README.md
```

## ⚙️ Setup & Installation
1️⃣ **Clone the repository**
```bash
git clone <repo-url>
cd fundraising-portal
```

2️⃣ **Install dependencies**

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

3️⃣ **Environment Variables**

Create a `.env` file inside `backend/`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

4️⃣ **Run the project**

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run dev
```

## 🌐 Deployment
- **Backend:** Render
- **Frontend:** Vercel
- **Database:** MongoDB Atlas

## 🔮 Future Enhancements
- ✅ Real-time leaderboard updates with WebSockets
- ✅ Payment gateway integration (Stripe/Razorpay)
- ✅ Admin panel to manage interns and donations
- ✅ Email notifications for rewards

## 👨‍💻 Author
Developed as part of an **internship Round 1 Task**.
