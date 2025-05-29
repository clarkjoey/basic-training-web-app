# 🧪 Basic Training Web App

This project is a simple full-stack web app built with **React**, **Tailwind CSS**, and **Node.js/Express**. It is designed as a training demo to help users learn how to use [Replicate](https://docs.reprise.com/) effectively by simulating real-world interactions like logging in, navigating a dashboard, and chatting with a fake AI.

## 🛠 Features

- ✅ Hardcoded login system with token display
- 📊 Dashboard with dynamic table data
- 💬 AI Chat Page that fetches fake messages from an API
- 🎨 Tailwind CSS-powered layout with responsive styling
- 🧱 Simple backend API endpoints to simulate real app behavior

## 📁 Project Structure

```
basic-training-web-app/
├── backend/              # Node.js/Express API
│   ├── server.js
│   └── routes/
├── frontend/             # React + Tailwind CSS app
│   ├── src/
│   │   ├── App.js
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── AiChatPage.js
│   │   └── index.css
│   ├── public/
│   └── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### 1. Clone the repo

```bash
git clone https://github.com/clarkjoey/basic-training-web-app.git
cd basic-training-web-app
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Start the app

```bash
# In backend/
npm start

# In another terminal, start the frontend
cd frontend
npm start
```

Your app should now be running at:  
`http://localhost:3000`

## 🔐 Login Credentials

- **Username:** `admin`
- **Password:** `password`

Once logged in, a token will be displayed and navigation to Dashboard and AI Chat Page will become available.

## 🧪 API Endpoints (Backend)

| Method | Route              | Purpose                         |
|--------|--------------------|----------------------------------|
| POST   | `/api/auth`        | Authenticates the hardcoded user |
| GET    | `/api/dashboard`   | Returns simulated dashboard HTML |
| GET    | `/api/table-data`  | Returns a mock table dataset     |
| GET    | `/api/other-page`  | Returns AI chat page HTML        |
| GET    | `/api/chat-messages` | Returns dummy chat messages   |

## 🎨 Styling with Tailwind

This app uses **Tailwind CSS v4**. Styles are applied via utility classes.  
No custom CSS is needed unless extending Tailwind.

## 🤝 Contributing

This app is intended for internal demo/training use. PRs are welcome to improve the training experience.

---

## 📄 License

MIT – see `LICENSE` file (if needed).
