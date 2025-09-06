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
  "hero.badge": { en: "Privacy-First Analytics • Superior Attribution Without Cookies", gr: "Ανάλυση με Προτεραιότητα την Ιδιωτικότητα • Ανώτερη Απόδοση Χωρίς Cookies" },
  "hero.title1": { en: "Superior Marketing Analytics Built for the", gr: "Ανώτερη Ανάλυση Μάρκετινγκ που Κατασκευάστηκε για το" },
  "hero.title2": { en: "Privacy-First", gr: "Μέλλον με Προτεραιότητα" },
  "hero.title3": { en: "Future", gr: "την Ιδιωτικότητα" },
  "hero.description": { en: "Advanced cookieless marketing analytics that delivers superior attribution accuracy while respecting user privacy. Experience better insights without invasive tracking. Join 2,500+ privacy-forward businesses.", gr: "Προηγμένη ανάλυση μάρκετινγκ χωρίς cookies που παρέχει ανώτερη ακρίβεια απόδοσης σεβόμενη την ιδιωτικότητα των χρηστών. Απολαύστε καλύτερες εικόνες χωρίς επεμβατική παρακολούθηση. Ενταχθείτε σε 2.500+ επιχειρήσεις που δίνουν προτεραιότητα στην ιδιωτικότητα." },
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
  "trust.subtitle": { en: "Trusted by privacy-forward businesses prioritizing user respect and data accuracy", gr: "Εμπιστεύονται επιχειρήσεις που δίνουν προτεραιότητα στην ιδιωτικότητα και σέβονται τους χρήστες και την ακρίβεια δεδομένων" },
  "trust.dataAccuracy": { en: "Data Accuracy vs GA4", gr: "Ακρίβεια Δεδομένων έναντι GA4" },
  "trust.setupTime": { en: "Average Setup Time", gr: "Μέσος Χρόνος Εγκατάστασης" },
  "trust.businessesFutureProofed": { en: "Privacy-Forward Businesses", gr: "Επιχειρήσεις με Προτεραιότητα την Ιδιωτικότητα" },
  
  // Features
  "features.title": { en: "Complete Privacy-First Marketing", gr: "Πλήρες Μάρκετινγκ με Προτεραιότητα την Ιδιωτικότητα" },
  "features.titleHighlight": { en: "Stack", gr: "Σύστημα" },
  "features.description": { en: "Everything you need for superior marketing analytics while respecting user privacy. Better attribution accuracy than cookie-based solutions, no compliance headaches, enhanced user trust.", gr: "Όλα όσα χρειάζεστε για ανώτερη ανάλυση μάρκετινγκ σεβόμενοι την ιδιωτικότητα των χρηστών. Καλύτερη ακρίβεια απόδοσης από λύσεις που βασίζονται σε cookies, χωρίς προβλήματα συμμόρφωσης, ενισχυμένη εμπιστοσύνη χρηστών." },
  
  // Contact
  "contact.title": { en: "Ready to transform your marketing?", gr: "Έτοιμοι να μεταμορφώσετε το μάρκετινγκ σας;" },
  "contact.description": { en: "Get in touch with our team of privacy-led marketing specialists to see how we can help your business thrive with superior, ethical analytics that respect user privacy.", gr: "Επικοινωνήστε με την ομάδα μας από ειδικούς μάρκετινγκ που σέβεται την ιδιωτικότητα για να δείτε πώς μπορούμε να βοηθήσουμε την επιχείρησή σας να ευδοκιμήσει με ανώτερη, ηθική ανάλυση που σέβεται την ιδιωτικότητα των χρηστών." },
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
  "footer.tagline": { en: "Designed for the privacy-first world", gr: "Σχεδιασμένο για τον κόσμο που δίνει προτεραιότητα στην ιδιωτικότητα" },
  
  // Urgency Section
  "urgency.badge": { en: "� Marketing Evolution", gr: "� Εξέλιξη Μάρκετινγκ" },
  "urgency.title": { en: "The Future of Privacy-First Marketing", gr: "Το Μέλλον του Μάρκετινγκ με Προτεραιότητα την Ιδιωτικότητα" },
  "urgency.subtitle": { en: "Experience superior analytics today", gr: "Απολαύστε ανώτερη ανάλυση σήμερα" },
  "urgency.waitingRisks": { en: "Cookie-based Analytics = Limited Accuracy + Privacy Risks", gr: "Ανάλυση με Cookies = Περιορισμένη Ακρίβεια + Κίνδυνοι Ιδιωτικότητας" },
  "urgency.pulseAdvantage": { en: "Pulse Users = Superior Insights + User Trust", gr: "Χρήστες Pulse = Ανώτερες Εικόνες + Εμπιστοσύνη Χρηστών" },
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