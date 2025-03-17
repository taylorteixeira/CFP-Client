import HeroSection from "./Herosection"
import Features from "./Features"
import Testimonials from "./Testimonials"
import CallToAction from "./CallToAction"

const Home = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <Features />
      <CallToAction />
      <Testimonials />
    </div>
  )
}

export default Home
