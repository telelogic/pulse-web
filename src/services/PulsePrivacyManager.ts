/**
 * Pulse Privacy & Consent Management System
 * Handles GDPR, CCPA, and other privacy regulations automatically
 */

export interface ConsentSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  preferences: boolean;
}

export interface PrivacyConfig {
  region: 'auto' | 'eu' | 'us' | 'global';
  showBanner: boolean;
  position: 'bottom' | 'top' | 'center';
  style: 'minimal' | 'detailed' | 'custom';
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
  cookiePolicyUrl?: string;
  consentMode: 'opt-in' | 'opt-out' | 'notice';
  rememberDays: number;
}

export interface GeoLocation {
  country: string;
  region: string;
  isEU: boolean;
  requiresConsent: boolean;
  regulation: 'GDPR' | 'CCPA' | 'LGPD' | 'PIPEDA' | 'none';
}

export class PulsePrivacyManager {
  private config: PrivacyConfig;
  private currentConsent: ConsentSettings;
  private geoLocation: GeoLocation | null = null;
  private bannerShown: boolean = false;
  private onConsentChange?: (consent: ConsentSettings) => void;

  constructor(config: PrivacyConfig) {
    this.config = {
      region: 'auto',
      showBanner: true,
      position: 'bottom',
      style: 'minimal',
      consentMode: 'opt-in',
      rememberDays: 365,
      ...config
    };

    // Initialize with conservative defaults
    this.currentConsent = {
      necessary: true, // Always true - needed for basic functionality
      analytics: false,
      marketing: false,
      personalization: false,
      preferences: false
    };

    this.initialize();
  }

  /**
   * Initialize privacy management
   */
  private async initialize(): Promise<void> {
    try {
      // Detect user location if auto-detection is enabled
      if (this.config.region === 'auto') {
        this.geoLocation = await this.detectUserLocation();
      } else {
        this.geoLocation = this.getRegionSettings(this.config.region);
      }

      // Load existing consent if available
      const existingConsent = this.loadStoredConsent();
      if (existingConsent) {
        this.currentConsent = existingConsent;
      } else if (this.shouldShowConsentBanner()) {
        // Show consent banner if required by regulation
        this.showConsentBanner();
      } else {
        // No consent required - set reasonable defaults
        this.setDefaultConsent();
      }

    } catch (error) {
      console.warn('[Pulse Privacy] Initialization error:', error);
      // Fallback to conservative defaults
      this.setConsentiveDefaults();
    }
  }

  /**
   * Detect user's geographic location and applicable regulations
   */
  private async detectUserLocation(): Promise<GeoLocation> {
    try {
      // Use a privacy-friendly IP geolocation service
      const response = await fetch('https://api.pulseanalytics.com/geo', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Geolocation service unavailable');
      }

      const geo = await response.json();
      return {
        country: geo.country,
        region: geo.region,
        isEU: geo.is_eu || false,
        requiresConsent: geo.requires_consent || false,
        regulation: geo.regulation || 'none'
      };

    } catch (error) {
      console.warn('[Pulse Privacy] Geolocation detection failed:', error);
      // Fallback to conservative EU settings
      return {
        country: 'unknown',
        region: 'unknown',
        isEU: true,
        requiresConsent: true,
        regulation: 'GDPR'
      };
    }
  }

  /**
   * Get region-specific privacy settings
   */
  private getRegionSettings(region: string): GeoLocation {
    const settings: Record<string, GeoLocation> = {
      'eu': {
        country: 'EU',
        region: 'Europe',
        isEU: true,
        requiresConsent: true,
        regulation: 'GDPR'
      },
      'us': {
        country: 'US',
        region: 'North America',
        isEU: false,
        requiresConsent: true,
        regulation: 'CCPA'
      },
      'global': {
        country: 'global',
        region: 'global',
        isEU: false,
        requiresConsent: true,
        regulation: 'GDPR' // Most strict
      }
    };

    return settings[region] || settings['global'];
  }

  /**
   * Check if consent banner should be shown
   */
  private shouldShowConsentBanner(): boolean {
    if (!this.config.showBanner) return false;
    if (this.bannerShown) return false;
    if (!this.geoLocation?.requiresConsent) return false;
    if (this.loadStoredConsent()) return false; // Already has consent

    return true;
  }

  /**
   * Show consent banner based on configuration
   */
  private showConsentBanner(): void {
    if (this.bannerShown) return;

    const banner = this.createConsentBanner();
    document.body.appendChild(banner);
    this.bannerShown = true;

    // Add backdrop if center position
    if (this.config.position === 'center') {
      const backdrop = this.createBackdrop();
      document.body.appendChild(backdrop);
    }
  }

  /**
   * Create consent banner HTML
   */
  private createConsentBanner(): HTMLElement {
    const banner = document.createElement('div');
    banner.id = 'pulse-consent-banner';
    banner.className = `pulse-consent-banner pulse-consent-${this.config.position} pulse-consent-${this.config.style}`;
    
    const styles = this.getBannerStyles();
    banner.style.cssText = styles;

    if (this.config.style === 'minimal') {
      banner.innerHTML = this.getMinimalBannerHTML();
    } else {
      banner.innerHTML = this.getDetailedBannerHTML();
    }

    // Add event listeners
    this.attachBannerEventListeners(banner);

    return banner;
  }

