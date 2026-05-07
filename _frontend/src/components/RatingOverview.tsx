import { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

const RATING_BARS = [
  { label: 5, pct: 58 },
  { label: 4, pct: 18 },
  { label: 3, pct: 8 },
  { label: 2, pct: 4 },
  { label: 1, pct: 12 },
];

const ALL_REVIEWS = [
  {
    name: 'Rajesh Sharma',
    initial: 'P',
    gradient: 'from-blue-500 to-sky-300',
    stars: 5,
    date: 'Mar 28, 2026',
    text: 'Aaj maine ye app download kiya hai aur yeh app bahut accha hai. sabhi stories bahut hi acchi hain.',
    helpful: 142,
  },
  {
    name: 'Ravi Kumar',
    initial: 'R',
    gradient: 'from-orange-500 to-amber-300',
    stars: 4,
    date: 'Mar 15, 2026',
    text: 'Bahut hi accha hai maza hi aa gaya.',
    helpful: 87,
  },
  {
    name: 'Aman Mishra',
    initial: 'A',
    gradient: 'from-green-600 to-green-300',
    stars: 5,
    date: 'Mar 5, 2026',
    text: 'Best app for short dramas in India!',
    helpful: 213,
  },
  {
    name: 'Pinku Singh Yadav',
    initial: 'P',
    gradient: 'from-purple-500 to-violet-300',
    stars: 4,
    date: 'Feb 28, 2026',
    text: 'Interface bahut smooth hai. Content bhi kaafi variety mein available hai. Recommended!',
    helpful: 98,
  },
  {
    name: 'Deepak Lokhande',
    initial: 'D',
    gradient: 'from-red-500 to-rose-300',
    stars: 5,
    date: 'Feb 22, 2026',
    text: 'Ek dum mast app hai! Roz naye episodes aate hain, kabhi bore nahi hota.',
    helpful: 176,
  },
  {
    name: 'Sumit Kalal',
    initial: 'S',
    gradient: 'from-sky-500 to-cyan-300',
    stars: 3,
    date: 'Feb 14, 2026',
    text: 'App achhi hai, Maza hi aa haya. Videos dekh k maza hi aa gaya.',
    helpful: 54,
  },
  {
    name: 'Vikram Kumar',
    initial: 'V',
    gradient: 'from-amber-600 to-yellow-300',
    stars: 5,
    date: 'Feb 7, 2026',
    text: 'Downloaded kiya ek week pehle aur ab iske bina nahi reh sakta. Drama quality superb hai!',
    helpful: 203,
  },
  {
    name: 'Kunal Pandey',
    initial: 'K',
    gradient: 'from-emerald-600 to-teal-300',
    stars: 4,
    date: 'Jan 30, 2026',
    text: 'Storylines bahut interesting hain. Family ke saath baith ke dekh sakte hain.',
    helpful: 119,
  },
  {
    name: 'Amit Chourasia',
    initial: 'A',
    gradient: 'from-violet-600 to-purple-300',
    stars: 2,
    date: 'Jan 22, 2026',
    text: 'Kuch shows 2-3 din ke baad hi subscription maangne lagte hain. Thoda costly lag raha hai.',
    helpful: 61,
  },
  {
    name: 'Naman Pandey',
    initial: 'N',
    gradient: 'from-pink-500 to-fuchsia-300',
    stars: 5,
    date: 'Jan 15, 2026',
    text: 'Maine apni saari friends ko recommend kiya hai. Har genre mein content hai. Love it!',
    helpful: 287,
  },
  {
    name: 'Rohan Kumar',
    initial: 'R',
    gradient: 'from-cyan-600 to-blue-300',
    stars: 4,
    date: 'Jan 8, 2026',
    text: 'Very good app. Subtitles bhi available hain regional languages mein.',
    helpful: 74,
  },
  {
    name: 'Amit Desai',
    initial: 'A',
    gradient: 'from-yellow-600 to-amber-300',
    stars: 5,
    date: 'Dec 30, 2025',
    text: 'Pehle episode se hi hook ho gayi. Binge-watching ke liye perfect app!',
    helpful: 165,
  },
];

const BATCH_SIZE = 4;

const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3;
  return (
    <span className="text-star text-base tracking-wider">
      {'★'.repeat(full)}
      {half ? '☆' : ''}
      {'☆'.repeat(Math.max(0, 5 - full - (half ? 1 : 0)))}
    </span>
  );
};

const RatingOverview = () => {
  const barsRef = useRef<HTMLDivElement>(null);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  // Animate rating bars on scroll into view
  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTimeout(() => setBarsAnimated(true), 100);
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const visibleReviews = ALL_REVIEWS.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_REVIEWS.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, ALL_REVIEWS.length));
  };

  return (
    <section className="mt-9">
      <SectionHeader label="Ratings & Reviews" linkText="See All" />
      <div className="text-xs text-g500 mb-4">
        Ratings and reviews are verified ⓘ
      </div>

      {/* Overview: big score + bar chart */}
      <div ref={barsRef} className="flex gap-7 items-start mb-6">
        <div className="text-center shrink-0 min-w-[80px]">
          <div className="text-[64px] font-bold leading-none text-foreground tracking-tight">
            4.1
          </div>
          <StarRating rating={4.1} />
          <div className="text-xs text-g500 font-medium mt-1">
            1.17L Ratings
          </div>
        </div>
        <div className="flex-1 max-w-[280px] pt-1.5 space-y-1.5">
          {RATING_BARS.map((b) => (
            <div key={b.label} className="flex items-center gap-2">
              <span className="text-[13px] text-g500 w-2.5 text-right font-semibold">
                {b.label}
              </span>
              <div className="flex-1 h-2 bg-g200 rounded overflow-hidden">
                <div
                  className="h-full rounded bg-green-600 transition-[width] duration-[800ms] ease-out"
                  style={{ width: barsAnimated ? `${b.pct}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      {visibleReviews.map((r, i) => (
        <div
          key={i}
          className="bg-g50 rounded-2xl px-5 py-[18px] mb-3 border border-g200 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-br ${r.gradient} flex items-center justify-center text-[15px] font-semibold text-white shrink-0`}
            >
              {r.initial}
            </div>
            <span className="text-sm font-semibold text-foreground">
              {r.name}
            </span>
            <span className="text-[11px] text-g500 ml-auto">{r.date}</span>
          </div>
          <div className="mb-2">
            <StarRating rating={r.stars} />
          </div>
          <p className="text-sm text-g900 leading-relaxed">{r.text}</p>
          <div className="flex items-center gap-2.5 mt-3 text-xs text-g500">
            <span>{r.helpful} people found this helpful</span>
            <button className="border border-g300 rounded-full px-3.5 py-1 text-[11px] font-medium bg-background text-g700 cursor-pointer hover:bg-g100 transition-colors">
              👍 Yes
            </button>
            <button className="border border-g300 rounded-full px-3.5 py-1 text-[11px] font-medium bg-background text-g700 cursor-pointer hover:bg-g100 transition-colors">
              No
            </button>
          </div>
        </div>
      ))}

      {/* Load more / end indicator */}
      {hasMore ? (
        <button
          onClick={handleLoadMore}
          className="text-primary text-sm font-semibold mt-2 inline-block hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          See All Reviews ›
        </button>
      ) : (
        <p className="text-xs text-g500 mt-2">No more reviews to show.</p>
      )}
    </section>
  );
};

export default RatingOverview;
