import Icon from "./Icon";

/**
 * Original vector illustration used until real photography is supplied.
 * Each service gets a distinct composition (pattern + angle) derived from its slug.
 */
export default function ServiceArt({
  icon,
  slug,
  title,
  className = "",
}: {
  icon: string;
  slug: string;
  title: string;
  className?: string;
}) {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 997;
  const angle = (h % 6) * 15 - 30;
  const dots = 4 + (h % 4);

  return (
    <div
      role="img"
      aria-label={`Illustration representing ${title}`}
      className={`relative flex items-center justify-center overflow-hidden bg-navy text-accent ${className}`}
    >
      <svg viewBox="0 0 200 120" aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <g stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1" transform={`rotate(${angle} 100 60)`}>
          {Array.from({ length: 14 }, (_, i) => (
            <line key={i} x1={-40 + i * 24} y1="-40" x2={-40 + i * 24} y2="160" />
          ))}
        </g>
        <path d={`M0 ${95 - (h % 20)} Q 70 ${60 + (h % 30)} 200 ${85 - (h % 25)}`} fill="none" stroke="#f5a623" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="6 6" />
        {Array.from({ length: dots }, (_, i) => (
          <circle key={i} cx={30 + ((h * (i + 3)) % 150)} cy={20 + ((h * (i + 7)) % 80)} r="2" fill="#f5a623" fillOpacity="0.45" />
        ))}
      </svg>
      <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-2 ring-1 ring-accent/50">
        <Icon name={icon} className="h-11 w-11" />
      </span>
    </div>
  );
}
