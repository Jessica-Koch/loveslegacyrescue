import './Card.scss';

export type CardShadow = 'sm' | 'md' | 'lg';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  shadow?: CardShadow;
  padding?: CardPadding;
  accent?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  onClick?: React.MouseEventHandler;
}

export default function Card({
  children,
  interactive = false,
  shadow = 'md',
  padding = 'md',
  accent = false,
  as: Tag = 'div',
  className,
  onClick,
}: CardProps) {
  const classes = [
    'card',
    `card--shadow-${shadow}`,
    `card--pad-${padding}`,
    interactive && 'card--interactive',
    accent && 'card--accent',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} onClick={onClick}>
      {children}
    </Tag>
  );
}
