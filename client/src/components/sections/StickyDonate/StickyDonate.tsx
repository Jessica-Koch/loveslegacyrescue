import './StickyDonate.scss';
import { Link } from 'react-router-dom';

export default function StickyDonate() {
  return (
    <Link to="/donate" className="sticky-donate" aria-label="Donate">
      Donate
    </Link>
  );
}
