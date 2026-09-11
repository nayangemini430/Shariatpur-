import React, { useState } from 'react';
import { Phone, MapPin, BadgeCheck, ShieldAlert, Sparkles, User, CheckCircle2, MessageSquare, Copy, Check, Map, ShieldCheck, Info, X } from 'lucide-react';
import { Contact, Category } from '../types';
import { LucideIcon } from './CategoryCard';

interface ContactCardProps {
  contact: Contact;
  categoryInfo: Category | undefined;
  onCall: (contact: Contact) => void;
  onViewDetails?: (contact: Contact) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  categoryInfo,
  onCall,
  onViewDetails,
}) => {
  const isEmergency = contact.isEmergency;
  const [copied, setCopied] = useState(false);
  const [showVerifiedTooltip, setShowVerifiedTooltip] = useState(false);

  const isVerified = contact.verified !== false && (!contact.id.startsWith('user_') || contact.verified === true);

  // Helper to construct WhatsApp link
  const getWhatsAppUrl = (phone: string): string | null => {
    if (!phone || phone.includes('সরাসরি')) return null;
    const primaryPart = phone.split(/[/,]/)[0].trim();
    const digitsOnly = primaryPart.replace(/\D/g, '');
    
    if (digitsOnly.length === 11 && digitsOnly.startsWith('01')) {
      return `https://wa.me/88${digitsOnly}`;
    } else if (digitsOnly.length === 13 && digitsOnly.startsWith('8801')) {
      return `https://wa.me/${digitsOnly}`;
    } else if (digitsOnly.startsWith('01') && digitsOnly.length >= 10) {
      return `https://wa.me/88${digitsOnly}`;
    }
    return null;
  };

  const whatsappUrl = getWhatsAppUrl(contact.phoneNumber);
  const mapSearchQuery = `${contact.name} ${contact.location} Shariatpur Bangladesh`;
  const mapUrl = contact.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapSearchQuery)}`;

  const handleCopy = () => {
    try {
      const textToCopy = `${contact.name}\nক্যাটাগরি: ${categoryInfo?.name || ''}\nফোন: ${contact.phoneNumber}\nঠিকানা: ${contact.location}, শরীয়তপুর`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy", err);
    }
  };

  return (
    <div
      id={`contact-card-${contact.id}`}
      onClick={() => {
        if (contact.category === 'hospitals' && onViewDetails) {
          onViewDetails(contact);
        }
      }}
      className={`relative group bg-white rounded-3xl border-2 p-5.5 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md
        ${
          contact.category === 'hospitals' && onViewDetails
            ? 'cursor-pointer hover:border-indigo-400'
            : ''
        }
        ${
          isEmergency
            ? 'border-rose-100 hover:border-rose-300 bg-rose-50/10'
            : 'border-slate-100 hover:border-[#006A4E]/30 hover:bg-slate-50/20'
        }
      `}
    >
      {/* Decorative official subtle seal watermark on hover */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-100/40 pointer-events-none group-hover:text-[#006A4E]/5 transition-all duration-300 transform group-hover:scale-125 select-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 60 L30 75 L35 55 L20 40 L40 40 Z" />
        </svg>
      </div>

      <div>
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
          {/* Category Badge - Official government tag style */}
          {categoryInfo && (
            <span className={`inline-flex items-center gap-1 text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-md border ${categoryInfo.bgLight} text-slate-700 border-slate-200/50`}>
              <span className="text-[#006A4E]">
                <LucideIcon name={categoryInfo.icon} size={11} />
              </span>
              {categoryInfo.name}
            </span>
          )}

          {/* Upazila/Sub-district Badge */}
          <span className="inline-flex items-center text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#006A4E]/10 text-[#006A4E] border border-[#006A4E]/10">
            {contact.upazila} উপজেলা
          </span>

          {/* Emergency Tag */}
          {isEmergency && (
            <span className="inline-flex items-center gap-0.5 text-[9px] md:text-[10px] font-black px-2.5 py-0.5 rounded-md bg-[#f42a41] text-white shadow-xs animate-pulse">
              <ShieldAlert size={10} />
              জরুরি (Priority)
            </span>
          )}

          {/* User Added badge */}
          {contact.id.startsWith('user_') && (
            <span className="inline-flex items-center gap-0.5 text-[9px] md:text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200/60">
              <Sparkles size={10} className="text-amber-600" />
              নাগরিক যুক্ত (User Added)
            </span>
          )}
        </div>

        {/* Contact Name with official checkmark */}
        <div className="flex items-start justify-between gap-2.5 mb-2.5 relative">
          <h3 className="font-sans font-black text-slate-800 text-base md:text-md group-hover:text-[#006A4E] transition-colors duration-200 leading-snug">
            {contact.name}
          </h3>
          
          {isVerified ? (
            <div 
              className="relative flex-shrink-0 mt-0.5"
              onMouseEnter={() => setShowVerifiedTooltip(true)}
              onMouseLeave={() => setShowVerifiedTooltip(false)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVerifiedTooltip(!showVerifiedTooltip);
                }}
                type="button"
                className="relative group/vbadge inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#006A4E] via-emerald-700 to-emerald-600 text-white text-[10px] md:text-xs font-black shadow-xs hover:shadow-md transition-all duration-300 border border-emerald-400/40 cursor-pointer overflow-hidden animate-pulse-glow"
                title="অফিসিয়াল সরকারি তথ্য বাতায়ন যাচাইকৃত"
              >
                {/* Animated shimmer highlight */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer pointer-events-none" />

                {/* Verified Icon with glowing dot */}
                <span className="relative flex items-center justify-center">
                  <BadgeCheck size={14} className="text-amber-300 fill-emerald-900" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                </span>

                <span className="relative font-sans tracking-tight">
                  অফিসিয়াল যাচাইকৃত
                </span>

                <Info size={11} className="relative text-emerald-200 opacity-90 group-hover/vbadge:scale-110 transition-transform" />
              </button>

              {/* Interactive Tooltip Card */}
              {showVerifiedTooltip && (
                <div 
                  className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-slate-900/95 backdrop-blur-md text-white text-xs rounded-2xl p-3.5 shadow-2xl z-50 border border-emerald-500/50 animate-in fade-in zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between border-b border-slate-700/80 pb-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                        <ShieldCheck size={16} />
                      </span>
                      <div>
                        <p className="font-black text-emerald-400 text-xs">সরকারি তথ্য বাতায়ন নিবন্ধিত</p>
                        <p className="text-[10px] text-slate-300 font-medium">শরীয়তপুর জেলা প্রশাসন ও অফিশিয়াল রেকর্ড</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowVerifiedTooltip(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  
                  <div className="space-y-1.5 text-[11px] text-slate-200 leading-relaxed font-medium">
                    <div className="flex items-start gap-1.5 bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-800/40">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>সরাসরি উৎস:</strong> শরীয়তপুর জেলা বাতায়ন, সিভিল সার্জন ও প্রশাসন রেজিস্টার।</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>নির্ভরযোগ্যতা:</strong> মাঠপর্যায়ে তথ্য সেল কর্তৃক সরাসরি যাচাইকৃত।</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>২৪/৭ রেসপন্স:</strong> জরুরি সেবায় নিয়মিত হালনাগাদকৃত নম্বর।</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>আইডি: #{contact.id}</span>
                    <span className="text-amber-400 font-black flex items-center gap-1">
                      <CheckCircle2 size={10} className="text-amber-400 fill-current" />
                      ১০০% ট্রাস্ট স্কোর
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div 
              className="relative flex-shrink-0 mt-0.5"
              onMouseEnter={() => setShowVerifiedTooltip(true)}
              onMouseLeave={() => setShowVerifiedTooltip(false)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVerifiedTooltip(!showVerifiedTooltip);
                }}
                type="button"
                className="relative group/vbadge inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300/80 font-bold text-[10px] transition-all cursor-pointer shadow-3xs"
                title="ব্যবহারকারী কর্তৃক তথ্য প্রস্তাবিত - যাচাইকরণ প্রক্রিয়াধীন"
              >
                <Sparkles size={11} className="text-amber-600 animate-spin" />
                <span>নাগরিক প্রস্তাবিত</span>
                <Info size={10} className="text-amber-600 opacity-80" />
              </button>

              {showVerifiedTooltip && (
                <div 
                  className="absolute right-0 top-full mt-2 w-72 bg-slate-900/95 backdrop-blur-md text-white text-xs rounded-2xl p-3.5 shadow-2xl z-50 border border-amber-500/50 animate-in fade-in zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 bg-amber-500/20 text-amber-400 rounded-lg">
                        <User size={14} />
                      </span>
                      <div>
                        <p className="font-bold text-amber-400 text-xs">নাগরিক এনট্রি (User Added)</p>
                        <p className="text-[10px] text-slate-300">তথ্য বাতায়নে সাধারণ ব্যবহারকারী কর্তৃক যুক্ত</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowVerifiedTooltip(false)} 
                      className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-2 font-medium">
                    এই নম্বরটি শরীয়তপুরের কোনো নাগরিক বা ব্যবহারকারী কর্তৃক নতুন যুক্ত হয়েছে।
                  </p>
                  
                  <div className="bg-amber-950/70 border border-amber-700/60 rounded-xl p-2 text-[10px] text-amber-200 leading-normal">
                    ⚠️ <strong>বিশেষ নোটিশ:</strong> জেলা তথ্য সেল কর্তৃক অফিশিয়াল যাচাইকরণ প্রক্রিয়া চলমান রয়েছে।
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Location & Address */}
        <div className="text-slate-500 text-xs flex items-start gap-1.5 mb-3 leading-relaxed font-medium">
          <MapPin size={13} className="text-[#006A4E] mt-0.5 flex-shrink-0" />
          <span>{contact.location}</span>
        </div>

        {/* Details & timings */}
        {contact.details && (
          <div className="bg-slate-50/80 rounded-xl p-2.5 mb-2.5 border border-slate-150 shadow-inner">
            <p className="text-slate-600 text-xs leading-relaxed font-semibold">
              📝 {contact.details}
            </p>
          </div>
        )}

        {/* Hospital interactive helper badge */}
        {contact.category === 'hospitals' && onViewDetails && (
          <div className="mt-2.5 mb-1.5 text-[10px] md:text-[11px] font-black text-indigo-700 bg-indigo-50/50 hover:bg-indigo-50/90 border border-indigo-150/70 rounded-xl py-2 px-2.5 flex items-center justify-between transition-colors shadow-3xs cursor-pointer">
            <span className="flex items-center gap-1.5">
              <span>🩺</span>
              <span>ডাক্তার, ম্যাপ ও জরুরি সেবাসমূহ</span>
            </span>
            <span className="text-[10px] font-extrabold text-indigo-500 flex items-center gap-0.5">
              বিস্তারিত ➜
            </span>
          </div>
        )}

        {/* --- Dynamic Under-Link Action Matrix --- */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col gap-2 relative z-10" onClick={(e) => e.stopPropagation()}>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Sparkles size={10} className="text-[#006A4E]" />
            যোগাযোগ ও অনুসন্ধান লিংকসমূহ (Quick Actions)
          </span>
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            {/* WhatsApp Link */}
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition-all font-bold rounded-xl border border-emerald-100 shadow-3xs hover:scale-102 active:scale-98"
                title="হোয়াটসঅ্যাপে মেসেজ পাঠান"
              >
                <MessageSquare size={12} className="text-emerald-500 group-hover:text-white" />
                <span>হোয়াটসঅ্যাপ</span>
              </a>
            ) : (
              <span
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-50 text-slate-400 font-bold rounded-xl border border-slate-100 opacity-60 cursor-not-allowed select-none"
                title="ল্যান্ডলাইন/অন্য নম্বরের কারণে হোয়াটসঅ্যাপ উপলব্ধ নয়"
              >
                <MessageSquare size={12} />
                <span>হোয়াটসঅ্যাপ</span>
              </span>
            )}

            {/* Google Maps Link */}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white transition-all font-bold rounded-xl border border-blue-100 shadow-3xs hover:scale-102 active:scale-98"
              title="গুগল ম্যাপসে ঠিকানা খুঁজুন"
            >
              <Map size={12} className="text-blue-500" />
              <span>গুগল ম্যাপস</span>
            </a>

            {/* Copy Info Button */}
            <button
              onClick={handleCopy}
              className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-2 font-bold rounded-xl transition-all border shadow-3xs hover:scale-102 active:scale-98 cursor-pointer ${
                copied
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="তথ্য কপি করুন"
            >
              {copied ? <Check size={12} /> : <Copy size={12} className="text-slate-500" />}
              <span>{copied ? 'কপি হয়েছে!' : 'তথ্য কপি'}</span>
            </button>

            {/* Direct Web/Info Link */}
            {contact.category === 'hospitals' && onViewDetails ? (
              <button
                onClick={() => onViewDetails(contact)}
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white transition-all font-bold rounded-xl border border-indigo-100 shadow-3xs hover:scale-102 active:scale-98 cursor-pointer"
                title="বিস্তারিত তথ্য দেখুন"
              >
                <span>📋 বিস্তারিত</span>
              </button>
            ) : (
              <span
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-50 text-slate-400 font-bold rounded-xl border border-slate-100 opacity-60 cursor-not-allowed select-none"
              >
                <span>📌 বাতায়নভুক্ত</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dial Call Actions */}
      <div className="mt-auto pt-3.5 border-t-2 border-dashed border-slate-150 flex gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          id={`call-trigger-btn-${contact.id}`}
          onClick={() => onCall(contact)}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-sans font-black text-xs tracking-wide transition-all duration-300 cursor-pointer shadow-xs border
            ${
              isEmergency
                ? 'bg-[#f42a41] text-white hover:bg-[#d62034] border-[#f42a41] hover:shadow-md'
                : 'bg-[#006A4E] text-white hover:bg-[#005740] border-[#006A4E] hover:shadow-md'
            }
            active:scale-[0.98]
          `}
        >
          <Phone size={12} className="animate-pulse" />
          <span>সরাসরি কল দিন</span>
          <span className="text-[10px] opacity-90 font-mono font-medium bg-black/15 px-1.5 py-0.5 rounded">
            {contact.phoneNumber}
          </span>
        </button>
      </div>
    </div>
  );
};
