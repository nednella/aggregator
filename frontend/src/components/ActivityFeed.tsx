import type { ActivityEvent } from "../types";
import Skeleton from "./Skeleton";

interface ActivityFeedProps {
  events: ActivityEvent[];
  loading: boolean;
  error: boolean;
}

const EVENT_LABELS: Record<string, string> = {
  PushEvent: "Pushed to",
  PullRequestEvent: "PR on",
  IssuesEvent: "Issue on",
  CreateEvent: "Created",
  WatchEvent: "Starred",
  ForkEvent: "Forked",
  DeleteEvent: "Deleted in",
  ReleaseEvent: "Released",
};

function formatRelativeDate(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHr = Math.floor(diffMs / 3_600_000);
  const diffDay = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 30) return `${diffDay}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function ActivityFeed({
  events,
  loading,
  error,
}: ActivityFeedProps) {
  if (loading) {
    return (
      <section className="card">
        <h2 className="section-title">Recent Activity</h2>
        <ul className="activity-list">
          {Array.from({ length: 4 }, (_, i) => (
            <li key={i} className="activity-item">
              <Skeleton width="70%" height="1rem" />
              <Skeleton width="20%" height="0.8rem" />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card">
        <h2 className="section-title">Recent Activity</h2>
        <p className="error-text">Activity unavailable</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2 className="section-title">Recent Activity</h2>
      {events.length === 0 ? (
        <p className="empty-text">No recent activity</p>
      ) : (
        <ul className="activity-list">
          {events.map((event, i) => (
            <li
              key={`${event.repo}-${event.date}-${i}`}
              className="activity-item"
            >
              <div className="activity-info">
                <span className="activity-type">
                  {EVENT_LABELS[event.type] ?? event.type}
                </span>
                <span className="activity-repo">{event.repo}</span>
              </div>
              <time className="activity-date">
                {formatRelativeDate(event.date)}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
