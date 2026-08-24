---
title: benjamin-steenhoek-cv-2026.pdf
output: public/files/benjamin-steenhoek-cv-2026.pdf
---

<!-- markdownlint-disable MD033 -->

# Benjamin Steenhoek, PhD

[![Website](icons/globe.svg) benjijang.com](https://benjijang.com) · [![Email](icons/email.svg) benjaminjsteenhoek@gmail.com](mailto:benjaminjsteenhoek@gmail.com) · [![Google Scholar](icons/scholar.svg) Scholar](https://scholar.google.com/citations?user=uJk56S4AAAAJ) · [![GitHub](icons/github.svg) github.com/bstee615](https://github.com/bstee615) · [![LinkedIn](icons/linkedin.svg) linkedin.com/in/ben-steenhoek](https://www.linkedin.com/in/ben-steenhoek)

> AI/ML researcher building code-editing and agentic systems for software engineering. Current focus areas are LLM post-training and agent harness engineering. Research interests include agent evaluation, LLM fine-tuning, software security, and program analysis.  
> Based in Des Moines, Iowa.

## Experience

### Senior Researcher <span class="dates">Fall 2024–Present</span>

**[Microsoft Code|_AI_](https://www.microsoft.com/en-us/research/group/codeai/)** · Des Moines, IA

- Drove research engineering for **GitHub Copilot's primary agentic evaluation platform**, building its scalable harness environment & tooling and onboarding key benchmarks. During my tenure, we grew it from a **greenfield prototype to 1M+ monthly executions**, and it now powers evaluations for flagship coding agents, including [VS Code Agent](https://code.visualstudio.com/docs/agents/overview), [Copilot Cloud Agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent), and [Copilot CLI](https://github.com/features/copilot/cli).
- Led post-training, evaluation, and rollout of a production model for [GitHub Copilot Inline Suggestions](https://code.visualstudio.com/docs/editing/ai-powered-suggestions) that **increased suggestion acceptance by 10%** and enabled a configurable eagerness feature that **addressed 10+ long-standing community issues**.

### Research Intern <span class="dates">May 2023–Aug 2024</span>

**[Microsoft Code|_AI_](https://www.microsoft.com/en-us/research/group/codeai/)** · Des Moines, IA

- Conducted a user study on in-IDE AI-powered security vulnerability detection & repair with **17 professional developers across 24 projects, 6.9K files, and 1.7M+ lines of code**; [_Closing the Gap_, ICSE 2025](https://benjijang.com/publication/deepvulguard/) (21% acceptance rate).
- **Improved unit-test readability and maintainability by up to 21%** through reinforcement learning; the fine-tuned Codex model was **less than half the cost of GPT-4 and outperformed it on 4 of 7 quality metrics**; [_Reinforcement Learning from Automatic Feedback_, DeepTest @ ICSE 2025](https://benjijang.com/publication/rlsqm/).

### Research Assistant <span class="dates">2020–2024</span>

**[Program Analysis & AI Lab](https://github.com/ISU-PAAL)** · Iowa State University · Ames, IA

- Achieved **state-of-the-art Big-Vul vulnerability detection performance (96.46 F1)** by combining a dataflow-inspired graph model with an LLM. Our model trained in 9 minutes—**75× faster than the strongest baseline**—and detected 8.7 of 17 real-world vulnerabilities where baselines found none; [_DeepDFA_, ICSE 2024](https://benjijang.com/publication/2024-04-14-deepdfa/) ([code](https://github.com/ISU-PAAL/DeepDFA); 22% acceptance rate).
- Built a [C/C++ execution tracing engine](https://github.com/ARiSE-Lab/TRACED_ICSE_24/tree/main/tracer) from scratch for [_TRACED_, ICSE 2024](https://benjijang.com/publication/2024-04-14-traced/) ([code](https://github.com/ARiSE-Lab/TRACED_ICSE_24); 22% acceptance rate), enabling execution-aware pre-training that **improved complete path prediction by 12.4% and runtime value prediction by 25.2%**. Built a Java counterpart later used for [_CodeSense_, ICLR 2026](https://benjijang.com/publication/codesense/).
- Reproduced and evaluated **9 state-of-the-art vulnerability detection models across 2 datasets**, uncovering substantial run-to-run variance and low agreement among model outputs; [_An Empirical Study of Deep Learning Models for Vulnerability Detection_, ICSE 2023](https://benjijang.com/publication/2023-05-14-empirical/) ([code](https://github.com/ISU-PAAL/DL-VD-Empirical-Study); 26% acceptance rate).
- Collaborated with Columbia University's ARiSE Lab and Carnegie Mellon University's CERT division; built open-source static and dynamic analysis tools including [tree-climber](https://github.com/bstee615/tree-climber) and [pal-tools](https://github.com/bstee615/pal-tools).

## Selected Publications <span class="section-link">See all: ![Google Scholar](icons/scholar.svg) [scholar.google.com/citations?user=uJk56S4AAAAJ](https://scholar.google.com/citations?user=uJk56S4AAAAJ)</span>

1. Monoshi Kumar Roy, Simin Chen, **Benjamin Steenhoek**, Jinjun Peng, Gail Kaiser, Baishakhi Ray, and Wei Le. (2026). _CodeSense: a Real-World Benchmark and Dataset for Code Semantic Reasoning._ _ICLR'26_. [Paper](https://arxiv.org/abs/2506.00750) · [Code](https://github.com/codesense-bench/codesense-codes)
2. Spandan Garg, **Benjamin Steenhoek**, and Yufan Huang. (2026). _Saving SWE-Bench: A Benchmark Mutation Approach for Realistic Agent Evaluation._ _CAIN'26_. [Paper](https://arxiv.org/abs/2510.08996) · [Code](https://github.com/microsoft/SWE-Bench-Mutated-CAIN26)
3. **Benjamin Steenhoek**, Kalpathy Sivaraman, Renata Saldivar Gonzalez, Yevhen Mohylevskyy, Roshanak Zilouchian Moghaddam, and Wei Le. (2025). _Closing the Gap: A User Study on the Real-world Usefulness of AI-powered Vulnerability Detection & Repair in the IDE._ _ICSE'25_. [Paper](https://arxiv.org/abs/2412.14306)
4. **Benjamin Steenhoek**, Michele Tufano, Neel Sundaresan, and Alexey Svyatkovskiy. (2025). _Reinforcement Learning from Automatic Feedback for High-Quality Unit Test Generation._ _DeepTest @ ICSE'25_. [Paper](https://arxiv.org/abs/2412.14308)
5. **Benjamin Steenhoek**, Md Mahbubur Rahman, Monoshi Kumar Roy, Mirza Sanjida Alam, Hengbo Tong, Swarna Das, Earl T. Barr, and Wei Le. (2024). _To Err is Machine: Vulnerability Detection Challenges LLM Reasoning._ _arXiv_. [Paper](https://arxiv.org/pdf/2403.17218)
6. Yangruibo Ding, **Benjamin Steenhoek**, Kexin Pei, Gail Kaiser, Wei Le, and Baishakhi Ray. (2024). _TRACED: Execution-aware Pre-training for Source Code._ _ICSE'24_. [Paper](https://doi.org/10.48550/arXiv.2306.07487) · [Code](https://github.com/ARiSE-Lab/TRACED_ICSE_24)
7. **Benjamin Steenhoek**, Hongyang Gao, and Wei Le. (2024). _Dataflow Analysis-Inspired Deep Learning for Efficient Vulnerability Detection._ _ICSE'24_. [Paper](https://doi.org/10.48550/arXiv.2212.08108) · [Code](https://github.com/ISU-PAAL/DeepDFA)
8. **Benjamin Steenhoek**, Md Mahbubur Rahman, Shaila Sharmin, and Wei Le. (2023). _Do Language Models Learn Semantics of Code? A Case Study in Vulnerability Detection._ _arXiv_. [Paper](https://arxiv.org/abs/2311.04109)
9. **Benjamin Steenhoek**, Md Mahbubur Rahman, Richard Jiles, and Wei Le. (2023). _An Empirical Study of Deep Learning Models for Vulnerability Detection._ _ICSE'23_. [Paper](https://doi.org/10.48550/arXiv.2212.08109) · [Code](https://github.com/ISU-PAAL/DL-VD-Empirical-Study)
10. Ashwin Kallingal Joshy, Xueyuan Chen, **Benjamin Steenhoek**, and Wei Le. (2021). _Validating Static Warnings via Testing Code Fragments._ _ISSTA'21_. [Paper](https://doi.org/10.1145/3460319.3464832)

## Education

<div class="education-entry">
<div class="education-heading"><strong>PhD, Computer Science</strong><span>Iowa State University</span><time>2019–2024</time></div>
<p>Dissertation: <a href="https://benjijang.com/publication/2024-12-19-phddissertation/"><em>Understanding and improving deep learning models for vulnerability detection</em></a></p>
</div>

<div class="education-entry">
<div class="education-heading"><strong>MS, Computer Science</strong><span>Iowa State University · GPA 3.91/4.00</span><time>2019–2021</time></div>
<p>Thesis: <a href="https://benjijang.com/publication/2021-12-19-msthesis/"><em>Refactoring programs to improve the performance of deep learning for vulnerability detection</em></a></p>
</div>

<div class="education-entry">
<div class="education-heading"><strong>BS, Computer Science</strong><span>Bob Jones University · <em>magna cum laude</em> · GPA 3.84/4.00</span><time>2016–2019</time></div>
</div>

<div class="columns">
<section>

## Invited Talks & Service

- **Reviewer** · [ACM TOSEM](https://dl.acm.org/journal/tosem) <span class="dates">2025, 2026</span>
- **Reviewer** · [Empirical Software Engineering](https://link.springer.com/journal/10664) <span class="dates">2024, 2026</span>
- **Program Committee** · [SVM](https://conf.researchr.org/home/icse-2026/svm-2026) <span class="dates">2026</span>
- **Program Committee** · [FSE'25 IVR](https://conf.researchr.org/track/fse-2025/fse-2025-ideas-visions-and-reflections) <span class="dates">2025</span>
- **Program Committee** · [FORGE](https://conf.researchr.org/home/forge-2025) <span class="dates">2025</span>
- **Invited Talk** · [IEEE DISTILL](https://ieeedistill.github.io/) <span class="dates">2025</span>
- **Reviewer** · [IEEE TIFS](https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=10206) <span class="dates">2023</span>

</section>
<section>

## Selected Projects <span class="section-link projects-link">See all: <img src="icons/github.svg" alt="GitHub" /> <a href="https://github.com/bstee615">github.com/bstee615</a></span>

- [**DeepDFA**](https://github.com/ISU-PAAL/DeepDFA) — efficient, dataflow-inspired vulnerability detection
- [**TRACED**](https://github.com/ARiSE-Lab/TRACED_ICSE_24/tree/main/tracer) — C/C++ execution tracing for model pre-training
- [**cfactor**](https://github.com/bstee615/cfactor) — policy-driven refactoring for C programs
- [**tree-climber**](https://github.com/bstee615/tree-climber) — program analysis tools for C built on tree-sitter
- [**pal-tools**](https://github.com/bstee615/pal-tools) — dynamic analysis and code-generation utilities
- [**rrun**](https://github.com/bstee615/rrun) — Git-aware remote command runner over SSH
- [**wslwatch**](https://github.com/bstee615/wslwatch) — watchdog that keeps WSL2 distributions running

</section>
</div>
