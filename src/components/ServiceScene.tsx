import type { ReactNode } from "react";

const C = {
  navy: "#101c2c",
  navy2: "#172b43",
  navy3: "#22405f",
  accent: "#f5a623",
  light: "#e8eef6",
  slate: "#8aa0b8",
  dark: "#0b1320",
  ice: "#cfe9f7",
};

/* ---------- primitives (all positioned with a translate + scale) ---------- */

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="17" fill={C.dark} />
      <circle cx={cx} cy={cy} r="7" fill={C.slate} />
    </g>
  );
}

function Truck({ x, y, s = 1, box = C.light, cab = C.accent, children }: { x: number; y: number; s?: number; box?: string; cab?: string; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="0" width="170" height="96" rx="6" fill={box} />
      {children}
      <path d="M176 28h44l26 30v38h-70z" fill={cab} />
      <path d="M186 36h30l16 20h-46z" fill={C.navy3} />
      <rect x="0" y="96" width="246" height="10" fill={C.dark} />
      <Wheel cx={40} cy={108} />
      <Wheel cx={132} cy={108} />
      <Wheel cx={208} cy={108} />
    </g>
  );
}

function Van({ x, y, s = 1, body = C.light }: { x: number; y: number; s?: number; body?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 20q0-20 20-20h110q16 0 28 22l28 34q8 8 8 22v18H0z" fill={body} />
      <path d="M138 14h6q8 0 14 10l18 22h-38z" fill={C.navy3} />
      <rect x="0" y="82" width="194" height="8" fill={C.accent} />
      <Wheel cx={42} cy={92} />
      <Wheel cx={152} cy={92} />
    </g>
  );
}

function Bus({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="0" width="300" height="110" rx="16" fill={C.light} />
      <rect x="0" y="78" width="300" height="12" fill={C.accent} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={16 + i * 50} y="16" width="40" height="38" rx="5" fill={C.navy3} />
          <circle cx={36 + i * 50} cy="38" r="8" fill={C.slate} />
        </g>
      ))}
      <rect x="268" y="16" width="22" height="58" rx="5" fill={C.navy3} />
      <Wheel cx={62} cy={112} />
      <Wheel cx={238} cy={112} />
    </g>
  );
}

function Box({ x, y, w = 40, h = 32, fill = C.accent }: { x: number; y: number; w?: number; h?: number; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} />
      <rect x={x} y={y + h / 2 - 2} width={w} height="4" fill={C.navy} opacity="0.25" />
    </g>
  );
}

function Container({ x, y, w = 120, h = 50, fill = C.accent }: { x: number; y: number; w?: number; h?: number; fill?: string }) {
  const ribs = Math.floor(w / 12);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" fill={fill} />
      {Array.from({ length: ribs }, (_, i) => (
        <rect key={i} x={x + 6 + i * 12} y={y + 4} width="3" height={h - 8} fill={C.navy} opacity="0.22" />
      ))}
    </g>
  );
}

function House({ x, y, s = 1, fill = C.light }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="30" width="70" height="52" fill={fill} />
      <path d="M-6 32l41-32 41 32z" fill={C.accent} />
      <rect x="28" y="50" width="16" height="32" fill={C.navy3} />
    </g>
  );
}

function Pin({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0c-18 0-30 13-30 29 0 22 30 50 30 50s30-28 30-50C30 13 18 0 0 0z" fill={C.accent} />
      <circle cx="0" cy="28" r="11" fill={C.navy} />
    </g>
  );
}

function Plane({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0-30l8 0 6 24 36 16v10l-36-7-4 18 12 8v7l-20-5-20 5v-7l12-8-4-18-36 7v-10l36-16 6-24z" fill={C.light} />
    </g>
  );
}

function Snowflake({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.navy3} strokeWidth="5" strokeLinecap="round" fill="none">
      <path d="M0-30v60M-26-15l52 30M-26 15l52-30" />
      <path d="M-8-26l8 8 8-8M-8 26l8-8 8 8" />
    </g>
  );
}

function Sky({ children }: { children?: ReactNode }) {
  return (
    <>
      <rect width="800" height="500" fill={C.navy2} />
      <rect y="250" width="800" height="250" fill={C.navy} opacity="0.55" />
      <circle cx="660" cy="90" r="46" fill={C.accent} opacity="0.16" />
      {children}
    </>
  );
}

function Ground({ y = 400 }: { y?: number }) {
  return (
    <>
      <rect x="0" y={y} width="800" height={500 - y} fill={C.dark} />
      <path d={`M0 ${y + 44}H800`} stroke={C.slate} strokeWidth="3" strokeDasharray="28 22" opacity="0.5" />
    </>
  );
}

