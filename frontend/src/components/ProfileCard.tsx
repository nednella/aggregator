import type { Profile } from "../types";
import Skeleton from "./Skeleton";

interface ProfileCardProps {
  profile: Profile | null;
  loading: boolean;
  error: boolean;
}

export default function ProfileCard({
  profile,
  loading,
  error,
}: ProfileCardProps) {
  if (loading) {
    return (
      <section className="card profile-card">
        <Skeleton width="80px" height="80px" borderRadius="50%" />
        <Skeleton width="60%" height="1.4rem" />
        <Skeleton width="80%" height="1rem" />
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="card profile-card profile-card--error">
        <p className="error-text">Profile unavailable</p>
      </section>
    );
  }

  return (
    <section className="card profile-card">
      <img
        className="profile-avatar"
        src={profile.avatar}
        alt={`${profile.name}'s avatar`}
        width={80}
        height={80}
      />
      <h2 className="profile-name">{profile.name}</h2>
      <p className="profile-bio">{profile.bio}</p>
    </section>
  );
}
