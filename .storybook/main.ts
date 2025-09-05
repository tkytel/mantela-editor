import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [ "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  framework: "@storybook/react-vite",
};

export default config;
