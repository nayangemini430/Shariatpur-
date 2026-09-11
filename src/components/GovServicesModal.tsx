import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  Laptop,
  FileText,
  Smartphone,
  Globe,
  Award,
  BookOpen,
  PhoneCall,
  Sparkles,
  ChevronRight,
  Landmark,
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';

interface GovServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (catId: string) => void;
}

interface EServiceItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'citizen' | 'land' | 'education' | 'finance' | 'hotline' | 'local';
  description: string;
  url: string;
  helpline?: string;
  badge: string;
  icon: string;
  featured?: boolean;
}

const E_SERVICES: EServiceItem[] = [
  // 🏛️ নাগরিক পরিচয় ও সাধারণ সেবা
  {
    id: 'es1',
    titleBn: 'জাতীয় পরিচয়পত্র (NID) পোর্টাল',
    titleEn: 'National ID (NID) Services',
    category: 'citizen',
    description: 'নতুন এনআইডি ভোটার নিবন্ধন, অনলাইন কার্ড সংশোধন, হারিয়ে যাওয়া কার্ড রিইস্যু ও স্মার্ট কার্ড ডাউনলোডার।',
    url: 'https://services.nidw.gov.bd',
    helpline: '105',
    badge: 'নির্বাচন কমিশন',
    icon: '🪪',
    featured: true
  },
  {
    id: 'es2',
    titleBn: 'অনলাইন জন্ম ও মৃত্যু নিবন্ধন (BDRIS)',
    titleEn: 'Birth & Death Registration Portal',
    category: 'citizen',
    description: 'নতুন জন্ম ও মৃত্যু সনদের জন্য অনলাইন আবেদন, আবেদন ট্র্যাকিং, যাচাই ও অনলাইন সনদ ডাউনলোড।',
    url: 'https://bdris.gov.bd',
    helpline: '333',
    badge: 'স্থানীয় সরকার বিভাগ',
    icon: '📜',
    featured: true
  },
  {
    id: 'es3',
    titleBn: 'ই-পাসপোর্ট ও ভিসা আবেদন বাতায়ন',
    titleEn: 'e-Passport & Online Visa Portal',
    category: 'citizen',
    description: 'ই-পাসপোর্টের নতুন আবেদন, আবেদন স্টেটাস ট্র্যাকিং, বায়োমেট্রিক এপয়েন্টমেন্ট বুকিং ও ফি ক্যালকুলেটর।',
    url: 'https://www.epassport.gov.bd',
    helpline: '16575',
    badge: 'ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর',
    icon: '🛂',
    featured: true
  },
  {
    id: 'es4',
    titleBn: 'মাইগভ (MyGov) নাগরিক সেবা পোর্টাল',
    titleEn: 'MyGov One-Stop Citizen Portal',
    category: 'citizen',
    description: 'এক ক্লিকেই সরকারের ৫০০+ নাগরিক সেবা, আবেদন, ভাতা ও সনদের ওয়ান-স্টপ অনলাইন বাতায়ন।',
    url: 'https://mygov.bd',
    helpline: '333',
    badge: 'a2i ও মন্ত্রিপরিষদ বিভাগ',
    icon: '📱',
    featured: true
  },

  // 🌾 ভূমি ও রেজিস্ট্রি সেবা
  {
    id: 'es5',
    titleBn: 'ই-নামজারি ও অনলাইন ভূমি সেবা (e-Mutation)',
    titleEn: 'Land e-Mutation & Khatian Portal',
    category: 'land',
    description: 'অনলাইনে জমির খারিজ/ই-নামজারি আবেদন, খতিয়ান অনলাইন কপি ও সার্টিফাইড কপি আবেদন পোর্টাল।',
    url: 'https://land.gov.bd',
    helpline: '16122',
    badge: 'ভূমি মন্ত্রণালয়',
    icon: '🌾',
    featured: true
  },
  {
    id: 'es6',
    titleBn: 'অনলাইন ভূমি উন্নয়ন কর (Land Tax)',
    titleEn: 'Online Land Development Tax Portal',
    category: 'land',
    description: 'অনলাইনে হোল্ডিং ট্যাক্স ও ভূমি উন্নয়ন কর পরিশোধের ডিজিটাল রসিদ সেবা।',
    url: 'https://ldtax.gov.bd',
    helpline: '16122',
    badge: 'ভূমি রাজস্ব বাতায়ন',
    icon: '🏛️'
  },

  // 🎓 শিক্ষা ও পরীক্ষার ফলাফল
  {
    id: 'es7',
    titleBn: 'এডুকেশন বোর্ড রেজাল্ট বাতায়ন',
    titleEn: 'Education Board Examination Results',
    category: 'education',
    description: 'জেএসসি, এসএসসি, এইচএসসি এবং সমমান পরীক্ষার অফিশিয়াল অনলাইন ফলাফল দেখার মাধ্যম।',
    url: 'http://www.educationboardresults.gov.bd',
    badge: 'শিক্ষা মন্ত্রণালয়',
    icon: '🎓',
    featured: true
  },
  {
    id: 'es8',
    titleBn: 'উপবৃত্তি ও শিক্ষা সহায়তা ট্রাস্ট',
    titleEn: 'Prime Minister Education Assistance Trust',
    category: 'education',
    description: 'শিক্ষার্থীদের উপবৃত্তি, শিক্ষাবৃত্তি ও অনুদান আবেদনের ই-সেবা।',
    url: 'http://www.pmeat.gov.bd',
    badge: 'প্রধানমন্ত্রীর কার্যালয়',
    icon: '📚'
  },

  // 💳 ফাইন্যান্স, রাজস্ব ও ট্রেড
  {
    id: 'es9',
    titleBn: 'ই-ট্যাক্স ও টিন অনলাইন সিস্টেম (e-TIN)',
    titleEn: 'e-TIN Registration & Tax Return Portal',
    category: 'finance',
    description: 'নতুন ই-টিন নম্বর গ্রহণ, ইনকাম ট্যাক্স রিটার্ন ফাইল দাখিল ও অনলাইন রসিদ ডাউনলোড।',
    url: 'https://secure.incometax.gov.bd',
    helpline: '09612-777555',
    badge: 'এনবিআর (NBR)',
    icon: '💳'
  },
  {
    id: 'es10',
    titleBn: 'সরকারি ই-চালান পেমেন্ট সিস্টেম (A-Challan)',
    titleEn: 'Government Automated Challan System',
    category: 'finance',
    description: 'যেকোনো সরকারি ফি, ভ্যাট, কর ও জরিমানা রকেট/বিকাশ/কার্ডের মাধ্যমে জমা।',
    url: 'https://ibass.finance.gov.bd/challan',
    badge: 'অর্থ বিভাগ',
    icon: '🧾'
  },

  // 📞 জরুরি জাতীয় হেল্পলাইন
  {
    id: 'es11',
    titleBn: 'জাতীয় জরুরি সেবা ৯৯৯ (National Emergency 999)',
    titleEn: 'National Emergency 999 Hotline',
    category: 'hotline',
    description: '২৪/৭ ফ্রি পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স জরুরি সহায়তার জন্য সরাসরি কল সেবা।',
    url: 'tel:999',
    helpline: '999',
    badge: 'বাংলাদেশ পুলিশ',
    icon: '🚨',
    featured: true
  },
  {
    id: 'es12',
    titleBn: 'শরীয়তপুর জেলা অফিশিয়াল পোর্টাল',
    titleEn: 'Shariatpur District Official Web Portal',
    category: 'local',
    description: 'শরীয়তপুর জেলা প্রশাসন, নোটিশ বোর্ড, কর্মকর্তা তথ্য ও পর্যটন সম্পর্কিত সরকারি ই-বাতায়ন।',
    url: 'https://shariatpur.gov.bd',
    helpline: '01700-717000',
    badge: 'জেলা প্রশাসন শরীয়তপুর',
    icon: '🏛️',
    featured: true
  }
];

