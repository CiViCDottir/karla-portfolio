const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => observer.observe(el));

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check if the user already picked a theme before (saved in browser)
function readSavedTheme() {
  try {
    return localStorage.getItem('theme');
  } catch (e) {
    return null;
  }
}

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
}

const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(readSavedTheme() || (systemPrefersLight ? 'light' : 'dark'));

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  try {
    localStorage.setItem('theme', next);
  } catch (e) {}
});

/* ---- Skills -> projects ---- */
// Keys must match the skill names on your page exactly.
// Project ids: postgrade, profit, network, potchholes
const SKILL_PROJECTS = {
  'Python': ['postgrade'],
  'Django': ['postgrade'],
  'Django REST Framework': ['postgrade'],
  'REST APIs': ['postgrade'],
  'PostgreSQL': ['postgrade'],
  'SQL': ['postgrade', 'profit', 'potchholes'],
  'Oracle SQL Developer': ['profit'],
  'DB Design & Modelling': ['profit', 'potchholes'],
  'GitHub': ['postgrade', 'potchholes'],
  'Cisco Packet Tracer': ['network'],
  'Computer Networks': ['network'],
  'Systems Analysis & Design': ['potchholes'],
  'Testing & Debugging': ['postgrade'],
  'Code Reviews': ['postgrade'],
  'Technical Documentation': ['postgrade', 'profit', 'network', 'potchholes'],
  'C#': ['potchholes'],
  'Visual Studio': ['potchholes'],
};

/* ---- Skills -> projects: behaviour ---- */
// Read each card's id from its "View Project Details" link (profit.html -> profit)
const projectCards = [...document.querySelectorAll('.project-card')].map((card) => ({
  el: card,
  id: (card.querySelector('.view-details-link')?.getAttribute('href') || '').replace('.html', '')
}));

let pinnedSkill = null;

function highlightSkill(skill) {
  const ids = SKILL_PROJECTS[skill];
  projectCards.forEach(({ el, id }) => {
    el.classList.toggle('match', !!ids && ids.includes(id));
    el.classList.toggle('dim', !!ids && !ids.includes(id));
  });
    document.querySelectorAll('.project-chip').forEach((chip) => {
    chip.classList.toggle('active', !!ids && ids.includes(chip.dataset.project));
  });
}

const PROJECT_NAMES = {
  postgrade: 'PostGrade',
  profit: 'ProFit Fitness',
  network: 'Network Design',
  potchholes: 'Potch Holes'
};

document.querySelectorAll('.skill-item').forEach((item) => {
  // "Delphi (school, 3yrs)" becomes "Delphi" so it can match the map
  const name = item.querySelector('.skill-name').textContent.replace(/\s*\(.*\)/, '').trim();
  const ids = SKILL_PROJECTS[name];
  if (ids) item.dataset.used = ids.map((id) => PROJECT_NAMES[id]).join(', ');

  item.tabIndex = 0; // lets keyboard users reach the tile

  item.addEventListener('mouseenter', () => highlightSkill(name));
  item.addEventListener('focus', () => highlightSkill(name));
  item.addEventListener('mouseleave', () => highlightSkill(pinnedSkill));
  item.addEventListener('blur', () => highlightSkill(pinnedSkill));

  const togglePin = () => {
    document.querySelectorAll('.skill-item.pinned').forEach((p) => p.classList.remove('pinned'));
    pinnedSkill = pinnedSkill === name ? null : name;
    if (pinnedSkill) item.classList.add('pinned');
    highlightSkill(pinnedSkill);
  };

  item.addEventListener('click', togglePin);
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePin();
    }
  });
});

