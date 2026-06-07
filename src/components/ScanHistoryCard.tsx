"use client";

import { motion } from "framer-motion";
import { FileText, Calendar, Target } from "lucide-react";

interface ScanHistoryCardProps {
  index: number;
  atsScore: number;
  jobTitle: string | null;
  createdAt: string;
}

function getScoreStyle(score: number) {
  if (score >= 80) return { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", bar: "#10b981" };
  if (score >= 60) return { color: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/20",   bar: "#f59e0b" };
  return               { color: "text-red-400",         bg: "bg-red-400/10",     border: "border-red-400/20",     bar: "#ef4444" };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export function ScanHistoryCard({ index, atsScore, jobTitle, createdAt }: ScanHistoryCardProps) {
  const style = getScoreStyle(atsScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="glass rounded-2xl p-5 border border-white/5 flex items-center gap-5 hover:border-white/10 transition-all duration-300 group"
    >
      {/* Score bubble */}
      <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${style.bg} border ${style.border} flex flex-col items-center justify-center`}>
        <span className={`text-xl font-extrabold leading-none ${style.color}`}>{atsScore}</span>
        <span className="text-[9px] text-gray-500 font-bold tracking-wider mt-0.5">ATS</span>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">
          {jobTitle || "General Resume Scan"}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" /> {formatDate(createdAt)}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Target className="w-3 h-3" />
            <span className={style.color}>{atsScore >= 80 ? "Excellent" : atsScore >= 60 ? "Good" : "Needs Work"}</span>
          </span>
        </div>
        {/* Mini score bar */}
        <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: style.bar }}
            initial={{ width: 0 }}
            animate={{ width: `${atsScore}%` }}
            transition={{ duration: 0.8, delay: index * 0.06 + 0.2, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Scan number badge */}
      <div className="flex-shrink-0 text-right">
        <span className="text-xs text-gray-600 font-mono">#{index + 1}</span>
      </div>
    </motion.div>
  );
}
