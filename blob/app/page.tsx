import { HeroScene } from "@/components/HeroScene";
import { TrackedLink } from "@/components/TrackedLink";
import { btn } from "@/components/ui";

export default function Home() {
  return (
    <HeroScene count={5} className="min-h-[max(100svh,640px)]">
      <div className="mx-auto max-w-3xl px-5 pt-24 text-center sm:pt-36">
        <h1 className="glow-text text-5xl sm:text-7xl">Light That Feels Alive.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink sm:text-xl">
          Small glowing forms that wake when you walk by — and fade when you leave.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackedLink href="/collection" event="cta_explore_collection" className={btn.primary}>
            Explore the collection
          </TrackedLink>
          <TrackedLink href="/resorts" event="cta_resorts" eventProps={{ location: "hero" }} className={btn.secondary}>
            For resorts &amp; homestays
          </TrackedLink>
        </div>
      </div>
    </HeroScene>
  );
}
