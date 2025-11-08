import type { Notification } from '@/types/notification';

// --- Mock Data (Sahte Veriler) ---
export const mockNotifications: Notification[] = [
    {
        id: 'n1',
        category: 'leaderboard',
        title: 'Yeni Liderlik Pozisyonu!',
        description: 'Tebrikler! Liderlik tablosunda 5. sıraya yükseldiniz.',
        timeAgo: '5 dakika önce',
        isRead: false,
    },
    {
        id: 'n2',
        category: 'vaka',
        title: 'Vaka Tamamlandı',
        description: 'Kira Sözleşmesi Anlaşmazlığı vakasını başarıyla tamamladınız. +200 puan kazandınız!',
        timeAgo: '2 saat önce',
        isRead: false,
    },
    {
        id: 'n3',
        category: 'vaka',
        title: 'Yeni Vaka Mevcut',
        description: 'Size uygun yeni bir vaka eklendi: Miras Paylaşımı Davası',
        timeAgo: '5 saat önce',
        isRead: true,
    },
    {
        id: 'n4',
        category: 'sistem',
        title: 'Haftalık Özet',
        description: 'Bu hafta 3 vaka tamamladınız ve 450 puan kazandınız. Harika gidiyorsunuz!',
        timeAgo: '1 gün önce',
        isRead: true,
    },
];