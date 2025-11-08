// Not oluştururken veya düzenlerken kullanılan veri
export interface NoteData {
    title: string;
    content: string;
    color: string;
    category: string;
}

// Kaydedilmiş bir notun tam tipi (ID içerir)
export interface Note extends NoteData {
    id: string;
}