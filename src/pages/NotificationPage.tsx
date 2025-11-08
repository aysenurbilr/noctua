import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import type { Notification } from '@/types/notification';
// DİKKAT: Import'un 'NotificationCard' olduğundan emin olun (tek 'o' ile)
import NotificationCard from '@/components/NotificationCard';
import { FiCheckSquare, FiFilter } from 'react-icons/fi';

// --- Arayüz (props) ---
interface NotificationsPageProps {
    notifications: Notification[];
    onToggleRead: (id: string) => void;
    onDeleteNotification: (id: string) => void;
    onMarkAllAsRead: () => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({
    notifications,
    onToggleRead,
    onDeleteNotification,
    onMarkAllAsRead
}) => {
    const [showOnlyUnread, setShowOnlyUnread] = useState(false);
    const navigate = useNavigate();

    // Filtrelenmiş listeyi hesapla
    const filteredNotifications = useMemo(() => {
        if (!showOnlyUnread) {
            return notifications;
        }
        return notifications.filter(n => !n.isRead);
    }, [notifications, showOnlyUnread]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* 1. Sayfa Başlığı ve Kontroller */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 border-b border-gray-200 pb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                        aria-label="Geri dön"
                    >
                        <IoArrowBack size={24} />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-800">Bildirimler</h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg cursor-pointer transition-all ${showOnlyUnread
                            ? 'bg-blue-900 text-white border-blue-900 hover:bg-blue-800'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800'
                            }`}
                        onClick={() => setShowOnlyUnread(!showOnlyUnread)}
                    >
                        <FiFilter size={16} />
                        {showOnlyUnread ? 'Tümünü Göster' : 'Sadece Okunmamışlar'}
                    </button>

                    <button
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-600 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                        onClick={onMarkAllAsRead}
                        disabled={unreadCount === 0}
                    >
                        <FiCheckSquare size={16} /> Tümünü Okundu İşaretle
                    </button>
                </div>
            </div>

            {/* 2. Bildirim Listesi (Prop'ları doğru aktardığınızdan emin olun) */}
            <div className="flex flex-col gap-4">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notification => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                            onToggleRead={onToggleRead} // onToggleRead prop'unu aktar
                            onDelete={onDeleteNotification} // onDelete prop'una onDeleteNotification'ı aktar
                        />
                    ))
                ) : (
                    <div className="text-center p-12 text-gray-500 bg-white border border-dashed border-gray-300 rounded-lg">
                        {showOnlyUnread
                            ? 'Okunmamış bildiriminiz yok.'
                            : 'Gösterilecek bildirim bulunamadı.'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;