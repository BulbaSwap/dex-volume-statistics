import axios from 'axios'
import { V3_SUBGRAPH_URL } from '../config/url'
import { Swap, SUBGRAPH_URL, V3Swap } from '../interface'
import { FIRST } from './const'

export const getV1OrV2Liquidity = async (
  url: SUBGRAPH_URL,
  pool: string,
  token0Amount: number,
  token1Amount: number,
  skip: number
): Promise<Swap[]> => {
  const res = await axios.post(url, {
    query: `
      {
        liquidityPositionSnapshots(
          first: ${FIRST}
          skip: ${skip}
          orderBy: timestamp
          orderDirection: asc
          where: {
            pair_: { id: "${pool.toLowerCase()}" }
            reserve0_gte: ${token0Amount}
            reserve1_gte: ${token1Amount}
          }
        ) {
          id
          timestamp
          reserve0
          reserve1
        }
      }
      `
  })
  return res?.data?.data?.liquidityPositionSnapshots ?? []
}

export const getV3Liquidity = async (
  pool: string,
  token0Amount: number,
  token1Amount: number,
  skip: number
): Promise<V3Swap[]> => {
  const res = await axios.post(V3_SUBGRAPH_URL, {
    query: `
      {
        positionSnapshots(
          first: ${FIRST}
          skip: ${skip}
          orderBy: timestamp
          orderDirection: asc
          where: {
            pool_: { id: "${pool.toLowerCase()}" }
            depositedToken0_gte: ${token0Amount}
            depositedToken0_gte: ${token1Amount}
          }
        ) {
          id
          timestamp
          owner
          liquidity
        }
      }
      `
  })
  return res?.data?.data?.positionSnapshots ?? []
}
