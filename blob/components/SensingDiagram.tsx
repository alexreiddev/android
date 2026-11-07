import { Blob } from "./Blob";
import { InView } from "./InView";

/** A blob sensing 360° around it: pulse rings and a figure walking a circle. */
export function SensingDiagram() {
  return (
    <InView className="night-scope organic-card relative mx-auto grid aspect-square w-full max-w-md place-items-center overflow-hidden border border-line">
      <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <circle cx="200" cy="200" r="150" fill="none" stroke="#ffb547" strokeOpacity="0.25" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="95" fill="none" stroke="#d9d6cc" strokeOpacity="0.12" />
        {[0, 1.5, 3].map((d) => (
          <circle key={d} className="anim-ring" style={{ animationDelay: `${d}s` }} cx="200" cy="200" r="150" fill="none" stroke="#ffb547" strokeOpacity="0.5" strokeWidth="1.5" />
        ))}
        <text x="200" y="38" textAnchor="middle" fill="#b9b6aa" fontSize="12" fontFamily="inherit">wake range (360°)</text>
      </svg>
      <Blob seed={5} state="breathe" className="relative w-28 text-[#d9d6cc]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0">
        <span className="anim-walk absolute -left-2 -top-2 block h-4 w-4 rounded-full bg-[#d9d6cc] shadow-[0_0_10px_rgb(217_214_204/0.6)] [--orbit:min(34vw,150px)]" />
      </div>
      <p className="sr-only">Diagram: a BLOB light in the centre senses motion all the way around it. A person walking in a circle inside the range keeps it awake.</p>
    </InView>
  );
}
