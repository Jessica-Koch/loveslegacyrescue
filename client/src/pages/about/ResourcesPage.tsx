import PageHeader from '../../components/sections/PageHeader/PageHeader';

const resources = [
  {
    title: 'Adoption FAQ',
    description: 'Answers to frequently asked questions about the adoption process.',
    link: '/adopt/apply',
    type: 'page',
  },
  {
    title: 'Foster FAQ',
    description: 'Everything you need to know about fostering a rescue dog.',
    link: '/foster',
    type: 'page',
  },
  {
    title: 'Adoption Guide',
    description: 'A comprehensive guide to help you prepare for your new rescue dog.',
    link: '#',
    type: 'download',
  },
  {
    title: 'New Foster Guide',
    description: 'Step-by-step guide for new foster families, including tips and best practices.',
    link: '#',
    type: 'download',
  },
  {
    title: 'Training Resources',
    description: 'Recommended training techniques and resources for your rescue dog.',
    link: '#',
    type: 'download',
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        heading="Resources"
        subheading="Guides, FAQs, and helpful materials for adopters and fosters"
      />

      <section className="resources">
        <div className="section-inner">
          <div className="resources__grid">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.link}
                className="resources__card"
                {...(resource.type === 'download' ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="resources__type">
                  {resource.type === 'download' ? 'PDF Download' : 'Page'}
                </span>
                <h3 className="resources__title">{resource.title}</h3>
                <p className="resources__desc">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
