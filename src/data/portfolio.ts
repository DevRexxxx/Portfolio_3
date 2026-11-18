export type ProjectStage = 'shipped' | 'prototype' | 'experiment' | 'concept' | 'documenting';

export interface WorkEntry {
  numeral: '01' | '02' | '03';
  slug: string;
  title: string;
  stage: ProjectStage;
  stageLabel: string;
  summary: string | null;
  whatAndWhy: string | null;
  challengeAndDecision: string | null;
  nextImprovement: string | null;
  stack: string[];
  liveUrl: string | null;
  codeUrl: string | null;
  screenshotUrl: string | null;
  screenshotAlt: string;
  hasInteractiveVisualizer?: boolean;
}

export const EDITORIAL_PORTFOLIO = {
  profile: {
    name: 'Eshaan Singh Deo',
    heroStatement:
      'I build AI products, and the small details that make them feel good.',
    heroSubline: 'Third-year CSE student in Lucknow. Open to internships.',
    primaryJumpLabel: 'Read the shipped case study: Buzz Music Player',
    secondaryJumpLabel: 'All work',
    // [ADD PHOTO] Path or URL to a real portrait photograph of Eshaan Singh Deo.
    // Left null so no empty placeholder box appears in the visible layout.
    photoUrl: null as string | null,
    photoAlt: 'Portrait of Eshaan Singh Deo in Lucknow',
    // [ADD from LinkedIn] Expand or refine this first-person About note with a personal detail.
    aboutParagraph:
      'I am a third-year B.Tech Computer Science and Engineering student at SRMCEM in Lucknow, India (batch of 2028). I spend most of my time building full-stack web software and AI-powered products, paying close attention to the small details—keyboard shortcuts, timing, and responsive browser interfaces—that make software feel considered.',
    // [ADD from LinkedIn] Optional second paragraph with a personal detail.
    personalDetail: null as string | null,
    // [ADD from LinkedIn] Add remaining frontend, AI, and tooling skills once finalized.
    skillsSentence:
      'For browser interfaces and live audio, I use vanilla JavaScript and the Web Audio API. On the server, I build REST APIs with Python, Django, and Django REST Framework, backed by PostgreSQL on Supabase.',
    // [ADD email] Direct email address (rendered as a large contact link once provided).
    email: null as string | null,
    links: {
      github: 'https://github.com/DevRexxxx',
      linkedin: 'https://www.linkedin.com/in/eshaan-singh-deo-ba669433a',
    },
  },

  work: [
    {
      numeral: '01',
      slug: 'sachai',
      title: 'SachAI',
      stage: 'documenting',
      stageLabel: 'In documentation',
      // [ADD one-liner for SachAI]
      summary: null,
      // [ADD what SachAI does and why it exists]
      whatAndWhy: null,
      // [ADD what was technically or creatively challenging, and what you personally built or decided]
      challengeAndDecision: null,
      // [ADD what you learned or would improve next]
      nextImprovement: null,
      // [ADD stack for SachAI]
      stack: [],
      // [ADD live URL for SachAI]
      liveUrl: null,
      // [ADD GitHub code URL for SachAI]
      codeUrl: null,
      // [ADD real screenshot or looping video for SachAI]
      screenshotUrl: null,
      screenshotAlt: 'SachAI application screenshot',
    },
    {
      numeral: '02',
      slug: 'aetherai',
      title: 'AetherAI',
      stage: 'documenting',
      stageLabel: 'In documentation',
      // [ADD one-liner and clear descriptor distinguishing this AetherAI from other public projects]
      summary: null,
      // [ADD what AetherAI does and why it exists]
      whatAndWhy: null,
      // [ADD what was technically or creatively challenging, and what you personally built or decided]
      challengeAndDecision: null,
      // [ADD what you learned or would improve next]
      nextImprovement: null,
      // [ADD stack for AetherAI]
      stack: [],
      // [ADD live URL for AetherAI]
      liveUrl: null,
      // [ADD GitHub code URL for AetherAI]
      codeUrl: null,
      // [ADD real screenshot or looping video for AetherAI]
      screenshotUrl: null,
      screenshotAlt: 'AetherAI application screenshot',
    },
    {
      numeral: '03',
      slug: 'buzz-music-player',
      title: 'Buzz Music Player',
      stage: 'shipped',
      stageLabel: 'Shipped product · Four releases (v1–v4)',
      summary:
        'A full-stack music player built around live audio visualization and time-synced lyrics.',
      whatAndWhy:
        'Buzz is a full-stack web music player built with Django, Django REST Framework, vanilla JavaScript, PostgreSQL (Supabase), and the Web Audio API. I wanted listening in a browser tab to carry the responsiveness and small comforts of a dedicated desktop player—time-synced scrolling lyrics, a three-band equalizer, queue and playlist management, favourites, a sleep timer, OS media controls, keyboard shortcuts, and light/dark themes.',
      challengeAndDecision:
        'Rather than treating it as a single release, I shipped Buzz across four versioned milestones (v1 core playback through v4 advanced player) over 56 commits. On the backend, I built a REST API in Django and DRF alongside a Python CLI command to fetch and store time-synced lyrics in PostgreSQL; on the frontend, I wired the Web Audio API directly to three distinct visualizer modes (bars, waveform, and circular) without pulling in a frontend framework.',
      // [ADD what you learned or would improve next for Buzz Music Player]
      nextImprovement: null,
      stack: [
        'Django',
        'Django REST Framework',
        'Vanilla JavaScript',
        'PostgreSQL (Supabase)',
        'Web Audio API',
      ],
      liveUrl: 'https://music-player-vert-psi.vercel.app/',
      codeUrl: 'https://github.com/DevRexxxx/Music_Player',
      // [ADD 15-second demo video or screenshot of Buzz Music Player]
      screenshotUrl: null,
      screenshotAlt: 'Buzz Music Player interface',
      hasInteractiveVisualizer: true,
    },
  ] satisfies WorkEntry[],

  year: 2026,
};
