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
- [ ] Add subtle Hana idle motion, entrance motion, reaction motion, and reduced-motion fallback without making the interface noisy.
- [ ] Add socially warm companion moments that appear sparingly and can be quieted or dismissed.
- [ ] Expand chat to handle app-scoped code explanations, error diagnosis, concept questions, project creation, project planning, career guidance, and resource suggestions.
- [ ] Keep chat answers concise-first with one clear action, optional deeper detail, and visible context from the selected career and current step.
- [ ] Add code/text upload analysis to Teach Hana after the user confirms the upload, with size/type limits and clear privacy language.
- [ ] Make Hana’s moods and expressions react to learner questions, code errors, progress, confusion, success, and rest states.

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
