"use client";

import { Bell, Search, User } from "lucide-react";

export function TopNavbar() {
  return (
    <header className="h-16 border-b border-[#1e1e30] glass sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search resumes, jobs, or templates..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
          />
        </div>
        
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_10px_rgba(167,139,250,0.5)]">
            <span className="font-bold text-primary text-sm">H</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-white">HireReady</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-critical rounded-full border border-background"></span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
          <div className="h-full w-full rounded-full bg-background flex items-center justify-center overflow-hidden">
             {/* Replace with Clerk UserButton later */}
            <User className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
