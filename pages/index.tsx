
import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'

const ButtonStyle = `
bg-gradient-200 hover:bg-gradient-250 text-white py-2 px-4 rounded shadow
`

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState<string>('');

  useEffect(()=>{
    checkIfWalletIsConnected()
  }, [])

  async function checkIfWalletIsConnected(){
    console.log('hellllo')
  }

  async function connectWallet() {
    console.log('35hello')
    try {
    } catch (e) {
      console.log(e)
    }
  }

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
              <button className={ButtonStyle} onClick={connectWallet}>
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
