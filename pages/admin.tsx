import { useState, useEffect } from "react"
import { useAccount, useProvider, useContract, useSigner } from 'wagmi'
const CONTRACT_ADDRESS = '0xEC3DFeE8e911Aa06B55788C9C3eDED67383da817'
import contractInterface from '../src/utils/abi.json'

function Admin() {
    const [isSaleOpen, setIsSaleOpen] = useState<boolean>(false)
    const [scannedAddress, setScannedAddress] = useState<string>('')

    const ButtonStyle = `
    bg-gradient-200 hover:bg-gradient-250 text-white py-2 px-4 rounded shadow
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
 
      }

    const openSale = async () => {
        if (!contractSigner) return;
        try {
            const openSaleTxn = await contractSigner.openSale()
            console.log('... opening sale')
            await openSaleTxn.wait()
            console.log('complete!')
            console.log('openSaleTxn: ', openSaleTxn)

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
            console.log('complete!')
            console.log('closeSaleTxn: ', closeSaleTxn)

        } catch (e) {
            console.log(e)
        }
    }

    const checkIn = async () => {
        if (!contractSigner) return;
        try {
            const checkInTxn = await contractSigner.checkIn(scannedAddress, {gasLimit: 3e7})
            console.log('... checking in')
            await checkInTxn.wait()
            console.log('complete!')
            console.log('checkInTxn', checkInTxn)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const checkSale = async () => {
            if (!contractProvider) return;

            const isSaleOpen = await contractProvider.isSaleOpen()
            setIsSaleOpen(isSaleOpen)
        }

        checkSale()
        console.log('is sale open?', isSaleOpen)
    }, [contractProvider, isSaleOpen])

    console.log(scannedAddress)
    return (
        <div className="flex justify-center mt-60">
            <div className="bg-red-100 rounded-lg flex flex-col p-12 text-center">
                <h1 className="">Admin Panel</h1>
                { isSaleOpen? <h1>Sale is Active</h1> : <h1>Tickets are not on sale</h1>}
                <input onChange={handleScan} />
                <button onClick={checkIn} className={ButtonStyle}>Check In</button>
                <button onClick={openSale} className={ButtonStyle}>Open Sale</button>
                <button onClick={closeSale} className={ButtonStyle}>Close Sale</button>
            </div>
        </div>
    )
}

export default Admin