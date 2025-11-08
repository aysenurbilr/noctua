import React from 'react';
import type { ForumPost } from '@/types/forum'; // Kısayol (alias) ile import
import { FiX, FiMessageSquare, FiHeart, FiTrash2 } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import CommentSection from '@/components/CommentSection'; // Kısayol ile import

interface PostDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: ForumPost | null;
    onToggleLike: (postId: string) => void;
    onAddComment: (postId: string, content: string) => void;
    onDeleteComment: (postId: string, commentId: string) => void;
    onDeletePost: (postId: string) => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
    isOpen,
    onClose,
    post,
    onToggleLike,
    onAddComment,
    onDeleteComment,
    onDeletePost
}) => {

    if (!isOpen || !post) {
        return null;
    }

    const handleDeleteClick = () => {
        // Silmeden önce bir onay sormak iyi bir pratik olabilir
        if (window.confirm("Bu gönderiyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
            onDeletePost(post.id);
            onClose(); // Modalı kapat
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-1000 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-4xl max-h-[90vh] relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Kapat butonu */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 p-2 rounded-full transition-colors hover:bg-gray-100 hover:text-gray-900 z-10"
                    aria-label="Kapat"
                >
                    <FiX size={24} />
                </button>

                {/* 1. Kısım: Gönderi İçeriği (Kaydırılabilir) */}
                <div className="p-6 md:p-8 overflow-y-auto">

                    {/* Başlık ve Kategori */}
                    <div className="flex justify-between items-start gap-4 border-b border-gray-200 pb-4 mb-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-1">{post.title}</h2>
                            <span className="text-base text-gray-500 font-medium">{post.category}</span>
                        </div>
                    </div>

                    {/* Yazar Bilgisi ve Sil Butonu */}
                    <div className="flex items-center justify-between pb-4">
                        <div className="flex items-center gap-3">
                            {post.authorAvatarUrl ? (
                                <img src={post.authorAvatarUrl} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <FaUserCircle size={40} className="text-gray-400" />
                            )}
                            <div className="ml-1">
                                <strong className="text-sm font-semibold text-gray-900">{post.author}</strong>
                                <span className="text-xs text-gray-500 ml-2">• {post.timeAgo}</span>
                            </div>
                        </div>

                        {post.author === 'Sen' && (
                            <button
                                className="flex items-center gap-1.5 bg-transparent border border-red-600 text-red-600 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors flex-shrink:0 hover:bg-red-600 hover:text-white"
                                onClick={handleDeleteClick}
                            >
                                <FiTrash2 size={14} /> Gönderiyi Sil
                            </button>
                        )}
                    </div>

                    {/* Gönderi İçeriği (Ana Metin) */}
                    <div className="pb-6 border-b border-gray-200">
                        <p className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </p>
                    </div>

                    {/* Beğeni ve Yorum Sayısı */}
                    <div className="flex gap-3 pt-5">
                        <button
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${post.isLiked
                                ? 'bg-blue-50 border border-blue-600 text-blue-600 font-semibold'
                                : 'bg-gray-100 border border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'
                                }`}
                            onClick={() => onToggleLike(post.id)}
                        >
                            {post.isLiked ? <FiHeart fill='currentColor' className="text-blue-600" size={16} /> : <FiHeart size={16} />}
                            <span>{post.likes} Beğeni</span>
                        </button>
                        <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-600">
                            <FiMessageSquare size={16} />
                            <span>{post.comments} Yorum</span>
                        </div>
                    </div>

                </div>

                {/* 2. Kısım: Yorumlar Bölümü (Kendi kaydırma çubuğu var) */}
                <CommentSection
                    postId={post.id}
                    comments={post.commentsList}
                    onAddComment={onAddComment}
                    onDeleteComment={onDeleteComment}
                />
            </div>
        </div>
    );
};

export default PostDetailModal;