import type { Repo } from "../types";
import Skeleton from "./Skeleton";

interface RepoListProps {
  repos: Repo[];
  loading: boolean;
  error: boolean;
}

export default function RepoList({ repos, loading, error }: RepoListProps) {
  if (loading) {
    return (
      <section className="card">
        <h2 className="section-title">Top Repositories</h2>
        <ul className="repo-list">
          {Array.from({ length: 3 }, (_, i) => (
            <li key={i} className="repo-item">
              <Skeleton width="50%" height="1.1rem" />
              <Skeleton width="30%" height="0.9rem" />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card">
        <h2 className="section-title">Top Repositories</h2>
        <p className="error-text">Repositories unavailable</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2 className="section-title">Top Repositories</h2>
      {repos.length === 0 ? (
        <p className="empty-text">No repositories found</p>
      ) : (
        <ul className="repo-list">
          {repos.map((repo) => (
            <li key={repo.name} className="repo-item">
              <span className="repo-name">{repo.name}</span>
              <div className="repo-meta">
                <span className="repo-stars">&#9733; {repo.stars}</span>
                {repo.language && (
                  <span className="repo-language">{repo.language}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
