import PageHeader from '../../components/sections/PageHeader/PageHeader';

export default function DonatePage() {
  return (
    <>
      <PageHeader
        heading="Donate"
        subheading="Your generosity helps us save more dogs and find them loving homes"
      />

      <section className="donate-widget">
        <div className="section-inner">
          <div className="donate-widget__placeholder">
            <p>Donation widget loading...</p>
            <p className="donate-widget__note">GiveButter integration coming soon</p>
          </div>
        </div>
      </section>

      <section className="donate-tiers">
        <div className="section-inner">
          <h2 className="section-heading">Membership Tiers</h2>
          <div className="donate-tiers__grid">
            <div className="donate-tiers__card">
              <h3>Supporter</h3>
              <p>Monthly contributions that help cover daily care and feeding of our rescue dogs.</p>
            </div>
            <div className="donate-tiers__card">
              <h3>Champion</h3>
              <p>Help fund veterinary care, spay/neuter surgeries, and medical treatments.</p>
            </div>
            <div className="donate-tiers__card">
              <h3>Hero</h3>
              <p>Support transport, emergency rescues, and critical operations that save lives.</p>
            </div>
          </div>
          <p className="donate-tiers__note">Tier details and pricing coming soon.</p>
        </div>
      </section>

      <section className="donate-impact">
        <div className="section-inner">
          <h2 className="section-heading">Where Your Donation Goes</h2>
          <div className="donate-impact__placeholder">
            Donation allocation infographic
          </div>
        </div>
      </section>

      <section className="donate-partners">
        <div className="section-inner">
          <h2 className="section-heading">Other Ways to Give</h2>
          <div className="donate-partners__grid">
            <a
              href="https://cardonationservices.com/charities/loves-legacy-rescue/"
              target="_blank"
              rel="noreferrer"
              className="donate-partners__card"
            >
              <h3>Car Donation Services</h3>
              <p>Donate your vehicle and support Love's Legacy Rescue. Free pickup included.</p>
            </a>
          </div>
        </div>
      </section>

      <section className="donate-seals">
        <div className="section-inner">
          <div className="donate-seals__row">
            <div className="donate-seals__item">
              <span className="donate-seals__placeholder">Guidestar Gold Seal</span>
            </div>
            <div className="donate-seals__item">
              <span className="donate-seals__placeholder">Best Friends Network Partner</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
