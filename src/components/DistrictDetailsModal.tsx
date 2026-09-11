import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  MapPin,
  Building2,
  Users,
  Maximize2,
  CheckCircle2,
  Info,
  Sparkles,
  Search,
  ChevronRight,
  Landmark,
  Compass,
  Layers,
  ArrowUpRight,
  Activity
} from 'lucide-react';

export type DistrictTab = 'all' | 'upazilas' | 'unions' | 'area' | 'population';

interface DistrictDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: DistrictTab | string;
}

interface UpazilaDetail {
  name: string;
  bnName: string;
  unionsCount: number;
  pourashavaCount: number;
  areaSqKm: string;
  population: string;
  keyPlaces: string[];
  unions: string[];
  pourashavaName: string;
  description: string;
}

const UPAZILA_DATA: UpazilaDetail[] = [
  {
    name: 'Sadar',
    bnName: 'শরীয়তপুর সদর',
    unionsCount: 9,
    pourashavaCount: 1,
    areaSqKm: '২১৫.৩৪',
    population: '২,৩৪,০০০+',
    pourashavaName: 'শরীয়তপুর পৌরসভা',
    keyPlaces: ['জেলা প্রশাসকের কার্যালয়', 'সদর হাসপাতাল', 'তুলাসার কৃষ্ণনগর মন্দির', 'মনোহরপুর পীর সাহেবের মাজার'],
    unions: ['পালং', 'তুলাসার', 'মাহমুদপুর', 'চিকন্দি', 'ডোমসার', 'শৌলপাড়া', 'রুদ্রকর', 'বিনোদপুর', 'চন্দ্রপুর'],
    description: 'শরীয়তপুর জেলার প্রশাসনিক মূল কেন্দ্রবিন্দু। জেলা প্রশাসকের কার্যালয়, জেলা জজ কোর্ট এবং ২৫০ শয্যা বিশিষ্ট সদর হাসপাতাল এখানে অবস্থিত।'
  },
  {
    name: 'Zajira',
    bnName: 'জাজিরা',
    unionsCount: 12,
    pourashavaCount: 1,
    areaSqKm: '২৪৬.২৭',
    population: '২,২১,০০০+',
    pourashavaName: 'জাজিরা পৌরসভা',
    keyPlaces: ['পদ্মা সেতু জাজিরা প্রান্ত (টোল প্লাজা)', 'সার্ভিস এরিয়া-২', 'ইলিয়াস আহমেদ চৌধুরী ঘাট', 'বিলাসপুর পদ্মার চর'],
    unions: ['জাজিরা', 'জেনিনগর', 'পূর্ব নাউডোবা', 'পশ্চিম নাউডোবা', 'বিলাসপুর', 'কুণ্ডেরচর', 'পালেরচর', 'বড়কান্দি', 'মূলনা', 'সেনেরচর', 'সুজনগর', 'আরিকান্দি'],
    description: 'স্বপ্নের পদ্মা সেতুর জাজিরা প্রান্ত সংযোগ সড়ক ও আধুনিক এক্সপ্রেসওয়ে জাজিরা উপজেলায় অবস্থিত। যা দক্ষিণ-পশ্চিমাঞ্চলের প্রবেশদ্বার হিসেবে পরিচিত।'
  },
  {
    name: 'Naria',
    bnName: 'নড়িয়া',
    unionsCount: 14,
    pourashavaCount: 1,
    areaSqKm: '২০৯.২৬',
    population: '২,৩৪,০০০+',
    pourashavaName: 'নড়িয়া পৌরসভা',
    keyPlaces: ['কীর্তিনাশা নদী তীর', 'নড়িয়া নদী রক্ষা আধুনিক রিভেটমেন্ট বাঁধ', 'মুলফৎগঞ্জ বাজার', 'ভোজেশ্বর বাজার'],
    unions: ['ভোজেশ্বর', 'রাজনগর', 'বিঝারী', 'নওপাড়া', 'ফতেজংপুর', 'ঘরিষার', 'ডিঙ্গামানিক', 'জোয়ারিয়া', 'মোক্তারের চর', 'কেদারপুর', 'চামটা', 'চড়আত্রা', 'নোয়াপাড়া', 'নশাসন'],
    description: 'কীর্তিনাশা নদীর তীরে সমৃদ্ধ ব্যবসা-বাণিজ্য ও প্রবাসী অধ্যুষিত ঐতিহাসিক এলাকা। নড়িয়া রিভেটমেন্ট বাঁধ বর্তমানে জনপ্রিয় একটি পর্যটন কেন্দ্র।'
  },
  {
    name: 'Bhedarganj',
    bnName: 'ভেদরগঞ্জ',
    unionsCount: 13,
    pourashavaCount: 1,
    areaSqKm: '৩১১.২৪',
    population: '২,৫৩,০০০+',
    pourashavaName: 'ভেদরগঞ্জ পৌরসভা',
    keyPlaces: ['চর সেনসাস রিভার ভিউ', 'তারাবুনিয়া ফেরি ঘাট', 'মহিষাদী চর এলাকা', 'মহিষার দিঘি'],
    unions: ['মহিষার', 'রামভদ্রপুর', 'চরভাগা', 'সাকচুর', 'চরসেনসাস', 'তারাবুনিয়া', 'উত্তর তারাবুনিয়া', 'চরকুমারিয়া', 'ডিএম খালী', 'কাচিকাটা', 'ছয়গাঁও', 'সাখিপুর', 'নারায়নপুর'],
    description: 'আয়তনের দিক থেকে শরীয়তপুর জেলার বৃহত্তম উপজেলা। এটি কৃষি উৎপাদন এবং মেঘনা নদী উপকূলীয় চর এলাকার জন্য বিখ্যাত।'
  },
  {
    name: 'Damudya',
    bnName: 'ডামুড্যা',
    unionsCount: 7,
    pourashavaCount: 1,
    areaSqKm: '৯০.৫৪',
    population: '১,১৬,০০০+',
    pourashavaName: 'ডামুড্যা পৌরসভা',
    keyPlaces: ['ডামুড্যা লঞ্চ ঘাট', 'কনেশ্বর জমিদার বাড়ি', 'সিড্যা প্রাচীন দীঘি', 'ডামুড্যা কলেজ মাঠ'],
    unions: ['কনেশ্বর', 'ধানকাঠি', 'সিড্যা', 'ইসলামপুর', 'পূর্ব কনেশ্বর', 'চকময় শ্রীপুর', 'শিহিপাড়া'],
    description: 'শান্ত ও পরিচ্ছন্ন শিক্ষানুরাগী এলাকা হিসেবে সুপরিচিত। ব্যবসা-বাণিজ্য ও কনেশ্বর ধানকাঠি অঞ্চলের ঐতিহাসিক ঐতিহ্য সমৃদ্ধ।'
  },
  {
    name: 'Gosairhat',
    bnName: 'গোসাইরহাট',
    unionsCount: 8,
    pourashavaCount: 1,
    areaSqKm: '১০৭.৮৫',
    population: '১,৪৪,০০০+',
    pourashavaName: 'গোসাইরহাট পৌরসভা',
    keyPlaces: ['ইদিলপুর জমিদার বাড়ি', 'আলাওলপুর মেঘনা ঘাট', 'কুচিয়াপট্টি ফিশিং জোন', 'নাগেরপাড়া বাজার'],
    unions: ['ইদিলপুর', 'সামন্তসার', 'নাগেরপাড়া', 'কোদালপুর', 'গোসাইরহাট', 'নলমুড়ি', 'আলাওলপুর', 'কুচিয়াপট্টি'],
    description: 'মেঘনা নদী তীরবর্তী জেলা শরীয়তপুরের দক্ষিণ সীমান্ত সংলগ্ন নদীভিত্তিক ঐতিহ্যবাহী ও মৎস্য সমৃদ্ধ এলাকা।'
  }
];

