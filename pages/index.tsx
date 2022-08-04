import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import contractInterface from '../src/utils/abi.json'
import Link from 'next/link';
import { useAccount, useProvider, useContract } from 'wagmi'
import tilted1 from '../src/img/tilted-1.svg'
import tilted2 from '../src/img/tilted-2.svg'
import tilted3 from '../src/img/tilted-3.svg'
import Layout from '../src/components/Layout'
import EventsCarousel from '../src/components/EventsCarousel'
const CONTRACT_ADDRESS = '0xC3fC059398F4D5D8C068d09eD6a7Ad1461803B6F'
import Image from "next/image";

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
    <Layout title='m3mento'>
      <div className="bg-hero-cover bg-cover">
        <div className="object-fill h-screen z-20 w-full -mt-12 text-white font-poppins">
          <div className='flex flex-row p-10'>
            <div className='mt-80'>
              <h1 className='text-6xl mb-3'>Discover, Mint, & Sell NFTs Tickets</h1>
              <p className='text-xl mb-5'>Digital place for crypto collection and Non Fungible Token (NFT).Discover digital collections.</p>
              <div className='flex items-center'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-14">
                  Mint Tickets
                </button>
                <Link href='/about'>
                  <a>
                    Learn More
                  </a>
                </Link>
              </div>
            </div>
            <div className='flex mt-80'>
              <Image
                src={tilted1}
                alt="ticket"
                className='' />
              <Image
                src={tilted2}
                alt="ticket"
                className=''
              />
              <Image
                src={tilted3}
                alt="ticket"
                className='' />
            </div>
          </div>


        </div>
      </div>
      <EventsCarousel href='festivals' title='Festivals' bgColor='bg-white h-48' />
      <EventsCarousel href='music-venues' title='Music Venues' bgColor='bg-black text-white h-48' />
      <EventsCarousel href='web3-events' title='web3 Events' bgColor='bg-white h-48' />
      <EventsCarousel href='my-events' title='Events' bgColor='bg-black text-white h-48' />
    </Layout>
  )
}

export default Home
