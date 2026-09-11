import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { HorizontalSliderBar } from './HorizontalSliderBar';
import {
  Shield,
  FileText,
  UserCheck,
  Building2,
  ExternalLink,
  Award,
  Phone,
  Mail,
  MapPin,
  Landmark,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Download,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Layers,
  Sparkles,
  Search,
  Bell,
  Eye,
  BookOpen
} from 'lucide-react';
import { Contact } from '../types';
import { DistrictDetailsModal, DistrictTab } from './DistrictDetailsModal';

interface GovernmentPortalHomeProps {
  onSelectCategory: (catId: string) => void;
  onCallContact?: (contact: Contact) => void;
  onOpenSuggestModal: () => void;
  onOpenMedicalDirectory: () => void;
}

interface LeadershipOfficial {
  id: string;
  serial: string;
  category: 'dc_adc' | 'uno' | 'magistrate' | 'police_health';
  title: string;
  englishTitle: string;
  name: string;
  designation: string;
  office: string;
  roomNo?: string;
  phone: string;
  email: string;
  image: string;
  badge: string;
  badgeBg: string;
  bio?: string;
}

const OFFICIAL_LEADERS: LeadershipOfficial[] = [
  {
    id: 'dc-shariatpur',
    serial: '১',
    category: 'dc_adc',
    title: 'জেলা প্রশাসক ও বিজ্ঞ জেলা ম্যাজিস্ট্রেট',
    englishTitle: 'Deputy Commissioner and District Magistrate',
    name: 'তাহসিনা বেগম',
    designation: 'জেলা প্রশাসক ও বিজ্ঞ জেলা ম্যাজিস্ট্রেট',
    office: 'জেলা প্রশাসকের কার্যালয়, শরীয়তপুর',
    roomNo: 'রুম  (প্রধান প্রশাসনিক ভবন)',
    phone: '০১৭১৫১৯৩৮৯৩',
    email: 'dcshariatpur@mopa.gov.bd',
    image: 'https://i.postimg.cc/WpXTk0n5/ta-hasa-na-ba-gama.jpg',
    badge: 'জেলা প্রধান',
    badgeBg: 'bg-[#006A4E] text-white',
    bio: 'শরীয়তপুর জেলা প্রশাসনের প্রশাসনিক ও নির্বাহী প্রধান। আইনশৃঙ্খলা, উন্নয়ন প্রকল্প, এবং রাজস্ব প্রশাসনের সমন্বয়ক।',
  },
  {
    id: 'adc-gen',
    serial: '২',
    category: 'dc_adc',
    title: 'অতিরিক্ত জেলা প্রশাসক (সার্বিক)',
    englishTitle: 'Additional Deputy Commissioner (General)',
    name: 'ফারজানা ইয়াসমিন',
    designation: 'অতিরিক্ত জেলা প্রশাসক (সার্বিক)',
    office: 'জেলা প্রশাসকের কার্যালয়, শরীয়তপুর',
    roomNo: 'রুম ২০২',
    phone: '01711-445502',
    email: 'adcgen_shariatpur@mopa.gov.bd',
    image: 'https://i.postimg.cc/CMf9FD2F/ma-oya-ha-da-ha-sa-na.jpg',
    badge: 'সার্বিক প্রশাসন',
    badgeBg: 'bg-emerald-700 text-white',
    bio: 'জেলা প্রশাসনের সার্বিক কার্যক্রমে সহায়তা প্রদান ও প্রশাসনিক উন্নয়ন প্রকল্প বাস্তবায়ন পর্যবেক্ষণ।',
  },
  {
    id: 'adc-rev',
    serial: '৩',
    category: 'dc_adc',
    title: 'অতিরিক্ত জেলা প্রশাসক (রাজস্ব)',
    englishTitle: 'Additional Deputy Commissioner (Revenue)',
    name: 'মোঃ আব্দুল মালেক',
    designation: 'অতিরিক্ত জেলা প্রশাসক (রাজস্ব)',
    office: 'জেলা প্রশাসকের কার্যালয়, শরীয়তপুর',
    roomNo: 'রুম ২০৪',
    phone: '01711-445503',
    email: 'adcrev_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    badge: 'ভূমি ও রাজস্ব',
    badgeBg: 'bg-amber-700 text-white',
    bio: 'জেলা ভূমি ব্যবস্থাপনা, ই-নামজারি, খাস জমি বন্দোবস্ত ও খতিয়ান সেবা সংক্রান্ত বিভাগের দায়িত্বপ্রাপ্ত।',
  },
  {
    id: 'adc-edu',
    serial: '৪',
    category: 'dc_adc',
    title: 'অতিরিক্ত জেলা প্রশাসক (শিক্ষা ও আইসিটি)',
    englishTitle: 'Additional Deputy Commissioner (Edu & ICT)',
    name: 'মোঃ শামীম হোসেন',
    designation: 'অতিরিক্ত জেলা প্রশাসক (শিক্ষা ও আইসিটি)',
    office: 'জেলা প্রশাসকের কার্যালয়, শরীয়তপুর',
    roomNo: 'রুম ২০৬',
    phone: '01711-445504',
    email: 'adcedu_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    badge: 'শিক্ষা ও আইসিটি',
    badgeBg: 'bg-purple-700 text-white',
    bio: 'স্মার্ট জেলা উদ্যোগ, ডিজিটাল সেবা, শিক্ষা প্রতিষ্ঠান তদারকি ও আইসিটি সেল পর্যবেক্ষণ।',
  },
  {
    id: 'adm-shariatpur',
    serial: '৫',
    category: 'dc_adc',
    title: 'অতিরিক্ত জেলা ম্যাজিস্ট্রেট (ADM)',
    englishTitle: 'Additional District Magistrate',
    name: 'রেজওয়ানা আফরিন',
    designation: 'অতিরিক্ত জেলা ম্যাজিস্ট্রেট',
    office: 'জেলা ম্যাজিস্ট্রেট আদালত ভবন, শরীয়তপুর',
    roomNo: 'রুম ১০৪',
    phone: '01711-445505',
    email: 'adm_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    badge: 'ম্যাজিস্ট্রেসি ও আদালত',
    badgeBg: 'bg-rose-700 text-white',
    bio: 'জেলা নির্বাহী ম্যাজিস্ট্রেসি ও ফৌজদারি কার্যবিধির অধীন জরুরি আদালত সংক্রান্ত বিষয় পরিচালনা।',
  },

  // UNOs
  {
    id: 'uno-sadar',
    serial: '৬',
    category: 'uno',
    title: 'উপজেলা নির্বাহী অফিসার - শরীয়তপুর সদর',
    englishTitle: 'Upazila Nirbahi Officer - Sadar',
    name: 'মোঃ রফিকুল ইসলাম',
    designation: 'উপজেলা নির্বাহী অফিসার (ইউএনও)',
    office: 'উপজেলা পরিষদ কার্যালয়, শরীয়তপুর সদর',
    roomNo: 'ইউএনও ভবন, সদর',
    phone: '01700-712201',
    email: 'unosadar_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    badge: 'ইউএনও - সদর',
    badgeBg: 'bg-teal-700 text-white',
    bio: 'শরীয়তপুর সদর উপজেলার নির্বাহী প্রধান। স্থানীয় উন্নয়ন, নাগরিক সেবা ও আইনশৃঙ্খলা তদারকি করেন।',
  },
  {
    id: 'uno-naria',
    serial: '৭',
    category: 'uno',
    title: 'উপজেলা নির্বাহী অফিসার - নড়িয়া',
    englishTitle: 'Upazila Nirbahi Officer - Naria',
    name: 'শংকর চন্দ্র বৈদ্য',
    designation: 'উপজেলা নির্বাহী অফিসার (ইউএনও)',
    office: 'উপজেলা পরিষদ কার্যালয়, নড়িয়া',
    roomNo: 'ইউএনও ভবন, নড়িয়া',
    phone: '01700-712202',
    email: 'unonaria_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    badge: 'ইউএনও - নড়িয়া',
    badgeBg: 'bg-teal-700 text-white',
    bio: 'নড়িয়া উপজেলার প্রধান প্রশাসনিক কর্মকর্তা। নদী ভাঙন প্রতিরোধ ও চরাঞ্চল উন্নয়ন তদারক করেন।',
  },
  {
    id: 'uno-zajira',
    serial: '৮',
    category: 'uno',
    title: 'উপজেলা নির্বাহী অফিসার - জাজিরা',
    englishTitle: 'Upazila Nirbahi Officer - Zajira',
    name: 'মোসাঃ কামরুন নাহার',
    designation: 'উপজেলা নির্বাহী অফিসার (ইউএনও)',
    office: 'উপজেলা পরিষদ কার্যালয়, জাজিরা',
    roomNo: 'ইউএনও ভবন, জাজিরা',
    phone: '01700-712203',
    email: 'unozajira_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    badge: 'ইউএনও - জাজিরা',
    badgeBg: 'bg-teal-700 text-white',
    bio: 'পদ্মা সেতু সংলগ্ন জাজিরা উপজেলার সামগ্রিক উন্নয়ন কার্যক্রম ও আইনশৃঙ্খলা তদারকি।',
  },
  {
    id: 'uno-bhedarganj',
    serial: '৯',
    category: 'uno',
    title: 'উপজেলা নির্বাহী অফিসার - ভেদরগঞ্জ',
    englishTitle: 'Upazila Nirbahi Officer - Bhedarganj',
    name: 'মোঃ রাজিবুল ইসলাম',
    designation: 'উপজেলা নির্বাহী অফিসার (ইউএনও)',
    office: 'উপজেলা পরিষদ কার্যালয়, ভেদরগঞ্জ',
    roomNo: 'ইউএনও ভবন, ভেদরগঞ্জ',
    phone: '01700-712204',
    email: 'unobhedarganj_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    badge: 'ইউএনও - ভেদরগঞ্জ',
    badgeBg: 'bg-teal-700 text-white',
    bio: 'ভেদরগঞ্জ উপজেলার সকল ইউনিয়ন পরিষদ ও সরকারি উন্নয়ন কর্মকাণ্ডের প্রধান সমন্বয়ক।',
  },
  {
    id: 'uno-damudya',
    serial: '১০',
    category: 'uno',
    title: 'উপজেলা নির্বাহী অফিসার - দামুড্যা',
    englishTitle: 'Upazila Nirbahi Officer - Damudya',
    name: 'নাসরীন আক্তার',
    designation: 'উপজেলা নির্বাহী অফিসার (ইউএনও)',
    office: 'উপজেলা পরিষদ কার্যালয়, দামুড্যা',
    roomNo: 'ইউএনও ভবন, দামুড্যা',
    phone: '01700-712205',
    email: 'unodamudya_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    badge: 'ইউএনও - দামুড্যা',
    badgeBg: 'bg-teal-700 text-white',
    bio: 'দামুড্যা উপজেলার প্রশাসনিক সেবা কার্যক্রম ও নাগরিকদের সরাসরি সরকারি সেবা প্রদান।',
  },
  {
    id: 'uno-gosairhat',
    serial: '১১',
    category: 'uno',
    title: 'উপজেলা নির্বাহী অফিসার - গোসাইরহাট',
    englishTitle: 'Upazila Nirbahi Officer - Gosairhat',
    name: 'মোঃ কাওছার হোসেন',
    designation: 'উপজেলা নির্বাহী অফিসার (ইউএনও)',
    office: 'উপজেলা পরিষদ কার্যালয়, গোসাইরহাট',
    roomNo: 'ইউএনও ভবন, গোসাইরহাট',
    phone: '01700-712206',
    email: 'unogosairhat_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    badge: 'ইউএনও - গোসাইরহাট',
    badgeBg: 'bg-teal-700 text-white',
    bio: 'গোসাইরহাট চরাঞ্চল ও নদী অববাহিকার সরকারি উন্নয়ন প্রকল্পের প্রধান সমন্বয়কারী।',
  },

  // Magistrates & Department Heads
  {
    id: 'ndc-shariatpur',
    serial: '১২',
    category: 'magistrate',
    title: 'নেজারত ডেপুটি কালেক্টর (NDC)',
    englishTitle: 'Nezarat Deputy Collector & Senior Assistant Commissioner',
    name: 'সাব্বির আহমেদ',
    designation: 'নেজারত ডেপুটি কালেক্টর (এনডিসি)',
    office: 'জেলা প্রশাসকের কার্যালয়, শরীয়তপুর',
    roomNo: 'রুম ১০৬ (নেজারত শাখা)',
    phone: '01711-445510',
    email: 'ndc_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    badge: 'এনডিসি',
    badgeBg: 'bg-cyan-700 text-white',
    bio: 'জেলা প্রশাসকের কার্যালয়ের প্রোটোকল, ট্রেজারি সেল, সার্কিট হাউজ ও সাধারণ শাখার দায়িত্বপ্রাপ্ত কর্মকর্তা।',
  },
  {
    id: 'acland-sadar',
    serial: '১৩',
    category: 'magistrate',
    title: 'সহকারী কমিশনার (ভূমি) - শরীয়তপুর সদর',
    englishTitle: 'Assistant Commissioner (Land) - Sadar',
    name: 'সেলিনা আক্তার',
    designation: 'সহকারী কমিশনার (ভূমি) & নির্বাহী ম্যাজিস্ট্রেট',
    office: 'উপজেলা ভূমি অফিস, শরীয়তপুর সদর',
    roomNo: 'ভূমি অফিস ভবন',
    phone: '01700-712233',
    email: 'aclandsadar_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    badge: 'এসি ল্যান্ড - সদর',
    badgeBg: 'bg-indigo-700 text-white',
    bio: 'ই-নামজারি, খতিয়ান সংশোধন, ভূমি উন্নয়ন কর ও সরকারি খাস জমি তদারক কর্মকর্তা।',
  },
  {
    id: 'acland-naria',
    serial: '১৪',
    category: 'magistrate',
    title: 'সহকারী কমিশনার (ভূমি) - নড়িয়া',
    englishTitle: 'Assistant Commissioner (Land) - Naria',
    name: 'তানজীন আলম',
    designation: 'সহকারী কমিশনার (ভূমি) & নির্বাহী ম্যাজিস্ট্রেট',
    office: 'উপজেলা ভূমি অফিস, নড়িয়া',
    roomNo: 'ভূমি অফিস ভবন, নড়িয়া',
    phone: '01700-712234',
    email: 'aclandnaria_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    badge: 'এসি ল্যান্ড - নড়িয়া',
    badgeBg: 'bg-indigo-700 text-white',
    bio: 'নড়িয়া উপজেলার ভূমি রাজস্ব, খাস জমি ব্যবস্থাপনা ও ই-নামজারি তদারকি কর্মকর্তা।',
  },
  {
    id: 'acland-zajira',
    serial: '১৫',
    category: 'magistrate',
    title: 'সহকারী কমিশনার (ভূমি) - জাজিরা',
    englishTitle: 'Assistant Commissioner (Land) - Zajira',
    name: 'মোঃ মেহেদী হাসান',
    designation: 'সহকারী কমিশনার (ভূমি) & নির্বাহী ম্যাজিস্ট্রেট',
    office: 'উপজেলা ভূমি অফিস, জাজিরা',
    roomNo: 'ভূমি অফিস ভবন, জাজিরা',
    phone: '01700-712235',
    email: 'aclandzajira_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    badge: 'এসি ল্যান্ড - জাজিরা',
    badgeBg: 'bg-indigo-700 text-white',
    bio: 'জাজিরা উপজেলা ভূমি কার্যালয়ের ই-নামজারি, রেকর্ড সংশোধন ও মিউটেশন সংক্রান্ত সেবা।',
  },
  {
    id: 'acland-bhedarganj',
    serial: '১৬',
    category: 'magistrate',
    title: 'সহকারী কমিশনার (ভূমি) - ভেদরগঞ্জ',
    englishTitle: 'Assistant Commissioner (Land) - Bhedarganj',
    name: 'আফরোজা সুলতানা',
    designation: 'সহকারী কমিশনার (ভূমি) & নির্বাহী ম্যাজিস্ট্রেট',
    office: 'উপজেলা ভূমি অফিস, ভেদরগঞ্জ',
    roomNo: 'ভূমি অফিস ভবন, ভেদরগঞ্জ',
    phone: '01700-712236',
    email: 'aclandbhedarganj_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    badge: 'এসি ল্যান্ড - ভেদরগঞ্জ',
    badgeBg: 'bg-indigo-700 text-white',
    bio: 'ভেদরগঞ্জ উপজেলার সরকারি ভূমি রেকর্ড ও নামজারি তদারক কর্মকর্তা।',
  },
  {
    id: 'ac-ict',
    serial: '১৭',
    category: 'magistrate',
    title: 'সহকারী কমিশনার (ই-গর্ভন্যান্স ও আইসিটি)',
    englishTitle: 'Assistant Commissioner (ICT & E-Gov)',
    name: 'শারমিন জাহান',
    designation: 'সহকারী কমিশনার ও নির্বাহী ম্যাজিস্ট্রেট',
    office: 'জেলা প্রশাসকের কার্যালয়, শরীয়তপুর',
    roomNo: 'রুম ৩০১ (আইসিটি সেল)',
    phone: '01711-445518',
    email: 'ac_ict_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    badge: 'আইসিটি সেল',
    badgeBg: 'bg-purple-700 text-white',
    bio: 'জেলা ই-সেবা কেন্দ্র, অনলাইন ল্যান্ড সার্ভিস ও স্মার্ট জেলা উদ্যোগ সমন্বয়কারী।',
  },
  {
    id: 'ac-judicial',
    serial: '১৮',
    category: 'magistrate',
    title: 'সহকারী কমিশনার (জেএম শাখা ও সাধারণ)',
    englishTitle: 'Assistant Commissioner (Judicial Magistrate)',
    name: 'মোঃ তানভীর আহমেদ',
    designation: 'সহকারী কমিশনার ও নির্বাহী ম্যাজিস্ট্রেট',
    office: 'জেলা প্রশাসকের কার্যালয়, শরীয়তপুর',
    roomNo: 'রুম ২০৮ (জেএম শাখা)',
    phone: '01711-445519',
    email: 'ac_jm_shariatpur@mopa.gov.bd',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    badge: 'নির্বাহী ম্যাজিস্ট্রেট',
    badgeBg: 'bg-amber-800 text-white',
    bio: 'মোবাইল কোর্ট পরিচালনা, আইনশৃঙ্খলা রক্ষা ও বিচারিক শাখার দায়িত্বপ্রাপ্ত নির্বাহী ম্যাজিস্ট্রেট।',
  },

  // Police & Health
  {
    id: 'sp-shariatpur',
    serial: '১৯',
    category: 'police_health',
    title: 'পুলিশ সুপার (SP) - শরীয়তপুর জেলা পুলিশ',
    englishTitle: 'Superintendent of Police (SP)',
    name: 'মো: নজরুল ইসলাম, পিপিএম',
    designation: 'পুলিশ সুপার, শরীয়তপুর জেলা',
    office: 'পুলিশ সুপারের কার্যালয়, শরীয়তপুর',
    roomNo: 'প্রধান কার্যালয় ভবন',
    phone: '01320-108300',
    email: 'spshariatpur@police.gov.bd',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    badge: 'আইন-শৃঙ্খলা প্রধান',
    badgeBg: 'bg-blue-700 text-white',
    bio: 'শরীয়তপুর জেলা পুলিশের প্রধান। সকল থানা ও ট্রাফিক ব্যবস্থার সার্বিক নিরাপত্তার দায়িত্বপ্রাপ্ত।',
  },
  {
    id: 'cs-shariatpur',
    serial: '২০',
    category: 'police_health',
    title: 'সিভিল সার্জন - শরীয়তপুর জেলা স্বাস্থ্য বিভাগ',
    englishTitle: 'Civil Surgeon',
    name: 'ডা. মো: আবুল কালাম আজাদ',
    designation: 'সিভিল সার্জন, শরীয়তপুর',
    office: 'সিভিল সার্জন কার্যালয়, শরীয়তপুর',
    roomNo: 'জেলা স্বাস্থ্য অধিদপ্তর',
    phone: '01711-556601',
    email: 'cs_shariatpur@dghs.gov.bd',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    badge: 'স্বাস্থ্য বিভাগ প্রধান',
    badgeBg: 'bg-emerald-700 text-white',
    bio: 'শরীয়তপুর সদর হাসপাতাল ও ৬ উপজেলার সকল সরকারি স্বাস্থ্য সেবা নিয়ন্ত্রণ ও তদারকি করেন।',
  },
  {
    id: 'xen-lged',
    serial: '২১',
    category: 'police_health',
    title: 'নির্বাহী প্রকৌশলী - এলজিইডি (LGED)',
    englishTitle: 'Executive Engineer - LGED',
    name: 'মোঃ রাশেদুল ইসলাম',
    designation: 'নির্বাহী প্রকৌশলী, এলজিইডি',
    office: 'এলজিইডি ভবন, শরীয়তপুর',
    roomNo: 'প্রধান প্রকৌশলী শাখা',
    phone: '01711-889911',
    email: 'xen.shariatpur@lged.gov.bd',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    badge: 'প্রকৌশল দপ্তর',
    badgeBg: 'bg-slate-700 text-white',
    bio: 'শরীয়তপুর জেলার গ্রাম ও শহরের পাকা সড়ক, ব্রিজ-কালভার্ট ও অবকাঠামোগত উন্নয়ন প্রকল্প প্রধান।',
  },
];

