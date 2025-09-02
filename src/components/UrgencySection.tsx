import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { useDaysCountdown } from "@/hooks/useCountdown";
import { Clock, TrendingDown, TrendingUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const UrgencySection = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Simple days countdown that updates daily
  const daysLeft = useDaysCountdown();

  const isHomePage = location.pathname === '/';

  const handleStartTrial = () => {
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
  };

  const CountdownBox = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 min-w-[120px] shadow-lg border border-white/30">
      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
        {value}
      </div>
      <div className="text-sm uppercase text-purple-100 font-medium tracking-wide">
        {label}
      </div>
    </div>
  );

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-primary-purple via-secondary-purple to-primary-blue relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto text-center max-w-5xl relative z-10">
        {/* Alert Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg animate-pulse flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {t("urgency.badge")}
          </div>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-white leading-tight">
          {t("urgency.title")}
        </h2>

        {/* Countdown Timer - Days Only */}
        <div className="flex justify-center mb-6">
          <CountdownBox value={daysLeft} label="DAYS LEFT" />
        </div>

        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-purple-200 mb-4">
            Debug: Today = {new Date().toLocaleDateString()}, Target = December 31, 2025, Days = {daysLeft}
          </div>
        )}

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-purple-100 font-medium mb-8">
          {t("urgency.subtitle")}
        </p>

        {/* Risk vs Advantage */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {/* Waiting Risks */}
          <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-red-300/30">
            <div className="flex items-center justify-center mb-4">
              <TrendingDown className="w-8 h-8 text-red-300 mr-3" />
              <h3 className="font-bold text-lg text-red-100">
                {t("urgency.waitingRisks")}
              </h3>
            </div>
          </div>

          {/* Pulse Advantage */}
          <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-300/30">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-green-300 mr-3" />
              <h3 className="font-bold text-lg text-green-100">
                {t("urgency.pulseAdvantage")}
              </h3>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button 
            onClick={handleStartTrial}
            className="bg-white text-primary-purple hover:bg-gray-100 font-bold py-4 px-8 text-lg shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-white/20"
            size="lg"
          >
            {t("urgency.ctaButton")}
          </Button>
          
          <p className="text-purple-200 text-sm font-medium">
            {t("urgency.supportNote")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;