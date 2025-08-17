
import { Server, ShieldCheck, Brain, TrendingUp, Database, Award } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Features = () => {
  const { t } = useLanguage();
  
  const featureItems = [
    {
      icon: <Server className="w-6 h-6 text-primary-purple" />,
      title: "Server-Side Analytics Engine",
      description: "Track every conversion and user journey without cookies. Get GA4-level insights with 99.9% accuracy, even after Chrome's cookie deprecation.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary-purple" />,
      title: "Automated Compliance Shield",
      description: "Stay compliant with GDPR, CCPA, and 47 other privacy laws automatically. Real-time monitoring prevents violations before they happen.",
    },
    {
      icon: <Brain className="w-6 h-6 text-primary-purple" />,
      title: "Smart Consent Management",
      description: "Dynamic consent flows that adapt to user location and preferences. Increase opt-in rates by 340% with our psychology-based approach.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary-purple" />,
      title: "AI-Powered Attribution",
      description: "Never lose attribution again. Our machine learning models track customer journeys across channels without invading privacy.",
    },
    {
      icon: <Database className="w-6 h-6 text-primary-purple" />,
      title: "First-Party Data Hub",
      description: "Collect and activate customer data ethically. Build rich user profiles through value-exchange interactions, not surveillance.",
    },
    {
      icon: <Award className="w-6 h-6 text-primary-purple" />,
      title: "Real-Time Trust Scoring",
      description: "Show customers exactly how their data is used. Display live privacy credentials that build trust and increase conversions by 28%.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {t("features.title")} <span className="text-primary-purple">{t("features.titleHighlight")}</span>
          </h2>
          <p className="text-gray-600 text-lg">
            {t("features.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
