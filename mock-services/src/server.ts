import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// Request logging middleware
// ---------------------------------------------------------------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.path} → ${res.statusCode} (${ms}ms)`);
  });
  next();
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface UserRecord {
  login: string;
  full_name: string;
  meta: { avatar_url: string; joined: string };
  biography: string;
  location: string;
}

interface RepoRecord {
  repo_name: string;
  stargazers: number;
  primary_language: string | null;
  description: string;
  is_fork: boolean;
}

interface EventRecord {
  id: string;
  event_type: string;
  repository: string;
  created_at: string;
  payload: Record<string, unknown>;
}

const users: Record<string, UserRecord> = {
  octocat: {
    login: "octocat",
    full_name: "The Octocat",
    meta: {
      avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
      joined: "2011-01-25",
    },
    biography: "GitHub's mascot and beloved internet cat.",
    location: "San Francisco",
  },
  torvalds: {
    login: "torvalds",
    full_name: "Linus Torvalds",
    meta: {
      avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      joined: "2011-09-03",
    },
    biography: "Creator of Linux and Git.",
    location: "Portland, OR",
  },
  gaearon: {
    login: "gaearon",
    full_name: "Dan Abramov",
    meta: {
      avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4",
      joined: "2011-05-25",
    },
    biography: "Working on something new. Previously: React team at Meta.",
    location: "London",
  },
};

const repos: Record<string, RepoRecord[]> = {
  octocat: [
    {
      repo_name: "Hello-World",
      stargazers: 2500,
      primary_language: "JavaScript",
      description: "My first repository",
      is_fork: false,
    },
    {
      repo_name: "Spoon-Knife",
      stargazers: 12100,
      primary_language: null,
      description: "Fork practice repo",
      is_fork: true,
    },
    {
      repo_name: "git-consortium",
      stargazers: 500,
      primary_language: "Shell",
      description: "Git tips and tricks",
      is_fork: false,
    },
    {
      repo_name: "octocat.github.io",
      stargazers: 320,
      primary_language: "HTML",
      description: "Personal site",
      is_fork: false,
    },
    {
      repo_name: "boysenberry-repo-1",
      stargazers: 8,
      primary_language: "Python",
      description: "Testing repo",
      is_fork: false,
    },
    {
      repo_name: "linguist",
      stargazers: 9800,
      primary_language: "Ruby",
      description: "Language detection library",
      is_fork: true,
    },
    {
      repo_name: "test-repo1",
      stargazers: 42,
      primary_language: "TypeScript",
      description: "Experimental project",
      is_fork: false,
    },
    {
      repo_name: "octodog",
      stargazers: 175,
      primary_language: "Go",
      description: "Companion CLI tool",
      is_fork: false,
    },
    {
      repo_name: "markdown-here",
      stargazers: 5400,
      primary_language: "JavaScript",
      description: "Markdown renderer",
      is_fork: true,
    },
    {
      repo_name: "lab-workflows",
      stargazers: 63,
      primary_language: "YAML",
      description: "CI/CD templates",
      is_fork: false,
    },
  ],
  torvalds: [
    {
      repo_name: "linux",
      stargazers: 175000,
      primary_language: "C",
      description: "Linux kernel source tree",
      is_fork: false,
    },
    {
      repo_name: "subsurface-for-dirk",
      stargazers: 1200,
      primary_language: "C++",
      description: "Dive log manager",
      is_fork: false,
    },
    {
      repo_name: "uemacs",
      stargazers: 680,
      primary_language: "C",
      description: "MicroEMACS editor",
      is_fork: false,
    },
    {
      repo_name: "test-tlb",
      stargazers: 95,
      primary_language: "C",
      description: "TLB testing tool",
      is_fork: false,
    },
    {
      repo_name: "libdc-for-dirk",
      stargazers: 310,
      primary_language: "C",
      description: "Dive computer library",
      is_fork: true,
    },
    {
      repo_name: "pesern-resolve",
      stargazers: 15,
      primary_language: "Shell",
      description: "Name resolver utility",
      is_fork: false,
    },
    {
      repo_name: "sparse",
      stargazers: 420,
      primary_language: "C",
      description: "Semantic parser for C",
      is_fork: false,
    },
    {
      repo_name: "kdev",
      stargazers: 55,
      primary_language: "C",
      description: "Kernel dev utilities",
      is_fork: false,
    },
  ],
  gaearon: [
    {
      repo_name: "overreacted.io",
      stargazers: 27000,
      primary_language: "JavaScript",
      description: "Personal blog",
      is_fork: false,
    },
    {
      repo_name: "react-hot-loader",
      stargazers: 12300,
      primary_language: "JavaScript",
      description: "Tweak React components in real time",
      is_fork: false,
    },
    {
      repo_name: "redux",
      stargazers: 60000,
      primary_language: "TypeScript",
      description: "Predictable state container",
      is_fork: false,
    },
    {
      repo_name: "react-dnd",
      stargazers: 20500,
      primary_language: "TypeScript",
      description: "Drag and Drop for React",
      is_fork: false,
    },
    {
      repo_name: "normalizr",
      stargazers: 21000,
      primary_language: "TypeScript",
      description: "Normalize nested JSON",
      is_fork: false,
    },
    {
      repo_name: "whatthefuck.is",
      stargazers: 3200,
      primary_language: "JavaScript",
      description: "Opinionated glossary",
      is_fork: false,
    },
    {
      repo_name: "react-makes-you-sad",
      stargazers: 4800,
      primary_language: null,
      description: "Flowchart for React issues",
      is_fork: false,
    },
    {
      repo_name: "lerna",
      stargazers: 1100,
      primary_language: "TypeScript",
      description: "Monorepo management tool",
      is_fork: true,
    },
    {
      repo_name: "ama",
      stargazers: 350,
      primary_language: null,
      description: "Ask me anything",
      is_fork: false,
    },
  ],
};

