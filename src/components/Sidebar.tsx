import React from 'react';
import { NavTab } from '../types';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenEmergency: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenEmergency,
}) => {
  const items: { id: NavTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'quotes', label: 'Quotes', icon: 'compare_arrows' },
    { id: 'policies', label: 'Policies', icon: 'description' },
    { id: 'claims', label: 'Claims', icon: 'gavel' },
    { id: 'support', label: 'Support', icon: 'headset_mic' },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 flex-col gap-5 p-3.5 bg-white/90 backdrop-blur-xl border border-[#c3c6d7]/50 shadow-xl rounded-r-2xl z-50 ml-0">
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            title={item.label}
            className={`group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all active:scale-95 ${
              isActive
                ? 'bg-[#004bc5] text-white shadow-lg shadow-[#004bc5]/25'
                : 'text-[#434654] hover:bg-[#eceef1] hover:text-[#004bc5]'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            {/* Tooltip */}
            <span className="absolute left-full ml-3 px-2.5 py-1 bg-[#191c1f] text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md">
              {item.label}
            </span>
          </button>
        );
      })}

      <div className="w-8 h-px bg-[#c3c6d7]/40 my-1 mx-auto" />

      {/* Emergency trigger */}
      <button
        onClick={onOpenEmergency}
        title="24/7 Emergency Assistance"
        className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white transition-all active:scale-95 shadow-sm"
      >
        <span className="material-symbols-outlined fill-1">emergency</span>
        <span className="absolute left-full ml-3 px-2.5 py-1 bg-[#ba1a1a] text-white text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md">
          Emergency Hotline
        </span>
      </button>
    </aside>
  );
};
