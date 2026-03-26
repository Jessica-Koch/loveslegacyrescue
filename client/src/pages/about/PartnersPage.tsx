import PageHeader from '../../components/sections/PageHeader/PageHeader';
import PartnerGrid, { type Partner } from '../../components/sections/PartnerGrid/PartnerGrid';

const partners: Partner[] = [
  {
    name: 'Spayce Project',
    logoUrl: 'https://images.squarespace-cdn.com/content/v1/668160181f51c035f1964097/05c7355c-732d-4ca7-ad07-8151ef660d41/SPAYCE.horiz.logo.final.png?format=1500w',
    websiteUrl: 'https://www.thespayceproject.org/',
  },
  {
    name: 'Maison Sure',
    logoUrl: 'https://maisonsurela.org/wp-content/uploads/2023/08/maison-logo.svg',
    websiteUrl: 'https://maisonsurela.org/',
  },
  {
    name: 'Paradise Pet Resort',
    logoUrl: 'https://eadn-wc03-12575897.nxedge.io/wp-content/uploads/2024/02/ParadisePetResort_150.png',
    websiteUrl: 'https://paradisepetresorts.com/',
  },
  {
    name: 'Alto Tiburon Vet Hospital',
    logoUrl: 'https://altotiburon.com/wp-content/uploads/2025/04/ATVH-logo-header.png.webp',
    websiteUrl: 'https://altotiburon.com/',
  },
  {
    name: 'Girls Best Friend Dog Training',
    websiteUrl: 'https://form.jotform.com/230167309344150',
  },
  {
    name: 'CrewsK9',
    websiteUrl: 'https://www.crewsnk9academy.com/',
  },
  {
    name: 'Incredible K9',
    logoUrl: 'https://images.squarespace-cdn.com/content/v1/66bfe193669f342f0742c341/d780a6c6-da84-4f64-a5a8-9d43146a9b31/Copy+of+Incrediblecaninelogo-2.png?format=1500w',
    websiteUrl: 'https://www.incrediblecanine.com/',
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        heading="Our Partners"
        subheading="Organizations and businesses that support our mission"
      />

      <section className="partners-section">
        <div className="section-inner">
          <h2 className="section-heading">Partners</h2>
          <PartnerGrid partners={partners} />
        </div>
      </section>

      <section className="shelters-section">
        <div className="section-inner">
          <h2 className="section-heading">Shelters We Rescue From</h2>
          <p className="shelters-section__text">
            We work with overcrowded shelters across Southern California to identify and rescue
            at-risk dogs. Our network includes municipal shelters and animal control facilities
            throughout the region.
          </p>
        </div>
      </section>
    </>
  );
}
