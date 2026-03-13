interface HeaderProps {
  view: 'dogs' | 'admin';
  onViewChange: (view: 'dogs' | 'admin') => void;
}

export default function Header({ view, onViewChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-text">Love's Legacy Rescue</span>
          <span className="logo-paw">🐾</span>
        </div>
        <nav className="nav">
          <button
            className={`nav-link ${view === 'dogs' ? 'active' : ''}`}
            onClick={() => onViewChange('dogs')}
          >
            Adopt
          </button>
          <a href="https://www.loveslegacyrescue.com/foster" className="nav-link" target="_blank" rel="noreferrer">
            Foster
          </a>
          <a href="https://www.loveslegacyrescue.com/donate" className="nav-link" target="_blank" rel="noreferrer">
            Donate
          </a>
          <button
            className={`nav-link admin-link ${view === 'admin' ? 'active' : ''}`}
            onClick={() => onViewChange('admin')}
          >
            Admin
          </button>
        </nav>
      </div>
    </header>
  );
}
