// Yorumun veri yapısı
export interface Comment {
    id: string;
    author: string;
    timeAgo: string;
    content: string;
    authorAvatarUrl?: string; // Profil resmi (opsiyonel)
}

// Yeni bir gönderi oluştururken gereken veri (ID, yazar vb. hariç)
export interface PostData {
    title: string;
    content: string;
    category: string;
}

// Tam bir Forum Gönderisinin veri yapısı
export interface ForumPost extends PostData {
    id: string;
    author: string;
    timeAgo: string;
    likes: number;
    comments: number;
    isLiked: boolean;
    isArchived: boolean; // <-- HATA VEREN EKSİK ÖZELLİK BURAYA EKLENDİ
    authorAvatarUrl?: string; // Profil resmi (opsiyonel)
    commentsList: Comment[]; // Yorumların listesi
}