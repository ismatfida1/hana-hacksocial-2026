# HANA Master Acceptance Matrix

**Audit date:** 2026-08-24  
**Project:** `hana-learning-companion`  
**Purpose:** Consolidate the user-supplied product, Journey, AI, integration, memory, Android, and commercial-readiness requirements into one honest pre-publish record.

> Status labels mean: **Verified** = supported by code and validation; **Partial** = some behavior exists but the full requirement is not complete; **Blocked** = dependent on an external service, quota, authorization, or unavailable project asset; **Not started** = no sufficient implementation evidence yet; **Review required** = technical evidence exists but legal/provider/user review is still necessary.

## Product and interaction

| Area | Acceptance requirement | Current status | Evidence or limitation |
|---|---|---|---|
| Brand | Hana is a calm, professional, cute robot companion with Ismat Fida branding | Verified | Existing Home shell, Hana artwork, signature asset, About HANA surface |
| Greeting | First screen is greeting-only with one ready action | Verified | Greeting-first client flow |
| Career choice | Career choice occurs after greeting and offers predefined paths plus help-me-find-my-path | Partial | Flow exists, but exact screen sequencing may still include an extra purpose step |
| Custom path | Student can describe a custom goal instead of choosing only predefined areas | Partial | Custom goal state exists; deeper adaptive coverage remains limited |
| Simple language | Short, friendly explanations with one idea at a time | Verified at prompt/UI level | `hanaSystemPrompt` and compact cards enforce this; live provider behavior still needs integration testing |
| Progressive disclosure | Summary first; Further info, Learn more, Example, Test me, and details only on tap | Verified in Journey/Projects/Opportunities cards | Click-to-expand details are present; broader Ask Hana action chips remain partial |
| Home | Home mainly answers “What should I do today?” | Partial | Today’s finish line is present, but the shell still carries some additional controls |
| Main navigation | Home, Journey, Projects, Opportunities, Profile; Ask Hana at top | Verified | AppShell navigation and top Ask Hana action |
| Demo | Private password-gated demo with isolated data | Verified at code/test level | Server-side password verification and read-only demo controls |
| Demo guide | Interactive guide with Hana expressions, arrows, stages, progress bar, skip, replay | Verified | DemoTour component and published checkpoint |
| Demo video | 45-second silent vertical product introduction | Blocked | Video quota was exhausted; no real video is claimed as available |

## Journey and learning

| Area | Acceptance requirement | Current status | Evidence or limitation |
|---|---|---|---|
| Career map | Connected high-level path from foundations to career | Verified at prototype level | Roadmap.sh-inspired phase map and source note |
| Layered Journey | Career → Topic → Subtopic → Learning drill-down | Partial | Layered renderer exists, but subtopics are derived from existing step data rather than a complete hierarchical curriculum |
| Visual states | Complete, current, upcoming, locked, recommended, needs review | Partial | Complete/current/upcoming/locked are represented; recommended/needs-review logic is not comprehensive |
| Filters | All, Pending, Completed roadmap filters | Verified | Compact filter controls in Journey |
| Checkboxes | Step completion saves to account and updates progress | Verified at code/test level | Protected mutation, deduplication helper, read-only Demo Mode |
| Mastery | Student answer is evaluated before skill is treated as demonstrated | Partial | Server mastery procedure and tests exist; full adaptive retest/diagnosis experience is still limited |
| Prerequisites | Future skills explain missing prerequisites and do not unlock too early | Partial | Prompt and deterministic roadmap rules exist; complete durable prerequisite graph is not finished |
| Resources | Free document, YouTube, university lesson, and backup links | Partial | Labeled resource cards exist for steps; full link-health automation is not implemented |
| Notes and links | Per-step personal note and link saved to account | Verified at code level | Protected save procedure and profile JSON fields |
| Projects | Small project after steps and larger portfolio projects | Partial | UI and tracking fields exist; full project gates, submissions, review history, and portfolio workflow remain incomplete |
| Adaptive curriculum | Path differs by career, degree, semester, skills, and evidence | Partial | Career-specific deterministic paths and AI journey generation exist; coverage is not complete for all 60-feature expectations |
| Energy | Light, Normal, Deep modes adjust workload | Partial | Energy state exists and saves; full workload adaptation needs further validation |
| University | Optional university, degree, semester, subjects context | Partial | Fields and context exist; official curriculum lookup and semester refresh are not implemented |
| Reports | Weekly learning report and career readiness view | Partial | Server helpers exist; dedicated complete UI/report workflows are limited |
| Rewards and room | Meaningful visual growth, Hana room, poses, expressions, unlockables | Partial | Expressions and demo visuals exist; full persistent room progression is not complete |

## AI and integrations