export const DistrictDetailsModal: React.FC<DistrictDetailsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'all'
}) => {
  const [activeFilter, setActiveFilter] = useState<DistrictTab | 'all'>('all');
  const [searchUnion, setSearchUnion] = useState('');
  const [selectedUpazilaFilter, setSelectedUpazilaFilter] = useState<string>('ALL');

  const contentRef = useRef<HTMLDivElement>(null);
  const upazilaRef = useRef<HTMLDivElement>(null);
  const unionRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const populationRef = useRef<HTMLDivElement>(null);

  // Scroll smoothly to a section
  const scrollToSection = (target: DistrictTab) => {
    setActiveFilter(target);
    if (target === 'all') {
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    let targetRef: React.RefObject<HTMLDivElement> | null = null;
    if (target === 'upazilas') targetRef = upazilaRef;
    else if (target === 'unions') targetRef = unionRef;
    else if (target === 'area') targetRef = areaRef;
    else if (target === 'population') targetRef = populationRef;

    if (targetRef && targetRef.current && contentRef.current) {
      const topPos = targetRef.current.offsetTop - contentRef.current.offsetTop - 12;
      contentRef.current.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (initialTab && initialTab !== 'all') {
          scrollToSection(initialTab as DistrictTab);
        } else {
          setActiveFilter('all');
          if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: 'auto' });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const filteredUpazilasForUnions = selectedUpazilaFilter === 'ALL'
    ? UPAZILA_DATA
    : UPAZILA_DATA.filter(u => u.bnName === selectedUpazilaFilter || u.name === selectedUpazilaFilter);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[90vh] my-auto">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#006A4E] via-emerald-800 to-[#004D38] text-white p-4 sm:p-6 relative shrink-0 shadow-md">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
              🏛️
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 text-[11px] font-bold tracking-wide uppercase border border-emerald-400/30">
                <Sparkles size={12} className="text-amber-300" />
                <span>জেলা তথ্যকোষ • SHARIATPUR.GOV.BD</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-display font-black tracking-tight text-white mt-0.5">
                এক নজরে শরীয়তপুর জেলা সংক্রান্ত তথ্য
              </h2>
              <p className="text-emerald-100 text-xs mt-0.5 font-medium">
                উপজেলা, পৌরসভা, ইউনিয়ন, জনসংখ্যা ও আয়তনের সম্পূর্ণ অফিসিয়াল উপাত্ত একসাথে
              </p>
            </div>
          </div>

          {/* Quick Jump Options Bar (All Sections Always Accessible) */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar border-t border-white/10 pt-3">
            <button
              onClick={() => scrollToSection('all')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Layers size={14} />
              <span>সকল তথ্য (একনজরে)</span>
            </button>

            <button
              onClick={() => scrollToSection('upazilas')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'upazilas'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Building2 size={14} />
              <span>উপজেলাসমূহ (৬টি)</span>
            </button>

            <button
              onClick={() => scrollToSection('unions')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'unions'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Landmark size={14} />
              <span>পৌরসভা ও ইউনিয়ন (৬৫টি)</span>
            </button>

            <button
              onClick={() => scrollToSection('area')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'area'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Maximize2 size={14} />
              <span>আয়তন ও নদী</span>
            </button>

            <button
              onClick={() => scrollToSection('population')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'population'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Users size={14} />
              <span>জনসংখ্যা ও ডেমোগ্রাফি</span>
            </button>
          </div>
        </div>

        {/* Unified Scrollable Modal Body Showing All Options Together */}
        <div ref={contentRef} className="p-3 sm:p-6 overflow-y-auto space-y-8 flex-1 bg-slate-50/60 scroll-smooth">

          {/* Top Quick Overview Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006A4E] flex items-center justify-center shrink-0 font-bold">
                <Building2 size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">উপজেলা</span>
                <span className="text-base font-black text-slate-900">৬ টি প্রশাসনিক</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                <Landmark size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">পৌরসভা ও ইউনিয়ন</span>
                <span className="text-base font-black text-slate-900">৬ পৌরসভা • ৬৫ ইউনিয়ন</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 font-bold">
                <Maximize2 size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">জেলা আয়তন</span>
                <span className="text-base font-black text-slate-900">১,১৮১.৫৩ বর্গ কিমি</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 font-bold">
                <Users size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">মোট জনসংখ্যা</span>
                <span className="text-base font-black text-slate-900">১২,০২,৩০০+ জন</span>
              </div>
            </div>
          </div>

          {/* SECTION 1: UPAZILAS */}
          <div ref={upazilaRef} id="sec-upazilas" className="space-y-4 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#006A4E] text-white shadow-xs">
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">১. প্রশাসনিক ৬টি উপজেলাসমূহ</h3>
                  <p className="text-xs text-slate-500 font-medium">ইউএনও কার্যালয়, হাসপাতাল ও প্রশাসনিক উপাত্ত</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-[#006A4E] rounded-full">
                মোট ৬ টি
              </span>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-emerald-900 font-semibold">
              <Info size={18} className="text-emerald-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                শরীয়তপুর জেলায় মোট <strong>৬ টি প্রশাসনিক উপজেলা</strong> রয়েছে। প্রতিটি উপজেলায় সমন্বিত ইউএনও (Upazila Nirbahi Officer) কার্যালয় ও ৫০/২৫০ শয্যা বিশিষ্ট হাসপাতাল বিদ্যমান।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {UPAZILA_DATA.map((upazila, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all hover:border-emerald-400 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                      <div>
                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                          উপজেলা #{idx + 1}
                        </span>
                        <h4 className="text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
                          <span>{upazila.bnName}</span>
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold text-slate-400 block">আয়তন</span>
                        <span className="text-xs font-black text-[#006A4E] bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">{upazila.areaSqKm} বর্গ কিমি</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3">
                      {upazila.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-3 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">ইউনিয়ন সংখ্যা</span>
                        <span className="font-extrabold text-slate-800">{upazila.unionsCount} টি ইউনিয়ন</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">পৌরসভা</span>
                        <span className="font-extrabold text-slate-800">{upazila.pourashavaName}</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-slate-200/60 flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 font-bold">আনুমানিক জনসংখ্যা</span>
                        <span className="font-extrabold text-[#006A4E]">{upazila.population}</span>
                      </div>
                    </div>

                    {/* Key locations */}
                    <div>
                      <span className="text-[11px] font-black text-slate-700 block mb-1">দর্শনীয় ও গুরুত্বপূর্ণ স্থান:</span>
                      <div className="flex flex-wrap gap-1">
                        {upazila.keyPlaces.map((place, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                          >
                            📍 {place}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: UNIONS & MUNICIPALITIES */}
          <div ref={unionRef} id="sec-unions" className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
                  <Landmark size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">২. পৌরসভা (৬টি) ও সকল ইউনিয়ন (৬৫টি)</h3>
                  <p className="text-xs text-slate-500 font-medium">উপজেলা ভিত্তিক স্থানীয় সরকার ও ইউনিয়ন তালিকা</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
                ৬৫ ইউনিয়ন • ৬ পৌরসভা
              </span>
            </div>

            {/* Header Filters */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-bold text-slate-500 shrink-0">উপজেলা ফিল্টার:</span>
                <select
                  value={selectedUpazilaFilter}
                  onChange={(e) => setSelectedUpazilaFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white text-slate-800 focus:outline-none focus:border-[#006A4E]"
                >
                  <option value="ALL">সকল উপজেলা (৬টি)</option>
                  {UPAZILA_DATA.map((u, i) => (
                    <option key={i} value={u.bnName}>{u.bnName} ({u.unionsCount} ইউনিয়ন)</option>
                  ))}
                </select>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchUnion}
                  onChange={(e) => setSearchUnion(e.target.value)}
                  placeholder="ইউনিয়ন বা পৌরসভার নাম খুঁজুন..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:bg-white focus:outline-none focus:border-[#006A4E]"
                />
              </div>
            </div>

            {/* Pourashava Highlight Card */}
            <div className="bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-emerald-500/10 border border-amber-300/80 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={16} className="text-amber-800" />
                <h4 className="font-black text-sm text-slate-900">শরীয়তপুর জেলার ৬টি সম্মানিত পৌরসভা</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                {UPAZILA_DATA.map((u, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-xl border border-amber-200/90 text-center shadow-xs">
                    <span className="block text-[10px] text-amber-800 font-bold uppercase">{u.bnName}</span>
                    <span className="font-extrabold text-slate-900 text-xs">{u.pourashavaName}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unions List grouped by Upazila */}
            <div className="space-y-4">
              {filteredUpazilasForUnions.map((upazila, idx) => {
                const filteredUnions = upazila.unions.filter(u =>
                  u.toLowerCase().includes(searchUnion.toLowerCase()) ||
                  upazila.bnName.toLowerCase().includes(searchUnion.toLowerCase()) ||
                  upazila.pourashavaName.toLowerCase().includes(searchUnion.toLowerCase())
                );

                if (searchUnion.trim() !== '' && filteredUnions.length === 0 && !upazila.pourashavaName.includes(searchUnion)) {
                  return null;
                }

                return (
                  <div key={idx} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-emerald-100 text-[#006A4E] font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-black text-slate-900 text-base">{upazila.bnName} উপজেলা</h4>
                          <span className="text-[11px] text-slate-500 font-medium">
                            পৌরসভা: <strong className="text-slate-800">{upazila.pourashavaName}</strong> | ইউনিয়ন: <strong className="text-[#006A4E]">{upazila.unionsCount}টি</strong>
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
                        মোট {upazila.unionsCount} টি ইউনিয়ন
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {filteredUnions.map((union, uIdx) => (
                        <div
                          key={uIdx}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-emerald-50 hover:border-emerald-300 transition-colors flex items-center gap-2 group"
                        >
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 truncate">
                            {union} ইউনিয়ন
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: AREA & GEOGRAPHY */}
          <div ref={areaRef} id="sec-area" className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-600 text-white shadow-xs">
                  <Maximize2 size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">৩. মোট আয়তন, ভৌগোলিক সীমানা ও নদ-নদী</h3>
                  <p className="text-xs text-slate-500 font-medium">জেলা পরিধি, পদ্মানদী ও আঞ্চলিক সীমানা বিবরণ</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-sky-100 text-sky-900 rounded-full">
                ১,১৮১.৫৩ বর্গ কিমি
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="bg-gradient-to-br from-[#006A4E] to-emerald-800 text-white rounded-2xl p-5 shadow-sm">
                <span className="text-emerald-200 text-xs font-extrabold uppercase tracking-wider block">মোট জেলা আয়তন</span>
                <h3 className="text-3xl font-black mt-1">১,১৮১.৫৩</h3>
                <span className="text-xs text-emerald-100 font-bold block mt-0.5">বর্গ কিলোমিটার (৪৫৬.১৯ বর্গমাইল)</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
                <span className="text-slate-400 text-xs font-extrabold uppercase tracking-wider block">প্রশাসনিক কাঠামো</span>
                <h3 className="text-xl font-black text-slate-800 mt-1">৬ উপজেলা ও ৬ পৌরসভা</h3>
                <span className="text-xs text-slate-500 font-bold block mt-0.5">৬৫ টি ইউনিয়ন এবং ১২৪৫ টি গ্রাম</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
                <span className="text-slate-400 text-xs font-extrabold uppercase tracking-wider block">সংসদীয় আসন সংখ্যা</span>
                <h3 className="text-xl font-black text-slate-800 mt-1">৩ টি জাতীয় আসন</h3>
                <span className="text-xs text-slate-500 font-bold block mt-0.5">শরীয়তপুর-১, ২ ও ৩ নম্বর আসন</span>
              </div>
            </div>

            {/* Boundaries & Geographical Overview */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">
              <h4 className="font-black text-slate-800 text-base border-b border-slate-100 pb-2 flex items-center gap-2">
                <Compass size={18} className="text-[#006A4E]" />
                <span>শরীয়তপুর জেলার চারপাশের ভৌগোলিক সীমানা</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-black text-emerald-700 block mb-0.5">⬆️ উত্তর দিক</span>
                  <p className="text-slate-800 font-semibold">মুন্সীগঞ্জ জেলা ও প্রমত্তা পদ্মা নদী</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-black text-emerald-700 block mb-0.5">⬇️ দক্ষিণ দিক</span>
                  <p className="text-slate-800 font-semibold">বরিশাল জেলা ও মাদারীপুর জেলা</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-black text-emerald-700 block mb-0.5">➡️ পূর্ব দিক</span>
                  <p className="text-slate-800 font-semibold">চাঁদপুর জেলা ও মেঘনা নদী</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-black text-emerald-700 block mb-0.5">⬅️ পশ্চিম দিক</span>
                  <p className="text-slate-800 font-semibold">মাদারীপুর জেলা ও আড়িয়াল খাঁ নদী</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h5 className="font-black text-slate-800 text-sm mb-2">প্রধান নদ-নদীসমূহ:</h5>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 bg-sky-50 text-sky-900 border border-sky-200 rounded-lg font-bold">🌊 পদ্মা নদী</span>
                  <span className="px-3 py-1 bg-sky-50 text-sky-900 border border-sky-200 rounded-lg font-bold">🌊 মেঘনা নদী</span>
                  <span className="px-3 py-1 bg-sky-50 text-sky-900 border border-sky-200 rounded-lg font-bold">🌊 কীর্তিনাশা নদী</span>
                  <span className="px-3 py-1 bg-sky-50 text-sky-900 border border-sky-200 rounded-lg font-bold">🌊 পালং নদী</span>
                  <span className="px-3 py-1 bg-sky-50 text-sky-900 border border-sky-200 rounded-lg font-bold">🌊 আড়িয়াল খাঁ নদী</span>
                </div>
              </div>
            </div>

            {/* Special Padma Bridge Highlight */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-4 sm:p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                🌉
              </div>
              <div>
                <h4 className="font-black text-base">পদ্মা সেতু সংযোগ ও অর্থনৈতিক তাৎপর্য</h4>
                <p className="text-xs font-bold leading-relaxed opacity-90 mt-0.5">
                  জাতীয় অর্থনৈতিক চালিকাশক্তি স্বপ্নের পদ্মা সেতুর জাজিরা পয়েন্ট টোল প্লাজা ও এক্সপ্রেসওয়ে সংযোগ সড়ক শরীয়তপুর জেলায় অবস্থিত। এর ফলে রাজধানী ঢাকার সাথে জেলাটির সড়ক যোগাযোগ অভূতপূর্ব গতি পেয়েছে।
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: POPULATION & DEMOGRAPHICS */}
          <div ref={populationRef} id="sec-population" className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">৪. জনসংখ্যা, শিক্ষা ও ডেমোগ্রাফি</h3>
                  <p className="text-xs text-slate-500 font-medium">জনসংখ্যা বন্টন, অনুপাত ও স্বাক্ষরতার পরিসংখ্যান</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full">
                ১২,০২,৩০০+ জনসংখ্যা
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">মোট জনসংখ্যা</span>
                <span className="text-xl sm:text-2xl font-black text-[#006A4E] block mt-1">১২,০২,৩০০+</span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">জনগণ (সর্বশেষ উপাত্ত)</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">পুরুষ ও নারী অনুপাত</span>
                <span className="text-base sm:text-lg font-black text-slate-800 block mt-1">৪৮.৭% / ৫১.৩%</span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">পুরুষ: ৫.৮৬ লাখ | নারী: ৬.১৬ লাখ</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">জনসংখ্যার ঘনত্ব</span>
                <span className="text-xl sm:text-2xl font-black text-[#006A4E] block mt-1">১,০১৭</span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">জন / প্রতি বর্গ কিমি</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">স্বাক্ষরতার হার</span>
                <span className="text-xl sm:text-2xl font-black text-amber-600 block mt-1">৬৮.৪%</span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">শিক্ষার হার দিনদিন বৃদ্ধি পাচ্ছে</span>
              </div>
            </div>

            {/* Upazila wise population breakdown */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
              <h4 className="font-black text-slate-800 text-base border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <Users size={18} className="text-[#006A4E]" />
                <span>উপজেলা ভিত্তিক আনুমানিক জনসংখ্যা বণ্টন</span>
              </h4>

              <div className="space-y-3">
                {UPAZILA_DATA.map((u, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800">{u.bnName} উপজেলা</span>
                      <span className="text-[#006A4E]">{u.population} জন</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#006A4E] h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(parseInt(u.population.replace(/[^0-9]/g, '')) / 253000) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="text-slate-600 font-semibold text-center sm:text-left">
            তথ্য সূত্র: <strong>বাংলাদেশ জাতীয় তথ্য বাতায়ন (shariatpur.gov.bd) ও পরিসংখ্যান ব্যুরো</strong>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-950 text-white font-bold rounded-xl transition-all cursor-pointer w-full sm:w-auto shadow-xs"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
