import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, TabsPanel, TabsTrigger } from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'account',
    children: null,
  },
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsPanel value="account">Name, email and password.</TabsPanel>
      <TabsPanel value="billing">Invoices and the card on file.</TabsPanel>
      <TabsPanel value="team">People who can edit this workspace.</TabsPanel>
    </Tabs>
  ),
};
