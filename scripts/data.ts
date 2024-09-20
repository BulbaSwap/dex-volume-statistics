import { writeToPath } from 'fast-csv'
import fs from 'fs'
import path from 'path'
import { V1_POOLS, V1_SUBGRAPH_URL } from '../config'
import { delay, FIRST, getV1OrV2Swaps } from '../utils'

const getV1Swap = async (arr: string[], pool: string, token0Amount: number, token1Amount: number, skip: number) => {
  console.log(`pool: ${pool}, token0Amount: ${token0Amount}, token1Amount: ${token1Amount}, skip: ${skip}`)
  const data = await getV1OrV2Swaps(V1_SUBGRAPH_URL, pool, token0Amount, token1Amount, skip)
  const addressArr = [...arr, ...data.map(item => item.from.toLowerCase())]
  console.log('addressArr length: ', addressArr.length)
  if (data.length === FIRST) {
    await delay()
    return await getV1Swap(addressArr, pool, token0Amount, token1Amount, skip + FIRST)
  }
  console.log('return addressArr length: ', addressArr.length)
  return addressArr
}

const writeV1SwapAddress = async () => {
  let arr: string[] = []
  for (const [pool, tokens] of Object.entries(V1_POOLS)) {
    arr = await getV1Swap(arr, pool, tokens.token0.minSwapAmount, tokens.token1.minSwapAmount, 0)
  }
  const set = new Set(arr)
  const address = Array.from(set)
  const rows = address.sort().map(item => [item])
  const outputPath = path.join(__dirname, '../data/v1/swap/address.csv')
  writeToPath(outputPath, rows, { headers: false })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}

const main = async () => {
  await writeV1SwapAddress()
}

main()
