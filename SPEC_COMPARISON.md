# Hana master specification comparison

**Source:** User-provided `HANA — COMPLETE MASTER PRODUCT SPECIFICATION` attachment, reviewed on 2026-08-24.

## Overall answer

The current project is **partly aligned**, not a complete implementation of the specification. The core visual direction, onboarding foundation, career-specific journey model, detailed roadmap cards, curated resources, projects surface, opportunities surface, Ask Hana chat, artwork, signature, and Android build pipeline are present. Several requirements are still prototypes or missing, especially university profile/curriculum lookup, persistent skill states, true cloud memory wiring, GitHub/portfolio data workflows, admin-curated opportunity storage, weekly reports, themes, rewards, room progression, and the second coach role.

## Implemented or substantially aligned

| Specification area | Current state | Evidence |
|---|---|---|
| Calm professional Hana identity | Implemented | `Home.tsx` uses warm cream, rose, lavender, sage, blue, dark ink, Fraunces/Inter styling, simple wording, and robot artwork. |
| Original robot and signature | Implemented | Bundled `/hana-mobile-logo.png` and `/ismat-fida-signature.png` are used by the app shell and About HANA dialog. |
| Greeting-first flow | Implemented | Screen 1 contains greeting, Hana artwork, “How’s your day going?”, and one ready button. |
| Career choices | Partly implemented | Career selection exists after an extra purpose screen; choices include Software Engineering, AI/ML, Cybersecurity, Cloud/DevOps, Data Science, Mobile, and UI/UX. The required direct Screen 2 career-choice-only flow is not exact because the purpose screen comes first. |
| Help me find my path | Partly implemented | Three short visual questions exist, but the specification asks for a richer analysis using interests, coding, AI, creativity, maths/data, security, projects, work style, goals, and dislikes. |
| Create My Own Journey | Partly implemented | A custom goal and starting-level flow exists, but the current mastery evaluation and skip logic are not persisted. |
| Learn a Skill to Earn | Partly implemented | Skill choices and no-income-guarantee wording exist; the complete fundamentals → practice → projects → portfolio → opportunities pipeline is not fully stored and tracked. |
| Career-specific roadmaps | Implemented at prototype level | `shared/hanaJourney.ts` has path-specific prerequisite order and detailed steps for multiple paths. AI Engineering starts with foundations before APIs. |
| Detailed learning step contract | Implemented at UI/model level | Steps include purpose, duration, finish line, prerequisite, practice, mastery check, project result, resource, and next unlock. |
| One best resource rule | Implemented | Roadmap cards use one direct resource by default. The Cisco cybersecurity item now uses the official NetAcad page. |
| Learn → practice → check → unlock flow | Partly implemented | The UI presents this sequence and statuses are generated, but completion is not yet a secure database-backed mastery workflow. |
| Today’s Step and current date | Implemented at prototype level | Home and Journey show the current date and a full-day plan label with a first task. The AI request is not yet driven by complete university/memory/progress data. |
| Projects | Partly implemented | A career-aware project card, milestones, review criteria, README guidance, and Ask Hana handoff exist. Project records, unlocking, submissions, and review history are not persisted. |
| Opportunities | Partly implemented | Four official links exist: GSoC, MLH Hackathons, GitHub Good First Issues, and Devpost. They are static cards, not an admin-curated database with deadlines, eligibility, status, expiry, and demonstrated-skill matching. |
| Ask Hana | Implemented at chat level | Dedicated AI chat uses server-side provider fallback, simple language, Markdown-friendly response instructions, and project/journey context. |
| Android packaging | Implemented | Capacitor Android project and root-level GitHub Actions workflow build and upload a debug APK. |
| About HANA | Implemented | About dialog includes purpose, Ismat Fida signature, and copyright text. |

## Partial or missing requirements

| Specification area | Gap |
|---|---|
| University profile | No user-facing university, degree, or semester collection screen is currently wired into the onboarding flow. |
| Official curriculum lookup | No official-university lookup, parse fallback, subject editor, or semester refresh workflow is implemented. |
| Secure cloud memory | A protected backend memory table and procedures exist, but `Home.tsx` does not currently load/save the student profile and conversation memory through those procedures. |
| Subjects and university context | Not currently passed into journey generation or Today’s Step. |
| Real stored skill states | `locked`, `active`, and `complete` are generated locally by `buildJourney`; they are not yet durable per-user database states with prerequisite enforcement. |
| Mastery checks | Detailed prompts are displayed, but there is no complete answer submission, evaluation, retry, gap diagnosis, and unlock mutation flow. |
| Energy modes | No visible Light / Normal / Deep selector is currently wired into the journey workload. |
| Mathematics track | No dedicated serious maths sequence is currently exposed as its own track. |
| Full AI/ML depth | AI/ML has a useful prototype sequence, but the full specification’s maths, CS, data, deep learning, PyTorch, vision, NLP, transformers, deployment, cloud, and AI application stages are not all represented. |
| Friends and room | No two supporting characters or milestone-changing Hana room system is implemented. |
| Project review | Review text is descriptive; uploaded project evidence, code review workflow, architecture checks, README checks, and stored review results are not complete. |
| GitHub integration | The app links to GitHub and the Android repository, but repository connection, README generation, project metadata, screenshots, licensing checks, and portfolio sync are not implemented in the app. |
| Portfolio | Portfolio preparation is mentioned in the UI but there is no persisted portfolio-entry workflow. |
| Career readiness | No stored readiness evaluation based on demonstrated skills, projects, portfolio, and practical experience. |
| Weekly report | No visual “Your Week with Hana” report is currently implemented. |
| Meaningful progress | A simple progress indicator exists, but not the full skills/projects/university/career-readiness/portfolio progress model. |
| Hana’s Lab | No dedicated Lab surface is currently implemented. |
| Themes | A basic theme context exists in the template, but the specified selectable Warm Cream, Soft Rose, Sage, Lavender, Powder Blue, and Neutral Dark Mode experience is not fully exposed in Hana. |
| Rewards | No meaningful milestone reward system or room-unlock behavior is currently implemented. |
| Refresh/expiry | Resource checks are documented, but there is no automated refresh for learning links or expiry handling for opportunity records. |
| Two coach roles | Ask Hana is one general coach; the separate Career + Earning Coach and University + Career Coach roles are not distinct in the UI or backend. |

## Bottom line

The current app is a **working compact prototype and Android-buildable foundation**, not yet the complete master specification. It follows the specification’s most visible principle—**complexity behind the scenes and simplicity on screen**—but the deeper personalization, university curriculum, secure memory wiring, durable mastery, portfolio, admin opportunities, reports, Lab, themes, rewards, and coaching-role separation still need implementation before calling it the complete final product.
