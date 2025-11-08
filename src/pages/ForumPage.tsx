import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Geri butonu için eklendi
import { IoArrowBack } from 'react-icons/io5';
import { FiPlus, FiMessageSquare } from 'react-icons/fi';
import type { ForumPost, PostData, Comment } from '@/types/forum'; // Kısayol (alias) ile import

// --- DÜZELTİLMİŞ IMPORT YOLLARI ---
import ForumPostCard from '@/components/ForumPostCard';
import NewPostModal from '@/components/NewPostModal';
import PostDetailModal from '@/components/PosDetailModal';
// ---------------------------------

// Filtre kategorileri
const categories: string[] = ['Tümü', 'Ceza Hukuku', 'Medeni Hukuk', 'İdare Hukuku', 'İş Hukuku', 'Ticaret Hukuku', 'Genel'];
type Category = typeof categories[number];

// --- Mock Data (Sahte Veriler) ---
const mockPosts: ForumPost[] = [
    {
        id: 'p1',
        author: 'Av. Mehmet Yılmaz',
        timeAgo: '2 saat önce',
        category: 'Ceza Hukuku',
        title: 'Ceza Davalarında Delil Toplama Teknikleri',
        content: 'Ceza davalarında en etkili delil toplama yöntemleri nelerdir? Özellikle dijital deliller konusunda deneyimli arkadaşların görüşlerini almak istiyorum. Bu konuda Yargıtay\'ın son içtihatları da önem arz ediyor.',
        likes: 15,
        comments: 1,
        isLiked: false,
        isArchived: false,
        authorAvatarUrl: undefined,
        commentsList: [
            { id: 'c1', author: 'Av. Ayşe Güneş', timeAgo: '1 saat önce', content: 'Dijital delillerde veri bütünlüğü çok önemli.', authorAvatarUrl: undefined }
        ]
    },
    {
        id: 'p2',
        author: 'Av. Can Demir',
        timeAgo: '5 saat önce',
        category: 'İş Hukuku',
        title: 'İş Hukukunda Fesih Bildirimi Süresi',
        content: 'Belirli süreli iş sözleşmelerinde fesih bildirimi için herhangi bir süre şartı var mıdır? İçtihatlar neler diyor?',
        likes: 23,
        comments: 0,
        isLiked: true,
        isArchived: false,
        authorAvatarUrl: undefined,
        commentsList: []
    },
    {
        id: 'p3',
        author: 'Sen', // Kendi gönderimiz
        timeAgo: '10 dakika önce',
        category: 'Genel',
        title: 'Yeni Avukatlar için Tavsiyeler',
        content: 'Mesleğe yeni başlayan genç meslektaşlarıma tecrübeli avukatlardan tavsiyeler bekliyorum. Hangi alanlara yönelmek, hangi konulara dikkat etmek gerekir?',
        likes: 5,
        comments: 2,
        isLiked: false,
        isArchived: false,
        authorAvatarUrl: undefined,
        commentsList: [
            { id: 'c3-1', author: 'Av. Deniz Akın', timeAgo: '5 dakika önce', content: 'Kendini sürekli geliştir, network çok önemli.', authorAvatarUrl: undefined },
            { id: 'c3-2', author: 'Sen', timeAgo: '2 dakika önce', content: 'Teşekkür ederim Deniz Bey!', authorAvatarUrl: undefined } // Kendi yorumumuz
        ]
    },
];
// --- Mock Data Sonu ---


const ForumPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('Tümü');
    const [posts, setPosts] = useState<ForumPost[]>(mockPosts);
    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
    const navigate = useNavigate(); // Geri butonu için

    // Filtrelenmiş gönderiler
    const filteredPosts = posts.filter(post =>
        !post.isArchived && (activeCategory === 'Tümü' || post.category === activeCategory)
    );

    // --- Fonksiyonlar ---

    // Yeni gönderi oluşturma
    const handleSavePost = (postData: PostData) => {
        const newPost: ForumPost = {
            id: `p${posts.length + 1}`,
            author: 'Sen', // Simülasyon için
            timeAgo: 'şimdi',
            likes: 0,
            comments: 0,
            isLiked: false,
            isArchived: false,
            authorAvatarUrl: undefined,
            commentsList: [],
            ...postData,
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    // Gönderiyi beğenme
    const handleToggleLike = (postId: string) => {
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === postId) {
                    const isLiked = !post.isLiked;
                    const likes = isLiked ? post.likes + 1 : post.likes - 1;
                    return { ...post, isLiked, likes };
                }
                return post;
            })
        );
        // Eğer modal açıksa, modal'daki postu da güncelle
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(prevPost => {
                if (!prevPost) return null;
                const isLiked = !prevPost.isLiked;
                const likes = isLiked ? prevPost.likes + 1 : prevPost.likes - 1;
                return { ...prevPost, isLiked, likes };
            });
        }
    };

    // Yorum ekleme
    const handleAddComment = (postId: string, content: string) => {
        const newComment: Comment = {
            id: `c${Math.random().toString(36).substring(2, 9)}`, // Benzersiz ID
            author: 'Sen', // Simülasyon
            timeAgo: 'şimdi',
            content: content,
            authorAvatarUrl: undefined,
        };

        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === postId) {
                    const newCommentsList = [...post.commentsList, newComment];
                    return {
                        ...post,
                        commentsList: newCommentsList,
                        comments: newCommentsList.length
                    };
                }
                return post;
            })
        );

        // Eğer modal açıksa, modal'daki veriyi de güncelle
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(prevPost => ({
                ...prevPost!,
                commentsList: [...prevPost!.commentsList, newComment],
                comments: prevPost!.commentsList.length + 1
            }));
        }
    };

    // Yorum silme
    const handleDeleteComment = (postId: string, commentId: string) => {
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === postId) {
                    const newCommentsList = post.commentsList.filter(c => c.id !== commentId);
                    return {
                        ...post,
                        commentsList: newCommentsList,
                        comments: newCommentsList.length
                    };
                }
                return post;
            })
        );

        // Eğer modal açıksa, modal'daki veriyi de güncelle
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(prevPost => {
                const newCommentsList = prevPost!.commentsList.filter(c => c.id !== commentId);
                return {
                    ...prevPost!,
                    commentsList: newCommentsList,
                    comments: newCommentsList.length
                };
            });
        }
    };

    // Gönderi Silme (Soft Delete)
    const handleDeletePost = (postId: string) => {
        // Onaylama işlemi PostDetailModal içinde yapılıyor
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId ? { ...post, isArchived: true } : post
            )
        );
        setSelectedPost(null); // Modalı kapat
    };


    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* 1. Sayfa Başlığı */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Geri dön"
                >
                    <IoArrowBack size={24} />
                </button>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Forum</h2>
                    <p className="text-base text-gray-500">Hukuk camiası ile bilgi paylaşımı</p>
                </div>
            </div>

            {/* 2. Ana Başlık ve Yeni Gönderi Butonu */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                    <FiMessageSquare size={22} />
                    <span>Tüm Tartışmalar</span>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-blue-900 text-white rounded-lg cursor-pointer transition-colors hover:bg-blue-800 shadow-sm"
                    onClick={() => setIsNewPostModalOpen(true)}
                >
                    <FiPlus size={18} />
                    <span>Yeni Gönderi</span>
                </button>
            </div>

            {/* 3. Kategori Filtreleri */}
            <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-200 pb-6">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-medium border-none rounded-md cursor-pointer transition-all ${activeCategory === category
                            ? 'bg-blue-900 text-white hover:bg-blue-800'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 4. Gönderi Listesi */}
            <div className="flex flex-col gap-6">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <ForumPostCard
                            key={post.id}
                            post={post}
                            onToggleLike={() => handleToggleLike(post.id)}
                            onCommentClick={() => setSelectedPost(post)} // Tıklanınca detay modalı aç
                        />
                    ))
                ) : (
                    <div className="text-center p-12 text-gray-500 bg-white border border-dashed border-gray-300 rounded-lg">
                        Bu kategoride henüz gönderi yok.
                    </div>
                )}
            </div>

            {/* 5. Modallar */}
            <NewPostModal
                isOpen={isNewPostModalOpen}
                onClose={() => setIsNewPostModalOpen(false)}
                onSave={handleSavePost}
                categories={categories.filter(c => c !== 'Tümü')} // "Tümü" kategorisi hariç
            />

            <PostDetailModal
                isOpen={selectedPost !== null}
                onClose={() => setSelectedPost(null)}
                post={selectedPost}
                onToggleLike={handleToggleLike}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                onDeletePost={handleDeletePost}
            />
        </div>
    );
};

export default ForumPage;