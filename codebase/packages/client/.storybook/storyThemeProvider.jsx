import React from "react"

import {
  getFontFamilies,
  makeRenderer,
  ThemeProvider,
} from "../src/styles"

export const StoryThemeProvider = ({ children }) => {
  const felaStyle = document.querySelector('style[data-fela-type="RULE"]')
  if (felaStyle && felaStyle.sheet && felaStyle.sheet.rules) {
    Array.from(felaStyle.sheet.rules).forEach(() =>
      felaStyle.sheet.deleteRule(0),
    )
  }

  const renderer = makeRenderer(getFontFamilies())
  renderer.renderStatic(
    {
      fontFamily: '"TESCO Modern", Arial, sans-serif',
      background: "#f6f6f6",
    },
    "body",
  )

  return <ThemeProvider renderer={renderer}>{children}</ThemeProvider>
}