  /**
   * Get minimal banner HTML
   */
  private getMinimalBannerHTML(): string {
    const regulation = this.geoLocation?.regulation || 'GDPR';
    
    return `
      <div class="pulse-consent-content">
        <div class="pulse-consent-text">
          <h4>Privacy Notice</h4>
          <p>We use cookieless tracking to analyze site usage and improve your experience while respecting your privacy under ${regulation}.</p>
        </div>
        <div class="pulse-consent-actions">
          <button id="pulse-accept-all" class="pulse-btn pulse-btn-primary">Accept All</button>
          <button id="pulse-manage-consent" class="pulse-btn pulse-btn-secondary">Manage Preferences</button>
          <button id="pulse-reject-all" class="pulse-btn pulse-btn-text">Reject All</button>
        </div>
      </div>
    `;
  }

  /**
   * Get detailed banner HTML with granular controls
   */
  private getDetailedBannerHTML(): string {
    const regulation = this.geoLocation?.regulation || 'GDPR';
    
    return `
      <div class="pulse-consent-content">
        <div class="pulse-consent-header">
          <h4>Your Privacy Matters</h4>
          <button id="pulse-close-banner" class="pulse-close-btn">×</button>
        </div>
        
        <div class="pulse-consent-body">
          <p>We respect your privacy and use cookieless technology to provide analytics without invasive tracking. Under ${regulation}, you can control what data we collect.</p>
          
          <div class="pulse-consent-categories">
            <div class="pulse-category">
              <label class="pulse-category-label">
                <input type="checkbox" checked disabled> 
                <strong>Necessary</strong> - Required for basic site functionality
              </label>
            </div>
            
            <div class="pulse-category">
              <label class="pulse-category-label">
                <input type="checkbox" id="pulse-analytics-consent"> 
                <strong>Analytics</strong> - Helps us understand how you use our site
              </label>
            </div>
            
            <div class="pulse-category">
              <label class="pulse-category-label">
                <input type="checkbox" id="pulse-marketing-consent"> 
                <strong>Marketing</strong> - Allows us to show relevant content
              </label>
            </div>
            
            <div class="pulse-category">
              <label class="pulse-category-label">
                <input type="checkbox" id="pulse-personalization-consent"> 
                <strong>Personalization</strong> - Customizes your experience
              </label>
            </div>
          </div>
        </div>
        
        <div class="pulse-consent-footer">
          <div class="pulse-consent-links">
            ${this.config.privacyPolicyUrl ? `<a href="${this.config.privacyPolicyUrl}" target="_blank">Privacy Policy</a>` : ''}
            ${this.config.termsOfServiceUrl ? `<a href="${this.config.termsOfServiceUrl}" target="_blank">Terms of Service</a>` : ''}
          </div>
          
          <div class="pulse-consent-actions">
            <button id="pulse-save-preferences" class="pulse-btn pulse-btn-primary">Save Preferences</button>
            <button id="pulse-accept-all-detailed" class="pulse-btn pulse-btn-secondary">Accept All</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get banner CSS styles
   */
  private getBannerStyles(): string {
    const baseStyles = `
      position: fixed;
      z-index: 10000;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      color: #374151;
    `;

    const positionStyles = {
      'bottom': 'bottom: 0;',
      'top': 'top: 0;',
      'center': 'top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 600px; border-radius: 8px;'
    };

    return baseStyles + positionStyles[this.config.position];
  }

  /**
   * Attach event listeners to banner
   */
  private attachBannerEventListeners(banner: HTMLElement): void {
    // Accept all button
    const acceptAllBtn = banner.querySelector('#pulse-accept-all, #pulse-accept-all-detailed');
    acceptAllBtn?.addEventListener('click', () => {
      this.acceptAllConsent();
      this.hideBanner();
    });

    // Reject all button
    const rejectAllBtn = banner.querySelector('#pulse-reject-all');
    rejectAllBtn?.addEventListener('click', () => {
      this.rejectAllConsent();
      this.hideBanner();
    });

    // Manage preferences button
    const manageBtn = banner.querySelector('#pulse-manage-consent');
    manageBtn?.addEventListener('click', () => {
      this.showDetailedPreferences();
    });

    // Save preferences button
    const saveBtn = banner.querySelector('#pulse-save-preferences');
    saveBtn?.addEventListener('click', () => {
      this.saveGranularConsent();
      this.hideBanner();
    });

    // Close button
    const closeBtn = banner.querySelector('#pulse-close-banner');
    closeBtn?.addEventListener('click', () => {
      this.setConsentiveDefaults();
      this.hideBanner();
    });
  }

  /**
   * Accept all consent categories
   */
  private acceptAllConsent(): void {
    this.currentConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
      preferences: true
    };

    this.saveConsent();
    this.notifyConsentChange();
  }

  /**
   * Reject all non-necessary consent
   */
  private rejectAllConsent(): void {
    this.currentConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      preferences: false
    };

    this.saveConsent();
    this.notifyConsentChange();
  }

  /**
   * Save granular consent from detailed banner
   */
  private saveGranularConsent(): void {
    const banner = document.getElementById('pulse-consent-banner');
    if (!banner) return;

    this.currentConsent = {
      necessary: true, // Always true
      analytics: (banner.querySelector('#pulse-analytics-consent') as HTMLInputElement)?.checked || false,
      marketing: (banner.querySelector('#pulse-marketing-consent') as HTMLInputElement)?.checked || false,
      personalization: (banner.querySelector('#pulse-personalization-consent') as HTMLInputElement)?.checked || false,
      preferences: true // Usually accepted for better UX
    };

    this.saveConsent();
    this.notifyConsentChange();
  }

  /**
   * Set conservative defaults when consent is not required
   */
  private setDefaultConsent(): void {
    this.currentConsent = {
      necessary: true,
      analytics: true,
      marketing: false,
      personalization: false,
      preferences: true
    };

    this.saveConsent();
    this.notifyConsentChange();
  }

  /**
   * Set very conservative defaults for unknown regions
   */
  private setConsentiveDefaults(): void {
    this.currentConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      preferences: false
    };

    this.saveConsent();
    this.notifyConsentChange();
  }

  /**
   * Show detailed preferences modal
   */
  private showDetailedPreferences(): void {
    const currentBanner = document.getElementById('pulse-consent-banner');
    if (currentBanner) {
      currentBanner.innerHTML = this.getDetailedBannerHTML();
      this.attachBannerEventListeners(currentBanner);
    }
  }

  /**
   * Hide consent banner
   */
  private hideBanner(): void {
    const banner = document.getElementById('pulse-consent-banner');
    const backdrop = document.getElementById('pulse-consent-backdrop');
    
    banner?.remove();
    backdrop?.remove();
    this.bannerShown = false;
  }

  /**
   * Create backdrop for center modal
   */
  private createBackdrop(): HTMLElement {
    const backdrop = document.createElement('div');
    backdrop.id = 'pulse-consent-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
    `;
    return backdrop;
  }

