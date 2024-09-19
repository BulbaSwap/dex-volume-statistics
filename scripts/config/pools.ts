import { V1_TOKENS, V2_TOKENS } from './tokens'

export const V1_POOLS = {
  '0xfc391a10da60a6940f2d6d89d2b744aa4d796a68': {
    token0: V1_TOKENS.WETH,
    token1: V1_TOKENS.USDT
  },
  '0x0e163ca58cc1e210a8e53cd26d22da0a0f3c50ef': {
    token0: V1_TOKENS.UNI,
    token1: V1_TOKENS.WETH
  },
  '0x4b28b4b5a5d676bea5310f5a54298db115397a98': {
    token0: V1_TOKENS.UNI,
    token1: V1_TOKENS.USDT
  }
}

export const V2_POOLS = [
  {
    '0x8a8fd142a0951438db1d00e496e5474325415a28': {
      token0: V2_TOKENS.WETH,
      token1: V2_TOKENS.USDT
    }
  },
  {
    '0x86746533f5bd54a201960bc2ba52454238cb0bd8': {
      token0: V2_TOKENS.WETH,
      token1: V2_TOKENS.USDC
    }
  },
  {
    '0x61af9a8c8c16eda1e21e5316d57a990f5f7eb713': {
      token0: V2_TOKENS.WETH,
      token1: V2_TOKENS.wstETH
    }
  },
  {
    '0x7a1e1f34db88b829e5bbf684c1d56a7202600416': {
      token0: V2_TOKENS.WETH,
      token1: V2_TOKENS.weETH
    }
  },
  {
    '0x35731aa2ef37468c0a239d195ffad8d2eaf357ab': {
      token0: V2_TOKENS.WETH,
      token1: V2_TOKENS.WBTC
    }
  },
  {
    '0xd0c5b35217722720324217f860d852e431544460': {
      token0: V2_TOKENS.USDT,
      token1: V2_TOKENS.USDC
    }
  },
  {
    '0x7fdf6283746acad44458be8b97921e37c6784d41': {
      token0: V2_TOKENS.USDT,
      token1: V2_TOKENS.WBTC
    }
  },
  {
    '0x8135611b0d932a0275f982da0b3e6e193f030eb5': {
      token0: V2_TOKENS.USDC,
      token1: V2_TOKENS.WBTC
    }
  }
]

export const V3_POOLS = [
  {
    '': ''
  }
]
