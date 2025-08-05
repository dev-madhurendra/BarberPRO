# 💈 Barber Token System

A full-stack **Barber Shop Token Management System** that allows customers to book digital tokens to avoid long wait times and barbers to manage queues efficiently.

---

## 🚀 Features

### 🧑‍💼 Customer
- Sign up/login via email/password or Google OAuth
- Book tokens for specific barbers
- View estimated wait time and position in queue
- Cancel or reschedule bookings

### 💇 Barber
- Sign up/login via email/password or Google OAuth
- Manage incoming tokens/appointments in real time
- Set available time slots and token limits
- Notify customers about availability or changes

### 🔐 Authentication
- OTP-based email verification
- JWT (access + refresh token) auth flow
- OAuth2 login with Google (with role selection)

---

## 🛠 Tech Stack

| Layer       | Technology                        |
|-------------|------------------------------------|
| Frontend    | React + Vite + TypeScript         |
| Styling     | Tailwind CSS + Styled Components  |
| Backend     | Spring Boot 3.x                   |
| Auth        | Spring Security, JWT, OAuth2, OTP |
| Database    | PostgreSQL                        |
| Email       | Gmail SMTP                        |
| DevOps      | GitHub Actions (CI)               |
| Deployment  | (Planned: Render / Railway / Vercel) |

---

## 📁 Folder Structure

```
barber-token-system/
├── backend/        # Spring Boot REST API
├── frontend/       # React App (Vite + TypeScript)
├── .github/        # GitHub workflows and templates
└── README.md
```

---

## 🧑‍💻 Getting Started

### 📦 Prerequisites

- Node.js `>=18.x`
- Java `>=17`
- PostgreSQL
- Gmail account for SMTP
- Git + Maven

---

### 🔧 Backend Setup

```bash
cd backend
cp src/main/resources/application.example.properties src/main/resources/application.properties
# ✅ Update DB credentials, SMTP, and Google OAuth config
./mvnw spring-boot:run
```

---

### 🌐 Frontend Setup

```bash
cd frontend
cp .env.example .env
# ✅ Update VITE_BACKEND_URL=http://localhost:8080
npm install
npm run dev
```

---

## ✅ CI/CD Pipeline

### 🧪 GitHub Actions Workflow

Runs on every push/PR to `main`:

- Lint + build Spring Boot backend
- Lint + build React frontend

> `.github/workflows/ci.yml`

```yaml
name: Simple CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-backend:
    name: 🚀 Build Spring Boot Backend
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '17'
      - run: |
          cd backend
          mvn clean install -DskipTests

  build-frontend:
    name: 🌐 Build React Frontend
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: |
          cd frontend
          npm install
          npm run build
```

---
## 🧪 Coverage Report

> Frontend:
> **https://sonarcloud.io/summary/overall?id=dev-madhurendra_barberpro-frontend&branch=main**

> Backend:
> **https://sonarcloud.io/summary/overall?id=dev-madhurendra_BarberPRO&branch=main**

## 📄 API Documentation

> Available at:  
> **http://localhost:8080/swagger-ui.html**

Includes:
- Auth APIs (login, signup, OTP, JWT)
- Role-based APIs for Barber & Customer
- Token booking, listing, queue management

---

## 🧪 Testing

- ✅ Manual testing via Postman
- ✅ OTP and auth flows tested
- 🧪 Unit & integration tests in progress

---

## 📸 Screenshots

_Add screenshots or screen recordings here_

```md
![Login Screen](screenshots/login.png)
![Customer Dashboard](screenshots/customer-dashboard.png)
![Barber Queue](screenshots/barber-queue.png)
```

---

## 📌 GitHub Project Standards

- [x] `.github/CODEOWNERS` for auto-reviewers
- [x] Pull Request Template
- [x] Issue Templates (bug + feature)
- [x] Linting via ESLint (frontend) and Checkstyle (backend)
- [x] Prettier formatting
- [x] `.editorconfig` for formatting consistency

---

## 🤝 Contributing

We welcome community contributions! Please follow these steps:

```bash
1. Fork the repo
2. Create a new branch: git checkout -b feature/your-feature-name
3. Commit your changes: git commit -m '✨ Add new feature'
4. Push the branch: git push origin feature/your-feature-name
5. Open a Pull Request
```

📄 See [`CONTRIBUTING.md`](CONTRIBUTING.md) for full details.

---

## 👥 CODEOWNERS

```
* @your-github-username
/backend/ @your-backend-username
/frontend/ @your-frontend-username
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌐 Live Demo

> Coming soon: [barber-token.vercel.app](https://barber-token.vercel.app)  
> (Will include deployed backend + frontend once CI/CD is complete)

---

## 🙌 Acknowledgements

- Spring Boot Docs
- React & Vite Ecosystem
- Open Source Tools & Libraries
- Contributors and Reviewers

---

## ✨ Author

Made with ❤️ by [Madhurendra Nath](https://github.com/dev-madhurendra)
