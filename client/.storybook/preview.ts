import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/index.scss';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        'Neo-Brutalism': 'neo-brutalism',
        'Default (Dark)': 'default',
        'Playful Geometric': 'playful-geometric',
      },
      defaultTheme: 'Neo-Brutalism',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
  },
};

export default preview;
