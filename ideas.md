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
