import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, MapPin, Phone, Activity, Calendar, BadgeCheck, Stethoscope, Navigation, Clock, ShieldAlert, Sparkles, CheckCircle2, Search, Filter, PhoneCall, CalendarDays, Check, RefreshCw, ChevronRight } from 'lucide-react';
import { Contact } from '../types';

interface HospitalDetailsModalProps {
  hospital: Contact | null;
  onClose: () => void;
  onCall: (contact: Contact) => void;
}

interface Doctor {
  name: string;
  degrees: string;
  specialty: string;
  department: string;
  departmentBn: string;
  time: string;
  status: 'available' | 'chamber_closed' | 'on_duty';
  contactForAppointment?: string;
  roomNo?: string;
}

export const HospitalDetailsModal: React.FC<HospitalDetailsModalProps> = ({
  hospital,
  onClose,
  onCall,
}) => {
  if (!hospital) return null;

  // States for interactive Doctor Directory
  const [doctorSearch, setDoctorSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Helper to generate dynamic or specific detailed hospital profile
  const getHospitalDetails = (h: Contact) => {
    const name = h.name;
    const id = h.id;
    const upazila = h.upazila;
    const isGov = id.startsWith('h') && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(id);

    let fullAddress = h.location;
    if (!fullAddress.includes(upazila)) {
      fullAddress += `, ${upazila}`;
    }
    if (!fullAddress.includes('শরীয়তপুর')) {
      fullAddress += ', শরীয়তপুর';
    }

    // Generate dynamic Google Map Search link
    const mapSearchQuery = encodeURIComponent(`${name} ${upazila} Shariatpur Bangladesh`);
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapSearchQuery}`;

    // Emergency services
    let services: string[] = [];
    if (isGov) {
      if (id === 'h1') {
        services = [
          '🏥 ২৪ ঘন্টা পূর্ণাঙ্গ জরুরি বিভাগ সেবা',
          '🧪 প্যাথলজি, বায়োকেমিস্ট্রি ও ডিজিটাল আল্ট্রাসনোগ্রাফি',
          '🚑 সরকারি সুলভ এম্বুলেন্স ও অক্সিজেন ব্যাংক সুবিধা',
          '🤰 মা ও শিশু প্রসূতি স্বাস্থ্য বিভাগ (নিরাপদ প্রসব)',
          '💉 সরকারি ইমিউনাইজেশন (EPI) ও টিকাদান কেন্দ্র',
          '🩹 পোড়া রোগী ও ট্রমা জরুরি ড্রেসিং ইউনিট',
        ];
      } else {
        services = [
          '🏥 ২৪ ঘন্টা সচল উপজেলা জরুরি বিভাগ',
          '🤰 নরমাল ডেলিভারি ও প্রসূতি স্বাস্থ্য সেবা',
          '💉 সরকারি ফ্রি টিকাদান ও ভ্যাকসিন সেবা',
          '💊 বিনামূল্যে সরকারি জীবনরক্ষাকারী ঔষধ বিতরণ (স্টক সাপেক্ষে)',
          '🚑 জরুরি রেফারেল এম্বুলেন্স ও অক্সিজেন সেবা',
        ];
      }
    } else {
      // Private general hospitals and diagnostics
      const isDiagnosticOnly = name.includes('ডায়াগনস্টিক') || name.includes('ল্যাব') || name.includes('টেস্ট') || name.includes('নিপুন') || name.includes('দিঘল') || name.includes('ডক্টরস কেয়ার');
      if (isDiagnosticOnly) {
        services = [
          '🧪 সম্পূর্ণ কম্পিউটারাইজড প্যাথলজি ও হরমোন টেস্ট',
          '📟 ডিজিটাল ১২-চ্যানেল ইসিজি ও উন্নত আল্ট্রাসোনোগ্রাফি (৪ডি)',
          '🩻 ডিজিটাল এক্স-রে ও কালার ডপলার স্টাডি',
          '🩺 বিশেষজ্ঞ ডাক্তারদের ওপিডি ও কনসালটেশন সুবিধা',
          '🩸 দ্রুত রক্তের গ্রুপ পরীক্ষা ও নির্ভরযোগ্য রিপোর্ট ডেলিভারি',
        ];
      } else {
        services = [
          '🏥 ২৪ ঘন্টা ইনডোর, কেবিন ও জেনারেল ওয়ার্ড সুবিধা',
          '🩺 গাইনী, মেডিসিন ও অর্থোপেডিক্স বিশেষজ্ঞ চেম্বার',
          '🩹 ওটি (Operation Theater) ও মেজর-মাইনর সার্জারি',
          '🤰 আধুনিক ডেলিভারি ওয়ার্ড ও গাইনী কেয়ার',
          '🧪 ডিজিটাল প্যাথলজি, ল্যাব ও ২৪ ঘন্টা ফার্মেসী সুবিধা',
          '🚑 প্রাইভেট অক্সিজেন সাপোর্ট ও সার্বক্ষণিক এম্বুলেন্স নেটওয়ার্ক',
        ];
      }
    }

    // Specialist Doctors List (Dynamic & Highly customized directory based on hospital classification)
    let doctors: Doctor[] = [];
    if (id === 'h1' || name.includes('সদর')) {
      doctors = [
        {
          name: 'ডাঃ মোঃ শরিফুল ইসলাম',
          degrees: 'MBBS, BCS (Health), FCPS (Medicine)',
          specialty: 'সিনিয়র মেডিসিন ও হৃদরোগ বিশেষজ্ঞ',
          department: 'Medicine',
          departmentBn: 'মেডিসিন বিভাগ',
          time: 'শনি - বৃহস্পতি সকাল ৯:০০ - দুপুর ১:০০',
          status: 'available',
          roomNo: '১০৫ নং কক্ষ (ওপিডি)',
          contactForAppointment: '01711223344',
        },
        {
          name: 'ডাঃ আফরোজা সুলতানা',
          degrees: 'MBBS, BCS (Health), FCPS (Gynae & Obs)',
          specialty: 'স্ত্রী রোগ, প্রসূতি বিদ্যা ও সিজারিয়ান সার্জন',
          department: 'Gynae',
          departmentBn: 'গাইনী ও প্রসূতি',
          time: 'শনি - বুধ সকাল ১০:০০ - দুপুর ২:০০',
          status: 'available',
          roomNo: '২০২ নং কক্ষ (মহিলা ব্লক)',
          contactForAppointment: '01711223345',
        },
        {
          name: 'ডাঃ তৌহিদ হাসান',
          degrees: 'MBBS, BCS (Health), MD (Pediatrics)',
          specialty: 'নবজাতক, শিশু ও কিশোর রোগ বিশেষজ্ঞ',
          department: 'Pediatrics',
          departmentBn: 'শিশু রোগ বিভাগ',
          time: 'প্রতিদিন সকাল ৯:০০ - দুপুর ২:০০',
          status: 'on_duty',
          roomNo: '১০৮ নং কক্ষ (শিশু কর্নার)',
          contactForAppointment: '01711223346',
        },
        {
          name: 'ডাঃ আহমেদ রফিক',
          degrees: 'MBBS, MS (Orthopedics), BCS (Health)',
          specialty: 'হাড়-জোড়া, ট্রমা ও আর্থ্রোপ্লাস্টি সার্জন',
          department: 'Orthopedics',
          departmentBn: 'অর্থোপেডিক',
          time: 'সোম ও বুধ সকাল ১০:০০ - দুপুর ১:০০',
          status: 'chamber_closed',
          roomNo: '১১১ নং কক্ষ (হাড়-জোড়া ওপিডি)',
          contactForAppointment: '01711223347',
        },
        {
          name: 'ডাঃ রাশেদুল হাসান',
          degrees: 'MBBS, BCS (Health), MD (Cardiology)',
          specialty: 'হৃদরোগ, উচ্চ রক্তচাপ ও বাতজ্বর বিশেষজ্ঞ',
          department: 'Cardiology',
          departmentBn: 'হৃদরোগ বিভাগ',
          time: 'রবি ও মঙ্গল সকাল ১০:০০ - দুপুর ২:০০',
          status: 'available',
          roomNo: '১০৬ নং কক্ষ (কার্ডিও কর্নার)',
          contactForAppointment: '01711223348',
        },
        {
          name: 'ডাঃ সাজ্জাদ হোসেন',
          degrees: 'MBBS, BCS (Health), MS (General Surgery)',
          specialty: 'জেনারেল, ল্যাপারোস্কোপিক ও কলোরেক্টাল সার্জন',
          department: 'Surgery',
          departmentBn: 'সার্জারি বিভাগ',
          time: 'শনি, সোম ও বুধ সকাল ৯:৩০ - দুপুর ১:৩০',
          status: 'on_duty',
          roomNo: '৩১২ নং কক্ষ (অপারেশন থিয়েটার)',
          contactForAppointment: '01711223349',
        }
      ];
    } else if (isGov) {
      doctors = [
        {
          name: `ডাঃ সাজ্জাদুল বারী (${upazila})`,
          degrees: 'MBBS, BCS (Health), MPH',
          specialty: 'উপজেলা স্বাস্থ্য ও পরিবার পরিকল্পনা কর্মকর্তা (UH&FPO)',
          department: 'Medicine',
          departmentBn: 'মেডিসিন ও প্রশাসন',
          time: 'রবি - বৃহস্পতি সকাল ৯:০০ - দুপুর ২:০০',
          status: 'available',
          roomNo: 'অফিস কক্ষ (নিচ তলা)',
          contactForAppointment: h.phoneNumber,
        },
        {
          name: 'ডাঃ নুসরাত জাহান',
          degrees: 'MBBS, BCS (Health), PGT (Pediatrics)',
          specialty: 'মেডিসিন, প্রসূতি ও শিশু স্বাস্থ্য মেডিকেল অফিসার',
          department: 'Pediatrics',
          departmentBn: 'শিশু ও প্রসূতি',
          time: 'প্রতিদিন সকাল ৯:০০ - দুপুর ২:০০',
          status: 'on_duty',
          roomNo: '১০২ নং কক্ষ',
          contactForAppointment: h.phoneNumber,
        },
        {
          name: 'ডাঃ মোঃ রাসেল শেখ',
          degrees: 'MBBS, BCS (Health)',
          specialty: 'জেনারেল ফিজিশিয়ান ও সহকারী সার্জন (জরুরি বিভাগ)',
          department: 'General',
          departmentBn: 'জেনারেল ও জরুরি',
          time: 'জরুরি রোস্টার অনুযায়ী ২৪ ঘন্টা সচল',
          status: 'on_duty',
          roomNo: 'জরুরি বিভাগ কাউন্টার',
          contactForAppointment: h.phoneNumber,
        },
        {
          name: 'ডাঃ তানভীর আহমেদ',
          degrees: 'BDS, BCS (Health)',
          specialty: 'দন্ত রোগ, মুখগহ্বর ও মাড়ি রোগ সার্জন',
          department: 'Dental',
          departmentBn: 'দন্ত বিভাগ',
          time: 'শনি - বুধ সকাল ৯:০০ - দুপুর ১:৩০',
          status: 'available',
          roomNo: '১০৫ নং দন্ত ওপিডি',
          contactForAppointment: h.phoneNumber,
        }
      ];
    } else {
      // Private hospitals/diagnostic clinics doctors
      if (name.includes('ডায়াগনস্টিক') || name.includes('ল্যাব') || name.includes('টেস্ট')) {
        doctors = [
          {
            name: 'ডাঃ সুজন আহমেদ',
            degrees: 'MBBS, BCS (Health), MD (Gastroenterology)',
            specialty: 'পরিপাকতন্ত্র, লিভার ও জন্ডিস রোগ বিশেষজ্ঞ',
            department: 'Medicine',
            departmentBn: 'মেডিসিন ও পরিপাক',
            time: 'শনি, সোম ও বুধ বিকাল ৪:০০ - রাত ৮:০০',
            status: 'available',
            roomNo: 'চেম্বার নং-৩',
            contactForAppointment: '01819887766',
          },
          {
            name: 'ডাঃ সানজিদা খাতুন',
            degrees: 'MBBS, FCPS (Gynae & Obs)',
            specialty: 'স্ত্রী রোগ, বন্ধ্যাত্ব ও প্রসূতি রোগ বিশেষজ্ঞ',
            department: 'Gynae',
            departmentBn: 'গাইনী ও প্রসূতি',
            time: 'শনি - বৃহস্পতি বিকাল ৫:০০ - রাত ৮:০০',
            status: 'available',
            roomNo: 'চেম্বার নং-১',
            contactForAppointment: '01819887767',
          },
          {
            name: 'ডাঃ বিপ্লব কুমার দাস',
            degrees: 'MBBS, BCS (Health), DEM (BIRDEM)',
            specialty: 'ডায়াবেটিস, থাইরয়েড ও হরমোন রোগ বিশেষজ্ঞ',
            department: 'Diabetes',
            departmentBn: 'ডায়াবেটিস ও হরমোন',
            time: 'প্রতিদিন বিকাল ৪:০০ - রাত ৯:০০',
            status: 'available',
            roomNo: 'চেম্বার নং-৫',
            contactForAppointment: '01819887768',
          },
          {
            name: 'ডাঃ মোঃ মুস্তাফিজুর রহমান',
            degrees: 'MBBS, BCS (Health), MD (Cardiology)',
            specialty: 'হৃদরোগ, রিউমেটিক ফিভার ও মেডিসিন বিশেষজ্ঞ',
            department: 'Cardiology',
            departmentBn: 'হৃদরোগ বিভাগ',
            time: 'বৃহস্পতি ও শুক্র সকাল ১০:০০ - রাত ৮:০০',
            status: 'chamber_closed',
            roomNo: 'চেম্বার নং-২',
            contactForAppointment: '01819887769',
          }
        ];
      } else {
        // Private General Hospitals
        doctors = [
          {
            name: 'অধ্যাপক ডাঃ আর. কে. সাহা',
            degrees: 'MBBS, FCPS (Medicine), FACP (USA), MD (Cardiology)',
            specialty: 'মেডিসিন, হৃদরোগ ও উচ্চ রক্তচাপ বিশেষজ্ঞ',
            department: 'Medicine',
            departmentBn: 'মেডিসিন ও হৃদরোগ',
            time: 'প্রতিদিন বিকাল ৫:০০ - রাত ৯:০০',
            status: 'available',
            roomNo: 'চেম্বার এ-১ (২য় তলা)',
            contactForAppointment: '01915998877',
          },
          {
            name: 'ডাঃ মারুফা আক্তার',
            degrees: 'MBBS, FCPS (Gynae & Obs), MS (Gynae)',
            specialty: 'গাইনী, প্রসূতি ও ল্যাপারোস্কোপিক সার্জন',
            department: 'Gynae',
            departmentBn: 'গাইনী ও প্রসূতি',
            time: 'প্রতিদিন বিকাল ৪:০০ - রাত ৮:৩০',
            status: 'available',
            roomNo: 'চেম্বার বি-৩ (৩য় তলা)',
            contactForAppointment: '01915998878',
          },
          {
            name: 'ডাঃ সাজিদ আল মাহমুদ',
            degrees: 'MBBS, MS (Orthopedic Surgery)',
            specialty: 'হাড়-জোড়া, পঙ্গু, ট্রমা ও বাত-ব্যথা বিশেষজ্ঞ',
            department: 'Orthopedics',
            departmentBn: 'অর্থোপেডিক সার্জন',
            time: 'শনি, সোম ও বুধ বিকাল ৫:০০ - রাত ৮:৩০',
            status: 'available',
            roomNo: 'চেম্বার এ-৪ (২য় তলা)',
            contactForAppointment: '01915998879',
          },
          {
            name: 'ডাঃ এ. এইচ. এম. শাহীন',
            degrees: 'MBBS, FCPS (Surgery)',
            specialty: 'জেনারেল, পাইলস ও কোলোরেকটাল লেজার সার্জন',
            department: 'Surgery',
            departmentBn: 'সার্জারি বিভাগ',
            time: 'প্রতিদিন বিকাল ৪:৩০ - রাত ৮:০০',
            status: 'on_duty',
            roomNo: 'ওটি উইং (৪র্থ তলা)',
            contactForAppointment: '01915998880',
          }
        ];
      }
    }

    return {
      fullAddress,
      mapLink,
      services,
      doctors,
    };
  };

  const { fullAddress, mapLink, services, doctors } = getHospitalDetails(hospital);

  // Filter doctors based on search & department selection
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doc.degrees.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doc.departmentBn.toLowerCase().includes(doctorSearch.toLowerCase());

    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  // Unique departments for filter list
  const getDeptList = () => {
    const counts: { [key: string]: number } = {};
    doctors.forEach((d) => {
      counts[d.department] = (counts[d.department] || 0) + 1;
    });

    const uniqueDepts = Array.from(new Set(doctors.map((d) => d.department)));
    const list = uniqueDepts.map((dId) => {
      const docWithDept = doctors.find((doc) => doc.department === dId);
      return {
        id: dId,
        nameBn: docWithDept ? docWithDept.departmentBn.split(' ')[0] : dId,
        count: counts[dId] || 0,
      };
    });

    return [
      { id: 'All', nameBn: 'সব বিভাগ', count: doctors.length },
      ...list,
    ];
  };

  const departments = getDeptList();

  // Handle appointment booking dialer simulation
  const handleDoctorBooking = (doc: Doctor) => {
    // Construct a simulated contact payload that maps cleanly to the parent application's dialer Confirmation Simulator modal
    const mockDoctorContact: Contact = {
      id: `doc-booking-${doc.name.replace(/\s+/g, '-')}`,
      name: `${doc.name} (বুকিং)`,
      phoneNumber: doc.contactForAppointment || hospital.phoneNumber,
      category: 'hospitals',
      upazila: hospital.upazila,
      location: `${hospital.name}, ${doc.roomNo || 'চেম্বার'}`,
      details: `${doc.specialty} — ${doc.degrees}`,
      verified: true,
    };
    onCall(mockDoctorContact);
  };

  if (!hospital) return null;

  return createPortal(
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        id="hospital-details-modal"
        className="bg-white w-full max-w-2xl rounded-3xl border-2 border-[#006A4E]/20 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Decorative Top Line */}
        <div className="h-2 bg-[#006A4E] w-full" />
        <div className="absolute top-2 left-0 right-0 h-1 bg-[#D4AF37]" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-[#006A4E]/10 text-[#006A4E] text-[10px] md:text-xs font-black px-2.5 py-0.5 rounded-md border border-[#006A4E]/10 flex items-center gap-1">
                🏥 হাসপাতাল ও ক্লিনিক
              </span>
              <span className="bg-amber-50 text-amber-800 text-[10px] md:text-xs font-black px-2.5 py-0.5 rounded-md border border-amber-200">
                {hospital.upazila} উপজেলা
              </span>
              {hospital.verified && (
                <span className="bg-emerald-50 text-[#006A4E] text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-0.5 border border-emerald-100">
                  <CheckCircle2 size={10} className="text-[#006A4E] fill-current" />
                  যাচাইকৃত তথ্য
                </span>
              )}
            </div>
            <h2 className="font-sans font-black text-lg md:text-xl text-slate-800 leading-snug">
              {hospital.name}
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-colors cursor-pointer border border-slate-100 shadow-2xs flex-shrink-0"
            title="বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Call Center Details */}
            <div className="bg-[#006A4E]/5 border border-[#006A4E]/10 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#006A4E] tracking-wider flex items-center gap-1.5">
                  <Phone size={11} className="animate-pulse" />
                  জরুরি হটলাইন নম্বর
                </span>
                <p className="font-mono font-black text-lg text-[#006A4E] mt-1">
                  {hospital.phoneNumber}
                </p>
                <p className="text-[11px] text-slate-500 font-bold mt-1">
                  {hospital.details || 'জরুরি চিকিৎসা সেবার জন্য আমাদের সাথে যোগাযোগ করুন।'}
                </p>
              </div>
              
              <button
                onClick={() => onCall(hospital)}
                className="w-full mt-4 bg-[#006A4E] hover:bg-[#005740] text-white py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer shadow-3xs hover:shadow-xs flex items-center justify-center gap-2 active:scale-98"
              >
                <Phone size={14} />
                <span>সরাসরি কল করুন (Call Now)</span>
              </button>
            </div>

            {/* Address & Navigation */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#006A4E]" />
                  অবস্থান ও ঠিকানা (Address)
                </span>
                <p className="text-xs font-bold text-slate-700 mt-1.5 leading-relaxed">
                  {fullAddress}
                </p>
                <p className="text-[11px] text-slate-450 font-bold mt-1">
                  শরীয়তপুর জেলা প্রশাসন জরুরি তথ্য নির্দেশিকা
                </p>
              </div>
              
              <a
                href={mapLink}
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full mt-4 bg-white border border-slate-300 hover:border-[#006A4E]/30 hover:bg-slate-100/50 text-slate-700 hover:text-[#006A4E] py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-2 text-center"
              >
                <Navigation size={14} className="text-rose-500" />
                <span>গুগল ম্যাপে দেখুন (Open Map)</span>
              </a>
            </div>

          </div>

          {/* Emergency Services */}
          <div className="space-y-3">
            <h3 className="font-sans font-black text-sm md:text-base text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-1.5">
              <Activity size={16} className="text-[#006A4E]" />
              উপলব্ধ জরুরি চিকিৎসা সেবা ও সুযোগ-সুবিধা (Facilities)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-emerald-50/30 border border-emerald-100/50 p-2.5 rounded-xl flex items-start gap-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50/50 transition-colors"
                >
                  <span className="mt-0.5 text-[#006A4E] text-xs">✔</span>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Doctor Directory Section */}
          <div className="space-y-4 border-t border-slate-100 pt-6">
            
            {/* Directory Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Stethoscope size={16} />
                </div>
                <div>
                  <h3 className="font-sans font-black text-sm md:text-base text-slate-850">
                    ডাক্তার ডিরেক্টরি ও সময়সূচী (Doctor Directory)
                  </h3>
                  <p className="text-[11px] text-slate-450 font-bold">
                    বিশেষজ্ঞ ডাক্তার চেম্বার, ভিজিটিং সময় ও সরাসরি বুকিং নম্বর
                  </p>
                </div>
              </div>
              <span className="text-[10px] md:text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl font-black border border-indigo-100 self-start sm:self-auto">
                {filteredDoctors.length} জন তালিকাভুক্ত
              </span>
            </div>

            {/* Search Input and Filters Area */}
            <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60 shadow-3xs">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="text"
                  placeholder="ডাক্তারের নাম, পদবী, বা বিভাগ লিখে সার্চ করুন..."
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 bg-white border-2 border-slate-200 rounded-xl text-xs font-extrabold placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                />
                {doctorSearch && (
                  <button
                    onClick={() => setDoctorSearch('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] bg-slate-150 text-slate-500 hover:text-slate-700 px-2 py-1 rounded-md font-black transition-colors"
                  >
                    ক্লিয়ার
                  </button>
                )}
              </div>

              {/* Department Badges Row */}
              <div className="flex flex-wrap gap-1.5 pt-1 items-center">
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mr-1">
                  <Filter size={10} />
                  ফিল্টার:
                </span>
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.id)}
                    className={`px-3 py-1 rounded-lg text-[10px] md:text-[11px] font-black transition-all cursor-pointer border-2
                      ${selectedDept === dept.id
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-3xs'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                  >
                    {dept.nameBn} <span className={`ml-0.5 text-[9px] ${selectedDept === dept.id ? 'text-indigo-200' : 'text-slate-400 font-black'}`}>({dept.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Doctor Cards Grid */}
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredDoctors.map((doc, idx) => {
                  // Determine status styling
                  let statusText = 'চেম্বার খোলা';
                  let statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                  if (doc.status === 'on_duty') {
                    statusText = 'অন-ডিউটি';
                    statusColor = 'bg-blue-50 text-blue-800 border-blue-200';
                  } else if (doc.status === 'chamber_closed') {
                    statusText = 'চেম্বার বন্ধ';
                    statusColor = 'bg-slate-100 text-slate-500 border-slate-200';
                  }

                  return (
                    <div 
                      key={idx}
                      className="bg-white border-2 border-slate-150 p-4 rounded-2xl flex flex-col justify-between gap-3 shadow-3xs hover:border-indigo-300 hover:shadow-2xs transition-all duration-200 relative overflow-hidden"
                    >
                      {/* Department Ribbon Tag */}
                      <div className="absolute top-0 right-0">
                        <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black px-2.5 py-0.5 rounded-bl-xl border-l border-b border-indigo-100">
                          {doc.departmentBn}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {/* Avatar & Doctor Name */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                            <Stethoscope size={15} />
                          </div>
                          <div>
                            <h4 className="font-sans font-black text-slate-800 text-xs md:text-sm pr-12">
                              {doc.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 font-bold leading-tight mt-0.5">
                              {doc.degrees}
                            </p>
                          </div>
                        </div>

                        {/* Specialty detail */}
                        <div className="text-xs font-extrabold text-indigo-900 bg-indigo-50/30 px-2 py-1 rounded-lg border border-indigo-50/50">
                          🔬 {doc.specialty}
                        </div>

                        {/* Room info if available */}
                        {doc.roomNo && (
                          <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span>অবস্থান: <strong className="text-slate-650">{doc.roomNo}</strong></span>
                          </div>
                        )}

                        {/* Timing and Status line */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <div className="bg-slate-50 border border-slate-200/60 rounded-lg px-2 py-1 flex items-center gap-1 text-[10px] text-slate-600 font-extrabold">
                            <Clock size={11} className="text-indigo-500" />
                            <span>{doc.time}</span>
                          </div>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${statusColor}`}>
                            ● {statusText}
                          </span>
                        </div>
                      </div>

                      {/* Call / Book Button */}
                      <button
                        onClick={() => handleDoctorBooking(doc)}
                        className="w-full mt-1.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white border border-indigo-200 text-indigo-700 py-2 px-3 rounded-xl text-[11px] font-black transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1.5 active:scale-97 group/btn"
                      >
                        <PhoneCall size={11} className="group-hover/btn:animate-bounce" />
                        <span>চেম্বার কল / বুকিং</span>
                        <span className="text-[9px] opacity-75 font-mono font-bold bg-indigo-100/50 group-hover/btn:bg-white/20 px-1 py-0.5 rounded ml-auto">
                          {doc.contactForAppointment || hospital.phoneNumber}
                        </span>
                        <ChevronRight size={10} className="opacity-50" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-150 rounded-3xl p-8 text-center text-slate-500 space-y-3">
                <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto text-lg">
                  🔍
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-black text-slate-700">দুঃখিত, কোনো ডাক্তার পাওয়া যায়নি।</p>
                  <p className="text-[10px] text-slate-450 font-bold">অন্য কোনো নাম, বিভাগ বা ডিগ্রি লিখে চেষ্টা করুন।</p>
                </div>
                <button
                  onClick={() => { setDoctorSearch(''); setSelectedDept('All'); }}
                  className="px-4 py-1.5 bg-white border border-slate-250 text-indigo-600 hover:text-indigo-800 rounded-xl text-xs font-black transition-colors shadow-3xs inline-flex items-center gap-1.5 mx-auto cursor-pointer active:scale-95"
                >
                  <RefreshCw size={11} />
                  সব ডাক্তার দেখুন
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4.5 border-t border-slate-150 flex items-center justify-between text-[11px] text-slate-500 font-bold">
          <div className="flex items-center gap-1.5">
            <span className="text-[#006A4E]">🏛️</span>
            <span>শরীয়তপুর জেলা প্রশাসন তথ্য বাতায়ন</span>
          </div>
          <div>
            <span>হেল্পলাইন: ১৬২৬৩ (স্বাস্থ্য বাতায়ন)</span>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};
