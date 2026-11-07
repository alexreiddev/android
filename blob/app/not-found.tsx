import Link from "next/link";
import { Blob } from "@/components/Blob";
import { btn } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="night-scope relative grid min-h-[75vh] place-items-center overflow-hidden px-5 py-20 text-center">
      <div>
        <button type="button" className="blob-wake mx-auto block w-48 cursor-default rounded-full sm:w-60" aria-label="A sleeping light. Hover or focus to wake it.">
          <Blob seed={3} state="hover" className="w-full text-[#d9d6cc]" />
        </button>
        <h1 className="mt-6 text-4xl sm:text-5xl">Nothing here but the dark.</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">The page you were looking for isn&apos;t here. The light above will keep you company for a moment.</p>
        <Link href="/" className={`${btn.primary} mt-8`}>
          Back to the garden
        </Link>
      </div>
    </section>
  );
}
