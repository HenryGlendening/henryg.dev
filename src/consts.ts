export const SITE = {
  website: "https://henryg.dev/",
  author: "Henry Glendening",
  title: "Henry Glendening",
  desc: "Software engineer building things at the intersection of mobile and AI.",
  ogImage: "og-default.png",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 8,
  timezone: "America/Chicago",
  lang: "en",
} as const;

export const NAV_LINKS = [
  { href: "/posts", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
] as const;

export const SOCIAL_LINKS = [
  { href: "mailto:henry@henryg.dev", label: "Email" },
  { href: "https://github.com/HenryGlendening", label: "GitHub" },
  { href: "https://x.com/BeetWellington", label: "X" },
  { href: "https://www.linkedin.com/in/henryglendening/", label: "LinkedIn" },
  { href: "/rss.xml", label: "RSS" },
] as const;
