import type { ReactNode } from "react";

interface ManagementPageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function ManagementPageHeader({
  title,
  description,
  action,
}: ManagementPageHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-border/80 bg-card/80 ">
      <div className="flex flex-col gap-4 border-b border-border/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="space-y-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {action}
      </div>
    </section>
  );
}
