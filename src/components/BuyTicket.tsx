import { useState, useEffect } from "react";
import { TicketSVG } from "./TicketSVG";
import contractInterface from "../../src/utils/abi.json";
import { useContract, useProvider, useSigner } from "wagmi";
import { CONTRACT_ADDRESS } from "../../web3-constants";

const ButtonStyle = `
bg-gradient-200
hover:bg-gradient-250
py-2
px-4
rounded
shadow
self-center
w-1/5
`;

export default function BuyTicket() {
  const [stringToDisplay, setStringToDisplay] = useState<string>("");

  const provider = useProvider();
  const { data: signer } = useSigner();
  const contractSigner = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    signerOrProvider: signer,
  });
  const contractProvider = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    getCurrentId();
  }, []);

  async function getCurrentId() {
    try {
      let currentId = await contractProvider.getCurrentId();
      let num = currentId.toNumber();
      let zeros;

      if (num < 10) {
        zeros = "00";
      }

      if (num > 9 && num < 100) {
        zeros = "0";
      }

      setStringToDisplay(zeros + num);
    } catch (e) {
      console.log(e);
    }
  }

  const mintTicket = async () => {
    try {
      let nftTxn = await contractSigner.mint();
      console.log("Minting.....");
      await nftTxn.wait();
      console.log(`TRANSACTION: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      getCurrentId();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex self-start flex-col">
        <TicketSVG stringToDisplay={stringToDisplay} />
        <button className={ButtonStyle} onClick={mintTicket}>
          Mint Ticket
        </button>
      </div>
    </>
  );
}
