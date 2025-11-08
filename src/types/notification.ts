// Bildirimin kategorisini tanımlar (ikonu belirlemek için)
export type NotificationCategory = 'leaderboard' | 'vaka' | 'basarim' | 'sistem';

// Tek bir bildirimin veri yapısı
export interface Notification {
    id: string;
    category: NotificationCategory;
    title: string;
    description: string;
    timeAgo: string;
    isRead: boolean; // Okundu / Okunmadı durumu
}