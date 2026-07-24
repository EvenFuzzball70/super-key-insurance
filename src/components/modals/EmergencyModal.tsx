import React, { useState } from 'react';
import { IRAQ_GOVERNORATES } from '../../data/mockData';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const [selectedCity, setSelectedCity] = useState('Baghdad');
  const [dispatched, setDispatched] = useState(false);

  if (!isOpen) return null;

  const handleTriggerDispatch = (type: string) => {
    setDispatched(true);
    setTimeout(() => {
      alert(`Emergency ${type} dispatched to your current location in ${selectedCity}. Dispatch reference #EMG-${Math.floor(1000 + Math.random() * 9000)}.`);
      setDispatched(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border-2 border-[#ba1a1a]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#e6e8ec] flex items-center justify-center text-[#434654]"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl fill-1 animate-bounce">
              emergency
            </span>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#ba1a1a]">24/7 Iraqi Emergency</h3>
            <p className="text-xs text-[#434654] font-medium">
              Instant assistance hotline & GPS dispatch
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-[#191c1f] mb-1">
            Current Governorate / Location
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2.5 bg-[#f2f4f7] border border-[#c3c6d7] rounded-xl text-xs font-bold"
          >
            {IRAQ_GOVERNORATES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* 1-Tap Emergency Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleTriggerDispatch('Roadside Towing & Repairs')}
            disabled={dispatched}
            className="w-full p-4 rounded-2xl bg-[#f2f4f7] border border-[#c3c6d7] hover:bg-[#004bc5] hover:text-white transition-all flex items-center justify-between group active:scale-95"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[#004bc5] group-hover:text-white">
                car_repair
              </span>
              <div className="text-left">
                <p className="font-bold text-sm">Roadside Towing & Tow Truck</p>
                <p className="text-[11px] opacity-80">24/7 Breakdown, tire change, battery</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>

          <button
            onClick={() => handleTriggerDispatch('Traffic Police Accident Report')}
            disabled={dispatched}
            className="w-full p-4 rounded-2xl bg-[#f2f4f7] border border-[#c3c6d7] hover:bg-[#004bc5] hover:text-white transition-all flex items-center justify-between group active:scale-95"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[#004bc5] group-hover:text-white">
                local_police
              </span>
              <div className="text-left">
                <p className="font-bold text-sm">Traffic Police (المرور العامة)</p>
                <p className="text-[11px] opacity-80">Accident report & surveyor dispatch</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>

          <button
            onClick={() => handleTriggerDispatch('Medical Ambulance Dispatch')}
            disabled={dispatched}
            className="w-full p-4 rounded-2xl bg-[#ffdad6] border border-[#ba1a1a]/40 hover:bg-[#ba1a1a] hover:text-white text-[#ba1a1a] transition-all flex items-center justify-between group active:scale-95"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl fill-1">medical_services</span>
              <div className="text-left">
                <p className="font-bold text-sm">Medical Ambulance Hotline</p>
                <p className="text-[11px] opacity-80">Urgent hospital & trauma transport</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>

        {/* Direct phone hotlines */}
        <div className="pt-3 border-t border-[#c3c6d7]/40 flex justify-around text-center text-xs font-bold text-[#004bc5]">
          <a href="tel:122" className="hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-base">call</span> Ambulance: 122
          </a>
          <a href="tel:144" className="hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-base">call</span> Traffic: 144
          </a>
          <a href="tel:115" className="hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-base">call</span> Fire: 115
          </a>
        </div>
      </div>
    </div>
  );
};
