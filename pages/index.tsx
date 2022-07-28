import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import contractInterface from '../src/utils/mintNFT.json'
import Link from 'next/link';

import { useAccount, useProvider, useContract } from 'wagmi'
import Layout from '../src/components/Layout'
import EventsCarousel from '../src/components/EventsCarousel'
import Navbar from '../src/components/Navbar'

const CONTRACT_ADDRESS = '0x48ec8e99054527074d426a6d590e6c784e21757D'


const Home = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const { address } = useAccount()

  const provider = useProvider()

  const contractProvider = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    signerOrProvider: provider,
  })


  const checkIfAdmin = async () => {
    if (!contractProvider) return;
    try {
      const ownerOfContract = await contractProvider.owner()
      if (address === ownerOfContract) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    checkIfAdmin()
  })
  return (
    <div className=''>
      <div className="bg-hero-cover bg-cover">
        <div className={`flex top-0 sticky z-40 justify-between`}>
          {isAdmin &&
              (<Link href='/admin'>
                <a>
                  Admin
                </a>
              </Link>)
          }
          <div className='mt-3 mr-3'><ConnectButton /></div>
        </div>
        <div className="object-fill h-screen z-20 w-full flex justify-center items-end">
          <h1 className='absolute text-white mb-24'>Miss collecting your favorite tickets? We do too.</h1>
        </div>
      </div>
      <h3 className='text-white text-2xl text-center'>Concert tickets for the fans</h3>
      <h1 className='text-white text-6xl text-center'>m3mento</h1>
      <EventsCarousel href='festivals' title='Festivals' bgColor='bg-white h-72' />
      <EventsCarousel href='music-venues' title='Music Venues' bgColor='bg-black text-white h-72' />
      <EventsCarousel href='web3-events' title='web3 Events' bgColor='bg-white h-72' />
    </div>
  )
}

export default Home
