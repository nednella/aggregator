# DevDash — Developer Stats Dashboard

A coding challenge that tests async JavaScript, data transformation, error handling, and React fundamentals.

You'll build a **BFF (Backend-For-Frontend)** server that aggregates data from three mock services and serves it to an existing React dashboard.

## Architecture

```
┌──────────┐     ┌──────────┐     ┌──────────────────┐
│ Frontend │────▶│   BFF    │────▶│  Mock Services   │
│ :5173    │     │  :3000   │     │  :4000           │
│ (done)   │     │ (YOU!)   │     │  (done)          │
└──────────┘     └──────────┘     └──────────────────┘
```

**Frontend** — React + Vite + TypeScript dashboard. Already built. Fetches from `GET /api/dashboard/:username`.

**Mock services** — Three API endpoints simulating external services. Already built. Has intentional quirks (see below).

**BFF** — Express + TypeScript server. **This is what you build.** It sits between the frontend and mock services.

## Setup

```bash
npm run setup   # install deps in all packages
npm run dev     # start all three servers concurrently
```

Or start individually:

```bash
npm run dev:mock      # mock services on :4000
npm run dev:bff       # BFF on :3000
npm run dev:frontend  # frontend on :5173
```

## Your Tasks

### 1. BFF Server (`bff/src/server.ts`)

The endpoint `GET /api/dashboard/:username` is stubbed. Implement it:

**Fetch** from all three mock services concurrently:

- `GET localhost:4000/users/:username` → profile
- `GET localhost:4000/users/:username/repos` → repositories
- `GET localhost:4000/users/:username/events` → activity

**Transform** each response — the mock services return different field names than what the frontend expects. Study both sides to figure out the mapping.

**Handle partial failures** — the events service is slow (2s) and fails 50% of the time. One failure should not kill the entire response. Return what you can and report failures in the `errors` array.

The frontend expects this shape:

```json
{
  "profile": { "name": "...", "avatar": "...", "bio": "..." },
  "topRepos": [{ "name": "...", "stars": 0, "language": "..." }],
  "recentActivity": [{ "type": "commit", "repo": "...", "date": "..." }],
  "errors": ["events"]
}
```

**Bonus:** Add in-memory caching — same username within 60s skips external calls.

### 2. Search Bar (`frontend/src/components/SearchBar.tsx`)

The search bar is rendered but not wired up. Make it functional:

- Capture input with a controlled component
- On submit, trigger a fetch to `/api/dashboard/:username`
- Update the dashboard

### Available Users

The mock services have data for: `octocat`, `torvalds`, `gaearon`
