
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Send } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link, useSearchParams } from "react-router-dom";
import { useForm, ValidationError } from '@formspree/react';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const Contact = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [actionType, setActionType] = useState('');
  
  // Replace 'your-form-id' with your actual Formspree form ID
  // You'll get this after creating a form at https://formspree.io
  const [state, handleSubmit] = useForm("mgvlonvn");

  // Check URL parameters for action type
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'demo') {
      setActionType('Schedule a Demo');
    } else if (action === 'trial') {
      setActionType('Start 14 Day Trial');
    } else {
      setActionType('General Inquiry');
    }
  }, [searchParams]);

  // Show success message when form is submitted successfully
  if (state.succeeded) {
    // Track Google Ads conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16799880044/demo_request', // Replace with your actual conversion ID
        'value': actionType === 'Start 14 Day Trial' ? 100 : 50,
        'currency': 'USD',
        'transaction_id': Date.now().toString(),
        'custom_parameters': {
          'action_type': actionType,
          'timestamp': new Date().toISOString()
        }
      });
    }

    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-green-800 mb-4">Thank You!</h2>
              <p className="text-green-700 text-lg mb-6">
                {actionType === 'Start 14 Day Trial' 
                  ? "Your trial request has been received. We'll set up your 14-day trial account and send login details within 2 hours."
                  : actionType === 'Schedule a Demo'
                  ? "Your demo request has been received. We'll contact you within 24 hours to schedule your personalized PULSE Analytics demonstration."
                  : "Your inquiry has been received. We'll get back to you within 24 hours with the information you requested."
                }
              </p>
              <div className="bg-white border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-600">
                  <strong>What's Next:</strong><br />
                  1. We'll email you within 1 hour to confirm receipt<br />
                  2. Our team will prepare a customized demo<br />
                  3. We'll schedule a convenient time for your demo<br />
                  4. Get ready to see 98.7% attribution accuracy!
                </p>
              </div>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-primary-purple hover:bg-secondary-purple text-white"
              >
                Send Another Request
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-primary-purple to-primary-blue p-8 md:p-12 text-white">
              <div className="flex items-center mb-6">
                <img 
                  src="/privapulselogo.png" 
                  alt="PULSE Analytics Logo" 
                  className="w-32 h-auto"
                />
              </div>
              
              <h2 className="text-3xl font-heading font-bold mb-4">{t("contact.title")}</h2>
              <p className="text-white/90 mb-8">
                {t("contact.description")}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">{t("contact.email")}</p>
                    <p className="font-medium">contact@privapulse.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">{t("contact.phone")}</p>
                    <p className="font-medium">+30 698 6680 132</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">{t("contact.location")}</p>
                    <p className="font-medium">Athens, GR</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-heading font-bold mb-6">
                {actionType === 'Start 14 Day Trial' 
                  ? "Start Your Free 14-Day Trial"
                  : actionType === 'Schedule a Demo'
                  ? "Schedule Your Demo"
                  : t("contact.getStartedTitle")
                }
              </h3>
              {actionType !== 'General Inquiry' && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                  <p className="text-purple-800 text-sm">
                    <strong>{actionType}</strong> - Fill out the form below and we'll get you started immediately!
                  </p>
                </div>
              )}
              <form 
                onSubmit={handleSubmit} 
                method="POST"
                action="https://formspree.io/f/mgvlonvn"
                className="space-y-5"
              >
                {/* Hidden field to track action type */}
                <input type="hidden" name="action_type" value={actionType} />
                <input type="hidden" name="_subject" value={`New ${actionType} Request from PULSE Analytics`} />
                <div>
                  <Label htmlFor="name" className="text-gray-700">{t("contact.fullName")} <span className="text-red-500">*</span></Label>
                  <Input 
                    id="name"
                    name="name"
                    className="mt-1"
                    required
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700">{t("contact.emailAddress")} <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    className="mt-1"
                    required
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                  />
                </div>
                
                <div>
                  <Label htmlFor="company" className="text-gray-700">{t("contact.companyName")}</Label>
                  <Input 
                    id="company"
                    name="company"
                    className="mt-1"
                  />
                  <ValidationError 
                    prefix="Company" 
                    field="company"
                    errors={state.errors}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700">Message (Optional)</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    className="mt-1"
                    placeholder={
                      actionType === 'Start 14 Day Trial' 
                        ? "Tell us about your current analytics setup and what you'd like to test during your trial..."
                        : actionType === 'Schedule a Demo'
                        ? "Tell us about your analytics needs, team size, or any specific questions for the demo..."
                        : "Tell us about your analytics needs, team size, or any specific questions..."
                    }
                    rows={4}
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    disabled={state.submitting}
                    className="w-full bg-primary-purple hover:bg-secondary-purple text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Request...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>
                          {actionType === 'Start 14 Day Trial' 
                            ? "Start My Free Trial"
                            : actionType === 'Schedule a Demo'
                            ? "Schedule Demo"
                            : t("contact.requestDemo")
                          }
                        </span>
                      </div>
                    )}
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  {t("contact.privacyNote")}{' '}
                  <Link to="/privacy" className="text-primary-purple underline hover:text-primary-blue">{t("contact.privacyPolicy")}</Link>{' '}
                  {t("contact.consentNote")}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
