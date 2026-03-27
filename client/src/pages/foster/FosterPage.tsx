import { useState } from 'react';
import { useDogs } from '../../hooks/useDogs';
import { PageHeader } from '../../components/sections/PageHeader/PageHeader';
import { DogGrid } from '../../components/sections/DogGrid/DogGrid';
import './FosterPage.scss';

const gettingStartedTips = [
  {
    icon: '📋',
    title: 'Check Policies',
    desc: "Review your homeowner's or renter's insurance and any HOA restrictions to make sure fostering is allowed in your home.",
  },
  {
    icon: '🏃',
    title: 'Assess Your Lifestyle',
    desc: 'Think about your daily routine, activity level, and schedule. We\'ll match you with a foster dog who fits your life.',
  },
  {
    icon: '🐾',
    title: 'Start Simple',
    desc: 'First-time fosters do best with easy-going dogs. We recommend avoiding special-needs or highly anxious dogs until you have more experience.',
  },
];

const processSteps = [
  {
    num: 1,
    title: 'Apply Online',
    desc: 'Complete our foster application so we can learn about your home, lifestyle, and experience with dogs.',
  },
  {
    num: 2,
    title: 'Meet Your Match',
    desc: "We'll pair you with a dog whose personality and needs are a great fit for your home.",
  },
  {
    num: 3,
    title: 'Prepare Your Home',
    desc: 'Follow our preparation checklist to get your space ready before your foster dog arrives.',
  },
  {
    num: 4,
    title: 'Welcome Your Foster Dog',
    desc: 'Provide a safe, loving, and structured environment as your foster dog settles in.',
  },
  {
    num: 5,
    title: 'Find Their Forever Family',
    desc: "Share updates, photos, and what you love about your foster dog — it helps us find them the perfect home.",
  },
];

const faqs = [
  {
    q: 'What does fostering involve?',
    a: "Fostering means temporarily opening your home to a dog in need. You'll provide food, shelter, love, and basic training while we cover all veterinary costs. We support you every step of the way.",
  },
  {
    q: 'How long will I foster?',
    a: "Foster periods vary — typically 2 weeks to 2 months depending on the dog's needs and how quickly we find them an adopter. We'll always give you as much notice as possible.",
  },
  {
    q: 'Do I need experience?',
    a: "Not at all! Many of our best fosters had never done it before. We provide guidance, resources, and ongoing support. We\'ll match you with a dog that suits your experience level.",
  },
  {
    q: 'What costs are involved?',
    a: "Fostering is free. Love's Legacy Rescue covers all veterinary expenses, medications, and we provide food, a crate, leash, and supplies. You just provide the love and a safe home.",
  },
  {
    q: 'Can I foster if I have pets or kids?',
    a: "Yes! We carefully match foster dogs with your household. Dogs are temperament tested and we\'ll work with you to find one that\'s compatible with your existing pets and family.",
  },
  {
    q: 'What about training?',
    a: "We have a comprehensive training guide for fosters covering everything from crate training to leash manners. Our team is also available to answer questions and troubleshoot.",
  },
];

