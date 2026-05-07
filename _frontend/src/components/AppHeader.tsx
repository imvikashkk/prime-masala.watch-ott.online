import { Share2, Bookmark, Smartphone } from 'lucide-react';
// import { useState } from 'react';
import Logo from '../assets/story-tv-logo.jpeg';
// import { API_BASE, REDIRECT_BASE } from '../lib/constants';

const APP_DATA = {
  name: 'Masala Prime - Short Drama & OTT',
  subtitle: "India's #1 Short Drama & OTT App",
  developer: 'Story TV Entertainment Pvt. Ltd.',
  contains: 'Contains ads · In-app purchases',
  rating: 4.1,
  ratingCount: '1.17L',
  downloads: '5Cr+',
  ageRating: '3+',
  rank: '#1',
  rankCategory: 'Entertainment',
  size: '47 MB',
};

const META_ITEMS = [
  {
    top: `${APP_DATA.rating}`,
    star: true,
    bottom: `${APP_DATA.ratingCount} Ratings`,
  },
  { top: APP_DATA.downloads, bottom: 'Downloads' },
  {
    top: APP_DATA.ageRating,
    bottom: `Rated ${APP_DATA.ageRating}`,
    isAge: true,
  },
  { top: APP_DATA.rank, bottom: APP_DATA.rankCategory },
  { top: APP_DATA.size, bottom: 'Size' },
];

const AppHeader = () => {
  return (
    <section>
      {/* App info */}
      <div className="flex gap-5 mb-5">
        <div className="w-[128px] h-[128px] rounded-[28px] shrink-0 bg-gradient-to-br from-accent via-pink-500 to-pink-300 flex items-center justify-center shadow-[0_4px_20px_hsl(var(--accent)/0.25)] relative overflow-hidden">
          <img
            src={Logo}
            alt="App Icon"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 pt-1">
          <h1 className="text-[26px] font-bold text-foreground leading-tight mb-1">
            {APP_DATA.name}
          </h1>
          <div className="text-[15px] text-g700 mb-0.5">
            {APP_DATA.subtitle}
          </div>
          <a className="text-primary text-sm font-medium cursor-pointer inline-block mb-1.5">
            {APP_DATA.developer}
          </a>
          <div className="text-xs text-g500">{APP_DATA.contains}</div>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-stretch my-5 bg-g50 rounded-2xl border border-g200 overflow-hidden">
        {META_ITEMS.map((m, i) => (
          <div
            key={i}
            className={`flex-1 text-center py-3.5 px-2 ${
              i < META_ITEMS.length - 1 ? 'border-r border-g300' : ''
            }`}
          >
            <div className="text-base font-bold text-foreground flex items-center justify-center gap-1">
              {m.isAge ? <Smartphone className="w-4 h-4" /> : m.top}
              {m.star && <span className="text-star text-sm">★</span>}
            </div>
            <div className="text-[11px] text-g500 mt-0.5 font-medium">
              {m.bottom}
            </div>
          </div>
        ))}
      </div>

      {/* Action row */}
      <div className="flex items-center gap-3.5 mb-2.5 flex-wrap">
        <a
          href="http://64.227.181.136/bdsadd/cnt/click?cmpid=4466&token=<token>"
          className={`rounded-full text-base font-semibold px-9 py-2.5 transition-all shadow-[0_2px_10px_hsl(var(--primary)/0.2)]  bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer
          }`}
        >
          GET
        </a>
        <button className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-primary bg-transparent border-none cursor-pointer hover:bg-g100 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-1.5 text-g700 text-[13px] font-medium bg-transparent border-none cursor-pointer hover:text-foreground transition-colors">
          <Bookmark className="w-[18px] h-[18px]" /> Wishlist
        </button>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-g500 mb-7">
        <Smartphone className="w-3.5 h-3.5" />
        Available on iPhone, iPad & Android
      </div>
    </section>
  );
};

export default AppHeader;
