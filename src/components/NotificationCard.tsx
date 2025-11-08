import React, { useState } from 'react';
import type { Notification } from '@/types/notification';
import { FaAward, FaBriefcase, FaCertificate, FaBell } from 'react-icons/fa';
import { FiCheck, FiTrash2, FiX, FiMoreVertical } from 'react-icons/fi';

// Kategoriye göre ikon seçen yardımcı fonksiyon
const getIconForCategory = (category: Notification['category']) => {
    switch (category) {
        case 'leaderboard':
            return <FaAward />;
        case 'vaka':
            return <FaBriefcase />;
        case 'basarim':
            return <FaCertificate />;
        case 'sistem':
        default:
            return <FaBell />;
    }
};

interface NotificationCardProps {
    notification: Notification;
    onToggleRead: (id: string) => void;
    onDelete: (id: string) => void;
    isPopoverMode?: boolean; // <-- YENİ PROP (Popover için daha küçük stil)
}

const NotificationCard: React.FC<NotificationCardProps> = ({
    notification,
    onToggleRead,
    onDelete,
    isPopoverMode = false // Varsayılan değer
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Ana karta tıklandığında (sadece okunmamışsa)
    const handleCardClick = () => {
        if (!notification.isRead) {
            onToggleRead(notification.id);
        }
    };

    // Menüyü aç/kapat
    const handleToggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(prev => !prev);
    };

    // Okundu/Okunmadı butonuna basıldığında
    const handleToggleReadClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleRead(notification.id);
        setIsMenuOpen(false);
    };

    // Sil butonuna basıldığında
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(notification.id);
        setIsMenuOpen(false);
    };

    // Menü açıkken dışarıya tıklanırsa kapat
    const handleBlurContainer = () => {
        setTimeout(() => {
            setIsMenuOpen(false);
        }, 150);
    };

    // Kategoriye göre ikon renkleri (Tailwind)
    const categoryStyles: { [key in Notification['category']]: string } = {
        leaderboard: 'bg-yellow-100 text-yellow-600',
        vaka: 'bg-blue-100 text-blue-600',
        basarim: 'bg-green-100 text-green-600',
        sistem: 'bg-purple-100 text-purple-600',
    };

    // Popover modu için stilleri küçült
    const cardPadding = isPopoverMode ? "p-3" : "p-5";
    const titleSize = isPopoverMode ? "text-sm" : "text-base";
    const descSize = isPopoverMode ? "text-xs" : "text-sm";
    const iconSize = isPopoverMode ? "w-9 h-9" : "w-11 h-11";
    const unreadBorder = !notification.isRead && !isPopoverMode ? "border-l-4 border-blue-600" : "border-l-4 border-transparent";
    const unreadBg = !notification.isRead ? "bg-blue-50/50" : "bg-white";

    return (
        <div
            className={`flex items-start gap-4 transition-all duration-200 ease-in-out cursor-pointer hover:shadow-md hover:-translate-y-0.5 ${cardPadding} ${unreadBorder} ${unreadBg} ${isPopoverMode ? 'border-b border-gray-100 last:border-b-0' : 'border border-gray-200 rounded-lg'}`}
            onClick={handleCardClick}
        >
            {/* 1. İkon Bölümü */}
            <div className={`relative ${iconSize} flex-shrink:0 flex items-center justify-center rounded-full ${categoryStyles[notification.category]}`}>
                {getIconForCategory(notification.category)}
                {!notification.isRead && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full" title="Okunmadı" />
                )}
            </div>

            {/* 2. İçerik Bölümü */}
            <div className="flex-1 overflow-hidden">
                <h4 className={`font-semibold text-gray-800 mb-0.5 ${titleSize}`}>{notification.title}</h4>
                <p className={`text-gray-600 leading-snug ${descSize}`}>{notification.description}</p>
                <span className="text-xs text-gray-400 mt-1 block">{notification.timeAgo}</span>
            </div>

            {/* 3. Seçenekler (3 nokta) Bölümü */}
            {!isPopoverMode && ( // Popover modunda 3 nokta menüsünü gösterme (sadelik için)
                <div
                    className="relative self-start"
                    onBlur={handleBlurContainer}
                >
                    <button
                        className="text-gray-500 p-2 rounded-full transition-colors hover:bg-gray-100"
                        onClick={handleToggleMenu}
                        aria-label="Seçenekler"
                    >
                        <FiMoreVertical size={18} />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-2">
                            <button
                                className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={handleToggleReadClick}
                            >
                                {notification.isRead ? (
                                    <><FiX size={14} /> Okunmadı Olarak İşaretle</>
                                ) : (
                                    <><FiCheck size={14} /> Okundu Olarak İşaretle</>
                                )}
                            </button>
                            <button
                                className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                onClick={handleDeleteClick}
                            >
                                <FiTrash2 size={14} /> Bildirimi Sil
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationCard;