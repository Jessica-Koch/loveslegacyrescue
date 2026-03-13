import type { Dog } from '../types';

function formatAge(ageMonths: string | null): string {
  if (!ageMonths) return '';
  const months = parseInt(ageMonths, 10);
  if (isNaN(months)) return '';
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${months}mo`;
  if (rem === 0) return `${years}yr`;
  return `${years}yr ${rem}mo`;
}

interface DogCardProps {
  dog: Dog;
}

export default function DogCard({ dog }: DogCardProps) {
  const photo = dog.photoUrls[0];
  const age = formatAge(dog.age);

  return (
    <article className="dog-card">
      <div className="dog-card-photo">
        {photo ? (
          <img src={photo} alt={dog.name} loading="lazy" />
        ) : (
          <div className="dog-card-no-photo">🐾</div>
        )}
        {dog.featured && <span className="featured-badge">Featured</span>}
        {dog.inFoster && <span className="foster-badge">In Foster</span>}
      </div>
      <div className="dog-card-body">
        <h2 className="dog-name">{dog.name}</h2>
        <div className="dog-meta">
          {dog.breed && <span>{dog.breed}</span>}
          {dog.sex && <span>{dog.sex}</span>}
          {age && <span>{age}</span>}
        </div>
        {dog.description && (
          <p className="dog-description">{dog.description.slice(0, 140).trim()}…</p>
        )}
        <a
          href={`https://www.loveslegacyrescue.com/adopt`}
          target="_blank"
          rel="noreferrer"
          className="dog-cta"
        >
          Meet {dog.name}
        </a>
      </div>
    </article>
  );
}
