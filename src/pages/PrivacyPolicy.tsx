import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Eye, Lock, Users, Globe, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const PrivacyPolicy = () => {
  const seoConfig = {
    title: "Privacy Policy - PULSE Analytics Cookieless Tracking",
    description: "PULSE Analytics privacy policy. Learn how our cookieless analytics platform protects user privacy while providing accurate attribution data. GDPR & CCPA compliant.",
    keywords: "privacy policy, cookieless analytics privacy, GDPR compliance, CCPA compliance, data protection",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "description": "Privacy policy for PULSE Analytics cookieless tracking platform",
      "publisher": {
        "@type": "Organization",
        "name": "PULSE Analytics"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead {...seoConfig} />
      <Navbar />
      
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 mb-6">
              <ShieldCheck className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Privacy-First Analytics</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              How PULSE protects your privacy with cookieless analytics
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: August 29, 2025
            </p>
          </div>

          {/* Privacy Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">No Tracking Cookies</h3>
                <p className="text-sm text-green-700">
                  We don't use invasive tracking cookies or follow you across websites
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6 text-center">
                <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Data Minimization</h3>
                <p className="text-sm text-blue-700">
                  We collect only what's necessary for analytics functionality
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">User Control</h3>
                <p className="text-sm text-purple-700">
                  You have full control over your data and privacy preferences
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary-purple" />
                  <span>Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  PULSE Analytics is committed to protecting your privacy. Unlike traditional analytics platforms 
                  that rely on invasive tracking cookies, we use cookieless technology that respects user privacy 
                  while providing accurate website analytics.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium mb-2">Our Privacy Promise:</p>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• No personal data collection or storage</li>
                    <li>• No cross-site tracking or user profiling</li>
                    <li>• No data selling to third parties</li>
                    <li>• Full compliance with GDPR, CCPA, and other privacy laws</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Website Analytics (Cookieless)</h4>
                  <p className="text-gray-700 mb-3">
                    For our analytics service, we collect non-personal technical information:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-800">Technical Data</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Browser type and version</li>
                        <li>• Operating system</li>
                        <li>• Screen resolution</li>
                        <li>• Timezone</li>
                        <li>• Language preferences</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-800">Usage Data</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Page views and navigation</li>
                        <li>• Referring websites</li>
                        <li>• Time spent on pages</li>
                        <li>• Click interactions</li>
                        <li>• Conversion events</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Essential Website Cookies</h4>
                  <p className="text-gray-700 mb-3">
                    Our website uses minimal essential cookies for basic functionality:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-medium text-gray-800">Cookie Name</th>
                          <th className="text-left py-2 font-medium text-gray-800">Purpose</th>
                          <th className="text-left py-2 font-medium text-gray-800">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-2">
                        <tr className="border-b border-gray-100">
                          <td className="py-2 text-gray-600">pulse-language</td>
                          <td className="py-2 text-gray-600">Stores language preference</td>
                          <td className="py-2 text-gray-600">1 year</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 text-gray-600">pulse-cookie-consent</td>
                          <td className="py-2 text-gray-600">Remembers consent choice</td>
                          <td className="py-2 text-gray-600">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <p className="text-gray-700">
                    When you contact us or request a demo, we collect:
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Name and email address</li>
                    <li>• Company name (optional)</li>
                    <li>• Message content</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle>How We Use Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics Data</h4>
                  <p className="text-gray-700">
                    Analytics data is used solely to provide website owners with insights about their website performance. 
                    This data is aggregated, anonymized, and cannot be used to identify individual users.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                  <p className="text-gray-700">
                    Contact information is used only to respond to your inquiries and provide requested services. 
                    We do not use this information for marketing unless you explicitly opt-in.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-primary-purple" />
                  <span>Data Protection & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We implement industry-standard security measures to protect all data:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Safeguards</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• End-to-end encryption</li>
                      <li>• Secure data centers</li>
                      <li>• Regular security audits</li>
                      <li>• Access controls and monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Organizational Measures</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Staff training on data protection</li>
                      <li>• Data minimization practices</li>
                      <li>• Regular privacy impact assessments</li>
                      <li>• Incident response procedures</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Your Privacy Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Under GDPR, CCPA, and other privacy laws, you have the following rights:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Access & Portability</h4>
                      <p className="text-sm text-gray-600">Request a copy of your personal data</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Rectification</h4>
                      <p className="text-sm text-gray-600">Correct inaccurate personal data</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Erasure</h4>
                      <p className="text-sm text-gray-600">Request deletion of your personal data</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Opt-out</h4>
                      <p className="text-sm text-gray-600">Stop analytics tracking on websites you visit</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Object</h4>
                      <p className="text-sm text-gray-600">Object to processing for legitimate interests</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Complain</h4>
                      <p className="text-sm text-gray-600">File a complaint with data protection authorities</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> Since PULSE uses cookieless tracking that doesn't collect personal data, 
                    many traditional privacy concerns don't apply. However, we still honor all privacy rights and requests.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card>
              <CardHeader>
                <CardTitle>International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  PULSE Analytics may process data in various countries to provide our global service. 
                  All international transfers are protected by appropriate safeguards:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Standard Contractual Clauses (SCCs)</li>
                  <li>• Adequacy decisions from relevant authorities</li>
                  <li>• Data Processing Agreements with all processors</li>
                  <li>• Regular compliance monitoring</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary-purple" />
                  <span>Data Retention</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Analytics Data</h4>
                    <p className="text-gray-700 text-sm">
                      Aggregated analytics data is retained for up to 26 months to provide historical insights. 
                      This data is anonymized and cannot be linked to individual users.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                    <p className="text-gray-700 text-sm">
                      Contact information is retained only as long as necessary to provide requested services 
                      or as required by law, typically no longer than 3 years.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                    <p className="text-gray-700 text-sm">
                      Essential cookies expire after 1 year or when you clear your browser data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us About Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you have questions about this privacy policy or want to exercise your privacy rights, contact us:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> privacy@privapulse.com</p>
                    <p><strong>Address:</strong> PULSE Analytics, Athens, GR</p>
                    <p><strong>Data Protection Officer:</strong> dpo@privapulse.com</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  We will respond to all privacy requests within 30 days as required by applicable law.
                </p>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We may update this privacy policy periodically to reflect changes in our practices or applicable law. 
                  We will notify users of significant changes by posting a notice on our website or sending an email 
                  to registered users.
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  This policy was last updated on August 29, 2025.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
