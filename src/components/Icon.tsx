const paths: Record<string, string> = {
  truck: "M2 6h12v10H2zM14 9h4l4 4v3h-8zM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  bus: "M4 4h16v13H4zM4 11h16M7 20v-3M17 20v-3M7.5 14.5h.01M16.5 14.5h.01",
  cog: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2",
  contract: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
  building: "M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18",
  factory: "M3 21V11l6 4v-4l6 4V6h6v15zM7 21v-3M12 21v-3M17 21v-3",
  hardhat: "M4 17h16M5 17a7 7 0 0 1 14 0M12 6v5M9 8v3M15 8v3",
  store: "M4 9l1-5h14l1 5M4 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 6 0 2.5 2.5 0 0 0 5 0M5 11v9h14v-9M10 20v-5h4v5",
  calendar: "M4 6h16v14H4zM4 11h16M8 3v4M16 3v4",
  briefcase: "M4 8h16v11H4zM9 8V5h6v3M4 13h16",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  headset: "M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3zM20 19c0 1.5-2 2-5 2",
  check: "M5 12l5 5L20 7",
  chevron: "M6 9l6 6 6-6",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  chat: "M4 5h16v11H9l-5 4z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  container: "M3 7h18v10H3zM7 7v10M11 7v10M15 7v10M19 7v10M3 19h18",
  box: "M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  warehouse: "M3 10l9-6 9 6v10H3zM8 20v-6h8v6M8 17h8",
  snowflake: "M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9 4l3 2 3-2M9 20l3-2 3 2",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  network: "M12 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM19 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM12 8v4M12 12l-6 4M12 12l6 4",
};

export default function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={paths[name] ?? paths.check} />
    </svg>
  );
}
