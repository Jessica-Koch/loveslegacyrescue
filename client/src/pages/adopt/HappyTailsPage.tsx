import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/sections/PageHeader/PageHeader';
import './HappyTailsPage.scss';

interface AdoptedDog {
  Name?: string;
  CoverPhoto?: string;
  Photos?: string[];
  Age?: number;
  Sex?: string;
}

interface ApiResponse {
  success: boolean;
  dogs: AdoptedDog[];
}

function formatAge(ageMonths: number | undefined | null): string {
  if (ageMonths === undefined || ageMonths === null) return 'Unknown';
  const years = Math.floor(ageMonths / 12);
  const months = ageMonths % 12;
  if (years > 0 && months > 0) return `${years}y ${months}m`;
  if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
  return `${months} month${months !== 1 ? 's' : ''}`;
}

export const HappyTailsPage = () => {
  const [dogs, setDogs] = useState<AdoptedDog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://willowy-toffee-908bc8.netlify.app/.netlify/functions/get-dogs')
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (!data.success) {
          setError(true);
        } else {
          setDogs([...data.dogs].reverse());
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        heading="Love's Legacy Lives On"
        subheading="Celebrating our adopted dogs and their new families"
      />

      <section className="happy-tails">
        <div className="happy-tails__inner">
          {loading && <p className="happy-tails__message">Loading...</p>}
          {error && (
            <p className="happy-tails__message">Error loading dogs. Please try again later.</p>
          )}
          {!loading && !error && dogs.length === 0 && (
            <p className="happy-tails__message">No dogs to display at this time.</p>
          )}
          {!loading && !error && dogs.length > 0 && (
            <div className="happy-tails__grid">
              {dogs.map((dog, i) => {
                const photo = dog.CoverPhoto || dog.Photos?.[0] || '';
                return (
                  <article key={i} className="happy-tails__card">
                    {photo && (
                      <img
                        className="happy-tails__img"
                        src={photo}
                        alt={dog.Name || 'Adopted dog'}
                        loading="lazy"
                      />
                    )}
                    <div className="happy-tails__overlay">
                      <div className="happy-tails__name">{dog.Name || 'Unknown'}</div>
                      <hr className="happy-tails__divider" />
                      <div className="happy-tails__details">
                        <span>{formatAge(dog.Age)}</span>
                        <span>{dog.Sex || 'Unknown'}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
