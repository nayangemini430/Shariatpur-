import React, { useState, useEffect } from 'react';
import regeneratedLogo from '../assets/images/regenerated_image_1786128682639.jpg';

// Imported portal logo URL provided by user - can easily be changed here later
export const PORTAL_LOGO_URL = 'https://i.postimg.cc/RV43Dffg/Gemini-Generated-Image-bg5dfqbg5dfqbg5d.png';

interface Props {
  size?: number | string;
  className?: string;
  showTextLabel?: boolean;
  src?: string;
  customLogoUrl?: string;
}

export function resolveDirectImageUrl(url?: string): string {
  if (!url || !url.trim()) return PORTAL_LOGO_URL;
  let trimmed = url.trim();

  // If already a base64 data URL, return as is
  if (trimmed.startsWith('data:image/')) return trimmed;

  // Ensure protocol if missing and not relative
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('/')) {
    trimmed = 'https://' + trimmed;
  }

  // 1. Postimages / Postimg page URLs
  if (trimmed.includes('postimg.cc/') && !trimmed.includes('i.postimg.cc/')) {
    const code = trimmed.split('postimg.cc/')[1]?.split('/')[0];
    if (code) return `https://i.postimg.cc/${code}/logo.png`;
  }
  if (trimmed.includes('postimages.org/') && !trimmed.includes('i.postimages.org/')) {
    const code = trimmed.split('postimages.org/')[1]?.split('/')[0];
    if (code) return `https://i.postimg.cc/${code}/logo.png`;
  }

  // 2. ImgBB page URLs
  if (trimmed.includes('ibb.co/') && !trimmed.includes('i.ibb.co/')) {
    const code = trimmed.split('ibb.co/')[1]?.split('/')[0];
    if (code) return `https://i.ibb.co/${code}/image.png`;
  }

  // 3. Google Drive view/open links
  if (trimmed.includes('drive.google.com')) {
    const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  // 4. Dropbox share links
  if (trimmed.includes('dropbox.com')) {
    return trimmed.replace('?dl=0', '?raw=1').replace('dl=0', 'raw=1');
  }

  // 5. Imgur page links
  if (trimmed.includes('imgur.com/') && !trimmed.includes('i.imgur.com/')) {
    const code = trimmed.split('imgur.com/')[1]?.split('/')[0]?.split('.')[0];
    if (code) return `https://i.imgur.com/${code}.png`;
  }

  // 6. GitHub blob links
  if (trimmed.includes('github.com/') && trimmed.includes('/blob/')) {
    return trimmed.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  }

  return trimmed;
}

const DEFAULT_FIXED_LOGO = PORTAL_LOGO_URL;

export const ShariatpurGovSeal: React.FC<Props> = ({
  size,
  className = '',
  showTextLabel = false,
  src,
  customLogoUrl,
}) => {
  const pixelSize = size ? (typeof size === 'number' ? `${size}px` : size) : undefined;
  
  const getEffectiveUrl = (): string => {
    const provided = src || customLogoUrl || (typeof window !== 'undefined' ? (window as any).CUSTOM_PORTAL_LOGO_URL : undefined);
    if (provided && provided.trim()) return resolveDirectImageUrl(provided);
    return DEFAULT_FIXED_LOGO;
  };

  const [logoSrc, setLogoSrc] = useState<string>(getEffectiveUrl);

  useEffect(() => {
    // Clear any previous logo cache from local storage as requested
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shariatpur_app_logo_url');
    }
    setLogoSrc(getEffectiveUrl());
  }, [src, customLogoUrl]);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={logoSrc}
        alt="শরীয়তপুর নাগরিক সেবা - গণপ্রজাতন্ত্রী বাংলাদেশ সরকার"
        style={pixelSize ? { width: pixelSize, height: pixelSize } : undefined}
        className={`flex-shrink-0 drop-shadow-sm select-none object-contain ${!pixelSize ? 'w-12 h-12 sm:w-16 sm:h-16' : ''}`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          if (logoSrc !== DEFAULT_FIXED_LOGO) {
            setLogoSrc(DEFAULT_FIXED_LOGO);
          } else {
            (e.currentTarget as HTMLImageElement).src =
              'https://i.postimg.cc/MGk5HTP9/IMG-0229.jpg';
          }
        }}
      />

      {showTextLabel && (
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase text-[#006A4E] tracking-wider font-mono">
            গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
          </span>
          <span className="text-sm font-black text-slate-900 leading-tight">
            শরীয়তপুর নাগরিক সেবা
          </span>
        </div>
      )}
    </div>
  );
};

