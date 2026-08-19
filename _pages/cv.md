---
layout: archive
title: "Curriculum Vitae"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Senior Researcher at [Microsoft Code\|AI](https://www.microsoft.com/en-us/research/group/codeai/), working on developer tools for secure software engineering and next-generation agent systems.


# Professional Experience
{% for position in site.data.cv_positions %}
  {% unless position.more %}
  {% include cv_position.html %}
  {% endunless %}
{% endfor %}

<details class="more-experience">
  <summary>More professional experience</summary>
  {% for position in site.data.cv_positions %}
    {% if position.more %}
      {% include cv_position.html %}
    {% endif %}
  {% endfor %}
</details>

# Education
{% for position in site.data.cv_education %}
  {% include cv_position.html %}
{% endfor %}


# Selected publications
<ul>
{% include publication-list.html selection="selected" layout="cv" %}
</ul>

<details class="more-publications">
  <summary>More publications</summary>
  <ul>
  {% include publication-list.html selection="more" layout="cv" %}
  </ul>
</details>


# My Projects

## Primary developer
* [cfactor](https://github.com/bstee615/cfactor): Scalable, policy-driven refactoring for C programs (Python/srcML).
* [tree-climber](https://github.com/bstee615/tree-climber): Scalable program analysis tools for C built on tree-sitter (Python).
* [pal-tools](https://github.com/bstee615/pal-tools): Dynamic analysis and code generation, using Intel Pin (C++) and LLVM (Python).
* [rarl](https://github.com/bstee615/rarl): Reproduction of <a href="https://doi.org/10.48550/arXiv.1703.02702">Robust Adversarial Reinforcement Learning (Pinto et al. 2017)</a> (PyTorch/stable-baselines).

## Team project
* [animal-cognitive](https://github.com/animal-cognitive/AnimalAI-Olympics/tree/feature/whole-cache-agent): Deep reinforcement learning models with embodied animal cognition (PyTorch/rllib).
* [precise-interrupts](https://github.com/isu-cpre581-pangolin/gem5/tree/sleepy): Reproducing a historical interrupt handling paper in ARM architecture (C++/gem5).


# Technical Skills
* Programming Languages: Proficient in Python and C#. Knowledge of C++, Java, JavaScript, SQL.
* Machine Learning & data scraping: PyTorch, rllib, pandas, numpy, Selenium, beautifulsoup.
* Web Development: Vue, ASP.NET Core, .NET Framework, SQL Server, Azure Functions, ACI, VMs, ML Studio.
* Computer architecture and program analysis: Antlr, LLVM, Intel Pin, gem5, abstract interpretation, fuzzing.
* DevOps: Git, Azure DevOps, and CI/CD, Slurm batch processing, Linux server administration.


# Leadership
* Science education outreach at Greenville County Juvenile Detention, Fall 2018/Spring 2019
* Vice president of Phi Beta Chi society, Spring 2018
