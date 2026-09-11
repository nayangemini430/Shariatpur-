import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  PenTool, 
  Search, 
  Heart, 
  MessageSquare, 
  Clock, 
  User, 
  Tag, 
  MapPin, 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Send, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { BlogPost, BlogComment } from '../types';
import { CreateBlogPostModal } from './CreateBlogPostModal';

interface Props {
  posts: BlogPost[];
  onAddPost: (post: BlogPost) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, comment: BlogComment) => void;
}

const CATEGORIES = [
  'সব পোস্ট',
  'উন্নয়ন ও অগ্রগতি',
  'নাগরিক বার্তা',
  'ঐতিহ্য ও ইতিহাস',
  'পর্যটন ও ভ্রমণ',
  'শিক্ষা ও সংস্কৃতি',
  'কৃষি ও প্রকৃতি',
];

export const DistrictBlogSection: React.FC<Props> = ({
  posts,
  onAddPost,
  onLikePost,
  onAddComment,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('সব পোস্ট');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [activePostModal, setActivePostModal] = useState<BlogPost | null>(null);

  // Comment Form state
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'সব পোস্ট' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0];

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePostModal) return;
    if (!commentAuthor.trim() || !commentText.trim()) return;

    const newComment: BlogComment = {
      id: `c-${Date.now()}`,
      author: commentAuthor.trim(),
      text: commentText.trim(),
      date: 'আজ',
    };

    onAddComment(activePostModal.id, newComment);

    // Update active modal view state
    setActivePostModal({
      ...activePostModal,
      comments: [newComment, ...activePostModal.comments],
    });

    setCommentText('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      {/* Blog Section Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-[#006A4E] to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles size={12} /> নাগরিক কণ্ঠ ও জেলা বার্তা
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight leading-tight">
              শরীয়তপুর জেলা ব্লগ ও ডিজিটাল ফোরাম
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium leading-relaxed">
              জেলার উন্নয়ন, স্থানীয় ইতিহাস, পর্যটন, কৃষি ও নাগরিক ভাবনা বিষয়ক নিয়মিত আর্টিকেল ও মতামত। আপনার মতামত বা লেখা এখানে সবার সাথে শেয়ার করুন।
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 self-start md:self-auto active:scale-95 group"
          >
            <PenTool size={18} className="group-hover:rotate-12 transition-transform" />
            <span>নতুন ব্লগ লিখুন (Write Post)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ব্লগ পোস্ট বা লেখক খুঁজুন..."
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-2 pl-9 pr-8 text-xs font-semibold focus:border-[#006A4E] focus:bg-white outline-none"
            />
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="text-xs font-bold text-slate-500">
            মোট ব্লগ পোস্ট: <span className="text-[#006A4E] font-black">{filteredPosts.length}টি</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#006A4E] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Hero Article (Shows if no search filter active and featured exists) */}
      {!searchQuery && selectedCategory === 'সব পোস্ট' && featuredPost && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-6 relative h-64 md:h-auto overflow-hidden">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#006A4E] text-white rounded-full text-[11px] font-black shadow-md uppercase tracking-wider">
                🌟 স্পেশাল ফিচার
              </span>
            </div>
          </div>

          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
                <span className="bg-emerald-50 text-[#006A4E] px-2.5 py-1 rounded-lg border border-emerald-100">
                  {featuredPost.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {featuredPost.readTime}
                </span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>

              <h3
                onClick={() => setActivePostModal(featuredPost)}
                className="text-xl sm:text-2xl font-black text-slate-900 leading-snug hover:text-[#006A4E] cursor-pointer transition-colors"
              >
                {featuredPost.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#006A4E]/10 rounded-full flex items-center justify-center font-bold text-[#006A4E] text-xs">
                  {featuredPost.authorName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {featuredPost.authorName}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {featuredPost.authorRole} • {featuredPost.authorUpazila}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActivePostModal(featuredPost)}
                className="px-4 py-2 bg-slate-100 hover:bg-[#006A4E] hover:text-white text-slate-800 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>পড়ুন</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Cover Image */}
              <div
                onClick={() => setActivePostModal(post)}
                className="relative h-44 overflow-hidden cursor-pointer"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
                  {post.category}
                </span>
                {post.isVerified && (
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white p-1 rounded-full shadow-md">
                    <CheckCircle2 size={12} />
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h4
                  onClick={() => setActivePostModal(post)}
                  className="font-bold text-base text-slate-900 leading-snug line-clamp-2 hover:text-[#006A4E] cursor-pointer transition-colors"
                >
                  {post.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate pr-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-[10px] flex-shrink-0">
                  {post.authorName.charAt(0)}
                </div>
                <span className="font-bold text-slate-700 truncate text-[11px]">
                  {post.authorName}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-500 font-bold text-[11px] flex-shrink-0">
                <button
                  onClick={() => onLikePost(post.id)}
                  className="flex items-center gap-1 hover:text-rose-600 transition-colors"
                >
                  <Heart size={13} className={post.likesCount > 100 ? 'fill-rose-500 text-rose-500' : ''} />
                  <span>{post.likesCount}</span>
                </button>

                <button
                  onClick={() => setActivePostModal(post)}
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                >
                  <MessageSquare size={13} />
                  <span>{post.comments.length}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <BookOpen size={40} className="mx-auto text-slate-300" />
          <h4 className="font-bold text-base text-slate-700">কোনো ব্লগ পোস্ট পাওয়া যায়নি</h4>
          <p className="text-xs text-slate-400">
            আপনার কাঙ্ক্ষিত ক্যাটাগরি বা শব্দ দিয়ে অন্য কোনো পোস্ট খুঁজুন বা নিজেই একটি নতুন ব্লগ পোস্ট করুন।
          </p>
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-5 py-2 bg-[#006A4E] text-white rounded-xl font-bold text-xs"
          >
            নতুন ব্লগ পোস্ট লিখুন
          </button>
        </div>
      )}

      {/* Reader Modal */}
      {activePostModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col">
            {/* Modal Top Bar */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#006A4E] text-white rounded-lg text-[10px] font-bold">
                  {activePostModal.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activePostModal.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Share2 size={12} />
                  <span>{copySuccess ? 'কপি হয়েছে!' : 'শেয়ার'}</span>
                </button>
                <button
                  onClick={() => setActivePostModal(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Reader Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Title & Author */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                  {activePostModal.title}
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#006A4E] text-white rounded-full flex items-center justify-center font-black text-sm">
                      {activePostModal.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">
                        {activePostModal.authorName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {activePostModal.authorRole} • {activePostModal.authorUpazila} উপজেলা
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onLikePost(activePostModal.id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Heart size={15} className="fill-rose-500" />
                      <span>{activePostModal.likesCount} লাইক</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden max-h-80 w-full border border-slate-200">
                <img
                  src={activePostModal.coverImage}
                  alt={activePostModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-medium">
                {activePostModal.content}
              </div>

              {/* Comments Section */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <h4 className="font-black text-lg text-slate-900 flex items-center gap-2">
                  <MessageSquare size={18} className="text-[#006A4E]" />
                  <span>মন্তব্য ও আলোচনা ({activePostModal.comments.length})</span>
                </h4>

                {/* Comment Box Form */}
                <form onSubmit={handleSendComment} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      placeholder="আপনার নাম..."
                      className="bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-semibold focus:border-[#006A4E] outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="আপনার মূল্যবান মতামত লিখুন..."
                      className="flex-1 bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-medium focus:border-[#006A4E] outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#006A4E] text-white rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-[#005740] transition-colors cursor-pointer"
                    >
                      <Send size={14} />
                      <span>মন্তব্য করুন</span>
                    </button>
                  </div>
                </form>

                {/* Comment list */}
                <div className="space-y-2.5 pt-2">
                  {activePostModal.comments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="font-black text-slate-900">{comment.author}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{comment.date}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed font-medium">{comment.text}</p>
                    </div>
                  ))}

                  {activePostModal.comments.length === 0 && (
                    <p className="text-xs text-slate-400 italic text-center py-2">
                      এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনিই করুন!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modal for creating a new post */}
      <CreateBlogPostModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onAddPost={onAddPost}
      />
    </section>
  );
};
