import React, { useState } from "react";
import { motion } from "framer-motion";

interface RegisterScreenProps {
    onNavigateToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigateToLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Şifreler eşleşmiyor!");
            return;
        }
        alert("Kayıt başarılı!");
        onNavigateToLogin();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-lg w-[850px] h-[450px] flex items-center justify-center"
            >
                <div className="w-[70%]">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Kayıt Ol
                    </h2>

                    <form onSubmit={handleRegister} className="space-y-5">
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Şifre (Tekrar)
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                        >
                            Kayıt Ol
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 mt-4 text-center">
                        Zaten hesabınız var mı?{" "}
                        <button
                            type="button"
                            onClick={onNavigateToLogin}
                            className="text-blue-600 hover:underline"
                        >
                            Giriş Yapın
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterScreen;
