import type { Dictionary } from "./vi";

const en: Dictionary = {
  meta: {
    title: "{name} — Software Engineer",
    description: "{name}'s personal website and blog.",
  },
  nav: { home: "home", blog: "blog", projects: "projects", about: "about" },
  hero: {
    greeting: "Hi, I'm",
    role: "Software engineer",
    tagline:
      "I write this blog to keep track of what I learn and to share it with others.",
    ctaAbout: "About me",
    ctaBlog: "Read the blog",
    terminal: {
      whoami: "whoami",
      blog: "cat blog.txt",
      blogOut: "notes, lessons and thoughts",
      status: "status",
      statusOut: "always happy to chat ✨",
    },
  },
  sections: {
    about: "A bit about me",
    projects: "Things I've made",
    latest: "Latest posts",
    all: "View all",
    more: "Read more",
  },
  projects: {
    title: "Projects",
    description: "A few things I've made.",
    empty: "No projects yet — coming soon.",
    visit: "View",
  },
  blog: {
    title: "Blog",
    description: "Notes, lessons and thoughts.",
    empty: "No posts yet.",
    back: "All posts",
    minRead: "min read",
    updated: "updated",
    rss: "Subscribe via RSS",
  },
  about: {
    title: "About",
    description: "Who I am.",
    paragraphs: [
      "I'm a software engineer.",
      "Outside of work I write this blog to record what I learn and share it with others. If you'd like to chat, get in touch.",
    ],
    contact: "Contact",
  },
  notFound: { title: "404 — not found", back: "Back home" },
};

export default en;
