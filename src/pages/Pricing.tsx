import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Pricing = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const seoConfig = {
    title: "PULSE Analytics Pricing - Cookieless Analytics from $49/month",
    description: "Affordable cookieless analytics pricing. Start at $49/month vs Google Analytics $150k+/year. Get 98.7% attribution accuracy without cookies. Free trial available.",
    keywords: "cookieless analytics pricing, GA4 alternative cost, attribution recovery pricing, privacy-first analytics plans, 2025 cookie solution pricing",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "PULSE Analytics",
      "description": "Cookieless analytics platform with 98.7% attribution accuracy",
      "offers": [
        {
          "@type": "Offer",
          "name": "Starter Plan",
          "priceCurrency": "USD",
          "price": "49",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "49",
            "priceCurrency": "USD",
            "billingDuration": "P1M"
          },
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Professional Plan",
          "priceCurrency": "USD",
          "price": "149",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "299",
            "priceCurrency": "USD",
            "billingDuration": "P1M"
          },
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  };

  const handleStartTrial = () => {
    navigate("/#contact?action=trial");
  };

  const handleContactSales = () => {
    navigate("/#contact?action=demo");
  };

  const handleCalculateSavings = () => {
    // Scroll to cost comparison section
    document.getElementById('cost-comparison')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEOHead {...seoConfig} />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm font-medium">Replace Your Entire Martech Stack</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Save $180K+ Annually
                <span className="text-primary-purple"> On Marketing Tools</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Get complete marketing intelligence for less than what you pay for GA4 + Adobe + 
                your current attribution stack. <strong>Try free for 7 days</strong> - no credit card required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  className="bg-primary-purple hover:bg-secondary-purple text-white"
                  onClick={handleStartTrial}
                >
                  Start 7-Day Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-300 text-gray-700"
                  onClick={handleCalculateSavings}
                >
                  Calculate Your Savings
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Full platform access</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>White-glove setup</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison Section */}
        <section id="cost-comparison" className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Stop Paying for Multiple Tools
                </h2>
                <p className="text-lg text-gray-600">
                  Pulse replaces your entire martech stack with one privacy-first platform
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Current Stack */}
                <div className="bg-gray-50 p-8 rounded-xl border">
                  <h3 className="text-2xl font-bold mb-6 text-center">Your Current Stack</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-700">Google Analytics 360</span>
                      <span className="font-bold text-gray-900">$150,000/yr</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-700">Adobe Analytics</span>
                      <span className="font-bold text-gray-900">$120,000/yr</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-700">Attribution Platform</span>
                      <span className="font-bold text-gray-900">$60,000/yr</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-700">Consent Management</span>
                      <span className="font-bold text-gray-900">$36,000/yr</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-700">Customer Data Platform</span>
                      <span className="font-bold text-gray-900">$84,000/yr</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-700">Implementation & Support</span>
                      <span className="font-bold text-gray-900">$48,000/yr</span>
                    </div>
                    
                    <div className="pt-4 border-t-2 border-gray-300">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">Total Annual Cost</span>
                        <span className="text-2xl font-bold text-red-600">$498,000</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        + Lost revenue from attribution gaps and compliance issues
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Pulse Solution */}
                <div className="bg-gradient-to-br from-primary-purple to-secondary-purple p-8 rounded-xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-400 text-green-900 px-3 py-1 rounded-bl-lg text-xs font-bold">
                    ALL-IN-ONE
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6 text-center">Pulse Platform</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/90">Complete Analytics Suite</span>
                      <span className="text-green-400 font-bold">✓ Included</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/90">Advanced Attribution</span>
                      <span className="text-green-400 font-bold">✓ Included</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/90">AI-Powered Insights</span>
                      <span className="text-green-400 font-bold">✓ Included</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/90">Global Compliance Engine</span>
                      <span className="text-green-400 font-bold">✓ Included</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/90">Customer Data Platform</span>
                      <span className="text-green-400 font-bold">✓ Included</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/90">24/7 Expert Support</span>
                      <span className="text-green-400 font-bold">✓ Included</span>
                    </div>
                    
                    <div className="pt-4 border-t-2 border-white/30">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">Total Annual Cost</span>
                        <span className="text-2xl font-bold text-green-400">$96,000</span>
                      </div>
                      <p className="text-sm text-white/80 mt-2">
                        + 40% better attribution accuracy than legacy tools
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white/10 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-400">$402,000</div>
                    <div className="text-white/90">Annual Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Choose Your <span className="text-primary-purple">Future-Proof</span> Plan
              </h2>
              <p className="text-lg text-gray-600">
                All plans include 7-day free trial, white-glove migration, and access to our complete cookieless platform.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="bg-white rounded-2xl shadow-lg p-8 relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <p className="text-gray-600 mb-4">Perfect for growing businesses</p>
                  <div className="text-4xl font-bold mb-2">$49<span className="text-lg text-gray-600">/month</span></div>
                  <p className="text-sm text-gray-600">Billed annually • $29/month monthly</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Up to 1M monthly events</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Complete cookieless analytics</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Attribution & conversion tracking</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Global compliance automation</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>50+ integrations</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Email support</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={handleStartTrial}
                >
                  Start 7-Day Free Trial
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  No credit card required
                </p>
              </div>
              
              {/* Professional Plan - POPULAR */}
              <div className="bg-white rounded-2xl shadow-xl p-8 relative border-2 border-primary-purple">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-purple text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-gray-600 mb-4">For serious marketing teams</p>
                  <div className="text-4xl font-bold mb-2">$299<span className="text-lg text-gray-600">/month</span></div>
                  <p className="text-sm text-gray-600">Billed annually • $249/month monthly</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Up to 10M monthly events</strong></span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Everything in Starter, plus:</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>AI-powered audience insights</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Advanced attribution modeling</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Custom dashboards & reports</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>500+ integrations</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Priority chat support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary-purple hover:bg-secondary-purple text-white"
                  onClick={handleStartTrial}
                >
                  Start 7-Day Free Trial
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  No credit card required
                </p>
              </div>
              
              {/* Enterprise Plan */}
              <div className="bg-white rounded-2xl shadow-lg p-8 relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-gray-600 mb-4">For large organizations</p>
                  <div className="text-4xl font-bold mb-2">Custom</div>
                  <p className="text-sm text-gray-600">Tailored to your needs</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Unlimited events</strong></span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Everything in Professional, plus:</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>White-label platform option</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Custom compliance requirements</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Advanced security & SSO</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>99.99% uptime SLA</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>24/7 phone support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Dedicated CSM team</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-primary-purple text-primary-purple hover:bg-primary-purple hover:text-white"
                  onClick={handleContactSales}
                >
                  Contact Sales
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  Custom pricing available
                </p>
              </div>
            </div>
            
            {/* Add-ons Section */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">Add-On Services</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="font-bold mb-2">White-Glove Migration</h4>
                  <p className="text-gray-600 mb-3">Complete data migration from GA4, Adobe, or any platform within 48 hours.</p>
                  <div className="text-2xl font-bold text-primary-purple">$4,997</div>
                  <p className="text-sm text-gray-600">One-time fee • Included free with annual plans</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="font-bold mb-2">Privacy Audit & Consultation</h4>
                  <p className="text-gray-600 mb-3">Complete privacy compliance audit with actionable recommendations.</p>
                  <div className="text-2xl font-bold text-primary-purple">$12,997</div>
                  <p className="text-sm text-gray-600">Includes GDPR, CCPA, and emerging law compliance</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about switching to cookieless marketing
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3">How does the 7-day free trial work?</h3>
                  <p className="text-gray-600">
                    Get complete access to Pulse for 7 days with no credit card required. We'll help you migrate your data, 
                    set up tracking, and see real results. Only pay if you decide to continue after the trial.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3">Can you really replace our entire martech stack?</h3>
                  <p className="text-gray-600">
                    Yes. Pulse combines analytics, attribution, compliance, and customer data management in one platform. 
                    Most customers eliminate 5-8 separate tools and save $200K+ annually while getting better data accuracy.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3">How accurate is cookieless tracking compared to GA4?</h3>
                  <p className="text-gray-600">
                    Pulse is 99.9% accurate vs GA4's 40-60% accuracy loss when cookies are blocked. Our server-side 
                    tracking and AI attribution models actually provide more complete data than cookie-based systems.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3">What happens when Chrome removes third-party cookies?</h3>
                  <p className="text-gray-600">
                    Nothing changes for Pulse users. We're already 100% cookieless, so you'll continue getting complete 
                    attribution and insights while competitors lose 40-60% of their tracking accuracy.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3">How long does migration take?</h3>
                  <p className="text-gray-600">
                    Most customers are fully operational within 15 minutes for basic setup. Complete data migration 
                    with historical data import takes 24-48 hours with our white-glove service.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3">Do you offer refunds?</h3>
                  <p className="text-gray-600">
                    We offer a 30-day money-back guarantee. If you're not completely satisfied with Pulse's performance 
                    vs your previous tools, we'll provide a full refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary-purple to-secondary-purple">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="flex items-center justify-center mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse mr-3"></div>
                <span className="text-red-200 font-semibold text-sm uppercase tracking-wide">Limited Time</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                Don't Wait for the Cookie Apocalypse
              </h2>
              
              <p className="text-xl text-white/90 mb-8">
                Join 2,500+ businesses already future-proofed with Pulse. Start your 7-day free trial 
                and see why forward-thinking marketers are switching now, not waiting for Q3 2025.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">15min</div>
                  <div className="text-white/80">Average Setup Time</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">$402K</div>
                  <div className="text-white/80">Average Annual Savings</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">99.9%</div>
                  <div className="text-white/80">Attribution Accuracy</div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-white text-primary-purple hover:bg-gray-100 font-bold px-8 py-4 text-lg"
                onClick={handleStartTrial}
              >
                Start Your 7-Day Free Trial Now
              </Button>
              
              <p className="text-sm text-white/70 mt-4">
                ⚡ No credit card required • Full platform access • Migration support included
              </p>
              
              <div className="mt-12 text-center">
                <p className="text-white/80 text-sm mb-4">Trusted by leading brands:</p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 opacity-60">
                  <span className="text-lg font-bold">Nefos AI</span>
                  <span className="text-lg font-bold">AlkoCert</span>
                  <span className="text-lg font-bold">Telelogic</span>
                  <span className="text-lg font-bold">AISynergy</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;