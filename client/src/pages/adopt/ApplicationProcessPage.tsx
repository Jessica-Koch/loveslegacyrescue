import { useState } from 'react';
import { PageHeader } from '../../components/sections/PageHeader/PageHeader';
import './ApplicationProcessPage.scss';

const steps = [
  {
    num: 1,
    title: 'Find Your Match',
    desc: 'Browse our available dogs and find a profile that feels like the right fit. Each listing includes photos and behavioral information to help you decide.',
  },
  {
    num: 2,
    title: 'Submit an Application',
    desc: 'Complete our online adoption application through our adoption portal. Tell us about your home, lifestyle, and the dog you have in mind.',
  },
  {
    num: 3,
    title: 'Application Review',
    desc: 'Our team carefully reviews every application and responds within 3–5 business days. We may reach out with follow-up questions.',
  },
  {
    num: 4,
    title: 'Video Interview',
    desc: 'We conduct a virtual home assessment to get to know you better and make sure your space is a great fit for the dog.',
  },
  {
    num: 5,
    title: 'Meet Your Dog',
    desc: "We'll arrange an in-person meeting at a foster home or rescue event so you and your potential new pup can get acquainted.",
  },
  {
    num: 6,
    title: 'Adoption Finalization',
    desc: "Sign the adoption agreement, pay the adoption fee, and receive the dog's medical records — they're officially yours!",
  },
  {
    num: 7,
    title: 'Welcome Home',
    desc: 'The journey continues! Our team provides ongoing support to help you and your dog settle in and thrive together.',
  },
];

type AnswerBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

interface FaqItem {
  q: string;
  a: AnswerBlock[];
}

interface FaqSection {
  label: string;
  intro?: string;
  items: FaqItem[];
}

