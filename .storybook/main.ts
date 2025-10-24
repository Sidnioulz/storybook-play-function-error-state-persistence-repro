import { defineMain } from '@storybook/react-vite/node';
 
export default defineMain({
  framework: '@storybook/react-vite',
  stories: ['../stories/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "msw-storybook-addon",
  ],
});