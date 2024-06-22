import { createTamagui, createTokens } from "tamagui"

const tokens = createTokens({
    color: {
      darkRed: '#550000',
      lightRed: '#ff0000'
    }
  })
  
export const customConfig = createTamagui({
    tokens,
    themes: {
      dark: {
        red: tokens.color.darkRed,
      },
      light: {
        red: tokens.color.lightRed,
      }
    }
  })