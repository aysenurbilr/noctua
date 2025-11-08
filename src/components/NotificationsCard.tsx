import React, { useState } from 'react';
import type { Notification, NotificationCategory } from '@/types/notification'; // Kısayol (alias) ile import
import { FaAward, FaBriefcase, FaCertificate, FaBell } from 'react-icons/fa';
import { FiCheck, FiTrash2, FiX } from 'react-icons/fi';

// Kategoriye göre ikon seçen yardımcı fonksiyon
const getIconForCategory = (category: NotificationCategory) => {
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

// Kategoriye göre Tailwind renk sınıflarını döndüren fonksiyon
const categoryStyles: Record<NotificationCategory, string> = {
    leaderboard: 'bg-yellow-100 text-yellow-600',
    vaka: 'bg-cyan-100 text-cyan-600',
    basarim: 'bg-green-100 text-green-600',
    sistem: 'bg-purple-100 text-purple-600',
};

interface NotificationCardProps {
    notification: Notification;
    onToggleRead: (id: string) => void;
    onDelete: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
    notification,
    onToggleRead,
    onDelete
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Okunmuş/okunmamış durumuna göre ana kartın stilleri
    const cardClasses = notification.isRead
        ? 'bg-white'
        : 'bg-blue-50 border-l-4 border-blue-600';

    // Ana karta tıklandığında (sadece okunmamışsa)
    const handleCardClick = () => {
        if (!notification.isRead) {
            onToggleRead(notification.id);
        }
    };

    // Menüyü aç/kapat
    const handleToggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation(); // Karta tıklanmasını engelle
        setIsMenuOpen(prev => !prev);
    };

    // Okundu/Okunmadı butonuna basıldığında
    const handleToggleReadClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleRead(notification.id);
        setIsMenuOpen(false); // Menüyü kapat
    };

    // Sil butonuna basıldığında
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(notification.id);
        setIsMenuOpen(false); // Menüyü kapat
    };

    // Menü açıkken dışarıya tıklanırsa kapat (blur olayı)
    const handleBlurContainer = () => {
        setTimeout(() => {
            setIsMenuOpen(false);
        }, 150); // Buton tıklamasını algılamak için kısa bir gecikme
    };

    return (
        <div
            className={`flex items-start gap-4 p-5 border border-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-blue-600 ${cardClasses}`}
            onClick={handleCardClick}
        >
            {/* 1. İkon Bölümü */}
            <div
                className={`relative w-11 h-11 flex-shrink:0 flex items-center justify-center rounded-full text-lg ${categoryStyles[notification.category]
                    }`}
            >
                {getIconForCategory(notification.category)}
                {!notification.isRead && (
                    <div
                        className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"
                        title="Okunmadı"
                    />
                )}
            </div>

            {/* 2. İçerik Bölümü */}
            <div className="flex-1 mr-4">
                <h4 className="text-base font-semibold text-gray-900 mb-0.5">
                    {notification.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1 leading-normal">
                    {notification.description}
                </p>
                <span className="text-xs text-gray-500">{notification.timeAgo}</span>
            </div>

            {/* 3. Seçenekler (3 nokta) Bölümü */}
            <div
                className="relative self-start"
                onBlur={handleBlurContainer} // Dışarıya tıklanınca menüyü kapat
            >
                <button
                    className="bg-transparent border-none text-gray-500 cursor-pointer p-1 rounded-md text-xl leading-none tracking-tighter hover:bg-gray-100"
                    onClick={handleToggleMenu}
                    aria-label="Seçenekler"
                >
                    •••
                </button>

                {/* Açılır Menü */}
                {isMenuOpen && (
                    <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-52 z-10 p-1.5 flex flex-col">
                        <button
                            className="flex items-center gap-3 bg-transparent border-none text-left p-2.5 text-sm font-medium text-gray-800 cursor-pointer rounded-md transition-colors hover:bg-gray-100"
                            onClick={handleToggleReadClick}
                        >
                            {notification.isRead ? (
                                <><FiX size={14} /> Okunmadı Olarak İşaretle</>
                            ) : (
                                <><FiCheck size={14} /> Okundu Olarak İşaretle</>
                            )}
                        </button>

                        <button
                            className="flex items-center gap-3 bg-transparent border-none text-left p-2.5 text-sm font-medium cursor-pointer rounded-md transition-colors text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={handleDeleteClick}
                        >
                            <FiTrash2 size={14} /> Bildirimi Sil
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationCard;