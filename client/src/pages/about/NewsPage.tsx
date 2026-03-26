import PageHeader from '../../components/sections/PageHeader/PageHeader';

export default function NewsPage() {
  return (
    <>
      <PageHeader
        heading="News"
        subheading="Updates, stories, and insights from Love's Legacy Rescue"
      />

      <section className="news-placeholder">
        <div className="section-inner">
          <div className="news-placeholder__box">
            <p>Blog and newsletter content coming soon.</p>
            <p>
              In the meantime, check out our{' '}
              <a href="https://www.instagram.com/loveslegacyrescue" target="_blank" rel="noreferrer">
                Instagram
              </a>{' '}
              for the latest updates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
