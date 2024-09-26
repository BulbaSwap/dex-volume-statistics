import axios from '../utils/axios'
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
  const res = await axios
    .post(url, {
      query: `
      {
        mints(
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
                  { amount0_gte: ${token0Amount} },
                  { amount1_gte: ${token1Amount} }
                ]
              }
            ]
          }
        ) {
          id
          timestamp
          to
          amount0
          amount1
        }
      }
      `
    })
    .catch(() => ({
      data: {
        data: {
          mints: []
        }
      }
    }))
  return res?.data?.data?.mints ?? []
}

export const getV3LiquiditySubgraph = async (
  pool: string,
  token0Amount: number,
  token1Amount: number,
  skip: number
): Promise<V3Liquidity[]> => {
  const res = await axios
    .post(V3_SUBGRAPH_URL, {
      query: `
      {
        mints(
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
                  { amount0_gte: ${token0Amount} },
                  { amount1_gte: ${token1Amount} }
                ]
              }
            ]
          }
        ) {
          id
          timestamp
          origin
          amount0
          amount1
        }
      }
      `
    })
    .catch(() => ({
      data: {
        data: {
          mints: []
        }
      }
    }))
  return res?.data?.data?.mints ?? []
}
