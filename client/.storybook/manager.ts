import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: "Love's Legacy Rescue",
    brandImage: '/logo.png',
    brandTarget: '_self',
  }),
});
