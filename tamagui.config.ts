import { color, radius, size, space, themes, zIndex } from '@tamagui/themes'
import { createTamagui, createTokens } from 'tamagui'

const tokens = createTokens({
  size,
  space,
  zIndex,
  color:{
    ...color, 
    primaryBlack:'#2C2F33', 
    primary:'#7289DA'
  },
  radius,
}); 


console.log({color});


const appConfig = createTamagui({
  themes,
  tokens,
  // ... see Configuration
})

export type Conf = typeof appConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default appConfig