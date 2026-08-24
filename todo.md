# Hana implementation checklist

## Expanded companion experience
- [x] Replace the fixed 90-day AI engineering timeline with a flexible quest path based on learner energy, available time, and completed missions.
- [x] Make progression feel game-like through quests, unlockable constellation pins, gentle badges, discovery cards, and room changes without streak pressure or leaderboards.
- [x] Shift the visual palette toward calm oat, sage, mist blue, dusty rose, and butter accents with restrained cobalt only for technical guidance.
- [x] Keep Hana unmistakably a robot: cream/off-white body, black expressive screen, rounded 3D form, pink accents, and no literal flower body transformation.
- [x] Make Hana’s primary identity “HANA — Your AI Learning Companion” with the message “You don’t have to know what’s next. Hana does.”
- [x] Build the room as the growth canvas: seed, sprout, flowers, and fuller garden states unlock alongside plants, books, technology objects, collectibles, poses, and expressions.
- [x] Add Hana’s tiny daily ritual with 10-minute, 20-minute, and one-small-thing paths.
- [x] Add Kind-step history for meaningful learning moments without rankings or streak pressure.
- [x] Add Ask Hana response modes: short version, analogy, example, debug help, and deeper explanation.
- [x] Add the learning constellation with illustrated milestone pins.
- [x] Add the project seed drawer with Quick build, Portfolio build, and Hackathon build scopes.
- [x] Add the gentle return state after a learning gap.
- [x] Add optional reflection capture saved as a learner note.
- [x] Add study-room state changes that reflect progress.
- [x] Add Focus mode with timer, one task, and pause-for-later behavior.
- [x] Add visible trust controls: memory link, pause memory, clear memories, edit/delete, and save status.
- [x] Add Hana’s hunch suggestion chip for a relevant next connection.
- [x] Add conversation handoff from chat answer to saved project note.
- [x] Add confidence check separate from completion status.
- [x] Add “show your work” mode for turning a finished mission into a portfolio explanation.

## Hana identity and chat
- [x] Replace Baymax/old companion naming with Hana throughout the UI and copy.
- [x] Create a warm, observant, quietly clever cute-robot personality system.
- [x] Use Hana robot illustrations throughout welcome, chat, memory, completion, focus, and project states.
- [x] Add expression states for happy, sad-but-supportive, worried, confused, curious, proud, focused, sleepy, celebrating, surprised, and excited, with state-aware captions and accessible labels that react to chat, missions, voice, and celebrations.
- [x] Build a project-aware chat surface with context chips, recent questions, weak areas, active project context, and response mode controls.
- [x] Add deterministic motivational message rotation for step completion.
- [x] Add calm course-completion celebration and three low-pressure next actions.
- [x] Add roadmap Learn more panels and project Open project plan panels.
- [x] Add contextual resource links and Find a hackathon project panel.

## Quality
- [x] Ensure keyboard accessibility, visible focus states, responsive mobile layouts, and reduced-motion support.
- [x] Verify client-only demo persistence uses non-sensitive local data only.
- [x] Run build/type checks and capture representative screenshots before delivery.

## Career discovery
- [x] Add Find My Career Path as a third starting option beside AI Engineering and Computer Science.
- [x] Guide undecided students through a short visual conversation using buttons/cards instead of a long questionnaire.
- [x] Cover interests, preferred activities, coding, AI, creativity, math/data, cybersecurity, project type, work style, goals, and dislikes through concise prompts.
- [x] Analyze answers into 2–3 suitable career directions with fit reason, role summary, project examples, key skills, future roles, and a simple outlook.
- [x] Recommend one starting path and show a clear next step that can be saved into Hana memory and the flexible quest map.

## Secure AI integration
- [x] Upgrade Hana with a secure server-side AI foundation so provider credentials never reach the browser.
- [x] Add a project-aware chat contract for Hana’s personality, approved memory, current quest, active project, response mode, and career discovery context.
- [x] Add structured AI actions for career recommendations, project plans, debugging checklists, concise explanations, learner notes, confidence check-ins, and “show your work” portfolio summaries.
- [x] Add a clear uncertainty and safety behavior so Hana does not invent answers or overstate career guidance.
- [x] Expand Find My Career Path with explicit preferred project type and career goal prompts, while preserving short visual interaction.
- [x] Make the saved career recommendation drive a path-specific next mission in Hana Journey.
- [x] Make Hana Journey render recommendation-specific quest content and detail copy based on the saved career path, not the generic API quest list.
- [x] Replace hardcoded API-focused Journey/detail text with path-specific mission descriptions for Software Engineering, AI Engineering, Data Science, and Cybersecurity.
- [x] Replace the generic quests array in Hana Journey with career-path-specific quest sets for Software Engineering, AI Engineering, Data Science, and Cybersecurity.
- [x] Ensure all Journey-visible titles, topics, and detail copy switch based on the saved career recommendation, with no leftover API-specific labels when another path is selected.

