# HackSocial 2026 — Deployment & Release Gates

**Presentation script**
**Suggested length:** 5–7 minutes
**Project:** Separate HackSocial copy of Hana
**Repository:** `ismatfida1/hana-hacksocial-2026`

---

## Cover

### On screen

# HackSocial 2026
## From evaluator demo to a separate public full-stack release

**Speaker:** Ismat Fida

### Speaker notes

“Today I’ll show how HackSocial 2026 is separated from the original Hana project, how it is prepared for public full-stack deployment, what security and validation evidence is already available, and which release gates still require real production verification.”

---

## Slide 1 — The separation boundary is deliberate

### On screen

- HackSocial lives in its own copied project.
- The original Hana project remains separate.
- GitHub history was preserved with a normal merge.

### Speaker notes

“HackSocial is not being developed over the original HANA deployment. The working copy is `/home/ubuntu/hana-learning-companion-copy`, connected to the dedicated repository `ismatfida1/hana-hacksocial-2026`. The original project remains untouched. The repository setup preserved the initial GitHub placeholder history instead of force-pushing or deleting it.”

**Evidence:** `COPY_README.md`, repository history, and `DEPLOYMENT_HACKSOCIAL.md`.

---

## Slide 2 — The application is full-stack by design

### On screen

**Browser** → React/Vite interface
**Application server** → Express + tRPC
**Persistence** → Drizzle + MySQL/TiDB
**Services** → OAuth, storage, AI, legal routes

### Speaker notes

“This is not only a static web page. The application relies on a browser interface, a Node server, typed tRPC procedures, database persistence, authentication, storage, AI integrations, and account-deletion routes. A static host would omit important functionality, so the production target must be a full-stack Node deployment.”

**Evidence:** `package.json`, `server/_core/index.ts`, `server/_core/env.ts`, and `DEPLOYMENT_HACKSOCIAL.md`.

---

## Slide 3 — Recommended production hosting

### On screen

# Recommended: separate managed full-stack deployment

- Deploy from the HackSocial `main` branch.
- Use Autoscale as the default hosting mode.
- Keep the original Hana domain and database separate.

### Speaker notes

“The recommended option is a separate managed full-stack project using the HackSocial repository. Autoscale is suitable for the current workload because the application does not require an always-running worker, WebSocket room server, or background process. Reserved hosting is not currently necessary. External hosts remain possible, but they require manual reproduction of the Node runtime, database, OAuth callback, storage, secrets, and production routing.”

---

## Slide 4 — The production runtime is reproducible

### On screen

```text
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

`start` → `NODE_ENV=production node dist/index.js`
`PORT` → supplied by the host

### Speaker notes

“The copied project now has an explicit production start command. The build creates the browser assets in `dist/public` and the server bundle at `dist/index.js`. The server reads the host-provided port rather than relying on a hardcoded production port. This gives a deployment platform a clear install, build, and start contract.”

---

## Slide 5 — Secrets stay outside the repository

### On screen

**Server-side only:** database URL, session secret, OAuth service, AI keys, storage key, demo password
**Build-time configuration:** public application and OAuth portal identifiers
**Never commit:** `.env`, signing keys, tokens, private certificates, real passwords

### Speaker notes

“Production credentials must be entered through the separate project’s encrypted secret manager. The repository contains documentation for the variable names, but not their values. OpenAI and Gemini keys, database credentials, the session secret, and the authorized demo password remain server-side. The browser must never receive a server secret.”

“HackSocial Demo Mode also has a data boundary: its sample activity does not write to real user memory or the production database.”

---

## Slide 6 — What is already validated

### On screen

| Validation | Result |
|---|---|
| Vitest | 21 files / 67 tests passed |
| TypeScript | Passed |
| Production build | Passed |
| Secret scan | Passed |
| Git diff check | Passed |
| Repository sync | Local and remote synchronized |
| Original project | Clean and untouched |

### Speaker notes

“The current copied project passes its automated test suite, TypeScript validation, local production build, release security scan, and Git diff check. The copied repository is synchronized with GitHub, and the original Hana working tree is clean. The build still reports a non-blocking large JavaScript chunk warning and a warning that the legacy pnpm field is ignored.”

---

## Slide 7 — The evaluator journey is compact and isolated

### On screen

**Goal** → **Roadmap** → **Mission** → **Ask Hana** → **Mastery** → **Project** → **Opportunity** → **Progress**

### Speaker notes

“The HackSocial evaluator path is designed to fit into a short demonstration. A participant states a goal, reviews a compact demo roadmap, starts a mission, asks Hana for help, completes a mastery interaction, receives a project idea, opens an official opportunity destination, and finishes with a progress state.”

“The live AI procedure is non-persisting. When the configured provider is available, it is used. When it is unavailable, the interface says so clearly instead of pretending that a fallback is live AI.”

---

## Slide 8 — Release gates still require real production checks

### On screen

| Gate | Current status |
|---|---|
| Separate managed project | Configuration prepared; project not yet created |
| Permanent public domain | Pending |
| OAuth provider callback | Must be tested on the new domain |
| Production database isolation | Must be verified |
| Storage and deletion behavior | Must be verified with real account data |
| AI provider plans and data handling | Must be confirmed |
| Licensing and asset provenance | Final review remains open |
| Google Play declarations | Must be completed for the final release |
| Signed AAB scan | Pending final signed artifact |

### Speaker notes

“Passing local tests does not equal production clearance. The remaining gates are operational and legal: create the separate managed project, configure the new OAuth callback, verify database and storage isolation, confirm provider terms, finish licensing and asset review, complete Google Play declarations, and scan the actual signed AAB.”

---

## Slide 9 — Production verification sequence

### On screen

1. Create the separate full-stack project from HackSocial `main`.
2. Add encrypted production variables.
3. Prepare or migrate the separate database.
4. Deploy and open the new domain.
5. Test sign-in, demo access, AI, legal routes, and deletion.
6. Capture release evidence.

### Speaker notes

“The safest rollout is staged. First create a separate environment. Then configure secrets and database access. After deployment, test the complete evaluator journey and the legal routes on the new domain. Finally, capture evidence for the Play Console and commercial release review. No production claim should be made before these checks pass.”

---

## Closing — Ready for deployment preparation, not yet final release

### On screen

# HackSocial 2026 is deployment-ready in configuration
## Production verification and release clearance remain

[GitHub repository](https://github.com/ismatfida1/hana-hacksocial-2026)

### Speaker notes

“The copied HackSocial project now has a separate repository, a reproducible production runtime, documented secret configuration, an isolated evaluator experience, and passing automated validation. It is ready to enter a separate deployment process. It is not yet accurate to call it commercially or publicly release-ready until the real-domain, provider, database, legal, Play, and signed-Android gates are completed.”

---

## References

[1]: `DEPLOYMENT_HACKSOCIAL.md` — Separate full-stack deployment guide and environment-variable matrix.

[2]: `HACKSOCIAL_2026_DEMO.md` — HackSocial evaluator flow, data isolation, and AI fallback behavior.

[3]: `package.json` — Install, build, start, test, security-scan, and Capacitor scripts.

[4]: `server/_core/index.ts` and `server/_core/env.ts` — Production server entrypoint, port handling, and environment contract.

[5]: `client/src/pages/HackSocial.tsx`, `server/routers.ts`, and `client/src/pages/hackSocial.contract.test.ts` — Demo implementation, non-persisting AI procedure, and regression coverage.
