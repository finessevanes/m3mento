import { useState, useEffect } from "react"
import { TicketSVG } from '../src/components/TicketSVG'
import contractInterface from '../src/utils/mintNFT.json'
import { useContract, useProvider, useSigner } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const ButtonStyle = `
bg-gradient-200
hover:bg-gradient-250
text-white
py-2
px-4
rounded
shadow
self-center
w-content
mt-4
`
const CONTRACT_ADDRESS = '0xd7573740BeFa52E4903B28dB0A7c12d810dc6e4C'

function Web3Events() {
    const [stringToDisplay, setStringToDisplay] = useState<string>('')

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
    }, [])

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
            let nftTxn = await contractSigner.mint()
            console.log("Minting.....")
            await nftTxn.wait()
            console.log(`TRANSACTION: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
            getCurrentId()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className='flex justify-end top-0 sticky z-40'>
                <div className='mt-3 mr-3'><ConnectButton /></div>
            </div>
            <div className='flex self-start flex-col'>
                <TicketSVG stringToDisplay={stringToDisplay} />
                <button className={ButtonStyle} onClick={mintTicket}>Mint Ticket</button>
            </div>
        </>
    )
}

export default Web3Events