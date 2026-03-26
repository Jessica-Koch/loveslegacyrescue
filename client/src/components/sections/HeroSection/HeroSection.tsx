import './HeroSection.scss';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaTo: string;
}

export default function HeroSection({ heading, subheading, ctaText, ctaTo }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{heading}</h1>
        <p>{subheading}</p>
        <Link to={ctaTo} className="hero-cta">
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
