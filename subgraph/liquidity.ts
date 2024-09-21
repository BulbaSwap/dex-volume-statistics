import axios from 'axios'
import { V3_SUBGRAPH_URL } from '../config/url'
import { SUBGRAPH_URL, Liquidity, V3Liquidity } from '../interface'
import { FIRST } from '../constants'

export const getV1OrV2LiquiditySubgraph = async (
  url: SUBGRAPH_URL,
  pool: string,
  token0Amount: number,
  token1Amount: number,
  skip: number
): Promise<Liquidity[]> => {
  const res = await axios.post(url, {
    query: `
      {
        liquidityPositionSnapshots(
          first: ${FIRST}
          skip: ${skip}
          orderBy: timestamp
          orderDirection: asc
          where: {
            and: [
              {
                pair_: { id: "${pool.toLowerCase()}" },
              },
              {
                or: [
                  { reserve0_gte: ${token0Amount} },
                  { reserve1_gte: ${token1Amount} }
                ]
              }
            ]
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

export const getV3LiquiditySubgraph = async (
  pool: string,
  token0Amount: number,
  token1Amount: number,
  skip: number
): Promise<V3Liquidity[]> => {
  const res = await axios.post(V3_SUBGRAPH_URL, {
    query: `
      {
        positionSnapshots(
          first: ${FIRST}
          skip: ${skip}
          orderBy: timestamp
          orderDirection: asc
          where: {
            and: [
              {
                pool_: { id: "${pool.toLowerCase()}" },
              },
              {
                or: [
                  { depositedToken0_gte: ${token0Amount} },
                  { depositedToken1_gte: ${token1Amount} }
                ]
              }
            ]
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