interface NoticeItem {
  id: string;
  category: 'general' | 'recruitment' | 'tender' | 'disaster';
  categoryLabel: string;
  date: string;
  title: string;
  department: string;
  isNew?: boolean;
}

const NOTICES_DATA: NoticeItem[] = [
  {
    id: 'n1',
    category: 'general',
    categoryLabel: 'সাধারণ নোটিশ',
    date: '২১ জুলাই, ২০২৬',
    title: 'শরীয়তপুর জেলা তথ্য বাতায়ন ও ডিজিটাল হেল্পডেস্ক সহায়িকা প্রকাশনা সংক্রান্ত বিজ্ঞপ্তি',
    department: 'জেলা প্রশাসকের কার্যালয়, শরীয়তপুর',
    isNew: true,
  },
  {
    id: 'n2',
    category: 'disaster',
    categoryLabel: 'দুর্যোগ বার্তা',
    date: '২০ জুলাই, ২০২৬',
    title: 'পদ্মা ও কীর্তিনাশা নদী অববাহিকার চরাঞ্চলে বর্ষাকালীন আকস্মিক বন্যা প্রতিরোধ ও আশ্রয়কেন্দ্র সচেতনতা নির্দেশিকা',
    department: 'জেলা দুর্যোগ ব্যবস্থাপনা কমিটি',
    isNew: true,
  },
  {
    id: 'n3',
    category: 'recruitment',
    categoryLabel: 'নিয়োগ বিজ্ঞপ্তি',
    date: '১৮ জুলাই, ২০২৬',
    title: 'ইউনিয়ন ডিজিটাল সেন্টার (UDC) উদ্যোক্তা নিয়োগ ও কম্পিউটার অপারেটর তালিকাভূক্তি বিজ্ঞপ্তি',
    department: 'জেলা ই-সেবা সেল, শরীয়তপুর',
  },
  {
    id: 'n4',
    category: 'tender',
    categoryLabel: 'দরপত্র / ই-টেন্ডার',
    date: '১৫ জুলাই, ২০২৬',
    title: 'শরীয়তপুর জেলা হাসপাতাল রোড মেরামত ও আধুনিক সড়ক বাতি স্থাপন ই-টেন্ডার দরপত্র আহ্বান',
    department: 'এলজিইডি ও জেলা পরিষদ, শরীয়তপুর',
  },
];