## Demo and learning system
- [x] Add a clearly visible Try Hana / Explore Demo mode using the real app UI with all major features unlocked.
- [x] Add a replayable interactive demo tour covering Hana, sample mission, recommendation, resource, practice, chat, roadmap, project step, reward, and room change.
- [x] End Demo Mode with a choice among AI Engineering, Computer Science, and Find My Career Path, while preserving normal locks in real journeys.
- [x] Add a tiny optional skill assessment before a real journey and use it to adjust the starting point.
- [x] Model prerequisites such as Python basics, functions, APIs, automation, and AI agents so advanced topics do not unlock from clicks alone.
- [x] Give every lesson the Learn, Try, Build, Check structure with an active practice step after resources.
- [x] Add supportive struggle recovery: explain differently, example, hint, simpler problem, previous step, alternative resource, or review mission.
- [x] Add a weekly Hana review card based on recently learned topics.
- [x] Optimize progress for understanding, practice, and projects rather than hours watched or course completion.

## Companion modes and product depth
- [x] Add a persistent Today’s Mission surface with one clear task, time, reason, and Start action.
- [x] Add an always-available I’m Stuck action that opens learning-oriented hints without immediately revealing the answer.
- [x] Add Teach Hana for explaining a concept back in the learner’s own words.
- [x] Add separate Learn and Build modes with meaningful project outcomes.
- [x] Add Hana’s Lab Experiment Mode for safe APIs, prompts, code, AI tools, and project play.
- [x] Add a Where am I going? chain from today’s skill to bigger skill, project, and career.
- [x] Add a visual Skill Garden where demonstrated programming, AI, cloud, cybersecurity, and data skills grow distinct plants.
- [x] Add meaningful rewards only after understanding, practice, or building, including room decorations and Hana poses.
- [x] Add Career Explorer recommendations based on observed learning behavior, not only the initial conversation.
- [x] Add a visually shareable Weekly Hana Report with learned skills, built projects, strongest skill, and next direction.
- [x] Add a real Portfolio section for completed projects with description, technologies, demonstrated skills, GitHub link, screenshots, and learning notes.
- [x] Add real-world mission framing such as Make Hana fetch information from an API and Give Hana a memory.
- [x] Add Light, Normal, and Deep energy modes that reshape the mission without punishment.
- [x] Add occasional personality moments and a gentle enough-for-today rest state.
- [x] Let learners pause journeys, switch paths, revisit lessons, change time and goals, and explore other fields without feeling trapped.
- [x] Reflect Hana’s three layers in the architecture: Companion, Coach, and Builder.

## Final polish and progressive disclosure
- [x] Make Hana show a concise answer or option first, with a clearly labeled click-for-more-info control for deeper explanation.
- [x] Apply click-for-more behavior consistently to missions, career cards, roadmap links, resource cards, skills, rewards, and chat response modes.
- [x] Add the final illustrated demo, garden, builder, lab, portfolio, weekly review, and active-learning surfaces into the same real app shell.
- [x] Keep the latest requested experience voice-free and avoid automatic explanation overload.

## Conversational presence
- [x] Replace document-like static moments with Hana-led conversational turn-taking and short spoken-style responses.
- [x] Let Hana react to learner choices with deliberate moods, natural acknowledgements, and one useful follow-up question.
- [x] Add contextual response chips such as “Tell me more,” “Let me try,” “Give me a hint,” “Explain it another way,” and “Save this.”
- [x] Make mission, career, focus, demo, and project flows read like live conversations with Hana rather than static information panels.
- [x] Ensure click-for-more explanations feel like Hana opening a deeper conversational layer, not expanding a document.

## Conversational depth follow-up
- [x] Convert demo, career, focus, and project drawers into turn-based Hana conversations with short prompts, learner reply chips, and stateful follow-up lines.
- [x] Add contextual follow-up chips across key flows for hint, alternate explanation, try it, save this, and go deeper.
- [x] Route click-for-more actions through Hana response state and message updates instead of only toggling hidden text blocks.
- [x] Add consistent acknowledgement plus one useful follow-up question after learner choices in mission, energy, career, and project flows.

## Flow-specific conversational refinement
- [x] Convert demo, career, focus, and project drawers into explicit multi-step conversations with per-flow Hana prompts, learner choice chips, and stateful follow-up responses.
- [x] Add an alternate-explanation chip and wire hint, try, save, go-deeper, and alternate-explanation chips contextually within each major flow.
- [x] Replace expandedInfo-only detail reveals with Hana message/state updates that present deeper information as conversational replies.
- [x] Add acknowledgement plus one follow-up question handlers for project and focus choices so mission, energy, career, and project flows behave consistently.

