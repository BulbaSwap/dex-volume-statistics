import path from 'path'
import { writeToPath } from 'fast-csv'
import { readJson, writeJson } from 'fs-extra'
import { AddressJson } from '../interface'

const calcTotal = async (type: 'v1' | 'v2' | 'v3') => {
  const swapTmpPath = path.join(__dirname, `../data/${type}/swap/tmp.json`)
  const liquidityTmpPath = path.join(__dirname, `../data/${type}/liquidity/tmp.json`)
  const swapJsonData: AddressJson = await readJson(swapTmpPath).catch(() => {})
  const liquidityJsonData: AddressJson = await readJson(liquidityTmpPath).catch(() => {})
  const obj: AddressJson = Object.assign({}, swapJsonData)
  for (const [address, liquidityCount] of Object.entries(liquidityJsonData)) {
    const swapCount = obj[address]
    if (swapCount) {
      obj[address] = liquidityCount + swapCount
    } else {
      obj[address] = liquidityCount
    }
  }
  const tmpPath = path.join(__dirname, `../data/${type}/total/tmp.json`)
  await writeJson(tmpPath, obj)
  const arr = Object.entries(obj)
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
  const outputPath = path.join(__dirname, `../data/${type}/total/address.csv`)
  writeToPath(outputPath, rows, { headers: ['Address', 'Count'] })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}

const calcAllTotal = async () => {
  const v1TmpPath = path.join(__dirname, '../data/v1/total/tmp.json')
  const v2TmpPath = path.join(__dirname, '../data/v2/total/tmp.json')
  const v3TmpPath = path.join(__dirname, '../data/v3/total/tmp.json')
  const v1JsonData: AddressJson = await readJson(v1TmpPath).catch(() => {})
  const v2JsonData: AddressJson = await readJson(v2TmpPath).catch(() => {})
  const v3JsonData: AddressJson = await readJson(v3TmpPath).catch(() => {})
  const obj: AddressJson = Object.assign({}, v1JsonData)
  for (const [address, v2Count] of Object.entries(v2JsonData)) {
    const v1Count = obj[address]
    if (v1Count) {
      obj[address] = v2Count + v1Count
    } else {
      obj[address] = v2Count
    }
  }
  for (const [address, v3Count] of Object.entries(v3JsonData)) {
    const addressCount = obj[address]
    if (addressCount) {
      obj[address] = addressCount + v3Count
    } else {
      obj[address] = v3Count
    }
  }
  const tmpPath = path.join(__dirname, '../data/total/tmp.json')
  await writeJson(tmpPath, obj)
  const arr = Object.entries(obj)
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
  const outputPath = path.join(__dirname, '../data/total/address.csv')
  writeToPath(outputPath, rows, { headers: ['Address', 'Count'] })
    .on('finish', () => {
      console.log('🚀 ~ CSV created:', outputPath)
    })
    .on('error', error => {
      console.error('CSV create failed:', error)
    })
}

const main = async () => {
  await calcTotal('v1')
  await calcTotal('v2')
  await calcTotal('v3')
  await calcAllTotal()
}

main()
