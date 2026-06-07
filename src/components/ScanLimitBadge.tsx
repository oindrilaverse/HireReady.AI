import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ScanLimitBadgeProps {
  scanCount: number;
}

export function ScanLimitBadge({ scanCount }: ScanLimitBadgeProps) {
  const isAtLimit = scanCount >= 3;
  const used = Math.min(scanCount, 3);

  if (isAtLimit) {
    return (
      <div className="flex items-center justify-center gap-2 mt-4 px-4 py-2.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-400 text-sm font-medium">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>
          3 of 3 free scans used —{" "}
          <Link
            href="/pricing"
            className="underline underline-offset-2 hover:text-amber-300 transition-colors font-bold"
          >
            Upgrade to Pro
          </Link>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/8 text-gray-400 text-xs font-medium">
      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
      <span>
        <span className="text-white font-semibold">{used} of 3</span> free scans used
      </span>
    </div>
  );
}
