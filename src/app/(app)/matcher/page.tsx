"use client";

import { Target, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function MatcherPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 rounded-3xl bg-secondary/20 flex items-center justify-center border border-secondary/30 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
      >
        <Target className="w-10 h-10 text-secondary" />
      </motion.div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Job Matcher</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Our AI is learning to read between the lines of job descriptions to find your perfect match.
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-secondary bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
        <Rocket className="w-4 h-4" />
        <span>Coming Soon</span>
      </div>
    </div>
  );
}
