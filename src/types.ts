export type NavTab = 'home' | 'quotes' | 'policies' | 'claims' | 'support';

export interface Policy {
  id: string;
  policyNumber: string;
  title: string;
  category: 'auto' | 'health' | 'home' | 'travel';
  subTitle: string;
  status: 'active' | 'renewal_due' | 'expired';
  expiryDate: string;
  daysRemaining?: number;
  coverageLimit: string;
  limitIQD?: string;
  premiumAmount: string;
  iconName: string;
  vehicleDetails?: {
    makeModel: string;
    plateNumber: string;
    city: string;
  };
  membersCount?: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  type: 'payment' | 'claim' | 'renewal' | 'policy_purchased';
  amount?: string;
  status: 'successful' | 'under_review' | 'approved' | 'pending';
  iconName: string;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  tag: 'PARTNER' | 'VERIFIED' | 'PREMIUM';
  description: string;
  startingPrice: string;
  categories: string[];
  imageUrl: string;
}

export interface QuotePlan {
  id: string;
  level: string;
  name: string;
  monthlyPriceUSD: number;
  monthlyPriceIQD: string;
  yearlyPriceUSD: number;
  yearlyPriceIQD: string;
  popular?: boolean;
  features: {
    text: string;
    included: boolean;
  }[];
}

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyTitle: string;
  category: 'auto' | 'health' | 'home' | 'travel';
  incidentDate: string;
  location: string;
  status: 'submitted' | 'under_review' | 'approved' | 'paid';
  estimatedAmountIQD: string;
  description: string;
  timeline: {
    step: string;
    date: string;
    completed: boolean;
    active?: boolean;
  }[];
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'policy' | 'claim' | 'payment' | 'system';
}
