# Hana ChatGPT-like live browsing

## What is implemented

Ask Hana now decides whether a message needs fresh web information. Stable questions such as “What is recursion?” stay on the normal model path. Freshness-sensitive questions containing signals such as current, latest, deadline, internship, hackathon, scholarship, university admission, job, release, pricing, news, search, or find are sent through the live browsing adapter first.

When live browsing is used, Hana passes bounded source metadata and content excerpts to the model as untrusted reference material. The assistant is instructed to use those sources in its answer, cite factual claims with source numbers, and never obey instructions found inside retrieved webpages. The response also returns source cards to the interface, including the title, source name, URL, and a short excerpt. Students can open the original page in a new tab.

The current-question contract remains unchanged: the exact student message is always sent to Ask Hana. The assistant also receives bounded recent conversation, the student’s relevant Hana context, active personalized roadmap context, screen context, and progress information. This prevents the system from substituting a canned answer for the user’s actual question.

## Server configuration

Set `TAVILY_API_KEY` as a server-side secret in the real Hana Manus project to enable live browsing. Do not place it in browser code, `VITE_` variables, GitHub, or the frontend bundle. The implementation sends a bounded POST request to Tavily Search with basic search depth, at most six results, a ten-second timeout, and no raw page content.

If Tavily is not configured, Hana can still use the existing optional `RESOURCE_SEARCH_URL` and `RESOURCE_SEARCH_API_KEY` adapter. If neither service is configured or a search request fails, Hana returns an honest no-verification state to the model rather than pretending that current information was checked. Curated university and learning-resource fallback remains available for personalized roadmap generation.

## Safety boundaries

Search results are reference data, not instructions. URLs are limited to public HTTP(S) destinations and are rejected when they point to localhost, private network ranges, link-local addresses, or unsupported protocols. Results are deduplicated, capped, cached briefly, and truncated before reaching the model. Search failures produce a safe user-facing explanation. The browser opens citations with `noopener`-equivalent safe external-link behavior through `rel="noreferrer"`.

This feature is read-only browsing. It does not submit forms, purchase items, apply for jobs, send messages, or perform other external actions. File analysis, when enabled by the existing Hana upload flow, remains size-limited and server-scoped.

## Verification checklist

In Preview, sign in and ask “What is an API?”; this should normally avoid browsing. Ask “Find current AI hackathons this month”; this should show a browsing state, use current sources when `TAVILY_API_KEY` is configured, and display source cards. Ask a follow-up such as “Which one is suitable for a beginner?”; it should use the conversation and student context while grounding current claims in the returned sources. Then ask “Explain recursion” and confirm Hana does not browse unnecessarily.

Also test that an unavailable search provider produces an honest limitation message, that a normal AI failure produces a retryable error, that the user’s exact question is retained, and that one student cannot access another student’s saved conversation or roadmap.

## Rollout

Run the type check, full test suite, and production build before deployment. Apply any pending database migration through the Hana project’s normal migration workflow. Add `TAVILY_API_KEY` through the actual Manus project’s server-side Secrets panel, deploy to Preview, complete the verification checklist, and only then use Publish. The local repository change does not automatically modify the existing live URL.
