import React, { useState, useEffect } from 'react';
import type { PostData } from '@/types/forum'; // Kısayol (alias) ile import
import { FiCheck, FiX } from 'react-icons/fi';

// Dışarıdan alınacak proplar
interface NewPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (postData: PostData) => void;
    categories: string[]; // Kategori listesi
}

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose, onSave, categories }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categories[0] || 'Genel');

    // Modal her açıldığında formu temizle
    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setContent('');
            setSelectedCategory(categories[0] || 'Genel');
        }
    }, [isOpen, categories]);

    // Kaydet butonuna basıldığında
    const handleSubmit = () => {
        if (!title || !content) {
            alert('Lütfen başlık ve içerik alanlarını doldurun.');
            return;
        }

        onSave({
            title,
            content,
            category: selectedCategory,
        });
        onClose(); // Kaydettikten sonra modalı kapat
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-1000
            backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl border border-gray-200 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Başlık ve Kapatma Butonu */}
                <div className="flex justify-between items-center pt-6 px-8 mb-2">
                    <h2 className="text-2xl font-semibold text-blue-900">Yeni Gönderi Oluştur</h2>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 p-2 rounded-full transition-colors hover:bg-gray-100 hover:text-gray-900"
                        aria-label="Kapat"
                    >
                        <FiX size={24} />
                    </button>
                </div>
                <p className="text-base text-gray-500 px-8 mb-6">Hukuk camiası ile bilgi ve düşüncelerinizi paylaşın</p>

                {/* Form Alanı */}
                <div className="px-8">
                    <div className="mb-6">
                        <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input
                            id="postTitle"
                            type="text"
                            className="w-full p-3 text-base bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                            placeholder="Gönderi başlığı..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="postContent" className="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                        <textarea
                            id="postContent"
                            className="w-full p-3 text-base bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors resize-vertical min-h-[100px]"
                            placeholder="Paylaşmak istediğiniz bilgi, soru veya görüşünüz..."
                            rows={6}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`px-3 py-1.5 text-sm font-medium border rounded-md cursor-pointer transition-all ${selectedCategory === category
                                        ? 'bg-blue-900 text-white border-blue-900 hover:bg-blue-800'
                                        : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-blue-600 hover:text-blue-600'
                                        }`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Buton Grubu */}
                <div className="flex justify-end gap-3 mt-8 border-t border-gray-200 px-8 py-6 bg-gray-50 rounded-b-2xl">
                    <button
                        className="grow flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-all bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-800"
                        onClick={onClose}
                    >
                        <FiX /> İptal
                    </button>
                    <button
                        className="grow flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-all bg-blue-900 text-white hover:bg-blue-800"
                        onClick={handleSubmit}
                    >
                        <FiCheck /> Paylaş
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPostModal;