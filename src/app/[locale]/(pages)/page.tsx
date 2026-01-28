export default function HomePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6 border-b pb-3 text-sm">
        <button className="font-semibold">For you</button>
        <button className="text-muted-foreground hover:text-foreground">Latest</button>
        <button className="text-muted-foreground hover:text-foreground">Trending</button>
      </div>

      {[1, 2, 3].map((id) => (
        <article key={id} className="rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="text-sm">
              <div className="font-medium">Malik</div>
              <div className="text-muted-foreground text-xs">@testuser</div>
            </div>
          </div>

          <h2 className="mt-3 text-2xl font-bold leading-tight">
            JavaScript learning
          </h2>

          <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {["#javascript", "#react", "#nextjs", "#typescript"].map((t) => (
              <span key={t} className="hover:text-foreground cursor-pointer">{t}</span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>5 Reacts</span>
            <span>1 Comments</span>
          </div>
        </article>
      ))}
    </div>
  )
}
