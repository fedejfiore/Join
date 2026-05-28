import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) { document.documentElement.classList.add('dark'); } 
    else { document.documentElement.classList.remove('dark'); }
  }, [darkMode]);

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}