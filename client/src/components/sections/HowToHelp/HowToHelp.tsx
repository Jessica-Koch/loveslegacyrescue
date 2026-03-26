import './HowToHelp.scss';
import { Link } from 'react-router-dom';

const items = [
  {
    icon: '🐕',
    title: 'Adopt',
    description: 'Give a rescue dog their forever home. Browse our adoptable dogs and start the application process.',
    to: '/adopt/dogs',
    cta: 'Meet Our Dogs',
  },
  {
    icon: '❤️',
    title: 'Foster',
    description: 'Open your home temporarily to a dog in need. Fostering saves lives and helps dogs prepare for adoption.',
    to: '/foster',
    cta: 'Learn About Fostering',
  },
  {
    icon: '🎁',
    title: 'Donate',
    description: 'Your contribution helps cover veterinary care, food, transport, and other costs for our rescue dogs.',
    to: '/donate',
    cta: 'Make a Donation',
  },
];

export default function HowToHelp() {
  return (
    <section className="how-to-help">
      <div className="section-inner">
        <h2 className="section-heading">How You Can Help</h2>
        <div className="how-to-help__grid">
          {items.map((item) => (
            <Link key={item.title} to={item.to} className="how-to-help__card">
              <div className="how-to-help__icon">{item.icon}</div>
              <h3 className="how-to-help__title">{item.title}</h3>
              <p className="how-to-help__desc">{item.description}</p>
              <span className="how-to-help__cta">{item.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
