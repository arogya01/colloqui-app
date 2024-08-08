import { color, radius, size, space, themes, zIndex } from '@tamagui/themes'
import { createFont, createTamagui, createTokens } from 'tamagui'

// Create a body font
const bodyFont = createFont({
  family: 'Inter',  // You can replace this with your preferred font family
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    // Add more sizes as needed
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 28,
    // Add more line heights as needed
  },
  weight: {
    4: '300',
    6: '600',
  },
  // Add more font properties as needed
})

const tokens = createTokens({
  size,
  space,
  zIndex,
  color: {
    ...color, 
    primaryBlack: '#2C2F33', 
    primary: '#7289DA'
  },
  radius,
})

// Create the Tamagui configuration
const appConfig = createTamagui({
  defaultTheme: 'light',
  fonts: {
    body: bodyFont,
    // Add more fonts if needed
  },
  themes: {
    ...themes,
    // You can extend or modify existing themes
    light: {
      ...themes.light,
      background: '#FFFFFF',
      color: '#000000',
    },
    dark: {
      ...themes.dark,
      background: '#2C2F33',
      color: '#FFFFFF',
    },
  },
  tokens,
  // Add more configuration options as needed
})

// Type declarations
export type Conf = typeof appConfig
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default appConfig;