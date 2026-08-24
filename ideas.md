# Hana design direction

## Three stylistic approaches

### Theme Name: Paper Constellation
Very Brief Intro: A warm editorial learning room built from oat paper, blush notes, sage accents, and small constellation pins. Hana feels like a thoughtful study partner whose world becomes richer as the learner progresses.
Probability: 0.07

### Theme Name: Quiet Workshop
Very Brief Intro: A tactile maker-space aesthetic with graphite, cream plastic, cobalt technical marks, and modular project artifacts. Hana feels practical, inventive, and ready to help turn understanding into something buildable.
Probability: 0.03

### Theme Name: Soft Signal
Very Brief Intro: A light, calm interface with translucent panels, gentle signal lines, and restrained technical blue. Hana feels observant and quietly clever, with a little more emphasis on chat and guidance.
Probability: 0.09

## Chosen approach: Paper Constellation

### Design Movement
Contemporary editorial collage meets soft paper-cut illustration, inspired by pinboards, annotated notebooks, and quiet study rooms rather than gamified dashboards.

### Core Principles
1. One kind next step: every screen should make the learner’s next action obvious without presenting a wall of choices.
2. Tactile memory: notes, pins, borders, paper grain, and small room details make progress feel held and visible.
3. Warm intelligence: Hana is capable and technically useful, but her tone is concise, human, and gently playful rather than corporate.
4. Calm momentum: motion should signal state changes—blink, pin placement, page turn, lamp glow—not create pressure.

### Color Philosophy
Oat and warm paper create a dependable base; blush and dusty rose make memory and celebration feel personal; sage gives rest and balance; butter yellow marks attention and small wins; ink provides editorial contrast; cobalt is reserved for technical topics and active chat guidance. The palette should feel lived-in, not sugary.

### Layout Paradigm
Use a pinboard rhythm: one large asymmetric feature card, two supporting cards, and small attached labels. The primary action stays near the visual anchor, while supporting context is offset like collected notes. On mobile, the pinboard collapses into a clear vertical story.

### Signature Elements
A four-petal Hana mark, sticky-note memory cards, and a warm desk-lamp glow recur across the home, chat, journey, and project states. Learning milestones appear as small constellation pins rather than large progress bars.

### Interaction Philosophy
Hana should respond like a companion who noticed what happened. Marking a step adds a pin, saves a useful memory only after confirmation, and changes the next recommendation. Every drawer and panel has a clear escape route and preserves the learner’s place.

### Animation
Use 160–240ms ease-out transitions for controls, gentle stagger for grouped cards, and reduced-motion fallbacks. Hana may blink, tilt her head, place a pin, or give a soft celebratory bounce only when those movements communicate state. Never use motion to create urgency.

### Typography System
Use Fraunces for emotional display headings and DM Sans for controls, chat, navigation, and learning content. Display headings use strong contrast and occasional italic emphasis; body copy stays compact with generous line-height. Technical labels use DM Sans with modest letter spacing and cobalt accents.

### Brand Essence
Hana is a warm learning companion for people building technical confidence one clear step at a time; she remembers the useful parts, explains without showing off, and helps each lesson become a project. Personality adjectives: observant, encouraging, quietly clever.

### Brand Voice
Headlines sound like a thoughtful study partner: specific, calm, and lightly playful. CTAs are direct and kind. Microcopy names the learner’s progress without exaggeration.

Example lines:
- “Let’s make APIs feel less mysterious.”
- “One clear thing is enough for today.”

### Wordmark & Logo
The mark is a four-petal pressed flower made from four rounded technical brackets around a small cobalt center. It doubles as a constellation node and a tiny robot chest emblem; the wordmark uses a custom-feeling lowercase Hana lockup rather than a default UI font.

### Signature Brand Color
Pressed Cobalt: #3157C8. It belongs only to technical guidance, active chat states, and Hana’s center mark so it remains ownable.

## Expanded companion ideas to include

Hana also gets a tiny daily ritual, Kind-step history, response modes, a learning constellation, project seeds at three scopes, a gentle return state, optional reflection capture, study-room changes, Focus mode, and visible memory/save controls. Additional ideas worth including are a “Hana’s hunch” suggestion chip for a surprising but relevant next connection, a conversation handoff that turns a chat answer into a saved project note, a confidence check that tracks learner confidence separately from completion, and a “show your work” mode that helps learners turn a finished mission into a portfolio explanation.

## Chat personality system

Hana is a literal small cream robot who notices context, explains in layers, and keeps a stable personality across the product. She starts with a short answer, offers a deeper route, asks one useful follow-up question when needed, and avoids pretending to know what she has not been told. She can be warm without being childish, playful without becoming noisy, and technically specific without becoming cold.

Her chat should support project context, current journey step, available study time, preferred explanation style, weak areas, recent questions, active project, and learner notes. The first implementation remains client-only and uses local persistence for demo memory; no secrets, API keys, sensitive information, or raw transcripts are saved by default.

## Style Decisions

Hana is always unmistakably a robot. The flower symbolism belongs to the surrounding study room, constellation pins, garden-like growth stages, pressed-flower mark, and calm palette; it must never replace the cream robot character.

