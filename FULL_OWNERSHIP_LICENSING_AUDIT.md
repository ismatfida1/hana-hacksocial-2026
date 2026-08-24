# HANA Commercial Ownership and Licensing Audit

**Audit date:** 2026-08-24  
**Scope:** The current `/home/ubuntu/hana-learning-companion` project, its dependency tree, source references, generated Android project, existing audit files, and authoritative provider/policy pages reviewed during this audit.

> **Important:** I am an AI, not a lawyer — this is a working technical and licensing analysis, not formal legal advice. A qualified lawyer should review the exact release artifact, business model, jurisdiction, privacy documents, and third-party contracts before HANA is sold or published on Google Play.

## Executive conclusion

HANA can likely be commercialized as an application built by Ismat Fida, but the repository is **not yet commercially cleared**. The main blockers are not that AI or open-source software was used; they are unresolved license metadata, provider-plan and data-processing choices, incomplete ownership records for uploaded/managed assets, missing final privacy/account-deletion surfaces, and the absence of a verified release notice bundle and signed Android release process.

The current application contains a React/TypeScript web client, an Express/tRPC server, Drizzle/MySQL persistence, Manus OAuth/runtime services, managed image assets, a Capacitor Android project, and a large dependency tree. The code scan did not find literal OpenAI, Gemini, database, JWT, GitHub, or service-role secret values in `client/` or Android source. The production server bundle contains environment-variable names because it bundles server code; this is not, by itself, proof that secret values are exposed. The release process must still verify that no `.env` files, source maps, logs, or injected build artifacts are shipped.

## Project inventory and provenance findings

| Item | Actual evidence | Current conclusion | Required action |
|---|---|---|---|
| HANA application code | React 19, TypeScript, Express/tRPC, Drizzle, Capacitor files in the repository | The author may commercialize code they own or are licensed to use | Preserve repository history and authorship records; review all generated and third-party portions |
| HANA name and branding | `HANA` text, `hana-mobile-logo_34c448e2.png`, managed signature asset | Ownership cannot be proven from source alone | Keep original design files, upload records, and trademark search/registration evidence if branding will be protected |
| Robot/logo/signature images | Managed `/manus-storage/...` URLs and `client/public/ismat-fida-signature.png` | Provenance and license terms are not encoded in the repository | Record whether each asset was user-created, commissioned, generated, or supplied by a third party; retain permission records |
| Fonts | Google Fonts stylesheet for DM Sans and Fraunces in `client/index.html` | Must comply with the font licenses and Google Fonts serving terms | Record exact font licenses and retain notices where required; do not claim exclusive ownership of the fonts |
| Icons | `lucide-react` imports in `Home.tsx` and UI components | License is permissive but notices should be preserved | Include the dependency notice bundle in web/Android release records |
| Roadmap/resource links | MIT, Harvard/CS50, NIST, Cisco, YouTube, Khan Academy, MDN, Docker, Linux Foundation, NN/g, Kaggle, MLH and other external URLs | Linking is not ownership of third-party course content, marks, or videos | Keep links accurate, avoid copying protected course text/media, respect each site’s terms and branding rules |
| Product video | No completed real product video was verified; the requested generation was quota-blocked | Do not advertise a video as included until a real licensed asset exists | Use original footage/AI output or properly licensed media and retain provenance |
| Canva | Canva was configured as an available MCP service, but the application source does not prove that a Canva asset is embedded | Optional; no Canva license clearance can be inferred without the actual design/asset record | Verify each asset and Canva plan; do not use Education-only content commercially; do not redistribute standalone Canva content |
| Manus-generated output | Manus Help Center states users own content created with Manus for personal or commercial use, subject to law and third-party rights | Supportive of commercial use of Manus-created output, but not a blanket clearance for embedded third-party code/assets | Review the exact Manus terms and preserve third-party notices |
| Android project | Generated `android/` tree, Capacitor config, workflow | Packaging exists, but commercial Android release still needs signing, Play declarations, notices, and successful release build verification | Create a controlled signed-release process and complete Play Console declarations |

