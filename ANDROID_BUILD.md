# Build Hana’s Android APK with GitHub Actions

This project is the Android-ready Capacitor copy of Hana. It keeps the existing web application architecture and packages the production web build inside an Android project. The workflow builds a **debug APK** automatically on GitHub’s Ubuntu runner and uploads it as a downloadable Actions artifact.

> The debug APK is for testing. It is not a Play Store release and it is not signed with a production upload key.

## 1. Which repository and folder to use

Use the GitHub repository that should own the Android version. If `ismatfida1/baymax-care-companion` is the intended repository, upload the **contents** of `/home/ubuntu/hana-android-app` into that repository’s root. Do not upload the outer `hana-android-app` folder as an extra nested level.

The repository root must contain these paths:

```text
.github/workflows/android-build.yml
android/
client/
server/
shared/
drizzle/
capacitor.config.ts
package.json
pnpm-lock.yaml
vite.config.ts
```

The `android/` directory is intentionally included. It contains the Gradle wrapper and the Capacitor Android project. The workflow does not redesign Hana or replace the web architecture.

If the supplied repository is private or GitHub reports 404, sign in to the GitHub account that owns it or create a new repository such as `hana-learning-companion-android`. Keep the folder layout above unchanged.

## 2. Upload from an Android phone

The easiest phone-only method is the GitHub website in Chrome:

1. Open the target repository on GitHub.
2. Tap **Add file → Upload files**.
3. Upload the project contents from the downloaded Android package. If GitHub’s mobile upload interface cannot preserve the full folder tree, use GitHub Codespaces or the GitHub web editor instead.
4. Confirm that `.github/workflows/android-build.yml` is visible at exactly that path.
5. Commit the files to `main`.

A push to `main` or `master` starts the workflow automatically. You can also start it manually from the **Actions** tab.

## 3. Start the GitHub Actions build

From the GitHub mobile website or GitHub Mobile app:

1. Open the repository.
2. Open the **Actions** tab.
3. Choose **Android debug APK** in the workflow list.
4. Tap **Run workflow**.
5. Select the `main` branch and confirm **Run workflow**.
6. Open the new workflow run and wait for the **Build Hana debug APK** job to finish.

The workflow performs these steps on Ubuntu:

| Stage | What it does |
|---|---|
| Java | Installs Temurin Java 21, required by the current Gradle configuration. |
| Node | Installs Node.js 22. npm is available with Node, and pnpm is installed at the project’s pinned version. |
| Android SDK | Installs platform-tools, Android platform 36, and build-tools 36.0.0. |
| Web build | Installs the lockfile dependencies, runs the TypeScript check, and builds the production web assets. |
| Security scan | Runs `pnpm security:scan` and fails if release paths contain literal secret patterns, environment/signing files, or source maps. |
| Capacitor | Runs `pnpm exec cap sync android` to copy the web build into Android. |
| Android | Runs `./gradlew assembleDebug`. |
| Artifact | Uploads `android/app/build/outputs/apk/debug/app-debug.apk` as an Actions artifact. |

## 4. Download and install the APK on your Android phone

After the workflow succeeds:

1. Open the completed workflow run.
2. Scroll to **Artifacts**.
3. Tap the artifact named `hana-debug-apk-<commit-sha>`.
4. Download the ZIP file to your phone.
5. Extract the ZIP and open `app-debug.apk`.
6. If Android asks, allow Chrome or your file manager to install apps from that source.
7. Install Hana and open it.

Only download artifacts from your own GitHub repository and successful workflow runs. GitHub artifact links may require you to be signed in to the repository.

## 5. Required GitHub Actions workflow

The only workflow you need to run is:

```text
.github/workflows/android-build.yml
```

Its display name is:

```text
Android debug APK
```

It can run automatically after a commit to `main` or `master`, or manually from **Actions → Android debug APK → Run workflow**.

## 6. Secrets and Hana integrations

The debug build workflow does not place API keys inside the Android APK. Hana’s OpenAI, Gemini, Supabase, authentication, memory, Journey, Projects, Opportunities, Ask Hana, logo, signature, and About HANA functionality remains in the existing application architecture.

For a deployed server-backed Hana experience, configure the required production secrets in the hosting environment rather than committing them to GitHub. Do not put `OPENAI_API_KEY`, `GEMINI_API_KEY`, `SUPABASE_KEY`, database credentials, OAuth secrets, or signing keys in the repository or in client-side source files.

If the Android app uses a separately hosted Hana backend, configure its production URL through the existing application configuration before building the APK. The current Capacitor configuration remains in `capacitor.config.ts`.

## 7. Creating a signed release APK or AAB later

The debug workflow intentionally stops at `assembleDebug`. For a Play Store build, create a protected Android upload key and store its values as GitHub Actions secrets. Typical values are:

```text
ANDROID_KEYSTORE_BASE64
ANDROID_KEYSTORE_PASSWORD
ANDROID_KEY_ALIAS
ANDROID_KEY_PASSWORD
```

Do not commit the keystore file. Store it as a base64-encoded GitHub secret or use a secure signing service. Add a separate release workflow only after the debug workflow is reliable.

A release workflow will need to:

1. Decode the keystore into a temporary runner file.
2. Pass signing values to Gradle through environment variables or Gradle properties.
3. Run `./gradlew bundleRelease` for an Android App Bundle (`.aab`) or `./gradlew assembleRelease` for a release APK.
4. Upload the signed output as a protected artifact.
5. Remove the temporary keystore file after the build.

For Google Play, prefer a signed `.aab`. For direct testing, a signed release APK may be more convenient. Never reuse a public debug key for a production release.

## 8. Local verification status

The project’s production web build, TypeScript validation, dependency installation, and Capacitor synchronization were verified in the Manus environment. A native APK was **not claimed as locally generated** because the sandbox does not have a complete Android SDK installation. The GitHub Actions runner installs the required Android packages before running Gradle, so the authoritative APK result is the completed GitHub Actions job.

If the GitHub job fails, open the failed step first. Common causes are an incomplete repository upload, a missing `android/` directory, a workflow file placed under the wrong path, or a project lockfile that does not match `package.json`.

## References

[1]: https://docs.github.com/en/actions/writing-workflows/quickstart "GitHub Actions quickstart"
[2]: https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow "Manually running a GitHub Actions workflow"
[3]: https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts "GitHub Actions artifacts"
[4]: https://capacitorjs.com/docs/android "Capacitor Android documentation"
