# HackSocial Browser Verification

Date: 2026-08-25

The copied HackSocial app was opened at its isolated preview endpoint on port 3001. After initial auth hydration, the page rendered the intended greeting screen with the HANA logo, Hana greeting, robot illustration, and `I’m ready ✨` button. No blank-screen failure remained after loading.

The preview UI also displayed the environment banner: `Preview mode — This page is not live and cannot be shared directly. Please publish to get a public link.` This confirms the browser endpoint is a managed preview, not a permanent public production deployment.

The browser-level verification did not yet enter the authenticated HackSocial flow. Sign-in/auth and the separate Demo Mode gate remain required for deeper interaction verification.

The browser verification then entered the normal sign-in screen from the greeting. It visibly offered `Continue with Google` and `Use another sign-in option`. Expanding `Preview for authorized users` showed the `Demo password` field and `Open private demo` control. No password was entered during this check, so the private demo authentication result remains unverified in the browser.

Final baseline browser pass: the greeting loaded correctly, and clicking `I’m ready ✨` routed to the normal sign-in screen. The screen exposed `Continue with Google`, `Use another sign-in option`, and the authorized-demo password section. No password was entered, so the private demo and authenticated HackSocial journey were not browser-executed in this run.

During the finalization run, the copied preview remained on the authorized sign-in page after the password-entry attempt and submit click. The `Open private demo` control stayed disabled, so the private demo was not entered. This is a verification blocker to report, not a code change yet; a coordinate-targeted password input retry is needed before diagnosing whether the issue is browser input handling, password mismatch, or demo configuration.

The coordinate-targeted retry and field inspection confirmed the password input value length remained zero and the submit button remained disabled. The issue is currently a browser-entry/preview interaction blocker rather than a confirmed password rejection; no password value was written to the project or output.

The authorized password field was populated through the browser’s native input event path, but submitting `Open private demo` did not navigate away from the sign-in page. This confirms a real demo-entry blocker in the current preview. The password itself is not recorded here.

A focused click followed by a second browser-input attempt still left the private-demo submission visually disabled. The field display remains unreliable in this preview interaction, so the complete authenticated judge flow cannot yet be marked passed. No code or real account data was changed during these attempts.

A final authorized attempt invoked the field’s actual React change handler before submitting. The preview still did not leave the sign-in page, so the password gate remains a real blocker in this isolated preview. No application code, account data, or stored credential was changed.

A controlled preview server was started with the authorized demo password supplied only as a process environment variable. The greeting screen loaded correctly at the isolated preview endpoint, confirming the copied app starts normally before authentication.

In the controlled preview, the greeting transitioned correctly to the normal sign-in screen, and the authorized-demo section expanded correctly. The demo submit control was disabled before input, as expected. This run is using the process-configured demo password environment, so the next step is to enter it and verify the gate and full flow.

Controlled-preview result: the authorized demo password was accepted, and the app entered the Demo Mode roadmap draft. The draft displayed Cybersecurity, Starting from zero, the goal, and an ordered foundation path beginning with Networking foundations, Linux essentials, Web and identity safety, and Threat modelling. This confirms the authorization gate and career-specific starting point work in the controlled server.

End-to-end verification progress: the controlled preview accepted the authorized password, displayed the Cybersecurity roadmap draft, approved it into the authenticated Hana app, dismissed the optional onboarding modal, and opened the visible HackSocial entry point. HackSocial began at the Goal stage with Demo Mode labeling and an explicit non-persistence note.

Judge-flow browser pass: after entering Demo Mode, the HackSocial launcher opened correctly. Goal advanced to Roadmap, Roadmap advanced to Today’s Mission, and the interface showed the compact demonstration path with four ordered steps. The mission clearly stated a small action and `No deadline · work at your own pace`.

Ask Hana browser pass: the mission question was submitted, the UI showed a loading state briefly, and the response rendered as `Hana · Hana AI` with structured heading-style content, a goal, reason, and tiny example. The screen explicitly stated `Demo Mode sends no conversation to personal memory` and that unavailable live AI would be communicated clearly. In this run, a response was returned successfully.

Mastery Check browser pass: the correct answer, `Use three small examples and compare the answers.`, was selectable. Hana immediately confirmed, `Nice. Small examples make the result easier to understand.` The Continue control then advanced to the Build stage.

Build → Opportunity browser pass: the small project `Student Next-Step Helper` transitioned to the Explore stage. The official `https://devpost.com/hackathons` link opened successfully and displayed Devpost’s hackathon browsing page. The demo labels the link as an official page and tells the student to check official rules, dates, and eligibility.

The preview reset to the greeting after leaving for the external opportunity page. Re-entering the greeting flow correctly reached the normal sign-in page. The authorized-demo disclosure had to be expanded before the password field could be reliably targeted; the attempted hidden-field input did not change the visible form.

The expanded-field retry succeeded: the supplied authorized password opened the controlled private demo, the Cybersecurity roadmap draft was shown again, and `Approve and start` returned to the authenticated Hana shell. The optional private-demo onboarding modal reappeared as designed, offering the interactive tour, product-introduction video placeholder, and `Skip for now`.

Repeatability pass: after re-entry, the HackSocial Goal → Roadmap → Today’s Mission transitions worked again. The same compact four-step path and no-deadline wording were displayed, showing that the staged flow is replayable rather than a one-time state artifact.

Repeated Ask Hana browser pass: the same focused question returned a second successful `Hana · Hana AI` response with concise headings, bullets, and a tiny example. The loading state cleared without a dead end.

Repeated Mastery Check pass: the correct answer remained selectable on a fresh run, Hana again gave immediate confirmation, and Continue became active for the Build stage. This confirms the mastery interaction is not dependent on persisted demo state.

Final judge-flow pass: the verified mastery answer advanced to Build, Build advanced to Explore, and Explore advanced to Progress. The official Devpost card was visible again, and the final screen reached `Progress 100%` with `Demo complete`, explicitly summarizing goal → roadmap → mission → question → mastery check → project → opportunity and naming the next action: build the first helper version.
