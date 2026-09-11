import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  PhoneCall,
  MessageSquare,
  HelpCircle,
  Send,
  CheckCircle2,
  Headphones,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  User,
  Phone,
  MessageCircle,
  Check,
  Sparkles
} from 'lucide-react';

interface AdminHelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_OWNER_PHOTO = "https://i.postimg.cc/K8J6tMVG/photo-2026-07-24-01-59-52.jpg";


function getFormattedImageUrl(url: string): string {
  if (!url) return DEFAULT_OWNER_PHOTO;
  if (url.includes('drive.google.com')) {
    return DEFAULT_OWNER_PHOTO;
  }
  return url;
}

const INITIAL_SITE_OWNER = {
  name: 'ওয়েবসাইট পরিচালক ও প্রধান এডমিন',
  designation: 'প্রধান আইটি সমন্বয়ক ও তথ্য কর্মকর্তা',
  portal: 'শরীয়তপুর জেলা সমন্বিত ই-সেবা বাতায়ন',
  phone: '01989-044092',
  whatsapp: '01989044092',
  email: 'adminnayan@gmail.com',
  location: 'শরীয়তপুর সদর',
  bio: 'শরীয়তপুর জেলা ই-সেবা পোর্টালের অনলাইন পরিচালনা, নাগরিক সেবা ভেরিফিকেশন, সার্ভিস আপডেট ও সার্বিক কারিগরি নিয়ন্ত্রণের মূল দায়িত্বে নিয়োজিত।',
  available: '২৪/৭ সরাসরি কল ও সহায়তায় নিয়োজিত',
};

const FAQS = [
  {
    q: '১. এই ওয়েবসাইটের পরিচালকের সাথে যোগাযোগের সঠিক মাধ্যম কোনটি?',
    a: 'ওয়েবসাইট সংক্রান্ত যেকোনো প্রয়োজন, পরামর্শ বা জরুরি সহায়তার জন্য ওপরের "কল করুন", "হোয়াটসঅ্যাপ" বাটনে চাপ দিন অথবা "বার্তা পাঠান" ট্যাবে বার্তা দিন।'
  },
  {
    q: '২. সাইটে নতুন কোনো ডাক্তার, অ্যাম্বুলেন্স বা জরুরি তথ্য কীভাবে যুক্ত করব?',
    a: 'ওয়েবসাইটের "+ তথ্য যোগ করুন" বোতাম বা এডমিনকে বার্তা পাঠাও ফর্মের মাধ্যমে বিস্তারিত জানান। সাইট পরিচালক যাচাই করে অতি দ্রুত প্রকাশ করবেন।'
  },
  {
    q: '৩. সাইটের কোনো তথ্যে ভুল দেখলে কীভাবে পরিচালকে জানাব?',
    a: 'এডমিন হেল্প সেন্টারের "বার্তা পাঠান" ট্যাবে "তথ্য সংশোধন / হালনাগাদ" নির্বাচন করে সঠিক তথ্যটি লিখে জানান। পরিচালক সঙ্গে সঙ্গে তা হালনাগাদ করবেন।'
  },
  {
    q: '৪. এই ওয়েবসাইট পরিচালনায় কোনো ফি বা চার্জ প্রদান করতে হয়?',
    a: 'না, শরীয়তপুর জেলা বাতায়ন সম্পূর্ণ বিনামূল্যে নাগরিক সেবায় নিবেদিত একটি অলাভজনক ওয়ান-স্টপ প্ল্যাটফর্ম।'
  }
];

