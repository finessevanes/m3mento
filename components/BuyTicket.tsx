import { useState, useEffect } from "react"
import { TicketSVG } from './TicketSVG'

const ButtonStyle = `
bg-gradient-200
hover:bg-gradient-250
text-white
py-2
px-4
rounded
shadow
self-center
w-1/5
`

export default function BuyTicket() {
    const [stringToDisplay, setStringToDisplay] = useState<string>('100')


    const CONTRACT_ADDRESS = '0xd7573740BeFa52E4903B28dB0A7c12d810dc6e4C'

    const mintTicket = async () => {
        console.log('you minted an nft')
    }

    return (
        <>
            <div className='flex self-start flex-col'>
                <TicketSVG stringToDisplay={stringToDisplay} />
                <button className={ButtonStyle} onClick={mintTicket}>Mint Ticket</button>
            </div>
        </>
    )
}