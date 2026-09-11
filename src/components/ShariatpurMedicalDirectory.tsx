import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Phone, Building, Search, Activity, HeartPulse, ExternalLink, Mic, MicOff } from 'lucide-react';

interface HospitalData {
  id: number;
  name: string;
  type: 'সরকারি' | 'বেসরকারি';
  address: string;
  phone: string;
}

const medicalData: HospitalData[] = [
  { id: 1, name: "শরীয়তপুর সদর হাসপাতাল", type: "সরকারি", address: "শরীয়তপুর সদর", phone: "01714-698009 / 01635600835" },
  { id: 2, name: "উপজেলা স্বাস্থ্য কমপ্লেক্স, দামুড্যা", type: "সরকারি", address: "দামুড্যা, শরীয়তপুর", phone: "01730-324606" },
  { id: 3, name: "নড়িয়া উপজেলা স্বাস্থ্য কমপ্লেক্স", type: "সরকারি", address: "নড়িয়া, শরীয়তপুর", phone: "01730-324604" },
  { id: 4, name: "জাজিরা উপজেলা স্বাস্থ্য কমপ্লেক্স", type: "সরকারি", address: "জাজিরা, শরীয়তপুর", phone: "01730-324603" },
  { id: 5, name: "ভেদরগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স", type: "সরকারি", address: "ভেদরগঞ্জ, শরীয়তপুর", phone: "01730-324605" },
  { id: 6, name: "গোসাইরহাট উপজেলা স্বাস্থ্য কমপ্লেক্স", type: "সরকারি", address: "গোসাইরহাট, শরীয়তপুর", phone: "01730-324607" },
  { id: 7, name: "ফাতেমা মেডিকেল সেন্টার", type: "বেসরকারি", address: "সদর রোড, শরীয়তপুর সদর", phone: "01707-073567" },
  { id: 8, name: "নুর জেনারেল হসপিটাল", type: "বেসরকারি", address: "সদর রোড (গার্লস স্কুলের বিপরীতে)", phone: "01943-727011 / 01752-277186" },
  { id: 9, name: "টিউলিপ হসপিটাল", type: "বেসরকারি", address: "গার্লস স্কুল রোড, শরীয়তপুর", phone: "01901-167301" },
  { id: 10, name: "শরীয়তপুর স্পেশালাইজড হাসপাতাল", type: "বেসরকারি", address: "পৌরসভা সংলগ্ন, শরীয়তপুর", phone: "01713-236782 / 01313-368648" },
  { id: 11, name: "আল বারাকা হাসপাতাল", type: "বেসরকারি", address: "শরীয়তপুর সদর", phone: "01981-888801" },
  { id: 12, name: "নিপুন ডায়াগনস্টিক ও ক্লিনিক", type: "বেসরকারি", address: "শরীয়তপুর সদর", phone: "01719-609185" },
  { id: 13, name: "কেয়ার ৯৮ (Care98)", type: "বেসরকারি", address: "চৌরঙ্গী, সদর রোড, শরীয়তপুর", phone: "01922-662253" },
  { id: 14, name: "ডক্টরস পয়েন্ট ডায়াগনস্টিক", type: "বেসরকারি", address: "সদর হাসপাতাল গেইটের দক্ষিণ-পশ্চিম পার্শ্বে", phone: "01314-658000" },
  { id: 15, name: "সিটি আধুনিক হসপিটাল", type: "বেসরকারি", address: "চৌরঙ্গী, শরীয়তপুর সদর", phone: "01715-146899" },
  { id: 16, name: "রূপসী বাংলা হসপিটাল", type: "বেসরকারি", address: "জিরো পয়েন্ট, শরীয়তপুর", phone: "01933-154069" },
  { id: 17, name: "শরীয়তপুর সেন্ট্রাল হাসপাতাল", type: "বেসরকারি", address: "সদর হাসপাতাল রোড, শরীয়তপুর", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 18, name: "শরীয়তপুর দিঘল ডায়াগনস্টিক", type: "বেসরকারি", address: "শরীয়তপুর সদর", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 19, name: "মাজেদা হাসপাতাল ও ডায়াগনস্টিক", type: "বেসরকারি", address: "শরীয়তপুর সদর", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 20, name: "মেডিনোভা ডায়াগনস্টিক সেন্টার", type: "বেসরকারি", address: "শরীয়তপুর সদর", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 21, name: "সেবা ক্লিনিক অ্যান্ড ডায়াগনস্টিক", type: "বেসরকারি", address: "দামুড্যা বাজার", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 22, name: "নিউ মর্ডান ডায়াগনস্টিক", type: "বেসরকারি", address: "দামুড্যা, শরীয়তপুর", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 23, name: "মদিনা ডায়াগনস্টিক সেন্টার", type: "বেসরকারি", address: "দামুড্যা বাজার রোড", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 24, name: "গ্রীন লাইফ ডায়াগনস্টিক", type: "বেসরকারি", address: "দামুড্যা, শরীয়তপুর", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 25, name: "ডক্টরস কেয়ার ডায়াগনস্টিক", type: "বেসরকারি", address: "দামুড্যা বাসস্ট্যান্ড সংলগ্ন", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 26, name: "জমজম ডায়াগনস্টিক সেন্টার", type: "বেসরকারি", address: "দামুড্যা বাজার", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 27, name: "ডিজিটাল ডায়াগনস্টিক সেন্টার", type: "বেসরকারি", address: "দামুড্যা বাসস্ট্যান্ড এলাকা", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 28, name: "মা ডায়াগনস্টিক সেন্টার", type: "বেসরকারি", address: "উপজেলা গেট সংলগ্ন, দামুড্যা", phone: "সরাসরি যোগাযোগ করুন" },
  { id: 29, name: "মা ও শিশু ডায়াবেটিক হাসপাতাল", type: "বেসরকারি", address: "ঘড়িষার বাজার, নড়িয়া", phone: "01716-618580 / 01716-204319" },
  { id: 30, name: "ডক্টরস মেডিকেল কেয়ার", type: "বেসরকারি", address: "কাজিরহাট বাসস্ট্যান্ড, জাজিরা", phone: "01333-782666" },
  { id: 31, name: "ভেদরগঞ্জ পপুলার ডায়াগনস্টিক", type: "বেসরকারি", address: "ভেদরগঞ্জ, শরীয়তপুর", phone: "01754-761613" },
  { id: 32, name: "নিউ পপুলার ডায়াগনস্টিক", type: "বেসরকারি", address: "ভেদরগঞ্জ, শরীয়তপুর", phone: "01788-760882" }
];

