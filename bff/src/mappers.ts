import { ActivityEvent, MockEventResponse, MockRepoResponse, MockUserResponse, Profile, Repo } from "./types";

function mapUser(user: MockUserResponse): Profile {
    return {
        name: user.full_name,
        avatar: user.meta.avatar_url,
        bio: user.biography,
    };
}

function mapRepos(repos: MockRepoResponse[]): Repo[] {
    return repos.map((r) => ({
        name: r.repo_name,
        stars: r.stargazers,
        language: r.primary_language ?? "",
    }));
}

function mapEvents(events: MockEventResponse[]): ActivityEvent[] {
    return events.map((e) => ({
        type: e.event_type,
        repo: e.repository,
        date: e.created_at,
    }));
}

export { mapUser, mapRepos, mapEvents };
