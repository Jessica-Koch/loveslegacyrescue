import './FeaturedDog.scss';
import { Link } from 'react-router-dom';
import { useDogs } from '../../../hooks/useDogs';

export default function FeaturedDog() {
  const { featuredDog } = useDogs();

  if (!featuredDog) return null;

  return (
    <section className="featured-section">
      <div className="section-inner">
        <h2 className="section-heading">Dog of the Week</h2>
        <div className="featured-dog">
          <div className="featured-photo">
            {featuredDog.photoUrls[0] ? (
              <img src={featuredDog.photoUrls[0]} alt={featuredDog.name} />
            ) : (
              <div className="card__no-photo">🐾</div>
            )}
          </div>
          <div className="featured-body">
            <h3>{featuredDog.name}</h3>
            <div className="card__meta">
              {featuredDog.breed && <span>{featuredDog.breed}</span>}
              {featuredDog.sex && <span>{featuredDog.sex}</span>}
            </div>
            <p>{featuredDog.description?.slice(0, 300).trim()}…</p>
            <Link to="/adopt/dogs" className="card__cta">
              Meet {featuredDog.name}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
