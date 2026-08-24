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
