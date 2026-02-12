import express from "express";
import cors from "cors";
import { getUserDashboard } from "./service";
import { DashboardResponse } from "./types";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

type CacheEntry = {
    value: DashboardResponse;
    expires_at: number;
};
const cache = new Map<string, CacheEntry>();
const cacheDurationMs = 60000; // 1 minute

app.get("/api/dashboard/:username", async (req, res) => {
    const { username } = req.params;

    const key = username.trim().toLowerCase();
    const cached = cache.get(key);

    if (cached && cached.expires_at > Date.now()) {
        return res.status(200).json(cached.value);
    }

    const dashboard = await getUserDashboard(username);
    cache.set(key, {
        value: dashboard,
        expires_at: Date.now() + cacheDurationMs,
    });

    res.status(200).json(dashboard);
});

app.listen(PORT, () => {
    console.log(`BFF server running on http://localhost:${PORT}`);
    console.log(`Dashboard endpoint: GET /api/dashboard/:username`);
    console.log(`\nMake sure mock services are running on port 4000`);
});
