import PageHeader from '../../components/sections/PageHeader/PageHeader';

const stories = [
  {
    name: 'Luna',
    breed: 'Husky Mix',
    blurb: 'Luna was pulled from a crowded SoCal shelter and found her forever home with a family in Marin County. She now spends her days hiking the trails and cuddling on the couch.',
  },
  {
    name: 'Bear',
    breed: 'German Shepherd',
    blurb: 'Bear was shy and fearful when he came to us, but with the patience of his foster family and new adopters, he\'s blossomed into the most loyal and playful companion.',
  },
];

export default function HappyTailsPage() {
  return (
    <>
      <PageHeader
        heading="Happy Tails"
        subheading="Success stories from our adopted dogs"
      />

      <section className="happy-tails">
        <div className="section-inner">
          <div className="happy-tails__grid">
            {stories.map((story) => (
              <article key={story.name} className="happy-tails__card">
                <div className="happy-tails__photo">
                  <div className="happy-tails__placeholder-photo">🐾</div>
                </div>
                <div className="happy-tails__body">
                  <h3 className="happy-tails__name">{story.name}</h3>
                  <span className="happy-tails__breed">{story.breed}</span>
                  <p className="happy-tails__blurb">{story.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
