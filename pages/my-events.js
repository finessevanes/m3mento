import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAccount, useProvider, useContract, useSigner } from 'wagmi'
import contractInterface from '../src/utils/abi.json'
import { ConnectButton, connectorsForWallets } from '@rainbow-me/rainbowkit';
import Layout from '../src/components/Layout'

const MyEventss = () => {
    const CONTRACT_ADDRESS = '0xC3fC059398F4D5D8C068d09eD6a7Ad1461803B6F'
    const [isUserCheckedIn, setIsUserCheckedIn] = useState(false)
    const [addressSignedIn, setAddressSignedIn] = useState('')
    const [tickets, setTickets] = useState([])

    const ButtonStyle = `
    bg-gradient-200 hover:bg-gradient-250 text-white py-2 px-4 rounded shadow mt-2 disabled:bg-gradient-100
    `

    const imageStyle = {
        borderRadius: '12px',
        margin: '0'
    };

    const provider = useProvider()
    const { address } = useAccount()
    const { data: signer, isError, isLoading } = useSigner()

    const contractSigner = useContract({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: contractInterface.abi,
        signerOrProvider: signer,
    })

    const contractProvider = useContract({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: contractInterface.abi,
        signerOrProvider: provider,
    })

    const handleCheckIn = async () => {
        if (!addressSignedIn) return;
        try {
            console.log('address to be checked in: ', addressSignedIn)
            console.log('... checking in')
            let checkInTxn = await contractSigner.checkIn(addressSignedIn)
            await checkInTxn.wait()
            setIsUserCheckedIn(true)
            console.log('complete!')
            console.log(`TRANSACTION: https://rinkeby.etherscan.io/tx/${checkInTxn.hash}`)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        if (!addressSignedIn) return
        const checkIfUserHoldsTicket = async () => {
            try {
                let confirmOwnership = await contractProvider.getConfirmOwnership(addressSignedIn)
                console.log('confirmOwnership: ', confirmOwnership)
            } catch (e) {
                console.log(e)
            }
        }
        checkIfUserHoldsTicket()
    })

    useEffect(() => {
        if (!address) return
        const checkAddress = async () => {
            setAddressSignedIn(address)
        }

        checkAddress()
    }, [address])

    useEffect(() => {
        if (!address) return
        console.log(address)
        fetch(`https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${CONTRACT_ADDRESS}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.assets?.length) {
                    setTickets(data.assets)
                }
            })
            .catch(e => console.log(e))
    }, [address])


    return (
        <Layout title='my events | m3mento'>
            <div className="flex justify-center mt-60">
                <div className="rounded-lg flex flex-col p-12 text-center">
                    {tickets.length > 0 && address && tickets.map(ticket => (
                        <>
                            <h1 className='text-white font-semibold text-xl mb-2'>{ticket.name}</h1>
                            <h1 className='text-white font-semibold mb-2'>Ticket # 00{ticket.token_id}</h1>
                            <h2 className='text-white font-semibold mb-2'>{ticket.description}</h2>
                            <Image src={ticket.image_original_url || ticket.image_preview_url} width={300} height={500} alt={ticket.description} style={imageStyle} />
                            <button className={ButtonStyle} onClick={handleCheckIn}>Check In</button>
                        </>
                    ))}
                    {!tickets.length && (
                        <h1 className='text-white font-semibold text-xl mb-2'>You dont have tickets 🥲</h1>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default MyEventss