const story = [
  {
    id: "intro",
    text: "You and your group of scientists arrive in England to present urgent climate research. Suddenly, a group of global warming deniers storm the room, shouting and flipping tables. The room fills with chaos. Do you run?",
    type: "choice",
    options: [
      { text: "Run", next: "split_path" },
      { text: "Don’t run", next: "death_intro" }
    ]
  },

  {
    id: "death_intro",
    text: "You hesitate for just a moment too long. The deniers overwhelm you. Everything fades to black. The world is fragile — if you don’t act fast, things can fall apart.",
    type: "end",
    outcome: "death"
  },

  {
    id: "split_path",
    text: "You sprint out of the building and reach a muddy path that splits in two. One path leads right, deeper into England. The other leads left, toward the coast.",
    type: "choice",
    options: [
      { text: "Go right", next: "lab_arrival" },
      { text: "Go left", next: "bunker_arrival" }
    ]
  },

  // -------- RIGHT PATH (LAB) --------

  {
    id: "lab_arrival",
    text: "You reach a hidden lab in the middle of England. Scientists are gathered around glowing screens, arguing about how to stop the global warming deniers.",
    type: "choice",
    options: [
      { text: "Help with planning", next: "lab_plan" },
      { text: "Don’t help", next: "lab_ignored" }
    ]
  },

  {
    id: "lab_ignored",
    text: "You stand around awkwardly. Nobody takes you seriously. After a while, security escorts you out into the cold rain.",
    type: "timeout",
    duration: 3000,
    next: "end_useless_lab"
  },

  {
    id: "end_useless_lab",
    text: "You wander off into the storm. The mission continues without you. Sometimes doing nothing is just another way of failing.",
    type: "end",
    outcome: "neutral"
  },

  {
    id: "lab_plan",
    text: "The scientists ask for your input. Do you want to focus on research or help build a device?",
    type: "choice",
    options: [
      { text: "Focus on research", next: "research_path" },
      { text: "Build a device", next: "device_choice" }
    ]
  },

  {
    id: "research_path",
    text: "You help analyze climate data and predict future disasters. The numbers look worse than expected. The room goes quiet.",
    type: "keypress",
    key: "Enter",
    next: "research_end"
  },

  {
    id: "research_end",
    text: "Your research helps the world prepare, but the crisis is far from over. Knowledge buys time — but only action can change the future.",
    type: "end",
    outcome: "hopeful"
  },

  {
    id: "device_choice",
    text: "You help design a strange machine. What do you build?",
    type: "choice",
    options: [
      { text: "Freeze machine", next: "freeze_machine" },
      { text: "Mind changer", next: "mind_changer" }
    ]
  },

  {
    id: "mind_changer",
    text: "The machine powers on… then sparks wildly. The deniers become even more aggressive and storm the lab. Everything catches fire.",
    type: "end",
    outcome: "death"
  },

  {
    id: "freeze_machine",
    text: "The freeze machine hums to life. Local temperatures drop slightly. It works — but only temporarily. You’ve bought the world some time.",
    type: "end",
    outcome: "temporary_success"
  },

  // -------- LEFT PATH (BUNKER) --------

  {
    id: "bunker_arrival",
    text: "You reach a bunker on the coast of England. People inside look relieved to see you. \"Glad you guys came in time. We have a plan to stop these deniers. They spread like a rat infestation!\"",
    type: "choice",
    options: [
      { text: "Listen to the plan", next: "bunker_plan" },
      { text: "Don’t listen", next: "bunker_kicked_out" }
    ]
  },

  {
    id: "bunker_kicked_out",
    text: "\"If you won’t listen, you’re useless to us,\" they say and shove you out into the cold.",
    type: "timeout",
    duration: 2500,
    next: "bunker_useless_simile"
  },

  {
    id: "bunker_useless_simile",
    text: "\"You guys are as useless as a satellite with the lens cap on.\" The bunker doors slam shut behind you.",
    type: "end",
    outcome: "rejected"
  },

  {
    id: "bunker_plan",
    text: "They explain their strategy and ask if you want to add something to the bunker.",
    type: "choice",
    options: [
      { text: "Yes, add something", next: "bunker_add_choice" },
      { text: "No", next: "bunker_kicked_out_2" }
    ]
  },

  {
    id: "bunker_kicked_out_2",
    text: "They glare at you. \"If you won’t help, you’re dead weight.\" You’re thrown out.",
    type: "end",
    outcome: "rejected"
  },

  {
    id: "bunker_add_choice",
    text: "What do you want to add to the bunker?",
    type: "choice",
    options: [
      { text: "Build a lab", next: "bunker_lab" },
      { text: "Build a weapon", next: "bunker_ai_weapon" }
    ]
  },

  {
    id: "bunker_lab",
    text: "You help set up a small lab for climate research and survival planning. It’s not perfect, but it gives people hope.",
    type: "end",
    outcome: "hopeful"
  },

  {
    id: "bunker_ai_weapon",
    text: "You build an AI-controlled defense system. At first it seems fine... then it glitches. Innocent workers step outside for fresh air — and the AI targets them.",
    type: "timeout",
    duration: 3000,
    next: "ai_disaster"
  },

  {
    id: "ai_disaster",
    text: "\"What the hell? You guys are no scientists, you're just like an algorithm trained on lies!\" You’re thrown out of the bunker. As you step outside, your own AI turns toward you.",
    type: "end",
    outcome: "death"
  }
];

export default story;