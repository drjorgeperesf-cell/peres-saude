import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustMarquee from './components/TrustMarquee';
import Credentials from './components/Credentials';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import PremiumExperience from './components/PremiumExperience';
import Testimonials from './components/Testimonials';
import FormSection from './components/FormSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-7');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-7', 'transition-all', 'duration-700', 'ease-out');
      if (el.classList.contains('d1')) el.classList.add('delay-100');
      if (el.classList.contains('d2')) el.classList.add('delay-200');
      if (el.classList.contains('d3')) el.classList.add('delay-300');
      observer.observe(el);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans overflow-x-hidden selection:bg-[#00D47E] selection:text-[#050A18]">
      <Header />
      <main>
        <Hero />
        <div className="relative h-[100px] bg-[#050A18] overflow-hidden">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute bottom-0 w-full h-[100px]">
            <path d="M0,35 C360,100 720,0 1080,50 C1260,75 1380,60 1440,68 L1440,100 L0,100 Z" fill="#FFFFFF" />
          </svg>
        </div>
        <TrustMarquee />
        <Credentials />
        <Services />
        <HowItWorks />
        <PremiumExperience />
        <Testimonials />
        <FormSection />
        <FAQ />
      </main>
      <Footer />
      <ChatWidget />
      <WhatsAppButton />
    </div>
  );
}
