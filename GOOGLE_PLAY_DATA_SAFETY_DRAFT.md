# HANA Google Play Data Safety Draft

**Status:** Draft for the exact final APK/AAB; not a completed Play Console submission.  
**Owner/operator:** Ismat Fida  
**Privacy contact:** ismat542008@gmail.com

Google Play declarations must match the exact release artifact, enabled SDKs, backend configuration, analytics settings, AI-provider configuration, and privacy policy. Verify every answer in Play Console before submission.

## Current HANA data map

| Data category to review in Play Console | Current HANA use | Collection expectation | Sharing/processing boundary |
|---|---|---|---|
| Name, email, account identifier | Sign-in, account restoration, ownership checks | Collected | Authentication/hosting provider and HANA backend |
| Education and career information | University, degree, semester, subjects, career goal | Collected | HANA backend; sent as relevant context to AI features |
| App activity and progress | Journey steps, mastery, projects, opportunities, preferences, learning history | Collected | HANA backend; used for personalization |
| Messages | Ask Hana conversations and saved memory | Collected when the feature is used | HANA backend and selected AI provider for requested responses |
| Files and documents | Optional code/text uploads, if enabled in the shipped build | Collected when the feature is used | Storage/backend and selected AI provider for analysis |
| App information and performance | Analytics, diagnostics, or error events, if enabled | Verify exact build and analytics configuration | Analytics/hosting provider |
| Device or other identifiers | Verify SDK and authentication behavior in the final APK | Verify exact build | Authentication, analytics, or hosting provider if collected |

## Required declarations to verify

Before submission, confirm whether each data type is **collected**, **shared**, **optional**, **encrypted in transit**, and **deletable**. Confirm that the answers agree with `/privacy`, `/terms`, the account-deletion flow, Android permissions, third-party SDKs, and production logs.

HANA should not claim that all data is deleted unless production testing confirms deletion across the account database, saved memory, chat records, uploaded-file metadata, object storage, sessions, and any provider retention that HANA controls.

## Account deletion

HANA has an in-app deletion control and public deletion request page:

- `/delete-account`
- In-app: Profile → Privacy → Delete my account and HANA data

The public URL must be entered into the Play Console account-deletion field after the production domain is confirmed. Test the URL without the app installed and test the authenticated deletion flow on a clean account.

## Final verification checklist

- [ ] Inspect the exact final APK/AAB manifest and SDK list.
- [ ] Confirm whether analytics is enabled and what events are sent.
- [ ] Confirm the production AI provider and plan used for student data.
- [ ] Confirm the real database/storage deletion behavior.
- [ ] Confirm encryption in transit for app, API, authentication, storage, and AI calls.
- [ ] Complete Play Console Data Safety questions.
- [ ] Compare the Play answers with the final Privacy Policy and Terms.
- [ ] Save a PDF or export/screenshot of the submitted declarations with the release record.

## Current evidence refresh — 2026-08-25

The inspected Android manifest declares only `android.permission.INTERNET`. No contacts, location, camera, microphone, phone, calendar, advertising ID, or storage permission was found in the current project manifest. Recheck the exact signed AAB before submission.

The GitHub Actions `Android debug APK` workflow succeeded on the non-destructive branch `hana-progress-2026-08-25` in run [32843621562](https://github.com/ismatfida1/baymax-care-companion/actions/runs/32843621562), and the downloaded debug artifact was confirmed. This is **not** evidence of a signed release AAB or final Play artifact.

Hana currently uses MySQL/Drizzle as its active database source of truth for profile, learning progress, projects, opportunities, memory, and chat metadata. Supabase API availability is recorded, but Supabase RLS/database architecture is not claimed as the active persistence layer. Managed upload bytes use the server-side storage helper; the database stores account-owned upload metadata. The application deletion procedure removes Hana-owned database records and metadata, while object-storage, authentication-provider, AI-provider, analytics, and backup retention still require production verification.

The current AI boundary uses server-side provider adapters and minimized student context. OpenAI/Gemini availability and production plan/data-retention terms must be confirmed against the release configuration before the Play form or Privacy Policy claims a specific provider. Canva is enabled as an optional connector but is not required for normal app operation. Optional voice transcription is framework-capable but is not exposed as a current Hana feature.

## Release decision

This draft supports preparation only. It does not establish that HANA is ready for commercial sale or Google Play submission. Keep the existing open checklist items—signed-AAB scan, provider configuration and retention, analytics payloads, storage-object deletion, production account deletion, and Play Console review—open until they are tested against the final release artifact.

## Play release records to prepare

| Record | Current evidence or draft value | Final status |
|---|---|---|
| App identity | HANA — Your AI Learning Companion; Android package configuration must be read from the exact release project. | Confirm in signed AAB and Play Console |
| Developer/owner | Ismat Fida; privacy contact `ismat542008@gmail.com`. | Confirm developer-account legal details |
| Content declaration | Educational and career-coaching app with AI-generated explanations and external learning links. It is not a university, recruiter, or professional-advice service. | Owner review required |
| Target API and SDK | Debug workflow installs Android API 36/build-tools 36.0.0; final target/compile values must be read from the signed release Gradle configuration. | Confirm from release build |
| Signing | GitHub Actions debug APK was verified. No signed release AAB has been verified in this project state. | Open |
| Store listing | Use truthful screenshots and descriptions from the final app; do not claim provider integrations, live deadlines, curriculum access, or deletion behavior that are not verified. | Prepare after release UX freeze |
| Account deletion | Public route: `https://hanacompact-lpgytise.manus.space/delete-account`; in-app deletion exists under Profile → Privacy. | Test with a real production account and record results |
| Privacy URL | `https://hanacompact-lpgytise.manus.space/privacy` | Reachable; final release-content review required |
| Terms URL | `https://hanacompact-lpgytise.manus.space/terms` | Reachable; final release-content review required |

These records are a preparation aid. They do not replace Play Console’s declarations, signed-AAB inspection, provider-term confirmation, or qualified legal review.
