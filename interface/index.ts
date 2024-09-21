import { V1_SUBGRAPH_URL, V2_SUBGRAPH_URL } from '../config/url'

export interface Swap {
  id: string
  from: string
  amount0In: string
  amount1In: string
}

export interface V3Swap {
  id: string
  origin: string
  amount0: string
  amount1: string
}

export interface Liquidity {
  id: string
  timestamp: string
  to: string
  amount0: string
  amount1: string
}

export interface V3Liquidity {
  id: string
  timestamp: string
  origin: string
  amount0: string
  amount1: string
}

export type SUBGRAPH_URL = typeof V1_SUBGRAPH_URL | typeof V2_SUBGRAPH_URL