export const FosterPage = () => {
  const { fosterNeededDogs, loading } = useDogs();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        heading="Foster a Dog"
        subheading="Make a Lifesaving Impact with Love's Legacy Rescue"
      />

      <section className="foster-quick-apply">
        <div className="section-inner foster-quick-apply__inner">
          <p>Ready to open your home to a dog in need?</p>
          <a
            href="https://www.shelterluv.com/matchme/foster/LLR/Dog"
            target="_blank"
            rel="noreferrer"
            className="btn btn--primary btn--lg"
          >
            Apply to Foster
          </a>
        </div>
      </section>

      <section className="foster-intro">
        <div className="section-inner">
          <p className="foster-intro__text">
            By opening your heart and home temporarily, you not only provide a safe haven for a
            homeless dog but also make space for another dog in need. Fostering is one of the most
            impactful things you can do for rescue — and it costs you nothing but time and love.
          </p>
        </div>
      </section>

      {!loading && fosterNeededDogs.length > 0 && (
        <DogGrid
          dogs={fosterNeededDogs}
          heading="Dogs Needing Fosters"
          subheading={`${fosterNeededDogs.length} dog${fosterNeededDogs.length !== 1 ? 's' : ''} currently looking for foster homes`}
        />
      )}

      <section className="foster-start">
        <div className="section-inner">
          <h2 className="section-heading">Are You Thinking of Fostering for the First Time?</h2>
          <p className="section-sub">A few things to consider before you apply.</p>
          <div className="foster-start__grid">
            {gettingStartedTips.map((tip) => (
              <div key={tip.title} className="foster-start__card">
                <span className="foster-start__icon" aria-hidden="true">{tip.icon}</span>
                <h3 className="foster-start__title">{tip.title}</h3>
                <p className="foster-start__desc">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="foster-prepare">
        <div className="section-inner">
          <h2 className="section-heading">How to Prepare</h2>
          <div className="foster-prepare__grid">
            <div className="foster-prepare__block">
              <h3 className="foster-prepare__subtitle">Shop Smart</h3>
              <p>Stock up on the essentials before your foster dog arrives:</p>
              <ul className="foster-prepare__list">
                <li>Food (we'll let you know what they're currently eating)</li>
                <li>Any medications prescribed by our vet</li>
                <li>Food and water bowls</li>
                <li>Leash and harness</li>
                <li>Crate (appropriately sized)</li>
                <li>ID tag with your contact info</li>
              </ul>
            </div>
            <div className="foster-prepare__block">
              <h3 className="foster-prepare__subtitle">Wait on the Fun Stuff</h3>
              <p>
                Hold off on buying lots of toys until you get to know your foster dog. Every dog
                has different preferences — some love squeaky toys, others prefer tug ropes or
                chew bones. You'll figure out what they love once they're home with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="foster-integrate">
        <div className="section-inner">
          <h2 className="section-heading">Integrating Your Foster Dog Into Your Home</h2>
          <ol className="foster-integrate__steps">
            <li>
              <strong>Involve the whole family.</strong> Make sure everyone in the household is on
              board and knows how to interact calmly and consistently with the new dog.
            </li>
            <li>
              <strong>Socialize gradually.</strong> Give your foster dog time to decompress before
              introducing them to new people, places, and experiences.
            </li>
            <li>
              <strong>Introduce resident pets slowly.</strong> Use controlled, neutral-territory
              meetings and take it one step at a time — don't rush the process.
            </li>
          </ol>
        </div>
      </section>

      <section className="foster-role">
        <div className="section-inner foster-role__inner">
          <div className="foster-role__text">
            <h2 className="section-heading" style={{ textAlign: 'left' }}>Your Role as a Foster Parent</h2>
            <p>
              When you foster, you're not just providing a temporary home — you're preparing your
              dog for a forever family. That means teaching basic manners, establishing a routine,
              and helping them learn to trust people. The more you invest in your foster dog, the
              better chance they have of finding the perfect match.
            </p>
          </div>
          <div className="foster-role__cta">
            <a
              href="https://www.shelterluv.com/matchme/foster/LLR/Dog"
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary btn--lg"
            >
              Apply to Foster Now
            </a>
          </div>
        </div>
      </section>

      <section className="foster-process">
        <div className="section-inner">
          <h2 className="section-heading">The Fostering Process</h2>
          <ol className="foster-process__list">
            {processSteps.map((step) => (
              <li key={step.num} className="foster-process__step">
                <span className="foster-process__num" aria-hidden="true">{step.num}</span>
                <div className="foster-process__content">
                  <h3 className="foster-process__title">{step.title}</h3>
                  <p className="foster-process__desc">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="foster-faq">
        <div className="section-inner">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="foster-faq__list">
            {faqs.map((faq, i) => (
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
          <h2 className="section-heading">Foster Guide</h2>
          <p className="section-sub">
            Everything you need to know to set your foster dog up for success — from day one.
          </p>
          <div className="foster-guides__cards">
            <div className="foster-guides__card">
              <span className="foster-guides__icon" aria-hidden="true">📄</span>
              <div className="foster-guides__card-text">
                <h3>New Foster Guide</h3>
                <p>Our comprehensive guide covering arrival, crate training, feeding, vet visits, and more.</p>
              </div>
              <a
                href="/guides/loves-legacy-rescue-new-foster-guide-jan-26.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn--outline btn--md"
              >
                Download PDF
              </a>
            </div>
            <div className="foster-guides__card">
              <span className="foster-guides__icon" aria-hidden="true">✉️</span>
              <div className="foster-guides__card-text">
                <h3>Get the Guide by Email</h3>
                <p>Prefer it in your inbox? Send us your email and we'll send it right over.</p>
              </div>
              <a
                href="mailto:hello@loveslegacyrescue.com?subject=Foster%20Guide%20Request"
                className="btn btn--outline btn--md"
              >
                Email Me the Guide
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="foster-cta">
        <div className="section-inner foster-cta__inner">
          <h2 className="foster-cta__heading">Ready to Foster?</h2>
          <p className="foster-cta__sub">
            You're not just fostering a dog — you're saving lives and creating brighter futures.
            Questions? Reach us at{' '}
            <a href="mailto:hello@loveslegacyrescue.com" className="foster-cta__email">
              hello@loveslegacyrescue.com
            </a>
          </p>
          <a
            href="https://www.shelterluv.com/matchme/foster/LLR/Dog"
            target="_blank"
            rel="noreferrer"
            className="btn btn--primary btn--lg"
          >
            Apply Today
          </a>
        </div>
      </section>
    </>
  );
}
