import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