| Integration or feature | Acceptance requirement | Current status | Evidence or limitation |
|---|---|---|---|
| OpenAI | Main server-side AI brain for coaching and explanations | Available and implemented | `server/_core/aiProviders.ts`; `OPENAI_API_KEY` present in audit environment; provider terms require review |
| Gemini | Optional provider/fallback for AI work | Available and implemented | Gemini provider route and tests; `GEMINI_API_KEY` present; provider terms require review |
| Built-in Forge | Safe fallback provider | Available and implemented | Existing `invokeLLM` fallback and server credential |
| Context layer | Every personalized AI request receives real student context | Verified at code/test level | `buildHanaContext`, formatter, router prompt, eight-module routing tests |
| Ask Hana | Context-aware chat, short headings, bullets, simple language, confusion recovery | Partial | Context-aware chat and modes exist; explicit Further info/Example/Test me/I’m confused UI actions remain to be expanded |
| File analysis | Upload code/text to cloud memory and analyze it | Not started or unverified | Storage helpers exist, but no complete user-facing upload and analysis workflow is evidenced |
| Voice | Voice interaction | Not started or unverified | Voice helper exists in template; no complete Hana UI workflow is evidenced |
| Web research | Verified external sources and resource checking | Partial | Curated official links exist; no live research connector or automated link checker is evidenced |
| Supabase | Supabase Auth/database as the primary memory backend | Not connected in current source | Environment variables are present in the audit shell, but Hana source uses MySQL/Drizzle for account memory and has no Supabase client/routes |
| GitHub | Repository connection, project metadata, portfolio sync, licensing checks | Authorization-required / partial | GitHub CLI is authenticated for `ismatfida1`; current Hana app has no GitHub API workflow or in-app OAuth route |
| Canva | Optional visual-content workflow | Available as configured MCP, not runtime dependency | Canva MCP exposes tools; no normal Hana runtime feature depends on it; use requires explicit Canva action and policy compliance |

## Authentication, memory, and security

| Area | Acceptance requirement | Current status | Evidence or limitation |
|---|---|---|---|
| Account session | Keep user signed in securely across reopen | Implemented in architecture; external sign-in currently unreliable | Manus OAuth callback creates one-year HTTP-only session cookie; provider handoff has produced user-reported failures |
| OAuth state | Protect callback against CSRF | Verified at code level | Nonce bound to `__Host-oauth_state` cookie and state validation |
| Cookie policy | Secure proxy-aware session cookie | Partial | Production HTTPS uses secure cookie; local non-HTTPS uses `SameSite=None` with `secure=false`, which should be reviewed for browser compatibility |
| Account memory | Persist profile, journey, progress, projects, links, preferences, history | Verified at code level | MySQL/Drizzle `hana_student_memory` and protected procedures |
| Chat separation | User can view/delete chat history without deleting progress memory | Partial | Conversations are stored separately in the same record, but a dedicated user-facing chat-history delete action is not yet evidenced |
| Ownership | Users access only their own memory | Verified at procedure level | Protected tRPC procedures use `ctx.user.id` |
| Demo isolation | Demo cannot write to real memory | Verified | Demo handlers omit protected mutations and checkbox handlers are read-only |
| API keys | No provider secrets in client | Verified by source review | AI calls are server-side; no client provider key was found in audited source |
| Security headers | CSP, frame, referrer, content-type protections | Verified at runtime logs | Published responses show CSP, `X-Frame-Options: DENY`, `nosniff`, and strict referrer policy |
| Rate limiting | Basic request protection | Implemented at prior checkpoint | Existing server hardening; full abuse testing remains limited |

## Android and deployment

| Area | Acceptance requirement | Current status | Evidence or limitation |
|---|---|---|---|
| Capacitor | Existing web app packaged without replacing architecture | Verified | `capacitor.config.ts`, Capacitor dependencies |
| Android platform | Repository contains generated Android project | Fixed during audit | `android/` was missing initially; generated with `pnpm exec cap add android` |
| Actions workflow | Root `.github/workflows/android-build.yml` builds debug APK | Present but local build blocked | Workflow installs Java 21, Node 22, Android API 36, dependencies, sync, and APK artifact |
| Local APK | Debug APK actually generated | Blocked in sandbox audit | First failure was missing JDK compiler; after installing JDK 21, Gradle still reported Android SDK/toolchain capability failure. Do not claim APK success |
| Website | Production build deployable | Verified | `pnpm run build` passed during audit |
| Auto-publish | Checkpoint publishes current app | Enabled | Project metadata states auto-publish is enabled |

## Commercial readiness

| Area | Acceptance requirement | Current status | Required next action |
|---|---|---|---|
| Ownership record | Track provider, license, commercial use, attribution | In progress | Complete dependency and asset inventory; retain repository and design records |
| Open-source licenses | Audit all direct and transitive packages | In progress | Run a full lockfile license inventory and manually review ambiguous packages |
| AI provider terms | Confirm commercial API use and data processing | Review required | Review current OpenAI, Gemini, Manus, and hosting terms for intended jurisdiction/use |
| Canva assets | Confirm each asset’s license | Review required | Record asset origin/license; do not claim third-party artwork as original |
| Privacy policy | Explain collection, storage, AI processing, retention, and deletion | Not evidenced as complete | Prepare jurisdiction-appropriate policy with legal review |
| Terms of service | Cover accounts, AI limits, user content, IP, termination, refunds | Not evidenced as complete | Prepare product-specific terms with legal review |
| Account deletion | Securely delete account data and user-visible chat history | Not complete | Implement and test deletion flow before charging users |
| Commercial launch | Sell subscriptions, licenses, or software only after due diligence | Not cleared | Obtain provider/license/legal review; this matrix is not legal clearance |

## Validation evidence recorded

- `pnpm run check` passed.
- `pnpm run test` passed with 6 files and 19 tests at the time of the audit.
- `pnpm run build` passed for the web application.
- Runtime logs showed successful `auth.me` requests with no authenticated user in the inspected browser session; this does not prove the external OAuth provider is healthy.
- The generated Android project was synchronized successfully, but the local debug APK build did not complete successfully and remains unclaimed.

## Publication gate

Hana should not be described as the complete final product until all **Partial**, **Blocked**, **Not started**, and **Review required** items are either implemented and independently validated or clearly accepted as external/user/legal limitations. A publishable checkpoint may contain known limitations only when the release report states them explicitly; it must not claim features or integrations that the code and tests do not prove.
