import { useState, useEffect } from "react"
import { useAccount, useProvider, useContract } from 'wagmi'
const CONTRACT_ADDRESS = '0x48ec8e99054527074d426a6d590e6c784e21757D'
import contractInterface from '../src/utils/mintNFT.json'

function Admin() {
    const [isSaleOpen, setIsSaleOpen] = useState<boolean>(false)
    const ButtonStyle = `
    bg-gradient-200 hover:bg-gradient-250 text-white py-2 px-4 rounded shadow
    `

    const provider = useProvider()

    const contractProvider = useContract({
      addressOrName: CONTRACT_ADDRESS,
      contractInterface: contractInterface.abi,
      signerOrProvider: provider,
    })

    useEffect(() => {
        const checkSale = async () => {
            if (!contractProvider) return;

            const isSaleOpen = await contractProvider.isSaleOpen()
            setIsSaleOpen(isSaleOpen)
        }

        checkSale()
        console.log(isSaleOpen)
    }, [contractProvider, isSaleOpen])
    return (
        <div className="flex justify-center mt-60">
            <div className="bg-red-100 rounded-lg flex flex-col p-12 text-center">
                <h1 className="">Admin Panel</h1>
                <input />
                <button className={ButtonStyle}>Check In</button>
                <button className={ButtonStyle}>Open Sale</button>
                <button className={ButtonStyle}>Close Sale</button>
            </div>
        </div>
    )
}

export default Admin