import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <span className="not-found__icon">🐾</span>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="not-found__link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
