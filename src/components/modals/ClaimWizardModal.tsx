import React, { useState } from 'react';
import { Policy, Claim } from '../../types';
import { IRAQ_GOVERNORATES } from '../../data/mockData';

interface ClaimWizardModalProps {
  isOpen: boolean;
  policies: Policy[];
  preselectedPolicyId?: string;
  onClose: () => void;
  onSubmitClaim: (newClaim: Claim) => void;
}

export const ClaimWizardModal: React.FC<ClaimWizardModalProps> = ({
  isOpen,
  policies,
  preselectedPolicyId,
  onClose,
  onSubmitClaim,
}) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>(
    preselectedPolicyId || policies[0]?.id || ''
  );
  const [governorate, setGovernorate] = useState('Baghdad');
  const [incidentDate, setIncidentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [estimatedIQD, setEstimatedIQD] = useState('250,000');
  const [description, setDescription] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please provide a brief description of the incident.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const selectedPolicy = policies.find((p) => p.id === selectedPolicyId) || policies[0];
      const randomId = Math.floor(1000 + Math.random() * 9000);

      const createdClaim: Claim = {
        id: `clm-${Date.now()}`,
        claimNumber: `CLM-2024-${randomId}`,
        policyId: selectedPolicy.id,
        policyTitle: `${selectedPolicy.title} (${selectedPolicy.subTitle})`,
        category: selectedPolicy.category,
        incidentDate: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        location: `${governorate}, Iraq`,
        status: 'under_review',
        estimatedAmountIQD: `${estimatedIQD} IQD`,
        description: description,
        timeline: [
          { step: 'Claim Submitted', date: 'Just now', completed: true },
          { step: 'Initial Assessment', date: 'In Progress', completed: false, active: true },
          { step: 'Surveyor Inspection', date: 'Estimated 24 hrs', completed: false },
          { step: 'Payout Disbursement', date: 'Zain Cash / Bank', completed: false },
        ],
      };

      setIsSubmitting(false);
      onSubmitClaim(createdClaim);
      alert(`Claim ${createdClaim.claimNumber} successfully filed!`);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c3c6d7] p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#f2f4f7] hover:bg-[#e6e8ec] flex items-center justify-center text-[#434654]"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#004bc5]/10 text-[#004bc5] flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl fill-1">assignment_late</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#191c1f]">File a Claim</h3>
            <p className="text-xs text-[#434654]">
              Quick 24-hour reimbursement for insured events in Iraq.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Policy Selector */}
          <div>
            <label className="block font-bold text-[#191c1f] mb-1.5">Select Active Policy</label>
            <select
              value={selectedPolicyId}
              onChange={(e) => setSelectedPolicyId(e.target.value)}
              className="w-full p-3 bg-[#f2f4f7] border border-[#c3c6d7] rounded-xl outline-none focus:ring-2 focus:ring-[#004bc5] font-semibold text-[#191c1f]"
            >
              {policies.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.policyNumber})
                </option>
              ))}
            </select>
          </div>

          {/* Location / Governorate */}
          <div>
            <label className="block font-bold text-[#191c1f] mb-1.5">
              Incident Governorate / City
            </label>
            <select
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
              className="w-full p-3 bg-[#f2f4f7] border border-[#c3c6d7] rounded-xl outline-none focus:ring-2 focus:ring-[#004bc5] font-semibold text-[#191c1f]"
            >
              {IRAQ_GOVERNORATES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Estimated Amount */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#191c1f] mb-1.5">Incident Date</label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full p-3 bg-[#f2f4f7] border border-[#c3c6d7] rounded-xl outline-none focus:ring-2 focus:ring-[#004bc5]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#191c1f] mb-1.5">Est. Damage (IQD)</label>
              <input
                type="text"
                value={estimatedIQD}
                onChange={(e) => setEstimatedIQD(e.target.value)}
                placeholder="e.g. 350,000"
                className="w-full p-3 bg-[#f2f4f7] border border-[#c3c6d7] rounded-xl outline-none focus:ring-2 focus:ring-[#004bc5] font-semibold"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-[#191c1f] mb-1.5">
              Incident Description & Details
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a clear description of what happened..."
              className="w-full p-3 bg-[#f2f4f7] border border-[#c3c6d7] rounded-xl outline-none focus:ring-2 focus:ring-[#004bc5]"
            />
          </div>

          {/* Photo/File Attachment simulation */}
          <div>
            <label className="block font-bold text-[#191c1f] mb-1.5">
              Attach Photos / Police / Doctor Report
            </label>
            <div className="border-2 border-dashed border-[#c3c6d7] p-4 rounded-xl text-center bg-[#f8f9fd] hover:bg-white transition-colors cursor-pointer relative">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setUploadedFileName(e.target.files[0].name);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <span className="material-symbols-outlined text-3xl text-[#004bc5] mb-1">
                upload_file
              </span>
              <p className="text-xs text-[#434654] font-medium">
                {uploadedFileName ? (
                  <span className="text-[#00722f] font-bold">Attached: {uploadedFileName}</span>
                ) : (
                  'Click to upload photo of damage or report (JPG, PNG, PDF)'
                )}
              </p>
            </div>
          </div>

          {/* Payout method choice */}
          <div className="bg-[#86f898]/20 p-3.5 rounded-xl border border-[#006e2c]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00722f]">payments</span>
              <div>
                <p className="font-bold text-xs text-[#00722f]">Fast Payout Destination</p>
                <p className="text-[11px] text-[#434654]">Zain Cash Wallet (0770xxxx123)</p>
              </div>
            </div>
            <span className="text-[10px] bg-[#00722f] text-white font-bold px-2 py-0.5 rounded-full uppercase">
              Instant
            </span>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-[#c3c6d7] text-[#434654] font-semibold rounded-xl hover:bg-[#eceef1]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-[#004bc5] text-white font-bold rounded-xl hover:bg-[#003ea7] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
                  Filing Claim...
                </>
              ) : (
                'Submit Claim'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
