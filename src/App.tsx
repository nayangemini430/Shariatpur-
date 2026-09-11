import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  Phone,
  Wifi,
  WifiOff,
  RotateCcw,
  Trash2,
  Info,
  Shield,
  Check,
  Building,
  Heart,
  Grid,
  MapPin,
  ExternalLink,
  Users,
  AlertTriangle,
  Flame,
  CheckCircle,
  X,
  ShieldAlert,
  HeartPulse,
  Droplet,
  Pill,
  Bus,
  Wrench,
  BadgeCheck,
  Sparkles,
  Menu,
  Home,
  HelpCircle,
  MessageSquare,
  Copy,
  Map,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  GraduationCap,
  Landmark,
  Scale,
  Newspaper,
  Compass,
  Sprout,
  FileText,
  Stethoscope,
  Truck,
  PenTool,
  Mic,
  MicOff,
  Headphones,
  Bell,
  RefreshCw,
  Radio,
  Volume2,
  VolumeX
} from 'lucide-react';

interface MarqueeNotice {
  id: string;
  title: string;
  text: string;
  date?: string;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
}

const DEFAULT_NOTICES: MarqueeNotice[] = [
  {
    id: '1',
    title: 'শরীয়তপুর জেলা প্রশাসন ও সুশাসন তথ্য সেবা কেন্দ্র',
    text: 'শরীয়তপুর জেলার সকল সাধারণ নাগরিক ও জরুরি প্রয়োজনে সাহায্য প্রার্থীদের জন্য জেলা প্রশাসনের তত্ত্বাবধানে এই সমন্বিত হেল্প ডেস্ক প্রস্তুত করা হয়েছে। এখানে ফায়ার সার্ভিস, পুলিশ, জেলা হাসপাতাল, ২৪ ঘণ্টা ফার্মেসী ও রক্তদাতাদের নম্বর পাওয়া যাবে।',
    date: '২০২৬-০৮-০১',
    priority: 'high',
    category: 'জরুরি'
  },
  {
    id: '2',
    title: 'ডেঙ্গু ও মশাবাহিত রোগ প্রতিরোধে পরিচ্ছন্নতা অভিযান',
    text: 'শরীয়তপুর পৌরসভার ৬টি ওয়ার্ডে এবং সকল উপজেলা সদরে ডেঙ্গু প্রতিরোধে লার্ভিসাইড স্প্রে ও পরিষ্কার-পরিচ্ছন্নতা জোরদার করা হয়েছে। যেকোনো স্থানে পানি জমে থাকলে ৩৩৩ নম্বরে জানান।',
    date: '২০২৬-০৭-৩০',
    priority: 'high',
    category: 'স্বাস্থ্য'
  }
];

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
import { Contact, Upazila, CategoryId, BlogPost, BlogComment } from './types';
import { CATEGORIES, INITIAL_CONTACTS } from './data';
import { INITIAL_BLOG_POSTS } from './blogData';
import { CategoryCard, LucideIcon } from './components/CategoryCard';
import { ContactCard } from './components/ContactCard';
import { AddContactModal } from './components/AddContactModal';
import { GovServicesSection } from './components/GovServicesSection';
import { GovServicesModal } from './components/GovServicesModal';
import { HospitalDetailsModal } from './components/HospitalDetailsModal';
import { ShariatpurMedicalDirectory } from './components/ShariatpurMedicalDirectory';
import { BloodDonorDirectoryModal } from './components/BloodDonorDirectoryModal';
import { AdminHelpCenterModal } from './components/AdminHelpCenterModal';
import { EmergencyHotlineGrid } from './components/EmergencyHotlineGrid';
import { GovernmentPortalHome } from './components/GovernmentPortalHome';
import { ShariatpurGovSeal, PORTAL_LOGO_URL } from './components/ShariatpurGovSeal';
import { DistrictBlogSection } from './components/DistrictBlogSection';
import { HorizontalSliderBar } from './components/HorizontalSliderBar';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const DONOR_DISTRIBUTION_DATA = [
  { group: 'A+', count: 54 },
  { group: 'B+', count: 61 },
  { group: 'O+', count: 72 },
  { group: 'O-', count: 12 },
  { group: 'A-', count: 8 },
  { group: 'AB+', count: 18 },
];

const UPAZILAS: Upazila[] = [
  'All',
  'Sadar',
  'Naria',
  'Zajira',
  'Bhedarganj',
  'Damudya',
  'Gosairhat',
];

const getBanglaCategoryName = (catId: string) => {
  switch (catId) {
    case 'police': return '👮 পুলিশ ও নিরাপত্তা (Police & Security)';
    case 'fire_service': return '🚒 ফায়ার সার্ভিস (Fire Service)';
    case 'ambulance': return '🚑 অ্যাম্বুলেন্স সার্ভিস (Ambulance Services)';
    case 'hospitals': return '🏥 হাসপাতাল ও ডাক্তার (Hospitals & Doctors)';
    case 'blood_donors': return '🩸 রক্তদাতা ও ব্লাড ব্যাংক (Blood Donors)';
    case 'pharmacies': return '💊 ২৪ ঘণ্টা ফার্মেসী (24/7 Pharmacies)';
    case 'transportation': return '🚌 যাতায়াত ও পরিবহন (Transportation)';
    case 'gov_offices': return '🏛️ সরকারি ও বিদ্যুৎ অফিস (Govt & Electricity)';
    case 'mechanics': return '🔧 জরুরি মেকানিক ও গ্যারেজ (Emergency Mechanics)';
    default: return '💼 অন্যান্য জরুরি সেবা (Others)';
  }
};

const toBengaliDigits = (num: number | string): string => {
  const banglaNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(char => {
    const parsed = parseInt(char, 10);
    return isNaN(parsed) ? char : banglaNums[parsed];
  }).join('');
};

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

const getBangladeshiBengaliDate = (date: Date): { day: number; month: string; year: number } => {
  const gYear = date.getFullYear();
  const localMidnightDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  let bYear = gYear - 593;
  let startOfBengaliYear = new Date(gYear, 3, 14); // April 14 is month 3 (0-indexed)
  
  if (localMidnightDate < startOfBengaliYear) {
    bYear = gYear - 594;
    startOfBengaliYear = new Date(gYear - 1, 3, 14);
  }

  // Calculate days elapsed since startOfBengaliYear (April 14)
  const utcDate = Date.UTC(localMidnightDate.getFullYear(), localMidnightDate.getMonth(), localMidnightDate.getDate());
  const utcStart = Date.UTC(startOfBengaliYear.getFullYear(), startOfBengaliYear.getMonth(), startOfBengaliYear.getDate());
  const daysDifference = Math.floor((utcDate - utcStart) / (24 * 60 * 60 * 1000));

  // Determine if Falgun of this Bengali year is a leap year.
  // Falgun falls in February of the Gregorian year following startOfBengaliYear.
  const targetYearForFalgun = startOfBengaliYear.getFullYear() + 1;
  const isLeap = (targetYearForFalgun % 4 === 0 && targetYearForFalgun % 100 !== 0) || (targetYearForFalgun % 400 === 0);

  const bnMonthNames = [
    'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 
    'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
  ];

  // Months 1-6 (Baishakh to Ashwin) have 31 days.
  // Months 7-11 (Kartik to Falgun) have 30 days (Falgun has 31 in leap years).
  // Month 12 (Chaitra) has 30 days.
  const bnMonthLengths = [
    31, 31, 31, 31, 31, 31, // Baishakh to Ashwin (1-6)
    30, 30, 30, 30,         // Kartik to Magh (7-10)
    isLeap ? 31 : 30,       // Falgun (11)
    30                      // Chaitra (12)
  ];

  let bMonthIndex = 0;
  let remainingDays = daysDifference;

  while (bMonthIndex < 12 && remainingDays >= bnMonthLengths[bMonthIndex]) {
    remainingDays -= bnMonthLengths[bMonthIndex];
    bMonthIndex++;
  }

  if (bMonthIndex >= 12) {
    bMonthIndex = 11;
    remainingDays = bnMonthLengths[11] - 1;
  }

  const bDay = remainingDays + 1;
  const bMonthName = bnMonthNames[bMonthIndex];

  return { day: bDay, month: bMonthName, year: bYear };
};

