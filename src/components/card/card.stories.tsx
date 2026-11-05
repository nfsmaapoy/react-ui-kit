import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta = {
  title: 'Components/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Pro plan</CardTitle>
        <CardDescription>For a small team that ships every week.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="m-0 text-sm text-muted">Unlimited projects, shared comments, and email support.</p>
      </CardContent>
      <CardFooter>
        <Button>Upgrade</Button>
        <Button variant="ghost">Compare</Button>
      </CardFooter>
    </Card>
  ),
};
