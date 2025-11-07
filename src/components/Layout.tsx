import React from "react";
import { Link, useLocation } from "react-router-dom";

// --- İkonlar ---
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.5l-1.5 1.5A2 2 0 0116 14.5V17a2 2 0 01-2 2H6a2 2 0 01-2-2v-2.5a2 2 0 01-1-1.5L1.5 11.5V8a2 2 0 012-2h2zm4-1a1 1 0 00-1 1v1h2V6a1 1 0 00-1-1H10z" clipRule="evenodd" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
);

const UserCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- Layout Bileşeni ---
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path: string) => currentPath === path;

    const activeStyle = "bg-blue-900 text-white";
    const inactiveStyle = "text-gray-600 hover:bg-gray-100";

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Üst Navigasyon */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    {/* Sol: Logo */}
                    <div className="flex items-center space-x-3">
                        <img
                            src="/assets/owl-logo.png"
                            alt="NOCTUA Logosu"
                            className="h-20 w-20"
                            onError={(e) => (e.currentTarget.src = 'https://placehold.co/40x40/0d47a1/FFFFFF?text=N')}
                        />
                        <h1 className="text-2xl font-bold text-gray-800">NOCTUA</h1>
                    </div>

                    {/* Orta: Menü */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <Link
                            to="/"
                            className={`flex items-center px-4 py-2 rounded-full font-medium ${isActive("/") ? activeStyle : inactiveStyle}`}
                        >
                            <HomeIcon />
                            Ana Sayfa
                        </Link>

                        <Link
                            to="/cases"
                            className={`flex items-center px-4 py-2 rounded-full font-medium ${isActive("/cases") ? activeStyle : inactiveStyle}`}
                        >
                            <BriefcaseIcon />
                            Vakalar
                        </Link>

                        {/* 🔥 DÜZELTİLDİ: AI Asistan artık yönlendirme yapıyor */}
                        <Link
                            to="/asistan"
                            className={`flex items-center px-4 py-2 rounded-full font-medium ${isActive("/asistan") ? activeStyle : inactiveStyle}`}
                        >
                            <SparklesIcon />
                            AI Asistan
                        </Link>

                        <Link
                            to="/leaderboard"
                            className={`flex items-center px-4 py-2 rounded-full font-medium ${isActive("/leaderboard") ? activeStyle : inactiveStyle}`}
                        >
                            <TrophyIcon />
                            Liderlik
                        </Link>
                    </nav>

                    {/* Sağ: Profil */}
                    <Link
                        to="/profile"
                        className={`flex items-center px-4 py-2 rounded-full font-medium ${isActive("/profile") ? activeStyle : inactiveStyle}`}
                    >
                        <UserCircleIcon />
                        Profil
                    </Link>

                </div>
            </header>

            {/* Sayfa içeriği */}
            <main>{children}</main>
        </div>
    );
};

export default Layout;
