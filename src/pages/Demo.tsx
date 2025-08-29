import React, { useState, useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PulseAnalyticsDashboard from '@/components/PulseAnalyticsDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShieldCheck, 
  Code, 
  Settings, 
  BarChart3, 
  Lock,
  Zap,
  Globe,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Demo = () => {
  const { t } = useLanguage();
  const [showImplementation, setShowImplementation] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const seoConfig = {
    title: "PULSE Analytics Demo - See Cookieless Attribution in Action",
    description: "Interactive demo of PULSE cookieless analytics platform. See 98.7% attribution accuracy vs GA4's 30%. Try our privacy-first tracking before Chrome removes cookies in 2025.",
    keywords: "cookieless analytics demo, attribution recovery demo, privacy-first analytics test, GA4 alternative demo, 2025 cookie apocalypse solution",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PULSE Analytics Demo",
      "applicationCategory": "Analytics Software",
      "operatingSystem": "Web Browser",
      "description": "Interactive demonstration of cookieless analytics platform with 98.7% attribution accuracy",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "49",
        "availability": "https://schema.org/InStock"
      },
      "creator": {
        "@type": "Organization",
        "name": "PULSE Analytics"
      }
    }
  };

  const demoSteps = [
    {
      title: "Cookie-Free Tracking",
      description: "Watch how Pulse tracks user behavior without any cookies",
      icon: ShieldCheck,
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Real-Time Attribution",
      description: "See live conversion attribution across all marketing channels",
      icon: BarChart3,
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Privacy Compliance",
      description: "Automatic GDPR, CCPA, and other privacy law compliance",
      icon: Lock,
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Performance Insights",
      description: "Get actionable insights that improve your marketing ROI",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % demoSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const implementationCode = `<!-- Pulse.js Implementation -->
<script>
  // Initialize Pulse with your license
  window.Pulse.init({
    siteId: 'your-site-id',
    licenseKey: 'your-license-key',
    apiEndpoint: 'https://api.pulseanalytics.com',
    debug: false,
    respectDNT: true,
    gdprMode: true
  });

  // Track custom events
  window.Pulse.tracker.trackEvent('page_view', {
    page_title: document.title,
    page_url: window.location.href
  });

  // Track conversions
  window.Pulse.tracker.trackConversion('signup', 100, 'USD');

  // Add conversion goals
  window.Pulse.tracker.addConversionGoal({
    id: 'newsletter_signup',
    name: 'Newsletter Signup',
    selector: '.newsletter-form button',
    value: 25,
    currency: 'USD'
  });
</script>`;

  const comparisonData = [
    {
      feature: "Cookie Dependency",
      pulse: "100% Cookieless",
      ga4: "Requires 3rd-party cookies",
      pulseGood: true
    },
    {
      feature: "Attribution Accuracy",
      pulse: "98.7% accurate",
      ga4: "40-60% data loss",
      pulseGood: true
    },
    {
      feature: "Privacy Compliance",
      pulse: "Automatic GDPR/CCPA",
      ga4: "Manual configuration",
      pulseGood: true
    },
    {
      feature: "Cross-device Tracking",
      pulse: "Seamless tracking",
      ga4: "Limited by cookies",
      pulseGood: true
    },
    {
      feature: "Real-time Attribution",
      pulse: "Instant insights",
      ga4: "24-48hr delay",
      pulseGood: true
    },
    {
      feature: "Setup Time",
      pulse: "< 15 minutes",
      ga4: "Hours of configuration",
      pulseGood: true
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead {...seoConfig} />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-primary-purple mb-6">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Live Demo - See Pulse in Action</span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Experience the Future of <span className="text-primary-purple">Cookieless</span> Analytics
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            This live demo shows real Pulse analytics data. See how we track user behavior, 
            attribute conversions, and maintain privacy compliance - all without cookies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary-purple hover:bg-secondary-purple text-white"
              onClick={() => window.location.href = '/#contact?action=trial'}
            >
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => setShowImplementation(!showImplementation)}>
              <Code className="h-4 w-4 mr-2" />
              View Implementation
            </Button>
          </div>

          {/* Demo Steps Indicator */}
          <div className="flex justify-center space-x-8 mb-8">
            {demoSteps.map((step, index) => (
              <div 
                key={index}
                className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                  index === demoStep ? 'scale-105 shadow-lg bg-white' : 'opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${step.color}`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-sm">{step.title}</h3>
                <p className="text-xs text-gray-600 text-center max-w-32">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Code */}
      {showImplementation && (
        <section className="py-8 px-4 bg-gray-900 text-white">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Quick Implementation</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowImplementation(false)}
                className="text-white hover:bg-gray-800"
              >
                Close
              </Button>
            </div>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{implementationCode}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Live Dashboard Demo */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Live Analytics Dashboard</h2>
            <p className="text-gray-600 text-lg">
              This is a real Pulse dashboard showing cookieless analytics data
            </p>
            
            <div className="flex justify-center mt-6">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live Data
              </Badge>
            </div>
          </div>
          
          <PulseAnalyticsDashboard 
            siteId="demo-site" 
            licenseKey="demo-key" 
            showDemo={true}
          />
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pulse vs Google Analytics 4</h2>
            <p className="text-gray-600 text-lg">
              See why leading businesses are switching to Pulse before Chrome's cookie deadline
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-100 text-center py-4">
                <div className="font-medium text-gray-700">Feature</div>
                <div className="font-medium text-primary-purple">Pulse Analytics</div>
                <div className="font-medium text-gray-700">Google Analytics 4</div>
              </div>
              
              {comparisonData.map((item, index) => (
                <div key={index} className="grid grid-cols-3 border-b border-gray-100">
                  <div className="p-4 font-medium text-gray-700">{item.feature}</div>
                  <div className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">
                      <ShieldCheck className="h-3 w-3 mr-1" />
                      {item.pulse}
                    </Badge>
                  </div>
                  <div className="p-4 text-center">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {item.ga4}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Pulse Works</h2>
            <p className="text-gray-600 text-lg">
              Advanced privacy-first technology that outperforms traditional analytics
            </p>
          </div>

          <Tabs defaultValue="tracking" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tracking">Cookieless Tracking</TabsTrigger>
              <TabsTrigger value="attribution">Attribution</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="licensing">Licensing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracking" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Privacy-Safe Fingerprinting
                  </CardTitle>
                  <CardDescription>
                    How we identify users without invasive tracking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">What We Use:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Screen resolution & viewport</li>
                        <li>• Timezone & language settings</li>
                        <li>• Canvas fingerprint (non-tracking)</li>
                        <li>• Session-based identification</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">What We DON'T Use:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• No third-party cookies</li>
                        <li>• No device IDs or IMEI</li>
                        <li>• No personal information</li>
                        <li>• No cross-site tracking</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="attribution" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    AI-Powered Attribution
                  </CardTitle>
                  <CardDescription>
                    Advanced machine learning for accurate conversion tracking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Attribution Models:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• First-click attribution</li>
                        <li>• Last-click attribution</li>
                        <li>• Time-decay modeling</li>
                        <li>• Custom attribution rules</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Cross-Device Tracking:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Behavioral pattern matching</li>
                        <li>• Privacy-safe user journeys</li>
                        <li>• Mobile-to-desktop tracking</li>
                        <li>• Offline conversion linking</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    Automatic Compliance
                  </CardTitle>
                  <CardDescription>
                    Built-in compliance with global privacy regulations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Supported Regulations:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• GDPR (European Union)</li>
                        <li>• CCPA (California)</li>
                        <li>• LGPD (Brazil)</li>
                        <li>• PIPEDA (Canada)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Privacy Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Automatic consent management</li>
                        <li>• Data minimization principles</li>
                        <li>• Right to be forgotten</li>
                        <li>• Audit trail reporting</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="licensing" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Enterprise License Protection
                  </CardTitle>
                  <CardDescription>
                    Advanced licensing system protects your investment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">License Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Domain-locked licensing</li>
                        <li>• Usage quota enforcement</li>
                        <li>• Feature-based access control</li>
                        <li>• Real-time validation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Protection Methods:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Anti-tampering technology</li>
                        <li>• Encrypted communications</li>
                        <li>• License violation detection</li>
                        <li>• Automatic enforcement</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-purple text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Future-Proof Your Marketing?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join 2,500+ businesses that are already prepared for Chrome's cookie deadline. 
            Get started with Pulse today and never lose attribution data again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary-purple hover:bg-gray-100"
              onClick={() => window.location.href = '/#contact?action=trial'}
            >
              Start 14-Day Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary-purple"
              onClick={() => window.location.href = '/#contact?action=demo'}
            >
              Schedule Demo Call
            </Button>
          </div>
          
          <p className="text-sm opacity-80 mt-4">
            No credit card required • Setup in 15 minutes • Free migration support
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;
