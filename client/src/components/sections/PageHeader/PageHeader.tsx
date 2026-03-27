import './PageHeader.scss';

interface PageHeaderProps {
  heading: string;
  subheading?: string;
}

export const PageHeader = ({ heading, subheading }: PageHeaderProps) => {
  return (
    <div className="page-header">
      <div className="section-inner">
        <h1 className="page-header__title">{heading}</h1>
        {subheading && <p className="page-header__sub">{subheading}</p>}
      </div>
    </div>
  );
}
