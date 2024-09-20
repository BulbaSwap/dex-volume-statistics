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

export const V2_POOLS = {
  '0x8a8fd142a0951438db1d00e496e5474325415a28': {
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.USDT
  },
  '0x86746533f5bd54a201960bc2ba52454238cb0bd8': {
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.USDC
  },
  '0x61af9a8c8c16eda1e21e5316d57a990f5f7eb713': {
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.wstETH
  },
  '0x7a1e1f34db88b829e5bbf684c1d56a7202600416': {
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.weETH
  },
  '0x35731aa2ef37468c0a239d195ffad8d2eaf357ab': {
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.WBTC
  },
  '0xd0c5b35217722720324217f860d852e431544460': {
    token0: V2_TOKENS.USDT,
    token1: V2_TOKENS.USDC
  },
  '0x7fdf6283746acad44458be8b97921e37c6784d41': {
    token0: V2_TOKENS.USDT,
    token1: V2_TOKENS.WBTC
  },
  '0x8135611b0d932a0275f982da0b3e6e193f030eb5': {
    token0: V2_TOKENS.USDC,
    token1: V2_TOKENS.WBTC
  }
}

export const V3_POOLS = {
  '0x21e66adc475cd2f59723eb35b34d93a8355741fd': { // WETH/USDT 1%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.USDT
  },
  '0xb8fbc65dc7b1ee478e472af0047a39eda5428123': { // WETH/USDT 0.3%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.USDT
  },
  '0xb887ee12626e03f81dc23b5b0b604403af12fb31': { // WETH/USDT 0.05%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.USDT
  },
  '0x9120229c697e4de17612b07dd6de366e4f165fd6': { // WETH/USDC 0.01%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.USDC
  },
  '0x5cf4b5445e2e6939807c7655738fe5f5dcbc64fe': { // WETH/USDC 0.3%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.USDC
  },
  '0x21c78e2c10596a088bca5e77cf2116cef9deef21': { // WETH/USDC 0.05%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.USDC
  },
  '0xec7d6cc3f5a5b2a4788abcd47d7036516ca5ee8f': { // WETH/USDC 1%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.USDC
  },
  '0x37586420b907d8f688814dcf5e0318d86c74be84': { // WETH/wstETH 1%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.wstETH
  },
  '0x777a23a7ce1df9a14265b8bec2aeb46dfd3e018d': { // WETH/wstETH 0.01%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.wstETH
  },
  '0x6fd8428038515cce24aa22a1077ceab6d358b778': { // WETH/wstETH 0.05%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.wstETH
  },
  '0x76a8bfed1dc4e895f30af7605190be5eb91b11a5': { // WETH/wstETH 0.3%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.wstETH
  },
  '0x7464cf5230844853c28706314a158c0e9f7680e7': { // WETH/weETH 1%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.weETH
  },
  '0xd02a2b29259f452570cf293cb8aaaad82184522c': { // WETH/weETH 0.3%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.weETH
  },
  '0xf9d92d80d72a73ffae0050a446841cb8b9a1f0de': { // WETH/weETH 0.05%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.weETH
  },
  '0x99d04708c377628432deec604bc30e9e627b6036': { // WETH/weETH 0.01%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.weETH
  },
  '0xa28e00db10e8b3a712bdbbec7a18b4bd53887437': { // WETH/WBTC 0.05%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.WBTC
  },
  '0xb9ce7d13e6c2261bdada9f4bcadb88ac13d86979': { // WETH/WBTC 0.3%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.WBTC
  },
  '0xe1676fcc715a5f8b8508b6104c54b4c642e14a3f': { // WETH/WBTC 1%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.WBTC
  },
  '0x33f5cd5e0a1da42d882bee91cafed8151d45dbc3': { // WETH/WBTC 0.01%
    token0: V2_TOKENS.WETH,
    token1: V2_TOKENS.WBTC
  },
  '0x9e5ab400737a51c077913a50762f4fc5f96006ef': { // USDT/USDC 0.01%
    token0: V2_TOKENS.USDT,
    token1: V2_TOKENS.USDC
  }
}
