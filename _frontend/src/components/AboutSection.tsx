import SectionHeader from "./SectionHeader";

const TAGS = ["Entertainment", "Short Drama", "OTT", "Web Series", "Hindi", "Free"];

const AboutSection = () => (
  <section className="mb-9">
    <SectionHeader label="About this app" linkText="More" />
    <p className="text-sm text-g900 leading-[1.75] mb-2.5">
      Ek minute ka break? Story TV Dekh!
    </p>
    <p className="text-sm text-g900 leading-[1.75] mb-2.5">
      📺 Welcome to Story TV — India's fastest-growing short drama app. Whether you want quick
      entertainment during your chai break or binge-watch through the night, Story TV is your
      perfect companion.
    </p>
    <p className="text-sm text-g900 leading-[1.75] mb-2.5">
      🎬 Each short drama and movie is crafted to move you, with just 1-minute episodes that keep
      you hooked from start to finish. New stories drop daily at midnight — so you never run out of content.
    </p>
    <div className="flex flex-wrap gap-2 mt-4">
      {TAGS.map((t) => (
        <span
          key={t}
          className="border border-g300 rounded-full px-[18px] py-1.5 text-xs font-medium text-g700 cursor-pointer hover:bg-g100 transition-colors"
        >
          {t}
        </span>
      ))}
    </div>
  </section>
);

export default AboutSection;
