import PageHeader from '../../components/sections/PageHeader/PageHeader';

const team = [
  {
    name: 'Founder',
    role: 'Founder & Director',
    bio: 'Driven by a deep love for animals and a mission to save at-risk dogs from overcrowded shelters, our founder started Love\'s Legacy Rescue to make a lasting difference.',
    instagram: '',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        heading="Meet the Team"
        subheading="The people behind Love's Legacy Rescue"
      />

      <section className="about-founder">
        <div className="section-inner">
          <div className="about-founder__content">
            <div className="about-founder__photo">
              <div className="about-founder__placeholder">🐾</div>
            </div>
            <div className="about-founder__text">
              <h2 className="section-heading">Our Story</h2>
              <p>
                Love's Legacy Rescue was founded with a simple but powerful mission: to save
                at-risk dogs from crowded Southern California shelters and find them loving forever
                homes. What started as one person's determination to make a difference has grown into
                a dedicated team of volunteers, fosters, and supporters working together to give
                every dog a second chance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="section-inner">
          <h2 className="section-heading">The Team</h2>
          <div className="about-team__grid">
            {team.map((member) => (
              <div key={member.name} className="about-team__card">
                <div className="about-team__photo">
                  <div className="about-team__placeholder">🐾</div>
                </div>
                <div className="about-team__info">
                  <h3 className="about-team__name">{member.name}</h3>
                  <span className="about-team__role">{member.role}</span>
                  <p className="about-team__bio">{member.bio}</p>
                  {member.instagram && (
                    <a
                      href={`https://instagram.com/${member.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="about-team__ig"
                    >
                      @{member.instagram}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
