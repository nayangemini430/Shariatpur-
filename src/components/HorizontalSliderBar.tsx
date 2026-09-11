import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HorizontalSliderBarProps {
  children: React.ReactNode;
  className?: string;
  badgeLabel?: React.ReactNode;
  bgFadeColor?: string; // CSS color or tailwind gradient color like 'from-white'
  containerClassName?: string;
}

export const HorizontalSliderBar: React.FC<HorizontalSliderBarProps> = ({
  children,
  className = '',
  badgeLabel,
  bgFadeColor = 'from-white',
  containerClassName = '',
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);

  const checkScrollability = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollability();

    const handleResize = () => checkScrollability();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => checkScrollability());
    observer.observe(el);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [checkScrollability, children]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -260 : 260;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    // Only drag with left mouse button
    if (e.button !== 0) return;

    setIsMouseDown(true);
    isDraggingRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    const el = scrollRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Scroll speed factor

    if (Math.abs(walk) > 5) {
      isDraggingRef.current = true;
    }

    el.scrollLeft = scrollLeftRef.current - walk;
    checkScrollability();
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  // Prevent link/button click if user was dragging
  const handleCaptureClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className={`relative group/slider w-full ${containerClassName}`}>
      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 text-[#006A4E] shadow-md border border-emerald-200 flex items-center justify-center hover:bg-[#006A4E] hover:text-white transition-all cursor-pointer active:scale-90"
          title="বাম দিকে স্লাইড করুন"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Left Gradient Fade */}
      {canScrollLeft && (
        <div
          className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r ${bgFadeColor} to-transparent z-10 pointer-events-none rounded-l-xl`}
        />
      )}

      {/* Main Scrollable Content */}
      <div
        ref={scrollRef}
        onScroll={checkScrollability}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClickCapture={handleCaptureClick}
        className={`flex items-center gap-2 overflow-x-auto scroll-smooth custom-horizontal-scrollbar py-1 px-1 touch-pan-x whitespace-nowrap select-none cursor-grab active:cursor-grabbing ${className}`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {badgeLabel && (
          <div className="flex-shrink-0 flex items-center mr-1">
            {badgeLabel}
          </div>
        )}

        {/* Children buttons/items with flex-shrink-0 */}
        {React.Children.map(children, (child) => {
          if (!child) return null;
          return <div className="flex-shrink-0 inline-flex items-center">{child}</div>;
        })}
      </div>

      {/* Right Gradient Fade */}
      {canScrollRight && (
        <div
          className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l ${bgFadeColor} to-transparent z-10 pointer-events-none rounded-r-xl flex items-center justify-end pr-1`}
        />
      )}

      {/* Right Scroll Button & "Slide ➔" hint */}
      {canScrollRight && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-white/95 text-[#006A4E] shadow-md border border-emerald-200 flex items-center justify-center hover:bg-[#006A4E] hover:text-white transition-all cursor-pointer active:scale-90 animate-pulse"
            title="ডান দিকে স্লাইড করুন"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
