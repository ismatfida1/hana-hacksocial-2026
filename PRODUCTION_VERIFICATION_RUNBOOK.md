# HANA Production Verification Runbook

> This runbook records tests that cannot be truthfully completed from source inspection alone. Run them against the final public domain and final signed Android artifact, then record evidence before Play submission.

## Account and cross-device persistence

Use two test accounts, A and B. Sign in as A, save a university, degree, semester, career, a learning-step completion, a project, a note, one chat message, and one uploaded text/code file. Refresh the web app and confirm the values remain. Sign in as A on another device or browser and confirm the same values return. Sign in as B and confirm none of A’s profile, progress, project, chat, upload, or opportunity data is visible.

## Provider sign-in

On the production domain, select **I’m ready**, then **Continue with Google**. Confirm the provider returns to Hana’s start flow, refresh restores the account, and sign-out clears the session. Repeat with **Use another sign-in option** only if another provider is enabled in the portal. Record the callback URL, browser/device, provider, timestamp, and result. If the callback fails, capture the user-visible error and verify the exact callback URL is allowlisted.

## Deletion

On a disposable account, save profile, progress, project, chat, and upload data. Use Profile → Privacy → Delete my account and HANA data. Confirm the session is invalidated and the account cannot reopen the deleted HANA data. Check database rows and managed storage objects using authorized operations. Submit the public deletion request at `/delete-account` without the app installed and verify the request path is reachable. Record any provider, backup, or analytics retention that is not controlled by Hana.

## Final Android release

Build a signed AAB from the frozen release commit. Inspect the final manifest and permissions, scan the AAB and extracted assets for secrets, verify the target/compile SDK, install the release build on a real Android device, and repeat sign-in, refresh, progress save, chat, upload, and deletion tests. Save the AAB hash, workflow run, scan output, device/OS, and test results.

## Play Console evidence pack

Before submission, attach the final AAB inspection, the public Privacy Policy URL, Terms URL, deletion URL, Data Safety answers, package/license notice bundle, provider-term records, asset provenance register, and screenshots of the tested release flow. Keep any item that was not tested marked open; do not convert source-level evidence into an end-to-end claim.
