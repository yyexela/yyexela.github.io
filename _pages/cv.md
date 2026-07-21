---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<div class="cv-download-links">
  <a href="{{ base_path }}/files/cv.pdf" class="btn btn--primary">Download CV as PDF</a>
</div>

Education
======
* PhD, Electrical & Computer Engineering, University of Washington – Seattle (Sept 2023 – Present)
  * Advisor: Dr. J. Nathan Kutz
  * GPA: 3.98/4.00

* MS, Applied Mathematics, University of Washington – Seattle (Sept 2023 – June 2025)
  * GPA: 3.98/4.00

* BS, Applied Mathematics, University of Colorado – Boulder (Aug 2019 – May 2023)
  * Summa Cum Laude with Honors
  * GPA: 4.00/4.00

* BS, Computer Science, University of Colorado – Boulder (Aug 2019 – May 2023)
  * Summa Cum Laude with Honors
  * GPA: 4.00/4.00

Employment
======
* Allen Institute for Artificial Intelligence (Ai2) (Summer 2026)
  * I worked on the Climate Modeling team at Ai2 as a research intern working on out-of-distribution generalization
  * I improved long-time climate forecasting performance through a variable masking strategy
  * I also explored new transformer backbones and obtained the first positive results on an ACE foundation model trained with a mix of real and synthetic data

* NASA/Caltech Jet Propulsion Laboratory (Summer 2023)
  * I spearheaded the development of a VxWorks 7 operating system abstraction layer (OSAL) in C for the Mars Sample Return (MSR) mission
  * I also ported the open-source bsdiff and bspatch software to VxWorks 7 to reduce bandwidth usage during the MSR mission

* Lockheed Martin (Summer 2022)
  * I implemented low-level software to communicate between a star tracker (ST) and a command & data handling (C&DH) board using the MIL-STD-1553 protocol
  * I also worked on implementing functional verification tests (FVTs) to ensure written code followed logical requirements

* Lockheed Martin (Summer 2021)
  * I implemented functional requirements for flight software built on top of NASA's Core Flight Executive (cFE) framework in the VxWorks operating system
  * I also wrote low-level code for satellite-to-ground radio communication for a technology demonstration that required testing code on real hardware

* Workiva (Summer 2020)
  * I developed new visual and functional features for an internal search engine
  * I added pagination capabilities and the TF-IDF statistic for page ranking, prevented Cross-Site Scripting (XSS) attacks, and enhanced the visual appeal of the site

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>

Awards and Fellowships
======
* National Science Foundation Graduate Research Fellowship Awardee (June 2025) — Three years of tuition and a living stipend
* Most Innovative Poster Award, 2025 UW ECE Research Showcase (May 2025) — Tour of Blue Origin facilities in Washington
* Robert E. Rushmer Endowed Fellowship Fund in ECE (Spring 2024) — One quarter of RA funding at UW
* ESCA Fellowship (Winter 2024) — One quarter of RA funding at UW
* GFSEI Top Scholar Recruitment Award (Fall 2023) — One quarter of RA funding at UW
* JPL Mission System Capture the Flag Award – Third Place (Summer 2023) — Recognition award for JPL interns
* CEAS Research Award (Spring 2023) — Recognition award for outstanding commitment to undergraduate researchers at CU Boulder

Service and leadership
======
* AI-DEEDS Organizer and Reviewer (2026)
* Elementary School Volunteer for UW Science Explorers (2026)
* NeurIPS Workshop Reviewer (2025)
* ICLR Reviewer (2025)
* ICML Workshop Reviewer (2025)

Certifications
======
* LE-1: Linux Essentials, Linux Professional Institute (LPI)

References
======
* J. Nathan Kutz, Professor, Applied Mathematics and Electrical & Computer Engineering, University of Washington — kutz@uw.edu
