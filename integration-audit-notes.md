# Hana Integration Audit Notes

## Sources consulted

- Manus connector configuration guidance: `/home/ubuntu/skills/manus-config/SKILL.md`
- Web LLM integration guidance: `/home/ubuntu/skills/webdev-llm-integration/SKILL.md`
- Canva MCP guidance: `/home/ubuntu/skills/canva-mcp/SKILL.md`
- User-supplied connector and AI integration specification: `/home/ubuntu/upload/pasted_content.txt`

## Current environment presence check

The audit checked only whether variables exist; no secret values were printed.

| Variable | Presence observed |
|---|---|
| OPENAI_API_KEY | present |
| OPENAI_BASE_URL | present |
| OPENAI_MODEL | missing; implementation default is used |
| GEMINI_API_KEY | present |
| GEMINI_MODEL | missing; implementation default is used |
| SUPABASE_URL | present |
| SUPABASE_KEY | present |
| GITHUB_TOKEN | missing in the project shell |
| BUILT_IN_FORGE_API_KEY | present |
| DATABASE_URL | present |

## Current project observations

Hana currently uses a MySQL/Drizzle table named `hana_student_memory` as the application persistence source of truth. The profile JSON includes university, degree, semester, subjects, career, active step, demonstrated and completed skills, weaknesses, completed learning steps, per-step notes and links, projects, portfolio projects, competitions, career readiness, learning time, history, and goals. Account ownership is enforced through protected tRPC procedures.

The server has an explicit provider router in `server/_core/aiProviders.ts`. Its preference order is OpenAI, Gemini, and the built-in Forge fallback by default; it can prefer OpenAI or Gemini through `HANA_AI_PROVIDER`. OpenAI and Gemini calls are server-side. The router records which provider answered and falls back on errors. The main `hana.chat` and `hana.deviseJourney` procedures pass the database student context to the model and instruct Hana not to invent completed skills, university information, opportunities, deadlines, resources, or projects.

The current user-configured connector listing is large and was truncated by the CLI; no matching user-custom connector was found by the initial broad search. GitHub CLI is authenticated as `ismatfida1`, but `GITHUB_TOKEN` was not present in the project shell and the Hana app does not currently contain GitHub API routes. The Canva MCP server is configured and exposes 33 tools, including search, design inspection, upload/import, and export capabilities. It is optional and should not be made a runtime dependency. The user-provided specification requires OpenAI as primary, Gemini optional, Supabase memory where genuinely connected, Web research only with verified sources, GitHub only with authorization, and Canva only for optional visual content.

## Validation observed before further work

`pnpm run check` passed. `pnpm run test` passed with 6 test files and 19 tests. `pnpm run build` passed. The recent logs showed successful `auth.me` requests returning `200` with no authenticated user; the previously reported sign-in failure is at the external Manus OAuth/provider handoff and should not be misreported as fixed by Hana code alone.

## Canva policy constraints

Canva MCP must only be used for explicit Canva work. Before any Canva MCP call, the official Canva usage policy must be read. Canva brand-kit data and template internals cannot be extracted or reused outside Canva. Export requires `get-export-formats` first. A Canva failure must not be described as success.

## Honest coverage boundary

The integration audit must distinguish: connected and working; implemented but requiring user authorization; available as a server credential; optional and not used by normal operation; unavailable in the current project; or not yet implemented. It must not claim Supabase, GitHub, Canva, browser research, voice, file analysis, or a video asset is working unless an actual project route and independent test confirm it.

## Dependency license audit — 2026-08-24

A local inventory scanned 874 installed package records and 91 direct package names from `package.json`. The summary was 686 MIT, 55 Apache-2.0, 79 ISC, 12 BSD-3-Clause, 12 BlueOak-1.0.0, 10 BSD-2-Clause, 2 0BSD, 3 MPL-2.0, 4 Unlicense, 1 CC-BY-4.0, 4 unknown, 1 MIT AND ISC, and several dual-license expressions.

Twenty-six package records were flagged for manual review. The development/tooling packages `@builder.io/jsx-loc-internals`, `@builder.io/vite-plugin-jsx-loc`, and `vite-plugin-manus-runtime` have no package-level license field. `@trapezedev/gradle-parse` and `@trapezedev/project` report `SEE LICENSE`. Several npm packages declare BlueOak-1.0.0, Unlicense, MPL-2.0, CC-BY-4.0, or other non-standard metadata and require notice/terms review.

The highest-priority finding is `khroma@2.1.0`, which is pulled into the production dependency graph through `streamdown -> mermaid -> khroma`. The installed artifact contains an MIT license file, while the current public repository LICENSE.md presents GPL-3.0 and npm metadata reports no declared license. This conflict must be resolved before commercial distribution by verifying the exact release artifact, obtaining clarification, replacing/pinning the dependency, or receiving legal approval. The full machine-readable inventory is in `dependency-license-inventory.json`; the review report is `DEPENDENCY_LICENSE_AUDIT.md`.
