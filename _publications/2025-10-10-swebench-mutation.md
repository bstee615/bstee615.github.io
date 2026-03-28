---
title: "Saving SWE-Bench: A Benchmark Mutation Approach for Realistic Agent Evaluation"
collection: publications
permalink: /publication/swebench-mutation
excerpt: 'We introduce a benchmark mutation framework that transforms formal GitHub issue benchmarks into realistic user-style queries, revealing that existing benchmarks overestimate agent capabilities by up to 50%.'
date: 2025-10-10
venue: 'CAIN'
venue-type: conference-paper
paperurl: 'https://arxiv.org/abs/2510.08996'
citation: 'Spandan Garg, Benjamin Steenhoek, and Yufan Huang. 2026. Saving SWE-Bench: A Benchmark Mutation Approach for Realistic Agent Evaluation. In IEEE/ACM International Conference on AI Engineering – Software Engineering for AI (CAIN 2026).'
---

Current benchmarks for evaluating software engineering agents, such as SWE-Bench Verified, are predominantly derived from GitHub issues and fail to accurately reflect how developers interact with chat-based coding assistants in IDEs. We introduce a novel benchmarking framework that transforms existing formal benchmarks into realistic user queries through systematic analysis of developer interaction patterns with chat-based agents.
* Our methodology transforms formal GitHub issue descriptions into realistic user-style queries based on telemetry analysis of popular chat-based agent interactions.
* We apply our framework to SWE-Bench Verified, the TypeScript subset of Multi-SWE-Bench, and a private benchmark (SWE-Bench C#).
* Our findings reveal that existing benchmarks significantly overestimate agent capabilities for some models by >50% over baseline performance for public benchmarks and ~10-16% for our internal benchmark.
* This work establishes a new paradigm for evaluating interactive chat-based software engineering agents through benchmark mutation techniques.
