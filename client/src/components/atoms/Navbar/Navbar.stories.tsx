import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Navbar from '../Navbar';

const logo = (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: 'var(--color-secondary)',
        border: '3px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.15rem',
        flexShrink: 0,
      }}
    >
      🐾
    </div>
    <span
      style={{
        fontFamily: 'var(--font-family)',
        fontWeight: 900,
        fontSize: '0.9rem',
        letterSpacing: '-0.01em',
        textTransform: 'uppercase',
      }}
    >
      Love's Legacy
    </span>
  </div>
);

const meta = {
  title: 'UI/Navbar',
  component: Navbar,
  parameters: {
    docs: {
      description: {
        component:
          'Sticky navigation bar with logo slot and nav items. Active state uses the accent color. Collapses to a hamburger menu below 640px. Pass `variant: "accent"` on a nav item for admin-style links.',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo,
    items: [
      { label: 'Adopt', active: true },
      { label: 'Foster', href: '#' },
      { label: 'Donate', href: '#' },
      { label: 'Admin', variant: 'accent' },
    ],
  },
};

export const NoActiveItem: Story = {
  args: {
    logo,
    items: [
      { label: 'Adopt', href: '#' },
      { label: 'Foster', href: '#' },
      { label: 'Donate', href: '#' },
    ],
  },
};

export const Interactive: Story = {
  name: 'Interactive (view toggle)',
  render: () => {
    const [view, setView] = useState<'adopt' | 'foster' | 'admin'>('adopt');
    return (
      <Navbar
        logo={logo}
        items={[
          {
            label: 'Adopt',
            active: view === 'adopt',
            onClick: () => setView('adopt'),
          },
          {
            label: 'Foster',
            active: view === 'foster',
            onClick: () => setView('foster'),
          },
          {
            label: 'Admin',
            active: view === 'admin',
            onClick: () => setView('admin'),
            variant: 'accent',
          },
        ]}
      />
    );
  },
};

export const LogoOnly: Story = {
  args: { logo, items: [] },
};