## Simplified navigation and information density
- [x] Reduce the home page to one primary Hana conversation, one Today’s Quest, and compact navigation cards.
- [x] Move quests, garden, reports, learning loop, project details, and career explanations into focused Journey, Quests, Projects, Chat, and Profile panels.
- [x] Add a dedicated Quests entry point so quest details are not repeated across the home page.
- [x] Rewrite visible copy into short plain-language sentences with one clear action at a time.
- [x] Preserve click-for-more behavior so advanced explanation appears only after the user requests it.
- [x] Verify the desktop home surface fits within a short first viewport and mobile navigation stays easy to scan.

## Step-wise Hana experience
- [x] Replace the long Home page with a guided sequence: welcome, career choice, learning path, build choice, and optional hackathon branch.
- [x] Show only the current step’s information with one primary action and a concise Hana prompt.
- [x] Create focused Quests, Journey, Projects, Chat, and Profile destinations instead of exposing every feature on Home.
- [x] Let each career path show a clear “learn next” step, “build next” step, and optional “find a hackathon project” branch.
- [x] Add Back, Continue, Skip for now, and Change direction controls so the flow never traps the learner.

## Expressive companion and chat
- [x] Add subtle Hana idle motion, entrance motion, reaction motion, and reduced-motion fallback without making the interface noisy.
- [x] Add socially warm companion moments that appear sparingly and can be quieted or dismissed.
- [x] Expand chat to handle app-scoped code explanations, error diagnosis, concept questions, project creation, project planning, career guidance, and resource suggestions.
- [x] Keep chat answers concise-first with one clear action, optional deeper detail, and visible context from the selected career and current step.
- [x] Add code/text upload analysis to Teach Hana after the user confirms the upload, with size/type limits and clear privacy language.
- [x] Make Hana’s moods and expressions react to learner questions, code errors, progress, confusion, success, and rest states.

## Minimal interaction redesign
- [x] Reduce Hana’s shared visible prompt controls to one primary action and one clearly labeled More help action.
- [x] Remove the visible cluster of hint, try, tell me more, alternate explanation, and save controls from the shared panel header.
- [x] Explain the purpose of More help in plain language before revealing any secondary choices.
- [x] Keep advanced actions available inside Chat or the relevant focused workspace without presenting them all at once.
- [x] Add one visible Today’s Quest summary and a dedicated Journey panel so the simple step-wise path remains understandable.

## Step-flow refinement
- [x] Split the plan screen into distinct learning, build, and optional hackathon steps after career selection.
- [x] Reduce each step screen to one primary CTA, moving secondary actions into navigation or More help.
- [x] Add explicit Continue and Skip for now controls to the guided sequence and verify Back/Change direction behavior.

## Responsiveness polish
- [x] Make step changes and panel openings update immediately on click without waiting for AI or network work.
- [x] Add a lightweight drawer transition and instant visual pressed state, respecting reduced-motion preferences.
- [x] Show a clear Hana thinking state while chat requests are in flight and prevent duplicate sends.
- [x] Verify the responsiveness polish on desktop and mobile with the final validation suite.

## Final companion-quality fixes
- [x] Add a real Hana idle/reaction animation system tied to mood changes, with reduced-motion behavior.
- [x] Add a dismiss/quiet control and throttle for warm companion interjections.
- [x] Show current path and current step context inside Chat and keep responses concise-first with an explicit deeper path.
- [x] Add explicit project-creation and resource-suggestion chat actions.
- [x] Validate uploaded file extensions in code and handle file-reading failures gracefully.
- [x] Complete deliberate mood mapping for confusion, code errors, success, progress, and rest.

## Plain-language final pass
- [x] Use short, everyday English in Hana’s UI, missions, prompts, reports, chat fallbacks, and notifications.
- [x] Explain technical words immediately with simple words or a tiny example.
- [x] Make “I don’t understand” produce a simpler re-explanation instead of repeating the same wording.
- [x] Keep answers concise by default and reveal longer explanations only when the learner asks.
- [x] Remove professor-like, corporate, academic, and unnecessary wording from the learner-facing experience.

## Plain-language enforcement
- [x] Audit all visible Home copy and rewrite remaining formal or unclear wording in everyday English.
- [x] Add a deterministic confusion-recovery helper that detects “I don’t understand” and similar phrases and switches to a simpler response.
- [x] Add an explicit More detail action in Chat so deeper answers are requested, not automatic.
- [x] Add tests for confusion recovery and concise-first chat behavior.

