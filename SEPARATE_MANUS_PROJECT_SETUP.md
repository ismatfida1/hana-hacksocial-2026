# Separate Manus Project Setup — HackSocial 2026

## Current status

The HackSocial code is safely isolated in this repository:

- Repository: `https://github.com/ismatfida1/hana-hacksocial-2026`
- Branch: `main`
- Current code/documentation head: `4911e8171faa29ec33d8eae168452e63601989d9`

The copied checkout does not contain a managed Manus project identity. The existing managed project metadata belongs to the original HANA project and must not be reused. No original project secrets or database settings should be copied into this deployment.

## Safe action required in the Manus Management UI

Create a **new managed full-stack web project** from the public GitHub repository. Use these values:

| Field | Value |
|---|---|
| Project name | `Hana HackSocial 2026` |
| Repository | `ismatfida1/hana-hacksocial-2026` |
| Branch | `main` |
| Template/runtime | Full-stack web project with server, database, and user support |
| Existing project to use | None; do not select the original HANA project |

After the new project card is created, its project-specific environment and database settings must be provisioned separately through the Management UI. Do not copy the original HANA database URL, project ID, OAuth secrets, JWT secret, or any other original-project secret.

## Verification after creation

1. Confirm the new project path and project ID are different from the original HANA project.
2. Confirm the GitHub source is `ismatfida1/hana-hacksocial-2026` on `main`.
3. Deploy the new project from the copied repository.
4. Open the resulting public URL in a fresh browser session.
5. Confirm the page title/branding says HackSocial/Hana and that the HackSocial entry point is present.
6. Run Goal → Roadmap → Mission → Ask Hana → Quick Check → Build → Explore → Progress.
7. Confirm the Demo Mode notice is visible and no real student account is used.
8. Confirm the original HANA URL and original project remain unchanged.

This file records setup guidance only. It does not claim that a separate managed deployment has been created or that a public URL is available.
