import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  Droplet,
  PhoneCall,
  MessageSquare,
  Share2,
  CheckCircle2,
  MapPin,
  Calendar,
  User,
  Heart,
  PlusCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Info,
  Building2,
  Send,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Award
} from 'lucide-react';

interface BloodDonorDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCallContact?: (contact: { name: string; phoneNumber: string }) => void;
}

export interface DonorProfile {
  id: string;
  name: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  phoneNumber: string;
  upazila: string;
  unionOrVillage: string;
  age: number;
  gender: 'পুরুষ' | 'নারী';
  occupation: string;
  lastDonationDate: string; // YYYY-MM-DD
  totalDonations: number;
  isReady: boolean;
  isVerified: boolean;
  isOrganization?: boolean;
  organizationName?: string;
  details?: string;
}

const BLOOD_GROUPS = ['ALL', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as const;

const UPAZILAS = [
  { id: 'ALL', name: 'সকল উপজেলা' },
  { id: 'Sadar', name: 'শরীয়তপুর সদর' },
  { id: 'Naria', name: 'নড়িয়া' },
  { id: 'Zajira', name: 'জাজিরা' },
  { id: 'Damudya', name: 'ডামুড্যা' },
  { id: 'Bhedarganj', name: 'ভেদরগঞ্জ' },
  { id: 'Gosairhat', name: 'গোসাইরহাট' }
];

// Rich Realistic Dummy Donors Database for Shariatpur
const DUMMY_DONORS: DonorProfile[] = [
  {
    id: 'bd1',
    name: 'শরীয়তপুর ব্লাড ব্যাংক ভলান্টিয়ার নেটওয়ার্ক',
    bloodGroup: 'O+',
    phoneNumber: '01711223399',
    upazila: 'Sadar',
    unionOrVillage: 'সদর হাসপাতাল রোড, পালং',
    age: 28,
    gender: 'পুরুষ',
    occupation: 'স্বেচ্ছাসেবী সংগঠন',
    lastDonationDate: '2026-02-10',
    totalDonations: 45,
    isReady: true,
    isVerified: true,
    isOrganization: true,
    organizationName: 'শরীয়তপুর ব্লাড ব্যাংক',
    details: '২০০+ নিবন্ধিত রক্তদাতা ভলান্টিয়ার সমন্বয়ক নেটওয়ার্ক। সকল জরুরি রক্তের জন্য ২৪ ঘন্টা সচল।'
  },
  {
    id: 'bd2',
    name: 'তানভীর আহমেদ রিফাত',
    bloodGroup: 'A+',
    phoneNumber: '01712345678',
    upazila: 'Sadar',
    unionOrVillage: 'আঙ্গaria, শরীয়তপুর সদর',
    age: 24,
    gender: 'পুরুষ',
    occupation: 'শিক্ষার্থী (শরীয়তপুর সরকারি কলেজ)',
    lastDonationDate: '2025-11-15',
    totalDonations: 7,
    isReady: true,
    isVerified: true,
    details: 'বাঁধন শরীয়তপুর সরকারি কলেজ ইউনিটের নিয়মিত রক্তদাতা।'
  },
  {
    id: 'bd3',
    name: 'মোছাঃ সাবরিনা ইয়াসমিন',
    bloodGroup: 'O+',
    phoneNumber: '01823456789',
    upazila: 'Naria',
    unionOrVillage: 'মাইজপাড়া, নড়িয়া',
    age: 26,
    gender: 'নারী',
    occupation: 'শিক্ষিকা',
    lastDonationDate: '2025-10-20',
    totalDonations: 5,
    isReady: true,
    isVerified: true,
    details: 'জরুরি পরিস্থিতিতে শুধুমাত্র মহিলা ও শিশুর জন্য রক্তদানে প্রস্তুত।'
  },
  {
    id: 'bd4',
    name: 'কাজী আরিফুল ইসলাম',
    bloodGroup: 'O+',
    phoneNumber: '01755123456',
    upazila: 'Bhedarganj',
    unionOrVillage: 'ভেদরগঞ্জ বাজার',
    age: 29,
    gender: 'পুরুষ',
    occupation: 'ব্যবসায়ী',
    lastDonationDate: '2026-01-05',
    totalDonations: 12,
    isReady: true,
    isVerified: true,
    details: 'ভেদরগঞ্জ ব্লাড ডোনার ক্লাব সদস্য। O+ রক্তদাতা।'
  },
  {
    id: 'bd5',
    name: 'সিদ্দিকুর রহমান (রেয়ার ব্লাড ডোনার)',
    bloodGroup: 'A-',
    phoneNumber: '01688112233',
    upazila: 'Gosairhat',
    unionOrVillage: 'গোসাইরহাট পৌরসভা',
    age: 31,
    gender: 'পুরুষ',
    occupation: 'সমাজসেবক',
    lastDonationDate: '2025-09-10',
    totalDonations: 9,
    isReady: true,
    isVerified: true,
    details: 'A- (এ নেগেটিভ) দুর্লভ রক্তের গ্রুপে নিবন্ধিত রেয়ার ডোনার।'
  },
  {
    id: 'bd6',
    name: 'মেহেদী হাসান শুভ',
    bloodGroup: 'B+',
    phoneNumber: '01912987654',
    upazila: 'Zajira',
    unionOrVillage: 'জাজিরা পয়েন্ট, নাওডোবা',
    age: 23,
    gender: 'পুরুষ',
    occupation: 'ফ্রি ডাইভার ও সমাজকর্মী',
    lastDonationDate: '2026-02-01',
    totalDonations: 4,
    isReady: true,
    isVerified: true,
    details: 'পদ্মা সেতু সংলগ্ন জাজিরা ও নাওডোবা এলাকায় সরাসরি যাতায়াত সহজ।'
  },
  {
    id: 'bd7',
    name: 'নড়িয়া ব্লাড ডোনার্স ক্লাব ডেসক',
    bloodGroup: 'B+',
    phoneNumber: '01911445566',
    upazila: 'Naria',
    unionOrVillage: 'নড়িয়া পৌরসভা মোড়',
    age: 30,
    gender: 'পুরুষ',
    occupation: 'সংগঠন ডেসক',
    lastDonationDate: '2026-02-18',
    totalDonations: 30,
    isReady: true,
    isVerified: true,
    isOrganization: true,
    organizationName: 'নড়িয়া ব্লাড ক্লাব',
    details: 'নড়িয়া ও মজিদ জরিনা ফাউণ্ডেশন সংলগ্ন জরুরি রক্তের তথ্য সহায়ক।'
  },
  {
    id: 'bd8',
    name: 'ডামুড্যা রেড ক্রিসেন্ট ব্লাড উইং',
    bloodGroup: 'AB+',
    phoneNumber: '01733889900',
    upazila: 'Damudya',
    unionOrVillage: 'ডামুড্যা বাসস্ট্যান্ড',
    age: 27,
    gender: 'পুরুষ',
    occupation: 'রেড ক্রিসেন্ট টিম',
    lastDonationDate: '2026-01-20',
    totalDonations: 22,
    isReady: true,
    isVerified: true,
    isOrganization: true,
    organizationName: 'রেড ক্রিসেন্ট ডামুড্যা',
    details: 'ডামুড্যা ও পূর্ব শরীয়তপুর অঞ্চলের ব্লাড রেসপন্স টিম।'
  },
  {
    id: 'bd9',
    name: 'শাহাদাত হোসেন বাপ্পী',
    bloodGroup: 'O-',
    phoneNumber: '01511223344',
    upazila: 'Sadar',
    unionOrVillage: 'ধানুকা মানসার, শরীয়তপুর',
    age: 27,
    gender: 'পুরুষ',
    occupation: 'কম্পিউটার প্রকৌশলী',
    lastDonationDate: '2025-08-12',
    totalDonations: 8,
    isReady: true,
    isVerified: true,
    details: 'O- (ও নেগেটিভ) ইউনিভার্সাল ডোনার। সব গ্রুপের জরুরি রোগীকে রক্ত প্রদান সম্ভব।'
  },
  {
    id: 'bd10',
    name: 'জাহিদুল ইসলাম রনি',
    bloodGroup: 'AB-',
    phoneNumber: '01811556677',
    upazila: 'Zajira',
    unionOrVillage: 'জাজিরা কলেজ মোড়',
    age: 25,
    gender: 'পুরুষ',
    occupation: 'বিশ্ববিদ্যালয় শিক্ষার্থী',
    lastDonationDate: '2025-10-01',
    totalDonations: 6,
    isReady: true,
    isVerified: true,
    details: 'AB- (এবি নেগেটিভ) অত্যন্ত বিরল রক্তের গ্রুপ।'
  },
  {
    id: 'bd11',
    name: 'মারুফ আহমেদ সুমন',
    bloodGroup: 'B-',
    phoneNumber: '01788990011',
    upazila: 'Damudya',
    unionOrVillage: 'কনেশ্বর, ডামুড্যা',
    age: 28,
    gender: 'পুরুষ',
    occupation: 'ফার্মাসিস্ট',
    lastDonationDate: '2025-11-28',
    totalDonations: 10,
    isReady: true,
    isVerified: true,
    details: 'B- (বি নেগেটিভ) গ্রুপের নিবন্ধিত নিয়মিত রক্তদাতা।'
  },
  {
    id: 'bd12',
    name: 'সুলতানা রাজিয়া',
    bloodGroup: 'A+',
    phoneNumber: '01933445566',
    upazila: 'Bhedarganj',
    unionOrVillage: 'সখিপুর, ভেদরগঞ্জ',
    age: 22,
    gender: 'নারী',
    occupation: 'শিক্ষার্থী',
    lastDonationDate: '2026-02-15',
    totalDonations: 3,
    isReady: false,
    isVerified: true,
    details: 'সাম্প্রতিক রক্তদান সম্পন্ন হয়েছে। মার্চ ২০২৬ এর পর পুনরায় প্রস্তুত হবেন।'
  }
];

export const BloodDonorDirectoryModal: React.FC<BloodDonorDirectoryModalProps> = ({
  isOpen,
  onClose,
  onCallContact
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyReady, setOnlyReady] = useState(false);
  const [showCompatibilityChart, setShowCompatibilityChart] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Blood Request Form State
  const [requestData, setRequestData] = useState({
    patientName: '',
    bloodGroup: 'O+',
    bags: '1',
    hospitalName: 'শরীয়তপুর জেলা সদর হাসপাতাল',
    contactPhone: '',
    dateNeeded: '',
    details: ''
  });
  const [copiedRequestText, setCopiedRequestText] = useState(false);

  if (!isOpen) return null;

  // Filter Donors
  const filteredDonors = DUMMY_DONORS.filter(donor => {
    const matchesGroup = selectedGroup === 'ALL' || donor.bloodGroup === selectedGroup;
    const matchesUpazila = selectedUpazila === 'ALL' || donor.upazila === selectedUpazila;
    const matchesReady = !onlyReady || donor.isReady;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      donor.name.toLowerCase().includes(query) ||
      donor.bloodGroup.toLowerCase().includes(query) ||
      donor.phoneNumber.includes(query) ||
      donor.unionOrVillage.toLowerCase().includes(query) ||
      donor.upazila.toLowerCase().includes(query) ||
      (donor.details && donor.details.toLowerCase().includes(query));

    return matchesGroup && matchesUpazila && matchesReady && matchesSearch;
  });

  // Calculate stats
  const totalDonors = DUMMY_DONORS.length;
  const readyDonors = DUMMY_DONORS.filter(d => d.isReady).length;

  const handleCopyRequest = () => {
    const text = `🚨 *জরুরি রক্তের প্রয়োজন (শরীয়তপুর ই-রক্তসেবা)* 🚨\n\n` +
      `🩸 *রক্তের গ্রুপ:* ${requestData.bloodGroup}\n` +
      `👤 *রোগীর নাম:* ${requestData.patientName || 'উল্লেখিত নয়'}\n` +
      `📦 *পরিমাণ:* ${requestData.bags} ব্যাগ\n` +
      `🏥 *হাসপাতাল/স্থান:* ${requestData.hospitalName}\n` +
      `📅 *রক্তদানের সময়:* ${requestData.dateNeeded || 'জরুরি'}\n` +
      `📞 *যোগাযোগের নম্বর:* ${requestData.contactPhone}\n` +
      `${requestData.details ? `📝 *বিবরণ:* ${requestData.details}\n` : ''}\n` +
      `প্রচারে: শরীয়তপুর জেলা প্রশাসন পোর্টাল ও ডিজিটাল ব্লাড ডিরেক্টরি।`;

    navigator.clipboard.writeText(text);
    setCopiedRequestText(true);
    setTimeout(() => setCopiedRequestText(false), 3000);
  };

  const getWhatsAppLink = (phone: string, name: string, group: string) => {
    const formattedPhone = phone.startsWith('0') ? '88' + phone : phone;
    const message = encodeURIComponent(`সালামু আলাইকুম ${name} ভাই, শরীয়তপুর ডিজিটাল ব্লাড ডিরেক্টরি থেকে যোগাযোগ করছি। আপনার ${group} রক্তের গ্রুপ সম্বন্ধে জানতে চাচ্ছিলাম...`);
    return `https://wa.me/${formattedPhone}?text=${message}`;
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-4 md:p-6 overflow-hidden bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-5xl bg-white border-2 border-rose-600/30 sm:rounded-3xl rounded-2xl shadow-2xl overflow-hidden my-auto h-[96vh] sm:h-auto sm:max-h-[90vh] flex flex-col"
        >
          {/* Top Banner - Responsive Modern Crimson Theme */}
          <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-red-900 text-white p-2.5 sm:p-5 md:p-6 relative border-b-2 sm:border-b-4 border-amber-400 flex-shrink-0">
            <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
              <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-black text-rose-100 border border-white/20 truncate">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rose-400 animate-ping flex-shrink-0" />
                <span className="truncate">২৪/৭ শরীয়তপুর জরুরি রক্তদাতা ও ব্লাড ব্যাংক</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-rose-100 bg-rose-950/40 px-2 py-0.5 rounded-lg border border-rose-700/50">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>নিবন্ধিত: {totalDonors} | প্রস্তুত: {readyDonors}</span>
                </span>
                <button
                  onClick={onClose}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 flex-shrink-0"
                  title="বন্ধ করুন"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-2">
              <div>
                <h2 className="text-sm sm:text-2xl md:text-3xl font-black font-sans tracking-tight flex items-center gap-1.5 text-white">
                  <span className="p-1 sm:p-2 bg-white/10 rounded-lg sm:rounded-xl border border-white/20 text-xs sm:text-xl">🩸</span>
                  <span className="truncate">শরীয়তপুর ই-রক্তসেবা বাতায়ন</span>
                </h2>
                <p className="text-rose-100 text-xs md:text-sm font-semibold mt-1 max-w-2xl leading-relaxed hidden sm:block">
                  রক্তের গ্রুপ অনুযায়ী রক্তদাতা ও স্বেচ্ছাসেবী ক্লাবের সাথে সরাসরি যোগাযোগ করুন।
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="px-2.5 py-1 sm:px-4 sm:py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg sm:rounded-xl font-black text-[10px] sm:text-xs transition-all shadow-md flex items-center gap-1 cursor-pointer active:scale-95 border border-amber-300"
                >
                  <PlusCircle size={13} className="sm:w-4 sm:h-4" />
                  <span>জরুরি আবেদন</span>
                </button>

                <button
                  onClick={() => setShowCompatibilityChart(!showCompatibilityChart)}
                  className="px-2 py-1 sm:px-3.5 sm:py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs transition-all flex items-center gap-1 cursor-pointer border border-white/20"
                >
                  <Info size={13} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">মিল চার্ট</span>
                </button>
              </div>
            </div>

            {/* Donor Stats Quick Badges - Visible on mobile inline */}
            <div className="mt-1.5 pt-1.5 sm:mt-2.5 sm:pt-2 border-t border-rose-700/60 flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold text-rose-100 flex-wrap">
              <span className="flex items-center gap-1 bg-rose-950/40 px-2 py-0.5 rounded-md sm:rounded-lg border border-rose-700/50">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>নিবন্ধিত: <strong className="text-white">{totalDonors} জন</strong></span>
              </span>
              <span className="flex items-center gap-1 bg-rose-950/40 px-2 py-0.5 rounded-md sm:rounded-lg border border-rose-700/50">
                <Clock size={12} className="text-amber-300" />
                <span>প্রস্তুত: <strong className="text-emerald-300">{readyDonors} জন</strong></span>
              </span>
            </div>
          </div>

          {/* Blood Compatibility Guide Popover */}
          <AnimatePresence>
            {showCompatibilityChart && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-amber-50 border-b border-amber-200 p-4 text-xs font-semibold text-slate-800 overflow-hidden flex-shrink-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-black text-amber-900 flex items-center gap-1.5 text-sm">
                    <Sparkles size={16} className="text-amber-600" />
                    <span>রক্তের গ্রুপের আদান-প্রদান নির্দেশিকা (Blood Compatibility Guide)</span>
                  </h4>
                  <button onClick={() => setShowCompatibilityChart(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]">
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                    <span className="font-extrabold text-rose-700 block">O- (ও নেগেটিভ)</span>
                    <p className="text-slate-600 text-[10px]">সার্বজনীন দাতা (Universal Donor) - সকলকে রক্ত দিতে পারে।</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                    <span className="font-extrabold text-rose-700 block">AB+ (এবি পজিটিভ)</span>
                    <p className="text-slate-600 text-[10px]">সার্বজনীন গ্রহীতা (Universal Recipient) - সবার থেকে নিতে পারে।</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                    <span className="font-extrabold text-rose-700 block">A+ / B+ / O+</span>
                    <p className="text-slate-600 text-[10px]">পজিটিভ গ্রহীতারা সমগোত্রীয় বা ও-নেগেটিভ/পজিটিভ নিতে পারেন।</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                    <span className="font-extrabold text-rose-700 block">নেগেটিভ গ্রুপসমূহ</span>
                    <p className="text-slate-600 text-[10px]">নেগেটিভ রোগীরা শুধুমাত্র নেগেটিভ রক্তগ্রহণ করতে পারবেন।</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls Bar: Group Selector Pills + Upazila & Search */}
          <div className="bg-slate-100 border-b border-slate-200 p-2 sm:p-4 space-y-1.5 sm:space-y-3 flex-shrink-0">
            {/* Blood Group Selector Buttons */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-0.5 sm:mb-1">
                রক্তের গ্রুপ বাছাই করুন (Select Blood Group):
              </span>
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                {BLOOD_GROUPS.map((group) => {
                  const count = group === 'ALL' 
                    ? DUMMY_DONORS.length 
                    : DUMMY_DONORS.filter(d => d.bloodGroup === group).length;

                  const isSelected = selectedGroup === group;

                  return (
                    <button
                      key={group}
                      onClick={() => setSelectedGroup(group)}
                      className={`px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 shadow-2xs ${
                        isSelected
                          ? 'bg-rose-700 text-white shadow-rose-200 ring-2 ring-rose-600'
                          : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-300'
                      }`}
                    >
                      <span>{group === 'ALL' ? '🩸 সকল গ্রুপ' : group}</span>
                      <span className={`text-[9px] sm:text-[10px] px-1 py-0.1 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upazila Filter & Search Input */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="নাম, ফোন বা এলাকা (পালং, নড়িয়া, A+)..."
                  className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs font-semibold rounded-lg sm:rounded-xl py-1.5 sm:py-2 pl-7 pr-6 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Search className="absolute left-2 top-2 sm:top-2.5 text-slate-400" size={13} />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1.5 sm:top-2 text-slate-400 hover:text-slate-600">
                    <X size={13} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <select
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  className="bg-white text-slate-800 text-xs font-bold rounded-lg sm:rounded-xl py-1.5 sm:py-2 px-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer flex-1 sm:w-auto"
                >
                  {UPAZILAS.map((upazila) => (
                    <option key={upazila.id} value={upazila.id}>
                      {upazila.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setOnlyReady(!onlyReady)}
                  className={`px-2 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1 ${
                    onlyReady
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 size={12} className={onlyReady ? 'text-white' : 'text-emerald-600'} />
                  <span>প্রস্তুত ({readyDonors})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Donors Main Grid */}
          <div className="p-2.5 sm:p-5 md:p-6 overflow-y-auto space-y-3 flex-1 min-h-0 bg-slate-50">
            {filteredDonors.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200 p-6">
                <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                  🩸
                </div>
                <h3 className="font-extrabold text-slate-800 text-sm">কোনো রক্তদাতা পাওয়া যায়নি</h3>
                <p className="text-slate-500 text-xs mt-1">অন্য কোনো গ্রুপ বা এলাকা নির্বাচন করে পুনরায় চেষ্টা করুন।</p>
                <button
                  onClick={() => {
                    setSelectedGroup('ALL');
                    setSelectedUpazila('ALL');
                    setSearchQuery('');
                    setOnlyReady(false);
                  }}
                  className="mt-4 px-4 py-2 bg-rose-700 text-white rounded-xl text-xs font-bold"
                >
                  সকল ফিল্টার রিসেট করুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                {filteredDonors.map((donor) => {
                  const isOrg = donor.isOrganization;

                  return (
                    <div
                      key={donor.id}
                      className={`bg-white border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-200 hover:shadow-lg flex flex-col justify-between group relative overflow-hidden ${
                        isOrg
                          ? 'border-indigo-300 bg-gradient-to-b from-indigo-50/40 to-white'
                          : 'border-slate-200 hover:border-rose-400'
                      }`}
                    >
                      {/* Top Accent Strip */}
                      <div className={`absolute top-0 left-0 right-0 h-1 sm:h-1.5 ${
                        isOrg ? 'bg-indigo-600' : 'bg-rose-600'
                      }`} />

                      <div>
                        {/* Header with Blood Group Badge */}
                        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                          <div className="flex items-center gap-2.5">
                            {/* Big Blood Badge */}
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center font-black shadow-inner flex-shrink-0 ${
                              isOrg
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gradient-to-br from-rose-600 to-red-700 text-white shadow-rose-200'
                            }`}>
                              <span className="text-sm sm:text-base leading-none">{donor.bloodGroup}</span>
                              <span className="text-[7px] sm:text-[8px] font-bold tracking-widest opacity-80 uppercase">Group</span>
                            </div>

                            <div>
                              <div className="flex items-center gap-1 flex-wrap">
                                <h3 className="font-black text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-rose-700 transition-colors">
                                  {donor.name}
                                </h3>
                                {donor.isVerified && (
                                  <span className="inline-flex items-center text-emerald-600" title="ভেরিফাইড রক্তদাতা">
                                    <CheckCircle2 size={13} className="fill-emerald-100" />
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-0.5">
                                <span className="flex items-center gap-1">
                                  <MapPin size={11} className="text-rose-500" />
                                  <span>{donor.unionOrVillage}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Donor Attributes Grid */}
                        <div className="bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-slate-800 text-[11px] sm:text-xs space-y-1.5 sm:space-y-2 my-2 sm:my-3 shadow-2xs">
                          <div className="flex items-center justify-between text-slate-700">
                            <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-500">বয়স ও পেশা:</span>
                            <span className="font-black text-slate-900 text-[11px] sm:text-xs">{donor.age} বছর • {donor.occupation}</span>
                          </div>

                          <div className="flex items-center justify-between text-slate-700">
                            <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-500">সর্বশেষ রক্তদান:</span>
                            <span className="font-black text-slate-900 text-[11px] sm:text-xs flex items-center gap-1">
                              <Calendar size={12} className="text-slate-400" />
                              <span>{donor.lastDonationDate}</span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-500">অবস্থা (Availability):</span>
                            {donor.isReady ? (
                              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                <span>রক্তদানে প্রস্তুত</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                                <Clock size={10} />
                                <span>সাময়িক অপেক্ষা</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-slate-700 pt-1.5 border-t border-slate-200">
                            <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-500">মোট রক্তদান:</span>
                            <span className="font-black text-rose-700 text-[11px] sm:text-xs flex items-center gap-1">
                              <Award size={13} className="text-rose-600" />
                              <span>{donor.totalDonations} বার</span>
                            </span>
                          </div>
                        </div>

                        {donor.details && (
                          <p className="text-slate-700 text-[10px] sm:text-[11px] font-bold leading-relaxed my-2 line-clamp-2 italic bg-rose-50/80 p-2 rounded-xl border border-rose-200 text-slate-800">
                            "{donor.details}"
                          </p>
                        )}
                      </div>

                      {/* Action Buttons: Phone & WhatsApp */}
                      <div className="pt-2 sm:pt-3 border-t border-slate-150 flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                        <button
                          onClick={() => {
                            if (onCallContact) {
                              onCallContact({ name: donor.name, phoneNumber: donor.phoneNumber });
                            } else {
                              window.location.href = `tel:${donor.phoneNumber}`;
                            }
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 sm:py-2 px-2.5 sm:px-3 bg-rose-700 hover:bg-rose-800 text-white font-black text-[11px] sm:text-xs rounded-lg sm:rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                          <PhoneCall size={13} />
                          <span>কল করুন</span>
                        </button>

                        <a
                          href={getWhatsAppLink(donor.phoneNumber, donor.name, donor.bloodGroup)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 py-1.5 sm:py-2 px-2.5 sm:px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] sm:text-xs rounded-lg sm:rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                          title="হোয়াটসঅ্যাপে মেসেজ পাঠান"
                        >
                          <MessageSquare size={13} />
                          <span>হোয়াটসঅ্যাপ</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Emergency Blood Request Form Modal Sub-Overlay */}
          <AnimatePresence>
            {showRequestModal && (
              <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-3xl p-5 md:p-6 max-w-lg w-full shadow-2xl border-2 border-rose-600 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4 border-b pb-3 border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🚨</span>
                      <div>
                        <h3 className="font-black text-slate-900 text-base">জরুরি রক্তের চাহিদাপত্র</h3>
                        <p className="text-slate-500 text-xs">জরুরি তথ্যাদি পূরণ করে বিবরণ সোশ্যাল মিডিয়া বা রক্তদাতাদের পাঠান</p>
                      </div>
                    </div>
                    <button onClick={() => setShowRequestModal(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">রোগীর নাম:</label>
                      <input
                        type="text"
                        value={requestData.patientName}
                        onChange={(e) => setRequestData({ ...requestData, patientName: e.target.value })}
                        placeholder="রোগীর নাম লিখুন"
                        className="w-full border rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-rose-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">রক্তের গ্রুপ:</label>
                        <select
                          value={requestData.bloodGroup}
                          onChange={(e) => setRequestData({ ...requestData, bloodGroup: e.target.value })}
                          className="w-full border rounded-xl p-2.5 text-xs font-bold focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                        >
                          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">পরিমাণ (ব্যাগ):</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={requestData.bags}
                          onChange={(e) => setRequestData({ ...requestData, bags: e.target.value })}
                          className="w-full border rounded-xl p-2.5 text-xs font-bold focus:ring-2 focus:ring-rose-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">হাসপাতালের নাম ও স্থান:</label>
                      <input
                        type="text"
                        value={requestData.hospitalName}
                        onChange={(e) => setRequestData({ ...requestData, hospitalName: e.target.value })}
                        placeholder="যেমন: শরীয়তপুর সদর হাসপাতাল"
                        className="w-full border rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-rose-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">যোগাযোগের নম্বর:</label>
                        <input
                          type="text"
                          value={requestData.contactPhone}
                          onChange={(e) => setRequestData({ ...requestData, contactPhone: e.target.value })}
                          placeholder="01712xxxxxx"
                          className="w-full border rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-rose-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">রক্তদানের তারিখ/সময়:</label>
                        <input
                          type="text"
                          value={requestData.dateNeeded}
                          onChange={(e) => setRequestData({ ...requestData, dateNeeded: e.target.value })}
                          placeholder="আজ বিকেল ৪টা"
                          className="w-full border rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-rose-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">অতিরিক্ত বিবরণ (ঐচ্ছিক):</label>
                      <textarea
                        rows={2}
                        value={requestData.details}
                        onChange={(e) => setRequestData({ ...requestData, details: e.target.value })}
                        placeholder="হিমোগ্লোবিন সংখ্যা বা অন্য তথ্য..."
                        className="w-full border rounded-xl p-2 text-xs font-semibold focus:ring-2 focus:ring-rose-500 outline-none"
                      />
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setShowRequestModal(false)}
                        className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl font-bold"
                      >
                        বাতিল
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyRequest}
                        className="px-5 py-2 bg-rose-700 text-white rounded-xl font-black flex items-center gap-1.5 hover:bg-rose-800 transition-colors"
                      >
                        {copiedRequestText ? (
                          <>
                            <Check size={16} />
                            <span>কপি করা হয়েছে!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            <span>আবেদন টেক্সট কপি করুন</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Modal Footer */}
          <div className="bg-slate-100 border-t border-slate-200 p-2 sm:p-3 px-3 sm:px-6 flex flex-row items-center justify-between gap-2 text-[10px] sm:text-xs font-bold text-slate-600 flex-shrink-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse flex-shrink-0" />
              <span className="truncate">শরীয়তপুর জেলা রক্তদান সেবা হেল্পলাইন • স্বেচ্ছায় রক্তদান জীবন বাঁচায়</span>
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
