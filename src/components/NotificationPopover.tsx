import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Notification } from '@/types/notification';
// Dosya adınızın 'NotificationCard' (tek 'o') olduğunu varsayıyorum
import NotificationCard from '@/components/NotificationCard';
import { FiCheckSquare, FiExternalLink, FiX } from 'react-icons/fi'; // FiX eklendi

// 1. Arayüz (Props) güncellendi
interface PopoverProps {
    notifications: Notification[];
    unreadCount: number; // <-- ÖNCEKİ HATAYI DÜZELTEN EKSİK PROP
    onToggleRead: (id: string) => void;
    onDeleteNotification: (id: string) => void;
    onMarkAllAsRead: () => void;
    onClose: () => void;
}

const NotificationPopover: React.FC<PopoverProps> = ({
    notifications,
    unreadCount, // Prop artık alınıyor
    onToggleRead,
    onDeleteNotification,
    onMarkAllAsRead,
    onClose
}) => {
    const navigate = useNavigate();
    // unreadCount artık prop'tan geldiği için bu satıra gerek yok:
    // const unreadNotifications = notifications.filter(n => !n.isRead);
    // const unreadCount = unreadNotifications.length;

    const goToNotificationsPage = () => {
        navigate('/notifications');
        onClose();
    };

    const handleMarkAll = () => {
        onMarkAllAsRead();
        // (Opsiyonel) Tıkladıktan sonra menüyü kapatabilir:
        // onClose();
    };

    return (
        <div className="absolute top-full right-0 mt-3 w-96 max-h-[70vh] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">

            {/* 1. Başlık ve Kapatma Butonu (İstek 3) */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Bildirimler</h3>
                <button
                    onClick={onClose} // <-- Kapatma butonu eklendi
                    className="text-gray-400 p-1 rounded-full hover:bg-gray-100"
                    aria-label="Kapat"
                >
                    <FiX size={20} />
                </button>
            </div>

            {/* 2. Kontroller */}
            <div className="p-3 bg-gray-50 border-b border-gray-200">
                <button
                    onClick={handleMarkAll}
                    disabled={unreadCount === 0}
                    className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-blue-600 rounded-md cursor-pointer transition-colors hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-gray-50"
                >
                    <FiCheckSquare size={14} />
                    Tümünü Okundu İşaretle
                </button>
            </div>

            {/* 3. Bildirim Listesi */}
            <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-10">Yeni bildiriminiz yok.</p>
                ) : (
                    <div className="flex flex-col">
                        {/* Popover'da sadece 5 bildirim göster */}
                        {notifications.slice(0, 5).map(notification => (
                            <NotificationCard
                                key={notification.id}
                                notification={notification}
                                onToggleRead={onToggleRead}
                                onDelete={onDeleteNotification} // 'onDelete' prop'una 'onDeleteNotification' fonksiyonunu aktar
                                isPopoverMode={true}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* 4. Alt Kısım (Footer) */}
            <div className="p-3 bg-gray-50 border-t border-gray-200">
                <button
                    onClick={goToNotificationsPage}
                    className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-semibold text-blue-600 rounded-md cursor-pointer transition-colors hover:bg-blue-50"
                >
                    Tüm Bildirimlere Git <FiExternalLink size={14} />
                </button>
            </div>
        </div>
    );
};

export default NotificationPopover;