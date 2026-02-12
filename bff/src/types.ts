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

export { MockUserResponse, MockRepoResponse, MockEventResponse, Profile, Repo, ActivityEvent, DashboardResponse };
