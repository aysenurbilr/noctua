import React, { useState } from 'react';
import type { Comment } from '@/types/forum'; // Kısayol (alias) ile import
import { FiSend, FiTrash2 } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

interface CommentSectionProps {
    postId: string;
    comments: Comment[];
    onAddComment: (postId: string, content: string) => void;
    onDeleteComment: (postId: string, commentId: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
    postId,
    comments,
    onAddComment,
    onDeleteComment
}) => {
    const [newComment, setNewComment] = useState('');
    const [commentToDeleteId, setCommentToDeleteId] = useState<string | null>(null);

    const handleSubmit = () => {
        if (newComment.trim()) {
            onAddComment(postId, newComment.trim());
            setNewComment('');
        }
    };

    const handleInitiateDelete = (commentId: string) => {
        setCommentToDeleteId(commentId);
    };

    const handleConfirmDelete = () => {
        if (commentToDeleteId) {
            onDeleteComment(postId, commentToDeleteId);
            setCommentToDeleteId(null);
        }
    };

    const handleCancelDelete = () => {
        setCommentToDeleteId(null);
    };

    return (
        <div className="px-6 py-6 md:px-8 border-t border-gray-200 bg-white max-h-[50vh] overflow-y-auto flex-shrink0">
            {/* 1. Yorum Yazma Formu */}
            <div className="bg-gray-50 border border-gray-200 p-5 rounded-lg mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Yorum Yap ({comments.length})
                </h4>
                <div className="flex flex-col gap-3">
                    <textarea
                        className="w-full p-3 text-base bg-white border border-gray-300 rounded-lg min-h-80px resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        placeholder="Yorumunuzu yazın..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        className="flex items-center justify-center gap-2 bg-blue-900 text-white px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-colors self-start hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={handleSubmit}
                        disabled={!newComment.trim()}
                    >
                        <FiSend size={16} /> Yorum Yap
                    </button>
                </div>
            </div>

            {/* 2. Yorum Listesi */}
            <div className="flex flex-col gap-6">
                {comments.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">Henüz yorum yapılmamış.</p>
                ) : (
                    comments.map(comment => (
                        <div className="flex gap-3 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0" key={comment.id}>
                            {comment.authorAvatarUrl ? (
                                <img src={comment.authorAvatarUrl} alt={comment.author} className="w-9 h-9 rounded-full object-cover" />
                            ) : (
                                <FaUserCircle size={36} className="w-9 h-9 rounded-full text-gray-400 bg-gray-100" />
                            )}
                            <div className="flex-1">
                                <div className="flex items-center mb-1 relative">
                                    <strong className="text-sm font-semibold text-gray-900">{comment.author}</strong>
                                    <span className="text-xs text-gray-500 ml-2">{comment.timeAgo}</span>

                                    {/* Silme Mantığı */}
                                    {comment.author === 'Sen' && (
                                        <div className="ml-auto">
                                            {commentToDeleteId === comment.id ? (
                                                // Onaylama
                                                <div className="flex items-center gap-2 bg-white p-1 rounded-md">
                                                    <span className="text-xs text-gray-600 font-medium">Emin misiniz?</span>
                                                    <button
                                                        className="px-2.5 py-1 text-xs font-semibold rounded-md cursor-pointer transition-colors bg-red-600 text-white hover:bg-red-700"
                                                        onClick={handleConfirmDelete}
                                                    >
                                                        Sil
                                                    </button>
                                                    <button
                                                        className="px-2.5 py-1 text-xs font-semibold rounded-md cursor-pointer transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                        onClick={handleCancelDelete}
                                                    >
                                                        İptal
                                                    </button>
                                                </div>
                                            ) : (
                                                // İlk Sil butonu
                                                <button
                                                    className="text-gray-500 cursor-pointer p-1 rounded-md transition-colors hover:bg-red-100 hover:text-red-700"
                                                    onClick={() => handleInitiateDelete(comment.id)}
                                                    aria-label="Yorumu sil"
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;