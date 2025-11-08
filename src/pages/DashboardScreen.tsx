import React, { useEffect, useState } from "react";
// Artık 'Link' veya 'useNavigate' kullanılmıyor (Link'i sildim)
import { useNavigate } from "react-router-dom";
// Bell ikonu import'u kaldırıldı
import { Plus, FileText, MessageSquare, Award, Target, TrendingUp, Folder } from "lucide-react";

interface CaseData {
    id: number;
    title: string;
    category: string;
    level: string;
}

interface StatsData {
    totalPoints: number;
    completedCases: number;
    successRate: number;
    weeklyIncrease: number;
}

const DashboardScreen: React.FC = () => {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [cases, setCases] = useState<CaseData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setStats({
                totalPoints: 2450,
                completedCases: 12,
                successRate: 89,
                weeklyIncrease: 367,
            });

            setCases([
                { id: 1, title: "Kira Sözleşmesi Anlaşmazlığı", category: "İcra Hukuku", level: "Orta Seviye" },
                { id: 2, title: "İş Akdi Feshi Davası", category: "İş Hukuku", level: "İleri Seviye" },
                { id: 3, title: "Trafik Kazası Tazminat", category: "Borçlar Hukuku", level: "Başlangıç" },
            ]);
        }, 800);
    }, []);

    if (!stats) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500 text-lg animate-pulse">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Üst Başlık */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Hoş Geldin, Avukat!</h1>
                    <p className="text-gray-500">Bugün hangi vakayı çözmek istersin?</p>
                </div>
                {/* Zil ikonu buradan kaldırıldı */}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Sol Kısım: Puan Kartı */}
                <div className="col-span-2 bg-white shadow-sm rounded-2xl p-8 border border-gray-100 text-center">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Genel Puan</h2>

                    <div className="mb-6">
                        <p className="text-5xl font-bold text-blue-900">{stats.totalPoints}</p>
                        <p className="text-sm text-gray-500 mt-1">Toplam Puan</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 items-center text-center">
                        <div className="flex flex-col items-center">
                            <Award className="text-blue-900 w-6 h-6 mb-1" />
                            <span className="font-semibold text-gray-700">{stats.completedCases}</span>
                            <span className="text-xs text-gray-500">Tamamlanan Vaka</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Target className="text-blue-900 w-6 h-6 mb-1" />
                            <span className="font-semibold text-gray-700">%{stats.successRate}</span>
                            <span className="text-xs text-gray-500">Ortalama Başarı</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <TrendingUp className="text-blue-900 w-6 h-6 mb-1" />
                            <span className="font-semibold text-gray-700">+{stats.weeklyIncrease}</span>
                            <span className="text-xs text-gray-500">Bu Hafta</span>
                        </div>
                    </div>
                </div>

                {/* Sağ Kısım: Butonlar */}
                <div className="flex flex-col gap-4">
                    <button className="flex items-center justify-center gap-2 bg-blue-900 text-white font-semibold py-4 rounded-xl hover:bg-blue-800 transition-all shadow-sm">
                        <Plus className="w-5 h-12" /> Yeni Vaka Başlat
                    </button>

                    <button
                        onClick={() => navigate("/notes")}
                        className="flex items-center justify-center gap-2 bg-white border border-gray-200 py-4 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <FileText className="w-5 h-12 text-blue-900" /> Notlarım
                    </button>

                    <button
                        onClick={() => navigate("/forum")}
                        className="flex items-center justify-center gap-2 bg-white border border-gray-200 py-4 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <MessageSquare className="w-5 h-12 text-blue-900" /> Forum
                    </button>
                </div>
            </div>

            {/* Devam Eden Vakalar */}
            <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Devam Eden Vakalar</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {cases.map((c) => (
                        <div
                            key={c.id}
                            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl shadow-sm p-4 hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <Folder className="text-blue-900 w-6 h-6" />
                                <div>
                                    <p className="font-medium text-gray-800">{c.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {c.category} • {c.level}
                                    </p>
                                </div>
                            </div>
                            <span className="text-gray-400">›</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;