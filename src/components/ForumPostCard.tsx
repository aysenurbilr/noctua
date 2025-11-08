import React from 'react';
import type { ForumPost } from '@/types/forum'; // Kısayol (alias) ile import
import { FaUserCircle } from 'react-icons/fa';
import { FiHeart, FiMessageSquare, FiFileText } from 'react-icons/fi';

interface ForumPostCardProps {
    post: ForumPost;
    onToggleLike: (postId: string) => void;
    onCommentClick: (postId: string) => void;
}

const ForumPostCard: React.FC<ForumPostCardProps> = ({ post, onToggleLike, onCommentClick }) => {

    // Beğen butonuna tıklandığında
    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Kartın tıklanmasını engelle
        onToggleLike(post.id);
    };

    // Yorum butonuna tıklandığında
    const handleCommentClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Kartın tıklanmasını engelle
        onCommentClick(post.id); // Modal'ı aç
    };

    // Kartın tamamına tıklandığında (beğen/yorum hariç)
    const handleCardClick = () => {
        onCommentClick(post.id); // Modal'ı aç
    };

    return (
        <div
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 cursor-pointer transition-all duration-200 ease-in-out flex flex-col hover:-translate-y-0.5 hover:shadow-md"
            onClick={handleCardClick}
        >

            {/* Yazar ve Kategori Bilgisi */}
            <div className="flex items-center mb-4">
                {post.authorAvatarUrl ? (
                    <img src={post.authorAvatarUrl} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                    <FaUserCircle size={40} className="text-gray-400" />
                )}
                <div className="ml-3 grow"> {/* flex-grow -> grow */}
                    <strong className="text-sm font-semibold text-gray-900">{post.author}</strong>
                    <span className="text-sm text-gray-500 ml-2">• {post.timeAgo}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-md flex-shrink:0">
                    <FiFileText size={14} />
                    <span>{post.category}</span>
                </div>
            </div>

            {/* Gönderi İçeriği */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {/* Not: Orijinal kodunuzda hem başlık hem içerik 150 karakterle kesiliyordu,
                        ben line-clamp-2 (2 satır) ile değiştirdim. 
                        İsterseniz eski substring(0,150) mantığınıza dönebilirsiniz. */}
                    {post.content}
                </p>
            </div>

            {/* Beğeni ve Yorum Butonları */}
            <div className="flex gap-4 mt-auto pt-4 border-t border-gray-200">
                <button
                    className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium cursor-pointer transition-all hover:bg-gray-100 ${post.isLiked ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-800'
                        }`}
                    onClick={handleLikeClick}
                    aria-label="Beğen"
                >
                    {/* Ikonun kendisi rengi belirleyecek */}
                    {post.isLiked ?
                        <FiHeart fill='currentColor' className="text-blue-600" size={18} /> :
                        <FiHeart size={18} />
                    }
                    <span>{post.likes}</span>
                </button>
                <button
                    className="flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium cursor-pointer transition-all text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    onClick={handleCommentClick}
                    aria-label="Yorum yap"
                >
                    <FiMessageSquare size={18} />
                    <span>{post.comments}</span>
                </button>
            </div>

        </div>
    );
};

export default ForumPostCard;