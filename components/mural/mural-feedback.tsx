import { CheckCircle } from "lucide-react";

interface MuralFeedbackProps {
  error: string;
  success: string;
}

export function MuralFeedback({ error, success }: MuralFeedbackProps) {
  return (
    <>
      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400"
        >
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {success}
        </div>
      )}
    </>
  );
}
