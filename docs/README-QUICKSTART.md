# Quickstart Guide
### Get your site running in 20 minutes — no coding knowledge needed

---

## What you have

Open the `portfolio` folder. It looks like this:

```
portfolio/
│
├── index.html          ← Your About / home page
├── projects.html       ← Your Projects list page
├── blog.html           ← Your Blog list page
│
├── css/
│   └── style.css       ← All colors and fonts (don't touch)
│
├── js/
│   ├── config.js       ← ★ YOUR PERSONAL INFO — edit this first
│   └── components.js   ← Auto nav + footer (don't touch)
│
├── projects/
│   ├── airbrakes.html       ← Your current project (fill in your data)
│   ├── cnc-milling.html     ← Example of a finished project page
│   └── template-project.html ← Blank template — copy this for new projects
│
├── blog/
│   ├── tokyo-trip.html      ← Example of a finished blog post
│   └── template-post.html   ← Blank template — copy this for new posts
│
└── assets/
    ├── images/
    │   ├── profile.jpg      ← ★ Put your photo here
    │   ├── projects/        ← Put project images here
    │   └── blog/            ← Put blog images here
    └── resume/
        └── resume.pdf       ← ★ Put your resume PDF here
```

The rule is simple:
- **Your info** (name, bio, email, links) → edit `js/config.js`
- **Your content** (project write-ups, blog posts) → edit the HTML files
- **Your files** (photo, resume, images) → drop them in `assets/`
- **Everything else** → leave it alone

---

## Step 1 — Open the site

Double-click `index.html`. It opens in your browser.

> ⚠️ **Looks broken or unstyled?** That's a browser security restriction.
> Fix it in 2 minutes:
> 1. Download VS Code (free): https://code.visualstudio.com
> 2. Open VS Code → open your `portfolio` folder
> 3. Install the "Live Server" extension (click the Extensions icon on the left sidebar, search "Live Server", click Install)
> 4. Right-click `index.html` → "Open with Live Server"
> 5. Done. The site looks correct and auto-refreshes when you save.

---

## Step 2 — Fill in your info

Open `js/config.js` in a text editor (Notepad, TextEdit, or VS Code).

You'll see something like this:

```
name: "Your Name",
tagline: "Mechanical Engineering · Precision Design · Fluid Systems",
email: "your@email.com",
linkedin: "https://linkedin.com/in/yourname",
```

Change the values between the quotes. That's it.
Save the file. Refresh your browser. Done.

**What each field does:**

| Field | Where it shows up |
|---|---|
| `name` | Nav bar, browser tab, footer |
| `tagline` | Under your name on the About page |
| `email` | Contact list on the About page |
| `linkedin` | Contact list on the About page |
| `github` | Contact list — delete this line if you don't want it |
| `bio` | Paragraphs of text under your photo |
| `resume.file` | The "Download CV" link on the About page |
| `year` | The © year in the footer |

**Bio example** — each item in the list is one paragraph:

```js
bio: [
  "I'm a mechanical engineering student...",
  "Currently working on a rocket airbrakes system...",
],
```

---

## Step 3 — Add your photo and resume

1. Find your profile photo. Crop it to a square if possible (e.g. 400×400 pixels). Name it `profile.jpg`.
2. Copy it into: `assets/images/`
3. Copy your resume PDF into: `assets/resume/` — name it `resume.pdf`

That's it. The site picks them up automatically.

> If you name your files differently, update the filenames in `config.js`:
> ```js
> photo:  "assets/images/my-headshot.jpg",
> resume: { file: "assets/resume/duc-nguyen-cv.pdf" },
> ```

---

## Step 4 — Add your Airbrakes project

Open `projects/airbrakes.html` in your text editor.

Look for lines with `[brackets]` — those are placeholders waiting for your real content.

**Things to change:**

| What you see | What to do |
|---|---|
| `[Your university / team]` | Replace with e.g. `RMIT Rocketry Team` |
| `[X]` or `[Y]` in the table | Replace with your actual numbers |
| The `[bracket]` paragraphs | Replace with your real descriptions |
| `<!-- Add your CAD image... -->` | See "How to add an image" below |

Save. Refresh browser. See the result.

---

## How to add an image to a project or post

1. Copy your image into `assets/images/projects/` (for projects) or `assets/images/blog/` (for blog posts)
2. In your HTML file, find this comment block:

```html
<!--
  Add your CAD image here when ready:
  <img src="../assets/images/projects/airbrakes-cad.jpg" ... />
  <p class="caption">Caption text here.</p>
-->
```

3. Remove the `<!--` at the start and `-->` at the end
4. Change the filename (`airbrakes-cad.jpg`) to match your actual file
5. Update the caption text
6. Save

---

## How to add a new project

1. In your `projects/` folder, copy `template-project.html`
2. Rename the copy — e.g. `bracket-design.html`
3. Open it and fill in the `[brackets]`
4. Open `projects.html` and find the right year block
5. Copy this line:
   ```html
   <li class="entry">
     <span class="entry-date">May</span>
     <a class="entry-title" href="projects/cnc-milling.html">Precision CNC Milling...</a>
     <span class="entry-tag">Machining</span>
   </li>
   ```
6. Paste it at the **top** of that year's list (newest first)
7. Change the date, title, link, and tag to match your new project
8. Save both files

---

## How to add a new blog post

Same idea:

1. Copy `blog/template-post.html` → rename it (e.g. `study-abroad.html`)
2. Write your post — fill in the title, label, and paragraphs
3. Open `blog.html` → find the right year → copy and paste an entry line at the top → update it
4. Save both files

---

## How to go live (free hosting)

When you're ready to share it with the world:

1. Go to **https://app.netlify.com/drop**
2. Drag your entire `portfolio/` folder onto the page
3. Netlify gives you a public URL instantly (e.g. `https://random-name.netlify.app`)
4. You can rename it to something like `https://duc-nguyen.netlify.app` in the settings

Free. No credit card. Takes about 60 seconds.

---

## Things you should NOT change

These files are the engine. If they break, the site breaks.

- `css/style.css` — controls all the colors, fonts, spacing
- `js/components.js` — builds the nav bar and footer automatically

If you accidentally break something, re-download the original from the files Claude provided and replace it.

---

## Quick reference: useful HTML patterns

You'll use these often when writing project pages and blog posts.

**Bold text:**
```html
<strong>This text will be bold.</strong>
```

**Italic text:**
```html
<em>This text will be italic.</em>
```

**Callout box (for key results or tips):**
```html
<div class="callout">
  <strong>Key result:</strong> All tolerances met within ±0.05 mm.
</div>
```

**Image with caption:**
```html
<img src="../assets/images/projects/my-photo.jpg" alt="Description of photo" class="post-image" />
<p class="caption">Figure 1 — What this image shows.</p>
```

**Data table:**
```html
<table class="data-table">
  <thead>
    <tr><th>Parameter</th><th>Value</th><th>Unit</th></tr>
  </thead>
  <tbody>
    <tr><td>Yield strength</td><td>276</td><td>MPa</td></tr>
    <tr><td>Density</td><td>2.70</td><td>g/cm³</td></tr>
  </tbody>
</table>
```

**New section heading:**
```html
<h2>Section Title</h2>
```

**Sub-section heading:**
```html
<h3>Sub-section Title</h3>
```
