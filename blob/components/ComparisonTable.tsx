const rows = [
  { topic: "When it's on", them: "All night, whether anyone is there or not", us: "Only when someone is near. Dark the rest of the night" },
  { topic: "Colour of light", them: "Cool white or colour-cycling RGB", us: "Warm 2200K amber, like a firefly or a flame" },
  { topic: "Under trees", them: "Starved: the panel can't see the sun", us: "Works anywhere. Battery, not solar" },
  { topic: "In the monsoon", them: "Grey weeks, dim nights", us: "Same gentle light through the rains" },
  { topic: "Charge", them: "Depends on yesterday's weather", us: "Designed for about a month per charge" },
  { topic: "Feel", them: "A gadget stuck in the ground", us: "A soft form that seems to notice you" },
];

export function ComparisonTable() {
  return (
    <div className="organic-card overflow-hidden border border-line">
      <table className="w-full border-collapse text-left text-sm sm:text-base">
        <caption className="sr-only">Typical always-on solar pebble lights compared with BLOB</caption>
        <thead>
          <tr className="bg-bg-raised">
            <th scope="col" className="w-1/4 px-4 py-4 font-semibold text-ink-muted sm:px-6"><span className="sr-only">Topic</span></th>
            <th scope="col" className="px-4 py-4 font-semibold text-ink-muted sm:px-6">Always-on solar pebbles</th>
            <th scope="col" className="px-4 py-4 font-semibold text-accent-ink sm:px-6">BLOB</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.topic} className="border-t border-line align-top">
              <th scope="row" className="px-4 py-4 font-semibold text-ink-strong sm:px-6">{r.topic}</th>
              <td className="px-4 py-4 text-ink-muted sm:px-6">{r.them}</td>
              <td className="px-4 py-4 text-ink sm:px-6">{r.us}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
