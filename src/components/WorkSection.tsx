import type { WorkEntry } from '../data/portfolio';
import { hasPublishedProjectDetails } from '../utils/audioVisualizer';
import { BrowserFrame } from './BrowserFrame';
import { BuzzAudioVisualizer } from './BuzzAudioVisualizer';
import { Reveal } from './Reveal';

interface WorkSectionProps {
  entries: WorkEntry[];
  theme: 'light' | 'dark';
  reducedMotion: boolean;
}

function NarrativeFeature({
  entry,
  theme,
  reducedMotion,
}: {
  entry: WorkEntry;
  theme: 'light' | 'dark';
  reducedMotion: boolean;
}) {
  return (
    <article
      id={`work-${entry.slug}`}
      aria-labelledby={`work-title-${entry.slug}`}
      className="space-y-10 sm:space-y-12"
    >
      {/* Top Editorial Spread Header */}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end border-t border-[#1A1A1A]/15 dark:border-[#F2EDE4]/15 pt-10">
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-wrap items-baseline gap-4">
            <span
              aria-hidden="true"
              className="font-serif text-5xl sm:text-6xl leading-none font-normal text-[#E8452C] select-none"
            >
              {entry.numeral}
            </span>
            <span className="text-xs text-[#5C564F] dark:text-[#A39B90]">
              {entry.stageLabel}
            </span>
          </div>

          <h3
            id={`work-title-${entry.slug}`}
            className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#1A1A1A] dark:text-[#F2EDE4]"
          >
            {entry.title}
          </h3>
        </div>

        <div className="lg:col-span-5 space-y-4">
          {entry.summary && (
            <p className="text-lg leading-relaxed text-[#1A1A1A] dark:text-[#F2EDE4]">
              {entry.summary}
            </p>
          )}
          {(entry.liveUrl || entry.codeUrl) && (
            <div className="flex items-center gap-7 text-sm font-medium">
              {entry.liveUrl && (
                <a
                  href={entry.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link text-[#E8452C] py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
                >
                  Open live app
                </a>
              )}
              {entry.codeUrl && (
                <a
                  href={entry.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link text-[#1A1A1A] dark:text-[#F2EDE4] py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
                >
                  Inspect code
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Full-Width Interactive Frame + Web Audio Experiment */}
      <div className="space-y-6">
        {entry.screenshotUrl ? (
          <BrowserFrame entry={entry} />
        ) : null}

        {entry.hasInteractiveVisualizer && (
          <BuzzAudioVisualizer theme={theme} reducedMotion={reducedMotion} />
        )}
      </div>

      {/* Dense Two-Column Narrative */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 pt-2">
        {entry.whatAndWhy && (
          <div className="lg:col-span-6 space-y-2.5">
            <h4 className="text-xs font-medium text-[#5C564F] dark:text-[#A39B90]">
              What it does &amp; why it exists
            </h4>
            <p className="text-[15px] leading-relaxed text-[#1A1A1A] dark:text-[#F2EDE4]">
              {entry.whatAndWhy}
            </p>
          </div>
        )}

        <div className="lg:col-span-6 space-y-6">
          {entry.challengeAndDecision && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-medium text-[#5C564F] dark:text-[#A39B90]">
                How it was built &amp; decisions made
              </h4>
              <p className="text-[15px] leading-relaxed text-[#5C564F] dark:text-[#B5AEA2]">
                {entry.challengeAndDecision}
              </p>
            </div>
          )}

          {entry.nextImprovement && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-[#5C564F] dark:text-[#A39B90]">
                Next
              </h4>
              <p className="text-[15px] leading-relaxed text-[#5C564F] dark:text-[#B5AEA2]">
                {entry.nextImprovement}
              </p>
            </div>
          )}

          {entry.stack.length > 0 && (
            <p className="pt-4 border-t border-[#1A1A1A]/12 dark:border-[#F2EDE4]/12 text-sm text-[#5C564F] dark:text-[#A39B90]">
              {entry.stack.join(', ')}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function WorkSection({
  entries,
  theme,
  reducedMotion,
}: WorkSectionProps) {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24"
    >
      <div className="border-b border-[#1A1A1A]/15 dark:border-[#F2EDE4]/15 pb-5 mb-14 sm:mb-20 flex items-baseline justify-between gap-4">
        <h2
          id="work-heading"
          className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A] dark:text-[#F2EDE4]"
        >
          Selected Work
        </h2>
        <span className="text-xs text-[#5C564F] dark:text-[#A39B90]">
          Shipped &amp; in progress
        </span>
      </div>

      <div className="space-y-20 sm:space-y-28">
        {entries.map((entry, idx) => {
          const published = hasPublishedProjectDetails(entry);

          if (published) {
            return (
              <Reveal key={entry.slug}>
                <NarrativeFeature
                  entry={entry}
                  theme={theme}
                  reducedMotion={reducedMotion}
                />
              </Reveal>
            );
          }

          // Distinct asymmetric editorial treatments for undocumented entries (01 vs 02)
          const offsetRight = idx % 2 === 1;

          return (
            <Reveal key={entry.slug}>
              <article
                id={`work-${entry.slug}`}
                aria-labelledby={`work-title-${entry.slug}`}
                className="grid gap-6 lg:grid-cols-12"
              >
                <div
                  className={
                    offsetRight
                      ? 'lg:col-span-7 lg:col-start-5 border-t border-[#1A1A1A]/12 dark:border-[#F2EDE4]/12 pt-8 space-y-3'
                      : 'lg:col-span-7 space-y-3'
                  }
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="font-serif text-4xl sm:text-5xl leading-none font-normal text-[#E8452C] select-none"
                    >
                      {entry.numeral}
                    </span>
                    <span className="text-xs text-[#5C564F] dark:text-[#A39B90]">
                      {entry.stageLabel}
                    </span>
                  </div>

                  <h3
                    id={`work-title-${entry.slug}`}
                    className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A] dark:text-[#F2EDE4]"
                  >
                    {entry.title}
                  </h3>

                  <p className="text-[15px] leading-relaxed text-[#5C564F] dark:text-[#A39B90] max-w-lg">
                    Notes on what {entry.title} does, the trade-offs behind it, and
                    source links are being written.
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
