import type { Dictionary } from "./vi";

const en: Dictionary = {
  meta: {
    title: "{name} — Developer & Blog",
    description: "{name}'s personal portfolio and blog: projects, technical notes and lessons from building software.",
  },
  nav: { home: "home", projects: "projects", blog: "blog", about: "about" },
  hero: {
    greeting: "Hi, I'm",
    role: "Full-stack developer",
    tagline:
      "I build web products, care about great experiences, and write down what I learn along the way.",
    ctaAbout: "About me",
    ctaBlog: "Read the blog",
    terminal: {
      whoami: "whoami",
      stack: "cat stack.txt",
      stackOut: "TypeScript · React · Next.js · Node.js · Docker",
      status: "git status",
      statusOut: "open to interesting projects ✨",
    },
  },
  sections: {
    about: "A bit about me",
    latest: "Latest posts",
    all: "View all",
    more: "Read more",
  },
  projects: {
    title: "Projects",
    description: "A few things I've built.",
    code: "Source",
    demo: "Demo",
  },
  blog: {
    title: "Blog",
    description: "Technical notes, lessons learned and thoughts.",
    empty: "No posts yet.",
    back: "All posts",
    minRead: "min read",
    updated: "updated",
    rss: "Subscribe via RSS",
  },
  about: {
    title: "About",
    description: "Who I am and what I do.",
    paragraphs: [
      "I'm a developer who likes turning ideas into working products. I work across the stack, from interface to infrastructure, and believe small details make a great experience.",
      "Outside of coding I write a blog to organise what I know and share it. If you'd like to chat or collaborate, get in touch.",
    ],
    skills: "Skills",
    contact: "Contact",
  },
  footer: { built: "Built with Next.js, self-hosted on my own server." },
  notFound: { title: "404 — not found", back: "Back home" },
};

export default en;
