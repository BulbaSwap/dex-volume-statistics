import path from 'path'
import { remove } from 'fs-extra'
import {
  writeV1LiquidityAddress,
  writeV1SwapAddress,
  writeV2LiquidityAddress,
  writeV2SwapAddress,
  writeV3LiquidityAddress,
  writeV3SwapAddress
} from '../utils'

const writeSwapAddress = async (deleteTmp = true) => {
  if (deleteTmp) {
    const jsonV1SwapTmpPath = path.join(__dirname, '../data/v1/swap/tmp.json')
    const jsonV2SwapTmpPath = path.join(__dirname, '../data/v2/swap/tmp.json')
    const jsonV3SwapTmpPath = path.join(__dirname, '../data/v3/swap/tmp.json')

    await remove(jsonV1SwapTmpPath).catch(() => {})
    await remove(jsonV2SwapTmpPath).catch(() => {})
    await remove(jsonV3SwapTmpPath).catch(() => {})
  }

  await writeV1SwapAddress()
  await writeV2SwapAddress()
  await writeV3SwapAddress()
}

const writeLiquidityAddress = async (deleteTmp = true) => {
  if (deleteTmp) {
    const jsonV1LiquidityTmpPath = path.join(__dirname, '../data/v1/liquidity/tmp.json')
    const jsonV2LiquidityTmpPath = path.join(__dirname, '../data/v2/liquidity/tmp.json')
    const jsonV3LiquidityTmpPath = path.join(__dirname, '../data/v3/liquidity/tmp.json')

    await remove(jsonV1LiquidityTmpPath).catch(() => {})
    await remove(jsonV2LiquidityTmpPath).catch(() => {})
    await remove(jsonV3LiquidityTmpPath).catch(() => {})
  }

  await writeV1LiquidityAddress()
  await writeV2LiquidityAddress()
  await writeV3LiquidityAddress()
}

const main = async () => {
  await writeSwapAddress(true)
  await writeLiquidityAddress(true)
}

main()
