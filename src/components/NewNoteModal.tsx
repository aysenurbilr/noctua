import React, { useState, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import type { Note, NoteData } from '@/types/note'; // Kısayol (alias) ile import

interface NewNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (note: NoteData, id: string | null) => void;
    existingNote: Note | null;
}

// Renk seçenekleri
const noteColors = [
    { id: 'yellow', hex: '#fff9c4' },
    { id: 'blue', hex: '#e3f2fd' },
    { id: 'green', hex: '#e8f5e9' },
    { id: 'pink', hex: '#fce4ec' },
    { id: 'purple', hex: '#f3e5f5' },
    { id: 'orange', hex: '#fff3e0' },
];

// Kategori seçenekleri
const noteCategories = [
    'Hızlı Notlar', 'Genel', 'Vaka Notları', 'Önemli', 'Araştırma', 'Fikirler'
];

const NewNoteModal: React.FC<NewNoteModalProps> = ({ isOpen, onClose, onSave, existingNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedColor, setSelectedColor] = useState(noteColors[0].hex);
    const [selectedCategory, setSelectedCategory] = useState('Önemli');

    useEffect(() => {
        if (isOpen) {
            if (existingNote) {
                setTitle(existingNote.title);
                setContent(existingNote.content);
                setSelectedColor(existingNote.color);
                setSelectedCategory(existingNote.category);
            } else {
                setTitle('');
                setContent('');
                setSelectedColor(noteColors[0].hex);
                setSelectedCategory('Önemli');
            }
        }
    }, [isOpen, existingNote]);

    const handleSubmit = () => {
        if (!title && !content) return;

        const noteData: NoteData = {
            title,
            content,
            color: selectedColor,
            category: selectedCategory,
        };
        onSave(noteData, existingNote ? existingNote.id : null);
        onClose(); // Kaydettikten sonra modal'ı kapat
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-xl w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto z-1001"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {existingNote ? 'Notu Düzenle' : 'Yeni Not Oluştur'}
                </h3>

                <input
                    type="text"
                    className="w-full p-3 text-base bg-gray-50 border border-gray-300 rounded-lg mb-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Not başlığı..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="w-full p-3 text-base border border-gray-300 rounded-lg mb-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-vertical min-h-[120px]"
                    placeholder="Not içeriği..."
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ backgroundColor: selectedColor }} // Renk buradan geliyor
                />

                {/* Renk Seçimi */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-3">Renk Seçin:</label>
                    <div className="flex gap-3">
                        {noteColors.map(color => (
                            <button
                                key={color.id}
                                className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all hover:scale-110 ${selectedColor === color.hex ? 'border-blue-600 ring-2 ring-blue-300' : 'border-transparent'}`}
                                style={{ backgroundColor: color.hex }}
                                onClick={() => setSelectedColor(color.hex)}
                                aria-label={color.id}
                            />
                        ))}
                    </div>
                </div>

                {/* Kategori Seçimi */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-3">Kategori:</label>
                    <div className="flex flex-wrap gap-2">
                        {noteCategories.map(category => (
                            <button
                                key={category}
                                className={`px-3 py-1.5 text-xs font-medium border rounded-md cursor-pointer transition-all ${selectedCategory === category ? 'bg-blue-900 text-white border-blue-900 hover:bg-blue-800' : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-blue-600 hover:text-blue-600'}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Butonlar */}
                <div className="flex justify-end gap-3 mt-8 border-t border-gray-200 pt-4">
                    <button
                        className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg cursor-pointer transition-all bg-gray-100 text-gray-600 hover:bg-gray-200"
                        onClick={onClose}
                    >
                        <FiX /> İptal
                    </button>
                    <button
                        className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg cursor-pointer transition-all bg-blue-900 text-white hover:bg-blue-800"
                        onClick={handleSubmit}
                    >
                        <FiCheck /> Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewNoteModal;