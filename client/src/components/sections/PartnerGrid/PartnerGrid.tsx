import './PartnerGrid.scss';

export interface Partner {
  name: string;
  logoUrl?: string;
  websiteUrl: string;
}

interface PartnerGridProps {
  partners: Partner[];
}

export default function PartnerGrid({ partners }: PartnerGridProps) {
  return (
    <div className="partner-grid">
      {partners.map((partner) => (
        <a
          key={partner.name}
          href={partner.websiteUrl}
          target="_blank"
          rel="noreferrer"
          className="partner-grid__item"
        >
          {partner.logoUrl ? (
            <img
              src={partner.logoUrl}
              alt={partner.name}
              className="partner-grid__logo"
              loading="lazy"
            />
          ) : (
            <span className="partner-grid__name">{partner.name}</span>
          )}
        </a>
      ))}
    </div>
  );
}