## Dependency and open-source audit

The refreshed installed tree contains **703 package records** and **91 direct package names** after removing the streamdown/mermaid/khroma production path. The existing dependency report classifies most packages as MIT, Apache-2.0, BSD, ISC, 0BSD, or similarly permissive. Those licenses generally permit commercial use when their conditions—especially copyright/license notice preservation—are met. This is a technical screening result, not a legal conclusion.

The following categories require attention before a closed-source commercial release:

| Category | Examples found | Risk / obligation |
|---|---|---|
| Unknown or missing package metadata | `@builder.io/jsx-loc-internals`, `@builder.io/vite-plugin-jsx-loc`, `vite-plugin-manus-runtime` | Obtain authoritative terms or written provider clarification; do not rely only on npm metadata |
| Conflicting metadata | Previously observed `khroma@2.1.0` | Removed from the current installed dependency graph by replacing streamdown; recheck after every lockfile change |
| Copyleft or file-level copyleft | `lightningcss` and platform binaries declared MPL-2.0 | Review whether the exact use triggers source-disclosure or notice obligations; preserve MPL notices |
| Non-standard or special terms | BlueOak-1.0.0 packages, `SEE LICENSE` packages | Read the exact license text for the resolved version and preserve notices |
| Attribution-bearing content | `caniuse-lite` declared CC-BY-4.0 | Verify the exact attribution requirements and include them if the artifact is redistributed |
| Unlicense | `big-integer`, `robust-predicates`, `stream-buffers`, `wouter` records | Usually permissive, but retain provenance and review jurisdictional treatment of public-domain dedication |
| Development tooling | Builder JSX location packages, Manus Vite runtime, Vite, TypeScript, Capacitor CLI | Distinguish build-time-only tools from shipped runtime; verify provider terms before redistributing tooling or its output |

**Release requirement:** Generate a notice bundle from the exact frozen lockfile and final web/Android artifacts. Do not remove license notices merely because the package is transitive. The existing detailed package report is attached separately as `DEPENDENCY_LICENSE_AUDIT.md`.

## Provider and service terms

### OpenAI

The reviewed OpenAI business terms state that the API may be integrated into customer applications made available to end users. They also state that, to the extent permitted by law, the customer retains Input ownership and owns Output, while remaining responsible for rights, policy compliance, accuracy, and lawful data processing. OpenAI’s business-data page states that API inputs and outputs are not used to train models by default and describes retention controls for qualifying organizations.

**Classification:** ✅ **Generally compatible with a commercial HANA application when the correct API/business terms and data-processing obligations are satisfied.** This does not give HANA ownership of OpenAI’s API or models. Use a server-side key, disclose AI processing, and review the current account plan and DPA requirements.

Sources: [1] [2]

### Google Gemini

The Gemini API Additional Terms distinguish paid and unpaid services. The reviewed terms state that Google does not claim ownership of generated content, but that output may be similar, developers are responsible for review and compliance, and unpaid services may use submitted prompts and responses to improve Google products and may involve human review. The terms warn not to submit sensitive, confidential, or personal information to unpaid services. The Google API Terms require reasonable protection of user information, an accurate privacy policy, and confidential developer credentials.

**Classification:** ⚠️ **Commercial use may be possible, but the chosen Gemini plan is material.** Do not send private student profiles, conversations, uploaded files, or confidential code to unpaid Gemini services unless the applicable terms and consent structure clearly permit it. Prefer a paid/data-processor configuration for production personal data and document the actual region, plan, retention, and DPA.

Sources: [3] [4]

### Manus

The Manus Help Center states that users own content created with Manus for personal or commercial use, subject to applicable law and third-party rights. It also warns that AI outputs may not be unique or protectable under IP law.

**Classification:** ✅ **Manus output ownership is supportive of commercialization, subject to third-party rights and current terms.** This does not automatically clear packages, fonts, managed assets, provider APIs, or any content HANA links to.

Source: [5]

### Canva

