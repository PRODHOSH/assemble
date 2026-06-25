# Contributing to Assemble

Thank you for taking the time to contribute. Assemble is an open-source project built by and for the developer community — every pull request, issue, and discussion helps make team building and project launching smoother for builders everywhere.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [AI Policy](#ai-policy)
- [How Can I Contribute?](#how-can-i-contribute)
- [Tech & Design System](#tech--design-system)
- [Local Setup](#local-setup)
  - [1. Fork and Clone](#1-fork-and-clone)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Set Up the Database](#3-set-up-the-database)
  - [4. Environment Variables](#4-environment-variables)
  - [5. Run the Dev Server](#5-run-the-dev-server)
- [Database — Schema Changes](#database--schema-changes)
- [Branch Naming](#branch-naming)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Good First Issues](#good-first-issues)
- [Questions](#questions)

---

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

---

## AI Policy

We encourage the responsible use of AI tools (like Gemini, Claude, or ChatGPT) to help write, optimize, or debug code, but we expect transparency and full understanding:

1. **Be transparent:** In your PR description, mention if you used AI to write or debug code (e.g., *"Used Gemini to optimize the workspace creation logic"*).
2. **Understand the code:** Do not submit code you do not understand. You should be able to answer:
   - What does this code do and why did you choose this implementation?
   - What files/functions did it impact?
   - What potential side-effects or edge-cases might it introduce?
3. **Write your own descriptions:** Your PR and issue descriptions must be written in your own words. Do not copy-paste AI-generated summaries.
4. **No AI spam:** Vague "fix bugs" PRs containing copy-pasted code changes without testing or clear explanation will be closed immediately.

---

## How Can I Contribute?

### Fix a Bug
Look for open issues labeled `bug`. Comment on the issue to claim it before starting your work.

### Build a Feature
Browse open issues labeled `enhancement`. Comment on the issue, explain your proposed approach briefly, and wait to be assigned before writing code.

### Improve Documentation
Found a typo, outdated instruction, or unclear explanation? You do not need to open an issue for documentation tweaks — feel free to submit a pull request directly.

### Report a Bug
If you find a bug, open an issue using our **Bug Report** template. Provide clear steps to reproduce, expected behavior, and screenshots or logs if applicable.

### Suggest a Feature
Have an idea to make Assemble better? Open an issue using the **Feature Request** template. Focus on explaining the problem your feature solves rather than just the feature itself.

---

## Tech & Design System

Assemble uses a modern, cohesive tech stack. When modifying or adding UI components:
- **Tailwind CSS:** Use Tailwind for all custom styling. Avoid inline styles or custom utility classes.
- **shadcn/ui & Lucide Icons:** We use `shadcn/ui` for primitives (dialogs, buttons, dropdowns) and `lucide-react` for iconography. Before creating a custom UI component, check if a shadcn block or component already exists.
- **TypeScript:** The codebase is strictly typed. Avoid `any` types; define interfaces or types for API responses and component props.

---

## Local Setup

### 1. Fork and Clone

Fork the repository on GitHub, then clone your fork:

```bash
git clone https://github.com/<your-username>/assemble.git
cd assemble
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

Assemble uses **Supabase** (PostgreSQL) for database tables, authentication, and security.

#### Option A — Supabase Dashboard (Easiest)
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to your project dashboard → **SQL Editor** → **New Query**.
3. Copy the contents of the database schema (usually found in `supabase/schema.sql`), paste it into the editor, and click **Run**.
4. All tables, views, and row-level security (RLS) policies will be created.

#### Option B — Supabase CLI (Local Docker Setup)
*Note: This requires Docker to be installed and running.*
```bash
# Install Supabase CLI globally
npm install -g supabase

# Start local Supabase environment
supabase start

# Apply local migrations and seed data
supabase db reset
```

---

### 4. Environment Variables

Copy the example environment variables file:

```bash
cp .env.example .env.local
```

Open `.env.local` and configure the following variables:

| Variable | Description / Source |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL (Dashboard → Project Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key (Dashboard → Project Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (Keep private, used in backend/cron routes) |
| `NEXTAUTH_SECRET` | Secret for auth session tokens (Generate using `openssl rand -base64 32`) |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog Project API Key (PostHog Dashboard) |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog Host URL (usually `https://us.i.posthog.com` or `https://eu.i.posthog.com`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name (Cloudinary Dashboard) |
| `CLOUDINARY_API_KEY` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret |
| `RESEND_API_KEY` | Resend API Key for sending emails (Resend Dashboard) |
| `GITHUB_ACCESS_TOKEN` | GitHub Personal Access Token or App Token with organization & repo creation rights |
| `DISCORD_BOT_TOKEN` | Discord Bot Token with permissions to create guilds/channels and generate invite links |
| `CALCOM_API_KEY` | Cal.com API key for scheduling shortlisted candidate discussions |

*Note: GitHub OAuth is typically configured directly inside Supabase Auth under **Authentication → Providers → GitHub**.*

---

### 5. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see Assemble running locally.

---

## Database — Schema Changes

The database schema is kept in source control under the `supabase/` directory:
- `supabase/schema.sql`: The master schema representation.
- `supabase/migrations/`: Sequential migration files.

### Schema Change Guidelines
- **Do not edit existing migration files** in `supabase/migrations/` as they represent historical state.
- Create a new migration file:
  ```bash
  supabase migration new your_change_description
  ```
- Write your SQL adjustments in the new migration file.
- Update `supabase/schema.sql` to reflect your changes so that new developers setting up via SQL Editor get the latest schema.

---

## Branch Naming

We use clean and structured branch names using the format `type/short-description`:

| Prefix | Use Case |
|---|---|
| `feat/` | A new feature or capability |
| `fix/` | A bug fix |
| `docs/` | Documentation improvements only |
| `refactor/` | Code structure cleanups, no feature changes |
| `chore/` | Configuration updates, package dependency updates, CI/CD changes |
| `test/` | Adding or correcting test suites |

Examples: `feat/discord-workspace-setup`, `fix/supabase-auth-redirect`, `docs/contributing-instructions`.

---

## Commit Messages

We follow the **Conventional Commits** standard:

```text
type(scope): clear description under 72 characters
```

Examples:
- `feat(auth): integrate supabase oauth login`
- `fix(dashboard): resolve application status badge color`
- `docs(readme): update environment variable table`
- `chore(deps): upgrade next.js version`

---

## Pull Request Process

1. **Get assigned first:** Do not open a PR without being assigned to the corresponding issue first.
2. **Keep it focused:** One logical feature or fix per pull request. Avoid mixing unrelated changes.
3. **Use the PR template:** Fully fill out the pull request template provided when opening a PR.
4. **Be patient:** Maintainers will review your PR within 12-24 hours. Please do not ping maintainers immediately after opening a PR.

### PR Checklist
- [ ] I am assigned to the issue linked to this PR.
- [ ] Code builds and runs cleanly locally.
- [ ] No debug console logs are left in active code.
- [ ] Database migrations are included if the schema was updated.
- [ ] Documentation is updated if the feature changes setup or configuration.
- [ ] Commit history is clean and follows conventional formats.
- [ ] If AI was used, it is clearly noted in the PR description.

---

## Issue Guidelines

- **Search for existing issues:** Before filing a bug report or requesting a feature, search open and closed issues to check for duplicates.
- **Provide context:** Use the templates provided. Clear descriptions make fixing bugs or discussing features much faster.
- **Do not self-assign:** If you open an issue and wish to work on it, leave a comment asking to be assigned.

---

## Good First Issues

If you're looking for an entry point:
- Look for issues labeled `good first issue`. These are beginner-friendly with a narrow scope.
- Look for issues labeled `documentation`. These are great for learning the codebase flow.

---

## Questions?

If you have questions, feel free to open a **Discussion** on GitHub or ask inside the team's Discord server. For urgent, non-public inquiries, contact the project maintainers directly.
