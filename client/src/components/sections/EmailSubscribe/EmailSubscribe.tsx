import './EmailSubscribe.scss';
import { useState } from 'react';

export default function EmailSubscribe() {
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder — integration with email service coming soon
    setEmail('');
  }

  return (
    <section className="email-subscribe">
      <div className="section-inner">
        <div className="email-subscribe__content">
          <h2 className="email-subscribe__title">Stay Connected</h2>
          <p className="email-subscribe__desc">
            Subscribe to our newsletter for updates on adoptable dogs, events, and rescue stories.
          </p>
          <form className="email-subscribe__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="email-subscribe__input"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit" className="email-subscribe__btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
