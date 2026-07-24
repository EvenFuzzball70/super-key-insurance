import React from 'react';
import { HOTLINKED_IMAGES } from '../../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-[#c3c6d7]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#e6e8ec] flex items-center justify-center text-[#434654]"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#004bc5] mb-3 shadow-md">
            <img
              src={HOTLINKED_IMAGES.avatar}
              alt="Ahmad Hassan"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-[#191c1f]">Ahmad Hassan (أحمد حسن)</h3>
          <p className="text-xs text-[#00722f] font-semibold flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-sm">verified</span>
            Verified Civil ID (Iraq)
          </p>
        </div>

        <div className="bg-[#f2f4f7] p-4 rounded-2xl space-y-2 text-xs sm:text-sm mb-6">
          <div className="flex justify-between border-b border-[#c3c6d7]/40 pb-2">
            <span className="text-[#434654]">National ID / البطاقة الموحدة:</span>
            <span className="font-mono font-bold text-[#191c1f]">IQ-1988-99210</span>
          </div>

          <div className="flex justify-between border-b border-[#c3c6d7]/40 pb-2">
            <span className="text-[#434654]">Mobile Number:</span>
            <span className="font-mono font-bold text-[#191c1f]">+964 770 123 4567</span>
          </div>

          <div className="flex justify-between border-b border-[#c3c6d7]/40 pb-2">
            <span className="text-[#434654]">Default Governorate:</span>
            <span className="font-bold text-[#191c1f]">Baghdad (الكرادة)</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#434654]">Linked Payment:</span>
            <span className="font-bold text-[#00722f]">Zain Cash & Qi Card</span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              alert('Language set to Arabic / English Dual Display');
            }}
            className="w-full py-3 bg-[#eceef1] text-[#191c1f] font-bold text-xs sm:text-sm rounded-xl hover:bg-[#e1e2e6] transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">translate</span>
            Language Preferences (العربية / English)
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#004bc5] text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-[#003ea7] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
