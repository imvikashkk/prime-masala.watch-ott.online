interface SectionHeaderProps {
  label: string;
  linkText?: string;
}

const SectionHeader = ({ label, linkText }: SectionHeaderProps) => (
  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-g200">
    <span className="text-xl font-bold text-foreground">{label}</span>
    {linkText && (
      <a href="#" className="text-sm font-medium text-primary cursor-pointer hover:underline">
        {linkText} ›
      </a>
    )}
  </div>
);

export default SectionHeader;
