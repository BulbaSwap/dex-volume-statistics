import path from 'path'
import { writeToPath } from 'fast-csv'
import { readJson, writeJson } from 'fs-extra'
import { delay } from './delay'
import { V1_POOLS, V1_SUBGRAPH_URL, V2_POOLS, V2_SUBGRAPH_URL, V3_POOLS } from '../config'
import { getV1OrV2SwapSubgraph, getV3SwapSubgraph } from '../subgraph'
import { FIRST } from '../constants'

const getV1OrV2Swap = async (
  type: 'v1' | 'v2',
  pool: string,
  token0Amount: number,
  token1Amount: number,
  skip: number
) => {
  console.log(
    `type: ${type} swap, pool: ${pool}, token0Amount: ${token0Amount}, token1Amount: ${token1Amount}, skip: ${skip}`
  )
  const data = await getV1OrV2SwapSubgraph(
    type === 'v1' ? V1_SUBGRAPH_URL : V2_SUBGRAPH_URL,
    pool,
    token0Amount,
    token1Amount,
    skip
  )
  const addressSet = new Set(data.map(item => item.from.toLowerCase()))
  const addressArr = Array.from(addressSet)
  console.log('addressArr length: ', addressArr.length)
  const jsonPath = path.join(__dirname, `../data/${type}/swap/tmp.json`)
  const jsonFileData = await readJson(jsonPath).catch(() => [])
  const totalArr = [...jsonFileData, ...addressArr]
  const jsonArr = Array.from(new Set(totalArr))
  await writeJson(jsonPath, jsonArr)
  if (data.length === FIRST) {
    await delay()
    await getV1OrV2Swap(type, pool, token0Amount, token1Amount, skip + FIRST)
  }
}

const getV3Swap = async (pool: string, token0Amount: number, token1Amount: number, skip: number) => {
  console.log(
    `type: v3 swap, pool: ${pool}, token0Amount: ${token0Amount}, token1Amount: ${token1Amount}, skip: ${skip}`
  )
  const data = await getV3SwapSubgraph(pool, token0Amount, token1Amount, skip)
  const addressSet = new Set(data.map(item => item.origin.toLowerCase()))
  const addressArr = Array.from(addressSet)
  console.log('addressArr length: ', addressArr.length)
  const jsonPath = path.join(__dirname, '../data/v3/swap/tmp.json')
  const jsonFileData = await readJson(jsonPath).catch(() => [])
  const totalArr = [...jsonFileData, ...addressArr]
  const jsonArr = Array.from(new Set(totalArr))
  await writeJson(jsonPath, jsonArr)
  if (data.length === FIRST) {
    await delay()
    await getV3Swap(pool, token0Amount, token1Amount, skip + FIRST)
  }
}

export const writeV1SwapAddress = async () => {
  for (const [pool, tokens] of Object.entries(V1_POOLS)) {
    await getV1OrV2Swap('v1', pool, tokens.token0.minSwapAmount, tokens.token1.minSwapAmount, 0)
  }
  const jsonPath = path.join(__dirname, '../data/v1/swap/tmp.json')
  const jsonData = await readJson(jsonPath).catch(() => [])
  const addressSet = new Set(jsonData)
  const rows = Array.from(addressSet)
    .sort()
    .map(item => [item])
  const outputPath = path.join(__dirname, '../data/v1/swap/address.csv')
  writeToPath(outputPath, rows, { headers: false })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}

export const writeV2SwapAddress = async () => {
  for (const [pool, tokens] of Object.entries(V2_POOLS)) {
    await getV1OrV2Swap('v2', pool, tokens.token0.minSwapAmount, tokens.token1.minSwapAmount, 0)
  }
  const jsonPath = path.join(__dirname, '../data/v2/swap/tmp.json')
  const jsonData = await readJson(jsonPath).catch(() => [])
  const addressSet = new Set(jsonData)
  const rows = Array.from(addressSet)
    .sort()
    .map(item => [item])
  const outputPath = path.join(__dirname, '../data/v2/swap/address.csv')
  writeToPath(outputPath, rows, { headers: false })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}

export const writeV3SwapAddress = async () => {
  for (const [pool, tokens] of Object.entries(V3_POOLS)) {
    await getV3Swap(pool, tokens.token0.minSwapAmount, tokens.token1.minSwapAmount, 0)
  }
  const jsonPath = path.join(__dirname, '../data/v3/swap/tmp.json')
  const jsonData = await readJson(jsonPath).catch(() => [])
  const addressSet = new Set(jsonData)
  const rows = Array.from(addressSet)
    .sort()
    .map(item => [item])
  const outputPath = path.join(__dirname, '../data/v3/swap/address.csv')
  writeToPath(outputPath, rows, { headers: false })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}
