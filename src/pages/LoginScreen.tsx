import React, { useState } from "react";
import { motion } from "framer-motion";

interface LoginScreenProps {
    onLoginSuccess: () => void;
    onNavigateToRegister: () => void;
    onNavigateToForgotPassword: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
    onLoginSuccess,
    onNavigateToRegister,
    onNavigateToForgotPassword,
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "test@example.com" && password === "1234") {
            alert("Giriş başarılı!");
            onLoginSuccess();
        } else {
            alert("Hatalı e-posta veya şifre!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-lg w-[850px] h-[450px] flex items-center justify-between overflow-hidden"
            >
                {/* Sol: Logo */}
                <div className="flex-1 flex items-center justify-center bg-white">
                    <img
                        src="/assets/owl-logo.png"
                        alt="NOCTUA Logo"
                        className="w-72 h-72 object-contain"
                    />
                </div>

                {/* Sağ: Form */}
                <div className="flex-1 p-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Giriş Yap</h2>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                E-posta Adresi
                            </label>
                            <input
                                type="email"
                                placeholder="kullanici@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Şifre
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                        >
                            Giriş Yap
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 mt-4 text-center">
                        <button
                            type="button"
                            onClick={onNavigateToForgotPassword}
                            className="text-blue-600 hover:underline"
                        >
                            Şifremi Unuttum
                        </button>
                    </p>

                    <p className="text-sm text-gray-600 mt-2 text-center">
                        Hesabınız yok mu?{" "}
                        <button
                            type="button"
                            onClick={onNavigateToRegister}
                            className="text-blue-600 hover:underline"
                        >
                            Hemen Kaydolun
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginScreen;
