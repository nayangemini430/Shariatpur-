import React from 'react';
import { Phone, Shield, HeartPulse, AlertTriangle, Info, Bell, Baby, Flame, LandPlot, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Contact } from '../types';

interface HotlineItem {
  id: string;
  number: string;
  bengaliNumber: string;
  name: string;
  englishName: string;
  department: string;
  description: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  badgeBg: string;
  icon: React.ReactNode;
}

const HOTLINES_DATA: HotlineItem[] = [
  {
    id: 'htl-999',
    number: '999',
    bengaliNumber: '৯৯৯',
    name: 'জাতীয় জরুরি সেবা',
    englishName: 'National Emergency Service (999)',
    department: 'বাংলাদেশ পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স',
    description: 'যে কোনো জরুরি দুর্ঘটনা, অপরাধ, অগ্নিকাণ্ড বা তাৎক্ষণিক অ্যাম্বুলেন্স সহায়তার জন্য ২৪ ঘণ্টা টোল-ফ্রি সেবা।',
    colorBg: 'bg-rose-50 hover:bg-rose-100/80',
    colorBorder: 'border-rose-200 hover:border-rose-400',
    colorText: 'text-rose-700',
    badgeBg: 'bg-rose-600 text-white',
    icon: <ShieldAlert className="w-6 h-6 text-rose-600" />,
  },
  {
    id: 'htl-333',
    number: '333',
    bengaliNumber: '৩৩৩',
    name: 'সরকারি তথ্য ও সেবা',
    englishName: 'National Help Desk (333)',
    department: 'এআইআই ও তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ',
    description: 'সরকারি সেবার তথ্য, সামাজিক সমস্যা প্রতিকার, কর্মকর্তা পরিচিতি ও মানবিক সহায়তার জন্য জাতীয় কল সেন্টার।',
    colorBg: 'bg-amber-50 hover:bg-amber-100/80',
    colorBorder: 'border-amber-200 hover:border-amber-400',
    colorText: 'text-amber-800',
    badgeBg: 'bg-amber-600 text-white',
    icon: <Info className="w-6 h-6 text-amber-600" />,
  },
  {
    id: 'htl-109',
    number: '109',
    bengaliNumber: '১০৯',
    name: 'নারী ও শিশু নির্যাতন প্রতিরোধ সেল',
    englishName: 'Women & Child Helpline (109)',
    department: 'মহিলা ও শিশু বিষয়ক মন্ত্রণালয়',
    description: 'নারী ও শিশুদের ওপর যে কোনো পারিবারিক ও সামাজিক সহিংসতা বা ইভটিজিং প্রতিরোধে ২৪ ঘণ্টা জরুরি সহায়তা।',
    colorBg: 'bg-purple-50 hover:bg-purple-100/80',
    colorBorder: 'border-purple-200 hover:border-purple-400',
    colorText: 'text-purple-800',
    badgeBg: 'bg-purple-600 text-white',
    icon: <Shield className="w-6 h-6 text-purple-600" />,
  },
  {
    id: 'htl-1090',
    number: '1090',
    bengaliNumber: '১০৯০',
    name: 'দুর্যোগের আগাম বার্তা হটলাইন',
    englishName: 'Disaster Early Warning (1090)',
    department: 'দুর্যোগ ব্যবস্থাপনা ও ত্রাণ মন্ত্রণালয়',
    description: 'বন্যা, ঘূর্ণিঝড়, নদী ভাঙন ও আবহাওয়ার আগাম সতর্কবার্তা সংক্রান্ত সরাসরি জরুরি আপডেট।',
    colorBg: 'bg-cyan-50 hover:bg-cyan-100/80',
    colorBorder: 'border-cyan-200 hover:border-cyan-400',
    colorText: 'text-cyan-800',
    badgeBg: 'bg-cyan-600 text-white',
    icon: <Bell className="w-6 h-6 text-cyan-600" />,
  },
  {
    id: 'htl-1098',
    number: '1098',
    bengaliNumber: '১০৯৮',
    name: 'শিশু সহায়তা হটলাইন',
    englishName: 'Child Helpline Bangladesh (1098)',
    department: 'সমাজসেবা অধিদপ্তর, সমাজকল্যাণ মন্ত্রণালয়',
    description: 'ঝুঁকিপূর্ণ, পথশিশু ও বিপন্ন শিশুদের তাৎক্ষণিক সুরক্ষা ও আইনি সহায়তা প্রদানে টোল-ফ্রি সার্ভিস।',
    colorBg: 'bg-blue-50 hover:bg-blue-100/80',
    colorBorder: 'border-blue-200 hover:border-blue-400',
    colorText: 'text-blue-800',
    badgeBg: 'bg-blue-600 text-white',
    icon: <Baby className="w-6 h-6 text-blue-600" />,
  },
  {
    id: 'htl-16263',
    number: '16263',
    bengaliNumber: '১৬২৬৩',
    name: 'স্বাস্থ্য বাতায়ন',
    englishName: 'Health Call Center (16263)',
    department: 'স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয়',
    description: '২৪ ঘণ্টা অভিজ্ঞ এমবিবিএস ডাক্তারের কাছ থেকে বিনামূল্যে চিকিৎসা পরামর্শ ও নিকটস্থ অ্যাম্বুলেন্সের তথ্য।',
    colorBg: 'bg-emerald-50 hover:bg-emerald-100/80',
    colorBorder: 'border-emerald-200 hover:border-emerald-400',
    colorText: 'text-emerald-800',
    badgeBg: 'bg-[#006A4E] text-white',
    icon: <HeartPulse className="w-6 h-6 text-emerald-600" />,
  },
  {
    id: 'htl-16122',
    number: '16122',
    bengaliNumber: '১৬১২২',
    name: 'ভূমি সেবা হটলাইন',
    englishName: 'Land Services Helpline (16122)',
    department: 'ভূমি মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    description: 'নামজারি (Mutation), খতিয়ান, ই-পর্চা, ভূ-উন্নয়ন কর ও ই-নামজারি সংক্রান্ত যে কোনো প্রশ্নের সরাসরি সমাধান।',
    colorBg: 'bg-teal-50 hover:bg-teal-100/80',
    colorBorder: 'border-teal-200 hover:border-teal-400',
    colorText: 'text-teal-800',
    badgeBg: 'bg-teal-700 text-white',
    icon: <LandPlot className="w-6 h-6 text-teal-600" />,
  },
  {
    id: 'htl-106',
    number: '106',
    bengaliNumber: '১০৬',
    name: 'দুদক অভিযোগ হটলাইন',
    englishName: 'ACC Anti-Corruption Hotline (106)',
    department: 'দুর্নীতি দমন কমিশন (দুদক)',
    description: 'সরকারি ও আধা-সরকারি প্রতিষ্ঠানে ঘুষ ও দুর্নীতির অভিযোগ সরাসরি নিবন্ধনের জন্য জরুরি নম্বর।',
    colorBg: 'bg-stone-50 hover:bg-stone-100/80',
    colorBorder: 'border-stone-200 hover:border-stone-400',
    colorText: 'text-stone-800',
    badgeBg: 'bg-stone-700 text-white',
    icon: <AlertTriangle className="w-6 h-6 text-stone-700" />,
  },
];