const events: Record<string, EventRecord[]> = {
  octocat: [
    {
      id: "1",
      event_type: "PushEvent",
      repository: "octocat/Hello-World",
      created_at: "2024-01-15T10:30:00Z",
      payload: { commits: 3 },
    },
    {
      id: "2",
      event_type: "PullRequestEvent",
      repository: "octocat/Spoon-Knife",
      created_at: "2024-01-14T09:15:00Z",
      payload: { action: "opened" },
    },
    {
      id: "3",
      event_type: "IssuesEvent",
      repository: "octocat/Hello-World",
      created_at: "2024-01-13T16:45:00Z",
      payload: { action: "closed" },
    },
    {
      id: "4",
      event_type: "WatchEvent",
      repository: "octocat/linguist",
      created_at: "2024-01-12T11:00:00Z",
      payload: { action: "started" },
    },
    {
      id: "5",
      event_type: "CreateEvent",
      repository: "octocat/lab-workflows",
      created_at: "2024-01-11T08:20:00Z",
      payload: { ref_type: "branch", ref: "feature/ci" },
    },
    {
      id: "6",
      event_type: "PushEvent",
      repository: "octocat/octodog",
      created_at: "2024-01-10T14:55:00Z",
      payload: { commits: 1 },
    },
    {
      id: "7",
      event_type: "PullRequestEvent",
      repository: "octocat/Hello-World",
      created_at: "2024-01-09T12:30:00Z",
      payload: { action: "merged" },
    },
    {
      id: "8",
      event_type: "IssuesEvent",
      repository: "octocat/Spoon-Knife",
      created_at: "2024-01-08T09:00:00Z",
      payload: { action: "opened" },
    },
    {
      id: "9",
      event_type: "WatchEvent",
      repository: "octocat/markdown-here",
      created_at: "2024-01-07T17:10:00Z",
      payload: { action: "started" },
    },
    {
      id: "10",
      event_type: "CreateEvent",
      repository: "octocat/test-repo1",
      created_at: "2024-01-06T10:00:00Z",
      payload: { ref_type: "repository" },
    },
  ],
  torvalds: [
    {
      id: "11",
      event_type: "PushEvent",
      repository: "torvalds/linux",
      created_at: "2024-01-15T22:00:00Z",
      payload: { commits: 47 },
    },
    {
      id: "12",
      event_type: "PushEvent",
      repository: "torvalds/linux",
      created_at: "2024-01-14T20:30:00Z",
      payload: { commits: 32 },
    },
    {
      id: "13",
      event_type: "PullRequestEvent",
      repository: "torvalds/linux",
      created_at: "2024-01-13T18:00:00Z",
      payload: { action: "merged" },
    },
    {
      id: "14",
      event_type: "IssuesEvent",
      repository: "torvalds/linux",
      created_at: "2024-01-12T15:45:00Z",
      payload: { action: "closed" },
    },
    {
      id: "15",
      event_type: "PushEvent",
      repository: "torvalds/subsurface-for-dirk",
      created_at: "2024-01-11T10:15:00Z",
      payload: { commits: 5 },
    },
    {
      id: "16",
      event_type: "CreateEvent",
      repository: "torvalds/linux",
      created_at: "2024-01-10T09:00:00Z",
      payload: { ref_type: "tag", ref: "v6.8-rc1" },
    },
    {
      id: "17",
      event_type: "PushEvent",
      repository: "torvalds/linux",
      created_at: "2024-01-09T21:30:00Z",
      payload: { commits: 28 },
    },
    {
      id: "18",
      event_type: "WatchEvent",
      repository: "torvalds/uemacs",
      created_at: "2024-01-08T14:00:00Z",
      payload: { action: "started" },
    },
  ],
  gaearon: [
    {
      id: "19",
      event_type: "PushEvent",
      repository: "gaearon/overreacted.io",
      created_at: "2024-01-15T16:00:00Z",
      payload: { commits: 2 },
    },
    {
      id: "20",
      event_type: "PullRequestEvent",
      repository: "gaearon/react-hot-loader",
      created_at: "2024-01-14T11:30:00Z",
      payload: { action: "closed" },
    },
    {
      id: "21",
      event_type: "IssuesEvent",
      repository: "gaearon/redux",
      created_at: "2024-01-13T09:45:00Z",
      payload: { action: "labeled" },
    },
    {
      id: "22",
      event_type: "PushEvent",
      repository: "gaearon/whatthefuck.is",
      created_at: "2024-01-12T13:20:00Z",
      payload: { commits: 1 },
    },
    {
      id: "23",
      event_type: "WatchEvent",
      repository: "gaearon/normalizr",
      created_at: "2024-01-11T08:00:00Z",
      payload: { action: "started" },
    },
    {
      id: "24",
      event_type: "CreateEvent",
      repository: "gaearon/overreacted.io",
      created_at: "2024-01-10T15:30:00Z",
      payload: { ref_type: "branch", ref: "draft/new-post" },
    },
    {
      id: "25",
      event_type: "PullRequestEvent",
      repository: "gaearon/react-dnd",
      created_at: "2024-01-09T10:00:00Z",
      payload: { action: "opened" },
    },
    {
      id: "26",
      event_type: "PushEvent",
      repository: "gaearon/overreacted.io",
      created_at: "2024-01-08T19:00:00Z",
      payload: { commits: 4 },
    },
    {
      id: "27",
      event_type: "IssuesEvent",
      repository: "gaearon/redux",
      created_at: "2024-01-07T12:15:00Z",
      payload: { action: "opened" },
    },
  ],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// GET /users/:username — Profile
app.get("/users/:username", (req: Request, res: Response) => {
  const user = users[req.params.username];
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

// GET /users/:username/repos — Repositories (unsorted!)
app.get("/users/:username/repos", (req: Request, res: Response) => {
  const userRepos = repos[req.params.username];
  if (!userRepos) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(userRepos);
});

// GET /users/:username/events — Activity (2s delay, 50% failure)
app.get("/users/:username/events", async (req: Request, res: Response) => {
  const userEvents = events[req.params.username];
  if (!userEvents) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  await delay(2000);

  if (Math.random() < 0.5) {
    res.status(500).json({ error: "Service temporarily unavailable" });
    return;
  }

  res.json(userEvents);
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Mock services running on http://localhost:${PORT}\n`);
  console.log("Available routes:");
  console.log("  GET /users/:username");
  console.log("  GET /users/:username/repos");
  console.log("  GET /users/:username/events  (2s delay, 50% failure)");
  console.log(`\nKnown users: ${Object.keys(users).join(", ")}`);
});
