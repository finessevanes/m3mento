import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app'

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider } = configureChains(
  [
    chain.rinkeby
  ],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_KEY_RINKEBY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        accentColor: '#8F2A4B',
        borderRadius: 'small',

      })}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>

  )
}

export default MyApp
