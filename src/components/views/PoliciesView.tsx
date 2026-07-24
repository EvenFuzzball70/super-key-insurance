import React, { useState } from 'react';
import { Policy } from '../../types';

interface PoliciesViewProps {
  policies: Policy[];
  onViewPolicyDetails: (policy: Policy) => void;
  onDownloadPDF: (policy: Policy) => void;
  onRenewPolicy: (policy: Policy) => void;
  onPurchaseNew: () => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({
  policies,
  onViewPolicyDetails,
  onDownloadPDF,
  onRenewPolicy,
  onPurchaseNew,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'renewal_due' | 'expired'>('all');

  const activeCount = policies.filter((p) => p.status === 'active').length;
  const renewalDueCount = policies.filter((p) => p.status === 'renewal_due' || (p.daysRemaining && p.daysRemaining <= 45)).length;
  const expiredCount = policies.filter((p) => p.status === 'expired').length;

  const filteredPolicies = policies.filter((p) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return p.status === 'active';
    if (filterStatus === 'renewal_due') return p.status === 'renewal_due' || (p.daysRemaining && p.daysRemaining <= 45);
    if (filterStatus === 'expired') return p.status === 'expired';
    return true;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-8 pb-32">
      {/* Dashboard Header */}
      <section className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#191c1f] mb-1">
          Policies & Documents
        </h1>
        <p className="text-sm sm:text-base text-[#434654]">
          Manage your active coverage and download official insurance certificates in English and Arabic.
        </p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div
          onClick={() => setFilterStatus(filterStatus === 'active' ? 'all' : 'active')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
            filterStatus === 'active'
              ? 'bg-[#86f898]/20 border-[#006e2c] ring-2 ring-[#006e2c]'
              : 'bg-white border-[#c3c6d7]/50 hover:shadow-md'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#86f898]/40 flex items-center justify-center text-[#00722f]">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434654] uppercase tracking-wider">
              Active Policies
            </p>
            <p className="text-2xl font-bold text-[#191c1f]">0{activeCount}</p>
          </div>
        </div>

        <div
          onClick={() => setFilterStatus(filterStatus === 'renewal_due' ? 'all' : 'renewal_due')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
            filterStatus === 'renewal_due'
              ? 'bg-[#b4c5ff]/20 border-[#004bc5] ring-2 ring-[#004bc5]'
              : 'bg-white border-[#c3c6d7]/50 hover:shadow-md'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#f2f4f7] flex items-center justify-center text-[#004bc5]">
            <span className="material-symbols-outlined text-2xl">pending_actions</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434654] uppercase tracking-wider">
              Renewal Due
            </p>
            <p className="text-2xl font-bold text-[#191c1f]">0{renewalDueCount}</p>
          </div>
        </div>

        <div
          onClick={() => setFilterStatus(filterStatus === 'expired' ? 'all' : 'expired')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
            filterStatus === 'expired'
              ? 'bg-[#ffdad6]/40 border-[#ba1a1a] ring-2 ring-[#ba1a1a]'
              : 'bg-white border-[#c3c6d7]/50 hover:shadow-md'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#93000a]">
            <span className="material-symbols-outlined text-2xl">event_busy</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434654] uppercase tracking-wider">
              Expired
            </p>
            <p className="text-2xl font-bold text-[#191c1f]">0{expiredCount}</p>
          </div>
        </div>
      </div>

      {/* Filter reset indicator */}
      {filterStatus !== 'all' && (
        <div className="mb-4 flex items-center justify-between bg-[#004bc5]/10 px-4 py-2 rounded-xl text-xs font-bold text-[#004bc5]">
          <span>Filtering by: {filterStatus.replace('_', ' ').toUpperCase()}</span>
          <button
            onClick={() => setFilterStatus('all')}
            className="hover:underline flex items-center gap-1"
          >
            Show All <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Policy Cards List */}
      <div className="grid grid-cols-1 gap-5">
        {filteredPolicies.map((policy) => {
          const isExpired = policy.status === 'expired';

          return (
            <div
              key={policy.id}
              className={`bg-white rounded-2xl border border-[#c3c6d7]/50 p-6 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-all ${
                isExpired ? 'opacity-90 bg-white/80' : ''
              }`}
            >
              <div className="flex items-start gap-4 mb-6 md:mb-0">
                <div
                  className={`p-3.5 rounded-xl ${
                    isExpired
                      ? 'bg-[#e6e8ec] text-[#434654]'
                      : 'bg-[#b4c5ff] text-[#00174a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl fill-1">
                    {policy.iconName}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#191c1f] leading-snug">
                    {policy.title}
                  </h3>
                  <p className="text-xs text-[#434654] mb-2 font-mono">
                    Policy No: {policy.policyNumber}
                  </p>

                  {isExpired ? (
                    <span className="px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold flex items-center w-fit gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#93000a]" />
                      Expired ({policy.expiryDate})
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-[#86f898] text-[#00722f] text-xs font-bold flex items-center w-fit gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00722f]" />
                      Active (Expires {policy.expiryDate})
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {!isExpired ? (
                  <>
                    <button
                      onClick={() => onViewPolicyDetails(policy)}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#eceef1] text-[#191c1f] font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#e1e2e6] transition-colors active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      View Details
                    </button>

                    <button
                      onClick={() => onDownloadPDF(policy)}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#004bc5] text-white font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#003ea7] transition-colors active:scale-95 shadow-sm shadow-[#004bc5]/20"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      Download PDF
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onRenewPolicy(policy)}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2a64e6] text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-[#004bc5] transition-colors active:scale-95 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">refresh</span>
                      Renew Now
                    </button>

                    <button
                      onClick={() => onViewPolicyDetails(policy)}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[#c3c6d7] text-[#434654] font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#eceef1] transition-colors active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">history</span>
                      View History
                    </button>
                  </>
                )}
              </div>
            </div>
          )})}

        {/* Purchase New Coverage Dashed Box */}
        <div
          onClick={onPurchaseNew}
          className="border-2 border-dashed border-[#c3c6d7] rounded-2xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#004bc5] hover:bg-[#004bc5]/5 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-[#e6e8ec] flex items-center justify-center text-[#004bc5] mb-3 group-hover:bg-[#004bc5] group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">add</span>
          </div>
          <p className="text-lg font-bold text-[#004bc5] mb-1">Purchase New Coverage</p>
          <p className="text-xs sm:text-sm text-[#434654]">
            Explore tailored insurance plans for your vehicles, family, or business in Iraq.
          </p>
        </div>
      </div>
    </div>
  );
};
