
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import UrgencySection from "@/components/UrgencySection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Function to handle animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-fade-in-up");
      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          
          // If element is in viewport
          if (rect.top <= windowHeight * 0.85) {
            el.style.opacity = "1";
          }
        }
      });
    };

    // Initialize animations
    handleScroll();
    
    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TrustIndicators />
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <UrgencySection />
      <Footer />
    </div>
  );
};

export default Index;
