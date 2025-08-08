import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from './';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  args: {
    children: 'This is a Card component',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithCustomStyle: Story = {
  args: {
    children: 'Styled card with custom width',
    style: {
      minWidth: '300px',
      // backgroundColor: '#e0f7fa',
      border: '1px solid #ccc',
    },
  },
};

export const WithMultipleChildren: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Card Title</h3>
        <p>This is some body text inside the card.</p>
      </div>
    ),
  },
};
