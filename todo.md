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
