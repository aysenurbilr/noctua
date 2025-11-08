import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiAtSign, FiMail, FiPhone, FiSun, FiMoon } from 'react-icons/fi'; // FiMoon eklendi
import { useTheme } from '@/context/ThemeContext';


const SettingsPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const navigate = useNavigate(); // Geri butonu için eklendi

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8 bg-gray-50 min-h-screen">
            {/* 1. Başlık ve Geri Butonu */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)} // Bir önceki sayfaya döner
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Geri dön"
                >
                    <IoArrowBack size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Ayarlar</h1>
                    <p className="text-gray-500">Profil ve tema ayarları</p>
                </div>
            </div>

            {/* 2. Ana İçerik Alanı (2 Sütunlu) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* SOL SÜTUN: Profil Bilgileri */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-4 border-b border-gray-200">
                        Profil Bilgileri
                    </h3>
                    <form>
                        <div className="mb-5">
                            <label htmlFor="fullName" className="flex items-center gap-2 font-medium text-gray-700 text-sm mb-2">
                                <FaRegUserCircle /> Ad Soyad
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                placeholder="Avukat Kullanıcı"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="username" className="flex items-center gap-2 font-medium text-gray-700 text-sm mb-2">
                                <FiAtSign /> Kullanıcı Adı
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="ornek_kullanici"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="flex items-center gap-2 font-medium text-gray-700 text-sm mb-2">
                                <FiMail /> E-posta
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="avukat@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone" className="flex items-center gap-2 font-medium text-gray-700 text-sm mb-2">
                                <FiPhone /> Telefon
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="+90 555 123 4567"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm"
                        >
                            Değişiklikleri Kaydet
                        </button>
                    </form>
                </div>

                {/* SAĞ SÜTUN: Görünüm ve Hakkında */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* Görünüm Kartı */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-4 border-b border-gray-200">
                            Görünüm
                        </h3>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                {isDarkMode ? (
                                    <FiMoon size={20} className="text-gray-500" />
                                ) : (
                                    <FiSun size={20} className="text-gray-500" />
                                )}
                                <div className="grow">
                                    <strong className="font-semibold text-gray-800">Koyu Tema</strong>
                                    <span className="block text-sm text-gray-500">
                                        {isDarkMode ? 'Açık' : 'Kapalı'}
                                    </span>
                                </div>
                            </div>
                            {/* Tailwind CSS ile yapılmış Toggle Switch */}
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isDarkMode}
                                    onChange={toggleTheme}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 peer-checked:bg-blue-900"></div>
                                <div className="absolute top-0.5 left-2px w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
                            </label>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            Koyu tema, geceleri göz yorgunluğunu azaltmaya yardımcı olur.
                        </p>
                    </div>

                    {/* Hakkında Kartı */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-4 border-b border-gray-200">
                            Hakkında
                        </h3>
                        <div className="flex justify-between items-center text-sm py-1">
                            <span className="text-gray-500">Versiyon</span>
                            <strong className="font-semibold text-gray-800">1.0.0</strong>
                        </div>
                        <div className="flex justify-between items-center text-sm py-1">
                            <span className="text-gray-500">Son Güncelleme</span>
                            <strong className="font-semibold text-gray-800">14 Ekim 2025</strong>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SettingsPage;