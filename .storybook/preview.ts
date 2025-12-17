import { definePreview } from '@storybook/react-vite';
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { initialize, mswLoader } from 'msw-storybook-addon';
import addonMockDate from '@sidnioulz/storybook-mock-date-decorator';

initialize();

export default definePreview({
  addons: [addonA11y(), addonDocs(), addonMockDate()],
  loaders: [mswLoader],
  parameters: {
    // type-safe!
    a11y: {
      options: { xpath: true },
      test: 'todo',
    },
  },
});
