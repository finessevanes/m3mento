import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'

import { useAccount } from 'wagmi'
import Layout from '../src/components/Layout'
import EventsCarousel from '../src/components/EventsCarousel'

const Home = () => {
  const { address } = useAccount()

  return (
    <Layout>
      <div className="bg-hero-cover bg-cover">
        <div className="object-fill h-screen w-full flex justify-center items-end">
          <h1 className='absolute text-white mb-24'>Miss collecting your favorite tickets? We did too.</h1>
        </div>
      </div>
      <EventsCarousel title='Festivals' bgColor='bg-white' />
      <EventsCarousel title='Music Venues' bgColor='bg-black text-white'/>
      <EventsCarousel title='web3 Events' bgColor='bg-white'/>
    </Layout>
  )
}

export default Home
