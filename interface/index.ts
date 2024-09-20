import { V1_SUBGRAPH_URL, V2_SUBGRAPH_URL } from '../config/url'

export interface Swap {
  id: String
  from: String
  amount0In: String
  amount1In: String
}

export interface V3Swap {
  id: String
  origin: String
  amount0: String
  amount1: String
}

export type SUBGRAPH_URL = typeof V1_SUBGRAPH_URL | typeof V2_SUBGRAPH_URL
