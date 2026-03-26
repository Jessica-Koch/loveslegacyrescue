import { useEffect } from 'react';
import './DogModal.scss';
import type { Dog } from '../../../types';

function formatAge(ageMonths: string | null): string {
  if (!ageMonths) return 'Unknown';
  const months = parseInt(ageMonths, 10);
  if (isNaN(months)) return 'Unknown';
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years}yr ${rem}mo`;
}

interface DogModalProps {
  dog: Dog | null;
  onClose: () => void;
}

export default function DogModal({ dog, onClose }: DogModalProps) {
  useEffect(() => {
    if (!dog) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [dog, onClose]);

  if (!dog) return null;

  const age = formatAge(dog.age);
  const photos = dog.photoUrls;
  const needsFoster = !dog.inFoster;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const infoItems = [
    { label: 'Age', value: age },
    { label: 'Sex', value: dog.sex || 'Unknown' },
    { label: 'Color', value: dog.color || 'Unknown' },
    { label: 'Status', value: dog.inFoster ? 'In Foster' : (dog.status || 'Available') },
  ];

  return (
    <div
      className="dog-modal"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal
      aria-label={`${dog.name} details`}
    >
      <div className="dog-modal__content">
        <button className="dog-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="dog-modal__header">
          {needsFoster && (
            <div className="dog-modal__foster-badge">Needs Foster</div>
          )}

          <div className="dog-modal__scroll">
            {photos.length > 1 ? (
              <div className="dog-modal__masonry">
                {photos.slice(0, 6).map((url, i) => (
                  <div key={i} className="dog-modal__masonry-item">
                    <img
                      className="dog-modal__masonry-img"
                      src={url}
                      alt={`Photo of ${dog.name}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : photos.length === 1 ? (
              <img
                className="dog-modal__single-img"
                src={photos[0]}
                alt={`Photo of ${dog.name}`}
              />
            ) : (
              <div className="dog-modal__no-photo">🐾</div>
            )}
          </div>

          <div className="dog-modal__header-overlay">
            <h2 className="dog-modal__name">{dog.name}</h2>
            {dog.breed && <div className="dog-modal__breed">{dog.breed}</div>}
          </div>
        </div>

        <div className="dog-modal__body">
          <div className="dog-modal__info-grid">
            {infoItems.map(({ label, value }) => (
              <div key={label} className="dog-modal__info-item">
                <div className="dog-modal__info-content">
                  <div className="dog-modal__info-label">{label}</div>
                  <div className="dog-modal__info-value">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {dog.description && (
            <div className="dog-modal__section">
              <h3 className="dog-modal__section-title">About {dog.name}</h3>
              <p className="dog-modal__description">{dog.description}</p>
            </div>
          )}
        </div>

        <div className="dog-modal__actions">
          {needsFoster && (
            <a
              href="https://www.loveslegacyrescue.com/foster"
              target="_blank"
              rel="noreferrer"
              className="dog-modal__btn dog-modal__btn--foster"
            >
              Apply to Foster
            </a>
          )}
          <a
            href="https://www.loveslegacyrescue.com/adopt"
            target="_blank"
            rel="noreferrer"
            className="dog-modal__btn dog-modal__btn--adopt"
          >
            Apply to Adopt
          </a>
          <a
            href="https://www.loveslegacyrescue.com/donate"
            target="_blank"
            rel="noreferrer"
            className="dog-modal__btn dog-modal__btn--donate"
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  );
}
