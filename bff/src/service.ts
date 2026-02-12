import { mapEvents, mapRepos, mapUser } from "./mappers";
import { DashboardResponse, MockEventResponse, MockRepoResponse, MockUserResponse } from "./types";
import { parseSettledFetchResponse } from "./utils";

// Mock service base URLs
const SERVICES = {
    users: (username: string) => `http://localhost:4000/users/${username}`,
    repos: (username: string) => `http://localhost:4000/users/${username}/repos`,
    events: (username: string) => `http://localhost:4000/users/${username}/events`,
};

async function getUserDashboard(username: string): Promise<DashboardResponse> {
    const dashboard: DashboardResponse = {
        profile: null,
        topRepos: [],
        recentActivity: [],
        errors: [],
    };

    const [usersResponse, reposResponse, eventsResponse] = await Promise.allSettled([
        fetch(SERVICES.users(username)),
        fetch(SERVICES.repos(username)),
        fetch(SERVICES.events(username)),
    ]);

    try {
        const user = await parseSettledFetchResponse<MockUserResponse>(usersResponse);
        dashboard.profile = mapUser(user);
    } catch {
        dashboard.errors.push("users");
    }

    try {
        const repos = await parseSettledFetchResponse<MockRepoResponse[]>(reposResponse);
        const top5 = [...repos].sort((a, b) => b.stargazers - a.stargazers).slice(0, 5); // sort by most stars and take top 5
        dashboard.topRepos = mapRepos(top5);
    } catch {
        dashboard.errors.push("repos");
    }

    try {
        const events = await parseSettledFetchResponse<MockEventResponse[]>(eventsResponse);
        dashboard.recentActivity = mapEvents(events);
    } catch {
        dashboard.errors.push("events");
    }

    return dashboard;
}

export { getUserDashboard };
