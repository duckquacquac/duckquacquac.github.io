# How the Blog Works
### A full explanation — written for an engineer who has never written code

---

## The big picture

Think of the blog like a well-designed assembly. Every component has a job,
and they fit together in a defined way. You don't need to understand how the
engine works to drive the car — but knowing the layout means you can find
things, fix things, and extend things confidently.

Here's the full assembly:

```
portfolio/
│
├── index.html            ← About page
├── projects.html         ← Projects list
├── blog.html             ← Blog list
│
├── css/
│   └── style.css         ← All visual design (colors, fonts, spacing)
│
├── js/
│   ├── config.js         ← Your personal data
│   └── components.js     ← Builds nav + footer from your data
│
├── projects/             ← One .html file per project
├── blog/                 ← One .html file per blog post
│
└── assets/
    ├── images/           ← Your photos
    └── resume/           ← Your PDF
```

Each page is a `.html` file — a plain text file that a web browser knows
how to display. The browser reads it top to bottom and renders it as
a visual page.

---

## What is HTML?

HTML (HyperText Markup Language) is a way of labelling text so the browser
knows what role it plays.

You wrap content in **tags**:

```html
<h1>This is a big heading</h1>
<p>This is a paragraph of body text.</p>
<a href="https://example.com">This is a clickable link.</a>
```

Tags come in pairs: an opening tag `<h1>` and a closing tag `</h1>`.
Everything between them is the content.

Your project pages are mostly just labelled text. The browser reads the
labels and renders them according to the rules in `style.css`.

**Tags used in your project pages:**

| Tag | What it does |
|---|---|
| `<h1>` | The big page title |
| `<h2>` | A major section heading (gets a line above it) |
| `<h3>` | A sub-section heading |
| `<p>` | A paragraph of body text |
| `<a href="...">` | A clickable link |
| `<img src="..." />` | An image |
| `<strong>` | **Bold** text |
| `<em>` | *Italic* text |
| `<ul>` / `<li>` | A bullet list |
| `<table>` | A data table |

---

## What is CSS?

CSS (Cascading Style Sheets) is a separate file that controls how everything *looks*.
The HTML says "this is a heading". The CSS says "headings should be navy blue,
Source Serif 4 font, 2.8rem size, bold."

Your entire visual design lives in one file: `css/style.css`.

You don't need to touch it. But if you want to change something cosmetic —
a color, a font size, a spacing value — you'd do it there. Every value has
a comment explaining what it controls.

**The variables section at the top of style.css** is the most useful part.
It defines all the colors in one place:

```css
--bg:    #faf8f4;   /* warm parchment white */
--navy:  #162032;   /* dark navy — headings */
--earth: #8b5e3c;   /* earth brown — accent, links */
```

If you wanted to change the accent color across the whole site, you'd
change `--earth` here and it would update everywhere instantly.

---

## What is JavaScript?

JavaScript is a programming language that runs in the browser and can
modify the page after it loads.

Your site uses two JavaScript files:

**`js/config.js`** — this is just a big list of your personal data.
It's not really "programming" — it's more like a settings file.

```js
const SITE = {
  name: "Your Name",
  email: "your@email.com",
  bio: ["First paragraph.", "Second paragraph."],
};
```

**`js/components.js`** — this reads `config.js` and uses it to build
the nav bar and footer. Instead of copying your name into every single
HTML file, it's stored once and injected everywhere automatically.

You never need to edit `components.js`.

---

## How a page loads — step by step

Here's exactly what happens when someone opens, say, `projects/airbrakes.html`:

**1. The browser reads the HTML file.**
It finds the structure: nav placeholder, article header, prose content, footer placeholder.

**2. The browser reads `css/style.css`.**
It applies all the visual rules — fonts, colors, spacing — to everything on the page.

**3. The browser runs `js/config.js`.**
Your personal data (name, email, etc.) is loaded into memory.

**4. The browser runs `js/components.js`.**
It reads your data and:
- Fills in the nav bar with your name and the three page links
- Marks the correct nav link as "active" (underlined)
- Fills in the footer with your name and year
- Sets the browser tab title to "Airbrakes System Design — Your Name"

**5. Page is fully rendered.**

This happens in about 200 milliseconds. The user sees a complete page.

---

## How the file paths work

This is the thing that trips most people up. Files refer to each other
using *relative paths* — directions from one file to another.

**From a root-level page** (e.g. `index.html`, `projects.html`):

```html
<link rel="stylesheet" href="css/style.css" />
<script src="js/config.js"></script>
```

Read this as: "starting from where I am, go into the `css` folder and
grab `style.css`."

**From a subfolder page** (e.g. `projects/airbrakes.html`):

```html
<link rel="stylesheet" href="../css/style.css" />
<script src="../js/config.js"></script>
```

The `../` means "go up one level first." Because `airbrakes.html` lives
inside the `projects/` folder, it needs to go up one level before it can
find `css/` or `js/`.

**For images inside a project page:**

```html
<img src="../assets/images/projects/airbrakes-cad.jpg" />
```

Again: `../` to go up from `projects/`, then navigate to `assets/images/projects/`.

**The rule:** if a file is at the root level, no `../` needed.
If it's inside a folder, add `../` for each level deep it is.

---

## How the archive lists work (projects.html, blog.html)

These pages are hand-maintained lists. There's no database.
Each entry is just a few lines of HTML:

```html
<li class="entry">
  <span class="entry-date">May</span>
  <a class="entry-title" href="projects/cnc-milling.html">Precision CNC Milling...</a>
  <span class="entry-tag">Machining</span>
</li>
```

