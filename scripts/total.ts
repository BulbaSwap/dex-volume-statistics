import path from 'path'
import { parseFile, writeToPath } from 'fast-csv'

const calcV1Total = () => {
  const v1SwapPath = path.join(__dirname, '../data/v1/swap/address.csv')
  const v1LiquidityPath = path.join(__dirname, '../data/v1/liquidity/address.csv')
  const v1SwapArr = parseFile(v1SwapPath, { headers: false })
  const v1LiquidityArr = parseFile(v1LiquidityPath, { headers: false })
  console.log('v1SwapArr: ', v1SwapArr)
  console.log('v1LiquidityArr: ', v1LiquidityArr)
}

const calcV2Total = () => {
  const v2SwapPath = path.join(__dirname, '../data/v2/swap/address.csv')
  const v2LiquidityPath = path.join(__dirname, '../data/v2/liquidity/address.csv')
  const v2SwapArr = parseFile(v2SwapPath, { headers: false })
  const v2LiquidityArr = parseFile(v2LiquidityPath, { headers: false })
  console.log('v2SwapArr: ', v2SwapArr)
  console.log('v2LiquidityArr: ', v2LiquidityArr)
}

const calcV3Total = () => {
  const v3SwapPath = path.join(__dirname, '../data/v3/swap/address.csv')
  const v3LiquidityPath = path.join(__dirname, '../data/v3/liquidity/address.csv')
  const v3SwapArr = parseFile(v3SwapPath, { headers: false })
  const v3LiquidityArr = parseFile(v3LiquidityPath, { headers: false })
  console.log('v3SwapArr: ', v3SwapArr)
  console.log('v3LiquidityArr: ', v3LiquidityArr)
}

const main = async () => {}

main()
