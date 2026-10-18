# Tug of War: CV & Job Interview Challenge

**Nannestad High School — Barbara Anna Zielonka**

An interactive, curriculum-aligned classroom arena designed for high school career readiness, CV writing, the STAR interview method, and professional etiquette. Built with React 19, TypeScript, Tailwind CSS, Web Audio API, and Vite.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 📦 How to Export to GitHub

Follow these quick steps in your terminal to publish the project to GitHub:

### Step 1: Initialize Git and Commit
```bash
# Initialize git repository (if not already initialized)
git init

# Add all files (gitignore already excludes node_modules and temp files)
git add .

# Create the initial commit
git commit -m "Initial commit: Tug of War CV & Job Interview Challenge"
```

### Step 2: Push to GitHub
1. Go to [GitHub](https://github.com/new) and create a new repository (e.g. `tug-of-war-careers`).
2. Run the following commands in your project root (replace `<your-username>` with your GitHub username):

```bash
git branch -M main
git remote add origin https://github.com/<your-username>/tug-of-war-careers.git
git push -u origin main
```

---

## ⚡ How to Deploy to Cloudflare Workers (or Pages)

### Cloudflare Workers CI (Builds with Static Assets)
The repository is fully configured with `wrangler.jsonc` pointing directly to `./dist` with `"not_found_handling": "single-page-application"` and latest `wrangler` in `devDependencies`:

- **Build command**: `npm run build`
- **Deploy command**: `npx wrangler@latest deploy` (or `npx wrangler deploy`)
- **Root directory**: `/`
- **Static Assets Directory**: `./dist` (configured in `wrangler.jsonc`)

The presence of `wrangler.jsonc` and `wrangler` in `devDependencies` guarantees that Cloudflare Workers CI skips all interactive prompts and builds cleanly without npm crashes.

```bash
# 1. Build the production bundle
npm run build

# 2. Deploy the 'dist' directory to Cloudflare Pages
npx wrangler pages deploy dist --project-name=tug-of-war-careers
```

Wrangler will prompt you to log into Cloudflare once and immediately give you a live production URL (e.g. `https://tug-of-war-careers.pages.dev`).

---

## 🛠 Project Architecture

- `src/App.tsx`: Main game loop, turn handover, timer orchestration, keyboard navigation.
- `src/components/ArenaRope.tsx`: Animated braided rope with dynamic tension and physics knot markers.
- `src/components/TeamCard.tsx`: Team scores, streak multipliers, and customizable team names.
- `src/components/QuestionCard.tsx`: Question engine supporting Multiple Choice and Open-ended Teacher Rubric evaluation.
- `src/components/TeacherHubModal.tsx`: Teacher control deck, live knot tuning, and custom JSON question bank import/export.
- `src/components/StudyGuideModal.tsx`: Projectable & printable CV cheat-sheet and STAR method guide.
- `src/components/VictoryModal.tsx`: Confetti celebration and match summary.
- `src/data/defaultQuestions.ts`: 25+ career readiness, ATS, and interview scenarios.
- `src/utils/sound.ts`: 100% synthesized Web Audio API sound effects (no external broken audio dependencies).
- `wrangler.jsonc`: Cloudflare Workers & Static Assets configuration.
- `.nvmrc`: Node 22 LTS configuration.

---

## 📄 Attribution & License
Created for educational use at **Nannestad High School — Barbara Anna Zielonka**.
