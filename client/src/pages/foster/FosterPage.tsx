import { useState } from 'react';
import { useDogs } from '../../hooks/useDogs';
import PageHeader from '../../components/sections/PageHeader/PageHeader';
import DogGrid from '../../components/sections/DogGrid/DogGrid';

const fosterFaqs = [
  {
    q: 'How long do I foster a dog?',
    a: 'Foster periods vary — typically 2 weeks to 2 months, depending on the dog\'s needs and how quickly we find an adopter.',
  },
  {
    q: 'What supplies do I need?',
    a: 'We provide food, a crate, leash, and any necessary medications. You provide the love and a safe environment!',
  },
  {
    q: 'Can I foster if I have other pets?',
    a: 'Yes, in many cases! We\'ll work with you to find a dog that\'s compatible with your current pets.',
  },
  {
    q: 'What if my foster dog needs medical attention?',
    a: 'All veterinary costs are covered by Love\'s Legacy Rescue. We have partner vets and an emergency protocol in place.',
  },
  {
    q: 'Can I adopt my foster dog?',
    a: 'Yes! Many of our fosters become "foster fails" (in the best way). You\'ll have first right of refusal if you want to adopt.',
  },
];

export default function FosterPage() {
  const { fosterNeededDogs, loading } = useDogs();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        heading="Foster a Dog"
        subheading="Open your home temporarily and help save a life. Fostering is one of the most impactful things you can do."
      />

      <section className="foster-apply">
        <div className="section-inner">
          <a
            href="https://www.shelterluv.com/matchme/foster/LLR/Dog"
            target="_blank"
            rel="noreferrer"
            className="foster-apply__btn"
          >
            Apply to Foster
          </a>
        </div>
      </section>

      {!loading && fosterNeededDogs.length > 0 && (
        <DogGrid
          dogs={fosterNeededDogs}
          heading="Dogs Needing Fosters"
          subheading={`${fosterNeededDogs.length} dogs currently looking for foster homes`}
        />
      )}

      <section className="foster-faq">
        <div className="section-inner">
          <h2 className="section-heading">Foster FAQ</h2>
          <div className="foster-faq__list">
            {fosterFaqs.map((faq, i) => (
              <div
                key={i}
                className={`foster-faq__item${openFaq === i ? ' foster-faq__item--open' : ''}`}
              >
                <button
                  className="foster-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {faq.q}
                  <span className="foster-faq__chevron" aria-hidden="true" />
                </button>
                {openFaq === i && (
                  <div className="foster-faq__answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="foster-guides">
        <div className="section-inner">
          <h2 className="section-heading">Foster Guides</h2>
          <p className="foster-guides__text">
            Download our comprehensive foster guide to help you prepare for your new foster dog.
          </p>
          <div className="foster-guides__downloads">
            <a href="#" className="foster-guides__link">
              New Foster Guide (PDF)
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
