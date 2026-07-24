import React, { useState } from 'react';
import { Policy } from '../../types';
import { HOTLINKED_IMAGES } from '../../data/mockData';

interface PolicyCertificateModalProps {
  policy: Policy | null;
  onClose: () => void;
}

export const PolicyCertificateModal: React.FC<PolicyCertificateModalProps> = ({
  policy,
  onClose,
}) => {
  const [downloading, setDownloading] = useState(false);

  if (!policy) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Official Certificate PDF for ${policy.policyNumber} generated and saved.`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c3c6d7] p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#f2f4f7] hover:bg-[#e6e8ec] flex items-center justify-center text-[#434654] transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Printable Official Iraqi Insurance Certificate Layout */}
        <div className="border-4 border-[#004bc5]/20 p-6 sm:p-8 rounded-2xl bg-[#f8f9fd] relative overflow-hidden">
          {/* Certificate Header */}
          <div className="flex justify-between items-center border-b-2 border-[#004bc5] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={HOTLINKED_IMAGES.logo}
                alt="Super Key"
                className="w-12 h-12 object-contain rounded-lg"
              />
              <div>
                <h2 className="text-xl font-extrabold text-[#004bc5]">SUPER KEY INSURANCE</h2>
                <p className="text-[11px] font-bold text-[#00722f] uppercase tracking-widest">
                  جمهورية العراق - الهيئة العامة للتأمين
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 bg-[#86f898] text-[#00722f] text-[10px] font-extrabold rounded-full uppercase tracking-wider block mb-1">
                {policy.status.toUpperCase()}
              </span>
              <p className="text-xs font-mono font-bold text-[#191c1f]">
                {policy.policyNumber}
              </p>
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-[#191c1f] uppercase tracking-wider">
              OFFICIAL CERTIFICATE OF COVERAGE
            </h3>
            <p className="text-xs text-[#434654] font-medium">
              شهادة تأمين رسمية صادرة بموجب أحكام القانون العراقي
            </p>
          </div>

          {/* Certificate Table */}
          <div className="bg-white rounded-xl border border-[#c3c6d7] p-4 sm:p-5 mb-6 space-y-3 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-2 border-b pb-2">
              <span className="text-[#434654] font-semibold">Policyholder Name / اسم المؤمن له:</span>
              <span className="font-bold text-[#191c1f] text-right">Ahmad Hassan (أحمد حسن)</span>
            </div>

            <div className="grid grid-cols-2 gap-2 border-b pb-2">
              <span className="text-[#434654] font-semibold">Policy Type / نوع التغطية:</span>
              <span className="font-bold text-[#004bc5] text-right">{policy.title}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 border-b pb-2">
              <span className="text-[#434654] font-semibold">Asset / Asset Spec:</span>
              <span className="font-bold text-[#191c1f] text-right">{policy.subTitle}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 border-b pb-2">
              <span className="text-[#434654] font-semibold">Coverage Limit / حد التغطية:</span>
              <span className="font-bold text-[#006e2c] text-right">
                {policy.limitIQD || policy.coverageLimit}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <span className="text-[#434654] font-semibold">Effective Period / تاريخ الصلاحية:</span>
              <span className="font-bold text-[#191c1f] text-right">Valid until {policy.expiryDate}</span>
            </div>
          </div>

          {/* Verification QR Code & Official Stamp */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-3">
              {/* Simulated QR code */}
              <div className="w-16 h-16 bg-white p-1 border border-[#c3c6d7] rounded-lg shadow-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-[#191c1f]">qr_code_2</span>
              </div>
              <div className="text-[10px] text-[#434654]">
                <p className="font-bold text-[#004bc5]">Scan for Digital Inspection</p>
                <p>Official Traffic / Medical Verification ID</p>
              </div>
            </div>

            {/* Official Stamp badge */}
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#004bc5] text-[#004bc5] flex flex-col items-center justify-center text-[9px] font-extrabold rotate-[-12deg] bg-white/80 p-1 text-center shadow-sm">
              <span>SUPER KEY</span>
              <span>APPROVED</span>
              <span>BAGHDAD</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-[#c3c6d7] text-[#434654] font-semibold text-xs sm:text-sm hover:bg-[#eceef1] transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-8 py-3 rounded-xl bg-[#004bc5] text-white font-bold text-xs sm:text-sm hover:bg-[#003ea7] transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
          >
            {downloading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
                Generating PDF...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">download</span>
                Download Official PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
