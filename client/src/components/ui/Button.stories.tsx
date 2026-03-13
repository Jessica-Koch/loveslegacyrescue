import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Primary interactive element. On click, the button physically presses down to cover its offset shadow — the core neo-brutalist interaction. Use `primary` for main CTAs, `secondary` for alternate actions, `outline` for tertiary, `ghost` for subtle links.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: 'Adopt a Dog' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: 'Learn to Foster' },
};

export const Outline: Story = {
  args: { variant: 'outline', size: 'md', children: 'View All Dogs' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', children: 'Read More' },
};

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', children: 'Adopt a Dog', disabled: true },
};

export const Loading: Story = {
  args: { variant: 'primary', size: 'md', children: 'Submitting…', loading: true },
};

export const FullWidth: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Start Your Adoption', fullWidth: true },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
