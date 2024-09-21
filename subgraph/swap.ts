import axios from 'axios'
import { V3_SUBGRAPH_URL } from '../config/url'
import { Swap, SUBGRAPH_URL, V3Swap } from '../interface'
import { FIRST } from '../constants'

export const getV1OrV2SwapSubgraph = async (
  url: SUBGRAPH_URL,
  pool: string,
  token0Amount: number,
  token1Amount: number,
  skip: number
): Promise<Swap[]> => {
  const res = await axios.post(url, {
    query: `
      {
        swaps(
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
                  { amount0In_gte: ${token0Amount} },
                  { amount1In_gte: ${token1Amount} }
                ]
              }
            ]
          }
        ) {
          id
          from
          amount0In
          amount1In
        }
      }
      `
  })
  return res?.data?.data?.swaps ?? []
}

export const getV3SwapSubgraph = async (
  pool: string,
  token0Amount: number,
  token1Amount: number,
  skip: number
): Promise<V3Swap[]> => {
  const res = await axios.post(V3_SUBGRAPH_URL, {
    query: `
      {
        swaps(
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
          origin
          amount0
          amount1
        }
      }
      `
  })
  return res?.data?.data?.swaps ?? []
}
