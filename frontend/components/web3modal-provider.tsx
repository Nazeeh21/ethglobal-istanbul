import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';

import { WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';

const projectId =
  process.env.NEXT_PUBLIC_WC_ID || '335bac4c14c31ab929fdcebd992b2b52';

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [goerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3ModalProvider({ children }) {
  // @ts-ignore
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
