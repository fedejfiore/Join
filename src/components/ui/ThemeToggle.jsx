import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('joinTheme');
    const isDark = saved !== null ? saved === 'dark' : true;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('joinTheme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      style={{ color: 'var(--nav-icon)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.75rem', transition: 'color 0.2s, background 0.2s', display: 'flex', alignItems: 'center' }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--nav-text-hover)'; e.currentTarget.style.background = 'rgba(128,128,128,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--nav-icon)'; e.currentTarget.style.background = 'transparent'; }}
      aria-label="Cambiar tema"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
