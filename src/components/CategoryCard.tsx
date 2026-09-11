import React from 'react';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  count: number;
  onClick: () => void;
}

export const LucideIcon = ({ name, className, size = 20 }: { name: string; className?: string; size?: number }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    // Fallback if not found
    return <Icons.HelpCircle className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  count,
  onClick,
}) => {
  return (
    <button
      id={`category-btn-${category.id}`}
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 text-center group cursor-pointer w-full
        ${
          isSelected
            ? `${category.color} shadow-lg shadow-emerald-900/10 scale-[1.03] border-transparent`
            : `bg-white ${category.borderColor} hover:border-emerald-300 hover:shadow-md hover:shadow-gray-100 hover:scale-[1.01] text-slate-700`
        }
      `}
    >
      {/* Icon Container */}
      <div
        className={`p-3 rounded-xl mb-2.5 transition-colors duration-300 ${
          isSelected
            ? 'bg-white/20 text-white'
            : `${category.bgLight} text-emerald-600 group-hover:bg-emerald-50`
        }`}
      >
        <LucideIcon name={category.icon} size={24} />
      </div>

      {/* Name */}
      <span className="font-sans font-semibold text-xs md:text-sm tracking-tight line-clamp-1">
        {category.name}
      </span>

      {/* Count Badge */}
      <span
        className={`mt-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${
          isSelected
            ? 'bg-white/25 text-white'
            : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-700'
        }`}
      >
        {count} {count === 1 ? 'item' : 'items'}
      </span>

      {/* Tiny active dot indicator */}
      {isSelected && (
        <span className="absolute top-2 right-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      )}
    </button>
  );
};
