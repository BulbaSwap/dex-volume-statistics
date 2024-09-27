import path from 'path'
import { writeToPath } from 'fast-csv'
import { readJson, writeJson } from 'fs-extra'
import { delay } from './delay'
import { MEME_POOLS, V1_POOLS, V1_SUBGRAPH_URL, V2_POOLS, V2_SUBGRAPH_URL, V3_POOLS } from '../config'
import { getV1OrV2SwapSubgraph, getV3SwapSubgraph } from '../subgraph'
import { FIRST } from '../constants'

const getV1OrV2Swap = async (
  type: 'v1' | 'v2' | 'meme',
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
  const tmpPath = path.join(__dirname, `../data/${type}/swap/tmp.json`)
  const tmpFileData = await readJson(tmpPath).catch(() => {})
  const obj = Object.assign({}, tmpFileData)
  data.forEach(item => {
    const count = obj[item.from.toLowerCase()]
    if (count) {
      obj[item.from.toLowerCase()] = count + 1
    } else {
      obj[item.from.toLowerCase()] = 1
    }
  })
  await writeJson(tmpPath, obj)
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
  const tmpPath = path.join(__dirname, '../data/v3/swap/tmp.json')
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
    await getV3Swap(pool, token0Amount, token1Amount, skip + FIRST)
  }
}

export const writeV1SwapAddress = async () => {
  for (const [pool, tokens] of Object.entries(V1_POOLS)) {
    await getV1OrV2Swap('v1', pool, tokens.token0.minSwapAmount, tokens.token1.minSwapAmount, 0)
  }
  const tmpPath = path.join(__dirname, '../data/v1/swap/tmp.json')
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
  const outputPath = path.join(__dirname, '../data/v1/swap/address.csv')
  writeToPath(outputPath, rows, { headers: ['Address', 'Count'] })
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
  const tmpPath = path.join(__dirname, '../data/v2/swap/tmp.json')
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
  const outputPath = path.join(__dirname, '../data/v2/swap/address.csv')
  writeToPath(outputPath, rows, { headers: ['Address', 'Count'] })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}

export const writeMEMESwapAddress = async () => {
  for (const [pool, tokens] of Object.entries(MEME_POOLS)) {
    await getV1OrV2Swap('meme', pool, tokens.token0.minSwapAmount, tokens.token1.minSwapAmount, 0)
  }
  const tmpPath = path.join(__dirname, '../data/meme/swap/tmp.json')
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
  const outputPath = path.join(__dirname, '../data/meme/swap/address.csv')
  writeToPath(outputPath, rows, { headers: ['Address', 'Count'] })
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
  const tmpPath = path.join(__dirname, '../data/v3/swap/tmp.json')
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
  const outputPath = path.join(__dirname, '../data/v3/swap/address.csv')
  writeToPath(outputPath, rows, { headers: ['Address', 'Count'] })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}
