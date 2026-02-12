import express from "express";
import cors from "cors";
import { DashboardResponse, MockUserResponse, MockRepoResponse, MockEventResponse } from "./types";

const app = express();
const PORT = 3000;

// Mock service base URLs
const SERVICES = {
    users: (username: string) => `http://localhost:4000/users/${username}`,
    repos: (username: string) => `http://localhost:4000/users/${username}/repos`,
    events: (username: string) => `http://localhost:4000/users/${username}/events`,
};

app.use(cors());
app.use(express.json());

app.get("/api/dashboard/:username", async (req, res) => {
    const { username } = req.params;
    const body = await getUserInformation(username);
    res.status(200).json(body);
});

app.listen(PORT, () => {
    console.log(`BFF server running on http://localhost:${PORT}`);
    console.log(`Dashboard endpoint: GET /api/dashboard/:username`);
    console.log(`\nMake sure mock services are running on port 4000`);
});

async function getUserInformation(username: string): Promise<DashboardResponse> {
    const responses = await Promise.allSettled([
        fetch(SERVICES.users(username)),
        fetch(SERVICES.repos(username)),
        fetch(SERVICES.events(username)),
    ]);

    return await handleServiceResponses(responses);
}

async function handleServiceResponses(responses: PromiseSettledResult<Response>[]): Promise<DashboardResponse> {
    const dashboardResponse: DashboardResponse = {
        profile: null,
        topRepos: [],
        recentActivity: [],
        errors: [],
    };

    const [profile, repos, events] = responses;

    if (profile.status === "rejected" || !profile.value.ok) {
        dashboardResponse.errors.push("users");
    } else {
        const body: MockUserResponse = await profile.value.json();

        dashboardResponse.profile = {
            name: body.full_name,
            avatar: body.meta.avatar_url,
            bio: body.biography,
        };
    }

    if (repos.status === "rejected" || !repos.value.ok) {
        dashboardResponse.errors.push("repos");
    } else {
        const body: MockRepoResponse[] = await repos.value.json();

        // sort by most stars and take top 5
        const top5 = [...body].sort((a, b) => b.stargazers - a.stargazers).slice(0, 5);

        dashboardResponse.topRepos = top5.map((repo) => {
            return {
                name: repo.repo_name,
                stars: repo.stargazers,
                language: repo.primary_language ?? "Unknown",
            };
        });
    }

    if (events.status === "rejected" || !events.value.ok) {
        dashboardResponse.errors.push("events");
    } else {
        const body: MockEventResponse[] = await events.value.json();

        dashboardResponse.recentActivity = body.map((activity) => {
            return {
                type: activity.event_type,
                repo: activity.repository,
                date: activity.created_at,
            };
        });
    }

    return dashboardResponse;
}
