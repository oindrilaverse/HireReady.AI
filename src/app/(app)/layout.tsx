import { AppLayout } from "@/components/layout/AppLayout";
import { ReactNode } from "react";

export default function AppRouteLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
