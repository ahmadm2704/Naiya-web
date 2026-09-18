export default function PlaceholderMedia({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-charcoal via-maroon to-navy text-center text-xs font-medium uppercase tracking-wide text-white/70 ${className}`}
    >
      {label}
    </div>
  );
}
