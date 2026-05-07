import SectionHeader from "./SectionHeader";

const WHATS_NEW = [
  "🎬 50+ new short dramas added this week",
  "⚡ Faster streaming with reduced buffering",
  "🌙 Improved dark mode for night viewing",
  "🐛 Bug fixes and performance improvements",
];

const WhatsNew = () => (
  <section className="mb-9">
    <SectionHeader label="What's New" linkText="Version History" />
    <div className="text-[13px] text-g500 mb-1">Version 4.8.2</div>
    <div className="text-[13px] text-g500 mb-2.5">2 days ago</div>
    <ul className="pl-[18px] text-sm text-g900 leading-[1.7]">
      {WHATS_NEW.map((item, i) => (
        <li key={i} className="mb-0.5">{item}</li>
      ))}
    </ul>
  </section>
);

export default WhatsNew;
