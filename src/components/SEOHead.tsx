import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Pulse Analytics - Cookieless Marketing Platform | Future-Proof Your Business for Chrome 2025",
  description = "The only marketing analytics platform built for Chrome's cookieless future. Get 98.7% attribution accuracy without cookies. GDPR compliant. 7-day free trial. Setup in 15 minutes.",
  keywords = "cookieless analytics, chrome cookies 2025, marketing attribution, privacy analytics, GDPR compliant tracking, google analytics alternative, cookieless tracking, privacy-first marketing, attribution platform, marketing analytics",
  canonical = "https://privapulse.com/",
  ogImage = "https://privapulse.com/og-image-pulse-analytics.png"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
    
    // Update Open Graph tags
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', title);
    }
    
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', description);
    }
    
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', ogImage);
    }
    
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', canonical);
    }
    
    // Update Twitter tags
    const twitterTitleMeta = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', title);
    }
    
    const twitterDescMeta = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescMeta) {
      twitterDescMeta.setAttribute('content', description);
    }
    
    const twitterImageMeta = document.querySelector('meta[property="twitter:image"]');
    if (twitterImageMeta) {
      twitterImageMeta.setAttribute('content', ogImage);
    }
  }, [title, description, keywords, canonical, ogImage]);

  return null; // This component doesn't render anything
};

export default SEOHead;
