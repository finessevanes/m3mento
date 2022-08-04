import { useState, useEffect } from "react"
import { useAccount, useProvider, useContract, useSigner } from 'wagmi'
const CONTRACT_ADDRESS = '0xC3fC059398F4D5D8C068d09eD6a7Ad1461803B6F'
import contractInterface from '../src/utils/abi.json'
import Layout from "../src/components/Layout"

function Admin() {
    const [isSaleActive, setIsSaleActive] = useState<boolean>(false)
    const [scannedAddress, setScannedAddress] = useState<string>('')
    const [isOwner, setIsOwner] = useState<boolean>(false)

    const ButtonStyle = `
    bg-gradient-200 hover:bg-gradient-250 text-white py-2 px-4 rounded shadow mt-2 disabled:bg-gradient-100
    `

    const provider = useProvider()
    const { data: signer, isError, isLoading } = useSigner()
    const { address } = useAccount()

    const contractProvider = useContract({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: contractInterface.abi,
        signerOrProvider: provider,
    })

    const contractSigner = useContract({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: contractInterface.abi,
        signerOrProvider: signer,
    })

    const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e === null) return
        if (e.target.value?.length < 51) return
        const address = e.target.value;
        const formattedAddress = address.slice(9).toLowerCase()

        setScannedAddress(formattedAddress)
        checkIfHoldsNFT(formattedAddress)
    }

    const openSale = async () => {
        if (!contractSigner) return;
        try {
            const openSaleTxn = await contractSigner.openSale()
            console.log('... opening sale')
            await openSaleTxn.wait()
            setIsSaleActive(true)
            console.log('complete!')
            console.log(`TRANSACTION: https://rinkeby.etherscan.io/tx/${openSaleTxn.hash}`)

        } catch (e) {
            console.log(e)
        }
    }

    const closeSale = async () => {
        if (!contractSigner) return;
        try {
            const closeSaleTxn = await contractSigner.closeSale()
            console.log('... closing sale')
            await closeSaleTxn.wait()
            setIsSaleActive(false)
            console.log('complete!')
            console.log(`TRANSACTION: https://rinkeby.etherscan.io/tx/${closeSaleTxn.hash}`)

        } catch (e) {
            console.log(e)
        }
    }

    const checkIn = async () => {
        try {
            let checkInTxn = await contractSigner.checkIn(scannedAddress)
            console.log('address to be checked in: ', scannedAddress)
            console.log('... checking in')
            await checkInTxn.wait()
            console.log('complete!')
            console.log(`TRANSACTION: https://rinkeby.etherscan.io/tx/${checkInTxn.hash}`)

        } catch (e) {
            console.log(e)
        }
    }

    const checkIfHoldsNFT = async (addy: string) => {
        try {
            let isOwnerOfNFT = await contractSigner.confirmOwnership(addy)
            setIsOwner(isOwnerOfNFT)

        } catch (e) {
            console.log()
        }
    }

    useEffect(() => {
        async function checkSale() {
            try {
                let isSaleOpen = await contractProvider.getSaleOpen()
                setIsSaleActive(isSaleOpen)
            } catch (e) {
                console.log(e)
            }
        }

        checkSale()
    })

    return (
        <Layout title='admin | m3mento'>
            <div className="flex justify-center mt-60">
                <div className="bg-red-100 rounded-lg flex flex-col p-12 text-center">
                    <h1 className="">Admin Panel</h1>
                    {isSaleActive ? <h1>ON SALE</h1> : <h1>... check back later</h1>}
                    <button onClick={openSale} className={ButtonStyle} disabled={isSaleActive}>Open Sale</button>
                    <button onClick={closeSale} className={ButtonStyle} disabled={!isSaleActive}>Close Sale</button>
                    <h2>Scan User</h2>
                    <input onChange={handleScan} />
                    {isOwner && <button onClick={checkIn} className={ButtonStyle} >Check In</button>}
                </div>
            </div>
        </Layout>
    )
}

export default Admin