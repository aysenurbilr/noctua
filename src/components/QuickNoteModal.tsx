import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiX, FiMoreVertical, FiExternalLink, FiTag, FiMove } from 'react-icons/fi';
import type { NoteData } from '@/types/note'; // Not tipini import et

// --- 1. PROPS ARAYÜZÜ GÜNCELLENDİ ---
interface QuickNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (noteData: NoteData, id: string | null) => void; // Artık ID'yi de alıyor
}

// ... (Renkler ve Kategoriler aynı) ...
const noteColors = [
    { id: 'yellow', hex: '#fff9c4' },
    { id: 'blue', hex: '#e3f2fd' },
    { id: 'green', hex: '#e8f5e9' },
    { id: 'pink', hex: '#fce4ec' },
    { id: 'purple', hex: '#f3e5f5' },
    { id: 'orange', hex: '#fff3e0' },
];
const noteCategories = [
    'Hızlı Notlar', 'Genel', 'Vaka Notları', 'Önemli', 'Araştırma', 'Fikirler'
];

// --- 2. BİLEŞEN PROPS'LARI ALIYOR ---
const QuickNoteModal: React.FC<QuickNoteModalProps> = ({ isOpen, onClose, onSave }) => {
    const [content, setContent] = useState('');
    const [selectedColor, setSelectedColor] = useState(noteColors[0].hex);
    const [selectedCategory, setSelectedCategory] = useState('Hızlı Notlar');

    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const navigate = useNavigate();

    // --- Sürükleme State'i ---
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth - 650, y: 150 });
    const dragStartRef = useRef({ offsetX: 0, offsetY: 0 });

    // ... (useEffect - Formu temizle - aynı) ...
    useEffect(() => {
        if (isOpen) {
            setContent('');
            setSelectedColor(noteColors[0].hex);
            setSelectedCategory('Hızlı Notlar');
            setIsCategoryMenuOpen(false);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!content.trim()) {
            alert('Lütfen bir not içeriği girin.');
            return;
        }

        // --- 3. onSave ÇAĞRISI GÜNCELLENDİ ---
        onSave({
            title: content.substring(0, 30) + (content.length > 30 ? '...' : ''),
            content: content,
            color: selectedColor,
            category: selectedCategory,
        }, null); // null = Bu yeni bir nottur (ID'si yok)

        onClose(); // Kaydettikten sonra modalı kapat
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setIsCategoryMenuOpen(false);
    };

    // --- Sürükleme Fonksiyonları (Aynı) ---
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        dragStartRef.current = {
            offsetX: e.clientX - position.x,
            offsetY: e.clientY - position.y,
        };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            e.stopPropagation();
            setPosition({
                x: e.clientX - dragStartRef.current.offsetX,
                y: e.clientY - dragStartRef.current.offsetY,
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);
    // --- Bitiş: Sürükleme Fonksiyonları ---


    if (!isOpen) {
        return null;
    }

    return (
        // --- Tasarım (Aynı) ---
        <div
            className="bg-white rounded-2xl border border-gray-300 shadow-2xl w-full max-w-xl h-[600px] max-h-[90vh] flex flex-col z-1000"
            style={{
                position: 'fixed',
                top: `${position.y}px`,
                left: `${position.x}px`
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* 1. Başlık Çubuğu (Taşıma Alanı) */}
            <div
                className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink:0 bg-white rounded-t-2xl cursor-move"
                onMouseDown={handleMouseDown}
            >
                <div className="flex items-center gap-2">
                    <FiMove size={16} className="text-gray-400" />
                    <div className="relative">
                        <button
                            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md cursor-pointer transition-all bg-gray-50 hover:bg-gray-100"
                        >
                            <FiTag size={14} />
                            {selectedCategory}
                            <FiMoreVertical size={14} />
                        </button>
                        {isCategoryMenuOpen && (
                            <div
                                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1"
                                onMouseLeave={() => setIsCategoryMenuOpen(false)}
                            >
                                {noteCategories.map(category => (
                                    <button
                                        key={category}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => navigate('/notes')}
                        className="text-gray-500 p-2 rounded-full transition-colors hover:bg-gray-100"
                        aria-label="Tüm Notlar"
                        title="Tüm Notlar"
                    >
                        <FiExternalLink size={18} />
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-500 p-2 rounded-full transition-colors hover:bg-gray-100"
                        aria-label="Kapat"
                    >
                        <FiX size={20} />
                    </button>
                </div>
            </div>

            {/* 2. Orta alan (Beyaz) */}
            <div className="p-4 grow overflow-y-auto bg-white flex flex-col">
                <div className="mb-4 flex-shrink:0">
                    <label className="block text-sm font-medium text-gray-600 mb-2 text-left">
                        Renk Seçin
                    </label>
                    <div className="flex justify-start gap-2">
                        {noteColors.map(color => (
                            <button
                                key={color.id}
                                className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-all hover:scale-110 ${selectedColor === color.hex ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-400'}`}
                                style={{ backgroundColor: color.hex }}
                                onClick={() => setSelectedColor(color.hex)}
                                aria-label={color.id}
                            />
                        ))}
                    </div>
                </div>

                {/* Not alanı (Renkli Kutu) */}
                <div className="grow flex flex-col">
                    <textarea
                        className="w-full h-full grow p-4 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Hızlı notunuzu buraya yazın..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ backgroundColor: selectedColor }}
                    />
                </div>
            </div>

            {/* 3. Alt çubuk (Beyaz) */}
            <div className="p-4 border-t border-gray-200 flex-shrink:0 bg-white rounded-b-2xl">
                <button
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-base font-semibold rounded-lg cursor-pointer transition-all bg-blue-900 text-white hover:bg-blue-800 disabled:bg-gray-400"
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                >
                    <FiCheck /> Kaydet
                </button>
            </div>
        </div>
    );
};

export default QuickNoteModal;