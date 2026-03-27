import { useEffect, useRef, useState } from 'react';
import './BubblyButton.scss';

export interface BubblyButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const BubblyButton = ({
  onClick,
  children,
  'aria-label': ariaLabel,
}: BubblyButtonProps) => {
  const [animate, setAnimate] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setAnimate(true);
    onClick?.();
    timerRef.current = setTimeout(() => setAnimate(false), 700);
  };

  return (
    <div className={`bubbly-btn${animate ? ' bubbly-btn--animate' : ''}`}>
      <button
        type="button"
        className="bubbly-btn__button"
        onClick={handleClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    </div>
  );
};
