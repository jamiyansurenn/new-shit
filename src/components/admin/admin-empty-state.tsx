import { Inbox } from "lucide-react";

interface AdminEmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminEmptyState({
  title,
  description,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background px-6 py-16 text-center">
      <Inbox className="size-10 text-muted" aria-hidden />
      <p className="mt-4 font-medium">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