## Plain-language completion fixes
- [x] Rewrite remaining visible labels such as direction, hackathon, portfolio, and project wording into everyday language or add a short explanation.
- [x] Ensure client helper tests are included by the Vitest configuration and pass in the project test command.
- [x] Add a deterministic test for concise-first mode and explicit More detail behavior.

## Final motion and mood verification
- [x] Add CSS rules for Hana’s idle float and mood-specific reaction motion, with reduced-motion fallback.
- [x] Throttle Hana companion interjections so each flow gets at most one automatic moment until the user changes context or reopens it.
- [x] Add a distinct progress mood path and deterministic tests for confusion, error, success, progress, and rest states.

## Career-first roadmap
- [x] Make career choice the first meaningful step after Hana’s welcome.
- [x] Add a dedicated visual roadmap for the selected career instead of only showing a generic Journey summary.
- [x] Show clear career stages in order: foundations to learn, practice missions, projects to build, and optional hackathon or real-world work.
- [x] Give each stage a short purpose, one primary action, and a visible progress state.
- [x] Connect roadmap stages to the matching Quests and Projects panels.
- [x] Let learners switch careers and regenerate the roadmap without losing the rest of their Hana progress.
- [x] Validate the roadmap against the user’s written roadmap requirements and visual preview; the supplied video was not reliably inspectable in this environment, so no unverified video details were copied.

## Navigation simplification
- [x] Remove Quests from desktop and mobile primary navigation.
- [x] Make Career Roadmap the place where the learner sees what to learn next.
- [x] Make Projects the place where the learner chooses what to build, with hackathon ideas inside it.
- [x] Remove duplicate quest entry points from Home and replace them with one roadmap or project action.
- [x] Keep existing quest content available as roadmap learning steps without presenting it as a separate feature.

## Real roadmap content
- [x] Replace generic roadmap labels with real beginner-friendly lessons for Software Engineering, AI Engineering, Data Science, and Cybersecurity.
- [x] Give every lesson a clear goal, simple explanation, tiny practice task, and “you’re ready” check.
- [x] Add specific buildable projects at starter, portfolio, and stretch levels for every career path.
- [x] Add project outcomes, suggested tools, skills practiced, and a simple first build step.
- [x] Keep roadmap copy concise and explain technical words in plain English.
- [x] Make Roadmap and Projects use the selected career’s real lesson and project content when the learner switches paths.

## Roadmap content validation fix
- [x] Replace stale generic lesson detail references with the new lesson goal/practice fields and restore a clean TypeScript build.

## Reference alignment
- [x] Read the attached design and wording reference and capture its actionable rules in Hana’s design notes.
- [x] Apply the reference’s visual hierarchy, tone, labels, and interaction language to the compact Home, Roadmap, Projects, and Chat surfaces.
- [x] Preserve Hana’s robot identity, career-first roadmap, and one-clear-action structure while applying the reference.
- [x] Validate the updated reference-aligned UI with tests, typecheck, production build, and responsive visual review.

## Explicit career choice
- [x] Make the first post-welcome screen clearly say “Choose your career path” and explain that the choice creates the roadmap.
- [x] Move career cards into that dedicated choice step instead of showing them as a long list on Home.
- [x] Keep only the selected career and one clear “See my roadmap” action after selection.
- [x] Preserve Find My Career Path as a visible third option in the career chooser.
- [x] Add Back, change direction, and mobile-friendly card behavior for the career-choice step.

## Reusable skill
- [x] Create a reusable skill that captures the Hana workflow: inspect existing app, simplify information architecture, establish robot companion identity, build career-first roadmaps, use plain language, add progressive disclosure, validate responsive behavior, and checkpoint the result.
- [x] Include reusable prompts, decision rules, implementation checklist, validation checklist, and common pitfalls in the skill.
- [x] Follow the skill-creator workflow and validate the generated SKILL.md structure before delivery.

## Beginner-first AI Engineering roadmap
- [x] Start AI Engineering with computer basics, problem-solving, and what programs do.
- [x] Teach Python basics before functions, data, files, APIs, automation, and AI tools.
- [x] Make every AI Engineering stage show a clear prerequisite so advanced topics cannot appear first.
- [x] Replace the first AI Engineering project with a tiny beginner program before introducing app-to-app communication.
- [x] Update the reusable Hana skill so career roadmaps always begin at the learner’s real starting level.

