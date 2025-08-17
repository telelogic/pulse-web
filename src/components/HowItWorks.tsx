
import { ShieldCheck, Users, Database, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "One-Click Migration",
      description: "Import your existing GA4, Facebook Ads, and CRM data instantly. Our AI handles the technical setup while you focus on growth.",
      color: "bg-primary-purple",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Intelligent Tracking Deployment",
      description: "Our server-side engine starts collecting data immediately - no cookies required. Full attribution from day one.",
      color: "bg-primary-blue",
    },
    {
      icon: <Database className="w-6 h-6 text-white" />,
      title: "Automated Compliance Activation",
      description: "Privacy policies update automatically, consent flows optimize themselves, and audit trails generate in real-time.",
      color: "bg-secondary-purple",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: "Scale Without Limits",
      description: "Handle millions of events, integrate with any tool, and expand to new markets - all while maintaining perfect privacy compliance.",
      color: "bg-primary-purple",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready in 15 Minutes, <span className="text-primary-purple">Future-Proof Forever</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Our four-step process gets you cookieless-ready before Chrome's Q3 2025 deadline,
            with complete marketing attribution and zero compliance risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className={`${step.color} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-primary-purple to-primary-blue p-8 rounded-2xl text-white opacity-0 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="col-span-2">
              <h3 className="text-2xl font-heading font-bold mb-2">Ready to transform your marketing strategy?</h3>
              <p className="opacity-90">Join hundreds of forward-thinking companies already using privacy as a competitive advantage.</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <button className="bg-white text-primary-purple hover:bg-gray-100 transition-colors py-3 px-6 rounded-lg font-medium">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
