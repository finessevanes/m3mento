import { useEffect } from 'react'
import { useAccount, useProvider, useContract, useSigner } from 'wagmi'
const CONTRACT_ADDRESS = '0x62F2492668f40e699F6B20D9db89cB173a58031F'
import contractInterface from '../src/utils/abi.json'

function MyEvents() {

    const ButtonStyle = `
    bg-gradient-200 hover:bg-gradient-250 text-white py-2 px-4 rounded shadow mt-2 disabled:bg-gradient-100
    `

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
        if (!address) return;
        try {
            console.log('address to be checked in: ', address)
            console.log('... checking in')
            let checkInTxn = await contractSigner.checkIn(address)
            await checkInTxn.wait()
            console.log('complete!')
            console.log(`TRANSACTION: https://rinkeby.etherscan.io/tx/${checkInTxn.hash}`)
        } catch (e) {
            console.log(e)
        }
    }

    const checkIfUserHoldsTicket = async (addy: string) => {
        try {
            let confirmOwnership = await contractProvider.getConfirmOwnership(addy)
            console.log('confirmOwnership: ', confirmOwnership)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        if (address){
            checkIfUserHoldsTicket(address)
        }
    })

    return (
        <div className="flex justify-center mt-60">
            <div className="bg-red-100 rounded-lg flex flex-col p-12 text-center">
                <h1 className="">My Events</h1>
                <h1>Nights and Weekends</h1>
                <button className={ButtonStyle} onClick={handleCheckIn}>Check In</button>
            </div>
        </div>
    )
}

export default MyEvents