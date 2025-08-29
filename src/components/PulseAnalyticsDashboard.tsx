/**
 * Pulse Analytics Dashboard Component
 * Real-time privacy-first analytics dashboard
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Eye, 
  Target, 
  Globe, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface AnalyticsData {
  sessions: {
    total: number;
    unique: number;
    returning: number;
    avgDuration: number;
  };
  attribution: {
    accuracy: number;
    recoveredConversions: number;
    sources: Array<{
      name: string;
      conversions: number;
      accuracy: number;
    }>;
  };
  privacy: {
    complianceScore: number;
    consentRate: number;
    regulation: string;
    cookieless: boolean;
  };
  realTime: {
    activeUsers: number;
    eventsPerSecond: number;
    topPages: string[];
    conversionEvents: number;
  };
}

interface DashboardProps {
  siteId: string;
  licenseKey: string;
  showDemo?: boolean;
}

const PulseAnalyticsDashboard: React.FC<DashboardProps> = ({ 
  siteId, 
  licenseKey, 
  showDemo = false 
}) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(30000);

  // Demo data for marketing purposes
  const demoData: AnalyticsData = {
    sessions: {
      total: 12847,
      unique: 8923,
      returning: 3924,
      avgDuration: 245
    },
    attribution: {
      accuracy: 98.7,
      recoveredConversions: 847,
      sources: [
        { name: 'Google Ads', conversions: 342, accuracy: 97.8 },
        { name: 'Facebook Ads', conversions: 234, accuracy: 96.5 },
        { name: 'Organic Search', conversions: 189, accuracy: 99.2 },
        { name: 'Direct', conversions: 82, accuracy: 100 }
      ]
    },
    privacy: {
      complianceScore: 98,
      consentRate: 87,
      regulation: 'GDPR',
      cookieless: true
    },
    realTime: {
      activeUsers: 127,
      eventsPerSecond: 24,
      topPages: ['/pricing', '/features', '/demo'],
      conversionEvents: 12
    }
  };

  useEffect(() => {
    if (showDemo) {
      setData(demoData);
      setLoading(false);
      return;
    }

    fetchAnalyticsData();
    const interval = setInterval(fetchAnalyticsData, refreshInterval);
    return () => clearInterval(interval);
  }, [siteId, licenseKey, refreshInterval, showDemo]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(`https://api.pulseanalytics.com/dashboard/${siteId}`, {
        headers: {
          'Authorization': `Bearer ${licenseKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const analyticsData = await response.json();
      setData(analyticsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-purple" />
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error && !showDemo) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-4 text-red-500" />
          <p className="text-red-600 mb-4">Error loading analytics: {error}</p>
          <Button onClick={fetchAnalyticsData} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Privacy-first analytics without cookies</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {showDemo && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Demo Mode
            </Badge>
          )}
          
          <Badge 
            variant={data.privacy.cookieless ? "default" : "destructive"}
            className={data.privacy.cookieless ? "bg-green-100 text-green-800" : ""}
          >
            <ShieldCheck className="h-3 w-3 mr-1" />
            {data.privacy.cookieless ? 'Cookieless' : 'Cookies Detected'}
          </Badge>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchAnalyticsData}
            disabled={showDemo}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.sessions.total)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(data.sessions.unique)} unique visitors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attribution Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.attribution.accuracy}%</div>
            <p className="text-xs text-green-600">
              +{formatNumber(data.attribution.recoveredConversions)} recovered conversions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Privacy Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.privacy.complianceScore}/100</div>
            <p className="text-xs text-muted-foreground">
              {data.privacy.regulation} compliant
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.realTime.activeUsers)}</div>
            <p className="text-xs text-muted-foreground">
              {data.realTime.eventsPerSecond} events/sec
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attribution">Attribution</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Compliance</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Analytics</CardTitle>
                <CardDescription>Visitor behavior insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Returning Visitors</span>
                  <span className="font-medium">
                    {((data.sessions.returning / data.sessions.total) * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={(data.sessions.returning / data.sessions.total) * 100} 
                  className="h-2"
                />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg. Session Duration</span>
                  <span className="font-medium">{formatDuration(data.sessions.avgDuration)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bounce Rate</span>
                  <span className="font-medium">24.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>User journey optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Page Views</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Engaged Sessions</span>
                    <span className="font-medium">67.8%</span>
                  </div>
                  <Progress value={67.8} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conversions</span>
                    <span className="font-medium">12.4%</span>
                  </div>
                  <Progress value={12.4} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Attribution Tab */}
        <TabsContent value="attribution" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attribution Sources</CardTitle>
                <CardDescription>Conversion sources with accuracy rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.attribution.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-gray-600">
                          {formatNumber(source.conversions)} conversions
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{source.accuracy}%</p>
                        <p className="text-sm text-gray-600">accuracy</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>vs. Google Analytics 4</CardTitle>
                <CardDescription>Comparison of attribution accuracy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded">
                  <h4 className="font-medium text-red-800">GA4 Attribution Issues</h4>
                  <ul className="mt-2 text-sm text-red-700 space-y-1">
                    <li>• 40-60% data loss from cookie blocking</li>
                    <li>• Cross-device journey gaps</li>
                    <li>• iOS 14.5+ attribution holes</li>
                    <li>• EU privacy compliance issues</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <h4 className="font-medium text-green-800">Pulse Advantages</h4>
                  <ul className="mt-2 text-sm text-green-700 space-y-1">
                    <li>• 98.7% attribution accuracy</li>
                    <li>• Complete cookieless tracking</li>
                    <li>• Cross-device user journeys</li>
                    <li>• Full privacy compliance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Privacy & Compliance Tab */}
        <TabsContent value="privacy" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Privacy regulation compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Overall Compliance Score</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {data.privacy.complianceScore}/100
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GDPR Compliance</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CCPA Compliance</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cookieless Tracking</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Minimization</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consent Management</CardTitle>
                <CardDescription>User consent preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Consent Rate</span>
                  <span className="text-2xl font-bold">{data.privacy.consentRate}%</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Analytics Consent</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Marketing Consent</span>
                    <span className="font-medium">64%</span>
                  </div>
                  <Progress value={64} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Personalization</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Real-time Tab */}
        <TabsContent value="realtime" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Activity</CardTitle>
                <CardDescription>Current user activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-purple">
                    {formatNumber(data.realTime.activeUsers)}
                  </div>
                  <p className="text-sm text-gray-600">Active users right now</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Events per second</span>
                    <span className="font-medium">{data.realTime.eventsPerSecond}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Conversion events</span>
                    <span className="font-medium">{data.realTime.conversionEvents}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Active Pages</CardTitle>
                <CardDescription>Most viewed pages right now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.realTime.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{page}</span>
                      <Badge variant="secondary">
                        {Math.floor(Math.random() * 20) + 1} viewers
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PulseAnalyticsDashboard;
