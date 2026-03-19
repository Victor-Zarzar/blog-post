import type { ReactNode } from "react";
import DevToolsGuard from "@/app/guard/disable-dev-tools";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-full">
          <DevToolsGuard unauthorizedPath="/auth/unauthorized" />
          {children}
        </div>
      </div>
    </div>
  );
}
