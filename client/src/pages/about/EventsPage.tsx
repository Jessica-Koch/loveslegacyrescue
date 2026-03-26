import PageHeader from '../../components/sections/PageHeader/PageHeader';

export default function EventsPage() {
  return (
    <>
      <PageHeader
        heading="Events"
        subheading="Join us at upcoming adoption events, fundraisers, and community gatherings"
      />

      <section className="events-placeholder">
        <div className="section-inner">
          <div className="events-placeholder__box">
            <p>Event calendar coming soon.</p>
            <p>
              Follow us on{' '}
              <a href="https://www.instagram.com/loveslegacyrescue" target="_blank" rel="noreferrer">
                Instagram
              </a>{' '}
              for the latest event announcements.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
