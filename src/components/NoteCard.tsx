import React from 'react';
import type { Note } from '@/types/note'; // Kısayol (alias) ile import
import { FiTrash2 } from 'react-icons/fi'; // Silme ikonu

interface NoteCardProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {

    // Silme butonuna tıklandığında (yayılmayı durdur)
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Bu, kartın 'onEdit' tıklamasını engeller
        onDelete(note.id);
    };

    // Kartın kendisine tıklandığında (düzenle)
    const handleEditClick = () => {
        onEdit(note);
    };

    return (
        <div
            className="h-52 p-4 rounded-lg border border-gray-200 flex flex-col justify-between transition-all duration-200 ease-in-out shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md"
            style={{ backgroundColor: note.color }} // Renk buradan uygulanıyor
            onClick={handleEditClick}
        >
            {/* İçerik */}
            <div className="overflow-hidden">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {note.title || 'Başlıksız Not'}
                </h4>
                <p className="text-sm text-gray-700 leading-snug wrap-break-word
                line-clamp-4">
                    {note.content}
                </p>
            </div>

            {/* Footer: Kategori ve Sil Butonu */}
            <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-medium text-gray-800 bg-white/50 px-2 py-0.5 rounded">
                    {note.category}
                </span>
                <button
                    className="text-gray-700 p-1 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black/10 hover:text-black"
                    onClick={handleDeleteClick}
                    aria-label="Notu sil"
                >
                    <FiTrash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default NoteCard;