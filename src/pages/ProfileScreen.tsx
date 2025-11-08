import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Settings, LogOut, Award, BarChart2, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "Oca", puan: 1200 },
  { name: "Şub", puan: 1400 },
  { name: "Mar", puan: 1500 },
  { name: "Nis", puan: 1650 },
  { name: "May", puan: 1800 },
  { name: "Haz", puan: 2000 },
  { name: "Tem", puan: 1700 },
  { name: "Ağu", puan: 1550 },
  { name: "Eyl", puan: 1400 },
  { name: "Eki", puan: 1350 },
  { name: "Kas", puan: 1600 },
  { name: "Ara", puan: 1800 },
];

// 🧩 Avatar bilgileri
const avatars = [
  {
    id: 1,
    name: "Solon",
    description: "Atina'nın bilge kanun koyucusu ve demokratik reformcusu.",
    image: "/assets/avatar_1.png",
  },
  {
    id: 2,
    name: "Hammurabi",
    description: "Antik Mezopotamya'nın güçlü kralı ve kanun koyucusu.",
    image: "/assets/avatar_2.png",
  },
  {
    id: 3,
    name: "Cicero",
    description: "Romanın büyük katibi ve hukuk filozofudur.",
    image: "/assets/avatar_3.png",
  },
  {
    id: 4,
    name: "I. Justinianus",
    description: "Bizans İmparatoru ve Roma hukukunun derleyicisi.",
    image: "/assets/avatar_4.png",
  },
  {
    id: 5,
    name: "Hugo Grotius",
    description: "Uluslararası hukukun babası olarak anılan Hollandalı düşünür.",
    image: "/assets/avatar_5.png",
  },
  {
    id: 6,
    name: "Montesquieu",
    description: "Güçler ayrılığı ilkesinin savunucusu Fransız filozof.",
    image: "/assets/avatar_6.png",
  },
  {
    id: 7,
    name: "Cesare Beccaria",
    description: "Modern ceza hukukunun öncüsü İtalyan hukukçu.",
    image: "/assets/avatar_7.png",
  },
  {
    id: 8,
    name: "Friedrich Carl von Savigny",
    description: "Tarihi Hukuk Okulu'nun kurucusu Alman hukukçu.",
    image: "/assets/avatar_8.png",
  },
  {
    id: 9,
    name: "Ahmed Cevdet Paşa",
    description: "Osmanlı'nın önemli hukukçusu ve Mecelle'nin yazarı.",
    image: "/assets/avatar_9.png",
  },
  {
    id: 10,
    name: "Mahmut Esat Bozkurt",
    description: "Türkiye Cumhuriyeti'nin hukuk devrimlerinin mimarlarından.",
    image: "/assets/avatar_10.png",
  },
  {
    id: 11,
    name: "Lidia Poet",
    description: "Avrupanın ilk kadın avukatıdır.",
    image: "/assets/avatar_11.png",
  },
  {
    id: 12,
    name: "Arabella Mansfıeld",
    description: "ABD'de baroya kabul edilen ilk kadın avukat.",
    image: "/assets/avatar_12.png",
  },
  {
    id: 13,
    name: "Süreyya Ağaoğlu",
    description: "Türkiye'nin ilk kadın avukatı.",
    image: "/assets/avatar_13.png",
  },
  {
    id: 14,
    name: "Melahat Ruacan",
    description: "Türkiye'nin ilk kadın yargıtay üyesi.",
    image: "/assets/avatar_14.png",
  },
  {
    id: 15,
    name: "Suat Berk",
    description: "Turkiye Cumhuriyeti'nin ilk kadın hakimidir",
    image: "/assets/avatar_15.png",
  },

];

