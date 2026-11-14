import type { Dictionary } from "./vi";

const en: Dictionary = {
  meta: {
    title: "{name} — Software Engineer",
    description: "{name}'s personal website and blog.",
  },
  nav: {
    home: "home",
    blog: "blog",
    projects: "projects",
    games: "games",
    sports: "sports",
    favorites: "favorites",
    about: "about",
  },
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
  interests: {
    games: {
      title: "Games I play",
      description: "Games I've played and still play, with a few thoughts.",
      empty: "No games yet — coming soon.",
    },
    sports: {
      title: "Sports",
      description: "The sports I play.",
      empty: "No sports yet — coming soon.",
    },
    favorites: {
      title: "Favorite works",
      description: "Films, books, music... I love, and why.",
      empty: "Nothing here yet — coming soon.",
    },
    back: "Back",
    thoughts: "My thoughts",
    ratingLabel: "Rating",
    since: "Since",
    status: {
      playing: "Playing",
      finished: "Finished",
      paused: "Paused",
    },
    level: {
      casual: "Just for fun",
      regular: "Regularly",
      competitive: "Competitive",
      former: "Used to play",
    },
    kind: {
      film: "Film",
      series: "Series",
      book: "Book",
      music: "Music",
      anime: "Anime / Manga",
      podcast: "Podcast",
      other: "Other",
    },
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
