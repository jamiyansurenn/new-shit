import { Card, CardContent } from "@/components/ui/card";

interface AdminStatCardProps {
  label: string;
  value: string;
  hint?: string;
}

export function AdminStatCard({ label, value, hint }: AdminStatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {label}
        </p>
        <p className="mt-2 font-serif-display text-3xl font-semibold">{value}</p>
        {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}
