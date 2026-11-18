import { useEffect, useState } from 'react';
import { EDITORIAL_PORTFOLIO } from './data/portfolio';
import { Header } from './components/Header';
import { Reveal } from './components/Reveal';
import { WorkSection } from './components/WorkSection';

type Theme = 'light' | 'dark';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('editorial-theme', theme);
    } catch {
      // Ignore storage failures
    }
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const { profile, work, year } = EDITORIAL_PORTFOLIO;

  return (
    <div
      id="top"
      className="min-h-screen bg-[#F6F2EA] text-[#1A1A1A] dark:bg-[#171614] dark:text-[#F2EDE4]"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50 focus:bg-[#F6F2EA] focus:dark:bg-[#171614] focus:px-4 focus:py-2 focus:text-sm focus:border focus:border-[#E8452C] focus:text-[#1A1A1A] focus:dark:text-[#F2EDE4]"
      >
        Skip to content
      </a>

      <Header name={profile.name} />

      <main id="main-content">
        {/* OPENING: Wide & Breathing — First 5 Seconds Clarity */}
        <section
          aria-labelledby="hero-statement"
          className="mx-auto max-w-6xl px-5 sm:px-8 pt-14 pb-20 sm:pt-24 sm:pb-32 border-b border-[#1A1A1A]/12 dark:border-[#F2EDE4]/12"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            {profile.photoUrl ? (
              <div className="order-2 lg:order-1 lg:col-span-4">
                <figure className="border border-[#1A1A1A]/15 dark:border-[#F2EDE4]/15 bg-[#EDE7DB] dark:bg-[#1E1C19]">
                  <img
                    src={profile.photoUrl}
                    alt={profile.photoAlt}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/3] sm:aspect-[4/5] object-cover block"
                  />
                </figure>
              </div>
            ) : null}

            <div
              className={
                profile.photoUrl
                  ? 'order-1 lg:order-2 lg:col-span-8 space-y-6 lg:pl-4'
                  : 'lg:col-span-8 space-y-6'
              }
            >
              <h1
                id="hero-statement"
                className="font-serif text-[clamp(2.25rem,5.2vw,4.5rem)] leading-[1.06] font-normal tracking-tight text-[#1A1A1A] dark:text-[#F2EDE4] text-balance"
              >
                {profile.heroStatement}
              </h1>

              <p className="text-base sm:text-lg text-[#5C564F] dark:text-[#B5AEA2]">
                {profile.heroSubline}
              </p>

              <div className="flex flex-wrap items-center gap-7 pt-2">
                <a
                  href="#work-buzz-music-player"
                  className="editorial-link text-base font-medium text-[#E8452C] py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
                >
                  {profile.primaryJumpLabel}
                </a>
                <a
                  href="#work"
                  className="editorial-link text-sm text-[#5C564F] dark:text-[#A39B90] hover:text-[#1A1A1A] dark:hover:text-[#F2EDE4] py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
                >
                  {profile.secondaryJumpLabel}
                </a>
              </div>
            </div>

            {!profile.photoUrl && (
              <aside
                aria-label="Current work index"
                className="lg:col-span-3 lg:col-start-10 space-y-3 text-xs text-[#5C564F] dark:text-[#A39B90] border-t border-[#1A1A1A]/12 dark:border-[#F2EDE4]/12 pt-4 lg:border-t-0 lg:pt-0"
              >
                <div>
                  <span className="block text-[#1A1A1A] dark:text-[#F2EDE4] font-medium">
                    Shipped
                  </span>
                  <a
                    href="#work-buzz-music-player"
                    className="editorial-link mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
                  >
                    03 · Buzz Music Player
                  </a>
                </div>
                <div>
                  <span className="block text-[#1A1A1A] dark:text-[#F2EDE4] font-medium">
                    Documenting
                  </span>
                  <span>01 · SachAI, 02 · AetherAI</span>
                </div>
              </aside>
            )}
          </div>
        </section>

        {/* WORK: Varied Project Compositions */}
        <WorkSection
          entries={work}
          theme={theme}
          reducedMotion={reducedMotion}
        />

        {/* ABOUT: Unexpectedly Quiet Narrow Measure */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="border-t border-[#1A1A1A]/12 dark:border-[#F2EDE4]/12"
        >
          <div className="mx-auto max-w-2xl px-5 sm:px-8 py-24 sm:py-36">
            <Reveal>
              <div className="space-y-6">
                <h2
                  id="about-heading"
                  className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A] dark:text-[#F2EDE4]"
                >
                  About
                </h2>

                <p className="text-base sm:text-lg leading-relaxed text-[#1A1A1A] dark:text-[#F2EDE4]">
                  {profile.aboutParagraph}
                </p>

                {profile.personalDetail && (
                  <p className="text-base leading-relaxed text-[#5C564F] dark:text-[#B5AEA2]">
                    {profile.personalDetail}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ELSEWHERE: Compact Asymmetric Ledger */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="border-t border-[#1A1A1A]/12 dark:border-[#F2EDE4]/12"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-3">
                  <h2
                    id="contact-heading"
                    className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#1A1A1A] dark:text-[#F2EDE4]"
                  >
                    Elsewhere
                  </h2>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-[15px] leading-relaxed text-[#5C564F] dark:text-[#B5AEA2]">
                    {profile.skillsSentence}
                  </p>
                </div>

                <div className="lg:col-span-4 space-y-5 lg:text-right">
                  {profile.email && (
                    <div>
                      <a
                        href={`mailto:${profile.email}`}
                        className="editorial-link font-serif text-2xl font-normal tracking-tight text-[#1A1A1A] dark:text-[#F2EDE4] hover:text-[#E8452C] transition-colors break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}

                  <div className="flex flex-wrap lg:justify-end items-center gap-7 text-sm font-medium text-[#1A1A1A] dark:text-[#F2EDE4]">
                    <a
                      href={profile.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
                    >
                      GitHub
                    </a>
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* QUIET COLOPHON FOOTER */}
      <footer className="border-t border-[#1A1A1A]/12 dark:border-[#F2EDE4]/12">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#5C564F] dark:text-[#A39B90]">
          <span>
            {profile.name} · {year}
          </span>

          <button
            type="button"
            onClick={() =>
              setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
            }
            data-testid="theme-toggle-btn"
            className="editorial-link cursor-pointer py-1 hover:text-[#1A1A1A] dark:hover:text-[#F2EDE4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
          >
            {theme === 'light' ? 'Dark charcoal' : 'Warm paper'}
          </button>
        </div>
      </footer>
    </div>
  );
}
