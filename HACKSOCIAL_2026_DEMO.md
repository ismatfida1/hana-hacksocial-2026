# HackSocial 2026 Demo

Hana’s copied HackSocial experience is an isolated evaluator journey inside the separate project at `/home/ubuntu/hana-learning-companion-copy`. The original Hana project is not part of this implementation.

## Demo story

The primary flow is intentionally short: a student states a goal, reviews Hana’s compact demonstration path, starts a small mission, asks Hana for guidance, completes a mastery check, receives a buildable project idea, explores an official opportunity page, and ends with a clear next action. The experience is labeled **HackSocial 2026 · Demo Mode** so evaluators can distinguish it from a real learner account.

## Data boundaries

The demo goal, question, mastery selection, and progress are held in the isolated demo component state. The HackSocial demo chat calls a public server procedure that does not save conversation history, change a profile, or write to the student database. The server passes only the demo context required for the response. If the configured AI provider is unavailable, the interface displays a truthful fallback message and does not present it as a live response.

The existing Hana authentication and authorized-demo flow remain intact. This feature does not create a sign-in bypass, commit credentials, or expose provider keys in the browser.

## Main implementation files

| File | Responsibility |
|---|---|
| `client/src/pages/HackSocial.tsx` | Staged evaluator experience, progress indicator, demo-only state, project and opportunity content |
| `client/src/pages/Home.tsx` | Visible HackSocial launcher and parent screen routing |
| `server/routers.ts` | Non-persisting `hana.demoChat` procedure with live-AI and truthful fallback behavior |
| `client/src/pages/hackSocial.contract.test.ts` | Regression coverage for stage order, isolation language, entry point, official link, and AI fallback contract |

## Separate deployment preparation

The source is synchronized to `ismatfida1/hana-hacksocial-2026` on `main`. Use the existing full-stack Manus runtime for a deployment rather than converting the project to a static export. Configure production secrets through the project’s secure settings, run the complete validation suite, and verify the sign-in and AI provider configuration on the separate public domain before presenting it as a live demo.

The current public repository is separate from the original HANA repository. Do not force-push, reset, delete history, or copy environment files into it.
