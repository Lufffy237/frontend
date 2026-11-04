import { HeroSlider } from '@/components/sections/HeroSlider';
import { WelcomeSection } from '@/components/sections/WelcomeSection';
import { KeyFigures } from '@/components/sections/KeyFigures';
import { ExcellenceSection } from '@/components/sections/ExcellenceSection';
import { NetworkSection } from '@/components/sections/NetworkSection';
import { PartnersSection } from '@/components/home/PartnersSection';
import { CraftsmanshipSection } from '@/components/sections/CraftsmanshipSection';
import { AwardsSection } from '@/components/home/AwardsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <WelcomeSection />
      <KeyFigures />
      <ExcellenceSection />
      <NetworkSection />
      <PartnersSection />
      <CraftsmanshipSection />
      <AwardsSection />
    </div>
  );
}