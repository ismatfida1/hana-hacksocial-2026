# HackSocial 2026 Deployment Presentation Review

## Overall assessment

The presentation has a clear and responsible structure. It moves from project separation, to architecture, to hosting, to security, to validation, and finally to the remaining release gates. The speaker notes are professional, easy to follow, and appropriately cautious about not calling the project production-ready before real-domain, provider, legal, Google Play, and signed-Android checks are complete.

The current script is suitable for a **5–7 minute technical readiness briefing**. It is stronger as a deployment and release-gate presentation than as a product demo. That is appropriate for the requested topic, but the presenter should avoid describing the current HackSocial roadmap as truly AI-personalized unless that behavior is implemented and tested separately.

## Recommended timing

| Section | Slides | Suggested time | Purpose |
|---|---:|---:|---|
| Opening and separation | Cover–1 | 45 seconds | Establish scope and protect the original HANA project |
| Architecture and hosting | 2–4 | 1 minute 45 seconds | Explain why the app needs full-stack hosting |
| Security and validation | 5–6 | 1 minute 15 seconds | Show the operational safety evidence |
| Evaluator experience | 7 | 45 seconds | Explain the short HackSocial story |
| Release gates and rollout | 8–9 | 1 minute 30 seconds | Distinguish configuration readiness from production clearance |
| Closing | Closing | 30 seconds | State the exact current readiness level |

This pacing totals approximately 6 minutes 30 seconds. If the audience is non-technical, spend less time naming framework components and more time on the simple deployment boundary: separate repository, separate secrets, separate database, and separate domain.

## Slide-by-slide review

| Slide | Review | Status |
|---|---|---|
| Cover | Strong opening. The subtitle correctly frames the deck as a transition from evaluator demo to public full-stack release. | Keep |
| 1. Separation boundary | Clear and important. It accurately emphasizes the copied project, dedicated repository, preserved history, and no force-push. | Keep |
| 2. Full-stack design | Technically useful and accurate. The architecture chain is concise. Explain “tRPC” briefly if the audience is not technical. | Keep with a plain-language phrase |
| 3. Recommended hosting | Correctly recommends a separate managed full-stack deployment and Autoscale for the current workload. The note about external hosts is balanced and not promotional. | Keep |
| 4. Runtime | Strong operational slide. The install/build/start contract is concrete and reproducible. | Keep |
| 5. Secrets | One of the strongest slides. It correctly distinguishes server-only secrets from build-time identifiers and explicitly protects the demo password. | Keep |
| 6. Validation | Good evidence table. Change “production build” in the spoken notes to “local production build” so the audience does not confuse a successful build with a live production deployment. | Required wording refinement |
| 7. Evaluator journey | The stage sequence is easy to remember and matches the implemented stage order. However, the current `demoRoadmap` is a fixed demonstration roadmap, not a roadmap generated from the user’s edited goal. Avoid calling it “personalized” or saying Hana “shaped” it through live AI unless that is implemented. | Required factual refinement |
| 8. Release gates | Excellent honesty. It clearly separates prepared configuration from unresolved real-world release checks. | Keep |
| 9. Verification sequence | Practical and well ordered. It gives the audience a concrete next action without claiming those actions are already complete. | Keep |
| Closing | Accurate and appropriately cautious. “Deployment-ready in configuration” is defensible; “production-ready” would not be. | Keep exactly this distinction |

## Critical factual refinement

The implementation currently defines a fixed `demoRoadmap` with four stages: understand the problem, build a small AI helper, test with examples, and share the result. The student can edit the goal, but the roadmap entries themselves are not generated from that goal. The presentation should therefore use this wording on Slide 7:

> “The evaluator path demonstrates how Hana can take a stated goal through a compact roadmap, mission, question, mastery check, project, opportunity, and progress state.”

Avoid this stronger wording until the roadmap is actually generated from the submitted goal:

> “A participant states a goal and receives a personalized roadmap shaped by Hana.”

The same caution applies to the phrase “personalized path” if it is used to describe the HackSocial demo rather than the broader Hana product.

## Speaker-note improvements

The notes are generally the right length for speaking. The presenter should pause after Slides 1, 5, and 8 because these are the most important trust points. Slide 1 establishes that the original product is protected. Slide 5 establishes that credentials are protected. Slide 8 establishes that local validation is not the same as release clearance.

On Slide 2, replace “typed tRPC procedures” with “typed server routes that connect the screen to the backend” when presenting to a mixed audience. On Slide 6, say “21 Vitest files and 67 automated tests passed locally” rather than simply “the current copied project passes its automated test suite.” This makes the evidence easier to understand and keeps the scope explicit.

On Slide 7, mention that the opportunity link opens the official Devpost hackathon directory, and remind the audience that the page’s rules, eligibility, and dates must still be checked on the official destination. This aligns the spoken claim with the implementation’s actual opportunity card.

## Visual and slide-design recommendations

The current breakdown is content-complete, but the final slides should avoid putting long paragraphs on screen. Keep the detailed wording in presenter notes. Use one architecture diagram on Slide 2, one environment-boundary diagram on Slide 5, and one status table on Slide 8. The remaining slides should use short phrases and large type.

The current script uses Markdown line breaks in a few “On screen” sections. When converting it into actual slides, use separate text blocks or explicit line breaks rather than relying on Markdown whitespace. This will prevent the Browser, Application server, Persistence, and Services lines from collapsing into one paragraph.

Keep the visual language aligned with Hana: warm cream background, restrained lavender and dusty rose accents, sage for verified states, and deep charcoal for readable body text. The deck should feel calm and trustworthy rather than like a generic infrastructure presentation.

## Final recommendation

The presentation is ready to deliver after one factual wording correction: present the HackSocial roadmap as a **compact demo roadmap** rather than claiming it is dynamically personalized from the entered goal. Also change “production build” to “local production build” in the validation narration. These changes preserve the deck’s strongest quality: it communicates what is verified without overstating what remains open.

## Evidence reviewed

This review compares the speaker script with `client/src/pages/HackSocial.tsx`, `client/src/pages/hackSocial.contract.test.ts`, `server/routers.ts`, `DEPLOYMENT_HACKSOCIAL.md`, and the copied project’s latest validation results.
