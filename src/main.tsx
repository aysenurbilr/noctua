import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext'; // <-- 1. EKLENEN SATIR (Yolun 'src/context' olduğunu varsayıyorum)
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider> {/* <-- 2. EKLENEN SATIR */}
      <App />
    </ThemeProvider> {/* <-- 3. EKLENEN SATIR */}
  </StrictMode>,
);