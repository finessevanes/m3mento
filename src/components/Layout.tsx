import React, { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'm3mento' }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="styles.css" />
      </Head>
      <Navbar />
      {children}
    </div>
  )

}

export default Layout