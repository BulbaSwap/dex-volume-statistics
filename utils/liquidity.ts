import path from 'path'
import { writeToPath } from 'fast-csv'
import { readJson, writeJson } from 'fs-extra'
import { delay } from './delay'
import { V1_POOLS, V1_SUBGRAPH_URL, V2_POOLS, V2_SUBGRAPH_URL, V3_POOLS } from '../config'
import { FIRST } from '../constants'
import { getV1OrV2LiquiditySubgraph, getV3LiquiditySubgraph } from '../subgraph'

const getV1OrV2Liquidity = async (
  type: 'v1' | 'v2',
  pool: string,
  token0Amount: number,
  token1Amount: number,
  skip: number
) => {
  console.log(
    `type: ${type} liquidity, pool: ${pool}, token0Amount: ${token0Amount}, token1Amount: ${token1Amount}, skip: ${skip}`
  )
  const data = await getV1OrV2LiquiditySubgraph(
    type === 'v1' ? V1_SUBGRAPH_URL : V2_SUBGRAPH_URL,
    pool,
    token0Amount,
    token1Amount,
    skip
  )
  const addressSet = new Set(data.map(item => item.to.toLowerCase()))
  const addressArr = Array.from(addressSet)
  console.log('addressArr length: ', addressArr.length)
  const jsonPath = path.join(__dirname, `../data/${type}/liquidity/tmp.json`)
  const jsonFileData = await readJson(jsonPath).catch(() => [])
  const totalArr = [...jsonFileData, ...addressArr]
  const jsonArr = Array.from(new Set(totalArr))
  await writeJson(jsonPath, jsonArr)
  if (data.length === FIRST) {
    await delay()
    await getV1OrV2Liquidity(type, pool, token0Amount, token1Amount, skip + FIRST)
  }
}

const getV3Liquidity = async (pool: string, token0Amount: number, token1Amount: number, skip: number) => {
  console.log(
    `type: v3 liquidity, pool: ${pool}, token0Amount: ${token0Amount}, token1Amount: ${token1Amount}, skip: ${skip}`
  )
  const data = await getV3LiquiditySubgraph(pool, token0Amount, token1Amount, skip)
  const addressSet = new Set(data.map(item => item.origin.toLowerCase()))
  const addressArr = Array.from(addressSet)
  console.log('addressArr length: ', addressArr.length)
  const jsonPath = path.join(__dirname, '../data/v3/liquidity/tmp.json')
  const jsonFileData = await readJson(jsonPath).catch(() => [])
  const totalArr = [...jsonFileData, ...addressArr]
  const jsonArr = Array.from(new Set(totalArr))
  await writeJson(jsonPath, jsonArr)
  if (data.length === FIRST) {
    await delay()
    await getV3Liquidity(pool, token0Amount, token1Amount, skip + FIRST)
  }
}

export const writeV1LiquidityAddress = async () => {
  for (const [pool, tokens] of Object.entries(V1_POOLS)) {
    await getV1OrV2Liquidity('v1', pool, tokens.token0.minLiquidityAmount, tokens.token1.minLiquidityAmount, 0)
  }
  const jsonPath = path.join(__dirname, '../data/v1/liquidity/tmp.json')
  const jsonData = await readJson(jsonPath).catch(() => [])
  const addressSet = new Set(jsonData)
  const rows = Array.from(addressSet)
    .sort()
    .map(item => [item])
  const outputPath = path.join(__dirname, '../data/v1/liquidity/address.csv')
  writeToPath(outputPath, rows, { headers: false })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}

export const writeV2LiquidityAddress = async () => {
  for (const [pool, tokens] of Object.entries(V2_POOLS)) {
    await getV1OrV2Liquidity('v2', pool, tokens.token0.minLiquidityAmount, tokens.token1.minLiquidityAmount, 0)
  }
  const jsonPath = path.join(__dirname, '../data/v2/liquidity/tmp.json')
  const jsonData = await readJson(jsonPath).catch(() => [])
  const addressSet = new Set(jsonData)
  const rows = Array.from(addressSet)
    .sort()
    .map(item => [item])
  const outputPath = path.join(__dirname, '../data/v2/liquidity/address.csv')
  writeToPath(outputPath, rows, { headers: false })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}

export const writeV3LiquidityAddress = async () => {
  for (const [pool, tokens] of Object.entries(V3_POOLS)) {
    await getV3Liquidity(pool, tokens.token0.minLiquidityAmount, tokens.token1.minLiquidityAmount, 0)
  }
  const jsonPath = path.join(__dirname, '../data/v3/liquidity/tmp.json')
  const jsonData = await readJson(jsonPath).catch(() => [])
  const addressSet = new Set(jsonData)
  const rows = Array.from(addressSet)
    .sort()
    .map(item => [item])
  const outputPath = path.join(__dirname, '../data/v3/liquidity/address.csv')
  writeToPath(outputPath, rows, { headers: false })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}
