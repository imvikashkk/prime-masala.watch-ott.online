import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import screenshot1 from '@/assets/screenshot-1.jpg';
import screenshot2 from '@/assets/screenshot-2.jpg';
import screenshot3 from '@/assets/screenshot-3.jpg';
import screenshot4 from '@/assets/screenshot-4.jpg';
import screenshot5 from '@/assets/screenshot-5.jpg';
import screenshot6 from '@/assets/screenshot-6.jpg';

const SCREENSHOTS = [
  screenshot1,
  screenshot2,
  screenshot3,
  screenshot4,
  screenshot5,
  screenshot6,
];

const ScreenshotCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-9 relative">
      {' '}
      <button
        onClick={() =>
          scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' })
        }
        className="absolute -left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background shadow-[0_2px_12px_rgba(0,0,0,0.15)] border-none cursor-pointer flex items-center justify-center z-[5] hover:shadow-lg transition-shadow"
      >
        <ChevronLeft className="w-4 h-4 text-g700" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-1"
      >
        {SCREENSHOTS.map((src, i) => (
          <div
            key={i}
            className="flex-[0_0_168px] h-[298px] rounded-[20px] snap-start overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] shadow-sm border border-g200"
          >
            <img
              src={src}
              alt={`Screenshot ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' })
        }
        className="absolute -right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background shadow-[0_2px_12px_rgba(0,0,0,0.15)] border-none cursor-pointer flex items-center justify-center z-[5] hover:shadow-lg transition-shadow"
      >
        <ChevronRight className="w-4 h-4 text-g700" />
      </button>
    </div>
  );
};

export default ScreenshotCarousel;
