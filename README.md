# Amazing Ads Website

Fullstack architecture setup with Frontend in `src/` and Backend in `server/`.

## Folder Structure

```
amazingads-website/
├── src/                # Frontend (React 19 + TypeScript + Vite)
│   ├── assets/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── server/             # Backend (Node.js + Express)
│   ├── routes/
│   │   └── api.js      # API routes (/api/health, /api/ads, etc.)
│   ├── .env            # Backend environment variables (PORT=5000)
│   ├── .env.example
│   └── index.js        # Express server entry point
├── vite.config.ts      # Vite config with proxy to backend
├── package.json        # Unified scripts
└── tsconfig.json
```

## Ports

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## How to Run

### 1. Run Both Frontend and Backend together (Concurrent)
```bash
npm run dev
```

### 2. Run Only Frontend (Port 5173)
```bash
npm run dev:client
# or
npm run client
```

### 3. Run Only Backend (Port 5000)
```bash
npm run dev:server
# or (without nodemon)
npm run server
```

### 4. Build Frontend for Production
```bash
npm run build
```