interface EmergencyHotlineGridProps {
  onCall?: (contact: Contact) => void;
  searchQuery?: string;
}

export const EmergencyHotlineGrid: React.FC<EmergencyHotlineGridProps> = ({ onCall, searchQuery }) => {
  const handleItemClick = (hotline: HotlineItem) => {
    if (onCall) {
      onCall({
        id: hotline.id,
        name: hotline.name,
        category: 'hotlines',
        phoneNumber: hotline.number,
        upazila: 'Sadar',
        location: hotline.department,
        details: hotline.description,
        isEmergency: true,
        verified: true,
      });
    }
  };

  const filteredHotlines = HOTLINES_DATA.filter((h) => {
    if (!searchQuery || !searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.number.includes(q) ||
      h.bengaliNumber.includes(q) ||
      h.englishName.toLowerCase().includes(q) ||
      h.department.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q)
    );
  });

  return (
    <section className="my-4 bg-white rounded-3xl border-2 border-rose-200/90 p-5 md:p-6 shadow-sm relative overflow-hidden">
      {/* Decorative top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-600 via-amber-500 to-[#006A4E]" />

      {/* Title & Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-rose-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
            </span>
            <span className="text-[10px] md:text-xs font-black text-rose-600 uppercase tracking-widest font-mono">
              24/7 NATIONAL EMERGENCY TOLL-FREE HELPLINES
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-display font-black text-slate-800 mt-1 flex items-center gap-2">
            <span>২৪/৭ জাতীয় জরুরি হটলাইনসমূহ</span>
            <span className="text-xs font-black bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
              টোল-ফ্রি (Toll-Free)
            </span>
          </h2>
          <p className="text-slate-500 text-xs mt-0.5 font-semibold">
            যে কোনো সিম বা ফোন থেকে কল করতে নিচে কাঙ্ক্ষিত নম্বরটিতে ক্লিক করুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-[#006A4E] px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 size={14} className="text-[#006A4E]" />
            ২৪ ঘণ্টা সচল
          </span>
        </div>
      </div>

      {/* Grid Layout of Hotlines */}
      {filteredHotlines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredHotlines.map((hotline) => (
          <div
            key={hotline.id}
            className={`rounded-2xl border-2 p-4 transition-all duration-200 flex flex-col justify-between ${hotline.colorBg} ${hotline.colorBorder} shadow-2xs hover:shadow-md`}
          >
            <div>
              {/* Top row: Icon & Big Number Pill */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2 rounded-xl bg-white shadow-2xs border border-slate-100">
                  {hotline.icon}
                </div>
                <a
                  href={`tel:${hotline.number}`}
                  onClick={() => handleItemClick(hotline)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-black text-base md:text-lg tracking-wider ${hotline.badgeBg} shadow-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer`}
                  title={`সরাসরি কল করুন: ${hotline.bengaliNumber} (${hotline.number})`}
                >
                  <Phone size={14} className="animate-pulse" />
                  <span>{hotline.bengaliNumber}</span>
                  <span className="text-[11px] opacity-80 font-sans font-bold">({hotline.number})</span>
                </a>
              </div>

              {/* Title & Department */}
              <h3 className={`font-sans font-black text-sm md:text-base ${hotline.colorText} leading-snug mb-1`}>
                {hotline.name}
              </h3>
              <p className="text-[11px] text-slate-600 font-bold mb-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block flex-shrink-0" />
                <span>{hotline.department}</span>
              </p>

              {/* Description */}
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">
                {hotline.description}
              </p>
            </div>

            {/* Direct Call Button (tel: protocol) */}
            <a
              id={`direct-hotline-dial-${hotline.number}`}
              href={`tel:${hotline.number}`}
              onClick={() => handleItemClick(hotline)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#006A4E] hover:bg-[#005740] text-white font-sans font-black text-xs transition-colors cursor-pointer shadow-xs border border-[#006A4E] active:scale-98"
            >
              <Phone size={14} className="animate-pulse" />
              <span>সরাসরি কল দিন: {hotline.bengaliNumber}</span>
            </a>
          </div>
        ))}
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500 font-bold text-sm bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          এই অনুসন্ধানের সাথে সম্পর্কিত কোনো জরুরি হটলাইন পাওয়া যায়নি।
        </div>
      )}
    </section>
  );
};
