import './StickyDonate.scss';
import { Link } from 'react-router-dom';

export const StickyDonate = () => {
  return (
    <Link to="/donate" className="sticky-donate" aria-label="Donate">
      Donate
    </Link>
  );
}
