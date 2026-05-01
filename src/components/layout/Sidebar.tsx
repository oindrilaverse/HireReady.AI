"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  Briefcase, 
  PenTool, 
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Resume Analyzer", href: "/analyzer", icon: FileText },
  { name: "Resume Builder", href: "/builder", icon: PenTool },
  { name: "Job Matcher", href: "/matcher", icon: Target },
  { name: "Cover Letter", href: "/cover-letter", icon: Briefcase },
  { name: "Interview Prep", href: "/interview", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-[#1e1e30] glass z-40">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(167,139,250,0.5)]">
            <span className="font-bold text-primary">H</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">HireReady<span className="text-primary">.ai</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "text-white bg-primary/10 border border-primary/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
              )}
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-300")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass rounded-xl p-4 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <h4 className="font-semibold text-white text-sm mb-1">Pro Features</h4>
          <p className="text-xs text-gray-400 mb-3">Unlock unlimited AI generations.</p>
          <button className="w-full py-1.5 px-3 bg-primary hover:bg-primary/90 text-white text-xs font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(167,139,250,0.4)]">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