Canva’s Content License Agreement permits many commercial uses of designs containing licensed Free or Pro Content, but licenses are non-exclusive and standalone redistribution is restricted. The reviewed Canva guidance also warns that Canva Education content is for educational, non-commercial purposes and that Canva library content generally should not be treated as an exclusive trademark asset.

**Classification:** ⚠️ **Commercial use depends on the exact Canva asset, account plan, content category, export, and use.** Verify every asset. Do not ship standalone Canva stock elements, use Education-only content in a paid product, or claim Canva library artwork as an exclusive HANA trademark.

Sources: [6] [7]

### GitHub

The current codebase contains GitHub Actions and repository references, but no verified runtime GitHub API integration was established by this audit. GitHub repository hosting does not transfer ownership of HANA code to GitHub, while any third-party repository code, workflow action, or API use remains subject to its own license and terms.

**Classification:** ⚠️ **Repository use is not itself a commercial blocker, but each imported action, dependency, repository asset, token scope, and API flow must be reviewed.** Keep GitHub tokens and signing material out of the client and repository history.

### Supabase, storage, and hosting

The current application’s main persisted database path is Drizzle/MySQL according to the project files; the environment includes Supabase variables, but this audit did not establish a complete direct Supabase runtime path for every claimed feature. Managed storage URLs and Manus hosting are part of the deployment boundary.

**Classification:** ⚠️ **Commercial use depends on the actual plan and data-processing terms.** Inventory the real production data path, sign any required DPA, configure retention and deletion, and do not advertise Supabase functionality that the shipped build does not actually use.

## Google Play readiness

Google Play’s account-deletion guidance states that an app allowing account creation must provide an in-app path to delete the account and associated data and a web resource where users can request deletion. HANA now includes an in-app deletion control, a public deletion-request page, and public Privacy Policy and Terms pages. Developers must still complete the Data Safety deletion questions in Play Console from the exact release artifact.

**Current classification:** ⚠️ **Privacy and deletion surfaces are implemented, but final Google Play publication remains blocked until the deletion flow is tested against production data, Data Safety answers and store declarations are completed, a signed release build is verified, target API/SDK requirements are confirmed, and release evidence is reviewed.**

Source: [8]

## Secret and credential exposure audit

The scan covered client source, Android source/resources, Capacitor configuration, Vite configuration, built output, and secret-like environment names. No literal OpenAI, Gemini, database, JWT, Supabase service-role, GitHub token, private-key, or password value was observed in `client/` or Android source during the scan. The client references public configuration and managed asset URLs; server code references environment variables.

The production server bundle `dist/index.js` contains secret-related environment-variable names because server code is bundled. That is acceptable only if actual values are injected at runtime and the bundle is never served as a public static client asset. Before release:

| Check | Current status | Required action |
|---|---|---|
| Client-side provider secrets | No literal values observed | Repeat against the exact release APK and web bundle |
| Server-side secrets | Environment-based | Confirm runtime-only injection and restrictive secret access |
| `.env` and local files | Must not ship | Verify ignore rules and release archive contents |
| Source maps | Potential disclosure risk | Disable or protect production source maps unless intentionally published |
| Android resources | No literal secret values observed | Scan final APK/AAB and manifest before upload |
| Signing key | Not verified | Store only in protected GitHub Actions secrets or secure signing service; never commit it |
| Logs | Must not contain prompts, tokens, or personal data | Review production logs and redact/limit retention |
| Analytics | Umami endpoint and website ID are present in HTML | Disclose analytics collection and verify consent/legal basis where required |

## Classification summary

### ✅ Safe or clearly permitted, subject to ordinary compliance

The project’s use of common permissive open-source packages is generally compatible with commercial software when notices are preserved. Manus’s published ownership FAQ supports personal or commercial use of Manus-created output. OpenAI’s business terms support integrating its API into customer applications, and the reviewed terms assign customer ownership of Input and Output to the extent permitted by law. Google’s API terms do not acquire ownership of the API client, and Gemini’s terms state that Google does not claim ownership of generated content.

