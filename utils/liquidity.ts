import path from 'path'
import { writeToPath } from 'fast-csv'
import { readJson, writeJson } from 'fs-extra'
import { delay } from './delay'
import { MEME_POOLS, V1_POOLS, V1_SUBGRAPH_URL, V2_POOLS, V2_SUBGRAPH_URL, V3_POOLS } from '../config'
import { EXCLUDE_ADDRESS, FIRST } from '../constants'
import { getV1OrV2LiquiditySubgraph, getV3LiquiditySubgraph } from '../subgraph'

const getV1OrV2Liquidity = async (
  type: 'v1' | 'v2' | 'meme',
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
  const tmpPath = path.join(__dirname, `../data/${type}/liquidity/tmp.json`)
  const tmpFileData = await readJson(tmpPath).catch(() => {})
  const obj = Object.assign({}, tmpFileData)
  data.forEach(item => {
    if (!EXCLUDE_ADDRESS.includes(item.to.toLowerCase())) {
      const count = obj[item.to.toLowerCase()]
      if (count) {
        obj[item.to.toLowerCase()] = count + 1
      } else {
        obj[item.to.toLowerCase()] = 1
      }
    }
  })
  await writeJson(tmpPath, obj)
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
  const tmpPath = path.join(__dirname, '../data/v3/liquidity/tmp.json')
  const tmpFileData = await readJson(tmpPath).catch(() => {})
  const obj = Object.assign({}, tmpFileData)
  data.forEach(item => {
    const count = obj[item.origin.toLowerCase()]
    if (count) {
      obj[item.origin.toLowerCase()] = count + 1
    } else {
      obj[item.origin.toLowerCase()] = 1
    }
  })
  await writeJson(tmpPath, obj)
  if (data.length === FIRST) {
    await delay()
    await getV3Liquidity(pool, token0Amount, token1Amount, skip + FIRST)
  }
}

export const writeV1LiquidityAddress = async () => {
  for (const [pool, tokens] of Object.entries(V1_POOLS)) {
    await getV1OrV2Liquidity('v1', pool, tokens.token0.minLiquidityAmount, tokens.token1.minLiquidityAmount, 0)
  }
  const tmpPath = path.join(__dirname, '../data/v1/liquidity/tmp.json')
  const jsonData = await readJson(tmpPath).catch(() => {})
  const arr: [string, number][] = Object.entries(jsonData)
  const rows = arr.sort((a, b) => {
    if (a[1] === b[1]) {
      if (a[0] > b[0]) {
        return 1
      } else {
        return -1
      }
    } else {
      return b[1] - a[1]
    }
  })
  const outputPath = path.join(__dirname, '../data/v1/liquidity/address.csv')
  writeToPath(outputPath, rows, { headers: ['Address', 'Count'] })
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
  const tmpPath = path.join(__dirname, '../data/v2/liquidity/tmp.json')
  const jsonData = await readJson(tmpPath).catch(() => {})
  const arr: [string, number][] = Object.entries(jsonData)
  const rows = arr.sort((a, b) => {
    if (a[1] === b[1]) {
      if (a[0] > b[0]) {
        return 1
      } else {
        return -1
      }
    } else {
      return b[1] - a[1]
    }
  })
  const outputPath = path.join(__dirname, '../data/v2/liquidity/address.csv')
  writeToPath(outputPath, rows, { headers: ['Address', 'Count'] })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}

export const writeMEMELiquidityAddress = async () => {
  for (const [pool, tokens] of Object.entries(MEME_POOLS)) {
    await getV1OrV2Liquidity('meme', pool, tokens.token0.minLiquidityAmount, tokens.token1.minLiquidityAmount, 0)
  }
  const tmpPath = path.join(__dirname, '../data/meme/liquidity/tmp.json')
  const jsonData = await readJson(tmpPath).catch(() => {})
  const arr: [string, number][] = Object.entries(jsonData)
  const rows = arr.sort((a, b) => {
    if (a[1] === b[1]) {
      if (a[0] > b[0]) {
        return 1
      } else {
        return -1
      }
    } else {
      return b[1] - a[1]
    }
  })
  const outputPath = path.join(__dirname, '../data/meme/liquidity/address.csv')
  writeToPath(outputPath, rows, { headers: ['Address', 'Count'] })
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
  const tmpPath = path.join(__dirname, '../data/v3/liquidity/tmp.json')
  const jsonData = await readJson(tmpPath).catch(() => {})
  const arr: [string, number][] = Object.entries(jsonData)
  const rows = arr.sort((a, b) => {
    if (a[1] === b[1]) {
      if (a[0] > b[0]) {
        return 1
      } else {
        return -1
      }
    } else {
      return b[1] - a[1]
    }
  })
  const outputPath = path.join(__dirname, '../data/v3/liquidity/address.csv')
  writeToPath(outputPath, rows, { headers: ['Address', 'Count'] })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}
