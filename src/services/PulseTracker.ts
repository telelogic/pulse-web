/**
 * Pulse.js - Protected Cookieless Analytics Engine
 * Version: 2.0.0 (Licensed Edition)
 * 
 * This is the client-facing tracking script with built-in license protection
 * and advanced privacy-first analytics capabilities.
 */

import { PulseLicenseManager, LicenseConfig } from './PulseLicenseManager';

interface PulseConfig {
  siteId: string;
  licenseKey: string;
  apiEndpoint?: string;
  licenseEndpoint?: string;
  debug?: boolean;
  respectDNT?: boolean;
  gdprMode?: boolean;
  batchSize?: number;
  flushInterval?: number;
}

interface TrackingEvent {
  event_id: string;
  site_id: string;
  session_id: string;
  visitor_id: string;
  event_type: string;
  timestamp: string;
  properties: Record<string, any>;
  attribution?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  privacy?: {
    consent_given: boolean;
    consent_timestamp?: string;
    consent_categories?: string[];
  };
}

interface ConversionGoal {
  id: string;
  name: string;
  selector?: string;
  url_pattern?: string;
  value?: number;
  currency?: string;
}

interface PrivacySafeFingerprint {
  screen_resolution: string;
  timezone: string;
  language: string;
  platform: string;
  color_depth: number;
  canvas_hash: string;
  webgl_vendor: string;
}

export class PulseTracker {
  private config: PulseConfig;
  private licenseManager: PulseLicenseManager;
  private isInitialized: boolean = false;
  private sessionId: string = '';
  private deviceFingerprint: PrivacySafeFingerprint | null = null;
  private visitorId: string = '';
  private eventQueue: TrackingEvent[] = [];
  private isOnline: boolean = navigator.onLine;
  private sessionStart: number = Date.now();
  private pageLoadTime: number = Date.now();
  private currentUrl: string = window.location.href;
  private referrer: string = document.referrer;
  private utmParams: Record<string, string> = {};
  private conversionGoals: ConversionGoal[] = [];
  private performanceMetrics: Record<string, number> = {};

  constructor(config: PulseConfig) {
    this.config = {
      respectDNT: true,
      gdprMode: false,
      batchSize: 10,
      flushInterval: 5000,
      apiEndpoint: 'https://api.pulseanalytics.com',
      licenseEndpoint: 'https://license.pulseanalytics.com',
      debug: false,
      ...config
    };

    this.licenseManager = new PulseLicenseManager(this.config.licenseEndpoint);
    this.initializeTracker();
  }

  /**
   * Initialize the tracking system with license validation
   */
  private async initializeTracker(): Promise<void> {
    try {
      // Respect Do Not Track
      if (this.config.respectDNT && navigator.doNotTrack === '1') {
        this.log('Do Not Track enabled - respecting user privacy');
        return;
      }

      // Initialize license
      const licenseValid = await this.licenseManager.initialize(
        this.config.siteId,
        this.config.licenseKey
      );

      if (!licenseValid) {
        this.log('License validation failed - tracking disabled');
        return;
      }

      this.log('Pulse.js initialized with valid license');

      // Generate session and visitor IDs
      this.sessionId = this.generateSessionId();
      this.deviceFingerprint = await this.createPrivacySafeFingerprint();
      this.visitorId = this.getOrCreateVisitorId();
      this.utmParams = this.extractUTMParameters();

      // Set up event listeners and start tracking
      this.setupEventListeners();
      this.trackPageView();
      this.setupPerformanceTracking();
      this.setupHeartbeat();

      // Handle online/offline states
      window.addEventListener('online', () => this.handleOnlineStatusChange(true));
      window.addEventListener('offline', () => this.handleOnlineStatusChange(false));

      // Flush events periodically
      setInterval(() => this.flushEventQueue(), this.config.flushInterval!);

      this.isInitialized = true;
      this.log('Pulse.js fully initialized');

    } catch (error) {
      this.log('Initialization error:', error);
    }
  }

  /**
   * Track custom events with license validation
   */
  public trackEvent(eventType: string, properties: Record<string, any> = {}): boolean {
    if (!this.isInitialized || !this.licenseManager.canTrackEvent()) {
      this.log('Event tracking blocked: License invalid or quota exceeded');
      return false;
    }

    // Feature-specific license checks
    if (eventType === 'conversion' && !this.licenseManager.hasFeature('conversionTracking')) {
      this.log('Conversion tracking not enabled in current plan');
      return false;
    }

    if (eventType === 'custom' && !this.licenseManager.hasFeature('customEvents')) {
      this.log('Custom event tracking not enabled in current plan');
      return false;
    }

    // Record usage for quota tracking
    this.licenseManager.recordEvent();

    const event: TrackingEvent = {
      event_id: this.generateEventId(),
      site_id: this.config.siteId,
      session_id: this.sessionId,
      visitor_id: this.visitorId,
      event_type: eventType,
      timestamp: new Date().toISOString(),
      properties: {
        ...properties,
        url: this.currentUrl,
        referrer: this.referrer,
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        _pulse_plan: this.licenseManager.getPlanName()
      },
      attribution: {
        source: this.utmParams.utm_source,
        medium: this.utmParams.utm_medium,
        campaign: this.utmParams.utm_campaign,
        term: this.utmParams.utm_term,
        content: this.utmParams.utm_content
      }
    };

    this.eventQueue.push(event);
    this.log('Event tracked:', eventType);

    // Send immediately for high-priority events
    if (this.isHighPriorityEvent(eventType)) {
      this.flushEventQueue();
    }

    return true;
  }

