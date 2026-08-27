# Hana Support Chat

Hana HackSocial already had a secure, project-aware Hana chat foundation. This change extends that existing feature rather than creating a separate application or replacing the learner experience.

## What is implemented

The authenticated `hana.chat` procedure calls the configured provider from the server only. Provider credentials are never included in browser code. Requests are validated with bounded message, mode, and context fields, and Hana’s system prompt keeps the assistant scoped to learning, code help, projects, careers, and verified resources. The existing provider chain can use the configured external provider and the built-in Hana AI fallback according to the server environment.

Conversation history is stored in the existing `hana_student_memory` record under the authenticated user ID. Every read, clear, delete, upload, and chat mutation is protected by the existing `protectedProcedure` boundary and uses `ctx.user.id`; there is no client-provided owner ID. The Home screen now hydrates the visible chat from saved history after sign-in, so a learner can continue after a refresh or on another device.

The Ask Hana workspace now includes **New chat**, which clears only the user’s saved conversation after confirmation, and **Retry**, which calls a dedicated server retry procedure. Retry looks up the last user message inside that same authenticated user’s saved history and stores only the new Hana reply, preventing duplicate user messages. Provider failures are shown as short, safe user-facing messages rather than raw provider details.

## Key files

| File | Responsibility |
| --- | --- |
| `server/_core/aiProviders.ts` | Server-only OpenAI, Gemini, and built-in provider routing |
| `server/routers.ts` | Protected `hana.chat`, `hana.retry`, and memory procedures |
| `server/studentContext.ts` | Hana context construction and bounded conversation persistence |
| `server/db.ts` | User-scoped memory and conversation database helpers |
| `drizzle/schema.ts` | Existing `hana_student_memory` persistence model |
| `client/src/pages/Home.tsx` | History hydration, send, retry, reset, and error state |
| `client/src/components/AIChatBox.tsx` | Responsive message UI, composer, suggested prompts, file input, and accessible loading state |

## Required configuration

No provider key should be placed in `client/` or exposed through a `VITE_` variable. Configure provider values on the server/deployment environment only. The current provider helper recognizes `HANA_AI_PROVIDER` as `auto`, `openai`, `gemini`, or `forge`, plus the provider-specific model and base URL variables already used by the project. The built-in Manus gateway is available through the project’s existing server environment.

The repository also has existing release-contract tests that require `HANA_DEMO_PASSWORD` and `HANA_PRIVACY_CONTACT` in the test/deployment environment. Use real deployment values for production and test-only values locally; never commit secrets.

## Safe rollout

Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test`, and `pnpm build`. Review the Ask Hana flow while signed in, send a question, refresh to confirm persistence, use New chat to confirm reset, and force a failed request if a staging provider is available to verify the safe error state. Review the diff before committing. Deploy through the project’s existing production process only after review; this repository change does not publish automatically.

## Scope and limitations

Hana is an educational companion, not a source of official university or career guarantees. It should not invent deadlines, requirements, resources, or completed skills. The current UX shows a clear drafting state while the server request is in progress. It does not stream individual tokens because the existing provider contract returns a completed response; an SSE or equivalent streaming contract can be added later without exposing provider credentials.
