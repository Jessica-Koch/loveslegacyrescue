import './FontSwitcher.scss';
import { useState, useEffect, useRef } from 'react';

interface FontPairing {
  id: string;
  label: string;
  display: string;
  heading: string;
  body: string;
}

const pairings: FontPairing[] = [
  {
    id: 'current',
    label: 'Current',
    display: "'Josefin Sans', system-ui, sans-serif",
    heading: "'Jost', system-ui, sans-serif",
    body: "'Jost', system-ui, sans-serif",
  },

  // ── Fredoka — rounded, bubbly, modern brand energy ─────
  {
    id: 'fredoka-quicksand-dm',
    label: 'Fredoka / Quicksand / DM Sans',
    display: "'Fredoka', sans-serif",
    heading: "'Quicksand', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  {
    id: 'fredoka-sora-outfit',
    label: 'Fredoka / Sora / Outfit',
    display: "'Fredoka', sans-serif",
    heading: "'Sora', sans-serif",
    body: "'Outfit', sans-serif",
  },

  // ── Lilita One — ultra chunky, bold, friendly ──────────
  {
    id: 'lilita-raleway-outfit',
    label: 'Lilita One / Raleway / Outfit',
    display: "'Lilita One', sans-serif",
    heading: "'Raleway', sans-serif",
    body: "'Outfit', sans-serif",
  },
  {
    id: 'lilita-montserrat-dm',
    label: 'Lilita One / Montserrat / DM Sans',
    display: "'Lilita One', sans-serif",
    heading: "'Montserrat', sans-serif",
    body: "'DM Sans', sans-serif",
  },

  // ── Grandstander — playful handwritten, variable ───────
  {
    id: 'grandstander-comfortaa-quicksand',
    label: 'Grandstander / Comfortaa / Quicksand',
    display: "'Grandstander', cursive",
    heading: "'Comfortaa', sans-serif",
    body: "'Quicksand', sans-serif",
  },
  {
    id: 'grandstander-poppins-dm',
    label: 'Grandstander / Poppins / DM Sans',
    display: "'Grandstander', cursive",
    heading: "'Poppins', sans-serif",
    body: "'DM Sans', sans-serif",
  },

  // ── Bagel Fat One — ultra bubbly, fat, maximalist ──────
  {
    id: 'bagel-quicksand-outfit',
    label: 'Bagel Fat One / Quicksand / Outfit',
    display: "'Bagel Fat One', cursive",
    heading: "'Quicksand', sans-serif",
    body: "'Outfit', sans-serif",
  },
  {
    id: 'bagel-sora-dm',
    label: 'Bagel Fat One / Sora / DM Sans',
    display: "'Bagel Fat One', cursive",
    heading: "'Sora', sans-serif",
    body: "'DM Sans', sans-serif",
  },

  // ── Shrikhand — thick, punchy, Indian-inspired serif ───
  {
    id: 'shrikhand-raleway-quicksand',
    label: 'Shrikhand / Raleway / Quicksand',
    display: "'Shrikhand', serif",
    heading: "'Raleway', sans-serif",
    body: "'Quicksand', sans-serif",
  },

  // ── Fraunces Black — wonky variable serif at max wght ──
  {
    id: 'fraunces-montserrat-outfit',
    label: 'Fraunces / Montserrat / Outfit',
    display: "'Fraunces', serif",
    heading: "'Montserrat', sans-serif",
    body: "'Outfit', sans-serif",
  },

  // ── Rubik 900 — chunky geometric, modern ──────────────
  {
    id: 'rubik-poppins-dm',
    label: 'Rubik / Poppins / DM Sans',
    display: "'Rubik', sans-serif",
    heading: "'Poppins', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  {
    id: 'rubik-comfortaa-outfit',
    label: 'Rubik / Comfortaa / Outfit',
    display: "'Rubik', sans-serif",
    heading: "'Comfortaa', sans-serif",
    body: "'Outfit', sans-serif",
  },
];

export default function FontSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('current');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('llr-font-pairing');
    if (saved) {
      const pairing = pairings.find((p) => p.id === saved);
      if (pairing) {
        applyPairing(pairing);
        setCurrent(saved);
      }
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

  function applyPairing(pairing: FontPairing) {
    const root = document.documentElement;
    root.style.setProperty('--font-family-display', pairing.display);
    root.style.setProperty('--font-family-heading', pairing.heading);
    root.style.setProperty('--font-family', pairing.body);
  }

  function selectPairing(pairing: FontPairing) {
    applyPairing(pairing);
    localStorage.setItem('llr-font-pairing', pairing.id);
    setCurrent(pairing.id);
    setOpen(false);
  }

  const activePairing = pairings.find((p) => p.id === current) || pairings[0];

  return (
    <div
      className='font-switcher'
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className='nav-link font-switcher__toggle'
        onClick={() => setOpen((o) => !o)}
        aria-label='Change font pairing'
        aria-expanded={open}
      >
        Aa
      </button>

      {open && (
        <div className='font-switcher__panel'>
          <span className='font-switcher__title'>Font Pairing</span>
          {pairings.map((pairing) => (
            <button
              key={pairing.id}
              className={`font-switcher__option${current === pairing.id ? ' font-switcher__option--active' : ''}`}
              onClick={() => selectPairing(pairing)}
            >
              <span className='font-switcher__preview'>
                <span
                  className='font-switcher__preview-display'
                  style={{ fontFamily: pairing.display, fontWeight: 900 }}
                >
                  Display
                </span>
                <span
                  className='font-switcher__preview-heading'
                  style={{ fontFamily: pairing.heading }}
                >
                  Heading
                </span>
                <span
                  className='font-switcher__preview-body'
                  style={{ fontFamily: pairing.body }}
                >
                  Body text
                </span>
              </span>
              <span className='font-switcher__label'>{pairing.label}</span>
            </button>
          ))}

          <div className='font-switcher__active-info'>
            <span className='font-switcher__info-label'>Active:</span>
            <span
              className='font-switcher__info-sample font-switcher__info-sample--display'
              style={{ fontFamily: activePairing.display, fontWeight: 900 }}
            >
              Love&apos;s Legacy Rescue
            </span>
            <span
              className='font-switcher__info-sample'
              style={{ fontFamily: activePairing.heading, fontWeight: 600 }}
            >
              Adopt a dog today
            </span>
            <span
              className='font-switcher__info-sample'
              style={{ fontFamily: activePairing.body }}
            >
              Pack my box with five dozen liquor jugs.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
