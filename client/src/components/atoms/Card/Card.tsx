import './Card.scss';
import type { Dog } from '../../../types';

function formatAge(ageMonths: string | null): string {
  if (!ageMonths) return '';
  const months = parseInt(ageMonths, 10);
  if (isNaN(months)) return '';
  if (months < 12) return `${months}mo`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years}yr`;
  return `${years}yr ${rem}mo`;
}

interface CardProps {
  dog: Dog;
  onClick?: (dog: Dog) => void;
}

export default function Card({ dog, onClick }: CardProps) {
  const photo = dog.photoUrls[0];
  const age = formatAge(dog.age);
  const needsFoster = !dog.inFoster;

  const handleClick = () => onClick?.(dog);
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(dog);
    }
  };

  return (
    <article
      className={`card${needsFoster ? ' card--needs-foster' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${dog.name}${dog.breed ? `, ${dog.breed}` : ''}`}
    >
      {needsFoster && (
        <div className="card__foster-badge" aria-label="This dog needs a foster home">
          Needs Foster
        </div>
      )}

      {photo ? (
        <img className="card__image" src={photo} alt={`Photo of ${dog.name}`} loading="lazy" />
      ) : (
        <div className="card__no-photo">🐾</div>
      )}

      <div className="card__content">
        <h2 className="card__name">{dog.name}</h2>
        {dog.breed && <div className="card__breed">{dog.breed}</div>}

        <div className="card__info-row">
          {age && <span className="card__info-badge">{age}</span>}
          {dog.sex && <span className="card__info-badge">{dog.sex}</span>}
          {dog.color && <span className="card__info-badge">{dog.color}</span>}
        </div>

        {dog.description && (
          <p className="card__description">{dog.description}</p>
        )}

        {dog.inFoster && (
          <div className="card__status-row">
            <span className="card__in-foster-tag">In Foster</span>
          </div>
        )}
      </div>
    </article>
  );
}
