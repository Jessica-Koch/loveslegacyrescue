import './Card.scss';
import type { Dog } from '../../types';

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

interface CardProps {
  dog: Dog;
}

export default function Card({ dog }: CardProps) {
  const photo = dog.photoUrls[0];
  const age = formatAge(dog.age);

  return (
    <article className="card">
      <div className="card__photo">
        {photo ? (
          <img src={photo} alt={dog.name} loading="lazy" />
        ) : (
          <div className="card__no-photo">🐾</div>
        )}
        {dog.featured && <span className="card__badge card__badge--featured">Featured</span>}
        {dog.inFoster && <span className="card__badge card__badge--foster">In Foster</span>}
      </div>
      <div className="card__body">
        <h2 className="card__name">{dog.name}</h2>
        <div className="card__meta">
          {dog.breed && <span>{dog.breed}</span>}
          {dog.sex && <span>{dog.sex}</span>}
          {age && <span>{age}</span>}
        </div>
        {dog.description && (
          <p className="card__description">{dog.description.slice(0, 140).trim()}…</p>
        )}
        <a
          href="https://www.loveslegacyrescue.com/adopt"
          target="_blank"
          rel="noreferrer"
          className="card__cta"
        >
          Meet {dog.name}
        </a>
      </div>
    </article>
  );
}
