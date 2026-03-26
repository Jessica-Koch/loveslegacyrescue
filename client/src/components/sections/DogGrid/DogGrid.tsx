import './DogGrid.scss';
import type { Dog } from '../../../types';
import Card from '../../atoms/Card/Card';

interface DogGridProps {
  dogs: Dog[];
  heading?: string;
  subheading?: string;
  onCardClick?: (dog: Dog) => void;
}

export default function DogGrid({ dogs, heading, subheading, onCardClick }: DogGridProps) {
  return (
    <section className="dogs-section">
      <div className="section-inner">
        {heading && <h2 className="section-heading">{heading}</h2>}
        {subheading && <p className="section-sub">{subheading}</p>}
        <div className="dog-grid">
          {dogs.map((dog) => (
            <Card key={dog.id} dog={dog} onClick={onCardClick} />
          ))}
        </div>
      </div>
    </section>
  );
}
