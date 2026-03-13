import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Inline label/tag with thick borders and a small offset shadow. The `rotate` prop adds a slight tilt for the neo-brutalist "sticker slapped on a laptop" feel.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'select', options: ['accent', 'secondary', 'muted', 'outline', 'brand'] },
    size: { control: 'select', options: ['sm', 'md'] },
    rotate: { control: 'boolean' },
    rotateDirection: { control: 'select', options: ['cw', 'ccw'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'accent', children: 'Featured' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', padding: 16 }}>
      <Badge variant="accent">Featured</Badge>
      <Badge variant="secondary">In Foster</Badge>
      <Badge variant="muted">Adopted</Badge>
      <Badge variant="brand">Dog of the Week</Badge>
      <Badge variant="outline">New Arrival</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16 }}>
      <Badge size="sm" variant="accent">Small</Badge>
      <Badge size="md" variant="accent">Medium</Badge>
    </div>
  ),
};

export const Rotated: Story = {
  name: 'Rotated (Sticker Effect)',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 32 }}>
      <Badge variant="accent" rotate rotateDirection="ccw">Featured</Badge>
      <Badge variant="secondary" rotate rotateDirection="cw">In Foster</Badge>
      <Badge variant="brand" rotate rotateDirection="ccw">Dog of the Week</Badge>
    </div>
  ),
};
