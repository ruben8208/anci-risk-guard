interface Props {
  percent: number;
  label: string;
  tone: "critical" | "medium" | "good";
}

const TONE_STROKE: Record<Props["tone"], string> = {
  critical: "var(--destructive)",
  medium: "var(--warning)",
  good: "var(--primary)",
};

export function ComplianceGauge({ percent, label, tone }: Props) {
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(percent, 0), 100) / 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-[200px] w-[200px]">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth="14"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={TONE_STROKE[tone]}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 700ms cubic-bezier(.4,0,.2,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tabular-nums text-foreground">
            {percent.toFixed(0)}%
          </span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Cumplimiento
          </span>
        </div>
      </div>
      <span
        className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
        style={{
          color: TONE_STROKE[tone],
          borderColor: `color-mix(in oklab, ${TONE_STROKE[tone]} 45%, transparent)`,
          backgroundColor: `color-mix(in oklab, ${TONE_STROKE[tone]} 12%, transparent)`,
        }}
      >
        {label}
      </span>
    </div>
  );
}
