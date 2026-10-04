# luistorresphd.com

Personal site of Luis Torres, PhD: medical physicist and Senior Scientific
Solutions Engineer at Flywheel. Live at [luistorresphd.com](https://luistorresphd.com).

Static site built with [Astro](https://astro.build), deployed to GitHub Pages.
Pages ship as plain HTML; the only JavaScript is the theme toggle, the hero
k-space animation, and the publication/recipe filters.

## Develop

Requires Node 24.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check (astro check) and build to dist/
npm run preview   # serve dist/
npm run format    # prettier
```

## Where the content lives

| Content          | File                            |
| ---------------- | ------------------------------- |
| Name, links, nav | `src/data/site.ts`              |
| Résumé           | `src/data/resume.ts`            |
| Publications     | `src/content/publications.json` |
| Projects         | `src/content/projects.json`     |
| Recipes          | `src/content/recipes/*.md`      |
| Profile photo    | `src/assets/profile-photo.jpg`  |
| Colors, type     | `src/styles/tokens.css`         |

Collections are validated against the schemas in `src/content.config.ts`, so a
typo in a field fails the build.

**Publications.** Authors are written as `Surname Initials`; any author starting
`Torres L` is shown in bold. Set `selected: true` to show an entry on the home
page and `coFirst: true` for shared first authorship. Citation totals and the
h-index are computed from the file.

**Recipes.** One markdown file per recipe with `title`, `description`, `tags`
and `dateAdded` frontmatter, then `## Ingredients`, `## Instructions` and
optional `## Notes` sections. Ingredient and instruction lists also feed the
page's recipe structured data.

## Scripts

| Command                                     | What it does                                                                                             |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `node scripts/resume-pdf.mjs`               | Prints `/resume/` to `public/luis-torres-resume.pdf` with headless Chrome. Run `npm run preview` first.  |
| `uv run python scripts/update_citations.py` | Updates citation counts in `publications.json` from Google Scholar and lists papers not yet in the file. |
| `node scripts/og-image.mjs`                 | Regenerates the social preview image `public/og-default.png`.                                            |
| `node scripts/build-fonts.mjs`              | Regenerates `src/styles/fonts.css` (Latin-only font faces) after a font package upgrade.                 |

After editing the résumé, rebuild, run the preview, and regenerate the PDF.

## Deployment

`.github/workflows/deploy.yml`:

- **Push to `main`:** format check, build, deploy to GitHub Pages.
- **Pull requests:** format check, build, and Lighthouse CI against the budgets
  in `lighthouserc.json` (accessibility 100, performance ≥ 90, CLS ≤ 0.05).
  Reports are attached to the run as an artifact.
- **Weekly (Mondays):** rebuild and deploy, which refreshes the GitHub/GitLab
  contribution heatmap on the Work page.

The heatmap is fetched at build time from the public GitHub and GitLab
calendars. If either is unreachable the build continues and the section is
omitted.
