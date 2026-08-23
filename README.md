<div align="center">

# 🎉 React Events

A modern, full-stack event management application where users can browse, search, create, edit, and delete events. Built with **React 19**, **Vite**, **React Router v6**, and **TanStack Query** on the frontend, powered by a lightweight **Express.js** REST API on the backend.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.15-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

[Live Demo](#-live-demo) · [Report Bug](https://github.com/your-username/react-events/issues) · [Request Feature](https://github.com/your-username/react-events/issues)

</div>

---

## 📑 Table of Contents

- [✨ Overview](#-overview)
- [🚀 Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🏗️ Architecture & Project Structure](#-architecture--project-structure)
- [🔐 Environment Variables](#-environment-variables)
- [⚡ Getting Started](#-getting-started)
- [📡 API Endpoints](#-api-endpoints)
- [🌐 Live Demo](#-live-demo)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Overview

**React Events** is a single-page application (SPA) that demonstrates modern React patterns for building data-driven UIs. It pairs a sleek React client with a minimal Node/Express backend to deliver a full CRUD experience for managing community events — including title, description, date, time, location, and image.

The project is an excellent reference implementation for:

- **TanStack Query** caching, optimistic UI, and request invalidation
- **React Router v6** data routers with `loader` / `action` functions
- **Form-driven** mutations using the platform's native `FormData`
- A clean separation between **client** and **server** workspaces

---

## 🚀 Key Features

| Feature | Description |
| --- | --- |
| 📃 **Browse Events** | View a paginated list of upcoming events with images and metadata. |
| 🔎 **Search Events** | Server-side text search across title, description, and location. |
| ➕ **Create Events** | Compose new events with a validated form (title, date, time, location, image). |
| ✏️ **Edit Events** | Update existing events via a reusable form with prefilled values. |
| 🗑️ **Delete Events** | Remove events with confirmation and instant cache invalidation. |
| 🖼️ **Image Picker** | Browse a curated set of selectable images for each event. |
| ⚡ **Optimistic Caching** | Smart query caching with TanStack Query + global loading indicator. |
| 🧭 **Nested Routing** | Route-level data loaders and actions powered by React Router v6.4+. |
| 📱 **Responsive UI** | Mobile-friendly layout with custom CSS (`index.css`). |
| 🌐 **CORS-enabled API** | Express backend configured to accept cross-origin requests. |

---

## 🛠️ Tech Stack

### Frontend (Client)
- **[React 19](https://react.dev/)** — UI library
- **[Vite 4](https://vitejs.dev/)** — Build tool & dev server with HMR
- **[React Router DOM v6.15](https://reactrouter.com/)** — Client-side routing with data routers
- **[TanStack Query v5](https://tanstack.com/query)** — Server-state management, caching, mutations
- **Vanilla CSS** — Styling via `src/index.css`

### Backend (Server)
- **[Node.js](https://nodejs.org/)** — JavaScript runtime
- **[Express 4.18](https://expressjs.com/)** — Minimal web framework
- **[body-parser](https://www.npmjs.com/package/body-parser)** — JSON request parsing
- **File-based JSON store** — Events and images persisted in `backend/data/*.json`

### Tools & Tooling
- **ESLint** — Linting (`@vitejs/plugin-react`)
- **npm** — Package manager
- **Nodemon-friendly** — Restart server with `node app.js` (or `nodemon app.js`)

---

## 🏗️ Architecture & Project Structure

The repository is split into two workspaces: a **client** (root, Vite/React) and a **backend** (Express).

```text
01-starting-project/
├── backend/                        # Express REST API
│   ├── app.js                      # Server entry, route definitions
│   ├── data/
│   │   ├── events.json             # Events store (JSON file)
│   │   └── images.json             # Image picker assets
│   ├── public/                     # Static assets served by Express
│   └── package.json
│
├── public/                         # Static files served by Vite
├── src/                            # React client source
│   ├── App.jsx                     # Router + QueryClient providers
│   ├── main.jsx                    # ReactDOM root
│   ├── index.css                   # Global styles
│   ├── assets/                     # Images, fonts, icons
│   ├── util/
│   │   └── http.js                 # fetchEvents / fetchEvent / createNewEvent / updateEvent / deleteEvent / fetchSelectableImages + queryClient
│   └── components/
│       ├── Header.jsx              # Global header with isFetching progress bar
│       ├── ImagePicker.jsx
│       ├── Events/
│       │   ├── Events.jsx          # List view (parent route)
│       │   ├── EventItem.jsx
│       │   ├── EventDetails.jsx    # Single-event detail view
│       │   ├── EventForm.jsx       # Reusable create/edit form
│       │   ├── NewEvent.jsx        # Modal for creating events
│       │   ├── EditEvent.jsx       # Modal for editing events (loader + action)
│       │   ├── FindEventSection.jsx
│       │   ├── NewEventsSection.jsx
│       │   └── EventsIntroSection.jsx
│       └── UI/                     # Shared UI primitives
│           ├── Modal.jsx
│           ├── ErrorBlock.jsx
│           └── LoadingIndicator.jsx
│
├── index.html                      # Vite HTML entry
├── vite.config.js                  # Vite configuration
├── package.json                    # Client deps & scripts
└── README.md
```

### Data Flow

1. **Routing** — `App.jsx` configures a `createBrowserRouter` with `/events`, `/events/new`, `/events/:id`, and `/events/:id/edit`.
2. **Fetching** — Components consume server data through TanStack Query (`useQuery`) using helper functions in `src/util/http.js`.
3. **Mutations** — Forms are submitted via React Router's `useSubmit` + `action`, which calls `updateEvent` / `createNewEvent` and triggers `queryClient.invalidateQueries`.
4. **Storage** — Express reads/writes JSON files under `backend/data/` for events and images.

---

## 🔐 Environment Variables

This project does **not** currently use any external secrets, API keys, or third-party integrations (no auth, no Stripe, no external DB). The base API URL is currently hardcoded in `src/util/http.js` (`http://localhost:3000`).

If you want to make it configurable (recommended before deployment), create a `.env` file in the project root (or in `backend/`) using the placeholders below:

### Client `.env` (root)

```env
# Base URL for the Express API
VITE_API_BASE_URL=http://localhost:3000
```

> 💡 Variables must be prefixed with `VITE_` to be exposed to the client. Then update `src/util/http.js` to use `import.meta.env.VITE_API_BASE_URL`.

### Backend `.env` (optional)

```env
# Port the Express server listens on
PORT=3000

# CORS allowed origin (defaults to "*" in development)
CORS_ORIGIN=*
```

> ⚠️ **Never commit real secrets.** The values above are placeholders only.

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or pnpm / yarn)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/react-events.git
cd react-events/01-starting-project
```

### 2️⃣ Install dependencies

The project has **two** `package.json` files — install both:

```bash
# Install client (root) dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3️⃣ Run the backend (Terminal 1)

```bash
cd backend
npm start
# → Server running on port 3000
```

### 4️⃣ Run the frontend (Terminal 2)

```bash
# From the project root
npm run dev
# → Vite dev server: http://localhost:5173
```

Open 👉 **http://localhost:5173** in your browser. The app will fetch data from `http://localhost:3000`.

### 🏗️ Production build

```bash
# Build the React client
npm run build

# Preview the production build locally
npm run preview
```

### 🧹 Linting

```bash
npm run lint
```

---

## 📡 API Endpoints

All endpoints are served by the Express backend (default: `http://localhost:3000`).

| Method | Endpoint             | Description                                  | Request Body / Query                                |
| ------ | -------------------- | -------------------------------------------- | --------------------------------------------------- |
| `GET`  | `/events`            | List events (optional search + max)          | `?search=<text>&max=<number>`                       |
| `GET`  | `/events/images`     | List selectable images for the image picker  | —                                                   |
| `GET`  | `/events/:id`        | Fetch a single event by ID                   | —                                                   |
| `POST` | `/events`            | Create a new event                           | `{ event: { title, description, date, time, image, location } }` |
| `PUT`  | `/events/:id`        | Update an existing event                     | `{ event: { ... } }`                                |
| `DELETE` | `/events/:id`      | Delete an event by ID                        | —                                                   |

### Example requests

```bash
# List the 5 latest events
curl http://localhost:3000/events?max=5

# Search events by keyword
curl "http://localhost:3000/events?search=conference"

# Create a new event
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "event": {
      "title": "React Conf 2026",
      "description": "Annual React conference",
      "date": "2026-10-12",
      "time": "09:00",
      "image": "https://example.com/img.png",
      "location": "San Francisco, CA"
    }
  }'
```

---

## 🌐 Live Demo

A live deployment will be available soon:

🔗 **[https://react-events.vercel.app](https://react-events.vercel.app)** _(placeholder)_

> Frontend: deploy via [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) · Backend: deploy via [Render](https://render.com/) or [Railway](https://railway.app/).

---

## 🤝 Contributing

Contributions are welcome! 🙌

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m "feat: add amazing feature"`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

Please make sure your code passes `npm run lint` before submitting.

---

## 📄 License

This project is licensed under the **ISC License** — see the original author attribution in `backend/package.json` (Maximilian Schwarzmüller / Academind GmbH).

---

<div align="center">

Made with ❤️ using React, Vite & Express.

⭐ Star this repo if it helped you learn TanStack Query!

</div>
