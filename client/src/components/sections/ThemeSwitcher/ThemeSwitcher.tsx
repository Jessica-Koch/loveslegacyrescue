import './ThemeSwitcher.scss';
import { useState, useEffect, useRef } from 'react';

const themes = [
  {
    id: 'default',
    label: 'Brand',
    colors: ['#6182b3', '#abcffe', '#fff7ad', '#4b548b'],
  },
  {
    id: 'golden-hour',
    label: 'Golden Hour',
    colors: ['#f4688c', '#7dcfaf', '#fdedf3', '#4b548b'],
  },
  {
    id: 'neo-brutalism',
    label: 'Neo-Brutalism',
    colors: ['#ff3d8f', '#ff6b35', '#4b7be5', '#a8e6cf'],
  },
  {
    id: 'playful-geometric',
    label: 'Playful Geometric',
    colors: ['#f0609e', '#f5ce22', '#8b6ac4', '#1c1712'],
  },
  {
    id: 'holographic',
    label: 'Holographic',
    colors: ['#f2b8ec', '#c8b8f2', '#b8f2e0', '#b8daf2'],
  },
  {
    id: 'dog-vision',
    label: 'Dog Vision',
    colors: ['#4a90d9', '#e8d44a', '#c8c4b8', '#89b4e4'],
  },
];

interface ThemeSwitcherProps {
  variant?: 'nav' | 'mobile';
}

export default function ThemeSwitcher({ variant = 'nav' }: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(() => {
    return (
      document.documentElement.getAttribute('data-theme') || 'neo-brutalism'
    );
  });

  useEffect(() => {
    const saved = localStorage.getItem('llr-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      setCurrent(saved);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function setTheme(themeId: string) {
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('llr-theme', themeId);
    setCurrent(themeId);
    setOpen(false);
  }

  if (variant === 'mobile') {
    return (
      <div className='theme-switcher theme-switcher--mobile'>
        <span className='theme-switcher__mobile-label'>Theme</span>
        <div className='theme-switcher__mobile-options'>
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-switcher__mobile-btn${current === theme.id ? ' theme-switcher__mobile-btn--active' : ''}`}
              onClick={() => setTheme(theme.id)}
              aria-label={theme.label}
              title={theme.label}
            >
              <span className='theme-switcher__swatches'>
                {theme.colors.map((color, i) => (
                  <span
                    key={i}
                    className='theme-switcher__swatch'
                    style={{ background: color }}
                  />
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className='theme-switcher theme-switcher--nav'
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className='nav-link theme-switcher__toggle'
        onClick={() => setOpen((o) => !o)}
        aria-label='Change color theme'
        aria-expanded={open}
      >
        🎨
      </button>

      {open && (
        <div className='theme-switcher__panel'>
          <span className='theme-switcher__title'>Theme</span>
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-switcher__option${current === theme.id ? ' theme-switcher__option--active' : ''}`}
              onClick={() => setTheme(theme.id)}
            >
              <span className='theme-switcher__swatches'>
                {theme.colors.map((color, i) => (
                  <span
                    key={i}
                    className='theme-switcher__swatch'
                    style={{ background: color }}
                  />
                ))}
              </span>
              <span className='theme-switcher__label'>{theme.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
