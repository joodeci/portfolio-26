import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HashScrollHandler from '@/components/layout/HashScrollHandler';
import HeroSection from '@/components/sections/HeroSection';
import WorkSection from '@/components/sections/WorkSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HashScrollHandler />
      <main>
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}