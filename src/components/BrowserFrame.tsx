import type { WorkEntry } from '../data/portfolio';

interface BrowserFrameProps {
  entry: WorkEntry;
}

export function BrowserFrame({ entry }: BrowserFrameProps) {
  return (
    <figure className="border border-[#1A1A1A]/15 dark:border-[#F2EDE4]/15 bg-[#EFE9DD]/55 dark:bg-[#1E1C19]">
      {/* Minimal flat 1px browser chrome */}
      <div className="flex items-center justify-between border-b border-[#1A1A1A]/12 dark:border-[#F2EDE4]/12 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full border border-[#1A1A1A]/30 dark:border-[#F2EDE4]/30" />
          <span className="h-2 w-2 rounded-full border border-[#1A1A1A]/30 dark:border-[#F2EDE4]/30" />
          <span className="h-2 w-2 rounded-full border border-[#1A1A1A]/30 dark:border-[#F2EDE4]/30" />
        </div>
        <span className="text-xs text-[#5C564F] dark:text-[#A39B90] truncate">
          {entry.liveUrl
            ? entry.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
            : entry.title}
        </span>
      </div>

      {/* Viewport surface */}
      {entry.screenshotUrl ? (
        <img
          src={entry.screenshotUrl}
          alt={entry.screenshotAlt}
          referrerPolicy="no-referrer"
          className="w-full aspect-[16/10] object-cover block"
        />
      ) : (
        <div className="aspect-[16/10] flex flex-col justify-between p-6 sm:p-8">
          <div className="text-xs text-[#5C564F] dark:text-[#A39B90]">
            {entry.numeral} — {entry.title}
          </div>

          {entry.hasInteractiveVisualizer ? (
            <div className="space-y-2 max-w-md">
              <p className="font-serif text-xl sm:text-2xl leading-snug text-[#1A1A1A] dark:text-[#F2EDE4]">
                Live audio playback, three visualizer modes, and time-synced lyrics.
              </p>
              <p className="text-sm text-[#5C564F] dark:text-[#A39B90]">
                Four versioned releases shipped from core playback to equalizer, sleep timer, and keyboard shortcuts.
              </p>
            </div>
          ) : (
            <div className="space-y-1.5 max-w-sm">
              <p className="font-serif text-xl text-[#1A1A1A] dark:text-[#F2EDE4]">
                Case study in preparation
              </p>
              <p className="text-sm text-[#5C564F] dark:text-[#A39B90]">
                Screenshots and engineering notes will appear here once finalized.
              </p>
            </div>
          )}

          <div className="text-xs text-[#5C564F] dark:text-[#A39B90]">
            {entry.liveUrl ? 'Available live' : 'Preview forthcoming'}
          </div>
        </div>
      )}
    </figure>
  );
}
