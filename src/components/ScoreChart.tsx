"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

interface ScoreChartProps {
  scans: Array<{ ats_score: number; created_at: string; job_title: string | null }>;
}

function getBarColor(score: number) {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

function formatLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Custom tooltip matching the glassmorphism theme
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const score = payload[0].value;
  return (
    <div className="bg-[#0f0f14] border border-white/10 rounded-xl px-4 py-3 shadow-2xl text-sm">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-white font-bold text-lg">{score}<span className="text-gray-500 text-xs ml-1">/ 100</span></p>
      <p className={`text-xs font-semibold mt-0.5 ${score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-red-400"}`}>
        {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work"}
      </p>
    </div>
  );
}

export function ScoreChart({ scans }: ScoreChartProps) {
  if (!scans || scans.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-600 text-sm">
        No scan data yet. Upload a resume to see your scores here.
      </div>
    );
  }

  const chartData = [...scans]
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map((s) => ({
      label: formatLabel(s.created_at),
      score: s.ats_score,
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-56"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap="30%" margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 25, 50, 75, 100]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={52}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.score)} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
