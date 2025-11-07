
import styles from './SettingsPage.module.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiAtSign, FiMail, FiPhone, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
const SettingsPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    return (
        <div className={styles.settingsContainer}>
            {/* 1. Başlık ve Geri Butonu */}
            <div className={styles.settingsHeader}>

                <a href="#" className={styles.backButton}>
                    <IoArrowBack size={24} />
                </a>
                <div>
                    <h1 className={styles.title}>Ayarlar</h1>
                    <p className={styles.subtitle}>Profil ve tema ayarları</p>
                </div>
            </div>

            {/* 2. Ana İçerik Alanı (2 Sütunlu) */}
            <div className={styles.settingsContent}>

                {/* SOL SÜTUN: Profil Bilgileri */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Profil Bilgileri</h3>
                    <form>
                        <div className={styles.inputGroup}>
                            <label htmlFor="fullName"><FaRegUserCircle /> Ad Soyad</label>
                            <input type="text" id="fullName" placeholder="Avukat Kullanıcı" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username"><FiAtSign /> Kullanıcı Adı</label>
                            <input type="text" id="username" placeholder="ornek_kullanici" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email"><FiMail /> E-posta</label>
                            <input type="email" id="email" placeholder="avukat@example.com" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="phone"><FiPhone /> Telefon</label>
                            <input type="tel" id="phone" placeholder="+90 555 123 4567" />
                        </div>
                        <button type="submit" className={styles.saveButton}>
                            Değişiklikleri Kaydet
                        </button>
                    </form>
                </div>
                {/* SAĞ SÜTUN: Görünüm ve Hakkında */}
                <div className={styles.sidebar}>
                    {/* Görünüm Kartı */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Görünüm</h3>
                        <div className={styles.toggleRow}>
                            {/* Not: İkonu da tema değişimine göre değiştirebiliriz! */}
                            <FiSun size={20} className={styles.toggleIcon} />
                            <div className={styles.toggleText}>
                                <strong>Koyu Tema</strong>
                                <span>{isDarkMode ? 'Açık' : 'Kapalı'}</span>
                            </div>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={isDarkMode} // <-- Artık global state'i okuyor
                                    onChange={toggleTheme}  // <-- Artık global fonksiyonu çağırıyor
                                />
                                <span className={`${styles.slider} ${styles.round}`}></span>
                            </label>
                        </div>
                        <p className={styles.cardDescription}>
                            Koyu tema, gözlerinizi yorar ve bataryadan tasarruf sağlar.
                        </p>
                    </div>

                    {/* Hakkında Kartı */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Hakkında</h3>
                        <div className={styles.aboutRow}>
                            <span>Versiyon</span>
                            <strong>1.0.0</strong>
                        </div>
                        <div className={styles.aboutRow}>
                            <span>Son Güncelleme</span>
                            <strong>14 Ekim 2025</strong>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SettingsPage;