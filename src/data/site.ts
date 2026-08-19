export const externalLinks = {
  scholar: "https://scholar.google.com/citations?user=uJk56S4AAAAJ",
  linkedin: "https://www.linkedin.com/in/ben-steenhoek",
  github: "https://github.com/bstee615",
  email: "mailto:bensteenhoek@microsoft.com",
} as const;

export const organizations = {
  microsoftCodeAi: {
    name: "Microsoft Code|AI",
    homepageName: "Microsoft Code | AI",
    url: "https://www.microsoft.com/en-us/research/group/codeai/",
  },
  programAnalysisAiLab: {
    name: "Program Analysis & AI Lab",
    url: "https://github.com/ISU-PAAL",
  },
  agLeader: {
    name: "Ag Leader Technology, AgFiniti team",
    url: "https://www.agleader.com/",
  },
  iowaStateComputerScience: {
    name: "Iowa State University, COM S 227: Object-oriented Programming (Java)",
    url: "https://www.cs.iastate.edu/",
  },
  roneyInnovations: {
    name: "Roney Innovations (ecommerce retailer)",
    url: "https://www.roneyinnovations.com/",
  },
  bobJonesComputerScience: {
    name: "Bob Jones University",
    url: "https://cs.bju.edu/",
  },
} as const;

export type OrganizationId = keyof typeof organizations;

const serviceVenues = {
  tosem: {
    name: "TOSEM",
    title: "ACM Transactions on Software Engineering and Methodology",
    url: "https://dl.acm.org/journal/tosem",
  },
  ese: {
    name: "ESE",
    title: "Empirical Software Engineering",
    url: "https://link.springer.com/journal/10664",
  },
  svm26: {
    name: "SVM'26",
    title: "Fourth International Workshop on Software Vulnerability Management",
    url: "https://conf.researchr.org/home/icse-2026/svm-2026",
  },
  fse25Ivr: {
    name: "FSE'25 IVR",
    title:
      "Ideas, Visions and Reflections Track, ACM International Conference on the Foundations of Software Engineering",
    url: "https://conf.researchr.org/track/fse-2025/fse-2025-ideas-visions-and-reflections",
  },
  forge25: {
    name: "FORGE'25",
    title:
      "ACM International Conference on AI Foundation Models and Software Engineering",
    url: "https://conf.researchr.org/home/forge-2025",
  },
  distill25: {
    name: "IEEE DISTILL '25",
    title:
      "IEEE Workshop on Distributed, Secure, and Trustworthy Intelligence with LLMs",
    url: "https://ieeedistill.github.io/",
  },
  tifs: {
    name: "TIFS",
    title: "Transactions on Information Forensics and Security",
    url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=10206",
  },
} as const;

const serviceRecords = [
  { date: "2026-07-24", venue: "tosem", role: "Reviewer" },
  { date: "2026-06-22", venue: "ese", role: "Reviewer" },
  { date: "2026-04-18", venue: "svm26", role: "Program committee" },
  { date: "2026-03-30", venue: "tosem", role: "Reviewer" },
  { date: "2026-03-13", venue: "tosem", role: "Reviewer" },
  { date: "2025-12-15", venue: "tosem", role: "Reviewer" },
  { date: "2025-11-11", venue: "distill25", role: "Invited talk" },
  { date: "2025-09-04", venue: "tosem", role: "Reviewer" },
  { date: "2025-06-23", venue: "fse25Ivr", role: "Program committee" },
  { date: "2025-04-27", venue: "forge25", role: "Program committee" },
  { date: "2024-12-30", venue: "ese", role: "Reviewer" },
  { date: "2023-12-18", venue: "tifs", role: "Reviewer" },
] as const;

export const service = serviceRecords.map(({ date, venue, role }) => ({
  ...serviceVenues[venue],
  date,
  role,
}));

export const projects = [
  {
    title: "wslwatch",
    description:
      "Windows watchdog service that keeps WSL2 distributions running",
    href: "https://github.com/bstee615/wslwatch",
    published: "2026-03-27",
  },
  {
    title: "rrun",
    description:
      "Remote runner that syncs Git-tracked files and streams commands over SSH",
    href: "https://github.com/bstee615/rrun",
    published: "2026-03-22",
  },
  {
    title: "shared-task-spooler",
    description:
      "Convenience script for managing a shared job queue with task-spooler",
    href: "https://github.com/bstee615/shared-task-spooler",
    published: "2023-12-16",
  },
  {
    title: "task-spooler-gui",
    description:
      "Web interface for monitoring and accessing task-spooler queues",
    href: "https://github.com/bstee615/task-spooler-gui",
    published: "2022-07-25",
  },
  {
    title: "cfactor",
    description: "Policy-driven refactoring for C programs",
    href: "https://github.com/bstee615/cfactor",
    published: "2021-07-17",
  },
  {
    title: "tree-climber",
    description: "Program analysis tools for C built on tree-sitter",
    href: "https://github.com/bstee615/tree-climber",
    published: "2022-06-15",
  },
  {
    title: "pal-tools",
    description: "Dynamic analysis and code-generation utilities",
    href: "https://github.com/bstee615/pal-tools",
    published: "2020-12-11",
  },
  {
    title: "rarl",
    description: 'Reproduction of "robust adversarial reinforcement learning"',
    href: "https://github.com/bstee615/rarl",
    published: "2020-11-24",
  },
  {
    title: "animal-cognitive",
    description: "Embodied-cognition reinforcement learning models",
    href: "https://github.com/animal-cognitive/AnimalAI-Olympics/tree/feature/whole-cache-agent",
    published: "2021-03-01",
  },
  {
    title: "precise-interrupts",
    description: "ARM interrupt-handling research reproduction",
    href: "https://github.com/isu-cpre581-pangolin/gem5/tree/sleepy",
    published: "2020-10-25",
  },
];
