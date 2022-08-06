import { useState, useEffect } from "react"
import { TicketSVG } from '../../../src/components/TicketSVG'
import contractInterface from '../../../src/utils/abi.json'
import { useContract, useProvider, useSigner, useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Layout from "../../../src/components/Layout";

const ButtonStyle = `
bg-gradient-200
hover:bg-gradient-250
py-2
px-4
rounded
shadow
self-center
w-content
mt-4
`
const CONTRACT_ADDRESS = '0xC3fC059398F4D5D8C068d09eD6a7Ad1461803B6F'

function NightsAndWeekendsDemoDay() {
    const [stringToDisplay, setStringToDisplay] = useState<string>('')

    const { address } = useAccount()

    const provider = useProvider()
    const { data: signer } = useSigner()
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

    useEffect(() => {
        getCurrentId()
    })

    async function getCurrentId() {
        try {
            let currentId = await contractProvider.getCurrentId()
            let num = currentId.toNumber()
            let zeros

            if (num < 10) {
                zeros = "00"
            }

            if (num > 9 && num < 100) {
                zeros = "0"
            }

            setStringToDisplay(zeros + num)
        } catch (e) {
            console.log(e)
        }
    }

    const mintTicket = async () => {
        try {
            let nftTxn = await contractSigner.mint({ from: address, value: 1 })
            console.log("Minting.....")
            await nftTxn.wait()
            console.log(`TRANSACTION: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
            getCurrentId()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout title='demo day | m3mento'>
            <div className='flex flex-col'>
                <TicketSVG stringToDisplay={stringToDisplay} />
                <button className={ButtonStyle} onClick={mintTicket}>Mint Ticket</button>
            </div>
        </Layout>
    )
}

export default NightsAndWeekendsDemoDay