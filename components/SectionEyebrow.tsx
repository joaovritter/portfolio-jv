export default function SectionEyebrow({
  n,
  label,
  className = "mb-[42px]",
}: {
  n: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={`flex items-center gap-3 ${className}`}
    >
      <span className="font-mono text-[12px] font-bold text-acc">{n}</span>
      <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-muted2">
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
