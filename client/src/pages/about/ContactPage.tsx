import PageHeader from '../../components/sections/PageHeader/PageHeader';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        heading="Contact Us"
        subheading="Get in touch with Love's Legacy Rescue"
      />

      <section className="contact">
        <div className="section-inner">
          <div className="contact__grid">
            <div className="contact__card">
              <h3 className="contact__label">Email</h3>
              <a href="mailto:info@loveslegacyrescue.com" className="contact__value">
                info@loveslegacyrescue.com
              </a>
            </div>

            <div className="contact__card">
              <h3 className="contact__label">Mailing Address</h3>
              <p className="contact__value">
                PO Box 195<br />
                Mill Valley, CA 94942
              </p>
            </div>

            <div className="contact__card">
              <h3 className="contact__label">Tax Information</h3>
              <p className="contact__value">
                EIN: 99-0445232<br />
                Love's Legacy Rescue is a 501(c)(3) nonprofit organization.
                All donations are tax-deductible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
