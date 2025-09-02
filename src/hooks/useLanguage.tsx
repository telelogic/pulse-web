import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "gr";

interface Translations {
  [key: string]: {
    en: string;
    gr: string;
  };
}

const translations: Translations = {
  // Navbar
  "nav.home": { en: "Home", gr: "Αρχική" },
  "nav.features": { en: "Features", gr: "Χαρακτηριστικά" },
  "nav.howItWorks": { en: "How It Works", gr: "Πώς Λειτουργεί" },
  "nav.testimonials": { en: "Testimonials", gr: "Μαρτυρίες" },
  "nav.pricing": { en: "Pricing", gr: "Τιμές" },
  "nav.getStarted": { en: "Get Started", gr: "Ξεκινήστε" },
  
  // Hero Section
  "hero.badge": { en: "Chrome Kills 3rd-Party Cookies Q3 2025 • Are You Ready?", gr: "Το Chrome Καταργεί τα Τρίτα Cookies Q3 2025 • Είστε Έτοιμοι;" },
  "hero.title1": { en: "The Only Marketing Platform Built for Chrome's", gr: "Η Μόνη Πλατφόρμα Μάρκετινγκ που Κατασκευάστηκε για το" },
  "hero.title2": { en: "Cookieless", gr: "Μέλλον Χωρίς" },
  "hero.title3": { en: "Future", gr: "Cookies του Chrome" },
  "hero.description": { en: "While competitors scramble to adapt, Pulse delivers complete marketing analytics, attribution, and personalization without third-party cookies. Join 2,500+ businesses already future-proofed.", gr: "Ενώ οι ανταγωνιστές παλεύουν να προσαρμοστούν, η Pulse παρέχει πλήρη ανάλυση μάρκετινγκ, απόδοση και εξατομίκευση χωρίς cookies τρίτων. Ενταχθείτε σε 2.500+ επιχειρήσεις που είναι ήδη προετοιμασμένες για το μέλλον." },
  "hero.getStartedFree": { en: "Start 7-Day Free Trial", gr: "Ξεκινήστε 7ήμερη Δωρεάν Δοκιμή" },
  "hero.bookDemo": { en: "See Cookieless Demo", gr: "Δείτε Demo Χωρίς Cookies" },
  "hero.urgencyText": { en: "Free migration from Google Analytics • Setup in under 15 minutes", gr: "Δωρεάν μετεγκατάσταση από Google Analytics • Εγκατάσταση σε λιγότερο από 15 λεπτά" },
  "hero.privacyCompliant": { en: "100% Privacy Compliant", gr: "100% Συμβατό με Ιδιωτικότητα" },
  "hero.conversionRate": { en: "2x Conversion Rate", gr: "2x Ποσοστό Μετατροπής" },
  "hero.betterTargeting": { en: "Better Targeting", gr: "Καλύτερη Στόχευση" },
  "hero.dashboard": { en: "Privacy Dashboard", gr: "Πίνακας Ιδιωτικότητας" },
  "hero.realTime": { en: "Real-time insights", gr: "Πληροφορίες πραγματικού χρόνου" },
  "hero.optInRate": { en: "Opt-in Rate", gr: "Ποσοστό Συναίνεσης" },
  "hero.conversions": { en: "Conversions", gr: "Μετατροπές" },
  "hero.trustScore": { en: "Trust Score", gr: "Βαθμός Εμπιστοσύνης" },
  "hero.complianceStatus": { en: "Compliance Status", gr: "Κατάσταση Συμμόρφωσης" },
  "hero.allCompliant": { en: "All systems compliant with regulations", gr: "Όλα τα συστήματα συμμορφώνονται με κανονισμούς" },
  
  // Trust Indicators
  "trust.subtitle": { en: "Trusted by forward-thinking businesses already preparing for 2025", gr: "Εμπιστεύονται προοδευτικές επιχειρήσεις που ετοιμάζονται ήδη για το 2025" },
  "trust.dataAccuracy": { en: "Data Accuracy vs GA4", gr: "Ακρίβεια Δεδομένων έναντι GA4" },
  "trust.setupTime": { en: "Average Setup Time", gr: "Μέσος Χρόνος Εγκατάστασης" },
  "trust.businessesFutureProofed": { en: "Businesses Future-Proofed", gr: "Επιχειρήσεις Προετοιμασμένες για το Μέλλον" },
  
  // Features
  "features.title": { en: "Complete Cookieless Marketing", gr: "Πλήρες Μάρκετινγκ Χωρίς Cookies" },
  "features.titleHighlight": { en: "Stack", gr: "Σύστημα" },
  "features.description": { en: "Everything you need to thrive when Chrome removes third-party cookies in Q3 2025. No data loss, no compliance headaches, no disruption.", gr: "Όλα όσα χρειάζεστε για να ευδοκιμήσετε όταν το Chrome αφαιρέσει τα cookies τρίτων στο Q3 2025. Χωρίς απώλεια δεδομένων, χωρίς προβλήματα συμμόρφωσης, χωρίς διάσπαση." },
  
  // Contact
  "contact.title": { en: "Ready to transform your marketing?", gr: "Έτοιμοι να μεταμορφώσετε το μάρκετινγκ σας;" },
  "contact.description": { en: "Get in touch with our team of privacy-led marketing specialists to see how we can help your business thrive in the new privacy-focused landscape of 2025.", gr: "Επικοινωνήστε με την ομάδα μας από ειδικούς μάρκετινγκ που σέβεται την ιδιωτικότητα για να δείτε πώς μπορούμε να βοηθήσουμε την επιχείρησή σας να ευδοκιμήσει στο νέο τοπίο που εστιάζει στην ιδιωτικότητα του 2025." },
  "contact.email": { en: "Email", gr: "Email" },
  "contact.phone": { en: "Phone", gr: "Τηλέφωνο" },
  "contact.location": { en: "Location", gr: "Τοποθεσία" },
  "contact.getStartedTitle": { en: "Get Started", gr: "Ξεκινήστε" },
  "contact.fullName": { en: "Full Name", gr: "Πλήρες Όνομα" },
  "contact.emailAddress": { en: "Email Address", gr: "Διεύθυνση Email" },
  "contact.companyName": { en: "Company Name", gr: "Όνομα Εταιρείας" },
  "contact.requestDemo": { en: "Request Demo", gr: "Αίτημα για Demo" },
  "contact.privacyNote": { en: "By submitting this form, you agree to our", gr: "Υποβάλλοντας αυτή τη φόρμα, συμφωνείτε με την" },
  "contact.privacyPolicy": { en: "Privacy Policy", gr: "Πολιτική Απορρήτου" },
  "contact.consentNote": { en: "and consent to Pulse contacting you with relevant information.", gr: "και συναινείτε στην επικοινωνία της Pulse μαζί σας με σχετικές πληροφορίες." },
  "contact.missingInfo": { en: "Missing information", gr: "Λείπουν πληροφορίες" },
  "contact.fillRequired": { en: "Please fill out all required fields.", gr: "Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία." },
  "contact.requestReceived": { en: "Request received!", gr: "Το αίτημα έχει ληφθεί!" },
  "contact.inTouch": { en: "We'll be in touch with you shortly.", gr: "Θα επικοινωνήσουμε μαζί σας σύντομα." },
  
  // Footer
  "footer.description": { en: "Building the future of privacy-led marketing. Our tools help businesses succeed while respecting user privacy and building customer trust.", gr: "Χτίζουμε το μέλλον του μάρκετινγκ που σέβεται την ιδιωτικότητα. Τα εργαλεία μας βοηθούν τις επιχειρήσεις να επιτύχουν σεβόμενες την ιδιωτικότητα των χρηστών και χτίζοντας εμπιστοσύνη πελατών." },
  "footer.company": { en: "Company", gr: "Εταιρεία" },
  "footer.aboutUs": { en: "About Us", gr: "Σχετικά με Εμάς" },
  "footer.careers": { en: "Careers", gr: "Καριέρες" },
  "footer.press": { en: "Press", gr: "Τύπος" },
  "footer.blog": { en: "Blog", gr: "Blog" },
  "footer.resources": { en: "Resources", gr: "Πόροι" },
  "footer.privacyGuide": { en: "Privacy Guide", gr: "Οδηγός Ιδιωτικότητας" },
  "footer.documentation": { en: "Documentation", gr: "Τεκμηρίωση" },
  "footer.caseStudies": { en: "Case Studies", gr: "Μελέτες Περίπτωσης" },
  "footer.helpCenter": { en: "Help Center", gr: "Κέντρο Βοήθειας" },
  "footer.legal": { en: "Legal", gr: "Νομικά" },
  "footer.terms": { en: "Terms of Service", gr: "Όροι Χρήσης" },
  "footer.privacy": { en: "Privacy Policy", gr: "Πολιτική Απορρήτου" },
  "footer.cookies": { en: "Cookie Policy", gr: "Πολιτική Cookies" },
  "footer.gdpr": { en: "GDPR Compliance", gr: "Συμμόρφωση GDPR" },
  "footer.copyright": { en: "© 2025 Pulse Privacy-Led Marketing. All rights reserved.", gr: "© 2025 Pulse Μάρκετινγκ με Βάση την Ιδιωτικότητα. Όλα τα δικαιώματα διατηρούνται." },
  "footer.tagline": { en: "Designed for the privacy-first world of 2025", gr: "Σχεδιασμένο για τον κόσμο που δίνει προτεραιότητα στην ιδιωτικότητα του 2025" },
  
  // Urgency Section
  "urgency.badge": { en: "🚨 Marketing Alert", gr: "🚨 Ειδοποίηση Μάρκετινγκ" },
  "urgency.title": { en: "Chrome Ends Cookies in", gr: "Το Chrome τελειώνει τα Cookies σε" },
  "urgency.subtitle": { en: "Don't get caught unprepared", gr: "Μην πιαστείτε απροετοίμαστοι" },
  "urgency.waitingRisks": { en: "Waiting = Data Loss + Revenue Drop", gr: "Αναμονή = Απώλεια Δεδομένων + Πτώση Εσόδων" },
  "urgency.pulseAdvantage": { en: "Pulse Users = Ready + Winning", gr: "Χρήστες Pulse = Έτοιμοι + Νικητές" },
  "urgency.ctaButton": { en: "Start Free Trial Now", gr: "Ξεκινήστε Δωρεάν Δοκιμή Τώρα" },
  "urgency.supportNote": { en: "⚡ Priority migration support", gr: "⚡ Υποστήριξη προτεραιότητας μετανάστευσης" }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}