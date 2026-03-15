import type { Dog } from '../types';
import Card from './ui/Card';

interface DogsPageProps {
  dogs: Dog[];
  loading: boolean;
}

export default function DogsPage({ dogs, loading }: DogsPageProps) {
  const featured = dogs.find((d) => d.featured);

  if (loading) {
    return <div className="loading">Loading dogs…</div>;
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1>Give a dog a second chance.</h1>
          <p>Love's Legacy Rescue saves huskies, shepherds, and dogs in need across Southern California.</p>
          <a href="https://www.loveslegacyrescue.com/adopt" target="_blank" rel="noreferrer" className="hero-cta">
            Start Here
          </a>
        </div>
      </section>

      {featured && (
        <section className="featured-section">
          <div className="section-inner">
            <h2 className="section-heading">Dog of the Week</h2>
            <div className="featured-dog">
              <div className="featured-photo">
                {featured.photoUrls[0] ? (
                  <img src={featured.photoUrls[0]} alt={featured.name} />
                ) : (
                  <div className="card__no-photo">🐾</div>
                )}
              </div>
              <div className="featured-body">
                <h3>{featured.name}</h3>
                <div className="card__meta">
                  {featured.breed && <span>{featured.breed}</span>}
                  {featured.sex && <span>{featured.sex}</span>}
                </div>
                <p>{featured.description?.slice(0, 300).trim()}…</p>
                <a
                  href="https://www.loveslegacyrescue.com/adopt"
                  target="_blank"
                  rel="noreferrer"
                  className="card__cta"
                >
                  Meet {featured.name}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="dogs-section">
        <div className="section-inner">
          <h2 className="section-heading">Adoptable Dogs</h2>
          <p className="section-sub">{dogs.length} dogs looking for their forever home</p>
          <div className="dog-grid">
            {dogs.map((dog) => (
              <Card key={dog.id} dog={dog} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
