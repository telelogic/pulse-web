import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ShieldCheck, Cookie, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already seen the banner
    const hasSeenBanner = localStorage.getItem('pulse-cookie-consent');
    if (!hasSeenBanner) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pulse-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('pulse-cookie-consent', 'rejected');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-6 w-6 text-green-500" />
                <Cookie className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  🍪 Great News About Cookies!
                </h3>
                <p className="text-sm text-gray-600">
                  We're different from other analytics platforms
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Main Message */}
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">
                    Unlike other analytics platforms, PULSE doesn't use tracking cookies!
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    We only use essential cookies for basic website functionality. No invasive tracking, no data harvesting.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700">
              We respect your privacy and believe in cookieless analytics. This website uses minimal, essential cookies only for:
            </p>

            <ul className="mt-2 space-y-1 text-sm text-gray-600 ml-4">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Language preferences</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Remembering this consent choice</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Basic security features</span>
              </li>
            </ul>
          </div>

          {/* Detailed Information (Collapsible) */}
          {showDetails && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-3">Detailed Cookie Information</h4>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h5 className="font-medium text-gray-800">Essential Cookies (Cannot be disabled)</h5>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">pulse-language</span>
                      <span className="text-gray-500">Stores language preference</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">pulse-cookie-consent</span>
                      <span className="text-gray-500">Remembers consent choice</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-800">What We DON'T Do</h5>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>❌ No tracking cookies</li>
                    <li>❌ No advertising cookies</li>
                    <li>❌ No cross-site tracking</li>
                    <li>❌ No personal data collection</li>
                    <li>❌ No data selling to third parties</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-blue-800 text-sm">
                    <strong>Why is this different?</strong> Most analytics platforms use dozens of tracking cookies 
                    to follow you across websites. PULSE uses cookieless technology that respects your privacy 
                    while still providing accurate analytics to website owners.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center space-x-2 text-gray-600"
            >
              <Info className="h-4 w-4" />
              <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
            </Button>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleReject}
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                Reject Optional
              </Button>
              <Button
                onClick={handleAccept}
                className="bg-primary-purple hover:bg-secondary-purple text-white"
              >
                Accept Essential Cookies
              </Button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By using this website, you agree to our{' '}
              <Link to="/privacy" className="text-primary-purple hover:underline">Privacy Policy</Link>
              {' '}and{' '}
              <button className="text-primary-purple hover:underline">Terms of Service</button>.
              Questions about our privacy practices?{' '}
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-primary-purple hover:underline"
              >
                Contact us
              </button>.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
