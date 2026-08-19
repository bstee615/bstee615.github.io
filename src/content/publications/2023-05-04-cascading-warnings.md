---
title: A Study of Static Warning Cascading Tools (Experience Paper)
summary: >-
  In this paper, we report the challenges of cascading warnings generated from two versions of programs. We investigated
  program differencing tools and extend them to perform warning cascading automatically.
date: 2023-05-04T00:00:00.000Z
venue: ArXiv
venueType: preprint
authors:
  - Xiuyuan Guo
  - Ashwin Kallingal Joshy
  - Benjamin Steenhoek
  - Wei Le
  - Lori Flynn
citation: >-
  Guo, X., Joshy, A. K., Steenhoek, B., Le, W., & Flynn, L. (2023). A Study of Static Warning Cascading Tools
  (Experience Paper). ArXiv.
tags: []
links:
  - label: Paper
    url: https://doi.org/10.48550/arXiv.2305.02515
  - label: Code
    url: https://github.com/iowastateuniversity-programanalysis/hydrogen
---

We investigated program differencing tools and extend them to perform warning cascading automatically. Specifically, we used textual based diff tool, namely SCALe, abstract syntax tree (AST) based diff tool, namely GumTree, and control flow graph (CFG) based diff tool, namely Hydrogen. In our evaluation, we used 96 pairs of benchmark programs for which we know ground-truth bugs and fixes as well as 12 pairs of real-world open-source projects.
