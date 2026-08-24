# Hana — separate visual prototype

This directory is a separate prototype copied from the published Hana project. The published project at `/home/ubuntu/hana-learning-companion` was not changed by the prototype UI work.

## Direction

The prototype uses a minimal, mobile-first Home screen: Hana’s greeting, one expressive robot moment, Today’s Mission, the duration, the reason, and one Start action. Secondary actions are limited to Ask Hana and Save progress. The supplied Hana robot artwork remains the visual reference through the existing Hana asset, while the layout, color treatment, spacing, and interaction design are original.

Hana’s voice is calm, focused, warm, professional, and occasionally playful. She guides the student like a smart academic and career mentor. The screen does not explain how to use the app; it shows the next useful action.

## Memory

Signed-in users can save university, semester, career, skills, progress, projects, and recent Hana conversations to the account-scoped `hana_student_memory` table. The user can pause memory. Only approved context is sent to Hana’s server-side AI chat procedure. API keys remain server-side.

## Run locally

```bash
pnpm install
pnpm dev
```

The isolated preview was checked at `http://localhost:3001/`. The main mission interaction changes immediately to “Mission in progress” and reveals one small action. Tests, TypeScript, and the production build pass.

No new external API was added. The existing secure server-side LLM layer is sufficient for this prototype.