  /**
   * Track page views automatically
   */
  private trackPageView(): void {
    if (!this.licenseManager.hasFeature('basicTracking')) {
      return;
    }

    const pageView = {
      page_title: document.title,
      page_url: this.currentUrl,
      referrer: this.referrer,
      utm_params: this.utmParams,
      performance: this.getPagePerformanceMetrics()
    };

    this.trackEvent('page_view', pageView);
  }

  /**
   * Track conversions based on configured goals
   */
  public trackConversion(goalId: string, value?: number, currency: string = 'USD'): boolean {
    if (!this.licenseManager.hasFeature('conversionTracking')) {
      this.log('Conversion tracking not enabled in current plan');
      return false;
    }

    const conversion = {
      goal_id: goalId,
      value: value || 0,
      currency,
      conversion_time: Date.now() - this.sessionStart
    };

    return this.trackEvent('conversion', conversion);
  }

  /**
   * Set up conversion goal tracking
   */
  public addConversionGoal(goal: ConversionGoal): void {
    if (!this.licenseManager.hasFeature('conversionTracking')) {
      return;
    }

    this.conversionGoals.push(goal);

    // Set up automatic tracking for this goal
    if (goal.selector) {
      document.addEventListener('click', (event) => {
        const target = event.target as Element;
        if (target.matches(goal.selector!)) {
          this.trackConversion(goal.id, goal.value, goal.currency);
        }
      });
    }

    if (goal.url_pattern) {
      // Track URL-based conversions on navigation
      const originalPushState = history.pushState;
      history.pushState = (...args) => {
        originalPushState.apply(history, args);
        if (window.location.href.match(goal.url_pattern!)) {
          this.trackConversion(goal.id, goal.value, goal.currency);
        }
      };
    }
  }

  /**
   * Get analytics data (respecting license limits)
   */
  public getAnalyticsData(): any {
    if (!this.licenseManager.hasFeature('realTimeAnalytics')) {
      this.log('Real-time analytics not enabled in current plan');
      return null;
    }

    return {
      session: {
        id: this.sessionId,
        start_time: this.sessionStart,
        duration: Date.now() - this.sessionStart,
        page_views: this.eventQueue.filter(e => e.event_type === 'page_view').length,
        events: this.eventQueue.length
      },
      visitor: {
        id: this.visitorId,
        fingerprint: this.deviceFingerprint,
        returning: this.isReturningVisitor()
      },
      attribution: {
        source: this.utmParams.utm_source || 'direct',
        medium: this.utmParams.utm_medium || 'none',
        campaign: this.utmParams.utm_campaign,
        referrer: this.referrer
      },
      license: {
        plan: this.licenseManager.getPlanName(),
        usage: this.licenseManager.getUsageStatus()
      }
    };
  }

  /**
   * Privacy-safe visitor identification
   */
  private getOrCreateVisitorId(): string {
    const storageKey = `pulse_visitor_${this.config.siteId}`;
    
    try {
      // Try localStorage first
      let visitorId = localStorage.getItem(storageKey);
      
      if (!visitorId) {
        // Generate new visitor ID using privacy-safe fingerprint
        const fingerprintData = JSON.stringify(this.deviceFingerprint);
        visitorId = `pv_${this.simpleHash(fingerprintData)}_${Date.now()}`;
        localStorage.setItem(storageKey, visitorId);
      }
      
      return visitorId;
    } catch (error) {
      // Fallback if localStorage is not available
      return `pv_session_${this.sessionId}`;
    }
  }

  /**
   * Create privacy-safe device fingerprint
   */
  private async createPrivacySafeFingerprint(): Promise<PrivacySafeFingerprint> {
    try {
      // Canvas fingerprint (privacy-safe)
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Pulse Privacy-Safe Fingerprint', 2, 2);
      const canvasHash = this.simpleHash(canvas.toDataURL().slice(-100));

      // WebGL fingerprint (basic)
      const gl = canvas.getContext('webgl');
      const webglVendor = gl ? gl.getParameter(gl.VENDOR) || 'unknown' : 'unavailable';

      return {
        screen_resolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        platform: navigator.platform,
        color_depth: screen.colorDepth,
        canvas_hash: canvasHash,
        webgl_vendor: this.simpleHash(webglVendor)
      };
    } catch (error) {
      this.log('Error creating fingerprint:', error);
      return {
        screen_resolution: 'unknown',
        timezone: 'unknown',
        language: navigator.language,
        platform: navigator.platform,
        color_depth: 0,
        canvas_hash: 'error',
        webgl_vendor: 'error'
      };
    }
  }