The home composition should read as an asymmetric pinboard rather than a uniform SaaS dashboard. One dominant welcome story carries the emotional weight, while hunches, memories, quest notes, room artifacts, and labels behave like collected paper pieces around it.

Pressed Cobalt #3157C8 is reserved for precise technical guidance, active chat states, technical actions, constellation centers, and Hana’s core mark. Oat, sage, mist blue, dusty rose, butter, and ink carry the calmer emotional surfaces.

The primary brand lockup is “HANA — Your AI Learning Companion,” supported by the message “You don’t have to know what’s next. Hana does.” The wordmark should feel pressed-flower/bracket-derived rather than like ordinary lowercase UI text.

## Latest product guidance from user attachments

Hana should include a real Try Hana / Explore Demo mode that uses the same UI and interactions as the product, starts with a short replayable tour, unlocks sample content, and ends with choices for AI Engineering, Computer Science, and Find My Career Path. The latest direction removes voice interaction from this tour.

The learning loop should optimize for understanding, practice, and projects rather than completion or hours watched. A compact skill assessment can adjust the starting point; prerequisites should guide unlocks; each lesson should follow Learn → Try → Build → Check; resources should lead to active challenges; struggling learners should receive alternate explanations, examples, hints, simpler problems, prior steps, alternative resources, or review missions.

Hana should present one clear Today’s Mission, remember why a learner struggles, offer an always-available I’m Stuck flow, support Teach Hana, separate Learn and Build modes, include a safe Hana’s Lab for experiments, show the chain from today’s skill to larger skill to project to career, and grow a Skill Garden. Rewards should recognize understanding, practice, and building. Career recommendations should later reflect observed learning behavior. A weekly Hana report and project portfolio should capture skills, technologies, descriptions, GitHub links, screenshots, and learning notes. Energy modes should include Light, Normal, and Deep. Learners should be able to pause, switch paths, revisit lessons, change time and goals, and explore without shame.

Progressive disclosure is required: Hana gives a concise answer or option first, and the learner clicks for further information. Explanations should not appear automatically or overwhelm the screen.

## Attached professional roadmap direction
Hana’s career system should feel like a serious, structured tool for university students while keeping the robot companion warm. Roadmaps should progress from student context through foundation, core skills, specialization, projects, experience, portfolio, professional skills, job preparation, and career. Each stage should explain what to learn, why it matters, how to practice, what to build, skills gained, prerequisites, time, and the next step. The full roadmap should be explorable, but only the next important step should be prominent.

Career guidance should cover the work itself, important skills, technologies, useful university subjects, beginner-to-advanced growth, projects, portfolio expectations, internship preparation, job preparation, related paths, and transferable skills without promising employment or outcomes. Hana should be able to use student context such as degree, year, skill level, time, goals, existing skills, completed projects, internship goals, and preferred direction. Progress should include skills, practice, projects, portfolio, weak areas, and readiness signals, with periodic direction check-ins and safe path switching.

The roadmap should use clean timelines, skill maps, milestone sections, project cards, skill cards, and professional reports. It should not look like a children’s game. The coaching language should answer: what am I learning, why do I need it, how do I practice it, what can I build, and where can it take me.

## Latest attachment synthesis
The intended product journey is: Welcome → Discover interests → Learn the basics → Build small things → Explore careers → Choose a path → Build real projects → Portfolio and career. The app should not begin as a dashboard or long catalog. The first screen should be a friendly Hana greeting with one Start My Journey action. Career choice should use simple cards for Software Development, Artificial Intelligence, Cybersecurity, Data Science, Game Development, Cloud / DevOps, and I do not know yet, with Hana explaining the differences rather than expecting prior knowledge.

The roadmap should be the center of the product and use locked/unlocked stages. Only the current stage is available; completion should visibly unlock the next stage with a clear Continue action. Every stage should use Learn → Try → Build → Complete → Unlock. Favor doing over passive reading: a complete beginner should build something tiny, such as a personal greeting page, before being asked to study a long list of technologies. A project card should say what the learner is building, what they will learn, difficulty, time, and the first build action.

Each career roadmap must be complete and prerequisite-based, not a random technology list. Career paths include AI / ML Engineering, Software Engineering, Cybersecurity, Data Science / Data Engineering, Cloud / DevOps, and Web / Full-Stack Development. AI / ML should begin with programming and computer science foundations, mathematics, data tools, machine learning, deep learning, modern AI, AI application engineering, production, and portfolio/career preparation. APIs belong inside application engineering after the foundations.

Every roadmap stage should answer what to learn, why it matters, how to practice it, what to build, and what comes next. Hana should point learners to useful external resources such as a free course, documentation, practice platform, or project idea, without pretending every lesson must happen inside Hana. After learning, show “What can I do now?” with projects, practice, competitions, open-source, and beginner-safe experience opportunities. Opportunities should be personalized to the current stage, and online work should be framed as Build Your Experience with beginner-first options before freelancing or internships.

Chat should be available from roadmap and project contexts. Hana should answer current-stage questions with structured, readable formatting: a heading, a short numbered list, a small build suggestion, and a clear next action. The overall language must remain normal and beginner-friendly. Extra dashboards, giant lists, advanced information, and competing buttons should stay hidden until requested.
