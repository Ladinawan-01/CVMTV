// Reusable Skeleton Loading Components

export function SkeletonText({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} />
  );
}

export function SkeletonImage({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${className}`} />
  );
}

// News Card Skeleton
export function NewsCardSkeleton() {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <SkeletonImage className="w-full aspect-video" />
      <div className="p-4 sm:p-6 space-y-3">
        <SkeletonText className="h-4 w-20" />
        <SkeletonText className="h-6 w-full" />
        <SkeletonText className="h-6 w-3/4" />
        <SkeletonText className="h-4 w-full" />
        <SkeletonText className="h-4 w-5/6" />
        <div className="flex items-center gap-4 pt-2">
          <SkeletonText className="h-3 w-24" />
          <SkeletonText className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

// Featured Story Skeleton
export function FeaturedStorySkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800">
      <SkeletonImage className="w-full sm:w-56 h-48 sm:h-36" />
      <div className="flex-1 space-y-3">
        <SkeletonText className="h-4 w-16" />
        <SkeletonText className="h-6 w-full" />
        <SkeletonText className="h-6 w-4/5" />
        <SkeletonText className="h-4 w-full" />
        <SkeletonText className="h-4 w-3/4" />
        <div className="flex items-center gap-3 pt-2">
          <SkeletonText className="h-3 w-20" />
          <SkeletonText className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

// Trending Story Skeleton
export function TrendingStorySkeleton({ index }: { index: number }) {
  return (
    <div className="flex gap-3">
      <span className="text-2xl font-bold text-gray-300 dark:text-gray-700 flex-shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 space-y-2">
        <SkeletonText className="h-4 w-full" />
        <SkeletonText className="h-4 w-3/4" />
        <SkeletonText className="h-3 w-20" />
      </div>
    </div>
  );
}

// Section Grid Skeleton
export function SectionGridSkeleton() {
  return (
    <div className="space-y-6">
      <SkeletonImage className="h-40 sm:h-48 w-full" />
      <SkeletonText className="h-6 w-full" />
      <SkeletonText className="h-6 w-4/5" />
      <div className="flex items-center gap-3">
        <SkeletonText className="h-3 w-24" />
        <SkeletonText className="h-3 w-20" />
      </div>
      <div className="pt-4 space-y-3">
        <SkeletonText className="h-4 w-full" />
        <SkeletonText className="h-4 w-full" />
        <SkeletonText className="h-4 w-4/5" />
        <SkeletonText className="h-4 w-full" />
        <SkeletonText className="h-4 w-3/4" />
      </div>
    </div>
  );
}

// Business/Sports/Entertainment Main Story Skeleton
export function MainStorySkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonImage className="h-64 sm:h-80 lg:h-96 w-full rounded-lg" />
      <SkeletonText className="h-8 w-full" />
      <SkeletonText className="h-8 w-3/4" />
      <SkeletonText className="h-5 w-full" />
      <SkeletonText className="h-5 w-4/5" />
      <div className="flex items-center gap-3">
        <SkeletonText className="h-4 w-24" />
        <SkeletonText className="h-4 w-28" />
      </div>
    </div>
  );
}

// Small Card Skeleton (for side stories)
export function SmallCardSkeleton() {
  return (
    <div className="space-y-2">
      <SkeletonImage className="h-32 w-full rounded-lg" />
      <SkeletonText className="h-4 w-full" />
      <SkeletonText className="h-4 w-3/4" />
      <div className="flex items-center gap-2">
        <SkeletonText className="h-3 w-20" />
        <SkeletonText className="h-3 w-16" />
      </div>
    </div>
  );
}

// Category Page Grid Skeleton
export function CategoryPageSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Story Detail Page Skeleton
export function StoryDetailSkeleton() {
  return (
    <article className="bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Top Ad Skeleton */}
        <div className="mb-6 flex justify-center">
          <SkeletonImage className="w-full max-w-3xl h-24" />
        </div>

        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <SkeletonText className="h-5 w-20" />
          <SkeletonText className="h-5 w-32" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Ad Skeleton */}
          <div className="hidden lg:block lg:col-span-2">
            <SkeletonImage className="w-full h-96 sticky top-24" />
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-8">
            {/* Category Badge */}
            <SkeletonText className="h-6 w-24 mb-4" />
            
            {/* Title */}
            <SkeletonText className="h-12 w-full mb-2" />
            <SkeletonText className="h-12 w-3/4 mb-4" />

            {/* Meta */}
            <div className="flex flex-wrap gap-4 pb-6 border-b border-gray-200 dark:border-gray-800 mb-6">
              <SkeletonText className="h-4 w-32" />
              <SkeletonText className="h-4 w-24" />
              <SkeletonText className="h-4 w-20" />
            </div>

            {/* Featured Image */}
            <SkeletonImage className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] mb-8 rounded-lg" />

            {/* Content */}
            <div className="space-y-4 mb-12">
              <SkeletonText className="h-4 w-full" />
              <SkeletonText className="h-4 w-full" />
              <SkeletonText className="h-4 w-5/6" />
              <SkeletonText className="h-4 w-full" />
              <SkeletonText className="h-4 w-4/5" />
              <SkeletonText className="h-4 w-full" />
              <SkeletonText className="h-4 w-3/4" />
            </div>

            {/* Related Stories Skeleton */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
              <SkeletonText className="h-8 w-48 mb-6" />
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <SkeletonImage className="h-40 sm:h-48 rounded-lg" />
                    <SkeletonText className="h-5 w-full" />
                    <SkeletonText className="h-5 w-3/4" />
                    <SkeletonText className="h-4 w-full" />
                    <SkeletonText className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Ad Skeleton */}
          <div className="hidden lg:block lg:col-span-2">
            <SkeletonImage className="w-full h-96 sticky top-24" />
          </div>
        </div>

        {/* Bottom Ad Skeleton */}
        <div className="mt-8 flex justify-center">
          <SkeletonImage className="w-full max-w-3xl h-24" />
        </div>
      </div>
    </article>
  );
}

