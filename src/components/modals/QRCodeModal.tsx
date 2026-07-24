import React from 'react';
import { Policy } from '../../types';

interface QRCodeModalProps {
  policy: Policy | null;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ policy, onClose }) => {
  if (!policy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-[#c3c6d7] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#e6e8ec] flex items-center justify-center text-[#434654]"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <span className="px-3 py-1 bg-[#86f898] text-[#00722f] text-[10px] font-bold rounded-full uppercase tracking-wider inline-block mb-3">
          {policy.status} Digital Card
        </span>

        <h3 className="text-xl font-bold text-[#191c1f] mb-1">{policy.title}</h3>
        <p className="text-xs text-[#434654] mb-6 font-mono">{policy.policyNumber}</p>

        {/* Big QR Code display */}
        <div className="bg-[#f8f9fd] p-6 rounded-2xl border-2 border-dashed border-[#004bc5]/30 flex flex-col items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[140px] text-[#004bc5]">
            qr_code_2
          </span>
          <p className="text-[10px] text-[#434654] font-semibold mt-2">
            Present this QR code at hospitals, clinics, or checkpoints across Iraq.
          </p>
        </div>

        <div className="bg-[#f2f4f7] p-3 rounded-xl text-left text-xs space-y-1 mb-6">
          <p className="text-[#434654]">
            <strong className="text-[#191c1f]">Holder:</strong> Ahmad Hassan
          </p>
          <p className="text-[#434654]">
            <strong className="text-[#191c1f]">Coverage Limit:</strong>{' '}
            {policy.limitIQD || policy.coverageLimit}
          </p>
          <p className="text-[#434654]">
            <strong className="text-[#191c1f]">Expires:</strong> {policy.expiryDate}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#004bc5] text-white font-bold text-sm rounded-xl hover:bg-[#003ea7] transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
};