These conclusions remain conditional on using the correct provider plan, honoring policies, protecting credentials, and clearing third-party content and asset rights.

### ⚠️ Requires verification, attribution, provider review, or legal review

The `khroma` license conflict, BlueOak/SEE LICENSE/MPL/CC-BY/Unlicense records, unknown Manus/Builder tooling metadata, Google unpaid Gemini data handling, exact Canva assets and plan, uploaded robot/signature provenance, Google Fonts license records, privacy/AI disclosures, analytics, repository actions, third-party resource content, and final provider contracts all require evidence or review.

The application also requires a final privacy policy and terms that accurately describe account memory, conversations, uploaded files if enabled, AI providers, analytics, storage, retention, deletion, support, and international data transfers.

### ❌ Must be removed, replaced, or completed before commercial release

Do not distribute the exact release as a paid Android product until the `khroma` conflict is resolved or an approved replacement is used; required license notices are generated; the account/data deletion flow and public deletion URL exist; the final signed APK/AAB is scanned; provider and Canva plan terms are confirmed; all assets have provenance records; privacy/terms documents are published; and Google Play Data Safety declarations are complete.

Do not ship any literal secret, signing key, service-role token, or private credential in client code, Android resources, public repository history, or release artifacts. Do not advertise the blocked product video, direct Supabase/GitHub/voice capability, or any other integration unless it is actually present and tested.

## Independent release checklist

| Gate | Required evidence |
|---|---|
| Ownership | HANA code/design/assets provenance log; commissioned or uploaded asset permissions; repository history |
| Dependencies | Frozen lockfile, full notice bundle, resolved `khroma` status, package-level license records |
| Providers | Current OpenAI/Gemini/Manus/Canva/hosting/storage terms, plan and DPA records |
| Privacy | Published Privacy Policy, AI disclosure, retention/deletion description, support contact |
| Accounts | In-app deletion, web deletion request page, session invalidation, ownership tests |
| Android | Successful debug/release build, signing handled securely, final APK/AAB secret scan |
| Play | Data Safety form, content declarations, target API/SDK, privacy URL, account-deletion URL, store assets |
| Security | Secret scan, dependency scan, runtime headers, log review, rate limits, backup/recovery plan |
| Product claims | Every advertised integration and media asset reproduced in a clean checkout and tested |

## References

[1]: https://openai.com/policies/may-2025-business-terms/ "OpenAI Business Terms - May 2025"

[2]: https://openai.com/business-data/ "OpenAI Business Data Privacy, Security, and Compliance"

[3]: https://ai.google.dev/gemini-api/terms "Gemini API Additional Terms of Service"

[4]: https://developers.google.com/terms "Google APIs Terms of Service"

[5]: https://help.manus.im/en/articles/13125514-do-i-own-the-assets-websites-images-videos-slides-generated-via-manus "Manus Help Center: Ownership of assets generated via Manus"

[6]: https://www.canva.com/policies/content-license-agreement/ "Canva Content License Agreement"

[7]: https://www.canva.com/licensing-explained/ "Canva licensing explained"

[8]: https://support.google.com/googleplay/android-developer/answer/13327111?hl=en "Google Play app account deletion requirements"

## Local supporting records

- `DEPENDENCY_LICENSE_AUDIT.md` — full package inventory and flagged dependency categories.
- `dependency-license-inventory.json` — machine-readable installed package metadata.
- `FLAGGED_PACKAGE_LICENSE_EVIDENCE.md` — exact local license-file evidence and source metadata for the 24 flagged package records.
- `THIRD_PARTY_NOTICES.md` — generated attribution index for the current installed package set.
- `ASSET_PROVENANCE_REGISTER.md` — asset-level ownership and permission evidence checklist.
- `commercial-audit-sources.md` — source notes gathered during the audit.
- `integration-audit-notes.md` — provider and integration observations.
- `ANDROID_BUILD.md` — Android workflow instructions and current build constraints.
- `MASTER_ACCEPTANCE_MATRIX.md` and `FULL_REQUIREMENTS_AUDIT.md` — product coverage and implementation status.
