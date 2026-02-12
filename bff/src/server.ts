import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Mock service base URLs
const SERVICES = {
    users: "http://localhost:4000/users",
    repos: "http://localhost:4000/users",
    events: "http://localhost:4000/users",
};

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

// What the MOCK SERVICES return (different shapes!)
interface MockUserResponse {
    login: string;
    full_name: string;
    meta: { avatar_url: string; joined: string };
    biography: string;
    location: string;
}

interface MockRepoResponse {
    repo_name: string;
    stargazers: number;
    primary_language: string | null;
    description: string;
    is_fork: boolean;
}

interface MockEventResponse {
    id: string;
    event_type: string;
    repository: string;
    created_at: string;
    payload: Record<string, unknown>;
}

// What the FRONTEND expects
interface Profile {
    name: string;
    avatar: string;
    bio: string;
}

interface Repo {
    name: string;
    stars: number;
    language: string;
}

interface ActivityEvent {
    type: string;
    repo: string;
    date: string;
}

interface DashboardResponse {
    profile: Profile | null;
    topRepos: Repo[];
    recentActivity: ActivityEvent[];
    errors: string[];
}

app.get("/api/dashboard/:username", async (req, res) => {
    res.status(501).json({
        message: "Not implemented yet — this is your task!",
    });
});

app.listen(PORT, () => {
    console.log(`BFF server running on http://localhost:${PORT}`);
    console.log(`Dashboard endpoint: GET /api/dashboard/:username`);
    console.log(`\nMake sure mock services are running on port 4000`);
});
