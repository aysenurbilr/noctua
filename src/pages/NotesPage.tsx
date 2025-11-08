import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate eklendi
import { IoArrowBack } from 'react-icons/io5';
import { FiPlus, FiSearch, FiFileText } from 'react-icons/fi';
import NewNoteModal from '@/components/NewNoteModal'; // Kısayol ile import
import NoteCard from '@/components/NoteCard'; // Kısayol ile import
import type { Note } from '@/types/note'; // Kısayol (alias) ile import

type FilterCategory = 'hepsi' | 'Hızlı Notlar' | 'Genel' | 'Vaka Notları' | 'Önemli' | 'Araştırma' | 'Fikirler';

const filters: { id: FilterCategory, label: string }[] = [
    { id: 'hepsi', label: 'Hepsi' },
    { id: 'Hızlı Notlar', label: 'Hızlı Notlar' },
    { id: 'Genel', label: 'Genel' },
    { id: 'Vaka Notları', label: 'Vaka Notları' },
    { id: 'Önemli', label: 'Önemli' },
    { id: 'Araştırma', label: 'Araştırma' },
    { id: 'Fikirler', label: 'Fikirler' },
];

const NotesPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('hepsi');
    const [notes, setNotes] = useState<Note[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate(); // Geri butonu için

    const handleSaveNote = (noteData: Omit<Note, 'id'>, id: string | null) => {
        if (id) {
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note.id === id ? { ...noteData, id } : note
                )
            );
        } else {
            const newNote: Note = {
                id: crypto.randomUUID(),
                ...noteData,
            };
            setNotes(prevNotes => [newNote, ...prevNotes]);
        }
        closeModal();
    };

    const handleDeleteNote = (id: string) => {
        if (window.confirm('Bu notu silmek istediğinizden emin misiniz?')) {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        }
    };

    const openModalForEdit = (note: Note) => {
        setEditingNote(note);
        setIsModalOpen(true);
    };

    const openModalForNew = () => {
        setEditingNote(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingNote(null);
    };

    const filteredNotes = useMemo(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return notes.filter(note => {
            const categoryMatch = activeFilter === 'hepsi' || note.category === activeFilter;
            const searchMatch = !searchQuery ||
                note.title.toLowerCase().includes(lowerCaseQuery) ||
                note.content.toLowerCase().includes(lowerCaseQuery);
            return categoryMatch && searchMatch;
        });
    }, [notes, activeFilter, searchQuery]);

    const noteCount = filteredNotes.length;

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center text-center p-16 mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-28 h-28 flex items-center justify-center bg-gray-100 rounded-full text-gray-400 mb-6">
                <FiFileText size={50} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {searchQuery && filteredNotes.length === 0
                    ? 'Aramanızla eşleşen not bulunamadı.'
                    : activeFilter === 'hepsi' && !searchQuery
                        ? 'Henüz not eklenmemiş.'
                        : `"${activeFilter}" kategorisinde not bulunamadı.`
                }
            </h2>
            <p className="text-base text-gray-500 max-w-xs">
                {searchQuery
                    ? 'Farklı bir anahtar kelime deneyin veya filtrenizi değiştirin.'
                    : 'Yeni not oluşturarak başlayın!'
                }
            </p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 bg-gray-50 min-h-screen">
            {/* 1. Üst Kısım */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                        aria-label="Geri dön"
                    >
                        <IoArrowBack size={24} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Notlarım</h2>
                        <p className="text-base text-gray-500">{noteCount} not bulundu</p>
                    </div>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-blue-900 text-white rounded-lg cursor-pointer transition-colors hover:bg-blue-800 shadow-sm"
                    onClick={openModalForNew}
                >
                    <FiPlus size={18} />
                    <span>Yeni Not</span>
                </button>
            </div>

            {/* 2. Araç Çubuğu (Arama) */}
            <div className="mb-4">
                <div className="relative w-full">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                    <input
                        type="text"
                        placeholder="Notlarda (başlık ve içerik) ara..."
                        className="w-full py-3 pl-12 pr-4 text-base border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Filtre Sekmeleri */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
                {filters.map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2 text-sm font-medium border-none rounded-md cursor-pointer transition-all ${activeFilter === filter.id ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* 3. Notların Listelendiği Alan */}
            <div className="w-full">
                {filteredNotes.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                        {filteredNotes.map(note => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onEdit={openModalForEdit}
                                onDelete={handleDeleteNote}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal'ı render et */}
            <NewNoteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSaveNote}
                existingNote={editingNote}
            />
        </div>
    );
};

export default NotesPage;