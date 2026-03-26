import './Dropdown.scss';
import { useState, useRef, useEffect, useId } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
}

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  id: idProp,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const listboxId = `${id}-listbox`;

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          onChange?.(options[focusedIndex].value);
          setIsOpen(false);
        } else {
          setIsOpen((o) => !o);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) { setIsOpen(true); break; }
        setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  }

  const triggerClasses = [
    'dropdown__trigger',
    isOpen && 'dropdown__trigger--open',
    disabled && 'dropdown__trigger--disabled',
    error && 'dropdown__trigger--error',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`dropdown${error ? ' dropdown--error' : ''}`} ref={containerRef}>
      {label && (
        <label className="dropdown__label" id={`${id}-label`}>
          {label}
        </label>
      )}
      <button
        type="button"
        id={id}
        className={triggerClasses}
        onClick={() => !disabled && setIsOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-controls={listboxId}
        disabled={disabled}
      >
        <span className={selected ? '' : 'dropdown__placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`dropdown__chevron${isOpen ? ' dropdown__chevron--open' : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          className="dropdown__list"
          aria-labelledby={label ? `${id}-label` : undefined}
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={[
                'dropdown__option',
                option.value === value && 'dropdown__option--selected',
                i === focusedIndex && 'dropdown__option--focused',
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() => setFocusedIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange?.(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="dropdown__error">{error}</p>}
    </div>
  );
}
