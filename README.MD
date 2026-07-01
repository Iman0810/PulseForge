# PulseForge ⚡

> 🚧 **Project Status:** Active Development

PulseForge is a lightweight, self-hosted system monitoring platform currently being developed using **Go**, **Spring Boot**, **React**, and **PostgreSQL**.

The goal of the project is to provide a simple yet extensible monitoring solution capable of collecting real-time system metrics from multiple devices, storing historical performance data, and presenting it through a modern web dashboard.

---

## Current Features

- Cross-platform monitoring agent written in Go
- Automatic agent registration
- CPU usage monitoring
- RAM usage monitoring
- Disk usage monitoring
- Heartbeat tracking
- Spring Boot REST API
- PostgreSQL database
- Historical metric storage
- React dashboard
- Live metric updates
- Historical charts for CPU, RAM, and Disk usage
- Docker support for PostgreSQL

---

## Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate

### Frontend
- React
- TypeScript
- Tailwind CSS
- Recharts
- Axios
- Vite

### Agent
- Go
- gopsutil

### Database
- PostgreSQL

### Development Tools
- Docker
- Git
- GitHub
- VS Code

---

## Project Structure

```
PulseForge/
│
├── agent/         Go monitoring agent
├── backend/       Spring Boot REST API
├── frontend/      React dashboard
└── README.md
```

---

## Architecture

```
Go Agent
    │
    ▼
Spring Boot REST API
    │
    ▼
PostgreSQL
    │
    ▼
React Dashboard
```

---

## Roadmap

### Completed

- [x] Monitoring agent
- [x] REST API
- [x] PostgreSQL integration
- [x] Historical metrics
- [x] Live dashboard
- [x] Historical charts

### In Progress

- [ ] Multi-device monitoring improvements
- [ ] Automatic offline detection
- [ ] Dashboard refinements

### Planned

- [ ] JWT authentication
- [ ] Role-based access
- [ ] WebSocket real-time updates
- [ ] Alert and notification system
- [ ] Docker Compose deployment
- [ ] Deployment guide
- [ ] Email notifications
- [ ] Device management
- [ ] Search and filtering

---

## Running the Project

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Agent

```bash
cd agent
go run .
```

---

## Notice

PulseForge is **currently under active development**.

Features, APIs, database schema, and the user interface may change as development progresses. The project is not yet considered production-ready.

Feedback, suggestions, and bug reports are always welcome.

---

## License

This project is licensed under the MIT License.