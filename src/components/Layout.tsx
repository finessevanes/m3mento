import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";
import logo from '../img/logo.svg'

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
        <div className='flex' style={{ alignItems: 'center', paddingTop: '6px', justifyContent: 'space-around' }}>
          <Link href="/">
            <h1 className=''>m3mento</h1>
          </Link>
          <Link href='/admin/event'>
            <a>
              Admin
            </a>
          </Link>
          <input placeholder='search...' className='rounded-lg' style={{ backgroundColor: 'rgba(255, 255, 255, .6)', paddingInline: '9px', paddingBlock: '3px'}} />
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