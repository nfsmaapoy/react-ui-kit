import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Badge } from './components/badge/badge';
import { Button } from './components/button/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/card/card';
import { Checkbox } from './components/checkbox/checkbox';
import { Dialog, DialogContent, DialogTrigger } from './components/dialog/dialog';
import { Input } from './components/input/input';
import { RadioGroup } from './components/radio-group/radio-group';
import { Select } from './components/select/select';
import { Switch } from './components/switch/switch';
import { Tabs, TabsList, TabsPanel, TabsTrigger } from './components/tabs/tabs';
import { Textarea } from './components/textarea/textarea';
import { ToastProvider, useToast } from './components/toast/toast';
import { Tooltip } from './components/tooltip/tooltip';

function SaveButton() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Profile saved',
          description: 'Your changes are live.',
          variant: 'success',
        })
      }
    >
      Save profile
    </Button>
  );
}

function Gallery() {
  const [plan, setPlan] = useState('pro');

  return (
    <ToastProvider>
      <div className="mx-auto grid w-[960px] max-w-full gap-token-lg">
        <header className="flex items-center justify-between gap-token-md">
          <div>
            <p className="m-0 text-sm text-muted">Workspace</p>
            <h1 className="m-0 text-2xl font-semibold">Account settings</h1>
          </div>
          <Badge variant="accent">Beta</Badge>
        </header>

        <div className="grid grid-cols-2 gap-token-lg">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>What teammates see on your page.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-token-md">
              <Input label="Name" defaultValue="Neil Francis" />
              <Input label="Email" type="email" defaultValue="neil@example.com" hint="Used for receipts." />
              <Textarea label="Bio" defaultValue="Building small interface kits." />
              <Select
                label="Timezone"
                defaultValue="manila"
                options={[
                  { value: 'manila', label: 'Manila' },
                  { value: 'london', label: 'London' },
                  { value: 'new-york', label: 'New York' },
                ]}
              />
            </CardContent>
            <CardFooter>
              <Tooltip content="Writes the profile and shows a confirmation.">
                <SaveButton />
              </Tooltip>
              <Button variant="secondary" href="#preview">
                Preview
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-token-lg">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Notifications and the plan on this workspace.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-token-lg">
                <Switch label="Email notifications" defaultChecked />
                <Checkbox label="Share usage data" hint="Helps decide what to build next." />
                <RadioGroup
                  label="Plan"
                  value={plan}
                  onValueChange={setPlan}
                  options={[
                    { value: 'free', label: 'Free' },
                    { value: 'pro', label: 'Pro' },
                    { value: 'team', label: 'Team' },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="account">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>
                  <TabsPanel value="account">Password was changed 12 days ago.</TabsPanel>
                  <TabsPanel value="billing">Next invoice is on the 1st.</TabsPanel>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="danger">Delete account</Button>
                  </DialogTrigger>
                  <DialogContent title="Delete account" description="This removes the workspace for everyone.">
                    <div className="flex justify-end gap-token-sm">
                      <Button variant="danger">Delete</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

const meta = {
  title: 'Overview',
  component: Gallery,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Kit: Story = {};
