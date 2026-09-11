import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CategoryId } from '../types';
import {
  Laptop,
  TrendingUp,
  Globe,
  GraduationCap,
  ClipboardCheck,
  Sprout,
  Briefcase,
  FileText,
  ExternalLink,
  Smartphone,
  Building,
  ArrowRight,
  ShieldAlert,
  Download,
  CheckCircle,
  Clock,
  Sparkles,
  Phone
} from 'lucide-react';

interface GovServiceItem {
  id: string;
  name: string;
  description: string;
  banglaName: string;
  category: 'popular' | 'new' | 'mobile' | 'office' | 'all';
  url: string;
  iconType: string;
  colorClass: string;
  textColor: string;
  stats?: string;
  localCategoryId?: CategoryId;
  localCategoryName?: string;
}

interface GovServicesSectionProps {
  onSelectLocalCategory?: (catId: CategoryId) => void;
}

export const GovServicesSection: React.FC<GovServicesSectionProps> = ({ onSelectLocalCategory }) => {
  const [activeTab, setActiveTab] = useState<'popular' | 'new' | 'mobile' | 'office' | 'all'>('popular');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<GovServiceItem | null>(null);

  const tabs = [
    { id: 'popular', label: 'জনপ্রিয় সেবা' },
    { id: 'new', label: 'নতুন সেবা' },
    { id: 'mobile', label: 'মোবাইল সেবা' },
    { id: 'office', label: 'দপ্তর সেবা' },
    { id: 'all', label: 'সকল ই-সেবা' },
  ] as const;

  const servicesData: GovServiceItem[] = [
    // === POPULAR SERVICES (জনপ্রিয় সেবা) ===
    {
      id: 's1',
      name: 'Digital Center',
      banglaName: 'ডিজিটাল সেন্টার',
      description: 'ইউনিয়ন ডিজিটাল সেন্টারের নাগরিক সনদপত্র, জমির পর্চা, পাসপোর্ট আবেদন ও কম্পিউটার ট্রেনিং সেবা।',
      category: 'popular',
      url: 'https://eksheba.gov.bd',
      iconType: 'digital_center',
      colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-155 group-hover:bg-emerald-600 group-hover:text-white',
      textColor: 'text-emerald-700',
      stats: '৮,৫০০+ সফল আবেদন'
    },
    {
      id: 's2',
      name: 'Finance & Commerce',
      banglaName: 'অর্থ ও বাণিজ্য',
      description: 'অনলাইনে ই-ট্রেড লাইসেন্স নিবন্ধন, আয়কর রিটার্ন জমাদান এবং ভ্যাট চালান ট্র্যাকিং ব্যবস্থা।',
      category: 'popular',
      url: 'https://ibass.finance.gov.bd',
      iconType: 'finance',
      colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-155 group-hover:bg-indigo-600 group-hover:text-white',
      textColor: 'text-indigo-700',
      stats: '১০০% ডিজিটাল পেমেন্ট'
    },
    {
      id: 's3',
      name: 'Online Application',
      banglaName: 'অনলাইন আবেদন',
      description: 'মাইগভ (MyGov) পোর্টালের মাধ্যমে যেকোনো সরকারি সেবা, অনুদান, ভাতা এবং সনদের সমন্বিত আবেদন।',
      category: 'popular',
      url: 'https://mygov.bd',
      iconType: 'apply',
      colorClass: 'bg-blue-50 text-blue-600 border-blue-155 group-hover:bg-blue-600 group-hover:text-white',
      textColor: 'text-blue-700',
      stats: '২৪ ঘণ্টা প্রসেসিং টাইম'
    },
    {
      id: 's4',
      name: 'Education Sector',
      banglaName: 'শিক্ষা-বিষয়ক',
      description: 'বৃত্তি, ই-বুক ডাউনলোড, পরীক্ষার ফলাফল, ডিজিটাল বোর্ড বই এবং শিক্ষক বাতায়ন সেবাসমূহ।',
      category: 'popular',
      url: 'http://www.educationboardresults.gov.bd',
      iconType: 'education',
      colorClass: 'bg-amber-50 text-amber-600 border-amber-155 group-hover:bg-amber-600 group-hover:text-white',
      textColor: 'text-amber-700',
      stats: 'সকল বোর্ড লিংক সচল'
    },
    {
      id: 's5',
      name: 'Online Registration',
      banglaName: 'অনলাইন নিবন্ধন',
      description: 'জন্ম ও মৃত্যু নিবন্ধন অনলাইনে নতুন আবেদন, আবেদন পত্র ডাউনলোড, সংশোধন এবং যাচাইকরণ ব্যবস্থা।',
      category: 'popular',
      url: 'https://bdris.gov.bd',
      iconType: 'registration',
      colorClass: 'bg-pink-50 text-pink-600 border-pink-155 group-hover:bg-pink-600 group-hover:text-white',
      textColor: 'text-pink-700',
      stats: 'নিরাপদ ডেটাবেইজ'
    },
    {
      id: 's6',
      name: 'Agriculture',
      banglaName: 'কৃষি সেবা বাতায়ন',
      description: 'কৃষকদের জন্য সার-বীজের মূল্য, ফসলের রোগ বালাই প্রতিকার, আবহাওয়ার আপডেট এবং কৃষি সহায়তা।',
      category: 'popular',
      url: 'http://www.ais.gov.bd',
      iconType: 'agriculture',
      colorClass: 'bg-teal-50 text-teal-600 border-teal-155 group-hover:bg-teal-600 group-hover:text-white',
      textColor: 'text-teal-700',
      stats: 'কৃষক তথ্য ব্যাংক সচল'
    },
    {
      id: 's7',
      name: 'Recruitment & Jobs',
      banglaName: 'নিয়োগ সংক্রান্ত',
      description: 'সকল সরকারি চাকরির বিজ্ঞপ্তি, অনলাইন আবেদন, প্রবেশপত্র ডাউনলোড এবং ফলাফল জানার সমন্বিত পোর্টাল।',
      category: 'popular',
      url: 'https://alljobs.teletalk.com.bd',
      iconType: 'recruitment',
      colorClass: 'bg-cyan-50 text-cyan-600 border-cyan-155 group-hover:bg-cyan-600 group-hover:text-white',
      textColor: 'text-cyan-700',
      stats: 'সরাসরি সরকারি রিক্রুটমেন্ট'
    },
    {
      id: 's8',
      name: 'Passport & Visa',
      banglaName: 'পাসপোর্ট, ভিসা ও ইমিগ্রেশন',
      description: 'অনলাইনে ই-পাসপোর্ট আবেদন, পাসপোর্ট ফি ব্যাংক পেমেন্ট রশিদ, এবং পুলিশ ভেরিফিকেশন স্ট্যাটাস ট্র্যাকিং।',
      category: 'popular',
      url: 'https://www.epassport.gov.bd',
      iconType: 'passport',
      colorClass: 'bg-rose-50 text-rose-600 border-rose-155 group-hover:bg-rose-600 group-hover:text-white',
      textColor: 'text-rose-700',
      stats: 'বায়োমেট্রিক স্লট বুকিং'
    },

    // === NEW SERVICES (নতুন সেবা) ===
    {
      id: 'n1',
      name: 'Universal Pension',
      banglaName: 'সর্বজনীন পেনশন স্কিম',
      description: 'নাগরিকদের ভবিষ্যৎ সুরক্ষায় সরকারের যুগান্তকারী পেনশন স্কিম নিবন্ধন ও মাসিক চাঁদা ক্যালকুলেটর পোর্টাল।',
      category: 'new',
      url: 'https://www.upension.gov.bd',
      iconType: 'pension',
      colorClass: 'bg-amber-50 text-amber-700 border-amber-200 group-hover:bg-amber-600 group-hover:text-white',
      textColor: 'text-amber-800'
    },
    {
      id: 'n2',
      name: 'Prottoyon Portal',
      banglaName: 'প্রত্যয়ন পোর্টাল (Prottoyon)',
      description: 'অনলাইনে নাগরিকত্ব সনদপত্র, চারিত্রিক সনদপত্র এবং পারিবারিক উত্তরাধিকার সনদ প্রাপ্তির ওয়ান-স্টপ হাব।',
      category: 'new',
      url: 'https://prottoyon.gov.bd',
      iconType: 'prottoyon',
      colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white',
      textColor: 'text-emerald-800'
    },
    {
      id: 'n3',
      name: 'e-Mutation Services',
      banglaName: 'ই-নামজারি ও জোত খতিয়ান',
      description: 'মাত্র ২৮ দিনে জমির ই-নামজারি/খারিজ আবেদন এবং ডুপ্লিকেট খতিয়ান পাওয়ার নিরাপদ ডিজিটাল সেবা।',
      category: 'new',
      url: 'https://mutation.land.gov.bd',
      iconType: 'mutation',
      colorClass: 'bg-blue-50 text-blue-700 border-blue-200 group-hover:bg-blue-600 group-hover:text-white',
      textColor: 'text-blue-800'
    },
    {
      id: 'n4',
      name: 'A-Challan System',
      banglaName: 'অনলাইন ই-চালান (A-Challan)',
      description: 'যেকোনো সরকারি ফি ও কর সোনালী ব্যাংক, রকেট বা বিকাশ ব্যবহার করে অনলাইনে পরিশোধের ই-চালান মাধ্যম।',
      category: 'new',
      url: 'https://ibass.finance.gov.bd/challan',
      iconType: 'challan',
      colorClass: 'bg-purple-50 text-purple-700 border-purple-200 group-hover:bg-purple-600 group-hover:text-white',
      textColor: 'text-purple-800'
    },

    // === MOBILE SERVICES (মোবাইল সেবা) ===
    {
      id: 'm1',
      name: 'MyGov Mobile App',
      banglaName: 'মাইগভ মোবাইল অ্যাপ',
      description: 'একটিমাত্র মোবাইল অ্যাপেই নাগরিকের প্রয়োজনীয় শত শত সরকারি সেবা হাতের মুঠোয় পাওয়া যায়।',
      category: 'mobile',
      url: 'https://play.google.com/store/apps/details?id=bd.gov.mygov',
      iconType: 'mobile_app',
      colorClass: 'bg-sky-50 text-sky-700 border-sky-200 group-hover:bg-sky-600 group-hover:text-white',
      textColor: 'text-sky-800'
    },
    {
      id: 'm2',
      name: 'Surokkha Vaccine',
      banglaName: 'সুরক্ষা ই-টিকা বাতায়ন',
      description: 'জাতীয় টিকা প্রোগ্রাম, শিশু স্বাস্থ্য ও পোলিও ভ্যাকসিন নিবন্ধন এবং টিকাদান সনদ ডাউনলোডার।',
      category: 'mobile',
      url: 'https://surokkha.gov.bd',
      iconType: 'vaccine',
      colorClass: 'bg-teal-50 text-teal-700 border-teal-200 group-hover:bg-teal-600 group-hover:text-white',
      textColor: 'text-teal-800'
    },
    {
      id: 'm3',
      name: 'National Helpline 333',
      banglaName: '৩৩৩ তথ্য ও সমাজ সেবা হেল্পলাইন',
      description: 'সামাজিক যেকোনো অপরাধ ও ত্রাণ সহায়তা এবং সরকারি কর্মকর্তা বা দপ্তরের তথ্য জানার ২৪ ঘণ্টা হটলাইন।',
      category: 'mobile',
      url: 'tel:333',
      iconType: 'hotline',
      colorClass: 'bg-rose-50 text-rose-700 border-rose-200 group-hover:bg-rose-600 group-hover:text-white',
      textColor: 'text-rose-800'
    },
    {
      id: 'm4',
      name: 'National Emergency 999',
      banglaName: '৯৯৯ জাতীয় জরুরি কলার অ্যাপ',
      description: 'তাৎক্ষণিক পুলিশ সহায়তা, ফায়ার স্টেশন এলার্ট এবং ফ্রি অ্যাম্বুলেন্স রেসকিউ সিস্টেম বুকিং অ্যাপ।',
      category: 'mobile',
      url: 'tel:999',
      iconType: 'emergency_app',
      colorClass: 'bg-red-50 text-red-700 border-red-200 group-hover:bg-red-600 group-hover:text-white',
      textColor: 'text-red-800'
    },

    // === OFFICE SERVICES (দপ্তর সেবা) ===
    {
      id: 'o1',
      name: 'Shariatpur DC Office',
      banglaName: 'জেলা প্রশাসকের কার্যালয়, শরীয়তপুর',
      description: 'জেলা সার্কিট হাউজ বুকিং, জেলা ম্যাজিস্ট্রেট এর এজলাস তালিকা ও জেলা প্রশাসনের লাইসেন্স ট্র্যাকিং।',
      category: 'office',
      url: 'http://www.shariatpur.gov.bd',
      iconType: 'dc_office',
      colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white',
      textColor: 'text-emerald-800'
    },
    {
      id: 'o2',
      name: 'SP Police Headquarters',
      banglaName: 'পুলিশ সুপার কার্যালয়, শরীয়তপুর',
      description: 'জেলার অনলাইন পাসপোর্ট ক্লিয়ারেন্স, ডিএসবি ইমিগ্রেশন আবেদন ও পুলিশ ভেরিফিকেশন কার্যক্রম।',
      category: 'office',
      url: 'http://police.shariatpur.gov.bd',
      iconType: 'sp_office',
      colorClass: 'bg-blue-50 text-blue-700 border-blue-200 group-hover:bg-blue-600 group-hover:text-white',
      textColor: 'text-blue-800'
    },
    {
      id: 'o3',
      name: 'Civil Surgeon Shariatpur',
      banglaName: 'সিভিল সার্জন কার্যালয়, শরীয়তপুর',
      description: 'জেলার সরকারি হাসপাতালসমূহের আসন ফ্লোর, চিকিৎসক উপস্থিতি চার্ট ও ডেঙ্গু মহামারী সতর্কতা।',
      category: 'office',
      url: 'http://cs.shariatpur.gov.bd',
      iconType: 'cs_office',
      colorClass: 'bg-pink-50 text-pink-700 border-pink-200 group-hover:bg-pink-600 group-hover:text-white',
      textColor: 'text-pink-800'
    },
    {
      id: 'o4',
      name: 'Land Registry Office',
      banglaName: 'উপজেলা ভূমি রেভিনিউ সার্কেল',
      description: 'শরীয়তপুরের ৬টি উপজেলার সহকারী কমিশনার (ভূমি) এর কার্যালয়ের শুনানির ডেট ও নোটিশ বুক।',
      category: 'office',
      url: 'https://land.gov.bd',
      iconType: 'land_office',
      colorClass: 'bg-teal-50 text-teal-700 border-teal-200 group-hover:bg-teal-600 group-hover:text-white',
      textColor: 'text-teal-800'
    },

    // === ALL SERVICES (সকল ই-সেবা) ===
    {
      id: 'a1',
      name: 'ekSheba Bangladesh',
      banglaName: 'একসেবা পোর্টাল (ekSheba)',
      description: 'বাংলাদেশের সকল একক নাগরিক ই-সেবা একই আইডি দিয়ে লগইন করে আবেদন করার মূল কেন্দ্রবিন্দু।',
      category: 'all',
      url: 'https://www.eksheba.gov.bd',
      iconType: 'eksheba',
      colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white',
      textColor: 'text-emerald-800'
    },
    {
      id: 'a2',
      name: 'ekPay Utility Payment',
      banglaName: 'একপে ইউটিলিটি বিল (ekPay)',
      description: 'অনলাইনে সোনালী ব্যাংক, বিকাশ বা রকেট দিয়ে বিদ্যুৎ, গ্যাস, জল ও ইন্টারনেটের সরকারি বিল পরিশোধ গেটওয়ে।',
      category: 'all',
      url: 'https://ekpay.gov.bd',
      iconType: 'ekpay',
      colorClass: 'bg-blue-50 text-blue-700 border-blue-200 group-hover:bg-blue-600 group-hover:text-white',
      textColor: 'text-blue-800'
    },
    {
      id: 'a3',
      name: 'National Infokosh',
      banglaName: 'জাতীয় ই-তথ্যকোষ',
      description: 'শিক্ষা, কৃষি, স্বাস্থ্য ও আইনি সহায়তা সম্পর্কে ইন্টারনেটে জ্ঞানভিত্তিক তথ্যের বিশাল বাংলা আর্কাইভ।',
      category: 'all',
      url: 'http://infokosh.gov.bd',
      iconType: 'infokosh',
      colorClass: 'bg-purple-50 text-purple-700 border-purple-200 group-hover:bg-purple-600 group-hover:text-white',
      textColor: 'text-purple-800'
    },
    {
      id: 'a4',
      name: 'Bangladesh Post Office',
      banglaName: 'বাংলাদেশ ডাক বিভাগ ই-সেবা',
      description: 'অনলাইনে ক্যাশ কার্ড সেভিংস একাউন্ট ব্যালেন্স চেক, আন্তর্জাতিক ইএমএস কুরিয়ার ট্র্যাকিং ও পোস্টাল কোড সার্চ।',
      category: 'all',
      url: 'http://bdpost.gov.bd',
      iconType: 'post_office',
      colorClass: 'bg-rose-50 text-rose-700 border-rose-200 group-hover:bg-rose-600 group-hover:text-white',
      textColor: 'text-rose-800'
    }
  ];

  // Filtering based on Active Tab
  const filteredServices = servicesData.filter(s => s.category === activeTab);

  // Pagination for display cards
  const itemsToShow = isExpanded ? filteredServices : filteredServices.slice(0, 8);

  const getLucideIcon = (iconType: string) => {
    switch (iconType) {
      case 'digital_center':
        return <Laptop className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" />;
      case 'finance':
        return <TrendingUp className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" />;
      case 'apply':
        return <Globe className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" />;
      case 'education':
        return <GraduationCap className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" />;
      case 'registration':
        return <ClipboardCheck className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" />;
      case 'agriculture':
        return <Sprout className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" />;
      case 'recruitment':
        return <Briefcase className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" />;
      case 'passport':
        return <FileText className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" />;
      case 'pension':
        return <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />;
      case 'prottoyon':
        return <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />;
      case 'mutation':
        return <Building className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />;
      case 'challan':
        return <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />;
      case 'mobile_app':
        return <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-sky-600" />;
      case 'vaccine':
        return <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-teal-600" />;
      case 'hotline':
        return <ShieldAlert className="w-8 h-8 md:w-10 md:h-10 text-rose-600" />;
      case 'emergency_app':
        return <ShieldAlert className="w-8 h-8 md:w-10 md:h-10 text-red-600" />;
      case 'dc_office':
        return <Building className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />;
      case 'sp_office':
        return <Building className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />;
      case 'cs_office':
        return <Building className="w-8 h-8 md:w-10 md:h-10 text-pink-600" />;
      case 'land_office':
        return <Laptop className="w-8 h-8 md:w-10 md:h-10 text-teal-600" />;
      case 'eksheba':
        return <Globe className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />;
      case 'ekpay':
        return <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />;
      case 'infokosh':
        return <Laptop className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />;
      case 'post_office':
        return <FileText className="w-8 h-8 md:w-10 md:h-10 text-rose-600" />;
      default:
        return <Globe className="w-8 h-8 md:w-10 md:h-10" />;
    }
  };

  return (
    <section id="gov-services-interactive-dashboard" className="bg-slate-50/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-8 shadow-xs relative">
      {/* Absolute background stamp badge */}
      <div className="absolute right-6 top-6 w-14 h-14 bg-[#006A4E]/5 rounded-full flex items-center justify-center border border-[#006A4E]/10 select-none pointer-events-none">
        <span className="text-[#006A4E] text-[10px] font-black tracking-widest uppercase font-mono">GOVT</span>
      </div>

      {/* 1. Header Centered Title (সরকারি সেবাসমূহ) */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#006A4E]/10 border border-[#D4AF37]/50 mb-1 shadow-sm">
          <span className="text-red-600 font-extrabold text-xl leading-none">★</span>
        </div>
        <h2 className="font-sans font-black text-2xl md:text-3xl text-slate-800 tracking-tight flex items-center justify-center gap-2">
          সরকারি সেবাসমূহ (Digital Government Services)
        </h2>
        <p className="text-slate-500 font-bold text-xs md:text-sm max-w-2xl mx-auto">
          বাংলাদেশ জাতীয় তথ্য বাতায়ন অনুমোদিত সকল সরকারি একক ডিজিটাল সেবা ও অনলাইন পোর্টালসমূহ হাতের মুঠোয়।
        </p>
      </div>

      {/* 2. Horizontal Tab Controller Bar exactly mimicking image with deep blue/green active buttons */}
      <div className="flex justify-center">
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-1.5 md:gap-2 bg-white/90 p-1.5 rounded-2xl border border-slate-250 shadow-inner max-w-full overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                id={`gov-tab-${tab.id}`}
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsExpanded(false);
                }}
                className={`px-4 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2
                  ${
                    isActive
                      ? 'bg-[#0a4595] text-white shadow-md'
                      : 'bg-white text-slate-650 hover:bg-slate-50 hover:text-slate-850'
                  }
                `}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Grid Layout mirroring image (Professional White Cards with subtle shadows and animations) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {itemsToShow.map((service) => (
          <div
            id={`gov-service-card-${service.id}`}
            key={service.id}
            onClick={() => setSelectedServiceDetail(service)}
            className="group bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col items-center text-center justify-between transition-all duration-300 hover:shadow-lg hover:border-[#0a4595]/30 cursor-pointer relative overflow-hidden"
          >
            {/* Subtle card decor (top thin line color) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37]/40 group-hover:bg-[#0a4595] transition-colors" />

            <div className="space-y-4 w-full">
              {/* Circular Icon Container */}
              <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border transition-all duration-300 shadow-2xs ${service.colorClass}`}>
                {getLucideIcon(service.iconType)}
              </div>

              {/* Title Bangla/English Label */}
              <div className="space-y-1">
                <h4 className="font-sans font-black text-slate-800 text-sm md:text-md group-hover:text-[#0a4595] transition-colors leading-snug">
                  {service.banglaName}
                </h4>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-450 font-mono">
                  {service.name}
                </p>
              </div>

              {/* Description Paragraph */}
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed line-clamp-2 px-1">
                {service.description}
              </p>
            </div>

            {/* Bottom Status / Stats badge */}
            <div className="mt-5 pt-3 border-t border-slate-100 w-full flex items-center justify-between text-[10px] text-slate-400 font-bold font-sans">
              <span className="inline-flex items-center gap-1 text-slate-450">
                <Clock size={10} className="text-emerald-600" />
                অনলাইন পোর্টাল
              </span>
              <span className="text-[#0a4595] flex items-center gap-0.5 font-extrabold">
                সেবা নিন <ArrowRight size={10} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Action Button "আরো দেখুন ↓" capsule outlining button */}
      {filteredServices.length > 8 && (
        <div className="flex justify-center pt-4">
          <button
            id="toggle-expand-gov-services-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#0a4595] text-[#0a4595] hover:bg-[#0a4595] hover:text-white transition-all font-sans font-black text-xs md:text-sm shadow-sm hover:shadow-md cursor-pointer active:scale-95"
          >
            <span>{isExpanded ? 'কম দেখুন ↑' : 'আরো দেখুন ↓'}</span>
          </button>
        </div>
      )}

      {/* 5. Informational Modal for Service Action details */}
      {selectedServiceDetail && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedServiceDetail(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-2xl relative w-full max-w-md border border-slate-200 z-10 overflow-hidden"
            >
              {/* Header colored bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#006A4E] via-[#D4AF37] to-[#006A4E]" />

              <div className="flex justify-between items-start pt-2">
                <div className="flex items-center gap-2 bg-[#006A4E]/10 text-[#006A4E] text-[10px] font-black px-2.5 py-0.5 rounded-md border border-[#006A4E]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-pulse" />
                  গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত
                </div>
                <button
                  id="close-gov-detail-modal"
                  onClick={() => setSelectedServiceDetail(null)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-800 transition-colors"
                >
                  &times;
                </button>
              </div>

              <div className="mt-5 space-y-4 text-center sm:text-left">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto sm:mx-0 shadow-inner">
                  {getLucideIcon(selectedServiceDetail.iconType)}
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans font-black text-xl text-slate-850">
                    {selectedServiceDetail.banglaName}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono font-bold tracking-wider">
                    {selectedServiceDetail.name} • DIGITAL SERVICE
                  </p>
                </div>

                <p className="text-sm text-slate-600 font-semibold leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-150">
                  {selectedServiceDetail.description}
                </p>

                {selectedServiceDetail.stats && (
                  <div className="flex items-center gap-1.5 text-xs text-[#006A4E] font-black">
                    <span>★</span>
                    <span>পরিসংখ্যান: {selectedServiceDetail.stats}</span>
                  </div>
                )}

                <div className="pt-3 flex flex-col sm:flex-row flex-wrap gap-2.5">
                  <a
                    id="gov-direct-service-link"
                    href={selectedServiceDetail.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedServiceDetail(null)}
                    className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#006A4E] hover:bg-[#005740] text-white font-sans font-black text-xs md:text-sm transition-colors cursor-pointer shadow-sm border border-[#006A4E]"
                  >
                    <span>অনলাইন সেবা নিন / Portal</span>
                    <ExternalLink size={14} />
                  </a>

                  {selectedServiceDetail.localCategoryId && onSelectLocalCategory && (
                    <button
                      id="gov-modal-local-contacts-btn"
                      onClick={() => {
                        const cat = selectedServiceDetail.localCategoryId!;
                        setSelectedServiceDetail(null);
                        onSelectLocalCategory(cat);
                      }}
                      className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-sans font-black text-xs md:text-sm transition-colors cursor-pointer shadow-sm border border-amber-600"
                    >
                      <Phone size={14} />
                      <span>জরুরি নম্বরসমূহ দেখুন</span>
                    </button>
                  )}

                  <button
                    id="dismiss-gov-modal"
                    onClick={() => setSelectedServiceDetail(null)}
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold text-xs transition-colors"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
