import { HeroSection } from '../components/HeroSection';
import { NewsGrid } from '../components/NewsGrid';
import { BusinessSection } from '../components/BusinessSection';
import { SportsSection } from '../components/SportsSection';
import { EntertainmentSection } from '../components/EntertainmentSection';
import { FeaturedSection } from '../components/FeaturedSection';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <NewsGrid />
      <BusinessSection />
      <SportsSection />
      <EntertainmentSection />
      <FeaturedSection />
    </main>
  );
}