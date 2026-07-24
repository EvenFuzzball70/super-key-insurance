import React from 'react';
import { UserNotification } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  notifications: UserNotification[];
  onClose: () => void;
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  notifications,
  onClose,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between border-l border-[#c3c6d7]">
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-[#e6e8ec] mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004bc5]">notifications</span>
              <h3 className="text-lg font-bold text-[#191c1f]">Notifications</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onMarkAllRead}
                className="text-xs text-[#004bc5] hover:underline font-semibold"
              >
                Mark all as read
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#f2f4f7] flex items-center justify-center text-[#434654]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-140px)] pr-1 no-scrollbar">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-2xl border transition-all ${
                  notif.read
                    ? 'bg-[#f8f9fd] border-[#c3c6d7]/30 text-[#434654]'
                    : 'bg-[#b4c5ff]/15 border-[#004bc5]/40 text-[#191c1f]'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm text-[#191c1f]">{notif.title}</h4>
                  <span className="text-[10px] text-[#434654] font-medium">{notif.time}</span>
                </div>
                <p className="text-xs leading-relaxed">{notif.message}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#004bc5] text-white font-bold text-sm rounded-xl hover:bg-[#003ea7] transition-all mt-4"
        >
          Close Notifications
        </button>
      </div>
    </div>
  );
};
