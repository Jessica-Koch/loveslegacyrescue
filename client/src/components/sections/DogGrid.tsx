import type { Dog } from '../../types';
import Card from '../atoms/Card';
import './DogGrid.scss';

interface DogGridProps {
  dogs: Dog[];
  heading?: string;
  subheading?: string;
}

export default function DogGrid({ dogs, heading, subheading }: DogGridProps) {
  return (
    <section className="dogs-section">
      <div className="section-inner">
        {heading && <h2 className="section-heading">{heading}</h2>}
        {subheading && <p className="section-sub">{subheading}</p>}
        <div className="dog-grid">
          {dogs.map((dog) => (
            <Card key={dog.id} dog={dog} />
          ))}
        </div>
      </div>
    </section>
  );
}
