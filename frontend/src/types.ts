export interface Profile {
  name: string;
  avatar: string;
  bio: string;
}

export interface Repo {
  name: string;
  stars: number;
  language: string;
}

export interface ActivityEvent {
  type: string;
  repo: string;
  date: string;
}

export interface DashboardData {
  profile: Profile;
  topRepos: Repo[];
  recentActivity: ActivityEvent[];
  errors: string[];
}