export default function ProfileScreen() {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showAvatarDetail, setShowAvatarDetail] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [tempAvatar, setTempAvatar] = useState<any>(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Sol panel */}
      <div className="flex flex-col gap-4 w-full lg:w-1/4">
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center">
            {/* 🧠 Avatar */}
            <div
              className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition"
              onClick={() => setShowAvatarModal(true)}
            >
              <img src={selectedAvatar.image} alt="avatar" className="object-cover w-full h-full" />
            </div>

            <h2 className="text-lg font-semibold">Avukat Kullanıcı</h2>
            <p className="text-gray-500 text-sm">avukat@example.com</p>
          </div>

          <div className="flex justify-around mt-6 text-sm border-t pt-4">
            <div>
              <p className="font-semibold">5.</p>
              <p className="text-gray-500">Sıralama</p>
            </div>
            <div>
              <p className="font-semibold">2,450</p>
              <p className="text-gray-500">Toplam Puan</p>
            </div>
            <div>
              <p className="font-semibold">12</p>
              <p className="text-gray-500">Vaka</p>
            </div>
          </div>
        </Card>

        <Card className="p-0">
          <Link
            to="/settings"
            className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <Settings className="w-5 h-5 text-gray-700" />
            <p className="font-medium">Ayarlar</p>
          </Link>
        </Card>

        <Card className="p-0">
          <div
            className="flex items-center gap-2 p-4 cursor-pointer hover:bg-red-100 transition"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut className="w-5 h-5 text-red-600" />
            <p className="text-red-600 font-medium">Çıkış Yap</p>
          </div>
        </Card>
      </div>

      {/* Sağ panel */}
      <div className="flex flex-col gap-6 w-full lg:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="flex items-center gap-3 p-4">
            <Award className="w-6 h-6 text-indigo-600 bg-indigo-100 rounded p-1" />
            <div>
              <p className="text-lg font-semibold">12</p>
              <p className="text-gray-500 text-sm">Tamamlanan Vaka</p>
            </div>
          </Card>

          <Card className="flex items-center gap-3 p-4">
            <BarChart2 className="w-6 h-6 text-green-600 bg-green-100 rounded p-1" />
            <div>
              <p className="text-lg font-semibold">89%</p>
              <p className="text-gray-500 text-sm">Başarı Oranı</p>
            </div>
          </Card>

          <Card className="flex items-center gap-3 p-4">
            <Award className="w-6 h-6 text-purple-600 bg-purple-100 rounded p-1" />
            <div>
              <p className="text-lg font-semibold">245</p>
              <p className="text-gray-500 text-sm">En Yüksek Puan</p>
            </div>
          </Card>

          <Card className="flex items-center gap-3 p-4">
            <Clock className="w-6 h-6 text-orange-600 bg-orange-100 rounded p-1" />
            <div>
              <p className="text-lg font-semibold">24 saat</p>
              <p className="text-gray-500 text-sm">Toplam Süre</p>
            </div>
          </Card>
        </div>

        {/* Grafik */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">İlerleme Grafiği</h3>
          <CardContent>
            <div className="w-full h-74">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="puan" stroke="#1E3A8A" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Avatar Seçim Modalı */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-3xl text-center">
            <h2 className="text-xl font-semibold mb-4">Avatar Seçimi</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  onClick={() => {
                    setTempAvatar(avatar);
                    setShowAvatarDetail(true);
                  }}
                  className={`cursor-pointer flex flex-col items-center hover:scale-105 transition-transform ${selectedAvatar.id === avatar.id ? "opacity-100" : "opacity-90"
                    }`}
                >
                  <img
                    src={avatar.image}
                    alt={avatar.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-transparent hover:border-indigo-500"
                  />
                  <p className="text-sm mt-1 font-semibold text-gray-700">{avatar.name}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAvatarModal(false)}
              className="mt-6 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Avatar Detay Modalı */}
      {showAvatarDetail && tempAvatar && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <img
              src={tempAvatar.image}
              alt="Seçilen Avatar"
              className="w-28 h-28 mx-auto rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">{tempAvatar.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{tempAvatar.description}</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setSelectedAvatar(tempAvatar);
                  setShowAvatarDetail(false);
                  setShowAvatarModal(false);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Seç
              </button>
              <button
                onClick={() => setShowAvatarDetail(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Geri Dön
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Çıkış Onay Modalı */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Çıkış yapmak istediğine emin misin?</h2>
            <div className="flex justify-around">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Evet
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
