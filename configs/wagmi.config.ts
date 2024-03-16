import { defaultWagmiConfig } from "@web3modal/wagmi/vue";
import { bsc, bscTestnet } from "viem/chains";


const chains: any = [bsc, bscTestnet]

const metadata = {
  name: 'Wallet connection modal',
  description: 'Connect your wallet',
  url: 'https://app.muneys.com',
  icons: ['https://muneys.com/wp-content/uploads/2024/03/cropped-cropped-OIG2-photoaidcom-cropped-150x150.png']
}

export const projectId = 'b7234ee880f91dcffd7229b192a94c55'

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata
})
