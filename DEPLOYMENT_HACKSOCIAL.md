# HackSocial 2026 Separate Full-Stack Deployment

This guide applies only to the copied project at `/home/ubuntu/hana-learning-companion-copy` and the repository `ismatfida1/hana-hacksocial-2026`. It must not be used to alter the original Hana deployment.

## Recommended hosting path

The project is a React/Vite frontend with an Express/tRPC backend, Drizzle/MySQL persistence, server-side authentication, storage, and optional server-side AI providers. It should be deployed as a **full-stack Node application**, not as a static site. The recommended path is a separate managed Manus WebDev full-stack project because it provides the matching Node runtime, HTTPS, managed secrets, database integration, and a separate public `manus.space` domain.

Autoscale is the appropriate default for the current workload. HackSocial does not require a continuously running worker, WebSocket room server, or in-memory background process. Reserved hosting is not needed unless the workload later gains a persistent process requirement.

External services such as Render, Railway, Fly.io, or a self-managed VM are possible alternatives, but they require reproducing the Node runtime, database, OAuth callback configuration, secret storage, storage proxy, and production routing manually. Compatibility should be verified before choosing one.

## Build and start contract

```text
Install: pnpm install --frozen-lockfile
Build:   pnpm build
Start:   pnpm start
```

The build creates the browser bundle in `dist/public` and the production server bundle at `dist/index.js`. The production start command is `NODE_ENV=production node dist/index.js`. The application reads the hosting platform’s `PORT`; it does not require a hardcoded port.

## Required production configuration

Set these values through the deployment platform’s encrypted environment-variable settings. Never commit their values, place them in frontend source, or include them in an APK.

| Variable | Scope | Purpose |
|---|---|---|
| `NODE_ENV` | Server | Must be `production` for the deployed runtime |
| `PORT` | Server | Supplied by the host; do not hardcode it |
| `DATABASE_URL` | Server | MySQL/TiDB connection string for accounts, profiles, progress, projects, opportunities, memory, and deletion requests |
| `JWT_SECRET` | Server | Session-cookie signing secret; use a long random value |
| `VITE_APP_ID` | Build/server | Manus OAuth application identifier |
| `VITE_OAUTH_PORTAL_URL` | Build | OAuth portal URL used by the browser sign-in action |
| `OAUTH_SERVER_URL` | Server | OAuth callback/token service base URL |
| `OWNER_OPEN_ID` | Server | Owner/admin identity used by the application’s owner rules |
| `OWNER_NAME` | Server | Owner display name |
| `BUILT_IN_FORGE_API_URL` | Server | Server-side Manus API gateway URL for LLM/storage/data services |
| `BUILT_IN_FORGE_API_KEY` | Server | Server-side Manus API credential |
| `HANA_DEMO_PASSWORD` | Server | Existing authorized demo password; do not place it in the repository |
| `HANA_PRIVACY_CONTACT` | Server | Privacy and deletion contact shown on legal pages |
| `HANA_AI_PROVIDER` | Server | AI provider selection used by the copied app |
| `OPENAI_API_KEY` | Server, optional | OpenAI credential if OpenAI is enabled |
| `OPENAI_BASE_URL` | Server, optional | OpenAI-compatible endpoint when required |
| `OPENAI_MODEL` | Server, optional | Selected OpenAI model |
| `GEMINI_API_KEY` | Server, optional | Gemini credential if Gemini is enabled |
| `GEMINI_MODEL` | Server, optional | Selected Gemini model |
| `VITE_FRONTEND_FORGE_API_URL` | Build, optional | Browser-safe frontend gateway URL when a feature requires it |
| `VITE_FRONTEND_FORGE_API_KEY` | Build, optional | Only use a browser-safe public token if the provider explicitly defines it as public; never use a server secret here |

Use the existing authorized demo-password setting. Do not copy the password into `.env.example`, documentation, GitHub Actions YAML, or client code.

## Production setup sequence

Create a new full-stack managed project from the `main` branch of `ismatfida1/hana-hacksocial-2026`. Configure the variables above in that project’s secret manager, using production database credentials separate from the original HANA deployment. Run the database schema/migration procedure required by the managed project before allowing real accounts to register. Then run `pnpm install --frozen-lockfile`, `pnpm build`, and `pnpm start` through the platform’s build and start settings.

After the first deployment, verify the separate domain in this order: the greeting screen, normal sign-in, authorized demo password, HackSocial entry point, staged demo flow, server-side AI response, truthful AI fallback, legal pages, deletion request page, and an account-owned persistence flow. Confirm that a demo session does not create profile, progress, chat, project, opportunity, or upload records.

## GitHub Actions and Android

The repository retains the existing Android workflow at `.github/workflows/android-build.yml`. Android builds should remain separate from public web deployment. The workflow builds the web assets, synchronizes Capacitor, scans release paths, assembles a debug APK, and uploads the APK artifact. Production signing material belongs only in GitHub encrypted secrets or the official signing system and must never be committed.

## Release gates still requiring verification

A deployment configuration is prepared, but this document does not claim that a separate managed production project or permanent domain has already been created. Before commercial release, verify the OAuth provider allowlist and callback on the new domain, production database isolation, storage/deletion behavior, AI provider terms and data handling, final dependency and asset licensing, Google Play declarations, and a signed AAB scan.
