import React, { useState, useEffect } from 'react';
import { Policy, ActivityItem, NavTab } from '../../types';

interface HomeViewProps {
  policies: Policy[];
  activities: ActivityItem[];
  onNavigate: (tab: NavTab) => void;
  onOpenFileClaim: (policyId?: string) => void;
  onOpenRenewPolicy: (policyId?: string) => void;
  onOpenEmergency: () => void;
  onViewPolicyDetails: (policy: Policy) => void;
  onDownloadPDF: (policy: Policy) => void;
  onShowQRCode: (policy: Policy) => void;
  onStartNewQuote: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  policies,
  activities,
  onNavigate,
  onOpenFileClaim,
  onOpenRenewPolicy,
  onOpenEmergency,
  onViewPolicyDetails,
  onDownloadPDF,
  onShowQRCode,
  onStartNewQuote,
}) => {
  const [greeting, setGreeting] = useState<{ en: string; ar: string }>({
    en: 'Good Afternoon',
    ar: 'مساء الخير',
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting({ en: 'Good Morning', ar: 'صباح الخير' });
    } else if (hour < 18) {
      setGreeting({ en: 'Good Afternoon', ar: 'مساء الخير' });
    } else {
      setGreeting({ en: 'Good Evening', ar: 'مساء الخير' });
    }
  }, []);

  const activePolicies = policies.filter((p) => p.status === 'active');

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-12 pt-6 pb-32">
      {/* Hero Section: Welcome & Quick Action */}
      <section className="relative overflow-hidden rounded-3xl bg-[#004bc5] p-6 sm:p-8 md:p-12 mb-8 text-white shadow-xl shadow-[#004bc5]/20">
        <div className="relative z-10 md:w-3/4 lg:w-2/3">
          <p className="text-xs font-bold text-[#dbe1ff] mb-2 uppercase tracking-widest opacity-90">
            Welcome back / أهلاً بك
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
            {greeting.en}, Ahmad Hassan / {greeting.ar}
          </h2>
          <p className="text-sm md:text-base text-[#eeefff] mb-8 max-w-lg leading-relaxed opacity-95">
            Protect what matters most today. Explore Iraq's most reliable insurance coverage with just a few clicks.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <button
              onClick={onStartNewQuote}
              className="bg-white text-[#004bc5] px-6 sm:px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#dbe1ff] transition-all active:scale-95 shadow-lg text-sm sm:text-base"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              Get a New Quote
            </button>
            <button
              onClick={() => onNavigate('quotes')}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 sm:px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-all active:scale-95 text-sm sm:text-base"
            >
              View Rates
            </button>
          </div>
        </div>

        {/* Decorative Watermark Shield */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
          <span className="material-symbols-outlined" style={{ fontSize: '320px' }}>
            verified_user
          </span>
        </div>
      </section>

      {/* Quick Links Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => onOpenFileClaim()}
          className="bento-card bg-[#f2f4f7] p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-[#c3c6d7]/30 hover:bg-white cursor-pointer group"
        >
          <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#004bc5]/10 flex items-center justify-center text-[#004bc5] mb-1 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl sm:text-3xl fill-1">
              assignment_late
            </span>
          </div>
          <span className="font-bold text-[#191c1f] text-sm sm:text-base">File a Claim</span>
          <span className="text-xs text-[#434654] font-medium">تقديم مطالبة</span>
        </button>

        <button
          onClick={() => onOpenRenewPolicy()}
          className="bento-card bg-[#f2f4f7] p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-[#c3c6d7]/30 hover:bg-white cursor-pointer group"
        >
          <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#006e2c]/10 flex items-center justify-center text-[#006e2c] mb-1 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl sm:text-3xl fill-1">
              autorenew
            </span>
          </div>
          <span className="font-bold text-[#191c1f] text-sm sm:text-base">Renew Policy</span>
          <span className="text-xs text-[#434654] font-medium">تجديد السياسة</span>
        </button>

        <button
          onClick={() => onNavigate('support')}
          className="bento-card bg-[#f2f4f7] p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-[#c3c6d7]/30 hover:bg-white cursor-pointer group"
        >
          <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#555551]/10 flex items-center justify-center text-[#555551] mb-1 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl sm:text-3xl fill-1">
              support_agent
            </span>
          </div>
          <span className="font-bold text-[#191c1f] text-sm sm:text-base">Get Support</span>
          <span className="text-xs text-[#434654] font-medium">الدعم الفني</span>
        </button>

        <button
          onClick={onOpenEmergency}
          className="bento-card bg-[#f2f4f7] p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-[#ffdad6] hover:bg-[#ffdad6]/40 cursor-pointer group"
        >
          <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#ba1a1a]/10 flex items-center justify-center text-[#ba1a1a] mb-1 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl sm:text-3xl fill-1">
              emergency_home
            </span>
          </div>
          <span className="font-bold text-[#ba1a1a] text-sm sm:text-base">Emergency</span>
          <span className="text-xs text-[#ba1a1a] font-medium">حالات الطوارئ</span>
        </button>
      </div>

      {/* Active Policies Section */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#191c1f]">Active Policies</h3>
          <p className="text-xs sm:text-sm text-[#434654]">Policies currently protecting you</p>
        </div>
        <button
          onClick={() => onNavigate('policies')}
          className="font-bold text-xs sm:text-sm text-[#004bc5] hover:underline"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {activePolicies.slice(0, 2).map((policy) => (
          <div
            key={policy.id}
            className="bento-card bg-white rounded-3xl p-6 shadow-sm border border-[#c3c6d7]/40 flex flex-col justify-between h-full relative overflow-hidden"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3.5 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6e8ec] flex items-center justify-center text-[#004bc5]">
                    <span className="material-symbols-outlined text-3xl">
                      {policy.iconName}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#191c1f] leading-snug">
                      {policy.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#434654]">{policy.subTitle}</p>
                  </div>
                </div>
                <span className="bg-[#86f898] text-[#00722f] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#f2f4f7] p-3.5 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-[#434654] mb-1">
                    {policy.category === 'auto' ? 'POLICY ID' : 'LIMIT'}
                  </p>
                  <p className="font-bold text-[#004bc5] text-sm sm:text-base">
                    {policy.category === 'auto' ? policy.policyNumber : policy.limitIQD || policy.coverageLimit}
                  </p>
                </div>
                <div className="bg-[#f2f4f7] p-3.5 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-[#434654] mb-1">
                    {policy.category === 'auto' ? 'EXPIRY DATE' : 'RENEW IN'}
                  </p>
                  <p className="font-bold text-[#004bc5] text-sm sm:text-base">
                    {policy.category === 'auto' ? policy.expiryDate : `${policy.daysRemaining || 45} Days`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => onViewPolicyDetails(policy)}
                className="flex-1 bg-[#004bc5] text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-[#003ea7] transition-colors shadow-md shadow-[#004bc5]/10"
              >
                Details
              </button>
              {policy.category === 'auto' ? (
                <button
                  onClick={() => onDownloadPDF(policy)}
                  title="Download Certificate"
                  className="w-12 sm:w-14 h-12 sm:h-14 bg-[#eceef1] flex items-center justify-center rounded-2xl text-[#004bc5] hover:bg-[#e1e2e6] transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined">download</span>
                </button>
              ) : (
                <button
                  onClick={() => onShowQRCode(policy)}
                  title="Show QR Code"
                  className="w-12 sm:w-14 h-12 sm:h-14 bg-[#eceef1] flex items-center justify-center rounded-2xl text-[#004bc5] hover:bg-[#e1e2e6] transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined">qr_code_2</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <section className="bg-[#eceef1] rounded-3xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#191c1f]">Recent Activity</h3>
          <span className="text-xs text-[#434654] font-medium">Real-time status</span>
        </div>

        <div className="space-y-3.5">
          {activities.map((act) => (
            <div
              key={act.id}
              className="bg-white p-4 sm:p-5 rounded-2xl flex items-center justify-between border border-[#c3c6d7]/30 shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center ${
                    act.type === 'payment'
                      ? 'bg-[#006e2c]/10 text-[#006e2c]'
                      : 'bg-[#004bc5]/10 text-[#004bc5]'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{act.iconName}</span>
                </div>
                <div>
                  <p className="font-bold text-[#191c1f] text-sm sm:text-base">{act.title}</p>
                  <p className="text-xs text-[#434654]">{act.subtitle}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-[#004bc5] text-sm sm:text-base">
                  {act.amount || act.status.replace('_', ' ').toUpperCase()}
                </p>
                <p
                  className={`text-[10px] font-bold uppercase tracking-tight ${
                    act.status === 'successful'
                      ? 'text-[#00722f]'
                      : 'text-[#434654]'
                  }`}
                >
                  {act.status === 'successful' ? 'Successful' : act.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