export const AdminHelpCenterModal: React.FC<AdminHelpCenterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'message' | 'faq'>('profile');

  // Form State
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [queryType, setQueryType] = useState('তথ্য সংশোধন / হালনাগad');
  const [upazila, setUpazila] = useState('সদর');
  const [messageText, setMessageText] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderPhone.trim() || !messageText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedTicket = 'TK-SHR-' + Math.floor(1000 + Math.random() * 9000);
      setTicketId(generatedTicket);
      setIsSubmitting(false);
    }, 600);
  };

  const resetForm = () => {
    setTicketId(null);
    setSenderName('');
    setSenderPhone('');
    setMessageText('');
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.18 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh]"
        >
          {/* Streamlined Compact Header */}
          <div className="bg-gradient-to-r from-[#006A4E] via-[#005740] to-[#004233] text-white p-3 sm:p-4 relative flex-shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-amber-300 shadow-inner flex-shrink-0">
                  <Headphones size={20} className="animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      ২৪/৭ হেল্পডেস্ক
                    </span>
                    <span className="text-emerald-200 text-[10px] sm:text-xs font-bold leading-tight">
                      শরীয়তপুর জেলা বাতায়ন
                    </span>
                  </div>
                  <h2 className="text-xs sm:text-base font-black text-white tracking-tight leading-snug mt-0.5">
                    সাইট পরিচালক ও এডমিন হেল্পলাইন
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                <a
                  href={`tel:${INITIAL_SITE_OWNER.phone}`}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl text-xs transition-transform active:scale-95 inline-flex items-center gap-1 shadow-sm"
                >
                  <PhoneCall size={13} />
                  <span className="hidden sm:inline">কল:</span>
                  <span className="font-mono text-[11px] sm:text-xs">{INITIAL_SITE_OWNER.phone}</span>
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all cursor-pointer border border-white/15"
                  title="বন্ধ করুন"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Compact Navigation Tabs */}
          <div className="bg-slate-100 border-b border-slate-200 px-2 sm:px-4 pt-2 flex items-center justify-between gap-1 flex-shrink-0">
            <div className="flex items-center gap-1 w-full justify-start overflow-x-auto scrollbar-none whitespace-nowrap">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-2 text-xs font-black rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 border-t-2 shrink-0 ${
                  activeTab === 'profile'
                    ? 'bg-white text-[#006A4E] border-[#006A4E] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/50'
                }`}
              >
                <User size={15} />
                <span>পরিচালক প্রোফাইল</span>
              </button>

              <button
                onClick={() => setActiveTab('message')}
                className={`px-3 py-2 text-xs font-black rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 border-t-2 relative shrink-0 ${
                  activeTab === 'message'
                    ? 'bg-white text-[#006A4E] border-[#006A4E] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/50'
                }`}
              >
                <MessageSquare size={15} />
                <span>বার্তা পাঠান (Message)</span>
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping absolute top-1.5 right-1" />
              </button>

              <button
                onClick={() => setActiveTab('faq')}
                className={`px-3 py-2 text-xs font-black rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 border-t-2 shrink-0 ${
                  activeTab === 'faq'
                    ? 'bg-white text-[#006A4E] border-[#006A4E] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/50'
                }`}
              >
                <HelpCircle size={15} />
                <span>প্রশ্নোত্তর (FAQ)</span>
              </button>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-3 sm:p-5 overflow-y-auto flex-1 bg-slate-50/70">
            {/* TAB 1: Director Profile (Designed to fit 100% on one view) */}
            {activeTab === 'profile' && (
              <div className="space-y-3">
                {/* Main Director Card */}
                <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl p-4 border-2 border-emerald-600/40 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 relative z-10">
                    
                    {/* Profile Photo Container - Modern Portrait Frame */}
                    <div className="relative flex-shrink-0 group mx-auto sm:mx-0">
                      <div className="w-28 sm:w-32 h-36 sm:h-40 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-[#006A4E] p-1 shadow-2xl transition-transform duration-300 group-hover:scale-105">
                        <div className="w-full h-full bg-slate-950 rounded-[14px] overflow-hidden flex items-center justify-center relative">
                          <img
                            src={DEFAULT_OWNER_PHOTO}
                            alt="ওয়েবসাইট পরিচালক"
                            className="w-full h-full object-contain rounded-[14px] bg-slate-950/80 transition-all duration-300"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.src = DEFAULT_OWNER_PHOTO;
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Subtle Verified Badge */}
                      <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                        <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-slate-900 shadow-md flex items-center gap-1 tracking-wide">
                          <CheckCircle2 size={11} className="text-amber-300" />
                          <span>পরিচালক</span>
                        </span>
                      </div>
                    </div>

                    {/* Director Info */}
                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1">
                        
                        <span>নয়ন মণ্ডল</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                        {INITIAL_SITE_OWNER.name}
                      </h3>
                      <p className="text-[11px] font-mono font-bold text-amber-300">
                        {INITIAL_SITE_OWNER.designation}
                      </p>

                      <p className="text-slate-300 text-[11px] font-medium leading-relaxed my-2">
                        {INITIAL_SITE_OWNER.bio}
                      </p>

                      {/* Contact Info Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-3">
                        <a
                          href={`tel:${INITIAL_SITE_OWNER.phone}`}
                          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 p-2 rounded-xl text-slate-100 transition-all group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shrink-0">
                            <Phone size={14} />
                          </div>
                          <div className="min-w-0 flex-1 text-left">
                            <div className="text-[9px] text-emerald-200 uppercase font-bold leading-none">ফোন কল</div>
                            <div className="font-mono font-black text-xs text-amber-300 truncate mt-0.5">{INITIAL_SITE_OWNER.phone}</div>
                          </div>
                        </a>

                        <a
                          href={`mailto:${INITIAL_SITE_OWNER.email}`}
                          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 p-2 rounded-xl text-slate-100 transition-all group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shrink-0">
                            <Mail size={14} />
                          </div>
                          <div className="min-w-0 flex-1 text-left">
                            <div className="text-[9px] text-emerald-200 uppercase font-bold leading-none">ইমেইল ঠিকানা</div>
                            <div className="font-mono font-bold text-[11px] text-slate-100 truncate mt-0.5">{INITIAL_SITE_OWNER.email}</div>
                          </div>
                        </a>

                        <div className="flex items-center gap-2 bg-white/10 border border-white/15 p-2 rounded-xl text-slate-100">
                          <div className="w-7 h-7 rounded-lg bg-emerald-400/20 flex items-center justify-center text-emerald-300 shrink-0">
                            <Clock size={14} />
                          </div>
                          <div className="min-w-0 flex-1 text-left">
                            <div className="text-[9px] text-emerald-200 uppercase font-bold leading-none">সেবা সময়</div>
                            <div className="font-bold text-[11px] text-emerald-300 truncate mt-0.5">২৪/৭ অনলাইন ওপেন</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons (Immediately Visible) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-white/15">
                    <button
                      onClick={() => {
                        onClose();
                        if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
                          window.Tawk_API.maximize();
                        } else if (window.Tawk_API && typeof window.Tawk_API.toggle === 'function') {
                          window.Tawk_API.toggle();
                        } else {
                          alert('লাইভ চ্যাট উইজেট লোড হচ্ছে... অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন।');
                        }
                      }}
                      className="px-3 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <MessageSquare size={15} />
                      <span>লাইভ চ্যাট (Tawk.to)</span>
                    </button>

                    <a
                      href={`tel:${INITIAL_SITE_OWNER.phone}`}
                      className="px-3 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <PhoneCall size={15} />
                      <span>সরাসরি কল</span>
                    </a>

                    <a
                      href={`https://wa.me/88${INITIAL_SITE_OWNER.whatsapp}?text=${encodeURIComponent('আসসালামু আলাইকুম, শরীয়তপুর জেলা বাতায়ন ই-সেবা ওয়েবসাইটের পরিচালক/এডমিনের সাথে কথা বলতে চাই।')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-md active:scale-95 border border-emerald-400/40"
                    >
                      <MessageCircle size={15} className="text-emerald-200" />
                      <span>হোয়াটসঅ্যাপ</span>
                    </a>
                  </div>
                </div>

                {/* Quick Emergency Numbers Mini Bar */}
                <div className="bg-white border border-slate-200 rounded-2xl p-2.5 text-xs flex flex-wrap items-center justify-between gap-2 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700">
                    <AlertTriangle size={15} className="text-rose-600" />
                    <span>জাতীয় জরুরি হটলাইন:</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono font-black text-slate-900">
                    <a href="tel:999" className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md hover:bg-rose-200">
                      999
                    </a>
                    <a href="tel:333" className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md hover:bg-emerald-200">
                      333
                    </a>
                    <a href="tel:109" className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md hover:bg-purple-200">
                      109
                    </a>
                    <a href="tel:16263" className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md hover:bg-amber-200">
                      16263
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Direct Message Form */}
            {activeTab === 'message' && (
              <div>
                {ticketId ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-center space-y-3"
                  >
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 size={28} />
                    </div>
                    <div>
                      <span className="bg-emerald-200 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full font-mono uppercase">
                        টিকিট নং: {ticketId}
                      </span>
                      <h3 className="text-base font-black text-slate-900 mt-1">
                        আপনার বার্তা সফলভাবে এডমিনকে প্রেরিত হয়েছে!
                      </h3>
                      <p className="text-slate-600 text-xs font-medium max-w-sm mx-auto mt-1 leading-relaxed">
                        ধন্যবাদ, <strong>{senderName}</strong>। পরিচালক শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-center gap-2">
                      <button
                        onClick={resetForm}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        আরেকটি বার্তা পাঠান
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitMessage} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-2xs">
                    <div className="border-b border-slate-100 pb-2">
                      <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                        <MessageSquare className="text-[#006A4E]" size={16} />
                        <span>এডমিনকে সরাসরি বার্তা পাঠান</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          আপনার নাম *
                        </label>
                        <input
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="উদাহরণ:নয়ন মণ্ডল "
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#006A4E] rounded-xl text-xs font-semibold outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          মোবাইল নম্বর (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={senderPhone}
                          onChange={(e) => setSenderPhone(e.target.value)}
                          placeholder="উদা: 01712345678"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#006A4E] rounded-xl text-xs font-mono outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        বার্তার বিবরণ *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="আপনার বার্তা বা নতুন তথ্য যোগের বিবরণ স্পষ্ট করে লিখুন..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#006A4E] rounded-xl text-xs font-medium outline-none resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-5 py-2 bg-[#006A4E] hover:bg-[#005740] text-white font-black text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        {isSubmitting ? 'পাঠানো হচ্ছে...' : 'এডমিনকে বার্তা পাঠান'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: FAQ */}
            {activeTab === 'faq' && (
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
                    <h4 className="font-extrabold text-xs text-slate-900 mb-1 flex items-start gap-1.5">
                      <span className="text-[#006A4E]">Q:</span>
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed pl-4 border-l-2 border-emerald-500">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Compact Footer */}
          <div className="bg-slate-100 border-t border-slate-200 p-2.5 px-4 flex items-center justify-between gap-2 text-[11px] font-bold text-slate-600 flex-shrink-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse flex-shrink-0" />
              <span className="truncate">শরীয়তপুর জেলা সমন্বিত ই-সেবা বাতায়ন</span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1 bg-slate-800 text-white hover:bg-slate-900 rounded-lg text-xs font-extrabold cursor-pointer transition-colors"
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
