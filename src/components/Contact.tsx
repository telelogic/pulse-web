
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!email || !name) {
      toast({
        title: t("contact.missingInfo"),
        description: t("contact.fillRequired"),
        variant: "destructive",
      });
      return;
    }
    
    // Show success message
    toast({
      title: t("contact.requestReceived"),
      description: t("contact.inTouch"),
    });
    
    // Reset form
    setEmail("");
    setName("");
    setCompany("");
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-primary-purple to-primary-blue p-8 md:p-12 text-white">
              <div className="flex items-center mb-6">
                <ShieldCheck className="w-8 h-8 mr-2" />
                <h3 className="text-2xl font-heading font-bold">Pulse</h3>
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
                    <p className="font-medium">contact@pulseprivacy.com</p>
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
                    <p className="font-medium">+1 (555) 123-4567</p>
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
                    <p className="font-medium">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-heading font-bold mb-6">{t("contact.getStartedTitle")}</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-gray-700">{t("contact.fullName")} <span className="text-red-500">*</span></Label>
                  <Input 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700">{t("contact.emailAddress")} <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="company" className="text-gray-700">{t("contact.companyName")}</Label>
                  <Input 
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-primary-purple hover:bg-secondary-purple text-white">
                    {t("contact.requestDemo")}
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  {t("contact.privacyNote")}{' '}
                  <a href="#" className="text-primary-purple underline hover:text-primary-blue">{t("contact.privacyPolicy")}</a>{' '}
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
