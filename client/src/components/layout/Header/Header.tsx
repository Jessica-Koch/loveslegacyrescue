import './Header.scss';
import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeSwitcher from '../../sections/ThemeSwitcher/ThemeSwitcher';
import FontSwitcher from '../../sections/FontSwitcher/FontSwitcher';

interface DropdownItem {
  label: string;
  to: string;
}

interface NavDropdownProps {
  label: string;
  basePath: string;
  items: DropdownItem[];
  onNavigate?: () => void;
}

function NavDropdown({ label, basePath, items, onNavigate }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = location.pathname.startsWith(basePath);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className='header-dropdown'
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`nav-link${isActive ? ' active' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup='true'
      >
        {label}
        <span className='nav-link__chevron' aria-hidden='true' />
      </button>
      {open && (
        <div className='header-dropdown__menu' role='menu'>
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive: active }) =>
                `header-dropdown__item${active ? ' header-dropdown__item--active' : ''}`
              }
              role='menuitem'
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

const adoptItems: DropdownItem[] = [
  { label: 'Adoptable Dogs', to: '/adopt/dogs' },
  { label: 'Application Process', to: '/adopt/apply' },
  { label: 'Happy Tails', to: '/adopt/happy-tails' },
];

const aboutItems: DropdownItem[] = [
  { label: 'Meet the Team', to: '/about' },
  { label: 'Events', to: '/about/events' },
  { label: 'News', to: '/about/news' },
  { label: 'Resources', to: '/about/resources' },
  { label: 'Partners', to: '/about/partners' },
  { label: 'Contact Us', to: '/about/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  function toggleMobileSection(section: string) {
    setMobileExpanded((prev) => (prev === section ? null : section));
  }

  return (
    <header className='header'>
      <div className='header-inner'>
        <Link to='/' className='logoUrl'>
          <div className='logo' />
        </Link>

        {/* Desktop nav */}
        <nav className='header-nav' aria-label='Main navigation'>
          <NavDropdown label='Adopt' basePath='/adopt' items={adoptItems} />
          <NavLink
            to='/foster'
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Foster
          </NavLink>
          <NavDropdown label='About' basePath='/about' items={aboutItems} />

          <div className='header-nav__quick'>
            <NavLink to='/adopt/dogs' className='nav-link nav-link--quick'>
              Available Dogs
            </NavLink>
            <NavLink to='/donate' className='nav-link nav-link--donate'>
              Donate
            </NavLink>
            <FontSwitcher />
            <ThemeSwitcher variant='nav' />
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`header-hamburger${menuOpen ? ' header-hamburger--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className='header-drawer' aria-label='Mobile navigation'>
          <div className='header-drawer__section'>
            <button
              className='header-drawer__trigger'
              onClick={() => toggleMobileSection('adopt')}
              aria-expanded={mobileExpanded === 'adopt'}
            >
              Adopt
              <span className='header-drawer__chevron' aria-hidden='true' />
            </button>
            {mobileExpanded === 'adopt' && (
              <div className='header-drawer__items'>
                {adoptItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className='header-drawer__link'
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink to='/foster' className='header-drawer__trigger'>
            Foster
          </NavLink>

          <div className='header-drawer__section'>
            <button
              className='header-drawer__trigger'
              onClick={() => toggleMobileSection('about')}
              aria-expanded={mobileExpanded === 'about'}
            >
              About
              <span className='header-drawer__chevron' aria-hidden='true' />
            </button>
            {mobileExpanded === 'about' && (
              <div className='header-drawer__items'>
                {aboutItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className='header-drawer__link'
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <div className='header-drawer__quick'>
            <NavLink
              to='/adopt/dogs'
              className='header-drawer__link header-drawer__link--quick'
            >
              Available Dogs
            </NavLink>
            <NavLink
              to='/donate'
              className='header-drawer__link header-drawer__link--donate'
            >
              Donate
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
