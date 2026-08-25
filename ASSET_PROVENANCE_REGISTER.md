# HANA Asset Provenance Register

**Owner/operator:** Ismat Fida  
**Public privacy contact:** ismat542008@gmail.com  
**Purpose:** Record the origin and commercial-distribution permission for every non-code asset shipped by HANA. This register is evidence management, not legal clearance.

| Asset | Repository or runtime location | Source currently evidenced | Commercial permission status | Required evidence before sale |
|---|---|---|---|---|
| HANA robot illustration/logo | Managed `/manus-storage/...` URL referenced by the client | Managed asset URL; original creator/license record not present in repository | ⚠️ Unverified | Preserve original prompt/design files, creation record, and ownership/permission evidence |
| HANA mobile logo | Managed asset URL / uploaded project asset | Previously supplied by project owner; exact provenance record not encoded | ⚠️ Unverified | Keep the original file and proof of ownership or commercial permission |
| Ismat Fida signature | `client/public/ismat-fida-signature.png` | Supplied by project owner | ⚠️ Confirm owner permission for app redistribution | Retain the original signature file and confirmation that it may be displayed in paid software |
| DM Sans font | Google Fonts stylesheet in `client/index.html` | Google Fonts delivery | ✅ Generally permissive, subject to the font license | Keep the exact font family/version record and license notice if redistributed locally |
| Fraunces font | Google Fonts stylesheet in `client/index.html` | Google Fonts delivery | ✅ Generally permissive, subject to the font license | Keep the exact font family/version record and license notice if redistributed locally |
| Lucide icons | `lucide-react` imports | npm package dependency | ✅ MIT metadata; preserve notice | Include the package notice in the release notice bundle |
| Canva assets | No confirmed embedded Canva asset identified by the audit | Canva connector available; asset-level record absent | ⚠️ Unverified | Record design ID, account/plan, content category, export, and commercial-use terms; remove Education-only or standalone library content |
| Product introduction video | No verified production video in the repository | Prior generation request was quota-blocked | ❌ Not shipped/cleared | Do not advertise or distribute until an original or commercially licensed video is actually included |
| External learning thumbnails/media | External linked pages, not copied into the app | Third-party websites | ⚠️ Link-only use | Do not copy or rehost protected media; keep links and marks accurate |

## Canva policy evidence — 2026-08-25

The [Canva MCP usage policy](https://www.canva.dev/docs/mcp/usage-policy/) requires secure OAuth and scope handling, data minimization, no retention beyond operational necessity, no use of Canva-sourced data or Brand Kit data to train external AI, and no extraction or reuse of Brand Kit or template internals outside Canva. It also requires compatibility-only Canva naming, approved unaltered Canva logos, clear user-facing data flows, and authenticated access to Canva-derived operations.

This policy confirms the controls Hana must preserve if Canva is used: access only after explicit user action, do not crawl or bulk-index designs, do not copy Brand Kit colors/fonts/logos into the Hana web app, and do not imply Canva endorsement. It does not prove that any particular Canva export, image, template element, or account plan is commercially redistributable. The Canva asset row therefore remains **unverified** until the specific design/export, account plan, content category, and applicable terms are recorded.

## Release rule

An asset is not commercially cleared merely because it renders. Before charging users or distributing an APK/AAB, attach source evidence and the applicable license or permission to this register. If evidence cannot be obtained, replace the asset with an original or clearly licensed alternative.
