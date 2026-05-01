"use client";

import { FileText, Target, Award, Clock } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, <span className="text-primary">Alex</span></h1>
        <p className="text-gray-400">Let&apos;s get your resume ready for that dream job.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent flex flex-col items-start hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Resume Analyzer</h3>
          <p className="text-sm text-gray-400 mb-4 flex-1">Get instant feedback on your resume and optimize it for ATS systems.</p>
          <Link href="/analyzer" className="text-primary font-medium text-sm flex items-center hover:text-primary/80">
            Start Analysis &rarr;
          </Link>
        </div>

        <div className="glass p-6 rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent flex flex-col items-start hover:border-secondary/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 text-secondary">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Job Matcher</h3>
          <p className="text-sm text-gray-400 mb-4 flex-1">Paste a job description and see how well your resume matches.</p>
          <Link href="/matcher" className="text-secondary font-medium text-sm flex items-center hover:text-secondary/80">
            Find Matches &rarr;
          </Link>
        </div>

        <div className="glass p-6 rounded-2xl border border-success/20 bg-gradient-to-br from-success/5 to-transparent flex flex-col items-start hover:border-success/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center mb-4 text-success">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Interview Prep</h3>
          <p className="text-sm text-gray-400 mb-4 flex-1">Generate custom interview questions based on your resume and target role.</p>
          <Link href="/interview" className="text-success font-medium text-sm flex items-center hover:text-success/80">
            Start Practice &rarr;
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="glass rounded-2xl border border-[#1e1e30] overflow-hidden">
          <div className="divide-y divide-[#1e1e30]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#1e1e30] flex items-center justify-center text-gray-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Analyzed Resume for &quot;Software Engineer&quot;</p>
                  <p className="text-xs text-gray-500">2 days ago • ATS Score: 85%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