## Updated reference and final flow
- [x] Read the new reference and record its actionable design and wording rules in Hana’s design notes.
- [x] Make the visible user journey exactly Welcome → Choose a career → Roadmap → Projects and online work.
- [x] Keep Welcome focused on a short Hana greeting and one clear next action.
- [x] Make career choice a dedicated screen with a text prompt, clear options, and a simple explanation that the choice creates the roadmap.
- [x] Make the selected career open a visible career roadmap with learn, practice, build, and online-work stages.
- [x] Add an Online Work section with safe beginner-friendly real-world task ideas related to the selected career.
- [x] Let learners chat with Hana from inside the roadmap using concise, structured answers with headings, short paragraphs, and bullets when helpful.
- [x] Keep Hana as an expressive, encouraging tour guide with occasional progress and congratulations messages tied to actions.
- [x] Remove or hide extra surfaces that distract from the five-step flow.
- [x] Do not add unnecessary external APIs; use the existing secure AI layer unless a new integration is clearly required.

## Separate visual prototype — 2026-08-24
- [ ] Create a separate Hana prototype copy so the current published release is not overwritten.
- [ ] Keep the supplied Hana robot as visual inspiration while creating original, improved artwork and expressive states.
- [ ] Make Home mobile-first and minimal: Hana greeting, Today’s Mission, duration, reason, and one Start action.
- [ ] Refine Hana’s personality to calm, focused, warm, professional, and occasionally playful without childish or emotional-support language.
- [ ] Add secure cloud/user-account memory for university, semester, career, skills, progress, projects, and approved conversation context.
- [ ] Preserve complexity behind the scenes and avoid onboarding instructions, feature walls, and long explanatory paragraphs.
- [ ] Validate the separate prototype on mobile and desktop before delivery.
- [ ] Add Vitest coverage for the memory contract and Today’s Mission selection behavior.

## Separate visual prototype — 2026-08-24
- [x] Create a separate Hana prototype copy so the current published release is not overwritten.
- [x] Keep the supplied Hana robot as visual inspiration while creating original, improved artwork and expressive states.
- [x] Make Home mobile-first and minimal: Hana greeting, Today’s Mission, duration, reason, and one Start action.
- [x] Refine Hana’s personality to calm, focused, warm, professional, and occasionally playful without childish or emotional-support language.
- [x] Add secure cloud/user-account memory for university, semester, career, skills, progress, projects, and approved conversation context.
- [x] Preserve complexity behind the scenes and avoid onboarding instructions, feature walls, and long explanatory paragraphs.
- [x] Validate the separate prototype on mobile and desktop before delivery.
- [x] Add Vitest coverage for the memory contract and Today’s Mission selection behavior.
- [x] Keep the existing secure server-side AI layer; no new external API was needed for this prototype.
- [x] Host the separate prototype on a temporary public preview URL and verify the Home screen loads successfully.
- [ ] Publish this separate prototype at a stable public URL without overwriting the existing Hana release.
- [x] Correct the separate prototype page order so the first screen is only Hana’s greeting, the next moment focuses on Today’s Mission, and the third screen asks the student to choose a career.
- [x] Remove the incorrect one-screen Home implementation from the separate prototype.
- [x] Revalidate the corrected page sequence on mobile before sharing another preview.
- [x] Redesign only the Home screen around Hana as the visual focus and Today’s Mission as the single primary task.
- [x] Remove secondary cards, feature explanations, dashboard content, and extra Home actions that compete with the mission.
- [x] Add the requested bottom navigation labels: Home, Journey, Projects, Opportunities, Ask Hana.
- [x] Apply a premium cream, muted rose, lavender, sage, and soft-blue visual language with original expressive Hana treatment.
- [x] Validate only the Home screen on mobile and desktop before continuing to other screens.

## Complete product specification follow-through — 2026-08-24
- [x] Preserve Screen 1 as Hana greeting only with one ready action and no feature content.
- [x] Preserve Screen 2 as career choice only, including Other and Help me find my path, without mission or dashboard content.
- [ ] Add Screen 3 university profile for university, degree, and semester.
- [ ] Add safe curriculum retrieval with an official-source preference and manual Add / Edit Subjects fallback when verification fails.
- [ ] Keep post-onboarding Home focused on one automatically selected Today’s Step card and the exact five-item bottom navigation.
- [ ] Use the label Your Journey instead of Roadmap and keep learning complexity behind the current step.
- [ ] Keep Projects, Opportunities, and Ask Hana as focused destinations rather than Home cards.
- [ ] Preserve original expressive Hana artwork and the cream, rose, lavender, sage, blue, ink design tokens.
- [ ] Validate the ordered flow and prevent invented university subjects or unsupported curriculum claims.

