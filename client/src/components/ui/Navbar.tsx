import { useState } from 'react';
import './Navbar.scss';

export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  variant?: 'default' | 'accent';
}

export interface NavbarProps {
  logo: React.ReactNode;
  items?: NavItem[];
}

export default function Navbar({ logo, items = [] }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo">{logo}</div>

        {/* Desktop nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {items.map((item, i) => (
            <NavLink key={i} item={item} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        {items.length > 0 && (
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="navbar__drawer" aria-label="Mobile navigation">
          {items.map((item, i) => (
            <NavLink key={i} item={item} onClick={() => setMenuOpen(false)} />
          ))}
        </nav>
      )}
    </header>
  );
}

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  const classes = [
    'navbar__link',
    item.active && 'navbar__link--active',
    item.variant === 'accent' && 'navbar__link--accent',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    item.onClick?.();
    onClick?.();
  };

  if (item.href) {
    return (
      <a href={item.href} className={classes} onClick={handleClick}>
        {item.label}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={handleClick}>
      {item.label}
    </button>
  );
}
