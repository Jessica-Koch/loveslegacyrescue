import type { Meta, StoryObj } from '@storybook/react';
import { BubblyButton } from './BubblyButton';

const meta = {
  title: 'UI/BubblyButton',
  component: BubblyButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A circular button that bursts colorful pastel bubbles above and below on click. Great for celebratory or high-delight moments like submitting an adoption application.',
      },
    },
  },
  argTypes: {
    'aria-label': { control: 'text' },
  },
} satisfies Meta<typeof BubblyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Next',
    children: '→',
  },
};

export const HeartIcon: Story = {
  name: 'Heart — Favorite a Dog',
  args: {
    'aria-label': 'Favorite this dog',
    children: '♥',
  },
};

export const PawIcon: Story = {
  name: 'Paw — Submit Application',
  args: {
    'aria-label': 'Submit adoption application',
    children: '🐾',
  },
};

export const WithOnClick: Story = {
  name: 'With onClick handler',
  args: {
    'aria-label': 'Celebrate adoption',
    children: '🎉',
    onClick: () => alert('Adoption submitted!'),
  },
};
