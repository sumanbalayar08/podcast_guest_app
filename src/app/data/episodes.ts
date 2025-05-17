export type Episode = {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  image: string;
  videoId: string;
};

export const featuredEpisodes: Episode[] = [
  {
    id: "ep-001",
    title: "The Future of AI and Human Creativity",
    description:
      "Explore how artificial intelligence is reshaping human expression and what that means for the future of creativity.",
    duration: "42:18",
    date: "May 10, 2025",
    image:
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop&q=80",
    videoId: "V80-gPkpH6M",
  },
  {
    id: "ep-002",
    title: "Mindfulness in the Age of Distraction",
    description:
      "How can we stay focused and calm when the world is constantly demanding our attention? A deep dive into mindfulness techniques.",
    duration: "38:45",
    date: "May 3, 2025",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=80",
    videoId: "qQ-PUXPVlos",
  },
  {
    id: "ep-003",
    title: "Digital Detox: Why It Matters",
    description:
      "We discuss the mental health benefits of unplugging and how to build a healthy relationship with technology.",
    duration: "45:30",
    date: "April 26, 2025",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
    videoId: "dQw4w9WgXcQ",
  },
];

export const recentEpisodes: Episode[] = [
  {
    id: "ep-004",
    title: "Hacking Productivity: Science-Backed Methods",
    description:
      "Join us as we break down neuroscience-backed productivity hacks to get more done without burning out.",
    duration: "36:22",
    date: "April 19, 2025",
    image:
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop&q=80",
    videoId: "Zi_XLOBDo_Y",
  },
  {
    id: "ep-005",
    title: "The Psychology of High Performers",
    description:
      "What sets high achievers apart? Learn the science of peak mental performance and discipline.",
    duration: "51:49",
    date: "April 12, 2025",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
    videoId: "eVTXPUF4Oz4",
  },
];

export const podcastInfo = {
  name: "WFTS",
  tagline: "Where Technology Meets Humanity",
  description:
    "Exploring the intersection of technology, psychology, and human potential. Each week, we bring you insightful conversations with thought leaders who are shaping the future of how we live and work in the digital age.",
  hostName: "Murtaza Manji",
  hostBio:
    "Murtaza Manji is a technologist, author, and educator passionate about responsible innovation and digital wellbeing. With over a decade of experience in Silicon Valley and academia, Alex brings a unique perspective on how we can harness technology while preserving our humanity.",
  hostImage:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  socialLinks: {
    spotify: "https://spotify.com",
    apple: "https://apple.com/podcasts",
    google: "https://podcasts.google.com",
    youtube: "https://youtube.com",
  },
};
