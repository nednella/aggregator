import { mapEvents, mapRepos, mapUser } from "./mappers";
import { DashboardResponse, MockEventResponse, MockRepoResponse, MockUserResponse } from "./types";

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

    const [profile, repos, events] = await Promise.allSettled([
        fetch(SERVICES.users(username)),
        fetch(SERVICES.repos(username)),
        fetch(SERVICES.events(username)),
    ]);

    if (profile.status === "rejected" || !profile.value.ok) {
        dashboard.errors.push("users");
    } else {
        const body: MockUserResponse = await profile.value.json();
        dashboard.profile = mapUser(body);
    }

    if (repos.status === "rejected" || !repos.value.ok) {
        dashboard.errors.push("repos");
    } else {
        const body: MockRepoResponse[] = await repos.value.json();
        const top5 = [...body].sort((a, b) => b.stargazers - a.stargazers).slice(0, 5); // sort by most stars and take top 5
        dashboard.topRepos = mapRepos(top5);
    }

    if (events.status === "rejected" || !events.value.ok) {
        dashboard.errors.push("events");
    } else {
        const body: MockEventResponse[] = await events.value.json();
        dashboard.recentActivity = mapEvents(body);
    }

    return dashboard;
}

export { getUserDashboard };
