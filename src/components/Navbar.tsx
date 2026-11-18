import { Command } from 'lucide-react';

interface NavbarProps {
  name: string;
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenCommandPalette: () => void;
}

const NAV_LINKS = [
  { id: 'missions', label: 'Missions' },
  { id: 'systems', label: 'Systems' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({
  name,
  onNavigateHome,
  onNavigateSection,
  onOpenCommandPalette,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-white/10 mc-glass-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 h-16">
        {/* Zone 1: Brand wordmark (single text element, one line) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
          className="font-display text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-[#E6EDF3] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EE6A6] rounded"
        >
          {name}
        </a>

        {/* Zone 2: 4 single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-[#9FB0C0]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection(item.id);
              }}
              className="whitespace-nowrap shrink-0 hover:text-slate-950 dark:hover:text-[#E6EDF3] transition-colors duration-150 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EE6A6] rounded py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (Command Palette trigger) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Open command palette (Ctrl+K or Cmd+K)"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3.5 py-2 text-xs font-mono font-medium text-slate-800 dark:text-[#E6EDF3] hover:border-[#0D9488] dark:hover:border-[#2EE6A6]/60 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EE6A6]"
          >
            <Command className="h-3.5 w-3.5 text-[#0D9488] dark:text-[#2EE6A6]" aria-hidden="true" />
            <span>Command</span>
            <kbd className="hidden sm:inline-block rounded border border-slate-300 dark:border-white/15 px-1.5 py-0.5 text-[10px] text-slate-500 dark:text-[#9FB0C0]">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
