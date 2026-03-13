import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Generic bordered surface with offset shadow. The `interactive` prop enables the lift-on-hover effect. The `accent` prop adds a thick colored top border stripe.',
      },
    },
    layout: 'centered',
  },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
  argTypes: {
    shadow: { control: 'select', options: ['sm', 'md', 'lg'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    interactive: { control: 'boolean' },
    accent: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <>
    <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 900, fontSize: '1.25rem', marginBottom: 8 }}>Koda</h3>
    <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
      Siberian Husky · Male · 2yr
    </p>
  </>
);

export const Default: Story = {
  args: { shadow: 'md', padding: 'md', children: content },
};

export const Interactive: Story = {
  args: { shadow: 'md', padding: 'md', interactive: true, children: content },
};

export const WithAccentStripe: Story = {
  args: { shadow: 'md', padding: 'md', accent: true, children: content },
};

export const Shadows: Story = {
  name: 'Shadow Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Card key={s} shadow={s} padding="md">
          <p style={{ fontFamily: 'var(--font-family)', fontWeight: 700 }}>shadow-{s}</p>
        </Card>
      ))}
    </div>
  ),
};
