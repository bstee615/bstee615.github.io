---
title: "CodeSense: a Real-World Benchmark and Dataset for Code Semantic Reasoning"
collection: publications
permalink: /publication/codesense
excerpt: 'We propose CodeSense, the first benchmark with a spectrum of fine-grained code reasoning tasks from real-world software projects, revealing a clear performance gap in state-of-the-art LLMs for code semantic reasoning.'
date: 2025-05-31
venue: 'ICLR'
venue-type: conference-paper
paperurl: '/files/2025-05-31-codesense.pdf'
arxivurl: 'https://arxiv.org/abs/2506.00750'
citation: 'Monoshi Kumar Roy, Simin Chen, Benjamin Steenhoek, Jinjun Peng, Gail Kaiser, Baishakhi Ray, and Wei Le. 2026. CodeSense: a Real-World Benchmark and Dataset for Code Semantic Reasoning. In The Fourteenth International Conference on Learning Representations (ICLR 2026), April 24–28, 2026, Singapore.'
---

Understanding and reasoning about code semantics is essential for enhancing code LLMs' abilities to solve real-world software engineering tasks. Most existing benchmarks rely on synthetic datasets or focus on coarse-grained reasoning tasks, limiting their effectiveness in evaluating LLMs in practical SE contexts.
* We propose CodeSense, the first benchmark that makes available a spectrum of fine-grained code reasoning tasks from real-world Python, C, and Java software projects.
* We executed tests from real-world repositories, collected execution traces, and constructed a ground truth dataset for fine-grained semantic reasoning tasks.
* Our comprehensive evaluation of state-of-the-art LLMs shows a clear performance gap for fine-grained reasoning tasks.
* Prompting techniques such as chain-of-thought and in-context learning helped, but the lack of code semantics in LLMs fundamentally limits models' reasoning capabilities.
* We also produced an execution tracing framework and toolset for easy collection of ground truth for fine-grained SE reasoning tasks, offering a strong basis for future benchmark construction and model post-training.
* Our code and data are available at [codesense-bench.github.io](https://codesense-bench.github.io/).

Also available on [arXiv](https://arxiv.org/abs/2506.00750).
