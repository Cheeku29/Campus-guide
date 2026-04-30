<div align="center">

<br/>

```
 ██████╗ █████╗ ███╗   ███╗██████╗ ██╗   ██╗███████╗
██╔════╝██╔══██╗████╗ ████║██╔══██╗██║   ██║██╔════╝
██║     ███████║██╔████╔██║██████╔╝██║   ██║███████╗
██║     ██╔══██║██║╚██╔╝██║██╔═══╝ ██║   ██║╚════██║
╚██████╗██║  ██║██║ ╚═╝ ██║██║     ╚██████╔╝███████║
 ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝
                         G U I D E
```

**Your intelligent full-stack campus companion.**  
Navigating university life, one query at a time.

<br/>

![JavaScript](https://img.shields.io/badge/JavaScript-93.4%25-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-6.0%25-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-0.6%25-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

<br/>

[📖 Overview](#-overview) • [✨ Features](#-features) • [🏗️ Architecture](#️-architecture) • [⚙️ Setup](#️-getting-started) • [🗂️ Structure](#️-project-structure) • [🤝 Contributing](#-contributing)

<br/>

---

</div>

<br/>

## 📖 Overview

**Campus Guide** is a modern, full-stack web application designed to serve as the central digital companion for students navigating campus life. Whether it's finding facilities, accessing academic resources, or getting real-time campus information — Campus Guide brings it all together in a clean, intuitive interface.

Built with a clean **monorepo architecture**, the project separates concerns across a dedicated `frontend/` and `backend/`, making it scalable, maintainable, and easy to contribute to.

> *"Every student deserves a guide. This is yours."*

<br/>

---

## ✨ Features

- 🗺️ **Campus Navigation** — Explore and locate campus facilities, buildings, and points of interest with ease.
- 🔍 **Smart Search** — Quickly find what you need with a responsive, intuitive search experience.
- 🌐 **Full-Stack Architecture** — Decoupled frontend and backend communicating via RESTful APIs.
- 📱 **Responsive Design** — Optimized for desktops, tablets, and mobile devices.
- 🔐 **Environment-Based Configuration** — Secure, environment-variable-driven setup for seamless deployment.
- ⚡ **JavaScript-First** — Entirely JavaScript-powered stack for a consistent developer experience across the board.

<br/>

---

## 🏗️ Architecture

Campus Guide follows a clean **client-server separation** within a monorepo:

```
┌─────────────────────────────────────────────────┐
│                   Campus Guide                  │
│                                                 │
│   ┌───────────────┐     ┌───────────────────┐   │
│   │   Frontend    │────▶│      Backend      │   │
│   │               │     │                   │   │
│   │  HTML / CSS   │     │   Node.js / JS    │   │
│   │  JavaScript   │◀────│   REST API        │   │
│   │               │     │                   │   │
│   └───────────────┘     └───────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

- **Frontend** — Handles all UI rendering, user interactions, and API communication.
- **Backend** — Manages application logic, data handling, and API responses.
- **Communication** — REST API over HTTP/HTTPS.

<br/>

---

## 🗂️ Project Structure

```
Campus-guide/
│
├── frontend/                   # Client-side application
│   ├── index.html              # Application entry point
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page-level views
│   │   ├── styles/             # CSS stylesheets
│   │   └── utils/              # Helper functions
│   └── package.json            # Frontend dependencies
│
├── backend/                    # Server-side application
│   ├── server.js               # Main server entry point
│   ├── routes/                 # API route definitions
│   ├── controllers/            # Business logic handlers
│   ├── models/                 # Data models/schemas
│   └── package.json            # Backend dependencies
│
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

> ℹ️ The exact structure inside `frontend/` and `backend/` may evolve as the project grows.

<br/>

---

## ⚙️ Getting Started

Follow the steps below to get Campus Guide running on your local machine.

### Prerequisites

Ensure the following are installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | `v18+` | [nodejs.org](https://nodejs.org) |
| npm | `v9+` | Bundled with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com) |

<br/>

### 1. Clone the Repository

```bash
git clone https://github.com/Cheeku29/Campus-guide.git
cd Campus-guide
```

<br/>

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory and add your environment variables:

```env
# backend/.env

PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key

# Add any other environment-specific variables here
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

Start the backend server:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will be live at: `http://localhost:5000`

<br/>

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

If required, create a `.env` file in the `frontend/` directory:

```env
# frontend/.env

REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

The frontend will be available at: `http://localhost:3000`

<br/>

---

## 🧪 Running Tests

If test suites are configured:

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

<br/>

---

## 🚀 Deployment

### Backend Deployment

The backend can be deployed on any Node.js-compatible hosting service:

- [Render](https://render.com)
- [Railway](https://railway.app)
- [Heroku](https://heroku.com)
- [Vercel Serverless Functions](https://vercel.com)

### Frontend Deployment

The frontend can be deployed on:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)

> 🔑 Remember to configure your environment variables on your hosting platform's dashboard before deploying.

<br/>

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Language | JavaScript (ES6+) |
| Frontend Markup | HTML5 |
| Frontend Styling | CSS3 |
| Backend Runtime | Node.js |
| Backend Language | JavaScript |
| API Style | RESTful |
| Package Manager | npm |
| Version Control | Git + GitHub |

<br/>

---

## 🤝 Contributing

Contributions are what make open source thrive. If you'd like to improve Campus Guide:

1. **Fork** this repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request on GitHub

Please make sure your code is clean, well-commented, and tested before submitting a PR.

<br/>

---

## 📋 Roadmap

- [ ] Interactive campus map integration
- [ ] User authentication & profiles
- [ ] Event calendar & announcements
- [ ] Real-time notifications
- [ ] Mobile app (React Native)
- [ ] Admin dashboard for campus staff

<br/>

---

## 🔒 Security

- Sensitive data is managed via `.env` files — never hardcode credentials.
- `.gitignore` is configured to exclude `node_modules/`, `.env`, and `.DS_Store`.
- Please report any security vulnerabilities directly to the maintainer.

<br/>

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

You are free to use, modify, and distribute this software with attribution.

<br/>

<br/>

---

## 📄 Videos

Frontend Video Description : (https://drive.google.com/file/d/1ROdIDwpsO1ZDsraoCDbzXzlAfN2zsI9_/view?usp=sharing)
Backend Video Description : (https://drive.google.com/file/d/1bPsfquh7T_HPct0bfSdRBrS-4imj_w9z/view?usp=sharing)
Project Demo : (https://drive.google.com/file/d/1KCVCzxS6Wll3BnRn3J3lMfg_tAWXyOY8/view?usp=sharing)

<br/>

---

## 👤 Authors

<div align="center">

**Arindam Gupta**  
GitHub: [@Cheeku29](https://github.com/Cheeku29)

**Hariharan Kalyana Sundaram**  
GitHub: [@Cheeku29](https://github.com/Hariharan2006K)

<br/>

*Built with ❤️ for campus communities everywhere.*

<br/>

---

⭐ If you found this project helpful, please consider giving it a star on [GitHub](https://github.com/Cheeku29/Campus-guide)!

</div>
