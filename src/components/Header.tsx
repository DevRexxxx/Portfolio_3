interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  return (
    <header className="border-b border-[#1A1A1A]/12 dark:border-[#F2EDE4]/12">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-5 sm:px-8 h-16">
        <a
          href="#top"
          className="font-serif text-lg sm:text-xl font-medium tracking-tight text-[#1A1A1A] dark:text-[#F2EDE4] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
        >
          {name}
        </a>

        <nav
          aria-label="Primary"
          className="flex items-center gap-6 sm:gap-8 text-sm text-[#1A1A1A] dark:text-[#F2EDE4]"
        >
          <a
            href="#work"
            className="editorial-link whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
          >
            Work
          </a>
          <a
            href="#about"
            className="editorial-link whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
          >
            About
          </a>
          <a
            href="#contact"
            className="editorial-link whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] rounded"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