## Adaptive journey architecture — 2026-08-24
- [x] Replace the fixed Python mission with a study-area-first onboarding question.
- [x] Add study areas for Programming, AI / Machine Learning, Web Development, App Development, Cybersecurity, Data Science, Game Development, Computer Science Fundamentals, Cloud / DevOps, Robotics, UI/UX, and Something else / I don’t know yet.
- [x] Make Something else open a text field asking what the student would like to learn.
- [x] Keep Help me find my path as a guided discovery branch instead of forcing a career selection.
- [x] Collect current level, goal, available study time, interests, and preferred activities through short steps.
- [x] Devise different prerequisite sequences and Today’s Step content for each selected study area.
- [x] Adapt the journey based on progress, failed checks, current projects, and changing goals.
- [x] Add tests proving Cybersecurity and UI/UX do not start with the Python mission.

## Connected AI providers — 2026-08-24
- [x] Enable the existing OpenAI and Google Gemini connectors only after the user’s review confirmation.
- [x] Route Hana chat through a provider-aware server-side AI layer with a reliable fallback.
- [x] Use structured AI output for adaptive journey generation, including prerequisites, first step, practice, and project direction.
- [x] Keep provider credentials and approved student memory on the server; never expose them in the browser.
- [x] Add tests for provider fallback, schema validation, and privacy-safe context shaping.

## Three starting pathways — 2026-08-24
- [ ] Replace the direct study-area prompt with three starting choices: Build My Career, Create My Own Journey, and Learn a Skill & Earn.
- [ ] Keep Build My Career focused on selecting a career and generating a personalized career Journey.
- [ ] Add Create My Own Journey questions for achievement, existing knowledge, built work, study time, and target level.
- [ ] Let Create My Own Journey verify known skills and skip demonstrated prerequisites instead of restarting from zero.
- [ ] Add Learn a Skill & Earn with a small set of practical-skill recommendations and no income or employment guarantees.
- [ ] Convert Career, Custom Journey, and Skill & Earn into one unified Your Journey system.
- [ ] Track active step, verified or skipped skills, mastery checks, projects, demonstrated skills, goals, portfolio work, opportunities, and direction in the unified journey model.
- [ ] Allow Hana to update the Journey when the student changes direction instead of forcing a restart.

## GitHub progress source — 2026-08-24
- [ ] Verify that ismatfida1/baymax-care-companion is accessible and identify its default branch.
- [ ] Confirm whether the current session has permission to write to the repository.
- [ ] Prepare a non-destructive sync of the separate Hana prototype into the repository.
- [ ] Save the prototype progress to a clearly named branch or commit if write access is available.
- [ ] Validate the repository state after syncing and report any access blocker without overwriting unrelated work.

## Browser and GitHub connection — 2026-08-24
- [ ] Inspect whether My Browser is available and whether it is currently enabled.
- [ ] Enable My Browser and GitHub through the supported connector flow.
- [ ] Connect the user’s browser session when GitHub login or repository access requires it.
- [ ] Verify access to ismatfida1/baymax-care-companion before syncing any files.

## Supabase connection — 2026-08-24
- [ ] Inspect whether a Supabase connector already exists and whether it is enabled.
- [ ] Enable or request Supabase access without exposing project keys in source code.
- [ ] Verify Supabase can support Hana’s account memory and unified Journey data safely.

## End-to-end Hana app build — 2026-08-24
- [ ] Build the approved greeting screen and three starting pathways without crowding the first view.
- [ ] Build adaptive onboarding for Build My Career, Create My Own Journey, and Learn a Skill & Earn.
- [ ] Build one unified Your Journey engine with Learn, Practice, Demonstrate, Master, and Unlock next step states.
- [ ] Store active journey progress, verified skills, mastery checks, projects, goals, portfolio work, opportunities, and direction in account memory.
- [ ] Build focused Journey, Projects, Opportunities, and Ask Hana destinations with the exact bottom navigation.
- [ ] Keep AI provider calls server-side and use connected OpenAI, Gemini, and existing fallback services safely.
- [ ] Use Supabase-backed capabilities only where they improve account memory or journey persistence.
- [ ] Validate the full app with tests, typecheck, production build, and mobile/desktop browser checks.

## Expo mobile app conversion — 2026-08-24
- [ ] Create a separate Expo SDK 54 mobile project without overwriting the web prototype or published app.
- [ ] Recreate greeting-first onboarding and the three starting pathways in native-compatible React Native screens.
- [ ] Add adaptive subject, career, custom, and skill journey flows to the mobile app.
- [ ] Add mobile Journey, Projects, Opportunities, Ask Hana, and account-memory surfaces.
- [ ] Keep AI and Supabase credentials server-side and reuse the connected provider routing.
- [ ] Add native-safe asset handling, navigation, press feedback, and safe-area layout.
- [ ] Validate mobile web preview, TypeScript, tests, and production-compatible build output.

