import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './Carousel';

const dogSlides = [
  {
    src: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80',
    alt: 'Husky in the snow',
    caption: 'Koda — Siberian Husky, 2yr',
  },
  {
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    alt: 'Golden retriever smiling',
    caption: 'Luna — German Shepherd Mix, 3yr',
  },
  {
    src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    alt: 'Two dogs playing',
    caption: 'Bear & Nova — Available together',
  },
];

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component:
          'Image carousel with prev/next buttons and dot indicators. The navigation buttons use the same press-down interaction as Button. Use for dog photo galleries.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, paddingLeft: 24, paddingRight: 24 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    autoPlay: { control: 'boolean' },
    interval: { control: 'number' },
    showCaptions: { control: 'boolean' },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { slides: dogSlides },
};

export const WithCaptions: Story = {
  args: { slides: dogSlides, showCaptions: true },
};

export const AutoPlay: Story = {
  args: { slides: dogSlides, autoPlay: true, interval: 3000 },
};

export const SingleSlide: Story = {
  name: 'Single Slide (no controls)',
  args: { slides: [dogSlides[0]] },
};
