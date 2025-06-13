# 🐍 Snake & Ladder MERN Stack Project Report

---

## ✨ Project Purpose

This project was created as a **learning journey to master Full Stack Development using the MERN stack (MongoDB, Express.js, React.js, Node.js)**. The idea was to implement a classic multiplayer board game in a real-time web application format using the latest web development technologies.

> “Learn by building” — this project was my approach to cement MERN stack skills via a fun and challenging game!
> 

---

## 🔗 Deployment & Source Code Links

- **Live Website**: [https://snakeandladder.pages.dev](https://snakeandladder.pages.dev/)
- **GitHub Repository**: [https://github.com/RohitHuge/SnakeAndLadder.git](https://github.com/RohitHuge/SnakeAndLadder.git)

---

## [🎮](https://github.com/RohitHuge/SnakeAndLadder.git%F0%9F%8E%AE) Features Implemented

### ✅ Core Features

- **Two-Player Multiplayer Game**: Real-time gameplay with turn-based mechanics.
- **Room System**: Create and join game rooms with a unique code.
- **Dice Roll Simulation**: Visual dice rolling and automated movement.
- **Snake & Ladder Logic**: Automatic player repositioning when landing on a snake or ladder.
- **Winner Detection**: Game ends when a player reaches 100.

### 👥 User System

- JWT-based Authentication.
- Signup/Login and Session Handling.
- Profile Avatar and Display.


## ⚠️ Challenges Faced

### 1. **Socket.IO Integration**

- 😓 Real-time data handling was new to me.
- ✉️ Solved using ChatGPT, YouTube guides, and Socket.IO official docs.

### 2. **Cookie Handling in Production**

- ❌ Faced CORS and third-party cookie restrictions during deployment.
- ✔️ Resolved using `sameSite`, `secure` flags and ChatGPT help.

---

## 🧰 How AI Tools Boosted My Productivity

- **Ready UI**: Used AI-generated UI components to save time designing screens.
- **Cursor IDE**: Autocompletion, refactoring, and error spotting were much faster.
- **ChatGPT**: Explained unknown JS/React methods and debugged complex errors.

---

## 🎮 Learning Path for MERN

- Learned from **YouTube (Free Resources)**:
    - React: *Hitesh Choudhary* React Series*
    - Backend: *Hitesh Choudhary* Backend Series*
- Practiced by **building real-time games** like this one.

---

## 🚀 Deployment

- **Frontend**: Deployed on **Cloudflare Pages** for faster page load speed and CDN delivery.
- **Backend**: Deployed on **Render.com** to support Socket.IO (not supported on Cloudflare Workers).

> Full hosting on Render was avoided as it spins down inactive services. Cloudflare + Render was optimal.
> 
- **UptimeRobot**: Configured to ping Render backend and keep it awake, with uptime monitoring added.

---

## 🚫 Known Issues (as of now)

- ❌ Websockets sometimes disconnect mid-game.
- ❌ No auto-login: user has to re-login every time.
- ❌ Not working properly in incognito/iPhone due to cookie restrictions.
- ❌ Game UI on mobile is **not responsive**; the dice roll button goes off-screen.

> Fixing mobile UI by 15 July 2025. A new specialized mobile-only board UI is under development.
> 

---

## 🌟 Planned Features

- 🔹 **Leaderboard**: Track wins/losses per user.
- 🎭 **Animations**: Visual movement of player icons and dice rolls.
- 🌐 **Mobile First UI**: Better touch and layout experience.

---

## 📊 Summary

This project helped me master:

- Real-time communication using WebSockets.
- Authentication with JWT.
- MERN Stack project structure and full-stack development.
- Using AI tools to boost productivity and accelerate learning.

> I now understand how to convert real-world ideas into full-stack applications using modern web technologies!
> 

---

## **Developed By - Rohit H.**

LinkedIn :- http://www.linkedin.com/in/rohit-huge-03705832b
