import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import contractInterface from '../utils/abi.json';
import { useAccount, useProvider, useContract } from 'wagmi'
import { CONTRACT_ADDRESS } from "../../web3-constants";

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'm3mento' }: Props) => {
    const { address } = useAccount()

    const provider = useProvider()

    const contractProvider = useContract({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: contractInterface.abi,
        signerOrProvider: provider,
    })

    const [isAdmin, setIsAdmin] = useState<boolean>(false)

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
        <header className='sticky top-0 z-20'>
            <div className='flex justify-around' style={{ alignItems: 'center', paddingTop: '6px' }}>
                <Link href="/">
                    <h1 className=''>m3mento</h1>
                </Link>
                {isAdmin ?
                    (<Link href='/admin/event'>
                        <a>
                            admin
                        </a>
                    </Link>)
                    :
                    (<Link href='/events/web3-events/nights-and-weekends-demo-day'>
                        <a>
                            events
                        </a>
                    </Link>)
                }
                <input placeholder='search...' className='rounded-lg' style={{ backgroundColor: 'rgba(255, 255, 255, .6)', paddingInline: '9px', paddingBlock: '3px' }} />
                {address && (
                    <Link href="/my-events">
                        <a>my events</a>
                    </Link>
                )}
                <Link href="/contact-us">
                    <a>contact us</a>
                </Link>
                <ConnectButton />
            </div>
        </header>
    )

}

export default Layout