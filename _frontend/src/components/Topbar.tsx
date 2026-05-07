const Topbar = () => {
  return (
    <nav className="sticky top-0 z-50 h-[52px] flex items-center justify-center px-4 md:px-10 gap-4 border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-[180%]">
      <a
        href="#"
        className="flex items-center gap-2 text-[17px] font-semibold text-foreground whitespace-nowrap"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <polygon points="5,3 19,12 5,21" fill="hsl(var(--accent))" />
        </svg>
        Story TV
      </a>
    </nav>
  );
};

export default Topbar;
