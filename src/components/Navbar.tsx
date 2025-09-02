
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OptimizedImage from "@/components/OptimizedImage";
import { useDebounceResize } from "@/hooks/usePerformantLayout";

const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const isHomePage = location.pathname === '/';

  const handleNavigation = useCallback((sectionId: string) => {
    if (isHomePage) {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If on other page, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
  }, [isHomePage, navigate]);

  const handleGetStarted = useCallback(() => {
    if (isHomePage) {
      // If on home page, scroll to contact
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If on other page, navigate to home contact section
      navigate('/#contact');
    }
  }, [isHomePage, navigate]);

  // Optimized scroll handler with throttling to prevent forced reflows
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      // Use requestAnimationFrame to batch DOM reads
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 10);
      });
    }, 10);
  }, []);

  useEffect(() => {
    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <picture>
              <source srcSet="/privapulselogo.webp" type="image/webp" />
              <img 
                src="/privapulselogo.png" 
                alt="PULSE Analytics Logo" 
                className="h-12 w-auto"
                width={128}
                height={56}
              />
            </picture>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-primary-purple font-medium transition-colors"
            >
              {t("nav.home")}
            </button>
            <button 
              onClick={() => handleNavigation('features')}
              className="text-gray-700 hover:text-primary-purple font-medium transition-colors"
            >
              {t("nav.features")}
            </button>
            <button 
              onClick={() => handleNavigation('how-it-works')}
              className="text-gray-700 hover:text-primary-purple font-medium transition-colors"
            >
              {t("nav.howItWorks")}
            </button>
            <button 
              onClick={() => handleNavigation('testimonials')}
              className="text-gray-700 hover:text-primary-purple font-medium transition-colors"
            >
              {t("nav.testimonials")}
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              className="text-gray-700 hover:text-primary-purple font-medium transition-colors"
            >
              {t("nav.pricing")}
            </button>
            <LanguageSwitcher />
            <Button 
              className="bg-primary-purple hover:bg-secondary-purple text-white"
              onClick={handleGetStarted}
            >
              {t("nav.getStarted")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Toggle Menu" className="text-gray-700">
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-3 px-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/');
                }}
                className="text-gray-700 hover:text-primary-purple font-medium transition-colors py-2 text-left"
              >
                {t("nav.home")}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavigation('features');
                }}
                className="text-gray-700 hover:text-primary-purple font-medium transition-colors py-2 text-left"
              >
                {t("nav.features")}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavigation('how-it-works');
                }}
                className="text-gray-700 hover:text-primary-purple font-medium transition-colors py-2 text-left"
              >
                {t("nav.howItWorks")}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavigation('testimonials');
                }}
                className="text-gray-700 hover:text-primary-purple font-medium transition-colors py-2 text-left"
              >
                {t("nav.testimonials")}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/pricing');
                }}
                className="text-gray-700 hover:text-primary-purple font-medium transition-colors py-2 text-left"
              >
                {t("nav.pricing")}
              </button>
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <Button 
                className="bg-primary-purple hover:bg-secondary-purple text-white w-full mt-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleGetStarted();
                }}
              >
                {t("nav.getStarted")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