  /**
   * Save consent to localStorage
   */
  private saveConsent(): void {
    try {
      const consentData = {
        consent: this.currentConsent,
        timestamp: new Date().toISOString(),
        regulation: this.geoLocation?.regulation || 'none',
        version: '1.0'
      };

      localStorage.setItem('pulse_consent', JSON.stringify(consentData));
    } catch (error) {
      console.warn('[Pulse Privacy] Could not save consent:', error);
    }
  }

  /**
   * Load stored consent
   */
  private loadStoredConsent(): ConsentSettings | null {
    try {
      const stored = localStorage.getItem('pulse_consent');
      if (!stored) return null;

      const consentData = JSON.parse(stored);
      const consentDate = new Date(consentData.timestamp);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() - this.config.rememberDays);

      // Check if consent has expired
      if (consentDate < expiryDate) {
        localStorage.removeItem('pulse_consent');
        return null;
      }

      return consentData.consent;
    } catch (error) {
      console.warn('[Pulse Privacy] Could not load consent:', error);
      return null;
    }
  }

  /**
   * Notify listeners of consent changes
   */
  private notifyConsentChange(): void {
    if (this.onConsentChange) {
      this.onConsentChange(this.currentConsent);
    }

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('pulseConsentChange', {
      detail: this.currentConsent
    }));
  }

  /**
   * Public API methods
   */

  /**
   * Get current consent settings
   */
  public getConsent(): ConsentSettings {
    return { ...this.currentConsent };
  }

  /**
   * Check if specific consent is given
   */
  public hasConsent(category: keyof ConsentSettings): boolean {
    return this.currentConsent[category] === true;
  }

  /**
   * Update consent for specific category
   */
  public updateConsent(category: keyof ConsentSettings, granted: boolean): void {
    if (category === 'necessary') {
      console.warn('[Pulse Privacy] Cannot modify necessary consent');
      return;
    }

    this.currentConsent[category] = granted;
    this.saveConsent();
    this.notifyConsentChange();
  }

  /**
   * Show consent banner again
   */
  public showConsentManager(): void {
    this.bannerShown = false;
    this.showConsentBanner();
  }

  /**
   * Set consent change callback
   */
  public onConsentChanged(callback: (consent: ConsentSettings) => void): void {
    this.onConsentChange = callback;
  }

  /**
   * Get regulation information
   */
  public getRegulationInfo(): { regulation: string; requiresConsent: boolean } {
    return {
      regulation: this.geoLocation?.regulation || 'none',
      requiresConsent: this.geoLocation?.requiresConsent || false
    };
  }

  /**
   * Export consent data for compliance
   */
  public exportConsentData(): any {
    const stored = localStorage.getItem('pulse_consent');
    return stored ? JSON.parse(stored) : null;
  }
}