function HeaderWidget({
  onOpenAdminHelp,
}: {
  onOpenAdminHelp: () => void;
}) {
  const [banglaTime, setBanglaTime] = useState('');
  const [banglaDate, setBanglaDate] = useState('');

  useEffect(() => {
    const updateBanglaTimeAndDate = () => {
      const now = new Date();

      // বাংলায় সময় দেখানোর অপশন (ঘণ্টা, মিনিট, সেকেন্ড এবং AM/PM)
      const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      };
      const formattedTime = now.toLocaleTimeString('bn-BD', timeOptions);

      // বাংলায় ক্যালেন্ডার/তারিখ দেখানোর অপশন (বার, দিন, মাস, বছর)
      const dateOptions: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      const formattedGregorian = now.toLocaleDateString('bn-BD', dateOptions);

      const banglaDateObj = getBangladeshiBengaliDate(now);
      const formattedBangla = `${banglaDateObj.day.toLocaleString('bn-BD')} ${banglaDateObj.month} ${banglaDateObj.year.toLocaleString('bn-BD')}`;

      setBanglaTime(formattedTime);
      setBanglaDate(`${formattedGregorian} (${formattedBangla} বঙ্গাব্দ)`);
    };

    updateBanglaTimeAndDate();
    const interval = setInterval(updateBanglaTimeAndDate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="bg-[#006a4e] text-white flex flex-col min-[601px]:flex-row justify-between items-center py-2 px-3 sm:px-6 border-b-4 border-[#f42a41] shadow-md gap-2 min-[601px]:gap-0 text-center min-[601px]:text-left font-sans text-xs md:text-sm"
    >
      <div className="font-bold flex items-center justify-center min-[601px]:justify-start gap-2 flex-wrap">
        <span className="tracking-wide leading-tight">
          গণপ্রজাতন্ত্রী বাংলাদেশ সরকার • <span className="text-amber-300">শরীয়তপুর জেলা বাতায়ন পোর্টাল</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2.5 items-center justify-center min-[601px]:justify-end font-mono text-[11px] font-semibold">
        <span className="bg-white/15 px-2 py-1 rounded-lg border border-white/10">
          আজ: {banglaDate}
        </span>
        <span className="bg-white/15 px-2 py-1 rounded-lg border border-white/10">
          সময়: {banglaTime}
        </span>
        <button
          onClick={onOpenAdminHelp}
          className="hidden min-[601px]:flex bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2.5 py-1 rounded-lg transition-transform active:scale-95 items-center gap-1 cursor-pointer shadow-sm text-[11px] shrink-0"
        >
          <Headphones size={13} className="animate-pulse text-slate-900" />
          <span>এডমিন হেল্পলাইন</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  // 1. App start time (real time when user first opened the app)
  const [startTime, setStartTime] = useState<number>(() => {
    const saved = localStorage.getItem('app_start_time');
    if (saved) return parseInt(saved, 10);
    const now = new Date().getTime();
    localStorage.setItem('app_start_time', now.toString());
    return now;
  });

  // 2. Manual offset (in number of 12-hour periods) to allow manual fast-forwarding
  const [manualOffset, setManualOffset] = useState<number>(() => {
    const saved = localStorage.getItem('app_manual_offset');
    return saved ? parseInt(saved, 10) : 0;
  });

  // 3. Keep track of current real time to trigger automatic updates
  const [currentTime, setCurrentTime] = useState<number>(() => new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 10000); // Check every 10 seconds for real-time progression
    return () => clearInterval(interval);
  }, []);

  // Calculate elapsed 12-hour periods (AM/PM cycle)
  const twelveHoursInMs = 12 * 60 * 60 * 1000;
  const timeDifference = currentTime - startTime;
  const autoPeriods = Math.floor(timeDifference / twelveHoursInMs);

  // Total periods = auto periods + manual clicks
  const totalPeriods = autoPeriods + manualOffset;

  // Baseline date is July 18, 2026, 10:00 AM
  const baseDate = new Date(2026, 6, 18, 10, 0, 0); // Month is 0-indexed, so 6 is July
  const displayDate = new Date(baseDate.getTime() + totalPeriods * 12 * 60 * 60 * 1000);

  // Format date using custom Bangladeshi Bengali Calendar rules and 24-hour clock
  const formatDisplayDate = (date: Date): string => {
    const { day, month, year } = getBangladeshiBengaliDate(date);
    const bnDateStr = `আজ ${toBengaliDigits(day)} ${month} ${toBengaliDigits(year)} বঙ্গাব্দ`;

    const gregorianFormatter = new Intl.DateTimeFormat('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const enDateStr = gregorianFormatter.format(date).replace(/,/g, '');

    // Time (Hour, Minute in 24-hour clock in Bengali)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeStr = `${toBengaliDigits(hours)}:${toBengaliDigits(minutes)}`;

    return `${bnDateStr} | ইংরেজি: ${enDateStr} | সময়: ${timeStr}`;
  };

  const currentDateStr = formatDisplayDate(displayDate);

  const handleNextDate = () => {
    const nextOffset = manualOffset + 1;
    setManualOffset(nextOffset);
    localStorage.setItem('app_manual_offset', nextOffset.toString());
  };

  const handleResetDate = () => {
    const now = new Date().getTime();
    setStartTime(now);
    setManualOffset(0);
    localStorage.setItem('app_start_time', now.toString());
    localStorage.setItem('app_manual_offset', '0');
    setCurrentTime(now);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMedicalDirectory, setShowMedicalDirectory] = useState(false);
  const [showGovServicesModal, setShowGovServicesModal] = useState(false);
  const [showAdminHelpModal, setShowAdminHelpModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showList, setShowList] = useState(false);
  const [donorViewMode, setDonorViewMode] = useState<'filter' | 'chart'>('chart');

  const bloodGroups = ['A+ Group', 'B+ Group', 'O+ Group', 'O- Group', 'A- Group', 'AB+ Group'];
  const dummyDonors = [
    { id: 1, name: "আব্দুর রহিম", phone: "01700-000000", location: "শরীয়তপুর সদর" },
    { id: 2, name: "করিম মিয়া", phone: "01800-000000", location: "নড়িয়া" },
    { id: 3, name: "শফিকুল ইসলাম", phone: "01900-000000", location: "জাজিরা" },
    { id: 4, name: "নয়ন মণ্ডল", phone: "01989044092", location: "ভেদরগঞ্জ" },
  ];

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedGroup(null);
      setShowList(false);
    }, 300); 
  };

  const handleViewList = () => {
    if (selectedGroup) {
      setShowList(true);
    } else {
      alert("দয়া করে আগে একটি রক্তের গ্রুপ নির্বাচন করুন!");
    }
  };
  // Contacts state
  const [contacts, setContacts] = useState<Contact[]>([]);
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState<Upazila>('All');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'All' | 'blog'>('All');
  const [hospitalSubCategory, setHospitalSubCategory] = useState<'All' | 'Government' | 'PrivateSadar' | 'PrivateDamudya' | 'PrivateOthers'>('All');

  // Web Speech API Voice Search state
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechLang, setSpeechLang] = useState<'bn-BD' | 'en-US'>('bn-BD');
  const recognitionRef = useRef<any>(null);

  const toggleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('আপনার ব্রাউজারে ভয়েস সার্চ (Web Speech API) সমর্থিত নয়। অনুগ্রহ করে Chrome বা Edge ব্যবহার করুন।');
      setTimeout(() => setSpeechError(null), 5000);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error('Speech stop error:', e);
        }
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = speechLang;
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setSearchQuery(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'no-speech') {
          setSpeechError('কোনো বক্তব্য শোনা যায়নি। মাইক্রোফোনের কাছে কথা বলুন।');
        } else if (event.error === 'not-allowed') {
          setSpeechError('মাইক্রোফোন ব্যবহারের অনুমতি প্রদান করুন।');
        } else {
          setSpeechError('ভয়েস অনুসন্ধানে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        }
        setTimeout(() => setSpeechError(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setSpeechError('ভয়েস সার্ভিস চালু করা সম্ভব হয়নি।');
      setTimeout(() => setSpeechError(null), 4000);
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Notice board state & fetching from public JSON / API
  const [notices, setNotices] = useState<MarqueeNotice[]>(DEFAULT_NOTICES);
  const [isNoticeLoading, setIsNoticeLoading] = useState<boolean>(false);
  const [noticeLastFetched, setNoticeLastFetched] = useState<string>('');

  const fetchPublicNotices = async () => {
    setIsNoticeLoading(true);
    try {
      const response = await fetch('/notices.json?t=' + Date.now());
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.notices) && data.notices.length > 0) {
          setNotices(data.notices);
          setNoticeLastFetched(new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (error) {
      console.warn('Real-time notice fetch error:', error);
    } finally {
      setIsNoticeLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicNotices();
  }, []);

  // Blog posts state with localStorage caching
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const cached = localStorage.getItem('shariatpur_district_blogs');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return INITIAL_BLOG_POSTS;
      }
    }
    return INITIAL_BLOG_POSTS;
  });

  const handleAddBlogPost = (newPost: BlogPost) => {
    const updated = [newPost, ...blogPosts];
    setBlogPosts(updated);
    localStorage.setItem('shariatpur_district_blogs', JSON.stringify(updated));
  };

  const handleLikeBlogPost = (postId: string) => {
    const updated = blogPosts.map((post) => {
      if (post.id === postId) {
        return { ...post, likesCount: post.likesCount + 1 };
      }
      return post;
    });
    setBlogPosts(updated);
    localStorage.setItem('shariatpur_district_blogs', JSON.stringify(updated));
  };

  const handleAddBlogComment = (postId: string, comment: BlogComment) => {
    const updated = blogPosts.map((post) => {
      if (post.id === postId) {
        return { ...post, comments: [comment, ...post.comments] };
      }
      return post;
    });
    setBlogPosts(updated);
    localStorage.setItem('shariatpur_district_blogs', JSON.stringify(updated));
  };

  // Sidebar Dropdown Navigation states - All collapsed (false) by default
  const [isMedicalDropdownOpen, setIsMedicalDropdownOpen] = useState(false);
  const [isEmergencyDropdownOpen, setIsEmergencyDropdownOpen] = useState(false);
  const [isEducationBanksDropdownOpen, setIsEducationBanksDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  // Active state flags
  const isMedicalActive = ['hospitals', 'pharmacies', 'ambulance', 'blood_donors', 'home_nursing'].includes(selectedCategory);
  const isEmergencyActive = ['police', 'fire_service', 'transportation', 'gov_offices', 'mechanics'].includes(selectedCategory);
  const isEducationBanksActive = ['education', 'banks', 'agriculture', 'union_parishad', 'passport_land'].includes(selectedCategory);
  const isServicesActive = ['legal_help', 'journalists', 'hotels_tourism', 'courier'].includes(selectedCategory);

  // Reset hospital sub-category when selectedCategory changes
  useEffect(() => {
    setHospitalSubCategory('All');
  }, [selectedCategory]);
  
  // Offline simulation state
  const [isOffline, setIsOffline] = useState(false);
  
  // Add contact modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Hospital details modal state
  const [selectedHospitalForDetails, setSelectedHospitalForDetails] = useState<Contact | null>(null);

  // Toggle state for category launcher grid (show 5 upfront, expand to all)
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  
  // Simulated call notification state
  const [activeCallContact, setActiveCallContact] = useState<Contact | null>(null);
  
  // View mode for directory list ('grid' or 'table')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // System status
  const [isRealOnline, setIsRealOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Load and initialize contacts on mount
  useEffect(() => {
    const cached = localStorage.getItem('shariatpur_helpdesk_contacts');
    if (cached) {
      try {
        const parsed: Contact[] = JSON.parse(cached);
        const existingIds = new Set(parsed.map((c) => c.id));
        const missingSeed = INITIAL_CONTACTS.filter((c) => !existingIds.has(c.id));
        if (missingSeed.length > 0) {
          const merged = [...parsed, ...missingSeed];
          setContacts(merged);
          localStorage.setItem('shariatpur_helpdesk_contacts', JSON.stringify(merged));
        } else {
          setContacts(parsed);
        }
      } catch (e) {
        setContacts(INITIAL_CONTACTS);
        localStorage.setItem('shariatpur_helpdesk_contacts', JSON.stringify(INITIAL_CONTACTS));
      }
    } else {
      setContacts(INITIAL_CONTACTS);
      localStorage.setItem('shariatpur_helpdesk_contacts', JSON.stringify(INITIAL_CONTACTS));
    }

    // Monitor real connection status
    const handleOnline = () => setIsRealOnline(true);
    const handleOffline = () => {
      setIsRealOnline(false);
      setIsOffline(true); // Automatically trigger offline mode for safety
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update localStorage when contacts state changes
  const updateContactsInCache = (updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
    localStorage.setItem('shariatpur_helpdesk_contacts', JSON.stringify(updatedContacts));
  };

  // Add listing
  const handleAddContact = (newListing: {
    name: string;
    category: CategoryId;
    phoneNumber: string;
    upazila: Exclude<Upazila, 'All'>;
    location: string;
    details?: string;
  }) => {
    const contactToAdd: Contact = {
      id: `user_${Date.now()}`,
      ...newListing,
      verified: true, // Auto-verified for the user's local instance
    };
    const updated = [contactToAdd, ...contacts];
    updateContactsInCache(updated);
  };

  // Delete/Remove custom listing
  const handleDeleteContact = (id: string) => {
    const filtered = contacts.filter((c) => c.id !== id);
    updateContactsInCache(filtered);
  };

  // Reset contacts to initial seed data
  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to restore the directory to default listings? This will clear your custom suggestions.')) {
      updateContactsInCache(INITIAL_CONTACTS);
    }
  };

  // Trigger Dialing (Call simulation & standard anchor tel:)
  const handleCallAction = (contact: Contact) => {
    setActiveCallContact(contact);
  };

  // Filtered Contacts List logic
  const filteredContacts = contacts.filter((c) => {
    // 1. Offline Mode: Basic caching - show emergency numbers (Police, Fire, Ambulance)
    if (isOffline) {
      const isEmergencyCat = c.category === 'police' || c.category === 'fire_service' || c.category === 'ambulance';
      if (!isEmergencyCat && !c.isEmergency) {
        return false;
      }
    }

    // 2. Upazila Filter (National Emergency Hotlines apply to all upazilas)
    if (selectedUpazila !== 'All' && c.upazila !== selectedUpazila && c.category !== 'hotlines') {
      return false;
    }

    // 3. Category Filter
    if (selectedCategory !== 'All' && c.category !== selectedCategory) {
      return false;
    }

    // 3.5. Hospital Sub-category Filter
    if (selectedCategory === 'hospitals' && hospitalSubCategory !== 'All') {
      const isGov = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(c.id);
      if (hospitalSubCategory === 'Government' && !isGov) {
        return false;
      }
      if (hospitalSubCategory === 'PrivateSadar' && (isGov || c.upazila !== 'Sadar')) {
        return false;
      }
      if (hospitalSubCategory === 'PrivateDamudya' && (isGov || c.upazila !== 'Damudya')) {
        return false;
      }
      if (hospitalSubCategory === 'PrivateOthers' && (isGov || (c.upazila === 'Sadar' || c.upazila === 'Damudya'))) {
        return false;
      }
    }

    // 4. Search query (Search by Service name, person details, phone, upazila, or location)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const nameMatch = c.name.toLowerCase().includes(q);
      const locMatch = c.location.toLowerCase().includes(q);
      const detailMatch = c.details?.toLowerCase().includes(q) || false;
      const phoneMatch = c.phoneNumber.includes(q);
      const upazilaNameMatch = c.upazila.toLowerCase().includes(q);
      
      return nameMatch || locMatch || detailMatch || phoneMatch || upazilaNameMatch;
    }

    return true;
  });

  const totalUserAdded = contacts.filter((c) => c.id.startsWith('user_')).length;

  const isHomePage = selectedCategory === 'All' && searchQuery.trim() === '' && selectedUpazila === 'All';

  return (
    <div className="min-h-screen bg-[#F4F7F4] text-slate-900 font-sans flex flex-col justify-between">
      
      <HeaderWidget 
        onOpenAdminHelp={() => setShowAdminHelpModal(true)} 
      />

      {/* 2. Offline Status Banner */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-rose-700 text-white px-4 py-3 text-center text-xs md:text-sm font-semibold flex items-center justify-center gap-2 shadow-inner z-50 relative border-b border-[#D4AF37] shrink-0"
          >
            <WifiOff size={16} className="animate-pulse text-amber-300" />
            <span>
              <strong>জরুরি সংযোগ বিচ্ছিন্ন (Offline Mode Active):</strong> সম্পূর্ণ অফলাইন ডাটাবেস চালু আছে। ফায়ার সার্ভিস, পুলিশ ও হাসপাতালের তথ্য নিরবচ্ছিন্নভাবে ব্রাউজ করুন।
            </span>
            <button
              id="deactivate-offline-btn"
              onClick={() => setIsOffline(false)}
              className="ml-3 bg-white/20 hover:bg-white/35 px-3 py-1 rounded text-[11px] uppercase tracking-wider font-bold font-mono transition-all border border-white/30"
            >
              Go Online
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 w-full flex-1 flex flex-col gap-4 animate-fade-in">
        
        {/* 3. Header Section (Styled as highly official District Administration Block) */}
        <header className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 bg-white p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border-2 border-slate-200 shadow-xs relative overflow-hidden shrink-0">
          {/* Top subtle green accent strip on the card itself */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#006A4E] via-[#D4AF37] to-[#006A4E]" />

          <div className="flex items-center justify-between w-full lg:w-auto gap-2.5 sm:gap-3.5">
            <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
              {/* Official Shariatpur Government Portal Seal */}
              <div className="flex-shrink-0">
                <ShariatpurGovSeal className="w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22" />
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex flex-col">
                  <h1 className="text-base sm:text-xl md:text-2xl font-display font-black tracking-tight text-slate-900 leading-tight whitespace-nowrap">
                    শরীয়তপুর <span className="text-[#006A4E]">নাগরিক সেবা</span>
                  </h1>
                </div>
                <p className="text-slate-700 text-[11px] sm:text-xs font-bold leading-tight mt-0.5">
                  সব সেবা, সব তথ্য, এক প্ল্যাটফর্ম।
                </p>
                <p className="text-slate-400 text-[9px] sm:text-[10px] md:text-[11px] font-medium leading-tight">
                  Shariatpur Citizen Services
                </p>
              </div>
            </div>

            {/* Hamburger Button (☰) */}
            <button
              id="hamburger-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 hover:bg-slate-100 active:bg-slate-200 rounded-xl text-slate-700 transition-colors cursor-pointer border border-slate-200 flex items-center justify-center flex-shrink-0"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          
          {/* Main Search Bar integrated inside header bento */}
          <div className="flex-1 w-full lg:max-w-xl">
            <div className="relative">
              <input
                id="main-search-bar"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isListening ? "কথা বলুন... (বাংলায় অনুসন্ধান চালু আছে)" : "জরুরি সেবা, ডাক্তার, লঞ্চ, রক্তের গ্রুপ অথবা এলাকা খুঁজুন..."}
                className={`w-full border-2 rounded-2xl py-3.5 pl-12 ${searchQuery ? 'pr-20' : 'pr-12'} text-sm font-sans font-medium transition-all outline-none text-slate-900 shadow-inner ${
                  isListening
                    ? 'bg-rose-50/90 border-rose-500 ring-4 ring-rose-200 placeholder-rose-700 font-bold'
                    : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-[#006A4E] focus:border-[#006A4E] focus:bg-white placeholder-slate-400'
                }`}
              />
              <div className="absolute left-4 top-3.5 text-slate-400">
                <Search size={18} className={isListening ? 'text-rose-600 animate-bounce' : 'text-[#006A4E]'} />
              </div>

              <div className="absolute right-2.5 top-2 flex items-center gap-1.5">
                {searchQuery && (
                  <button
                    id="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer rounded-lg hover:bg-slate-200/60"
                    title="মুছে ফেলুন"
                  >
                    <X size={16} />
                  </button>
                )}

                {/* Voice Search Microphone Button */}
                <button
                  id="voice-search-btn"
                  type="button"
                  onClick={toggleVoiceSearch}
                  className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer relative group ${
                    isListening
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/50 animate-pulse scale-105'
                      : 'bg-emerald-50 text-[#006A4E] hover:bg-[#006A4E] hover:text-white border border-emerald-200/80 shadow-2xs'
                  }`}
                  title={isListening ? "ভয়েস সার্চ বন্ধ করতে ক্লিক করুন" : "ভয়েস অনুসন্ধান (কথা বলে খুঁজুন)"}
                >
                  {isListening ? (
                    <MicOff size={18} className="animate-spin text-white" />
                  ) : (
                    <Mic size={18} />
                  )}

                  {/* Pulse ring indicator */}
                  {isListening && (
                    <span className="absolute -inset-1 rounded-xl bg-rose-500/40 animate-ping -z-10" />
                  )}
                </button>
              </div>
            </div>

            {/* Listening Live Status and Language Switcher */}
            {isListening && (
              <div className="mt-2 px-3 py-1.5 bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/80 rounded-xl text-xs font-bold text-rose-900 flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                  </span>
                  <span>🎙️ কথা বলুন... ({speechLang === 'bn-BD' ? 'বাংলা অনুসন্ধান' : 'English Search'})</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newLang = speechLang === 'bn-BD' ? 'en-US' : 'bn-BD';
                    setSpeechLang(newLang);
                    if (isListening) {
                      if (recognitionRef.current) recognitionRef.current.stop();
                      setTimeout(toggleVoiceSearch, 250);
                    }
                  }}
                  className="bg-white border border-rose-300 text-rose-900 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider hover:bg-rose-100 transition-colors shadow-2xs cursor-pointer"
                >
                  {speechLang === 'bn-BD' ? '🌐 Switch to English' : '🌐 বাংলায় পরিবর্তন করুন'}
                </button>
              </div>
            )}

            {/* Speech error toast */}
            {speechError && (
              <div className="mt-2 px-3 py-1.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-semibold flex items-center justify-between shadow-2xs">
                <span>⚠️ {speechError}</span>
                <button onClick={() => setSpeechError(null)} className="text-amber-950 font-black text-[11px] underline ml-2 cursor-pointer">
                  ঠিক আছে
                </button>
              </div>
            )}

            {/* Quick Links Menu directly under the search bar */}
            <div className="mt-2.5 px-1 text-[11px] font-bold text-slate-500 w-full overflow-hidden">
              <HorizontalSliderBar
                badgeLabel={
                  <span className="text-slate-400 font-semibold flex items-center gap-1 mr-2 flex-shrink-0">
                    <Sparkles size={11} className="text-[#006A4E] animate-pulse" />
                    মেনু শর্টকাট:
                  </span>
                }
                bgFadeColor="from-slate-50"
              >
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'All'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  সব সেবা (All)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('blog');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'blog'
                      ? 'bg-amber-500 text-slate-950 font-black border-amber-500'
                      : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900 font-extrabold'
                  }`}
                >
                  ✍️ জেলা ব্লগ (Blog)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('police');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'police'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  পুলিশ (Police)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('fire_service');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'fire_service'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  ফায়ার সার্ভিস (Fire)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('hospitals');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'hospitals'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  হাসপাতাল (Hospitals)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('pharmacies');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'pharmacies'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  ফার্মেসী (Pharmacies)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('ambulance');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'ambulance'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  অ্যাম্বুলেন্স (Ambulance)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('blood_donors');
                    setIsOpen(true);
                  }}
                  className="transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border bg-slate-50 hover:bg-rose-50 hover:text-rose-600 border-slate-200 flex-shrink-0"
                >
                  রক্তের গ্রুপ (Blood)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('transportation');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'transportation'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  লঞ্চ ও বাস (Transport)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('gov_offices');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'gov_offices'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  সরকারি দপ্তর (Gov)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('hotlines');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'hotlines'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700'
                  }`}
                >
                  জরুরি হটলাইন (999/333)
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('agriculture');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'agriculture'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-lime-50 hover:bg-lime-100 border-lime-200 text-lime-800'
                  }`}
                >
                  কৃষি ও প্রাণিসম্পদ
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('union_parishad');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'union_parishad'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-800'
                  }`}
                >
                  ইউনিয়ন ও ডিজিটাল সেন্টার
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('passport_land');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'passport_land'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800'
                  }`}
                >
                  পাসপোর্ট, এনআইডি ও ভূমি
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('home_nursing');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'home_nursing'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-800'
                  }`}
                >
                  হোম নার্সিং ও অক্সিজেন
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('courier');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'courier'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800'
                  }`}
                >
                  কুরিয়ার সার্ভিস
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('education');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'education'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200 text-cyan-800'
                  }`}
                >
                  শিক্ষা প্রতিষ্ঠান
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('banks');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'banks'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                  }`}
                >
                  ব্যাংক ও এটিএম
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('legal_help');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'legal_help'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900'
                  }`}
                >
                  আইনজীবী ও আইনি সেবা
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('journalists');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'journalists'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-800'
                  }`}
                >
                  প্রেস ক্লাব ও সাংবাদিক
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('hotels_tourism');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'hotels_tourism'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-800'
                  }`}
                >
                  হোটেল ও পর্যটন
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('mechanics');
                    setSearchQuery('');
                  }}
                  className={`transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border flex-shrink-0 ${
                    selectedCategory === 'mechanics'
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-800'
                  }`}
                >
                  মেকানিক (Mechanics)
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  className="transition-all cursor-pointer px-2.5 py-0.5 rounded-lg border bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 flex-shrink-0"
                >
                  নতুন তথ্য +
                </button>
              </HorizontalSliderBar>
            </div>
          </div>

          {/* Upazila Select Menu in Header */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            <div className="text-right hidden xl:block">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">নির্বাচন করুন</div>
              <p className="text-xs text-[#006A4E] font-extrabold">শরীয়তপুর জেলা</p>
            </div>
            <select
              id="header-select-upazila"
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value as Upazila)}
              className="bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-xs md:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#006A4E] text-slate-800 cursor-pointer w-full lg:w-auto shadow-xs"
            >
              {UPAZILAS.map((up) => (
                <option key={up} value={up}>
                  {up === 'All' ? 'সকল উপজেলা (All)' : `${up} উপজেলা`}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* 4. Scrollable Marquee Notice Board (চলমান নোটিশ বাতায়ন - Real-Time Public Announcements) */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200/90 py-2 px-3 sm:px-4 flex items-center gap-2.5 sm:gap-3 overflow-hidden text-slate-800 text-xs md:text-sm shadow-xs rounded-2xl shrink-0">
          <div className="bg-[#f42a41] text-white px-2.5 py-1 rounded-xl text-xs font-black flex-shrink-0 animate-pulse tracking-wide flex items-center gap-1.5 border border-red-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>লাইভ নোটিশ:</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="animate-marquee whitespace-nowrap inline-block font-bold text-[#006A4E]">
              {notices.map((notice, idx) => (
                <span key={notice.id || idx} className="inline-flex items-center gap-2 mr-10">
                  {notice.category && (
                    <span className="bg-[#006A4E] text-white text-[10px] px-2 py-0.5 rounded-md font-extrabold shadow-2xs">
                      {notice.category}
                    </span>
                  )}
                  <span className="text-slate-900 font-extrabold">{notice.title}:</span>
                  <span className="text-[#006A4E]">{notice.text}</span>
                  {notice.date && <span className="text-amber-800 text-[11px] font-mono bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-200">({notice.date})</span>}
                  <span className="text-amber-500 font-black ml-4">●</span>
                </span>
              ))}
            </div>
          </div>

          {/* Real-time Notice Refresh Button */}
          <button
            onClick={fetchPublicNotices}
            disabled={isNoticeLoading}
            className="flex-shrink-0 p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-all active:scale-95 cursor-pointer flex items-center gap-1 text-[11px] font-bold"
            title="লাইভ নোটিশ আপডেট ও রিফ্রেশ করুন"
          >
            <RefreshCw size={13} className={`text-amber-800 ${isNoticeLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">রিফ্রেশ</span>
          </button>
        </div>

        {/* 5. Upazila Quick Switch horizontal tabs (Bento-like selector with Gov flag colors) */}
        <section className="bg-white border-2 border-slate-200 p-2.5 sm:p-3 rounded-2xl shadow-xs flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 shrink-0">
          <div className="w-full flex-1 min-w-0 overflow-hidden">
            <HorizontalSliderBar
              badgeLabel={
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex-shrink-0">
                  উপজেলা ফিল্টার:
                </span>
              }
              bgFadeColor="from-white"
            >
              {UPAZILAS.map((up) => (
                <button
                  id={`upazila-tab-btn-${up}`}
                  key={up}
                  onClick={() => setSelectedUpazila(up)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border flex-shrink-0
                    ${
                      selectedUpazila === up
                        ? 'bg-[#006A4E] border-[#006A4E] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                    }
                  `}
                >
                  {up === 'All' ? 'সমগ্র শরীয়তপুর জেলা' : `${up} উপজেলা`}
                </button>
              ))}
            </HorizontalSliderBar>
          </div>
        </section>

        {/* Official Government Portal Layout Centerpiece */}
        {isHomePage && (
          <GovernmentPortalHome
            onSelectCategory={(catId) => {
              setSelectedCategory(catId as CategoryId);
              setSearchQuery('');
            }}
            onCallContact={handleCallAction}
            onOpenSuggestModal={() => setIsModalOpen(true)}
            onOpenMedicalDirectory={() => setShowMedicalDirectory(true)}
          />
        )}

        {/* District Emergency & Service Directory Quick Launcher */}
        {isHomePage && (
          <section className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#006A4E] bg-[#006A4E]/10 px-3 py-1 rounded-full border border-[#006A4E]/20">
                  ডিরেক্টরি ক্যাটাগরি অনুসন্ধান
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-850 mt-1.5 flex items-center gap-2">
                  <span>📱</span> শরীয়তপুর জেলা জরুরি কন্টাক্ট ডিরেক্টরি
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  যেকোনো ক্যাটাগরিতে ক্লিক করে জরুরি নম্বর, ঠিকানা এবং ম্যাপ লোকেশন দ্রুত খুঁজে নিন।
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowMedicalDirectory(true)}
                  className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-black transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>🏥</span> মেডিকেল ডিরেক্টরি
                </button>
                <button
                  onClick={() => setShowGovServicesModal(true)}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#006A4E] to-[#00523C] hover:from-[#00523C] hover:to-[#003B2B] text-white rounded-xl text-xs font-black transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 border border-emerald-400/30"
                >
                  <span>🏛️</span> জরুরি নাগরিক ই-সেবা ও পোর্টাল লিংক
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('hotlines');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-black transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>📋</span> সকল পরিচিতি দেখুন (Directory)
                </button>
              </div>
            </div>

            {/* Category Launcher Grid - Styled to match screenshot with Toggle expansion */}
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 transition-all duration-300 ${
              isCategoriesExpanded ? 'max-h-[38vh] sm:max-h-[44vh] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-emerald-600/30 rounded-2xl p-0.5' : ''
            }`}>
              {(isCategoriesExpanded ? CATEGORIES : CATEGORIES.slice(0, 5)).map((cat) => {
                const count = contacts.filter((c) => c.category === cat.id).length;

                // Color palette mapping to match provided screenshot design
                let colorClass = "bg-slate-50/90 border-slate-200 text-slate-800 hover:border-[#006A4E]";
                let badgeClass = "bg-slate-200/80 text-slate-700";

                if (cat.id === 'police') {
                  colorClass = "bg-sky-50/90 border-sky-200/90 text-sky-900 hover:border-[#006A4E]";
                  badgeClass = "bg-sky-200/80 text-sky-800";
                } else if (cat.id === 'fire_service') {
                  colorClass = "bg-rose-50/90 border-rose-200/90 text-rose-900 hover:border-[#006A4E]";
                  badgeClass = "bg-rose-200/80 text-rose-800";
                } else if (cat.id === 'ambulance') {
                  colorClass = "bg-emerald-50/90 border-emerald-200/90 text-emerald-900 hover:border-[#006A4E]";
                  badgeClass = "bg-emerald-200/80 text-emerald-800";
                } else if (cat.id === 'hospitals') {
                  colorClass = "bg-indigo-50/90 border-indigo-200/90 text-indigo-900 hover:border-[#006A4E]";
                  badgeClass = "bg-indigo-200/80 text-indigo-800";
                } else if (cat.id === 'blood_donors') {
                  colorClass = "bg-pink-50/90 border-pink-200/90 text-pink-900 hover:border-[#006A4E]";
                  badgeClass = "bg-pink-200/80 text-pink-800";
                } else if (cat.id === 'pharmacies') {
                  colorClass = "bg-teal-50/90 border-teal-200/90 text-teal-900 hover:border-[#006A4E]";
                  badgeClass = "bg-teal-200/80 text-teal-800";
                } else if (cat.id === 'transportation') {
                  colorClass = "bg-amber-50/90 border-amber-200/90 text-amber-900 hover:border-[#006A4E]";
                  badgeClass = "bg-amber-200/80 text-amber-800";
                } else if (cat.id === 'gov_offices') {
                  colorClass = "bg-slate-100/90 border-slate-300/90 text-slate-900 hover:border-[#006A4E]";
                  badgeClass = "bg-slate-300/80 text-slate-800";
                } else if (cat.id === 'hotlines') {
                  colorClass = "bg-red-50/90 border-red-200/90 text-red-900 hover:border-[#006A4E]";
                  badgeClass = "bg-red-200/80 text-red-800";
                } else if (cat.id === 'education') {
                  colorClass = "bg-cyan-50/90 border-cyan-200/90 text-cyan-900 hover:border-[#006A4E]";
                  badgeClass = "bg-cyan-200/80 text-cyan-800";
                }

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchQuery('');
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:shadow-md ${colorClass}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-2.5xl transform group-hover:scale-110 transition-transform">
                          {cat.icon === 'PhoneCall' && '🚨'}
                          {cat.icon === 'Shield' && '👮'}
                          {cat.icon === 'Flame' && '🚒'}
                          {cat.icon === 'Ambulance' && '🚑'}
                          {cat.icon === 'Hospital' && '🏥'}
                          {cat.icon === 'HeartPulse' && '🏥'}
                          {cat.icon === 'Droplet' && '🩸'}
                          {cat.icon === 'Pill' && '💊'}
                          {cat.icon === 'Bus' && '🚌'}
                          {cat.icon === 'Building' && '🏛️'}
                          {cat.icon === 'Building2' && '🏛️'}
                          {cat.icon === 'Wrench' && '🔧'}
                          {cat.icon === 'GraduationCap' && '🎓'}
                          {cat.icon === 'Landmark' && '🏦'}
                          {cat.icon === 'Scale' && '⚖️'}
                          {cat.icon === 'Newspaper' && '📰'}
                          {cat.icon === 'Compass' && '🏰'}
                          {cat.icon === 'Sprout' && '🌾'}
                          {cat.icon === 'Home' && '🏡'}
                          {cat.icon === 'FileText' && '📄'}
                          {cat.icon === 'Heart' && '🩺'}
                          {cat.icon === 'Truck' && '📦'}
                        </span>
                        <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
                          {count} টি
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs leading-snug line-clamp-1 group-hover:text-[#006A4E] transition-colors">
                        {cat.name}
                      </h4>
                    </div>
                    <span className="text-[11px] font-black text-slate-500 mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span>খুঁজুন</span>
                      <span className="group-hover:translate-x-1.5 transition-transform text-[#006A4E] font-bold">➔</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Category Toggle Control Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                className="px-6 py-2.5 bg-gradient-to-r from-[#006A4E]/10 via-emerald-50 to-[#006A4E]/10 hover:from-[#006A4E] hover:to-[#00523C] text-[#006A4E] hover:text-white border-2 border-[#006A4E]/40 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer active:scale-95 group"
              >
                <span>
                  {isCategoriesExpanded
                    ? 'ক্যাটাগরি গুটিয়ে নিন (Show Less)'
                    : `আরও ক্যাটাগরি দেখুন (আরও ${CATEGORIES.length - 5} টি)`}
                </span>
                {isCategoriesExpanded ? (
                  <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
            </div>
          </section>
        )}

        {/* 6. Dual-Column Government Portal Layout (জেলা প্রশাসন ডাবল কলাম বাতায়ন) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Permanent Desktop Navigation Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs space-y-4 relative overflow-hidden">
            {/* Top gold sub-accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37]" />
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2.5">
              মেনু আইটেম / NAVIGATION
            </div>
            
            <nav className="space-y-2">
              {/* Home */}
              <button
                onClick={() => {
                  setSelectedUpazila('All');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
                  ${selectedCategory === 'All'
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700'
                  }`}
              >
                <Home size={16} className={selectedCategory === 'All' ? 'text-white' : 'text-[#006A4E]'} />
                <span>হোম (Home Portal)</span>
              </button>

              {/* District Blog & Citizen Forum */}
              <button
                onClick={() => {
                  setSelectedCategory('blog');
                  setSearchQuery('');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black transition-all text-left cursor-pointer border
                  ${selectedCategory === 'blog'
                    ? 'bg-[#006A4E] text-white border-[#006A4E] shadow-xs'
                    : 'bg-gradient-to-r from-amber-50 to-emerald-50 hover:from-amber-100 hover:to-emerald-100 text-[#006A4E] border-amber-200'
                  }`}
              >
                <span className="flex items-center gap-2.5">
                  <PenTool size={16} className={selectedCategory === 'blog' ? 'text-white' : 'text-[#006A4E]'} />
                  <span>জেলা ব্লগ ও নাগরিক বার্তা</span>
                </span>
                <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wide">নতুন</span>
              </button>

              {/* 🩺 চিকিৎসা ও স্বাস্থ্য সেবা Dropdown */}
              <div className="border border-slate-100 rounded-2xl p-1 bg-slate-50/40">
                <button
                  type="button"
                  onClick={() => setIsMedicalDropdownOpen(!isMedicalDropdownOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
                    ${isMedicalActive
                      ? 'bg-emerald-50 text-[#006A4E]'
                      : 'hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  <span className="flex items-center gap-2.5">
                    <HeartPulse size={16} className={isMedicalActive ? 'text-[#006A4E]' : 'text-slate-500'} />
                    <span>চিকিৎসা ও স্বাস্থ্য সেবা</span>
                  </span>
                  {isMedicalDropdownOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                </button>

                {isMedicalDropdownOpen && (
                  <div className="mt-1 pl-3.5 ml-2.5 border-l border-slate-200/80 space-y-1 py-1">
                    {/* Hospitals */}
                    <button
                      onClick={() => {
                        setSelectedCategory('hospitals');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'hospitals'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <span>🏥</span>
                      <span>হাসপাতাল সমূহ (Hospitals)</span>
                    </button>

                    {/* Shariatpur Medical Directory */}
                    <button
                      id="shariatpur-medical-directory-btn"
                      onClick={() => setShowMedicalDirectory(true)}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer hover:bg-slate-100/80 text-indigo-950"
                    >
                      <span className="flex items-center gap-2">
                        <span>📋</span>
                        <span>মেডিকেল ডিরেক্টরি (৩২টি)</span>
                      </span>
                      <span className="text-[8px] bg-pink-500 text-white px-1 py-0.2 rounded-sm font-extrabold scale-90">নতুন</span>
                    </button>

                    {/* Pharmacies */}
                    <button
                      onClick={() => {
                        setSelectedCategory('pharmacies');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'pharmacies'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Pill size={13} className="text-teal-600" />
                      <span>২৪ ঘণ্টা ফার্মেসী (Pharmacies)</span>
                    </button>

                    {/* Ambulance */}
                    <button
                      onClick={() => {
                        setSelectedCategory('ambulance');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'ambulance'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <HeartPulse size={13} className="text-emerald-600" />
                      <span>অ্যাম্বুলেন্স (Ambulance)</span>
                    </button>

                    {/* Blood Donors */}
                    <button
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer hover:bg-slate-100/80 text-slate-600"
                    >
                      <Droplet size={13} className="text-rose-500" />
                      <span>রক্তের গ্রুপ ও দাতা (Blood)</span>
                    </button>

                    {/* Home Nursing & Oxygen */}
                    <button
                      onClick={() => {
                        setSelectedCategory('home_nursing');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'home_nursing'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Stethoscope size={13} className="text-rose-600" />
                      <span>হোম কেয়ার, অক্সিজেন ও নার্স</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 🛠️ জরুরি ও সরকারি দপ্তর Dropdown */}
              <div className="border border-slate-100 rounded-2xl p-1 bg-slate-50/40">
                <button
                  type="button"
                  onClick={() => setIsEmergencyDropdownOpen(!isEmergencyDropdownOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
                    ${isEmergencyActive
                      ? 'bg-emerald-50 text-[#006A4E]'
                      : 'hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Shield size={16} className={isEmergencyActive ? 'text-[#006A4E]' : 'text-slate-500'} />
                    <span>জরুরি ও সরকারি দপ্তর</span>
                  </span>
                  {isEmergencyDropdownOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                </button>

                {isEmergencyDropdownOpen && (
                  <div className="mt-1 pl-3.5 ml-2.5 border-l border-slate-200/80 space-y-1 py-1">
                    {/* Emergency Police */}
                    <button
                      onClick={() => {
                        setSelectedCategory('police');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'police'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <AlertTriangle size={13} className="text-rose-600" />
                      <span>জরুরি পুলিশ (Police)</span>
                    </button>

                    {/* Fire */}
                    <button
                      onClick={() => {
                        setSelectedCategory('fire_service');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'fire_service'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Flame size={13} className="text-orange-500" />
                      <span>ফায়ার সার্ভিস (Fire)</span>
                    </button>

                    {/* Bus/Launch */}
                    <button
                      onClick={() => {
                        setSelectedCategory('transportation');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'transportation'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Bus size={13} className="text-amber-600" />
                      <span>পরিবহন ও টিকিট (Transport)</span>
                    </button>

                    {/* Gov Offices */}
                    <button
                      onClick={() => {
                        setSelectedCategory('gov_offices');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'gov_offices'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Building size={13} className="text-slate-500" />
                      <span>সরকারি ও বিদ্যুৎ (Gov Offices)</span>
                    </button>

                    {/* Mechanics */}
                    <button
                      onClick={() => {
                        setSelectedCategory('mechanics');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'mechanics'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Wrench size={13} className="text-indigo-600" />
                      <span>জরুরি মেকানিক (Mechanics)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 🎓 শিক্ষা, কৃষি ও নাগরিক সেবা Dropdown */}
              <div className="border border-slate-100 rounded-2xl p-1 bg-slate-50/40">
                <button
                  type="button"
                  onClick={() => setIsEducationBanksDropdownOpen(!isEducationBanksDropdownOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
                    ${isEducationBanksActive
                      ? 'bg-emerald-50 text-[#006A4E]'
                      : 'hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  <span className="flex items-center gap-2.5">
                    <GraduationCap size={16} className={isEducationBanksActive ? 'text-[#006A4E]' : 'text-slate-500'} />
                    <span>শিক্ষা, কৃষি ও নাগরিক সেবা</span>
                  </span>
                  {isEducationBanksDropdownOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                </button>

                {isEducationBanksDropdownOpen && (
                  <div className="mt-1 pl-3.5 ml-2.5 border-l border-slate-200/80 space-y-1 py-1">
                    {/* Agriculture */}
                    <button
                      onClick={() => {
                        setSelectedCategory('agriculture');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'agriculture'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Sprout size={13} className="text-lime-600" />
                      <span>কৃষি ও প্রাণিসম্পদ</span>
                    </button>

                    {/* Union & Digital Center */}
                    <button
                      onClick={() => {
                        setSelectedCategory('union_parishad');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'union_parishad'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Landmark size={13} className="text-teal-600" />
                      <span>ইউনিয়ন ও ডিজিটাল সেন্টার</span>
                    </button>

                    {/* Passport, NID & Land */}
                    <button
                      onClick={() => {
                        setSelectedCategory('passport_land');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'passport_land'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <FileText size={13} className="text-blue-600" />
                      <span>পাসপোর্ট, এনআইডি ও ভূমি</span>
                    </button>

                    {/* Education */}
                    <button
                      onClick={() => {
                        setSelectedCategory('education');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'education'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <GraduationCap size={13} className="text-cyan-600" />
                      <span>শিক্ষা প্রতিষ্ঠান ও কলেজ</span>
                    </button>

                    {/* Banks */}
                    <button
                      onClick={() => {
                        setSelectedCategory('banks');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'banks'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Landmark size={13} className="text-emerald-700" />
                      <span>ব্যাংক ও এটিএম বুথ</span>
                    </button>
                  </div>
                )}
              </div>

              {/* ⚖️ আইন, মিডিয়া, কুরিয়ার ও পর্যটন Dropdown */}
              <div className="border border-slate-100 rounded-2xl p-1 bg-slate-50/40">
                <button
                  type="button"
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
                    ${isServicesActive
                      ? 'bg-emerald-50 text-[#006A4E]'
                      : 'hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Scale size={16} className={isServicesActive ? 'text-[#006A4E]' : 'text-slate-500'} />
                    <span>আইন, মিডিয়া, কুরিয়ার ও পর্যটন</span>
                  </span>
                  {isServicesDropdownOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                </button>

                {isServicesDropdownOpen && (
                  <div className="mt-1 pl-3.5 ml-2.5 border-l border-slate-200/80 space-y-1 py-1">
                    {/* Legal Help */}
                    <button
                      onClick={() => {
                        setSelectedCategory('legal_help');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'legal_help'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Scale size={13} className="text-amber-700" />
                      <span>আইনজীবী ও লিগ্যাল এইড</span>
                    </button>

                    {/* Journalists */}
                    <button
                      onClick={() => {
                        setSelectedCategory('journalists');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'journalists'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Newspaper size={13} className="text-purple-600" />
                      <span>প্রেস ক্লাব ও সাংবাদিক</span>
                    </button>

                    {/* Hotels & Tourism */}
                    <button
                      onClick={() => {
                        setSelectedCategory('hotels_tourism');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'hotels_tourism'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Compass size={13} className="text-orange-600" />
                      <span>হোটেল, সার্কিট হাউজ ও পর্যটন</span>
                    </button>

                    {/* Courier */}
                    <button
                      onClick={() => {
                        setSelectedCategory('courier');
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                        ${selectedCategory === 'courier'
                          ? 'bg-[#006A4E]/10 text-[#006A4E]'
                          : 'hover:bg-slate-100/80 text-slate-600'
                        }`}
                    >
                      <Truck size={13} className="text-amber-600" />
                      <span>কুরিয়ার ও পার্সেল সার্ভিস</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 🏛️ জরুরি নাগরিক ই-সেবা ও পোর্টাল লিংক */}
              <button
                onClick={() => setShowGovServicesModal(true)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black transition-all text-left cursor-pointer border mt-2 bg-gradient-to-r from-emerald-800 to-[#006A4E] text-white hover:from-emerald-900 hover:to-[#00523C] border-emerald-700/50 shadow-xs mb-2"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">🏛️</span>
                  <span>নাগরিক ই-সেবা ও পোর্টাল</span>
                </span>
                <span className="text-[9px] bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wide">ই-সেবা</span>
              </button>

              {/* Suggest Listing */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#006A4E] font-bold text-xs transition-colors text-left border border-emerald-100 cursor-pointer animate-pulse"
              >
                <Plus size={16} className="text-[#006A4E]" />
                <span>নতুন তথ্য যুক্ত করুন (Suggest Info)</span>
              </button>

              {/* 🚨 জাতীয় জরুরি হটলাইন (National Emergency Hotlines - 24/7) */}
              <button
                onClick={() => {
                  setSelectedCategory('hotlines');
                  setSearchQuery('');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black transition-all text-left cursor-pointer border mt-2
                  ${selectedCategory === 'hotlines'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-gradient-to-r from-rose-50 to-orange-50 hover:from-rose-100 hover:to-orange-100 text-rose-800 border-rose-200'
                  }`}
              >
                <span className="flex items-center gap-2.5">
                  <PhoneCall size={16} className={selectedCategory === 'hotlines' ? 'text-white' : 'text-rose-600 animate-bounce'} />
                  <span>জরুরি হটলাইন (Hotlines 999)</span>
                </span>
                <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wide">২৪/৭</span>
              </button>
            </nav>
          </aside>

          {/* Left Column & Right Column OR Full Blog View */}
          {selectedCategory === 'blog' ? (
            <div className="lg:col-span-9 col-span-1">
              <DistrictBlogSection
                posts={blogPosts}
                onAddPost={handleAddBlogPost}
                onLikePost={handleLikeBlogPost}
                onAddComment={handleAddBlogComment}
              />
            </div>
          ) : (
            <>
              {/* Left Column: Directory Listings and Database (৬ কলাম বিশিষ্ট প্রধান ডাটাবেস) OR Welcome Portal on Home */}
              {isHomePage ? (
            <section className="lg:col-span-6 xl:col-span-6 bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#006A4E] to-[#D4AF37]" />
              
              <div className="text-center space-y-2 pb-5 border-b border-slate-100">
                <div className="w-12 h-12 bg-emerald-50 text-[#006A4E]/90 rounded-full flex items-center justify-center text-xl mx-auto border border-emerald-200">
                  🏛️
                </div>
                <h3 className="font-sans font-black text-lg md:text-xl text-slate-800 leading-tight">
                  ডিজিটাল সিটিজেন হেল্প ডেস্ক পোর্টালে স্বাগতম
                </h3>
                <p className="text-slate-500 text-xs font-semibold">
                  শরীয়তপুর জেলা প্রশাসনের তত্ত্ববধানে ভেরিফাইড যোগাযোগের নম্বর বাতায়ন
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                  নাগরিকদের জরুরি সেবাপ্রাপ্তি সহজ ও দ্রুততর করতে শরীয়তপুর জেলা তথ্য বাতায়ন পোর্টাল প্রস্তুত করা হয়েছে। আপনার কাঙ্ক্ষিত জরুরি নম্বরটি খুঁজে পেতে নিচের নির্দেশনাসমূহ অনুসরণ করুন:
                </p>

                <div className="grid grid-cols-1 gap-3.5">
                  <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-150">
                    <div className="w-7 h-7 bg-[#006A4E]/10 text-[#006A4E] rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0">
                      ১
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">ক্যাটাগরি ভিত্তিক অনুসন্ধান</h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5 leading-relaxed">
                        বাম পাশের "মেনু আইটেম / NAVIGATION" থেকে আপনার প্রয়োজনীয় বিভাগটি (যেমন: পুলিশ, ফায়ার সার্ভিস, হাসপাতাল, অ্যাম্বুলেন্স) নির্বাচন করুন।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-150">
                    <div className="w-7 h-7 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 border border-amber-200/50">
                      ২
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">সরাসরি সার্চ করুন</h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5 leading-relaxed">
                        যেকোনো সেবাদাতা, কর্মকর্তা, বা হাসপাতালের নাম সরাসরি খুঁজে পেতে উপরের মূল সার্চ বারে ইংরেজি বা বাংলায় টাইপ করুন।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-150">
                    <div className="w-7 h-7 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 border border-blue-200/50">
                      ৩
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">অফলাইন সুবিধা</h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5 leading-relaxed">
                        ইন্টারনেট সংযোগ না থাকলেও এই পোর্টালের অফলাইন মোড ব্যবহার করে আপনি সকল জরুরি ডিরেক্টরি এবং যোগাযোগের নম্বরসমূহ ব্রাউজ করতে পারবেন।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#006A4E]/5 p-4 rounded-2xl border border-[#006A4E]/10 flex items-start gap-3">
                <span className="text-lg leading-none mt-0.5">💡</span>
                <p className="text-[11px] text-[#006A4E] font-black leading-relaxed">
                  জরুরি যেকোনো সহায়তা পেতে ৯৯৯ অথবা সরকারি তথ্যের জন্য ৩৩৩ নম্বরে সরাসরি কল করুন। এই বাতায়নের সকল নম্বর জেলা প্রশাসন কর্তৃক ম্যানুয়ালি যাচাইকৃত।
                </p>
              </div>
            </section>
          ) : (
            <section className="lg:col-span-6 xl:col-span-6 bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 relative overflow-hidden">
              {/* Aesthetic top green sub-accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#006A4E]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h3 className="font-sans font-black text-lg md:text-xl text-slate-800 flex items-center gap-2">
                  <Grid size={22} className="text-[#006A4E]" />
                  জরুরি তথ্য সহায়িকা ডাটাবেস (Help Desk Directory)
                </h3>
                <p className="text-slate-500 text-xs mt-1 font-semibold">
                  জেলা প্রশাসনের মাধ্যমে ভেরিফাইডকৃত সকল জরুরি সেবাদাতা, কর্মকর্তা ও স্বেচ্ছাসেবকদের যোগাযোগের নম্বর।
                </p>
              </div>

              {/* View Mode & Table Toggle Controllers */}
              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide hidden sm:inline">ভিউ মোড:</span>
                <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
                  <button
                    id="toggle-view-grid-btn"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer
                      ${
                        viewMode === 'grid'
                          ? 'bg-white text-[#006A4E] shadow-xs'
                          : 'text-slate-500 hover:text-slate-850'
                      }
                    `}
                  >
                    <Grid size={13} />
                    <span>গ্রিড ভিউ</span>
                  </button>
                  <button
                    id="toggle-view-table-btn"
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer
                      ${
                        viewMode === 'table'
                          ? 'bg-white text-[#006A4E] shadow-xs'
                          : 'text-slate-500 hover:text-slate-850'
                      }
                    `}
                  >
                    <Menu size={13} />
                    <span>টেবিল ভিউ</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Summary Ribbon */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-150 text-xs text-slate-600">
              <span className="font-black text-[#006A4E] uppercase tracking-wider">সক্রিয় ফিল্টার:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#006A4E]/10 text-[#006A4E] font-bold border border-[#006A4E]/15">
                {selectedUpazila === 'All' ? 'সমগ্র শরীয়তপুর' : `${selectedUpazila} উপজেলা`}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-850 font-bold border border-amber-200">
                {selectedCategory === 'All'
                  ? 'সকল ক্যাটাগরি'
                  : CATEGORIES.find((cat) => cat.id === selectedCategory)?.name}
              </span>
              {searchQuery && (
                <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-800 font-bold border border-rose-200">
                  অনুসন্ধান: "{searchQuery}"
                </span>
              )}
              <span className="ml-auto font-bold text-slate-450">
                মোট ফলাফল: {filteredContacts.length} টি
              </span>
            </div>

            {/* Hospital-Specific Sub-Categories Filter Bar */}
            {selectedCategory === 'hospitals' && (
              <div className="bg-emerald-50/60 p-4.5 rounded-2xl border-2 border-emerald-100 space-y-3 shadow-3xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-[#006A4E] animate-pulse" />
                  <span className="font-sans font-black text-xs md:text-sm text-[#006A4E]">
                    হাসপাতাল ও ক্লিনিক ক্যাটাগরি (Hospital & Diagnostic Directory)
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {[
                    { id: 'All', label: '🏥 সব হাসপাতাল', count: contacts.filter(c => c.category === 'hospitals').length },
                    { id: 'Government', label: '🏛️ সরকারি হাসপাতাল', count: contacts.filter(c => c.category === 'hospitals' && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(c.id)).length },
                    { id: 'PrivateSadar', label: '🏢 বেসরকারি (সদর)', count: contacts.filter(c => c.category === 'hospitals' && c.upazila === 'Sadar' && !['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(c.id)).length },
                    { id: 'PrivateDamudya', label: '🏘️ বেসরকারি (দামুড্যা)', count: contacts.filter(c => c.category === 'hospitals' && c.upazila === 'Damudya' && !['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(c.id)).length },
                    { id: 'PrivateOthers', label: '🚑 বেসরকারি (অন্যান্য)', count: contacts.filter(c => c.category === 'hospitals' && c.upazila !== 'Sadar' && c.upazila !== 'Damudya' && !['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(c.id)).length }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setHospitalSubCategory(sub.id as any)}
                      className={`px-2 py-2 rounded-xl font-black text-xs transition-all flex flex-col items-center justify-center gap-1 cursor-pointer text-center border shadow-3xs
                        ${
                          hospitalSubCategory === sub.id
                            ? 'bg-[#006A4E] text-white border-[#006A4E] scale-[1.02]'
                            : 'bg-white text-slate-750 hover:bg-slate-50 border-slate-200'
                        }
                      `}
                    >
                      <span className="truncate max-w-full">{sub.label}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-black
                        ${
                          hospitalSubCategory === sub.id
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }
                      `}>
                        {sub.count} টি
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 🚨 24/7 National Emergency Hotlines Quick Grid */}
            {(isHomePage || selectedCategory === 'hotlines') && (
              <EmergencyHotlineGrid onCall={handleCallAction} searchQuery={searchQuery} />
            )}

            {/* Directory Render Engine with Category Grouping */}
            {filteredContacts.length > 0 ? (
              <div className="space-y-12">
                {CATEGORIES.map((cat) => {
                  const catContacts = filteredContacts.filter((c) => c.category === cat.id);
                  if (catContacts.length === 0) return null;
                  if (cat.id === 'hotlines' && (isHomePage || selectedCategory === 'hotlines')) return null;

                  return (
                    <div id={`directory-group-${cat.id}`} key={cat.id} className="space-y-4">
                      {/* Elegant Category Section Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-xs
                            ${
                              cat.id === 'police' ? 'bg-blue-600' :
                              cat.id === 'fire_service' ? 'bg-rose-600' :
                              cat.id === 'ambulance' ? 'bg-emerald-600' :
                              cat.id === 'hospitals' ? 'bg-[#0a4595]' :
                              cat.id === 'blood_donors' ? 'bg-red-500' :
                              cat.id === 'pharmacies' ? 'bg-teal-600' :
                              cat.id === 'transportation' ? 'bg-amber-600' :
                              cat.id === 'gov_offices' ? 'bg-slate-700' : 'bg-violet-600'
                            }
                          `}>
                            {cat.id === 'police' && <Shield size={20} />}
                            {cat.id === 'fire_service' && <Flame size={20} />}
                            {cat.id === 'ambulance' && <HeartPulse size={20} />}
                            {cat.id === 'hospitals' && <HeartPulse size={20} />}
                            {cat.id === 'blood_donors' && <Droplet size={20} />}
                            {cat.id === 'pharmacies' && <Pill size={20} />}
                            {cat.id === 'transportation' && <Bus size={20} />}
                            {cat.id === 'gov_offices' && <Building size={20} />}
                            {cat.id === 'mechanics' && <Wrench size={20} />}
                          </div>
                          <div>
                            <h4 className="font-sans font-black text-[#006A4E] text-base leading-snug">
                              {getBanglaCategoryName(cat.id)}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                              {cat.name} • {cat.description}
                            </p>
                          </div>
                        </div>

                        {/* Record count badge */}
                        <span className="sm:ml-auto self-start sm:self-auto inline-flex items-center gap-1.5 bg-slate-50 text-slate-700 text-xs font-black px-3 py-1 rounded-full border border-slate-200 shadow-3xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {catContacts.length} টি সচল নম্বর
                        </span>
                      </div>

                      {/* Display listings for this category */}
                      {viewMode === 'grid' ? (
                        /* Grid View - Category Grouped */
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                          {catContacts.map((contact) => (
                            <ContactCard
                              key={contact.id}
                              contact={contact}
                              categoryInfo={cat}
                              onCall={handleCallAction}
                              onViewDetails={setSelectedHospitalForDetails}
                            />
                          ))}
                        </div>
                      ) : (
                        /* Table View - Category Grouped */
                        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-[#006A4E]/5 text-slate-700 border-b-2 border-slate-200 text-xs font-bold">
                                <th className="p-3.5 font-black uppercase tracking-wide">নাম ও পরিচিতি (Name)</th>
                                <th className="p-3.5 font-black uppercase tracking-wide">উপজেলা (Upazila)</th>
                                <th className="p-3.5 font-black uppercase tracking-wide">অবস্থান (Location)</th>
                                <th className="p-3.5 font-black uppercase tracking-wide">ভেরিফিকেশন (Status)</th>
                                <th className="p-3.5 font-black uppercase tracking-wide text-center">যোগাযোগ ও লিংকসমূহ (Action)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-xs font-semibold">
                              {catContacts.map((contact) => (
                                <tr
                                  key={contact.id}
                                  className="hover:bg-slate-50 transition-colors duration-150 odd:bg-slate-50/25"
                                >
                                  <td className="p-3.5">
                                    <div 
                                      className={`font-extrabold text-slate-800 text-sm ${contact.category === 'hospitals' ? 'cursor-pointer hover:text-indigo-600 transition-colors flex items-center flex-wrap gap-1.5' : ''}`}
                                      onClick={() => {
                                        if (contact.category === 'hospitals') {
                                          setSelectedHospitalForDetails(contact);
                                        }
                                      }}
                                    >
                                      <span>{contact.name}</span>
                                      {contact.category === 'hospitals' && (
                                        <span className="text-[9px] text-indigo-700 bg-indigo-50/70 border border-indigo-150 px-1.5 py-0.5 rounded-md font-bold tracking-tight">
                                          বিস্তারিত ➜
                                        </span>
                                      )}
                                    </div>
                                    {contact.details && (
                                      <div className="text-[11px] text-slate-500 mt-0.5 font-semibold italic max-w-xs truncate">
                                        {contact.details}
                                      </div>
                                    )}
                                  </td>
                                  <td className="p-3.5 font-bold text-slate-700">
                                    {contact.upazila}
                                  </td>
                                  <td className="p-3.5 text-slate-500 font-bold">
                                    {contact.location}
                                  </td>
                                  <td className="p-3.5">
                                    {contact.verified ? (
                                      <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                                        ✓ যাচাইকৃত
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                                        পাবলিক
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3.5 text-center">
                                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                                      {/* Call */}
                                      <button
                                        onClick={() => handleCallAction(contact)}
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#006A4E] hover:bg-[#005740] text-white rounded-xl font-black text-[11px] tracking-wide transition-all shadow-3xs cursor-pointer border border-[#006A4E] active:scale-95"
                                        title={`সরাসরি কল দিন: ${contact.phoneNumber}`}
                                      >
                                        <Phone size={11} className="animate-pulse" />
                                        <span>কল করুন</span>
                                      </button>

                                      {/* WhatsApp */}
                                      {getWhatsAppUrl(contact.phoneNumber) ? (
                                        <a
                                          href={getWhatsAppUrl(contact.phoneNumber) || '#'}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl font-bold text-[11px] transition-all border border-emerald-100 shadow-3xs active:scale-95"
                                          title="হোয়াটসঅ্যাপে মেসেজ পাঠান"
                                        >
                                          <MessageSquare size={11} />
                                          <span>হোয়াটসঅ্যাপ</span>
                                        </a>
                                      ) : (
                                        <span
                                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 text-slate-400 rounded-xl font-bold text-[11px] border border-slate-100 opacity-60 cursor-not-allowed select-none"
                                          title="হোয়াটসঅ্যাপ উপলব্ধ নয়"
                                        >
                                          <MessageSquare size={11} />
                                          <span>হোয়াটসঅ্যাপ</span>
                                        </span>
                                      )}

                                      {/* Google Maps */}
                                      <a
                                        href={contact.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.name + ' ' + contact.location + ' Shariatpur Bangladesh')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl font-bold text-[11px] transition-all border border-blue-100 shadow-3xs active:scale-95"
                                        title="গুগল ম্যাপসে অবস্থান দেখুন"
                                      >
                                        <Map size={11} />
                                        <span>ম্যাপ</span>
                                      </a>

                                      {/* Copy */}
                                      <button
                                        onClick={() => {
                                          try {
                                            const textToCopy = `${contact.name}\nফোন: ${contact.phoneNumber}\nঠিকানা: ${contact.location}, শরীয়তপুর`;
                                            navigator.clipboard.writeText(textToCopy);
                                          } catch (err) {
                                            console.warn("Failed to copy", err);
                                          }
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-[11px] transition-all border border-slate-200 shadow-3xs cursor-pointer active:scale-95"
                                        title="নম্বর ও ঠিকানা কপি করুন"
                                      >
                                        <Copy size={11} />
                                        <span>কপি</span>
                                      </button>

                                      {/* Details (Hospitals only) */}
                                      {contact.category === 'hospitals' && (
                                        <button
                                          onClick={() => setSelectedHospitalForDetails(contact)}
                                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-xl font-black text-[11px] transition-all cursor-pointer border border-indigo-150 shadow-3xs active:scale-95"
                                          title="বিস্তারিত তথ্য দেখুন"
                                        >
                                          <span>📋 বিস্তারিত</span>
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* No matching results block */
              <div className="py-16 text-center flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <div className="p-4 bg-slate-100 text-[#006A4E]/80 rounded-full mb-3.5 border-2 border-slate-200">
                  <Search size={32} />
                </div>
                <h4 className="font-sans font-black text-slate-800 text-lg mb-1">
                  কোনো তথ্য পাওয়া যায়নি!
                </h4>
                <p className="text-slate-500 text-xs max-w-sm mb-6 font-semibold">
                  আপনার অনুসন্ধানকৃত কীওয়ার্ড বা ফিল্টারগুলোর সাথে মিল পাওয়া যায়নি। দয়া করে ক্যাটাগরি পরিবর্তন করে আবার চেষ্টা করুন।
                </p>
                <button
                  id="reset-all-filters-empty"
                  onClick={() => {
                    setSelectedUpazila('All');
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#006A4E] hover:bg-[#005740] text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs border border-[#006A4E]"
                >
                  সকল ফিল্টার রিসেট করুন
                </button>
              </div>
            )}

            {/* Suggested listing sub-section */}
            {contacts.some((c) => c.id.startsWith('user_')) && (
              <div className="mt-8 pt-6 border-t-2 border-slate-200/80">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-sans font-black text-slate-800 text-sm md:text-base flex items-center gap-2">
                      <Users size={18} className="text-[#006A4E]" />
                      আমার স্থানীয়ভাবে যুক্তকৃত পরিচিতি তালিকা ({totalUserAdded})
                    </h4>
                    <p className="text-slate-500 text-[11px] font-semibold mt-0.5">
                      আপনার ডিভাইস থেকে যুক্ত করা যোগাযোগের নম্বরসমূহ। এগুলো শুধুমাত্র আপনার ব্রাউজার ক্যাশে সুরক্ষিত সংরক্ষিত।
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {contacts
                    .filter((c) => c.id.startsWith('user_'))
                    .map((userContact) => (
                      <div
                        key={userContact.id}
                        className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/75 transition-colors rounded-2xl border-2 border-slate-200"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-bold text-sm text-slate-800">{userContact.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[#006A4E]/10 text-[#006A4E] font-bold">
                              {userContact.upazila} উপজেলা
                            </span>
                          </div>
                          <div className="flex items-center gap-3.5 text-xs text-slate-500 mt-1.5 font-semibold">
                            <span className="flex items-center gap-1 font-mono text-[#006A4E]">
                              <Phone size={12} />
                              {userContact.phoneNumber}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={12} className="text-slate-450" />
                              {userContact.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCallAction(userContact)}
                            className="p-2.5 bg-[#006A4E] hover:bg-[#005740] text-white rounded-xl transition-all cursor-pointer border border-[#006A4E]"
                            title="কল করুন"
                          >
                            <Phone size={13} />
                          </button>
                          <button
                            id={`delete-custom-btn-${userContact.id}`}
                            onClick={() => handleDeleteContact(userContact.id)}
                            className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all cursor-pointer border border-rose-200"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </section>
          )}

          {/* Right Column: Bangladesh Government Official Sidebar (জেলা প্রশাসনের ডান বাতায়ন কলাম) */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-5">
            
            {/* Widget 1: জেলা পরিচিতি ও মানচিত্র (District Profile) */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37]" />
              <h4 className="text-sm font-black text-slate-850 flex items-center gap-2 border-b border-slate-100 pb-2.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                শরীয়তপুর জেলা পরিচিতি
              </h4>
              <div className="space-y-2.5 text-xs text-slate-600 font-semibold">
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="text-slate-400">জেলা গঠন:</span>
                  <span className="text-slate-800">১ মার্চ, ১৯৮৪</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="text-slate-400">মোট আয়তন:</span>
                  <span className="text-slate-800">১,১৮১.৫৩ বর্গ কি.মি.</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="text-slate-400">উপজেলা সংখ্যা:</span>
                  <span className="text-slate-800">৬ টি</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="text-slate-400">ইউনিয়ন পরিষদ:</span>
                  <span className="text-slate-800">৬৫ টি</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="text-slate-400">প্রধান নদ-নদী:</span>
                  <span className="text-[#006A4E]">পদ্মা ও মেঘনা</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  শরীয়তপুর জেলা বাংলাদেশের ঢাকা বিভাগের একটি সীমানা জেলা। পূর্বে এই অঞ্চল বিক্রমপুর ও ফরিদপুর জেলার অংশ হিসেবে শাসিত হত। কীর্তিনাশা নদী এই জেলাকে বিভক্ত করেছে।
                </p>
              </div>
            </div>

            {/* Widget 2: জরুরি পরিসংখ্যান (Database Stats Panel) */}
            <div className="bg-gradient-to-br from-[#006A4E] to-[#004D38] border-2 border-[#006A4E] rounded-3xl p-5 text-white shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-6 -mt-6 pointer-events-none" />
              <h4 className="text-xs font-black tracking-widest text-emerald-300 uppercase mb-3.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                জরুরি বাতায়ন পরিসংখ্যান
              </h4>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
                  <div className="text-lg font-mono font-black text-amber-300">{contacts.length}</div>
                  <div className="text-[10px] font-bold text-emerald-100">মোট সেবাদাতা</div>
                </div>
                <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
                  <div className="text-lg font-mono font-black text-amber-300">
                    {contacts.filter(c => c.verified).length}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-100">ভেরিফাইড নম্বর</div>
                </div>
                <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
                  <div className="text-lg font-mono font-black text-amber-300">৩টি</div>
                  <div className="text-[10px] font-bold text-emerald-100">ফায়ার স্টেশন</div>
                </div>
                <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
                  <div className="text-lg font-mono font-black text-emerald-300">২৪ ঘণ্টা</div>
                  <div className="text-[10px] font-bold text-emerald-100">অফলাইন সাপোর্ট</div>
                </div>
              </div>
            </div>

            {/* Widget 3: গুরুত্বপূর্ণ সরকারি লিংকসমূহ (Important Portal Links) */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs">
              <h4 className="text-sm font-black text-slate-850 flex items-center gap-2 border-b border-slate-100 pb-2.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#006A4E]" />
                গুরুত্বপূর্ণ লিংকসমূহ
              </h4>
              <ul className="space-y-2 text-xs font-bold text-slate-600">
                <li>
                  <a
                    href="https://bangladesh.gov.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-[#006A4E]/5 hover:text-[#006A4E] transition-colors border border-slate-150/60"
                  >
                    <span>জাতীয় তথ্য বাতায়ন (Bangladesh.gov)</span>
                    <ExternalLink size={12} className="opacity-65" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://shariatpur.gov.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-[#006A4E]/5 hover:text-[#006A4E] transition-colors border border-slate-150/60"
                  >
                    <span>শরীয়তপুর জেলা প্রশাসন পোর্টাল</span>
                    <ExternalLink size={12} className="opacity-65" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://pmo.gov.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-[#006A4E]/5 hover:text-[#006A4E] transition-colors border border-slate-150/60"
                  >
                    <span>প্রধানমন্ত্রীর কার্যালয় (PMO)</span>
                    <ExternalLink size={12} className="opacity-65" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://fireservice.gov.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-[#006A4E]/5 hover:text-[#006A4E] transition-colors border border-slate-150/60"
                  >
                    <span>ফায়ার সার্ভিস ও সিভিল ডিফেন্স</span>
                    <ExternalLink size={12} className="opacity-65" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://police.gov.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-[#006A4E]/5 hover:text-[#006A4E] transition-colors border border-slate-150/60"
                  >
                    <span>বাংলাদেশ পুলিশ সদর দপ্তর</span>
                    <ExternalLink size={12} className="opacity-65" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Widget 4: সিটিজেন চার্টার (Citizen Charter Guidelines) */}
            <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-5 shadow-xs">
              <h4 className="text-xs font-black text-amber-900 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                <Shield size={14} className="text-amber-700" />
                নাগরিক সেবা অঙ্গীকারনামা
              </h4>
              <ul className="space-y-2 text-[11px] text-amber-800 leading-relaxed font-semibold">
                <li className="flex gap-1.5">
                  <span className="text-[#006A4E]">✔</span>
                  <span><strong>তথ্য অধিকার:</strong> সম্পূর্ণ ও সঠিক জরুরি যোগাযোগের নম্বর ও কর্মঘণ্টা বিনা খরচে জানার নাগরিক অধিকার।</span>
                </li>
                <li className="flex gap-1.5">
                  <span className="text-[#006A4E]">✔</span>
                  <span><strong>সত্যতা যাচাই:</strong> প্রতিটি সরকারি ডাটা এন্ট্রি জেলা বাতায়ন প্রশাসন দ্বারা ম্যানুয়ালি যাচাইকৃত।</span>
                </li>
                <li className="flex gap-1.5">
                  <span className="text-[#006A4E]">✔</span>
                  <span><strong>ব্যক্তিগত গোপনীয়তা:</strong> ব্যবহারকারী কর্তৃক থার্ড-পার্টি অ্যাপে তথ্য শেয়ার সম্পূর্ণ সুরক্ষিত।</span>
                </li>
              </ul>
            </div>

          </div>
            </>
          )}

        </div>

      </div>

      {/* 7. New Look Professional Government Portal Footer */}
      <footer className="mt-16 bg-[#0B132B] text-slate-300 border-t-4 border-[#006A4E] relative overflow-hidden">
        {/* Subtle top golden accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37]" />
        
        {/* Main Footer Link Matrix */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 pb-8 border-b border-slate-800">
            
            {/* Column 1: জেলা বাতায়ন পরিচিতি (District Help Desk Profile) */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShariatpurGovSeal size={48} src={PORTAL_LOGO_URL} />
                <span className="font-display font-black text-white text-base tracking-wide">শরীয়তপুর নাগরিক সেবা</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                শরীয়তপুর জেলার সাধারণ নাগরিকদের তাৎক্ষণিক জরুরি যোগাযোগের মাধ্যম এবং সরকারি ডিজিটাল সেবাসমূহের সমন্বিত অনলাইন ও অফলাইন পোর্টালে আপনাকে স্বাগতম।
              </p>
              
              {/* National Helpline badges inside footer */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">জরুরি হেল্পলাইন নম্বরসমূহ:</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-black px-2 py-1 rounded bg-red-600/25 text-red-400 border border-red-500/30">৯৯৯ (জরুরি)</span>
                  <span className="text-[10px] font-black px-2 py-1 rounded bg-emerald-600/25 text-emerald-400 border border-emerald-500/30">৩৩৩ (তথ্য)</span>
                  <span className="text-[10px] font-black px-2 py-1 rounded bg-amber-600/25 text-amber-400 border border-amber-500/30">১০৯ (নারী)</span>
                </div>
              </div>
            </div>

            {/* Column 2: গুরুত্বপূর্ণ সরকারি ওয়েবসাইট (Official Portals) */}
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-widest text-white uppercase border-l-2 border-[#D4AF37] pl-2">
                গুরুত্বপূর্ণ সরকারি পোর্টাল
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-400">
                <li>
                  <a href="https://bangladesh.gov.bd" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all flex items-center gap-1.5">
                    <span>• গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</span>
                    <ExternalLink size={10} className="opacity-50" />
                  </a>
                </li>
                <li>
                  <a href="https://shariatpur.gov.bd" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all flex items-center gap-1.5">
                    <span>• শরীয়তপুর জেলা প্রশাসন</span>
                    <ExternalLink size={10} className="opacity-50" />
                  </a>
                </li>
                <li>
                  <a href="https://cabinet.gov.bd" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all flex items-center gap-1.5">
                    <span>• মন্ত্রিপরিষদ বিভাগ</span>
                    <ExternalLink size={10} className="opacity-50" />
                  </a>
                </li>
                <li>
                  <a href="https://ictd.gov.bd" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all flex items-center gap-1.5">
                    <span>• তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ</span>
                    <ExternalLink size={10} className="opacity-50" />
                  </a>
                </li>
                <li>
                  <a href="https://eksheba.gov.bd" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all flex items-center gap-1.5">
                    <span>• একসেবা পোর্টাল বাংলাদেশ</span>
                    <ExternalLink size={10} className="opacity-50" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: সেবার বিভাগসমূহ (Directory Quick Jump) */}
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-widest text-white uppercase border-l-2 border-[#D4AF37] pl-2">
                জরুরি ডিরেক্টরি ক্যাটাগরি
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-400">
                <li>
                  <button onClick={() => { setSelectedCategory('police'); setSearchQuery(''); }} className="hover:text-white hover:underline text-left cursor-pointer">• জেলা থানা ও পুলিশ ফাঁড়ি</button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('fire_service'); setSearchQuery(''); }} className="hover:text-white hover:underline text-left cursor-pointer">• ফায়ার সার্ভিস ও সিভিল ডিফেন্স</button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('hospitals'); setSearchQuery(''); }} className="hover:text-white hover:underline text-left cursor-pointer">• হাসপাতাল ও সরকারি ক্লিনিক</button>
                </li>
                <li>
                  <button onClick={() => { setIsOpen(true); }} className="hover:text-white hover:underline text-left cursor-pointer">• রক্তের গ্রুপ ও রক্তদাতা তথ্য</button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('transportation'); setSearchQuery(''); }} className="hover:text-white hover:underline text-left cursor-pointer">• বাস ও লঞ্চ টিকিট কাউন্টার</button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('pharmacies'); setSearchQuery(''); }} className="hover:text-white hover:underline text-left cursor-pointer">• ২৪ ঘণ্টা খোলা ফার্মেসী</button>
                </li>
              </ul>
            </div>

            {/* Column 4: পরিকল্পনা ও বাস্তবায়ন (Civic Team Credential) */}
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-widest text-white uppercase border-l-2 border-[#D4AF37] pl-2">
                কারিগরি ও সহযোগিতায়
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                পরিকল্পনা ও বাস্তবায়নে: <strong className="text-white">নয়ন মণ্ডল</strong>। নাগরিক অধিকার সুরক্ষায় তথ্য সমৃদ্ধকরণে নিয়োজিত।
              </p>
              
              {/* User suggestion shortcut */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10 space-y-2">
                <span className="text-[10px] text-amber-300 font-bold block">আপনার কাছে কি নতুন তথ্য আছে?</span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full text-center py-1.5 px-3 bg-[#006A4E] hover:bg-[#005740] text-white rounded-lg text-[10px] font-black transition-all cursor-pointer border border-[#D4AF37]/30"
                >
                  নতুন নম্বর যুক্ত করুন +
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Security Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold text-slate-500 font-sans tracking-wide">
            
            {/* Copyright notes */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span>© ২০২৬ শরীয়তপুর জরুরি তথ্য বাতায়ন। সর্বস্বত্ব সংরক্ষিত।</span>
              <span className="hidden md:inline text-slate-800">|</span>
              <span className="flex items-center gap-1.5 normal-case text-slate-400 font-semibold">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping inline-block" />
                অফলাইন ক্যাশে সক্রিয় (Offline Local Storage Ready)
              </span>
            </div>

            {/* Government National Seal representation or branding */}
            <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <div className="w-4 h-4 bg-[#f42a41] rounded-full flex items-center justify-center text-[8px] font-bold text-white border border-[#006A4E]">
                ★
              </div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono">Shariatpur District Administration Portal</span>
            </div>

          </div>
        </div>
      </footer>

      {/* Form Modal for suggesting new directory contacts */}
      <AddContactModal
        categories={CATEGORIES}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddContact={handleAddContact}
      />

      {/* Hospital Details Modal */}
      <HospitalDetailsModal
        hospital={selectedHospitalForDetails}
        onClose={() => setSelectedHospitalForDetails(null)}
        onCall={handleCallAction}
      />

      {/* Shariatpur Medical Directory Overlay */}
      <ShariatpurMedicalDirectory
        isOpen={showMedicalDirectory}
        onClose={() => setShowMedicalDirectory(false)}
      />

      {/* Emergency Citizen e-Services & Portal Links Modal Overlay */}
      <GovServicesModal
        isOpen={showGovServicesModal}
        onClose={() => setShowGovServicesModal(false)}
      />

      {/* Interactive Blood Donor & Blood Bank Directory Modal Overlay */}
      <BloodDonorDirectoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCallContact={handleCallAction}
      />

      {/* Site Admin Helpline & Support Center Modal Overlay */}
      <AdminHelpCenterModal
        isOpen={showAdminHelpModal}
        onClose={() => setShowAdminHelpModal(false)}
      />

      {/* Device dialer confirmation simulator popup overlay */}
      {activeCallContact && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCallContact(null)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl relative w-full max-w-sm border border-slate-800 text-center z-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#006A4E] via-[#D4AF37] to-[#006A4E] animate-pulse" />

              <div className="h-16 w-16 bg-[#006A4E]/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce border border-emerald-500/20">
                <Phone size={28} />
              </div>

              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 font-mono">
                জেলা প্রশাসন ডায়লার কানেকশন
              </span>

              <h4 className="font-display font-black text-xl text-white mt-1.5 leading-tight">
                {activeCallContact.name}
              </h4>
              <p className="text-slate-400 text-xs mt-1">
                {activeCallContact.location} • {activeCallContact.upazila}
              </p>

              <div className="my-5 bg-white/5 py-3.5 px-4 rounded-2xl border border-white/5 font-mono text-xl font-bold tracking-wider text-amber-300">
                {activeCallContact.phoneNumber}
              </div>

              <div className="space-y-2">
                <a
                  id="direct-tel-link-simulator"
                  href={`tel:${activeCallContact.phoneNumber}`}
                  onClick={() => setActiveCallContact(null)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#006A4E] hover:bg-[#005740] text-white font-sans font-bold text-sm tracking-wide transition-colors cursor-pointer border border-[#D4AF37]/40"
                >
                  কল করুন / Dial Call
                </a>

                <button
                  id="cancel-call-sim-btn"
                  onClick={() => setActiveCallContact(null)}
                  className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer font-semibold"
                >
                  বাতিল করুন (Dismiss)
                </button>
              </div>

              <p className="text-[9px] text-slate-500 mt-4 leading-relaxed">
                If your system does not automatically prompt, please permit browser protocol links.
              </p>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}

      {/* Sliding Mobile Hamburger Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[280px] sm:max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-l border-slate-100 z-10"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <ShariatpurGovSeal size={36} />
                    <span className="font-display font-black text-slate-800 text-sm">জেলা জরুরি বাতায়ন</span>
                  </div>
                  <button
                    id="close-hamburger-btn"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
                    মেনু আইটেম / Navigation
                  </div>

                  {/* Home */}
                  <button
                    onClick={() => {
                      setSelectedUpazila('All');
                      setSelectedCategory('All');
                      setSearchQuery('');
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors text-left cursor-pointer"
                  >
                    <Home size={16} className="text-[#006A4E]" />
                    <span>হোম (Home Portal)</span>
                  </button>

                  {/* District Blog & Citizen Forum */}
                  <button
                    onClick={() => {
                      setSelectedCategory('blog');
                      setSearchQuery('');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black transition-all text-left cursor-pointer border
                      ${selectedCategory === 'blog'
                        ? 'bg-[#006A4E] text-white border-[#006A4E] shadow-xs'
                        : 'bg-gradient-to-r from-amber-50 to-emerald-50 hover:from-amber-100 hover:to-emerald-100 text-[#006A4E] border-amber-200'
                      }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <PenTool size={16} className={selectedCategory === 'blog' ? 'text-white' : 'text-[#006A4E]'} />
                      <span>জেলা ব্লগ ও নাগরিক বার্তা</span>
                    </span>
                    <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wide">নতুন</span>
                  </button>

                  {/* 🩺 চিকিৎসা ও স্বাস্থ্য সেবা Dropdown */}
                  <div className="border border-slate-100 rounded-2xl p-1 bg-slate-50/40">
                    <button
                      type="button"
                      onClick={() => setIsMedicalDropdownOpen(!isMedicalDropdownOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
                        ${isMedicalActive ? 'bg-emerald-50 text-[#006A4E]' : 'text-slate-700'}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <HeartPulse size={16} className={isMedicalActive ? 'text-[#006A4E]' : 'text-slate-500'} />
                        <span>চিকিৎসা ও স্বাস্থ্য সেবা</span>
                      </span>
                      {isMedicalDropdownOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                    </button>

                    {isMedicalDropdownOpen && (
                      <div className="mt-1 pl-3.5 ml-2.5 border-l border-slate-200/80 space-y-1 py-1">
                        {/* Hospitals */}
                        <button
                          onClick={() => {
                            setSelectedCategory('hospitals');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'hospitals' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <span>🏥</span>
                          <span>হাসপাতাল সমূহ (Hospitals)</span>
                        </button>

                        {/* Shariatpur Medical Directory */}
                        <button
                          onClick={() => {
                            setShowMedicalDirectory(true);
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer hover:bg-slate-50 text-indigo-950"
                        >
                          <span className="flex items-center gap-2">
                            <span>📋</span>
                            <span>মেডিকেল ডিরেক্টরি (৩২টি)</span>
                          </span>
                          <span className="text-[8px] bg-pink-500 text-white px-1 py-0.2 rounded-sm font-extrabold scale-90">নতুন</span>
                        </button>

                        {/* Pharmacies */}
                        <button
                          onClick={() => {
                            setSelectedCategory('pharmacies');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'pharmacies' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Pill size={13} className="text-teal-600" />
                          <span>২৪ ঘণ্টা ফার্মেসী (Pharmacies)</span>
                        </button>

                        {/* Ambulance */}
                        <button
                          onClick={() => {
                            setSelectedCategory('ambulance');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'ambulance' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <HeartPulse size={13} className="text-emerald-600" />
                          <span>অ্যাম্বুলেন্স (Ambulance)</span>
                        </button>

                        {/* Blood Donors */}
                        <button
                          onClick={() => {
                            setIsOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer hover:bg-slate-50 text-slate-600"
                        >
                          <Droplet size={13} className="text-rose-500" />
                          <span>রক্তের গ্রুপ ও দাতা (Blood)</span>
                        </button>

                        {/* Home Nursing & Oxygen */}
                        <button
                          onClick={() => {
                            setSelectedCategory('home_nursing');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'home_nursing' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Stethoscope size={13} className="text-rose-600" />
                          <span>হোম কেয়ার, অক্সিজেন ও নার্স</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 🛠️ জরুরি ও সরকারি দপ্তর Dropdown */}
                  <div className="border border-slate-100 rounded-2xl p-1 bg-slate-50/40">
                    <button
                      type="button"
                      onClick={() => setIsEmergencyDropdownOpen(!isEmergencyDropdownOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
                        ${isEmergencyActive ? 'bg-emerald-50 text-[#006A4E]' : 'text-slate-700'}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Shield size={16} className={isEmergencyActive ? 'text-[#006A4E]' : 'text-slate-500'} />
                        <span>জরুরি ও সরকারি দপ্তর</span>
                      </span>
                      {isEmergencyDropdownOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                    </button>

                    {isEmergencyDropdownOpen && (
                      <div className="mt-1 pl-3.5 ml-2.5 border-l border-slate-200/80 space-y-1 py-1">
                        {/* Emergency Police */}
                        <button
                          onClick={() => {
                            setSelectedCategory('police');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'police' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <AlertTriangle size={13} className="text-rose-600" />
                          <span>জরুরি পুলিশ (Police)</span>
                        </button>

                        {/* Fire */}
                        <button
                          onClick={() => {
                            setSelectedCategory('fire_service');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'fire_service' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Flame size={13} className="text-orange-500" />
                          <span>ফায়ার সার্ভিস (Fire)</span>
                        </button>

                        {/* Bus/Launch */}
                        <button
                          onClick={() => {
                            setSelectedCategory('transportation');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'transportation' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Bus size={13} className="text-amber-600" />
                          <span>পরিবহন ও টিকিট (Transport)</span>
                        </button>

                        {/* Gov Offices */}
                        <button
                          onClick={() => {
                            setSelectedCategory('gov_offices');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'gov_offices' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Building size={13} className="text-slate-500" />
                          <span>সরকারি ও বিদ্যুৎ (Gov Offices)</span>
                        </button>

                        {/* Mechanics */}
                        <button
                          onClick={() => {
                            setSelectedCategory('mechanics');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'mechanics' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Wrench size={13} className="text-indigo-600" />
                          <span>জরুরি মেকানিক (Mechanics)</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 🎓 শিক্ষা, কৃষি ও নাগরিক সেবা Dropdown */}
                  <div className="border border-slate-100 rounded-2xl p-1 bg-slate-50/40">
                    <button
                      type="button"
                      onClick={() => setIsEducationBanksDropdownOpen(!isEducationBanksDropdownOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
                        ${isEducationBanksActive ? 'bg-emerald-50 text-[#006A4E]' : 'text-slate-700'}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <GraduationCap size={16} className={isEducationBanksActive ? 'text-[#006A4E]' : 'text-slate-500'} />
                        <span>শিক্ষা, কৃষি ও নাগরিক সেবা</span>
                      </span>
                      {isEducationBanksDropdownOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                    </button>

                    {isEducationBanksDropdownOpen && (
                      <div className="mt-1 pl-3.5 ml-2.5 border-l border-slate-200/80 space-y-1 py-1">
                        {/* Agriculture */}
                        <button
                          onClick={() => {
                            setSelectedCategory('agriculture');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'agriculture' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Sprout size={13} className="text-lime-600" />
                          <span>কৃষি ও প্রাণিসম্পদ</span>
                        </button>

                        {/* Union & Digital Center */}
                        <button
                          onClick={() => {
                            setSelectedCategory('union_parishad');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'union_parishad' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Landmark size={13} className="text-teal-600" />
                          <span>ইউনিয়ন ও ডিজিটাল সেন্টার</span>
                        </button>

                        {/* Passport, NID & Land */}
                        <button
                          onClick={() => {
                            setSelectedCategory('passport_land');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'passport_land' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <FileText size={13} className="text-blue-600" />
                          <span>পাসপোর্ট, এনআইডি ও ভূমি</span>
                        </button>

                        {/* Education */}
                        <button
                          onClick={() => {
                            setSelectedCategory('education');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'education' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <GraduationCap size={13} className="text-cyan-600" />
                          <span>শিক্ষা প্রতিষ্ঠান ও কলেজ</span>
                        </button>

                        {/* Banks */}
                        <button
                          onClick={() => {
                            setSelectedCategory('banks');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'banks' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Landmark size={13} className="text-emerald-700" />
                          <span>ব্যাংক ও এটিএম বুথ</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ⚖️ আইন, মিডিয়া, কুরিয়ার ও পর্যটন Dropdown */}
                  <div className="border border-slate-100 rounded-2xl p-1 bg-slate-50/40">
                    <button
                      type="button"
                      onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer
                        ${isServicesActive ? 'bg-emerald-50 text-[#006A4E]' : 'text-slate-700'}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Scale size={16} className={isServicesActive ? 'text-[#006A4E]' : 'text-slate-500'} />
                        <span>আইন, মিডিয়া, কুরিয়ার ও পর্যটন</span>
                      </span>
                      {isServicesDropdownOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                    </button>

                    {isServicesDropdownOpen && (
                      <div className="mt-1 pl-3.5 ml-2.5 border-l border-slate-200/80 space-y-1 py-1">
                        {/* Legal Help */}
                        <button
                          onClick={() => {
                            setSelectedCategory('legal_help');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'legal_help' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Scale size={13} className="text-amber-700" />
                          <span>আইনজীবী ও লিগ্যাল এইড</span>
                        </button>

                        {/* Journalists */}
                        <button
                          onClick={() => {
                            setSelectedCategory('journalists');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'journalists' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Newspaper size={13} className="text-purple-600" />
                          <span>প্রেস ক্লাব ও সাংবাদিক</span>
                        </button>

                        {/* Hotels & Tourism */}
                        <button
                          onClick={() => {
                            setSelectedCategory('hotels_tourism');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'hotels_tourism' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Compass size={13} className="text-orange-600" />
                          <span>হোটেল, সার্কিট হাউজ ও পর্যটন</span>
                        </button>

                        {/* Courier */}
                        <button
                          onClick={() => {
                            setSelectedCategory('courier');
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left cursor-pointer
                            ${selectedCategory === 'courier' ? 'bg-[#006A4E]/10 text-[#006A4E]' : 'text-slate-600'}`}
                        >
                          <Truck size={13} className="text-amber-600" />
                          <span>কুরিয়ার ও পার্সেল সার্ভিস</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Suggest Listing */}
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-100 text-[#006A4E] font-bold text-xs transition-colors bg-emerald-50 text-left border border-emerald-100 cursor-pointer animate-pulse"
                  >
                    <Plus size={16} className="text-[#006A4E]" />
                    <span>নতুন তথ্য যুক্ত করুন (Suggest Info)</span>
                  </button>

                  {/* 🚨 জাতীয় জরুরি হটলাইন (National Emergency Hotlines - 24/7) */}
                  <button
                    onClick={() => {
                      setSelectedCategory('hotlines');
                      setSearchQuery('');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black transition-all text-left cursor-pointer border mt-2
                      ${selectedCategory === 'hotlines'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-gradient-to-r from-rose-50 to-orange-50 hover:from-rose-100 hover:to-orange-100 text-rose-800 border-rose-200'
                      }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <PhoneCall size={16} className={selectedCategory === 'hotlines' ? 'text-white' : 'text-rose-600 animate-bounce'} />
                      <span>জরুরি হটলাইন (Hotlines 999)</span>
                    </span>
                    <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wide">২৪/৭</span>
                  </button>

                  {/* 🎧 সাইট এডমিন হেল্পলাইন (Site Admin Help Center) */}
                  <button
                    onClick={() => {
                      setShowAdminHelpModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all text-left cursor-pointer border mt-2 bg-gradient-to-r from-emerald-700 to-[#006A4E] hover:from-[#006A4E] hover:to-emerald-800 text-white border-emerald-500 shadow-xs"
                  >
                    <span className="flex items-center gap-2.5">
                      <Headphones size={16} className="text-amber-300 animate-pulse" />
                      <span>এডমিন হেল্পলাইন (Admin Support)</span>
                    </span>
                    <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md uppercase">সাহায্য</span>
                  </button>
                </nav>
              </div>

              {/* Developer branding in drawer footer */}
              <div className="border-t border-slate-100 pt-4 mt-auto">
                <p className="text-[10px] text-slate-400 font-medium">Developer by</p>
                <p className="text-xs font-black text-slate-700">Nayan Mondol</p>
                <p className="text-[9px] text-slate-400 font-mono mt-1">Copyright ©2026</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white md:hidden border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex justify-around items-center py-2 px-3">
        {/* Home */}
        <button
          onClick={() => {
            setSelectedCategory('All');
            setSelectedUpazila('All');
            setSearchQuery('');
          }}
          className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            selectedCategory === 'All' && selectedUpazila === 'All' && searchQuery === ''
              ? 'text-[#006A4E]'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home size={19} />
          <span className="text-[9px] font-bold">হোম</span>
        </button>

        {/* Emergency */}
        <button
          onClick={() => {
            setSelectedCategory('police');
            setSearchQuery('');
          }}
          className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            selectedCategory === 'police' ? 'text-[#006A4E]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <AlertTriangle size={19} />
          <span className="text-[9px] font-bold">জরুরি</span>
        </button>

        {/* Float Add Center Action button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-center justify-center -mt-6 bg-[#006A4E] hover:bg-[#005740] text-white w-12 h-12 rounded-full shadow-lg border-2 border-white transition-transform active:scale-95 cursor-pointer"
          title="নতুন তথ্য যোগ করুন"
        >
          <Plus size={20} />
        </button>

        {/* e-Services Portal */}
        <button
          onClick={() => setShowGovServicesModal(true)}
          className="flex flex-col items-center gap-0.5 transition-colors text-slate-500 hover:text-[#006A4E] cursor-pointer"
        >
          <span className="text-sm leading-none">🏛️</span>
          <span className="text-[9px] font-bold text-emerald-800">ই-সেবা</span>
        </button>

        {/* Hospital */}
        <button
          onClick={() => {
            setSelectedCategory('hospitals');
            setSearchQuery('');
          }}
          className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            selectedCategory === 'hospitals' ? 'text-[#006A4E]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <HeartPulse size={19} />
          <span className="text-[9px] font-bold">হাসপাতাল</span>
        </button>

        {/* Blood Donors */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center gap-0.5 transition-colors text-slate-400 hover:text-rose-600 cursor-pointer"
        >
          <Droplet size={19} />
          <span className="text-[9px] font-bold">রক্ত</span>
        </button>
      </div>
    </div>
  );
}
