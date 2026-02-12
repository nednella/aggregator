interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  count?: number;
}

export default function Skeleton({
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
  count = 1,
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{ width, height, borderRadius }}
        />
      ))}
    </>
  );
}
