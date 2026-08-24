# Published auth inspection — 2026-08-24

The public Hana site loads the greeting screen correctly. Pressing “I’m ready” opens the sign-in screen with “Sign in or create account” and the private demo section. The browser session did not yet submit the external sign-in action. The user’s supplied screenshot shows the post-attempt state: “Sign-in could not be completed. Please try again.”

The local code uses `/api/oauth/callback`, a one-time `__Host-oauth_state` nonce cookie, and a secure session cookie. The server callback redirects to `/?auth=error` on provider exchange failure. The client returns to the sign-in screen and shows a retryable error. Recent `auth.me` requests on the published site return HTTP 200 with null data when unauthenticated.

The current evidence indicates Hana has a recoverable local error path, while the actual failure may occur in the external Manus authentication service or provider callback exchange. Do not claim Google sign-in is fixed without a successful authenticated callback.
