import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'

const ButtonStyle = `
bg-gradient-200 hover:bg-gradient-250 text-white py-2 px-4 rounded shadow
`

interface HomeProps {
  currentAccount: string;
};

const Home: NextPage = () => {

  const [currentAccount, setCurrentAccount] = useState<string>('');

      const inc = (e: any) => {
      console.log("btn", e.target)
      setCurrentAccount('0x7EEa9F4A69##########66Efc0798523910b146D');
    };
  //  const CounterDisplay: React.FunctionComponent<CounterDisplayProps> = ({count})
  // const [currentAccount: string, setCurrentAccount: string] = useState()
  return (
    <>
      <Head>
        <title>m3mento</title>
        <meta name="description" content="An NFT ticketing app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar currentAccount={currentAccount}
      />
      <div className='flex justify-center items-center h-screen'>
        {
          currentAccount?.length > 0 ? (
            <h1>testy</h1>
          ) : (
            <>
              <button className={ButtonStyle} onClick={inc}>
                Connect Wallet
              </button>
            </>
          )
        }
      </div>
    </>
  )
}

export default Home