export const GovServicesModal: React.FC<GovServicesModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  if (!isOpen) return null;

  const filteredServices = E_SERVICES.filter((service) => {
    const matchesTab = activeTab === 'all' || service.category === activeTab;
    const matchesSearch =
      service.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.badge.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-4 md:p-6 overflow-hidden bg-slate-900/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-white border-2 border-emerald-800/30 sm:rounded-3xl rounded-2xl shadow-2xl overflow-hidden my-auto h-[96vh] sm:h-auto sm:max-h-[90vh] flex flex-col"
        >
          {/* Header Band - Bangladesh National Govt Theme Colors */}
          <div className="bg-gradient-to-r from-[#006A4E] via-[#00523C] to-[#006A4E] text-white p-2.5 sm:p-5 md:p-6 relative border-b-2 sm:border-b-4 border-[#E1121C] flex-shrink-0">
            {/* Top Close Ribbon */}
            <div className="flex items-center justify-end mb-1.5 sm:mb-2">
              <button
                onClick={onClose}
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 flex-shrink-0"
                title="বন্ধ করুন"
              >
                <X size={15} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-sm sm:text-xl md:text-2xl font-black font-sans tracking-tight flex items-center gap-1.5 text-white">
                  <span>🏛️</span>
                  <span>জরুরি নাগরিক ই-সেবা ও পোর্টাল লিংক</span>
                </h2>
                <p className="text-emerald-100 text-[11px] sm:text-xs font-semibold mt-0.5 sm:mt-1 max-w-2xl leading-tight hidden sm:block">
                  বাংলাদেশ সরকারের অফিশিয়াল ই-সেবা পোর্টাল, এনআইডি, পাসপোর্ট, ভূমি, শিক্ষা ও জাতীয় হেল্পলাইনের সরাসরি ড্রাইভ বাতায়ন।
                </p>
              </div>
            </div>

            {/* Quick Search inside Modal */}
            <div className="mt-2 sm:mt-4 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ই-সেবার নাম, এনআইডি, পাসপোর্ট লিখে খুঁজুন..."
                className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs md:text-sm font-semibold rounded-lg sm:rounded-2xl py-1.5 sm:py-3 pl-8 sm:pl-10 pr-8 border-2 border-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
              />
              <Search className="absolute left-2.5 sm:left-3.5 top-2 sm:top-3.5 text-emerald-800" size={14} />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 sm:right-3.5 top-1.5 sm:top-3 text-slate-400 hover:text-slate-600 font-bold text-xs"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="bg-slate-50 border-b border-slate-200 px-2 sm:px-4 py-1.5 sm:py-2.5 flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0 text-[11px] sm:text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#006A4E] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              🌐 সকল পোর্টাল ({E_SERVICES.length})
            </button>
            <button
              onClick={() => setActiveTab('citizen')}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'citizen'
                  ? 'bg-[#006A4E] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              🪪 এনআইডি ও নাগরিক সেবা
            </button>
            <button
              onClick={() => setActiveTab('land')}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'land'
                  ? 'bg-[#006A4E] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              🌾 ভূমি ও ই-নামজারি
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-[#006A4E] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              🎓 শিক্ষা ও রেজাল্ট
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'finance'
                  ? 'bg-[#006A4E] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              💳 ট্যাক্স ও ই-চালান
            </button>
            <button
              onClick={() => setActiveTab('hotline')}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'hotline'
                  ? 'bg-[#E1121C] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              🚨 জরুরি হেল্পলাইন
            </button>
            <button
              onClick={() => setActiveTab('local')}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'local'
                  ? 'bg-[#006A4E] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              🏛️ ডিস্ট্রিক্ট পোর্টাল
            </button>
          </div>

          {/* Modal Content Grid */}
          <div className="p-2.5 sm:p-5 md:p-6 overflow-y-auto space-y-2.5 sm:space-y-4 flex-1 min-h-0 bg-slate-50">
            {filteredServices.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed border-slate-200 p-4">
                <p className="text-slate-500 font-bold text-xs sm:text-sm">কোনো ই-সেবা খুঁজে পাওয়া যায়নি।</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveTab('all');
                  }}
                  className="mt-3 px-3.5 py-1.5 bg-[#006A4E] text-white rounded-lg text-xs font-bold"
                >
                  সকল সেবা দেখুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white border-2 border-slate-150 hover:border-[#006A4E] rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:text-2xl bg-slate-100 p-1.5 sm:p-2 rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform flex-shrink-0">
                            {service.icon}
                          </span>
                          <div>
                            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-[#006A4E] transition-colors leading-snug">
                              {service.titleBn}
                            </h3>
                            <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono font-semibold block">
                              {service.titleEn}
                            </span>
                          </div>
                        </div>

                        <span className="text-[8px] sm:text-[9px] font-black bg-emerald-50 text-[#006A4E] px-1.5 py-0.5 rounded-md border border-emerald-200/80 whitespace-nowrap flex-shrink-0">
                          {service.badge}
                        </span>
                      </div>

                      <p className="text-slate-600 text-[11px] sm:text-xs font-medium leading-relaxed my-1.5 sm:my-2 line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between mt-1.5 sm:mt-2">
                      {service.helpline ? (
                        <a
                          href={`tel:${service.helpline}`}
                          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-lg border border-rose-200 transition-colors"
                        >
                          <PhoneCall size={11} className="animate-pulse" />
                          <span>কল: {service.helpline}</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-slate-400">
                          <ShieldCheck size={11} className="text-emerald-600" />
                          <span>ভেরিফাইড পোর্টাল</span>
                        </span>
                      )}

                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-[#006A4E] hover:bg-[#00523C] text-white font-black text-[11px] sm:text-xs rounded-lg sm:rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
                      >
                        <span>পোর্টালে যান</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-slate-100 border-t border-slate-200 p-2 sm:p-3 px-3 sm:px-6 flex flex-row items-center justify-between gap-2 text-[10px] sm:text-xs font-bold text-slate-600 flex-shrink-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
              <span className="truncate">শরীয়তপুর জেলা বাতায়ন ই-সেবা ডেস্ক • সহায়তায় a2i & ICT Division</span>
            </div>

            <button
              onClick={onClose}
              className="px-3 py-1 sm:px-5 sm:py-2 bg-slate-800 text-white hover:bg-slate-900 rounded-lg sm:rounded-xl text-[11px] sm:text-xs transition-colors cursor-pointer flex-shrink-0"
            >
              বন্ধ করুন
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