  /**
   * Extract UTM parameters from URL
   */
  private extractUTMParameters(): Record<string, string> {
    const params = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = params.get(param);
      if (value) {
        utmParams[param] = value;
      }
    });

    return utmParams;
  }

  /**
   * Set up event listeners for user interactions
   */
  private setupEventListeners(): void {
    // Click tracking
    document.addEventListener('click', (event) => {
      const target = event.target as Element;
      
      // Track link clicks
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        this.trackEvent('click', {
          element: 'link',
          href,
          text: target.textContent?.trim(),
          external: href?.startsWith('http') && !href.includes(window.location.hostname)
        });
      }

      // Track button clicks
      if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
        this.trackEvent('click', {
          element: 'button',
          text: target.textContent?.trim(),
          class: target.className
        });
      }
    });

    // Form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      this.trackEvent('form_submit', {
        form_id: form.id,
        form_action: form.action,
        form_method: form.method
      });
    });

    // Scroll depth tracking
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        this.trackEvent('scroll', { depth: scrollPercent });
      }
    });
  }

  /**
   * Performance tracking
   */
  private setupPerformanceTracking(): void {
    if (!this.licenseManager.hasFeature('basicTracking')) {
      return;
    }

    // Page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const performance = this.getPagePerformanceMetrics();
        this.trackEvent('performance', performance);
      }, 100);
    });
  }

  /**
   * Get page performance metrics
   */
  private getPagePerformanceMetrics(): Record<string, number> {
    if (!performance.timing) {
      return {};
    }

    const timing = performance.timing;
    return {
      load_time: timing.loadEventEnd - timing.navigationStart,
      dom_ready: timing.domContentLoadedEventEnd - timing.navigationStart,
      first_byte: timing.responseStart - timing.navigationStart,
      dns_lookup: timing.domainLookupEnd - timing.domainLookupStart,
      tcp_connect: timing.connectEnd - timing.connectStart,
      server_response: timing.responseEnd - timing.responseStart
    };
  }

  /**
   * Send heartbeat to maintain session
   */
  private setupHeartbeat(): void {
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.trackEvent('heartbeat', {
          session_duration: Date.now() - this.sessionStart
        });
      }
    }, 30000); // Every 30 seconds
  }

  /**
   * Flush event queue to server
   */
  private async flushEventQueue(): Promise<void> {
    if (this.eventQueue.length === 0 || !this.isOnline) {
      return;
    }

    const events = this.eventQueue.splice(0, this.config.batchSize!);
    
    try {
      await this.sendEvents(events);
      this.log(`Sent ${events.length} events`);
    } catch (error) {
      this.log('Failed to send events:', error);
      // Re-queue events for retry
      this.eventQueue.unshift(...events);
    }
  }

  /**
   * Send events to analytics server
   */
  private async sendEvents(events: TrackingEvent[]): Promise<void> {
    const payload = {
      site_id: this.config.siteId,
      license_key: this.config.licenseKey,
      events,
      session_info: {
        session_id: this.sessionId,
        visitor_id: this.visitorId,
        device_fingerprint: this.deviceFingerprint
      }
    };

    const response = await fetch(`${this.config.apiEndpoint}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Pulse-License': this.config.licenseKey,
        'X-Pulse-Site': this.config.siteId
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }

  /**
   * Utility functions
   */
  private generateSessionId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 12);
    return `ps_${timestamp}_${random}`;
  }

  private generateEventId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 8);
    return `pe_${timestamp}_${random}`;
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private isHighPriorityEvent(eventType: string): boolean {
    return ['conversion', 'form_submit', 'error'].includes(eventType);
  }

  private isReturningVisitor(): boolean {
    const storageKey = `pulse_visitor_${this.config.siteId}`;
    return !!localStorage.getItem(storageKey);
  }

  private handleOnlineStatusChange(online: boolean): void {
    this.isOnline = online;
    if (online && this.eventQueue.length > 0) {
      this.flushEventQueue();
    }
  }

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[Pulse.js]', ...args);
    }
  }
}

// Global initialization function
declare global {
  interface Window {
    Pulse: {
      init: (config: PulseConfig) => PulseTracker;
      tracker?: PulseTracker;
    };
  }
}

// Auto-initialize if configuration is provided
window.Pulse = {
  init: (config: PulseConfig) => {
    const tracker = new PulseTracker(config);
    window.Pulse.tracker = tracker;
    return tracker;
  }
};
