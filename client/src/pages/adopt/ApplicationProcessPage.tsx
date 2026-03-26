import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/sections/PageHeader/PageHeader';

const faqs = [
  {
    q: 'How long does the adoption process take?',
    a: 'The process typically takes 1-2 weeks from application to adoption, depending on the dog and home check scheduling.',
  },
  {
    q: 'What is included in the adoption fee?',
    a: 'All dogs are spayed/neutered, microchipped, up-to-date on vaccinations, and have received any necessary medical treatment.',
  },
  {
    q: 'Do you do home checks?',
    a: 'Yes, we conduct home checks (virtual or in-person) to ensure the environment is safe and suitable for the dog.',
  },
  {
    q: 'Can I adopt if I rent my home?',
    a: 'Yes! We just need written landlord approval confirming pets are allowed and any breed/size restrictions.',
  },
  {
    q: 'What if the adoption doesn\'t work out?',
    a: 'We have a return policy — if for any reason the adoption doesn\'t work out, we will take the dog back. We want the best outcome for both the dog and the adopter.',
  },
];

export default function ApplicationProcessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        heading="Adoption Application"
        subheading="Ready to welcome a rescue dog into your family? Start your application today."
      />

      <section className="apply-cta">
        <div className="section-inner">
          <a
            href="https://www.shelterluv.com/matchme/adopt/LLR/Dog"
            target="_blank"
            rel="noreferrer"
            className="apply-cta__btn"
          >
            Start Your Application
          </a>
        </div>
      </section>

      <section className="apply-steps">
        <div className="section-inner">
          <h2 className="section-heading">How It Works</h2>
          <div className="apply-steps__grid">
            <div className="apply-steps__step">
              <span className="apply-steps__num">1</span>
              <h3>Apply</h3>
              <p>Fill out our online adoption application. We'll review it within 48 hours.</p>
            </div>
            <div className="apply-steps__step">
              <span className="apply-steps__num">2</span>
              <h3>Meet & Greet</h3>
              <p>We'll schedule a meet and greet with the dog so you can get to know each other.</p>
            </div>
            <div className="apply-steps__step">
              <span className="apply-steps__num">3</span>
              <h3>Home Check</h3>
              <p>A quick home check ensures your space is safe and ready for your new family member.</p>
            </div>
            <div className="apply-steps__step">
              <span className="apply-steps__num">4</span>
              <h3>Welcome Home</h3>
              <p>Once approved, finalize the adoption fee and welcome your new dog home!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="apply-faq">
        <div className="section-inner">
          <h2 className="section-heading">Adoption FAQ</h2>
          <div className="apply-faq__list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`apply-faq__item${openFaq === i ? ' apply-faq__item--open' : ''}`}
              >
                <button
                  className="apply-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {faq.q}
                  <span className="apply-faq__chevron" aria-hidden="true" />
                </button>
                {openFaq === i && (
                  <div className="apply-faq__answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="apply-foster-link">
        <div className="section-inner">
          <p>
            Not ready to adopt? <Link to="/foster">Consider fostering</Link> — it saves lives and
            helps dogs prepare for their forever homes.
          </p>
        </div>
      </section>
    </>
  );
}
