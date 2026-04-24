import type { ReactNode } from "react";
import DevToolsGuard from "@/app/guard/disable-dev-tools";
import LayoutAuthWrapper from "@/app/shared/wrapper/layout-auth-wrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-full">
          <DevToolsGuard unauthorizedPath="/auth/unauthorized" />
          <LayoutAuthWrapper>{children}</LayoutAuthWrapper>
        </div>
      </div>
    </div>
  );
}
