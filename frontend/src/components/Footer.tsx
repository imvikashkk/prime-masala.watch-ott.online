const LINKS = ["Terms of Service", "Privacy", "About Story TV", "Contact"];

const Footer = () => (
  <footer className="max-w-[960px] mx-auto px-4 md:px-12 py-6 border-t border-g200 text-xs text-g500 flex gap-6 flex-wrap">
    {LINKS.map((l) => (
      <a key={l} href="#" className="text-g500 hover:text-foreground transition-colors">{l}</a>
    ))}
    <span className="ml-auto">© 2026 Story TV Entertainment Pvt. Ltd.</span>
  </footer>
);

export default Footer;