if (document.getElementById('sqlInput')) {

/* ---- SQL playground: sample data ---- */
const SEED = `
CREATE TABLE plans (plan_id INTEGER PRIMARY KEY, plan_name TEXT, monthly_fee INTEGER);
CREATE TABLE members (member_id INTEGER PRIMARY KEY, full_name TEXT, plan_id INTEGER REFERENCES plans(plan_id), join_date TEXT);
CREATE TABLE classes (class_id INTEGER PRIMARY KEY, class_name TEXT, trainer TEXT, capacity INTEGER);
CREATE TABLE bookings (booking_id INTEGER PRIMARY KEY, member_id INTEGER REFERENCES members(member_id), class_id INTEGER REFERENCES classes(class_id), booking_date TEXT);

INSERT INTO plans VALUES (1,'Basic',350),(2,'Standard',550),(3,'Premium',850);

INSERT INTO members VALUES
  (1,'Anele',1,'2026-01-10'),(2,'Bram',2,'2026-01-22'),
  (3,'Chloe',3,'2026-02-03'),(4,'Dineo',2,'2026-02-14'),
  (5,'Eben',1,'2026-03-01'),(6,'Fatima',2,'2026-03-09'),
  (7,'Gerrit',3,'2026-03-20'),(8,'Hanli',1,'2026-04-02');

INSERT INTO classes VALUES
  (1,'Spin','Lerato',15),(2,'Yoga','Marie',12),
  (3,'HIIT','Pieter',20),(4,'Pilates','Zanele',10);

INSERT INTO bookings VALUES
  (1,1,1,'2026-04-03'),(2,2,3,'2026-04-03'),(3,3,2,'2026-04-04'),
  (4,3,1,'2026-04-05'),(5,4,3,'2026-04-05'),(6,5,3,'2026-04-06'),
  (7,6,1,'2026-04-06'),(8,6,2,'2026-04-07'),(9,7,3,'2026-04-08'),
  (10,2,1,'2026-04-09');
`;

/* ---- SQL playground: preset queries ---- */
const PRESETS = {
  'Members per plan': `SELECT p.plan_name, COUNT(*) AS members
FROM members m
JOIN plans p ON p.plan_id = m.plan_id
GROUP BY p.plan_name
ORDER BY members DESC;`,

  'Most booked classes': `SELECT c.class_name, COUNT(b.booking_id) AS bookings
FROM classes c
LEFT JOIN bookings b ON b.class_id = c.class_id
GROUP BY c.class_id
ORDER BY bookings DESC;`,

  'Monthly revenue': `SELECT SUM(p.monthly_fee) AS monthly_revenue
FROM members m
JOIN plans p ON p.plan_id = m.plan_id;`,

  'Members who never booked': `SELECT full_name
FROM members m
WHERE NOT EXISTS (
  SELECT 1 FROM bookings b WHERE b.member_id = m.member_id
);`
};

/* ---- SQL playground: buttons ---- */
const sqlInput = document.getElementById('sqlInput');
const sqlOutput = document.getElementById('sqlOutput');
const presetBox = document.getElementById('sqlPresets');

Object.entries(PRESETS).forEach(([label, sql]) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.addEventListener('click', () => {
    sqlInput.value = sql;
    runQuery();
  });
  presetBox.appendChild(button);
});

/* ---- SQL playground: engine ---- */
const SQLJS_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/';
let dbPromise = null;

function loadDatabase() {
  if (dbPromise) return dbPromise; // only load once

  dbPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SQLJS_BASE + 'sql-wasm.js';
    script.onload = () => {
      initSqlJs({ locateFile: (file) => SQLJS_BASE + file }).then((SQL) => {
        const db = new SQL.Database();
        db.run(SEED); // creates your four tables and the sample rows
        resolve(db);
      }, reject);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  dbPromise.catch(() => { dbPromise = null; }); // allow a retry if loading failed
  return dbPromise;
}

/* ---- SQL playground: output ---- */
function showMessage(className, text) {
  sqlOutput.innerHTML = '';
  const p = document.createElement('p');
  p.className = className;
  p.textContent = text;
  sqlOutput.appendChild(p);
}

function showTable(result) {
  sqlOutput.innerHTML = '';
  const table = document.createElement('table');

  const headRow = table.createTHead().insertRow();
  result.columns.forEach((name) => {
    const th = document.createElement('th');
    th.textContent = name;
    headRow.appendChild(th);
  });

  const body = table.createTBody();
  result.values.forEach((row) => {
    const tr = body.insertRow();
    row.forEach((value) => {
      tr.insertCell().textContent = value === null ? 'NULL' : value;
    });
  });

  sqlOutput.appendChild(table);
}

/* ---- SQL playground: run ---- */
async function runQuery() {
  if (!sqlInput.value.trim()) {
    showMessage('pg-msg', 'Type a query first, or pick one of the examples above.');
    return;
    }
  showMessage('pg-msg', 'Running...');
  try {
    const db = await loadDatabase();
    const results = db.exec(sqlInput.value);
    if (results.length) {
      showTable(results[results.length - 1]);
    } else {
      showMessage('pg-msg', 'Query ran. No rows returned.');
    }
  } catch (err) {
    showMessage('pg-err', err && err.message ? err.message : 'Could not load the SQL engine. Check your connection and try again.');
  }
}

document.getElementById('runSql').addEventListener('click', runQuery);

sqlInput.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') runQuery();
});
}