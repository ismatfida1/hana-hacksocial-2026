# Personalized Hana Roadmap

Hana now includes a first release of a personalized learning-journey flow at `/personalize`. It starts with a bounded diagnostic interview, normalizes the learner’s answers, discovers a small set of curated university, documentation, video, and practice resources, and generates a three-milestone journey through the server-side Hana AI helper.

The generated journey is saved as a versioned record for the authenticated student. Each roadmap stores the learner profile version, destination, starting point, rationale, milestones, actions, resource metadata, and quick-check quiz items. Progress events are saved with both the authenticated user ID and roadmap ID. Server procedures verify the user context before reading or writing these records.

## External book links

Students or editors can save a book title, author, reading guidance, and URL as an external resource. Hana stores only that metadata and opens the URL in a new tab. Hana does not download, mirror, host, or extract the book. A title and author should be supplied for every external book record. Official publisher, university library, Open Library, Internet Archive, or other authorized sources should be preferred when available.

The application treats resource pages, video descriptions, and search results as untrusted reference data. They are not instructions to Hana or to the server. The current resource adapter stores short metadata only and does not copy substantial page content.

## Resource discovery configuration

The default implementation uses a curated fallback so the feature works without another provider key. It includes MIT OpenCourseWare, Harvard CS50, University of Michigan Python for Everybody, MDN, Khan Academy, and selected official educational YouTube channels. The app also supports an optional server-side search adapter:

| Variable | Purpose |
|---|---|
| `RESOURCE_SEARCH_URL` | HTTPS-compatible JSON search endpoint that accepts `q` and `limit` query parameters |
| `RESOURCE_SEARCH_API_KEY` | Server-side bearer credential for that search endpoint |
| `HANA_AI_PROVIDER` | Existing provider preference: `auto`, `openai`, `gemini`, or `forge` |
| `OPENAI_API_KEY` / `GEMINI_API_KEY` | Existing server-side provider credentials, if used by Hana’s provider helper |

Do not expose these values through frontend `VITE_` variables or commit them to the repository. If the optional search adapter is not configured, Hana uses the curated catalog and still produces a personalized plan from the learner’s answers.

The optional search endpoint should return JSON shaped like `{ "results": [{ "title": "...", "url": "https://...", "snippet": "...", "source": "..." }] }`. The adapter applies URL checks, private-host blocking, response timeouts, deduplication, and a short in-process cache. A production search provider should also enforce its own rate limits and quota.

## Database migration

The generated migration is `drizzle/0005_bouncy_exiles.sql`. It creates `hana_learner_profiles`, `hana_roadmaps`, and `hana_progress_events`. Apply it through Hana’s normal production database migration workflow after reviewing it against the deployment database. The migration is non-destructive and does not alter the existing `hana_student_memory` table.

## User flow

An authenticated student opens `/personalize` or uses the new Personalize link in the Hana header. Hana asks about the student’s target, subject, current level, evidence, weekly time, preferred formats, university context, and obstacles. After the last answer, the server normalizes the profile, discovers resources, asks the model for structured JSON, validates the model response against known resources, persists the profile and active roadmap version, and renders the journey.

The Ask Hana server procedure now receives the active personalized roadmap as bounded context in addition to the existing Hana student context. The actual current question remains included in the model input. This prevents the assistant from responding with a fixed answer when the provider succeeds and lets the student ask about their current milestone, resources, or next action.

## Current limits and next release

The first release intentionally keeps the diagnostic interview short, uses three milestones, limits resources and quizzes, and adapts through recorded progress events rather than regenerating the entire plan after every click. The next release can add a dedicated quiz-attempt table, an editor-managed resource catalog UI, stronger source-specific university and YouTube adapters, roadmap adjustment controls, a richer progress re-ranker, and periodic resource freshness checks.

Before production rollout, run `pnpm check`, run the full test suite with the repository’s required test-only environment values, run `pnpm build`, apply the migration, verify required server-side AI configuration, and test at least two different student profiles. Confirm that the resulting destinations, milestones, and resource bundles differ. Review the preview before publishing; the implementation does not publish automatically.
