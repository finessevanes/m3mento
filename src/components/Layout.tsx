import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Navbar from './Navbar'
import { ConnectButton } from '@rainbow-me/rainbowkit';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'm3mento' }: Props) => (
  <>
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className='sticky top-0 z-20'>
        <div  className='flex justify-around' style={{alignItems: 'center'}}>
          <Link href="/">
            <a>m3mento</a>
          </Link>
          <input placeholder='search...'  className='rounded-lg' style={{backgroundColor: 'grey', opacity: '.3', paddingInline:'9px', paddingBlock: '3px'}}/>


          <Link href="/my-events">
            <a>My assets</a>
          </Link>
          <ConnectButton />
        </div>
      </header>
      {children}
      <footer className='bg-red-100'>
        <span>FOOOTER</span>
      </footer>
    </div>
  </>
)

export default Layout