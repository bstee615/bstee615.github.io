import type { OrganizationId } from "./site";

export interface CvEntry {
  title: string;
  date?: string;
  organizationId: OrganizationId;
  location: string;
  more?: boolean;
  bodyHtml: string;
}

// These repository-authored fragments preserve dense CV prose with inline links.
// They are rendered only by the CV page and must never contain user-provided HTML.
const cv = {
  positions: [
    {
      title: "Senior Researcher",
      date: "Fall 2024 - Present",
      organizationId: "microsoftCodeAi",
      location: "Des Moines, IA",
      bodyHtml:
        '<ul>\n<li>Drove research engineering for <strong>GitHub Copilot\'s primary agentic evaluation platform</strong>, building the scalable harness environment and tooling and onboarding key benchmarks that supported its growth from its <strong>greenfield prototype stage to 1M+ monthly executions</strong>, powering evaluations for flagship coding agents including <a href="https://code.visualstudio.com/docs/agents/overview">VS Code Agent</a>, <a href="https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent">Copilot Cloud Agent</a>, and <a href="https://github.com/features/copilot/cli">Copilot CLI</a>.</li>\n<li>Led training, evaluation, and rollout of customizable <a href="https://code.visualstudio.com/docs/editing/ai-powered-suggestions">GitHub Copilot Inline Suggestions</a>, <strong>addressing 10+ community issues and increasing accepted suggestions by 10%</strong>.</li>\n</ul>\n',
    },
    {
      title: "Research Intern",
      date: "May 2023 - Aug 2024",
      organizationId: "microsoftCodeAi",
      location: "Des Moines, IA",
      bodyHtml:
        '<ul>\n<li>Conducted a user study on in-IDE AI-powered security vulnerability detection & repair with <strong>17 professional developers across 24 projects, 6.9K files, and 1.7M+ lines of code</strong>; <a href="/publication/deepvulguard/"><em>Closing the Gap</em>, ICSE 2025</a> (21% acceptance rate).</li>\n<li><strong>Improved unit-test readability and maintainability by up to 21%</strong> through reinforcement learning; the fine-tuned Codex model was <strong>less than half the cost of GPT-4 and outperformed it on 4 of 7 quality metrics</strong>; <a href="/publication/rlsqm/"><em>Reinforcement Learning from Automatic Feedback</em>, DeepTest @ ICSE 2025</a>.</li>\n</ul>\n',
    },
    {
      title: "Research Assistant",
      date: "2020 - 2024",
      organizationId: "programAnalysisAiLab",
      location: "Ames, IA",
      bodyHtml:
        '<ul>\n<li>Achieved <strong>state-of-the-art Big-Vul vulnerability detection performance (96.46 F1)</strong> by combining a dataflow-inspired graph model with an LLM. Our model trained in 9 minutes—<strong>75x faster than the strongest baseline</strong>—and detected 8.7 of 17 real-world vulnerabilities where baselines found none; <a href="/publication/2024-04-14-deepdfa/"><em>DeepDFA</em>, ICSE 2024</a> (<a href="https://github.com/ISU-PAAL/DeepDFA">code</a>; 22% acceptance rate).</li>\n<li>Built a <a href="https://github.com/ARiSE-Lab/TRACED_ICSE_24/tree/main/tracer">C/C++ execution tracing engine</a> from scratch for <a href="/publication/2024-04-14-traced/"><em>TRACED</em>, ICSE 2024</a> (<a href="https://github.com/ARiSE-Lab/TRACED_ICSE_24">code</a>; 22% acceptance rate), enabling execution-aware pre-training that <strong>improved complete path prediction by 12.4% and runtime value prediction by 25.2%</strong>. Built a Java counterpart later used for <a href="/publication/codesense/"><em>CodeSense</em>, ICLR 2026</a>.</li>\n<li>Reproduced and evaluated <strong>9 state-of-the-art vulnerability detection models across 2 datasets</strong>, uncovering substantial run-to-run variance and low agreement among model outputs; <a href="/publication/2023-05-14-empirical/"><em>An Empirical Study of Deep Learning Models for Vulnerability Detection</em>, ICSE 2023</a> (<a href="https://github.com/ISU-PAAL/DL-VD-Empirical-Study">code</a>; 26% acceptance rate).</li>\n<li>Collaborated with Columbia University\'s ARiSE Lab and Carnegie Mellon University\'s CERT division; built open-source static and dynamic analysis tools including <a href="https://github.com/bstee615/tree-climber">tree-climber</a> and <a href="https://github.com/bstee615/pal-tools">pal-tools</a>.</li>\n</ul>\n',
    },
    {
      title: "Software Developer Intern",
      organizationId: "agLeader",
      location: "Ames, IA",
      more: true,
      bodyHtml:
        '<ul>\n<li>Democratized public datasets by adding GIS capability for geolocation and remote sensing.</li>\n<li>Widened customer reach by <a href="https://www.agleader.com/blog/ag-leader-expands-full-farm-data-solution-by-connecting-operations-running-mixed-fleets/">integrating AgFiniti with John Deere data platform</a>.</li>\n<li>Improved UX by modernizing satellite mapping interface with Javascript/Vue.</li>\n<li>Enabled agronomic analysis by maintaining a domain-specific language using Antlr.</li>\n</ul>\n',
    },
    {
      title: "Teaching Assistant",
      date: "Jan 2020 - May 2020",
      organizationId: "iowaStateComputerScience",
      location: "Ames, IA",
      more: true,
      bodyHtml:
        '<ul>\n<li>Instructed 30 students in weekly labs and office hours.</li>\n<li>Volunteered to create a <a href="https://github.com/bstee615/gol-gui">GUI visualization for Conway\'s Game of Life (gol-gui)</a> to increase student engagement.</li>\n</ul>\n',
    },
    {
      title: "Freelance Software Developer",
      date: "Aug 2019 - Aug 2021",
      organizationId: "roneyInnovations",
      location: "Des Moines, IA",
      more: true,
      bodyHtml:
        "<ul>\n<li>Collaborated with 2 other developers to create Amazon product listing web app using C#, ASP.NET Core, SQL Server, and Azure cloud services.</li>\n</ul>\n",
    },
  ],
  education: [
    {
      title: "PhD, Computer Science",
      date: "2019 - 2024",
      organizationId: "programAnalysisAiLab",
      location: "Ames, IA",
      bodyHtml:
        '<ul>\n<li>Thesis: <a href="/publication/2024-12-19-phddissertation/">Understanding and improving deep learning models for vulnerability detection</a>.</li>\n</ul>\n',
    },
    {
      title: "MS, Computer Science",
      date: "2019 - 2021",
      organizationId: "programAnalysisAiLab",
      location: "Ames, IA",
      bodyHtml:
        '<ul>\n<li>Thesis: <a href="/publication/2021-12-19-msthesis/">Refactoring programs to improve the performance of deep learning for vulnerability detection</a>.</li>\n<li>Released code as <a href="https://github.com/bstee615/cfactor">open-source library cfactor</a>.</li>\n<li>GPA 3.91/4.00.</li>\n</ul>\n',
    },
    {
      title: "BS, Computer Science",
      date: "Aug 2016 - May 2019",
      organizationId: "bobJonesComputerScience",
      location: "Greenville, SC",
      bodyHtml:
        "<ul>\n<li>Magna Cum Laude honors (GPA 3.84/4.00).</li>\n</ul>\n",
    },
  ],
} satisfies {
  positions: CvEntry[];
  education: CvEntry[];
};

export default cv;