const faqSections: FaqSection[] = [
  {
    label: 'The Application Process',
    items: [
      {
        q: 'Where are you located? Is there a shelter where I can meet the dogs?',
        a: [
          {
            type: 'p',
            text: 'Our operations are out of northern California, with our volunteer team based in California and across the country. We are an entirely foster-based rescue, which means we do not have a physical location. Our fosters are based throughout California, Oregon, Washington, Arizona, Colorado, and beyond. The majority of our dogs are based in northern California.',
          },
          {
            type: 'p',
            text: "The first step is to apply for a dog. This allows us to get to know you better before we coordinate meeting the dog. We do this because it's a lot of work for fosters to meet potential adopters and we want to make sure everyone is on the same page and ready before we do a meet and greet.",
          },
        ],
      },
      {
        q: 'How do I start the adoption process?',
        a: [
          {
            type: 'p',
            text: "The first step is to complete our online Adoption Application through Shelterluv. You'll also need to send photos of your home and outdoor space to adoptions@loveslegacyrescue.com. These photos give us an early look at the environment your future dog would be coming into — yard size, fencing, indoor space, and any potential hazards.",
          },
        ],
      },
      {
        q: 'What information does the application ask for?',
        a: [
          {
            type: 'p',
            text: 'Our application is thorough by design. A good match protects both the dog and your family. You can expect to share:',
          },
          {
            type: 'ul',
            items: [
              'Your living situation (house, apartment, rental, owned)',
              'Landlord approval documentation if you rent',
              'Details about your household — adults, children, other pets',
              'Your daily schedule and activity level',
              'Your experience with dogs and any previous pets',
              'What kind of dog you\'re hoping to adopt (size, energy, breed)',
              'Your preferred timeline and any lifestyle considerations',
              'Valid government-issued ID and proof of residency',
            ],
          },
        ],
      },
      {
        q: 'What are the basic eligibility requirements?',
        a: [
          {
            type: 'p',
            text: 'To adopt from Love\'s Legacy Rescue, you must:',
          },
          {
            type: 'ul',
            items: [
              'Be at least 21 years of age',
              'Provide proof of identification and current residency',
              'Have written landlord approval if you rent your home',
              'Demonstrate the ability to provide a safe, stable, and loving environment',
              'Be located in the US or Canada',
            ],
          },
        ],
      },
      {
        q: 'How long does the application review take?',
        a: [
          {
            type: 'p',
            text: "We review every application carefully and personally — this isn't an automated system. Reviews typically take 3–7 business days. If we need additional information, a team member will reach out to you directly. Because our fosters have busy lives, we cannot schedule meet-and-greets until your application has been fully approved.",
          },
        ],
      },
    ],
  },
  {
    label: 'Finding the Right Match',
    items: [
      {
        q: 'How do you decide which dog is right for me?',
        a: [
          {
            type: 'p',
            text: 'Matching is one of the most important things we do. We look at your application holistically — your lifestyle, energy level, home size, experience, household members, and the specific dog you\'re interested in. Our foster families also provide detailed behavioral profiles on each dog, which helps us understand how they interact with kids, cats, other dogs, and different environments.',
          },
          {
            type: 'p',
            text: 'A high-energy cattle dog mix and a calm senior retriever require very different homes. We take the time to get it right.',
          },
        ],
      },
      {
        q: 'Can I request a specific dog I saw on your website?',
        a: [
          {
            type: 'p',
            text: 'Yes — you can indicate interest in a specific dog on your application. However, we may also suggest other dogs in our care if we feel they would be a better fit based on your profile. We always prioritize the right match over a quick placement, and we ask that you stay open to our recommendations.',
          },
        ],
      },
      {
        q: 'What if I have other pets at home?',
        a: [
          {
            type: 'p',
            text: "Having other pets doesn't disqualify you — but it does shape which dogs we'd consider for you. Each dog in our care has a known compatibility profile with other dogs and cats. We'll share that information with you and work to find a dog whose temperament suits your existing pet family. We may ask for photos or a brief video of your current pets as part of the review.",
          },
        ],
      },
    ],
  },
  {
    label: 'The Video Interview & Home Review',
    intro:
      "The video interview isn't a formality — it's one of the most important steps in the process. It's our chance to meet you, and your chance to show us the home your future dog would be coming into.",
    items: [
      {
        q: 'Why is a video interview required?',
        a: [
          {
            type: 'p',
            text: "A video call allows our team to connect with you face-to-face and get a genuine sense of your home, your household, and your lifestyle. It gives us context that a written application simply can't provide — the energy of your space, how your kids or current pets interact, whether your yard is safely fenced, and how your home is set up for a dog. It also gives you the chance to ask us anything and meet the team who will be supporting you through the process.",
          },
        ],
      },
      {
        q: 'What will the video interview involve?',
        a: [
          {
            type: 'p',
            text: 'The interview typically includes:',
          },
          {
            type: 'ul',
            items: [
              'A walkthrough of your indoor living space — where the dog would sleep, eat, and spend most of their time',
              'A view of your outdoor area — yard, balcony, or nearby walking routes',
              'A conversation about your daily routine, experience with dogs, and adoption goals',
              'An introduction to any other pets or family members in the home',
              'A Q&A — this is a two-way conversation, and we want you to feel fully prepared',
            ],
          },
        ],
      },
      {
        q: 'What are you specifically looking for during the home walkthrough?',
        a: [
          {
            type: 'p',
            text: "We're looking for a safe, welcoming environment — not a perfect one. Specifically, we pay attention to:",
          },
          {
            type: 'ul',
            items: [
              'Secure fencing and contained outdoor spaces',
              'Potential hazards (pools without gates, unsecured chemicals, small escape routes)',
              'Space appropriate for the size and energy of the dog being considered',
              'Evidence that the home is stable and the commitment is genuine',
              'How existing pets behave in their home environment',
            ],
          },
          {
            type: 'p',
            text: "We're not looking for a showroom. We're looking for a home where a dog will be loved and safe.",
          },
        ],
      },
      {
        q: 'What happens after the video interview?',
        a: [
          {
            type: 'p',
            text: "If the interview goes well and we're confident in the match, we'll move forward to schedule a meet-and-greet with your prospective dog — either at a neutral location or with the foster family. From there, if the connection is strong, we finalize the adoption paperwork, collect the adoption fee, and transfer your dog's medical records to you.",
          },
        ],
      },
    ],
  },
  {
    label: 'Out-of-State Adoptions & Transport',
    intro:
      "Love's Legacy Rescue adopts dogs across the US and Canada. We're proud to place dogs in loving homes regardless of geography — and we have transport options to make it happen.",
    items: [
      {
        q: 'Can I adopt a dog if I live outside California?',
        a: [
          {
            type: 'p',
            text: "Yes. We regularly place dogs in Oregon, Washington, Colorado, and across the country. Out-of-state adoptions follow the same application and interview process as local adoptions — with additional coordination for transport. Our team will walk you through every step.",
          },
        ],
      },
      {
        q: 'How does transport work for out-of-state adoptions?',
        a: [
          {
            type: 'p',
            text: "Transport is coordinated on a case-by-case basis depending on your location and the dog's needs. We work with trusted transport partners and volunteers to ensure every dog travels safely and comfortably.",
          },
          {
            type: 'p',
            text: 'West Coast: The Pacific Northwest is one of our most common out-of-state placement regions. Transport is arranged via ground transport on established rescue routes. Costs are typically $150–$400 depending on method and distance.',
          },
          {
            type: 'p',
            text: 'Other States & Canada: For longer distances, we work with reputable pet transport services that specialize in rescue dogs. Costs and logistics vary by distance — we\'ll provide a detailed estimate during the interview process. You may also choose to fly to California and transport your dog home personally, which many adopters do.',
          },
        ],
      },
      {
        q: 'Who pays for transport costs?',
        a: [
          {
            type: 'p',
            text: "Transport costs for out-of-state adoptions are typically the responsibility of the adopter. We'll provide a clear, transparent breakdown of all costs before you commit. In some cases, community fundraising or transport volunteers may offset part of the cost — we'll let you know if that applies to your adoption.",
          },
        ],
      },
      {
        q: 'Are there any additional requirements for out-of-state adopters?',
        a: [
          {
            type: 'p',
            text: "Out-of-state adopters go through the same process as local adopters, with one addition: the video interview home walkthrough carries even more weight since we cannot conduct an in-person home visit. We may also ask for additional photos of your outdoor space and fencing. Some states have specific requirements around importing dogs — we'll advise on any documentation needed based on your location.",
          },
        ],
      },
    ],
  },
  {
    label: 'After the Adoption',
    items: [
      {
        q: 'What does the adoption fee cover?',
        a: [
          {
            type: 'p',
            text: 'Your adoption fee directly supports the cost of rescuing your dog — including spay or neuter surgery, vaccinations, microchipping, heartworm testing and treatment if needed, flea and tick prevention, and any other medical care provided during their time in foster care. It also helps fund the operational costs of running a rescue, including insurance, website, adoption software, donation platform, and complex medical care that occasionally occurs.',
          },
        ],
      },
      {
        q: 'What records will I receive?',
        a: [
          {
            type: 'p',
            text: "At the time of adoption you'll receive your dog's complete medical records, including vaccination history, spay/neuter documentation, microchip registration information, and any treatment records from their time in foster care. We'll also connect you with our Training Guide to help you set your dog up for success from day one.",
          },
        ],
      },
      {
        q: "What support does Love's Legacy offer after adoption?",
        a: [
          {
            type: 'p',
            text: "We don't disappear after the paperwork is signed. Our team is available to answer questions, troubleshoot behavioral challenges, and support your transition. We also encourage adopters to share updates and photos — our Happy Tails page exists to celebrate every dog that finds their forever home. You're part of the Love's Legacy family now.",
          },
        ],
      },
      {
        q: "What if the adoption doesn't work out?",
        a: [
          {
            type: 'p',
            text: "We understand that sometimes, despite everyone's best efforts, a placement isn't the right fit. If that happens, please contact us immediately rather than rehoming the dog independently. Our adoption agreement requires that dogs be returned to Love's Legacy — never surrendered to a shelter or sold. We will work with you to find the best resolution for both you and the dog.",
          },
        ],
      },
    ],
  },
];

