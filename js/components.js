/* ============================================================
   js/components.js — Shared nav + footer
   YOU DON'T NEED TO EDIT THIS FILE.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const path = window.location.pathname;

  // Detect depth — are we in a subfolder?
  // Root pages:          /index.html  or  /
  // Folder index pages:  /projects/   or  /blog/
  // Article pages:       /projects/airbrakes.html  or  /blog/tokyo-trip.html
  const inProjects = path.includes('/projects/');
  const inBlog     = path.includes('/blog/');
  const inSubdir   = inProjects || inBlog;

  // Prefix to reach root-level files (css, js, assets)
  const root = inSubdir ? '../' : '';

  // Active nav detection
  const isAbout    = !inProjects && !inBlog;
  const isProjects = inProjects;
  const isBlog     = inBlog;

  /* ---- NAV ---- */
  const navEl = document.getElementById('site-nav');
  if (navEl) {
    navEl.innerHTML = `
      <div class="nav-inner">
        <a href="${root}index.html" class="nav-brand">${SITE.name}</a>
        <button class="nav-toggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links">
          <li><a href="${root}index.html"          ${isAbout    ? 'class="active"' : ''}>About</a></li>
          <li><a href="${root}projects/index.html" ${isProjects ? 'class="active"' : ''}>Projects</a></li>
          <li><a href="${root}blog/index.html"     ${isBlog     ? 'class="active"' : ''}>Blog</a></li>
        </ul>
      </div>`;

    const toggle = navEl.querySelector('.nav-toggle');
    const links  = navEl.querySelector('.nav-links');
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open')));
  }

  /* ---- FOOTER ---- */
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    const note = SITE.footerNote ? ` · ${SITE.footerNote}` : '';
    footerEl.innerHTML = `<p>© ${SITE.year} ${SITE.name}${note}</p>`;
  }

  /* ---- ABOUT PAGE ---- */
  const aboutPage = document.getElementById('about-page');
  if (aboutPage) {

    const photoEl = document.getElementById('about-photo');
    if (photoEl) {
      photoEl.src = root + SITE.photo;
      photoEl.alt = SITE.photoAlt;
    }

    const nameEl = document.getElementById('about-name');
    if (nameEl) nameEl.textContent = SITE.name;

    const taglineEl = document.getElementById('about-tagline');
    if (taglineEl) taglineEl.textContent = SITE.tagline;

    const bioEl = document.getElementById('about-bio');
    if (bioEl) bioEl.innerHTML = SITE.bio.map(p => `<p>${p}</p>`).join('');

    const resumeEl = document.getElementById('about-resume');
    if (resumeEl && SITE.resume) {
      resumeEl.href        = root + SITE.resume.file;
      resumeEl.textContent = SITE.resume.label;
    }

    const emailEl = document.getElementById('contact-email');
    if (emailEl) {
      emailEl.href        = `mailto:${SITE.email}`;
      emailEl.textContent = SITE.email;
    }

    const linkedinEl = document.getElementById('contact-linkedin');
    if (linkedinEl) linkedinEl.href = SITE.linkedin;

    const githubEl = document.getElementById('contact-github');
    if (githubEl) {
      if (SITE.github) {
        githubEl.href = SITE.github;
      } else {
        const li = githubEl.closest('li');
        if (li) li.remove();
      }
    }
  }

  /* ---- PAGE TITLE ---- */
  const pageTitle = document.body.getAttribute('data-title');
  document.title = pageTitle ? `${pageTitle} — ${SITE.name}` : SITE.name;

});