function Skyline({ y = 400 }: { y?: number }) {
  const b = [[30, 90], [90, 130], [150, 80], [560, 110], [620, 150], [690, 90], [740, 120]];
  return (
    <g fill={C.navy3} opacity="0.55">
      {b.map(([x, h]) => (
        <rect key={x} x={x} y={y - h} width="46" height={h} />
      ))}
    </g>
  );
}

/* ---------- one scene per service ---------- */

function scene(slug: string): ReactNode {
  switch (slug) {
    case "freight-cargo-transport":
      return (
        <>
          <Skyline />
          <Ground />
          <Truck x={170} y={242} s={1.7}>
            <rect x="12" y="14" width="146" height="14" fill={C.accent} opacity="0.9" />
          </Truck>
          <Box x={50} y={362} w={44} h={36} />
          <Box x={96} y={372} w={36} h={26} fill={C.slate} />
        </>
      );
    case "passenger-transport":
      return (
        <>
          <Skyline />
          <Plane x={640} y={120} s={1.5} rot={-20} />
          <Ground />
          <Bus x={150} y={268} s={1.9} />
        </>
      );
    case "equipment-machinery-moving":
      return (
        <>
          <Skyline />
          <Ground />
          <g transform="translate(110 290) scale(1.5)">
            <rect x="0" y="62" width="250" height="16" fill={C.slate} />
            <path d="M70 62V28h46l20 20v14z" fill={C.accent} />
            <rect x="82" y="34" width="26" height="22" fill={C.navy3} />
            <path d="M118 40L170 8l16 10-48 36z" fill={C.accent} />
            <path d="M176 10l30 10-8 24-28-12z" fill={C.slate} />
            <rect x="52" y="64" width="86" height="14" rx="7" fill={C.dark} />
          </g>
          <g transform="translate(110 290) scale(1.5)">
            <rect x="0" y="78" width="250" height="14" fill={C.dark} />
            <path d="M256 36h40l22 28v28h-62z" fill={C.light} />
            <path d="M264 44h24l12 18h-36z" fill={C.navy3} />
            <Wheel cx={40} cy={96} />
            <Wheel cx={150} cy={96} />
            <Wheel cx={288} cy={96} />
          </g>
        </>
      );
    case "contract-fleet-services":
      return (
        <>
          <Skyline />
          <Ground />
          <path d="M60 140C240 90 520 190 740 120" fill="none" stroke={C.accent} strokeWidth="4" strokeDasharray="10 12" opacity="0.7" />
          {[60, 250, 470, 740].map((x, i) => (
            <circle key={x} cx={x} cy={[140, 118, 160, 120][i]} r="9" fill={C.accent} />
          ))}
          <Truck x={50} y={288} s={1.05} />
          <Van x={330} y={296} s={1.05} />
          <Truck x={560} y={288} s={1.05} box={C.slate} />
        </>
      );
    case "international-freight-forwarding":
      return (
        <>
          <circle cx="400" cy="210" r="136" fill={C.navy3} />
          <g fill="none" stroke={C.slate} strokeWidth="2.5" opacity="0.7">
            <circle cx="400" cy="210" r="136" />
            <ellipse cx="400" cy="210" rx="58" ry="136" />
            <ellipse cx="400" cy="210" rx="110" ry="136" />
            <path d="M264 210H536M284 140H516M284 280H516" />
          </g>
          <path d="M200 300C300 130 520 110 640 190" fill="none" stroke={C.accent} strokeWidth="4" strokeDasharray="10 10" />
          <Plane x={560} y={146} s={1.3} rot={55} />
          <rect x="0" y="384" width="800" height="116" fill={C.dark} />
          <path d="M120 372h460l-30 36H152z" fill={C.slate} />
          <Container x={170} y={338} w={90} h={34} />
          <Container x={264} y={338} w={90} h={34} fill={C.light} />
          <Container x={358} y={338} w={90} h={34} />
        </>
      );
    case "container-transportation":
      return (
        <>
          <Ground />
          <g stroke={C.slate} strokeWidth="8" fill="none">
            <path d="M80 400V120h300M380 120v280M80 160h300" />
          </g>
          <rect x="250" y="160" width="26" height="40" fill={C.accent} />
          <Container x={110} y={350} w={120} h={50} />
          <Container x={110} y={298} w={120} h={50} fill={C.light} />
          <Container x={110} y={246} w={120} h={50} fill={C.slate} />
          <Truck x={440} y={290} s={1.25} box={C.dark}>
            <Container x={4} y={-34} w={160} h={50} />
          </Truck>
        </>
      );
    case "last-mile-delivery":
      return (
        <>
          <Ground />
          <House x={470} y={300} s={1.3} />
          <House x={590} y={310} s={1.1} fill={C.slate} />
          <House x={690} y={318} s={0.95} />
          <path d="M240 330C340 250 440 230 560 232" fill="none" stroke={C.accent} strokeWidth="4" strokeDasharray="10 10" />
          <Pin x={560} y={150} s={1.1} />
          <Van x={70} y={300} s={1.35} />
        </>
      );
    case "express-urgent-delivery":
      return (
        <>
          <Skyline />
          <Ground />
          <g stroke={C.accent} strokeWidth="5" strokeLinecap="round" opacity="0.8">
            <path d="M40 330h130M20 370h150M60 410h110" />
          </g>
          <Van x={230} y={288} s={1.5} />
          <circle cx="640" cy="130" r="58" fill={C.navy3} stroke={C.light} strokeWidth="6" />
          <path d="M640 130V92M640 130l28 16" stroke={C.accent} strokeWidth="7" strokeLinecap="round" />
          <path d="M470 80l-30 54h24l-12 46 52-64h-26l18-36z" fill={C.accent} />
        </>
      );
    case "warehousing-storage":
      return (
        <>
          <Ground y={410} />
          <path d="M90 170l310-100 310 100v240H90z" fill={C.navy3} />
          <path d="M70 176l330-110 330 110" fill="none" stroke={C.accent} strokeWidth="10" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={170 + i * 170} y={240} width="130" height="170" fill={C.light} />
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <rect key={j} x={170 + i * 170} y={246 + j * 26} width="130" height="4" fill={C.slate} />
              ))}
            </g>
          ))}
          <Box x={110} y={374} w={50} h={36} />
          <Box x={110} y={340} w={50} h={34} fill={C.slate} />
          <Box x={650} y={374} w={50} h={36} fill={C.slate} />
        </>
      );
    case "refrigerated-transportation":
      return (
        <>
          <circle cx="400" cy="260" r="200" fill={C.ice} opacity="0.07" />
          <Ground />
          <Truck x={170} y={242} s={1.7} box={C.ice} cab={C.accent}>
            <rect x="0" y="0" width="170" height="96" rx="6" fill={C.ice} />
            <Snowflake x={85} y={48} s={1.1} />
          </Truck>
          <g fill={C.ice} opacity="0.7">
            <circle cx="120" cy="120" r="4" />
            <circle cx="680" cy="160" r="5" />
            <circle cx="560" cy="90" r="3" />
            <circle cx="260" cy="170" r="3" />
          </g>
        </>
      );
    case "industrial-project-logistics":
      return (
        <>
          <Ground />
          <g stroke={C.accent} strokeWidth="7" fill="none">
            <path d="M230 400V60M230 60H520M520 60v60M230 110l-70 30h70" />
            <path d="M230 90l280-24" strokeWidth="4" />
          </g>
          <rect x="500" y="118" width="40" height="18" fill={C.light} />
          <g stroke={C.slate} strokeWidth="6" fill="none">
            <path d="M360 400V250M460 400V250M560 400V250M340 250h240M340 320h240" />
          </g>
          <Truck x={450} y={296} s={0.95} box={C.slate} />
        </>
      );
    case "commercial-distribution-services":
      return (
        <>
          <Ground y={430} />
          <g stroke={C.accent} strokeWidth="4" strokeDasharray="9 9" fill="none" opacity="0.8">
            <path d="M400 250L130 150M400 250L670 150M400 250L150 380M400 250L650 380" />
          </g>
          <g transform="translate(340 190)">
            <rect x="0" y="30" width="120" height="70" fill={C.navy3} />
            <path d="M-8 34l68-32 68 32z" fill={C.accent} />
            <rect x="46" y="58" width="28" height="42" fill={C.light} />
          </g>
          <House x={96} y={96} s={0.9} />
          <House x={640} y={96} s={0.9} fill={C.slate} />
          <House x={116} y={326} s={0.9} fill={C.slate} />
          <House x={620} y={326} s={0.9} />
          <Van x={250} y={186} s={0.5} />
        </>
      );
    default:
      return <Ground />;
  }
}

export default function ServiceScene({
  slug,
  title,
  className = "",
  flip = false,
}: {
  slug: string;
  title: string;
  className?: string;
  /** Mirror the scene so sibling pages under one parent do not look identical. */
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-label={`Illustration of ${title}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <Sky />
      {flip ? <g transform="translate(800 0) scale(-1 1)">{scene(slug)}</g> : scene(slug)}
    </svg>
  );
}