interface ShariatpurMedicalDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShariatpurMedicalDirectory: React.FC<ShariatpurMedicalDirectoryProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'সব' | 'সরকারি' | 'বেসরকারি'>('সব');
  const [selectedHospital, setSelectedHospital] = useState<HospitalData | null>(null);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('আপনার ব্রাউজারে ভয়েস অনুসন্ধান সমর্থিত নয়। Chrome ব্যবহার করুন।');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'bn-BD';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (e: any) => {
        let transcript = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        if (transcript.trim()) setSearchTerm(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  if (!isOpen) return null;

  const filteredData = medicalData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'সব') return matchesSearch;
    return matchesSearch && item.type === filterType;
  });

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 font-['Hind_Siliguri'] animate-in fade-in duration-350">
      <div className="relative w-full max-w-6xl bg-[#f8fafc] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh] border border-slate-200">
        
        {/* Header Ribbon / Navigation bar */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-pink-600 px-6 py-4 flex items-center justify-between text-white shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏥</span>
            <div>
              <h2 className="text-base md:text-lg font-black tracking-tight">শরীয়তপুর মেডিকেল ডিরেক্টরি</h2>
              <p className="text-[10px] md:text-xs text-indigo-100 font-semibold opacity-90">আপনার প্রয়োজনীয় হাসপাতাল ও ক্লিনিকের বিস্তারিত তথ্য</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/15 hover:bg-white/25 text-white rounded-full transition-all duration-250 cursor-pointer active:scale-95"
            title="বন্ধ করুন"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white p-5 border-b border-slate-200 shadow-3xs flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isListening ? "কথা বলুন... (বাংলায় খুঁজুন)" : "হাসপাতাল, অবস্থান অথবা ফোন নম্বর দিয়ে খুঁজুন..."}
              className={`w-full border-2 rounded-2xl py-3 pl-11 ${searchTerm ? 'pr-20' : 'pr-12'} text-xs font-semibold transition-all outline-none text-slate-800 ${
                isListening
                  ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-300 placeholder-rose-700 font-bold'
                  : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white placeholder-slate-400'
              }`}
            />
            <Search className={`absolute left-4 top-3.5 ${isListening ? 'text-rose-600 animate-bounce' : 'text-indigo-500'}`} size={16} />
            
            <div className="absolute right-2.5 top-2 flex items-center gap-1">
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="p-1 text-slate-400 hover:text-slate-600 font-bold text-xs"
                  title="পরিষ্কার"
                >
                  <X size={14} />
                </button>
              )}

              <button
                type="button"
                onClick={toggleVoiceSearch}
                className={`p-1.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse shadow-md'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-200'
                }`}
                title={isListening ? "ভয়েস ইনপুট বন্ধ করুন" : "কথা বলে খুঁজুন"}
              >
                {isListening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {(['সব', 'সরকারি', 'বেসরকারি'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4.5 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all shrink-0 border
                  ${filterType === type 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm scale-102' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                  }`}
              >
                {type === 'সব' ? '🏛️ সব ক্যাটাগরি' : type === 'সরকারি' ? '🏛️ সরকারি হাসপাতাল' : '🏢 বেসরকারি ক্লিনিক'}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid of Cards */}
        <div className="p-6 md:p-8 overflow-y-auto bg-slate-50 flex-1 min-h-0">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {filteredData.map((item) => {
                const isGovt = item.type === 'সরকারি';
                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setSelectedHospital(item)}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md cursor-pointer overflow-hidden transition-all duration-300 before:absolute before:top-0 before:left-0 before:w-full before:h-[4px] before:bg-gradient-to-r before:from-indigo-600 before:to-pink-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100 flex flex-col justify-between min-h-[145px]"
                  >
                    <div>
                      {/* Badge row */}
                      <div className="mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-extrabold shadow-3xs
                          ${isGovt 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-100'}`}
                        >
                          <Building size={11} className={isGovt ? "text-emerald-500" : "text-indigo-500"} />
                          {item.type}
                        </span>
                      </div>

                      {/* Hospital Name */}
                      <h3 className="text-sm md:text-base font-bold text-slate-800 leading-snug hover:text-indigo-600 transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    {/* Footer Address */}
                    <p className="mt-4 text-xs text-slate-500 flex items-center gap-1.5 font-medium leading-relaxed">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{item.address}</span>
                    </p>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200 max-w-md mx-auto">
              <span className="text-4xl block mb-3">🔍</span>
              <p className="text-slate-600 font-extrabold text-sm">কোনো হাসপাতাল বা ক্লিনিক পাওয়া যায়নি!</p>
              <p className="text-slate-400 text-xs mt-1">ভিন্ন বানান লিখে পুনরায় চেষ্টা করুন।</p>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 text-center text-[10px] text-slate-500 font-bold flex flex-col sm:flex-row items-center justify-between shrink-0">
          <span>শরীয়তপুর জেলা মেডিকেল ডিরেক্টরি বাতায়ন</span>
          <span className="mt-1 sm:mt-0 bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded-full font-black">মোট হাসপাতাল ও ক্লিনিক: {medicalData.length} টি</span>
        </div>
      </div>

      {/* Modern Detail Popup (Modal Overly inside Directory) */}
      <AnimatePresence>
        {selectedHospital && (
          <div 
            className="fixed inset-0 z-60 bg-slate-950/55 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedHospital(null)}
          >
            <motion.div 
              initial={{ y: 25, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 25, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl text-center relative border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedHospital(null)}
                className="absolute top-5 right-5 bg-slate-100 text-slate-500 hover:text-rose-600 hover:bg-rose-50 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:rotate-90 cursor-pointer active:scale-90"
              >
                <X size={16} />
              </button>

              {/* Central Premium Gradient Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 via-indigo-50 to-pink-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-indigo-100/30 shadow-inner">
                <HeartPulse size={28} className="animate-pulse text-indigo-600" />
              </div>

              {/* Badge */}
              <div className="mb-2.5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide shadow-3xs
                  ${selectedHospital.type === 'সরকারি' 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : 'bg-indigo-100 text-indigo-800 border border-indigo-200'}`}
                >
                  {selectedHospital.type} হাসপাতাল
                </span>
              </div>

              {/* Title */}
              <h2 className="text-base md:text-lg font-black text-slate-800 mb-6 leading-snug px-3">
                {selectedHospital.name}
              </h2>

              {/* Information Blocks */}
              <div className="space-y-3.5 mb-6 text-left">
                {/* Address Box */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-slate-100/40">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-wider font-sans">ঠিকানা</span>
                    <strong className="block text-xs md:text-sm text-slate-700 font-bold mt-0.5">{selectedHospital.address}</strong>
                  </div>
                </div>

                {/* Phone Box */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-slate-100/40">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-wider font-sans">হেল্পলাইন নম্বর</span>
                    <strong className="block text-xs md:text-sm text-[#006A4E] font-bold mt-0.5 select-all truncate">{selectedHospital.phone}</strong>
                  </div>
                  {selectedHospital.phone !== 'সরাসরি যোগাযোগ করুন' && (
                    <a 
                      href={`tel:${selectedHospital.phone.split('/')[0].trim()}`} 
                      className="p-2.5 bg-[#006A4E] text-white hover:bg-[#005740] rounded-xl transition-all shadow-xs shrink-0 active:scale-95"
                      title="সরাসরি কল দিন"
                    >
                      <Phone size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Call Action Button */}
              {selectedHospital.phone !== 'সরাসরি যোগাযোগ করুন' ? (
                <a
                  href={`tel:${selectedHospital.phone.split('/')[0].trim()}`}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-2xl font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Phone size={14} />
                  <span>এখনই কল করুন (Call Now)</span>
                </a>
              ) : (
                <button
                  onClick={() => setSelectedHospital(null)}
                  className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>ঠিক আছে</span>
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
};
