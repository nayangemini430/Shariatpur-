export type Upazila = 'Sadar' | 'Naria' | 'Zajira' | 'Bhedarganj' | 'Damudya' | 'Gosairhat' | 'All';

export type CategoryId =
  | 'hotlines'
  | 'police'
  | 'fire_service'
  | 'ambulance'
  | 'hospitals'
  | 'blood_donors'
  | 'pharmacies'
  | 'transportation'
  | 'gov_offices'
  | 'mechanics'
  | 'education'
  | 'banks'
  | 'legal_help'
  | 'journalists'
  | 'hotels_tourism'
  | 'agriculture'
  | 'union_parishad'
  | 'passport_land'
  | 'home_nursing'
  | 'courier';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string; // Lucide icon name
  description: string;
  color: string; // Tailwind color class for active state
  borderColor: string;
  bgLight: string;
}

export interface Contact {
  id: string;
  name: string;
  category: CategoryId;
  phoneNumber: string;
  upazila: Exclude<Upazila, 'All'>;
  location: string;
  details?: string;
  isEmergency?: boolean;
  verified?: boolean;
  mapLink?: string;
  emergencyServices?: string[];
  doctorList?: string[];
  addressDetail?: string;
}

export interface BlogComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorUpazila: Exclude<Upazila, 'All'> | 'অন্যান্য';
  category: 'উন্নয়ন ও অগ্রগতি' | 'নাগরিক বার্তা' | 'ঐতিহ্য ও ইতিহাস' | 'পর্যটন ও ভ্রমণ' | 'শিক্ষা ও সংস্কৃতি' | 'কৃষি ও প্রকৃতি';
  date: string;
  coverImage: string;
  readTime: string;
  likesCount: number;
  comments: BlogComment[];
  isVerified?: boolean;
}

declare global {
  interface Window {
    Tawk_API?: {
      toggle?: () => void;
      maximize?: () => void;
      minimize?: () => void;
      popup?: () => void;
      showWidget?: () => void;
      hideWidget?: () => void;
      [key: string]: any;
    };
    Tawk_LoadStart?: Date;
  }
}


