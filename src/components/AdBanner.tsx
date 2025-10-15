interface AdSpace {
  id: number;
  language_id: number;
  category_id: number | null;
  ad_space: string | null;
  ad_featured_section_id: number;
  ad_image: string;
  web_ad_image: string;
  ad_url: string;
  date: string;
  status: number;
  created_at: string;
  updated_at: string;
}

interface AdBannerProps {
  adSpace?: AdSpace | null;
  className?: string;
}

export function AdBanner({ adSpace, className = '' }: AdBannerProps) {
  // Don't render anything if no ad space
  if (!adSpace) {
    return null;
  }

  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <a
          href={adSpace.ad_url || '#'}
          target={adSpace.ad_url ? '_blank' : '_self'}
          rel={adSpace.ad_url ? 'noopener noreferrer' : undefined}
          className="block hover:opacity-90 transition-opacity"
        >
          <img
            src={adSpace.web_ad_image || adSpace.ad_image}
            alt="Advertisement"
            className="w-full h-auto rounded-lg"
          />
        </a>
      </div>
    </div>
  );
}
