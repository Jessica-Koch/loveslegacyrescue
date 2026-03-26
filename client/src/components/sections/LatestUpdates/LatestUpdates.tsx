import './LatestUpdates.scss';
import { Link } from 'react-router-dom';

const updates = [
  {
    label: 'Newsletter',
    title: 'Stay in the Loop',
    description: 'Get the latest updates on our rescue dogs, events, and success stories delivered to your inbox.',
    to: '/about/news',
    cta: 'Read More',
  },
  {
    label: 'Events',
    title: 'Upcoming Events',
    description: 'Join us at adoption events, fundraisers, and community gatherings to support our mission.',
    to: '/about/events',
    cta: 'See Events',
  },
  {
    label: 'Happy Tails',
    title: 'Success Stories',
    description: 'Read heartwarming stories of dogs who found their forever homes through Love\'s Legacy Rescue.',
    to: '/adopt/happy-tails',
    cta: 'Read Stories',
  },
];

export default function LatestUpdates() {
  return (
    <section className="latest-updates">
      <div className="section-inner">
        <h2 className="section-heading">Latest Updates</h2>
        <div className="latest-updates__grid">
          {updates.map((item) => (
            <Link key={item.label} to={item.to} className="latest-updates__card">
              <span className="latest-updates__label">{item.label}</span>
              <h3 className="latest-updates__title">{item.title}</h3>
              <p className="latest-updates__desc">{item.description}</p>
              <span className="latest-updates__cta">{item.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