## GitHub Actions Android build — 2026-08-24
- [x] Inspect the existing Capacitor Android project and Gradle/SDK requirements.
- [x] Add `.github/workflows/android-build.yml` for Ubuntu Java, Android SDK, Node, web build, Capacitor sync, debug APK, and artifact upload.
- [x] Keep the existing Capacitor architecture and Hana integrations unchanged.
- [x] Write `ANDROID_BUILD.md` with GitHub setup, Actions run, phone APK download, and signed release instructions.
- [x] Validate the workflow locally as far as the sandbox allows and document any missing local SDK limitation.
- [ ] Verify the exact repository and folder to upload or push.

## Push and run Android Actions — 2026-08-24
- [x] Verify the target Hana Android GitHub repository and current remote state.
- [x] Push the contents of `/home/ubuntu/hana-android-app` to the repository root without nested directory wrapping.
- [x] Verify `.github/workflows/android-build.yml` is at the repository root.
- [x] Run the `Android debug APK` workflow.
- [x] Fix any GitHub Actions build failures without changing Hana features or integrations, then rerun the workflow.
- [x] Report the final workflow and APK artifact status.

## Hana Android UI and feature repair — 2026-08-24
- [x] Reproduce and diagnose missing Hana artwork and incorrect color/text rendering in the pushed Android project.
- [x] Restore readable typography and contrast across the app.
- [x] Restore working roadmap navigation and career-specific roadmap content.
- [x] Restore online opportunities/competition content and working external links.
- [x] Validate the repaired UI and feature flows before rebuilding the APK.
- [ ] Push the repair and rerun the Android debug APK workflow.

## Full-day detailed Hana journey — 2026-08-24
- [x] Replace one-hour-style journey framing with a timeline that starts today and supports a full study day.
- [x] Make each journey step detailed with purpose, prerequisites, lesson outline, practice, demonstration, mastery check, project outcome, and next unlock.
- [ ] Add unified University Coach and Career Coach context without making the first screen dense.
- [x] Preserve adaptive paths for career, custom journey, and skill-to-earn pathways.
- [ ] Preserve secure memory fields for university, degree, semester, subjects, skills, projects, progress, opportunities, competitions, struggles, and preferences.
- [x] Validate all attached requirements against the implementation before delivery.

## Curated roadmap resources — 2026-08-24
- [x] Select only necessary resources from the user-provided links and attachments.
- [x] Use one best resource per roadmap step and no noisy channel directories.
- [x] Verify the selected links and remove or flag broken, duplicate, redirect, or unnecessary links.
- [x] Update Hana’s roadmap resource labels and wording to stay simple.
- [x] Validate and push the curated resource update.

## Master product specification comparison — 2026-08-24
- [ ] Read and extract the complete attached master specification.
- [ ] Audit the current web/mobile UI, adaptive journey, memory, AI, opportunities, resources, and Android packaging against the specification.
- [ ] Record an honest implemented/partial/missing gap assessment.
- [ ] Report current functionality separately from future work.

## Persistent student context system — 2026-08-24
- [x] Inspect the existing schema, database helpers, routers, AI context, journey model, UI, and tests.
- [x] Design one database-backed source of truth for profile, skills, progress, projects, opportunities, portfolio, readiness, preferences, and learning history.
- [x] Implement reusable `getStudentContext`, `updateStudentProfile`, `getStudentSkills`, `getStudentProgress`, `getStudentProjects`, `getStudentCareerContext`, and `buildHanaContext` helpers.
- [x] Wire Hana AI and future coach-facing procedures to the assembled student context.
- [x] Add tests and apply/verify the migration without duplicating fake progress.
- [x] Validate the unchanged UI behavior and document authentication requirements.

## API-integrated context completion — 2026-08-24
- [x] Verify all configured AI providers and server-side fallback behavior remain intact.
- [x] Complete the database-backed student context integration for every Hana AI request.
- [x] Persist recent Hana conversations without storing secrets or duplicating progress.
- [x] Add tests for context-aware responses and prerequisite-aware recommendations.
- [x] Validate web and Android builds end to end before delivery.

## Shared path-based roadmap contract — 2026-08-24
- [x] Add shared `PathType`, `RoadmapInput`, and `RoadmapNode` contracts.
- [x] Map career, skill-to-earn, create-own, and not-sure onboarding choices to the shared contract.
- [x] Include university, degree, semester, and existing skills in roadmap generation input.
- [x] Preserve locked, active, and complete status with prerequisite IDs.
- [x] Add tests for path mapping, prerequisite order, and existing-skill handling.

## Final release audit and links — 2026-08-24
- [x] Audit the latest repository against the master requirements and current gap report.
- [x] Run final tests, typecheck, production build, and inspect the latest commit.
- [x] Verify the Android Actions run and APK artifact.
- [x] Verify the separate public website URL and publication status.
- [x] Report exact completion status and concise installation/publishing steps.

