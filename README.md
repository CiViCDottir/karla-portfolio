# Karla Burger — Portfolio Website

My personal portfolio website / virtual CV, built as part of the Profile
Development deliverable for CMPG 323. It showcases my academic
background, skills, projects, and contact information.

**Live site:** [civicdottir.github.io/karla-portfolio](https://civicdottir.github.io/karla-portfolio/)

## About

I'm a BSc Information Technology graduate from North-West University,
with a focus on databases, backend development and systems analysis. This
site turns my CV into an interactive format, with project write-ups, real
results from coursework and a live SQL demo.

## Built with

- HTML5
- CSS3 (custom properties, Flexbox, CSS Grid, media queries)
- Vanilla JavaScript (scroll animations, theme toggle, skills-to-projects linking)
- [sql.js](https://github.com/sql-js/sql.js) (SQLite in the browser), loaded from a CDN for the SQL demo
- No frameworks. Everything else is built from scratch to learn the fundamentals

## Features

- Responsive layout (desktop, tablet and mobile)
- Light / dark mode that follows your system setting and remembers your choice
- Scroll-triggered animations, with reduced-motion support
- Consistent hover glow on cards, buttons, links and skill tiles
- Skills linked to projects: hover or tap a skill to see where I used it
- Project cards with logo banners, final marks and links to GitHub
- Dedicated detail page for each project (PostGrade, ProFit Fitness, Network Design, Potch Holes)
- "Try My Database": a live SQL playground on a simplified sample schema
- Sections: About, Skills, Projects, SQL Demo, Education, Achievements, Volunteer, Contact

## Projects

| Project | Tech | Result |
| --- | --- | --- |
| PostGrade: Student Assessment Management System | Python, Django, Django REST Framework, PostgreSQL | Final project: 78% |
| ProFit Fitness Database System | Oracle SQL (19 tables) | Final project: 84% |
| Business Network Infrastructure Design | Cisco Packet Tracer | Final project: 84% (team leader) |
| Potch Holes Information System | Systems analysis, relational database design | Final DB: 91% |

## Running it locally

1. Clone this repository: `git clone https://github.com/CiViCDottir/karla-portfolio.git`
2. Open the folder in VS Code
3. Install the **Live Server** extension if you don't have it
4. Right-click `index.html` → **Open with Live Server**

No build steps, no dependencies to install — it's plain HTML/CSS/JS.

## Project structure

```
karla-portfolio/
├── index.html        (main page structure and content)
├── postgrade.html    (PostGrade project details)
├── profit.html       (ProFit Fitness project details)
├── network.html      (Network Design project details)
├── potchholes.html   (Potch Holes project details)
├── style.css         (all styling and theme variables)
├── script.js         (animations, theme, skill linking, SQL demo)
└── assets/           (profile photo and project logos)
```

## Contact

- Email: karla@someone.za.net
- LinkedIn: [karla-l-burger](https://www.linkedin.com/in/karla-l-burger)
- GitHub: [@CiViCDottir](https://github.com/CiViCDottir)