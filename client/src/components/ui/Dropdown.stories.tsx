import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Dropdown from './Dropdown';

const breedOptions = [
  { value: 'husky', label: 'Siberian Husky' },
  { value: 'shepherd', label: 'German Shepherd' },
  { value: 'malamute', label: 'Alaskan Malamute' },
  { value: 'mix', label: 'Husky Mix' },
  { value: 'other', label: 'Other Breed' },
];

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component:
          'Custom select dropdown. Focus and open state turns the trigger amber (consistent with TextInput focus). Options highlight on hover. Keyboard navigable: ArrowUp/Down to move, Enter/Space to select, Escape to close.',
      },
    },
    layout: 'centered',
  },
  decorators: [(Story) => <div style={{ width: 280, paddingBottom: 200 }}><Story /></div>],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Filter by Breed',
    options: breedOptions,
    placeholder: 'All breeds',
  },
};

export const WithValue: Story = {
  name: 'With Selected Value',
  args: {
    label: 'Filter by Breed',
    options: breedOptions,
    value: 'husky',
    placeholder: 'All breeds',
  },
};

export const WithError: Story = {
  args: {
    label: 'Sex',
    options: [
      { value: 'm', label: 'Male' },
      { value: 'f', label: 'Female' },
    ],
    error: 'Please select a sex to continue.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Status',
    options: [{ value: 'available', label: 'Available' }],
    value: 'available',
    disabled: true,
  },
};

export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Dropdown
        label="Choose a Breed"
        options={breedOptions}
        value={value}
        onChange={setValue}
        placeholder="All breeds"
      />
    );
  },
};