interface DistrictLandmark {
  id: string;
  title: string;
  location: string;
  image: string;
  desc: string;
  tag: string;
}

const DISTRICT_LANDMARKS: DistrictLandmark[] = [
  {
    id: 'lm1',
    title: 'পদ্মা সেতু জাজিরা পয়েন্ট ও সংযোগ সড়ক',
    location: 'জাজিরা, শরীয়তপুর',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80',
    desc: 'জাতীয় মেগা প্রজেক্ট পদ্মা সেতুর জাজিরা টোল প্লাজা ও আধুনিক ৪-লেন এক্সপ্রেসওয়ে এক্সপ্রেস রোড।',
    tag: 'মেগা প্রজেক্ট ও পর্যটন',
  },
  {
    id: 'lm2',
    title: 'নড়িয়া কীর্তিনাশা রিভারসাইড পার্ক ও বাঁধ',
    location: 'নড়িয়া, শরীয়তপুর',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    desc: 'কীর্তিনাশা নদীর তীর রক্ষাবাঁধ ও মনোরম ওয়াকওয়ে সৌন্দর্যমণ্ডিত আধুনিক বিনোদন স্থান।',
    tag: 'প্রাকৃতিক পার্ক',
  },
  {
    id: 'lm3',
    title: 'ঐতিহাসিক রুদ্রকর মঠ ও জমিদার বাড়ি',
    location: 'শরীয়তপুর সদর',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
    desc: 'শরীয়তপুর জেলার শতাব্দীর প্রাচীন প্রত্নতাত্ত্বিক ঐতিহ্যবাহী মঠ ও ঐতিহাসিক জমিদার স্থাপত্য।',
    tag: 'ঐতিহ্যবাহী স্থান',
  },
  {
    id: 'lm4',
    title: 'শরীয়তপুর ১০০ শয্যা বিশিষ্ট সদর হাসপাতাল',
    location: 'সদর রোড, শরীয়তপুর',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    desc: 'জেলার প্রধান সরকারি চিকিৎসাকেন্দ্র ও ২৪ ঘণ্টা জরুরি বিভাগ সেবা।',
    tag: 'স্বাস্থ্য কেন্দ্র',
  }
];

