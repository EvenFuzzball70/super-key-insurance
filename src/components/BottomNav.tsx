import React from 'react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: NavTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'quotes', label: 'Quotes', icon: 'compare_arrows' },
    { id: 'policies', label: 'Policies', icon: 'description' },
    { id: 'claims', label: 'Claims', icon: 'gavel' },
    { id: 'support', label: 'Support', icon: 'headset_mic' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#ffffff] border-t border-[#c3c6d7]/30 flex justify-around items-center px-2 pb-5 pt-2 shadow-[0_-4px_16px_-2px_rgba(0,0,0,0.06)]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 px-3 py-1 rounded-xl ${
              isActive
                ? 'text-[#004bc5]'
                : 'text-[#434654] hover:text-[#004bc5]'
            }`}
          >
            <div
              className={`px-4 py-1 rounded-full flex items-center justify-center mb-0.5 transition-colors ${
                isActive ? 'bg-[#86f898]/30 text-[#00722f]' : ''
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  isActive ? 'fill-1' : ''
                }`}
              >
                {tab.icon}
              </span>
            </div>
            <span
              className={`text-[10px] uppercase tracking-wider ${
                isActive ? 'font-bold text-[#004bc5]' : 'font-medium'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
