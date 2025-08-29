
import { Button } from "@/components/ui/button";
import { ShieldCheck, TrendingUp, Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-24 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-primary-purple opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <span className="text-sm font-medium">{t("hero.badge")}</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {t("hero.title1")} <span className="text-primary-purple">{t("hero.title2")}</span> {t("hero.title3")}
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              {t("hero.description")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <Button size="lg" className="bg-primary-purple hover:bg-secondary-purple text-white font-medium px-6">
                {t("hero.getStartedFree")}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 text-gray-700 font-medium px-6"
                onClick={() => window.location.href = '/demo'}
              >
                {t("hero.bookDemo")}
              </Button>
            </div>
            
            <p className="text-sm text-gray-600 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
              {t("hero.urgencyText")}
            </p>
            
            <div className="pt-4 grid grid-cols-3 gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "1s" }}>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-2">
                  <ShieldCheck className="h-5 w-5 text-primary-purple" />
                </div>
                <p className="text-sm text-gray-600">{t("hero.privacyCompliant")}</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary-purple" />
                </div>
                <p className="text-sm text-gray-600">{t("hero.conversionRate")}</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-2">
                  <Search className="h-5 w-5 text-primary-purple" />
                </div>
                <p className="text-sm text-gray-600">{t("hero.betterTargeting")}</p>
              </div>
            </div>
          </div>
          
          <div className="relative opacity-0 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
            <div className="relative z-10">
              <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-100">
                <div className="mb-6 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-purple flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">{t("hero.dashboard")}</h3>
                      <p className="text-xs text-gray-500">{t("hero.realTime")}</p>
                    </div>
                  </div>
                  <span className="text-green-500 text-sm font-medium">+24%</span>
                </div>
                
                <div className="space-y-4">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-primary-purple h-full rounded-full animate-pulse-slow" style={{ width: "75%" }}></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">{t("hero.optInRate")}</p>
                      <p className="font-medium">87%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">{t("hero.conversions")}</p>
                      <p className="font-medium">+34%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">{t("hero.trustScore")}</p>
                      <p className="font-medium">98/100</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{t("hero.complianceStatus")}</p>
                    <div className="flex items-center">
                      <ShieldCheck className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium">{t("hero.allCompliant")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r from-primary-purple/10 to-blue-500/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
