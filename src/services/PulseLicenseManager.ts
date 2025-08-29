/**
 * Pulse License Management System
 * Handles client-side license validation and feature gating
 */

export interface LicenseConfig {
  siteId: string;
  licenseKey: string;
  domain: string;
  plan: 'trial' | 'starter' | 'professional' | 'enterprise';
  features: {
    basicTracking: boolean;
    conversionTracking: boolean;
    attributionModeling: boolean;
    customEvents: boolean;
    realTimeAnalytics: boolean;
    exportData: boolean;
    apiAccess: boolean;
    whiteLabeling: boolean;
  };
  limits: {
    monthlyEvents: number;
    retentionDays: number;
    customGoals: number;
    teamMembers: number;
  };
  expiresAt: string;
}

export interface LicenseValidationResponse {
  valid: boolean;
  config?: LicenseConfig;
  error?: string;
  quotaStatus?: {
    used: number;
    limit: number;
    resetDate: string;
  };
}

export class PulseLicenseManager {
  private config: LicenseConfig | null = null;
  private lastValidation: number = 0;
  private validationInterval: number = 300000; // 5 minutes
  private licenseEndpoint: string;
  private currentUsage: number = 0;

  constructor(licenseEndpoint: string = 'https://license.pulseanalytics.com') {
    this.licenseEndpoint = licenseEndpoint;
  }

  /**
   * Initialize license validation
   */
  async initialize(siteId: string, licenseKey: string): Promise<boolean> {
    try {
      const response = await this.validateLicense(siteId, licenseKey);
      
      if (response.valid && response.config) {
        this.config = response.config;
        this.schedulePeriodicValidation(siteId, licenseKey);
        return true;
      }
      
      this.handleLicenseError(response.error || 'Unknown validation error');
      return false;
    } catch (error) {
      this.handleLicenseError(`Validation failed: ${error}`);
      return false;
    }
  }

  /**
   * Validate license with server
   */
  private async validateLicense(siteId: string, licenseKey: string): Promise<LicenseValidationResponse> {
    const validation = {
      site_id: siteId,
      license_key: licenseKey,
      domain: window.location.hostname,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      current_usage: this.currentUsage
    };

    try {
      const response = await fetch(`${this.licenseEndpoint}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Pulse-License': licenseKey,
          'X-Pulse-Site': siteId,
          'X-Pulse-Domain': window.location.hostname
        },
        body: JSON.stringify(validation)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      // Fallback to cached license if network fails
      const cached = this.getCachedLicense();
      if (cached && this.isValidCachedLicense(cached)) {
        return { valid: true, config: cached };
      }
      
      throw error;
    }
  }

  /**
   * Check if feature is enabled for current license
   */
  hasFeature(feature: keyof LicenseConfig['features']): boolean {
    if (!this.config || !this.isLicenseValid()) {
      return false;
    }
    return this.config.features[feature] === true;
  }

  /**
   * Check if within usage limits
   */
  canTrackEvent(): boolean {
    if (!this.config || !this.isLicenseValid()) {
      return false;
    }
    
    return this.currentUsage < this.config.limits.monthlyEvents;
  }

  /**
   * Increment usage counter
   */
  recordEvent(): void {
    this.currentUsage++;
  }

  /**
   * Get current usage status
   */
  getUsageStatus(): { used: number; limit: number; percentage: number } {
    const limit = this.config?.limits.monthlyEvents || 0;
    const percentage = limit > 0 ? (this.currentUsage / limit) * 100 : 0;
    
    return {
      used: this.currentUsage,
      limit,
      percentage: Math.min(percentage, 100)
    };
  }

  /**
   * Check if license is currently valid
   */
  private isLicenseValid(): boolean {
    if (!this.config) return false;
    
    const now = new Date();
    const expires = new Date(this.config.expiresAt);
    
    return now < expires;
  }

  /**
   * Handle license validation errors
   */
  private handleLicenseError(error: string): void {
    console.warn(`[Pulse License] ${error}`);
    
    // Show appropriate user message based on error type
    if (error.includes('expired')) {
      this.showLicenseExpiredMessage();
    } else if (error.includes('domain')) {
      this.showDomainMismatchMessage();
    } else if (error.includes('quota')) {
      this.showQuotaExceededMessage();
    }
  }

  /**
   * Cache license for offline validation
   */
  private cacheLicense(config: LicenseConfig): void {
    try {
      localStorage.setItem('pulse_license_cache', JSON.stringify({
        config,
        cachedAt: Date.now()
      }));
    } catch (error) {
      console.warn('[Pulse License] Could not cache license:', error);
    }
  }

  /**
   * Get cached license
   */
  private getCachedLicense(): LicenseConfig | null {
    try {
      const cached = localStorage.getItem('pulse_license_cache');
      if (cached) {
        const { config } = JSON.parse(cached);
        return config;
      }
    } catch (error) {
      console.warn('[Pulse License] Could not read cached license:', error);
    }
    return null;
  }

  /**
   * Check if cached license is still valid
   */
  private isValidCachedLicense(config: LicenseConfig): boolean {
    const now = new Date();
    const expires = new Date(config.expiresAt);
    return now < expires;
  }

  /**
   * Schedule periodic license validation
   */
  private schedulePeriodicValidation(siteId: string, licenseKey: string): void {
    setInterval(async () => {
      try {
        const response = await this.validateLicense(siteId, licenseKey);
        if (response.valid && response.config) {
          this.config = response.config;
          this.cacheLicense(response.config);
        }
      } catch (error) {
        console.warn('[Pulse License] Periodic validation failed:', error);
      }
    }, this.validationInterval);
  }

  /**
   * User-facing error messages
   */
  private showLicenseExpiredMessage(): void {
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      background: #ef4444; color: white; padding: 16px 20px;
      border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    message.innerHTML = `
      <strong>Pulse License Expired</strong><br>
      Please renew your license to continue tracking.
    `;
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 10000);
  }

  private showDomainMismatchMessage(): void {
    console.error('[Pulse] License domain mismatch. Please verify your license is configured for this domain.');
  }

  private showQuotaExceededMessage(): void {
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      background: #f59e0b; color: white; padding: 16px 20px;
      border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    message.innerHTML = `
      <strong>Monthly Quota Reached</strong><br>
      Upgrade your plan to continue tracking events.
    `;
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 10000);
  }

  /**
   * Get current license configuration
   */
  getLicenseConfig(): LicenseConfig | null {
    return this.config;
  }

  /**
   * Get plan name for display
   */
  getPlanName(): string {
    return this.config?.plan || 'unlicensed';
  }
}
