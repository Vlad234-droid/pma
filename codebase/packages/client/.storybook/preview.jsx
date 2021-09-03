import React from "react"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
import { StoryThemeProvider } from "./storyThemeProvider"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  layout: "fullscreen",
}

export const decorators = [
  (Story) => (
    <StoryThemeProvider>
      <Story />
    </StoryThemeProvider>
  ),
]
