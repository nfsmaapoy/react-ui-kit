import type { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import './preview.css';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    layout: 'centered',
    options: {
      storySort: {
        order: ['Overview', 'Components'],
      },
    },
  },
};

export default preview;
