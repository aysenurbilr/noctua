// Notun ana yapısı
export interface Note {
    id: string;
    title: string;
    content: string;
    category: string;
    color: string;
}

// Formdan gelen veri (ID'siz hali)
export type NoteData = Omit<Note, 'id'>;