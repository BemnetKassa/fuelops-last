import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import RoleFeatures from '@/components/landing/RoleFeatures';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <RoleFeatures />
      <HowItWorks />
      <CTASection />
    </div>
  );
}
