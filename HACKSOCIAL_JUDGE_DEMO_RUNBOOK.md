# HackSocial 2026 — Judge Demo Runbook

## Demo goal

Show how Hana moves a student from one learning goal to a small piece of evidence they can build and share. Use the copied HackSocial project only. This is a short Demo Mode journey and does not write activity to a real student account.

## Before starting

Open the separate HackSocial deployment or local preview. Enter the existing authorized demo/sign-in flow. Do not bypass authentication. Confirm that the page header says **HackSocial 2026 · Demo Mode** after entering the experience.

## Recommended 2–4 minute path

### 1. State the goal

Say: “I want to help students choose what to learn next.”

Point out that the goal field is demo-only and is not saved to a real learner account. Continue to the compact demonstration roadmap.

### 2. Show the roadmap

Explain the four visible demonstration steps:

1. Understand the problem.
2. Build a small AI helper.
3. Test with real examples.
4. Share the result.

Use the phrase **compact demo roadmap**. Do not say that this current demonstration dynamically generates roadmap steps from the typed goal.

### 3. Start the mission

Show the mission: build the first question screen. The learner writes three questions a student might ask and chooses one answer Hana should make simpler. Point out that there is no fixed deadline.

### 4. Ask Hana

Ask: “What should I build first?”

If live AI is configured and available, show the returned Hana response. If the response says that live AI is unavailable, explain that the fallback is intentionally truthful and that the demo does not pretend a non-AI answer came from a live provider.

The demo chat is non-persisting. It does not save the question to personal memory or change a real student profile.

### 5. Complete mastery

Choose: “Use three small examples and compare the answers.”

Explain that the mastery gate prevents the demo from moving forward until the learner shows understanding. The incorrect choice remains available and produces a supportive retry message.

### 6. Show the project

Continue to **Build**. Show **Student Next-Step Helper** and explain that it is a small project: a page where a student enters a question and receives one clear next action.

This stage is part of the actual demo order and should appear before the opportunity stage.

### 7. Open the opportunity

Continue to **Explore** and open the official Devpost hackathon directory. Tell the judge that dates, rules, and eligibility must be checked on the official page before applying.

### 8. Finish on progress

Continue to **Progress**. Show the completion message and the next action: build the first version of the helper. The demo ends with a clear action rather than a claim that a real user account has been updated.

## What the judge should see

| Demonstration point | Verified behavior |
|---|---|
| Entry point | HackSocial is launched from the existing Hana shell |
| Flow | Goal → Roadmap → Mission → Ask Hana → Mastery → Project → Opportunity → Progress |
| Authentication | Existing sign-in/authorized-demo boundary remains in place |
| Demo data | Goal, question, mastery, and progress remain in isolated component state |
| AI | Server-side demo procedure uses live AI when available and identifies fallback when unavailable |
| Opportunity | Official Devpost directory link with rules/eligibility reminder |
| Safety | No demo conversation or profile update is written to real student memory |

## Do not claim yet

Do not claim that the current demo is a dynamically AI-generated personalized roadmap. Do not claim that a permanent public production domain has been verified. Do not claim that OAuth callback behavior, production database isolation, deletion behavior, provider terms, licensing, Google Play declarations, or signed AAB scanning are complete until those real release gates are tested.

## Recovery if something is unavailable

If live AI is unavailable, continue the demo and state: “The live provider is unavailable in this environment, so Hana is showing a truthful fallback instead of pretending this response came from live AI.”

If the official opportunity page is unavailable, do not invent a replacement deadline or eligibility rule. Record the link-health issue and use the project’s verified resource-failover process for the final deployment.

## Evidence files

The implementation is in `client/src/pages/HackSocial.tsx`, the non-persisting server procedure is in `server/routers.ts`, and the core contract is covered by `client/src/pages/hackSocial.contract.test.ts`.
