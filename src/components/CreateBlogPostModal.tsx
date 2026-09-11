import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, PenTool, Image, Sparkles, Check, FileText, User, MapPin, Tag } from 'lucide-react';
import { BlogPost, Upazila } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: BlogPost) => void;
}

const PRESET_IMAGES = [
  { label: 'পদ্মা সেতু / যাতায়াত', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80' },
  { label: 'পদ্মা নদী ও রিভারভিউ', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { label: 'শিক্ষা ও বইপত্র', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80' },
  { label: 'কৃষি ও প্রকৃতি', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
  { label: 'সরকারি ও ঐতিহ্য', url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80' },
];

export const CreateBlogPostModal: React.FC<Props> = ({ isOpen, onClose, onAddPost }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BlogPost['category']>('উন্নয়ন ও অগ্রগতি');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('স্থানীয় লেখক ও নাগরিক');
  const [authorUpazila, setAuthorUpazila] = useState<Exclude<Upazila, 'All'> | 'অন্যান্য'>('Sadar');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('অনুগ্রহ করে ব্লগের শিরোনাম লিখুন।');
      return;
    }
    if (!authorName.trim()) {
      setErrorMsg('অনুগ্রহ করে লেখকের নাম লিখুন।');
      return;
    }
    if (!content.trim() || content.trim().length < 30) {
      setErrorMsg('ব্লগের বিষয়বস্তু অন্তত ৩০ অক্ষরের হতে হবে।');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const finalImage = customImageUrl.trim() ? customImageUrl.trim() : coverImage;
    const wordCount = content.trim().split(/\s+/).length;
    const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 100))} মিনিট`;

    const newPost: BlogPost = {
      id: `blog-user-${Date.now()}`,
      title: title.trim(),
      excerpt: excerpt.trim() || content.trim().substring(0, 120) + '...',
      content: content.trim(),
      authorName: authorName.trim(),
      authorRole: authorRole.trim() || 'নাগরিক',
      authorUpazila,
      category,
      date: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      coverImage: finalImage,
      readTime: estimatedReadTime,
      likesCount: 1,
      comments: [],
      isVerified: false,
    };

    setTimeout(() => {
      onAddPost(newPost);
      setIsSubmitting(false);
      // Reset
      setTitle('');
      setExcerpt('');
      setContent('');
      setAuthorName('');
      setCustomImageUrl('');
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#006A4E] to-[#00523C] text-white flex items-center justify-between border-b border-[#004230]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-white/20">
              ✍️
            </div>
            <div>
              <h3 className="text-lg font-black font-display tracking-tight flex items-center gap-2">
                <span>নতুন জেলা ব্লগ বা নাগরিক পোস্ট প্রকাশ করুন</span>
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                শরীয়তপুর জেলা বাতায়নে আপনার অভিজ্ঞতা, মতামত ও তথ্য তুলে ধরুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-100 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-slate-800">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-2">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <PenTool size={14} className="text-[#006A4E]" />
              ব্লগের শিরোনাম (Title) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="উদাহরণ: শরীয়তপুর জেলা হাসপাতাল ও স্বাস্থ্য সেবার মানোন্নয়নে আমাদের প্রস্তাবনা"
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:bg-white focus:border-[#006A4E] outline-none transition-all"
            />
          </div>

          {/* Category & Upazila */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Tag size={14} className="text-[#006A4E]" />
                ক্যাটাগরি <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#006A4E] outline-none cursor-pointer"
              >
                <option value="উন্নয়ন ও অগ্রগতি">🏗️ উন্নয়ন ও অগ্রগতি</option>
                <option value="নাগরিক বার্তা">📢 নাগরিক বার্তা</option>
                <option value="ঐতিহ্য ও ইতিহাস">🏛️ ঐতিহ্য ও ইতিহাস</option>
                <option value="পর্যটন ও ভ্রমণ">🏞️ পর্যটন ও ভ্রমণ</option>
                <option value="শিক্ষা ও সংস্কৃতি">🎓 শিক্ষা ও সংস্কৃতি</option>
                <option value="কৃষি ও প্রকৃতি">🌾 কৃষি ও প্রকৃতি</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#006A4E]" />
                লেখকের উপজেলা / এলাকা
              </label>
              <select
                value={authorUpazila}
                onChange={(e) => setAuthorUpazila(e.target.value as any)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#006A4E] outline-none cursor-pointer"
              >
                <option value="Sadar">শরীয়তপুর সদর</option>
                <option value="Naria">নড়িয়া</option>
                <option value="Zajira">জাজিরা</option>
                <option value="Bhedarganj">ভেদরগঞ্জ</option>
                <option value="Damudya">ডামুড্যা</option>
                <option value="Gosairhat">গোসাইরহাট</option>
                <option value="অন্যান্য">অন্যান্য এলাকা</option>
              </select>
            </div>
          </div>

          {/* Author info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User size={14} className="text-[#006A4E]" />
                লেখকের নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="উদাহরণ: কাজী আশরাফ"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:border-[#006A4E] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                লেখকের পরিচয় / পদবী
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="উদাহরণ: শিক্ষক / সমাজকর্মী / ছাত্র"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:border-[#006A4E] outline-none transition-all"
              />
            </div>
          </div>

          {/* Cover Image Selection */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Image size={14} className="text-[#006A4E]" />
              কভার ছবি নির্বাচন করুন
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
              {PRESET_IMAGES.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setCoverImage(img.url);
                    setCustomImageUrl('');
                  }}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 text-[11px] font-bold transition-all cursor-pointer ${
                    coverImage === img.url && !customImageUrl
                      ? 'border-[#006A4E] bg-emerald-50 text-[#006A4E] ring-2 ring-[#006A4E]/20'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-7 h-7 rounded-lg object-cover" />
                  <span className="truncate">{img.label}</span>
                </button>
              ))}
            </div>
            <input
              type="url"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="অথবা আপনার নিজের কভার ছবির অনলাইন লিংক (URL) দিন..."
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-800 focus:bg-white focus:border-[#006A4E] outline-none"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText size={14} className="text-[#006A4E]" />
              সংক্ষিপ্ত সারসংক্ষেপ (Excerpt)
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="১-২ লাইনে পোস্টের সারসংক্ষেপ (ফাঁকা রাখলে প্রথম অংশ স্বয়ংক্রিয়ভাবে নেওয়া হবে)"
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:bg-white focus:border-[#006A4E] outline-none"
            />
          </div>

          {/* Main Article Body */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#006A4E]" />
                ব্লগের মূল বক্তব্য / বিস্তারিত বিবরণ <span className="text-rose-500">*</span>
              </span>
              <span className="text-[10px] text-slate-400">অন্তত ৩০ অক্ষর</span>
            </label>
            <textarea
              rows={7}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="এখানে আপনার ব্লগের বিস্তারিত লেখা লিখুন। আপনি আপনার অভিজ্ঞতা, প্রস্তাবনা, তথ্য বা মতামত খোলামেলাভাবে শেয়ার করতে পারেন..."
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-sm font-medium leading-relaxed text-slate-900 focus:bg-white focus:border-[#006A4E] outline-none transition-all"
            />
          </div>

          {/* Submit buttons */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#006A4E] hover:bg-[#005740] text-white rounded-xl font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Check size={16} />
              <span>{isSubmitting ? 'পোস্ট প্রকাশিত হচ্ছে...' : 'ব্লগ পোস্ট প্রকাশ করুন'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
