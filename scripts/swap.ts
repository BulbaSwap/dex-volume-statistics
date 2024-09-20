import axios from 'axios'
import { V3_SUBGRAPH_URL } from '../config/url'
import { Swap, SUBGRAPH_URL, V3Swap } from '../interface'

export const getSwaps = async (
  url: SUBGRAPH_URL,
  pool: string,
  minAmount0In: string,
  minAmount1In: string
): Promise<Swap[]> => {
  const res = await axios.post(url, {
    queryName: 'Swaps',
    query: `
      query Swaps {
        swaps(
          orderBy: timestamp
          orderDirection: asc
          where: {
            pair_: { id: ${pool} }
            amount0In_gte: ${minAmount0In}
            amount1In_gte: ${minAmount1In}
          }
        ) {
          id
          from
          amount0In
          amount1In
        }
      `
  })
  return res?.data?.swaps ?? []
}

export const getV3Swaps = async (pool: string): Promise<V3Swap[]> => {
  const res = await axios.post(V3_SUBGRAPH_URL, {
    queryName: 'V3Swaps',
    query: `
      query V3Swaps {
        swaps(
          orderBy: timestamp
          orderDirection: asc
          where: {
            pool_: { id: ${pool} }
          }
        ) {
          id
          origin
          amount0
          amount1
        }
      `
  })
  return res?.data?.swaps ?? []
}
