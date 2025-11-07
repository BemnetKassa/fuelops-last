import HeroSection from '../components/Landing/HeroSection'
import RoleFeatures from '../components/Landing/RoleFeatures'
import HowItWorks from '../components/Landing/HowItWorks'
import CTASection from '../components/Landing/CTASection'
import Footer from '../components/Landing/Footer'

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <RoleFeatures />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  )
}
