import React from 'react';
import { HOTLINKED_IMAGES } from '../data/mockData';
import { UserNotification } from '../types';

interface HeaderProps {
  notifications: UserNotification[];
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  notifications,
  onOpenNotifications,
  onOpenProfile,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="w-full top-0 sticky z-40 bg-[#f8f9fd]/90 backdrop-blur-md border-b border-[#e1e2e6]/50 shadow-sm flex justify-between items-center px-4 md:px-12 py-3">
      <div className="flex items-center gap-3">
        <img
          src={HOTLINKED_IMAGES.logo}
          alt="Super Key Logo"
          className="w-10 h-10 object-contain rounded-lg border border-[#e1e2e6]"
        />
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-bold text-[#004bc5] tracking-tight leading-none">
            Super Key
          </h1>
          <span className="text-[10px] font-semibold tracking-wider text-[#434654] uppercase hidden sm:block">
            Iraq Insurance Digital Portal
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Notification bell button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full text-[#434654] hover:bg-[#eceef1] transition-colors focus:outline-none"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-[#004bc5]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ring-2 ring-white animate-pulse" />
          )}
        </button>

        {/* User avatar button */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-[#004bc5]/30 transition-all focus:outline-none"
          title="Ahmad Hassan Profile"
        >
          <div className="w-10 h-10 rounded-full bg-[#b4c5ff] flex items-center justify-center overflow-hidden border-2 border-[#e6e8ec]">
            <img
              src={HOTLINKED_IMAGES.avatar}
              alt="Ahmad Hassan Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </div>
    </header>
  );
};
