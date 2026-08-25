# HANA Authentication Release Gate

## Verified in source and automated tests

Hana uses the managed OAuth portal rather than a fake email/password form. The greeting screen leads to a dedicated sign-in screen. That screen exposes a Google provider action and an alternate secure sign-in action through the provider-aware OAuth helper. The authorized demo password is kept in a separately labeled preview area and is not part of normal account sign-in.

The browser creates a one-time nonce, binds it to the OAuth state, and uses a host-only secure cookie. The server validates the returned state against that cookie before exchanging the authorization code. Session cookies are then created server-side. The current automated suite includes a provider-aware authentication contract test, plus session restoration and logout tests.

## External verification still required

The OAuth portal must allow the exact production callback URL:

`https://hanacompact-lpgytise.manus.space/api/oauth/callback`

If preview testing is required, the exact preview origin must also be allowlisted by the portal. The Google provider must be enabled in the portal configuration; the client can request `provider=google`, but the application cannot enable a provider that the portal has not enabled.

## Smoke-test sequence

1. Open the public production domain in a normal top-level browser.
2. Select **I’m ready**, then **Continue with Google**.
3. Complete the provider flow and confirm the app returns to Hana’s career-start screen.
4. Refresh the page and confirm the same account and saved context remain available.
5. Sign out, confirm the session is cleared, and sign in again.
6. Test **Use another sign-in option** if a second provider is enabled.
7. Test a separate account and confirm it cannot see the first account’s profile, progress, chats, uploads, or projects.
8. Test the in-app deletion flow and then the public deletion page.

## Known limitation

Source inspection and automated tests cannot prove the provider portal’s current Google configuration, redirect allowlist, browser cookie behavior, or real-account callback. Until the smoke test is completed on the final production domain, the sign-in requirement must remain **open for external end-to-end verification**.
