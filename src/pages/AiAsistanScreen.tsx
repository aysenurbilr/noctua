import { useEffect, useState } from "react";
import { Send, Paperclip, Bot, Circle } from "lucide-react";

interface Message {
    id: number;
    sender: "assistant" | "user";
    text: string;
    time: string;
}

export default function AiAsistanScreen() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);

    // API'den veri geliyor gibi simülasyon
    useEffect(() => {
        setTimeout(() => {
            setMessages([
                {
                    id: 1,
                    sender: "assistant",
                    text: "Merhaba! Ben sizin AI hukuk asistanınızım. Vakalarınız hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?",
                    time: "09:00",
                },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage: Message = {
            id: Date.now(),
            sender: "user",
            text: input,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");

        // Simüle AI cevabı
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: "assistant",
                    text: "Sorunuz alındı! Size hukuki süreç hakkında yardımcı oluyorum...",
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
            ]);
        }, 1200);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50">
            {/* Üst Kısım */}
            <div className="flex items-center gap-3 px-6 py-4 bg-white border-b">
                <Bot className="text-blue-900 w-7 h-7" />
                <div>
                    <h2 className="font-semibold text-gray-900 text-lg">AI Hukuk Asistanı</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Circle className="w-3 h-3 text-green-500 fill-green-500" />
                        <span>Çevrimiçi ve Hazır</span>
                    </div>
                </div>
            </div>

            {/* İçerik */}
            <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                    <div className="text-gray-500 text-center mt-10">Yükleniyor...</div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {/* Hoş geldiniz kartı */}
                        <div className="bg-white shadow-sm rounded-2xl p-6 flex gap-4 items-start">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Bot className="w-6 h-6 text-blue-900" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Hoş Geldiniz!</h3>
                                <p className="text-gray-500 text-sm mb-3">
                                    Size nasıl yardımcı olabilirim?
                                </p>
                                <div className="text-gray-700 text-sm space-y-2">
                                    <p>🟡 Hukuki sorularınızı yanıtlayabilirim</p>
                                    <p>🟡 Vaka analizi ve strateji önerisi</p>
                                    <p>🟡 Hukuki prosedürler hakkında rehberlik</p>
                                    <p>🟡 Döküman hazırlama desteği</p>
                                </div>
                            </div>
                        </div>

                        {/* Mesaj geçmişi */}
                        <div className="flex flex-col gap-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "assistant" ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`${msg.sender === "assistant"
                                                ? "bg-gray-200 text-gray-800"
                                                : "bg-blue-900 text-white"
                                            } px-4 py-3 rounded-2xl max-w-lg text-sm`}
                                    >
                                        {msg.text}
                                    </div>
                                    <span className="text-xs text-gray-400 self-end ml-2">{msg.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mesaj Yazma Alanı */}
            <div className="border-t bg-white p-4 flex items-center gap-3">
                <button className="bg-blue-900 text-white p-3 rounded-full hover:bg-blue-800">
                    <Paperclip size={20} />
                </button>
                <input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    className="bg-blue-900 text-white p-3 rounded-full hover:bg-blue-800"
                    onClick={handleSend}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}