## Simplify app and restore study links — 2026-08-24
- [x] Reproduce the reported broken app flow and inspect runtime logs.
- [x] Simplify Hana to one clear next action at a time.
- [x] Make the current learning step show a visible study link and clear Start studying action.
- [x] Repair roadmap navigation and guest/authenticated behavior.
- [x] Validate and publish the repaired separate website.

## Next priority: University profile and Today context — 2026-08-24
- [x] Add a compact profile setup for university, degree, semester, subjects, and available study time.
- [x] Persist profile changes through `studentContext.updateProfile` instead of local-only state.
- [x] Load the saved profile into the existing demo so Hana’s current plan reflects it.
- [x] Add tests for profile normalization and persistence contract.
- [ ] Validate and publish the updated demo.

## Complete 60-feature Hana implementation — 2026-08-24
- [ ] Audit all 60 checklist items against the current website and Android source.
- [ ] Implement the core student, learning, mastery, project, opportunity, AI, memory, companion, tracking, and admin features from the checklist.
- [ ] Preserve one database-backed source of truth and existing AI/Capacitor integrations.
- [ ] Add tests, migrations, accessibility checks, and web/mobile validation for the complete scope.
- [ ] Build and verify the final Android APK through GitHub Actions.
- [ ] Publish and verify the final separate website.

## Final Hana 60-feature plain-language release — 2026-08-24
- [ ] Audit the current app against all 60 requested feature names and the full master specification.
- [ ] Implement all required core, coaching, tracking, companion, opportunity, admin, and link features using real data.
- [ ] Make every student-facing explanation simple enough for a non-CS learner.
- [ ] Keep one clear action per screen and one best study link per learning step.
- [ ] Validate website, database, AI context, Android build, and published demo end to end.

### Verified implementation slice — unified coaching context and mastery
- [x] Add persisted mastery-check history to the single student profile record.
- [x] Require a relevant written explanation before marking a learning step complete.
- [x] Unlock the next roadmap step from stored completion evidence and prerequisites.
- [x] Add the protected `studentContext.submitMastery` procedure.
- [x] Add a compact mastery-check UI to the active Journey step.
- [x] Add the protected `studentContext.coachContext` adapter for all eight coaching modules.
- [x] Add tests for mastery evaluation and all eight shared coach modules.
- [x] Validate with 14 passing tests, TypeScript check, and production build.

## Layout and roadmap repair — 2026-08-24
- [x] Prevent all text and bottom-navigation labels from overlapping at mobile and desktop widths.
- [x] Keep Journey and Projects as distinct navigation destinations with non-overlapping labels.
- [x] Render the roadmap as clear numbered steps with a simple project suggestion after each step.
- [x] Add Ismat Fida signature branding in appropriate About/profile areas without cluttering learning screens.
- [x] Keep an always-available custom career requirement field for deeply written user goals.
- [x] Verify secure OpenAI/Gemini provider routing for career discovery and journey decisions.
- [x] Add tests and validate responsive UI, production build, website publication, and Android workflow.

## Screenshot-reported blockers — 2026-08-24
- [x] Fix the public OAuth callback failure so the demo does not show `{"error":"OAuth callback failed"}`.
- [x] Prevent mobile bottom-navigation labels from overlapping; use compact readable labels and safe spacing.
- [x] Ensure the selected career is persisted and used to build the first roadmap step.
- [x] Make Cybersecurity start with networking, Linux, and security foundations rather than Python or generic programming.
- [x] Validate all career roadmap defaults and the public demo after the fix.

- [x] Pass university, degree, semester, and saved demonstrated skills into the AI journey designer so career roadmaps are personalized rather than generic.

- [x] Add a dedicated Mathematics for Computing roadmap with foundations before coding-heavy work.
- [x] Add a compact University Coach entry point that reuses the student’s stored degree, semester, and subjects through Hana’s existing context-aware chat.

- [x] Show a calm skeleton loading animation while Hana generates a personalized career roadmap.

- [x] Move Ask Hana out of bottom navigation and expose it as a prominent top-level chat action.
- [x] Keep Home, Journey, Projects, Opportunities, and Profile as the five bottom-navigation items.

## Final web version — confirmed scope
- [ ] Publish the final confirmed Hana web experience over the existing deployment.
- [x] Require sign-in for the main app and preserve secure cloud memory across devices.
- [x] Add password-protected authorized demo access from the sign-in screen.
- [x] Keep five-item navigation: Home, Journey, Projects, Opportunities, Profile; expose Ask Hana at the top level.
- [ ] Add free labeled resources, adaptive roadmap approval, small roadmap projects, big final projects, progress, creator information, and security protections.
