import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

const meta = {
  title: 'UI/TextInput',
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component:
          'Text input with label, helper text, and error state. Focus turns the background amber (the neo-brutalist focus treatment — no soft glow, just a hard color change).',
      },
    },
    layout: 'centered',
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'tel'] },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Your Name', placeholder: 'e.g. Jane Smith' },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    helperText: 'We\'ll use this to send adoption updates.',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    defaultValue: 'not-an-email',
    error: 'Please enter a valid email address.',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Phone Number',
    placeholder: '(555) 000-0000',
    required: true,
    type: 'tel',
    helperText: 'Required for the adoption follow-up call.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Shelter ID',
    defaultValue: 'SL-00492',
    disabled: true,
    helperText: 'Assigned automatically by Shelterluv.',
  },
};

export const Password: Story = {
  args: { label: 'Password', placeholder: '••••••••', type: 'password' },
};

export const NoLabel: Story = {
  args: { placeholder: 'Search by name or breed…' },
};
