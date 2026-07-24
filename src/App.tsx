import React, { useState } from 'react';
import { NavTab, Policy, Claim, UserNotification, QuotePlan } from './types';
import {
  INITIAL_POLICIES,
  INITIAL_ACTIVITIES,
  INITIAL_CLAIMS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';

import { HomeView } from './components/views/HomeView';
import { QuotesView } from './components/views/QuotesView';
import { PoliciesView } from './components/views/PoliciesView';
import { ClaimsView } from './components/views/ClaimsView';
import { SupportView } from './components/views/SupportView';

import { PolicyCertificateModal } from './components/modals/PolicyCertificateModal';
import { QRCodeModal } from './components/modals/QRCodeModal';
import { ClaimWizardModal } from './components/modals/ClaimWizardModal';
import { NewQuoteWizardModal } from './components/modals/NewQuoteWizardModal';
import { EmergencyModal } from './components/modals/EmergencyModal';
import { NotificationDrawer } from './components/modals/NotificationDrawer';
import { ProfileModal } from './components/modals/ProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Application Data State
  const [policies, setPolicies] = useState<Policy[]>(INITIAL_POLICIES);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [claims, setClaims] = useState<Claim[]>(INITIAL_CLAIMS);
  const [notifications, setNotifications] = useState<UserNotification[]>(INITIAL_NOTIFICATIONS);

  // Modal States
  const [certificatePolicy, setCertificatePolicy] = useState<Policy | null>(null);
  const [qrPolicy, setQrPolicy] = useState<Policy | null>(null);
  const [isClaimWizardOpen, setIsClaimWizardOpen] = useState(false);
  const [claimPreselectedPolicyId, setClaimPreselectedPolicyId] = useState<string | undefined>();
  const [isQuoteWizardOpen, setIsQuoteWizardOpen] = useState(false);
  const [preselectedPlan, setPreselectedPlan] = useState<QuotePlan | null>(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [detailModalPolicy, setDetailModalPolicy] = useState<Policy | null>(null);

  // Handlers
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAddNewPolicy = (newPolicy: Policy) => {
    setPolicies((prev) => [newPolicy, ...prev]);

    // Add activity record
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: 'New Policy Activated',
        subtitle: `${newPolicy.title} (${newPolicy.subTitle})`,
        date: 'Just now',
        type: 'policy_purchased',
        amount: newPolicy.premiumAmount,
        status: 'successful',
        iconName: newPolicy.iconName,
      },
      ...prev,
    ]);

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Policy Activated',
        message: `${newPolicy.title} is now active. Official PDF certificate ready.`,
        time: 'Just now',
        read: false,
        type: 'policy',
      },
      ...prev,
    ]);
  };

  const handleAddNewClaim = (newClaim: Claim) => {
    setClaims((prev) => [newClaim, ...prev]);

    // Add activity record
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: 'Claim Filed',
        subtitle: newClaim.policyTitle,
        date: 'Just now',
        type: 'claim',
        status: 'under_review',
        iconName: 'history',
      },
      ...prev,
    ]);

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Claim Filed',
        message: `Claim ${newClaim.claimNumber} received for review. 24-hr status active.`,
        time: 'Just now',
        read: false,
        type: 'claim',
      },
      ...prev,
    ]);
  };

  const handleSelectPlan = (plan: QuotePlan, _billingCycle: 'monthly' | 'yearly') => {
    setPreselectedPlan(plan);
    setIsQuoteWizardOpen(true);
  };

  const handleOpenFileClaimForPolicy = (policyId?: string) => {
    setClaimPreselectedPolicyId(policyId);
    setIsClaimWizardOpen(true);
  };

  const handleOpenRenewPolicyForPolicy = (policyId?: string) => {
    const targetPolicy = policies.find((p) => p.id === policyId) || policies[0];
    setCertificatePolicy(targetPolicy);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fd] text-[#191c1f] relative flex flex-col font-sans selection:bg-[#b4c5ff]">
      {/* Top Navigation Bar */}
      <Header
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Screen Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            policies={policies}
            activities={activities}
            onNavigate={setActiveTab}
            onOpenFileClaim={handleOpenFileClaimForPolicy}
            onOpenRenewPolicy={handleOpenRenewPolicyForPolicy}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
            onViewPolicyDetails={(policy) => setCertificatePolicy(policy)}
            onDownloadPDF={(policy) => setCertificatePolicy(policy)}
            onShowQRCode={(policy) => setQrPolicy(policy)}
            onStartNewQuote={() => {
              setPreselectedPlan(null);
              setIsQuoteWizardOpen(true);
            }}
          />
        )}

        {activeTab === 'quotes' && (
          <QuotesView
            onSelectPlan={handleSelectPlan}
            onSelectProvider={(_name) => {
              setPreselectedPlan(null);
              setIsQuoteWizardOpen(true);
            }}
            onOpenNewQuoteWizard={() => {
              setPreselectedPlan(null);
              setIsQuoteWizardOpen(true);
            }}
          />
        )}

        {activeTab === 'policies' && (
          <PoliciesView
            policies={policies}
            onViewPolicyDetails={(policy) => setCertificatePolicy(policy)}
            onDownloadPDF={(policy) => setCertificatePolicy(policy)}
            onRenewPolicy={(policy) => {
              setPreselectedPlan(null);
              setIsQuoteWizardOpen(true);
            }}
            onPurchaseNew={() => {
              setPreselectedPlan(null);
              setIsQuoteWizardOpen(true);
            }}
          />
        )}

        {activeTab === 'claims' && (
          <ClaimsView
            claims={claims}
            policies={policies}
            onOpenFileClaimWizard={() => handleOpenFileClaimForPolicy()}
            onViewClaimDetails={(claim) => {
              alert(
                `Claim Details (${claim.claimNumber}):\nStatus: ${claim.status.toUpperCase()}\nLocation: ${
                  claim.location
                }\nEst. Reimbursement: ${claim.estimatedAmountIQD}\n\nTimeline:\n${claim.timeline
                  .map((t) => `• ${t.step} (${t.date})`)
                  .join('\n')}`
              );
            }}
          />
        )}

        {activeTab === 'support' && (
          <SupportView onOpenEmergency={() => setIsEmergencyOpen(true)} />
        )}
      </main>

      {/* Navigation Layouts */}
      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Active Modals & Drawers */}
      <PolicyCertificateModal
        policy={certificatePolicy}
        onClose={() => setCertificatePolicy(null)}
      />

      <QRCodeModal policy={qrPolicy} onClose={() => setQrPolicy(null)} />

      <ClaimWizardModal
        isOpen={isClaimWizardOpen}
        policies={policies}
        preselectedPolicyId={claimPreselectedPolicyId}
        onClose={() => setIsClaimWizardOpen(false)}
        onSubmitClaim={handleAddNewClaim}
      />

      <NewQuoteWizardModal
        isOpen={isQuoteWizardOpen}
        preselectedPlan={preselectedPlan}
        onClose={() => setIsQuoteWizardOpen(false)}
        onPolicyCreated={handleAddNewPolicy}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        notifications={notifications}
        onClose={() => setIsNotificationOpen(false)}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}
