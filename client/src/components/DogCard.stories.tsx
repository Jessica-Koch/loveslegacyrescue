import type { Meta, StoryObj } from '@storybook/react';
import DogCard from './DogCard';
import type { Dog } from '../types';

// ── Shared mock data ──────────────────────────────────────────

const baseDog: Dog = {
  id: '1',
  shelterluvId: 'SL-001',
  name: 'Koda',
  breed: 'Siberian Husky',
  age: '24',
  sex: 'Male',
  color: 'Black & White',
  description:
    'Koda is a playful and energetic husky who loves long hikes and cuddles on the couch. He gets along well with other dogs and older kids. Looking for an active family who can keep up with his adventurous spirit.',
  photoUrls: ['https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&q=80'],
  status: 'Available',
  inFoster: false,
  featured: false,
  featuredAt: null,
  slackChannelId: null,
  internalNotes: null,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

// ── Meta ─────────────────────────────────────────────────────

const meta = {
  title: 'Components/DogCard',
  component: DogCard,
  parameters: {
    docs: {
      description: {
        component:
          'The primary card used to display an adoptable dog in the grid. Supports featured and in-foster badge states.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    dog: { control: 'object' },
  },
} satisfies Meta<typeof DogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Stories ───────────────────────────────────────────────────

export const Default: Story = {
  args: { dog: baseDog },
};

export const Featured: Story = {
  name: 'Featured (Dog of the Week)',
  args: {
    dog: {
      ...baseDog,
      name: 'Luna',
      breed: 'German Shepherd Mix',
      age: '36',
      sex: 'Female',
      featured: true,
      description:
        'Luna is our dog of the week! Sweet, gentle, and house-trained. She would thrive as an only pet with a patient owner who has time to help her build confidence.',
    },
  },
};

export const InFoster: Story = {
  name: 'In Foster',
  args: {
    dog: {
      ...baseDog,
      name: 'Bear',
      breed: 'Alaskan Malamute',
      age: '60',
      sex: 'Male',
      inFoster: true,
      description:
        'Bear is currently in a loving foster home learning household manners. He is big, goofy, and full of love.',
    },
  },
};

export const FeaturedAndInFoster: Story = {
  name: 'Featured + In Foster',
  args: {
    dog: {
      ...baseDog,
      name: 'Nova',
      breed: 'Husky Mix',
      age: '12',
      sex: 'Female',
      featured: true,
      inFoster: true,
      description:
        'Nova is our featured pup this week and currently in foster. She is a young girl with boundless energy and a heart of gold.',
    },
  },
};

export const NoPhoto: Story = {
  name: 'No Photo',
  args: {
    dog: {
      ...baseDog,
      name: 'Bandit',
      photoUrls: [],
      description: 'Bandit is shy at first but warms up quickly. Photo coming soon!',
    },
  },
};

export const PuppyNoDescription: Story = {
  name: 'Puppy — No Description',
  args: {
    dog: {
      ...baseDog,
      name: 'Pip',
      breed: 'Husky Mix',
      age: '3',
      sex: 'Female',
      description: null,
      photoUrls: [],
    },
  },
};

export const LongDescription: Story = {
  name: 'Long Description (truncated)',
  args: {
    dog: {
      ...baseDog,
      name: 'Artemis',
      description:
        'Artemis is a stunning, intelligent, and deeply loving Siberian Husky who came to us after being surrendered by her family of five years. She knows basic commands and is crate trained. She loves playing fetch, going on long runs, and snuggling with her people every single evening without fail. She would do best in a home without cats but is fine with dog-savvy dogs.',
    },
  },
};
