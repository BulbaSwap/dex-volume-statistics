import {
  writeMEMELiquidityAddress,
  writeMEMESwapAddress,
  writeV1LiquidityAddress,
  writeV1SwapAddress,
  writeV2LiquidityAddress,
  writeV2SwapAddress,
  writeV3LiquidityAddress,
  writeV3SwapAddress
} from '../utils'

const writeSwapAddress = async () => {
  await writeV1SwapAddress()
  await writeV2SwapAddress()
  await writeV3SwapAddress()
  await writeMEMESwapAddress()
}

const writeLiquidityAddress = async () => {
  await writeV1LiquidityAddress()
  await writeV2LiquidityAddress()
  await writeV3LiquidityAddress()
  await writeMEMELiquidityAddress()
}

const main = async () => {
  await writeSwapAddress()
  await writeLiquidityAddress()
}

main()
