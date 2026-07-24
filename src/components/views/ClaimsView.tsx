import React, { useState } from 'react';
import { Claim, Policy } from '../../types';

interface ClaimsViewProps {
  claims: Claim[];
  policies: Policy[];
  onOpenFileClaimWizard: () => void;
  onViewClaimDetails: (claim: Claim) => void;
}

export const ClaimsView: React.FC<ClaimsViewProps> = ({
  claims,
  policies,
  onOpenFileClaimWizard,
  onViewClaimDetails,
}) => {
  const [filter, setFilter] = useState<'all' | 'under_review' | 'paid'>('all');

  const filteredClaims = claims.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-8 pb-32">
      {/* Header & File Claim Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#191c1f] mb-1">
            Claims & Reimbursements
          </h1>
          <p className="text-sm text-[#434654]">
            Submit new claims with photo proof and track 24-hour payouts directly to Zain Cash or FIB.
          </p>
        </div>

        <button
          onClick={onOpenFileClaimWizard}
          className="bg-[#004bc5] text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#003ea7] transition-all active:scale-95 shadow-md shadow-[#004bc5]/20 text-sm self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          File a New Claim
        </button>
      </div>

      {/* Stats Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#004bc5]/10 flex items-center justify-center text-[#004bc5]">
            <span className="material-symbols-outlined text-2xl">pending_actions</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434654] uppercase tracking-wider">
              Under Review
            </p>
            <p className="text-xl font-bold text-[#004bc5]">
              {claims.filter((c) => c.status === 'under_review').length} Claims
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#006e2c]/10 flex items-center justify-center text-[#006e2c]">
            <span className="material-symbols-outlined text-2xl">payments</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434654] uppercase tracking-wider">
              Total Reimbursed
            </p>
            <p className="text-xl font-bold text-[#006e2c]">320,000 IQD</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#86f898]/40 flex items-center justify-center text-[#00722f]">
            <span className="material-symbols-outlined text-2xl">speed</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434654] uppercase tracking-wider">
              Avg Processing Speed
            </p>
            <p className="text-xl font-bold text-[#191c1f]">18.5 Hours</p>
          </div>
        </div>
      </div>

      {/* Claims List */}
      <div className="bg-white rounded-3xl border border-[#c3c6d7]/50 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#191c1f]">Submitted Claims History</h3>
          <div className="flex gap-2 text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-[#004bc5] text-white'
                  : 'bg-[#eceef1] text-[#434654] hover:bg-[#e6e8ec]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('under_review')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'under_review'
                  ? 'bg-[#004bc5] text-white'
                  : 'bg-[#eceef1] text-[#434654] hover:bg-[#e6e8ec]'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'paid'
                  ? 'bg-[#004bc5] text-white'
                  : 'bg-[#eceef1] text-[#434654] hover:bg-[#e6e8ec]'
              }`}
            >
              Paid
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredClaims.map((claim) => (
            <div
              key={claim.id}
              onClick={() => onViewClaimDetails(claim)}
              className="p-5 rounded-2xl border border-[#c3c6d7]/40 hover:bg-[#f2f4f7] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    claim.status === 'paid'
                      ? 'bg-[#86f898]/40 text-[#00722f]'
                      : 'bg-[#004bc5]/10 text-[#004bc5]'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {claim.category === 'auto'
                      ? 'directions_car'
                      : claim.category === 'health'
                      ? 'health_and_safety'
                      : 'assignment_late'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#004bc5]">
                      {claim.claimNumber}
                    </span>
                    <span className="text-xs text-[#434654]">• {claim.incidentDate}</span>
                  </div>

                  <h4 className="text-base font-bold text-[#191c1f] group-hover:text-[#004bc5] transition-colors">
                    {claim.policyTitle}
                  </h4>

                  <p className="text-xs text-[#434654] line-clamp-1 mt-0.5">
                    Location: {claim.location} — {claim.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-3 sm:pt-0">
                <div className="text-left sm:text-right">
                  <p className="font-bold text-sm text-[#004bc5]">{claim.estimatedAmountIQD}</p>
                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full inline-block mt-0.5 ${
                      claim.status === 'paid'
                        ? 'bg-[#86f898] text-[#00722f]'
                        : 'bg-[#b4c5ff]/40 text-[#00174a]'
                    }`}
                  >
                    {claim.status === 'paid' ? 'Paid to Zain Cash' : 'Under Review'}
                  </span>
                </div>

                <span className="material-symbols-outlined text-[#737686] group-hover:text-[#004bc5] group-hover:translate-x-1 transition-all">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