The CSS then lays these out in three columns: date on the left, title in the
middle, tag on the right — just like Ciechanowski's archives.

When you add a new project, you:
1. Create the project page file
2. Add one `<li>` entry to the list in `projects.html`

That's the full update. The site doesn't generate anything automatically —
you're in full control of what appears and in what order.

---

## How the nav bar gets built automatically

Every HTML page has this placeholder:

```html
<nav id="site-nav"></nav>
```

It starts empty. When `components.js` runs, it finds this element
(by its `id="site-nav"`) and fills it with the nav HTML — including your
name from `config.js` and the correct active link for the current page.

It figures out which page it's on by looking at the URL:

```js
const isProjects = path.includes('projects');
```

If the URL contains "projects", it adds `class="active"` to the Projects link,
which the CSS uses to draw the underline.

---

## How the About page gets filled in

`index.html` has empty placeholder elements:

```html
<h1 id="about-name"></h1>
<p id="about-tagline"></p>
<div id="about-bio"></div>
```

`components.js` finds each one by its `id` and fills it with the
corresponding value from `config.js`:

```js
document.getElementById('about-name').textContent = SITE.name;
```

This is why you only update `config.js` — `components.js` does the
distribution automatically.

---

## How the Chart.js charts work

The CMM chart in the CNC milling project (and the template for your own
results) uses a library called Chart.js. It's loaded from the internet:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
```

You then create a canvas element (a blank drawing area):

```html
<canvas id="cmmChart"></canvas>
```

And then JavaScript configures the chart:

```js
new Chart(document.getElementById('cmmChart'), {
  type: 'bar',
  data: {
    labels: ['Hole A', 'Hole B', ...],
    datasets: [{ data: [0.012, -0.018, ...] }]
  }
});
```

To use it for your own data: update the `labels` array (the x-axis names)
and the `data` array (the values). The chart renders automatically.

If you don't need a chart on a page, just delete the `<script src="chart.js...">` 
line at the top and the entire `<canvas>` + `<script>` block.

---

## How to add a new page — full walkthrough

**Scenario:** you want to add a new project called "Fluid Flow Test Rig".

**Step 1: Create the file.**
Copy `projects/template-project.html`.
Rename the copy to `projects/flow-test-rig.html`.

**Step 2: Update the browser tab title.**
At the top of the file, find:
```html
<body data-title="Project Title">
```
Change it to:
```html
<body data-title="Fluid Flow Test Rig">
```

**Step 3: Fill in the article header.**
```html
<span class="article-label">Fluid Systems · Experimental</span>
<h1>Fluid Flow Test Rig</h1>
<div class="article-meta">
  <span>March 2026</span>
  <span>University lab project</span>
  <span>SolidWorks · PIV · LabVIEW</span>
</div>
```

**Step 4: Write the content.**
Replace all the `[bracket placeholders]` with your real text.
Add sections with `<h2>`, paragraphs with `<p>`, tables and callouts where useful.

**Step 5: Add to the archive list.**
Open `projects.html`. Find the 2026 year group. Paste this inside the `<ul>`:
```html
<li class="entry">
  <span class="entry-date">Mar</span>
  <a class="entry-title" href="projects/flow-test-rig.html">Fluid Flow Test Rig</a>
  <span class="entry-tag">Fluid Systems</span>
</li>
```

**Step 6: Update the prev/next navigation.**
At the bottom of `flow-test-rig.html`, update the post-nav links to point to
adjacent projects if you want them to be navigable.

**Step 7: Save and refresh.**
Done.

---

## Common mistakes and how to fix them

**The page looks unstyled (plain text, no fonts or colors)**
→ You're opening the file directly from your file system.
Use VS Code + Live Server instead. See Quickstart, Step 1.

**A link is broken (clicking it does nothing or shows an error)**
→ The `href="..."` path is wrong. Check that the filename and folder are correct.
Remember: from inside `projects/`, links need `../` to go up a level, or
just the filename if they're in the same folder.

**An image isn't showing**
→ The `src="..."` path is wrong, or the filename doesn't match exactly
(filenames are case-sensitive on most servers: `Photo.jpg` ≠ `photo.jpg`).

**My name / bio isn't updating**
→ You edited `index.html` directly instead of `js/config.js`.
Edit `config.js` instead — that's where the data lives.
What's in `index.html` are empty placeholders that get filled automatically.

**The chart isn't showing**
→ Make sure the `<script src="https://cdn.jsdelivr.net...chart.js...">` line is
present at the top of the file. It requires an internet connection to load.

---

## What "hosting" means and how Netlify works

Right now the site only works on your own computer. "Hosting" means
putting the files on a server so anyone on the internet can access them.

Netlify is a free hosting service. Drag your folder onto their website,
they put it on their servers, and give you a public URL.

Nothing about your files changes. Netlify just serves them the same way
your computer does — it reads the HTML, CSS, and JS files and sends them
to whoever requests them.

Your site will work identically on Netlify as it does on your machine.

---

## Summary: the mental model

Think of it as three layers:

| Layer | File | Job |
|---|---|---|
| **Data** | `js/config.js` | Stores your personal info |
| **Structure** | `.html` files | Defines what content exists and in what order |
| **Style** | `css/style.css` | Controls how everything looks |

When you want to change your email → edit the data layer (`config.js`).
When you want to add a project → edit the structure layer (a `.html` file + one line in `projects.html`).
When you want to change a font or color → edit the style layer (`style.css`).

They're separate on purpose. It's the same principle as separating
design intent from manufacturing process — concerns are kept distinct
so changes in one don't break the others.