function FaqAnswer({ blocks }: { blocks: AnswerBlock[] }) {
  return (
    <div className="adopt-faq__answer-content">
      {blocks.map((block, i) => {
        if (block.type === 'p') {
          return <p key={i}>{block.text}</p>;
        }
        return (
          <ul key={i} className="adopt-faq__answer-list">
            {block.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

export const ApplicationProcessPage = () => {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = (key: string) => setOpenKey(openKey === key ? null : key);

  return (
    <>
      <PageHeader
        heading="Adoption FAQ"
        subheading="Everything you need to know about adopting a rescue dog from Love's Legacy — from first application to forever home."
      />

      <section className="adopt-intro">
        <div className="section-inner adopt-intro__inner">
          <div className="adopt-intro__text">
            <h2>Adopt a Lifelong Companion with Love's Legacy Rescue</h2>
            <p>
              We don't have a physical shelter. Every dog in our care lives with a loving foster
              family — which means your new dog is already learning what home feels like. Here's how
              you can make it permanent.
            </p>
          </div>
        </div>
      </section>

      <section className="adopt-steps">
        <div className="section-inner">
          <h2 className="section-heading">Our Adoption Process</h2>
          <ol className="adopt-steps__list">
            {steps.map((step) => (
              <li key={step.num} className="adopt-steps__step">
                <span className="adopt-steps__num" aria-hidden="true">{step.num}</span>
                <div className="adopt-steps__content">
                  <h3 className="adopt-steps__title">{step.title}</h3>
                  <p className="adopt-steps__desc">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="adopt-faq">
        <div className="section-inner">
          <h2 className="section-heading">Adoption FAQ</h2>
          <div className="adopt-faq__sections">
            {faqSections.map((section, si) => (
              <div key={si} className="adopt-faq__section">
                <h3 className="adopt-faq__section-label">{section.label}</h3>
                {section.intro && (
                  <p className="adopt-faq__section-intro">{section.intro}</p>
                )}
                <div className="adopt-faq__list">
                  {section.items.map((item, ii) => {
                    const key = `${si}-${ii}`;
                    const isOpen = openKey === key;
                    return (
                      <div
                        key={ii}
                        className={`adopt-faq__item${isOpen ? ' adopt-faq__item--open' : ''}`}
                      >
                        <button
                          className="adopt-faq__question"
                          onClick={() => toggle(key)}
                          aria-expanded={isOpen}
                        >
                          {item.q}
                          <span className="adopt-faq__chevron" aria-hidden="true" />
                        </button>
                        {isOpen && (
                          <div className="adopt-faq__answer">
                            <FaqAnswer blocks={item.a} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="adopt-foster-nudge">
        <div className="section-inner adopt-foster-nudge__inner">
          <p>
            Not ready to adopt?{' '}
            <a href="/foster" className="adopt-foster-nudge__link">
              Consider fostering →
            </a>{' '}
            It's one of the most impactful things you can do, and it costs you nothing.
          </p>
        </div>
      </section>

      <section className="adopt-cta">
        <div className="section-inner adopt-cta__inner">
          <h2 className="adopt-cta__heading">Ready to Find Your Perfect Match?</h2>
          <p className="adopt-cta__sub">
            Start your application today.{' '}
            Questions? Contact our adoption team at{' '}
            <a href="mailto:adoptions@loveslegacyrescue.com" className="adopt-cta__email">
              adoptions@loveslegacyrescue.com
            </a>
          </p>
          <a
            href="https://www.shelterluv.com/matchme/adopt/LLR/Dog"
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
