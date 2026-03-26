import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/index.scss';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        "Love's Legacy (Brand)": 'default',
        'Golden Hour': 'golden-hour',
        'Neo-Brutalism': 'neo-brutalism',
        'Playful Geometric': 'playful-geometric',
        'Holographic': 'holographic',
        'Dog Vision': 'dog-vision',
      },
      defaultTheme: "Love's Legacy (Brand)",
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