export const GovernmentPortalHome: React.FC<GovernmentPortalHomeProps> = ({
  onSelectCategory,
  onCallContact,
  onOpenSuggestModal,
  onOpenMedicalDirectory,
}) => {
  const [activeNoticeTab, setActiveNoticeTab] = useState<string>('all');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  // District Stats Modal states
  const [districtModalOpen, setDistrictModalOpen] = useState<boolean>(false);
  const [districtInitialTab, setDistrictInitialTab] = useState<DistrictTab>('upazilas');

  const openDistrictModal = (tab: DistrictTab = 'upazilas') => {
    setDistrictInitialTab(tab);
    setDistrictModalOpen(true);
  };

  // Officers section states
  const [activeOfficerTab, setActiveOfficerTab] = useState<string>('all');
  const [officerSearch, setOfficerSearch] = useState<string>('');
  const [isOfficersExpanded, setIsOfficersExpanded] = useState<boolean>(false);
  const [selectedOfficial, setSelectedOfficial] = useState<LeadershipOfficial | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const filteredNotices = NOTICES_DATA.filter((n) => {
    if (activeNoticeTab === 'all') return true;
    return n.category === activeNoticeTab;
  });

  const filteredOfficials = OFFICIAL_LEADERS.filter((official) => {
    const matchesTab = activeOfficerTab === 'all' || official.category === activeOfficerTab;
    const q = officerSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      official.name.toLowerCase().includes(q) ||
      official.title.toLowerCase().includes(q) ||
      official.designation.toLowerCase().includes(q) ||
      official.office.toLowerCase().includes(q) ||
      official.phone.includes(q) ||
      official.email.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const displayedOfficials =
    isOfficersExpanded || officerSearch.trim() !== '' || activeOfficerTab !== 'all'
      ? filteredOfficials
      : filteredOfficials.slice(0, 4);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Landmark Visual Card & District Quick Services */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left 7 cols: Shariatpur Landmark Visual Banner */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-sm relative min-h-[260px] flex flex-col justify-end p-6 group">
          <img
            src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80"
            alt="Padma Bridge Shariatpur Landmark"
            className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
              <Sparkles size={12} />
              <span>পদ্মা সেতু সংলগ্ন সম্ভাবনাময় জেলা</span>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black text-white leading-tight">
              স্মার্ট শরীয়তপুর: সমন্বিত নাগরিক তথ্য ও জরুরি নাগরিক সেবা বাতায়ন
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
              শরীয়তপুর জেলা প্রশাসন ও থানা উপজেলাসমূহের জরুরি পুলিশ, হাসপাতাল, ফায়ার সার্ভিস, স্বেচ্ছাসেবী রক্তদাতা এবং স্থানীয় পরিবহন ও আইনি সাহায্য কেন্দ্রের সরাসরি যোগাযোগ ডিরেক্টরি।
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={onOpenMedicalDirectory}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors shadow-sm cursor-pointer"
              >
                <span>🏥</span>
                <span>শরীয়তপুর মেডিকেল ডিরেক্টরি</span>
              </button>
              <button
                onClick={() => onSelectCategory('hotlines')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-colors shadow-sm cursor-pointer"
              >
                <Phone size={14} />
                <span>২৪/৭ জরুরি হটলাইন (৯৯৯)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Key District At A Glance Stats Box */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006A4E] flex items-center justify-center font-bold">
                🏛️
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-black text-slate-800 text-sm md:text-base">
                    এক নজরে শরীয়তপুর জেলা
                  </h3>
                </div>
                <p className="text-[10px] text-slate-400 font-bold">District Profile & Infrastructure</p>
              </div>
            </div>
            <button
              onClick={() => openDistrictModal('upazilas')}
              className="text-[10px] font-extrabold bg-emerald-600 hover:bg-[#006A4E] text-white px-3 py-1 rounded-full transition-all cursor-pointer border border-emerald-700 active:scale-95 flex items-center gap-1 shadow-xs"
              title="বিস্তারিত জেলা তথ্যকোষ খুলুন"
            >
              <span>বিস্তারিত সংক্ষেপ ➔</span>
            </button>
          </div>

          {/* Interactive instruction banner */}
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 bg-emerald-50/90 px-3 py-1.5 rounded-xl border border-emerald-200/80">
            <span className="flex items-center gap-1.5 text-[#006A4E] font-black">
              <span className="text-xs inline-block animate-bounce">👆</span>
              <span>বিস্তারিত দেখতে কার্ডের ওপর ক্লিক করুন:</span>
            </span>
            <span className="text-[9px] text-emerald-800 font-black bg-white px-2 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
              ক্লিকযোগ্য
            </span>
          </div>

          {/* Stat Grid (All cards clickable with visible action badges) */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => openDistrictModal('area')}
              className="p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 hover:from-emerald-50 hover:to-emerald-100/70 border-2 border-emerald-200/80 hover:border-[#006A4E] transition-all text-left cursor-pointer group active:scale-98 shadow-xs hover:shadow-md relative overflow-hidden"
              title="মোট আয়তন ও নদী সংক্রান্ত বিস্তারিত দেখুন"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="block text-[10px] md:text-[11px] font-extrabold text-slate-500 group-hover:text-emerald-900 uppercase tracking-tight">
                  মোট আয়তন
                </span>
                <span className="inline-flex items-center gap-0.5 text-[9px] md:text-[10px] font-black bg-emerald-600 text-white group-hover:bg-[#006A4E] px-2 py-0.5 rounded-full shadow-2xs transition-all shrink-0">
                  <span>ক্লিক করুন</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
                </span>
              </div>
              <span className="text-sm font-black text-[#006A4E] group-hover:scale-102 inline-block transition-transform mt-0.5">
                ১,১৮১.৫৩ বর্গ কিমি
              </span>
            </button>

            <button
              onClick={() => openDistrictModal('upazilas')}
              className="p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 hover:from-emerald-50 hover:to-emerald-100/70 border-2 border-emerald-200/80 hover:border-[#006A4E] transition-all text-left cursor-pointer group active:scale-98 shadow-xs hover:shadow-md relative overflow-hidden"
              title="৬টি উপজেলার সম্পূর্ণ তালিকা ও বিবরণ দেখুন"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="block text-[10px] md:text-[11px] font-extrabold text-slate-500 group-hover:text-emerald-900 uppercase tracking-tight">
                  উপজেলা সংখ্যা
                </span>
                <span className="inline-flex items-center gap-0.5 text-[9px] md:text-[10px] font-black bg-emerald-600 text-white group-hover:bg-[#006A4E] px-2 py-0.5 rounded-full shadow-2xs transition-all shrink-0">
                  <span>ক্লিক করুন</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
                </span>
              </div>
              <span className="text-sm font-black text-[#006A4E] group-hover:scale-102 inline-block transition-transform mt-0.5">
                ৬ টি উপজেলা
              </span>
            </button>

            <button
              onClick={() => openDistrictModal('unions')}
              className="p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 hover:from-emerald-50 hover:to-emerald-100/70 border-2 border-emerald-200/80 hover:border-[#006A4E] transition-all text-left cursor-pointer group active:scale-98 shadow-xs hover:shadow-md relative overflow-hidden"
              title="৬টি পৌরসভা ও ৬৫টি ইউনিয়নের তালিকা দেখুন"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="block text-[10px] md:text-[11px] font-extrabold text-slate-500 group-hover:text-emerald-900 uppercase tracking-tight">
                  পৌরসভা ও ইউনিয়ন
                </span>
                <span className="inline-flex items-center gap-0.5 text-[9px] md:text-[10px] font-black bg-emerald-600 text-white group-hover:bg-[#006A4E] px-2 py-0.5 rounded-full shadow-2xs transition-all shrink-0">
                  <span>ক্লিক করুন</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
                </span>
              </div>
              <span className="text-sm font-black text-[#006A4E] group-hover:scale-102 inline-block transition-transform mt-0.5">
                ৬ পৌরসভা / ৬৫ ইউনিয়ন
              </span>
            </button>

            <button
              onClick={() => openDistrictModal('population')}
              className="p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 hover:from-emerald-50 hover:to-emerald-100/70 border-2 border-emerald-200/80 hover:border-[#006A4E] transition-all text-left cursor-pointer group active:scale-98 shadow-xs hover:shadow-md relative overflow-hidden"
              title="জনসংখ্যা ও ডেমোগ্রাফি হিসাব দেখুন"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="block text-[10px] md:text-[11px] font-extrabold text-slate-500 group-hover:text-emerald-900 uppercase tracking-tight">
                  মোট জনসংখ্যা
                </span>
                <span className="inline-flex items-center gap-0.5 text-[9px] md:text-[10px] font-black bg-emerald-600 text-white group-hover:bg-[#006A4E] px-2 py-0.5 rounded-full shadow-2xs transition-all shrink-0">
                  <span>ক্লিক করুন</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
                </span>
              </div>
              <span className="text-sm font-black text-[#006A4E] group-hover:scale-102 inline-block transition-transform mt-0.5">
                ১২,০২,০০০+ জন
              </span>
            </button>
          </div>

          <button
            onClick={() => openDistrictModal('area')}
            className="w-full p-3 rounded-2xl bg-amber-50 hover:bg-amber-100/90 border-2 border-amber-300 text-xs font-bold text-amber-900 flex items-center justify-between gap-2 transition-all cursor-pointer group active:scale-98 text-left shadow-2xs hover:shadow-xs"
            title="পদ্মা সেতু জাজিরা পয়েন্ট সম্পর্কিত তথ্য দেখুন"
          >
            <div className="flex items-center gap-2">
              <Info size={16} className="text-amber-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>পদ্মা সেতুর জাজিরা পয়েন্ট শরীয়তপুর জেলায় অবস্থিত।</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-900 bg-amber-200/90 group-hover:bg-amber-300 px-2.5 py-1 rounded-full border border-amber-400 shrink-0 shadow-2xs">
              <span>বিস্তারিত ➔</span>
            </span>
          </button>
        </div>
      </div>

      {/* 3. Official Leadership Grid (জেলা প্রশাসনের প্রধান কর্মকর্তাবৃন্দ) */}
      <section className="bg-white rounded-3xl border-2 border-slate-200 p-5 md:p-6 shadow-xs relative overflow-hidden">
        {/* Top bar accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#006A4E]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BadgeIcon className="w-4 h-4 text-[#006A4E]" />
              <span className="text-[10px] font-black text-[#006A4E] uppercase tracking-widest font-mono">
                OFFICERS DIRECTORY • SHARIATPUR.GOV.BD
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-display font-black text-slate-800 mt-0.5">
              জেলা প্রশাসনের প্রধান কর্মকর্তাবৃন্দ
            </h2>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">
              জেলা প্রশাসক, এডিসি, ইউএনও, ম্যাজিস্ট্রেট ও দপ্তর প্রধানদের সরাসরি যোগাযোগের তালিকা
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Box */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={officerSearch}
                onChange={(e) => setOfficerSearch(e.target.value)}
                placeholder="কর্মকর্তার নাম / পদবী / রুম খুঁজুন..."
                className="pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 text-xs w-full sm:w-56 focus:outline-none focus:border-[#006A4E] bg-slate-50 focus:bg-white transition-colors"
              />
              {officerSearch && (
                <button
                  onClick={() => setOfficerSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => onSelectCategory('gov_offices')}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-black text-[#006A4E] hover:text-[#005740] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>সকল দপ্তর</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="mb-5 bg-slate-100 p-1.5 rounded-2xl overflow-hidden">
          <HorizontalSliderBar bgFadeColor="from-slate-100">
            {[
              { id: 'all', label: `সকল কর্মকর্তা (${OFFICIAL_LEADERS.length})` },
              { id: 'dc_adc', label: 'জেলা প্রশাসক ও এডিসিগণ' },
              { id: 'uno', label: 'উপজেলা নির্বাহী অফিসার (UNO)' },
              { id: 'magistrate', label: 'এনডিসি ও অন্যান্য কর্মকর্তা' },
              { id: 'police_health', label: 'পুলিশ ও স্বাস্থ্য প্রধান' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveOfficerTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                  activeOfficerTab === tab.id
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </HorizontalSliderBar>
        </div>

        {/* Grid of Officials */}
        {filteredOfficials.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-bold text-xs">কোনো কর্মকর্তার তথ্য পাওয়া যায়নি।</p>
            <button
              onClick={() => {
                setOfficerSearch('');
                setActiveOfficerTab('all');
              }}
              className="mt-2 text-xs font-bold text-[#006A4E] underline cursor-pointer"
            >
              সকল কর্মকর্তা দেখুন
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedOfficials.map((leader) => (
                <div
                  key={leader.id}
                  className="rounded-2xl border-2 border-slate-200 p-4 bg-slate-50/50 hover:bg-white hover:border-[#006A4E] transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-md group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="relative">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-mono font-black text-[#006A4E] bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
                          № {leader.serial}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${leader.badgeBg}`}>
                          {leader.badge}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display font-black text-slate-800 text-sm leading-tight">
                      {leader.title}
                    </h3>
                    <p className="text-[12px] font-extrabold text-[#006A4E] mt-0.5 mb-1">
                      {leader.name}
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 mb-1 leading-snug">
                      {leader.office}
                    </p>
                    {leader.roomNo && (
                      <span className="inline-block text-[9px] font-mono font-bold bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded mb-3">
                        📍 {leader.roomNo}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 pt-2.5 border-t border-slate-200/80">
                    <div className="grid grid-cols-2 gap-1.5">
                      <a
                        href={`tel:${leader.phone}`}
                        className="inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 hover:text-[#006A4E] font-mono font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        <Phone size={11} className="text-[#006A4E]" />
                        <span>কল দিন</span>
                      </a>
                      <a
                        href={`mailto:${leader.email}`}
                        className="inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-800 hover:text-blue-700 font-mono font-bold text-[11px] transition-colors cursor-pointer"
                        title={leader.email}
                      >
                        <Mail size={11} className="text-blue-600" />
                        <span>ইমেইল</span>
                      </a>
                    </div>

                    <button
                      onClick={() => setSelectedOfficial(leader)}
                      className="w-full inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-[#006A4E] text-[#006A4E] hover:text-white font-bold text-xs transition-colors cursor-pointer border border-emerald-200"
                    >
                      <Info size={13} />
                      <span>প্রোফাইল ও বিস্তারিত</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle Expand / Collapse Button */}
            {!officerSearch.trim() && activeOfficerTab === 'all' && (
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center justify-center gap-2">
                <button
                  onClick={() => setIsOfficersExpanded(!isOfficersExpanded)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-50 hover:bg-[#006A4E] text-[#006A4E] hover:text-white font-extrabold text-xs md:text-sm border-2 border-emerald-200 hover:border-[#006A4E] shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  {isOfficersExpanded ? (
                    <>
                      <span>কমিয়ে দেখুন (সংক্ষিপ্ত করুন)</span>
                      <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  ) : (
                    <>
                      <span>সকল ২১ জন কর্মকর্তা দেখুন (আরও ১৭ জন)</span>
                      <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform animate-bounce" />
                    </>
                  )}
                </button>
                <p className="text-[11px] font-bold text-slate-500 font-mono">
                  {isOfficersExpanded ? 'মোট ২১ জন কর্মকর্তার সম্পূর্ণ তালিকা দৃশ্যমান' : 'প্রদর্শিত: ১ - ৪ এন্ট্রি • মোট: ২১ এন্ট্রি'}
                </p>
              </div>
            )}
          </>
        )}
      </section>

      {/* 5. District Administrative Notice Board (জেলা নোটিশ বোর্ড) */}
      <section className="bg-white rounded-3xl border-2 border-slate-200 p-5 md:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-amber-500 animate-bounce" />
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest font-mono">
                DISTRICT OFFICIAL NOTICE BOARD
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-display font-black text-slate-800 mt-0.5">
              জেলা প্রশাসকের নোটিশ বোর্ড ও বিজ্ঞপ্তি
            </h2>
          </div>

          {/* Notice Category Tabs */}
          <div className="bg-slate-100 p-1 rounded-2xl overflow-hidden">
            <HorizontalSliderBar bgFadeColor="from-slate-100">
              {[
                { id: 'all', label: 'সকল' },
                { id: 'general', label: 'সাধারণ' },
                { id: 'recruitment', label: 'নিয়োগ' },
                { id: 'tender', label: 'দরপত্র' },
                { id: 'disaster', label: 'দুর্যোগ' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveNoticeTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                    activeNoticeTab === tab.id
                      ? 'bg-[#006A4E] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </HorizontalSliderBar>
          </div>
        </div>

        {/* Notice List */}
        <div className="space-y-3">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-[#006A4E] font-bold text-xs flex-shrink-0 mt-0.5">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-black bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                      {notice.categoryLabel}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {notice.date}
                    </span>
                    {notice.isNew && (
                      <span className="text-[9px] font-black bg-rose-600 text-white px-1.5 py-0.2 rounded-md animate-pulse">
                        নতুন
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans font-bold text-xs md:text-sm text-slate-800 group-hover:text-[#006A4E] transition-colors leading-snug">
                    {notice.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {notice.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006A4E] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 group-hover:bg-[#006A4E] group-hover:text-white transition-colors">
                  <Eye size={13} />
                  <span>বিস্তারিত পড়ুন</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Shariatpur Heritage & District Landmarks Section (শরীয়তপুরের ঐতিহ্য ও দর্শনীয় স্থান) */}
      <section className="bg-white rounded-3xl border-2 border-slate-200 p-5 md:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#006A4E]" />
              <span className="text-[10px] font-black text-[#006A4E] uppercase tracking-widest font-mono">
                DISTRICT HERITAGE & TOURISM
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-display font-black text-slate-800 mt-0.5">
              শরীয়তপুর জেলার দর্শনীয় ও ঐতিহ্যবাহী স্থান
            </h2>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">
              পদ্মা সেতু, রুদ্রকর মঠ ও ইতিহাস বিজড়িত স্থানসমূহ।
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('hotels_tourism')}
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#006A4E] hover:text-[#005740] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>হোটেল ও ট্যুরিজম ক্যাটাগরি</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DISTRICT_LANDMARKS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border-2 border-slate-200 overflow-hidden bg-slate-50 hover:border-[#006A4E] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-black bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-md border border-white/20">
                    {item.tag}
                  </span>
                </div>

                <div className="p-3.5">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#006A4E] mb-1">
                    <MapPin size={11} />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-sans font-black text-xs md:text-sm text-slate-800 leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notice Detail Modal */}
      {selectedNotice && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-lg w-full border-2 border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-black bg-emerald-100 text-[#006A4E] px-2.5 py-1 rounded-lg">
                {selectedNotice.categoryLabel}
              </span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-slate-400 hover:text-rose-600 font-black text-xl px-2"
              >
                ✕
              </button>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Calendar size={12} />
                <span>প্রকাশের তারিখ: {selectedNotice.date}</span>
              </div>
              <h3 className="font-display font-black text-slate-800 text-base leading-snug">
                {selectedNotice.title}
              </h3>
              <p className="text-xs font-bold text-[#006A4E] mt-1">
                {selectedNotice.department}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium leading-relaxed space-y-2">
              <p>
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার, জেলা প্রশাসকের কার্যালয়, শরীয়তপুর কর্তৃক এতদ্বারা সর্বসাধারণের অবগতির জন্য জানানো যাচ্ছে যে, উক্ত বিষয়ে বিস্তারিত তথ্য জেলা ই-সেবা কেন্দ্রে সংরক্ষিত রয়েছে।
              </p>
              <p>
                যে কোনো তথ্যের জন্য জেলা হটলাইন অথবা ৩ ৩৩ নম্বরে যোগাযোগ করুন।
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Official Detail Modal */}
      {selectedOfficial && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full border-2 border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedOfficial.image}
                  alt={selectedOfficial.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#006A4E] shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${selectedOfficial.badgeBg}`}>
                    {selectedOfficial.badge}
                  </span>
                  <h3 className="font-display font-black text-slate-800 text-sm md:text-base mt-1">
                    {selectedOfficial.name}
                  </h3>
                  <p className="text-xs font-bold text-[#006A4E]">
                    {selectedOfficial.designation}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOfficial(null)}
                className="text-slate-400 hover:text-rose-600 font-black text-xl px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Building2 size={14} className="text-[#006A4E] flex-shrink-0" />
                  <span>{selectedOfficial.office}</span>
                </div>
                {selectedOfficial.roomNo && (
                  <div className="flex items-center gap-2 text-slate-600 font-mono font-bold">
                    <MapPin size={14} className="text-[#006A4E] flex-shrink-0" />
                    <span>অবস্থান: {selectedOfficial.roomNo}</span>
                  </div>
                )}
              </div>

              {selectedOfficial.bio && (
                <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-150 text-slate-700 font-medium leading-relaxed">
                  <span className="font-bold text-[#006A4E] block mb-0.5">দায়িত্ব ও পরিচিতি:</span>
                  <p>{selectedOfficial.bio}</p>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${selectedOfficial.phone}`}
                  className="w-full inline-flex items-center justify-between p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>{selectedOfficial.phone}</span>
                  </div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-sans">সরাসরি কল করুন</span>
                </a>

                <a
                  href={`mailto:${selectedOfficial.email}`}
                  className="w-full inline-flex items-center justify-between p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Mail size={14} className="flex-shrink-0" />
                    <span className="truncate">{selectedOfficial.email}</span>
                  </div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-sans flex-shrink-0">ইমেইল করুন</span>
                </a>

                <button
                  onClick={() => copyToClipboard(`${selectedOfficial.name} - ${selectedOfficial.designation}, ফোন: ${selectedOfficial.phone}`)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{copiedPhone ? '✓ তথ্য কপি করা হয়েছে' : '📋 তথ্য কপি করুন'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* District Profile & Infrastructure Details Modal */}
      <DistrictDetailsModal
        isOpen={districtModalOpen}
        onClose={() => setDistrictModalOpen(false)}
        initialTab={districtInitialTab}
      />
    </div>
  );
};

// Helper badge icon
function BadgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}
