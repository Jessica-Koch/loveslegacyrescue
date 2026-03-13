import './Badge.scss';

export type BadgeVariant = 'accent' | 'secondary' | 'muted' | 'outline' | 'brand';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  rotate?: boolean;
  rotateDirection?: 'cw' | 'ccw';
  children: React.ReactNode;
}

export default function Badge({
  variant = 'accent',
  size = 'md',
  rotate = false,
  rotateDirection = 'ccw',
  children,
}: BadgeProps) {
  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    rotate && `badge--rotate-${rotateDirection}`,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
}
