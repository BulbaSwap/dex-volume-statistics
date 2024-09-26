import axios from 'axios'
import axiosRetry from 'axios-retry'

const client = axios.create({
  baseURL: 'https://api.goldsky.com/api/public/project_cly6zqxwr6p4o011ddhk045by/subgraphs/bulbaswap-subgraph'
})

axiosRetry(client, { retries: 3 })

export default client
