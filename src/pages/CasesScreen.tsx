import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // <-- KULLANILMADIĞI İÇİN SİLİNDİ
import QuickNoteModal from '@/components/QuickNoteModal';
import type { NoteData } from '@/types/note';

interface CasesScreenProps {
    onSaveNote: (noteData: NoteData, id: string | null) => void;
}

// ... (CaseCard bileşeni aynı, değişiklik yok) ...
interface CaseCardProps {
    title: string;
    category: string;
    level: string;
    status: 'devam' | 'tamamlandi' | 'yeni';
}

const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

const CaseCard: React.FC<CaseCardProps> = ({ title, category, level, status }) => {
    const getStatusBadge = () => {
        switch (status) {
            case 'devam':
                return <span className="absolute top-4 right-4 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Devam Ediyor</span>;
            case 'tamamlandi':
                return <span className="absolute top-4 right-4 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Tamamlandı</span>;
            case 'yeni':
                return <span className="absolute top-4 right-4 px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Yeni</span>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-sm relative flex flex-col justify-start cursor-pointer transition-shadow hover:shadow-md">
            {getStatusBadge()}
            <div className="p-3 bg-blue-50 rounded-lg inline-block self-start mb-4">
                <FolderIcon />
            </div>
            <div>
                <h3 className="text-md font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">
                    {category} • {level}
                </p>
            </div>
        </div>
    );
};
// --- Vaka Kartı Bitiş ---

const CasesScreen: React.FC<CasesScreenProps> = ({ onSaveNote }) => {
    const colors = {
        primary: '#0d47a1',
    };

    const [isQuickNoteOpen, setIsQuickNoteOpen] = useState(false);
    // const navigate = useNavigate(); // <-- KULLANILMADIĞI İÇİN SİLİNDİ

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            {/* Başlık */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vaka Listesi</h2>

            {/* Vakalar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CaseCard title="Kira Sözleşmesi Anlaşmazlığı" category="İcra Hukuku" level="Orta Seviye" status="devam" />
                <CaseCard title="İş Akdi Feshi Davası" category="İş Hukuku" level="İleri Seviye" status="devam" />
                <CaseCard title="Trafik Kazası Tazminat" category="Borçlar Hukuku" level="Başlangıç" status="tamamlandi" />
                <CaseCard title="Miras Paylaşımı" category="Medeni Hukuk" level="Orta Seviye" status="yeni" />
            </div>

            {/* Yüzen Not Butonu */}
            <button
                className="fixed bottom-8 right-8 p-4 rounded-full shadow-lg text-white"
                style={{ backgroundColor: colors.primary }}
                aria-label="Hızlı Not Ekle"
                onClick={() => setIsQuickNoteOpen(true)} // Modalı aç
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>

            <QuickNoteModal
                isOpen={isQuickNoteOpen}
                onClose={() => setIsQuickNoteOpen(false)}
                onSave={onSaveNote}
            />
        </div>
    );
};

export default CasesScreen;