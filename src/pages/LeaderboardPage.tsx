import React, { useState } from 'react';
import { FaTrophy, FaUserCircle } from 'react-icons/fa';
// import { useTheme } from '@/context/ThemeContext'; // <-- KULLANILMADIĞI İÇİN SİLİNDİ

// ... (UserRank arayüzü ve mock datalar aynı) ...
interface UserRank {
    rank: number;
    name: string;
    puan: number;
    isUser: boolean;
    avatarUrl?: string;
}

const genelLeaderboardData: UserRank[] = [
    { rank: 1, name: 'Ayşe Yılmaz', puan: 3850, isUser: false },
    { rank: 2, name: 'Mehmet Kaya', puan: 3420, isUser: false },
    { rank: 3, name: 'Zeynep Demir', puan: 3180, isUser: false },
    { rank: 4, name: 'Ahmet Çelik', puan: 2890, isUser: false },
    { rank: 5, name: 'Sen', puan: 2450, isUser: true },
    { rank: 6, name: 'Elif Şahin', puan: 2350, isUser: false },
    { rank: 7, name: 'Can Arslan', puan: 2120, isUser: false },
    { rank: 8, name: 'Selin Aydın', puan: 1980, isUser: false },
    { rank: 9, name: 'Burak Özkan', puan: 1750, isUser: false },
    { rank: 10, name: 'Deniz Koç', puan: 1650, isUser: false },
];

const arkadaslarLeaderboardData: UserRank[] = [
    { rank: 1, name: 'Mehmet Kaya', puan: 3420, isUser: false },
    { rank: 2, name: 'Sen', puan: 2450, isUser: true },
    { rank: 3, name: 'Can Arslan', puan: 2120, isUser: false },
    { rank: 4, name: 'Selin Aydın', puan: 1980, isUser: false },
];

type Tab = 'genel' | 'arkadaslar';

// ... (PodiumItem ve RankItem bileşenleri aynı, değişiklik yok) ...
const PodiumItem: React.FC<{ user: UserRank }> = ({ user }) => {
    let rankOrder = '';
    let rankStyles = '';
    let rankBadgeColor = '';

    if (user.rank === 1) {
        rankOrder = 'order-2';
        rankStyles = 'transform -translate-y-5 border-yellow-400';
        rankBadgeColor = 'bg-yellow-400';
    } else if (user.rank === 2) {
        rankOrder = 'order-1';
        rankStyles = 'transform -translate-y-1 border-gray-300';
        rankBadgeColor = 'bg-gray-300';
    } else if (user.rank === 3) {
        rankOrder = 'order-3';
        rankStyles = 'transform -translate-y-1 border-yellow-600'; // Bronz
        rankBadgeColor = 'bg-yellow-600';
    }

    return (
        <div className={`flex flex-col items-center text-center w-32 ${rankOrder}`}>
            <div className={`relative ${rankStyles}`}>
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-20 h-20 rounded-full border-4 object-cover" />
                ) : (
                    <FaUserCircle size={80} className="w-20 h-20 rounded-full border-4 object-cover text-gray-400 bg-gray-700" />
                )}
                <div className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-base text-blue-900 border-4 border-blue-900 ${rankBadgeColor}`}>
                    {user.rank}
                </div>
            </div>
            <strong className="text-lg font-semibold mt-2 text-white">{user.isUser ? 'Sen' : user.name}</strong>
            <span className="text-base font-medium text-yellow-400 mt-1">{user.puan}</span>
        </div>
    );
};

const RankItem: React.FC<{ user: UserRank }> = ({ user }) => (
    <div className={`flex justify-between items-center p-4 rounded-lg border transition-all hover:shadow-md hover:-translate-y-0.5 ${user.isUser ? 'bg-yellow-300 border-yellow-400' : 'bg-white border-gray-200'
        }`}>
        <div className="flex items-center gap-4">
            <span className={`text-lg font-semibold min-w-[30px] ${user.isUser ? 'text-gray-700' : 'text-gray-500'}`}>
                #{user.rank}
            </span>
            <div className="flex flex-col">
                <strong className={`text-base font-semibold ${user.isUser ? 'text-gray-800' : 'text-gray-800'}`}>
                    {user.isUser ? 'Sen' : user.name}
                </strong>
                <span className={`text-sm ${user.isUser ? 'text-gray-600' : 'text-gray-500'}`}>
                    {user.puan} puan
                </span>
            </div>
        </div>
        <div className={`py-1 px-3 rounded-md text-sm font-semibold ${user.isUser ? 'bg-white text-gray-800' : 'bg-gray-100 text-blue-900'
            }`}>
            {user.puan}
        </div>
    </div>
);


const LeaderboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('genel');
    // const { theme } = useTheme(); // <-- KULLANILMADIĞI İÇİN SİLİNDİ

    const data = activeTab === 'genel' ? genelLeaderboardData : arkadaslarLeaderboardData;

    const podiumData = data.filter(u => u.rank <= 3).sort((a, b) => a.rank - b.rank);
    const listData = data.filter(u => u.rank > 3).sort((a, b) => a.rank - b.rank);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* 1. Sayfa Başlığı */}
            <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink:0">
                    <FaTrophy size={20} />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Liderlik Tablosu</h2>
                    <p className="text-gray-500">Bu ayki sıralama</p>
                </div>
            </div>

            {/* 2. Sekme (Tab) Navigasyonu */}
            <div className="flex gap-2 mb-6 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                <button
                    onClick={() => setActiveTab('genel')}
                    className={`flex-1 py-3 px-4 text-sm font-semibold text-center border-none rounded-md cursor-pointer transition-all ${activeTab === 'genel' ? 'bg-blue-900 text-white hover:bg-blue-800' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                >
                    Genel
                </button>
                <button
                    onClick={() => setActiveTab('arkadaslar')}
                    className={`flex-1 py-3 px-4 text-sm font-semibold text-center border-none rounded-md cursor-pointer transition-all ${activeTab === 'arkadaslar' ? 'bg-blue-900 text-white hover:bg-blue-800' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                >
                    Arkadaşlar
                </button>
            </div>

            {/* 3. Podyum (İlk 3) */}
            <div className="bg-blue-900 text-gray-100 p-8 pt-12 rounded-lg flex justify-center items-center gap-4 md:gap-8 min-h-[280px] shadow-lg">
                {podiumData.find(u => u.rank === 2) && <PodiumItem user={podiumData.find(u => u.rank === 2)!} />}
                {podiumData.find(u => u.rank === 1) && <PodiumItem user={podiumData.find(u => u.rank === 1)!} />}
                {podiumData.find(u => u.rank === 3) && <PodiumItem user={podiumData.find(u => u.rank === 3)!} />}
            </div>

            {/* 4. Sıralama Listesi (Geri Kalanlar) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {listData.map(user => (
                    <RankItem user={user} key={user.name} />
                ))}
            </div>
        </div>
    );
};

export default LeaderboardPage;